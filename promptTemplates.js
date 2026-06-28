window.creaturePromptTemplates = (() => {
  function getStoryCharacterDetails(values) {
    if (!values.storyCharacterId) {
      return '';
    }

    const details = [
      `Story character: ${values.name || 'not specified'}`,
      values.storyCharacterTitle ? `Title: ${values.storyCharacterTitle}` : '',
      values.storyCharacterRole ? `Role: ${values.storyCharacterRole}` : '',
      values.storyCharacterSymbol ? `Symbol: ${values.storyCharacterSymbol}` : '',
      values.storyCharacterGlobalRule ? `Global visual rule: ${values.storyCharacterGlobalRule}` : '',
      values.storyCharacterVisualLock ? `Locked visual details, preserve exactly: ${values.storyCharacterVisualLock}` : ''
    ].filter(Boolean);

    return details.length ? `\nStory character lock:\n${details.join('\n')}\n` : '';
  }

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
${getStoryCharacterDetails(values)}

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

  const activityAgeRangeInstructions = {
    'Toddler — ages 1–2': 'Design this activity for toddlers ages 1–2: keep it extremely simple, with very large shapes, very minimal detail, and easy visual interaction.',
    'Daycare — ages 2–3': 'Design this activity for daycare-age children ages 2–3: keep it very simple, with large shapes, minimal detail, and easy-to-complete tasks.',
    'Preschool — ages 3–4': 'Design this activity for preschool children ages 3–4: keep it simple, playful, easy to understand, and not visually overwhelming.',
    'TK / Pre-K — ages 4–5': 'Design this activity for TK / Pre-K children ages 4–5: keep it clear and playful, with a little more structure and challenge than a preschool worksheet.',
    'Kindergarten — ages 5–6': 'Design this activity for kindergarten children ages 5–6: keep it playful and clear, with a balanced amount of challenge appropriate for early learners.',
    '1st Grade — ages 6–7': 'Design this activity for 1st grade children ages 6–7: make it slightly more challenging while keeping it kid-friendly, clear, and printable.',
    '2nd Grade — ages 7–8': 'Design this activity for 2nd grade children ages 7–8: make it moderately challenging, readable, and engaging, while still simple enough for a printable activity page.',
    '3rd Grade — ages 8–9': 'Design this activity for 3rd grade children ages 8–9: add a bit more challenge and detail, while keeping the page clear, kid-friendly, and printable.',
    '4th Grade — ages 9–10': 'Design this activity for 4th grade children ages 9–10: make it more challenging and engaging, while remaining visually clear and easy to use as a printable page.',
    '5th Grade — ages 10–11': 'Design this activity for 5th grade children ages 10–11: create a more advanced activity with increased challenge, while keeping it readable, printable, and age-appropriate.',
    '6th Grade — ages 11–12': 'Design this activity for 6th grade children ages 11–12: make it meaningfully more challenging and age-appropriate, while keeping it clear, printable, and not overly cluttered.'
  };

  function getActivityAgeRangeInstruction(values) {
    return activityAgeRangeInstructions[values.activityAgeRange] || activityAgeRangeInstructions['Preschool — ages 3–4'];
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

  function packetPagePlan(pageNumber, filenamePart, title, goal, mustInclude, mustAvoid, slug) {
    return `Page ${pageNumber} of 10 - ${title}
Suggested filename: ${slug}_${pageNumber}_${filenamePart}.png
Goal: ${goal}
Must include: ${mustInclude}
Must avoid: ${mustAvoid}`;
  }

  const artifacts = {
    activityBookPacket: {
      title: 'Activity Book Packet',
      build(values, helpers) {
        const slug = filenameSlug(values.name);
        const activityPages = [
          ['01', 'coloring_page', 'Coloring Page', 'A simple coloring-book scene with the character as the main focus.', 'large character, open coloring spaces, a few easy background details', 'hidden-object lists, maze paths, worksheet rows'],
          ['02', 'find_it_game', 'Find-It Game', 'A hidden-object coloring page.', 'a clear Things to Find row at the bottom and 5 large findable objects in the scene', 'maze paths, tracing lines, matching columns'],
          ['03', 'maze', 'Maze', 'The only maze page in the pack.', 'one clear start, one clear finish, wide maze paths, the character at the start', 'letter tracing, object matching, pattern rows'],
          ['04', 'letter_tracing', 'Letter Tracing', `A name tracing worksheet for ${values.name || 'the character'}.`, 'large dotted or dashed letters for the character name and a small character picture', 'maze paths, hidden objects, counting groups'],
          ['05', 'count_objects', 'Count the Objects', 'A counting worksheet.', '3 to 5 groups of large countable objects with blank answer spaces', 'maze paths, tracing lines, matching columns'],
          ['06', 'find_letter', 'Find the Letter', 'A letter spotting worksheet.', 'one big target letter and many large friendly letters to circle', 'maze paths, object-counting groups, matching columns'],
          ['07', 'draw_missing_detail', 'Draw the Missing Detail', 'An open drawing prompt page.', 'one large blank drawing area and the prompt "Draw something magical!"', 'maze paths, worksheet grids, dense hidden objects'],
          ['08', 'trace_path', 'Trace the Path', 'A prewriting tracing worksheet, not a maze.', '3 to 5 separate dotted tracing strokes such as straight, wavy, zigzag, loop, and curved lines', 'maze walls, start/finish maze goal, branching paths'],
          ['09', 'matching_page', 'Matching Page', 'A draw-the-lines matching worksheet, not a maze.', 'two clear columns with 4 to 6 large matching object pairs', 'maze paths, tracing strokes, pattern rows'],
          ['10', 'finish_pattern', 'Finish the Pattern', 'A pattern completion worksheet, not a maze.', '3 to 4 simple AB or AAB pattern rows with blank spaces at the end', 'maze paths, matching columns, hidden-object lists']
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
${getStoryCharacterDetails(values)}

${getActivityAgeRangeInstruction(values)}

Task:
Create exactly 10 activity pages, one at a time, using the numbered page plan below.

Important:
- Generate only one image per response.
- Start with Page 01 of 10.
- After each image, stop and wait for me to say NEXT.
- When I say NEXT, generate the next numbered page only.
- Do not skip a page.
- Do not repeat a page type.
- Do not combine two page types into one image.
- Make only Page 03 a maze. Pages 08, 09, and 10 must not look like mazes.
- Before each image, show exactly this line: "Creating Page NN of 10 - [Title]".
- Also show the suggested filename before each image.
- Use black-and-white printable worksheet style.
- Use bold clean outlines.
- Keep pages simple for young children.
- Avoid grayscale, shading, clutter, tiny details, scary elements, and adult worksheet complexity.

Quality check before each image:
- Is this the correct page number?
- Is this the correct activity type?
- Is this visually different from the previous pages?
- Is it preschool / early-child friendly?

10-Page Activity Pack Order:

${activityPages.map(([pageNumber, filenamePart, title, goal, mustInclude, mustAvoid]) => packetPagePlan(pageNumber, filenamePart, title, goal, mustInclude, mustAvoid, slug)).join('\n\n')}

Start now with Page 01 of 10 only.`;
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
${getStoryCharacterDetails(values)}

Make it a colorful kid-friendly character profile card layout with a readable name and simple traits. Make it cute, whimsical, and safe for young children. Preserve every specific silly detail.`;
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
${getStoryCharacterDetails(values)}

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
${getStoryCharacterDetails(values)}

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

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

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
        const findItItems = getFindItItems(values).slice(0, 5);

        return `Create a black-and-white printable hidden-object activity page for a young child featuring a kid-friendly magical creature.

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Colors/vibe: ${helpers.promptValue(values.colors)}
Personality: ${helpers.promptValue(values.personality)}
${getStoryCharacterDetails(values)}

Show ${creatureName} as the clear main focus of the page. Make ${creatureName}'s name very clear and easy to read at the top of the page so the child can clearly see the creature's name and feel excited about their creation.

Create a simple, playful scene of ${creatureName} playing in the home/background. Keep the scene readable, uncluttered, and easy for a young child to use. The page should work as both a hidden-object activity page and a coloring page.

Hide these things in the scene:
${findItItems.map((item) => `- ${item}`).join('\n')}

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

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

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

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

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

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

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

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

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

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

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

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

Show ${creatureName} clearly on the page. Create a simple prewriting activity with separate dotted tracing strokes. This is not a maze.

Include 3 to 5 large traceable paths. The paths should use simple prewriting shapes such as:
- straight line
- wavy line
- zigzag line
- loop-de-loop line
- curved rainbow path

Put ${creatureName} or a small character icon near the start of each separate tracing stroke and a simple object at the end, such as an item inspired by the magic, accessories, or extra detail.

Do not create maze walls, branching corridors, dead ends, start/finish maze labels, or a single route through a maze. The page should look like handwriting / prewriting practice, with separate dotted lines the child traces.

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

Make it feel like a cute preschool prewriting worksheet and coloring page, not a maze, puzzle book, or adult activity page.`;
      }
    },
    matchingPage: {
      title: 'Matching Page',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';

        return `Create a black-and-white printable matching activity page for a young child featuring a kid-friendly magical creature.

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

Show ${creatureName} clearly on the page in a simple, cute black-and-white line art style. This is not a maze.

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

Do not create maze walls, corridors, start/finish labels, or path-finding routes. This page should be two-column matching only.

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

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

Show ${creatureName} clearly on the page in a simple, cute black-and-white line art style. This is not a maze.

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

Do not create maze walls, corridors, start/finish labels, or path-finding routes. This page should be pattern rows only.

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
    },
    journalPage: {
      title: 'Adventure Journal Page',
      build(values, helpers) {
        const creatureName = values.name || 'the magic creature';

        return `Create a simple printable adventure journal page for a young child featuring a kid-friendly magical creature.

${getActivityAgeRangeInstruction(values)}

Main creature: ${creatureName}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Place/background: ${helpers.promptValue(values.home)}
Personality: ${helpers.promptValue(values.personality)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

Make a gentle place / adventure journal page where ${creatureName} explores a friendly magical place. Include a large simple picture area, a readable title, and a few simple child-friendly prompts such as "I saw:", "I found:", and "My favorite part:".

Keep it preschool / early-child friendly. Use a clean printable worksheet layout with bold outlines, large simple shapes, open drawing space, and no clutter. Avoid scary, violent, adult, or overly complex details.`;
      }
    }
  };

  return {
    buildImagePrompt,
    artifacts
  };
})();
