# Prototype 3 Scope — Magical Creature Profile Card Prompt Builder

## Prototype name

P3 — Magical Creature Profile Card Prompt Builder

## Goal

Build a simple phone-friendly static web app that helps a parent guide young kids through magical creature creation and generates:

1. A copy/paste-ready ChatGPT image prompt.
2. A short creature summary for future story use.
3. A clean attribute recap.

## Prototype learning question

Can a normal parent use a phone-friendly guided form to quickly capture a child’s creature idea and generate a safe, image-ready magical creature profile card prompt without being a prompt engineer?

## Target user

Parent/adult guide using a phone while playing with young children ages 3–6.

## Co-creator

Young child who answers questions verbally.

## Core experience

1. Parent opens app.
2. Parent reads short instructions.
3. Parent asks guided questions out loud.
4. Child answers with weird, specific ideas.
5. Parent types answers into raw text fields.
6. Parent taps `Make Prompt`.
7. App displays prompt, summary, and attribute recap.
8. Parent taps `Copy Prompt`.
9. Parent pastes into ChatGPT to generate a magical creature profile card image.

## In scope

- Static web app.
- Mobile-first design.
- Parent-facing instructions.
- Guided text fields.
- Example helper text for each field.
- Raw text capture.
- Prompt generation.
- Summary generation.
- Attribute recap.
- Copy prompt button.
- Reset button.
- Fill example button.
- Basic README.

## Out of scope

- Direct ChatGPT or image API integration.
- User accounts.
- Cloud save.
- Local storage.
- Story mode.
- Book generation.
- Ecommerce or shopping integrations.
- Copyright/character detection.
- Automated name generation.
- Complex safety filtering.
- Heavy input rewriting or interpretation.

## Required fields

### 1. Creature mix

Parent script:

> “Let’s decide what creatures are mixed together. It could be dragon + unicorn, raccoon + pony, dinosaur + snake, or something else.”

Placeholder:

> Example: raccoon witch + pony

### 2. Magic

Parent script:

> “What kind of magic does it have? It could be art magic, invisibility, rainbow magic, flying, demon hunting, healing, or something else.”

Placeholder:

> Example: demon hunter

### 3. Colors

Parent script:

> “What colors should it be? It could be rainbow, grey, blue, pink, gold, rainbow but not blue, or something else.”

Placeholder:

> Example: rainbow but not blue

### 4. Home

Parent script:

> “Where does it live? It could be a candy castle, underwater palace, sky castle, moon cave, or somewhere even weirder.”

Placeholder:

> Example: castle in the sky but higher than space

### 5. What are they like?

Parent script:

> “What are they like? They could be silly, kind, brave, sleepy, sneaky, gentle, or something else.”

Placeholder:

> Example: kind and silly

### 6. Accessories

Parent script:

> “What do they wear or carry? They could have a necklace, rings, books, toys, a cape, boots, a crown, or something else.”

Placeholder:

> Example: books and toys

### 7. Extra weird detail

Parent script:

> “What is one extra silly, magical, or weird detail?”

Placeholder:

> Example: sneezes glitter stars

### 8. Name

Parent script:

> “What is their name? It is okay to decide this last.”

Placeholder:

> Example: Amor

### 9. Picture style

Parent script:

> “What should the picture feel like? Pick a style or make one up.”

Placeholder:

> Example: cuddly storybook

Suggestion chips:

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

## Output 1 — Image prompt

The prompt should create a magical creature profile card image.

Required prompt behavior:

- Name clearly at top.
- Creature shown as main focus.
- Home/habitat shown as background.
- Attribute list shown on side or around image.
- Kid-friendly profile-card layout.
- Preserve weird specificity.
- Keep non-scary, non-violent, and age appropriate.

## Output 2 — Summary

The summary should be short and usable as a future story seed.

Example:

> Amor is a grey raccoon witch + pony with demon hunter magic. They live in a castle of candy and balloons. They are kind and have books and toys. One special detail is: loves storytime.

## Output 3 — Attribute recap

Display the raw fields back to the parent in a clean list.

## Fill example values

- Creature mix: raccoon witch + pony
- Magic: demon hunter
- Colors: grey
- Home: castle of candy and balloons
- What are they like: kind
- Accessories: books and toys
- Extra weird detail: loves storytime
- Name: Amor
- Picture style: cuddly storybook

## Success criteria

P3 succeeds if:

1. Parent can use it from a phone.
2. Parent does not need to remember fields.
3. Parent does not need to manually engineer the prompt.
4. Generated prompt is ready to paste into ChatGPT.
5. Generated image prompt asks for a profile card, not just a creature illustration.
6. Name and attributes are requested inside the image.
7. Kid-safe guardrails are included in the prompt intro.
8. Weird details are preserved as raw text.
9. Summary is available for future storytelling.
10. The tool reduces parent cognitive load.
