/* k3-reading.js : Grade 3 ELA reading activities (CA Common Core)
   Mrs. Pitts' 3rd Grade, Alpine Vista School, Tulare, CA
   All passages are original, except the Aesop fable, which is a retelling of a public-domain story.
   Format: see K3SPEC.md. Loaded after k3-engine.js. */

/* Small helpers for text-feature HTML (inline styles so they work inside a <p>). */
var K3R_H = function (t) {
  return '<span style="display:block;font-weight:800;font-size:1.15em;color:#5b2a86;margin:.2em 0">' + t + '</span>';
};

/* ============================ LITERATURE ============================ */

K3.add({
  id: "r-rl1-lost-book",
  subject: "reading",
  unit: "Reading Literature",
  title: "Ask and Answer: The Lost Library Book",
  standard: "RL.3.1",
  skill: "Ask and answer questions using details from the story",
  emoji: "📚",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p>Good readers <b>ask questions</b> while they read.</p><p>Who? What? Where? When? Why? How?</p>", say: "Good readers ask questions while they read. Who? What? Where? When? Why? How?" },
    { html: "<p>To answer, go <b>back to the story</b>.</p><p>Find the sentence that proves your answer. That is <b>text evidence</b>.</p>", say: "To answer, go back to the story. Find the sentence that proves your answer. That is text evidence." },
    { html: "<p>Use a sentence frame:</p><p><b>In the story it says...</b></p>", say: "Use a sentence frame. In the story it says." }
  ],
  passage: {
    title: "The Lost Library Book",
    pic: "",
    lexile: "Grade 3 level",
    text: [
      "On Monday morning, Sofía Ramírez could not find her library book. It was called <i>The Night Owl</i>, and it was due on Friday. She looked under her bed. She looked in her backpack. She even looked in the laundry basket. The book was not there.",
      "Sofía felt a knot in her stomach. Mrs. Pitts had told the class to take good care of library books. Sofía did not want to tell her teacher that the book was lost.",
      "At recess, Sofía told her friend Diego Herrera about the problem. Diego asked her where she read the book last. Sofía closed her eyes and thought hard. Then she remembered. She read it on Sunday at her abuela's house while they waited for the tamales to cook.",
      "After school, Sofía and her mom drove to Abuela's house. Abuela smiled and held up a book with an owl on the cover. \"You left this on my kitchen table, mija,\" she said. Sofía hugged the book. Then she hugged Abuela even tighter.",
      "On Tuesday, Sofía returned the book to the library three days early. She also made a new rule for herself. Every night before bed, her library book would go right back into her backpack."
    ]
  },
  qs: [
    { t: "mc", q: "Where did Sofía look FIRST for her book?", opts: ["In her backpack", "Under her bed", "At the library", "In the car"], a: 1,
      why: "The story says, \"She looked under her bed.\" That was the first place. Nice job going back to the text!" },
    { t: "mc", q: "Why did Sofía feel a knot in her stomach?", opts: ["She was worried because the book was lost.", "She was hungry for tamales.", "She was excited for recess.", "She was tired after school."], a: 0,
      why: "A knot in your stomach means you feel worried. Sofía did not want to tell her teacher the book was lost." },
    { t: "tap", q: "Tap the word that tells WHEN Sofía read the book last.", words: ["She", "read", "it", "on", "Sunday", "at", "her", "abuela's", "house."], a: [4],
      why: "\"Sunday\" tells when. \"At her abuela's house\" tells where." },
    { t: "mc", q: "Which sentence PROVES that Abuela had the book?", opts: ["She looked in her backpack.", "It was due on Friday.", "Sofía felt a knot in her stomach.", "Abuela smiled and held up a book with an owl on the cover."], a: 3,
      why: "Abuela held up the book with an owl on it. That is the text evidence!" },
    { t: "sort", q: "Can the story answer this question? Sort each question.", bins: ["The story answers it", "The story does not say"],
      items: [["What day was the book due?", 0], ["Where did Sofía leave the book?", 0], ["Who did Sofía tell at recess?", 0], ["What is Diego's favorite color?", 1], ["How old is Abuela?", 1]],
      why: "Some questions are answered in the story. For others, the story gives no clues. Always check the text!" },
    { t: "order", q: "Put the events in order.", items: ["Sofía cannot find her book.", "Sofía tells Diego at recess.", "Sofía remembers reading at Abuela's house.", "Abuela holds up the book.", "Sofía returns the book early."],
      why: "First the book was lost. Last, Sofía returned it early. Great retelling!" },
    { t: "tf", q: "True or false? Sofía returned the book late.", a: false,
      why: "False. The story says she returned it three days early." },
    { t: "mc", q: "What new rule did Sofía make?", opts: ["Read only at school.", "Put her library book in her backpack every night.", "Never visit Abuela.", "Never borrow books again."], a: 1,
      why: "The last paragraph tells her new rule: the book goes back in her backpack every night." },
    { t: "write", q: "How did Sofía find her book? Use details from the story.", min: 8,
      checks: [{ label: "Tells about Abuela or her house", re: /abuel|grand|house/i }, { label: "Uses a detail (Sunday, Diego, kitchen table, tamales, remembered)", re: /sunday|diego|table|kitchen|tamal|remember|thought/i }],
      frames: ["Sofía found her book because...", "In the story it says..."] }
  ]
});

