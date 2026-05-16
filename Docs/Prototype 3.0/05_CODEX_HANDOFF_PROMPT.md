# Codex Handoff Prompt — Build Prototype 3

Paste the following prompt into Codex inside a new project folder.

---

Build a simple static web app prototype called "Magic Creature Card Maker."

Purpose:
This is a parent-guided creative play tool for young kids, ages 3–6. The parent uses the app on a phone to ask structured questions, capture the child's absurd creative answers, and generate a copy/paste-ready prompt for ChatGPT image generation.

The generated image should be a kid-friendly magical creature profile card.

Core design insight:
The app should not try to interpret or improve the child's weird ideas. The weird specificity is the delight. The app should capture each answer as raw text and place it into a well-structured, child-safe image prompt.

Technology:
Use plain HTML, CSS, and JavaScript.
No backend.
No external packages.
No image API.
No login.
No storage required for this prototype.
Make it mobile-first and easy to use on a phone.

Required files:
- index.html
- styles.css
- script.js
- README.md

User flow:
1. Parent sees a short intro explaining how to use the app.
2. Parent fills out guided text fields while asking the child questions.
3. Parent clicks "Make Prompt."
4. App displays:
   A. A copy/paste-ready image prompt
   B. A short creature summary
   C. A clean attribute recap
5. Parent can copy the image prompt with one button.
6. Parent can reset the form and make another creature.

Fields:
1. Creature mix
   Parent script: "Let's decide what creatures are mixed together. It could be dragon + unicorn, raccoon + pony, dinosaur + snake, or something else."
   Placeholder: "Example: raccoon witch + pony"

2. Magic
   Parent script: "What kind of magic does it have? It could be art magic, invisibility, rainbow magic, flying, demon hunting, healing, or something else."
   Placeholder: "Example: demon hunter"

3. Colors
   Parent script: "What colors should it be? It could be rainbow, grey, blue, pink, gold, rainbow but not blue, or something else."
   Placeholder: "Example: rainbow but not blue"

4. Home
   Parent script: "Where does it live? It could be a candy castle, underwater palace, sky castle, moon cave, or somewhere even weirder."
   Placeholder: "Example: castle in the sky but higher than space"

5. What are they like?
   Parent script: "What are they like? They could be silly, kind, brave, sleepy, sneaky, gentle, or something else."
   Placeholder: "Example: kind and silly"

6. Accessories
   Parent script: "What do they wear or carry? They could have a necklace, rings, books, toys, a cape, boots, a crown, or something else."
   Placeholder: "Example: books and toys"

7. Extra weird detail
   Parent script: "What is one extra silly, magical, or weird detail?"
   Placeholder: "Example: sneezes glitter stars"

8. Name
   Parent script: "What is their name? It is okay to decide this last."
   Placeholder: "Example: Amor"

9. Picture style
   Parent script: "What should the picture feel like? Pick a style or make one up."
   Placeholder: "Example: cuddly storybook"
   Include clickable suggestion chips that fill or append to the field:
   - storybook
   - cuddly
   - cute cartoon
   - kids anime
   - magical nature
   - candy fantasy
   - spooky but friendly
   - dreamy
   - soft watercolor
   - bright fantasy

Prompt output template:
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

Summary output template:
[Name] is a [colors] [creature mix] with [magic] magic. They live in [home]. They are [what are they like] and have [accessories]. One special detail is: [extra weird detail].

If a field is blank:
- Do not break the app.
- In the prompt, include "not specified" for that field.
- In the summary, skip blank fields when possible.

Design requirements:
- Mobile-first
- Big readable labels
- Large touch-friendly buttons
- Warm, playful visual style
- Parent-facing, not child-independent
- Make the form quick to complete under pressure
- The generated prompt should be easy to copy
- Use clear section headings:
  - "Ask the Questions"
  - "Image Prompt"
  - "Creature Summary"
  - "Creature Details"

Buttons:
- Make Prompt
- Copy Prompt
- Reset
- Fill Example

Add a "Fill Example" button that populates:
Creature mix: raccoon witch + pony
Magic: demon hunter
Colors: grey
Home: castle of candy and balloons
What are they like: kind
Accessories: books and toys
Extra weird detail: loves storytime
Name: Amor
Picture style: cuddly storybook

Acceptance criteria:
1. App runs locally by opening index.html in a browser.
2. Parent can fill fields and generate a prompt.
3. Prompt includes the profile-card instructions, name at top instruction, attribute-list instruction, kid-safe guardrails, and all entered attributes.
4. Summary is generated.
5. Attribute recap is displayed.
6. Copy Prompt copies the generated prompt to clipboard.
7. Reset clears all fields and outputs.
8. Layout works well on a phone screen.
9. No external dependencies.
10. README explains how to run and what the prototype is testing.

After building, review the app against the acceptance criteria. Fix only gaps needed for Prototype 3. Do not add new features.
