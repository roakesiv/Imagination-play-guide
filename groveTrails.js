(() => {
  'use strict';

  function place(id, name, x, y, activityIds) {
    return { id, name, x, y, activityIds };
  }

  const places = [
    place('gate', 'Lantern Gate', 49, 84, ['kindness', 'custom']),
    place('tree', 'Wish Tree', 23, 59, ['pine-cone', 'read']),
    place('cottage', 'Creek Cottage', 77, 62, ['clean-up', 'new-food', 'bake']),
    place('creek', 'Listening Creek', 21, 32, ['winter-walk', 'listen', 'water-drop']),
    place('garden', 'Wand Garden', 76, 33, ['flower-wand', 'art']),
    place('hill', 'Islay Hill', 48, 13, ['build', 'learn', 'celebrate'])
  ];
  const byId = Object.fromEntries(places.map(stop => [stop.id, stop]));
  const activityPlaces = new Map();
  for (const stop of places) {
    for (const activityId of stop.activityIds) activityPlaces.set(activityId, stop.id);
  }

  // The map and traveler share these cubic Bézier curves in map coordinates.
  const edges = [
    { id: 'gate-tree', from: 'gate', to: 'tree', controls: [[44, 72], [27, 79]] },
    { id: 'gate-cottage', from: 'gate', to: 'cottage', controls: [[61, 84], [60, 66]] },
    { id: 'meadow-path', name: 'Meadow Path', from: 'tree', to: 'cottage', controls: [[40, 62], [56, 52]] },
    { id: 'tree-creek', from: 'tree', to: 'creek', controls: [[12, 48], [32, 45]] },
    { id: 'cottage-garden', from: 'cottage', to: 'garden', controls: [[65, 51], [87, 47]] },
    { id: 'creek-hill', from: 'creek', to: 'hill', controls: [[20, 22], [42, 26]] },
    { id: 'garden-hill', from: 'garden', to: 'hill', controls: [[76, 20], [54, 27]] },
    { id: 'firefly-crossing', name: 'Firefly Crossing', from: 'tree', to: 'garden',
      controls: [[44, 54], [53, 41]], requires: 'wish-tree-charm' }
  ];

  function edge(from, to) {
    return edges.find(trail => (trail.from === from && trail.to === to) || (trail.from === to && trail.to === from));
  }

  function isOpen(trail, landmarks = []) {
    return !trail.requires || landmarks.includes(trail.requires);
  }

  function neighbors(placeId, landmarks) {
    const adjacent = [];
    for (const trail of edges) {
      if (!isOpen(trail, landmarks)) continue;
      if (trail.from === placeId) adjacent.push(trail.to);
      if (trail.to === placeId) adjacent.push(trail.from);
    }
    return adjacent;
  }

  function route(from, to, landmarks) {
    if (!Object.hasOwn(byId, from) || !Object.hasOwn(byId, to)) return [];
    const queue = [[from]];
    const seen = new Set([from]);
    for (const path of queue) {
      const last = path[path.length - 1];
      if (last === to) return path;
      for (const next of neighbors(last, landmarks)) {
        if (seen.has(next)) continue;
        seen.add(next);
        queue.push([...path, next]);
      }
    }
    return [];
  }

  window.groveTrails = { places, byId, edges, edge, isOpen, neighbors, route,
    placeForActivity: id => activityPlaces.get(id) };
})();
