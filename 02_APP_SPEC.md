# App Spec

Status: Current  
Last updated after: Prototype 4.5 Closeout
Last updated: 2026-06-27

This is the living product and engineering spec for Magic Creature Card Maker. Prototype folders preserve history. This file captures the current truth: what the app is, what it needs to do, what has been decided, and what remains open.

Related source-of-truth docs:
- `01_01_PRODUCT_VISION.md` captures the product why.
- `01_02_PRODUCT_INSIGHTS_DESIGN_SESSION.md` captures working product insights from design sessions and validation.
- `01_03_PRODUCT_ROADMAP.md` captures staged product direction.
- `03_UX_SPEC.md` captures the current UX, copy, layout, and interaction rules.
- `05_ARCHITECTURE_SPEC.md` captures the current app architecture, data flow, prompt templates, and module boundaries.

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
- Clear understanding that the app creates copyable prompts, not images directly
- Flexible fields that work even when skipped or partially answered
- No prompt-engineering knowledge required
- Fast output so children do not lose attention
- Copyable text for image generation, stories, or activities
- Current creature data restored after accidental reloads or navigation
- Ability to save, load, and delete multiple local creatures without accounts

The child needs:
- Simple questions
- Freedom to be absurd and specific
- A sense that their exact ideas were kept
- A visual or creative payoff after the creature is made
- A next play step that extends the idea

## Core Workflows

### Make a Creature

1. Adult opens `index.html`.
2. Adult optionally opens the Parent Tips section for facilitation guidance.
3. Adult asks or adapts the creature prompts aloud.
4. Child gives answers.
5. Adult types answers into free-text fields.
6. Adult taps `Make Creature`.
7. App generates an image prompt, creature summary, and details recap.

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
2. Adult may choose an optional `Activity age range` for printable activity page complexity.
3. Adult chooses `Activity Book Packet` for a full printable activity set, or chooses an individual option under `What do we make next?`
4. App generates deterministic text for that output type.
5. Adult copies the output if useful.

### Restore Current Creature

1. Adult enters or edits creature details.
2. App autosaves the current creature to browser local storage.
3. If the page reloads, the app restores the last creature into the form.
4. Adult can continue generating prompts and activity outputs from the restored creature.

### Manage Saved Creatures

1. Adult fills in creature details.
2. Adult taps `Save Creature`.
3. App adds the creature to a local saved creature list.
4. Adult can load a saved creature back into the form.
5. Adult can delete saved creatures.

Current output types:
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

## Functional Requirements

Creature creation:
- The app must preserve free-text answers without normalizing or overcorrecting them.
- The app must work when fields are skipped.
- Missing values should render as `not specified`.
- The user-facing flow must clearly state that the app makes a prompt to copy into ChatGPT or another AI image creator.
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
- Activity age range, used only for printable activity output complexity

Content maintainability:
- Field titles, parent-facing questions, suggestion examples, placeholders, visual markers, style chips, parent tips, and example values live in `content.js`.
- Editable content should stay in a simple static structure that works locally and on GitHub Pages.

Parent tips:
- The app should provide compact optional facilitation guidance near the top.
- Parent tips should be expandable/collapsible and not block the main creature flow.

Bridge outputs:
- The app must show a visible next-step bridge after creature creation.
- The bridge must offer a prominent Activity Book Packet option before individual output choices.
- The Activity Book Packet must generate one copyable batch prompt for the current creature.
- The Activity Book Packet must include the current printable activity pages in order, one-page-at-a-time instructions, `NEXT` instructions, and suggested filenames.
- The Activity Book Packet and individual printable activity outputs must include a short instruction derived from the selected `Activity age range`.
- The Activity Book Packet UI must explain the copy/paste and `NEXT` workflow near the packet choice because users may not read the generated prompt closely.
- The Activity Book Packet must exclude Story and Adventure while those modes are paused.
- Each output choice must generate copyable text using current creature data.
- Bridge output must refresh if the user regenerates the creature after selecting an output type.
- The bridge should remain deterministic and template-based for now.

Copy behavior:
- Copy buttons should use the Clipboard API when available.
- If clipboard write fails, the app should select the generated textarea and attempt a fallback copy.
- The UI should show a short copy status message.

Reset behavior:
- Reset must clear fields, generated prompt, summary, details, selected bridge output, selected choice state, and copy status.
- Reset must ask for confirmation before clearing non-empty creature data.
- Canceling Reset must preserve current form data and local save.

Fill Example behavior:
- Fill Example may populate sample data for quick testing.
- Fill Example must ask for confirmation before overwriting non-empty creature data.
- Canceling Fill Example must preserve current form data and local save.

