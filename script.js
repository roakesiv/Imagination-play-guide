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
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  generateOutputs();
  promptOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

resetButton.addEventListener('click', () => {
  window.setTimeout(() => {
    promptOutput.value = '';
    summaryOutput.textContent = 'Make a prompt to see the creature summary.';
    renderDetails({});
    copyButton.disabled = true;
    copyStatus.textContent = '';
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

  try {
    await navigator.clipboard.writeText(promptOutput.value);
    copyStatus.textContent = 'Prompt copied.';
  } catch (error) {
    promptOutput.select();
    document.execCommand('copy');
    copyStatus.textContent = 'Prompt copied.';
  }
});
