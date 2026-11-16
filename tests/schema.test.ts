// Maintainer tests for this draft's schemas, not a general Design-DX validator.
import { Ajv2020 } from 'ajv/2020';

// These fixture types describe editable test data, not the schema's allowed
// values. Mutations deliberately introduce invalid values and extra fields.
interface Descriptor {
  entrypoint: string;
  resources?: string[];
  config?: string;
}
interface PackageFixture {
  [key: string]: unknown;
  id: string;
  version: string;
  conventionVersion: string;
  entrypoint: string;
  foundation: string[];
  profiles: Record<string, Descriptor>;
  adapters: Record<string, Descriptor & { profiles: string[] }>;
  checks?: Record<string, Descriptor>;
}
interface ProjectFixture {
  [key: string]: unknown;
  conventionVersion: string;
  system: { path: string; version: string };
  targets: Record<string, { profiles: string[]; adapters?: string[]; paths: string[] }>;
  extensions?: string;
  validation?: { enabled: string[]; blocking?: boolean };
}
interface Fixtures {
  package: PackageFixture;
  project: ProjectFixture;
}

const root = new URL('../', import.meta.url);
const text = (file: string): string => Deno.readTextFileSync(new URL(file, root));
const read = <T>(file: string): T => JSON.parse(text(file)) as T;
function exists(file: string): boolean {
  try {
    Deno.statSync(new URL(file, root));
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) return false;
    throw error;
  }
}
function assert(value: unknown, message = 'Assertion failed'): asserts value {
  if (!value) throw new Error(message);
}
function equal(actual: unknown, expected: unknown, message = 'Values differ'): void {
  if (!Object.is(actual, expected)) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }
}

const packageRoot = 'examples/minimal-project/.design/example-system';
const originals: Fixtures = {
  package: read<PackageFixture>(`${packageRoot}/manifest.json`),
  project: read<ProjectFixture>('examples/minimal-project/.design/project.json'),
};
const ajv = new Ajv2020({ allErrors: true, strict: true });
const checks = Object.fromEntries(['package', 'project'].map((kind) => [
  kind,
  ajv.compile(read<Record<string, unknown>>(`convention/schemas/${kind}.schema.json`)),
]));

function schemaCase<K extends keyof Fixtures>(
  kind: K,
  label: string,
  mutate: (document: Fixtures[K]) => void,
  expected: boolean,
): void {
  Deno.test(`${kind}: ${label}`, () => {
    const document = structuredClone(originals[kind]);
    mutate(document);
    const actual = checks[kind](document);
    equal(actual, expected, JSON.stringify(checks[kind].errors));
  });
}

schemaCase('package', 'bundled manifest', () => {}, true);
schemaCase('project', 'no optional project artifacts required', () => {}, true);
schemaCase('project', 'optional extensions', d => { d.extensions = 'extensions'; }, true);
schemaCase('project', 'explicit validation opt-out', d => { d.validation = { enabled: [] }; }, true);
schemaCase('project', 'nonblocking opt-in', d => {
  d.validation = { enabled: ['terminology'], blocking: false };
}, true);
schemaCase('project', 'explicit blocking opt-in', d => {
  d.validation = { enabled: ['terminology'], blocking: true };
}, true);
schemaCase('project', 'guidance without adapter', d => { delete d.targets.article.adapters; }, true);
schemaCase('project', 'whole-project target', d => { d.targets.article.paths = ['.']; }, true);
schemaCase('project', 'spaces and non-ASCII paths', d => {
  d.targets.article.paths = ['User Guides/한국어.md'];
}, true);
schemaCase('project', 'unknown field rejected', d => { d.extentions = 'extensions'; }, false);
schemaCase('project', 'old local spelling rejected', d => { d.extensions = 'local'; }, false);
schemaCase('project', 'empty targets rejected', d => { d.targets = {}; }, false);
schemaCase('project', 'empty profile selection rejected', d => { d.targets.article.profiles = []; }, false);
schemaCase('project', 'duplicate profile rejected', d => {
  d.targets.article.profiles = ['reading', 'reading'];
}, false);
schemaCase('project', 'future convention rejected', d => { d.conventionVersion = '9.0.0'; }, false);
schemaCase('project', 'remote system path rejected', d => {
  d.system.path = 'https://example.com/design';
}, false);
schemaCase('project', 'reserved system name rejected', d => { d.system.path = 'extensions'; }, false);
schemaCase('project', 'floating latest rejected', d => { d.system.version = 'latest'; }, false);
schemaCase('project', 'whitespace version rejected', d => { d.system.version = 'v 1'; }, false);

