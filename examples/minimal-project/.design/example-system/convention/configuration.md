# Configuration Reference

Working draft `0.1.0-draft.1`. These field names are a proposed Design-DX contract, not
an adopted third-party standard. Unknown fields are rejected by the schemas so
typos do not silently change intent. Tool-specific configuration belongs in its
own files, not arbitrary fields on these objects.

## Package Manifest

Schema: [package.schema.json](schemas/package.schema.json).

| Field | Required | Meaning |
| --- | --- | --- |
| `$schema` | No | Local schema reference for editors; normally `convention/schemas/package.schema.json` |
| `conventionVersion` | Yes | Exact convention revision; `0.1.0-draft.1` for this draft |
| `id` | Yes | Filesystem-safe brand identifier used for `<brand>`, such as the synthetic `example-system` |
| `version` | Yes | Exact system release identifier, not a range or moving selector |
| `entrypoint` | Yes | Literal `DESIGN.md` relative to the package root; installed as `.design/<brand>/DESIGN.md` |
| `source` | No | `repository` HTTPS URL and immutable `revision`; real releases should include these |
| `foundation` | No | Package-relative entry files or resources shared across profiles |
| `profiles` | No | Named profile descriptors |
| `adapters` | No | Named implementation descriptors |
| `checks` | No | Offered optional verification descriptors; none is automatically enabled |

IDs use lowercase letters, digits, and single internal hyphens, starting with a
letter. `extensions` is reserved as a consumer directory and cannot be a brand identifier.
Version strings are exact identities. The schema rejects whitespace and `latest`,
but checking whether an identifier is actually immutable is a release-process task.

### Profiles

Each profile has `entrypoint`, a package-relative guidance file, and optional
`requires`, an array of other profile IDs. The publisher supplies dependencies in
the same package. Dependency cycles and unknown IDs are invalid but are not
detected by JSON Schema alone.

### Adapters

Each adapter has `entrypoint`, a package-relative integration guide, and `profiles`,
the nonempty list of profiles it supports. Optional `resources` lists its primary
consumable files/directories. This list is discovery metadata, not an exhaustive
archive allowlist. Include transitive imports and assets too.

Every expanded selected profile in a target using an adapter must appear in that
adapter's supported list. This is necessary, not sufficient, for combinations:
the integration guide also states any restrictions on using profiles together.
No ordering or automatic merge follows from the list's order.

### Checks

Each check has `tool` and `entrypoint`, a local setup/invocation guide. Optional
`config` points to the bundled native-tool configuration. The descriptor does not
contain a shell command that a consumer is expected to execute automatically.

Optional `profiles` and `adapters` restrict applicability. A present list must
intersect the target's resolved selection; if both lists are present, both must
intersect. Omitted lists impose no restriction. Tool syntax/input support may
narrow the check further, as documented in its guide.

## Project Configuration

Schema: [project.schema.json](schemas/project.schema.json).

| Field | Required | Meaning |
| --- | --- | --- |
| `$schema` | No | Local schema reference, normally `<brand>/convention/schemas/project.schema.json` |
| `conventionVersion` | Yes | Exact convention revision understood by the imported package |
| `system.path` | Yes | Brand directory name relative to `.design/`; must equal the imported manifest's `id` |
| `system.version` | Yes | Exact manifest version selected by the project |
| `targets` | Yes | One or more named design contexts |
| `extensions` | No | The literal directory name `extensions`; omit if unused |
| `validation.enabled` | If `validation` exists | IDs of checks explicitly selected from the manifest |
| `validation.blocking` | No | Whether the project intends selected applicable checks to gate work; absent means false |

When `validation` is absent, no checks are selected. An empty `enabled` array also
selects none. `blocking` is recorded intent, not a build hook. The consumer must
wire any gate into its actual workflow; Design-DX does not install one.

Each target requires a nonempty `profiles` array and `paths` array. `adapters` is
optional and defaults conceptually to no adapters. `paths` contains literal files
or directories relative to the project root, or `.` for that root. No globs or
environment variables are expanded. Exclude imported tooling, generated output,
and other irrelevant content in native-tool configuration as appropriate.

## Minimal Selection

```json
{
  "$schema": "example-system/convention/schemas/project.schema.json",
  "conventionVersion": "0.1.0-draft.1",
  "system": { "path": "example-system", "version": "0.0.0-example" },
  "targets": {
    "article": {
      "profiles": ["reading"],
      "adapters": ["html"],
      "paths": ["content"]
    }
  }
}
```

This configuration needs no project `.design/DESIGN.md`, extensions, or validation tools.
It does not claim that the selected output has been validated.

To opt into the example terminology check, add:

```json
"validation": {
  "enabled": ["terminology"],
  "blocking": false
}
```

This is a member fragment to insert into the project object, not a standalone JSON
file. It authorizes no process by itself. Run the documented tool only through the
project's normal execution permissions.

## Limits of Schema Validation

The schemas validate shapes and basic path spelling. They do not prove files
exist, IDs resolve, versions match, profile combinations make sense, schemas are
trustworthy, paths remain contained through symlinks, or asset licenses permit
redistribution. They do not validate DTCG tokens or rendered output.

Unknown schema revisions must be reported as unsupported, not silently interpreted
using whichever schema is available. The `$schema` metadata is not a network
dependency: validators can explicitly load the matching bundled schema.