K3.add({
  id: "r-rl2-ant-grasshopper",
  subject: "reading",
  unit: "Reading Literature",
  title: "Fable: The Ant and the Grasshopper",
  standard: "RL.3.2",
  skill: "Find the central message (lesson) of a fable",
  emoji: "🐜",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p>A <b>fable</b> is a short story that teaches a lesson.</p><p>Fables often have <b>animals</b> that talk and act like people.</p>", say: "A fable is a short story that teaches a lesson. Fables often have animals that talk and act like people." },
    { html: "<p>The lesson is called the <b>central message</b> or <b>moral</b>.</p>", say: "The lesson is called the central message, or moral." },
    { html: "<p>To find it, ask:</p><p>🤔 What did a character <b>learn</b>?</p><p>🤔 What does the author want <b>me</b> to learn?</p>", say: "To find it, ask: What did a character learn? What does the author want me to learn?" }
  ],
  passage: {
    title: "The Ant and the Grasshopper (an Aesop fable, retold)",
    pic: "",
    lexile: "Grade 3 level",
    text: [
      "One hot summer, a grasshopper hopped around a big green field. He sang songs all day long. He played his fiddle in the shade and took long naps in the tall grass.",
      "Near the grasshopper lived a little ant. The ant worked from sunrise to sunset. She carried seeds and grains of corn, one at a time, back to her home under the ground. Her back ached, but she kept working.",
      "\"Why work so hard?\" the grasshopper asked. \"Come and sing with me! There is plenty of food.\"",
      "\"I am saving food for winter,\" said the ant. \"You should save some too.\" The grasshopper just laughed and went back to his music.",
      "Soon the days grew short and cold. Frost covered the field, and all the green plants were gone. The grasshopper could not find a single seed to eat. He was cold, hungry, and scared.",
      "The grasshopper knocked on the ant's door. Inside, her home was warm and full of grain. The ant gave him a small bowl of seeds. \"Next summer, you must work too,\" she said kindly.",
      "The grasshopper nodded. He had learned his lesson. When summer came again, he sang while he worked, and he saved food for the winter."
    ]
  },
  qs: [
    { t: "mc", q: "What kind of story is this?", opts: ["A poem", "A fable", "A news story", "A recipe"], a: 1,
      why: "It is a fable. It is short, has talking animals, and teaches a lesson." },
    { t: "mc", q: "What did the ant do all summer?", opts: ["She slept in the shade.", "She sang songs.", "She gathered food and saved it.", "She played the fiddle."], a: 2,
      why: "The ant carried seeds and grains home to save for winter. Hard worker!" },
    { t: "sort", q: "Who did it? Sort each action.", bins: ["Ant", "Grasshopper"],
      items: [["carried seeds home", 0], ["played the fiddle", 1], ["took long naps", 1], ["saved food for winter", 0], ["laughed at the advice", 1], ["shared a bowl of seeds", 0]],
      why: "The ant worked and planned. The grasshopper played until winter came." },
    { t: "tf", q: "True or false? The grasshopper saved food during the first summer.", a: false,
      why: "False. He sang and napped. He had no food when winter came." },
    { t: "mc", q: "How did the grasshopper feel when winter came?", opts: ["Proud", "Cold, hungry, and scared", "Sleepy and happy", "Angry at the sun"], a: 1,
      why: "The story says he was cold, hungry, and scared. He had not planned ahead." },
    { t: "order", q: "Put the events in order.", items: ["The grasshopper sings all summer.", "The ant tells him to save food.", "Winter comes and the plants are gone.", "The grasshopper knocks on the ant's door.", "The grasshopper works and saves food the next summer."],
      why: "That is the whole fable from beginning to end. Super!" },
    { t: "mc", q: "What is the central message of this fable?", opts: ["Singing is always bad.", "Ants are bigger than grasshoppers.", "Winter is the best season.", "Work hard now so you are ready later."], a: 3,
      why: "The ant planned ahead, and the grasshopper learned to do the same. Work now, be ready later!" },
    { t: "mc", q: "Which detail BEST shows the central message?", opts: ["The ant's home was warm and full of grain when winter came.", "The grasshopper had a fiddle.", "The field was big and green.", "The ant's back ached."], a: 0,
      why: "The ant had food in winter because she worked in summer. That detail shows the lesson." },
    { t: "write", q: "What is the central message? How do you know? Use a detail from the fable.", min: 10,
      checks: [{ label: "Tells the lesson (work, plan, prepare, save)", re: /work|plan|prepar|ready|save|saving/i }, { label: "Uses a detail about the ant, grasshopper, food, or winter", re: /ant|grasshopper|food|winter|seed|grain|hungry/i }],
      frames: ["The central message is...", "I know because in the fable..."] }
  ]
});

K3.add({
  id: "r-rl3-goalie",
  subject: "reading",
  unit: "Reading Literature",
  title: "Character Traits: Mateo the Goalie",
  standard: "RL.3.3",
  skill: "Describe a character's traits, feelings, and actions",
  emoji: "⚽",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p>A <b>trait</b> is what a character is like <b>inside</b>, most of the time.</p><p>Examples: kind, brave, honest, hard-working.</p>", say: "A trait is what a character is like inside, most of the time. Examples: kind, brave, honest, hard-working." },
    { html: "<p>A <b>feeling</b> is how a character feels <b>right now</b>. Feelings change!</p><p>Examples: nervous, sad, proud.</p>", say: "A feeling is how a character feels right now. Feelings change! Examples: nervous, sad, proud." },
    { html: "<p>A character's <b>actions</b> show their traits.</p><p>Helping a friend shows the character is <b>kind</b>.</p>", say: "A character's actions show their traits. Helping a friend shows the character is kind." }
  ],
  passage: {
    title: "Mateo the Goalie",
    pic: "",
    lexile: "Grade 3 level",
    text: [
      "Mateo Ochoa was the goalie for the Tulare Tigers. On Saturday morning, the Tigers had a big game at the park. Mateo pulled on his green gloves. His hands were shaking, and his stomach felt full of butterflies.",
      "In the first half, a player on the other team kicked the ball hard. It flew past Mateo's fingers and into the net. Mateo kicked the grass. He felt upset with himself.",
      "At halftime, Coach Rivera knelt down next to him. \"Keep your eyes on the ball, not on the score,\" she said. Mateo nodded. He practiced three more saves before the second half began.",
      "In the second half, Lupita Vargas tripped and fell near the goal. When the ball rolled out of bounds, Mateo ran to help her up. \"Are you okay?\" he asked. Lupita smiled and jogged back to her spot.",
      "Then the Tigers scored two goals in a row. Now they were winning, 2 to 1. In the last minute, a player kicked the ball toward the corner of the net. Mateo kept his eyes on the ball. He dove as far as he could and caught it!",
      "The whistle blew. The Tigers had won! Mateo felt proud as he walked off the field. He gave Lupita a high five and thanked Coach Rivera for her advice."
    ]
  },
  qs: [
    { t: "sort", q: "Is it a trait or a feeling? Sort each word.", bins: ["Trait (what someone is like)", "Feeling (how someone feels now)"],
      items: [["kind", 0], ["hard-working", 0], ["honest", 0], ["nervous", 1], ["upset", 1], ["proud", 1]],
      why: "Traits stay the same most of the time. Feelings can change fast, like Mateo's did!" },
    { t: "mc", q: "How did Mateo feel BEFORE the game?", opts: ["Bored", "Nervous", "Angry", "Sleepy"], a: 1,
      why: "Shaking hands and butterflies in his stomach show Mateo was nervous." },
    { t: "tap", q: "Tap the word that tells how Mateo felt at the end.", words: ["Mateo", "felt", "proud", "as", "he", "walked", "off", "the", "field."], a: [2],
      why: "\"Proud\" is a feeling word. Mateo felt good about his hard work." },
    { t: "mc", q: "Which action shows that Mateo is KIND?", opts: ["He pulled on his gloves.", "He kicked the grass.", "He caught the ball.", "He helped Lupita up when she fell."], a: 3,
      why: "Helping a teammate who fell is a kind action." },
    { t: "mc", q: "Which word BEST describes Mateo?", opts: ["Lazy", "Bossy", "Determined", "Mean"], a: 2,
      why: "Mateo did not give up. He practiced and tried again. That is determined!" },
    { t: "tf", q: "True or false? Mateo gave up after the other team scored.", a: false,
      why: "False. He listened to his coach and practiced more saves." },
    { t: "order", q: "Put Mateo's feelings and actions in order.", items: ["Mateo feels nervous before the game.", "Mateo feels upset when the ball goes in.", "Mateo listens to Coach Rivera and practices.", "Mateo dives and catches the ball.", "Mateo feels proud after the game."],
      why: "Mateo's feelings changed from nervous to proud because of his actions." },
    { t: "mc", q: "What happened BECAUSE Mateo kept his eyes on the ball?", opts: ["He caught the last kick.", "He lost his gloves.", "The game was canceled.", "Lupita tripped."], a: 0,
      why: "He followed Coach Rivera's advice, so he made the big save." },
    { t: "write", q: "What is one trait that describes Mateo? Use an action from the story to prove it.", min: 10,
      checks: [{ label: "Names a trait", re: /kind|brave|determined|hard.?working|helpful|caring|never gives? up|good listener|friendly|nice/i }, { label: "Gives an action as proof", re: /because|when|helped|help|caught|practic|listen|dove|thank/i }],
      frames: ["Mateo is ___ because...", "In the story, Mateo..."] }
  ]
});

