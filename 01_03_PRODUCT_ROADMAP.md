# Product Roadmap — Imagination Play Guide / Magic Creature Card Maker

**Status:** Working roadmap  
**Purpose:** Capture the current staged direction without over-expanding active scope.

---

## Roadmap Summary

The current roadmap is:

```text
3.X — Foundation, UX, and Maintainability
4.X — MVP Activity Book
5.X — Story Mode
Future — Persistence, printing, direct generation, richer books
```

The core product direction is:

> Reduce the effort required for a parent to start and sustain creative imaginative play with young children.

---

## 1. 3.X — Foundation, UX, and Maintainability

### Goal

Make the current creature creation app usable, maintainable, documented, and stable enough to support future activity-book and story features.

### Product Purpose

Reduce parent cognitive load during creature creation.

### Process Purpose

Establish a reusable prototype development system and app foundation.

### In Scope

- UX improvements.
- Mobile-first usability.
- Kid-friendly visual improvements.
- Button clarity.
- Prompt-only workflow clarity.
- Editable text/content architecture.
- Rewriting field questions and suggestions.
- File structure improvements.
- GitHub project hygiene.
- Documentation numbering.
- Top-level source-of-truth docs.
- App spec.
- UX spec.
- Prototype starter kit.
- Implementation review pattern.

### Out of Scope

- New activity types.
- Full story mode.
- Direct image generation.
- Saved creature library.
- Printing support.
- PDF export.
- Backend, accounts, auth, database, storage.
- Framework migration.

### Key Outputs

- `00_README.md`
- `01_01_PRODUCT_VISION.md`
- `01_02_PRODUCT_INSIGHTS_DESIGN_SESSION.md`
- `01_03_PRODUCT_ROADMAP.md`
- `02_APP_SPEC.md`
- `03_UX_SPEC.md`
- `04_PROTOTYPE_STARTER.md`
- editable content structure
- current static app
- prototype folder pattern
- validation/test result docs

### Current 3.X Status

In work.

P3.1 improved the UX and added a bridge spike. P3.2 is planned as a targeted content, copy, and usability refinement.

### 3.X Done When

```text
The creature creation flow is usable on phone, easy to revise, documented, and stable enough to build activity-book features on top of it.
```

If P3.2 completes this, 3.X can close. If not, continue with targeted 3.3/3.x work only.

---

## 2. 4.X — MVP Activity Book

### Goal

Generate a small set of useful activity-page prompts from one creature.

### Product Purpose

Convert creature excitement into usable kid activity artifacts.

### Scope Constraint

Stay focused.

Initial 4.X activity types:

1. Coloring page
2. Find-it page
3. Maze
4. Letter tracing

No more activity types until these are reliable.

### Why This Comes Next

Bridge testing showed:

- printed pages were very exciting
- children loved having multiple pages
- physical outputs help move play away from the phone
- current coloring/find-it prompts are not good enough
- parent prompt-engineering burden increases as output types multiply

The key 4.X value is embedded prompt engineering.

### Key Learning Questions

- Can one creature’s attributes generate multiple useful activity pages?
- Can the app manage different prompt types without parent prompt-engineering?
- Can prompts reliably produce age-appropriate, simple printable outputs?
- Does ChatGPT context contamination affect later prompts in the same thread?
- Do prompts need “start fresh” or “ignore previous image style” instructions?
- Should the activity book be generated as multiple prompts or one package prompt?
- Does the activity book reduce the repeated creature-generation loop?
- Does the activity output create useful off-phone play?

### Activity Type Requirements

#### 4.X Coloring Page

Prompt must emphasize:

- black and white
- printable coloring page
- clean bold outlines
- simple shapes
- open spaces for coloring
- minimal background clutter
- no heavy shading
- no dense detail
- non-scary kid-friendly style

#### 4.X Find-It Page

Prompt must emphasize:

- child-friendly hidden-object activity page
- clear objects to find
- readable scene
- appropriate object count
- not too visually dense
- safe, whimsical details
- optional black-and-white or color mode

#### 4.X Maze

Prompt should include:

- creature at start
- home/object/friend at finish
- simple maze path
- thick clear lines
- age-appropriate difficulty
- printable black-and-white layout
- no tiny corridors

#### 4.X Letter Tracing

Prompt should include:

- large traceable letters
- creature name or selected word
- dotted or dashed tracing guides
- simple companion creature illustration
- writing-practice layout
- age-appropriate simplicity

### 4.X Done When

```text
A parent can create a creature and generate a small set of reliable, kid-usable activity page prompts without knowing prompt engineering.
```

### 4.X Non-Goals

- Full print workflow.
- PDF export.
- Ten-page book.
- Direct image API.
- Saved library.
- Story mode.
- New activity types beyond the four listed.

### Possible 4.X Sequence

#### P4.0 — Activity Prompt Quality

Focus:

- improve coloring prompt
- improve find-it prompt
- define printable prompt standard
- test output quality

#### P4.1 — Add Maze + Letter Tracing

Focus:

- add two additional activity types
- keep prompt generation deterministic
- test whether creature data maps well to new pages

#### P4.2 — Small Activity Pack

Focus:

