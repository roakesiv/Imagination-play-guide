# Prototype Insights — P1 and P2 Discovery

## Overview

Prototype 1 and Prototype 2 were manual/concierge experiments. The adult used a structured script to guide children through magical creature creation, then manually converted the answers into a ChatGPT image prompt.

The experiments showed strong signal that the activity is fun, repeatable, and family-shareable. They also revealed that the main bottleneck is the adult needing to remember the fields and manually compose a safe, effective image prompt while children are waiting.

## Prototype 1 — Basic guided creature creation

### Tested question

Can kids enjoy creating a magical creature through a short guided question sequence and feel enough delight to keep going?

### Manual flow

The adult asked basic questions such as:

- What kind of creature is it?
- What color is it?
- What magic does it have?
- Where does it live?
- What is it like?
- What accessories does it have?
- What is its name?

The adult then converted the result into a ChatGPT image prompt.

### Key result

The activity was successful. Kids wanted to keep doing it repeatedly. The image reveal was highly delightful.

## Prototype 2 — Structured open-ended guide

### Tested question

Does a structured guide work better when it provides options as inspiration but allows open-ended answers?

### Updated script pattern

The adult used this pattern:

> “Let’s decide [attribute]. Do you want it to be [examples], or something else?”

This became a key UX insight.

### Key result

The pattern worked better than either fully open-ended questions or rigid option lists.

## Major findings

### 1. Structure reduces blank-page pressure

Open-ended prompts can stump young kids. A structured question with examples helps them start.

Bad pattern:

> “What creature do you want?”

Better pattern:

> “What creatures are mixed together? It could be dragon + unicorn, raccoon + pony, dinosaur + snake, or something else.”

### 2. Options are inspiration, not constraints

Kids often ignored the suggested list and invented something new. The list still helped spark ideas.

Design implication:

- Use example chips or helper text.
- Always allow raw text answers.
- Do not force dropdown-only selection.

### 3. Hybrid creatures are core

The created creatures were almost always hybrids. This is not an edge case.

Examples:

- raccoon witch + pony
- dragon + unicorn
- dinosaur + snake
- sea dragon + unicorn

Design implication:

The first field should be `Creature mix`, not `Creature type`.

### 4. Absurd specificity is the delight

Children create highly specific, unpredictable details.

Examples:

- “Rainbow but not blue.”
- “Rainbow but not orange.”
- “Castle in the sky but higher than high, higher than space.”

Design implication:

Do not try to predict or normalize the weird. Capture it as text.

### 5. Sibling/family dynamics shape inputs

Color exclusions and choices may be driven by sibling dynamics, favorite colors, or playful opposition.

Design implication:

The app should not attempt to constrain color logic. `Colors` is just a text field.

### 6. Name works best last

Naming at the start is hard. Naming after the creature exists is easier because excitement and context have built up.

Design implication:

Move `Name` near the end of the flow.

### 7. The parent may creatively translate edge cases

Example:

Child says: “I love you daddy.”
Parent translates: “Let’s call it Amor, which means love.”

Design implication:

For Prototype 3, assume parental control and judgment. Do not build a name generator yet.

### 8. “Personality” is not child-friendly wording for ages 3–6

Children may not understand “personality.”

Better question:

> “What are they like?”

Design implication:

Use `What are they like?` as the field label and parent script.

### 9. Image reveal is the major payoff

The final image drove strong excitement. Children wanted to show the image to another parent/adult.

Design implication:

The generated prompt should produce a magical creature profile card image, not just a generic creature illustration.

### 10. Attribute recap is part of the delight

The family enjoyed seeing and reading the list of attributes that produced the image.

Design implication:

The prompt should instruct ChatGPT to include the creature’s name and attributes in the image itself as a fun profile card.

### 11. Manual prompt engineering is the bottleneck

The adult could do it, but it was stressful and slowed down the session.

Design implication:

Prototype 3 should automate prompt construction.

### 12. Prompt guardrails should be in the intro

The prompt should establish kid-friendly boundaries at the top.

Design implication:

Use a strong prompt wrapper:

- kid-friendly
- profile card
- name at top
- attributes listed
- preserve weird details
- non-scary
- non-violent
- suitable for young children

### 13. ChatGPT can handle the absurdity

The LLM can interpret raw fields well if the prompt is structured and bounded.

Design implication:

The app does not need to over-process or rewrite the child’s input.

## Updated product insight

The app should be a guided play tool that creates a well-engineered prompt. The LLM does the creative rendering. The app does not need to do much, but what it does must be fast, structured, and low-stress.

## Updated assumptions

| Assumption | Result | Decision |
|---|---|---|
| Kids enjoy magical creature creation | Confirmed | Keep |
| Image reveal drives delight | Strongly confirmed | Prioritize image prompt output |
| Rigid option lists are enough | Disconfirmed | Use examples + raw text |
| Fully open-ended prompts are enough | Partially disconfirmed | Use structured open-ended prompts |
| Hybrids are edge cases | Disconfirmed | Make creature mix core |
| Naming should happen first | Disconfirmed | Move name near the end |
| Accessories are optional | Disconfirmed | Add accessories as core field |
| Parent needs lower cognitive load | Confirmed | Build prompt generator |
| App should interpret weirdness | Not needed | Preserve raw text |

## Discovery conclusion

Discovery is sufficient to move into Prototype 3.

Prototype 3 should build the smallest phone-friendly app that captures raw child ideas and outputs a copy/paste-ready prompt for a magical creature profile card image, plus a short summary for future story use.
