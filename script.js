const appContent = window.creatureAppContent || {};
const storyCharacterContent = window.storyCharacterContent || {};
const promptBuilder = window.creaturePromptBuilder || {};
const creatureStorage = window.creatureStorage || {};
const parentTips = appContent.parentTips || {};
const fieldDefinitions = appContent.fields || [];
const fieldMap = Object.fromEntries(fieldDefinitions.map((field) => [field.id, field]));
const activityAgeRangeContent = appContent.activityAgeRange || {};
const defaultActivityAgeRange = activityAgeRangeContent.defaultValue || 'Preschool — ages 3–4';
const detailFieldOrder = [
  'creatureName',
  'creatureMix',
  'magic',
  'colors',
  'home',
  'personality',
  'accessories',
  'extraDetail',
  'activityAgeRange',
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
  'activityAgeRange',
  'pictureStyle',
  'storyCharacterId',
  'storyCharacterTitle',
  'storyCharacterRole',
  'storyCharacterSymbol',
  'storyCharacterVisualLock',
  'storyCharacterGlobalRule'
];
const creatureContentDataKeys = creatureDataKeys.filter((key) => key !== 'activityAgeRange');

const fields = detailFieldOrder.map((id) => {
  if (id === 'activityAgeRange') {
    return {
      id,
      label: activityAgeRangeContent.label || 'Activity age range',
      key: 'activityAgeRange',
      inputType: 'select'
    };
  }

  return {
    id,
    label: fieldMap[id].title,
    key: fieldMap[id].key,
    inputType: 'text'
  };
});
const exampleValues = appContent.exampleValues || {};
const confirmations = appContent.confirmations || {};
const savedCreaturesContent = appContent.savedCreatures || {};
const styleSuggestions = appContent.styleSuggestions || [];
const bridgeContent = appContent.bridge || {};
const storyCharacters = storyCharacterContent.characters || [];

renderQuestionFields();
renderActivityAgeRangeSelector();
renderParentTips();
renderBridgeContent();
renderStoryCharacterPicker();

const form = document.querySelector('#creatureForm');
const saveStatus = document.querySelector('#saveStatus');
const promptOutput = document.querySelector('#promptOutput');
const summaryOutput = document.querySelector('#summaryOutput');
const detailsOutput = document.querySelector('#detailsOutput');
const copyButton = document.querySelector('#copyButton');
const resetButton = document.querySelector('#resetButton');
const fillExampleButton = document.querySelector('#fillExampleButton');
const saveCreatureButton = document.querySelector('#saveCreatureButton');
const savedCreaturesHeading = document.querySelector('#saved-creatures-heading');
const savedCreatureList = document.querySelector('#savedCreatureList');
const storyCharacterSelect = document.querySelector('#storyCharacterSelect');
const useStoryCharacterButton = document.querySelector('#useStoryCharacterButton');
const storyCharacterPreview = document.querySelector('#storyCharacterPreview');
const copyStatus = document.querySelector('#copyStatus');
const styleInput = document.querySelector('#pictureStyle');
const artifactChoices = document.querySelector('#artifactChoices');
const artifactOutputPanel = document.querySelector('#artifactOutputPanel');
const artifactTitle = document.querySelector('#artifactTitle');
const artifactOutput = document.querySelector('#artifactOutput');
const copyArtifactButton = document.querySelector('#copyArtifactButton');
const artifactCopyStatus = document.querySelector('#artifactCopyStatus');
let currentArtifactType = '';
let activeStoryCharacterData = {};

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

function renderActivityAgeRangeSelector() {
  const container = document.querySelector('#activityAgeRangeMount');
  if (!container) {
    return;
  }

  const options = activityAgeRangeContent.options || [defaultActivityAgeRange];
  container.innerHTML = `<div class="question-block">
    <div class="prompt-label"><span aria-hidden="true">&#127891;</span><label for="activityAgeRange">${escapeHtml(activityAgeRangeContent.label || 'Activity age range')}</label></div>
    <p class="parent-script">${escapeHtml(activityAgeRangeContent.helperText || '')}</p>
    <select id="activityAgeRange" name="activityAgeRange">
      ${options.map((option) => `<option value="${escapeHtml(option)}"${option === defaultActivityAgeRange ? ' selected' : ''}>${escapeHtml(option)}</option>`).join('')}
    </select>
  </div>`;
}

