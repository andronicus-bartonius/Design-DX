# Working in Design-DX

- Keep this repository a brand-neutral convention and template. Do not import
  company branding, proprietary fonts, private source paths, or customer data.
- Public documentation describes project behavior and declared requirements, not
  the maintainer's personal tools, environment, employer, or future plans. Do not
  turn conversation context into public project facts. Preserve required license
  and third-party attribution.
- Read `convention/CONVENTION.md` and the affected reference page before editing
  formats. Update schemas and examples together; label draft format changes.
- Keep `AGENTS.md` at the workspace/repository root. `.agents/` is for skills and
  agent-specific records, not a replacement discovery location for this file.
- Project `.design/DESIGN.md` and `.design/extensions/` are optional. Exact
  selections live in `project.json`; do not create empty scaffolding to fill a tree.
- Validation is opt-in. Do not install dependencies, run imported package code,
  fetch assets, or add build gates merely because a preset exists.
- Use TypeScript and Deno for this repository's optional executable tooling.
  Keep runtime prerequisites in setup instructions, not a comparison of alternatives.
  Reading and consuming design packages must not require Deno.
- Use the direct Deno commands in `tests/README.md`. Verify empty-cache behavior
  before introducing task wrappers; dependency flags inside a task may not govern
  the task runner's own dependency resolution.
- Keep public maintainer/reference material in `docs/` and normative material in
  `convention/`. Use `.agents/` only for useful internal task records.
- Preserve the standalone example's copy of the convention and schemas when
  updating their canonical files. Compare the copies before claiming consistency.
- Report what was actually checked. Schema validity is not token conformance,
  rendered quality, accessibility conformance, or agent behavior proof.
- Do not initialize/publish a Git repository, commit, install skills, add CI, or
  select a license without the maintainer's authorization.
