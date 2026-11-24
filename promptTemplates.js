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

  const toddlerAgeRange = 'Toddler — ages 1–2';
  const toddlerGuidance = 'Make simple picture pages for ages 1–2. Put one very large shape or familiar object on each US Letter sheet. Use bold black outlines on white, generous empty space, and plenty of room for free scribbles. An occasional page can show two big shapes. Keep the creature recognizable with a large face and a few clear features. Use at most one short picture label. Leave the page free of directions, questions, letters to trace, mazes, matching tasks, counting tasks, and answer blanks.';

  const toddlerPages = [
    ['creature_face', 'Creature Face', 'One large friendly face with a few recognizable features'],
    ['familiar_object', 'Familiar Object', 'One large, familiar object from the creature’s world'],
    ['another_object', 'Another Object', 'One different familiar object, with a bold open outline'],
    ['circle', 'Circle', 'One large empty circle'],
    ['square', 'Square', 'One large square with slightly rounded corners and a white interior'],
    ['triangle', 'Triangle', 'One large outlined triangle with a white interior'],
    ['big_and_small', 'Big and Small', 'Two copies of one shape at different sizes with plenty of space between'],
    ['waves', 'Waves', 'Two wide, smooth curves with generous white space'],
    ['picture_in_circle', 'Picture in a Circle', 'One very large circle around a familiar simple picture'],
    ['moon', 'Moon', 'One large crescent moon with room to color'],
  ];

  const toddlerSinglePage = {
    coloring: 0,
    findIt: 1,
    maze: 7,
    letterTracing: 3,
    countObjects: 6,
    findLetter: 1,
    drawMissingDetail: 4,
    tracePath: 7,
    matchingPage: 6,
    finishPattern: 6,
    journalPage: 0
  };

  function buildToddlerPage(values, helpers, pageIndex) {
    const [, title, layout] = toddlerPages[pageIndex];
    return `Create one printable page titled "${title}".

${toddlerGuidance}

Main creature: ${helpers.promptValue(values.name)}, a ${helpers.promptValue(values.creatureMix)}
Magic: ${helpers.promptValue(values.magic)}
Home/background: ${helpers.promptValue(values.home)}
What they are like: ${helpers.promptValue(values.personality)}
Accessories: ${helpers.promptValue(values.accessories)}
Extra detail: ${helpers.promptValue(values.extraDetail)}
${getStoryCharacterDetails(values)}

Picture layout: ${layout}.`;
  }


  const preschoolAgeRange = 'Preschool — ages 3–4';
  const preschoolGuidance = 'Make a black-and-white activity for ages 3–4 on one US Letter sheet. Use one short direction a grown-up can read aloud, large recognizable pictures, bold outlines, and generous white space. Accept pointing, finger tracing, or a crayon mark. Keep counting groups to one to three visible objects, matching to one or two pairs, and patterns to one AB row with two choices. For paths, use a clear start and finish with plenty of room. Show one example only when it helps. Require no independent reading, written answers, or exact marks.';

  const preschoolPages = [
    ['color_a_friend', 'Color a Friend', 'Color the character.', 'One large, friendly creature with open coloring areas'],
    ['look_and_find', 'Look and Find', 'Point to one kind of picture.', 'One pictured target and up to five large objects in the play area'],
    ['wide_trail', 'Follow the Trail', 'Follow a wide path from a dot to a picture.', 'One unbranched path with a clear start and one easy turn'],
    ['picture_pairs', 'Picture Pairs', 'Point to or connect each picture and its twin.', 'Two clearly different pictures and one matching copy of each'],
    ['touch_and_count', 'Touch and Count', 'Touch each object while counting aloud.', 'Large visible objects in separate groups of one, two, or three'],
    ['big_and_little', 'Big and Little', 'Point to the bigger picture.', 'Two copies of one object at noticeably different sizes'],
    ['what_comes_next', 'What Comes Next?', 'Point to the picture that continues the row.', 'One complete ABAB example followed by one empty space and two choices'],
    ['short_strokes', 'Two Little Trails', 'Trace two strokes with a finger or crayon.', 'Two short dotted strokes, one straight and one gently curved, with start dots'],
    ['one_detail', 'Add One Detail', 'Draw one simple thing in a large open area.', 'One big object or scene with space for a single drawing'],
    ['free_draw', 'Draw Something', 'Draw anything the character might like.', 'One small picture in a corner and a large white drawing area']
  ];

  const preschoolSinglePage = {
    coloring: preschoolPages[0],
    findIt: preschoolPages[1],
    maze: preschoolPages[2],
    letterTracing: ['one_letter_trace', 'Trace One Letter', 'A grown-up names one letter, then the child may trace it with a finger.', 'One large dotted uppercase initial from the creature’s name and one small picture'],
    countObjects: preschoolPages[4],
    findLetter: ['one_letter_find', 'Find One Letter', 'A grown-up names the target letter. Point to its twin.', 'One large example letter and just two clearly different letter choices'],
    drawMissingDetail: preschoolPages[8],
    tracePath: preschoolPages[7],
    matchingPage: preschoolPages[3],
    finishPattern: preschoolPages[6],
    journalPage: preschoolPages[9]
  };

  const tkAgeRange = 'TK / Pre-K — ages 4–5';
  const tkGuidance = 'Create a black-and-white US Letter activity for ages 4–5. Use one short direction a grown-up can read aloud, large targets, and open drawing space. Count visible groups of up to five and offer a choice of numerals that the grown-up can name. Show one uppercase example when working with letters. Use a wide path or one simple turn, up to three picture pairs, and one clear AB pattern before adding another row. Pointing, circling, and drawing are all valid responses. Keep each page focused on one skill.';
  const tkFirstLetter = ['first_letter', 'Find the First Letter', 'Name the big uppercase initial together. Point to its match.', 'One large model initial, its creature picture, and three clearly different uppercase choices'];
  const tkCount = ['count_to_five', 'Count and Choose a Number', 'Count the visible pictures, then point to their number.', 'Up to three groups with no more than five pictures per group, each with a choice of three large numerals'];
  const tkPages = [
    preschoolPages[0],
    ['picture_search', 'Picture Search', 'Find and circle the named objects.', 'Three target pictures among a few large distractors, with one model target'],
    preschoolPages[2],
    tkFirstLetter,
    tkCount,
    preschoolPages[5],
    preschoolPages[6],
    preschoolPages[7],
    ['three_picture_pairs', 'Picture Pairs', 'Point to or connect the picture twins.', 'Three easy-to-distinguish picture pairs with generous spacing'],
    preschoolPages[8]
  ];
  const tkSinglePage = {
    ...preschoolSinglePage,
    findIt: tkPages[1],
    findLetter: tkFirstLetter,
    countObjects: tkCount,
    matchingPage: tkPages[8]
  };


  const kindergartenAgeRange = 'Kindergarten — ages 5–6';
  const kindergartenGuidance = 'Create a black-and-white US Letter activity for ages 5–6. Put one short direction and, when useful, one worked example at the top. Use bold outlines, readable letters and numerals, large targets, and room for a pencil or crayon. Count visible objects through ten and offer a numeral choice or one optional written digit. For early literacy, model an uppercase and lowercase letter or one short name before asking for a response. Use clear paths and one repeating unit per row. A grown-up can read each direction. Avoid tiny print, dense grids, division, and long written answers.';
  const kindergartenPages = [
    tkPages[0],
    ['picture_search', 'Picture Search', 'Find and circle the pictured objects.', 'One compact reference row with three or four targets and a clear picture scene'],
    ['maze', 'Follow the Maze', 'Go from the start dot to the picture at the finish.', 'One wide, solvable maze with a short route and up to two dead ends'],
    ['trace_a_name', 'Trace a Name', 'Trace the creature’s name. Try writing it once if you want.', 'One readable name model, one dotted line for tracing, and one optional blank writing line'],
    ['count_to_ten', 'Count and Choose a Number', 'Count each group and point to or circle its number.', 'Up to three clearly separated groups of at most ten visible objects, with up to three large numeral choices each'],
    ['capital_and_lowercase', 'Find the Capital and Lowercase Letter', 'Circle the letters that match the examples.', 'One uppercase and lowercase pair at the top and a small grid of mixed letters'],
    ['draw_a_detail', 'Add a Detail', 'Draw one thing that would help the creature.', 'One picture prompt and a large white drawing area'],
    ['three_trails', 'Trace Three Trails', 'Trace from each dot to its picture.', 'Three short trails: a straight one, a curve, and a gentle zigzag or loop'],
    ['four_picture_pairs', 'Picture Pairs', 'Connect each picture to its twin.', 'Up to four visibly distinct pairs with open space between columns'],
    ['complete_pattern', 'Finish the Picture Patterns', 'Circle the picture that continues each row.', 'Two or three simple AB or AAB rows with one missing item and two illustrated choices']
  ];

  const kindergartenSinglePage = {
    coloring: kindergartenPages[0],
    findIt: kindergartenPages[1],
    maze: kindergartenPages[2],
    letterTracing: kindergartenPages[3],
    countObjects: kindergartenPages[4],
    findLetter: kindergartenPages[5],
    drawMissingDetail: kindergartenPages[6],
    tracePath: kindergartenPages[7],
    matchingPage: kindergartenPages[8],
    finishPattern: kindergartenPages[9],
    journalPage: ['picture_journal', 'Picture Journal', 'Draw one thing the creature saw. Add a word if you want.', 'One small picture cue, a large drawing area, and one optional writing line']
  };


  const firstGradeAgeRange = '1st Grade — ages 6–7';
  const firstGradeGuidance = 'Create a black-and-white US Letter activity for ages 6–7. Use one short direction, large readable type, dark outlines, and enough space to write a word, a number, or one short sentence. When helpful, give one worked example. Model addition or subtraction within 20 with objects or ten-frames. For reading, use familiar short words and simple sentence starters with picture clues. Keep the task focused and suitable for an early reader.';
  const firstGradePages = [
    kindergartenPages[0],
    ['read_and_find', 'Read and Find', 'Read each short clue and circle its picture.', 'Three named objects with pictured clues and four or five easy-to-see items'],
    ['maze', 'Find the Route', 'Read the goal and follow a route from start to finish.', 'One solvable maze with a clear start, finish and a few broad branching paths'],
    ['trace_a_sentence', 'Trace a Short Sentence', 'Read and trace the sentence. Try writing it once.', 'One short creature sentence in a model, one dotted trace line, and one blank writing line'],
    ['add_and_subtract', 'Add and Subtract to 20', 'Use the pictures or ten-frames to solve.', 'Three readable addition or subtraction sentences with results between zero and twenty, shown with countable objects'],
    ['match_words', 'Read and Match the Words', 'Read each word and match it to its picture.', 'Three familiar words and three visibly distinct matching pictures'],
    ['draw_and_label', 'Draw and Label', 'Draw one thing the creature needs and label it.', 'One themed cue, an open drawing area and space for one short label'],
    ['follow_and_trace', 'Trace Short Paths', 'Trace each path from its starting dot to a picture.', 'Three varied short paths with enough space for a pencil'],
    ['picture_pairs', 'Compare the Pairs', 'Connect each picture to its twin.', 'Four distinct picture pairs and wide space between the columns'],
    ['extend_pattern', 'Finish the Pattern', 'Find the repeating unit and add the next picture.', 'A few AB, AAB, or ABC rows with large pictures, each missing one item']
  ];
  const firstGradeSinglePage = {
    coloring: firstGradePages[0],
    findIt: firstGradePages[1],
    maze: firstGradePages[2],
    letterTracing: firstGradePages[3],
    countObjects: firstGradePages[4],
    findLetter: ['beginning_sound', 'Find the Beginning Sound', 'Say the printed letter and circle pictures that start with its sound.', 'One uppercase model and four familiar illustrated words with clear beginning sounds'],
    drawMissingDetail: firstGradePages[6],
    tracePath: firstGradePages[7],
    matchingPage: firstGradePages[5],
    finishPattern: firstGradePages[9],
    journalPage: ['picture_journal', 'Picture Journal', 'Draw something the creature saw and write one short sentence.', 'One sentence starter, a drawing box and one or two writing lines']
  };

  const secondGradeAgeRange = '2nd Grade — ages 7–8';
  const secondGradeGuidance = 'Create a black-and-white activity for ages 7–8 on one US Letter sheet. Use readable text, clear working space, and a short instruction. For reading, write a three- or four-sentence passage and ask two questions that the text can answer. Give a small, unambiguous word bank for vocabulary. For math, use two-digit addition and subtraction within 100, including clear space to show regrouping. For picture graphs, use a key of one picture per item and ask for a comparison or total. Keep the answer blanks empty and avoid color-dependent clues.';
  const secondGradePages = [
    firstGradePages[0],
    firstGradePages[1],
    firstGradePages[2],
    ['read_and_answer', 'Read and Answer', 'Read the short story and answer two questions.', 'A self-contained passage with three or four short sentences and two text-based questions, each with answer space'],
    ['two_digit_math', 'Add and Subtract Within 100', 'Solve the equations and explain how you solved one.', 'A few two-digit equations within 100, including some with regrouping, and a short story problem with working space'],
    ['word_bank', 'Finish the Sentences', 'Use each word from the bank once.', 'A three-word bank, three sentences with clear clues and space to write each word'],
    firstGradePages[6],
    ['picture_graph', 'Read the Picture Graph', 'Use the graph to compare amounts and find a total.', 'Three labeled rows, a key with one picture per item, and two or three comparison or total questions'],
    firstGradePages[8],
    ['extend_patterns', 'Extend the Pattern', 'Find the repeating unit and draw the next two items.', 'Two patterns with big pictures, enough repeats to establish the unit, and two blank spaces per row']
  ];
  const secondGradeSinglePage = {
    coloring: secondGradePages[0],
    findIt: secondGradePages[1],
    maze: secondGradePages[2],
    letterTracing: ['write_a_sentence', 'Write a Complete Sentence', 'Copy the model sentence and write one of your own.', 'One short creature-related sentence in readable print and two generous writing lines'],
    countObjects: secondGradePages[4],
    findLetter: ['find_the_vowel', 'Find the Vowel', 'Read the short words and circle the model vowel each time it appears.', 'One model vowel and four to six short, plainly printed words'],
    drawMissingDetail: secondGradePages[6],
    tracePath: firstGradePages[7],
    matchingPage: firstGradePages[5],
    finishPattern: secondGradePages[9],
    journalPage: ['write_a_journal_entry', 'Picture Journal', 'Draw what happened, then write one or two sentences about it.', 'A small story cue, a picture box and a few ruled writing lines']
  };


  const thirdGradeAgeRange = '3rd Grade — ages 8–9';
  const thirdGradeGuidance = 'Create a black-and-white US Letter activity for ages 8–9. Use clear headings, readable type, and room to show work. Ask for a detail from the text when the reader explains an answer. Model multiplication and exact division with equal groups or arrays and use whole numbers within 100. Show fractions with equal parts of the same whole. Give a scaled bar graph a clear labeled axis, categories, and units. For writing, give a beginning, middle, and ending cue. Provide one clear task, and leave the answer spaces empty.';
  const thirdGradePages = [
    secondGradePages[0],
    ['logic_clues', 'Find the Order', 'Read three clues and arrange the named items.', 'Three different items, enough noncontradictory clues for exactly one order, and three clearly labeled positions'],
    secondGradePages[2],
    ['read_and_explain', 'Read and Explain', 'Read both paragraphs. Use a detail from the text to explain one answer.', 'Two short paragraphs, two literal questions, one inference with evidence, and space to write'],
    ['multiply_and_divide', 'Multiply and Divide', 'Use equal groups to find the product or quotient.', 'A clear equal-group model, related multiplication and exact division within 100, and one short word problem'],
    secondGradePages[5],
    secondGradePages[6],
    ['scaled_bar_graph', 'Read a Scaled Bar Graph', 'Use a labeled graph to compare amounts and find the total.', 'Three categories, bars with a common baseline, a number axis that counts by twos, and short questions with blank answer space'],
    ['fractions_of_a_whole', 'Fractions of a Whole', 'Shade equal parts and compare two of the bars.', 'Large bars of the same length, clearly marked equal partitions, and familiar fractions such as one half and two fourths'],
    ['plan_a_scene', 'Plan and Write a Scene', 'Plan what happens and write a short scene.', 'One creature-centered cue, a few story words and roomy beginning, middle, and ending sections']
  ];
  const thirdGradeSinglePage = {
    coloring: thirdGradePages[0],
    findIt: thirdGradePages[1],
    maze: thirdGradePages[2],
    letterTracing: ['revise_a_sentence', 'Write and Revise a Sentence', 'Copy one short sentence and add a descriptive detail.', 'One short model sentence and two wide writing lines'],
    countObjects: thirdGradePages[4],
    findLetter: ['word_patterns', 'Find the Word Pattern', 'Find the words that share the model spelling pattern.', 'One familiar model spelling pattern such as ai, then six to eight real, readable words'],
    drawMissingDetail: thirdGradePages[6],
    tracePath: firstGradePages[7],
    matchingPage: ['match_models', 'Match the Math Models', 'Match each equal-group picture with its equation.', 'Three distinct equal-group pictures and three multiplication expressions, with exactly one match for each'],
    finishPattern: secondGradePages[9],
    journalPage: thirdGradePages[9]
  };


  const fourthGradeAgeRange = '4th Grade — ages 9–10';
  const fourthGradeGuidance = 'Create a black-and-white US Letter activity for ages 9–10, with clear instructions and generous space to show work. Use multi-digit multiplication, exact division by a one-digit number, or a realistic two-step word problem. Label all dimensions for area and perimeter. For fraction addition or subtraction, use like denominators and bars of equal length. Mark map-grid axes and directions unambiguously. In reading and writing activities, ask for a short response with a supporting detail. Check that all clues have a unique solution and leave the answer spaces blank.';
  const fourthGradePages = [
    thirdGradePages[0],
    ['schedule_logic', 'Build the Schedule', 'Use the clues to place four tasks in order.', 'Four named tasks, one set of noncontradictory ordering clues, and a short timetable with four empty rows'],
    ['map_grid', 'Read the Map Grid', 'Read the column before the row. Use the compass to describe a route.', 'A letter-and-number grid with three distinct symbols, north and east marked, and an in-bounds route question'],
    thirdGradePages[3],
    ['multi_digit_math', 'Multiply, Divide and Explain', 'Solve each problem and show your work.', 'Multi-digit multiplication, exact division with a one-digit divisor and a two-step story problem with labeled quantities'],
    ['affixes', 'Build Words with Affixes', 'Use meaning clues to combine a prefix or suffix with a base word.', 'Three unambiguous affix choices, three base words, and space to use a completed word in a sentence'],
    ['area_perimeter', 'Area and Perimeter', 'Find and compare the area and perimeter of the rectangles.', 'Two rectangles with labeled lengths, consistent units and clear working space'],
    thirdGradePages[7],
    ['fraction_operations', 'Add and Subtract Fractions', 'Model each problem and compare the answers.', 'Like denominators, two equal-length partitioned bars and space for an equation and explanation'],
    thirdGradePages[9]
  ];
  const fourthGradeSinglePage = {
    coloring: fourthGradePages[0],
    findIt: fourthGradePages[1],
    maze: fourthGradePages[2],
    letterTracing: ['revise_for_clarity', 'Revise for Clarity', 'Copy the sentence, then revise it so the action is clearer.', 'One short sentence about the creature and three generously ruled lines'],
    countObjects: fourthGradePages[4],
    findLetter: fourthGradePages[5],
    drawMissingDetail: fourthGradePages[6],
    tracePath: fourthGradePages[2],
    matchingPage: ['match_fraction_models', 'Match Fraction Models', 'Match each shaded bar to the fraction it shows.', 'Three equal-sized bars with distinct values and exactly one matching fraction per bar'],
    finishPattern: ['extend_number_pattern', 'Extend a Number Pattern', 'Write the next two terms and state the rule.', 'Three short number sequences, each with a single stated operation to infer and two answer spaces'],
    journalPage: fourthGradePages[9]
  };


  const fifthGradeAgeRange = '5th Grade — ages 10–11';
  const fifthGradeGuidance = 'Create a black-and-white US Letter activity for ages 10–11. Keep directions concise and leave room for calculations and written evidence. For decimals, label quantities and units and keep the numbers to hundredths. Use common denominators to add or subtract unlike fractions. For data, label axes, units and tick marks. Label all three dimensions on rectangular prisms. For reading, use two brief accounts with distinct perspectives and ask for evidence from both. Check that each question has enough information and leave the answer spaces blank.';
  const fifthGradePages = [
    fourthGradePages[0],
    ['elapsed_time', 'Plan the Schedule', 'Use the task lengths to work out start and finish times.', 'Four tasks in a fixed sequence, a given start time and blank start and end columns, with one time-comparison question'],
    fourthGradePages[2],
    ['compare_accounts', 'Compare Two Accounts', 'Read both accounts and cite details that show how they differ.', 'Two short accounts about the same event, distinct perspectives, and room for a response using both texts'],
    ['solve_decimals', 'Solve With Decimals', 'Solve the decimal problems and show the units.', 'Three short situations involving decimal addition, subtraction or multiplication by a whole number, with work boxes'],
    fourthGradePages[5],
    ['compare_box_volumes', 'Compare Box Volumes', 'Find both prism volumes and calculate the difference.', 'Two diagrams with all three dimensions labeled in the same units and room for equations and cubic units'],
    ['fractional_line_plot', 'Make a Fractional Line Plot', 'Plot each measurement, then compare the values or find their total.', 'A short data set in halves and quarters, a labeled line with consistent tick marks, and two or three questions'],
    ['unlike_fractions', 'Add and Subtract Unlike Fractions', 'Use a common denominator and show an equivalent fraction.', 'Two operations with unlike denominators and a short context problem, all using the same whole within each problem'],
    fourthGradePages[9]
  ];
  const fifthGradeSinglePage = {
    coloring: fifthGradePages[0],
    findIt: fifthGradePages[1],
    maze: fifthGradePages[2],
    letterTracing: ['revise_a_paragraph', 'Revise a Paragraph', 'Rewrite a short paragraph with clearer transitions.', 'Three simple sentences and ample ruled space for a revised paragraph'],
    countObjects: fifthGradePages[4],
    findLetter: fifthGradePages[5],
    drawMissingDetail: fifthGradePages[6],
    tracePath: fifthGradePages[2],
    matchingPage: ['match_equivalent_fractions', 'Match Equivalent Fractions', 'Match each fraction with an equivalent fraction.', 'Four fraction pairs with distinct values and a clear, unique match for each'],
    finishPattern: ['complete_decimal_pattern', 'Complete a Decimal Pattern', 'Fill in the next two terms and explain the rule.', 'Three sequences using decimals through hundredths, one explicit operation per row and generous blank space'],
    journalPage: fifthGradePages[9]
  };


  const sixthGradeAgeRange = '6th Grade — ages 11–12';
  const sixthGradeGuidance = 'Create a black-and-white US Letter activity for ages 11–12. Use clear directions, readable tables and space to show the reasoning. Use equivalent ratios and unit rates with real units, labeled axes for all four coordinate quadrants, and simple expressions or equations with a defined variable. For statistics, give a small data set and ask how a change affects its measures. Use fractions with exact values and clear units. For argument writing, give two reasonable options and evidence for each. Check the math, make the task solvable, and leave answers and work spaces blank.';
  const sixthGradePages = [
    fifthGradePages[0],
    ['ratios_and_rates', 'Ratios and Unit Rates', 'Complete the table and explain the relationship.', 'An equivalent-ratio table with labeled quantities, a unit-rate question and one application'],
    ['four_quadrant_grid', 'Read a Coordinate Plane', 'Read and plot ordered pairs and find a horizontal or vertical distance.', 'A labeled four-quadrant grid with consistent scaling, a few marked points and room for one new point'],
    fifthGradePages[3],
    ['expressions_equations', 'Expressions and Equations', 'Evaluate, solve and check. Write an equation for the context problem.', 'A short expression, a one-variable equation with an exact solution and a relatable word problem with working space'],
    fifthGradePages[5],
    fifthGradePages[6],
    ['summarize_data', 'Summarize a Data Set', 'Find mean, median and range. Explain what changes when one value changes.', 'Seven fully visible numbers, a stated change to one observation and open working spaces'],
    ['divide_fractions', 'Divide by Fractions', 'Use a model or equation and name the unit.', 'Two numerical fraction divisions and one realistic measurement problem with matching units'],
    ['claim_and_evidence', 'Make and Support a Claim', 'Choose a plan and support the claim with a detail from each option.', 'Two reasonable short options with a benefit and a limitation each, plus space for a claim, evidence and a trade-off']
  ];
  const sixthGradeSinglePage = {
    coloring: sixthGradePages[0],
    findIt: sixthGradePages[1],
    maze: sixthGradePages[2],
    letterTracing: ['revise_an_argument', 'Revise an Argument', 'Rewrite a short claim so the evidence clearly supports it.', 'One sample claim, two relevant details and generous ruled writing space'],
    countObjects: sixthGradePages[4],
    findLetter: sixthGradePages[5],
    drawMissingDetail: sixthGradePages[6],
    tracePath: sixthGradePages[2],
    matchingPage: ['match_equivalent_ratios', 'Match Equivalent Ratios', 'Match each ratio with its equivalent value.', 'Four clearly different ratio pairs with exactly one match per item'],
    finishPattern: ['complete_ratio_table', 'Complete a Ratio Table', 'Find the unit rate and fill the missing entries.', 'A labeled quantity table with one row of completed values and two or three missing entries'],
    journalPage: sixthGradePages[9]
  };


  const earlyLearningTiers = {
    [preschoolAgeRange]: { pages: preschoolPages, singlePage: preschoolSinglePage, guidance: preschoolGuidance, maze: false },
    [tkAgeRange]: { pages: tkPages, singlePage: tkSinglePage, guidance: tkGuidance, maze: false },
    [kindergartenAgeRange]: { pages: kindergartenPages, singlePage: kindergartenSinglePage, guidance: kindergartenGuidance, maze: true },
    [firstGradeAgeRange]: { pages: firstGradePages, singlePage: firstGradeSinglePage, guidance: firstGradeGuidance, maze: true },
    [secondGradeAgeRange]: { pages: secondGradePages, singlePage: secondGradeSinglePage, guidance: secondGradeGuidance, maze: true },
    [thirdGradeAgeRange]: { pages: thirdGradePages, singlePage: thirdGradeSinglePage, guidance: thirdGradeGuidance, maze: true },
    [fourthGradeAgeRange]: {
      pages: fourthGradePages, singlePage: fourthGradeSinglePage, guidance: fourthGradeGuidance,
      page3Direction: '- Page 03 is a coordinate map. Keep the grid labels and compass visible.',
      qualityCheck: '- Are the labels clear and is there room to show work?'
    },
    [fifthGradeAgeRange]: {
      pages: fifthGradePages, singlePage: fifthGradeSinglePage, guidance: fifthGradeGuidance,
      page3Direction: '- Page 03 is a coordinate map. Keep the grid labels and compass visible.',
      qualityCheck: '- Are the units, text evidence and answer spaces clear?'
    },
    [sixthGradeAgeRange]: {
      pages: sixthGradePages, singlePage: sixthGradeSinglePage, guidance: sixthGradeGuidance,
      page3Direction: '- Page 03 is a four-quadrant coordinate grid. Keep its axes and scale visible.',
      qualityCheck: '- Are the axes, quantities, units and evidence clear?'
    }
  };

  function earlyLearningTier(age) {
    if (Object.hasOwn(earlyLearningTiers, age)) return earlyLearningTiers[age];
    return Object.hasOwn(activityAgeRangeInstructions, age) ? null : earlyLearningTiers[preschoolAgeRange];
  }



  function buildEarlyLearningPage(values, helpers, page, guidance) {
    const [, title, instruction, layout] = page;
    const creatureContext = [
      ['Name', values.name], ['Creature', values.creatureMix], ['Magic', values.magic],
      ['Home/background', values.home], ['Personality', values.personality],
      ['Accessories', values.accessories], ['Extra detail', values.extraDetail]
    ].map(([label, value]) => label + ': ' + helpers.promptValue(value)).join('\n');
    return [
      'Create one printable page titled "' + title + '".', guidance,
      creatureContext + getStoryCharacterDetails(values),
      'Grown-up direction: ' + instruction, 'Picture layout: ' + layout + '.'
    ].join('\n\n');
  }


  const activityAgeRangeInstructions = {
    [toddlerAgeRange]: toddlerGuidance,
    'Daycare — ages 2–3': 'Design this activity for ages 2–3 with a grown-up reading one short direction aloud. Use one action per page, bold black outlines, large pictures, generous white space, and at most two choices for pointing or matching. Let the child point, touch, name, color, or make a mark. If counting, model one or two objects. If tracing, use a short, wide finger path with a clear start. Adapt any later instructions to this age: replace letter work, narrow mazes, complex patterns, and precision tasks with a simple picture or finger activity. Keep the page black and white and leave plenty of room for chunky crayons.',
    [preschoolAgeRange]: preschoolGuidance,
    [tkAgeRange]: tkGuidance,
    [kindergartenAgeRange]: kindergartenGuidance,
    [firstGradeAgeRange]: firstGradeGuidance,
    [secondGradeAgeRange]: secondGradeGuidance,
    [thirdGradeAgeRange]: thirdGradeGuidance,
    [fourthGradeAgeRange]: fourthGradeGuidance,
    [fifthGradeAgeRange]: fifthGradeGuidance,
    [sixthGradeAgeRange]: sixthGradeGuidance
  };

  function getActivityAgeRangeInstruction(values) {
    return activityAgeRangeInstructions[values.activityAgeRange] || activityAgeRangeInstructions[preschoolAgeRange];
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
        const isToddler = values.activityAgeRange === toddlerAgeRange;
        const tier = earlyLearningTier(values.activityAgeRange);
        const earlyLearningPages = tier?.pages;
        const isEarlyReader = [firstGradeAgeRange, secondGradeAgeRange, thirdGradeAgeRange, fourthGradeAgeRange, fifthGradeAgeRange, sixthGradeAgeRange].includes(values.activityAgeRange);
        const activityPages = isToddler ? toddlerPages.map(([part, title, layout], index) => [
          String(index + 1).padStart(2, '0'), part, title, 'A simple picture to look at or color.', layout,
          'instructions, worksheet tasks, tiny details, or answer spaces'
        ]) : earlyLearningPages ? earlyLearningPages.map(([part, title, instruction, layout], index) => [
          String(index + 1).padStart(2, '0'), part, title, instruction, layout,
          isEarlyReader ? 'small targets, long instructions, or long written answers' : 'small targets, long instructions, or written answers'
        ]) : [
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
${isToddler ? '- Make each page a large picture or simple shape with plenty of white space.' :
  tier?.page3Direction ? tier.page3Direction :
  tier?.maze ? '- Give one short direction for each activity. Page 03 is the only maze and should have a wide route.' :
  earlyLearningPages ? '- Show one short grown-up direction on each page. Use a wide unbranched route for Page 03.' :
    '- Make only Page 03 a maze. Pages 08, 09, and 10 must not look like mazes.'}
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
${isToddler ? '- Is the main picture large and clear, with enough room for scribbling?' : tier?.qualityCheck ? tier.qualityCheck : isEarlyReader ? '- Is the direction clear for an early reader?' : '- Is it preschool / early-child friendly?'}

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

  for (const [key, pageIndex] of Object.entries(toddlerSinglePage)) {
    const build = artifacts[key].build;
    artifacts[key].build = (values, helpers) => values.activityAgeRange === toddlerAgeRange
      ? buildToddlerPage(values, helpers, pageIndex)
      : build(values, helpers);
  }

  for (const key of Object.keys(preschoolSinglePage)) {
    const build = artifacts[key].build;
    artifacts[key].build = (values, helpers) => {
      const tier = earlyLearningTier(values.activityAgeRange);
      return tier
        ? buildEarlyLearningPage(values, helpers, tier.singlePage[key], tier.guidance)
        : build(values, helpers);
    };
  }

  return {
    buildImagePrompt,
    artifacts
  };
})();