for (const invalid of [
  '../outside', 'content/../../outside', '/absolute', 'C:\\absolute',
  'content\\article.md', 'content/*.md', 'content/./article.md',
  'content\nfile', 'content//file', 'content/',
]) {
  schemaCase('project', `nonportable/nonliteral path ${JSON.stringify(invalid)}`, d => {
    d.targets.article.paths = [invalid];
  }, false);
}

schemaCase('package', 'unknown field rejected', d => { d.commands = ['run this']; }, false);
schemaCase('package', 'wrong entry point rejected', d => { d.entrypoint = 'README.md'; }, false);
schemaCase('package', 'empty supported profiles rejected', d => { d.adapters.html.profiles = []; }, false);
schemaCase('package', 'hidden local configuration permitted', () => {}, true);
schemaCase('package', 'out-of-package resource rejected', d => {
  d.adapters.html.resources = ['../outside.css'];
}, false);
schemaCase('package', 'absolute check configuration rejected', d => {
  assert(d.checks);
  d.checks.terminology.config = '/etc/config';
}, false);
schemaCase('package', 'no checks required', d => { delete d.checks; }, true);
schemaCase('project', 'unknown IDs are beyond structural schema scope', d => {
  d.targets.article.profiles = ['not-in-manifest'];
}, true);

for (const kind of ['package', 'project'] as const) {
  Deno.test(`${kind}: accepts conventionVersion as the version field`, () => {
    const document: Record<string, unknown> = structuredClone(originals[kind]);
    delete document.dsdxVersion;
    document.conventionVersion = '0.1.0-draft.1';
    equal(checks[kind](document), true, JSON.stringify(checks[kind].errors));
  });

  Deno.test(`${kind}: rejects the retired version field`, () => {
    const document: Record<string, unknown> = structuredClone(originals[kind]);
    delete document.conventionVersion;
    document.dsdxVersion = '0.1.0-draft.1';
    equal(checks[kind](document), false);
  });

  Deno.test(`${kind}: rejects supplying both version field names`, () => {
    const document: Record<string, unknown> = structuredClone(originals[kind]);
    document.conventionVersion = '0.1.0-draft.1';
    document.dsdxVersion = '0.1.0-draft.1';
    equal(checks[kind](document), false);
  });
}

Deno.test('the standalone package carries the canonical contract and schemas', () => {
  for (const file of [
    'LICENSE',
    'convention/CONVENTION.md',
    'convention/configuration.md',
    'convention/diagrams/design-layers.d2',
    'convention/diagrams/design-layers.svg',
    'convention/diagrams/OFL.txt',
    'convention/schemas/package.schema.json',
    'convention/schemas/project.schema.json',
  ]) {
    equal(text(file), text(`${packageRoot}/${file}`), `Bundled copy differs: ${file}`);
  }
});

Deno.test('the minimal consumer does not need project guidance or extensions', () => {
  const design = 'examples/minimal-project/.design';
  equal(exists(`${design}/DESIGN.md`), false);
  equal(exists(`${design}/extensions`), false);
  equal(originals.project.validation, undefined);
});

Deno.test('the example manifest resolves to supplied resources and supported selections', () => {
  const manifest = originals.package;
  const project = originals.project;
  equal(project.system.path, manifest.id);
  equal(project.system.version, manifest.version);
  equal(project.conventionVersion, manifest.conventionVersion);
  const resources = [manifest.entrypoint, ...manifest.foundation];
  for (const descriptor of [...Object.values(manifest.profiles), ...Object.values(manifest.adapters), ...Object.values(manifest.checks ?? {})]) {
    resources.push(descriptor.entrypoint, ...(descriptor.resources || []));
    if (descriptor.config) resources.push(descriptor.config);
  }
  for (const file of resources) assert(exists(`${packageRoot}/${file}`), file);
  for (const target of Object.values(project.targets)) {
    for (const profile of target.profiles) assert(manifest.profiles[profile], profile);
    for (const adapter of target.adapters || []) {
      assert(manifest.adapters[adapter], adapter);
      for (const profile of target.profiles) assert(manifest.adapters[adapter].profiles.includes(profile));
    }
    for (const file of target.paths) assert(exists(`examples/minimal-project/${file}`), file);
  }
});
