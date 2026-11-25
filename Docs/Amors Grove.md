# Amor’s Grove

Open [Amor’s Grove](https://roakesiv.github.io/Imagination-play-guide/#grove) and tap a place to walk there with Amor. From Lantern Gate, the left trail leads to the Wish Tree, and the right trail leads to Creek Cottage. At the Wish Tree, follow the creek uphill or cross the meadow to the cottage. Both branches lead on to Islay Hill.

Footprints mark the trails your family has walked. Each stop has its own invitation and activities. Paint a pine cone at the Wish Tree and fireflies open a shortcut to the Wand Garden. Families who already earned the tree charm can use the crossing immediately. The grove remembers your location, trails and discoveries between visits in the same browser.

For an after-school visit, mark **Paint a pine cone** and **Make a flower wand** ready. **Pick from 3** offers those two cards and **Read with Amor**. The [two-page starter](../printables/amor-grove/starter-crafts.pdf) contains the original pine cone sheet followed by the lavender wand sheet. A family with the printed Grimoire can begin as soon as the materials are out.

## Play and saving

The six stops on the map lead to all 15 activities. **See all activities** offers a labeled list and **Pick from 3** uses your prepared choices. A parent can name a custom activity before or after playing. **We did it!** earns one gem. Repeating an activity on a fresh card earns another. The first completion of each landmark changes the map. Leaving for Home preserves the active visit. **Finish for today** closes it and opens Amor’s farewell and the visit report.

Use the same browser and app location to return to the family’s grove. The versioned local storage key is `islayQuest.amorGrove.v1`. Clearing that browser’s site data clears its grove. The creature maker exports its own draft and creature list.

## Trail-map checks

Opened the map from Home at a 390-pixel phone width and followed Amor’s movement along the curved trail. Walking left footprints and kept the gem total at zero. Completing the pine cone opened Firefly Crossing. Crossing to the garden and making a wand produced two gems and two discoveries in the visit report. Reloading kept the report and the family’s place. Also exercised keyboard travel, reduced motion, all 15 activity choices and an earlier saved visit with a pending wand and a previously earned pine cone.

## First release checks

The [original release](https://github.com/roakesiv/Imagination-play-guide/commit/1748ee32157e86d0093e03f15be2883f3f8e0930) was verified on the public site at a 390-pixel phone width. The initial map offered one target per activity.

| Family journey | Verified result |
| --- | --- |
| Prepare and print | Two ready crafts persisted after leaving. The suggested third card was Read with Amor. The starter opened and downloaded through the app. Its pages and the eight individual printable sheets matched the original source pages pixel for pixel at 96 dpi, with the original US Letter page boxes. |
| Choose an activity | On a fresh visit, all 15 map targets and labeled choices worked. Zero, two and four prepared activities yielded three distinct named suggestions in the expected order. A preview and a zero-completion visit awarded zero gems. |
| One afternoon | A pine cone, two wands and an untitled custom idea earned four gems. The report grouped the two wands and listed three new landmarks. Reloading the report and revisiting the farewell preserved the totals. |
| Return to play | Reload and Resume visit restored an in-progress card. Two confirmations on the same attempt earned one gem. A new visit’s third wand earned one gem, increased the family total to five and added zero landmarks. A custom name survived reload and appeared in the report. |
| Access | Exercised the Home entry at desktop and 360-pixel phone widths, the keyboard route through confirmations and the report, and keyboard access to the starter and individual print actions. Checked map touch targets, layout and a reduced-motion viewport. |
| Existing Play Guide | Checked the Rhea age picker and volume PDFs, Amor’s gallery entry and printable links, and the creature maker. Created a creature, saved it, entered the grove, returned, reloaded the draft, loaded the saved creature and verified the downloaded backup JSON. |

Testing used disposable browser profiles and electronic PDF output. A physical print run and family play session remain for family review. Other character maps, gem spending and outfits are future work.

<details>
<summary>Grove artwork and generation prompts</summary>

The built-in image generator created the [overhead trail map](../grove/trail-country.webp) and [walking Amor](../grove/amor-traveler.webp). The app draws traversable paths, footprints and destinations over the terrain. Walking Amor uses the existing character portrait as a visual reference.

**Trail terrain**

Use case: illustration-story. Create an original playable storybook overworld terrain painting, portrait 4:5 aspect, full bleed, a single tightly composed bird's eye miniature of a California oak grove. Orthographic elevated near-top-down map view across the ENTIRE valley, no horizon or sky, no vanishing point. Painterly gouache shapes, miniature woodland board-game figurine scale, tactile overlapping oak crowns edging vivid pockets of yellow-green meadow, bright teal water, warm ochre rock edges, winter wildflowers, deep greens, beautifully clear shapes readable on phones. Six broad pale grassy clearings for the playable places: low in the image at x49% y84% a tiny wooden gate on the edge of a large arrival lawn; left middle x23% y59% a broad spreading wish oak behind an empty clearing; right middle x77% y62% a cozy small orange-roof stone cottage just right of its lawn; upper left x21% y32% a flat waterside meadow at the bend of a blue creek; upper right x76% y33% curved beds of purple wand flowers bordering a grassy glade; top center x48% y13% a round softly golden hilltop with little rocky terraces. The creek winds from high left between the left and central fields and down the left edge, a tiny bridge where appropriate, bushes and moss. Keep CENTER between nodes and their corridors OPEN so executable routes and walking sprites can be drawn on top. The world's points of interest should feel like distinct explorable destinations at a toy-like scale. Frame the world in little copse clusters and rocks around the outer edges, also a few small interior copse clumps away from the empty corridors. No sweeping landscape vista, roads, text, letters, numbered spaces, flags, UI, borders, labels, players or icons. No existing game assets or characters.

**Walking Amor**

Create a single small game traveler miniature of Amor, matching the exact white dragon-alicorn character in the supplied portrait. One complete four-legged creature on a genuinely transparent background, no scenery or base, no extra panels. She is on her paws, one forepaw lifted mid-step, in a playful confident walking pose facing right, slightly elevated three-quarter view for a painted overhead woodland game board. Preserve unmistakable white scales, warm violet eyes, single glowing silver horn, rainbow mane and tail, feathered rainbow wings folded halfway open and pink heart pendant. Original illustrated storybook gouache, warm fine ink contour to separate her white body from green grass, big readable silhouette in 45 pixels, avoid any tall transparent margin. Whole body and tail visible, no floating props, text, border or backdrop.

The built-in image generator created the [grove painting](../grove/map.webp), [painted charm](../grove/wish-charm.webp), [wand shop](../grove/wand-shop.webp) and [twelve illustrated map landmarks](../grove/landmarks.webp). The illustrated cards use the Play Guide’s adopted [Amor portrait](../portraits/amor.webp).

**Grove painting**

Original hand-painted storybook map for a family adventure at Islay Park near Islay Hill in San Luis Obispo. Wide landscape 3:2 full-bleed watercolor and gouache illustration, elevated bird's eye storybook view looking over a sunny California winter grove, a rounded grassy Islay Hill silhouette behind the trees, eucalyptus and oak, soft teal creek meandering from upper right to lower center with a small footbridge, left of center a large lovely old spreading wish tree with bare lower branches, a modest unlit cottage on the right and Amor's flower garden with lavender beds, many gently winding sandy footpaths and open patches of grasses. Keep the map legible and welcoming for a child. Rich sage, eucalyptus green, honey ochre, sky blue and dusty rose in warm late afternoon light, pencil contours and visible paper grain. Paths and clearings fill the frame with low foreground and narrow sky above. The family will uncover interactive landmarks later, so leave empty clearings for them. No labels, no lettering, no markers, no UI, no people, no creatures, no hanging charms, no wand shop, no book basket, no lanterns, no inset frame.

**Painted charm**

Storybook map prop, one large pine cone charm hanging by a short narrow red ribbon loop from the top, isolated on genuine transparent background. A child has brushed several bands of turquoise, coral red and warm gold on its woody scales, a tiny painted gold star wish. Clear readable silhouette, detailed warm gouache and colored pencil watercolor. Single centered front facing object fills frame, full ribbon and cone visible, no branch, no surrounding scenery, no lettering, no ground or drop shadow. Icon used at small scale in a hand-painted California grove map.

**Wand shop**

Storybook game map landmark, a small charming wooden flower-wand shop selling wands, one isolated whole building on genuine transparent background. A child-sized open-front timber market stall with a moss-green and dusty lavender shingled canopy, three handmade flower wands in a jug on the counter, a dangling carved five-point star as a shop sign without words. View three-quarter elevated from the front, simple clearly readable silhouette, warm old-fashioned watercolor, pencil outlines and opaque gouache as in a sunny California hillside children's picture book. Entire stall including its feet visible. No scenery, no background, no text, no lettering, no character, no ground shadow. Occupies most of image.

**Other map landmarks**

A transparent centered woodland atlas of twelve props in a four-column, three-row grid. Warm watercolor and colored pencil matching the wand shop, in oak, sage, violet and gold, with a clear three-quarter view. The rows contain a field sign, listening bench, water table and framed drawing, then a basket of books, heart lantern, tasting bowl and bread basket, then a workshop, discovery book, celebration lantern and family star.

</details>
