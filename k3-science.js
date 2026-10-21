/* k3-science.js : Grade 3 NGSS (California) science activities
   Loaded after k3-engine.js. Each K3.add() call is one activity. */
(function () {
  var S = 'style="width:100%;max-width:360px;height:auto;display:block;margin:0 auto" role="img"';
  var big = function (txt) { return '<div style="font-size:52px;line-height:1.2;text-align:center">' + txt + '</div>'; };
  var cycle = function (steps) {
    return '<div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;text-align:center;font-size:15px;font-weight:bold">' +
      steps.map(function (s) { return '<div style="min-width:64px"><div style="font-size:44px">' + s[0] + '</div>' + s[1] + '</div>'; }).join('<div style="font-size:28px">➡️</div>') +
      '</div>';
  };

  /* ---------- Pictures ---------- */
  var box = function (leftLen, rightLen, label) {
    // arrowheads are drawn as polygons (no SVG ids, so the picture can repeat on a page)
    var head = function (tipX, dir, w) { return '<polygon points="' + tipX + ',70 ' + (tipX - dir * (w + 8)) + ',' + (70 - w - 2) + ' ' + (tipX - dir * (w + 8)) + ',' + (70 + w + 2) + '" fill="#5b2a86"/>'; };
    return '<svg viewBox="0 0 360 130" ' + S + ' aria-label="' + label + '">' +
      '<rect x="0" y="100" width="360" height="6" fill="#9ca3af"/>' +
      '<rect x="145" y="40" width="70" height="60" fill="#c8a75a" stroke="#7a5c1e" stroke-width="2"/>' +
      '<text x="180" y="76" text-anchor="middle" font-size="14" font-weight="bold">box</text>' +
      (leftLen ? '<line x1="' + (145 - leftLen) + '" y1="70" x2="' + (145 - (leftLen > 60 ? 16 : 13)) + '" y2="70" stroke="#5b2a86" stroke-width="' + (leftLen > 60 ? 8 : 5) + '"/>' + head(144, 1, leftLen > 60 ? 8 : 5) : '') +
      (rightLen ? '<line x1="' + (215 + rightLen) + '" y1="70" x2="' + (215 + (rightLen > 60 ? 16 : 13)) + '" y2="70" stroke="#5b2a86" stroke-width="' + (rightLen > 60 ? 8 : 5) + '"/>' + head(216, -1, rightLen > 60 ? 8 : 5) : '') +
      '<text x="180" y="124" text-anchor="middle" font-size="12">Longer arrow = bigger push</text></svg>';
  };
  var balanced = box(70, 70, "Two equal pushes on a box from both sides");
  var unbalanced = box(120, 40, "A big push from the left and a small push from the right on a box");

  var swing =
    '<svg viewBox="0 0 360 180" ' + S + ' aria-label="A swing moving back and forth">' +
    '<line x1="60" y1="20" x2="300" y2="20" stroke="#5b2a86" stroke-width="8"/>' +
    '<line x1="180" y1="20" x2="110" y2="135" stroke="#c4b5fd" stroke-width="3" stroke-dasharray="6 4"/>' +
    '<line x1="180" y1="20" x2="250" y2="135" stroke="#c4b5fd" stroke-width="3" stroke-dasharray="6 4"/>' +
    '<line x1="180" y1="20" x2="180" y2="150" stroke="#121015" stroke-width="3"/>' +
    '<rect x="160" y="148" width="40" height="8" fill="#8a4fd8"/>' +
    '<rect x="92" y="133" width="36" height="7" fill="#c4b5fd"/><rect x="232" y="133" width="36" height="7" fill="#c4b5fd"/>' +
    '<path d="M100,160 Q180,190 260,160" fill="none" stroke="#ffc53d" stroke-width="4"/>' +
    '<polygon points="100,160 112,158 106,168" fill="#ffc53d"/><polygon points="260,160 248,158 254,168" fill="#ffc53d"/>' +
    '<text x="60" y="120" font-size="13" font-weight="bold">back</text><text x="270" y="120" font-size="13" font-weight="bold">forth</text>' +
    '</svg>';

  var magnetObjects =
    '<svg viewBox="0 0 360 150" ' + S + ' aria-label="A horseshoe magnet near a paper clip, an aluminum can, a nail, and a pencil">' +
    '<path d="M40,30 L40,90 A40,40 0 0 0 120,90 L120,30 L95,30 L95,90 A15,15 0 0 1 65,90 L65,30 Z" fill="#dc2626"/>' +
    '<rect x="40" y="22" width="25" height="18" fill="#d1d5db"/><rect x="95" y="22" width="25" height="18" fill="#d1d5db"/>' +
    '<text x="52" y="36" text-anchor="middle" font-size="12" font-weight="bold">N</text><text x="107" y="36" text-anchor="middle" font-size="12" font-weight="bold">S</text>' +
    '<g font-size="11" text-anchor="middle">' +
    '<path d="M160,40 h30 a6,6 0 0 1 0,12 h-26 a4,4 0 0 1 0,-8 h22" fill="none" stroke="#6b7280" stroke-width="3"/><text x="178" y="72">steel paper clip</text>' +
    '<rect x="230" y="25" width="34" height="46" rx="6" fill="#cbd5e1" stroke="#64748b"/><text x="247" y="86">aluminum can</text>' +
    '<line x1="160" y1="115" x2="210" y2="115" stroke="#4b5563" stroke-width="5"/><rect x="154" y="109" width="6" height="12" fill="#4b5563"/><text x="185" y="138">iron nail</text>' +
    '<rect x="235" y="110" width="60" height="9" fill="#facc15"/><polygon points="295,110 307,114.5 295,119" fill="#d6b98c"/><text x="268" y="138">wood pencil</text>' +
    '</g></svg>';

  var bars2 = function (a, b, label, result) {
    var col = { N: "#dc2626", S: "#2563eb" };
    var bar = function (x, l, r) { return '<rect x="' + x + '" y="40" width="50" height="34" fill="' + col[l] + '"/><rect x="' + (x + 50) + '" y="40" width="50" height="34" fill="' + col[r] + '"/>' +
      '<text x="' + (x + 25) + '" y="63" text-anchor="middle" font-size="16" font-weight="bold" fill="#fff">' + l + '</text><text x="' + (x + 75) + '" y="63" text-anchor="middle" font-size="16" font-weight="bold" fill="#fff">' + r + '</text>'; };
    return '<svg viewBox="0 0 360 110" ' + S + ' aria-label="' + label + '">' + bar(40, a[0], a[1]) + bar(220, b[0], b[1]) +
      (result ? '<text x="180" y="100" text-anchor="middle" font-size="13" font-weight="bold">' + result + '</text>' : '<text x="180" y="62" text-anchor="middle" font-size="22" font-weight="bold">?</text>') + '</svg>';
  };
  var poleSame = bars2(["S", "N"], ["N", "S"], "Two bar magnets with north poles facing each other", "");
  var poleOpp = bars2(["N", "S"], ["N", "S"], "Two bar magnets with south facing north", "");
  var poleLearn = bars2(["N", "S"], ["N", "S"], "Two bar magnets, south pole facing north pole", "S and N face: they PULL together");

  var balloon =
    '<svg viewBox="0 0 360 160" ' + S + ' aria-label="A balloon rubbed on hair makes the hair stand up toward the balloon">' +
    '<circle cx="110" cy="100" r="40" fill="#f2c8a0"/>' +
    '<g stroke="#4a2c0f" stroke-width="3" fill="none"><path d="M85,68 Q130,40 170,45"/><path d="M95,62 Q135,30 172,32"/><path d="M110,60 Q140,22 175,20"/><path d="M125,62 Q150,35 178,40"/></g>' +
    '<circle cx="97" cy="98" r="4" fill="#121015"/><circle cx="123" cy="98" r="4" fill="#121015"/><path d="M98,116 Q110,124 122,116" stroke="#121015" stroke-width="3" fill="none"/>' +
    '<ellipse cx="225" cy="45" rx="32" ry="38" fill="#8a4fd8"/><path d="M225,83 L220,92 L230,92 Z" fill="#8a4fd8"/><path d="M225,92 Q235,120 222,150" stroke="#121015" fill="none"/>' +
    '<text x="300" y="40" font-size="12" font-weight="bold">balloon</text><text x="20" y="155" font-size="12" font-weight="bold">Hair is pulled up!</text>' +
    '</svg>';

  var fossilPic =
    '<svg viewBox="0 0 360 150" ' + S + ' aria-label="Layers of rock with a fossil fish, a fossil shell, and a dinosaur footprint">' +
    '<rect y="0" width="360" height="50" fill="#e7d3a8"/><rect y="50" width="360" height="50" fill="#d1b483"/><rect y="100" width="360" height="50" fill="#b3946a"/>' +
    '<g fill="none" stroke="#5b3b0e" stroke-width="2.5">' +
    '<path d="M50,125 Q80,105 110,125 Q80,145 50,125 Z"/><path d="M110,125 L125,113 L125,137 Z"/><line x1="65" y1="118" x2="65" y2="132"/><line x1="78" y1="115" x2="78" y2="135"/><line x1="91" y1="117" x2="91" y2="133"/>' +
    '<path d="M200,95 Q215,60 230,95 Z"/><line x1="215" y1="70" x2="207" y2="95"/><line x1="215" y1="70" x2="223" y2="95"/>' +
    '<path d="M300,35 L290,15 M300,35 L300,10 M300,35 L310,15"/><ellipse cx="300" cy="38" rx="9" ry="6"/></g>' +
    '<g font-size="11" font-weight="bold" fill="#121015"><text x="58" y="147">fish fossil</text><text x="190" y="65">shell</text><text x="282" y="32" text-anchor="end">footprint</text></g>' +
    '</svg>';

  var tempData = [["Jan", 55], ["Apr", 75], ["Jul", 95], ["Oct", 80]];
  var tempGraph = K3.pic.bars("Tulare High Temperature, SAMPLE DATA (°F)", tempData, "°F", 5);
  var rainData = [["Jan", 7], ["Mar", 6], ["May", 2], ["Jul", 0], ["Sep", 1], ["Nov", 4]];
  var rainGraph = K3.pic.bars("Rainy Days in Tulare, SAMPLE DATA", rainData, "days", 1);

  /* ================= 3-PS2-1/2 Forces ================= */
  K3.add({
    id: "s-forces-motion",
    subject: "science",
    unit: "Forces and Magnets",
    title: "Pushes, Pulls, and Patterns",
    standard: "3-PS2-1/2",
    skill: "Tell how balanced and unbalanced forces change motion",
    emoji: "🛝",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>A <b>force</b> is a <b>push</b> or a <b>pull</b>.</p><p>Kicking a soccer ball is a push. Opening a door toward you is a pull.</p>", pic: big("⚽🦶 &nbsp; 🚪🤲"), say: "A force is a push or a pull. Kicking a soccer ball is a push. Opening a door toward you is a pull." },
      { html: "<p><b>Balanced forces</b> are equal pushes or pulls in opposite directions. The object does <b>not</b> start moving or change its motion.</p>", pic: balanced, say: "Balanced forces are equal pushes or pulls in opposite directions. The object does not start moving or change its motion." },
      { html: "<p><b>Unbalanced forces</b> are not equal. The object starts to move, speeds up, slows down, or changes direction.</p><p>It moves the way the <b>bigger</b> force pushes.</p>", pic: unbalanced, say: "Unbalanced forces are not equal. The object starts to move, speeds up, slows down, or changes direction. It moves the way the bigger force pushes." },
      { html: "<p>Some motion has a <b>pattern</b>. A swing or a <b>pendulum</b> goes back and forth, again and again.</p><p>Because it repeats, we can <b>predict</b> where it will go next.</p>", pic: swing, say: "Some motion has a pattern. A swing or a pendulum goes back and forth, again and again. Because it repeats, we can predict where it will go next." }
    ],
    qs: [
      { t: "mc", q: "Look at the box. Two equal pushes come from both sides. What happens?", pic: balanced, opts: ["The box moves left.", "The box does not move.", "The box moves right.", "The box flies up."], a: 1, why: "The pushes are equal, so the forces are balanced. The box stays still." },
      { t: "mc", q: "Look at the box. The push from the left is bigger. Which way will the box move?", pic: unbalanced, opts: ["Left", "Up", "It will not move", "Right"], a: 3, why: "The bigger push comes from the left, so it pushes the box to the right." },
      { t: "sort", q: "Sort each one. Is it a push or a pull?", bins: ["Push", "Pull"], items: [["kicking a ball", 0], ["opening a drawer", 1], ["pushing a cart", 0], ["a tug of war", 1], ["closing a door", 0], ["picking a carrot from the ground", 1]], why: "A push moves things away from you. A pull moves things toward you." },
      { t: "tf", q: "In a tug of war, if both teams pull with the same force, the rope does not move.", a: true, why: "Equal pulls are balanced forces. The rope stays still." },
      { t: "mc", q: "A swing goes back and forth, again and again. This is a...", pic: swing, opts: ["pattern of motion", "kind of magnet", "type of weather", "fossil"], a: 0, why: "The swing repeats the same motion. That is a pattern we can predict." },
      { t: "mc", q: "Diego pushes a swing. It goes forward. What will it do next?", pic: swing, opts: ["Stop in the air", "Fly away", "Swing back", "Go in a circle"], a: 2, why: "A swing moves in a pattern. After it goes forward, it swings back." },
      { t: "mc", q: "Which one is an unbalanced force?", opts: ["A book resting on a desk", "Two kids pushing a door with the same force from each side", "A lamp hanging still", "Kicking a soccer ball so it rolls"], a: 3, why: "The kick makes the ball start to move. That means the forces are unbalanced." },
      { t: "mc", q: "A rolling ball hits a wall and stops. What made it stop?", opts: ["A force from the wall", "The color of the ball", "The sun", "Nothing"], a: 0, why: "The wall pushed on the ball. A force can stop motion." },
      { t: "tap", q: "Tap the words that tell how a force can change motion.", words: ["start", "stop", "sleep", "turn", "speed", "sing"], a: [0, 1, 3, 4], why: "Forces can make things start, stop, turn, or change speed." }
    ]
  });

  /* ================= 3-PS2-3/4 Magnets and static ================= */
  K3.add({
    id: "s-magnets-static",
    subject: "science",
    unit: "Forces and Magnets",
    title: "Magnets and Static Electricity",
    standard: "3-PS2-3/4",
    skill: "Tell how magnets and static electricity push and pull without touching",
    emoji: "🧲",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>A <b>magnet</b> pulls, or <b>attracts</b>, things made of <b>iron</b> or <b>steel</b>.</p><p>Magnets do <b>not</b> attract wood, plastic, paper, glass, or aluminum.</p>", pic: magnetObjects, say: "A magnet pulls, or attracts, things made of iron or steel. Magnets do not attract wood, plastic, paper, glass, or aluminum." },
      { html: "<p>Every magnet has a <b>north</b> pole and a <b>south</b> pole.</p><p><b>Opposite</b> poles pull together. <b>Same</b> poles push apart (repel).</p>", pic: poleLearn, say: "Every magnet has a north pole and a south pole. Opposite poles pull together. Same poles push apart. This is called repel." },
      { html: "<p>Magnets can push or pull <b>without touching</b>. They even work through paper.</p><p>The <b>closer</b> the magnet is, the <b>stronger</b> the pull.</p>", pic: big("🧲 ➡️ 📎"), say: "Magnets can push or pull without touching. They even work through paper. The closer the magnet is, the stronger the pull." },
      { html: "<p><b>Static electricity</b> can also pull without touching.</p><p>Rub a balloon on your hair. Now the balloon pulls your hair up. It can pick up bits of paper too!</p>", pic: balloon, say: "Static electricity can also pull without touching. Rub a balloon on your hair. Now the balloon pulls your hair up. It can pick up bits of paper too!" }
    ],
    qs: [
      { t: "sort", q: "Will a magnet attract it? Sort each one.", pic: magnetObjects, bins: ["Magnet attracts", "Magnet does not attract"], items: [["steel paper clip", 0], ["iron nail", 0], ["aluminum can", 1], ["wood pencil", 1], ["steel spoon", 0], ["plastic cup", 1]], why: "Magnets attract iron and steel. They do not attract aluminum, wood, or plastic." },
      { t: "tf", q: "A magnet will pick up an aluminum soda can.", a: false, why: "Aluminum is a metal, but magnets do not attract it. Magnets attract iron and steel." },
      { t: "mc", q: "Two magnets have their north poles facing. What happens?", pic: poleSame, opts: ["They pull together", "They push apart", "They change color", "Nothing ever"], a: 1, why: "Same poles push apart. North and north repel each other." },
      { t: "mc", q: "One magnet's south pole faces the other magnet's north pole. What happens?", pic: poleOpp, opts: ["They push apart", "They melt", "They pull together", "They get hot"], a: 2, why: "Opposite poles attract. South and north pull together." },
      { t: "mc", q: "When does a magnet pull a paper clip the strongest?", opts: ["When it is close to the clip", "When it is far away", "When it is in the dark", "When it is wet"], a: 0, why: "Magnets pull stronger when they are closer." },
      { t: "tf", q: "A magnet can pull a paper clip through a sheet of paper.", a: true, why: "Yes! Magnets can push and pull without touching, even through paper." },
      { t: "mc", q: "Isabel rubs a balloon on her hair. What will the balloon do to small bits of paper?", pic: balloon, opts: ["Push them into the ground", "Turn them into iron", "Make them wet", "Pull them up"], a: 3, why: "Rubbing makes static electricity. The balloon pulls the little paper bits up." },
      { t: "mc", q: "Which problem could a magnet help solve?", opts: ["Keeping a cabinet door closed", "Making a plant grow", "Cooling hot soup", "Turning on the rain"], a: 0, why: "A magnet latch can hold a steel door plate and keep a cabinet door shut." },
      { t: "mc", q: "Pins spilled on the floor! Which tool is best to pick up the steel pins?", opts: ["A wood spoon", "A paper towel", "A magnet", "A plastic cup"], a: 2, why: "Steel pins are attracted to a magnet. The magnet picks them up fast!" }
    ]
  });

  /* ================= 3-LS1-1 Life cycles ================= */
  K3.add({
    id: "s-life-cycles",
    subject: "science",
    unit: "Living Things",
    title: "Life Cycles",
    standard: "3-LS1-1",
    skill: "Put the stages of a life cycle in order",
    emoji: "🦋",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>A <b>life cycle</b> is how a living thing is born, grows, has young, and dies.</p><p>All plants and animals have a life cycle.</p>", pic: big("🌱➡️🌻"), say: "A life cycle is how a living thing is born, grows, has young, and dies. All plants and animals have a life cycle." },
      { html: "<p><b>Butterfly:</b> egg, caterpillar (larva), chrysalis (pupa), adult butterfly.</p>", pic: cycle([["🥚", "egg"], ["🐛", "caterpillar"], ["🫘", "chrysalis"], ["🦋", "butterfly"]]), say: "Butterfly: egg, caterpillar, chrysalis, adult butterfly." },
      { html: "<p><b>Frog:</b> egg, tadpole, tadpole with legs, adult frog.</p><p>A tadpole lives in water and breathes with gills.</p>", pic: cycle([["🥚", "egg"], ["〰️", "tadpole"], ["〰️🦵", "tadpole with legs"], ["🐸", "frog"]]), say: "Frog: egg, tadpole, tadpole with legs, adult frog. A tadpole lives in water and breathes with gills." },
      { html: "<p><b>Plant:</b> seed, sprout, adult plant, flower, fruit with new seeds.</p><p><b>Chicken:</b> egg, chick, young chicken, adult hen.</p>", pic: cycle([["🌰", "seed"], ["🌱", "sprout"], ["🪴", "plant"], ["🌼", "flower"]]) + cycle([["🥚", "egg"], ["🐣", "chick"], ["🐥", "young"], ["🐔", "hen"]]), say: "Plant: seed, sprout, adult plant, flower, fruit with new seeds. Chicken: egg, chick, young chicken, adult hen." }
    ],
    qs: [
      { t: "order", q: "Put the butterfly life cycle in order.", items: ["egg", "caterpillar", "chrysalis", "butterfly"], why: "Egg, caterpillar, chrysalis, then butterfly. Beautiful work!" },
      { t: "order", q: "Put the frog life cycle in order.", items: ["egg", "tadpole", "tadpole with legs", "adult frog"], why: "A frog starts as an egg, then a tadpole, then grows legs, then becomes a frog." },
      { t: "order", q: "Put the plant life cycle in order.", items: ["seed", "sprout", "adult plant", "flower", "fruit with new seeds"], why: "A seed sprouts, grows, makes flowers, and then fruit with new seeds." },
      { t: "order", q: "Put the chicken life cycle in order.", items: ["egg", "chick", "young chicken", "adult hen"], why: "Egg, chick, young chicken, then hen. Then the hen can lay new eggs!" },
      { t: "mc", q: "What is a caterpillar?", opts: ["A baby frog", "The larva stage of a butterfly", "A kind of seed", "An adult bird"], a: 1, why: "A caterpillar is the larva stage. It eats and grows before it makes a chrysalis." },
      { t: "mc", q: "Where does a tadpole live?", opts: ["In a tree", "In a nest", "In the desert", "In the water"], a: 3, why: "Tadpoles live in water and breathe with gills." },
      { t: "tf", q: "All living things are born, grow, have young, and die.", a: true, why: "Yes! Every plant and animal has a life cycle." },
      { t: "mc", q: "Which stage comes right after the chrysalis?", opts: ["Egg", "Caterpillar", "Adult butterfly", "Tadpole"], a: 2, why: "The adult butterfly comes out of the chrysalis." },
      { t: "mc", q: "How are the frog and butterfly life cycles the same?", opts: ["Both start as an egg.", "Both start as a seed.", "Both have a chrysalis.", "Both have gills as adults."], a: 0, why: "Frogs and butterflies both start their lives as eggs." }
    ]
  });

  /* ================= 3-LS3-1/2 Traits ================= */
  K3.add({
    id: "s-traits-inherited",
    subject: "science",
    unit: "Living Things",
    title: "Traits: From Parents or Environment?",
    standard: "3-LS3-1/2",
    skill: "Tell traits from parents apart from traits changed by the environment",
    emoji: "🧬",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>A <b>trait</b> is a feature of a living thing, like eye color or fur color.</p><p><b>Inherited traits</b> come from parents. Young look <b>like</b> their parents, but not exactly the same.</p>", pic: big("🐄🐄 ➡️ 🐮"), say: "A trait is a feature of a living thing, like eye color or fur color. Inherited traits come from parents. Young look like their parents, but not exactly the same." },
      { html: "<p>The <b>environment</b> can change traits too. A plant with little water or sun may grow small and weak.</p><p>A flamingo turns pink from the food it eats!</p>", pic: big("🌱☀️💧 vs 🥀"), say: "The environment can change traits too. A plant with little water or sun may grow small and weak. A flamingo turns pink from the food it eats!" },
      { html: "<p>Things you <b>learn</b>, like riding a bike, reading, or speaking Spanish, are <b>not</b> inherited. You learn them!</p>", pic: big("🚲 📚 🗣️"), say: "Things you learn, like riding a bike, reading, or speaking Spanish, are not inherited. You learn them!" }
    ],
    passage: {
      title: "Two Puppies",
      pic: big("🐶 🐶"),
      text: [
        "The Morales family has two puppies, Coco and Luna. Both puppies have brown fur and floppy ears, just like their mom.",
        "Coco eats too many treats. She is heavier than Luna. Luna learned to sit and shake. Coco has a scar on her nose from a thorn bush.",
        "The puppies got some traits from their parents. Other traits came from what happened to them."
      ],
      lexile: "about 450L"
    },
    qs: [
      { t: "sort", q: "Sort each trait. Did it come from parents or from the environment?", bins: ["Inherited from parents", "From the environment"], items: [["brown fur", 0], ["floppy ears", 0], ["heavy from eating many treats", 1], ["a scar on the nose", 1], ["learning to sit", 1], ["eye color", 0]], why: "Fur color, ear shape, and eye color come from parents. Weight, scars, and tricks come from what happens in life." },
      { t: "mc", q: "Baby cows look like their parents. Why?", opts: ["They eat grass.", "They live on a dairy.", "They inherit traits from their parents.", "They drink water."], a: 2, why: "Young animals inherit traits from their parents, so they look alike." },
      { t: "tf", q: "Speaking Spanish is a trait you inherit from your parents.", a: false, why: "Language is learned! You learn to speak by listening and practicing." },
      { t: "mc", q: "Two bean plants come from the same seeds. One gets sun. One sits in a dark closet. What will happen?", opts: ["The closet plant grows weak and pale.", "Both grow the same.", "The closet plant grows flowers first.", "The sunny plant dies."], a: 0, why: "Plants need light. The environment changed how the closet plant grew." },
      { t: "mc", q: "Why are flamingos pink?", opts: ["They paint their feathers.", "Their parents are blue.", "They sit in the sun.", "The food they eat makes them pink."], a: 3, why: "Flamingos eat tiny shrimp and algae with pink color. Their food turns them pink!" },
      { t: "mc", q: "Read the story. Which trait did Luna LEARN?", opts: ["Brown fur", "To sit and shake", "Floppy ears", "Being a dog"], a: 1, why: "Luna learned to sit and shake. Tricks are learned, not inherited." },
      { t: "tf", q: "Puppies from the same parents can look a little different from each other.", a: true, why: "Yes! Young look like their parents, but each one is a little different. That is called variation." },
      { t: "tap", q: "Tap the traits that are inherited.", words: ["eye color", "riding a bike", "flower color", "a scar", "leaf shape", "a haircut"], a: [0, 2, 4], why: "Eye color, flower color, and leaf shape come from parents." },
      { t: "mc", q: "Which trait can the environment change?", opts: ["Number of legs on a dog", "How tall a corn plant grows", "The kind of animal it is", "Eye color"], a: 1, why: "Water, sun, and soil can change how tall a plant grows." }
    ]
  });

  /* ================= 3-LS4 Fossils, habitats, adaptations ================= */
  K3.add({
    id: "s-fossils-adaptations",
    subject: "science",
    unit: "Living Things",
    title: "Fossils, Habitats, and Survival",
    standard: "3-LS4",
    skill: "Tell how fossils and adaptations help us learn about survival",
    emoji: "🦴",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>A <b>fossil</b> is what is left of a plant or animal from long, long ago. It can be a bone, a shell, or a footprint in rock.</p><p>Fossils tell us what living things and places were like.</p>", pic: fossilPic, say: "A fossil is what is left of a plant or animal from long, long ago. It can be a bone, a shell, or a footprint in rock. Fossils tell us what living things and places were like." },
      { html: "<p>Long ago, an ocean covered part of the Central Valley. People find fossil <b>shark teeth</b> near Bakersfield! A fish fossil on dry land tells us water was there once.</p>", pic: big("🦈 🦷 🪨"), say: "Long ago, an ocean covered part of the Central Valley. People find fossil shark teeth near Bakersfield! A fish fossil on dry land tells us water was there once." },
      { html: "<p>A <b>habitat</b> is the place where a living thing lives. An <b>adaptation</b> is a body part or behavior that helps it survive there.</p><p>A camel stores fat in its hump. A polar bear has thick fur.</p>", pic: big("🐪🏜️ &nbsp; 🐻‍❄️🧊"), say: "A habitat is the place where a living thing lives. An adaptation is a body part or behavior that helps it survive there. A camel stores fat in its hump. A polar bear has thick fur." },
      { html: "<p>When a habitat <b>changes</b>, some living things move away, some find new ways to live, and some cannot survive.</p>", pic: big("🌳🌳 ➡️ 🏗️"), say: "When a habitat changes, some living things move away, some find new ways to live, and some cannot survive." }
    ],
    qs: [
      { t: "sort", q: "Which habitat could each animal survive in best? Sort them.", bins: ["Desert", "Ocean", "Arctic (ice and snow)"], items: [["camel", 0], ["shark", 1], ["polar bear", 2], ["lizard", 0], ["whale", 1], ["arctic fox", 2]], why: "Camels and lizards fit the hot desert. Sharks and whales need the ocean. Polar bears and arctic foxes have thick fur for the cold." },
      { t: "mc", q: "What is a fossil?", pic: fossilPic, opts: ["A new rock", "A kind of magnet", "A baby animal", "What is left of a living thing from long ago"], a: 3, why: "A fossil is what is left of a plant or animal from long ago, like a bone or footprint." },
      { t: "mc", q: "Scientists find a fish fossil in a dry desert. What does this tell them?", opts: ["Fish live in sand.", "Water once covered that place.", "It rained fish.", "Deserts are cold."], a: 1, why: "Fish live in water. So long ago, that place was covered with water." },
      { t: "mc", q: "How does a duck's webbed feet help it survive?", opts: ["They help it swim.", "They help it dig.", "They keep it warm.", "They help it climb trees."], a: 0, why: "Webbed feet push water like paddles. That helps a duck swim." },
      { t: "mc", q: "A cactus has thick stems that store water. This helps it live in the...", opts: ["ocean", "rainforest", "desert", "arctic"], a: 2, why: "Deserts get very little rain. Storing water helps a cactus survive." },
      { t: "tf", q: "A polar bear could survive well in a hot desert.", a: false, why: "A polar bear's thick fur and fat are made for the cold. It would get too hot in the desert." },
      { t: "mc", q: "Some beetles are green and some are brown. They live on green leaves. Which beetles are harder for birds to find?", opts: ["The brown beetles", "The green beetles", "All are easy to find", "None live there"], a: 1, why: "Green beetles blend in on green leaves. Birds have a hard time seeing them." },
      { t: "mc", q: "A pond dries up. What might happen to the frogs?", opts: ["They turn into fish.", "They grow fur.", "They become plants.", "They move to a new pond or may not survive."], a: 3, why: "When a habitat changes, some animals move away and some cannot survive." },
      { t: "tap", q: "Tap the things that can become fossils.", words: ["bones", "shells", "sunlight", "footprints", "wind", "leaves"], a: [0, 1, 3, 5], why: "Bones, shells, footprints, and leaves can leave fossils in rock. Sunlight and wind cannot." }
    ]
  });

  /* ================= 3-ESS2 / 3-ESS3-1 Weather ================= */
  K3.add({
    id: "s-weather-climate",
    subject: "science",
    unit: "Weather and Climate",
    title: "Weather, Climate, and Staying Safe",
    standard: "3-ESS2-1/2, 3-ESS3-1",
    skill: "Read weather graphs, compare climates, and plan for weather hazards",
    emoji: "🌦️",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p><b>Weather</b> is what the air is like today: hot, cold, rainy, windy, or foggy.</p><p><b>Climate</b> is the usual weather in a place over many years.</p>", pic: big("☀️ 🌧️ 🌫️ 💨"), say: "Weather is what the air is like today: hot, cold, rainy, windy, or foggy. Climate is the usual weather in a place over many years." },
      { html: "<p>Tulare's climate: <b>hot, dry summers</b> and <b>cool, foggy winters</b>. Most rain falls in winter.</p><p>This graph uses <b>sample data</b>. That means the numbers are made up to be like real Tulare weather.</p>", pic: tempGraph, say: "Tulare's climate: hot, dry summers and cool, foggy winters. Most rain falls in winter. This graph uses sample data. That means the numbers are made up to be like real Tulare weather." },
      { html: "<p>Other places have other climates. The <b>Sierra Nevada</b> mountains get snowy winters. A <b>desert</b> is hot and very dry. The <b>Arctic</b> is cold all year.</p>", pic: big("🏔️❄️ &nbsp; 🏜️☀️ &nbsp; 🧊🐧"), say: "Other places have other climates. The Sierra Nevada mountains get snowy winters. A desert is hot and very dry. The Arctic is cold all year." },
      { html: "<p>We can make weather <b>hazards</b> less harmful.</p><p><b>Tule fog</b>: drive slowly with low headlights. <b>Heat</b>: drink water and stay in the shade. <b>Floods</b>: build levees and never walk or drive in flood water.</p>", pic: big("🌫️🚗💡 &nbsp; 🥵💧 &nbsp; 🌊🧱"), say: "We can make weather hazards less harmful. Tule fog: drive slowly with low headlights. Heat: drink water and stay in the shade. Floods: build levees and never walk or drive in flood water." }
    ],
    qs: [
      { t: "mc", q: "Look at the graph of sample data. Which month is the hottest?", pic: tempGraph, opts: ["January", "April", "July", "October"], a: 2, why: "July has the tallest bar. Summer is the hottest time in Tulare." },
      { t: "num", q: "Look at the graph of sample data. How many degrees warmer is July than January?", pic: tempGraph, a: 40, unit: "degrees", why: "July is 95 and January is 55. 95 minus 55 is 40 degrees." },
      { t: "mc", q: "Look at the graph of sample data. Which month has the most rainy days?", pic: rainGraph, opts: ["January", "May", "July", "September"], a: 0, why: "January has the tallest bar, with 7 rainy days. Tulare gets most rain in winter." },
      { t: "num", q: "Look at the graph of sample data. How many rainy days are in July?", pic: rainGraph, a: 0, unit: "days", why: "July has no bar, so it has 0 rainy days. Tulare summers are dry." },
      { t: "mc", q: "Which sentence tells about CLIMATE, not weather?", opts: ["It is raining right now.", "Today is windy.", "It is foggy this morning.", "Tulare usually has hot, dry summers."], a: 3, why: "Climate is the usual weather over many years. \"Usually\" is a clue!" },
      { t: "sort", q: "Sort each place by its climate.", bins: ["Hot and dry", "Cold and snowy"], items: [["a desert", 0], ["the Arctic", 1], ["Sierra Nevada peaks in winter", 1], ["Death Valley", 0]], why: "Deserts like Death Valley are hot and dry. The Arctic and the snowy Sierra Nevada are cold." },
      { t: "mc", q: "There is thick tule fog on the way to school. What should drivers do?", opts: ["Drive faster", "Drive slowly and use low headlights", "Turn off the headlights", "Honk the whole time"], a: 1, why: "In fog it is hard to see. Driving slowly with low headlights keeps everyone safe." },
      { t: "mc", q: "It is 105°F at recess. How can you stay safe from the heat?", opts: ["Run hard in the sun", "Wear a heavy coat", "Drink water and rest in the shade", "Skip drinking water"], a: 2, why: "Water and shade help your body stay cool on very hot days." },
      { t: "tf", q: "Levees and sandbags can help keep flood water away from homes.", a: true, why: "Yes! Levees and sandbags are walls that help hold back flood water." },
      { t: "mc", q: "Mariana sees water flooding the road. What should she do?", opts: ["Turn around and stay out of the water", "Walk through it", "Ride her bike through it", "Splash in it"], a: 0, why: "Flood water can be deep and fast. Always stay out and find another way." }
    ]
  });
})();