- generate a small multi-page activity set from one creature
- possibly 4 pages only:
  1. coloring
  2. find-it
  3. maze
  4. tracing

#### P4.3+ — Activity Book Refinement

Only if needed:

- simplify outputs by cohort
- add difficulty setting
- improve prompt isolation
- improve downloadable/printable workflow notes

---

## 3. 5.X — Story Mode

### Goal

Help the parent guide structured imaginative play, not just generate artifacts.

### Product Purpose

Turn a creature into a guided story/adventure session with much lower parent cognitive load.

### Why This Comes After 4.X

Story mode is central to the long-term vision, but bridge testing showed that printable activities are an immediate high-delight need. 4.X builds reliable artifacts first, then 5.X returns to structured storytelling.

### Initial Story Modes

1. House Adventure
2. Bedtime Story

---

### 5.X House Adventure

House Adventure is a parent-guided live-play mode.

Possible structure:

1. A creature/friend has a problem.
2. The child becomes an adventurer.
3. Child chooses adventurer type, magic, gear, color, and name.
4. The adventure moves through rooms/environments.
5. Each room has a hazard or challenge.
6. Child uses magic/gear/creativity to overcome the challenge.
7. Child collects needed items.
8. Child returns to creature/friend.
9. Magic solution is completed.
10. Adventure ends with celebration.

Possible room/environment examples:

- icy cave
- mountain stairs
- volcano room
- jungle room
- underwater room
- cloud castle
- candy cave

Future delight idea:

- simple map generation

---

### 5.X Bedtime Story

Bedtime Story should likely be a separate mode.

Possible structure:

1. Cozy setting.
2. Gentle problem.
3. Soft choice.
4. Magical help.
5. Warm resolution.
6. Sleep-friendly ending.

Design requirement:

- calmer than House Adventure
- lower energy
- shorter
- soothing
- not over-stimulating

### 5.X Done When

```text
A parent can start and guide a short structured story/adventure using the app without needing to invent the whole plot live.
```

### 5.X Non-Goals

- Full game engine.
- Complex rules.
- Character stats.
- Combat system.
- Saved campaign system.
- Full storybook generation.

---

## 4. Near-Term Future

These are promising after 4.X and 5.X basics work.

### More Stories

- additional adventure templates
- different problem types
- seasonal adventures
- cozy bedtime variations
- silly quest structures

### 10-Page Activity Book

Expand from 4-page MVP to a fuller activity book.

Possible pages:

1. creature profile card
2. coloring page
3. find-it page
4. maze
5. letter tracing
6. counting page
7. matching page
8. draw the missing accessory
9. simple story prompt
10. certificate / “I made this creature” page

### Kid Adventurer / Party Creation

Move beyond creature-only creation.

Possible additions:

- child adventurer avatar
- magic type
- gear
- color
- companion creature
- party of characters

---

## 5. Important Infrastructure

### Printing Friction

Printing is a serious future need.

Current friction:

- image generated in ChatGPT
- image must be downloaded
- may need transfer from phone to laptop
- printing depends on device/printer setup
- parent workflow is too manual

Future directions:

- print-friendly output instructions
- image download guidance
- PDF export
- browser print view
- multi-page printable pack
- direct printer integration
- print-service integration

Do not solve this too early, but keep it visible. Printable outputs create high child delight, so printing friction may become a major adoption blocker.

---

## 6. Dream Features

These are not near-term scope, but they define the long-term product imagination.

### Saved Information for Reuse

- saved creatures
- saved child adventurers
- saved parties
- saved activity books
- saved stories
- reusable family world

### Activity Book + Story Combination

- creature creation feeds activity book
- activity book feeds story
- story feeds printable book
- child’s choices become part of the final artifact

### Personalized Kids Book

- generated story
- generated images
- page layout
- printable/exportable book
- possible ordering pipeline

### Direct Image Generation

- app connects to image-generation API
- removes copy/paste friction
- creates images inside app

### Printer Connection

- direct print from app
- print package generation
- printer or print-service integration

---

## 7. Roadmap Discipline Rules

### Rule 1 — Finish 3.X Foundation Before 4.X Expansion

Do not build activity-book features on unstable copy/content architecture.

### Rule 2 — Keep 4.X Activity Book Tight

Only four activity types:

1. Coloring
2. Find-it
3. Maze
4. Letter tracing

No extra activity types until those work.

### Rule 3 — Prompt Engineering Is Product Work

Each output type needs designed prompt templates.

Do not rely on the parent to know how to prompt for each artifact.

### Rule 4 — Test Physical Artifact Value

Printed pages create strong delight, but workflow friction is real.

Test artifact quality before building print infrastructure.

### Rule 5 — Story Mode Is Important, But Not Yet

Story mode remains central to the vision, but it should follow the activity-book MVP unless testing changes the priority.

### Rule 6 — Do Not Confuse Dream Features With MVP

Saved libraries, direct AI, printer connection, and books are powerful ideas, but they should remain deferred until the basic loops are validated.

---

## 8. Current Recommended Next Step

Complete P3.2.

P3.2 should:

- clarify prompt-only workflow
- centralize editable text
- rewrite field copy/suggestions
- improve button color differentiation
- fix header readability
- update docs

After P3.2, move into 4.X Activity Book planning.
