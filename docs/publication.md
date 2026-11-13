# Publication and Maintenance

This repository publishes a convention, its schemas, and illustrative templates.
A concrete design-system implementation belongs in its own package or repository.
Do not populate DSDX with a company's production identity or internal design records.

## Current Boundary

The draft does not create a GitHub repository, publish a release, install a skill,
configure CI, build an archive, or implement a general-purpose validator. The
minimal example shows the intended exported shape; it is not a polished design kit.

Before public publication, choose the repository URL, review the draft contract,
and inspect examples for private or third-party material. The original DSDX
materials use the [MIT License](../LICENSE).

## License Scope

MIT covers the original documentation, schemas, templates, examples, and code in
this repository. Preserve its copyright and permission notices when redistributing
copies or substantial portions, including the convention copied into a consumer
package. The standalone example includes its own copy of the license for that reason.

A design system implementing DSDX may license its own material differently.
Adopting the convention does not relicense a company's assets or require them to
be public. Retain separate notices and permissions for any third-party fonts,
logos, code, or other resources; DSDX's license does not grant rights to those.

## Convention Releases

Version the convention independently from systems that adopt it. A convention
release includes its prose, schemas, examples, and change notes together. Draft
versions may change incompatibly; do not imply stability from a valid schema.

The canonical contract lives in `convention/`. Its copy inside the minimal example
exists to demonstrate an offline, standalone consumer package. Keep those files
byte-identical and compare them when editing. That duplication is a release copy,
not two independent sources of truth.

Once a public URL exists, link it from documentation. Avoid inventing hosted schema
URLs now. Local schema references remain usable after a host/platform move.

## Design-System Releases

A system implementing DSDX exports a single named directory with the matching
contract, schemas, guidance, resources, notices, and optional verification presets.
Keep development caches, credentials, raw research, and unrelated assets out.

The author may use an archive, a package registry, or another host. A downloadable
archive is the initial recommendation because it does not impose a package manager
on every consumer. Source hosting and distribution do not need to be the same system.

Optional executable helpers document their supported runtime and dependencies.
Ship reproducible dependency manifests/lockfiles where relevant rather than a
machine-specific `node_modules` tree. Do not bundle a runtime merely to read the
design system. Prebuilt CSS/templates can avoid unnecessary authoring tools for
ordinary consumers.

Before calling a package portable, move it to a different path and check its local
references and an actual consumer. Before claiming Windows or native-platform
support, exercise the relevant environment. One Linux schema check proves neither.

## Scope Still Open

The proposed field names and schema are for review. DSDX has no finalized profile
taxonomy, generic extension merge engine, automatic updater, skill package, or
cross-platform renderer. Add tooling in response to real consumers, not to fill
every possible directory in advance.
