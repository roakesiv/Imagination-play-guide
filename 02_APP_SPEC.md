# App Spec

Status: Current  
Last updated after: Prototype 3.1 UX pass plus P4 bridge MVP  
Last updated: 2026-05-16

This is the living product and engineering spec for Magic Creature Card Maker. Prototype folders preserve history. This file captures the current truth: what the app is, what it needs to do, what has been decided, and what remains open.

Related source-of-truth docs:
- `01_PRODUCT_VISION.md` captures the product why.
- `03_UX_SPEC.md` captures the current UX, copy, layout, and interaction rules.

## Product Intent

Magic Creature Card Maker is a parent-guided imaginative play app for co-creating magical creatures with young children.

The app reduces the adult facilitator's cognitive load by providing structured prompts, preserving a child's silly and specific ideas, and turning those ideas into copyable creative outputs.

The current artifact is text-based. The app generates prompts and summaries that can be copied into ChatGPT or another creative tool. It does not generate images directly.

## Current Users

Primary user:
- Parent or adult facilitator using the app on a phone
- Reads or adapts prompts aloud
- Types the child's answers
- Copies generated text into another tool when useful

Co-creator:
- Child participating verbally or visually
- Not expected to read, type, or navigate independently
- Owns the creature idea

Secondary users:
- Solo adult testing ideas
- Older children who can read some prompts independently

Testing notes should use broad, sanitized observations. Do not record exact child ages, personal names, locations, or identifying family details.

## Current User Needs

The adult facilitator needs:
- Low setup effort
- Phone-friendly controls
- Short prompts that are easy to skim and say aloud
- Flexible fields that work even when skipped or partially answered
- No prompt-engineering knowledge required
- Fast output so children do not lose attention
- Copyable text for image generation, stories, or activities

The child needs:
- Simple questions
- Freedom to be absurd and specific
- A sense that their exact ideas were kept
- A visual or creative payoff after the creature is made
- A next play step that extends the idea

## Core Workflows

### Make a Creature

1. Adult opens `index.html`.
2. Adult asks the creature prompts aloud.
3. Child gives answers.
4. Adult types answers into free-text fields.
5. Adult taps `Make Creature`.
6. App generates an image prompt, creature summary, and details recap.

### Use a Style Suggestion

1. Adult taps one or more picture style chips.
2. The selected style text is appended to the picture style field.
3. Adult can edit the field manually.

### Copy the Image Prompt

1. Adult generates a creature.
2. Adult taps `Copy Prompt`.
3. App copies the generated image prompt, or selects the textarea as a fallback.

### Choose a Next Output

1. Adult generates a creature or taps an output choice, which generates the creature first if needed.
2. Adult chooses an option under `What do we make next?`
3. App generates deterministic text for that output type.
4. Adult copies the output if useful.

Current output types:
- Creature Card
- Story
- Adventure
- Coloring Page
- Find-It Game

## Functional Requirements

Creature creation:
- The app must preserve free-text answers without normalizing or overcorrecting them.
- The app must work when fields are skipped.
- Missing values should render as `not specified`.
- The generated image prompt must be kid-safe, whimsical, and explicit about avoiding scary, violent, horror, or adult content.
- The generated summary must be readable as a short creature recap.
- The details recap must show the current values for all creature fields.

Input fields:
- Creature mix
- Magic
- Colors
- Home
- Personality
- Accessories
- Extra silly detail
- Creature name
- Picture style

Bridge outputs:
- The app must show a visible next-step bridge after creature creation.
- Each output choice must generate copyable text using current creature data.
- Bridge output must refresh if the user regenerates the creature after selecting an output type.
- The bridge should remain deterministic and template-based for now.

Copy behavior:
- Copy buttons should use the Clipboard API when available.
- If clipboard write fails, the app should select the generated textarea and attempt a fallback copy.
- The UI should show a short copy status message.

Reset behavior:
- Reset must clear fields, generated prompt, summary, details, selected bridge output, selected choice state, and copy status.

## Non-Functional Requirements

The app should be:
- Static and easy to run locally
- Mobile-first
- Fast to load
- Comfortable for one-handed phone use
- Usable in short, interrupted family play sessions
- Forgiving of partial inputs
- Readable in normal household lighting
- Safe for young children in generated prompt language
- Simple enough to modify without a framework or build system

The app should not add backend services, accounts, auth, storage, databases, package dependencies, or direct AI API integration until testing proves they are needed.

## UX Principles

Design north star:
- The app should feel like a creative play toy, not a form.

The canonical UX rules live in `03_UX_SPEC.md`. This section summarizes the product-level principles that affect requirements and architecture.

