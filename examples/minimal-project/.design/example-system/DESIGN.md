# Example System

This synthetic system illustrates Design-DX packaging. It is not an approved visual
identity, a complete UI kit, or a style recommendation. Its one spacing value and
one terminology rule exist to make the package relationships concrete.

## Entry Points

- [Manifest](manifest.json): version, capabilities, and local paths.
- [Bundled convention](convention/CONVENTION.md): package and consumer contract.
- [Spacing token](foundation/spacing.tokens.json): an illustrative DTCG 2025.10 dimension.
- [Reading profile](profiles/reading/DESIGN.md): the example context.
- [HTML adapter](adapters/html/INTEGRATION.md): explicit integration, not automatic injection.
- [Optional Vale check](validation/vale/USAGE.md): a terminology preset.
- [Origin and rights](NOTICE.md): limits of this draft example.

The spacing token is authoritative for the example value; the CSS is an
illustrative, manually maintained counterpart. No generator is shipped. The Vale
rule owns the exact spelling check, while its profile explains the intended use.

There are no production fixed brand requirements. The sample spacing is an
overridable default. A project's extension must be loaded explicitly by its
integration, outside the imported directory. There is no universal merge behavior.

## Dependencies

Reading these files and using the CSS require no authoring runtime. The selected
output's normal renderer still applies. Running the optional prose check requires
Vale; not running it leaves this package usable and unverified.