Session continuity:
- The current creature must autosave locally as fields change.
- The last creature must restore into the form after reload.
- The selected activity age range must save and restore with current and saved creature data when available, defaulting to `Preschool — ages 3–4` for older saved data.
- Restore must not require accounts, cloud sync, backend services, or a database.
- Reset must clear the locally saved current creature.
- The app should show a compact local save/restore status.
- The app must support saving, loading, and deleting multiple creatures locally.
- Saved creature names should use the creature name when available.
- Saved creatures without a name should display `Unnamed Creature`.
- Saved creature management must not require child profiles or personal child names.

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

The app should not add backend services, accounts, auth, databases, package dependencies, or direct AI API integration until testing proves they are needed. Current creature continuity uses browser local storage only.

## UX Principles

Design north star:
- The app should feel like a creative play toy, not a form.

The canonical UX rules live in `03_UX_SPEC.md`. This section summarizes the product-level principles that affect requirements and architecture.

Current UX rules:
- Use short, warm, playful copy.
- Make the screen purpose obvious within a few seconds.
- Make the prompt-only workflow explicit for first-time users.
- Use large phone-friendly buttons, inputs, chips, and choice cards.
- Use visually distinct major buttons so an adult can guide a non-reading child by color.
- Keep optional parent guidance compact, skimmable, and collapsible.
- Treat fields as creative signposts, not correctness checks.
- Preserve absurd child specificity.
- Treat field text as glanceable cue cards for adult facilitation, not scripts to read verbatim.
- Prefer "the magic creature" over ambiguous "it" in prompt labels.
- Keep the bridge from creature creation to next output visible and obvious.
- Avoid long parent scripts.
- Keep the visual design playful without reducing readability; decorative elements must not conflict with title or intro text.

Accessibility basics:
- Use readable font sizes.
- Maintain contrast between text and background.
- Do not rely on color alone to show selected state.
- Keep touch targets large.
- Use plain language.
- Keep output text selectable and copyable.

## Current Architecture

The current app is a small static web app:

- `index.html` contains the static app shell, output panels, bridge choice buttons, and script loading order.
- `content.js` contains editable field text, suggestions, placeholders, markers, style chips, parent tips, and Fill Example values.
- `promptTemplates.js` contains prompt/output templates and output-specific prompt-engineering text.
- `promptBuilder.js` contains shared prompt rendering helpers, missing-value fallback, template lookup, and defensive template handling.
- `storage.js` contains browser localStorage helpers for current creature continuity and saved creatures.
- `script.js` contains UI rendering, DOM event handling, creature data gathering, summary/details rendering, copy/reset behavior, and selected output state.
- `styles.css` contains mobile-first layout, visual styling, responsive rules, and component states.

There is no build step and no package manager. The app runs by opening `index.html` in a browser.

Current JavaScript/content shape:
- `content.js` defines editable app content.
- `parentTips` defines the expandable Parent Tips section.
- `promptTemplates.js` defines deterministic output templates.
- `promptBuilder.js` defines shared output rendering helpers.
- `creatureDataKeys` defines the explicit creature data contract.
- `getCreatureData()` reads current form state into a structured creature data object.
- `fields` defines the detail/order mapping derived from `content.js`.
- `exampleValues` defines the Fill Example data from `content.js`.
- `buildSummary()` creates the readable creature summary.
- `renderDetails()` renders the creature detail list.
- `renderArtifact()` updates selected bridge output.
- `copyText()` handles Clipboard API copy with fallback behavior.
- `storage.js` exposes save, load, and clear helpers for the current creature.
- `storage.js` exposes list, add, and delete helpers for saved creatures.
- `content.js` owns destructive-action confirmation copy.

Architecture direction:
- Keep editable copy/content, prompt templates, prompt builder helpers, and UI orchestration separate while the app remains static and dependency-free.
- Use `05_ARCHITECTURE_SPEC.md` as the canonical source for architecture boundaries and data contracts.

Current state model:
- Form fields are the source of truth.
- `currentArtifactType` stores the selected bridge output type.
- Current creature form data is persisted to browser local storage and restored on page load.
- Saved creatures are persisted to browser local storage as a local list.
- Generated outputs are not persisted; they can be regenerated from the restored creature.

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

The current background uses rainbow bands, tree-like shapes, and star dots. P3.1 validation found that the decoration helped the mood but could interfere with the first intro sentence near the title, so header readability needs a targeted fix.

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
- First-time users need clearer direction that the app creates a prompt to copy elsewhere, not an image directly.
- Parent-facing field text should be editable without hunting through behavior logic.
- Button color differentiation matters because children may participate by pressing buttons before they can read.
- Decorative playfulness needs readability guardrails on phone.

### Prototype 3.2

Prototype 3.2 is a targeted foundation refinement before full P4 activity-book work.

Durable learning:
- Clarify prompt-only workflow.
- Centralize editable field text, suggestions, style chips, parent tips, and examples in `content.js`.
- Rewrite field questions and examples for glanceable live facilitation.
- Differentiate major buttons with distinct readable colors.
- Fix header/rainbow readability conflict.
- Add compact Parent Tips guidance for first-time adult facilitators.
- Update prototype docs and durable source-of-truth docs.

