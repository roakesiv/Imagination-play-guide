# Architecture Spec

Status: Current
Last updated after: Prototype 4.0 architecture runway
Last updated: 2026-05-19

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

Do not add backend services, databases, accounts, auth, storage, package managers, build steps, frameworks, direct AI APIs, or image APIs until testing proves they are needed.

## 3. File Responsibilities

| File | Responsibility |
|---|---|
| `index.html` | Static app shell, semantic structure, and script loading order |
| `content.js` | Editable UI copy, field definitions, suggestions, style chips, parent tips, and example values |
| `promptTemplates.js` | Prompt/output templates and output-specific prompt-engineering text |
| `promptBuilder.js` | Shared prompt rendering helpers, missing-value fallback, template lookup, and defensive template handling |
| `script.js` | UI rendering, DOM event handling, creature data gathering, summary/details rendering, copy/reset behavior, and selected output state |
| `styles.css` | Visual styling, mobile-first layout, responsive behavior, and component states |

## 4. Script Loading Order

`index.html` must load scripts in this order:

```html
<script src="content.js"></script>
<script src="promptTemplates.js"></script>
<script src="promptBuilder.js"></script>
<script src="script.js"></script>
```

Reason:
- `script.js` depends on editable content from `content.js`.
- `promptBuilder.js` depends on templates from `promptTemplates.js`.
- `script.js` depends on builder helpers from `promptBuilder.js`.

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
  pictureStyle: ""
}
```

`script.js` owns the DOM-to-data boundary through `getCreatureData()`.

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

Current state is intentionally simple:

- Form inputs are the source of truth for creature data.
- `currentArtifactType` in `script.js` stores the selected bridge output type.
- Generated outputs live in textareas and visible UI nodes.
- No state is persisted across reloads.

This is sufficient for the current prototype. Local storage or saved creature libraries should wait until testing proves they are useful enough to justify complexity.

## 11. Testing Approach

Testing should scale with the app's current non-functional requirements and architecture runway.

The current app is static, dependency-free, and easy to run manually by opening `index.html`. For focused prompt-template or copy work packages, manual browser smoke testing is the expected baseline. Do not add package dependencies, browser automation, test runners, or developer-environment expansion only to verify small template changes.

Manual smoke testing should cover:

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

## 13. Open Architecture Questions

- Is one `promptTemplates.js` file enough, or should templates later be split by category?
- Should `promptBuilder.js` stay generic, or should output categories eventually have specific builders?
- When does the app need a fuller data model for creature, character, activity, and story?
- When does local storage become useful enough to justify complexity?
- When, if ever, should the app move beyond plain HTML/CSS/JS?
