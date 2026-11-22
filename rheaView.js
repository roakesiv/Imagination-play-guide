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
    download.download = '';
    download.setAttribute('aria-label', 'Download ' + book.title);
    row.append(open, download);
    return row;
  }

  function bookCard(book) {
    const card = element('article', '', 'book-card');
    const details = element('div');
    const age = book.age && (/age/i.test(book.age) ? book.age : 'Ages ' + book.age);
    const meta = [age, book.pages && (book.pages + (book.pages === 1 ? ' page' : ' pages')), book.downloadSize];
    details.append(element('h4', book.title), element('p', meta.filter(Boolean).join(' · '), 'book-meta'));
    if (book.description) details.append(element('p', book.description, 'book-description'));
    card.append(details, bookLinks(book));
    return card;
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
    if (illustration) card.append(illustration);
    card.append(fields);
    for (const book of books.filter(item => item.characterId === character.id)) {
      const related = element('div', '', 'related-book');
      related.append(element('strong', book.title), bookLinks(book));
      card.append(related);
    }
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

  document.getElementById('volume-list').append(...books.filter(book => book.kind === 'volume').map(bookCard));
  document.getElementById('book-list').append(...books.filter(book => book.kind !== 'volume').map(bookCard));
  const cast = document.getElementById('character-list');
  cast.append(characterGroup('The party and their little helper', window.storyCharacterContent.characters.map(heroProfile)));
  cast.append(characterGroup('River Valley villagers', window.RHEA_VILLAGERS));
  const more = element('details', '', 'story-notes');
  const notes = element('div', '', 'character-grid');
  const listedStories = window.RHEA_STORY_NOTES.filter(character => character.showInGallery !== false);
  notes.append(...listedStories.map(profile));
  more.append(element('summary', 'More from the stories'), notes);
  cast.append(more);

  const screens = {
    home: ['home', 'home-heading'],
    rhea: ['world', 'books-heading'],
    characters: ['world', 'characters-heading'],
    tutorial: ['tutorial', 'tutorial-heading'],
    create: ['create', 'maker-heading']
  };

  function showView(moveFocus) {
    const hash = window.location.hash.slice(1);
    const route = Object.hasOwn(screens, hash) ? hash : 'home';
    const [view, headingId] = screens[route];
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
    const heading = document.getElementById(headingId);
    document.title = route === 'home' || route === 'create' ? 'Magic Creature Card Maker' : heading.textContent + ' | Magic Creature Card Maker';
    if (moveFocus) {
      heading.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener('hashchange', () => showView(true));
  showView(false);
})();
