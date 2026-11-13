# Agents and Skills

DSDX uses files an agent or a human can inspect. It does not depend on a Letta,
GitHub, or future platform API to interpret the design system.

## Root Discovery

Keep agent instructions at the project/workspace root. A suitable addition to an
existing `AGENTS.md` is:

```markdown
## Design

Read `.design/project.json` before design work. If `.design/DESIGN.md` exists,
read its project-specific guidance. Then read the imported system's `DESIGN.md`
and the entry points selected for the affected target.

Use declared project extensions without editing the imported release. Do not
fetch a newer version, install tools, or run imported code without authorization.
Verification presets are available choices, not automatic build gates.
```

Adapt the pointer to the harness's actual discovery rules. Do not replace an
existing root instruction file or assume a nested `.agents/AGENTS.md` is equivalent.
Project skills can live in `.agents/skills/` where supported. Their discovery is
separate from DSDX package discovery.

## Skill Responsibilities

Future skills can cover two workflows:

- **Maintain a design system:** inspect accepted material, identify scope and
  authority, update the convention-bound package and examples, and review affected
  outputs before proposing a release.
- **Apply a design system:** inspect project selection, follow the local version,
  use existing project implementation mechanisms, and perform authorized checks.

Skills accept a local package/configuration location and remain brand-neutral.
They do not carry a second copy of brand rules or have undeclared dependencies on
sibling skill directories. No skills are installed or authored by this draft.

## Authority and Evidence

Package instructions do not override the project's execution permissions. A
manifest may describe validation but cannot authorize a network request, process
execution, dependency installation, publication, or file deletion.

An agent should identify the target and exact package release it used. Report
decisions and checks that remain provisional. Structural checks do not show that
an agent will follow the guidance, and an agent's approval does not prove rendered
quality or accessibility.

Private upstream access is needed for authorized import/update operations, not
for routine reading of a checked-in package. Do not store credentials in a package.