K3.add({
  id: "r-rl5-fog-poem-play",
  subject: "reading",
  unit: "Reading Literature",
  title: "Parts of Poems and Plays: Tule Fog Morning",
  standard: "RL.3.5",
  skill: "Use words like stanza, scene, and chapter to talk about parts of a text",
  emoji: "🌫️",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p>A <b>poem</b> is written in <b>lines</b>.</p><p>A group of lines is called a <b>stanza</b>. Stanzas are like paragraphs in a poem.</p>", say: "A poem is written in lines. A group of lines is called a stanza. Stanzas are like paragraphs in a poem." },
    { html: "<p>A <b>play</b> is split into <b>scenes</b>.</p><p>Each line starts with the <b>character's name</b>. <b>Stage directions</b> in ( ) tell actors what to do.</p>", say: "A play is split into scenes. Each line starts with the character's name. Stage directions in parentheses tell actors what to do." },
    { html: "<p>A long story is split into <b>chapters</b>.</p><p>Each part <b>builds on</b> the part before it.</p>", say: "A long story is split into chapters. Each part builds on the part before it." }
  ],
  passage: {
    title: "Tule Fog Morning: A Poem and a Play",
    pic: "",
    lexile: "Grade 3 level",
    text: [
      K3R_H("Part 1: Poem") + "<b>Stanza 1</b><br>The fog rolls in on quiet feet,<br>It hides the barn, it hides the street.<br>The orange trees are soft and gray,<br>The sun is sleeping late today.",
      "<b>Stanza 2</b><br>Our school bus creeps with lights aglow,<br>It hums along, so careful, slow.<br>I press my nose against the glass<br>And watch the misty fields go past.",
      "<b>Stanza 3</b><br>By lunch, the fog has slipped away,<br>The sun comes out to shine and play.<br>The valley wakes up green and bright.<br>Good-bye, gray fog, until tonight!",
      K3R_H("Part 2: Play") + "<b>Characters:</b> Rosa, Tomás, Ms. Johnson (the bus driver)<br><b>Scene 1: The Bus Stop</b><br><i>(Early morning. Thick fog covers the bus stop. Rosa and Tomás wait with their backpacks.)</i>",
      "<b>ROSA:</b> I cannot even see the stop sign!<br><b>TOMÁS:</b> <i>(squinting)</i> I hear the bus. It is coming very slowly.<br><b>MS. JOHNSON:</b> <i>(opening the door)</i> Good morning! Buckle up. We drive extra slowly in Tule fog.<br><b>ROSA:</b> <i>(smiling)</i> Then we will be the safest kids in Tulare!"
    ]
  },
  qs: [
    { t: "mc", q: "How many stanzas are in the poem?", opts: ["2", "3", "4", "12"], a: 1,
      why: "The poem has 3 stanzas. Each stanza has 4 lines." },
    { t: "mc", q: "What is a stanza?", opts: ["A group of lines in a poem", "A part of a chapter book", "A list of characters", "A stage direction"], a: 0,
      why: "A stanza is a group of lines in a poem, like a paragraph." },
    { t: "tap", q: "Tap the TWO words that rhyme.", words: ["The", "fog", "rolls", "in", "on", "quiet", "feet,", "It", "hides", "the", "barn,", "it", "hides", "the", "street."], a: [6, 14],
      why: "\"Feet\" and \"street\" rhyme. Many poems have rhyming lines." },
    { t: "sort", q: "Is it a part of a poem or a part of a play?", bins: ["Poem", "Play"],
      items: [["stanza", 0], ["rhyming lines", 0], ["scene", 1], ["stage directions", 1], ["character names before each line", 1]],
      why: "Poems have stanzas and lines. Plays have scenes, character names, and stage directions." },
    { t: "mc", q: "In the play, what are the words in ( ) called?", opts: ["Chapters", "Stanzas", "Titles", "Stage directions"], a: 3,
      why: "Stage directions tell actors how to move or act, like \"squinting\" or \"smiling.\"" },
    { t: "mc", q: "What does Stanza 3 tell about?", opts: ["The fog rolling in", "The bus ride", "The fog leaving and the sun coming out", "The bus driver"], a: 2,
      why: "In Stanza 3, the fog slips away and the sun comes out." },
    { t: "order", q: "Put the stanzas in order. What happens in each one?", items: ["The fog hides the barn and the orange trees.", "The bus drives slowly through the misty fields.", "The fog goes away and the sun comes out."],
      why: "Each stanza builds on the one before it, from morning fog to sunny lunch." },
    { t: "tf", q: "True or false? A chapter is one part of a longer story, like a chapter book.", a: true,
      why: "True! Chapters split a long story into parts." },
    { t: "write", q: "How does Stanza 2 build on Stanza 1? Use details from the poem.", min: 10,
      checks: [{ label: "Tells about the bus ride", re: /bus|ride|school|glass|window/i }, { label: "Connects to the fog", re: /fog|slow|mist|gray|grey/i }],
      frames: ["Stanza 1 tells about...", "Then Stanza 2 tells..."] }
  ]
});

