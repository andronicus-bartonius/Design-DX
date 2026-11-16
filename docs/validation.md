# Optional Design Tools

Verification is a capability a package offers, not a prerequisite for using its
design. A consumer can use guidance, assets, or templates with every check disabled.
That is adoption without verification, not a failed installation.

## Available Tools

| Check | Suitable tooling | Additional requirements and limits |
| --- | --- | --- |
| Configuration shape | Any JSON Schema Draft 2020-12 validator; Ajv is a JS option | Use local schemas; shape validity does not resolve files or profile dependencies |
| Package semantics | Focused authored checks or a documented manual review | Validate IDs, versions, paths, resources, and profile combinations; no generic Design-DX runner exists yet |
| Prose conventions | Vale | Separate executable; some input formats need conversion tools; rules do not prove writing quality |
| CSS conventions | Stylelint with appropriate syntax support/plugins | Use the project's supported runtime and parser; CSS checks do not cover arbitrary native or SVG source |
| Component catalog and state examples | Storybook | Needs a supported UI framework and its tooling; a catalog is useful without enabling automated tests |
| Web rendering | Playwright; axe-core for selected accessibility checks | Browser binaries and project setup; screenshots need a controlled environment; automation is not full accessibility assurance |
| Documents, slides, native UI | Adapter-specific tools | Only claim formats/renderers actually exercised; inspection of one output is not cross-format proof |

Packages ship ready-made native-tool configurations for checks they offer, plus
rules, fixtures, setup instructions, and dependency manifests when needed. Not
every package needs a `validation/` directory or every tool in this table.

In this draft, the Deno schema tests execute and the example includes an unverified
Vale preset. Storybook, Playwright, Stylelint, and accessibility integrations are
documented options, not installed or working integrations supplied by this repository.

## Invocation Model

The initial model is direct native-tool invocation, not a new orchestration engine:

1. The project selects checks in `project.json`, if any.
2. The maintainer or agent resolves their applicability to the selected targets.
3. Read the check's bundled setup/invocation guide.
4. With authorization, use an already installed compatible tool and its supplied
   configuration. Scope it to the intended project files.
5. Record the tool/configuration version, target, result, and unperformed checks.

Native tools do not read `project.json` automatically. Manual invocation follows
its selections; a future runner could automate that mapping. This draft includes
no executable that promises to resolve or enforce the entire convention.

Do not silently download dependencies, run `npx` with an absent package, fetch
remote rules, or execute imported build hooks during ordinary validation. Setup
and updates are separate authorized steps. Shipped JS configs and plugins are
executable code, not inert data merely because they are named configuration.

## Vale

[Vale](https://vale.sh/) runs locally and supports author-defined YAML rules. Ship
the rules under the preset's own styles directory and set `StylesPath` relative to
its configuration. A preset with bundled rules needs no remote `Packages` list or
`vale sync` for routine use.

The [synthetic example](../examples/minimal-project/README.md) includes a terminology
rule and pass/fail fixtures. It is not a proposed house writing style. Start a real
system with accepted terms and reliably checkable conventions. Keep subjective
voice guidance advisory unless a rule can distinguish actual mistakes.

Pin or document a tested tool version when promoting a preset. Account for user-level
configuration, parser behavior, and native exit-code/severity semantics. A warning
in a nonblocking review is not automatically a release failure. Use only flags
supported by the chosen tool version; test both positive and negative fixtures.

## Storybook and Playwright

[Storybook](https://storybook.js.org/) presents real UI components in named states,
such as a button that is focused, disabled, or loading. A UI adapter can supply
stories alongside its components so people can inspect and reuse those examples.
Register the catalog through the adapter's resources and integration instructions;
opening a catalog is not itself a validation check.

[Playwright](https://playwright.dev/docs/test-snapshots) can exercise browser
behavior and compare rendered pages against approved screenshots. It can test a
running application or appropriate Storybook examples. Storybook is not required
to use Playwright, and Playwright is not required to use Storybook.

A concrete integration should include the component/framework versions it supports,
story or test files, configuration, setup and run commands, and known limitations.
Only register a manifest `checks` entry when there is an actual verification command
with defined outcomes. Approve visual baselines deliberately; updating screenshots
automatically can hide a regression.

These tools keep their upstream runtime and browser requirements. Selecting Deno
for Design-DX's own tooling does not replace the Node.js/toolchain requirements of
a chosen Storybook or Playwright integration. They remain optional, adapter-specific
capabilities; no framework, service subscription, or browser is installed merely
by importing a brand package.

## Reports and Gates

- **Passed:** the selected check executed against the stated inputs and found no
  violations within its scope.
- **Failed:** it executed and reported a violation.
- **Not run:** it was selected but a missing tool, setup problem, unsupported
  input, or other obstacle prevented meaningful execution.
- **Not applicable:** the declared target context does not match the check.

No matching input files require explanation, not a vacuous pass. Disabled checks
are not failures and need not appear as noisy warnings. If no checks are selected,
report that no verification was requested instead of claiming a verified system.

Projects may opt into blocking selected checks in local builds or CI. Only then
does a failed or unexecutable applicable check prevent that gate from passing.
CI is one integration choice, not required infrastructure. Human review remains
separate from structural, source, and rendered checks.

## Testing a Preset

Include one valid and one deliberately invalid fixture for each meaningful rule.
Check that the correct rule reports the invalid fixture, rather than accepting
any nonzero exit code caused by broken configuration. Test path relocation and
offline operation when those are claimed. Keep generated logs and screenshots
out of release packages unless they are deliberate reference artifacts.
