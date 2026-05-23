# Magic Creature Card Maker

A lightweight static prototype for parent-guided creative play with children.

The app helps an adult facilitator capture a child's magical creature idea, preserve the exact silly details, generate a kid-safe image prompt, and choose a simple next creative output such as a creature card, story, adventure, coloring page, or find-it game.

## Current Status

Current working version: Prototype 4.3 complete.

Current validation focus: post-creation production, download, and print workflow friction.

The app currently supports:
- Free-text creature creation prompts
- Kid-safe magical creature image prompt generation
- Creature summary and detail recap
- Editable field, suggestion, parent tips, and example content in `content.js`
- Dedicated prompt templates in `promptTemplates.js`
- Shared prompt builder helpers in `promptBuilder.js`
- Compact expandable parent tips near the top of the app
- Picture style suggestion chips
- Copy buttons for generated text
- A lightweight "What do we make next?" bridge
- Deterministic template outputs for Creature Card, Story, Adventure, Coloring Page, Find-It Game, Maze, Letter Tracing, Count the Objects, Find the Letter, Draw the Missing Detail, Trace the Path, Matching Page, and Finish the Pattern
- Local autosave and reload restore for the current creature
- Local saved creature list with save, load, and delete

The app remains intentionally simple. It has no backend, accounts, auth, database, package manager, build step, or AI API integration. Current and saved creature data are stored locally in the browser only.

## How to Run

Open `index.html` in any modern browser.

No build step is required.

## Current App Flow

1. Fill in the creature prompts.
2. Open `Need a tip?` if facilitation guidance would help.
3. Use optional picture style chips if helpful.
4. Tap `Make Creature`.
5. Review the generated image prompt, summary, and details.
6. Optionally save the creature locally for later.
7. Copy the prompt into ChatGPT or another image creator.
8. Choose an output under `What do we make next?`
9. Copy the selected output.

Use `Fill Example` to quickly populate sample creature data for testing.

## Top-Level Docs

- `00_README.md` - repo front door, current status, run instructions, and doc map
- `01_01_PRODUCT_VISION.md` - product intent, target users, long-term ladder, and design principles
- `01_02_PRODUCT_INSIGHTS_DESIGN_SESSION.md` - working insight log from design sessions, P3.1 validation, and early bridge discovery
- `01_03_PRODUCT_ROADMAP.md` - staged roadmap for 3.X foundation, 4.X activity book, 5.X story mode, and deferred ideas
- `02_APP_SPEC.md` - living app spec with current requirements, UX rules, architecture notes, learnings, and open questions
- `03_UX_SPEC.md` - living UX source of truth for copy style, mobile layout, interaction rules, and testing checks
- `04_PROTOTYPE_STARTER.md` - reusable prompt and workflow for launching the next prototype folder
- `05_ARCHITECTURE_SPEC.md` - living architecture source of truth for app structure, data flow, prompt templates, and module boundaries

## Naming Conventions

Top-level numbered docs are the current source of truth:

- `00_...` - repo orientation
- `01_01_...` - product vision
- `01_02_...` - product insights and design-session synthesis
- `01_03_...` - product roadmap
- `02_...` - app spec
- `03_...` - UX spec
- `04_...` - prototype starter prompt and workflow
- `05_...` - architecture spec

Prototype-folder docs are historical records and should use a prototype prefix:

- `P3.1_README.md`
- `P3.1_SCOPE.md`
- `P3.1_P4_BUILD_LOG.md`
- `P3.1_IMPLEMENTATION_REVIEW.md`

Use top-level docs to understand the current app. Use prototype docs to understand how a specific experiment was scoped, built, tested, or reviewed.

## Repository Structure

