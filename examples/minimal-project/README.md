# Minimal DSDX Consumer

This is a synthetic packaging example, not a brand or production design system.
The `.design/example-system/` directory represents an exported release. Its local
contract and schemas travel with it. `project.json` selects it without enabling
verification.

There is intentionally no project `.design/DESIGN.md` and no `extensions/`
directory. The shared system entry point is sufficient for this example.

## Use as a Template

1. Copy the `.design/` directory, including hidden files, into a scratch project.
2. Copy the `content/` directory or change the target's path to existing content.
3. Incorporate the design pointer from `AGENTS.md` into your project's existing
   root instructions if you use an agent. Do not overwrite existing instructions.
4. Inspect the shared `DESIGN.md` and selected profile/adapter entry points.

No install, network access, or execution is needed for these steps. Before
publishing a real system, replace the synthetic identity and example resources,
record provenance and licenses, and review the integration. DSDX itself does not
automatically rename paths or generate a new system.

## Optional Vale Exercise

The package includes a terminology rule with positive and negative fixtures.
The [bundled instructions](.design/example-system/validation/vale/USAGE.md) explain
how to run it with an installed Vale executable. It is disabled in `project.json`.
Selecting it does not require selecting Stylelint, a browser, or any other checker.

## Evidence Limits

This example can establish file-shape and path relationships. It does not establish
an approved aesthetic, a rendered application, a complete token build pipeline,
agent behavior, or cross-platform support. The Vale preset needs execution against
a chosen Vale version before it is advertised as tested.
