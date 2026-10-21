/* k3-history.js : Grade 3 California History-Social Science, "Continuity and Change" (local history: Tulare and Tulare County)
   Loaded after k3-engine.js. Each K3.add() call is one activity. */
(function () {
  var S = 'style="width:100%;max-width:360px;height:auto;display:block;margin:0 auto" role="img"';
  var big = function (txt) { return '<div style="font-size:52px;line-height:1.2;text-align:center">' + txt + '</div>'; };

  /* ---------- Pictures ---------- */
  var compass =
    '<g transform="translate(300,48)">' +
    '<circle r="30" fill="#fff" stroke="#5b2a86" stroke-width="2"/>' +
    '<polygon points="0,-26 6,0 0,26 -6,0" fill="#5b2a86"/>' +
    '<polygon points="-26,0 0,-6 26,0 0,6" fill="#8a4fd8"/>' +
    '<text y="-34" text-anchor="middle" font-size="14" font-weight="bold" fill="#121015">N</text>' +
    '<text y="46" text-anchor="middle" font-size="14" font-weight="bold" fill="#121015">S</text>' +
    '<text x="40" y="5" text-anchor="middle" font-size="14" font-weight="bold" fill="#121015">E</text>' +
    '<text x="-40" y="5" text-anchor="middle" font-size="14" font-weight="bold" fill="#121015">W</text>' +
    '</g>';

  var townMap =
    '<svg viewBox="0 0 360 300" ' + S + ' aria-label="Map of the town of Valle Verde with a compass rose and a key">' +
    '<rect x="0" y="0" width="360" height="300" fill="#f7f3ec"/>' +
    '<text x="130" y="22" text-anchor="middle" font-size="15" font-weight="bold" fill="#5b2a86">Town of Valle Verde</text>' +
    /* river on the west side */
    '<path d="M30,30 C50,80 15,120 35,170 C50,210 20,240 35,290" fill="none" stroke="#3b82f6" stroke-width="10"/>' +
    /* roads */
    '<line x1="70" y1="130" x2="260" y2="130" stroke="#9ca3af" stroke-width="8"/>' +
    '<line x1="150" y1="40" x2="150" y2="230" stroke="#9ca3af" stroke-width="8"/>' +
    /* park north of school */
    '<circle cx="150" cy="60" r="16" fill="#22c55e"/>' +
    /* school in center */
    '<rect x="132" y="112" width="36" height="36" fill="#5b2a86"/>' +
    /* library east of school */
    '<polygon points="240,112 258,130 240,148 222,130" fill="#ffc53d" stroke="#121015"/>' +
    /* farm south of school */
    '<rect x="128" y="196" width="44" height="30" fill="#b45309"/>' +
    '<line x1="128" y1="206" x2="172" y2="206" stroke="#fde68a" stroke-width="2"/>' +
    '<line x1="128" y1="216" x2="172" y2="216" stroke="#fde68a" stroke-width="2"/>' +
    compass +
    /* key */
    '<g transform="translate(220,170)">' +
    '<rect x="0" y="0" width="134" height="124" fill="#fff" stroke="#121015"/>' +
    '<text x="67" y="16" text-anchor="middle" font-size="13" font-weight="bold">KEY</text>' +
    '<rect x="8" y="26" width="14" height="14" fill="#5b2a86"/><text x="30" y="38" font-size="12">School</text>' +
    '<circle cx="15" cy="54" r="7" fill="#22c55e"/><text x="30" y="58" font-size="12">Park</text>' +
    '<polygon points="15,66 23,74 15,82 7,74" fill="#ffc53d" stroke="#121015"/><text x="30" y="78" font-size="12">Library</text>' +
    '<rect x="8" y="88" width="14" height="10" fill="#b45309"/><text x="30" y="97" font-size="12">Farm</text>' +
    '<line x1="6" y1="112" x2="24" y2="112" stroke="#3b82f6" stroke-width="5"/><text x="30" y="116" font-size="12">River</text>' +
    '</g></svg>';

  var landforms =
    '<svg viewBox="0 0 360 200" ' + S + ' aria-label="Picture of the Coast Ranges, the San Joaquin Valley, and the Sierra Nevada">' +
    '<rect width="360" height="200" fill="#dbeafe"/>' +
    '<polygon points="0,150 30,105 60,130 90,110 120,150" fill="#a3a36a"/>' +
    '<rect x="0" y="150" width="360" height="50" fill="#86c46b"/>' +
    '<polygon points="230,150 270,60 290,85 320,30 360,80 360,150" fill="#8b8b8b"/>' +
    '<polygon points="320,30 307,54 333,54" fill="#fff"/>' +
    '<path d="M300,120 C270,150 230,160 180,165 C150,168 135,170 120,172" stroke="#3b82f6" stroke-width="5" fill="none"/>' +
    '<ellipse cx="105" cy="175" rx="22" ry="7" fill="#3b82f6"/>' +
    '<text x="55" y="98" text-anchor="middle" font-size="12" font-weight="bold">Coast Ranges</text>' +
    '<text x="205" y="192" text-anchor="middle" font-size="12" font-weight="bold">San Joaquin Valley</text>' +
    '<text x="295" y="22" text-anchor="middle" font-size="12" font-weight="bold">Sierra Nevada</text>' +
    '<text x="95" y="163" text-anchor="middle" font-size="11" font-weight="bold">Tulare Lake</text>' +
    '<text x="240" y="140" font-size="11" fill="#1e40af">river</text>' +
    '<text x="12" y="20" font-size="12" font-weight="bold">WEST</text><text x="300" y="196" font-size="12" font-weight="bold">EAST</text>' +
    '</svg>';

  var tuleHouse =
    '<svg viewBox="0 0 360 170" ' + S + ' aria-label="A tule reed house and a tule reed boat by the water">' +
    '<rect width="360" height="170" fill="#e0f2fe"/>' +
    '<rect y="110" width="360" height="60" fill="#60a5fa"/>' +
    '<rect y="100" width="180" height="20" fill="#a3c77a"/>' +
    '<path d="M30,110 Q90,10 150,110 Z" fill="#c8a75a" stroke="#7a5c1e" stroke-width="2"/>' +
    '<path d="M50,110 Q90,40 130,110" fill="none" stroke="#7a5c1e"/><path d="M70,110 Q90,60 110,110" fill="none" stroke="#7a5c1e"/>' +
    '<rect x="80" y="88" width="20" height="22" fill="#5b3b0e"/>' +
    '<path d="M210,130 Q270,150 330,130 L320,140 Q270,155 220,140 Z" fill="#c8a75a" stroke="#7a5c1e" stroke-width="2"/>' +
    '<line x1="230" y1="133" x2="230" y2="142" stroke="#7a5c1e"/><line x1="270" y1="138" x2="270" y2="148" stroke="#7a5c1e"/><line x1="310" y1="133" x2="310" y2="142" stroke="#7a5c1e"/>' +
    '<text x="90" y="160" text-anchor="middle" font-size="13" font-weight="bold">tule house</text>' +
    '<text x="270" y="166" text-anchor="middle" font-size="13" font-weight="bold">tule boat</text>' +
    '</svg>';

  var oakAcorn =
    '<svg viewBox="0 0 360 150" ' + S + ' aria-label="Steps to make acorn flour: gather, grind, wash, cook">' +
    '<g font-size="13" text-anchor="middle" font-weight="bold">' +
    '<circle cx="45" cy="60" r="34" fill="#efe6fb"/><ellipse cx="45" cy="66" rx="12" ry="15" fill="#a16207"/><path d="M31,58 Q45,40 59,58 Z" fill="#713f12"/><text x="45" y="120">1 Gather</text>' +
    '<circle cx="135" cy="60" r="34" fill="#efe6fb"/><ellipse cx="135" cy="72" rx="24" ry="10" fill="#9ca3af"/><rect x="128" y="38" width="14" height="30" rx="6" fill="#6b7280"/><text x="135" y="120">2 Grind</text>' +
    '<circle cx="225" cy="60" r="34" fill="#efe6fb"/><path d="M225,32 Q240,55 225,70 Q210,55 225,32" fill="#3b82f6"/><ellipse cx="225" cy="80" rx="20" ry="6" fill="#d6b98c"/><text x="225" y="120">3 Wash</text>' +
    '<circle cx="315" cy="60" r="34" fill="#efe6fb"/><path d="M292,60 L338,60 Q335,86 315,86 Q295,86 292,60 Z" fill="#7a5c1e"/><path d="M305,50 Q300,40 307,32 M318,50 Q313,40 320,32" stroke="#9ca3af" stroke-width="3" fill="none"/><text x="315" y="120">4 Cook</text>' +
    '</g></svg>';

  var timeline =
    '<svg viewBox="0 0 360 110" ' + S + ' aria-label="Timeline: long ago Yokuts villages, 1872 Tulare founded, 1900s canals and dairies, today World Ag Expo">' +
    '<line x1="20" y1="40" x2="340" y2="40" stroke="#5b2a86" stroke-width="6"/>' +
    '<polygon points="340,30 356,40 340,50" fill="#5b2a86"/>' +
    '<g font-size="11" text-anchor="middle"><circle cx="40" cy="40" r="9" fill="#ffc53d" stroke="#121015"/><text x="40" y="70" font-weight="bold">Long ago</text><text x="40" y="85">Yokuts</text><text x="40" y="98">villages</text>' +
    '<circle cx="130" cy="40" r="9" fill="#ffc53d" stroke="#121015"/><text x="130" y="70" font-weight="bold">1872</text><text x="130" y="85">Railroad</text><text x="130" y="98">starts Tulare</text>' +
    '<circle cx="220" cy="40" r="9" fill="#ffc53d" stroke="#121015"/><text x="220" y="70" font-weight="bold">1900s</text><text x="220" y="85">canals, farms,</text><text x="220" y="98">dairies grow</text>' +
    '<circle cx="310" cy="40" r="9" fill="#ffc53d" stroke="#121015"/><text x="310" y="70" font-weight="bold">Today</text><text x="310" y="85">World</text><text x="310" y="98">Ag Expo</text></g>' +
    '</svg>';

  var flag =
    '<svg viewBox="0 0 190 100" ' + S + ' aria-label="The United States flag">' +
    (function () { var s = ''; for (var i = 0; i < 13; i++) s += '<rect x="0" y="' + (i * 100 / 13).toFixed(2) + '" width="190" height="' + (100 / 13).toFixed(2) + '" fill="' + (i % 2 ? '#fff' : '#b22234') + '"/>'; return s; })() +
    '<rect x="0" y="0" width="76" height="53.85" fill="#3c3b6e"/>' +
    (function () { var s = ''; for (var r = 0; r < 9; r++) { var n = r % 2 ? 5 : 6; for (var c = 0; c < n; c++) { var x = (r % 2 ? 12.6 : 6.3) + c * 12.6, y = 5 + r * 5.4; s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="1.6" fill="#fff"/>'; } } return s; })() +
    '</svg>';

  var branches =
    '<svg viewBox="0 0 360 150" ' + S + ' aria-label="Three branches of government: Congress makes laws, the President carries out laws, courts decide what laws mean">' +
    '<polygon points="180,8 340,48 20,48" fill="#5b2a86"/>' +
    '<g fill="#efe6fb" stroke="#5b2a86" stroke-width="2"><rect x="35" y="52" width="80" height="60"/><rect x="140" y="52" width="80" height="60"/><rect x="245" y="52" width="80" height="60"/></g>' +
    '<rect x="20" y="112" width="320" height="12" fill="#5b2a86"/>' +
    '<g font-size="12" text-anchor="middle" font-weight="bold"><text x="75" y="76">Congress</text><text x="180" y="76">President</text><text x="285" y="76">Courts</text></g>' +
    '<g font-size="11" text-anchor="middle"><text x="75" y="96">makes laws</text><text x="180" y="92">carries out</text><text x="180" y="105">laws</text><text x="285" y="92">decides what</text><text x="285" y="105">laws mean</text></g>' +
    '<text x="180" y="144" text-anchor="middle" font-size="12" font-weight="bold">Three Branches of Government</text>' +
    '</svg>';

  var scarcity =
    '<svg viewBox="0 0 360 120" ' + S + ' aria-label="Six children and only two soccer balls">' +
    '<g font-size="34">' +
    '<text x="10" y="50">🧒</text><text x="60" y="50">👧</text><text x="110" y="50">🧒</text><text x="160" y="50">👧</text><text x="210" y="50">🧒</text><text x="260" y="50">👧</text>' +
    '<text x="120" y="105">⚽</text><text x="190" y="105">⚽</text></g></svg>';

  /* ================= 3.1 Geography ================= */
  K3.add({
    id: "h-geo-local-region",
    subject: "history",
    unit: "Our Land and Maps",
    title: "Maps of Our Valley",
    standard: "HSS 3.1",
    skill: "Read a map and name the land and water near Tulare",
    emoji: "🗺️",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>A <b>map</b> is a picture of a place from above.</p><p>A <b>compass rose</b> shows the directions: <b>N</b>orth, <b>S</b>outh, <b>E</b>ast, <b>W</b>est.</p>", pic: townMap, say: "A map is a picture of a place from above. A compass rose shows the directions: north, south, east, and west." },
      { html: "<p>A <b>map key</b> tells what the symbols mean.</p><p>On this map, a purple square means <b>school</b>.</p>", pic: townMap, say: "A map key tells what the symbols mean. On this map, a purple square means school." },
      { html: "<p><b>Land forms</b>: mountains, hills, valleys.</p><p><b>Water forms</b>: rivers, lakes, oceans.</p><p>Tulare is in the <b>San Joaquin Valley</b>. The <b>Sierra Nevada</b> mountains are to the east.</p>", pic: landforms, say: "Land forms are mountains, hills, and valleys. Water forms are rivers, lakes, and oceans. Tulare is in the San Joaquin Valley. The Sierra Nevada mountains are to the east." },
      { html: "<p>Snow melts in the Sierra Nevada. The water runs down the <b>Kaweah River</b> and the <b>Tule River</b> into the valley.</p><p>Long ago, the rivers filled big <b>Tulare Lake</b>.</p><p><b>Sequoia National Park</b> has giant sequoia trees, some of the biggest trees on Earth.</p>", pic: big("🏔️ ➡️ 🏞️ ➡️ 🌾"), say: "Snow melts in the Sierra Nevada. The water runs down the Kaweah River and the Tule River into the valley. Long ago, the rivers filled big Tulare Lake. Sequoia National Park has giant sequoia trees, some of the biggest trees on Earth." }
    ],
    passage: {
      title: "Where We Live",
      pic: landforms,
      text: [
        "We live in Tulare County. Our town is in the San Joaquin Valley. A valley is low land between mountains. Our valley is flat and good for farms.",
        "To the east are the tall Sierra Nevada mountains. In winter, snow falls on the mountains. In spring, the snow melts. The water flows down the Kaweah River and the Tule River.",
        "Sequoia National Park is in the mountains. Families visit to see the giant sequoia trees."
      ],
      lexile: "about 450L"
    },
    qs: [
      { t: "mc", q: "Look at the map. What is north of the school?", pic: townMap, opts: ["The farm", "The park", "The library", "The river"], a: 1, why: "North is up on this map. The green park is right above the school. Nice map reading!" },
      { t: "mc", q: "Look at the map. Which way do you go from the school to the library?", pic: townMap, opts: ["North", "South", "East", "West"], a: 2, why: "The library is to the right of the school. On this map, right is east." },
      { t: "mc", q: "Look at the key. What does the blue line mean?", pic: townMap, opts: ["River", "Road", "Park", "Farm"], a: 0, why: "The key shows a blue line next to the word River. The key tells what symbols mean." },
      { t: "tf", q: "Look at the map. The farm is south of the school.", pic: townMap, a: true, why: "South is down on the map. The brown farm is below the school. You got it!" },
      { t: "mc", q: "Look at the map. On which side of town is the river?", pic: townMap, opts: ["North", "East", "West", "South"], a: 2, why: "The river is on the left side of the map. Left is west on this compass rose." },
      { t: "mc", q: "What tall mountains are east of Tulare?", opts: ["Tulare Lake", "The Tule River", "The Pacific Ocean", "The Sierra Nevada"], a: 3, why: "The Sierra Nevada is a long line of tall mountains east of our valley." },
      { t: "sort", q: "Sort each one. Is it a land form or a water form?", bins: ["Land form", "Water form"], items: [["mountain", 0], ["river", 1], ["valley", 0], ["lake", 1], ["hill", 0], ["ocean", 1]], why: "Mountains, hills, and valleys are land. Rivers, lakes, and oceans are water." },
      { t: "mc", q: "What is Sequoia National Park famous for?", opts: ["Sandy beaches", "Giant sequoia trees", "Big cities", "Hot deserts"], a: 1, why: "Sequoia National Park has giant sequoia trees. Some are among the biggest trees in the world!" },
      { t: "order", q: "Put the steps in order. How does river water get to our farms?", items: ["Snow falls on the Sierra Nevada.", "The snow melts in spring.", "Water flows down the Kaweah River.", "Farmers in the valley use the water."], why: "Snow falls, then it melts, then it flows down the river to the valley farms." },
      { t: "tap", q: "Tap the words that are water forms.", words: ["mountain", "river", "valley", "lake", "hill", "ocean"], a: [1, 3, 5], why: "River, lake, and ocean are water forms. Great job!" }
    ]
  });

  /* ================= 3.2 American Indian nations ================= */
  K3.add({
    id: "h-yokuts-local-nations",
    subject: "history",
    unit: "First People of Our Valley",
    title: "The Yokuts People",
    standard: "HSS 3.2",
    skill: "Tell how the Yokuts people used the land and water near Tulare",
    emoji: "🌾",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>The <b>Yokuts</b> people have lived in the San Joaquin Valley for thousands of years.</p><p>Many Yokuts villages were near <b>Tulare Lake</b> and the rivers.</p>", pic: landforms, say: "The Yokuts people have lived in the San Joaquin Valley for thousands of years. Many Yokuts villages were near Tulare Lake and the rivers." },
      { html: "<p><b>Tule</b> (TOO-lee) is a tall reed that grows by water.</p><p>Long ago, Yokuts families made <b>houses</b>, <b>mats</b>, and <b>boats</b> from tule.</p>", pic: tuleHouse, say: "Tule is a tall reed that grows by water. Long ago, Yokuts families made houses, mats, and boats from tule." },
      { html: "<p><b>Acorns</b> from oak trees were an important food.</p><p>People ground acorns into flour. They washed the flour with water to take out the bitter taste. Then they cooked it.</p>", pic: oakAcorn, say: "Acorns from oak trees were an important food. People ground acorns into flour. They washed the flour with water to take out the bitter taste. Then they cooked it." },
      { html: "<p>Yokuts communities are still here <b>today</b>.</p><p>The <b>Tachi Yokut Tribe</b> lives on the <b>Santa Rosa Rancheria</b> near Lemoore. Families keep their language, songs, and traditions strong.</p>", pic: big("👪 🏡 🎶"), say: "Yokuts communities are still here today. The Tachi Yokut Tribe lives on the Santa Rosa Rancheria near Lemoore. Families keep their language, songs, and traditions strong." }
    ],
    passage: {
      title: "People of the Tule",
      pic: tuleHouse,
      text: [
        "The Yokuts people have lived in the San Joaquin Valley for a very long time. Long ago, Tulare Lake was huge. Tule reeds grew all around it.",
        "Yokuts families used what was near them. They tied tule reeds together to make boats. They covered their houses with tule mats. They caught fish and ducks at the lake. They gathered acorns from oak trees.",
        "People knew the land well. They knew which plants were ready in each season. They traded with neighbors for things they needed.",
        "Today, Yokuts people live in many places in California. The Tachi Yokut Tribe lives on the Santa Rosa Rancheria near Lemoore. Families teach children their language and traditions."
      ],
      lexile: "about 500L"
    },
    qs: [
      { t: "mc", q: "What did Yokuts families use tule reeds to make long ago?", opts: ["Metal pots", "Boats and houses", "Glass windows", "Paper books"], a: 1, why: "Tule reeds grew by the lake. People tied them together to make boats and house coverings." },
      { t: "mc", q: "Where did tule reeds grow?", opts: ["Near water", "On snowy mountain tops", "In the desert", "Inside caves"], a: 0, why: "Tule reeds grow in wet places, like near lakes and rivers." },
      { t: "order", q: "Put the steps in order to make acorn food.", pic: oakAcorn, items: ["Gather acorns from oak trees.", "Grind the acorns into flour.", "Wash the flour to take out the bitter taste.", "Cook the acorn flour."], why: "First gather, then grind, then wash, then cook. You followed the steps!" },
      { t: "mc", q: "What food came from Tulare Lake?", opts: ["Apples", "Oranges", "Fish and ducks", "Corn"], a: 2, why: "Tulare Lake had lots of fish and birds. People caught them for food." },
      { t: "tf", q: "Yokuts people only lived long ago. There are no Yokuts communities today.", a: false, why: "Yokuts communities live in California today, like the Tachi Yokut Tribe near Lemoore." },
      { t: "mc", q: "Where does the Tachi Yokut Tribe live today?", opts: ["In New York", "On a ship", "In Mexico City", "On the Santa Rosa Rancheria near Lemoore"], a: 3, why: "The Tachi Yokut Tribe lives on the Santa Rosa Rancheria near Lemoore, in our valley." },
      { t: "sort", q: "Where did each thing come from? Sort it.", bins: ["From the lake or river", "From the land"], items: [["fish", 0], ["acorns", 1], ["tule reeds", 0], ["ducks", 0], ["seeds", 1], ["oak wood", 1]], why: "Fish, ducks, and tule came from the water. Acorns, seeds, and wood came from the land." },
      { t: "mc", q: "How did the Yokuts people adapt, or fit, to where they lived?", opts: ["They used plants and animals near them.", "They bought food at a store.", "They drove cars to the lake.", "They used electric lights."], a: 0, why: "Yokuts people used what was near them, like tule, acorns, and fish. That is how they adapted." },
      { t: "build", q: "Build the sentence.", words: ["Yokuts", "families", "keep", "their", "traditions", "today."], why: "Yokuts families keep their traditions today. Great sentence!" },
      { t: "mc", q: "Why did people wash acorn flour with water?", opts: ["To make it blue", "To take out the bitter taste", "To make it hot", "To make it hard"], a: 1, why: "Raw acorns taste bitter. Washing the flour made it good to eat." }
    ]
  });

  /* ================= 3.3 Community change ================= */
  K3.add({
    id: "h-tulare-then-now",
    subject: "history",
    unit: "Tulare Then and Now",
    title: "How Tulare Changed",
    standard: "HSS 3.3",
    skill: "Tell how Tulare changed over time",
    emoji: "🚂",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>In <b>1872</b>, the <b>Southern Pacific Railroad</b> built tracks through the valley. The railroad started the town of <b>Tulare</b>.</p><p>Trains carried people and crops to faraway places.</p>", pic: big("🚂 🛤️ 🏘️"), say: "In 1872, the Southern Pacific Railroad built tracks through the valley. The railroad started the town of Tulare. Trains carried people and crops to faraway places." },
      { html: "<p>Our valley gets little rain in summer. Farmers dug <b>canals</b> and ditches to bring river water to crops. This is called <b>irrigation</b>.</p>", pic: big("🏞️ ➡️ 💧 ➡️ 🌱"), say: "Our valley gets little rain in summer. Farmers dug canals and ditches to bring river water to crops. This is called irrigation." },
      { html: "<p>Today, Tulare County is <b>one of the top</b> dairy counties in the United States. Cows here give lots of milk.</p><p>Each year, Tulare holds the <b>World Ag Expo</b>, a giant farm show. People come from all over the world.</p>", pic: big("🐄 🥛 🚜"), say: "Today, Tulare County is one of the top dairy counties in the United States. Cows here give lots of milk. Each year, Tulare holds the World Ag Expo, a giant farm show. People come from all over the world." },
      { html: "<p>A <b>timeline</b> shows events in order, from long ago to today.</p>", pic: timeline, say: "A timeline shows events in order, from long ago to today." }
    ],
    passage: {
      title: "Abuela's Tulare",
      pic: timeline,
      text: [
        "Lucía asked her abuela, \"What was Tulare like long ago?\"",
        "Abuela smiled. \"The town began in 1872, when the railroad came. Trains took crops to big cities. Later, farmers dug canals to water their fields.\"",
        "\"When I was a girl, many families milked cows. Now the dairies are bigger. Machines help milk the cows.\"",
        "\"Some things stay the same,\" Abuela said. \"Tulare is still a farm town. Every year, we go to the World Ag Expo to see the new tractors.\""
      ],
      lexile: "about 480L"
    },
    qs: [
      { t: "mc", q: "What started the town of Tulare in 1872?", opts: ["An airport", "A movie theater", "The Southern Pacific Railroad", "A shopping mall"], a: 2, why: "The Southern Pacific Railroad started Tulare in 1872. Trains helped the town grow." },
      { t: "num", q: "Tulare started in 1872. How many years old was Tulare in 2022?", a: 150, unit: "years", why: "2022 minus 1872 is 150. Tulare turned 150 years old in 2022!" },
      { t: "order", q: "Put these events in order, from long ago to today.", pic: timeline, items: ["Yokuts villages are near Tulare Lake.", "The railroad starts Tulare in 1872.", "Farmers dig canals for irrigation.", "Tulare holds the World Ag Expo each year."], why: "Yokuts villages came first. Then the railroad, then canals, then the Expo today." },
      { t: "mc", q: "What is irrigation?", opts: ["Bringing water to crops", "Riding a train", "Building a house", "Selling milk"], a: 0, why: "Irrigation means bringing water to crops with canals, ditches, or pipes." },
      { t: "sort", q: "Sort each one. Long ago or today?", bins: ["Long ago", "Today"], items: [["horse and wagon", 0], ["tablet computer", 1], ["milking cows by hand", 0], ["milking machines", 1], ["oil lamp", 0], ["cell phone", 1]], why: "Wagons, oil lamps, and hand milking are from long ago. Tablets, cell phones, and milking machines are today." },
      { t: "tf", q: "Tulare County is one of the top dairy and milk counties in the United States.", a: true, why: "Yes! Tulare County has many dairy cows and makes lots of milk." },
      { t: "mc", q: "What happens at the World Ag Expo in Tulare?", opts: ["A big swim race", "A giant farm show", "A space launch", "A snow festival"], a: 1, why: "The World Ag Expo is a giant farm show. People see new tractors and farm tools." },
      { t: "mc", q: "Why were trains important to farmers long ago?", opts: ["Trains made rain.", "Trains planted seeds.", "Trains milked cows.", "Trains carried crops to faraway cities."], a: 3, why: "Trains carried crops to cities far away, so farmers could sell more." },
      { t: "mc", q: "Read the story. What stayed the same in Tulare?", opts: ["Trains are the only way to travel.", "People still milk cows by hand.", "Tulare is still a farm town.", "There are no tractors."], a: 2, why: "Abuela said Tulare is still a farm town. Some things change and some stay the same." }
    ]
  });

  /* ================= 3.4 Citizenship ================= */
  K3.add({
    id: "h-citizenship-government",
    subject: "history",
    unit: "Citizens and Government",
    title: "Rules, Laws, and Good Citizens",
    standard: "HSS 3.4",
    skill: "Explain rules, laws, government, and American symbols",
    emoji: "🇺🇸",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p><b>Rules</b> help us at school and at home. <b>Laws</b> are rules for a whole city, state, or country.</p><p>Rules and laws keep us safe and fair.</p>", pic: big("🚸 🛑 🚲⛑️"), say: "Rules help us at school and at home. Laws are rules for a whole city, state, or country. Rules and laws keep us safe and fair." },
      { html: "<p>Our country's government has <b>three branches</b>.</p><p><b>Congress</b> makes laws. The <b>President</b> carries out laws. The <b>courts</b> decide what laws mean.</p>", pic: branches, say: "Our country's government has three branches. Congress makes laws. The President carries out laws. The courts decide what laws mean." },
      { html: "<p>Tulare has a <b>city council</b>. The council makes rules for our city, like rules for parks and streets.</p><p>The <b>mayor</b> leads the city council meetings.</p>", pic: big("🏛️ 👩🏽‍💼 👨🏻‍💼 👩🏿‍💼"), say: "Tulare has a city council. The council makes rules for our city, like rules for parks and streets. The mayor leads the city council meetings." },
      { html: "<p>American symbols: the <b>flag</b> has 50 stars for 50 states and 13 stripes. The <b>bald eagle</b> is our national bird. The <b>Statue of Liberty</b> stands for freedom. We say the <b>Pledge of Allegiance</b> to show respect for our country.</p>", pic: flag, say: "American symbols: the flag has 50 stars for 50 states and 13 stripes. The bald eagle is our national bird. The Statue of Liberty stands for freedom. We say the Pledge of Allegiance to show respect for our country." }
    ],
    qs: [
      { t: "mc", q: "Why do we have rules and laws?", opts: ["To make people sad", "To keep us safe and fair", "To stop all fun", "To make lines longer"], a: 1, why: "Rules and laws keep people safe and help everyone be treated fairly." },
      { t: "sort", q: "Sort each one. Which branch does it belong to?", pic: branches, bins: ["Makes laws", "Carries out laws", "Decides what laws mean"], items: [["Congress", 0], ["The President", 1], ["The Supreme Court", 2], ["Judges", 2]], why: "Congress makes laws. The President carries them out. Judges and courts decide what laws mean." },
      { t: "mc", q: "Who makes rules for the city of Tulare?", opts: ["The city council", "The President", "A teacher", "A soccer coach"], a: 0, why: "The city council makes rules for our city. The President works for the whole country." },
      { t: "num", q: "How many stars are on the United States flag?", pic: flag, a: 50, unit: "stars", why: "The flag has 50 stars, one for each state." },
      { t: "mc", q: "What is the national bird of the United States?", opts: ["The robin", "The parrot", "The California quail", "The bald eagle"], a: 3, why: "The bald eagle is our national bird. The California quail is our state bird." },
      { t: "tf", q: "The Statue of Liberty is a symbol of freedom.", a: true, why: "Yes! The Statue of Liberty stands in New York Harbor. It welcomes people and stands for freedom." },
      { t: "mc", q: "Which one shows being a good citizen?", opts: ["Leaving trash at the park", "Cutting in the lunch line", "Helping a new student find the library", "Yelling during a test"], a: 2, why: "Helping others is what good citizens do. Kind job!" },
      { t: "tap", q: "Tap the things a good citizen does.", words: ["share", "litter", "help", "vote", "bully", "recycle"], a: [0, 2, 3, 5], why: "Good citizens share, help, vote, and recycle." },
      { t: "mc", q: "What do we say to show respect for our flag and country?", opts: ["The ABC song", "The Pledge of Allegiance", "A lunch menu", "A weather report"], a: 1, why: "We say the Pledge of Allegiance to show respect for our country." },
      { t: "write", q: "How can you be a good citizen at school? Write a sentence.", min: 5, checks: [{ label: "Names a good action", re: /help|share|kind|clean|follow|listen|recycl|respect|include|vote|take turns|pick up/i }], frames: ["I can be a good citizen by...", "At school, I help by..."] }
    ]
  });

  /* ================= 3.4.6 Heroes ================= */
  K3.add({
    id: "h-heroes-leaders",
    subject: "history",
    unit: "Citizens and Government",
    title: "Heroes Who Made a Difference",
    standard: "HSS 3.4.6",
    skill: "Tell how American heroes helped other people",
    emoji: "🦸",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p><b>César Chávez</b> was born in Arizona. He worked on farms in California.</p><p>He led farmworkers to ask for fair pay and safe work. He used <b>peaceful</b> ways, like marches.</p>", pic: big("🍇 ✊🏽 🕊️"), say: "César Chávez was born in Arizona. He worked on farms in California. He led farmworkers to ask for fair pay and safe work. He used peaceful ways, like marches." },
      { html: "<p><b>Dolores Huerta</b> was born in New Mexico. She worked with César Chávez in the Central Valley.</p><p>Together they started a group to help farmworkers. Her famous words are <b>\"Sí, se puede!\"</b> It means \"Yes, we can!\"</p>", pic: big("📣 🌾 💜"), say: "Dolores Huerta was born in New Mexico. She worked with César Chávez in the Central Valley. Together they started a group to help farmworkers. Her famous words are Sí, se puede! It means Yes, we can!" },
      { html: "<p><b>Harriet Tubman</b> escaped slavery. Then she bravely went back to lead others to freedom on the <b>Underground Railroad</b>.</p><p><b>Abraham Lincoln</b> was our 16th President. He worked to end slavery.</p>", pic: big("🌟 🗺️ 🎩"), say: "Harriet Tubman escaped slavery. Then she bravely went back to lead others to freedom on the Underground Railroad. Abraham Lincoln was our 16th President. He worked to end slavery." },
      { html: "<p><b>Dr. Martin Luther King Jr.</b> worked for equal rights for all people. He used peaceful words and marches.</p><p><b>Thomas Jefferson</b> wrote the <b>Declaration of Independence</b>. <b>Benjamin Franklin</b> was an inventor who helped start our country.</p>", pic: big("🎤 📜 💡"), say: "Doctor Martin Luther King Junior worked for equal rights for all people. He used peaceful words and marches. Thomas Jefferson wrote the Declaration of Independence. Benjamin Franklin was an inventor who helped start our country." }
    ],
    passage: {
      title: "Sí, Se Puede",
      pic: "",
      text: [
        "Many farmworkers in the Central Valley worked long days in the hot sun. Their pay was low. Some did not have clean water to drink at work.",
        "César Chávez and Dolores Huerta wanted to help. They started a group for farmworkers. They led peaceful marches. They asked people not to buy some grapes until workers were treated fairly.",
        "Dolores Huerta said, \"Sí, se puede!\" That means \"Yes, we can!\" People still say it today when they work together."
      ],
      lexile: "about 520L"
    },
    qs: [
      { t: "mc", q: "Who did César Chávez and Dolores Huerta help?", opts: ["Astronauts", "Farmworkers", "Race car drivers", "Kings and queens"], a: 1, why: "They helped farmworkers get fair pay and safer work." },
      { t: "mc", q: "What does \"Sí, se puede\" mean?", opts: ["Go away", "Good night", "Yes, we can", "Let's eat"], a: 2, why: "\"Sí, se puede\" means \"Yes, we can!\" It helps people feel strong together." },
      { t: "mc", q: "Where was Dolores Huerta born?", opts: ["New Mexico", "Texas", "Florida", "Canada"], a: 0, why: "Dolores Huerta was born in New Mexico. She did much of her work in California." },
      { t: "tf", q: "César Chávez used peaceful ways, like marches, to make change.", a: true, why: "Yes! César Chávez believed in peaceful ways to make things fair." },
      { t: "mc", q: "Who led people to freedom on the Underground Railroad?", opts: ["Benjamin Franklin", "Thomas Jefferson", "César Chávez", "Harriet Tubman"], a: 3, why: "Harriet Tubman was very brave. She led many people to freedom." },
      { t: "mc", q: "Who wrote the Declaration of Independence?", opts: ["Harriet Tubman", "Thomas Jefferson", "Dolores Huerta", "Martin Luther King Jr."], a: 1, why: "Thomas Jefferson wrote the Declaration of Independence in 1776." },
      { t: "sort", q: "Match each hero to what they did.", bins: ["Helped farmworkers", "Worked to end slavery", "Worked for equal rights"], items: [["César Chávez", 0], ["Dolores Huerta", 0], ["Harriet Tubman", 1], ["Abraham Lincoln", 1], ["Martin Luther King Jr.", 2]], why: "Chávez and Huerta helped farmworkers. Tubman and Lincoln worked to end slavery. Dr. King worked for equal rights." },
      { t: "mc", q: "Which President worked to end slavery?", opts: ["Abraham Lincoln", "Benjamin Franklin", "César Chávez", "Thomas Edison"], a: 0, why: "Abraham Lincoln was our 16th President. He worked to end slavery." },
      { t: "mc", q: "What is one thing all these heroes did?", opts: ["They were all Presidents.", "They all lived in Tulare.", "They worked to help other people.", "They all invented machines."], a: 2, why: "Heroes work to help others and make things more fair." }
    ]
  });

  /* ================= 3.5 Economics ================= */
  K3.add({
    id: "h-economics-local",
    subject: "history",
    unit: "Money and Jobs",
    title: "Goods, Services, and Choices",
    standard: "HSS 3.5",
    skill: "Tell about goods, services, choices, and jobs in our town",
    emoji: "💰",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p><b>Goods</b> are things you can touch and buy, like milk, oranges, and shoes.</p><p><b>Services</b> are jobs people do for you, like cutting hair or teaching.</p>", pic: big('🥛🍊👟<div style="font-size:18px;font-weight:bold;margin-bottom:8px">Goods</div>💇🏽‍♀️🧑🏻‍🏫🩺<div style="font-size:18px;font-weight:bold">Services</div>'), say: "Goods are things you can touch and buy, like milk, oranges, and shoes. Services are jobs people do for you, like cutting hair or teaching." },
      { html: "<p>A <b>producer</b> makes goods or gives services. A <b>consumer</b> buys and uses them.</p><p>A dairy farmer is a producer of milk. When you drink milk at lunch, you are a consumer.</p>", pic: big("🧑🏽‍🌾🐄 ➡️ 🥛 ➡️ 🧒🏽"), say: "A producer makes goods or gives services. A consumer buys and uses them. A dairy farmer is a producer of milk. When you drink milk at lunch, you are a consumer." },
      { html: "<p><b>Scarcity</b> means there is not enough for everyone. So we must make <b>choices</b>.</p><p>When you pick one thing, you give up the other.</p>", pic: scarcity, say: "Scarcity means there is not enough for everyone. So we must make choices. When you pick one thing, you give up the other." },
      { html: "<p><b>Saving</b> means keeping money to use later.</p><p>Jobs near Tulare: dairy farmers, farmworkers, <b>packing house</b> workers who pack oranges and grapes in boxes, truck drivers, teachers, and nurses.</p>", pic: big("🐷💵 &nbsp; 🍊📦 🚚"), say: "Saving means keeping money to use later. Jobs near Tulare: dairy farmers, farmworkers, packing house workers who pack oranges and grapes in boxes, truck drivers, teachers, and nurses." }
    ],
    passage: {
      title: "Mateo's Choice",
      pic: "",
      text: [
        "Mateo's mom works at a packing house. She packs oranges into boxes. Trucks take the boxes to stores far away.",
        "Mateo has $6. He wants a soccer ball for $6. He also wants a book for $6. He can only buy one.",
        "Mateo picks the soccer ball. He will save his money next month for the book."
      ],
      lexile: "about 430L"
    },
    qs: [
      { t: "sort", q: "Sort each one. Is it a good or a service?", bins: ["Good", "Service"], items: [["a carton of milk", 0], ["a haircut", 1], ["a box of oranges", 0], ["a doctor checkup", 1], ["a soccer ball", 0], ["fixing a tractor", 1]], why: "Goods are things you can touch. Services are jobs people do for you." },
      { t: "mc", q: "A dairy farmer sells milk. What is the dairy farmer?", opts: ["A consumer", "A producer", "A coin", "A store"], a: 1, why: "The dairy farmer makes milk to sell, so the farmer is a producer." },
      { t: "mc", q: "Ana buys a bag of oranges at the store. What is Ana?", opts: ["A consumer", "A producer", "A packing house", "A farmer"], a: 0, why: "Ana buys and uses the oranges, so she is a consumer." },
      { t: "mc", q: "Look. There are 6 kids and only 2 soccer balls at recess. What is this called?", pic: scarcity, opts: ["Saving", "A service", "Scarcity", "A law"], a: 2, why: "Scarcity means there is not enough for everyone. The kids must take turns." },
      { t: "mc", q: "Read the story. Mateo picks the soccer ball. What does he give up?", opts: ["His mom's job", "His shoes", "The oranges", "The book"], a: 3, why: "Mateo can buy only one thing. When he picks the ball, he gives up the book for now." },
      { t: "num", q: "Sofía saves $2 each week. How much money will she have after 5 weeks?", a: 10, unit: "dollars", why: "2 + 2 + 2 + 2 + 2 = 10. Sofía saves $10. Saving adds up!" },
      { t: "mc", q: "What does a packing house worker do?", opts: ["Packs fruit into boxes", "Flies airplanes", "Teaches math", "Builds roads"], a: 0, why: "Packing house workers pack fruit, like oranges, into boxes to ship to stores." },
      { t: "tf", q: "Saving money means keeping some money to use later.", a: true, why: "Yes! When you save, you keep money for something you want later." },
      { t: "mc", q: "Why do people go to school to learn new skills?", opts: ["So they never have to work", "So they can do many kinds of jobs", "So they can spend all their money", "So stores will close"], a: 1, why: "Learning new skills helps people get good jobs. School is a great place to start!" },
      { t: "mc", q: "Which is a natural resource farmers in Tulare use?", opts: ["A tractor", "A computer", "Water from rivers", "A truck"], a: 2, why: "Water comes from nature, so it is a natural resource. Tractors and trucks are tools people make." }
    ]
  });
})();