- `index.html` - static app markup
- `content.js` - editable field text, suggestions, parent tips, style chips, and example values
- `styles.css` - visual styling and mobile layout
- `promptTemplates.js` - prompt/output templates and output-specific prompt-engineering text
- `promptBuilder.js` - shared prompt rendering helpers, missing-value fallback, and template lookup
- `storage.js` - browser localStorage helpers for current creature continuity and saved creatures
- `script.js` - UI rendering, form behavior, data gathering, summary/details, copy actions, reset behavior, and selected output state
- `Docs/Prototype 1` - earlier project history
- `Docs/Prototype 3.0` - prior prototype scope, testing, and implementation context
- `Docs/Prototype 3.1` - historical handoff docs, UX spec, build log, and testing guide
- `Docs/Prototype 3.2` - P3.2 plan, scope, build log, validation results, and implementation review
- `Docs/Prototype 4.0` - P4.0 architecture runway scope, build log, test plan, implementation review, and architecture draft history
- `Docs/Prototype 4.3` - P4.3 save creature, session continuity, saved creatures, and closeout docs

## Key Prototype 3.1 Docs

For the next build or review pass, start in `Docs/Prototype 3.1`:

- `P3.1_README.md` - folder guide
- `P3.1_NEXT_PROTOTYPE_SCOPE.md` - P3.1 and P4 scope decisions
- `P3.1_UX_SPEC_KID_FRIENDLY.md` - historical UX snapshot for this prototype
- `P3.1_P4_BRIDGE_PLAN.md` - bridge concept and output plan
- `P3.1_P4_BUILD_LOG.md` - what changed in the current build
- `P3.1_IMPLEMENTATION_REVIEW.md` - smoke test, mobile review, and live testing guide
- `P3.1_VALIDATION_RESULTS.md` - sanitized validation results, durable findings, and P3.2 recommendation

## Prototype 3.2 Docs

Prototype 3.2 is tracked in `Docs/Prototype 3.2`.

Key docs:

- `P3.2_README.md` - folder guide
- `P3.2_SCOPE.md` - concise scope and acceptance criteria
- `P3.2_PROTOTYPE_PLAN.md` - controlling work package plan
- `P3.2_BUILD_LOG.md` - implementation notes
- `P3.2_VALIDATION_RESULTS.md` - validation status
- `P3.2_IMPLEMENTATION_REVIEW.md` - browser/mobile test checklist

## Prototype 4.0 Docs

Prototype 4.0 is tracked in `Docs/Prototype 4.0`.

Key docs:

- `P4.0_README.md` - folder guide
- `P4.0_SCOPE.md` - architecture runway scope and work packages
- `P4.0_ARCHITECTURE_PLAN.md` - original target architecture plan
- `P4.0_TEST_PLAN.md` - prompt-output and architecture test matrix
- `P4.0_BUILD_LOG.md` - implementation notes
- `P4.0_IMPLEMENTATION_REVIEW.md` - final review and pass decision
- `05_ARCHITECTURE_SPEC_DRAFT.md` - historical draft promoted to top-level `05_ARCHITECTURE_SPEC.md`

## Working Method

Prototype docs are historical experiment records. They capture scope, build notes, test plans, and implementation reviews for a specific prototype.

`02_APP_SPEC.md` is the current product and engineering truth. `03_UX_SPEC.md` is the current UX truth. After each prototype, promote durable decisions into the relevant top-level source-of-truth docs.

Use `04_PROTOTYPE_STARTER.md` for the two-way workflow between ChatGPT design sessions and Codex implementation sessions.

Recommended update loop:

1. Run or test the current prototype.
2. Capture detailed notes in the relevant prototype folder.
3. Identify the durable learnings.
4. Update `02_APP_SPEC.md` and `03_UX_SPEC.md` with the current truth.
5. Use `04_PROTOTYPE_STARTER.md` to launch the next prototype folder from the remaining open questions and highest-friction workflows.

## Direction After Prototype 4.3

Prototype 4.3 successfully added browser-local creature continuity:

- current creature autosave and reload restore
- confirmation before risky overwrite/clear actions
- local saved creature list with save, load, and delete

Recommended next step:

1. Use the saved creature list in real play.
2. Treat post-creation production, downloading, and printing friction as the next workflow problem.
3. Defer JSON export/import unless device transfer becomes a concrete blocker.

Keep the product lightweight until testing shows which next feature is truly needed.
