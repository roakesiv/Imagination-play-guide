# Prototype Starter

Status: Current  
Purpose: Use this prompt to launch the next prototype folder and planning pass.

This file is the bridge between design thinking, ChatGPT conversation, and Codex implementation. Use it when you are ready to turn testing notes or design discussion into a new prototype effort.

## Two-Way Workflow

Use ChatGPT for design thinking. Use Codex for repo-aware implementation.

The working loop is:

```text
ChatGPT design session
-> concise handoff
-> Codex prototype planning and implementation
-> updated source-of-truth docs
-> curated context back into ChatGPT
-> next design session
```

This keeps loose creative thinking and concrete repo changes connected without making either workspace carry the full burden.

## Codex To ChatGPT Workflow

Use this when Codex has changed the app, docs, or prototype structure and you want to return to ChatGPT for assessment or planning.

Send ChatGPT a curated context bundle, not the whole repo.

Recommended current-truth bundle:
- `00_README.md`
- `01_01_PRODUCT_VISION.md`
- `01_02_PRODUCT_INSIGHTS_DESIGN_SESSION.md`
- `01_03_PRODUCT_ROADMAP.md`
- `02_APP_SPEC.md`
- `03_UX_SPEC.md`
- `04_PROTOTYPE_STARTER.md`

Recommended latest-prototype bundle:
- `Docs/Prototype X.Y/PX.X_README.md`
- `Docs/Prototype X.Y/PX.X_SCOPE.md` or nearest equivalent
- `Docs/Prototype X.Y/PX.X_BUILD_LOG.md`
- `Docs/Prototype X.Y/PX.X_IMPLEMENTATION_REVIEW.md`

If the prototype used older or extra docs, include only the ones needed to understand the latest assessment or next design decision.

Good kickoff prompt for ChatGPT:

```text
I am moving this project from Codex implementation mode back into ChatGPT design/assessment mode.

The attached docs are the current source of truth and the latest prototype context.

Please help me assess Prototype [X.Y] and plan Prototype [next version].

Use this working model:
- Top-level docs describe the current app truth.
- Prototype docs describe what was tried in a specific experiment.
- Keep the next prototype focused and lightweight.
- Do not suggest major new features unless testing notes clearly justify them.
- Help separate observations, user needs, durable requirements, UX rules, open questions, and deferred ideas.

First, summarize your understanding of the current app and design process.
Then help me review Prototype [X.Y].
After that, help me identify the smallest useful scope for Prototype [next version].
```

Good testing-note shape to paste into ChatGPT:

```text
Prototype being assessed:
Device/context:
Broad participant cohort:
Approximate session length:

Observations:

Friction:

Delight moments:

Fields skipped or confusing:

Bridge outputs used:

What I think this means:

Questions I want help answering:
```

## How To Use

1. Update the prototype number in the prompt.
2. Add any notes from ChatGPT, phone testing, or live play.
3. Paste the prompt into Codex.
4. Let Codex create the new prototype folder and a small set of prototype-specific docs.
5. Keep durable decisions in the top-level source-of-truth docs.

## Recommended Prototype Folder Docs

Each new prototype folder should stay lightweight. Start with only these unless the work clearly needs more:

- `PX.X_README.md` - folder guide and prototype purpose
- `PX.X_SCOPE.md` - goals, non-goals, acceptance criteria, and implementation plan
- `PX.X_BUILD_LOG.md` - what changed, verification, and follow-up issues
- `PX.X_IMPLEMENTATION_REVIEW.md` - smoke test, mobile review, live play notes, and acceptance review

Optional docs:
- `PX.X_CODEX_BUILD_PROMPT.md` - only if you want to preserve a specific build prompt
- `PX.X_RESEARCH_NOTES.md` - only if discovery or testing is substantial enough to keep separate

Do not create a prototype-specific UX spec by default. Durable UX rules should move into `03_UX_SPEC.md`.

## Source-Of-Truth Rule

Top-level docs describe what is true now:

- `00_README.md` - repo orientation
- `01_01_PRODUCT_VISION.md` - product why
- `01_02_PRODUCT_INSIGHTS_DESIGN_SESSION.md` - product insights and design-session synthesis
- `01_03_PRODUCT_ROADMAP.md` - staged roadmap
- `02_APP_SPEC.md` - current app requirements and architecture
- `03_UX_SPEC.md` - current UX rules
- `04_PROTOTYPE_STARTER.md` - reusable launch prompt for the next prototype
- `05_ARCHITECTURE_SPEC.md` - current architecture, data flow, prompt templates, and module boundaries