K3.add({
  id: "r-rl6-orange-tree",
  subject: "reading",
  unit: "Reading Literature",
  title: "Point of View: The Orange Tree Trouble",
  standard: "RL.3.6",
  skill: "Tell my own point of view and the narrator's or characters' point of view",
  emoji: "🍊",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p>The <b>narrator</b> is the one telling the story.</p><p><b>First person:</b> the narrator is IN the story. Look for <b>I, me, my, we</b>.</p>", say: "The narrator is the one telling the story. First person: the narrator is in the story. Look for I, me, my, we." },
    { html: "<p><b>Third person:</b> the narrator tells about others. Look for <b>he, she, they</b> and names.</p>", say: "Third person: the narrator tells about others. Look for he, she, they, and names." },
    { html: "<p><b>Point of view</b> is what someone thinks or feels about what happened.</p><p>Your point of view can be different from a character's!</p>", say: "Point of view is what someone thinks or feels about what happened. Your point of view can be different from a character's." }
  ],
  passage: {
    title: "The Orange Tree Trouble",
    pic: "",
    lexile: "Grade 3 level",
    text: [
      K3R_H("Part 1: Daniela's Side") + "My name is Daniela Cruz, and I have the best job in my family. I take care of the little orange tree in our backyard. Every day after school, I water it with my green watering can. Last week, I counted six tiny green oranges on the branches. I was so proud.",
      "Then on Saturday, I saw something terrible. Two of my oranges were on the ground! My little brother, Beto, was standing near the tree with his soccer ball. I was sure he kicked the ball into my tree. I put my hands on my hips and frowned at him.",
      K3R_H("Part 2: Beto's Side") + "Beto was only six, but he knew he did not hurt the tree. He had been practicing his kicks by the fence, far away from the orange tree. Then he saw a gray squirrel jump onto a branch. The branch shook, and two green oranges dropped to the grass.",
      "Beto ran over to look. That is when Daniela came outside and frowned at him. Beto felt his cheeks get hot. He pointed up and said it was a squirrel.",
      "Daniela looked up. The squirrel was still sitting in her tree, sniffing a leaf. Daniela laughed and told Beto she was sorry. Together, they made a sign for the tree. It said, NO SQUIRRELS ALLOWED!"
    ]
  },
  qs: [
    { t: "mc", q: "Who is the narrator of Part 1?", opts: ["Beto", "Daniela", "The squirrel", "Mom"], a: 1,
      why: "Daniela says, \"My name is Daniela Cruz.\" She tells Part 1 using I and my." },
    { t: "tap", q: "Tap the words that show Part 1 is told in FIRST person.", words: ["I", "take", "care", "of", "the", "little", "orange", "tree", "in", "our", "backyard."], a: [0, 9],
      why: "\"I\" and \"our\" are first-person words. The narrator is in the story." },
    { t: "sort", q: "First person or third person? Sort each sentence.", bins: ["First person", "Third person"],
      items: [["I was so proud.", 0], ["My little brother was there.", 0], ["We made a sign.", 0], ["Beto felt his cheeks get hot.", 1], ["He practiced his kicks.", 1], ["She laughed.", 1]],
      why: "I, my, and we mean first person. He, she, and names mean third person." },
    { t: "mc", q: "In Part 1, what does Daniela THINK happened?", opts: ["A squirrel shook the tree.", "The wind blew the oranges down.", "Beto kicked his ball into the tree.", "Mom picked the oranges."], a: 2,
      why: "Daniela saw Beto with his ball, so she thought he kicked it into her tree." },
    { t: "mc", q: "What REALLY made the oranges fall?", opts: ["Beto's soccer ball", "Daniela's watering can", "A rainstorm", "A squirrel on the branch"], a: 3,
      why: "Part 2 tells us a squirrel jumped on the branch and shook the oranges down." },
    { t: "tf", q: "True or false? At the start, Daniela and Beto had the same point of view.", a: false,
      why: "False. Daniela blamed Beto, but Beto knew it was the squirrel." },
    { t: "mc", q: "Why is Part 2 important?", opts: ["It shows what Beto saw, so we learn the truth.", "It is longer than Part 1.", "It tells how to water a tree.", "It has more oranges."], a: 0,
      why: "Part 2 shows Beto's point of view. Now we know what really happened!" },
    { t: "write", q: "Was Daniela fair to Beto? Tell YOUR point of view and give a reason.", min: 10,
      checks: [{ label: "Tells your opinion", re: /i think|i believe|my opinion|i feel|yes|no|was not|wasn't|was fair|not fair|unfair/i }, { label: "Gives a reason", re: /because|since|so |didn't|did not|squirrel|sorry/i }],
      frames: ["I think Daniela was ___ because...", "In my opinion..."] }
  ]
});

K3.add({
  id: "r-l5-rainy-recess",
  subject: "reading",
  unit: "Word Study",
  title: "Literal or Nonliteral? A Rainy Day at Recess",
  standard: "L.3.5",
  skill: "Tell literal from nonliteral words, find shades of meaning, and connect words to real life",
  emoji: "🌧️",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p><b>Literal</b> words mean exactly what they say.</p><p>\"Water poured off the roof.\" 💧 It really did!</p>", say: "Literal words mean exactly what they say. Water poured off the roof. It really did!" },
    { html: "<p><b>Nonliteral</b> words paint a picture. They do NOT mean exactly what they say.</p><p>\"It is raining cats and dogs.\" 🐱🐶 No pets fall from the sky! It means it is raining very hard.</p>", say: "Nonliteral words paint a picture. They do not mean exactly what they say. It is raining cats and dogs. No pets fall from the sky! It means it is raining very hard." },
    { html: "<p><b>Shades of meaning:</b> some words are close, but a little stronger.</p><p>drizzle ➜ rain ➜ downpour</p>", say: "Shades of meaning: some words are close, but a little stronger. Drizzle, rain, downpour." }
  ],
  passage: {
    title: "A Rainy Day at Recess",
    pic: "",
    lexile: "Grade 3 level",
    text: [
      "On Thursday morning, the sky over Tulare was dark and gray. By lunch, it was raining cats and dogs. Water poured off the roof and made a giant puddle on the blacktop. It was going to be indoor recess.",
      "Isabel Torres groaned. She loved to run and play tag. \"I have ants in my pants,\" she said. She bounced in her chair and could not sit still.",
      "Mrs. Pitts pulled out a box of board games. Across the room, a new student named Arjun Singh sat alone by the window. Isabel remembered her first day at a new school. She wanted to break the ice.",
      "Isabel walked over and asked Arjun if he wanted to play checkers. Arjun's face lit up. They played three games, and Arjun won every single one. \"You are a checkers champion!\" Isabel laughed.",
      "When the lunch bell rang, Isabel was so hungry she could eat a horse. She ate every bite of her bean and cheese burrito. Outside, the downpour slowed to a light drizzle. Isabel and Arjun walked out together, already good friends."
    ]
  },
  qs: [
    { t: "mc", q: "What does \"raining cats and dogs\" mean?", opts: ["Pets are falling from the sky.", "It is raining very hard.", "Cats and dogs are playing outside.", "It is raining a tiny bit."], a: 1,
      why: "It is a nonliteral phrase. It means it is raining very hard." },
    { t: "sort", q: "Literal or nonliteral? Sort each phrase.", bins: ["Literal (really happened)", "Nonliteral (paints a picture)"],
      items: [["Water poured off the roof.", 0], ["They played three games.", 0], ["She ate every bite of her burrito.", 0], ["I have ants in my pants.", 1], ["Arjun's face lit up.", 1], ["so hungry she could eat a horse", 1]],
      why: "Literal words mean exactly what they say. Nonliteral words paint a picture." },
    { t: "mc", q: "Isabel wanted to \"break the ice.\" What does that mean?", opts: ["Crack some ice cubes", "Go ice skating", "Start a friendly talk so a new person feels comfortable", "Fix the freezer"], a: 2,
      why: "To break the ice means to start talking so someone feels comfortable. Isabel was being friendly!" },
    { t: "tap", q: "Tap the TWO words that make a nonliteral phrase.", words: ["Arjun's", "face", "lit", "up", "when", "Isabel", "asked."], a: [2, 3],
      why: "His face did not really glow like a light. \"Lit up\" means he looked very happy." },
    { t: "order", q: "Shades of meaning: put the rain words from softest to strongest.", items: ["drizzle", "rain", "downpour"],
      why: "A drizzle is light. A downpour is very heavy rain." },
    { t: "mc", q: "Which word shows Arjun was the MOST happy?", opts: ["Okay", "Fine", "Glad", "Thrilled"], a: 3,
      why: "\"Thrilled\" is the strongest. It means very, very happy." },
    { t: "mc", q: "Real life: Isabel was friendly to a new student. Which is another friendly action at school?", opts: ["Sitting with someone who is alone at lunch", "Cutting in line", "Hiding the ball at recess", "Laughing at a mistake"], a: 0,
      why: "Sitting with someone who is alone is a kind, friendly thing to do." },
    { t: "tf", q: "True or false? Isabel really ate a horse.", a: false,
      why: "False! \"Could eat a horse\" is nonliteral. It means she was very hungry." },
    { t: "write", q: "Tell about a time you had \"ants in your pants\" or were \"so hungry you could eat a horse.\" What does the phrase really mean?", min: 10,
      checks: [{ label: "Tells the real meaning", re: /hungry|still|wiggl|excited|sit|bounc|move|full of energy|energy/i }, { label: "Tells about your own life", re: /\b(i|my|me)\b/i }],
      frames: ["One time I...", "This phrase really means..."] }
  ]
});

