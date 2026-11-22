(() => {
  function printFile(id, layout) {
    return 'printables/party/' + id + '-' + layout + '.pdf';
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
    const result = document.getElementById('poster-result');
    const output = document.getElementById('poster-prompt');
    const status = document.getElementById('poster-copy-status');
    const sources = new Map();
    const ageOptions = window.creatureAppContent.activityAgeRange;
    age.replaceChildren(...ageOptions.options.map(value => new Option(value, value)));
    age.value = ageOptions.defaultValue;

    function clearPrompt() {
      result.hidden = true;
      output.value = '';
      status.textContent = '';
    }

    function refreshLayout() {
      const item = sources.get(subject.value);
      const existingArt = Boolean(item && item.id);
      const layout = form.elements['poster-layout'].value;
      ideaField.hidden = subject.value !== 'new';
      idea.required = !ideaField.hidden;
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
      const previous = subject.value;
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
      addSource(family, 'new', 'My own idea', {});
      subject.replaceChildren(cast, family);
      if (preferDraft) subject.value = sources.has('current') ? 'current' : 'new';
      else if (sources.has(previous)) subject.value = previous;
      if (preferDraft && ageOptions.options.includes(current.activityAgeRange)) age.value = current.activityAgeRange;
      clearPrompt();
      refreshLayout();
    }

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
      if (ownIdea && !idea.value.trim()) { idea.focus(); return; }
      const layout = form.elements['poster-layout'].value;
      const ink = form.elements['poster-ink'].value;
      const theme = document.getElementById('poster-theme').value.trim();
      const words = document.getElementById('poster-words').value.trim();
      const lines = [
        layout === 'party'
          ? 'Design one US Letter party sheet with four identical cut-apart pictures in a 2 by 2 grid. Leave cutting space and equal margins.'
          : 'Design a single full-page US Letter wall poster with comfortable printable margins.',
        'Audience: ' + age.value + '. Use a friendly, age-appropriate composition.',
        'Art treatment: ' + ink + '. Keep the subject fully inside the printable area.',
        'Subject: ' + (ownIdea ? idea.value.trim() : item.name || 'My creature') + '.',
        item.details,
        item.id ? 'Use the attached Rhea illustration as the appearance reference. Preserve the established silhouette, markings and accessories.' : '',
        theme ? 'Theme or extra detail: ' + theme : '',
        words ? 'Include this exact lettering: ' + words : 'Picture only. Leave out lettering.'
      ];
      const reference = document.getElementById('poster-reference');
      reference.hidden = !item.id;
      if (item.id) reference.href = 'portraits/' + item.id + '.webp';
      else reference.removeAttribute('href');
      output.value = lines.filter(Boolean).join('\n\n');
      result.hidden = false;
      status.textContent = '';
      document.getElementById('poster-copy').focus();
    });
    document.getElementById('poster-copy').addEventListener('click', () => {
      copyText(output, status, 'Picture prompt copied.');
    });
    return open;
  }
  window.rheaPartyPrint = { printFile, setup };
})();
