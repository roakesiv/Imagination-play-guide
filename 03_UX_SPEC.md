# UX Spec

Status: Current  
Last updated after: Prototype 3.1 UX pass plus P4 bridge MVP  
Last updated: 2026-05-16

This is the living UX source of truth for Magic Creature Card Maker. Prototype UX files are historical snapshots. When a prototype changes the durable UX direction, promote the current rules into this file.

## Design North Star

The app should feel like a creative play toy, not a form.

It is used by an adult facilitator on a phone while children contribute ideas out loud. The app should be fast to skim, forgiving when fields are skipped or simplified, and visually playful enough that the screen supports the activity even when nobody reads every word.

## Audience

Primary users:
- Adult facilitator using a phone
- Children participating verbally or visually

Secondary users:
- Solo adult testing ideas
- Older children who can read some prompts independently

Testing notes should stay sanitized. Do not record exact child ages, names, locations, or identifying family details.

## Current UX Shape

The current flow is:

1. Make a magic creature with free-text prompts.
2. Generate an image prompt and creature summary.
3. Review the creature details recap.
4. Choose a next output from `What do we make next?`
5. Copy a deterministic text output.

Current output options:
- Creature Card
- Story
- Adventure
- Coloring Page
- Find-It Game

## UX Principles

### Skimmable First

Every screen should answer quickly:
- What are we making?
- What should I tap next?
- Can I skip or improvise?

### Big Friendly Controls

- Primary buttons should be easy to tap on a phone.
- Input fields should be comfortable for one-handed use.
- Choice cards should be large enough to hit quickly.
- Avoid dense button clusters.
- Keep the main action visually obvious.

### Playful But Not Busy

The visual direction should feel bright, warm, and kid-friendly without reducing readability.

Current visual ingredients:
- Bright colors
- Soft white panels
- Small playful prompt markers
- Large output choice cards
- A playful background with rainbow bands, tree-like shapes, and star dots

Decoration should support the play mood without making text harder to read.

### Fields Are Signposts

Fields guide creativity, not correctness. The app should still work when:
- A field is skipped
- An answer is partial
- A child gives an absurd answer
- The adult changes the question wording out loud

### Preserve Absurdity

Do not normalize child ideas. If the child gives a strange, specific, or silly answer, preserve the flavor.

### Say "The Magic Creature"

Prompt labels should say "the magic creature" instead of "it" where that makes the question clearer for young children.

Current preferred labels:
- What is the magic creature made of?
- What magic does the magic creature have?
- Where does the magic creature live?
- What is the magic creature like?
- What does the magic creature carry or wear?
- What is the magic creature's name?

### Make Success Visible

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

```text
What magic does the magic creature have?
Tiny magic, huge magic, snack magic, anything.
```

Avoid:

```text
Please describe the creature's magical capabilities, including how they manifest and what kind of imaginative play they support.
```

## Mobile Layout Rules

- Design mobile-first.
- Use vertical stacking.
- Keep text blocks short.
- Use generous spacing between prompts.
- Keep buttons and cards large.
- Make output easy to read and copy.
- Avoid requiring the adult to scroll back and forth during live play.

## Bridge UX

The bridge title is:

```text
What do we make next?
```

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
- Keep readonly output text selectable and copyable.

## Testing Checklist

Before calling a UX pass ready, verify:

- [ ] Mobile layout is comfortable.
- [ ] Primary actions are easy to tap.
- [ ] Prompt labels use "the magic creature" where appropriate.
- [ ] Instructions are short enough to skim.
- [ ] Background feels playful without hurting readability.
- [ ] Silly answers still work.
- [ ] Creature creation still generates summary and image prompt.
- [ ] Bridge screen is visible and obvious.
- [ ] All current output types can be tested.
- [ ] Generated outputs use entered creature data.
- [ ] Copy buttons work on phone.
- [ ] No personal child or family details are added to docs or logs.
