(() => {
  function sheet(title, ref, filename) {
    return { title, ref, file: 'printables/amor-grove/' + filename + '.pdf' };
  }

  const starter = sheet('Print for Amor’s Grove', 'Pine Cone Protection Charms and The Lavender Wand · 2 pages', 'starter-crafts');
  const keepsake = sheet('Our First Winter Story', 'Starter p. 8', 'family-keepsake');
  const winterRecord = sheet('Our winter field record', 'Pack 2A · PDF p. 10 · binder folio 20', 'winter-field-record');

  function landmark(id, name, icon, x, y, title) {
    return { id, name, icon, x, y, title };
  }

  const activities = [
    {
      id: 'pine-cone', title: 'Paint a pine cone', icon: '🌲',
      invitation: 'My tree has a branch for a family wish. Will you paint a pine cone for it? Pick a color or a symbol. What would you like your charm to remind us of?',
      materials: ['A clean, dry pine cone', 'Washable paint and a brush', 'Paper for drips', 'Optional string or ribbon for hanging'],
      parentTip: 'Brush off the cone first. One child can pick the color, another can paint a mark, and another can name the wish. The sheet has space for the wish and a picture.',
      pages: [sheet('Pine Cone Protection Charms', 'Starter p. 5', 'pine-cone-charms')],
      landmark: landmark('wish-tree-charm', 'Wish tree charm', '🎀', 24, 42, 'A painted pine cone hangs from the wish tree.'),
      firstReward: 'Your wish has a place in my tree! You earned one magic gem.',
      repeatReward: 'Another wish for my tree! You earned one magic gem.'
    },
    {
      id: 'flower-wand', title: 'Make a flower wand', icon: '🪄',
      invitation: 'My wand shop is waiting for its first wand. Will you make one? I like lavender, but you get to choose the flower. What magic shall we imagine it can do?',
      materials: ['A fallen stick', 'Lavender, another flower, or a paper flower', 'Ribbon, yarn, or twine'],
      parentTip: 'Lay the flower alongside the stick and help wrap it. One child can choose the flower, one can arrange it, and one can invent its magic. Name the wand or give it a wave.',
      pages: [sheet('The Lavender Wand', 'Starter p. 6', 'lavender-wand')],
      landmark: landmark('wand-shop', 'Wand shop', '🏪', 76, 66, 'The wand shop opens.'),
      firstReward: 'You made a wand! You earned one magic gem. Look, the wand shop is open!',
      repeatReward: 'Another wand for the grove! You earned one magic gem.'
    },
    {
      id: 'winter-walk', title: 'Take a winter nature walk', icon: '🥾',
      invitation: 'What sign of winter can you find for my grove?',
      materials: ['A spot to look outside', 'Optional pencil for field notes'],
      parentTip: 'A short look outside counts. Green grass, muddy ground, or a shadow can start a conversation. The scavenger hunt gives you things to notice, and the field notes have room to draw a find.',
      pages: [sheet('Winter on the Central Coast', 'Starter p. 4 · scavenger hunt', 'winter-walk'), sheet('Our First Winter Walk', 'Starter p. 7 · field notes', 'field-notes')],
      landmark: landmark('creek-field-sign', 'Creek field sign', '🪧', 51, 55, 'A field sign appears beside the creek.'),
      firstReward: 'You found a sign of winter! Let’s put a field sign by my creek.',
      repeatReward: 'What a good eye you have for winter. Thank you for looking again!'
    },
    {
      id: 'listen', title: 'Listen for near and far sounds', icon: '👂',
      invitation: 'Will you listen with me? Point to a sound close by. Can you hear one farther away?',
      materials: ['A place by a window or outdoors'],
      parentTip: 'Pause together and listen. Let each child point toward a sound before anyone names it. If you like, add the sounds to the listening map.',
      pages: [sheet('Where the sounds are', 'Pack 2B · PDF p. 10 · binder folio 30', 'sound-map')],
      landmark: landmark('listening-bench', 'Listening bench', '🪑', 10, 17, 'A listening bench appears in the grove.'),
      firstReward: 'You found faraway sounds and nearby ones! Here’s a bench where we can sit and listen.',
      repeatReward: 'What did our listening ears catch this time?'
    },
    {
      id: 'water-drop', title: 'Try a water-drop experiment', icon: '💧',
      invitation: 'I wonder where a drop of water goes. Will it do the same thing on these two papers?',
      materials: ['Water and a spoon or dropper', 'A paper towel', 'Wax paper', 'A tray or plate'],
      parentTip: 'Set both papers on the tray. Predict what will happen. Place one drop on each dry surface, then look together for a bead or a spreading patch.',
      pages: [sheet('Where will the drop go?', 'Pack 2B · PDF p. 6 · binder folio 26', 'water-drop')],
      landmark: landmark('creek-water-table', 'Creek water table', '🚰', 49, 82, 'A water table appears by the creek.'),
      firstReward: 'You watched those drops so closely! Our creek has its very own water table.',
      repeatReward: 'Another tiny experiment! What did your drop do this time?'
    },
    {
      id: 'art', title: 'Make art for the grove', icon: '🎨',
      invitation: 'What caught your eye today? Will you draw it for my grove?',
      materials: ['Paper or your field record', 'Something to draw with'],
      parentTip: 'A line, a color, or a whole scene can tell the story. Add the picture to a winter field record if you have one started.',
      pages: [winterRecord],
      landmark: landmark('gallery-picture', 'Gallery picture', '🖼️', 8, 59, 'The first picture hangs in the grove gallery.'),
      firstReward: 'Look! The first picture in my gallery is yours.',
      repeatReward: 'You made more art for my grove! Tell me about a part you like.'
    },
    {
      id: 'read', title: 'Read with Amor', icon: '📖',
      invitation: 'Bring me any book. Which part should we read together?',
      materials: ['Any book'],
      parentTip: 'Invite a child to turn the pages or tell you what is happening in a picture. Rereading the same book counts each time.',
      pages: [],
      landmark: landmark('reading-basket', 'Book basket', '📚', 32, 66, 'A book basket appears beneath the reading tree.'),
      firstReward: 'A story for my reading tree! I’ve set out a basket for our books.',
      repeatReward: 'I love hearing a story with you. Which part shall we remember?'
    },
    {
      id: 'kindness', title: 'Be kind to a friend', icon: '💗',
      invitation: 'Can you do one kind thing for someone, or tell me what you already did?',
      materials: ['Just a kind idea or a memory'],
      parentTip: 'Holding a door, sharing a toy, or listening to someone all count. Give the child a turn to name their own idea.',
      pages: [],
      landmark: landmark('friendship-lantern', 'Friendship lantern', '🏮', 51, 28, 'Amor’s friendship lantern lights up.'),
      firstReward: 'Your kindness made my friendship lantern glow!',
      repeatReward: 'Thank you for sharing another kind thing with me.'
    },
    {
      id: 'clean-up', title: 'Help clean up', icon: '🧹',
      invitation: 'Choose one little place we can make cozy together.',
      materials: ['One small spot to tidy'],
      parentTip: 'Choose a job with a visible finish, such as returning a few blocks to their box. Let the children decide when their spot feels cozy.',
      pages: [],
      landmark: landmark('cottage-windows', 'Cottage windows', '🏡', 72, 29, 'The windows in Amor’s cottage shine.'),
      firstReward: 'What a cozy spot! Look how the windows in my cottage shine.',
      repeatReward: 'That little place feels cozy again. Thank you for helping!'
    },
    {
      id: 'new-food', title: 'Try a new food', icon: '🍎',
      invitation: 'What would you like to taste with me?',
      materials: ['A food the family chooses'],
      parentTip: 'Let the child choose their own taste and describe it in their own words.',
      pages: [],
      landmark: landmark('tasting-bowl', 'Tasting bowl', '🥣', 89, 34, 'A tasting bowl appears in the kitchen.'),
      firstReward: 'Our kitchen has a tasting bowl! What did you notice about your food?',
      repeatReward: 'Another taste to remember! How would you describe it?'
    },
    {
      id: 'bake', title: 'Bake something', icon: '🥄',
      invitation: 'What could we bake together for our table?',
      materials: ['A family recipe and its ingredients', 'The tools your recipe needs'],
      parentTip: 'Let a child scoop, stir, or help shape the dough. A grown-up can handle the oven.',
      pages: [],
      landmark: landmark('bread-basket', 'Bread basket', '🥖', 93, 60, 'A bread basket appears in the kitchen.'),
      firstReward: 'It smells lovely! There’s a bread basket on my table now.',
      repeatReward: 'Something else for our table! What did you help bake today?'
    },
    {
      id: 'build', title: 'Build something', icon: '🧱',
      invitation: 'Will you build something for my clearing? When you’re ready, tell me what you made.',
      materials: ['Blocks, Magna-Tiles, a railroad, or another construction set'],
      parentTip: 'The children can build together or bring you something they already made. Ask them to show you one part of it.',
      pages: [],
      landmark: landmark('clearing-workshop', 'Clearing workshop', '🛖', 11, 86, 'A workshop appears in the clearing.'),
      firstReward: 'You built something in my clearing! Now we have a workshop.',
      repeatReward: 'Something new from our builders! Show me how it works.'
    },
    {
      id: 'learn', title: 'Learn something new', icon: '🔍',
      invitation: 'Show or tell me one thing you figured out today.',
      materials: ['A discovery to share'],
      parentTip: 'Invite a demonstration, a gesture, or a few words. A small discovery counts.',
      pages: [],
      landmark: landmark('discovery-book', 'Discovery book', '📖', 30, 91, 'A discovery book opens in the grove.'),
      firstReward: 'A discovery! My book has opened for what you learned.',
      repeatReward: 'One more discovery for my book. Thank you for teaching me!'
    },
    {
      id: 'celebrate', title: 'Celebrate a holiday', icon: '🎉',
      invitation: 'What does your family do for this occasion? Pick one tradition to share.',
      materials: ['Anything your family uses for its tradition'],
      parentTip: 'A song, a family saying, or a favorite holiday custom can be the whole activity.',
      pages: [],
      landmark: landmark('celebration-lantern', 'Celebration lantern', '🕯️', 67, 90, 'A celebration lantern appears.'),
      firstReward: 'Thank you for sharing your tradition! I’ve hung a celebration lantern.',
      repeatReward: 'What a lovely way to celebrate together!'
    },
    {
      id: 'custom', title: 'Do your own', icon: '✨',
      invitation: 'What would you like to do for my grove?',
      materials: ['Whatever your idea calls for'],
      parentTip: 'Follow the children’s idea. You can name it now, add a name when you come back, or leave it untitled.',
      pages: [],
      landmark: landmark('family-star', 'Family star', '🌟', 89, 86, 'A family star appears in the grove.'),
      firstReward: 'That idea was yours! Look at the family star you brought to my grove.',
      repeatReward: 'Another idea all your own! Thank you for sharing it with me.'
    }
  ];

  const byId = Object.fromEntries(activities.map(activity => [activity.id, activity]));
  window.groveCatalog = { activities, byId, starter, keepsake, winterRecord };
})();
