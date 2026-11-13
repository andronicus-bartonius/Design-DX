# Optional Terminology Check

The `terminology` check is offered, not enabled. It applies to the `reading`
profile and demonstrates one spelling substitution in Markdown. It requires an
installed compatible Vale executable. No runtime, rule download, or `vale sync`
is part of the preset.

This preset has not yet been executed against Vale. Test and record a concrete
version before treating it as a verified integration. Check its effective
configuration for inherited user-level rules that could change results.

## Project Invocation

If you choose to use the check, add `validation.enabled: ["terminology"]` in the
project configuration. Set `blocking` only if you intend to enforce it as a gate.
The JSON configuration does not itself run Vale.

With Vale already installed and execution authorized, run from the consuming
project root, not from inside the imported package:

```sh
vale --config=.design/example-system/validation/vale/.vale.ini content
```

This explicit command checks only the example content. Adapt the input paths for
another project; do not lint the imported negative fixtures as production prose.
`StylesPath` resolves relative to the configuration file. The rules are local.

## Preset Fixtures

From the same project root:

```sh
vale --config=.design/example-system/validation/vale/.vale.ini .design/example-system/validation/vale/fixtures/pass.md
vale --config=.design/example-system/validation/vale/.vale.ini .design/example-system/validation/vale/fixtures/fail.md
```

Expected behavior: the first reports no `Example.Terminology` finding; the second
reports that rule for `ExampleDevice`, suggesting `Example Device`. A parser error,
missing executable, or invalid configuration is not a successful negative test.
These expectations are not claimed execution results.

The rule is at error level. Apply the chosen Vale version's actual exit semantics
when integrating a gate. The preset proves neither prose quality nor any visual
property, even after its two fixtures pass.
