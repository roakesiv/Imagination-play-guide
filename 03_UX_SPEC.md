# UX Spec

Status: Current  
Last updated after: Prototype 4.3 WP4 saved creature list
Last updated: 2026-05-23

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
- Maze
- Letter Tracing
- Count the Objects
- Find the Letter
- Draw the Missing Detail
- Trace the Path
- Matching Page
- Finish the Pattern

Prototype 4.0 introduced no major runtime UX changes, so the P3.2 UX rules remain current.

## UX Principles

### Skimmable First

Every screen should answer quickly:
- What are we making?
- What should I tap next?
- Can I skip or improvise?
- Does this app make the image, or make the prompt I copy elsewhere?

The app must clearly communicate that it creates a prompt to copy into ChatGPT or another AI image creator.

Optional guidance can appear near the top, but it should be compact and collapsible so confident adults can move straight into the form.

### Big Friendly Controls

- Primary buttons should be easy to tap on a phone.
- Input fields should be comfortable for one-handed use.
- Choice cards should be large enough to hit quickly.
- Avoid dense button clusters.
- Keep the main action visually obvious.
- Major actions should be visually distinct enough that an adult can guide a non-reading child by color.
- Color can support guidance, but text labels and selected states must remain clear.
- Major action colors should be distinct enough for adult guidance, such as "press the red button" or "press the orange button."

### Playful But Not Busy

The visual direction should feel bright, warm, and kid-friendly without reducing readability.

Current visual ingredients:
- Bright colors
- Soft white panels
- Small playful prompt markers
- Large output choice cards
- A playful background with rainbow bands, tree-like shapes, and star dots

Decoration should support the play mood without making text harder to read.

Header and intro text should remain readable over the decorative background on browser and mobile.

### Fields Are Signposts

Fields guide creativity, not correctness. The app should still work when:
- A field is skipped
- An answer is partial
- A child gives an absurd answer
- The adult changes the question wording out loud

Field text should work as a cue card for the adult:

```text
Field Name - short question
Ideas: example, example, example, or anything else.
```

The adult should be able to glance, paraphrase, and type without reading a full script.

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

Current field questions and suggestion examples live in `content.js` so they can be revised without editing behavior logic.

### Parent Tips

Use a compact native `details` / `summary` pattern for optional adult facilitation guidance.

The tips should:
- Appear after the title/intro and before the form.
- Be easy to notice but not distracting.
- Expand and collapse cleanly.
- Explain that the app is a guide, not a script.
- Reinforce that the app makes an AI-ready prompt, not an image directly.
- Encourage weird, specific, kid-owned answers.

### Make Success Visible

After the form is submitted, the user should see:
- Image prompt
- Creature summary
- Creature details
- Next-step bridge choices

The app should clearly move from "we made a creature" to "now we can make something with it."

### Protect Live Work

Risky actions should not erase or replace an active creature without warning.

Current rules:
- Fill Example asks for confirmation before replacing non-empty creature data.
- Reset asks for confirmation before clearing non-empty creature data.
- Canceling a confirmation preserves the current creature.
- Confirmations should stay short, plain, and understandable during live family use.

### Saved Creatures

Saved creature controls should stay compact and parent-facing.

Current rules:
- The saved creature list appears near the creature form.
- The primary save action is `Save Creature`.
- Saved rows show the fictional creature name when available.
- Missing names display `Unnamed Creature`.
- Loading a saved creature asks before replacing active creature data.
- Deleting a saved creature asks for confirmation.
- Do not ask for or display child profile names.

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

Current preferred copy direction:

```text
Magic - What magic does the magic creature have?
Ideas: Rainbow magic, snack magic, flying, healing, spooky-hunter magic, or anything else.
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
- Keep optional guidance compact so it does not push the first form fields too far down.

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

P3.1 validation showed that the bridge is useful discovery territory. P3.2 foundation refinements and P4.0 architecture work are complete. V4.1 improved Coloring Page and Find-It Game prompt quality. P4.2 continues rapid activity-page expansion with minimal bridge changes; bridge grouping remains a future UX need if the choice list becomes too crowded.

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
- [ ] First-time users can tell the app creates prompts, not images directly.
- [ ] Parent Tips section is visible, expandable, readable, and not intrusive.
- [ ] Major buttons are visually distinct enough to guide by color.
- [ ] Prompt labels use "the magic creature" where appropriate.
- [ ] Instructions are short enough to skim.
- [ ] Field prompts work as glanceable adult cue cards.
- [ ] Suggestion examples inspire absurd or hybrid ideas without constraining answers.
- [ ] Background feels playful without hurting title, intro, or field readability.
- [ ] Silly answers still work.
- [ ] Creature creation still generates summary and image prompt.
- [ ] Bridge screen is visible and obvious.
- [ ] All current output types can be tested.
- [ ] Generated outputs use entered creature data.
- [ ] Copy buttons work on phone.
- [ ] No personal child or family details are added to docs or logs.