/* ============================ INFORMATIONAL ============================ */

K3.add({
  id: "r-ri2-dairy-cows",
  subject: "reading",
  unit: "Informational Text",
  title: "Main Idea: Dairy Cows of Tulare County",
  standard: "RI.3.2",
  skill: "Find the main idea and key details, and prove answers with the text",
  emoji: "🐄",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p>The <b>main idea</b> is what the text is MOSTLY about.</p><p>🏠 Think of it as the roof of a house.</p>", say: "The main idea is what the text is mostly about. Think of it as the roof of a house." },
    { html: "<p><b>Key details</b> hold up the main idea, like walls hold up a roof.</p><p>Each paragraph has its own little main idea too.</p>", say: "Key details hold up the main idea, like walls hold up a roof. Each paragraph has its own little main idea too." },
    { html: "<p>Prove it! Point to the sentence in the text. That is <b>text evidence</b>.</p>", say: "Prove it! Point to the sentence in the text. That is text evidence." }
  ],
  passage: {
    title: "Dairy Cows of Tulare County",
    pic: "",
    lexile: "Grade 3 level",
    text: [
      "Drive down almost any country road near Tulare, and you will probably see dairy cows. Tulare County is one of the top milk-making counties in the whole United States. Milk is the biggest farm product in the county. Every February, people from all over the world come to Tulare for the World Ag Expo, a giant farm show.",
      "Dairy cows have big appetites. A cow eats a mix of hay, corn, and other feed. Some farmers even feed their cows almond hulls, the soft outside part of the almond. A dairy cow can drink about 30 to 50 gallons of water a day. That is like drinking a whole bathtub of water!",
      "Dairy farmers work every single day, even on holidays. Most cows are milked two or three times a day. Today, many farms use milking machines. The machines gently pull the milk from the cow and send it through tubes into a big, cold tank.",
      "Next, a tanker truck picks up the cold milk and drives it to a plant. There, the milk is heated to kill germs and then packed. Some of it is made into cheese, butter, yogurt, and ice cream. So the next time you eat a cheese quesadilla, thank a dairy cow and a hard-working dairy farmer!"
    ]
  },
  qs: [
    { t: "mc", q: "What is the main idea of the WHOLE passage?", opts: ["Cows like to eat almonds.", "Tulare County makes lots of milk, and it takes hard work to get it from the cow to you.", "Ice cream is a cold treat.", "Tanker trucks are very big."], a: 1,
      why: "The whole passage is about dairy cows in Tulare County and how milk gets to us. The other choices are just small details." },
    { t: "mc", q: "What is the main idea of paragraph 2?", opts: ["Dairy cows eat and drink a lot.", "Milking machines use tubes.", "Trucks take milk to a plant.", "People visit the World Ag Expo."], a: 0,
      why: "Paragraph 2 starts with \"Dairy cows have big appetites.\" All the details are about food and water." },
    { t: "sort", q: "Sort each key detail by its topic.", bins: ["Food and water", "Milking", "From farm to store"],
      items: [["hay and corn", 0], ["almond hulls", 0], ["a bathtub of water", 0], ["milking machines", 1], ["two or three times a day", 1], ["tanker truck", 2], ["heated to kill germs", 2], ["made into cheese and yogurt", 2]],
      why: "Key details group together under each paragraph's main idea." },
    { t: "mc", q: "Which sentence PROVES that cows drink a lot?", opts: ["Some farmers feed their cows almond hulls.", "Most cows are milked two or three times a day.", "A dairy cow can drink about 30 to 50 gallons of water a day.", "Milk is the biggest farm product in the county."], a: 2,
      why: "30 to 50 gallons is a lot of water! That sentence is the evidence." },
    { t: "tf", q: "True or false? Dairy farmers take holidays off from milking.", a: false,
      why: "False. The text says dairy farmers work every single day, even on holidays." },
    { t: "tap", q: "Tap the foods made from milk.", words: ["Some", "of", "it", "is", "made", "into", "cheese,", "butter,", "yogurt,", "and", "ice", "cream."], a: [6, 7, 8, 10, 11],
      why: "Cheese, butter, yogurt, and ice cream all come from milk. Yum!" },
    { t: "mc", q: "In paragraph 2, what are almond hulls?", opts: ["A kind of milk", "A cow's bed", "A tractor part", "The soft outside part of the almond"], a: 3,
      why: "The sentence tells you right after the comma: the soft outside part of the almond." },
    { t: "order", q: "Put the milk's trip in order.", items: ["The cow eats and drinks.", "A machine milks the cow.", "The milk goes into a cold tank.", "A tanker truck drives it to a plant.", "The milk is heated, packed, and made into foods."],
      why: "From cow to quesadilla! You followed the steps in order." },
    { t: "write", q: "What is the main idea of this passage? Give TWO key details that support it.", min: 12,
      checks: [{ label: "Tells the main idea (milk, dairy, cows)", re: /milk|dairy|cow/i }, { label: "Gives a key detail", re: /feed|eat|drink|water|machine|truck|cheese|milked|tank|hay|holiday|expo/i }],
      frames: ["The main idea is...", "One key detail is...", "Another key detail is..."] }
  ]
});

