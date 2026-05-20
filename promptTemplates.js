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
        return `Create a printable coloring book page for a kid-friendly magical creature.

Main creature: ${helpers.promptValue(values.name)}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail to include: ${helpers.promptValue(values.extraDetail)}

Use clean bold outlines, simple shapes, open spaces for coloring, no heavy shading, no scary details, and a playful printable style.`;
      }
    },
    findIt: {
      title: 'Find-It Game',
      build(values, helpers) {
        return `Create a kid-friendly hidden-object activity page.

Scene: ${helpers.promptValue(values.name)}, a ${helpers.promptValue(values.creatureMix)}, is playing in ${helpers.promptValue(values.home)}.
Magic: ${helpers.promptValue(values.magic)}
Colors/vibe: ${helpers.promptValue(values.colors)}
Personality: ${helpers.promptValue(values.personality)}

Things to find:
${getFindItItems(values).map((item) => `- ${item}`).join('\n')}

Make the page whimsical, readable, safe for young children, and full of fun details.`;
      }
    }
  };

  return {
    buildImagePrompt,
    artifacts
  };
})();
