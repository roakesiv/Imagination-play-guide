# P4 Bridge Plan — From Creature to Artifact

## Purpose
P4 creates the bridge from “we made a creature” to “now we can make something with it.”

The bridge should be lightweight. It should not become a full story engine yet.

## Core User Need
After creating a magical creature, the user needs a simple next step. The app should help convert the creature into a usable creative output.

## Recommended MVP Pattern
Add a screen titled:

> What do we make next?

Show large option cards. Each option uses the creature data to generate a structured text output.

## Artifact Options
### 1. Creature Card
Creates a short profile card summary.

Include:
- Name
- Creature mix
- Magic
- Colors
- Home
- Personality
- Fun fact

### 2. Story Prompt
Creates a kid-friendly story prompt.

Include:
- Main creature
- Setting
- Small problem
- Magical action
- Happy/safe ending direction

### 3. Adventure Prompt
Creates a simple RPG-lite adventure seed.

Include:
- Quest goal
- Friendly helper
- Obstacle
- Choice moment
- Reward

### 4. Coloring Page Prompt
Creates a prompt for a printable coloring page.

Include:
- Main creature centered
- Habitat background
- Bold clean outlines
- No shading/heavy black fill
- Kid-friendly printable style

### 5. Find-It Game Prompt
Creates a hidden-object activity page prompt.

Include:
- Creature and habitat scene
- List of objects to find
- Clear black-and-white activity page or colorful activity version depending on mode

## Data Mapping
Use existing creature data fields:

| Creature Field | Used In |
|---|---|
| Name | All outputs |
| Creature mix | All outputs |
| Magic | Story, adventure, card, image prompts |
| Colors | Card, image prompts |
| Home | Story, adventure, image prompts |
| Personality | Story, adventure, card |
| Find-it list | Find-It Game only |

## Output Requirements
Each output should:
- Preserve the child’s specific ideas.
- Avoid scary, violent, adult, or horror content.
- Be copyable.
- Be short enough to use immediately.
- Be structured enough to paste into ChatGPT or an image generator.

## Suggested UI
After creature summary:

Primary heading:
> Great creature! What should we make next?

Choice cards:
- 🃏 Creature Card
- 📖 Story
- 🧭 Adventure
- 🖍️ Coloring Page
- 🔎 Find-It Game

After selection:
- Show generated output.
- Include Copy button.
- Include Back button.
- Include Edit Creature button if simple.

## Implementation Notes
- Keep generation deterministic/template-based for now.
- Do not add a backend.
- Do not add accounts.
- Do not require saved history.
- Store current creature data in local component state or existing app state pattern.
- If local storage already exists, use it lightly; do not overbuild.

## Template Examples
### Creature Card Template
```text
Create a kid-friendly magical creature profile card.

Name: {name}
Creature mix: {creatureMix}
Magic: {magic}
Colors: {colors}
Home: {home}
Personality: {personality}

Make it cute, colorful, whimsical, imaginative, and safe for young children. Preserve the specific ideas, including silly or unusual details.
```

### Coloring Page Template
```text
Create a printable coloring book page for a kid-friendly magical creature.

Name: {name}
Creature mix: {creatureMix}
Magic: {magic}
Home: {home}
Personality: {personality}

Use clean bold outlines, simple shapes, no heavy shading, no scary details, and enough background detail to be fun to color.
```

### Find-It Game Template
```text
Create a kid-friendly hidden-object activity page.

Main creature: {name}, a {creatureMix}
Magic: {magic}
Home: {home}
Colors/vibe: {colors}
Personality: {personality}

Include these things to find:
{findItList}

Make the scene whimsical, readable, safe for young children, and full of fun details.
```

## P4 Acceptance Checklist
- [ ] A completed creature can move to the bridge screen.
- [ ] User can choose at least 3 artifact types.
- [ ] Output uses the actual creature data.
- [ ] Output can be copied.
- [ ] No backend required.
- [ ] Mobile layout works.
- [ ] Outputs are kid-safe and preserve silly details.
