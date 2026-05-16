# Next Prototype Scope — P3.1 then P4

## Current Product Direction
This prototype is a lightweight, family-friendly creative tool for making magical creatures, turning them into story/activity prompts, and eventually bridging into a simple adventure/storybook flow.

The app should feel playful, fast, forgiving, and usable under real household chaos.

## Strategic Decision
Do **P3.1 UX Improvements first**, then move into **P4 Bridge Plan**.

Reason: P3.1 is high impact and low complexity. It improves the foundation, reduces cognitive load, and creates a design standard that P4 can reuse.

## P3.1 — UX Improvement Sprint
### Goal
Make the prototype easier and more fun for young users and less cognitively demanding for the adult facilitator.

### Scope
- More kid-friendly colors
- Small playful images or icons
- Bigger buttons
- Clearer page hierarchy
- Rewrite descriptions to be warmer, simpler, and more skimmable
- Improve mobile spacing
- Preserve flexible field usage
- Create/update a UX design spec for future reference

### Non-Goals
- No backend
- No user accounts
- No persistent memory
- No complex database
- No AI API integration unless already present and working
- No major architecture rewrite unless required for clean implementation

### Acceptance Criteria
- A user can understand the screen purpose within 3 seconds.
- Buttons are large enough for phone use.
- The app still works even when the adult does not read every instruction.
- The flow feels more playful without becoming visually cluttered.
- Copy is shorter and more child-friendly.
- UX rules are documented in `03_UX_SPEC_KID_FRIENDLY.md`.

## P4 — Bridge Plan
### Goal
Create the transition from creature creation into the next useful output: story, activity page, adventure seed, or printable artifact.

### Scope Direction
P4 should not be a giant feature. It should be a bridge: a simple, visible step that converts the creature profile into the next mode.

Potential bridge outputs:
1. Story prompt
2. Adventure prompt
3. Coloring page prompt
4. Find-things activity prompt
5. Creature card summary

### Recommended P4 MVP
Add a **“What do we make next?”** screen after creature creation.

It offers 3–5 large options:
- Make a Story
- Make an Adventure
- Make a Coloring Page
- Make a Find-It Game
- Make a Creature Card

Each option generates a structured text prompt/output using the existing creature data.

### P4 Acceptance Criteria
- The user can finish a creature and choose a next artifact.
- The bridge reuses the creature’s name, mix, magic, colors, home, and personality.
- Output is copyable.
- Output is clear enough to paste into ChatGPT/image generation later.
- The bridge remains lightweight and does not require backend storage.

## Recommended Build Order for Codex
1. Inspect current app structure.
2. Identify main UI files/components.
3. Implement P3.1 visual/copy improvements first.
4. Add or update UX documentation.
5. Add P4 bridge screen behind a simple button/path.
6. Add generated text output cards for selected artifact types.
7. Test on mobile viewport.
8. Record results in a build log.

## Definition of Done
The prototype should feel like a better toy and a better design artifact. It should be more usable in live play and should clearly point toward story/activity generation without overbuilding.
