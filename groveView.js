(() => {
  'use strict';

  const { activities, byId, starter, keepsake } = window.groveCatalog;
  const state = window.groveState;
  const amor = window.storyCharacterContent.characters.find(character => character.id === 'amor');
  const screen = document.getElementById('grove-screen');
  const namedIds = activities.filter(activity => activity.id !== 'custom').map(activity => activity.id);
  const defaults = ['read', 'kindness', 'listen'];
  // Tiles are arranged left to right in the 4 × 3 watercolor sheet.
  const landmarkTiles = [
    'creek-field-sign', 'listening-bench', 'creek-water-table', 'gallery-picture',
    'reading-basket', 'friendship-lantern', 'tasting-bowl', 'bread-basket',
    'clearing-workshop', 'discovery-book', 'celebration-lantern', 'family-star'
  ];
  const welcome = 'Welcome to Amor’s Grove! I’m Amor, the dragon-alicorn with the rainbow wings. I live by the creek near Islay Park. See that round hill behind my trees? That’s Islay Hill. My lanterns are dim, and my grove could use a little love. Will you help me bring it back to life?';
  const invitation = 'What shall we do together? I can show you three ideas, or we can look at everything in my grove.';
  const goodbye = 'Thank you for helping my grove today. I’ll be here when you come back.';

  function element(tag, className = '', text = '') {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function symbol(text, className = 'gv-icon') {
    const node = element('span', className, text);
    node.setAttribute('aria-hidden', 'true');
    return node;
  }

  function link(text, href, className = 'gv-button secondary') {
    const node = element('a', className, text);
    node.href = href;
    return node;
  }

  function action(text, callback, className = 'gv-button primary') {
    const node = element('button', className, text);
    node.type = 'button';
    node.addEventListener('click', async () => {
      if (node.disabled) return;
      node.disabled = true;
      const origin = location.hash;
      try {
        const destination = await callback();
        if (destination && location.hash === origin) location.hash = destination;
      } finally {
        node.disabled = false;
        updateSaveNotice();
      }
    });
    return node;
  }

  function row(...nodes) {
    const actions = element('div', 'gv-actions');
    actions.append(...nodes);
    return actions;
  }

  function path(id, step, attempt = '') {
    return '#grove/' + id + '/' + step + (attempt ? '/' + attempt : '');
  }

  function gems(number) {
    return number + (number === 1 ? ' magic gem' : ' magic gems');
  }

  function times(number) {
    return number === 1 ? 'Played once' : 'Played ' + number + ' times';
  }

  function heading(title, context = 'Amor’s Grove') {
    const header = element('header', 'gv-heading');
    const h1 = element('h1', '', title);
    h1.id = 'grove-heading';
    h1.tabIndex = -1;
    header.append(element('p', 'gv-kicker', context), h1);
    return header;
  }

  function familyGems(total) {
    const label = element('p', 'gv-gems');
    label.append(symbol('◆', 'gv-diamond'), document.createTextNode('Family total · ' + gems(total)));
    return label;
  }

  function dialogue(copy) {
    const card = element('div', 'gv-dialogue');
    const portrait = element('img', 'gv-portrait');
    portrait.src = 'portraits/' + amor.id + '.webp';
    portrait.alt = amor.name + ', a white dragon-alicorn with rainbow wings';
    portrait.width = 176;
    portrait.height = 220;
    const reading = element('div', 'gv-reading');
    reading.append(element('p', 'gv-caption', 'Read aloud as ' + amor.name), element('blockquote', '', '“' + copy + '”'));
    card.append(portrait, reading);
    return card;
  }

  function pageLinks(page, openLabel) {
    const group = element('div', 'gv-file');
    const open = link(openLabel || page.title, page.file, 'book-open');
    const download = link('Download', page.file, '');
    download.download = page.title + '.pdf';
    download.setAttribute('aria-label', 'Download ' + page.title);
    const links = element('div', 'book-actions');
    links.append(open, download);
    group.append(element('p', 'gv-page-ref', page.ref), links);
    return group;
  }

  function mapArt() {
    const img = element('img', 'gv-map-art');
    img.src = 'grove/map.webp';
    img.alt = 'Islay Hill rises above the creek, garden and branching paths in Amor’s Grove.';
    img.width = 1200;
    img.height = 800;
    return img;
  }

  function landmarkPicture(activity) {
    const id = activity.landmark.id;
    const tile = landmarkTiles.indexOf(id);
    if (tile >= 0) {
      const image = symbol('', 'gv-miniature gv-landmark-tile');
      image.style.backgroundPosition = (tile % 4 * 100 / 3) + '% ' + (Math.floor(tile / 4) * 50) + '%';
      return image;
    }
    if (id === 'cottage-windows') return symbol('', 'gv-window-icon');
    const asset = { 'wish-tree-charm': 'wish-charm', 'wand-shop': 'wand-shop' }[id];
    if (!asset) return symbol(activity.landmark.icon, 'gv-landmark-glyph');
    const picture = element('img', 'gv-miniature gv-' + asset);
    picture.src = 'grove/' + asset + '.webp';
    picture.alt = '';
    return picture;
  }

  function map(progress, onChoose, highlight) {
    const frame = element('figure', 'gv-map' + (onChoose ? ' gv-map-playable' : ''));
    const scene = element('div', 'gv-scene');
    scene.append(mapArt());
    const drawn = new Set();
    for (const activity of activities) {
      const mark = activity.landmark;
      const revealed = progress.landmarks.includes(mark.id);
      if (!onChoose && (!revealed || drawn.has(mark.id))) continue;
      if (mark.id === 'cottage-windows' && revealed && !drawn.has(mark.id)) {
        const glow = element('span', 'gv-lit-windows');
        glow.setAttribute('role', 'img');
        glow.setAttribute('aria-label', mark.title);
        scene.append(glow);
        if (!onChoose) {
          drawn.add(mark.id);
          continue;
        }
      }
      drawn.add(mark.id);
      const target = onChoose
        ? action('', () => onChoose(activity), 'gv-pin')
        : element('span', 'gv-scenery');
      target.style.left = mark.x + '%';
      target.style.top = mark.y + '%';
      if (revealed) target.classList.add('gv-discovered');
      if (highlight === mark.id) target.classList.add('gv-highlight');
      const count = progress.counts[activity.id] || 0;
      const label = onChoose ? activity.title + (count ? ' · ' + times(count) : '') : mark.title;
      if (onChoose) target.setAttribute('aria-label', label);
      else target.setAttribute('role', 'img');
      if (!onChoose) target.setAttribute('aria-label', mark.title);
      target.title = label;
      target.append(revealed ? landmarkPicture(activity) : symbol(activity.icon));
      if (onChoose && revealed) target.append(symbol(activity.icon, 'gv-map-choice'));
      scene.append(target);
    }
    frame.append(scene);
    return frame;
  }

  function adventureControl(saved) {
    const live = saved.visits.find(visit => visit.id === saved.activeVisitId);
    if (live) return link('Resume visit', live.resume || path(live.id, 'welcome'), 'gv-button primary');
    return action('Start adventure', async () => {
      const id = await state.startVisit();
      const visit = state.read().visits.find(item => item.id === id);
      return visit?.resume || path(id, 'welcome');
    });
  }

  function entry(saved, progress) {
    const title = heading('Amor’s Grove', 'Islay Quest');
    title.append(element('p', 'gv-lede', 'Read Amor’s cards together, choose something to do, and watch your family’s grove grow.'));
    const hero = element('div', 'gv-entry');
    const copy = element('div', 'gv-entry-copy');
    copy.append(title, row(adventureControl(saved), link('Prepare to play', '#grove/prep')), familyGems(progress.total));
    hero.append(copy, map(progress));
    screen.append(hero);
  }

  function preparation(saved) {
    screen.append(heading('Prepare to play'), element('p', 'gv-lede', 'Mark the activities you have ready. Amor suggests the first three named activities you mark and fills any open spots with easy ideas. Do your own is always a separate choice.'));
    const pack = element('section', 'gv-packet');
    pack.append(element('h2', '', 'Two craft sheets'), pageLinks(starter, 'Print for Amor’s Grove'));
    screen.append(pack, row(adventureControl(saved), link('Back to grove', '#grove', 'gv-link')));
    const items = element('div', 'gv-prep-list');
    for (const activity of activities) {
      const card = element('article', 'gv-prep-card');
      const name = element('h2');
      name.append(symbol(activity.icon), document.createTextNode(activity.title));
      card.append(name, element('p', 'gv-materials', activity.materials.join(' · ')));
      activity.pages.forEach(page => card.append(pageLinks(page)));
      const ready = element('label', 'gv-ready');
      const box = element('input');
      box.type = 'checkbox';
      box.id = 'grove-ready-' + activity.id;
      box.checked = saved.readyIds.includes(activity.id);
      box.setAttribute('aria-label', 'Ready to play · ' + activity.title);
      box.addEventListener('change', async () => {
        await state.setReady(activity.id, box.checked);
        box.checked = state.read().readyIds.includes(activity.id);
        updateSaveNotice();
      });
      ready.append(box, document.createTextNode('Ready to play'));
      card.append(ready);
      items.append(card);
    }
    screen.append(items, row(adventureControl(saved), link('Back to grove', '#grove', 'gv-link')));
  }

  function finishButton(id, className = 'gv-button secondary') {
    return action('Finish for today', async () => {
      await state.finish(id);
      return path(id, 'close');
    }, className);
  }

  function visitFooter(id) {
    const footing = element('footer', 'gv-footer');
    footing.append(finishButton(id, 'gv-link'));
    screen.append(footing);
  }

  function welcomeCard(id) {
    screen.append(heading('Welcome to Amor’s Grove', 'Islay Quest'), dialogue(welcome), row(link('Enter the grove', path(id, 'map'), 'gv-button primary')));
  }

  function mapScreen(id, progress, report) {
    screen.append(heading('Your grove map'), familyGems(progress.total));
    if (report.total) screen.append(forkLinks(id));
    else screen.append(row(link('Start now', path(id, 'start'), 'gv-button primary')));
    screen.append(map(progress));
    if (progress.landmarks.length) {
      const changes = element('details', 'gv-notes');
      changes.append(element('summary', '', 'Discoveries on the map'), discoveryList(progress.landmarks));
      screen.append(changes);
    }
  }

  function forkLinks(id) {
    return row(link('Pick from 3', path(id, 'three'), 'gv-button primary'), link('See all activities', path(id, 'all')));
  }

  function startCard(id) {
    screen.append(heading('Choose your path'), dialogue(invitation), forkLinks(id));
  }

  async function choose(id, activity, from) {
    const attempt = await state.startAttempt(id, activity.id, activity.landmark.id);
    return attempt ? path(id, 'activity', attempt) + '/' + from : '#grove';
  }

  function activityOption(activity, onChoose, progress) {
    const button = action('', () => onChoose(activity), 'gv-option');
    button.append(symbol(activity.icon, 'gv-token'));
    const text = element('span', 'gv-option-copy');
    text.append(element('strong', '', activity.title));
    const count = progress.counts[activity.id];
    if (count) text.append(element('small', '', times(count)));
    button.append(text, symbol('›', 'gv-chevron'));
    return button;
  }

  function pickThree(saved, id, progress) {
    screen.append(heading('Pick from 3'));
    const list = element('div', 'gv-options gv-three');
    const onChoose = activity => choose(id, activity, 'three');
    for (const activityId of state.suggestions(saved.readyIds, defaults, namedIds)) {
      list.append(activityOption(byId[activityId], onChoose, progress));
    }
    screen.append(list, row(link('See all activities', path(id, 'all')), action('Do your own', () => onChoose(byId.custom), 'gv-button secondary')));
  }

  function allActivities(id, progress) {
    screen.append(heading('See all activities'), element('p', 'gv-lede', 'Choose a picture on the map or a name from the list.'));
    const onChoose = activity => choose(id, activity, 'all');
    const listTitle = element('h2', 'gv-subheading', 'Activity list');
    listTitle.id = 'grove-list-heading';
    listTitle.tabIndex = -1;
    const skip = action('Jump to activity list', () => {
      listTitle.focus();
      listTitle.scrollIntoView({ block: 'start' });
    }, 'gv-link');
    const list = element('div', 'gv-options');
    for (const activity of activities) list.append(activityOption(activity, onChoose, progress));
    screen.append(skip, map(progress, onChoose), listTitle, list, row(link('Pick from 3', path(id, 'three'))));
  }

  function activityCard(id, attempt, from) {
    const activity = byId[attempt.activityId];
    screen.append(heading(activity.title), dialogue(activity.invitation));
    const notes = element('section', 'gv-setout');
    notes.append(element('h2', '', 'For the parent'));
    const materials = element('ul', 'gv-material-list');
    activity.materials.forEach(material => materials.append(element('li', '', material)));
    notes.append(materials);
    if (activity.parentTip) notes.append(element('p', '', activity.parentTip));
    activity.pages.forEach(page => notes.append(pageLinks(page)));
    screen.append(notes);
    const input = activity.id === 'custom' ? customName(id, attempt) : null;
    screen.append(row(action('We did it!', async () => {
      const confirmed = await state.confirm(id, attempt.id, input?.value);
      return confirmed ? path(id, 'reward', attempt.id) : '#grove';
    }), link('Choose again', path(id, from), 'gv-button secondary')));
  }

  function customName(id, attempt) {
    const label = element('label', 'gv-custom', 'Name your activity (optional)');
    const input = element('input');
    input.id = 'grove-custom-name';
    input.type = 'text';
    input.maxLength = 100;
    input.value = attempt.name || '';
    input.addEventListener('input', () => state.nameAttempt(id, attempt.id, input.value).then(updateSaveNotice));
    label.append(input);
    screen.append(label);
    return input;
  }

  function rewardCard(saved, visit, attempt, progress) {
    const activity = byId[attempt.activityId];
    const earned = state.reward(saved, visit.id, attempt.id);
    screen.append(heading('+1 magic gem'), dialogue(earned.first ? activity.firstReward : activity.repeatReward));
    const summary = element('div', 'gv-reward-summary');
    summary.append(element('h2', '', earned.first ? activity.landmark.title : activity.title), element('p', '', activity.title + ' · ' + times(progress.counts[activity.id])), familyGems(progress.total));
    screen.append(summary);
    if (!visit.closed && activity.id === 'custom') customName(visit.id, attempt);
    if (visit.closed) screen.append(row(link('Visit report', path(visit.id, 'report'), 'gv-button primary')));
    else screen.append(row(link('Choose another activity', path(visit.id, 'map'), 'gv-button primary'), finishButton(visit.id)));
    screen.append(map(progress, null, earned.first ? activity.landmark.id : null));
  }

  function discoveryList(ids) {
    const list = element('ul', 'gv-discoveries');
    for (const id of ids) {
      const activity = activities.find(item => item.landmark.id === id);
      if (!activity) continue;
      const item = element('li');
      item.append(landmarkPicture(activity), document.createTextNode(activity.landmark.title));
      list.append(item);
    }
    return list;
  }

  function closing(id) {
    screen.append(heading('See you soon'), dialogue(goodbye), row(link('See visit report', path(id, 'report'), 'gv-button primary')));
  }

  function visitReport(id, saved, progress) {
    const report = state.report(saved, id);
    screen.append(heading('Visit report'), row(link('Back to Home', '#home', 'gv-button primary')));
    const metrics = element('div', 'gv-metrics');
    for (const [label, number] of [['Activities completed', report.total], ['Gems this visit', report.total], ['Family gems in all', progress.total]]) {
      const metric = element('div');
      metric.append(element('strong', '', String(number)), element('span', '', label));
      metrics.append(metric);
    }
    screen.append(metrics, element('h2', 'gv-subheading', 'What you did'));
    const groups = new Map();
    for (const item of report.completions) {
      const label = item.activityId === 'custom' && item.name ? item.name : byId[item.activityId].title;
      const key = JSON.stringify([item.activityId, label]);
      const group = groups.get(key) || { label, icon: byId[item.activityId].icon, count: 0 };
      group.count++;
      groups.set(key, group);
    }
    const list = element('ul', 'gv-tally');
    for (const group of groups.values()) {
      const item = element('li');
      item.append(symbol(group.icon), element('span', '', group.label), element('strong', '', '× ' + group.count));
      list.append(item);
    }
    screen.append(groups.size ? list : element('p', '', 'You left the grove before completing an activity.'));
    screen.append(element('h2', 'gv-subheading', 'New on the map'), report.changes.length ? discoveryList(report.changes) : element('p', '', 'No new landmarks appeared this visit.'));
    const binder = element('details', 'gv-notes');
    binder.append(element('summary', '', 'Keep a memory in your Grimoire'), element('p', '', 'When you have a moment, add a photo, drawing or family quote to one of these pages.'), pageLinks(keepsake), pageLinks(byId.art.pages[0]));
    screen.append(binder);
  }

  function updateSaveNotice() {
    if (!screen.hidden && !state.storageAvailable() && !document.getElementById('grove-save-notice')) {
      const note = element('p', 'gv-notice', 'Browser saving is unavailable. You can keep playing while this page stays open.');
      note.id = 'grove-save-notice';
      note.setAttribute('role', 'status');
      screen.prepend(note);
    }
  }

  function render(hash, remember = true) {
    const saved = state.read();
    const progress = state.progress(saved);
    const [, id, step, attemptId, source] = hash.split('/');
    const visit = saved.visits.find(item => item.id === id);
    screen.replaceChildren();
    if (id === 'prep') preparation(saved);
    else if (!visit || !step) entry(saved, progress);
    else {
      const attempt = visit.attempts.find(item => item.id === attemptId);
      let current = step;
      if ((step === 'activity' || step === 'reward') && attempt?.completed) current = 'reward';
      else if (visit.closed) current = step === 'close' ? 'close' : 'report';
      else if (step === 'close' || step === 'report') current = 'map';
      else if ((step === 'activity' || step === 'reward') && !attempt) current = 'all';
      else if (step === 'reward') current = 'activity';
      if (current !== step) {
        const target = path(id, current, ['activity', 'reward'].includes(current) ? attemptId : '');
        history.replaceState(history.state, '', target);
      }
      switch (current) {
        case 'welcome': welcomeCard(id); break;
        case 'map': mapScreen(id, progress, state.report(saved, id)); break;
        case 'start': startCard(id); break;
        case 'three': pickThree(saved, id, progress); break;
        case 'all': allActivities(id, progress); break;
        case 'activity': activityCard(id, attempt, source === 'three' ? 'three' : 'all'); break;
        case 'reward': rewardCard(saved, visit, attempt, progress); break;
        case 'close': closing(id); break;
        case 'report': visitReport(id, saved, progress); break;
        default: mapScreen(id, progress, state.report(saved, id));
      }
      if (!visit.closed) {
        if (current !== 'reward') visitFooter(id);
        if (remember) state.setResume(id, location.hash).then(updateSaveNotice);
      }
    }
    updateSaveNotice();
  }

  window.addEventListener('storage', event => {
    if (screen.hidden || (event.key !== null && event.key !== state.key)) return;
    const active = document.activeElement;
    const selector = active?.id || '';
    const oldStart = active?.type === 'text' ? active.selectionStart : null;
    const oldEnd = oldStart !== null ? active.selectionEnd : null;
    render(location.hash.slice(1), false);
    const replacement = selector && document.getElementById(selector);
    if (replacement) {
      replacement.focus({ preventScroll: true });
      if (oldStart !== null) replacement.setSelectionRange(oldStart, oldEnd);
    }
  });

  window.groveView = { render };
})();