function renderBridgeContent() {
  const activityBookPacketHelp = document.querySelector('#activityBookPacketHelp');
  if (activityBookPacketHelp) {
    activityBookPacketHelp.textContent = bridgeContent.activityBookPacketHelp || '';
  }
}

function renderStoryCharacterPicker() {
  const select = document.querySelector('#storyCharacterSelect');
  if (!select) {
    return;
  }

  select.innerHTML = storyCharacters.map((character) => (
    `<option value="${escapeHtml(character.id)}">${escapeHtml(character.name)} - ${escapeHtml(character.title)}</option>`
  )).join('');

  renderStoryCharacterPreview(select.value);
}

function getStoryCharacter(id) {
  return storyCharacters.find((character) => character.id === id) || storyCharacters[0] || null;
}

function createStoryCharacterData(character) {
  const creatureData = createEmptyCreatureData();
  Object.assign(creatureData, character.data || {});
  creatureData.storyCharacterId = character.id;
  creatureData.storyCharacterTitle = character.title || '';
  creatureData.storyCharacterRole = character.role || '';
  creatureData.storyCharacterSymbol = character.symbol || '';
  creatureData.storyCharacterVisualLock = (character.visualLock || []).join('; ');
  creatureData.storyCharacterGlobalRule = storyCharacterContent.globalVisualRule || '';

  return creatureData;
}

function renderStoryCharacterPreview(id) {
  const preview = document.querySelector('#storyCharacterPreview');
  if (!preview) {
    return;
  }

  const character = getStoryCharacter(id);
  if (!character) {
    preview.innerHTML = '<p class="saved-empty">No story characters available.</p>';
    return;
  }

  preview.innerHTML = `<p><strong>${escapeHtml(character.name)}</strong> - ${escapeHtml(character.role)}</p>
    <p>${escapeHtml(character.creatureType)} with ${escapeHtml(character.magic)}.</p>
    <p>${escapeHtml(character.personality)}</p>`;
}

function createEmptyCreatureData() {
  return creatureDataKeys.reduce((creatureData, key) => {
    creatureData[key] = key === 'activityAgeRange' ? defaultActivityAgeRange : '';
    return creatureData;
  }, {});
}

function getCreatureData() {
  const creatureData = createEmptyCreatureData();

  fields.forEach((field) => {
    if (field.inputType === 'select') {
      const select = document.querySelector(`#${field.id}`);
      creatureData[field.key] = select ? select.value : defaultActivityAgeRange;
      return;
    }

    creatureData[field.key] = document.querySelector(`#${field.id}`).value.trim();
  });

  Object.assign(creatureData, activeStoryCharacterData);

  return creatureData;
}

function getStoryCharacterMetadata(creatureData) {
  const metadata = {};
  creatureDataKeys.forEach((key) => {
    if (key.startsWith('storyCharacter') && typeof creatureData[key] === 'string') {
      metadata[key] = creatureData[key];
    }
  });

  return metadata.storyCharacterId ? metadata : {};
}

function setActiveStoryCharacterData(creatureData) {
  activeStoryCharacterData = getStoryCharacterMetadata(creatureData);
}

function hasCreatureData(creatureData) {
  return creatureContentDataKeys.some((key) => creatureData[key]);
}

function confirmIfCreatureHasData(message) {
  if (!hasCreatureData(getCreatureData())) {
    return true;
  }

  return window.confirm(message);
}

function getSavedCreatureLabel(savedCreature) {
  return typeof savedCreature.name === 'string' && savedCreature.name
    ? savedCreature.name
    : savedCreaturesContent.unnamed || 'Unnamed Creature';
}

function getSavedCreatureData(savedCreature) {
  const savedData = savedCreature && savedCreature.data ? savedCreature.data : {};
  const creatureData = createEmptyCreatureData();

  creatureDataKeys.forEach((key) => {
    creatureData[key] = typeof savedData[key] === 'string' ? savedData[key] : creatureData[key];
  });

  return creatureData;
}

function setCreatureData(creatureData) {
  setActiveStoryCharacterData(creatureData);

  fields.forEach((field) => {
    const input = document.querySelector(`#${field.id}`);
    if (input) {
      input.value = typeof creatureData[field.key] === 'string' ? creatureData[field.key] : createEmptyCreatureData()[field.key];
    }
  });
}

