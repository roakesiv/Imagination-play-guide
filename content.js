window.creatureAppContent = {
  parentTips: {
    summary: '\u2728 Need a tip?',
    intro: 'This app helps you guide creative play without inventing everything yourself.',
    body: "Use it as a guide, not a script. Ask the questions your way, follow the kid's ideas, and type the weird details exactly. The silly, specific answers make the creature feel like theirs.",
    promptNote: 'This app makes an AI-ready prompt. It does not create the image by itself. Copy the prompt, then paste it into ChatGPT or another image generator.',
    tips: [
      'Let the kid be weird.',
      'Use examples as inspiration, not limits.',
      'Name can come last.',
      'Skip anything that slows the game down.',
      'Change scary or famous-character ideas into made-up kid-friendly versions.'
    ]
  },
  fields: [
    {
      id: 'creatureMix',
      key: 'creatureMix',
      title: 'Creature Type',
      question: 'What type of magical creature is it?',
      suggestion: 'Combinations are great. Such as dragon, raccoon, pony, unicorn, mermaid.',
      placeholder: 'dragon + flower + unicorn cloud',
      marker: '\uD83E\uDDE9'
    },
    {
      id: 'magic',
      key: 'magic',
      title: 'Magic',
      question: 'What magic does the creature have?',
      suggestion: 'What about sparkles, water, rainbow, glitter, music?',
      placeholder: 'bubble shield magic',
      marker: '\u2728'
    },
    {
      id: 'colors',
      key: 'colors',
      title: 'Colors',
      question: 'What color is the creature?',
      suggestion: 'Blue, red, rainbow, anything works. One color, rainbow, or a very specific rule.',
      placeholder: 'rainbow but not blue',
      marker: '\uD83C\uDFA8'
    },
    {
      id: 'home',
      key: 'home',
      title: 'Home',
      question: 'Where does the magic creature live?',
      suggestion: 'A cave, castle, puddle, planet, or made-up place.',
      placeholder: 'a castle higher than space',
      marker: '\uD83C\uDFF0'
    },
    {
      id: 'personality',
      key: 'personality',
      title: 'Personality',
      question: 'What is the magic creature like?',
      suggestion: 'Silly, brave, sleepy, bossy, gentle, or new words.',
      placeholder: 'kind and silly',
      marker: '\uD83D\uDC9B'
    },
    {
      id: 'accessories',
      key: 'accessories',
      title: 'Accessories',
      question: 'What does the magic creature carry or wear?',
      suggestion: 'A crown, backpack, boots, snacks, or nothing.',
      placeholder: 'books and shiny boots',
      marker: '\uD83C\uDF92'
    },
    {
      id: 'extraDetail',
      key: 'extraDetail',
      title: 'Extra',
      question: 'Is there anything else you want to add?',
      suggestion: 'This can be tiny, strange, or completely surprising.',
      placeholder: 'sneezes glitter stars',
      marker: '\uD83C\uDF1F'
    },
    {
      id: 'creatureName',
      key: 'name',
      title: 'Name',
      question: "What is the magic creature's name?",
      suggestion: 'You can decide this last.',
      placeholder: 'Amor',
      marker: '\uD83D\uDCDB'
    },
    {
      id: 'pictureStyle',
      key: 'pictureStyle',
      title: 'Picture style',
      question: 'Picture style',
      suggestion: 'Pick a button or invent a style.',
      placeholder: 'cuddly storybook',
      marker: '\uD83D\uDD8D\uFE0F'
    }
  ],
  styleSuggestions: [
    'storybook',
    'cuddly',
    'cute cartoon',
    'kids anime',
    'magical nature',
    'candy fantasy',
    'spooky but friendly',
    'dreamy',
    'soft watercolor',
    'bright fantasy'
  ],
  activityAgeRange: {
    label: 'Activity age range',
    helperText: 'Choose the child’s age or school stage to make the pages easier or harder.',
    defaultValue: 'Preschool — ages 3–4',
    options: [
      'Toddler — ages 1–2',
      'Daycare — ages 2–3',
      'Preschool — ages 3–4',
      'TK / Pre-K — ages 4–5',
      'Kindergarten — ages 5–6',
      '1st Grade — ages 6–7',
      '2nd Grade — ages 7–8',
      '3rd Grade — ages 8–9',
      '4th Grade — ages 9–10',
      '5th Grade — ages 10–11',
      '6th Grade — ages 11–12'
    ]
  },
  exampleValues: {
    creatureMix: 'raccoon witch + pony',
    magic: 'invisibility + water',
    colors: 'purple and blue',
    home: 'castle of candy and balloons',
    personality: 'kind and brave',
    accessories: 'books and toys',
    extraDetail: 'loves storytime',
    creatureName: 'Amor',
    pictureStyle: 'cuddly storybook',
    activityAgeRange: 'Preschool — ages 3–4'
  },
  confirmations: {
    fillExample: 'Fill Example will replace the creature you are working on. Continue?',
    reset: 'Reset will clear this creature from the page and local save. Continue?',
    loadSavedCreature: 'Loading this saved creature will replace the creature on the page. Continue?',
    deleteSavedCreature: 'Delete this saved creature?'
  },
  savedCreatures: {
    title: 'Saved Creatures',
    saveButton: 'Save Creature',
    empty: 'No saved creatures yet.',
    unnamed: 'Unnamed Creature',
    loadButton: 'Load',
    deleteButton: 'Delete'
  },
  bridge: {
    activityBookPacketHelp: 'Copy this packet prompt into ChatGPT or another image creator. It will make exactly 10 activity pages, one at a time. After each page, type NEXT to keep going.'
  }
};
