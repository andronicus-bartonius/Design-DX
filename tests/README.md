# Draft Schema Checks

These optional maintainer tests check the draft schemas and this repository's
synthetic example. They are not shipped as a general consumer validator and do
not inspect arbitrary project implementations.

Prerequisites: a supported Node.js release with `node:test` and `structuredClone`,
and an installed Ajv 8 implementation with Draft 2020-12 support. The initial
local run uses Node.js 24.19.0 and Ajv 8.20.0. No dependency is automatically installed.

If Ajv is already resolvable from this repository, run from the repository root:

```sh
node --test tests/schema.test.cjs
```

Alternatively set `DSDX_AJV_MODULE` to the absolute path of an existing
`ajv/dist/2020.js`, using your shell's environment-variable mechanism, and run the
same command. This reads the installed library without modifying its owning
project. Dependency installation and permission remain the maintainer's choice.

The cases cover positive and negative configuration shapes, optional verification,
portable path spelling, bundled contract equality, and this example's local
resource references. One case deliberately shows that an unknown profile ID can
pass structural validation: JSON Schema is not the semantic resolver.

These checks do not run Vale, render HTML, validate DTCG conformance, exercise an
agent, prove archive safety, or establish support on other operating systems.
