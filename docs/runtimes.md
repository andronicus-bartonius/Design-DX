# Runtime Choices

DSDX is a file convention, not a runtime. Its JSON, Markdown, assets, and templates
can be consumed without Node.js, Deno, or Bun. A publisher chooses and documents
the runtime for any optional executable tooling.

TypeScript is a language, not an alternative to Node.js. All three runtimes can
participate in a TypeScript workflow.

| Option | Useful properties | Trade-offs for this work |
| --- | --- | --- |
| Node.js with TypeScript authored tools and published JavaScript | Fits Node-oriented validators and common web toolchains; consumers need no TypeScript compiler for published JS | Authors maintain a compile/type-check step; consumers still need the documented runtime and dependencies |
| Node.js running TypeScript directly | Current releases support erasable type syntax without a separate runner | Built-in stripping does not type-check or honor all `tsconfig` behavior; unsupported syntax and supported Node versions need care |
| Deno | Integrated TypeScript checking, formatting, testing, and scoped I/O permissions | Consumers install Deno; npm/tool compatibility and subprocess behavior still need testing; permissions do not make external tools sandboxed |
| Bun | Integrated TS execution, package tooling, tests, and bundling | Node compatibility is broad but not complete; test the exact validator dependencies rather than assuming drop-in equivalence |

For optional tooling aimed at existing web projects, Node.js plus TypeScript
authored source and released JavaScript is the initial recommendation, not a
conformance requirement. Small scripts can remain plain JavaScript. Deno is a
credible alternative if its integrated tools and permissions are useful enough to
justify another consumer runtime. Bun's speed alone does not justify another
compatibility target for a small schema checker.

Running TS is not evidence of a successful type check. Use the runtime's separate
checker or the TypeScript compiler as applicable. Avoid adopting a web framework,
container, or service merely to parse configuration files.

## Offline Use

Installation and updates may require network access. Ordinary checks should use
already installed or cached, pinned dependencies and local schemas/rules. Do not
use a command that silently downloads a tool when absent.

Deno's runtime network permissions do not by themselves prevent module downloads.
An offline Deno workflow also needs an appropriate frozen lock and cached-only
module loading. Subprocesses launched by any runtime have their own authority and
are not made safe merely by their parent runtime's settings.

Vale is a separate executable regardless of which JavaScript runtime orchestrates
it. Document its supported versions and any format-conversion dependencies.

## References

Reviewed November 13, 2026. These are upstream capabilities, not compatibility
tests of a DSDX implementation:

- [Node.js TypeScript support](https://nodejs.org/api/typescript.html)
- [Deno TypeScript support](https://docs.deno.com/runtime/fundamentals/typescript/)
- [Deno permissions](https://docs.deno.com/runtime/fundamentals/security/)
- [Bun TypeScript support](https://bun.com/docs/runtime/typescript)
- [Bun Node.js compatibility](https://bun.com/docs/runtime/nodejs-compat)
