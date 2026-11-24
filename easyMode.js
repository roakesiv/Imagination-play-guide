(() => {
  const get = id => document.getElementById(id);
  const type = get('easy-type');
  const agePicker = get('easy-age');
  const result = get('easy-result');
  const editor = get('easy-edit');
  const fields = get('easy-fields');
  const output = get('easy-prompt');
  const status = get('easy-status');
  const ages = window.creatureAppContent.activityAgeRange;
  const ideaOptions = window.easyIdeaOptions;
  const styles = window.creatureAppContent.styleSuggestions;
  const worksheets = [...document.querySelectorAll('#artifactChoices [data-output]')]
    .map(button => [button.dataset.output, button.querySelector('strong').textContent])
    .filter(([id]) => !['card', 'coloring', 'activityBookPacket'].includes(id));
  const lastPicks = new Map();
  let idea;

  agePicker.append(...ages.options.map(age => new Option(age)));
  agePicker.value = ages.defaultValue;

  function pick(key, options) {
    const choices = options.filter(value => value !== lastPicks.get(key));
    const chosen = choices[Math.floor(Math.random() * choices.length)];
    lastPicks.set(key, chosen);
    return chosen;
  }

  function isPicture() {
    return type.value === 'poster' || type.value === 'party';
  }

  function randomIdea() {
    const draw = key => pick(key, ideaOptions[key]);
    if (isPicture()) {
      return {
        subject: draw('creatureMix'), theme: draw('occasions'), colors: draw('colors'),
        setting: draw('home'), creatures: draw('companions'), extra: draw('extraDetail'),
        direction: pick('style', styles), photo: idea?.photo || 'no',
        versions: Number.isInteger(Number(idea?.versions)) && Number(idea.versions) > 0 ? idea.versions : '1',
        ink: idea?.ink || 'full color', words: idea?.words || ''
      };
    }
    const next = {};
    for (const field of window.creatureAppContent.fields) {
      next[field.key] = field.key === 'pictureStyle' ? pick('style', styles) : draw(field.key);
    }
    if (type.value === 'activity') next.worksheet = pick('worksheet', worksheets.map(([id]) => id));
    return next;
  }

  function addField(key, label, choices) {
    const id = 'easy-field-' + key;
    const group = document.createElement('div');
    const caption = document.createElement('label');
    caption.htmlFor = id;
    caption.textContent = label;
    const control = document.createElement(choices ? 'select' : 'input');
    if (choices) {
      for (const choice of choices) {
        const [value, text] = Array.isArray(choice) ? choice : [choice, choice];
        control.append(new Option(text, value));
      }
    } else if (key === 'versions') {
      control.type = 'number';
      control.min = '1';
      control.step = '1';
      control.required = true;
    } else {
      control.type = 'text';
    }
    control.id = id;
    control.name = key;
    control.value = idea[key];
    group.append(caption, control);
    fields.append(group);
  }

  function showFields() {
    fields.replaceChildren();
    if (isPicture()) {
      addField('subject', 'Featured creature');
      addField('theme', 'Occasion or theme');
      addField('colors', 'Favorite colors');
      addField('setting', 'Setting');
      addField('creatures', 'Other animals or creatures');
      addField('photo', 'Add a reference photo in your image creator?', [['no', 'No photo'], ['yes', 'Yes — feature my photo with the creature']]);
      addField('extra', 'Anything else to include or leave out?');
      addField('direction', 'Art direction');
      addField('ink', 'Picture style', ['full color', 'black-and-white line art']);
      addField('versions', 'Number of versions');
      addField('words', 'Words to print (optional)');
    } else {
      if (type.value === 'activity') addField('worksheet', 'Activity', worksheets);
      for (const field of window.creatureAppContent.fields) addField(field.key, field.title);
    }
  }

  function updateResult() {
    const invalid = fields.querySelector(':invalid');
    get('easy-copy').disabled = Boolean(invalid);
    status.textContent = '';
    if (invalid) {
      output.value = '';
      status.textContent = 'Choose a whole number of versions, starting at 1.';
      return;
    }
    const heading = get('easy-title');
    const summary = get('easy-summary');
    const hint = get('easy-hint');
    const age = agePicker.value;
    hint.textContent = 'Copy the prompt and paste it into ChatGPT or another AI tool that can create images.';
    if (isPicture()) {
      const withPhoto = idea.photo === 'yes';
      heading.textContent = idea.theme || type.selectedOptions[0].text;
      summary.textContent = [idea.subject, idea.setting, idea.creatures].filter(Boolean).join(' · ');
      output.value = window.rheaPartyPrint.buildPrompt({
        ...idea, age, subjectText: withPhoto ? 'The subject of my attached photo' : idea.subject,
        creatures: withPhoto ? [idea.subject, idea.creatures].filter(Boolean).join(', ') : idea.creatures,
        versions: Number(idea.versions), party: type.value === 'party', withPhoto, ownIdea: true, item: {}
      });
      if (withPhoto) hint.textContent += ' Attach your reference photo there.';
    } else {
      const values = { ...idea, activityAgeRange: age };
      const builder = window.creaturePromptBuilder;
      const artifactType = type.value === 'packet' ? 'activityBookPacket' : idea.worksheet || 'coloring';
      heading.textContent = idea.name || type.selectedOptions[0].text;
      const worksheet = worksheets.find(([key]) => key === idea.worksheet);
      summary.textContent = [worksheet?.[1], idea.creatureMix, idea.magic, idea.home].filter(Boolean).join(' · ');
      output.value = type.value === 'creature'
        ? builder.buildImagePrompt(values) + '\n\nAudience: ' + age + '.'
        : builder.buildArtifactOutput(artifactType, values).output;
      if (type.value === 'packet') hint.textContent += ' Type NEXT after each page to make the next one.';
    }
  }

  get('easy-generate').addEventListener('click', () => {
    idea = randomIdea();
    showFields();
    updateResult();
    result.hidden = false;
    get('easy-announcement').textContent = 'New idea: ' + get('easy-title').textContent + '.';
  });
  agePicker.addEventListener('change', () => {
    if (idea) updateResult();
  });
  type.addEventListener('change', () => {
    idea = null;
    result.hidden = true;
    editor.open = false;
    fields.replaceChildren();
    output.value = '';
    status.textContent = '';
    get('easy-announcement').textContent = '';
  });
  function changeDetail(event) {
    if (!idea || !fields.contains(event.target)) return;
    idea[event.target.name] = event.target.value;
    updateResult();
  }
  fields.addEventListener('input', changeDetail);
  fields.addEventListener('change', changeDetail);
  get('easy-copy').addEventListener('click', () => copyText(output, status, 'Prompt copied.'));
})();
