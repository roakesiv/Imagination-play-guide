# Architecture Spec

Status: Current
Last updated after: Prototype 4.4 Activity Age Range Selector
Last updated: 2026-05-24

This is the living architecture source of truth for Magic Creature Card Maker. Prototype folders preserve implementation history. This file captures the current app structure, module boundaries, data contract, prompt-output flow, and architecture constraints.

Related source-of-truth docs:
- `00_README.md` captures repo orientation and run instructions.
- `02_APP_SPEC.md` captures current product and engineering requirements.
- `03_UX_SPEC.md` captures current UX, copy, layout, and interaction rules.
- `04_PROTOTYPE_STARTER.md` captures the repeatable prototype workflow.

## 1. Architecture Purpose

The architecture should answer:

```text
How does the app turn child-created creature attributes into copyable creative outputs?
```

The current answer is:

```text
Creation inputs
-> structured creature data
-> selected output type
-> prompt template
-> prompt builder
-> copyable output
```

## 2. Static App Constraint

The app should remain:

- static
- dependency-free
- GitHub Pages compatible
- easy to run by opening `index.html`
- understandable by a solo builder
- simple enough for Codex to modify safely with good docs

Do not add backend services, databases, accounts, auth, package managers, build steps, frameworks, direct AI APIs, or image APIs until testing proves they are needed. Browser local storage is allowed for current creature continuity.

## 3. File Responsibilities

| File | Responsibility |
|---|---|
| `index.html` | Static app shell, semantic structure, and script loading order |
| `content.js` | Editable UI copy, field definitions, suggestions, style chips, parent tips, and example values |
| `promptTemplates.js` | Prompt/output templates and output-specific prompt-engineering text |
| `promptBuilder.js` | Shared prompt rendering helpers, missing-value fallback, template lookup, and defensive template handling |
| `storage.js` | Browser localStorage helpers for current creature and saved creature list behavior |
| `script.js` | UI rendering, DOM event handling, creature data gathering, summary/details rendering, copy/reset behavior, and selected output state |
| `styles.css` | Visual styling, mobile-first layout, responsive behavior, and component states |

## 4. Script Loading Order

`index.html` must load scripts in this order:

```html
<script src="content.js"></script>
<script src="promptTemplates.js"></script>
<script src="promptBuilder.js"></script>
<script src="storage.js"></script>
<script src="script.js"></script>
```

Reason:
- `script.js` depends on editable content from `content.js`.
- `promptBuilder.js` depends on templates from `promptTemplates.js`.
- `storage.js` does not depend on app content or prompt helpers.
- `script.js` depends on builder helpers from `promptBuilder.js`.
- `script.js` optionally uses persistence helpers from `storage.js`.

## 5. Creature Data Contract

Prompt templates and builder helpers consume a creature data object. Templates should not query DOM fields directly.

Required keys:

| Key | Meaning |
|---|---|
| `name` | Creature name |
| `creatureMix` | Creature type / hybrid mix |
| `magic` | Magic or power |
| `colors` | Color rules |
| `home` | Home / habitat |
| `personality` | What the creature is like |
| `accessories` | Worn or carried items |
| `extraDetail` | Extra silly/magical detail |
| `activityAgeRange` | Parent-facing age/school range for printable activity complexity |
| `pictureStyle` | Visual style / vibe |

Conceptual shape:

```js
{
  name: "",
  creatureMix: "",
  magic: "",
  colors: "",
  home: "",
  personality: "",
  accessories: "",
  extraDetail: "",
  activityAgeRange: "Preschool — ages 3–4",
  pictureStyle: ""
}
```

`script.js` owns the DOM-to-data boundary through `getCreatureData()`.

`activityAgeRange` defaults to `Preschool — ages 3–4` and is included in current and saved creature data. It is intentionally consumed only by printable activity outputs and the Activity Book Packet, not by the main creature image prompt, Creature Card, Story, or Adventure.

## 6. Missing Values

Missing values render as:

```text
not specified
```

`promptBuilder.js` is the shared source for this fallback. Prompt templates receive fallback behavior through builder helpers instead of defining their own fallback logic.

## 7. Prompt Template Contract

Each output template should be easy to find and edit in `promptTemplates.js`.

Current template shape is intentionally lightweight:

```js
{
  title: "Story",
  build(creatureData, helpers) {
    return "...";
  }
}
```

Templates should:
- consume `creatureData`
- use builder helpers for missing-value fallback
- preserve child-created details
- include kid-safety guardrails where relevant
- stay deterministic and template-based until testing justifies more complexity
- avoid DOM access

## 8. Prompt Builder Responsibilities

`promptBuilder.js` owns shared prompt-output helper behavior:

