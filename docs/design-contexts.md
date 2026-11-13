# Design Contexts

A shared design system should keep identity consistent without forcing a touch
panel, a reading page, and a presentation into the same layout.

## Decide What Is Shared

Start with actual materials. Record what is approved, provisional, or merely an
example. Identify who can change each kind of decision without inferring that one
department's output rules govern every other surface.

The foundation may own logo usage, an approved palette, font resources and rights,
and product identity. It need not choose one body font size, one line height, or
one button geometry for every context. Profile-specific choices stay in profiles.

## Define Profiles by Their Job

Consider purpose, audience, interaction, presentation, and environment together.
Examples include long-form reading, a touch-operated control surface, or a dense
keyboard-operated workspace. These are possible contexts, not DSDX's taxonomy.

A desktop application can contain several surfaces. A browser can host anything
from a brochure to an equipment interface. Technology alone is not enough to define
a profile. Start with a few coherent contexts rather than a matrix of every possible
combination.

Profiles contain their own semantic values, layout and component specifications,
interaction states, content guidance, and examples where those are needed. They
are more than a bag of overrides. Use dependency links for genuine reuse, not an
inheritance hierarchy built before there are consumers.

## Keep Adapters Concrete

An HTML adapter might provide styles and components. A document adapter might
provide a reference document and export instructions. A native UI adapter might
provide toolkit resource files. They can share design decisions without sharing
implementation code.

An adapter's integration page identifies supported profiles and combinations,
prerequisites, generated versus authored files, extension loading, and limitations.
Do not claim support for every platform because a JSON file can be read everywhere.

## Avoid Duplicate Authority

Write the palette value once. Reference it in semantic tokens and generate other
representations when practical. Keep rationale in `DESIGN.md`, and link to the
exact data rather than repeating large tables that drift.

Fixed requirements, defaults, and extension points need clear descriptions. DSDX
does not introduce a rules language to replace CSS, native resources, prose, or
existing validators. Automate a rule only when its meaning and applicable scope
are precise enough to test.