Current UX rules:
- Use short, warm, playful copy.
- Make the screen purpose obvious within a few seconds.
- Use large phone-friendly buttons, inputs, chips, and choice cards.
- Treat fields as creative signposts, not correctness checks.
- Preserve absurd child specificity.
- Prefer "the magic creature" over ambiguous "it" in prompt labels.
- Keep the bridge from creature creation to next output visible and obvious.
- Avoid long parent scripts.
- Keep the visual design playful without reducing readability.

Accessibility basics:
- Use readable font sizes.
- Maintain contrast between text and background.
- Do not rely on color alone to show selected state.
- Keep touch targets large.
- Use plain language.
- Keep output text selectable and copyable.

## Current Architecture

The current app is a small static web app:

- `index.html` contains the app structure, form fields, output panels, and bridge choice buttons.
- `styles.css` contains mobile-first layout, visual styling, responsive rules, and component states.
- `script.js` contains form behavior, prompt generation, summary rendering, details rendering, bridge templates, style chip behavior, copy behavior, and reset behavior.

There is no build step and no package manager. The app runs by opening `index.html` in a browser.

Current JavaScript shape:
- `fields` defines the form field mapping.
- `exampleValues` defines the Fill Example data.
- `getValues()` reads current form state.
- `buildPrompt()` creates the image prompt.
- `buildSummary()` creates the readable creature summary.
- `renderDetails()` renders the creature detail list.
- `artifactTemplates` contains deterministic bridge output builders.
- `renderArtifact()` updates selected bridge output.
- `copyText()` handles Clipboard API copy with fallback behavior.

Current state model:
- Form fields are the source of truth.
- `currentArtifactType` stores the selected bridge output type.
- No state is persisted across page reloads.

## Current Design System

Visual tone:
- Bright
- Friendly
- Playful
- Soft-edged
- Kid-adjacent without expecting the child to operate the UI alone

Current UI patterns:
- White panels on a colorful illustrated background
- 8px border radius on panels and controls
- Large primary and secondary buttons
- Rounded style chips
- Large bridge choice cards
- Textareas for generated copyable outputs
- Clear selected state on bridge choice cards

The current background uses rainbow bands, tree-like shapes, and star dots. This should be validated on phone and in bright rooms.

## Prototype Learnings

### Prototype 1

Early project history and initial insights are stored in `Docs/Prototype 1/P1.0_P2.0_PROTOTYPE_INSIGHTS.md`.

Durable learning:
- The value is not replacing family imagination. The value is reducing friction at moments where structure and prompt generation help.

### Prototype 3.0

Prototype 3.0 established the creature prompt builder direction and generated a more formal handoff and testing record.

Durable learning:
- The app should stay lightweight while the core play loop is validated.
- Sanitized testing notes matter because this app may be used with children and families.

### Prototype 3.1 plus P4 Bridge MVP

Prototype 3.1 made the app more playful, mobile-friendly, and easier to skim. The P4 bridge MVP added deterministic next-output choices.

Durable learning:
- The product needs both creation and continuation. After a creature is made, the next useful question is "What do we make next?"
- The bridge can be lightweight and template-based before becoming a full story engine.
- Shorter copy, larger controls, and friendlier labels are part of the product, not just polish.

## Current Non-Goals

The app is not currently:
- An automated image generator
- A full story engine
- A game
- A kid-independent app
- A saved creature library
- A multi-user product
- A commercial product
- A backend service
- A database-backed application
- A polished print-production tool

## Open Questions

Product and UX:
- Is the single-page form still too long during live play?
- Which fields are essential, and which create friction?
- Does the background help the play mood or hurt readability on phone?
- Which bridge output is most useful first: card, story, adventure, coloring page, or find-it game?
- Are generated bridge outputs too long for tired or distracted adults?
- Should Prototype 4.0 add lightweight step navigation, or keep the full-page form?

Architecture:
- How long can the app stay as plain HTML/CSS/JS before structure becomes a constraint?
- Should output templates be separated from UI code if they grow?
- Should creature data become an explicit object model with validation, defaults, and serialization?
- Is local storage useful, or would it add premature complexity?

Testing:
- Does clipboard behavior work reliably on target mobile browsers?
- Does one-handed phone use feel comfortable?
- Can the adult understand the flow within a few seconds without reading every instruction?

## Deferred Ideas

Possible future features:
- Step-by-step mode for live play
- Saved creature library
- Printable creature cards
- Print-specific coloring page and find-it layouts
- Story session guide
- Parent DM assistant for simple adventures
- Story capture and recap
- Storybook generation
- Direct AI image generation
- Export or sharing features

Do not add these until live testing identifies the next highest-friction need.

## Spec Update Rules

After each prototype:

1. Keep detailed implementation notes in the prototype folder.
2. Promote durable decisions into this file.
3. Promote durable UX decisions into `03_UX_SPEC.md`.
4. Update requirements when behavior changes.
5. Update architecture notes when structure changes.
6. Add new open questions when testing reveals uncertainty.
7. Remove or revise stale statements.

Use this file to answer, "What is true about the app right now?"
