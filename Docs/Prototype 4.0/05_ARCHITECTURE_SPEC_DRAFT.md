# 05 Architecture Spec — Draft

**Project:** Magic Creature Card Maker / Imagination Play Guide  
**Status:** Historical draft; promoted to top-level `05_ARCHITECTURE_SPEC.md` during WP6
**Purpose:** Capture current architecture truth and intended modular boundaries.

Canonical current architecture spec:

```text
05_ARCHITECTURE_SPEC.md
```

---

## 1. Purpose

This document explains how the app’s content, data, prompt templates, prompt builder logic, UI behavior, and tests fit together.

Use this file to answer:

> How does the app turn child-created creature attributes into copyable creative outputs?

---

## 2. Current Architecture Goal

The app should support this flow:

```text
Creation inputs
→ structured creature data
→ selected output type
→ prompt template
→ generic prompt builder
→ copyable output
```

---

## 3. Current Static App Constraint

The app should remain:

- static
- dependency-free
- GitHub Pages compatible
- easy to run by opening `index.html`
- understandable by a solo builder
- simple enough for Codex to safely modify with good docs

No backend, database, accounts, storage, build step, framework, or direct AI API should be added until testing proves they are needed.

---

## 4. File Responsibilities

| File | Responsibility |
|---|---|
| `index.html` | App shell and script loading |
| `content.js` | Editable UI copy, field definitions, suggestions, style chips, parent tips, examples |
| `promptTemplates.js` | Prompt/output templates and prompt-engineering text |
| `promptBuilder.js` | Generic helpers that assemble outputs from templates and creature data |
| `script.js` | UI rendering, event handling, copy/reset behavior, selected output state |
| `styles.css` | Visual styling and mobile layout |

---

## 5. Creature Data Contract

All prompt templates should consume a creature data object.

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

Missing values should render as:

```text
not specified
```

---

## 6. Prompt Template Contract

Each output template should have:

- `id`
- `title`
- `category`
- output builder or template text
- kid-safety guardrails when relevant
- output-specific requirements

Templates should not query DOM.

Templates should consume creature data passed from UI logic.

---

## 7. Common Output Requirements

All outputs should:

- preserve child-created details
- handle missing fields
- be kid-safe
- be copyable
- use the current creature data
- avoid requiring parent prompt engineering
- stay deterministic/template-based until testing justifies more complexity

---

## 8. Current Output Types

Current outputs:

- Image Prompt / Creature Profile Card
- Creature Card
- Story
- Adventure
- Coloring Page
- Find-It Game

Future outputs:

- Maze
- Letter Tracing
- Activity Pack
- House Adventure
- Bedtime Story

---

## 9. Testing Approach

Testing should cover:

- UI smoke tests
- behavior preservation
- creature data contract
- prompt template matrix
- missing-field handling
- output-specific requirements
- copy/reset behavior
- mobile sanity test after publish

See:

```text
Docs/Prototype 4.0/P4.0_TEST_PLAN.md
```

---

## 10. Architecture Decisions

### Decision: Keep app static for V4.0

Reason:
The product is still in prototype learning mode and does not require backend or build complexity.

### Decision: Separate prompt templates from UI behavior

Reason:
Activity Book and Story Guide features will require many prompt templates. Keeping them in UI behavior code would create maintainability problems.

### Decision: Use local module/file boundaries instead of microservices

Reason:
The project can learn service-boundary thinking through simple file/module responsibilities without adding distributed-system complexity.

---

## 11. Open Architecture Questions

- Is `promptTemplates.js` enough, or should templates later be split by category?
- Should `promptBuilder.js` stay generic, or should output categories have specific builders?
- When does the app need a true data model for creature, character, activity, and story?
- When does local storage become useful enough to justify complexity?
- When, if ever, should the app move beyond plain HTML/CSS/JS?