K3.add({
  id: "r-ri3-snowpack",
  subject: "reading",
  unit: "Informational Text",
  title: "Cause and Effect: From Mountain Snow to Valley Water",
  standard: "RI.3.3",
  skill: "Explain steps in order and tell causes and effects",
  emoji: "🏔️",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p><b>Sequence</b> means the order things happen.</p><p>Signal words: <b>first, next, then, finally</b>.</p>", say: "Sequence means the order things happen. Signal words: first, next, then, finally." },
    { html: "<p>A <b>cause</b> is WHY something happens.</p><p>An <b>effect</b> is WHAT happens.</p><p>☀️ The sun is warm (cause), so the snow melts (effect).</p>", say: "A cause is why something happens. An effect is what happens. The sun is warm, so the snow melts." },
    { html: "<p>Cause and effect signal words: <b>because, so, when</b>.</p>", say: "Cause and effect signal words: because, so, when." }
  ],
  passage: {
    title: "From Mountain Snow to Valley Water",
    pic: "",
    lexile: "Grade 3 level",
    text: [
      "Look east from Tulare on a clear winter day, and you might see white mountain tops. Those are the Sierra Nevada mountains. In winter, storms drop snow on the high peaks. Layer after layer of snow piles up. This deep, packed snow is called the snowpack.",
      "The snowpack is like a giant frozen water tank. All winter long, it stores water high in the mountains. Each spring, scientists measure how deep the snow is and how much water it holds. This helps them guess how much water California will have that year.",
      "When spring comes, the days get longer and warmer. Because of the warm sun, the snow begins to melt. First, the melting snow trickles into little streams. Next, the streams flow into rivers, like the Kaweah River and the Tule River. Then, the rivers carry the water down to lakes called reservoirs, such as Lake Kaweah. Finally, the water travels through canals to farms and towns in the valley.",
      "Farmers use this water to grow oranges, grapes, and corn for cows. In an average year, almost one-third of California's water comes from the Sierra Nevada snowpack. When winter brings lots of snow, there is more water for the valley. When winter brings very little snow, there can be a drought. That is why people in the Central Valley cheer for big snowstorms in the mountains!"
    ]
  },
  qs: [
    { t: "order", q: "Put the water's trip in order.", items: ["Snow piles up in the mountains in winter.", "The warm spring sun melts the snow.", "Melting snow trickles into streams.", "Rivers carry the water to reservoirs.", "Canals bring the water to farms and towns."],
      why: "First, next, then, finally! The water travels from the mountains to the valley." },
    { t: "mc", q: "CAUSE: Why does the snow begin to melt?", opts: ["Farmers dig it up.", "The spring sun is warm.", "The rivers get bigger.", "Scientists measure it."], a: 1,
      why: "The text says, \"Because of the warm sun, the snow begins to melt.\"" },
    { t: "tap", q: "Tap the TWO signal words that show order.", words: ["First,", "the", "melting", "snow", "trickles", "into", "streams.", "Next,", "the", "streams", "flow", "into", "rivers."], a: [0, 7],
      why: "\"First\" and \"Next\" are sequence signal words." },
    { t: "mc", q: "EFFECT: What can happen when winter brings very little snow?", opts: ["More oranges grow.", "Summers get colder.", "There can be a drought.", "The rivers get bigger."], a: 2,
      why: "Less snow means less water, so there can be a drought." },
    { t: "tf", q: "True or false? The snowpack stores water all winter long.", a: true,
      why: "True! It is like a giant frozen water tank." },
    { t: "mc", q: "Why do scientists measure the snowpack each spring?", opts: ["To guess how much water California will have", "To build snowmen", "To find bears", "To make the snow melt"], a: 0,
      why: "Measuring the snow helps them guess how much water there will be that year." },
    { t: "sort", q: "When does it happen? Sort each event.", bins: ["Winter", "Spring"],
      items: [["Storms drop snow on the peaks.", 0], ["Layers of snow pile up.", 0], ["Days get longer and warmer.", 1], ["The snow melts.", 1], ["Streams fill with melted snow.", 1]],
      why: "Snow piles up in winter. It melts in spring when the days warm up." },
    { t: "mc", q: "What happens BECAUSE winter brings lots of snow?", opts: ["Schools close for the summer.", "There is a drought.", "The mountains get smaller.", "There is more water for the valley."], a: 3,
      why: "More snow means more water melts in spring. That is why people cheer for snowstorms!" },
    { t: "write", q: "Explain how snow in the mountains becomes water for a farm in Tulare. Use the words first, next, and then.", min: 15,
      checks: [{ label: "Uses \"first\"", re: /first/i }, { label: "Uses \"next\" or \"then\"", re: /next|then|finally/i }, { label: "Tells that the snow melts", re: /melt/i }],
      frames: ["First, the snow...", "Next, ...", "Then, ..."] }
  ]
});

K3.add({
  id: "r-l4-monarchs",
  subject: "reading",
  unit: "Word Study",
  title: "Context Clues: The Monarch's Amazing Trip",
  standard: "L.3.4",
  skill: "Use context clues and root words to figure out new words",
  emoji: "🦋",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p>Stuck on a word? Look for <b>context clues</b> in the words around it.</p><p>Look after a comma, or after the word <b>or</b>.</p>", say: "Stuck on a word? Look for context clues in the words around it. Look after a comma, or after the word or." },
    { html: "<p>Example: The egg hatches into a <b>larva</b>, or caterpillar.</p><p>The clue tells you: a larva is a caterpillar!</p>", say: "Example: The egg hatches into a larva, or caterpillar. The clue tells you a larva is a caterpillar." },
    { html: "<p>A <b>root word</b> is the main part of a word.</p><p><b>help</b> ➜ help<b>ful</b>, help<b>er</b>. If you know the root, you can figure out the new word.</p>", say: "A root word is the main part of a word. Help. Helpful. Helper. If you know the root, you can figure out the new word." }
  ],
  passage: {
    title: "The Monarch's Amazing Trip",
    pic: "",
    lexile: "Grade 3 level",
    text: [
      "Monarch butterflies are easy to spot because of their bright orange and black wings. Those bright colors send a warning to birds. Monarchs taste bad, and they can make a bird sick. The colors seem to say, \"Do not eat me!\"",
      "A monarch starts life as a tiny egg on a milkweed leaf. The egg hatches into a larva, or caterpillar. The caterpillar is a picky eater. It eats only milkweed leaves. Milkweed has a poison in it, but the poison does not hurt the caterpillar. Instead, the poison stays in its body. That is why monarchs taste bad to predators, animals that hunt other animals for food.",
      "After about two weeks, the caterpillar forms a chrysalis, a hard green case. Inside, it changes into a butterfly.",
      "Western monarchs do something amazing. Each fall, they migrate, or travel a long way, to the coast of California. Some fly hundreds of miles. They gather in groves of trees in towns like Pacific Grove and Santa Cruz. There, thousands of butterflies roost together. They hang in big clumps on the branches to rest and stay warm through the winter.",
      "In spring, the monarchs fly inland again, and some pass through the Central Valley. They sip nectar, the sweet juice inside flowers, to get energy. You can help monarchs by planting native milkweed and flowers. Then your yard can be a rest stop on their long trip!"
    ]
  },
  qs: [
    { t: "mc", q: "What does \"migrate\" mean?", opts: ["To sleep all day", "To travel a long way", "To eat leaves", "To change color"], a: 1,
      why: "The clue comes right after: \"migrate, or travel a long way.\"" },
    { t: "mc", q: "What is a larva?", opts: ["An egg", "A flower", "A caterpillar", "A bird"], a: 2,
      why: "The text says \"a larva, or caterpillar.\" The word \"or\" was your clue!" },
    { t: "tap", q: "Tap the TWO words that tell what nectar is.", words: ["They", "sip", "nectar,", "the", "sweet", "juice", "inside", "flowers."], a: [4, 5],
      why: "Nectar is the sweet juice inside flowers. The clue came after the comma." },
    { t: "mc", q: "What are predators?", opts: ["Animals that hunt other animals for food", "Plants that grow by the coast", "Butterfly eggs", "Sweet flowers"], a: 0,
      why: "The meaning comes right after the comma: animals that hunt other animals for food." },
    { t: "mc", q: "Read paragraph 4. What does \"roost\" mean?", opts: ["Fly very fast", "Lay eggs", "Sip nectar", "Rest together on branches"], a: 3,
      why: "The next sentence explains it: they hang in clumps on branches to rest." },
    { t: "sort", q: "Root words: sort each word by its root.", bins: ["play", "help", "color"],
      items: [["playful", 0], ["replay", 0], ["helpful", 1], ["helper", 1], ["colorful", 2], ["colorless", 2]],
      why: "Find the main word inside each bigger word. That is the root!" },
    { t: "mc", q: "\"Migrate\" means to travel a long way. So what is a \"migration\"?", opts: ["A short nap", "A long trip", "A tiny egg", "A kind of flower"], a: 1,
      why: "Migration has the same root as migrate. It is a long trip!" },
    { t: "tf", q: "True or false? In this passage, a chrysalis is a hard green case.", a: true,
      why: "True! The words after the comma tell you what a chrysalis is." },
    { t: "write", q: "Pick a word: migrate, predator, or nectar. What does it mean? What clue in the passage helped you?", min: 10,
      checks: [{ label: "Names one of the words", re: /migrat|predator|nectar/i }, { label: "Tells the meaning or clue", re: /mean|clue|travel|hunt|juice|sweet|comma|\bor\b/i }],
      frames: ["The word ___ means...", "The clue that helped me was..."] }
  ]
});

