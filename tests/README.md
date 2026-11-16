# Draft Schema Checks

These optional maintainer tests check the draft schemas and this repository's
synthetic example. They are not shipped as a general consumer validator and do
not inspect arbitrary project implementations.

Prerequisites: a provided Deno installation and the test dependencies declared in
`deno.json` and pinned by `deno.lock`. Deno 2.9.6 is the verified runtime version;
other versions require verification, including compatibility with the lockfile.
The tests use Deno's native test runner and file APIs; no separate
Node.js installation is needed. Ajv supplies JSON Schema Draft 2020-12 validation.

These are development tools for Design-DX maintainers, not prerequisites for reading
the convention or consuming a design package. Install Deno through an approved
method separately; the repository does not install or bundle the runtime.

## Explicit Setup

From the repository root, with dependency downloads authorized:

```sh
deno install --frozen --entrypoint tests/schema.test.ts
```

This is the network-enabled dependency-caching step, not part of routine tests.
It uses the frozen lockfile and does not enable npm lifecycle scripts. Dependencies
stay in Deno's cache; no project `node_modules` directory is created.

To isolate the cache inside this repository, set `DENO_DIR` to the absolute path
of `.local/deno-cache` using your shell's environment-variable syntax. Keep the
same value for setup and subsequent checks. `.local/` is ignored by Git. An
existing cache is also suitable; the repository does not alter your shell profile.

## Routine Checks

Run from the repository root after setup:

```sh
deno test --no-run --frozen --cached-only --no-prompt tests/schema.test.ts
deno test --frozen --cached-only --no-prompt --allow-read=convention,examples,LICENSE tests/schema.test.ts
deno lint tests/schema.test.ts
```

Type checking and tests use frozen, cached-only dependency resolution. Missing
dependencies cause a failure rather than an implicit download or lockfile rewrite.
The test process receives read access only to the convention, examples, and license;
it receives no application network, write, environment, or subprocess permissions.
Deno may maintain its own cache independently of application permissions.

Use these exact direct commands. In the verified runtime, `deno task` startup and
standalone `deno check` can fetch npm dependencies despite the intended cached-only
workflow. Both `deno test` forms above have been checked with an empty cache and
refuse missing dependencies. To also suppress Deno's own update checks, set
`DENO_NO_UPDATE_CHECK=1` in the invocation environment.

The test command includes type checking. The `--no-run` form is useful for
diagnosing type errors without executing the suite. Linting is confined to the
test source; it does not rewrite the documentation.

Dependency upgrades are deliberate changes to `deno.json` and `deno.lock`, followed
by review and checks. Do not bypass frozen resolution during normal setup/testing.

## Evidence Limits

The cases cover positive and negative configuration shapes, optional verification,
portable path spelling, bundled contract equality, and this example's local
resource references. One case deliberately shows that an unknown profile ID can
pass structural validation: JSON Schema is not the semantic resolver.

These checks do not run Vale, render HTML, validate DTCG conformance, exercise an
agent, prove archive safety, or establish support on other operating systems.

Verified on Linux with Deno 2.9.6 and Ajv 8.20.0: type checking, all 46 tests, and
linting pass. Frozen setup leaves `deno.lock` unchanged. Direct cached-only test
execution refuses an empty dependency cache instead of fetching dependencies.
