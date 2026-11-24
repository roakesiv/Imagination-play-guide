(() => {
  const books = window.RHEA_BOOKS;
  const portraitIds = new Set(['amor', 'twinkle', 'bluebell', 'popstar', 'dash', 'river-snow', 'sara', 'libre', 'archimedes', 'nebula', 'princess', 'spot', 'rene', 'locke']);

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function bookLinks(book) {
    const row = element('div', '', 'book-actions');
    const open = element('a', 'Open PDF', 'book-open');
    open.href = book.file;
    open.setAttribute('aria-label', 'Open PDF for ' + book.title);
    const download = element('a', 'Download');
    download.href = book.file;
    download.download = book.title + '.pdf';
    download.setAttribute('aria-label', 'Download ' + book.title);
    row.append(open, download);
    return row;
  }

  function chapterList(chapters) {
    const section = element('div', '', 'volume-contents');
    const list = element('dl', '', 'volume-chapters');
    for (const [name, firstPage, lastPage] of chapters) {
      const chapter = element('div');
      chapter.append(element('dt', name), element('dd', firstPage + '–' + lastPage));
      list.append(chapter);
    }
    section.append(element('p', 'Characters and PDF pages'), list);
    return section;
  }

  function bookCard(book) {
    const card = element('article', '', 'book-card');
    const details = element('div');
    const meta = [book.age, book.pages + ' pages', book.downloadSize];
    details.append(element('h3', book.title), element('p', meta.join(' · '), 'book-meta'));
    details.append(element('p', book.description, 'book-description'));
    card.append(details, bookLinks(book), chapterList(book.chapters));
    return card;
  }

  function setupVolumePicker() {
    const picker = document.getElementById('volume-age');
    const results = document.getElementById('volume-list');
    const status = document.getElementById('volume-status');
    const volumesByAge = new Map();

    for (const book of books) {
      if (!volumesByAge.has(book.age)) volumesByAge.set(book.age, []);
      volumesByAge.get(book.age).push(book);
    }

    for (const label of window.creatureAppContent.activityAgeRange.options) {
      const [level, range] = label.split(' — ');
      const age = range.replace(/^ages/i, 'Ages');
      if (volumesByAge.has(age)) {
        const option = element('option', age + ' · ' + level);
        option.value = age;
        picker.append(option);
      }
    }

    function showVolumes() {
      const visible = volumesByAge.get(picker.value) || [];
      results.replaceChildren(...visible.map(bookCard));
      const unit = visible.length === 1 ? 'volume' : 'volumes';
      status.textContent = visible.length
        ? visible.length + ' ' + unit + ' for ' + picker.value.toLowerCase() + '.'
        : '';
    }

    picker.addEventListener('change', showVolumes);
    window.addEventListener('pageshow', showVolumes);
    showVolumes();
  }

  function profile(character) {
    const card = element('details', '', 'character-card');
    const summary = element('summary');
    let illustration;
    if (portraitIds.has(character.id)) {
      const portrait = element('img', '', 'character-portrait');
      portrait.src = 'portraits/' + character.id + '.webp';
      portrait.alt = '';
      portrait.loading = 'lazy';
      portrait.width = 64;
      portrait.height = 72;
      summary.append(portrait);
      illustration = element('a', 'View illustration', 'guide-link portrait-link');
      illustration.href = portrait.src;
      illustration.setAttribute('aria-label', 'View illustration of ' + character.name);
    }
    const caption = element('span', '', 'character-caption');
    caption.append(element('strong', character.name));
    if (character.role) caption.append(element('span', character.role));
    summary.append(caption);
    const fields = element('dl', '', 'world-facts');
    for (const [label, value] of Object.entries(character.details)) {
      if (value) fields.append(element('dt', label), element('dd', value));
    }
    card.append(summary);
    if (illustration) {
      const actions = element('div', '', 'character-print-actions');
      const poster = element('a', 'Print this character', 'poster-print');
      poster.href = window.rheaPartyPrint.printFile(character.id, 'poster');
      poster.setAttribute('aria-label', 'Print this character: ' + character.name + ' poster');
      const party = element('a', 'Four party pictures', 'party-secondary');
      party.href = window.rheaPartyPrint.printFile(character.id, 'party');
      party.setAttribute('aria-label', 'Print four party pictures of ' + character.name);
      actions.append(poster, party, illustration);
      card.append(actions);
    }
    card.append(fields);
    return card;
  }

  function heroProfile(character) {
    const d = character.data;
    return {
      id: character.id, name: character.name, role: character.title,
      details: {
        'Role': character.role, 'Creature': character.creatureType, 'Gender': character.gender,
        'Magic': d.magic, 'Colors': d.colors, 'Home': d.home,
        'Personality': d.personality, 'Accessories': d.accessories,
        'Extra detail': d.extraDetail, 'Picture style': d.pictureStyle, 'Symbol': character.symbol,
        'Appearance': character.visualLock.join(' · ')
      }
    };
  }

  function characterGroup(title, characters) {
    const group = element('section', '', 'character-group');
    const grid = element('div', '', 'character-grid');
    grid.append(...characters.map(profile));
    group.append(element('h3', title), grid);
    return group;
  }

  setupVolumePicker();
  const cast = document.getElementById('character-list');
  const party = window.storyCharacterContent.characters.map(heroProfile);
  cast.append(characterGroup('The party and their little helper', party));
  cast.append(characterGroup('River Valley villagers', window.RHEA_VILLAGERS));
  const more = element('details', '', 'story-notes');
  const notes = element('div', '', 'character-grid');
  const listedStories = window.RHEA_STORY_NOTES.filter(character => character.showInGallery !== false);
  notes.append(...listedStories.map(profile));
  more.append(element('summary', 'More from the stories'), notes);
  cast.append(more);

  const printableCharacters = [...party, ...window.RHEA_VILLAGERS, ...listedStories]
    .filter(character => portraitIds.has(character.id));
  const openPosterMaker = window.rheaPartyPrint.setup(printableCharacters);
  const posterPanels = {
    'print-poster': document.getElementById('rhea-print-panel'),
    'custom-picture': document.getElementById('poster-form')
  };
  const posterLinks = document.querySelectorAll('.poster-paths a');
  let useDraftForPoster = false;
  document.getElementById('poster-from-draft').addEventListener('click', () => {
    useDraftForPoster = true;
  });

  const screens = {
    home: ['home', 'home-heading'],
    easy: ['easy', 'easy-heading'],
    'more-to-try': ['more-to-try', 'more-heading'],
    rhea: ['world', 'books-heading'],
    characters: ['world', 'characters-heading'],
    tutorial: ['tutorial', 'tutorial-heading'],
    posters: ['posters', 'posters-heading'],
    'print-poster': ['posters', 'posters-heading'],
    'custom-picture': ['posters', 'posters-heading'],
    create: ['create', 'maker-heading']
  };

  function showView(moveFocus) {
    const hash = window.location.hash.slice(1);
    const target = document.getElementById(hash);
    const isDirectoryCategory = target?.matches('.activity-directory h2[id]');
    const route = isDirectoryCategory ? 'more-to-try' : Object.hasOwn(screens, hash) ? hash : 'home';
    const [view, headingId] = screens[route];
    const previousRoute = document.body.dataset.route;
    document.body.dataset.route = route;
    for (const section of document.querySelectorAll('[data-view]')) {
      section.hidden = section.dataset.view !== view;
    }
    document.getElementById('home-nav').hidden = route === 'home';
    document.getElementById('book-shelf').hidden = route !== 'rhea';
    document.getElementById('world-cast').hidden = route !== 'characters';
    for (const link of document.querySelectorAll('.world-menu a')) {
      if (link.hash === '#' + route) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    if (view === 'posters') {
      for (const [mode, panel] of Object.entries(posterPanels)) panel.hidden = mode !== route;
      for (const link of posterLinks) {
        if (link.hash === '#' + route) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      }
      if (screens[previousRoute]?.[0] !== view || useDraftForPoster) openPosterMaker(useDraftForPoster);
      useDraftForPoster = false;
    }
    const heading = document.getElementById(headingId);
    document.title = route === 'home' || route === 'create' ? 'Magic Creature Card Maker' : heading.textContent + ' | Magic Creature Card Maker';
    if (isDirectoryCategory) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: 'start' });
    } else if (moveFocus) {
      heading.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener('hashchange', () => showView(true));
  showView(false);
})();
