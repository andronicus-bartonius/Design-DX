# Design Developer-Experience (Design-DX)

Design-DX is a convention for packaging, applying, and updating design systems across
projects, output formats, and AI-assisted workflows. Keep shared design intent in
the brand package's `.design/<brand>/DESIGN.md` and optional project-specific
guidance in `.design/DESIGN.md`. Put exact configuration, reusable values,
templates, and optional checks in files that their tools can actually read.

**Status: working draft `0.1.0-draft.1`.** The shape is ready to discuss, not a
stable interoperability promise. This repository documents the convention and
provides a small synthetic example. It does not supply a brand, component
library, publishing platform, agent harness, or universal validator.

## Start Here

1. [Understand the convention](convention/CONVENTION.md).
2. [Use a package in a project](docs/consuming.md).
3. [Explore the minimal example](examples/minimal-project/README.md).

## The Consumer Layout

```text
project/
├── AGENTS.md
├── .design/
│   ├── project.json         # System version, targets, and optional checks
│   ├── DESIGN.md            # Optional project-specific explanation
│   ├── extensions/          # Optional project-owned additions
│   └── <brand>/             # Imported brand package; replace as a unit
│       ├── manifest.json
│       ├── DESIGN.md        # Shared brand design-system entry point
│       ├── convention/     # Matching convention and schemas
│       └── ...             # Only the resources this package needs
└── ...                     # Existing project source and tooling
```

Root `AGENTS.md` points to `.design/project.json` and, when present,
`.design/DESIGN.md`. A project that only selects a published system does not need
its own design essay or an empty extensions directory.

`<brand>` is the brand's filesystem-safe identifier, recorded in the package's
manifest `id` and the project's `system.path`. `.design/<brand>/DESIGN.md` belongs
to the imported package; `.design/DESIGN.md` belongs to the consuming project.
Profile-specific guidance is reached through the selected profile's declared
entry point, such as `.design/<brand>/profiles/<profile>/DESIGN.md`.

## What Design-DX Standardizes

- Separate shared foundations, context-specific profiles, and output adapters.
- Package the necessary resources and their matching convention together.
- Consume an exact release locally instead of following a moving remote branch.
- Keep project extensions outside the replaceable upstream directory.
- Offer verification presets without requiring verification tools for adoption.
- Distinguish design decisions, structural checks, and rendered evidence.

Design-DX does not prescribe profile names, a visual style, a runtime, a package
manager, or a CI provider. It uses JSON Schema for its two small configuration
formats and recommends DTCG for portable design-token data. It is not affiliated
with DTCG, W3C, or any similarly named project.

## Scope of This Draft

Included: documentation, two draft schemas with maintainer tests, a synthetic
consumer/package example, and a sample Vale rule. No installer, release builder, general-purpose
checker, new skills, CI workflow, or production design system is implemented.

No runtime is needed to read or copy these files. Optional tooling has its own
setup requirements. The synthetic example is a packaging demonstration, not a
design recommendation or a production theme.

This repository's optional maintainer tooling uses TypeScript and requires a
provided Deno installation. The repository does not install or bundle the runtime.
See the [test setup instructions](tests/README.md) for dependency caching and local
checks. Reading or consuming a design package does not require Deno; optional
capabilities document their own tool prerequisites.

The publication URL and release review remain open. No hosted schema URLs or
downloadable release artifacts are claimed.

## Reference

[Configuration fields](convention/configuration.md) ·
[Design concepts](docs/design-contexts.md) ·
[Optional tools: Vale, Storybook, Playwright](docs/validation.md)

[Agent integration](docs/agents.md) ·
[Publication and maintenance](docs/publication.md) ·
[Maintainer tests](tests/README.md)

## License

Design-DX's original documentation, schemas, templates, examples, and code are released
under the [MIT License](LICENSE). Preserve applicable third-party notices for any
material added later. Adopting Design-DX does not require a project's own design system
or brand assets to use the MIT license.
