/* k3-writing.js : Writing and Language activities for Mrs. Pitts' 3rd Grade (CA CCSS L.3.1, L.3.2, W.3.1-3) */
(function () {
  // tap helper: words that start with * are the correct answers.
  // Example: T("Tap the nouns.", "The *cow ate *hay.", "why...")
  function T(q, marked, why, extra) {
    var words = [], a = [];
    marked.split(/\s+/).forEach(function (w, i) {
      if (w.charAt(0) === "*") { a.push(i); w = w.slice(1); }
      words.push(w);
    });
    var o = { t: "tap", q: q, words: words, a: a, why: why };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }

  /* ---------------- 1. Parts of speech ---------------- */
  K3.add({
    id: "w-parts-of-speech",
    subject: "writing",
    unit: "Language Conventions",
    title: "Nouns, Verbs, Adjectives, Adverbs",
    standard: "L.3.1a",
    skill: "find nouns, verbs, adjectives, and adverbs in a sentence",
    emoji: "🐄",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p>A <b>noun</b> is a person, place, or thing.</p><p>🧑‍🌾 farmer &nbsp; 🏫 school &nbsp; 🍊 orange</p>", say: "A noun is a person, place, or thing. Farmer. School. Orange." },
      { html: "<p>A <b>verb</b> is an action word. It tells what someone does.</p><p>⚽ kick &nbsp; 🏃 ran &nbsp; 🍽️ eats</p>", say: "A verb is an action word. It tells what someone does. Kick. Ran. Eats." },
      { html: "<p>An <b>adjective</b> describes a noun.</p><p>a <b>sweet</b> orange &nbsp; a <b>big</b> cow</p>", say: "An adjective describes a noun. A sweet orange. A big cow." },
      { html: "<p>An <b>adverb</b> describes a verb. It tells <b>how</b>. Many adverbs end in <b>-ly</b>.</p><p>ran <b>quickly</b> &nbsp; read <b>quietly</b></p>", say: "An adverb describes a verb. It tells how. Many adverbs end in L Y. Ran quickly. Read quietly." }
    ],
    qs: [
      T("Tap the 3 nouns.", "*Abuela made *tamales in the *kitchen.", "Abuela is a person, tamales are things, and the kitchen is a place. Great job!"),
      T("Tap the 2 verbs.", "Mateo *kicked the ball and *ran to the goal.", "Kicked and ran are actions. Mateo did them!"),
      T("Tap the 2 adjectives.", "The *sweet oranges grew on a *tall tree.", "Sweet tells about the oranges. Tall tells about the tree."),
      T("Tap the adverb.", "The bus moved *slowly down the street.", "Slowly tells how the bus moved. It ends in -ly."),
      T("Tap the 3 nouns.", "The *farmer drove her *truck to the *field.", "Farmer is a person. Truck is a thing. Field is a place."),
      T("Tap the adverb.", "Sofia *quietly read her book.", "Quietly tells how Sofia read. Nice work!"),
      T("Tap the 2 adjectives.", "My *little brother has a *red backpack.", "Little tells about the brother. Red tells about the backpack."),
      { t: "mc", q: "Which word is an adverb?", opts: ["happy", "happily", "happiness", "happen"], a: 1, why: "Happily tells how someone does something, like \"She sang happily.\"" },
      { t: "sort", q: "Is it a noun or a verb? Sort the words.", bins: ["Noun", "Verb"], items: [["tractor", 0], ["teacher", 0], ["library", 0], ["pencil", 0], ["ate", 1], ["sings", 1], ["climbed", 1], ["writes", 1]], why: "Nouns are people, places, or things. Verbs are actions." },
      { t: "mc", q: "The fluffy calf slept in the barn. Which word is an adjective?", opts: ["calf", "slept", "barn", "fluffy"], a: 3, why: "Fluffy describes the calf. It is an adjective." }
    ]
  });

  /* ---------------- 2. Plural nouns ---------------- */
  K3.add({
    id: "w-plural-nouns",
    subject: "writing",
    unit: "Language Conventions",
    title: "Plural Nouns",
    standard: "L.3.1b",
    skill: "make regular and irregular plural nouns",
    emoji: "🐑",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p><b>Plural</b> means more than one.</p><p>Most nouns add <b>-s</b>: cow → cow<b>s</b></p><p>Words that end in s, x, ch, sh add <b>-es</b>: box → box<b>es</b></p>", say: "Plural means more than one. Most nouns add S. Cow, cows. Words that end in S, X, C H, or S H add E S. Box, boxes." },
      { html: "<p>Consonant + <b>y</b>: change y to <b>i</b>, add <b>-es</b>. berry → berr<b>ies</b></p><p>Vowel + y: just add -s. toy → toy<b>s</b></p><p>Some <b>f</b> words change to <b>v</b>: leaf → lea<b>ves</b></p>", say: "If a word ends in a consonant and Y, change the Y to I and add E S. Berry, berries. If a vowel comes before the Y, just add S. Toy, toys. Some F words change to V. Leaf, leaves." },
      { html: "<p><b>Irregular</b> plurals are special. Learn them by heart!</p><p>child → children &nbsp; mouse → mice &nbsp; tooth → teeth &nbsp; goose → geese &nbsp; sheep → sheep</p>", say: "Irregular plurals are special. Child, children. Mouse, mice. Tooth, teeth. Goose, geese. Sheep, sheep." }
    ],
    qs: [
      { t: "mc", q: "One child, two ___.", opts: ["childs", "children", "childrens", "childes"], a: 1, why: "Child is irregular. The plural is children." },
      { t: "mc", q: "One box, three ___.", opts: ["boxs", "boxies", "boxes", "box"], a: 2, why: "Box ends in x, so we add -es: boxes." },
      { t: "mc", q: "One berry, many ___.", opts: ["berries", "berrys", "berryes", "berry"], a: 0, why: "Berry ends in a consonant and y. Change y to i and add -es: berries." },
      { t: "mc", q: "One mouse in the barn, two ___ in the barn.", opts: ["mouses", "mices", "mouse", "mice"], a: 3, why: "Mouse is irregular. The plural is mice." },
      { t: "mc", q: "One leaf, a big pile of ___.", opts: ["leafs", "leaves", "leafes", "leavs"], a: 1, why: "The f changes to v, then add -es: leaves." },
      { t: "mc", q: "One sheep, ten ___.", opts: ["sheeps", "sheepes", "sheep", "shoop"], a: 2, why: "Sheep stays the same. One sheep, ten sheep!" },
      { t: "mc", q: "Which sentence is correct?", opts: ["I brushed my teeth.", "I brushed my tooths.", "I brushed my teeths.", "I brushed my toothes."], a: 0, why: "Tooth is irregular. The plural is teeth." },
      { t: "sort", q: "Add -s or add -es? Sort the words.", bins: ["Add -s", "Add -es"], items: [["cow", 0], ["tractor", 0], ["apple", 0], ["girl", 0], ["bus", 1], ["dish", 1], ["fox", 1], ["peach", 1]], why: "Words that end in s, x, ch, or sh add -es. Most other words add -s." },
      T("Tap the 3 plural nouns.", "The *children fed three *geese and two *calves.", "Children, geese, and calves all mean more than one."),
      { t: "tf", q: "The plural of toy is toies.", a: false, why: "Toy has a vowel before the y, so we just add -s: toys." }
    ]
  });

  /* ---------------- 3. Verb tenses ---------------- */
  K3.add({
    id: "w-verb-tenses",
    subject: "writing",
    unit: "Language Conventions",
    title: "Past, Present, and Future Verbs",
    standard: "L.3.1e",
    skill: "use past, present, and future verbs, including irregular verbs",
    emoji: "⏰",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p><b>Past:</b> already happened. I walk<b>ed</b>.</p><p><b>Present:</b> happens now. I walk. She walk<b>s</b>.</p><p><b>Future:</b> will happen. I <b>will</b> walk.</p>", say: "Past already happened. I walked. Present happens now. I walk. She walks. Future will happen. I will walk." },
      { html: "<p>Some verbs are <b>irregular</b>. They do not use -ed in the past.</p><p>run → <b>ran</b> &nbsp; eat → <b>ate</b> &nbsp; go → <b>went</b> &nbsp; bring → <b>brought</b> &nbsp; think → <b>thought</b> &nbsp; swim → <b>swam</b></p>", say: "Some verbs are irregular. They do not use E D in the past. Run, ran. Eat, ate. Go, went. Bring, brought. Think, thought. Swim, swam." },
      { html: "<p>Clue words help!</p><p><b>Yesterday, last week</b> → past</p><p><b>Every day, now</b> → present</p><p><b>Tomorrow, next week</b> → future</p>", say: "Clue words help. Yesterday and last week mean past. Every day and now mean present. Tomorrow and next week mean future." }
    ],
    qs: [
      { t: "sort", q: "Past, present, or future? Sort the verbs.", bins: ["Past", "Present", "Future"], items: [["walked", 0], ["ate", 0], ["played", 0], ["jumps", 1], ["runs", 1], ["sings", 1], ["will eat", 2], ["will help", 2], ["will swim", 2]], why: "Past already happened. Present is now. Future uses will." },
      { t: "mc", q: "Yesterday, Ana ___ to the library.", opts: ["goes", "will go", "went", "go"], a: 2, why: "Yesterday means the past. The past of go is went." },
      { t: "mc", q: "Tomorrow, we ___ oranges with Tío Luis.", opts: ["will pick", "picked", "picks", "picking"], a: 0, why: "Tomorrow means the future, so we use will pick." },
      { t: "mc", q: "Every morning, my abuelo ___ the cows.", opts: ["feed", "feeds", "feeding", "feeded"], a: 1, why: "Every morning is present tense. One person, abuelo, feeds the cows." },
      { t: "mc", q: "What is the past tense of run?", opts: ["runned", "ran", "runs", "running"], a: 1, why: "Run is irregular. Today I run. Yesterday I ran." },
      { t: "mc", q: "Last week, Carlos ___ his lunch to school.", opts: ["bringed", "brang", "brought", "brings"], a: 2, why: "Bring is irregular. The past tense is brought." },
      { t: "mc", q: "What is the past tense of think?", opts: ["thinked", "thinks", "thunk", "thought"], a: 3, why: "Think is irregular. Yesterday I thought about it." },
      T("Tap the 2 past tense verbs.", "Last night, Diego *ate tamales and *watched a movie.", "Ate and watched both already happened. Great!"),
      { t: "tf", q: "The past tense of swim is swimmed.", a: false, why: "Swim is irregular. The past tense is swam." },
      { t: "build", q: "Build a sentence that tells about the future.", words: ["We", "will", "plant", "corn", "tomorrow."], why: "Will plant and tomorrow tell us it has not happened yet." }
    ]
  });

  /* ---------------- 4. Subject-verb agreement and comparisons ---------------- */
  K3.add({
    id: "w-agreement-compare",
    subject: "writing",
    unit: "Language Conventions",
    title: "Verbs That Match and Words That Compare",
    standard: "L.3.1f",
    skill: "match subjects and verbs and use -er and -est words",
    emoji: "⚖️",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p>The verb must <b>match</b> the subject.</p><p>One: The dog bark<b>s</b>. &nbsp; She <b>has</b>.</p><p>More than one: The dogs bark. &nbsp; They <b>have</b>.</p>", say: "The verb must match the subject. One dog barks. She has. More than one, the dogs bark. They have." },
      { html: "<p>Use <b>-er</b> to compare <b>2</b> things: An orange is bigg<b>er</b> than a grape.</p><p>Use <b>-est</b> to compare <b>3 or more</b>: Ben is the tall<b>est</b> in class.</p>", say: "Use E R to compare 2 things. An orange is bigger than a grape. Use E S T to compare 3 or more. Ben is the tallest in class." },
      { html: "<p>Long words use <b>more</b> and <b>most</b>: more beautiful, most beautiful.</p><p>Special words: good, <b>better</b>, <b>best</b>. bad, <b>worse</b>, <b>worst</b>.</p>", say: "Long words use more and most. More beautiful, most beautiful. Special words: good, better, best. Bad, worse, worst." }
    ],
    qs: [
      { t: "mc", q: "The dogs ___ at the mail truck.", opts: ["barks", "bark", "barking", "is bark"], a: 1, why: "Dogs means more than one, so we say the dogs bark." },
      { t: "mc", q: "My sister ___ soccer on Saturdays.", opts: ["play", "playing", "plays", "are play"], a: 2, why: "My sister is one person, so the verb gets an -s: plays." },
      { t: "mc", q: "Luis and Mia ___ to school together.", opts: ["walk", "walks", "walkes", "is walk"], a: 0, why: "Luis and Mia are two people, so we say walk." },
      { t: "mc", q: "Which sentence is correct?", opts: ["She have a new puppy.", "She haves a new puppy.", "She having a new puppy.", "She has a new puppy."], a: 3, why: "With she, he, or it, we use has." },
      { t: "mc", q: "A watermelon is ___ than an orange.", opts: ["big", "bigger", "biggest", "more big"], a: 1, why: "We compare 2 things, so we use -er: bigger." },
      { t: "mc", q: "Ben is the ___ kid in our whole class.", opts: ["tall", "taller", "tallest", "more tall"], a: 2, why: "The whole class is more than 2 kids, so we use -est: tallest." },
      { t: "mc", q: "Today is the ___ day ever!", opts: ["best", "goodest", "better", "most good"], a: 0, why: "Good is special: good, better, best." },
      { t: "sort", q: "Does it compare 2 things or 3 or more? Sort the words.", bins: ["2 things (-er)", "3 or more (-est)"], items: [["faster", 0], ["colder", 0], ["happier", 0], ["smaller", 0], ["fastest", 1], ["coldest", 1], ["happiest", 1], ["smallest", 1]], why: "-er compares 2 things. -est compares 3 or more." },
      { t: "mc", q: "The dairy cows ___ hungry.", opts: ["is", "are", "am", "be"], a: 1, why: "Cows means more than one, so we use are." },
      { t: "tf", q: "We say more beautiful, not beautifuller.", a: true, why: "Beautiful is a long word, so we use more. You got it!" }
    ]
  });

  /* ---------------- 5. Conjunctions and compound sentences ---------------- */
  K3.add({
    id: "w-conjunctions",
    subject: "writing",
    unit: "Language Conventions",
    title: "And, But, Or, So",
    standard: "L.3.1h",
    skill: "use and, but, or, and so to make compound sentences",
    emoji: "🔗",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p>A <b>conjunction</b> joins ideas.</p><p><b>and</b> = add more &nbsp; <b>but</b> = something different</p><p><b>or</b> = a choice &nbsp; <b>so</b> = what happened next because of it</p>", say: "A conjunction joins ideas. And adds more. But shows something different. Or gives a choice. So tells what happened because of it." },
      { html: "<p>A <b>compound sentence</b> joins two sentences.</p><p>Put a <b>comma</b> before the conjunction.</p><p>It was raining<b>,</b> <b>so</b> we played inside.</p>", say: "A compound sentence joins two sentences. Put a comma before the conjunction. It was raining, so we played inside." }
    ],
    qs: [
      { t: "build", q: "Join with but. I like apples. My brother likes oranges.", words: ["I", "like", "apples,", "but", "my", "brother", "likes", "oranges."], why: "But shows two different ideas. Remember the comma before but!" },
      { t: "build", q: "Join with so. It was raining. We played inside.", words: ["It", "was", "raining,", "so", "we", "played", "inside."], why: "So tells what happened because it was raining." },
      { t: "build", q: "Join with and. Rosa fed the chickens. Papá milked a cow.", words: ["Rosa", "fed", "the", "chickens,", "and", "Papá", "milked", "a", "cow."], why: "And adds one idea to another. Great joining!" },
      { t: "build", q: "Join with or. Is the calf asleep? Is it hungry?", words: ["Is", "the", "calf", "asleep,", "or", "is", "it", "hungry?"], why: "Or gives a choice. Is it asleep, or is it hungry?" },
      { t: "mc", q: "It was hot outside, ___ we drank lots of water.", opts: ["or", "but", "so"], a: 2, why: "So tells what happened because it was hot." },
      { t: "mc", q: "Do you want a taco, ___ do you want a burrito?", opts: ["or", "so", "because", "then"], a: 0, why: "Or gives a choice: a taco or a burrito." },
      { t: "mc", q: "Which is a compound sentence?", opts: ["The cows ate hay.", "The cows ate hay, and the calves drank milk.", "The big brown cows.", "Eating hay in the barn."], a: 1, why: "It joins two whole sentences with a comma and and." },
      { t: "mc", q: "I wanted to go to the park, ___ it started to rain.", opts: ["so", "or", "because", "but"], a: 3, why: "But shows something different from what you wanted." },
      T("Tap the conjunction.", "The library was closed, *so we went home.", "So joins the two ideas together."),
      { t: "tf", q: "A compound sentence joins two sentences with a comma and a word like and, but, or, or so.", a: true, why: "Yes! Two sentences plus a comma and a conjunction make a compound sentence." }
    ]
  });

  /* ---------------- 6. Capitals and commas ---------------- */
  K3.add({
    id: "w-caps-commas",
    subject: "writing",
    unit: "Language Conventions",
    title: "Capital Letters and Commas",
    standard: "L.3.2a",
    skill: "capitalize titles and use commas in addresses and dialogue",
    emoji: "✉️",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p>In a <b>title</b>, capitalize the first word and the important words.</p><p>Small words like <b>a, an, the, and, of, in, at</b> stay lowercase unless they are first.</p><p><b>A Day at the Dairy Farm</b></p>", say: "In a title, capitalize the first word and the important words. Small words like a, an, the, and, of, in, and at stay lowercase unless they are first. A Day at the Dairy Farm." },
      { html: "<p>Put a <b>comma</b> between the city and the state.</p><p>Tulare<b>,</b> California &nbsp; Visalia<b>,</b> CA 93291</p>", say: "Put a comma between the city and the state. Tulare, California. Visalia, C A, 9 3 2 9 1." },
      { html: "<p><b>Quotation marks</b> go around the exact words someone says.</p><p>Mom said<b>, \"</b>Wash your hands.<b>\"</b></p><p><b>\"</b>Let's go to recess<b>,\"</b> said Maria.</p>", say: "Quotation marks go around the exact words someone says. Use a comma to set apart who is talking. Mom said, wash your hands. Let's go to recess, said Maria." }
    ],
    qs: [
      { t: "mc", q: "Which book title is written correctly?", opts: ["a day at the dairy farm", "A Day at the Dairy Farm", "A day at the Dairy farm", "a Day At the dairy Farm"], a: 1, why: "The first word and important words get capitals. Small words like at and the stay lowercase." },
      T("Tap the 5 words in this title that need a capital letter.", "*the *big *orange *tree of *tulare", "The is the first word. Big, Orange, Tree, and Tulare are important words. Of stays small."),
      { t: "mc", q: "Which is written correctly?", opts: ["Tulare California", ",Tulare California", "Tulare, California", "Tulare California,"], a: 2, why: "The comma goes between the city and the state." },
      { t: "mc", q: "Which line is correct for an envelope?", opts: ["Visalia, CA 93291", "Visalia CA, 93291", "Visalia CA 93291,", "Visalia, CA, 93291,"], a: 0, why: "Put one comma after the city. Then write the state and ZIP code." },
      { t: "mc", q: "Which sentence is written correctly?", opts: ["\"Let's go to recess\" said Maria.", "Let's go to recess, said Maria.", "\"Let's go to recess\", said Maria.", "\"Let's go to recess,\" said Maria."], a: 3, why: "The comma goes inside the quotation marks, right after Maria's words." },
      { t: "mc", q: "Which sentence is written correctly?", opts: ["Mom said \"Wash your hands.\"", "Mom said, \"Wash your hands.\"", "Mom said, Wash your hands.", "Mom, said \"Wash your hands.\""], a: 1, why: "Put a comma after said. Then put quotation marks around Mom's words." },
      { t: "tf", q: "We put a comma between a city and its state, like Tulare, California.", a: true, why: "Yes! The comma goes between the city and the state." },
      { t: "mc", q: "In a title, which word stays lowercase if it is not the first word?", opts: ["soccer", "farm", "and", "big"], a: 2, why: "And is a small word, so it stays lowercase in the middle of a title." },
      { t: "mc", q: "Which song title is written correctly?", opts: ["the Happy Cow song", "The Happy Cow Song", "The happy cow song", "the happy Cow Song"], a: 1, why: "Every important word in this title gets a capital letter." },
      T("Tap the 2 words that need a capital letter.", "*we went to the park in *tulare.", "We starts the sentence. Tulare is the name of our city.")
    ]
  });

  /* ---------------- 7. Spelling and suffixes ---------------- */
  K3.add({
    id: "w-spelling-suffixes",
    subject: "writing",
    unit: "Language Conventions",
    title: "Spelling Patterns and Suffixes",
    standard: "L.3.2f",
    skill: "use spelling rules when I add endings to words",
    emoji: "🔤",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p>A <b>suffix</b> is an ending added to a word.</p><p><b>-ful</b> = full of (help<b>ful</b>) &nbsp; <b>-less</b> = without (care<b>less</b>)</p><p><b>-er</b> = one who (teach<b>er</b>) &nbsp; <b>-ness</b> = being (kind<b>ness</b>)</p>", say: "A suffix is an ending added to a word. F U L means full of, like helpful. L E S S means without, like careless. E R can mean one who, like teacher. N E S S means being, like kindness." },
      { html: "<p><b>Short vowel + 1 consonant:</b> double it. hop → ho<b>pp</b>ing</p><p><b>Silent e:</b> drop the e. make → mak<b>ing</b></p><p><b>Consonant + y:</b> change y to i. carry → carr<b>ied</b></p>", say: "Short vowel and one consonant, double it. Hop, hopping. Silent E, drop the E. Make, making. Consonant and Y, change Y to I. Carry, carried." },
      { html: "<p>Long a pattern: <b>ai</b> in the middle (r<b>ai</b>n), <b>ay</b> at the end (pl<b>ay</b>).</p>", say: "Long A pattern. A I goes in the middle, like rain. A Y goes at the end, like play." }
    ],
    qs: [
      { t: "mc", q: "hop + ing = ?", opts: ["hoping", "hopping", "hopeing", "hopings"], a: 1, why: "Hop has a short vowel, so we double the p: hopping." },
      { t: "mc", q: "make + ing = ?", opts: ["makeing", "makking", "making", "makin"], a: 2, why: "Make ends in a silent e. Drop the e, then add -ing: making." },
      { t: "mc", q: "carry + ed = ?", opts: ["carried", "carryed", "carryd", "carred"], a: 0, why: "Carry ends in a consonant and y. Change y to i, then add -ed: carried." },
      { t: "mc", q: "happy + ness = ?", opts: ["happyness", "hapiness", "happines", "happiness"], a: 3, why: "Change the y to i, then add -ness: happiness." },
      { t: "mc", q: "stop + ed = ?", opts: ["stoped", "stopped", "stopd", "stopt"], a: 1, why: "Stop has a short vowel, so we double the p: stopped." },
      { t: "mc", q: "Which word is spelled correctly?", opts: ["becuase", "becaus", "because", "beacuse"], a: 2, why: "Because is spelled b-e-c-a-u-s-e. It is a word we use a lot!" },
      { t: "mc", q: "What does careless mean?", opts: ["full of care", "without care", "care again", "one who cares"], a: 1, why: "The suffix -less means without. Careless means without care." },
      { t: "sort", q: "Long a sound: ai or ay? Sort the words.", bins: ["ai (middle)", "ay (end)"], items: [["rain", 0], ["tail", 0], ["paint", 0], ["train", 0], ["play", 1], ["day", 1], ["stay", 1], ["tray", 1]], why: "Ai comes in the middle of a word. Ay comes at the end." },
      { t: "tf", q: "When a word ends in a silent e, like bike, we drop the e before adding -ing: biking.", a: true, why: "Yes! Bike becomes biking." },
      { t: "mc", q: "Which word means full of help?", opts: ["helpless", "helper", "helpful", "helping"], a: 2, why: "The suffix -ful means full of. Helpful means full of help." }
    ]
  });

  /* ---------------- 8. Sentence fluency ---------------- */
  K3.add({
    id: "w-sentence-fluency",
    subject: "writing",
    unit: "Writing Process",
    title: "Fix and Combine Sentences",
    standard: "L.3.1i",
    skill: "fix run-ons and fragments and combine short sentences",
    emoji: "🛠️",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p>A <b>complete sentence</b> has a <b>who</b> and a <b>what they do</b>.</p><p><b>Maya</b> <b>ran to the bus.</b> ✅</p><p>A <b>fragment</b> is missing a part: <i>Ran to the bus.</i> ❌</p>", say: "A complete sentence has a who and a what they do. Maya ran to the bus. A fragment is missing a part. Ran to the bus is a fragment." },
      { html: "<p>A <b>run-on</b> is two sentences smushed together.</p><p>❌ I ate lunch I went to recess.</p><p>✅ I ate lunch, and then I went to recess.</p>", say: "A run-on is two sentences smushed together. Fix it with a period, or a comma and a joining word. I ate lunch, and then I went to recess." },
      { html: "<p><b>Combine</b> short sentences to make writing smooth.</p><p>The dog is small. The dog is fluffy. → The dog is small <b>and</b> fluffy.</p>", say: "Combine short sentences to make writing smooth. The dog is small. The dog is fluffy. The dog is small and fluffy." }
    ],
    qs: [
      { t: "mc", q: "Which is a complete sentence?", opts: ["Ran to the bus.", "The big red tractor.", "Maya ran to the bus.", "Because it was late."], a: 2, why: "It tells who (Maya) and what she did (ran to the bus)." },
      { t: "mc", q: "Which is a fragment?", opts: ["The calf drinks milk.", "Under the orange tree.", "We ate lunch.", "Dad fixed the truck."], a: 1, why: "Under the orange tree does not tell who or what happened." },
      { t: "sort", q: "Complete sentence or fragment? Sort them.", bins: ["Complete sentence", "Fragment"], items: [["The cows eat hay.", 0], ["Sofia reads every night.", 0], ["We won the game!", 0], ["Played at recess.", 1], ["The tall green corn.", 1], ["Because it was hot.", 1]], why: "Complete sentences tell who and what they do. Fragments are missing a part." },
      { t: "mc", q: "How do you fix this run-on? I ate lunch I went to recess.", opts: ["I ate lunch I. Went to recess.", "I ate. Lunch I went to recess.", "i ate lunch i went to recess", "I ate lunch, and then I went to recess."], a: 3, why: "A comma and a joining word fix the run-on." },
      { t: "mc", q: "Combine: Dad drove to Visalia. Mom drove to Visalia.", opts: ["Dad drove Mom drove to Visalia.", "Dad and Mom drove to Visalia.", "Dad drove to Visalia and Mom.", "Drove to Visalia Dad and Mom."], a: 1, why: "Dad and Mom both drove, so we join them with and." },
      { t: "build", q: "Combine into one sentence. Mila fed the chickens. Then she gathered eggs.", words: ["Mila", "fed", "the", "chickens,", "and", "then", "she", "gathered", "eggs."], why: "A comma and the word and join the two sentences smoothly." },
      { t: "mc", q: "Fix the fragment: Playing soccer at the park.", opts: ["Playing soccer. At the park.", "Playing soccer at the park and.", "We were playing soccer at the park.", "At the park playing soccer."], a: 2, why: "Adding We were tells who was playing. Now it is complete!" },
      { t: "tf", q: "Because it was raining. This is a complete sentence.", a: false, why: "It needs more! Try: We stayed inside because it was raining." },
      { t: "mc", q: "Combine: The dog is small. The dog is fluffy.", opts: ["The dog is small and fluffy.", "The small dog is fluffy dog.", "The dog small fluffy.", "Small fluffy. The dog is."], a: 0, why: "Small and fluffy both describe the dog, so we join them with and." },
      { t: "mc", q: "Which sentence is a run-on?", opts: ["The bell rang, and we lined up.", "The bell rang we lined up we went inside.", "We lined up.", "The bell rang."], a: 1, why: "It has three sentences smushed together with no punctuation." }
    ]
  });

  /* ---------------- 9. Opinion writing ---------------- */
  K3.add({
    id: "w-opinion",
    subject: "writing",
    unit: "Writing Process",
    title: "Opinion Writing",
    standard: "W.3.1",
    skill: "write my opinion with reasons, linking words, and a closing",
    emoji: "💬",
    mins: 15,
    pass: 80,
    learn: [
      { html: "<p>An <b>opinion</b> is what you think or feel. A <b>fact</b> can be proven.</p><p>Opinion: Oranges are the best fruit.</p><p>Fact: Oranges grow on trees.</p>", say: "An opinion is what you think or feel. A fact can be proven. Opinion: oranges are the best fruit. Fact: oranges grow on trees." },
      { html: "<p>An opinion paragraph has 4 parts:</p><p>1️⃣ <b>Opinion:</b> I think...</p><p>2️⃣ <b>Reason 1</b> with <b>because</b></p><p>3️⃣ <b>Reason 2:</b> Another reason is...</p><p>4️⃣ <b>Closing:</b> That is why...</p>", say: "An opinion paragraph has 4 parts. First, your opinion: I think. Second, reason 1 with because. Third, reason 2: another reason is. Fourth, the closing: that is why." },
      { html: "<p><b>Linking words</b> connect your opinion and reasons.</p><p><b>because</b>, <b>since</b>, <b>for example</b>, <b>also</b>, <b>therefore</b></p>", say: "Linking words connect your opinion and reasons. Because. Since. For example. Also. Therefore." }
    ],
    qs: [
      { t: "order", q: "Put the opinion paragraph in order.", items: ["I think recess should be longer.", "First, kids need time to run and play because it keeps us healthy.", "Also, playing outside helps us focus in class.", "That is why recess should be longer."], why: "Opinion first, then reasons, then the closing." },
      { t: "sort", q: "Fact or opinion? Sort them.", bins: ["Fact", "Opinion"], items: [["Oranges grow on trees.", 0], ["Tulare is in California.", 0], ["Cows give milk.", 0], ["Oranges are the best fruit.", 1], ["Soccer is the most fun sport.", 1], ["Pizza day is the best day.", 1]], why: "Facts can be proven. Opinions tell what someone thinks or feels." },
      { t: "mc", q: "Which sentence tells an opinion?", opts: ["Our school has a library.", "I think our school should have a garden.", "The garden is next to Room 12.", "Corn is a plant."], a: 1, why: "I think tells us it is an opinion." },
      { t: "mc", q: "I love the library ___ it has so many good books.", opts: ["because", "but", "or", "therefore"], a: 0, why: "Because gives the reason you love the library." },
      { t: "mc", q: "Summer is the best season. ___, we can swim and eat paletas.", opts: ["Never", "But", "For example", "Yesterday"], a: 2, why: "For example shows why summer is the best." },
      { t: "mc", q: "It is cold today. ___, you should wear a jacket.", opts: ["Because", "Therefore", "Since", "Or"], a: 1, why: "Therefore means so. It is cold, so wear a jacket!" },
      { t: "mc", q: "___ it is hot today, we should drink lots of water.", opts: ["Since", "Therefore", "For example", "But"], a: 0, why: "Since means because. Since it is hot, we need water." },
      { t: "mc", q: "Opinion: Our class should get a class pet. Which reason supports it best?", opts: ["My cousin lives in Visalia.", "Pets can be many colors.", "I had cereal for breakfast.", "A pet would teach us to be responsible."], a: 3, why: "This reason tells why a class pet is a good idea." },
      { t: "mc", q: "Opinion: I think soccer is the best sport. Which is the best closing sentence?", opts: ["That is why soccer is the best sport.", "Soccer balls are round.", "My shoes are blue.", "First, soccer is fun."], a: 0, why: "A closing sentence tells your opinion again." },
      {
        t: "write",
        q: "Should our school have a garden? Write your opinion. Give 2 reasons.",
        say: "Should our school have a garden? Write your opinion. Give 2 reasons. Use because. Use a linking word. End with a closing sentence.",
        min: 30,
        frames: ["I think our school should ___ because ___.", "Another reason is ___ because ___.", "For example, ___.", "That is why ___."],
        checks: [
          { label: "I tell my opinion (I think...)", re: /\b(I think|I believe|I feel|in my opinion|should|shouldn[’']t|should not)\b/i },
          { label: "2 reasons, using because", re: /\bbecause\b[\s\S]+\b(because|also|another|second|since)\b/i },
          { label: "A linking word (since, for example, also, therefore)", re: /\b(since|for example|also|therefore|another|first|second)\b/i },
          { label: "A closing (That is why...)", re: /\b(that is why|that[’']s why|this is why|in conclusion|for these reasons|so that is why)\b/i }
        ]
      }
    ]
  });

  /* ---------------- 10. Informative paragraph ---------------- */
  K3.add({
    id: "w-informative",
    subject: "writing",
    unit: "Writing Process",
    title: "Informative Paragraph",
    standard: "W.3.2",
    skill: "write a paragraph that teaches facts about a topic",
    emoji: "📘",
    mins: 15,
    pass: 80,
    learn: [
      { html: "<p>An <b>informative</b> paragraph teaches facts.</p><p>🍔 Think of a hamburger:</p><p>Top bun = <b>topic sentence</b></p><p>Middle = <b>facts and details</b></p><p>Bottom bun = <b>concluding sentence</b></p>", say: "An informative paragraph teaches facts. Think of a hamburger. The top bun is the topic sentence. The middle is facts and details. The bottom bun is the concluding sentence." },
      { html: "<p><b>Linking words</b> add more facts: <b>also</b>, <b>another</b>, <b>and</b>, <b>for example</b>.</p><p>Cows give milk. They <b>also</b> need lots of water.</p>", say: "Linking words add more facts. Also. Another. And. For example. Cows give milk. They also need lots of water." }
    ],
    qs: [
      { t: "mc", q: "Which is the best topic sentence for a paragraph about dairy cows?", opts: ["I like my blue shoes.", "Dairy cows are important animals on Tulare farms.", "Moo!", "Some kids ride the bus."], a: 1, why: "It tells the reader the paragraph is about dairy cows." },
      { t: "sort", q: "The topic is oranges. Does it fit the topic?", bins: ["Fits the topic", "Does not fit"], items: [["Oranges grow on trees.", 0], ["Oranges have lots of vitamin C.", 0], ["Farmers pick oranges in winter.", 0], ["My cousin has a red bike.", 1], ["Soccer games are on Saturday.", 1], ["I lost my pencil.", 1]], why: "Every fact in the paragraph should be about the topic." },
      { t: "order", q: "Put the paragraph in order.", items: ["Bees are busy helpers on farms.", "They carry pollen from flower to flower.", "This helps plants grow fruit and nuts, like almonds.", "Bees also make honey.", "Bees are small, but they do a big job!"], why: "Topic sentence first, then facts, then the concluding sentence." },
      { t: "mc", q: "Milk is used to make cheese. It is ___ used to make ice cream.", opts: ["but", "never", "also", "before"], a: 2, why: "Also adds another fact." },
      { t: "mc", q: "Which is the best concluding sentence for a paragraph about the library?", opts: ["Do you have a cat?", "First, find a book.", "My sandwich has ham.", "The library is a great place to learn and read."], a: 3, why: "It wraps up the paragraph and talks about the library." },
      { t: "tf", q: "An informative paragraph gives facts and details about a topic.", a: true, why: "Yes! Informative writing teaches the reader real facts." },
      { t: "mc", q: "Which sentence is a fact about the Sierra Nevada mountains?", opts: ["The Sierra Nevada mountains get snow in winter.", "Mountains are the prettiest thing ever.", "I want to go there.", "Hiking is boring."], a: 0, why: "Snow in winter is a fact. The others are opinions or wishes." },
      { t: "mc", q: "Tulare County has many dairy farms, ___ it grows oranges too.", opts: ["or", "because", "and", "so"], a: 2, why: "And links two facts together." },
      {
        t: "write",
        q: "Write a paragraph that teaches about a farm animal, a fruit, or a sport.",
        say: "Write a paragraph that teaches about a farm animal, a fruit, or a sport. Start with a topic sentence. Give facts. Use a linking word. End with a concluding sentence.",
        min: 30,
        frames: ["___ are ___.", "One fact is ___.", "They also ___.", "Another fact is ___.", "Now you know ___."],
        checks: [
          { label: "A topic sentence", re: /^\s*\S+(\s+\S+){3,}[^.!?]*[.!?]/ },
          { label: "Facts and details (4 or more sentences)", re: /[.!?][\s\S]*[.!?][\s\S]*[.!?][\s\S]*[.!?]/ },
          { label: "A linking word (also, another, and, for example)", re: /\b(also|another|and|for example|in addition)\b/i },
          { label: "A concluding sentence (Now you know...)", re: /\b(now you know|in conclusion|as you can see|all in all|that is why|that[’']s why|in the end)\b/i }
        ]
      }
    ]
  });

  /* ---------------- 11. Narrative writing ---------------- */
  K3.add({
    id: "w-narrative",
    subject: "writing",
    unit: "Writing Process",
    title: "Narrative Writing",
    standard: "W.3.3",
    skill: "write a story with sequence words, dialogue, feelings, and an ending",
    emoji: "📖",
    mins: 15,
    pass: 80,
    learn: [
      { html: "<p>A <b>narrative</b> tells a story. Events go in order.</p><p><b>Sequence words:</b> First, Next, Then, After that, Finally</p>", say: "A narrative tells a story. Events go in order. Sequence words: first, next, then, after that, finally." },
      { html: "<p><b>Dialogue</b> shows what characters say.</p><p>Papá said, \"Let's pick oranges!\"</p><p><b>Feelings</b> make the story come alive: <i>My heart pounded because I was so excited.</i></p>", say: "Dialogue shows what characters say. Papa said, let's pick oranges! Feelings make the story come alive. My heart pounded because I was so excited." },
      { html: "<p>A good <b>ending</b> wraps up the story.</p><p>Tell how it turned out or what you learned.</p><p><i>In the end, I learned that helping Papá is fun.</i></p>", say: "A good ending wraps up the story. Tell how it turned out or what you learned. In the end, I learned that helping Papa is fun." }
    ],
    qs: [
      { t: "order", q: "Put the story in order.", items: ["First, Papá and I drove to the orange grove.", "Next, we picked oranges from the trees.", "Then, we filled a big box.", "Finally, we went home and ate the sweet oranges."], why: "First, next, then, finally. The sequence words help you!" },
      T("Tap the 3 sequence words.", "*First, we planted seeds. *Then we watered them. *Finally, we saw sprouts!", "First, then, and finally tell the order of events."),
      { t: "mc", q: "___, we were so tired that we fell asleep in the car.", opts: ["First", "Next", "Finally", "Before"], a: 2, why: "Finally tells about the end of the day." },
      { t: "mc", q: "Which sentence shows dialogue correctly?", opts: ["Abuela said, Be careful with the hot comal.", "Abuela said, \"Be careful with the hot comal.\"", "Abuela said \"be careful with the hot comal\".", "\"Abuela said, Be careful with the hot comal.\""], a: 1, why: "A comma after said, then quotation marks around Abuela's exact words." },
      { t: "mc", q: "Which sentence shows how the character feels?", opts: ["Lucas walked to school.", "Lucas had a backpack.", "The school is on a street.", "Lucas's hands shook because he was nervous about the spelling test."], a: 3, why: "Shaking hands and the word nervous show how Lucas feels." },
      { t: "mc", q: "A story is about losing and finding a dog named Chispa. Which is the best ending?", opts: ["I hugged Chispa and promised to always close the gate.", "The dog is brown.", "Once upon a time, I had a dog.", "Next, I looked under the bed."], a: 0, why: "It wraps up the story and tells what the character learned." },
      { t: "tf", q: "A narrative tells a story with events in order.", a: true, why: "Yes! A narrative has a beginning, middle, and end." },
      { t: "mc", q: "What do quotation marks show?", opts: ["a question", "the exact words someone says", "the end of a story", "a list of things"], a: 1, why: "Quotation marks go around the exact words a character says." },
      {
        t: "write",
        q: "Write a story about a special day with your family or friends.",
        say: "Write a story about a special day with your family or friends. Use sequence words. Add dialogue. Tell how you felt. Give your story an ending.",
        min: 35,
        frames: ["One day, ___.", "First, ___.", "Then, ___ said, \"___!\"", "I felt ___ because ___.", "Finally, ___."],
        checks: [
          { label: "Sequence words (first, next, then)", re: /\b(first|next|then|after that|later)\b/i },
          { label: "Dialogue in quotation marks", re: /["“”][^"“”]{2,}["“”]/ },
          { label: "A feeling (happy, nervous, proud...)", re: /\b(felt|feel|happy|sad|excited|scared|nervous|proud|mad|angry|surprised|worried|glad|feliz)\b/i },
          { label: "An ending (Finally, In the end...)", re: /\b(finally|in the end|at last|the end|from then on|I learned|I will never forget|that night)\b/i }
        ]
      }
    ]
  });
})();
