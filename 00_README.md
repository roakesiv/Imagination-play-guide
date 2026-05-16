# Magic Creature Card Maker

A lightweight static prototype for parent-guided creative play with children.

The app helps an adult facilitator capture a child's magical creature idea, preserve the exact silly details, generate a kid-safe image prompt, and choose a simple next creative output such as a creature card, story, adventure, coloring page, or find-it game.

## Current Status

Current working version: Prototype 3.1 UX pass plus P4 bridge MVP.

The app currently supports:
- Free-text creature creation prompts
- Kid-safe magical creature image prompt generation
- Creature summary and detail recap
- Picture style suggestion chips
- Copy buttons for generated text
- A lightweight "What do we make next?" bridge
- Deterministic template outputs for Creature Card, Story, Adventure, Coloring Page, and Find-It Game

The app remains intentionally simple. It has no backend, accounts, auth, database, persistent storage, package manager, build step, or AI API integration.

## How to Run

Open `index.html` in any modern browser.

No build step is required.

## Current App Flow

1. Fill in the creature prompts.
2. Use optional picture style chips if helpful.
3. Tap `Make Creature`.
4. Review the generated image prompt, summary, and details.
5. Choose an output under `What do we make next?`
6. Copy the selected output.

Use `Fill Example` to quickly populate sample creature data for testing.

## Top-Level Docs

- `00_README.md` - repo front door, current status, run instructions, and doc map
- `01_PRODUCT_VISION.md` - product intent, target users, long-term ladder, and design principles
- `02_APP_SPEC.md` - living app spec with current requirements, UX rules, architecture notes, learnings, and open questions
- `03_UX_SPEC.md` - living UX source of truth for copy style, mobile layout, interaction rules, and testing checks
- `04_PROTOTYPE_STARTER.md` - reusable prompt and workflow for launching the next prototype folder

## Naming Conventions

Top-level numbered docs are the current source of truth:

- `00_...` - repo orientation
- `01_...` - product vision
- `02_...` - app spec
- `03_...` - UX spec
- `04_...` - prototype starter prompt and workflow

Prototype-folder docs are historical records and should use a prototype prefix:

- `P3.1_README.md`
- `P3.1_SCOPE.md`
- `P3.1_P4_BUILD_LOG.md`
- `P3.1_IMPLEMENTATION_REVIEW.md`

Use top-level docs to understand the current app. Use prototype docs to understand how a specific experiment was scoped, built, tested, or reviewed.

## Repository Structure

- `index.html` - static app markup
- `styles.css` - visual styling and mobile layout
- `script.js` - form behavior, prompt generation, bridge output templates, copy actions
- `Docs/Prototype 1` - earlier project history
- `Docs/Prototype 3.0` - prior prototype scope, testing, and implementation context
- `Docs/Prototype 3.1` - current handoff docs, UX spec, build log, and testing guide

## Key Prototype 3.1 Docs

For the next build or review pass, start in `Docs/Prototype 3.1`:

- `P3.1_README.md` - folder guide
- `P3.1_NEXT_PROTOTYPE_SCOPE.md` - P3.1 and P4 scope decisions
- `P3.1_UX_SPEC_KID_FRIENDLY.md` - historical UX snapshot for this prototype
- `P3.1_P4_BRIDGE_PLAN.md` - bridge concept and output plan
- `P3.1_P4_BUILD_LOG.md` - what changed in the current build
- `P3.1_IMPLEMENTATION_REVIEW.md` - smoke test, mobile review, and live testing guide

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

## Direction Toward Prototype 4.0

Prototype 4.0 should build from the Prototype 3.1 testing results and the living app spec.

Recommended next step:

1. Test Prototype 3.1 on phone.
2. Fill in `Docs/Prototype 3.1/P3.1_IMPLEMENTATION_REVIEW.md`.
3. Identify the top friction points.
4. Update `02_APP_SPEC.md` and `03_UX_SPEC.md` with durable learnings.
5. Use those findings to define Prototype 4.0.

Keep the product lightweight until testing shows which next feature is truly needed.
