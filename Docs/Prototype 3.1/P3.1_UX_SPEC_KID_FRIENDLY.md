# Kid-Friendly UX Spec - Prototype 3.1

## Design North Star
The app should feel like a creative play toy, not a form.

It is used by an adult facilitator on a phone while children contribute ideas out loud. The app should be fast to skim, forgiving when fields are skipped or simplified, and visually playful enough that the screen supports the activity even when nobody reads every word.

## Current Prototype Shape
Prototype 3.1 is still a static web app:
- `index.html`
- `styles.css`
- `script.js`

It has no backend, accounts, storage, database, or AI API dependency.

The current flow is:
1. Make a magic creature with free-text prompts.
2. Generate an image prompt and creature summary.
3. Choose a next output from "What do we make next?"
4. Copy a deterministic text output.

## Audience
Primary users:
- Adult facilitator using a phone
- Children in broad cohorts 3-4, 5-6, and 7-10 participating verbally or visually

Secondary users:
- Solo adult testing ideas
- Older children who can read some prompts independently

Do not document exact child ages, personal names, locations, or identifying family details in testing notes.

## UX Principles

### 1. Skimmable First
Every screen should answer quickly:
- What are we making?
- What should I tap next?
- Can I skip or improvise?

### 2. Big Friendly Controls
- Primary buttons should be easy to tap on a phone.
- Choice cards should be large enough to hit quickly.
- Avoid dense button clusters.
- Keep the main action visually obvious.

### 3. Playful but Not Busy
The current visual direction uses:
- Bright kid-friendly colors
- Soft white panels
- Small emoji-style prompt markers
- Large output choice cards
- A playful background with rainbow bands, tree-like shapes, and star dots

Decoration should support the play mood without making text harder to read.

### 4. Fields Are Signposts
Fields guide creativity, not correctness. The app should still work when:
- A field is skipped
- An answer is partial
- A child gives an absurd answer
- The adult changes the question wording out loud

### 5. Preserve Absurdity
Do not normalize child ideas. If the child says the magic creature is a "flower cloud dragon with noodle shoes," preserve that exact flavor.

### 6. Say "The Magic Creature"
Prompt labels should say "the magic creature" instead of "it" where that makes the question clearer for young children.

Current preferred labels:
- What is the magic creature made of?
- What magic does the magic creature have?
- Where does the magic creature live?
- What is the magic creature like?
- What does the magic creature carry or wear?
- What is the magic creature's name?

Short helper text can stay playful and casual.

### 7. Make Success Visible
After the form is submitted, the user should see:
- Image prompt
- Creature summary
- Creature details
- Next-step bridge choices

The app should clearly move from "we made a creature" to "now we can make something with it."

## Copy Style
Voice should be:
- Warm
- Simple
- Playful
- Encouraging
- Short

Avoid long parent scripts. Use a short prompt plus a tiny hint.

Good:
> What magic does the magic creature have?
> Tiny magic, huge magic, snack magic, anything.

Avoid:
> Please describe the creature's magical capabilities, including how they manifest and what kind of imaginative play they support.

## Mobile Layout Rules
- Design mobile-first.
- Use vertical stacking.
- Keep text blocks short.
- Use generous spacing between prompts.
- Keep buttons and cards large.
- Make output easy to read and copy.
- Avoid requiring the adult to scroll back and forth during live play.

## P4 Bridge UX
The bridge screen title is:
> What do we make next?

Current output options:
- Creature Card
- Story
- Adventure
- Coloring Page
- Find-It Game

Bridge requirements:
- Each choice is a large card.
- Choosing a card generates deterministic template text.
- Output uses the creature data already entered.
- Output preserves silly or unusual details.
- Output has a Copy button.
- The bridge remains lightweight and does not create new app state complexity.

## Accessibility Basics
- Use readable font sizes.
- Maintain contrast between text and background.
- Do not rely on color alone to show state.
- Keep touch targets large.
- Use plain language.
- Keep readonly output text selectable/copyable.

## Testing Checklist
Before calling a P3.1/P4 pass ready, verify:
- [ ] Mobile layout is comfortable.
- [ ] Primary actions are easy to tap.
- [ ] Prompt labels use "the magic creature" where appropriate.
- [ ] Instructions are short enough to skim.
- [ ] Background feels playful without hurting readability.
- [ ] Silly answers still work.
- [ ] Creature creation still generates summary and image prompt.
- [ ] Bridge screen is visible and obvious.
- [ ] At least three output types generate text.
- [ ] All five output types can be tested.
- [ ] Generated outputs use entered creature data.
- [ ] Copy buttons work on phone.
- [ ] No personal child or family details are added to docs or logs.