### Prototype 4.0

Prototype 4.0 created an architecture runway for prompt-based creative outputs.

Durable learning:
- Keep the app static and dependency-free while architecture needs remain modest.
- Separate editable UI content, prompt templates, prompt builder helpers, and UI orchestration.
- Use an explicit creature data contract before adding more output types.
- Keep missing-field fallback centralized.
- Use prototype test matrices to preserve output behavior during internal refactors.
- Promote durable architecture decisions into `05_ARCHITECTURE_SPEC.md`.

### Prototype 4.3

Prototype 4.3 added local creature continuity after live play showed that losing creature data had become a major blocker.

Durable learning:
- Local autosave and reload restore are now part of the core app, not deferred complexity.
- Destructive actions must protect live family-session work.
- A simple local saved creature list is enough to support multiple creatures without accounts, profiles, backend services, or cloud sync.
- JSON export/import is not worth adding only to move data between phone and laptop; it creates another manual handoff and does not advance the desired automated post-creation workflow.
- The next workflow friction is production after creature creation: generating pages/images, downloading files, moving between phone and laptop, and printing.
- Users should not need to read generated prompts closely to use the app safely; short visible workflow instructions should explain what to copy, where it goes, and what action comes next.

### Prototype 4.4 Activity Age Range

Prototype 4.4 activity difficulty revision replaced abstract Beginner / Medium / Advanced thinking with a parent-facing `Activity age range` selector.

Durable learning:
- Age and school-stage labels are easier for parents to choose quickly than abstract difficulty labels.
- Printable activity prompts need age/grade anchoring so generated pages can be simpler for younger children and more challenging for older children.
- This selector should affect printable activity outputs only; Creature Card, Story, Adventure, and the main creature image prompt remain unchanged.

### Prototype 4.4 Closeout

P4.4 passed on batch prompt production workflow.

Durable learning:
- Activity Book Packet reduced repeated prompt copy/paste into ChatGPT.
- The `NEXT` flow worked well for generating activity pages one at a time.
- Page titles/names were a major improvement.
- Users need short visible instructions near the Activity Book Packet button because many users will not read the generated prompt itself.
- Printing/local file production is now the next blocker.
- P4.5 explored and validated a local production pipeline before adding any PDF generation to the web app.

### Prototype 4.5 Closeout

P4.5 passed on local production pipeline validation.

Durable learning:
- A local desktop helper can convert a folder of downloaded activity-page images into one printable multipage PDF.
- Scaling each image to the US Letter printable area with a default `0.25` inch margin produced acceptable page size and quality for simple coloring/activity pages.
- The combination of folder-to-PDF helper and improved printer reduced the image-file-to-printed-pages step to about one minute for a 10-page activity set.
- Generated activity images and PDFs should stay outside the repo in a sibling local workspace such as `02 - Activity Book`.
- This workflow should remain a local helper for now, not a web app runtime feature.
- Remaining friction is now earlier in the pipeline: repeated image generation, downloads, renaming/moving files, and scaling production across many characters.

## Current Non-Goals

The app is not currently:
- An automated image generator
- A full story engine
- A game
- A kid-independent app
- A multi-user product
- A commercial product
- A backend service
- A database-backed application
- A polished print-production tool
- A browser-side PDF generator

## Open Questions

Product and UX:
- Is the single-page form still too long during live play?
- Which fields are essential, and which create friction?
- After P3.2, does the background still support the play mood without hurting title or intro readability?
- Which bridge output is most useful first: card, story, adventure, coloring page, or find-it game?
- Are generated bridge outputs too long for tired or distracted adults?
- Does clearer prompt-only copy prevent first-time-user confusion?
- Do rewritten field prompts reduce adult facilitation effort during live play?
- Do distinct button colors help adults guide child participation?
- Should a future prototype add lightweight step navigation, or keep the full-page form?
- What local production workflow best scales from one finished creature activity set to many?
- How much friction remains around repeated image generation, downloading, and moving/renaming files?
- Should future production work add a lower-effort desktop wrapper for the PDF helper?
- Should future production work support local Markdown character profiles for keeper characters?
- When does the app need to track generated images or activity outputs, not just creature data?

Architecture:
- How long can the app stay as plain HTML/CSS/JS before structure becomes a constraint?
- Is `content.js` enough structure for editable field text, or should the app later use a more explicit content model?
- Is one `promptTemplates.js` file enough, or should templates later be split by output category?
- Should the creature data contract later gain validation, defaults, or serialization?
- When does saved creature management need export/import, device transfer, or sync rather than browser-local storage?

Testing:
- Does clipboard behavior work reliably on target mobile browsers?
- Does one-handed phone use feel comfortable?
- Can the adult understand the flow within a few seconds without reading every instruction?
- Which work packages actually need browser/mobile review versus static implementation review?

## Deferred Ideas

Possible future features:
- Step-by-step mode for live play
- Printable creature cards
- Production checklist per creature
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
