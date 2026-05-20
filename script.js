const appContent = window.creatureAppContent || {};
const promptBuilder = window.creaturePromptBuilder || {};
const parentTips = appContent.parentTips || {};
const fieldDefinitions = appContent.fields || [];
const fieldMap = Object.fromEntries(fieldDefinitions.map((field) => [field.id, field]));
const detailFieldOrder = [
  'creatureName',
  'creatureMix',
  'magic',
  'colors',
  'home',
  'personality',
  'accessories',
  'extraDetail',
  'pictureStyle'
];

// Creature data contract consumed by prompt templates and builder helpers.
const creatureDataKeys = [
  'name',
  'creatureMix',
  'magic',
  'colors',
  'home',
  'personality',
  'accessories',
  'extraDetail',
  'pictureStyle'
];

const fields = detailFieldOrder.map((id) => ({
  id,
  label: fieldMap[id].title,
  key: fieldMap[id].key
}));
const exampleValues = appContent.exampleValues || {};
const styleSuggestions = appContent.styleSuggestions || [];

renderQuestionFields();
renderParentTips();

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

function renderParentTips() {
  const container = document.querySelector('#parentTipsMount');
  if (!container || !parentTips.summary) {
    return;
  }

  container.innerHTML = `<details class="parent-tips">
    <summary>${escapeHtml(parentTips.summary)}</summary>
    <div class="parent-tips-content">
      <p>${escapeHtml(parentTips.intro)}</p>
      <p>${escapeHtml(parentTips.body)}</p>
      <p>${escapeHtml(parentTips.promptNote)}</p>
      <p class="tips-label">Tips:</p>
      <ul>
        ${(parentTips.tips || []).map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}
      </ul>
    </div>
  </details>`;
}

function renderQuestionFields() {
  const container = document.querySelector('#questionFields');
  if (!container) {
    return;
  }

  container.innerHTML = fieldDefinitions.map((field) => {
    const chips = field.id === 'pictureStyle'
      ? `<div class="chip-group" aria-label="Picture style suggestions">
          ${styleSuggestions.map((style) => `<button type="button" class="chip" data-style="${escapeHtml(style)}">${escapeHtml(style)}</button>`).join('')}
        </div>`
      : '';

    return `<div class="question-block">
      <div class="prompt-label"><span aria-hidden="true">${escapeHtml(field.marker)}</span><label for="${escapeHtml(field.id)}">${escapeHtml(field.question)}</label></div>
      <p class="parent-script">${escapeHtml(field.suggestion)}</p>
      <input id="${escapeHtml(field.id)}" name="${escapeHtml(field.id)}" type="text" placeholder="${escapeHtml(field.placeholder)}" autocomplete="off">
      ${chips}
    </div>`;
  }).join('');
}

function createEmptyCreatureData() {
  return creatureDataKeys.reduce((creatureData, key) => {
    creatureData[key] = '';
    return creatureData;
  }, {});
}

function getCreatureData() {
  const creatureData = createEmptyCreatureData();

  fields.forEach((field) => {
    creatureData[field.key] = document.querySelector(`#${field.id}`).value.trim();
  });

  return creatureData;
}

function promptValue(value) {
  return promptBuilder.promptValue(value);
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
  const creatureData = getCreatureData();
  promptOutput.value = promptBuilder.buildImagePrompt(creatureData);
  summaryOutput.textContent = buildSummary(creatureData);
  renderDetails(creatureData);
  copyButton.disabled = false;
  copyStatus.textContent = '';

  if (currentArtifactType) {
    renderArtifact(currentArtifactType);
  }
}

function renderArtifact(type) {
  const artifact = promptBuilder.buildArtifactOutput(type, getCreatureData());
  if (!artifact) {
    return;
  }

  currentArtifactType = type;
  artifactTitle.textContent = artifact.title;
  artifactOutput.value = artifact.output;
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