K3.add({
  id: "r-ri5-oranges",
  subject: "reading",
  unit: "Informational Text",
  title: "Text Features: Growing Oranges",
  standard: "RI.3.5",
  skill: "Use headings, captions, bold words, and a glossary to find facts fast",
  emoji: "🍊",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p><b>Text features</b> help you find information fast.</p><p>📌 A <b>heading</b> tells what a section is about.</p>", say: "Text features help you find information fast. A heading tells what a section is about." },
    { html: "<p>🖼️ A <b>caption</b> tells about a picture.</p><p><b>Bold words</b> are dark. They are important words.</p>", say: "A caption tells about a picture. Bold words are dark. They are important words." },
    { html: "<p>📖 A <b>glossary</b> is a mini dictionary. It gives the meanings of bold words. It is often at the end.</p>", say: "A glossary is a mini dictionary. It gives the meanings of bold words. It is often at the end." }
  ],
  passage: {
    title: "Growing Oranges in Tulare County",
    pic: '<div style="text-align:center;margin:.5em 0"><div style="font-size:3em;line-height:1.2">🌳🍊🌳🍊🌳</div><div style="font-size:.95em;font-style:italic;background:#efe6fb;border-radius:10px;padding:.4em .7em;display:inline-block">Caption: Navel oranges get their name from the little bump on the bottom. It looks like a belly button, or navel!</div></div>',
    lexile: "Grade 3 level",
    text: [
      K3R_H("Sunny Valley, Sweet Fruit") + "Tulare County is one of the top places in the United States for growing oranges. Orange trees love the long, hot, sunny days in the Central Valley. Farmers plant the trees in long, straight rows. A big field of orange trees is called a <b>grove</b>.",
      K3R_H("From Flower to Fruit") + "In spring, orange trees are covered with small white flowers called <b>blossoms</b>. They smell so sweet that you can smell them from the road! After the petals fall, tiny green oranges begin to grow. All summer, the fruit slowly gets bigger. Later, it turns orange.",
      K3R_H("Watch Out for Frost!") + "Orange trees do not like freezing cold. A hard <b>frost</b> can hurt the fruit. On very cold winter nights, farmers turn on tall <b>wind machines</b>. These giant fans pull warmer air from higher up down to the trees. Farmers also water the ground, because wet soil holds heat better than dry soil.",
      K3R_H("Picking Time") + "Navel oranges are picked from late fall to spring. Workers climb ladders and use clippers to cut each orange from the branch. The oranges go to a packing house, where they are washed, sorted, and packed into boxes.",
      '<span style="display:block;border:3px solid #8a4fd8;border-radius:12px;padding:.5em .8em;background:#efe6fb"><b style="color:#5b2a86">📖 Glossary</b><br><b>blossom</b>: a flower on a fruit tree<br><b>frost</b>: a thin layer of ice that forms when it is very cold<br><b>grove</b>: a group of fruit trees planted together<br><b>wind machine</b>: a tall fan that moves warmer air down to the trees</span>'
    ]
  },
  qs: [
    { t: "mc", q: "Which heading helps you learn how farmers protect trees from the cold?", opts: ["Sunny Valley, Sweet Fruit", "From Flower to Fruit", "Watch Out for Frost!", "Picking Time"], a: 2,
      why: "\"Watch Out for Frost!\" is the section about cold nights and wind machines." },
    { t: "mc", q: "Where can you QUICKLY find the meaning of \"frost\"?", opts: ["In the caption", "In the glossary", "In the title", "Under the heading \"Picking Time\""], a: 1,
      why: "The glossary gives the meanings of the bold words." },
    { t: "mc", q: "What does the caption tell you?", opts: ["How navel oranges got their name", "When oranges are picked", "How wind machines work", "Where the packing house is"], a: 0,
      why: "The caption explains that navel oranges have a bump that looks like a belly button." },
    { t: "sort", q: "Which text feature is it?", bins: ["Heading", "Caption", "Glossary", "Bold word"],
      items: [["Tells what a section is about", 0], ["Watch Out for Frost!", 0], ["Tells about a picture", 1], ["A mini dictionary at the end", 2], ["An important word in dark letters", 3]],
      why: "Each text feature has its own job. You know them all!" },
    { t: "tap", q: "Tap the words that are in the glossary.", words: ["blossom", "farmer", "frost", "ladder", "grove", "truck"], a: [0, 2, 4],
      why: "Blossom, frost, and grove are bold words, so they are in the glossary." },
    { t: "tf", q: "True or false? A heading tells what a section is mostly about.", a: true,
      why: "True! Headings are like signs that tell you what is coming." },
    { t: "mc", q: "Under which heading would you read about ladders and clippers?", opts: ["Sunny Valley, Sweet Fruit", "From Flower to Fruit", "Watch Out for Frost!", "Picking Time"], a: 3,
      why: "Workers use ladders and clippers at picking time." },
    { t: "order", q: "Put the headings in the order they come in the passage.", items: ["Sunny Valley, Sweet Fruit", "From Flower to Fruit", "Watch Out for Frost!", "Picking Time"],
      why: "Headings help you see how the whole text is set up." },
    { t: "write", q: "Pick one text feature from this passage. How did it help you?", min: 10,
      checks: [{ label: "Names a text feature", re: /heading|caption|glossary|bold/i }, { label: "Tells how it helped", re: /help|found|find|learn|tell|show|mean/i }],
      frames: ["The ___ helped me because...", "I used the ___ to find..."] }
  ]
});

