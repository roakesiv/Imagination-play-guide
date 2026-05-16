# Product Vision — Magic Creature Card Maker

## One-sentence vision

A parent-guided imaginative play app that lowers the cognitive effort of co-creating magical characters and stories with young kids by providing structured prompts, generating delightful image artifacts, and later supporting guided storytelling.

## Core problem

Parents may want to do creative storytelling and imaginative play with young kids, but it can be cognitively expensive. It requires inventing prompts, managing kid energy, translating absurd ideas into coherent creative material, and maintaining momentum while children wait.

This app reduces that burden by providing a structured guide and producing a well-engineered prompt for AI image generation.

## Current target user

### Primary user: parent or adult guide

The adult operates the app, reads questions aloud, types the child’s answers, manages edge cases, copies the generated prompt, and uses ChatGPT to create the image.

Needs:

- Low setup effort.
- Phone-friendly experience.
- No need to memorize fields.
- No need to be a prompt engineer.
- Enough structure to guide play without overthinking.
- Fast output so kids do not lose attention.

### Co-creator: child, ages 3–6

The child answers questions and owns the creature idea. The child is not expected to read, type, or navigate the app independently.

Needs:

- Simple questions.
- Inspired choices, not rigid menus.
- Freedom to be absurd and specific.
- Visual payoff.
- Ability to show the creation to another adult or sibling.

## Product north star

Reduce the effort required for a parent to start and sustain creative co-storytelling with young kids.

## Initial value proposition

For parents of young children who want creative play but do not want to improvise everything from scratch, this app provides a phone-friendly guided creature-creation flow that captures kid ideas and turns them into a copy/paste-ready prompt for a magical creature profile card image.

## Core experience loop

1. Parent opens the app.
2. Parent asks structured questions.
3. Child gives absurd, specific answers.
4. App captures answers as text fields.
5. App generates a kid-safe image prompt.
6. Parent pastes prompt into ChatGPT.
7. ChatGPT creates a magical creature profile card image.
8. Child and family react to and share the image.
9. Parent can use the creature summary as a story seed.

## Long-term product ladder

### Phase 1 — Creature profile card prompt builder

Generate a prompt for a magical creature profile card image.

### Phase 2 — Story jump-start

Use created creatures as protagonists or companions in guided story-play prompts.

### Phase 3 — Parent DM assistant

Help the parent run a simple kid-lite RPG/co-storytelling session with guided choices and low prep.

### Phase 4 — Story capture

Capture what happened in the session and turn it into a short story summary.

### Phase 5 — Storybook generation

Convert creature profile, adventure summary, and generated images into a simple illustrated children’s story.

### Phase 6 — External integrations

Possible future integrations include direct image generation, print/book services, or physical toy/model inspiration. These are explicitly out of scope for Prototype 3.

## Design principles

1. **Preserve the weird** — absurd kid specificity is the value.
2. **Structure, not constraint** — examples inspire, but raw text fields capture the answer.
3. **Parent-led, child-created** — the adult operates the tool; the child owns the idea.
4. **Reduce skill thresholds** — no prompt engineering knowledge required.
5. **Make the image the artifact** — the final delight object is the creature profile card image.
6. **Use summaries as story seeds** — the summary supports future storytelling features.
7. **Prompt guardrails at the wrapper level** — safety and style boundaries belong in the generated prompt intro, not heavy per-field rewriting.
8. **Phone-first** — the first real use case is an adult guiding kids from a phone.

## What this is not yet

- Not an automated image generator.
- Not a full game.
- Not a story engine yet.
- Not a marketplace or purchase tool.
- Not a kid-independent app.
- Not a polished commercial product.

## Strategic insight

The valuable software is not the entire imaginative experience. The parent and child still create the magic together. The app removes the friction and skill threshold at specific moments where structure and prompt engineering matter.