function clearGeneratedOutputs() {
  promptOutput.value = '';
  copyButton.disabled = true;
  copyStatus.textContent = '';
  artifactOutput.value = '';
  artifactOutputPanel.hidden = true;
  artifactCopyStatus.textContent = '';
  currentArtifactType = '';
  document.querySelectorAll('.choice-card').forEach((choice) => {
    choice.classList.remove('is-selected');
  });
}

function useSelectedStoryCharacter() {
  const character = getStoryCharacter(storyCharacterSelect.value);
  if (!character) {
    setSaveStatus('Story character unavailable');
    return;
  }

  if (!confirmIfCreatureHasData(confirmations.loadSavedCreature || 'Loading this saved creature will replace the creature on the page. Continue?')) {
    setSaveStatus('Load canceled');
    return;
  }

  const creatureData = createStoryCharacterData(character);
  setCreatureData(creatureData);
  renderDetails(creatureData);
  summaryOutput.textContent = buildSummary(creatureData);
  clearGeneratedOutputs();
  saveCurrentCreature();
  setSaveStatus(`${character.name} loaded`);
}

function setSaveStatus(message) {
  if (saveStatus) {
    saveStatus.textContent = message;
  }
}

function saveCurrentCreature() {
  if (typeof creatureStorage.saveCurrentCreature !== 'function') {
    return;
  }

  const didSave = creatureStorage.saveCurrentCreature(getCreatureData());
  setSaveStatus(didSave ? 'Saved locally' : 'Local save unavailable');
}

function restoreCurrentCreature() {
  if (typeof creatureStorage.loadCurrentCreature !== 'function') {
    return;
  }

  const savedCreature = creatureStorage.loadCurrentCreature();
  if (!savedCreature) {
    return;
  }

  const creatureData = createEmptyCreatureData();
  creatureDataKeys.forEach((key) => {
    creatureData[key] = typeof savedCreature[key] === 'string' ? savedCreature[key] : creatureData[key];
  });

  if (!hasCreatureData(creatureData)) {
    return;
  }

  setCreatureData(creatureData);
  renderDetails(creatureData);
  summaryOutput.textContent = buildSummary(creatureData);
  setSaveStatus('Restored last creature');
}

function renderSavedCreatures() {
  if (!savedCreatureList || typeof creatureStorage.loadSavedCreatures !== 'function') {
    return;
  }

  if (savedCreaturesHeading) {
    savedCreaturesHeading.textContent = savedCreaturesContent.title || 'Saved Creatures';
  }

  if (saveCreatureButton) {
    saveCreatureButton.textContent = savedCreaturesContent.saveButton || 'Save Creature';
  }

  const savedCreatures = creatureStorage.loadSavedCreatures();
  if (!savedCreatures.length) {
    savedCreatureList.innerHTML = `<p class="saved-empty">${escapeHtml(savedCreaturesContent.empty || 'No saved creatures yet.')}</p>`;
    return;
  }

  savedCreatureList.innerHTML = savedCreatures.map((savedCreature) => `
    <div class="saved-creature-row" data-creature-id="${escapeHtml(savedCreature.id)}">
      <span class="saved-creature-name">${escapeHtml(getSavedCreatureLabel(savedCreature))}</span>
      <div class="saved-creature-actions">
        <button class="secondary-button compact-button" type="button" data-action="load-saved">${escapeHtml(savedCreaturesContent.loadButton || 'Load')}</button>
        <button class="secondary-button compact-button delete-button" type="button" data-action="delete-saved">${escapeHtml(savedCreaturesContent.deleteButton || 'Delete')}</button>
      </div>
    </div>
  `).join('');
}

function saveCreatureToList() {
  if (typeof creatureStorage.addSavedCreature !== 'function') {
    setSaveStatus('Saved list unavailable');
    return;
  }

  const creatureData = getCreatureData();
  if (!hasCreatureData(creatureData)) {
    setSaveStatus('Add creature details before saving');
    return;
  }

  const savedCreature = creatureStorage.addSavedCreature(creatureData);
  if (!savedCreature) {
    setSaveStatus('Saved list unavailable');
    return;
  }

  renderSavedCreatures();
  saveCurrentCreature();
  setSaveStatus(`${getSavedCreatureLabel(savedCreature)} saved`);
}

