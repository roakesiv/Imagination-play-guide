const fields = [
  { id: 'creatureName', label: 'Name', key: 'name' },
  { id: 'creatureMix', label: 'Creature mix', key: 'creatureMix' },
  { id: 'magic', label: 'Magic', key: 'magic' },
  { id: 'colors', label: 'Colors', key: 'colors' },
  { id: 'home', label: 'Home', key: 'home' },
  { id: 'personality', label: 'What they are like', key: 'personality' },
  { id: 'accessories', label: 'Accessories', key: 'accessories' },
  { id: 'extraDetail', label: 'Extra weird detail', key: 'extraDetail' },
  { id: 'pictureStyle', label: 'Picture style', key: 'pictureStyle' }
];

const exampleValues = {
  creatureMix: 'raccoon witch + pony',
  magic: 'demon hunter',
  colors: 'grey',
  home: 'castle of candy and balloons',
  personality: 'kind',
  accessories: 'books and toys',
  extraDetail: 'loves storytime',
  creatureName: 'Amor',
  pictureStyle: 'cuddly storybook'
};

const form = document.querySelector('#creatureForm');
const promptOutput = document.querySelector('#promptOutput');
const summaryOutput = document.querySelector('#summaryOutput');
const detailsOutput = document.querySelector('#detailsOutput');
const copyButton = document.querySelector('#copyButton');
const resetButton = document.querySelector('#resetButton');
const fillExampleButton = document.querySelector('#fillExampleButton');
const copyStatus = document.querySelector('#copyStatus');
const styleInput = document.querySelector('#pictureStyle');
const artifactChoices = document.querySelector('#artifactChoices');
const artifactOutputPanel = document.querySelector('#artifactOutputPanel');
const artifactTitle = document.querySelector('#artifactTitle');
const artifactOutput = document.querySelector('#artifactOutput');
const copyArtifactButton = document.querySelector('#copyArtifactButton');
const artifactCopyStatus = document.querySelector('#artifactCopyStatus');
let currentArtifactType = '';

function getValues() {
  return fields.reduce((values, field) => {
    values[field.key] = document.querySelector(`#${field.id}`).value.trim();
    return values;
  }, {});
}

function promptValue(value) {
  return value || 'not specified';
}