- `promptValue(value)` for missing-value fallback
- `buildImagePrompt(creatureData)` for image prompt rendering
- `buildArtifactOutput(type, creatureData)` for selected bridge output rendering
- template lookup and minimal defensive checks

The builder should stay small. It should not become a framework, state manager, or product rules engine.

## 9. Current Output Types

Current outputs:

- Image Prompt / Creature Profile Card
- Activity Book Packet
- Creature Card
- Story
- Adventure
- Coloring Page
- Find-It Game
- Maze
- Letter Tracing
- Count the Objects
- Find the Letter
- Draw the Missing Detail
- Trace the Path
- Matching Page
- Finish the Pattern

Do not add new output types inside architecture work packages. New outputs belong in product-scoped prototypes.

## 10. State Model

Current state remains intentionally simple:

- Form inputs are the source of truth for creature data.
- `currentArtifactType` in `script.js` stores the selected bridge output type.
- Generated outputs live in textareas and visible UI nodes.
- Current creature form data is autosaved to browser local storage.
- Current creature form data is restored on page load when saved data exists.
- Reset clears the saved current creature.
- Saved creature records are stored in a separate browser local storage list.
- Saved creature records include an id, display name, creature data, and timestamps.
- Generated image prompts and bridge outputs are not persisted; they can be regenerated from restored creature data.

This is sufficient for P4.3 local persistence. Accounts, cloud sync, backend databases, and profiles remain out of scope.

## 11. Testing Approach

Testing should scale with the app's current non-functional requirements, risk, and architecture runway.

The current app is static, dependency-free, and easy to run manually by opening `index.html`. Browser smoke testing is not required for every work package. For narrow static-app changes, docs updates, prompt-template edits, or isolated UI wiring, static implementation review and file-reference checks are usually enough.

Manual browser review is appropriate when a change affects broad runtime behavior, visual layout, touch ergonomics, clipboard behavior, local storage behavior that needs product-owner confidence, or final prototype acceptance. Do not add package dependencies, browser automation, test runners, or developer-environment expansion only to verify small changes.

When manual browser review is used, it can cover:

- app loads locally by opening `index.html`
- creature creation
- prompt-only workflow
- creature summary and detail recap
- all current bridge output types
- missing-field behavior
- copy and reset behavior
- selected bridge output refresh after regenerating
- mobile sanity after publish

Automated browser testing can be reconsidered later if a future NFR, larger runtime change, framework migration, or dedicated architecture work package justifies the tooling.

Prototype-specific test matrices live in prototype folders. Durable architecture requirements live here.

## 12. Architecture Decisions

### Decision: Keep The App Static

Reason:
The product is still in prototype learning mode and does not require backend or build complexity.

### Decision: Separate Editable UI Content From Behavior Logic

Reason:
Field text, examples, parent tips, markers, and chips change often during validation. They should remain editable without hunting through event logic.

### Decision: Separate Prompt Templates From UI Behavior

Reason:
Activity Book and Story Guide features will require more prompt templates. Keeping templates in UI event code would create maintainability problems.

### Decision: Use Local File Boundaries Instead Of Microservices

Reason:
The project benefits from service-boundary thinking through simple file/module responsibilities without adding distributed-system complexity.

### Decision: Defer Frameworks And Build Tooling

Reason:
The current app is small, static, and easy to run. Framework or build complexity should wait until repeated feature work proves plain HTML/CSS/JS is a constraint.

### Decision: Use Browser Local Storage For Current Creature Continuity

Reason:
P4.2 live testing showed that interrupted family play can lose valuable creature data. Browser local storage solves reload recovery while preserving the static, dependency-free architecture and avoiding accounts, backend services, or cloud sync.

### Decision: Keep Saved Creatures Local And Profile-Free

Reason:
Multiple children may each want a creature, but P4.3 does not need accounts or child profiles. A simple local saved creature list supports switching creatures while avoiding personal child data and backend complexity.

### Decision: Defer JSON Export / Import

Reason:
Export/import can move creature data between devices, but it adds another manual transfer step. P4.3 solved the immediate local continuity need, while the larger product direction is to automate post-creation production work rather than add more handoffs.

## 13. Open Architecture Questions

- Is one `promptTemplates.js` file enough, or should templates later be split by category?
- Should `promptBuilder.js` stay generic, or should output categories eventually have specific builders?
- When does the app need a fuller data model for creature, character, activity, and story?
- When does saved creature management need export/import, device transfer, or sync rather than browser-local storage?
- What architecture would support tracking generated images or print-production status without overbuilding?
- When, if ever, should the app move beyond plain HTML/CSS/JS?
