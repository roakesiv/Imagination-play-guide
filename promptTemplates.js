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

  function filenameSlug(value) {
    const slug = (value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');

    return slug || 'magic_creature';
  }

  function pageSection(pageNumber, filenamePart, title, prompt, slug) {
    return `Page ${pageNumber} - ${title}
Suggested filename: ${slug}_${pageNumber}_${filenamePart}.png
${prompt}`;
  }

  const artifacts = {
    activityBookPacket: {
      title: 'Activity Book Packet',
      build(values, helpers) {
        const slug = filenameSlug(values.name);
        const activityPages = [
          ['01', 'coloring_page', artifacts.coloring.title, artifacts.coloring.build(values, helpers)],
          ['02', 'find_it_game', artifacts.findIt.title, artifacts.findIt.build(values, helpers)],
          ['03', 'maze', artifacts.maze.title, artifacts.maze.build(values, helpers)],
          ['04', 'letter_tracing', artifacts.letterTracing.title, artifacts.letterTracing.build(values, helpers)],
          ['05', 'count_objects', artifacts.countObjects.title, artifacts.countObjects.build(values, helpers)],
          ['06', 'find_letter', artifacts.findLetter.title, artifacts.findLetter.build(values, helpers)],
          ['07', 'draw_missing_detail', artifacts.drawMissingDetail.title, artifacts.drawMissingDetail.build(values, helpers)],
          ['08', 'trace_path', artifacts.tracePath.title, artifacts.tracePath.build(values, helpers)],
          ['09', 'matching_page', artifacts.matchingPage.title, artifacts.matchingPage.build(values, helpers)],
          ['10', 'finish_pattern', artifacts.finishPattern.title, artifacts.finishPattern.build(values, helpers)]
        ];

        return `I am creating a printable activity pack for young children.

Use this creature:

Name: ${helpers.promptValue(values.name)}
Creature: ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Colors: ${helpers.promptValue(values.colors)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Accessories: ${helpers.promptValue(values.accessories)}
Extra detail: ${helpers.promptValue(values.extraDetail)}

Task:
Create the activity pages one at a time.

Important:
- Generate only one image at a time.
- Start with Page 01.
- After each image, stop and wait for me to say NEXT.
- When I say NEXT, generate the next page.
- Use black-and-white printable worksheet style.
- Use bold clean outlines.
- Keep pages simple for young children.
- Avoid grayscale, shading, clutter, tiny details, scary elements, and adult worksheet complexity.
- Before each image, show the page title and suggested filename.

Activity Pack Order:

${activityPages.map(([pageNumber, filenamePart, title, prompt]) => pageSection(pageNumber, filenamePart, title, prompt, slug)).join('\n\n')}

Start now with Page 01 only.`;
      }
    },
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
    },
    maze: {
      title: 'Maze',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';

        return `Create a black-and-white printable maze activity page for a young child featuring a kid-friendly magical creature.

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}

Make ${creatureName} the clear starting character at the beginning of the maze. Put ${creatureName}'s home, a simple ${helpers.promptValue(values.home)}, as the clear goal at the end of the maze.

Create a simple maze path that helps ${creatureName} travel from the start to the home. The maze should be easy enough for a young child, with thick readable lines, wide paths, and no tiny corridors.

Include a few simple, easy-to-color decorations from ${creatureName}'s world, such as items related to the home, magic, accessories, or extra detail. Keep the page uncluttered and easy to use.

Use:
- clean black-and-white line art
- bold, readable outlines
- wide maze paths
- simple shapes
- open spaces for coloring
- minimal detail
- no shading or grayscale
- no tiny patterns
- no confusing overlapping paths
- no scary details

Make it feel like a cute children's maze worksheet and coloring page, not a difficult puzzle book page or an adult maze.`;
      }
    },
    letterTracing: {
      title: 'Letter Tracing',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';
        const tracingWord = values.name ? values.name.toUpperCase() : 'MAGIC';

        return `Create a black-and-white printable letter tracing worksheet for a young child featuring a kid-friendly magical creature.

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}

Make the worksheet focus on tracing the creature's name: ${tracingWord}.

At the top of the page, show ${creatureName}'s name clearly in large friendly letters.

Include large dotted or dashed traceable letters for:
${tracingWord}

Add a simple, cute black-and-white line art picture of ${creatureName} near the name. Keep the creature easy to color, with bold clean outlines, simple shapes, and minimal detail.

Include a few simple decorations from ${creatureName}'s world, such as items related to the home, magic, accessories, or extra detail, but keep the page uncluttered and easy to use.

Use:
- clean black-and-white line art
- large traceable letters
- dotted or dashed letter guides
- bold readable outlines
- simple shapes
- open spaces for coloring
- minimal detail
- no shading or grayscale
- no tiny patterns
- no cluttered background
- no scary details

Make it feel like a cute preschool handwriting worksheet and coloring page, not a complex school worksheet or adult coloring page.`;
      }
    },
    countObjects: {
      title: 'Count the Objects',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';

        return `Create a black-and-white printable counting activity page for a young child featuring a kid-friendly magical creature.

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}

Show ${creatureName} in a simple, playful scene at the home/background. Add groups of easy-to-count objects from ${creatureName}'s world, such as magic sparkles, books, toys, tiny gems, balloons, candy pieces, snacks, or simple items inspired by the creature details.

Make the page ask the child to count the objects.

Include 3 to 5 counting groups. Each group should have large, clear objects and a simple blank answer space.

Use:
- clean black-and-white line art
- bold readable outlines
- large simple objects
- open spaces for coloring
- minimal detail
- no shading or grayscale
- no tiny patterns
- no cluttered background
- no scary details

Make it feel like a cute preschool counting worksheet and coloring page, not a complex math worksheet.`;
      }
    },
    findLetter: {
      title: 'Find the Letter',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';
        const targetWord = values.name || 'MAGIC';
        const firstLetter = values.name ? values.name.trim().charAt(0).toUpperCase() : 'M';

        return `Create a black-and-white printable letter-finding worksheet for a young child featuring a kid-friendly magical creature.

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}

Focus on the first letter of the creature's name: ${firstLetter}.

If a creature name is needed as a word on the page, use: ${targetWord}.

Show ${creatureName} clearly on the page with the big letter ${firstLetter} near the top.

Create a simple activity where the child finds and circles all the letter ${firstLetter} hidden among other large friendly letters.

Include a simple black-and-white picture of ${creatureName} and a few easy-to-color decorations from the creature's world, such as objects inspired by the home, magic, accessories, or extra detail.

Use:
- large readable letters
- bold clean outlines
- simple shapes
- open spaces for coloring
- minimal detail
- no tiny letters
- no cluttered background
- no shading or grayscale
- no scary details

Make it feel like a cute preschool letter worksheet and coloring page.`;
      }
    },
    drawMissingDetail: {
      title: 'Draw the Missing Detail',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';

        return `Create a black-and-white printable drawing activity page for a young child featuring a kid-friendly magical creature.

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}

Show ${creatureName} clearly on the page in simple black-and-white line art. Leave one large open blank area where the child can draw an extra magical detail, accessory, snack, toy, sparkle, book, water magic, balloon, candy, or friend for ${creatureName}.

At the top, include a simple prompt:
"Draw something magical for ${creatureName}!"

Include a few simple decorations from ${creatureName}'s world, such as objects inspired by the home, magic, accessories, or extra detail, but keep most of the page open for drawing and coloring.

Use:
- clean black-and-white line art
- bold readable outlines
- large open drawing space
- simple shapes
- minimal detail
- no shading or grayscale
- no tiny patterns
- no cluttered background
- no scary details

Make it feel like a cute preschool drawing-and-coloring activity page, not a finished illustration.`;
      }
    },
    tracePath: {
      title: 'Trace the Path',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';

        return `Create a black-and-white printable tracing path worksheet for a young child featuring a kid-friendly magical creature.

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}

Show ${creatureName} clearly on the page. Create a simple prewriting activity where the child helps ${creatureName} follow large dotted paths to reach the home/background.

Include 3 to 5 large traceable paths. The paths should use simple prewriting shapes such as:
- straight line
- wavy line
- zigzag line
- loop-de-loop line
- curved rainbow path

Put ${creatureName} near the start of each path and a simple goal at the end, such as an object inspired by the home, magic, accessories, or extra detail.

Use:
- clean black-and-white line art
- bold readable outlines
- large dotted or dashed tracing paths
- wide spacing between paths
- simple shapes
- open spaces for coloring
- minimal detail
- no shading or grayscale
- no tiny patterns
- no cluttered background
- no scary details

Make it feel like a cute preschool prewriting worksheet and coloring page, not a complex maze or adult activity page.`;
      }
    },
    matchingPage: {
      title: 'Matching Page',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';

        return `Create a black-and-white printable matching activity page for a young child featuring a kid-friendly magical creature.

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}

Show ${creatureName} clearly on the page in a simple, cute black-and-white line art style.

Create a simple matching activity where the child draws lines to match magical objects from ${creatureName}'s world.

Use two clear columns of large objects. Put 4 to 6 objects on the left and matching objects on the right.

Objects can include items inspired by the home, magic, accessories, extra detail, and creature world, such as:
- book
- toy
- balloon
- tiny gem
- water sparkle
- candy piece
- storytime book
- simple magical object

Make the objects large, simple, and easy to recognize. Leave enough space between objects so the child can draw matching lines.

Use:
- clean black-and-white line art
- bold readable outlines
- large simple objects
- two clear matching columns
- open spaces for drawing lines
- minimal detail
- no shading or grayscale
- no tiny patterns
- no cluttered background
- no scary details

Make it feel like a cute preschool matching worksheet and coloring page, not a complex school worksheet.`;
      }
    },
    finishPattern: {
      title: 'Finish the Pattern',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';

        return `Create a black-and-white printable pattern activity page for a young child featuring a kid-friendly magical creature.

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}

Show ${creatureName} clearly on the page in a simple, cute black-and-white line art style.

Create a simple "finish the pattern" activity using magical objects from ${creatureName}'s world.

Include 3 to 4 pattern rows. Each row should use large, easy-to-recognize objects inspired by the home, magic, accessories, extra detail, and creature world, such as:
- balloon
- book
- tiny gem
- water sparkle
- candy piece
- toy
- storytime book
- simple magical object

Use simple preschool-friendly patterns such as:
- balloon, gem, balloon, gem, blank
- book, toy, book, toy, blank
- candy, candy, sparkle, candy, candy, blank

At the end of each pattern row, leave a clear blank space where the child can draw or choose the next object.

Include a small prompt at the top:
"Finish the magical patterns!"

Use:
- clean black-and-white line art
- bold readable outlines
- large simple objects
- clear pattern rows
- open blank spaces for answers
- minimal detail
- no shading or grayscale
- no tiny patterns
- no cluttered background
- no scary details

Make it feel like a cute preschool pattern worksheet and coloring page, not a complex math worksheet.`;
      }
    }
  };

  return {
    buildImagePrompt,
    artifacts
  };
})();