function buildPrompt(values) {
  return `Create a kid-friendly magical creature profile card image.

Put the creature's name clearly at the top in playful, readable storybook text.

Show the creature as the main focus of the card. Show the creature's home or habitat in the background. Add a fun profile-card layout with the creature's attributes listed clearly on the side or around the image.

Make the image cute, colorful, whimsical, imaginative, and safe for young children. Preserve the child's specific ideas, including silly, absurd, or unusual details. Do not make the image scary, violent, realistic horror, or adult.

Creature details:
Name: ${promptValue(values.name)}
Creature mix: ${promptValue(values.creatureMix)}
Magic: ${promptValue(values.magic)}
Colors: ${promptValue(values.colors)}
Home: ${promptValue(values.home)}
What they are like: ${promptValue(values.personality)}
Accessories: ${promptValue(values.accessories)}
Extra weird detail: ${promptValue(values.extraDetail)}
Picture style: ${promptValue(values.pictureStyle)}

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

const artifactTemplates = {
  card: {
    title: 'Creature Card',
    build(values) {
      return `Kid-friendly magical creature profile card

Name: ${promptValue(values.name)}
Creature mix: ${promptValue(values.creatureMix)}
Magic: ${promptValue(values.magic)}
Colors: ${promptValue(values.colors)}
Home: ${promptValue(values.home)}
Personality: ${promptValue(values.personality)}
Carries or wears: ${promptValue(values.accessories)}
Fun fact: ${promptValue(values.extraDetail)}

Make it cute, colorful, whimsical, and safe for young children. Preserve every specific silly detail.`;
    }
  },
  story: {
    title: 'Story',
    build(values) {
      const name = values.name || 'the creature';
      return `Write a short, cozy kid-friendly story.

Main creature: ${name}, a ${promptValue(values.creatureMix)}
Magic: ${promptValue(values.magic)}
Home: ${promptValue(values.home)}
Colors: ${promptValue(values.colors)}
Personality: ${promptValue(values.personality)}
Special detail: ${promptValue(values.extraDetail)}

Story shape:
1. ${name} notices a tiny problem near ${promptValue(values.home)}.
2. ${name} uses ${promptValue(values.magic)} in a kind or funny way.
3. A friend helps or cheers.
4. End with everyone safe, happy, and ready to play again.`;
    }
  },
  adventure: {
    title: 'Adventure',
    build(values) {
      const name = values.name || 'the creature';
      return `Make a gentle adventure seed for young kids.

Hero: ${name}, a ${promptValue(values.creatureMix)}
Home base: ${promptValue(values.home)}
Magic tool: ${promptValue(values.magic)}
Personality: ${promptValue(values.personality)}
Carries or wears: ${promptValue(values.accessories)}

Quest: Help find a missing happy thing from ${promptValue(values.home)}.
Friendly helper: A tiny glowing guide who likes ${promptValue(values.colors)} things.
Obstacle: A silly mix-up, a locked door, or a confusing map.
Choice moment: Go over, under, around, or ask for help?
Reward: A cheerful celebration and a new badge for ${name}.`;
    }
  },
  coloring: {
    title: 'Coloring Page',
    build(values) {
      return `Create a printable coloring book page for a kid-friendly magical creature.

Main creature: ${promptValue(values.name)}, a ${promptValue(values.creatureMix)}
Magic: ${promptValue(values.magic)}
Home/background: ${promptValue(values.home)}
Personality: ${promptValue(values.personality)}
Extra detail to include: ${promptValue(values.extraDetail)}

Use clean bold outlines, simple shapes, open spaces for coloring, no heavy shading, no scary details, and a playful printable style.`;
    }
  },
  findIt: {
    title: 'Find-It Game',
    build(values) {
      return `Create a kid-friendly hidden-object activity page.

Scene: ${promptValue(values.name)}, a ${promptValue(values.creatureMix)}, is playing in ${promptValue(values.home)}.
Magic: ${promptValue(values.magic)}
Colors/vibe: ${promptValue(values.colors)}
Personality: ${promptValue(values.personality)}

Things to find:
${getFindItItems(values).map((item) => `- ${item}`).join('\n')}

Make the page whimsical, readable, safe for young children, and full of fun details.`;
    }
  }
};

function buildSummary(values) {
  const name = values.name || 'This creature';
  const descriptionParts = [];

  if (values.colors) {
    descriptionParts.push(values.colors);
  }

  if (values.creatureMix) {
    descriptionParts.push(values.creatureMix);
  }

  const sentences = [];

  if (descriptionParts.length && values.magic) {
    sentences.push(`${name} is a ${descriptionParts.join(' ')} with ${values.magic} magic.`);
  } else if (descriptionParts.length) {
    sentences.push(`${name} is a ${descriptionParts.join(' ')}.`);
  } else if (values.magic) {
    sentences.push(`${name} has ${values.magic} magic.`);
  } else {
    sentences.push(`${name} is ready for a magical profile card.`);
  }

  if (values.home) {
    sentences.push(`They live in ${values.home}.`);
  }

  if (values.personality && values.accessories) {
    sentences.push(`They are ${values.personality} and have ${values.accessories}.`);
  } else if (values.personality) {
    sentences.push(`They are ${values.personality}.`);
  } else if (values.accessories) {
    sentences.push(`They have ${values.accessories}.`);
  }

  if (values.extraDetail) {
    sentences.push(`One special detail is: ${values.extraDetail}.`);
  }

  return sentences.join(' ');
}

function renderDetails(values) {
  detailsOutput.innerHTML = fields.map((field) => {
    const value = promptValue(values[field.key]);
    return `<div><dt>${field.label}</dt><dd>${escapeHtml(value)}</dd></div>`;
  }).join('');
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function generateOutputs() {
  const values = getValues();
  promptOutput.value = buildPrompt(values);
  summaryOutput.textContent = buildSummary(values);
  renderDetails(values);
  copyButton.disabled = false;
  copyStatus.textContent = '';

  if (currentArtifactType) {
    renderArtifact(currentArtifactType);
  }
}

function renderArtifact(type) {
  const template = artifactTemplates[type];
  if (!template) {
    return;
  }

  currentArtifactType = type;
  artifactTitle.textContent = template.title;
  artifactOutput.value = template.build(getValues());
  artifactOutputPanel.hidden = false;
  artifactCopyStatus.textContent = '';

  document.querySelectorAll('.choice-card').forEach((choice) => {
    choice.classList.toggle('is-selected', choice.dataset.output === type);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  generateOutputs();
  promptOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

resetButton.addEventListener('click', () => {
  window.setTimeout(() => {
    promptOutput.value = '';
    summaryOutput.textContent = 'Make a creature to see the summary.';
    renderDetails({});
    copyButton.disabled = true;
    copyStatus.textContent = '';
    artifactOutput.value = '';
    artifactOutputPanel.hidden = true;
    artifactCopyStatus.textContent = '';
    currentArtifactType = '';
    document.querySelectorAll('.choice-card').forEach((choice) => {
      choice.classList.remove('is-selected');
    });
  }, 0);
});

fillExampleButton.addEventListener('click', () => {
  Object.entries(exampleValues).forEach(([id, value]) => {
    document.querySelector(`#${id}`).value = value;
  });
  copyStatus.textContent = '';
});

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const suggestion = chip.dataset.style;
    const currentValue = styleInput.value.trim();
    const parts = currentValue ? currentValue.split(',').map((part) => part.trim()) : [];

    if (!parts.includes(suggestion)) {
      styleInput.value = currentValue ? `${currentValue}, ${suggestion}` : suggestion;
    }

    styleInput.focus();
  });
});

copyButton.addEventListener('click', async () => {
  if (!promptOutput.value) {
    return;
  }

  await copyText(promptOutput, copyStatus, 'Prompt copied.');
});

artifactChoices.addEventListener('click', (event) => {
  const choice = event.target.closest('.choice-card');
  if (!choice) {
    return;
  }

  if (!promptOutput.value) {
    generateOutputs();
  }

  renderArtifact(choice.dataset.output);
  artifactOutputPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

copyArtifactButton.addEventListener('click', async () => {
  if (!artifactOutput.value) {
    return;
  }

  await copyText(artifactOutput, artifactCopyStatus, 'Output copied.');
});

async function copyText(textarea, statusElement, message) {
  try {
    await navigator.clipboard.writeText(textarea.value);
    statusElement.textContent = message;
  } catch (error) {
    textarea.select();
    document.execCommand('copy');
    statusElement.textContent = message;
  }
}
