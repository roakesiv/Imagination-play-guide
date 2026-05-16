# Codex Build Prompt — Next Prototype

Use this prompt to start the next Codex session.

---

You are helping build the next prototype of a lightweight kid-friendly magical creature creation web app.

## Context
The app is used by an adult facilitator on a phone with young children participating creatively. The experience must be fast, forgiving, playful, and low cognitive load. The adult may skim or ignore detailed instructions during real use, so the UI must work as a creative scaffold rather than a strict form.

## Product Direction
Build the next prototype in this order:

1. **P3.1 UX Improvements**
2. **P4 Bridge from creature creation to creative output**

Read these project docs first:
- `01_SANITIZED_TEST_RESULTS_UPDATE.md`
- `02_NEXT_PROTOTYPE_SCOPE.md`
- `03_UX_SPEC_KID_FRIENDLY.md`
- `04_P4_BRIDGE_PLAN.md`

## P3.1 Goals
Improve the current app UX:
- More kid-friendly colors
- Small playful icons/images where useful
- Bigger buttons
- Better mobile spacing
- Shorter and warmer copy
- Clearer visual hierarchy
- Preserve flexible field usage

Do not overbuild. Avoid backend, accounts, auth, database, or complex state management.

## P4 Goals
Add a lightweight bridge after creature creation:

Screen title:
> What do we make next?

Add large option cards for outputs such as:
- Creature Card
- Story
- Adventure
- Coloring Page
- Find-It Game

When the user chooses an option, generate a deterministic/template-based text output using the creature data already entered. Show the output in a readable card with a Copy button.

## Constraints
- Mobile-first
- Kid-safe
- Low cognitive load
- Keep existing app architecture unless a small refactor is clearly justified
- No backend
- No AI API required
- Preserve silly, absurd, or unusual child ideas
- Do not document exact child ages or personal family details in logs

## Acceptance Criteria
- App is easier and more playful on mobile.
- Primary actions are obvious and easy to tap.
- Copy is short and friendly.
- Creature creation still works.
- A completed creature can flow into the bridge screen.
- At least 3 output types work.
- Generated output uses the entered creature data.
- Output can be copied.
- Update or create a brief build log describing what changed and any follow-up issues.

## Working Method
1. Inspect the codebase.
2. Identify current app structure and UI entry points.
3. Make the smallest clean changes needed for P3.1.
4. Add P4 bridge in the simplest maintainable way.
5. Run available tests/lint/build commands.
6. Fix obvious errors.
7. Summarize changed files and remaining risks.

## Definition of Done
The prototype feels more like a usable creative toy and less like a form. It should support a real-world play session with minimal adult prep and provide a clear path from creature idea to useful creative output.
