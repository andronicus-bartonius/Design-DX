# Using a Design-System Package

## Adopt a Release

1. Choose a trusted release and read its supported profiles, adapters, licenses,
   prerequisites, and limitations. A repository's source ZIP is not necessarily
   its consumer package.
2. Extract the release's single system directory into the project's `.design/`.
   Inspect archive paths before extraction; an imported design package can contain code.
3. Create `.design/project.json` with the exact system version and required targets.
   Use the [configuration reference](../convention/configuration.md) and bundled schema.
4. Point the project's root `AGENTS.md` at the configuration and selected local
   guidance. This does not require an AI harness or a new instruction file if the
   project does not use agents.
5. Follow the selected adapters' integration instructions. Copying a folder does
   not automatically wire application styles, templates, or assets into a build.
6. Choose any verification you want. Leaving it disabled is supported.

No dependency install is needed merely to read the package or select profiles.
An adapter can have ordinary build/runtime prerequisites. A validator can have
separate development prerequisites. Neither should be installed implicitly.

## Project Guidance and Extensions

Add `.design/DESIGN.md` only when there are project decisions to explain. If it is
absent, `project.json` and the selected package entry points are enough.

Create `.design/extensions/` only when needed, and declare it in `project.json`.
Document relevant loading order in the project's integration. This directory can
contain tokens, components, templates, guidance, or tool configuration, but its
presence is not an instruction to merge every file.

For multiple outputs, create separate targets when their selections differ.
Target paths are literal project-relative files or directories. Native tool
configuration controls syntax handling and exclusions; DSDX is not a new glob engine.

## Update Deliberately

1. Preserve the current imported directory and project changes in version control
   or a backup. Check for local edits inside the imported copy.
2. Review the new release's differences, migration notes, and tool requirements.
3. Stage and inspect the new package separately. Keep its identity and declared
   convention version together.
4. Replace only `.design/<system-id>/`; do not overlay files and leave removed
   resources behind. Keep `project.json`, optional `DESIGN.md`, and `extensions/`.
5. Update the exact selected version and make any documented integration changes.
6. Run checks you have chosen and review affected outputs. Report what was not checked.

A compatible update normally replaces one directory and changes one version value.
A removed token, changed component API, or new font requirement can require more.
There is no automatic update service in this convention draft.

## Roll Back

Restore the previous imported directory, version selection, and any integration
changes made for the update. Retain unrelated work. A package directory alone
cannot roll back edits made to the application during migration.
