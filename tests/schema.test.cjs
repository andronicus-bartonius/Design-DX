// Maintainer tests for this draft's schemas, not a general DSDX validator.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

// An explicit installed module may be supplied without changing another project.
// Otherwise use a normally resolvable local Ajv dependency. Never install here.
const Ajv = require(process.env.DSDX_AJV_MODULE || 'ajv/dist/2020.js');
const root = path.resolve(__dirname, '..');
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const packageRoot = 'examples/minimal-project/.design/example-system';
const originals = {
  package: read(`${packageRoot}/manifest.json`),
  project: read('examples/minimal-project/.design/project.json'),
};
const ajv = new Ajv({ allErrors: true, strict: true });
const checks = Object.fromEntries(['package', 'project'].map((kind) => [
  kind,
  ajv.compile(read(`convention/schemas/${kind}.schema.json`)),
]));

function schemaCase(kind, label, mutate, expected) {
  test(`${kind}: ${label}`, () => {
    const document = structuredClone(originals[kind]);
    mutate(document);
    const actual = checks[kind](document);
    assert.equal(actual, expected, JSON.stringify(checks[kind].errors));
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
schemaCase('project', 'future convention rejected', d => { d.dsdxVersion = '9.0.0'; }, false);
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
  d.checks.terminology.config = '/etc/config';
}, false);
schemaCase('package', 'no checks required', d => { delete d.checks; }, true);
schemaCase('project', 'unknown IDs are beyond structural schema scope', d => {
  d.targets.article.profiles = ['not-in-manifest'];
}, true);

test('the standalone package carries the canonical contract and schemas', () => {
  for (const file of [
    'LICENSE',
    'convention/CONVENTION.md',
    'convention/configuration.md',
    'convention/schemas/package.schema.json',
    'convention/schemas/project.schema.json',
  ]) {
    assert.deepEqual(fs.readFileSync(path.join(root, file)), fs.readFileSync(path.join(root, packageRoot, file)));
  }
});

test('the minimal consumer does not need project guidance or extensions', () => {
  const design = path.join(root, 'examples/minimal-project/.design');
  assert.equal(fs.existsSync(path.join(design, 'DESIGN.md')), false);
  assert.equal(fs.existsSync(path.join(design, 'extensions')), false);
  assert.equal(originals.project.validation, undefined);
});

test('the example manifest resolves to supplied resources and supported selections', () => {
  const manifest = originals.package;
  const project = originals.project;
  assert.equal(project.system.path, manifest.id);
  assert.equal(project.system.version, manifest.version);
  assert.equal(project.dsdxVersion, manifest.dsdxVersion);
  const resources = [manifest.entrypoint, ...manifest.foundation];
  for (const descriptor of [...Object.values(manifest.profiles), ...Object.values(manifest.adapters), ...Object.values(manifest.checks)]) {
    resources.push(descriptor.entrypoint, ...(descriptor.resources || []));
    if (descriptor.config) resources.push(descriptor.config);
  }
  for (const file of resources) assert.ok(fs.existsSync(path.join(root, packageRoot, file)), file);
  for (const target of Object.values(project.targets)) {
    for (const profile of target.profiles) assert.ok(manifest.profiles[profile], profile);
    for (const adapter of target.adapters || []) {
      assert.ok(manifest.adapters[adapter], adapter);
      for (const profile of target.profiles) assert.ok(manifest.adapters[adapter].profiles.includes(profile));
    }
    for (const file of target.paths) assert.ok(fs.existsSync(path.join(root, 'examples/minimal-project', file)), file);
  }
});
