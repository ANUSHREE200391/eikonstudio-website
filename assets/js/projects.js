/* =========================================================
   eikon studio — PORTFOLIO CONTENT
   To add new work: copy one block below, change the details,
   and put the image/video file in assets/img/work or assets/video.

   category: jewellery | food | fashion | product | graphics
   type:     photo | reel
   size:     (optional) "tall" or "wide" to make a tile bigger
   ========================================================= */
window.EIKON_CATEGORIES = [
  { id: "all",       label: "All" },
  { id: "jewellery", label: "Jewellery" },
  { id: "food",      label: "Food" },
  { id: "fashion",   label: "Fashion" },
  { id: "product",   label: "Product" },
  { id: "graphics",  label: "Graphics" },
  { id: "reels",     label: "Reels" }
];

window.EIKON_PROJECTS = [
  {
    title: "Silver statement necklace, mirror story",
    category: "jewellery", type: "photo", size: "tall",
    image: "assets/img/work/jewellery-mirror.webp",
    thumb: "assets/img/work/jewellery-mirror-sm.webp",
    alt: "Model in sunglasses reflected in a round mirror, wearing a silver statement necklace, with warm bokeh lights around",
    description: "An editorial jewellery shoot built around a mirror reflection, warm bokeh and a playful attitude, so the necklace reads as part of a story rather than a catalogue shot."
  },
  {
    title: "Gold & turquoise necklace, mirror still life",
    category: "jewellery", type: "photo", size: "tall",
    image: "assets/img/work/jewellery-vase.webp",
    thumb: "assets/img/work/jewellery-vase-sm.webp",
    alt: "A gold and turquoise necklace draped around a black vase with red roses, framed inside an ornate mirror with warm bokeh lights",
    description: "A styled still life with no model: the necklace is draped on a glossy black vase and framed through an ornate mirror, with warm bokeh adding a festive glow."
  },
  {
    title: "Eye-catching jewellery creative",
    category: "jewellery", type: "reel",
    video: "assets/video/reel-jewellery-eye.mp4",
    thumb: "assets/video/reel-jewellery-eye.webp",
    alt: "Reel still: close-up of a blue eye that leads into an eye-shaped statement earring",
    description: "A cinematic short-form reel that moves from water to a close-up eye and reveals an eye-shaped statement earring. Concept-led jewellery storytelling for social."
  },
  {
    title: "Silver statement necklace, low-key light",
    category: "jewellery", type: "photo",
    image: "assets/img/work/jewellery-necklace-1.webp",
    thumb: "assets/img/work/jewellery-necklace-1-sm.webp",
    alt: "Close-up of a silver statement necklace with crystal drops worn over a red printed outfit, lit in low warm light",
    description: "Low-key lighting that pulls every crystal and engraving forward, with the outfit's print framing the piece."
  },
  {
    title: "Banarasi saree, heritage arches",
    category: "fashion", type: "photo", size: "tall",
    image: "assets/img/work/fashion-saree-1.webp",
    thumb: "assets/img/work/fashion-saree-1-sm.webp",
    alt: "Model in a pink and gold Banarasi saree standing inside a weathered stone archway",
    description: "An outdoor fashion shoot set against old stone arches, using natural light to bring out the gold zari work on a pink Banarasi saree."
  },
  {
    title: "POV: Diwali pe deadline",
    category: "jewellery", type: "reel",
    video: "assets/video/reel-jewellery-rings.mp4",
    thumb: "assets/video/reel-jewellery-rings.webp",
    alt: "Reel still: hands wearing statement rings typing on a laptop under a festive Diwali title",
    description: "A relatable, trend-led festive reel. Statement rings star in a 'deadline at Diwali' moment, with each piece named on screen."
  },
  {
    title: "Banarasi saree, the drape",
    category: "fashion", type: "photo",
    image: "assets/img/work/fashion-saree-2.webp",
    thumb: "assets/img/work/fashion-saree-2-sm.webp",
    alt: "Model seated on the ground seen from behind, the pink Banarasi saree pallu spread out around her",
    description: "A seated, back-facing frame that lets the full pallu and its woven border take centre stage."
  },
  {
    title: "Bubble tea product shoot",
    category: "food", type: "photo", size: "wide",
    image: "assets/img/work/food-bubble-tea.webp",
    thumb: "assets/img/work/food-bubble-tea-sm.webp",
    alt: "A chilled bubble tea cup with condensation, on a pink backdrop with soft leaf shadows",
    description: "A bright, colour-matched product shot for a café drink. Condensation, hard sunlight and leaf shadows make it feel fresh and summery."
  },
  {
    title: "Purple frosted cake, studio shot",
    category: "food", type: "photo", size: "wide",
    image: "assets/img/work/food-cake.webp",
    thumb: "assets/img/work/food-cake-sm.webp",
    alt: "A chocolate cake topped with swirls of purple piped frosting and gold pearls, on a stone surface against a warm brown backdrop",
    description: "A moody studio cake shot. Warm, low light and a neutral backdrop let the purple piping and gold pearls do the talking."
  },
  {
    title: "3D mascot animation for a bubble tea café",
    category: "food", type: "reel",
    video: "assets/video/reel-food-panda.mp4",
    thumb: "assets/video/reel-food-panda.webp",
    alt: "Reel still: a fluffy 3D panda character holding a bubble tea cup on a pink background",
    description: "A short 3D character animation that turns a café's mascot into a scroll-stopping social moment."
  },
  {
    title: "Banarasi saree, details",
    category: "fashion", type: "photo",
    image: "assets/img/work/fashion-saree-3.webp",
    thumb: "assets/img/work/fashion-saree-3-sm.webp",
    alt: "Close-up of hands wearing gold pearl bangles resting on a pink and gold Banarasi saree",
    description: "Detail frames that pair the saree's weave with gold pearl bangles, made for carousels and product callouts."
  },
  {
    title: "Cupcake 'undo' animation",
    category: "food", type: "reel",
    video: "assets/video/reel-food-cupcake.mp4",
    thumb: "assets/video/reel-food-cupcake.webp",
    alt: "Reel still: a chocolate cupcake on a plate with a Ctrl+Z keyboard graphic undoing the toppings",
    description: "A playful 'what if' food reel that uses a Ctrl+Z gag to undo a cupcake layer by layer."
  },
  {
    title: "Silver statement necklace, profile",
    category: "jewellery", type: "photo",
    image: "assets/img/work/jewellery-necklace-2.webp",
    thumb: "assets/img/work/jewellery-necklace-2-sm.webp",
    alt: "Side profile of a model in deep shadow wearing a silver statement necklace with crystal drops",
    description: "A dramatic profile frame with deep shadow, shot for campaign and social use."
  },

  /* ---- Coming soon: replace these when the work is ready ---- */
  { title: "Product photography", category: "product", type: "soon", pose: "assets/img/cat/cat-shoot.webp" },
  { title: "Graphic design & carousels", category: "graphics", type: "soon", pose: "assets/img/cat/cat-create.webp" }
];
