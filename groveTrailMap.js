(() => {
  'use strict';

  const trails = window.groveTrails;
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const seals = { gate: '✦', tree: '❧', cottage: '⌂', creek: '≈', garden: '✿', hill: '▴' };
  // Leave the walking stones and their signs clear as the family's landmarks appear.
  const scenery = {
    'wish-tree-charm': [13, 51, 7], 'reading-basket': [34, 59, 8],
    'wand-shop': [86, 25, 13], 'gallery-picture': [63, 28, 8],
    'cottage-windows': [86.25, 56.10, 1.7], 'tasting-bowl': [67, 63, 7], 'bread-basket': [86, 64, 7],
    'listening-bench': [15, 27, 10], 'creek-water-table': [32, 32, 9], 'creek-field-sign': [10, 34, 7],
    'clearing-workshop': [61, 13, 11], 'discovery-book': [36, 15, 7], 'celebration-lantern': [49, 5, 7],
    'friendship-lantern': [38, 80, 8], 'family-star': [61, 84, 8]
  };

  function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function ink(tag, attributes) {
    const el = document.createElementNS(svgNamespace, tag);
    for (const [key, value] of Object.entries(attributes)) el.setAttribute(key, value);
    return el;
  }

  function placeAt(el, x, y) {
    el.style.left = x + '%';
    el.style.top = y + '%';
  }

  function curve(edge) {
    const start = trails.byId[edge.from];
    const end = trails.byId[edge.to];
    const [c, d] = edge.controls;
    return 'M ' + start.x + ' ' + start.y + ' C ' + c.join(' ') + ', ' + d.join(' ') + ', ' + end.x + ' ' + end.y;
  }

  function point(edge, t) {
    const a = trails.byId[edge.from], b = trails.byId[edge.to];
    const [c, d] = edge.controls;
    const u = 1 - t;
    return {
      x: u*u*u*a.x + 3*u*u*t*c[0] + 3*u*t*t*d[0] + t*t*t*b.x,
      y: u*u*u*a.y + 3*u*u*t*c[1] + 3*u*t*t*d[1] + t*t*t*b.y
    };
  }

  function drawTrail(edge) {
    const group = ink('g', {class: 'gt-trail' + (edge.requires ? ' gt-shortcut' : ''), 'data-trail': edge.id});
    const d = curve(edge);
    for (const layer of ['edge', 'tread', 'dust']) {
      group.append(ink('path', {class: 'gt-' + layer, d}));
    }
    const tracks = ink('g', {class: 'gt-tracks'});
    // A pair of footprints follows the tangent of the road at each bend.
    for (let step = 1; step <= 5; step++) {
      const t = step / 6;
      const p = point(edge, t), next = point(edge, t + .012);
      const angle = Math.atan2(next.y - p.y, next.x - p.x) * 180 / Math.PI;
      const pair = ink('g', {transform: 'translate(' + p.x + ' ' + p.y + ') rotate(' + angle + ')'});
      pair.append(ink('ellipse', {cx: -.39, cy: -.33, rx: .46, ry: .23}),
                  ink('ellipse', {cx: .37, cy: .31, rx: .46, ry: .23}));
      tracks.append(pair);
    }
    group.append(tracks);
    if (edge.id === 'firefly-crossing') {
      const lights = ink('g', {class: 'gt-fireflies'});
      for (const [t, offset] of [[.16, -1.6], [.27, 1.7], [.37, -1.8], [.68, 1.5], [.82, -1.7]]) {
        const p = point(edge, t);
        lights.append(ink('circle', {cx: p.x, cy: p.y + offset, r: .82, class: 'gt-firefly-halo'}),
                      ink('circle', {cx: p.x, cy: p.y + offset, r: .36, class: 'gt-firefly'}));
      }
      group.append(lights);
    }
    return group;
  }

  function discoveries(canvas, progress, picture, highlight) {
    const seen = new Set();
    for (const activity of window.groveCatalog.activities) {
      const mark = activity.landmark;
      if (!progress.landmarks.includes(mark.id) || seen.has(mark.id)) continue;
      seen.add(mark.id);
      const place = trails.byId[trails.placeForActivity(activity.id)] || trails.byId.gate;
      const [x, y, size] = scenery[mark.id] || [place.x + 9, place.y - 5, 8];
      const prop = make('span', 'gt-landmark' + (highlight === mark.id ? ' is-new' : ''));
      prop.dataset.landmark = mark.id;
      prop.setAttribute('role', 'img');
      prop.setAttribute('aria-label', mark.title);
      prop.title = mark.title;
      placeAt(prop, x, y);
      prop.style.width = size + '%';
      prop.append(picture(activity));
      canvas.append(prop);
    }
  }

  function create({journey, progress, landmarkPicture, highlight, onTravel, onArrive}) {
    const frame = make('figure', 'gt-map');
    const canvas = make('div', 'gt-terrain');
    const art = make('img', 'gt-country');
    art.src = 'grove/trail-country.webp';
    art.alt = 'An overhead map of Amor’s Grove, from Lantern Gate to Islay Hill.';
    art.width = 800;
    art.height = 1000;
    canvas.append(art);
    const roads = ink('svg', {class: 'gt-roads', viewBox: '0 0 100 100', preserveAspectRatio: 'none',
      'aria-hidden': 'true', focusable: 'false'});
    canvas.append(roads);
    let current = journey.placeId;
    let traveling = false;
    const visited = new Set(journey.visited);
    const walked = new Set(journey.walked);
    const roadById = new Map();
    for (const edge of trails.edges) {
      if (!trails.isOpen(edge, progress.landmarks)) continue;
      const road = drawTrail(edge);
      road.classList.toggle('is-walked', walked.has(edge.id));
      if (edge.requires && highlight === edge.requires) road.classList.add('is-new');
      roads.append(road);
      roadById.set(edge.id, road);
      if (edge.id === 'firefly-crossing') {
        const middle = point(edge, .52);
        const crossing = make('span', 'gt-crossing-label', 'Firefly Crossing');
        placeAt(crossing, middle.x, middle.y - 2.3);
        canvas.append(crossing);
      }
    }
    discoveries(canvas, progress, landmarkPicture, highlight);

    const token = make('span', 'gt-traveler');
    const sprite = make('img', 'gt-traveler-art');
    sprite.src = 'grove/amor-traveler.webp';
    sprite.alt = '';
    token.setAttribute('aria-hidden', 'true');
    token.append(sprite);
    canvas.append(token);
    const stops = new Map();
    for (const place of trails.places) {
      const stop = make(onTravel ? 'button' : 'span', 'gt-stop');
      if (onTravel) {
        stop.type = 'button';
        stop.addEventListener('click', () => travelTo(place.id));
      }
      stop.dataset.place = place.id;
      placeAt(stop, place.x, place.y);
      const stone = make('span', 'gt-stone', seals[place.id]);
      stone.setAttribute('aria-hidden', 'true');
      stop.append(stone, make('span', 'gt-sign', place.name));
      stops.set(place.id, stop);
      canvas.append(stop);
    }
    const caption = make('figcaption', 'gt-caption');
    caption.setAttribute('role', 'status');
    caption.setAttribute('aria-live', 'polite');
    caption.setAttribute('aria-atomic', 'true');
    frame.append(canvas, caption);

    function showPosition() {
      const here = trails.byId[current];
      placeAt(token, here.x, here.y);
      token.dataset.placeId = current;
      caption.textContent = 'Amor is at ' + here.name + '.';
      for (const [id, stop] of stops) {
        const isCurrent = id === current;
        stop.classList.toggle('is-current', isCurrent);
        stop.classList.toggle('is-visited', visited.has(id));
        if (isCurrent) stop.setAttribute('aria-current', 'location');
        else stop.removeAttribute('aria-current');
        if (onTravel) stop.setAttribute('aria-label', (isCurrent ? 'Explore ' : 'Travel to ') + trails.byId[id].name);
      }
    }

    async function walk(route) {
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      for (let i = 1; i < route.length; i++) {
        if (!frame.isConnected) return false;
        const edge = trails.edge(route[i - 1], route[i]);
        if (!edge) return false;
        // Another tab can open a shortcut after this board has been drawn.
        let road = roadById.get(edge.id);
        if (!road) {
          road = drawTrail(edge);
          roadById.set(edge.id, road);
          roads.append(road);
        }
        const dx = trails.byId[route[i]].x - trails.byId[route[i - 1]].x;
        token.style.setProperty('--gt-facing', dx < 0 ? '-1' : '1');
        road.classList.add('is-walking');
        if (!reduceMotion) {
          const forwards = route[i - 1] === edge.from;
          const time = 610;
          const start = performance.now();
          await new Promise(done => {
            function advance(now) {
              if (!frame.isConnected || document.hidden) { done(); return; }
              const t = Math.min(1, (now - start) / time);
              const p = point(edge, forwards ? t : 1 - t);
              placeAt(token, p.x, p.y);
              if (t >= 1) done();
              else requestAnimationFrame(advance);
            }
            advance(start);
          });
        }
        if (!frame.isConnected) return false;
        road.classList.remove('is-walking');
        road.classList.add('is-walked');
        walked.add(edge.id);
        current = route[i];
        visited.add(current);
      }
      showPosition();
      return true;
    }

    async function travelTo(id) {
      if (!onTravel || traveling || !frame.isConnected || !trails.byId[id]) return false;
      traveling = true;
      frame.classList.add('is-moving');
      canvas.setAttribute('aria-busy', 'true');
      for (const stop of stops.values()) stop.setAttribute('aria-disabled', 'true');
      const origin = location.hash;
      try {
        const route = await onTravel(id, current);
        if (!route?.length || !frame.isConnected || location.hash !== origin) return false;
        caption.textContent = 'Traveling to ' + trails.byId[id].name + '…';
        const arrived = await walk(route);
        if (arrived && location.hash === origin) await onArrive?.(id);
        return arrived;
      } finally {
        traveling = false;
        frame.classList.remove('is-moving');
        canvas.removeAttribute('aria-busy');
        for (const stop of stops.values()) stop.removeAttribute('aria-disabled');
      }
    }

    showPosition();
    frame.travelTo = travelTo;
    return frame;
  }

  window.groveTrailMap = { create };
})();