K3.add({
  id: "r-ri8-giant-trees",
  subject: "reading",
  unit: "Informational Text",
  title: "Compare and Contrast: Two Giant Trees",
  standard: "RI.3.8",
  skill: "Tell how sentences and paragraphs connect (compare, contrast, and order)",
  emoji: "🌲",
  mins: 15,
  pass: 80,
  learn: [
    { html: "<p>Authors connect ideas in different ways.</p><p><b>Compare:</b> how things are alike. Signal words: <b>both, also, same</b>.</p>", say: "Authors connect ideas in different ways. Compare: how things are alike. Signal words: both, also, same." },
    { html: "<p><b>Contrast:</b> how things are different. Signal words: <b>but, different, however</b>.</p>", say: "Contrast: how things are different. Signal words: but, different, however." },
    { html: "<p><b>Sequence:</b> steps in order. Signal words: <b>first, next, then, finally</b>.</p>", say: "Sequence: steps in order. Signal words: first, next, then, finally." }
  ],
  passage: {
    title: "Two Giant Trees",
    pic: "",
    lexile: "Grade 3 level",
    text: [
      "California is home to two kinds of giant trees, the giant sequoia and the coast redwood. They are cousins, so they are alike in some ways. But they are also very different.",
      "Both trees are huge, and both can live a very long time. Some are more than 2,000 years old! Both trees have thick, reddish brown bark. The bark is soft and spongy, and it helps protect the trees from fire and bugs.",
      "The giant sequoia grows high in the Sierra Nevada mountains. You can visit them in Sequoia National Park, right here in Tulare County. Giant sequoias are the biggest trees on Earth. A sequoia called the General Sherman Tree has more wood than any other tree in the world. It would take more than twenty third graders holding hands to circle its trunk!",
      "The coast redwood grows near the ocean in Northern California, where cool fog drifts in from the sea. The fog helps give the trees water. Coast redwoods are not as wide as sequoias, but they are taller. In fact, they are the tallest trees in the world.",
      "How does a giant sequoia begin? First, a small forest fire heats the sequoia's cones. Next, the cones open and drop tiny seeds on the ground. Then, the seeds sprout in the ashy soil, where there is plenty of sunlight. Finally, after hundreds of years, a tiny seedling can grow into a giant."
    ]
  },
  qs: [
    { t: "sort", q: "Which tree is it? Sort each fact.", bins: ["Giant sequoia", "Coast redwood", "Both"],
      items: [["grows in the Sierra Nevada", 0], ["biggest tree on Earth", 0], ["fire helps its cones open", 0], ["grows near the ocean", 1], ["gets water from fog", 1], ["tallest tree in the world", 1], ["thick, reddish brown bark", 2], ["can live over 2,000 years", 2]],
      why: "Some facts are only about one tree. Some facts are true for both. That is compare and contrast!" },
    { t: "mc", q: "Which word in paragraph 2 shows that the trees are ALIKE?", opts: ["Both", "But", "Finally", "Taller"], a: 0,
      why: "\"Both\" tells you the trees share something. It is a compare word." },
    { t: "tap", q: "Tap the word that shows a DIFFERENCE.", words: ["Coast", "redwoods", "are", "not", "as", "wide", "as", "sequoias,", "but", "they", "are", "taller."], a: [8],
      why: "\"But\" is a contrast word. It shows how the trees are different." },
    { t: "mc", q: "How are paragraphs 3 and 4 connected?", opts: ["Both tell how seeds sprout.", "Paragraph 4 is a list of steps.", "Paragraph 3 tells about sequoias, and paragraph 4 tells about redwoods, so you can compare them.", "They are not connected."], a: 2,
      why: "The author describes one tree, then the other. That helps you compare!" },
    { t: "order", q: "Put the steps in order. How does a giant sequoia begin?", items: ["A small fire heats the cones.", "The cones open and drop seeds.", "The seeds sprout in the ashy soil.", "A seedling grows into a giant."],
      why: "First, next, then, finally. You followed the sequence!" },
    { t: "mc", q: "What happens right AFTER the fire heats the cones?", opts: ["The seedling becomes a giant.", "The seeds sprout.", "Fog rolls in.", "The cones open and drop seeds."], a: 3,
      why: "The word \"Next\" tells you the cones open and drop seeds." },
    { t: "tf", q: "True or false? Coast redwoods are the tallest trees in the world.", a: true,
      why: "True! Redwoods are the tallest. Sequoias are the biggest." },
    { t: "write", q: "Tell ONE way the trees are alike and ONE way they are different. Use the words \"both\" and \"but.\"", min: 12,
      checks: [{ label: "Tells how they are alike", re: /both|alike|same|also/i }, { label: "Tells how they are different", re: /\bbut\b|different|however|while|taller|bigger|wider/i }],
      frames: ["Both trees...", "But the giant sequoia...", "But the coast redwood..."] }
  ]
});

/* ============================ FOUNDATIONAL / WORD STUDY ============================ */

K3.add({
  id: "r-rf3-word-parts",
  subject: "reading",
  unit: "Word Study",
  title: "Word Parts: Prefixes and Suffixes",
  standard: "RF.3.3",
  skill: "Read words with prefixes and suffixes, long words, and tricky spellings",
  emoji: "🧩",
  mins: 12,
  pass: 80,
  learn: [
    { html: "<p>A <b>prefix</b> goes at the START of a word.</p><p><b>un-</b> = not &nbsp; <b>dis-</b> = not<br><b>re-</b> = again &nbsp; <b>pre-</b> = before</p><p><b>re</b>fill = fill again</p>", say: "A prefix goes at the start of a word. Un means not. Dis means not. Re means again. Pre means before. Refill means fill again." },
    { html: "<p>A <b>suffix</b> goes at the END of a word.</p><p><b>-ful</b> = full of &nbsp; <b>-less</b> = without &nbsp; <b>-able</b> = can be</p><p>hope<b>less</b> = without hope</p>", say: "A suffix goes at the end of a word. Ful means full of. Less means without. Able means can be. Hopeless means without hope." },
    { html: "<p>Long word? Break it into <b>syllables</b> (word chunks).</p><p>un · for · get · ta · ble</p><p>Some words are <b>tricky</b>. You just have to learn them: <b>because, said, friend</b>.</p>", say: "Long word? Break it into syllables, or word chunks. Un, for, get, ta, ble. Some words are tricky. You just have to learn them: because, said, friend." }
  ],
  qs: [
    { t: "mc", q: "What does the prefix un- mean in \"unhappy\"?", opts: ["Not", "Again", "Before", "Full of"], a: 0,
      why: "Un- means not. Unhappy means not happy." },
    { t: "mc", q: "What does \"reread\" mean?", opts: ["Read before", "Not read", "Read again", "Full of reading"], a: 2,
      why: "Re- means again. Reread means read again." },
    { t: "sort", q: "Sort each word by what its prefix means.", bins: ["not (un-, dis-)", "again (re-)", "before (pre-)"],
      items: [["unlock", 0], ["dislike", 0], ["refill", 1], ["rebuild", 1], ["preheat", 2], ["preschool", 2]],
      why: "Look at the start of each word. The prefix tells you the meaning!" },
    { t: "tap", q: "Tap the words that have a SUFFIX (-ful, -less, or -able).", words: ["hopeful", "jump", "fearless", "table", "washable", "ran"], a: [0, 2, 4],
      why: "Hope + ful, fear + less, wash + able. \"Table\" is just a word by itself. It has no suffix!" },
    { t: "mc", q: "Which word means \"can be broken\"?", opts: ["breakless", "rebreak", "unbreak", "breakable"], a: 3,
      why: "-able means can be. Breakable means it can be broken. Be careful with it!" },
    { t: "order", q: "Put the syllables in order to build a long word.", items: ["un", "for", "get", "ta", "ble"],
      why: "un + for + get + ta + ble = unforgettable. That means you will always remember it!" },
    { t: "mc", q: "Which tricky word is spelled correctly?", opts: ["becuz", "because", "becawse", "beecause"], a: 1,
      why: "\"Because\" is a tricky word. It does not look the way it sounds, so we practice it." },
    { t: "tf", q: "True or false? In the word \"pretest,\" pre- means before.", a: true,
      why: "True! A pretest is a test you take before you learn something." },
    { t: "write", q: "Write a sentence about school or home. Use a word with a prefix (un-, re-, pre-, dis-) or a suffix (-ful, -less, -able).", min: 6,
      checks: [{ label: "Uses a word with a prefix or suffix", re: /\b(un|re|pre|dis)[a-z]{3,}|[a-z]{3,}(ful|less|able)\b/i }],
      frames: ["I was careful when...", "My little sister was unhappy because...", "I had to redo..."] }
  ]
});
