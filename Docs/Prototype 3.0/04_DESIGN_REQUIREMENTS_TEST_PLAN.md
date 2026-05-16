# Design Requirements and Test Plan — Prototype 3

## Prototype

P3 — Magical Creature Profile Card Prompt Builder

## Technical requirements

- Plain HTML, CSS, and JavaScript.
- No external dependencies.
- Runs locally by opening `index.html` in a browser.
- Can later be hosted on GitHub Pages.
- Mobile-first layout.
- No backend.
- No API calls.
- No user accounts.
- No persistent storage required.

## UX requirements

### Parent-facing

The app is used by an adult, not independently by a child.

Requirements:

- Clear intro.
- Simple guided fields.
- Parent scripts for each field.
- Large touch-friendly controls.
- Easy scrolling on phone.
- Minimal visual clutter.
- Fast to complete while children are waiting.

### Child-friendly through parent mediation

The child interacts verbally through the adult.

Requirements:

- Questions should be easy to say out loud.
- Avoid adult abstract wording where possible.
- Use “What are they like?” instead of “Personality.”
- Name should appear near the end.
- Examples should inspire without constraining.

### Prompt output

The generated prompt must:

- Be copy/paste ready.
- Ask for a kid-friendly magical creature profile card image.
- Include the creature name at the top of the image.
- Ask for attributes to be listed on the side or around the image.
- Ask for the home/background to appear.
- Include child-safe guardrails.
- Preserve absurd and specific details.

### Summary output

The generated summary must:

- Be short.
- Use the captured fields.
- Support future story/adventure features.
- Skip blank fields when possible.
- Not be the main user payoff; the image remains the main payoff.

### Attribute recap

The attribute recap must:

- Display the raw entered fields clearly.
- Help the parent/family enjoy the decisions behind the image.
- Support quick review before copying the prompt.

## Functional requirements

### Inputs

The app must provide text fields for:

1. Creature mix
2. Magic
3. Colors
4. Home
5. What are they like?
6. Accessories
7. Extra weird detail
8. Name
9. Picture style

### Buttons

The app must provide:

- `Make Prompt`
- `Copy Prompt`
- `Reset`
- `Fill Example`

### Copy behavior

When `Copy Prompt` is clicked:

- The generated image prompt is copied to the clipboard.
- The app provides a visible success message.
- If clipboard copy fails, the prompt should remain visible for manual copy.

### Blank field behavior

If a field is blank:

- The app must not break.
- The image prompt should use `not specified` for that field.
- The summary should skip the blank field where possible.
- The attribute recap can show `not specified`.

## Prompt template

```text
Create a kid-friendly magical creature profile card image.

Put the creature's name clearly at the top in playful, readable storybook text.

Show the creature as the main focus of the card. Show the creature's home or habitat in the background. Add a fun profile-card layout with the creature's attributes listed clearly on the side or around the image.

Make the image cute, colorful, whimsical, imaginative, and safe for young children. Preserve the child's specific ideas, including silly, absurd, or unusual details. Do not make the image scary, violent, realistic horror, or adult.

Creature details:
Name: [Name]
Creature mix: [Creature mix]
Magic: [Magic]
Colors: [Colors]
Home: [Home]
What they are like: [What are they like]
Accessories: [Accessories]
Extra weird detail: [Extra weird detail]
Picture style: [Picture style]

Style instructions:
Use a bright, kid-friendly magical creature profile card style with soft shapes, friendly expression, readable text, playful details, and a magical background.
```

## Summary template

```text
[Name] is a [colors] [creature mix] with [magic] magic. They live in [home]. They are [what are they like] and have [accessories]. One special detail is: [extra weird detail].
```

If fields are blank, skip the corresponding phrase where possible.

## Acceptance criteria

| ID | Criterion | Pass/Fail |
|---|---|---|
| AC1 | App runs locally by opening `index.html`. |  |
| AC2 | App uses plain HTML, CSS, and JavaScript. |  |
| AC3 | App works well on a phone screen. |  |
| AC4 | All required fields are present. |  |
| AC5 | Parent scripts and placeholders are present. |  |
| AC6 | Picture style suggestion chips work. |  |
| AC7 | `Make Prompt` generates image prompt. |  |
| AC8 | Prompt includes profile-card instruction. |  |
| AC9 | Prompt includes name-at-top instruction. |  |
| AC10 | Prompt includes attribute-list instruction. |  |
| AC11 | Prompt includes kid-safe guardrails. |  |
| AC12 | Prompt preserves raw field values. |  |
| AC13 | Summary is generated. |  |
| AC14 | Attribute recap is generated. |  |
| AC15 | `Copy Prompt` copies prompt to clipboard. |  |
| AC16 | `Reset` clears fields and outputs. |  |
| AC17 | `Fill Example` populates Amor example. |  |
| AC18 | Blank fields do not break the app. |  |
| AC19 | README explains purpose, how to run, and what is being tested. |  |

## Test plan

### Test 1 — Local functionality test

Goal:

Confirm the app works before testing with kids.

Steps:

1. Open `index.html` locally.
2. Click `Fill Example`.
3. Click `Make Prompt`.
4. Confirm prompt, summary, and details appear.
5. Click `Copy Prompt`.
6. Paste into a text editor.
7. Click `Reset`.

Success:

All acceptance criteria pass.

### Test 2 — Adult usability test

Goal:

Confirm a non-power-user adult can understand the tool.

Steps:

1. Hand phone or laptop to an adult.
2. Ask them to use the Amor example or create a creature.
3. Watch whether they understand the flow.
4. Ask what confused them.

Questions:

- Did the fields make sense?
- Did the parent scripts help?
- Was the prompt output understandable?
- Would they know what to do next?

### Test 3 — Parent + kid co-play test

Goal:

Confirm the app reduces cognitive load during real kid play.

Steps:

1. Open app on phone.
2. Use it with child/children.
3. Generate prompt.
4. Paste into ChatGPT.
5. Generate image.
6. Observe reactions.

Observation checklist:

| Question | Notes |
|---|---|
| Did the app reduce parent cognitive load? |  |
| Did kids stay engaged while fields were captured? |  |
| Were the questions easy to ask out loud? |  |
| Did the prompt preserve weird details? |  |
| Did the profile-card image format work? |  |
| Did name and attributes appear in image? |  |
| Did the child want to show someone else? |  |
| Did the summary help start story play? |  |
| Did the parent want to use it again? |  |

## Test result log template

| Date | Tester | Context | What Worked | What Failed | Surprises | Changes Needed |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## Known risks and future issues

### Copyright/famous characters

Children may request characters like Spider-Man. For Prototype 3, assume parent judgment handles this. Future versions may need a gentle helper that says: “Use your own made-up hero instead of a famous character.”

### Safety edge cases

Children may request scary or violent elements. For Prototype 3, rely on prompt-level kid-safe guardrails and parental control. Future versions may need optional safety rewrite support.

### Text in image reliability

Image generators may not always render text perfectly. The prompt should still ask for the name and attributes, but this may need future iteration.

### Phone friction

This is still phone-heavy. Prototype 3 reduces prompt engineering burden but does not yet reduce the overall phone-dependence of the play loop.

### Story mode gap

The app does not yet support the larger goal of helping the parent DM a co-created story. The summary output is included to support that future step.
