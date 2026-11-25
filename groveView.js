(() => {
  'use strict';

  const { activities, byId, starter, keepsake } = window.groveCatalog;
  const state = window.groveState;
  const trails = window.groveTrails;
  const trailMap = window.groveTrailMap;
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
  const stopInvitations = {
    gate: 'My lantern is waiting for its first spark. Shall we bring it a kind deed, or take a trail and see who needs us?',
    tree: 'See the bare branch over our heads? It could hold a painted wish. Or we could spread out under the leaves and read together.',
    cottage: 'Come in! Can we make a cozy corner, find a new taste, or bake something for my table?',
    creek: 'Let’s stand very still. What can we hear across the water? The creek has things to look for and a little experiment to try.',
    garden: 'There’s lavender by the path and room for a tiny shop. Shall we make the first wand or paint a picture for the garden?',
    hill: 'Look how far our trail has come! Up here there’s room to build, share a discovery, or hang a lantern for a celebration.'
  };
  const restoredInvitations = {
    gate: 'Our little light is shining. Do you have another kind deed or an idea of your own to bring along?',
    tree: 'Our painted wish brought out the fireflies! They can guide us straight to the Wand Garden. Or shall we stay under the tree awhile?',
    garden: 'Our wand shop is open! Shall we make another wand for the counter or a picture for the garden?'
  };
  let pendingArrival = null;

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

  function adventureControl(saved) {
    const live = saved.visits.find(visit => visit.id === saved.activeVisitId);
    if (live) return link('Resume visit', live.resume || path(live.id, 'welcome'), 'gv-button primary');
    return action('Start adventure', async () => {
      const id = await state.startVisit();
      pendingArrival = { id, placeId: state.journey(state.read()).placeId };
      return path(id, 'map');
    });
  }

  function visitFor(id) {
    return id || state.startVisit();
  }

  function arrive(id, placeId) {
    const destination = path(id, 'map');
    pendingArrival = { id, placeId };
    if (location.hash === destination) render(destination.slice(1));
    else location.hash = destination;
  }

  function worldMap(saved, progress, id, options = {}) {
    let travelVisit = id;
    return trailMap.create({
      journey: state.journey(saved, progress), progress, landmarkPicture, highlight: options.highlight,
      onTravel: options.readOnly ? undefined : async (destination, origin) => {
        travelVisit = await visitFor(travelVisit);
        return state.travel(travelVisit, destination, origin);
      },
      onArrive: options.readOnly ? undefined : (placeId) => {
        if (options.afterTravel) return options.afterTravel(travelVisit, placeId);
        arrive(travelVisit, placeId);
      }
    });
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

  function stopPanel(place, progress, id, board) {
    const panel = element('section', 'gv-stop-panel');
    const title = element('h2', '', place.name);
    title.id = 'grove-stop-heading';
    title.tabIndex = -1;
    panel.setAttribute('aria-labelledby', title.id);
    const restored = { gate: 'friendship-lantern', tree: 'wish-tree-charm', garden: 'wand-shop' };
    const invitation = progress.landmarks.includes(restored[place.id])
      ? restoredInvitations[place.id] : stopInvitations[place.id];
    panel.append(element('p', 'gv-caption', 'You are here'), title, element('p', 'gv-stop-line', '“' + invitation + '”'));
    const local = element('div', 'gv-stop-activities');
    for (const activityId of place.activityIds) {
      local.append(activityOption(byId[activityId], activity => choose(id, activity, 'map'), progress));
    }
    panel.append(local, element('h3', 'gv-trail-heading', 'Trails from here'));
    const exits = element('div', 'gv-exits');
    for (const neighbor of trails.neighbors(place.id, progress.landmarks)) {
      const edge = trails.edge(place.id, neighbor);
      const shortcut = edge.id === 'firefly-crossing';
      const exit = action('', () => {
        board.scrollIntoView({ block: 'nearest' });
        board.travelTo(neighbor);
      }, 'gv-exit' + (shortcut ? ' gv-exit-firefly' : ''));
      exit.dataset.destination = neighbor;
      exit.append(symbol(shortcut ? '✦' : '↗'), document.createTextNode(trails.byId[neighbor].name));
      if (shortcut) exit.append(element('small', '', 'Firefly Crossing'));
      exits.append(exit);
    }
    panel.append(exits);
    return panel;
  }

  function mapScreen(saved, progress, id, isEntry = false) {
    const place = trails.byId[state.journey(saved, progress).placeId];
    const top = element('div', 'gv-journey-header');
    top.append(heading('Amor’s Grove', 'Islay Quest'), familyGems(progress.total));
    screen.append(top);
    if (isEntry) {
      const controls = row(adventureControl(saved), link('Prepare to play', '#grove/prep', 'gv-link'));
      controls.classList.add('gv-entry-controls');
      screen.append(controls);
    }
    screen.append(element('p', 'gv-map-guide', 'Tap a place to walk there with Amor.'));
    const board = worldMap(saved, progress, id);
    const panel = stopPanel(place, progress, id, board);
    const layout = element('div', 'gv-journey-layout');
    const sidebar = element('div', 'gv-journal');
    sidebar.append(panel, forkLinks(id));
    layout.append(board, sidebar);
    screen.append(layout);
    if (!isEntry) screen.append(row(link('Prepare to play', '#grove/prep', 'gv-link')));
    const welcomeNote = element('details', 'gv-notes');
    welcomeNote.append(element('summary', '', 'Read Amor’s welcome'), dialogue(welcome));
    screen.append(welcomeNote);
    if (progress.landmarks.length) {
      const changes = element('details', 'gv-notes');
      changes.append(element('summary', '', 'Discoveries on the map'), discoveryList(progress.landmarks));
      screen.append(changes);
    }
    if (pendingArrival?.id === id && pendingArrival.placeId === place.id) {
      pendingArrival = null;
      queueMicrotask(() => {
        if (!panel.isConnected) return;
        panel.querySelector('h2').focus({ preventScroll: true });
        panel.querySelector('button')?.scrollIntoView({ block: 'nearest' });
      });
    }
  }

  function forkLinks(id) {
    function open(text, step) {
      return id ? link(text, path(id, step))
        : action(text, async () => path(await state.startVisit(), step), 'gv-button secondary');
    }
    return row(open('Pick from 3', 'three'), open('See all activities', 'all'));
  }

  function startCard(id) {
    screen.append(heading('Choose your path'), dialogue(invitation), forkLinks(id));
  }

  async function choose(id, activity, from) {
    const origin = location.hash;
    const visitId = await visitFor(id);
    if (location.hash !== origin) return;
    const saved = state.read();
    const progress = state.progress(saved);
    const destination = trails.placeForActivity(activity.id);
    const openCard = async () => {
      if (location.hash !== origin) return;
      const attempt = await state.startAttempt(visitId, activity.id, activity.landmark.id);
      if (location.hash === origin) location.hash = attempt ? path(visitId, 'activity', attempt) + '/' + from : '#grove';
    };
    if (state.journey(saved, progress).placeId === destination) {
      await openCard();
      return;
    }
    const board = worldMap(saved, progress, visitId, { afterTravel: (_, placeId) => {
      if (placeId === destination) return openCard();
      arrive(visitId, placeId);
    } });
    board.classList.add('gv-transit-map');
    screen.replaceChildren(heading('On the trail to ' + trails.byId[destination].name), board);
    const title = screen.querySelector('h1');
    title.focus({ preventScroll: true });
    title.scrollIntoView({ block: 'start' });
    const arrived = await board.travelTo(destination);
    if (!arrived && board.isConnected && location.hash === origin) render(origin.slice(1));
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
    screen.append(list, row(link('See all activities', path(id, 'all')), action('Do your own', () => onChoose(byId.custom), 'gv-button secondary'), link('Back to map', path(id, 'map'), 'gv-link')));
  }

  function allActivities(id, progress) {
    screen.append(heading('See all activities'), element('p', 'gv-lede', 'Choose an activity and Amor will walk there with you.'));
    const onChoose = activity => choose(id, activity, 'all');
    screen.append(row(link('Back to map', path(id, 'map'), 'gv-link'), link('Pick from 3', path(id, 'three'), 'gv-link')));
    for (const place of trails.places) {
      const list = element('div', 'gv-options');
      for (const activityId of place.activityIds) list.append(activityOption(byId[activityId], onChoose, progress));
      screen.append(element('h2', 'gv-subheading', place.name), list);
    }
  }

  function activityCard(id, attempt, from) {
    const activity = byId[attempt.activityId];
    screen.append(heading(activity.title, trails.byId[trails.placeForActivity(activity.id)].name), dialogue(activity.invitation));
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
    screen.append(heading('+1 magic gem', trails.byId[trails.placeForActivity(activity.id)].name), dialogue(earned.first ? activity.firstReward : activity.repeatReward));
    const summary = element('div', 'gv-reward-summary');
    summary.append(element('h2', '', earned.first ? activity.landmark.title : activity.title), element('p', '', activity.title + ' · ' + times(progress.counts[activity.id])), familyGems(progress.total));
    const foundCrossing = earned.first && activity.id === 'pine-cone';
    if (foundCrossing) summary.append(element('p', 'gv-new-crossing', '✦ Firefly Crossing is open. Follow the lights from the Wish Tree to the Wand Garden.'));
    screen.append(summary);
    const board = worldMap(saved, progress, visit.id, { readOnly: visit.closed, highlight: earned.first ? activity.landmark.id : undefined });
    if (!visit.closed && activity.id === 'custom') customName(visit.id, attempt);
    if (visit.closed) screen.append(row(link('Visit report', path(visit.id, 'report'), 'gv-button primary')));
    else {
      const controls = row(link('Choose another activity', path(visit.id, 'map')), finishButton(visit.id));
      if (foundCrossing && state.journey(saved, progress).placeId === 'tree') {
        controls.prepend(action('Walk Firefly Crossing', () => {
          board.scrollIntoView({ block: 'center' });
          board.travelTo('garden');
        }));
      }
      screen.append(controls);
    }
    const mapPanel = element('div', 'gv-reward-map');
    mapPanel.append(board);
    screen.append(mapPanel);
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
    if (report.changes.includes('wish-tree-charm')) screen.append(element('p', 'gv-new-crossing', '✦ Firefly Crossing now connects the Wish Tree and the Wand Garden.'));
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
    else if (!visit || !step) mapScreen(saved, progress, saved.activeVisitId, true);
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
        case 'map': mapScreen(saved, progress, id); break;
        case 'start': startCard(id); break;
        case 'three': pickThree(saved, id, progress); break;
        case 'all': allActivities(id, progress); break;
        case 'activity': activityCard(id, attempt, ['map','three'].includes(source) ? source : 'all'); break;
        case 'reward': rewardCard(saved, visit, attempt, progress); break;
        case 'close': closing(id); break;
        case 'report': visitReport(id, saved, progress); break;
        default: mapScreen(saved, progress, id);
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
