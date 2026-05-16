# Magic Creature Card Maker

A lightweight static prototype for parent-guided creative play with children.

The app helps an adult facilitator capture a child's magical creature idea, preserve the exact silly details, generate a kid-safe image prompt, and choose a simple next creative output such as a creature card, story, adventure, coloring page, or find-it game.

## Current Prototype
The current working version is Prototype 3.1.

Prototype 3.1 focuses on:
- More playful, mobile-friendly UX
- Shorter and warmer prompt copy
- Larger buttons and choice cards
- A colorful background with rainbow, tree, and star motifs
- Prompt wording that uses "the magic creature" instead of "it"
- A lightweight "What do we make next?" bridge after creature creation
- Deterministic text outputs with copy buttons

The app remains intentionally simple: no backend, accounts, auth, database, persistent storage, packages, or AI API integration.

## How to Run
Open `index.html` in any modern browser.

No build step is required.

## Current App Flow
1. Fill in free-text creature prompts.
2. Tap `Make Creature`.
3. Review the generated image prompt, summary, and details.
4. Choose a next output under `What do we make next?`
5. Copy the selected output.

Use `Fill Example` to quickly populate sample creature data for testing.

## Repository Structure
- `index.html` - static app markup
- `styles.css` - visual styling and mobile layout
- `script.js` - form behavior, prompt generation, bridge output templates, copy actions
- `Docs/Prototype 3.0` - prior prototype scope, testing, and implementation context
- `Docs/Prototype 3.1` - current handoff docs, UX spec, build log, and testing guide
- `Docs/Prototype 1` - earlier project history

## Key Prototype 3.1 Docs
For the next build, start in `Docs/Prototype 3.1`:
- `README_3.1.md` - folder guide
- `03_UX_SPEC_KID_FRIENDLY.md` - current UX rules
- `04_P4_BRIDGE_PLAN.md` - bridge concept and output plan
- `06_P3_1_P4_BUILD_LOG.md` - what changed in the current build
- `07_P3_1_IMPLEMENTATION_REVIEW.md` - smoke test, mobile review, and live testing guide

## Direction Toward Prototype 4.0
Prototype 4.0 should build from the Prototype 3.1 folder and testing results.

Recommended next step:
1. Test Prototype 3.1 on phone.
2. Fill in `07_P3_1_IMPLEMENTATION_REVIEW.md`.
3. Identify the top friction points.
4. Use those findings to define Prototype 4.0.

Keep the product lightweight until testing shows which next feature is truly needed.