Prototype folders describe what was tried then.

After each prototype, promote durable decisions into `02_APP_SPEC.md` and `03_UX_SPEC.md`.

Promote durable architecture decisions into `05_ARCHITECTURE_SPEC.md`.

## ChatGPT To Codex Workflow

It is reasonable to keep using ChatGPT on your phone for design thinking, reflection, and planning. That mode is good for low-friction thought capture.

Use Codex in VS Code when you are ready to:

- Create or update repo docs
- Inspect current files
- Make code changes
- Run verification
- Prepare the next prototype folder

Recommended handoff from phone chat to Codex:

1. Ask ChatGPT for a concise handoff summary.
2. Include only sanitized testing notes.
3. Separate observations from decisions.
4. Paste the handoff into the prototype starter prompt below.
5. Let Codex turn it into scoped docs and implementation work.

Good handoff shape:

```text
Prototype being assessed:
Key observations:
Top friction points:
User needs that changed:
UX rules that should become durable:
Ideas to defer:
Recommended next prototype goal:
```

## Starter Prompt

Copy, fill in, and paste this into Codex:

```text
I want to launch Prototype [X.Y] for Magic Creature Card Maker.

Read the top-level source-of-truth docs first:
- 00_README.md
- 01_01_PRODUCT_VISION.md
- 01_02_PRODUCT_INSIGHTS_DESIGN_SESSION.md
- 01_03_PRODUCT_ROADMAP.md
- 02_APP_SPEC.md
- 03_UX_SPEC.md
- 04_PROTOTYPE_STARTER.md
- 05_ARCHITECTURE_SPEC.md

Then review the most recent prototype folder:
- Docs/Prototype [previous version]

Create a new folder:
- Docs/Prototype [X.Y]

Use the prototype naming convention:
- PX.X_README.md
- PX.X_SCOPE.md
- PX.X_BUILD_LOG.md
- PX.X_IMPLEMENTATION_REVIEW.md

Keep this prototype folder lightweight. Do not create extra docs unless the work clearly needs them.

Context from testing/design chat:
[Paste concise notes here. Use sanitized notes only. Do not include exact child ages, names, locations, or personal family details.]

My current goal for Prototype [X.Y]:
[Describe the goal in one or two sentences.]

Known constraints:
- Keep the app lightweight unless testing clearly justifies more complexity.
- Preserve silly child ideas.
- Keep the experience phone-first.
- Avoid backend, accounts, auth, database, persistent storage, package dependencies, or AI API integration unless explicitly justified.
- Promote durable requirements into 02_APP_SPEC.md.
- Promote durable UX rules into 03_UX_SPEC.md.
- Promote durable architecture decisions into 05_ARCHITECTURE_SPEC.md.

Please act as a software engineering manager and product-minded implementation partner.

First:
1. Assess the current docs and app state.
2. Create the new prototype folder and starter docs.
3. Propose the smallest useful Prototype [X.Y] scope.

Then, unless I ask you to pause:
4. Implement the scoped prototype changes.
5. Update the prototype build log.
6. Update 02_APP_SPEC.md and 03_UX_SPEC.md with durable changes.
7. Update 05_ARCHITECTURE_SPEC.md if architecture changes.
8. Run available verification.
9. Summarize changed files, verification, and remaining risks.
```

## Prototype 4.0 Starter Notes

Use this section when launching Prototype 4.0.

Current likely inputs:
- Prototype 3.1 validation
- Prototype 3.2 results, if P3.2 is complete or explicitly paused
- `Docs/Prototype 3.1/P3.1_VALIDATION_RESULTS.md`
- `Docs/Prototype 3.2/P3.2_PROTOTYPE_PLAN.md`
- Open questions in `02_APP_SPEC.md`
- UX testing checklist in `03_UX_SPEC.md`

Likely Prototype 4.0 decision area:
- Whether the bridge should become a focused activity-book flow
- Which initial activity outputs are worth improving first
- Whether coloring/find-it should be pruned, rewritten, or expanded with maze and tracing
- Whether step navigation, shorter flow, or better output previews are justified after P3.2

Keep Prototype 4.0 focused on the highest-friction finding from testing.
