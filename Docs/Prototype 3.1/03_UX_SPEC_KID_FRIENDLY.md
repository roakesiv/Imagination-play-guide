# Kid-Friendly UX Spec

## Design North Star
The app should feel like a creative play partner, not a form.

It should help an adult facilitate imaginative play with young users while keeping the cognitive load low. The adult should be able to skim, improvise, and keep the session moving.

## Audience
Primary users:
- Adult facilitator using a phone
- Children in age cohorts 3–4, 5–6, and 7–10 participating verbally or visually

Secondary users:
- Solo adult testing ideas
- Older children who can read some prompts independently

## Core UX Principles
### 1. Skimmable First
Every screen should answer:
- What are we doing?
- What do I tap next?
- Can I skip or improvise?

### 2. Big Friendly Controls
- Buttons should be large and easy to tap on mobile.
- Primary actions should be visually obvious.
- Avoid dense button clusters.

### 3. Playful but Not Chaotic
Use kid-friendly colors, soft shapes, and small icons/images. Do not overload the screen with decoration.

### 4. Fields Are Signposts
Input fields should guide creativity, not enforce correctness. The app should support silly, partial, or unusual answers.

### 5. Reduce Adult Reading Burden
Replace long instructions with short prompts and examples.

Bad:
> Please describe the creature’s habitat, including environmental characteristics, notable objects, and magical features.

Better:
> Where does it live?
> Example: a moon castle, a lava forest, a cloud cave

### 6. Preserve Absurdity
Do not sanitize away strange child logic. If a creature is a flower-bird that lives on the highest planet floating with balloons in a gem castle, keep it.

### 7. Make Success Visible
After each major step, the app should show a satisfying result: a creature summary, card, prompt, or next option.

## Visual Style
- Whimsical
- Bright but readable
- Rounded corners
- Soft card layouts
- Simple icons or emoji-style visual markers
- Strong contrast for readability
- Avoid tiny text
- Avoid overly mature/fantasy-dark styling

## Copy Style
Voice should be:
- Warm
- Simple
- Playful
- Encouraging
- Short

Preferred prompt format:
- “What is your creature called?”
- “What is it made of?”
- “What magic does it have?”
- “Where does it live?”
- “What is it like?”

Use examples sparingly and clearly.

## Mobile Layout Rules
- Design mobile-first.
- Keep one primary action per screen whenever practical.
- Use vertical stacking.
- Keep forms short.
- Use generous spacing.
- Make output easy to copy.

## Accessibility Basics
- Use readable font sizes.
- Maintain color contrast.
- Do not rely on color alone to communicate meaning.
- Keep touch targets large.
- Use plain language.

## Reusable Component Ideas
- `PromptCard`: question, short helper text, input
- `BigChoiceButton`: icon, title, one-line description
- `CreatureSummaryCard`: name, mix, magic, colors, home, personality
- `OutputCard`: generated text with copy button
- `ProgressPills`: simple step indicator

## Example Screen Flow
1. Welcome / Start
2. Creature basics
3. Magic and colors
4. Home and personality
5. Creature summary
6. What do we make next?
7. Output screen

## UX Acceptance Checklist
Before calling the build done, verify:
- [ ] Mobile layout is comfortable.
- [ ] Primary buttons are easy to tap.
- [ ] Instructions are short.
- [ ] A tired adult can skim the app.
- [ ] A child can understand the vibe visually.
- [ ] Silly answers still work.
- [ ] Outputs preserve the child’s exact ideas.
- [ ] The bridge screen is simple and obvious.
