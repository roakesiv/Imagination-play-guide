window.creaturePromptTemplates = (() => {
  function buildImagePrompt(values, helpers) {
    return `Create a kid-friendly magical creature profile card image.

Put the creature's name clearly at the top in playful, readable storybook text.

Show the creature as the main focus of the card. Show the creature's home or habitat in the background. Add a fun profile-card layout with the creature's attributes listed clearly on the side or around the image.

Make the image cute, colorful, whimsical, imaginative, and safe for young children. Preserve the child's specific ideas, including silly, absurd, or unusual details. Do not make the image scary, violent, realistic horror, or adult.

Creature details:
Name: ${helpers.promptValue(values.name)}
Creature mix: ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Colors: ${helpers.promptValue(values.colors)}
Home: ${helpers.promptValue(values.home)}
What they are like: ${helpers.promptValue(values.personality)}
Accessories: ${helpers.promptValue(values.accessories)}
Extra weird detail: ${helpers.promptValue(values.extraDetail)}
Picture style: ${helpers.promptValue(values.pictureStyle)}

Style instructions:
Use a bright, kid-friendly magical creature profile card style with soft shapes, friendly expression, readable text, playful details, and a magical background.`;
  }

  function getFindItItems(values) {
    const rawItems = [
      values.accessories,
      values.extraDetail,
      values.magic ? `${values.magic} sparkle` : '',
      values.colors ? `${values.colors} tiny gem` : '',
      values.home ? `small sign for ${values.home}` : ''
    ];

    const items = rawItems
      .filter(Boolean)
      .flatMap((item) => item.split(','))
      .map((item) => item.trim())
      .filter(Boolean);

    const uniqueItems = [...new Set(items)];
    return uniqueItems.length ? uniqueItems : ['a tiny star', 'a smiley flower', 'a magic key', 'a little crown', 'a hidden heart'];
  }

  const artifacts = {
    card: {
      title: 'Creature Card',
      build(values, helpers) {
        return `Kid-friendly magical creature profile card

Name: ${helpers.promptValue(values.name)}
Creature mix: ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Colors: ${helpers.promptValue(values.colors)}
Home: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Carries or wears: ${helpers.promptValue(values.accessories)}
Fun fact: ${helpers.promptValue(values.extraDetail)}

Make it cute, colorful, whimsical, and safe for young children. Preserve every specific silly detail.`;
      }
    },
    story: {
      title: 'Story',
      build(values, helpers) {
        const name = values.name || 'the creature';
        return `Write a short, cozy kid-friendly story.

Main creature: ${name}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home: ${helpers.promptValue(values.home)}
Colors: ${helpers.promptValue(values.colors)}
Personality: ${helpers.promptValue(values.personality)}
Special detail: ${helpers.promptValue(values.extraDetail)}

Story shape:
1. ${name} notices a tiny problem near ${helpers.promptValue(values.home)}.
2. ${name} uses ${helpers.promptValue(values.magic)} in a kind or funny way.
3. A friend helps or cheers.
4. End with everyone safe, happy, and ready to play again.`;
      }
    },
    adventure: {
      title: 'Adventure',
      build(values, helpers) {
        const name = values.name || 'the creature';
        return `Make a gentle adventure seed for young kids.

Hero: ${name}, a ${helpers.promptValue(values.creatureMix)}
Home base: ${helpers.promptValue(values.home)}
Magic tool: ${helpers.promptValue(values.magic)}
Personality: ${helpers.promptValue(values.personality)}
Carries or wears: ${helpers.promptValue(values.accessories)}

Quest: Help find a missing happy thing from ${helpers.promptValue(values.home)}.
Friendly helper: A tiny glowing guide who likes ${helpers.promptValue(values.colors)} things.
Obstacle: A silly mix-up, a locked door, or a confusing map.
Choice moment: Go over, under, around, or ask for help?
Reward: A cheerful celebration and a new badge for ${name}.`;
      }
    },
    coloring: {
      title: 'Coloring Page',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';

        return `Create a black-and-white printable coloring page for a young child featuring a kid-friendly magical creature.

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}

Show ${creatureName} as the clear main focus of the page. Include a simple, playful background with a few easy-to-color elements inspired by the home/background, but keep the scene uncluttered and easy for a child to color.

Use:
- bold, clean outlines
- large simple shapes
- open spaces for coloring
- minimal detail
- no shading or grayscale
- no tiny patterns
- no heavy textures
- no scary details

Make it feel like a cute children's coloring book page, not a detailed illustration or an adult coloring page.`;
      }
    },
    findIt: {
      title: 'Find-It Game',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';

        return `Create a black-and-white printable hidden-object activity page for a young child featuring a kid-friendly magical creature.

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Colors/vibe: ${helpers.promptValue(values.colors)}
Personality: ${helpers.promptValue(values.personality)}

Show ${creatureName} as the clear main focus of the page. Make ${creatureName}'s name very clear and easy to read at the top of the page so the child can clearly see the creature's name and feel excited about their creation.

Create a simple, playful scene of ${creatureName} playing in the home/background. Keep the scene readable, uncluttered, and easy for a young child to use. The page should work as both a hidden-object activity page and a coloring page.

Hide these things in the scene:
- books and toys
- a storytime detail
- an invisibility + water sparkle
- a tiny gem
- a small sign for the home/background

At the bottom of the page, include a clear "Things to Find" row that shows:
- a small picture icon of each item
- the name of each item
- the items arranged in a simple row across the bottom

This bottom row should be designed for pre-reading children and children learning to read, so the pictures and words should be clear, simple, and easy to understand.

Use:
- clean black-and-white line art
- bold, readable outlines
- large, easy-to-recognize hidden objects
- simple shapes and clean details
- a playful whimsical style
- moderate detail
- objects that are hidden but still findable for a young child
- a page layout that is easy to print and easy to color

Avoid:
- tiny hard-to-see objects
- overly dense clutter
- complex overlapping details
- a very difficult puzzle style
- heavy shading or grayscale
- scary or intense elements

Make it feel like a cute children's hidden-object worksheet and coloring page, not a complex puzzle page or an adult hidden-object illustration.`;
      }
    }
  };

  return {
    buildImagePrompt,
    artifacts
  };
})();
