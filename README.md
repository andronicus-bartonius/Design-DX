# Design Developer-Experience (Design-DX)

DSDX is a convention for packaging, applying, and updating design systems across
projects, output formats, and AI-assisted workflows. Keep design intent in
`DESIGN.md`; put exact configuration, reusable values, templates, and optional
checks in files that their tools can actually read.

**Status: working draft `0.1.0-draft.1`.** The shape is ready to discuss, not a
stable interoperability promise. This repository documents the convention and
provides a small synthetic example. It does not supply a brand, component
library, publishing platform, agent harness, or universal validator.

## Start Here

- [Convention](convention/CONVENTION.md): the package and consumer contract.
- [Package and project fields](convention/configuration.md): the draft JSON formats.
- [Using a package](docs/consuming.md): local adoption and deliberate updates.
- [Foundations, profiles, and adapters](docs/design-contexts.md): how one system
  serves different kinds of work without making every output look identical.
- [Optional validation](docs/validation.md): checks, tools, and honest results.
- [Agents and skills](docs/agents.md): discovery and authority without harness lock-in.
- [Runtime choices](docs/runtimes.md): Node.js, Deno, and Bun trade-offs.
- [Publication](docs/publication.md): releases, licensing, and remaining work.
- [Minimal project](examples/minimal-project/README.md): a complete illustrative
  package and consumer configuration, including an opt-in Vale preset.
- [Draft schema checks](tests/README.md): optional maintainer checks for the
  schemas and synthetic example, not a new consumer validation framework.

## The Consumer Layout

```text
project/
├── AGENTS.md
├── .design/
│   ├── project.json         # System version, targets, and optional checks
│   ├── DESIGN.md            # Optional project-specific explanation
│   ├── extensions/          # Optional project-owned additions
│   └── <system-id>/         # Imported release; replace as a unit
│       ├── manifest.json
│       ├── DESIGN.md        # Shared system entry point
│       ├── convention/     # Matching convention and schemas
│       └── ...             # Only the resources this package needs
└── ...                     # Existing project source and tooling
```

Root `AGENTS.md` points to `.design/project.json` and, when present,
`.design/DESIGN.md`. A project that only selects a published system does not need
its own design essay or an empty extensions directory.

## What DSDX Standardizes

- Separate shared foundations, context-specific profiles, and output adapters.
- Package the necessary resources and their matching convention together.
- Consume an exact release locally instead of following a moving remote branch.
- Keep project extensions outside the replaceable upstream directory.
- Offer verification presets without requiring verification tools for adoption.
- Distinguish design decisions, structural checks, and rendered evidence.

DSDX does not prescribe profile names, a visual style, a runtime, a package
manager, or a CI provider. It uses JSON Schema for its two small configuration
formats and recommends DTCG for portable design-token data. It is not affiliated
with DTCG, W3C, or any similarly named project.

## Scope of This Draft

Included: documentation, two draft schemas with maintainer tests, a synthetic
consumer/package example, and a sample Vale rule. No installer, release builder, general-purpose
checker, new skills, GitHub workflow, or production design system is implemented.

No runtime is needed to read or copy these files. Optional tooling has its own
setup requirements. The synthetic example is a packaging demonstration, not a
design recommendation or a production theme.

The publication URL and release review remain open. No hosted schema URLs or
downloadable release artifacts are claimed.

## License

DSDX's original documentation, schemas, templates, examples, and code are released
under the [MIT License](LICENSE). Preserve applicable third-party notices for any
material added later. Adopting DSDX does not require a project's own design system
or brand assets to use the MIT license.