function loadSavedCreature(id) {
  if (typeof creatureStorage.loadSavedCreatures !== 'function') {
    return;
  }

  if (!confirmIfCreatureHasData(confirmations.loadSavedCreature || 'Loading this saved creature will replace the creature on the page. Continue?')) {
    setSaveStatus('Load canceled');
    return;
  }

  const savedCreature = creatureStorage.loadSavedCreatures().find((creature) => creature.id === id);
  if (!savedCreature) {
    setSaveStatus('Saved creature not found');
    renderSavedCreatures();
    return;
  }

  const creatureData = getSavedCreatureData(savedCreature);
  setCreatureData(creatureData);
  renderDetails(creatureData);
  summaryOutput.textContent = buildSummary(creatureData);
  clearGeneratedOutputs();
  saveCurrentCreature();
  setSaveStatus(`${getSavedCreatureLabel(savedCreature)} loaded`);
}

function deleteSavedCreature(id) {
  if (typeof creatureStorage.deleteSavedCreature !== 'function') {
    return;
  }

  if (!window.confirm(confirmations.deleteSavedCreature || 'Delete this saved creature?')) {
    setSaveStatus('Delete canceled');
    return;
  }

  const didDelete = creatureStorage.deleteSavedCreature(id);
  renderSavedCreatures();
  setSaveStatus(didDelete ? 'Saved creature deleted' : 'Delete unavailable');
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
  saveCurrentCreature();
  generateOutputs();
  promptOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

form.addEventListener('input', () => {
  saveCurrentCreature();
});

form.addEventListener('change', () => {
  saveCurrentCreature();
});

resetButton.addEventListener('click', (event) => {
  if (!confirmIfCreatureHasData(confirmations.reset || 'Reset will clear this creature. Continue?')) {
    event.preventDefault();
    setSaveStatus('Reset canceled');
    return;
  }

  window.setTimeout(() => {
    activeStoryCharacterData = {};
    summaryOutput.textContent = 'Make a creature to see the summary.';
    renderDetails(createEmptyCreatureData());
    clearGeneratedOutputs();
    if (typeof creatureStorage.clearCurrentCreature === 'function') {
      creatureStorage.clearCurrentCreature();
    }
    setSaveStatus('');
  }, 0);
});

fillExampleButton.addEventListener('click', () => {
  if (!confirmIfCreatureHasData(confirmations.fillExample || 'Fill Example will replace this creature. Continue?')) {
    setSaveStatus('Example canceled');
    return;
  }

  Object.entries(exampleValues).forEach(([id, value]) => {
    document.querySelector(`#${id}`).value = value;
  });
  activeStoryCharacterData = {};
  copyStatus.textContent = '';
  saveCurrentCreature();
});

saveCreatureButton.addEventListener('click', () => {
  saveCreatureToList();
});

if (storyCharacterSelect) {
  storyCharacterSelect.addEventListener('change', () => {
    renderStoryCharacterPreview(storyCharacterSelect.value);
  });
}

if (useStoryCharacterButton) {
  useStoryCharacterButton.addEventListener('click', () => {
    useSelectedStoryCharacter();
  });
}

savedCreatureList.addEventListener('click', (event) => {
  const actionButton = event.target.closest('[data-action]');
  const savedCreatureRow = event.target.closest('.saved-creature-row');
  if (!actionButton || !savedCreatureRow) {
    return;
  }

  const creatureId = savedCreatureRow.dataset.creatureId;
  if (actionButton.dataset.action === 'load-saved') {
    loadSavedCreature(creatureId);
  }

  if (actionButton.dataset.action === 'delete-saved') {
    deleteSavedCreature(creatureId);
  }
});

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const suggestion = chip.dataset.style;
    const currentValue = styleInput.value.trim();
    const parts = currentValue ? currentValue.split(',').map((part) => part.trim()) : [];

    if (!parts.includes(suggestion)) {
      styleInput.value = currentValue ? `${currentValue}, ${suggestion}` : suggestion;
      saveCurrentCreature();
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

restoreCurrentCreature();
renderSavedCreatures();

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
