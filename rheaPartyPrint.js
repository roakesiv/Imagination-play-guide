(() => {
  function printFile(id, layout) {
    return 'printables/party/' + id + '-' + layout + '.pdf';
  }

  function buildPrompt({
    subjectText, age, party, ink, versions, ownIdea, withPhoto, item,
    theme, colors, setting, creatures, extra, direction, words
  }) {
    const format = party ? 'party sheet' : 'wall poster';
    const outputRequest = versions === 1
      ? 'Generate one finished ' + format + ' image.'
      : 'Generate ' + versions + ' separate finished ' + format + ' images. Deliver each version as its own printable image.';
    const photoInstruction = ownIdea
      ? 'Use my attached reference photo for the subject. Keep the person or subject recognizable.'
      : 'Include the subject of my attached reference photo alongside ' + subjectText + '. Keep the subject of the photo recognizable.';
    const lines = [
      outputRequest,
      party
        ? 'On each US Letter sheet repeat the same design four times in a 2 by 2 grid. Leave cutting space and equal margins.'
        : 'Use one full-page composition per US Letter poster with comfortable printable margins.',
      'Audience: ' + age + '. Use a friendly, age-appropriate composition.',
      'Art treatment: ' + ink + '. Keep the subject fully inside the printable area.',
      subjectText ? 'Subject: ' + subjectText : '',
      item.details,
      item.id ? 'Use the attached Rhea illustration as the appearance reference. Preserve the established silhouette, markings and accessories.' : '',
      withPhoto ? photoInstruction : '',
      theme ? 'Occasion or theme: ' + theme : '',
      colors ? (ink === 'full color' ? 'Favorite colors: ' : 'Translate this palette into black-and-white line work and patterns: ') + colors : '',
      setting ? 'Setting: ' + setting : '',
      creatures ? 'Include these animals or creatures: ' + creatures : '',
      extra ? 'Additional requests: ' + extra : '',
      versions > 1 ? 'Keep all requested details in every version. Vary the composition or moment from one version to the next.' : '',
      direction ? 'Art direction: ' + direction : '',
      words ? 'Include this exact lettering: ' + words : 'Picture only. Leave out lettering.'
    ];
    return lines.filter(Boolean).join('\n\n');
  }

  function setup(characters) {
    const form = document.getElementById('poster-form');
    const subject = document.getElementById('poster-subject');
    const ideaField = document.getElementById('poster-idea-field');
    const idea = document.getElementById('poster-idea');
    const age = document.getElementById('poster-age');
    const ready = document.getElementById('poster-ready');
    const pdf = document.getElementById('poster-pdf');
    const preview = document.getElementById('poster-preview');
    const custom = document.getElementById('poster-custom');
    const customTitle = custom.querySelector('summary');
    const useOwnIdea = document.getElementById('poster-use-own');
    const result = document.getElementById('poster-result');
    const output = document.getElementById('poster-prompt');
    const status = document.getElementById('poster-copy-status');
    const sources = new Map();
    const ageOptions = window.creatureAppContent.activityAgeRange;
    age.replaceChildren(...ageOptions.options.map(value => new Option(value, value)));
    age.value = ageOptions.defaultValue;

    function clearPrompt() {
      idea.setCustomValidity('');
      result.hidden = true;
      output.value = '';
      status.textContent = '';
    }

    function refreshLayout() {
      const item = sources.get(subject.value);
      const existingArt = Boolean(item && item.id);
      const layout = form.elements['poster-layout'].value;
      const personal = subject.value === 'new';
      ideaField.hidden = !personal;
      customTitle.textContent = personal ? 'Make a custom picture prompt' : 'Make a custom picture with ' + (item.name || 'your creature');
      if (useOwnIdea) useOwnIdea.hidden = personal;
      ready.hidden = !existingArt;
      preview.hidden = !existingArt;
      preview.replaceChildren();
      if (existingArt) {
        pdf.href = printFile(item.id, layout);
        pdf.textContent = layout === 'party' ? 'Open four-picture party sheet' : 'Open full-page poster';
        preview.dataset.layout = layout;
        const count = layout === 'party' ? 4 : 1;
        for (let i = 0; i < count; i++) {
          const img = document.createElement('img');
          img.src = 'portraits/' + item.id + '.webp';
          img.alt = '';
          if (i === 0) img.addEventListener('load', () => {
            if (preview.firstElementChild === img) preview.style.aspectRatio = img.naturalWidth > img.naturalHeight ? '11 / 8.5' : '8.5 / 11';
          });
          preview.append(img);
        }
      } else {
        pdf.removeAttribute('href');
        custom.open = true;
      }
    }

    function addSource(group, key, label, item) {
      sources.set(key, item);
      group.append(new Option(label, key));
    }

    function savedDescription(data) {
      const lines = window.creatureAppContent.fields
        .filter(field => typeof data[field.key] === 'string' && data[field.key].trim())
        .map(field => field.title + ': ' + data[field.key]);
      if (data.storyCharacterVisualLock) lines.push('Established appearance: ' + data.storyCharacterVisualLock);
      return lines.join('\n');
    }

    function open(preferDraft) {
      const cast = document.createElement('optgroup');
      cast.label = 'The world of Rhea';
      const family = document.createElement('optgroup');
      family.label = 'Your creatures';
      sources.clear();
      for (const character of characters) {
        const details = Object.entries(character.details)
          .filter(([, value]) => value)
          .map(([label, value]) => label + ': ' + value).join('\n');
        addSource(cast, character.id, character.name, { id: character.id, name: character.name, details });
      }
      const current = getCreatureData();
      if (hasCreatureData(current)) {
        addSource(family, 'current', 'Current creature · ' + (current.name || 'Unnamed creature'), {
          name: current.name, details: savedDescription(current), age: current.activityAgeRange
        });
      }
      for (const record of window.creatureStorage.loadSavedCreatures()) {
        const data = record.data || {};
        const name = data.name || record.name || 'Unnamed creature';
        addSource(family, 'saved:' + record.id, 'Saved · ' + name, {
          name, details: savedDescription(data), age: data.activityAgeRange
        });
      }
      sources.set('new', {});
      subject.replaceChildren(new Option('My child or my own idea', 'new'), cast);
      if (family.childElementCount) subject.append(family);
      subject.value = preferDraft && sources.has('current') ? 'current' : 'new';
      if (preferDraft && ageOptions.options.includes(current.activityAgeRange)) age.value = current.activityAgeRange;
      clearPrompt();
      refreshLayout();
    }

    useOwnIdea?.addEventListener('click', () => {
      subject.value = 'new';
      subject.dispatchEvent(new Event('change', { bubbles: true }));
      idea.focus();
    });
    subject.addEventListener('change', () => {
      const selected = sources.get(subject.value);
      if (selected && ageOptions.options.includes(selected.age)) age.value = selected.age;
      refreshLayout();
    });
    form.addEventListener('input', clearPrompt);
    form.addEventListener('change', event => {
      clearPrompt();
      if (event.target.name === 'poster-layout') refreshLayout();
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const item = sources.get(subject.value);
      if (!item) return;
      const ownIdea = subject.value === 'new';
      const answer = key => document.getElementById('poster-' + key).value.trim();
      const withPhoto = answer('photo') === 'yes';
      const theme = answer('theme');
      const colors = answer('colors');
      const setting = answer('setting');
      const creatures = answer('creatures');
      const extra = answer('extra');
      const direction = answer('direction');
      const words = answer('words');
      const subjectText = ownIdea ? idea.value.trim() : (item.name || 'My creature');
      if (ownIdea && !withPhoto && ![subjectText, theme, colors, setting, creatures, extra, direction, words].some(Boolean)) {
        idea.setCustomValidity('Describe your idea, answer a picture question, or choose a reference picture.');
        idea.reportValidity();
        return;
      }
      const versions = document.getElementById('poster-versions').valueAsNumber;
      const party = form.elements['poster-layout'].value === 'party';
      const ink = form.elements['poster-ink'].value;
      const reference = document.getElementById('poster-reference');
      reference.hidden = !item.id;
      if (item.id) reference.href = 'portraits/' + item.id + '.webp';
      else reference.removeAttribute('href');
      const nextSteps = ['Copy the prompt into your image creator.'];
      if (withPhoto) nextSteps.push('Attach your reference picture there.');
      if (item.id) nextSteps.push('Download and attach the Rhea illustration for the character.');
      document.getElementById('poster-next-step').textContent = nextSteps.join(' ');
      output.value = buildPrompt({
        subjectText, age: age.value, party, ink, versions, ownIdea, withPhoto, item,
        theme, colors, setting, creatures, extra, direction, words
      });
      result.hidden = false;
      status.textContent = '';
      document.getElementById('poster-copy').focus();
    });
    document.getElementById('poster-copy').addEventListener('click', () => {
      copyText(output, status, 'Picture prompt copied.');
    });
    return open;
  }
  window.rheaPartyPrint = { printFile, setup, buildPrompt };
})();
