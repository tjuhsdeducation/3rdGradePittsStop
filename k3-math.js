/* Mrs. Pitts' 3rd Grade · Math activities (CA Common Core Grade 3)
   Loaded after k3-engine.js. Each K3.add() is one activity. */
(function () {
  var P = K3.pic;
  // Simple emoji row for picture graphs (key: each emoji = N)
  function row(label, emoji, n) {
    return '<div style="display:flex;align-items:center;gap:8px;font-size:30px;margin:4px 0">' +
      '<b style="font-size:20px;min-width:80px">' + label + '</b><span>' + new Array(n + 1).join(emoji) + '</span></div>';
  }
  function key(emoji, each, what) {
    return '<div style="font-size:20px;margin-top:6px">Key: ' + emoji + ' = ' + each + ' ' + what + '</div>';
  }

  /* ===================== 1. Equal groups & arrays (3.OA.A.1) ===================== */
  K3.add({
    id: "m-mult-arrays",
    subject: "math",
    unit: "Multiplication & Division",
    title: "Equal Groups and Arrays",
    standard: "3.OA.A.1",
    skill: "Multiply with equal groups and arrays",
    emoji: "🍊",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p><b>Equal groups</b> have the same number in each group.</p><p>3 groups of 4 is <b>3 × 4 = 12</b>.</p>", pic: P.groups(3, 4, "🍊"), say: "Equal groups have the same number in each group. 3 groups of 4 is 3 times 4. That is 12." },
      { html: "<p>An <b>array</b> has rows and columns.</p><p>2 rows of 5 is <b>2 × 5 = 10</b>.</p>", pic: P.array(2, 5, "🐄"), say: "An array has rows and columns. 2 rows of 5 is 2 times 5. That is 10." },
      { html: "<p>The sign <b>×</b> means <b>groups of</b>.</p><p>4 × 3 means 4 groups of 3.</p><p>3 + 3 + 3 + 3 = 12</p>", pic: P.groups(4, 3, "⚽"), say: "The times sign means groups of. 4 times 3 means 4 groups of 3. 3 plus 3 plus 3 plus 3 is 12." }
    ],
    qs: [
      { t: "mc", q: "Which shows the oranges?", pic: P.groups(4, 2, "🍊"), opts: ["4 × 2", "4 + 2", "2 + 2", "8 × 4"], a: 0, say: "Which shows the oranges? 4 times 2. 4 plus 2. 2 plus 2. 8 times 4.", why: "There are 4 groups. Each group has 2. That is 4 × 2." },
      { t: "num", q: "There are 3 rows of cows. Each row has 5 cows. How many cows?", pic: P.array(3, 5, "🐄"), a: 15, unit: "cows", why: "3 rows of 5 is 3 × 5 = 15. Great counting!" },
      { t: "mc", q: "Which means 5 groups of 3?", opts: ["3 + 5", "5 × 5", "5 × 3", "3 × 3"], a: 2, say: "Which means 5 groups of 3? 3 plus 5. 5 times 5. 5 times 3. 3 times 3.", why: "5 × 3 means 5 groups with 3 in each group." },
      { t: "tf", q: "This array shows 2 × 6.", pic: P.array(2, 6, "⚽"), a: true, say: "This array shows 2 times 6. True or false?", why: "Yes! There are 2 rows with 6 balls in each row." },
      { t: "num", q: "Abuela Rosa has 5 baskets. Each basket has 4 eggs. How many eggs?", pic: P.groups(5, 4, "🥚"), a: 20, unit: "eggs", why: "5 groups of 4 is 5 × 4 = 20 eggs." },
      { t: "mc", q: "Which number sentence matches the array?", pic: P.array(4, 3, "🍪"), opts: ["4 + 3 = 7", "4 × 4 = 16", "3 × 3 = 9", "4 × 3 = 12"], a: 3, say: "Which number sentence matches the array? 4 plus 3 equals 7. 4 times 4 equals 16. 3 times 3 equals 9. 4 times 3 equals 12.", why: "There are 4 rows of 3 cookies. 4 × 3 = 12." },
      { t: "sort", q: "Are the groups equal? Sort each card.", bins: ["Equal groups", "Not equal"], items: [["3 bags with 5 apples each", 0], ["A bag of 4 apples and a bag of 6 apples", 1], ["4 rows of 2 chairs", 0], ["A cup of 3 crayons and a cup of 7 crayons", 1], ["2 boxes with 6 tamales each", 0]], why: "Equal groups have the same number in every group." },
      { t: "mc", q: "Luis has 6 rows of corn. There are 2 plants in each row. Which shows this?", opts: ["6 + 2", "6 × 2", "6 − 2", "6 ÷ 2"], a: 1, say: "Luis has 6 rows of corn. There are 2 plants in each row. Which shows this? 6 plus 2. 6 times 2. 6 minus 2. 6 divided by 2.", why: "6 rows with 2 in each row is 6 × 2 = 12 plants." },
      { t: "num", q: "3 × 7 = ?", pic: P.groups(3, 7, "⭐"), a: 21, say: "3 times 7 equals what?", why: "3 groups of 7 is 7 + 7 + 7 = 21." },
      { t: "tf", q: "2 × 3 means 2 + 3.", a: false, say: "2 times 3 means 2 plus 3. True or false?", why: "2 × 3 means 2 groups of 3. That is 3 + 3 = 6, not 5." }
    ]
  });

  /* ===================== 2. Division as sharing (3.OA.A.2) ===================== */
  K3.add({
    id: "m-div-sharing",
    subject: "math",
    unit: "Multiplication & Division",
    title: "Division Is Sharing",
    standard: "3.OA.A.2",
    skill: "Divide by sharing into equal groups",
    emoji: "🍓",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p><b>Division</b> means sharing into equal groups.</p><p><b>12 ÷ 3 = 4</b></p><p>Share 12 into 3 groups. Each group gets 4.</p>", pic: P.groups(3, 4, "🍓"), say: "Division means sharing into equal groups. 12 divided by 3 equals 4. Share 12 into 3 groups. Each group gets 4." },
      { html: "<p>Division can also ask: <b>how many groups?</b></p><p><b>10 ÷ 2 = 5</b></p><p>Make groups of 2. You get 5 groups.</p>", pic: P.groups(5, 2, "🍪"), say: "Division can also ask, how many groups? 10 divided by 2 equals 5. Make groups of 2. You get 5 groups." }
    ],
    qs: [
      { t: "num", q: "4 kids share 12 oranges equally. How many oranges does each kid get?", pic: P.groups(4, 3, "🍊"), a: 3, unit: "oranges", why: "12 ÷ 4 = 3. Each kid gets 3 oranges." },
      { t: "mc", q: "Ms. García has 15 pencils. She puts 5 in each cup. How many cups does she need?", opts: ["10", "20", "3", "5"], a: 2, why: "15 ÷ 5 = 3. She needs 3 cups." },
      { t: "num", q: "20 ÷ 4 = ?", pic: P.groups(4, 5, "🟣"), a: 5, say: "20 divided by 4 equals what?", why: "20 shared into 4 groups is 5 in each group." },
      { t: "tf", q: "18 ÷ 3 = 6", a: true, say: "18 divided by 3 equals 6. True or false?", why: "Yes! 3 groups of 6 make 18." },
      { t: "mc", q: "Which means share 24 into 6 equal groups?", opts: ["24 ÷ 6", "24 × 6", "24 − 6", "6 ÷ 24"], a: 0, say: "Which means share 24 into 6 equal groups? 24 divided by 6. 24 times 6. 24 minus 6. 6 divided by 24.", why: "Sharing 24 into 6 groups is 24 ÷ 6." },
      { t: "num", q: "Diego has 16 stickers. He shares them equally with 2 friends. How many stickers does each friend get?", a: 8, unit: "stickers", why: "16 ÷ 2 = 8. Each friend gets 8." },
      { t: "mc", q: "What does this picture show?", pic: P.groups(3, 6, "🥕"), opts: ["3 ÷ 18 = 6", "18 ÷ 3 = 6", "18 × 3 = 54", "18 − 3 = 15"], a: 1, say: "What does this picture show? 3 divided by 18 equals 6. 18 divided by 3 equals 6. 18 times 3 equals 54. 18 minus 3 equals 15.", why: "18 carrots are in 3 groups. Each group has 6. So 18 ÷ 3 = 6." },
      { t: "tf", q: "5 kids share 10 cookies equally. Each kid gets 5 cookies.", a: false, why: "10 ÷ 5 = 2. Each kid gets 2 cookies." },
      { t: "num", q: "35 ÷ 5 = ?", a: 7, say: "35 divided by 5 equals what?", why: "5 × 7 = 35, so 35 ÷ 5 = 7." },
      { t: "mc", q: "30 kids make soccer teams. Each team has 10 kids. How many teams?", opts: ["20", "40", "300", "3"], a: 3, why: "30 ÷ 10 = 3. There are 3 teams." }
    ]
  });

  /* ===================== 3. Word problems within 100 (3.OA.A.3) ===================== */
  K3.add({
    id: "m-mult-div-word",
    subject: "math",
    unit: "Multiplication & Division",
    title: "Multiply and Divide Word Problems",
    standard: "3.OA.A.3",
    skill: "Solve word problems with multiplication and division",
    emoji: "🥛",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>Read the story. Ask:</p><p>1. How many <b>groups</b>?</p><p>2. How many in <b>each</b> group?</p>", pic: P.groups(3, 5, "🥛"), say: "Read the story. Ask: How many groups? How many in each group?" },
      { html: "<p>3 crates. 5 bottles in each crate.</p><p><b>3 × 5 = 15</b> bottles.</p><p>Know the total and need to share? <b>Divide.</b></p>", pic: P.array(3, 5, "🥛"), say: "3 crates. 5 bottles in each crate. 3 times 5 equals 15 bottles. Know the total and need to share? Divide." },
      { html: "<p>Clue words:</p><p><b>each, every, in all</b> → often multiply</p><p><b>share, equal groups, how many in each</b> → often divide</p>", say: "Clue words. Each, every, in all often mean multiply. Share, equal groups, how many in each often mean divide." }
    ],
    qs: [
      { t: "num", q: "A dairy farm in Tulare has 6 barns. Each barn has 9 cows. How many cows in all?", a: 54, unit: "cows", why: "6 × 9 = 54 cows. Moo!" },
      { t: "num", q: "Mrs. Pitts has 28 books. She puts 4 books on each table. How many tables get books?", a: 7, unit: "tables", why: "28 ÷ 4 = 7 tables." },
      { t: "mc", q: "A box holds 8 oranges. How many oranges are in 5 boxes?", opts: ["13", "40", "35", "45"], a: 1, why: "5 × 8 = 40 oranges." },
      { t: "num", q: "Sofía reads 7 pages each day. How many pages does she read in 7 days?", a: 49, unit: "pages", why: "7 × 7 = 49 pages. Keep reading!" },
      { t: "mc", q: "36 kids stand in 4 equal lines. How many kids are in each line?", opts: ["9", "8", "32", "40"], a: 0, why: "36 ÷ 4 = 9 kids in each line." },
      { t: "num", q: "Mr. Torres plants 3 rows of tomatoes. Each row has 8 plants. How many plants?", pic: P.array(3, 8, "🌱"), a: 24, unit: "plants", why: "3 rows of 8 is 3 × 8 = 24 plants." },
      { t: "mc", q: "Which problem uses division?", opts: ["4 bags have 6 apples each. How many apples?", "There are 3 rows of 5 desks. How many desks?", "Share 42 grapes with 6 friends. How many does each friend get?", "Each car has 4 wheels. How many wheels on 2 cars?"], a: 2, why: "Sharing 42 grapes into 6 equal groups is division: 42 ÷ 6 = 7." },
      { t: "num", q: "There are 63 chairs in the cafeteria. Each row has 9 chairs. How many rows?", a: 7, unit: "rows", why: "63 ÷ 9 = 7 rows." },
      { t: "mc", q: "A soccer team has 10 players. How many players are on 6 teams?", opts: ["16", "66", "50", "60"], a: 3, why: "6 × 10 = 60 players." },
      { t: "tf", q: "Ana has 45 strawberries. She puts 5 in each bag. She needs 9 bags.", a: true, why: "Yes! 45 ÷ 5 = 9 bags." }
    ]
  });

  /* ===================== 4. Unknown number (3.OA.A.4) ===================== */
  K3.add({
    id: "m-unknown-number",
    subject: "math",
    unit: "Multiplication & Division",
    title: "Find the Missing Number",
    standard: "3.OA.A.4",
    skill: "Find the unknown number in a multiplication or division equation",
    emoji: "🔍",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p>A box <b>□</b> stands for a missing number.</p><p><b>3 × □ = 12</b></p><p>Think: 3 groups of what make 12? <b>4!</b></p>", pic: P.groups(3, 4, "🍎"), say: "A box stands for a missing number. 3 times box equals 12. Think: 3 groups of what make 12? 4!" },
      { html: "<p>Use a <b>fact family</b>:</p><p>3 × 4 = 12 &nbsp; 4 × 3 = 12</p><p>12 ÷ 3 = 4 &nbsp; 12 ÷ 4 = 3</p>", pic: P.array(3, 4, "🟣"), say: "Use a fact family. 3 times 4 equals 12. 4 times 3 equals 12. 12 divided by 3 equals 4. 12 divided by 4 equals 3." }
    ],
    qs: [
      { t: "num", q: "4 × □ = 20", a: 5, say: "4 times what number equals 20?", why: "4 × 5 = 20. The missing number is 5." },
      { t: "num", q: "□ × 6 = 42", a: 7, say: "What number times 6 equals 42?", why: "7 × 6 = 42. The missing number is 7." },
      { t: "num", q: "24 ÷ □ = 8", a: 3, say: "24 divided by what number equals 8?", why: "24 ÷ 3 = 8, because 3 × 8 = 24." },
      { t: "num", q: "□ ÷ 5 = 6", a: 30, say: "What number divided by 5 equals 6?", why: "5 × 6 = 30, so 30 ÷ 5 = 6." },
      { t: "mc", q: "8 × □ = 48", opts: ["5", "7", "6", "8"], a: 2, say: "8 times what number equals 48? 5. 7. 6. 8.", why: "8 × 6 = 48." },
      { t: "mc", q: "Which number makes this true? 56 ÷ □ = 7", opts: ["8", "7", "9", "6"], a: 0, say: "Which number makes this true? 56 divided by box equals 7. 8. 7. 9. 6.", why: "56 ÷ 8 = 7, because 7 × 8 = 56." },
      { t: "tf", q: "9 × 3 = 27, so 27 ÷ 9 = 3.", a: true, say: "9 times 3 equals 27, so 27 divided by 9 equals 3. True or false?", why: "Yes! They are in the same fact family." },
      { t: "mc", q: "Carlos puts his marbles in 4 bags. Each bag has 9 marbles. Which equation finds how many marbles he has?", opts: ["4 + 9 = □", "9 ÷ 4 = □", "4 − 9 = □", "□ ÷ 4 = 9"], a: 3, say: "Carlos puts his marbles in 4 bags. Each bag has 9 marbles. Which equation finds how many marbles he has? 4 plus 9 equals box. 9 divided by 4 equals box. 4 minus 9 equals box. Box divided by 4 equals 9.", why: "The total shared into 4 bags gives 9 each. So □ ÷ 4 = 9. He has 36 marbles." },
      { t: "mc", q: "Which is NOT in the fact family for 5, 7, and 35?", opts: ["5 × 7 = 35", "7 + 5 = 12", "35 ÷ 5 = 7", "7 × 5 = 35"], a: 1, say: "Which is not in the fact family for 5, 7, and 35? 5 times 7 equals 35. 7 plus 5 equals 12. 35 divided by 5 equals 7. 7 times 5 equals 35.", why: "This fact family uses × and ÷ with 5, 7, and 35. 7 + 5 = 12 does not belong." },
      { t: "num", q: "18 kids make 3 equal teams. How many kids are on each team? 18 ÷ 3 = □", a: 6, say: "18 kids make 3 equal teams. How many kids are on each team? 18 divided by 3 equals what?", why: "18 ÷ 3 = 6 kids on each team." }
    ]
  });

  /* ===================== 5. Properties (3.OA.B.5) ===================== */
  K3.add({
    id: "m-mult-properties",
    subject: "math",
    unit: "Multiplication & Division",
    title: "Multiplication Properties",
    standard: "3.OA.B.5",
    skill: "Use properties to multiply",
    emoji: "🧩",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p><b>Turn it around!</b> (commutative)</p><p>2 × 5 = 5 × 2 = 10</p><p>The order does not change the answer.</p>", pic: P.array(2, 5, "🟣"), say: "Turn it around. 2 times 5 equals 5 times 2. Both are 10. The order does not change the answer." },
      { html: "<p><b>Group it any way!</b> (associative)</p><p>(2 × 3) × 4 = 6 × 4 = 24</p><p>2 × (3 × 4) = 2 × 12 = 24</p>", say: "Group it any way. 2 times 3, then times 4, is 24. 2 times 3 times 4 grouped the other way is also 24." },
      { html: "<p><b>Break it apart!</b> (distributive)</p><p>4 × 7 = 4 × 5 + 4 × 2</p><p>= 20 + 8 = <b>28</b></p>", pic: P.array(4, 7, "🟪"), say: "Break it apart. 4 times 7 equals 4 times 5 plus 4 times 2. That is 20 plus 8, which is 28." }
    ],
    qs: [
      { t: "tf", q: "6 × 3 = 3 × 6", a: true, say: "6 times 3 equals 3 times 6. True or false?", why: "Yes! You can turn the factors around. Both are 18." },
      { t: "num", q: "7 × 4 = 28. So 4 × 7 = ?", a: 28, say: "7 times 4 equals 28. So 4 times 7 equals what?", why: "Turn it around! 4 × 7 is also 28." },
      { t: "mc", q: "Which is the same as 5 × 8?", opts: ["5 + 8", "8 × 5", "8 − 5", "5 × 5"], a: 1, say: "Which is the same as 5 times 8? 5 plus 8. 8 times 5. 8 minus 5. 5 times 5.", why: "8 × 5 = 5 × 8 = 40." },
      { t: "num", q: "(2 × 5) × 3 = ?", a: 30, say: "2 times 5, then times 3, equals what?", why: "2 × 5 = 10. Then 10 × 3 = 30." },
      { t: "mc", q: "Which is equal to 2 × (4 × 5)?", opts: ["(2 × 4) × 5", "2 + 4 + 5", "2 × 4 + 5", "(2 + 4) × 5"], a: 0, say: "Which is equal to 2 times, 4 times 5? 2 times 4, then times 5. 2 plus 4 plus 5. 2 times 4 plus 5. 2 plus 4, then times 5.", why: "You can group the factors any way. Both equal 40." },
      { t: "mc", q: "Break 3 × 8 into 3 × 5 and 3 × 3. What is 3 × 8?", pic: P.array(3, 8, "🟣"), opts: ["15", "9", "24", "11"], a: 2, say: "Break 3 times 8 into 3 times 5 and 3 times 3. What is 3 times 8? 15. 9. 24. 11.", why: "3 × 5 = 15 and 3 × 3 = 9. 15 + 9 = 24." },
      { t: "num", q: "6 × 7 = 6 × 5 + 6 × 2 = 30 + □", a: 12, say: "6 times 7 equals 6 times 5 plus 6 times 2. That is 30 plus what?", why: "6 × 2 = 12. So 6 × 7 = 30 + 12 = 42." },
      { t: "mc", q: "Which is the same as 8 × 6?", opts: ["8 × 3 + 3", "8 + 6", "8 × 5 + 6", "8 × 5 + 8 × 1"], a: 3, say: "Which is the same as 8 times 6? 8 times 3 plus 3. 8 plus 6. 8 times 5 plus 6. 8 times 5 plus 8 times 1.", why: "6 = 5 + 1. So 8 × 6 = 8 × 5 + 8 × 1 = 40 + 8 = 48." },
      { t: "sort", q: "Is it equal to 4 × 9? Sort each card.", bins: ["Equals 4 × 9", "Not equal"], items: [["9 × 4", 0], ["4 × 5 + 4 × 4", 0], ["4 + 9", 1], ["(2 × 2) × 9", 0], ["4 × 8", 1]], say: "Is it equal to 4 times 9? Sort each card.", why: "4 × 9 = 36. 9 × 4, 20 + 16, and 4 × 9 all make 36." },
      { t: "tf", q: "5 × 0 = 5", a: false, say: "5 times 0 equals 5. True or false?", why: "Any number times 0 is 0. 5 groups of nothing is nothing!" }
    ]
  });

  /* ===================== 6. Facts fluency (3.OA.C.7) ===================== */
  K3.add({
    id: "m-mult-facts",
    subject: "math",
    unit: "Multiplication & Division",
    title: "Multiplication Facts 0 to 10",
    standard: "3.OA.C.7",
    skill: "Multiply and divide within 100 quickly",
    emoji: "⚡",
    mins: 8,
    pass: 80,
    learn: [
      { html: "<p>Fact tricks:</p><p><b>× 2</b> is a double. 2 × 7 = 7 + 7 = 14</p><p><b>× 5</b> ends in 0 or 5.</p><p><b>× 10</b> puts a 0 on the end. 10 × 6 = 60</p>", say: "Fact tricks. Times 2 is a double. 2 times 7 equals 7 plus 7, 14. Times 5 ends in 0 or 5. Times 10 puts a 0 on the end. 10 times 6 equals 60." },
      { html: "<p><b>× 9</b> trick: 9 × 6 = 54</p><p>The tens digit is 1 less than 6: <b>5</b>.</p><p>The digits add to 9: 5 + <b>4</b> = 9.</p>", say: "Times 9 trick. 9 times 6 equals 54. The tens digit is 1 less than 6, so 5. The digits add to 9, so 5 plus 4." },
      { html: "<p>Use multiplication to divide.</p><p>7 × 8 = 56</p><p>So <b>56 ÷ 8 = 7</b></p>", pic: P.array(7, 8, "🟣"), say: "Use multiplication to divide. 7 times 8 equals 56. So 56 divided by 8 equals 7." }
    ],
    qs: [
      { t: "num", q: "6 × 7 = ?", a: 42, say: "6 times 7 equals what?", why: "6 × 7 = 42. Think 6 × 5 = 30, plus 12." },
      { t: "num", q: "8 × 4 = ?", a: 32, say: "8 times 4 equals what?", why: "8 × 4 = 32. Double 8 is 16. Double 16 is 32." },
      { t: "num", q: "9 × 9 = ?", a: 81, say: "9 times 9 equals what?", why: "9 × 9 = 81. The digits 8 and 1 add to 9!" },
      { t: "num", q: "7 × 8 = ?", a: 56, say: "7 times 8 equals what?", why: "7 × 8 = 56. Remember 5, 6, 7, 8: 56 = 7 × 8." },
      { t: "num", q: "54 ÷ 6 = ?", a: 9, say: "54 divided by 6 equals what?", why: "6 × 9 = 54, so 54 ÷ 6 = 9." },
      { t: "mc", q: "6 × 8 = ?", opts: ["42", "48", "54", "46"], a: 1, say: "6 times 8 equals what? 42. 48. 54. 46.", why: "6 × 8 = 48." },
      { t: "mc", q: "72 ÷ 8 = ?", opts: ["8", "7", "6", "9"], a: 3, say: "72 divided by 8 equals what? 8. 7. 6. 9.", why: "8 × 9 = 72, so 72 ÷ 8 = 9." },
      { t: "tf", q: "7 × 7 = 49", a: true, say: "7 times 7 equals 49. True or false?", why: "Yes! 7 × 7 = 49." },
      { t: "sort", q: "Sort by the answer.", bins: ["= 24", "= 36"], items: [["3 × 8", 0], ["6 × 6", 1], ["4 × 6", 0], ["4 × 9", 1], ["8 × 3", 0], ["9 × 4", 1]], say: "Sort by the answer. Does it equal 24 or 36?", why: "3 × 8, 4 × 6, and 8 × 3 are 24. 6 × 6, 4 × 9, and 9 × 4 are 36." },
      { t: "mc", q: "0 × 9 = ?", opts: ["9", "1", "0", "90"], a: 2, say: "0 times 9 equals what? 9. 1. 0. 90.", why: "Any number times 0 is 0." }
    ]
  });

  /* ===================== 7. Two-step word problems (3.OA.D.8) ===================== */
  K3.add({
    id: "m-two-step",
    subject: "math",
    unit: "Multiplication & Division",
    title: "Two-Step Word Problems",
    standard: "3.OA.D.8",
    skill: "Solve two-step word problems and check with estimation",
    emoji: "🪜",
    mins: 15,
    pass: 80,
    learn: [
      { html: "<p>Some problems have <b>two steps</b>.</p><p>Maya has 3 bags with 4 apples each. She eats 2.</p><p>Step 1: 3 × 4 = 12</p><p>Step 2: 12 − 2 = <b>10</b></p>", pic: P.groups(3, 4, "🍎"), say: "Some problems have two steps. Maya has 3 bags with 4 apples each. She eats 2. Step 1: 3 times 4 equals 12. Step 2: 12 minus 2 equals 10." },
      { html: "<p>Use a letter for the unknown.</p><p><b>3 × 4 − 2 = n</b></p><p>n = 10</p>", say: "Use a letter for the unknown. 3 times 4 minus 2 equals n. n equals 10." },
      { html: "<p><b>Estimate</b> to check.</p><p>Round the numbers. Does your answer make sense?</p><p>298 + 405 is about 300 + 400 = 700.</p>", pic: P.numline(0, 1000, 10, [[300, "300"], [700, "700"]]), say: "Estimate to check. Round the numbers. Does your answer make sense? 298 plus 405 is about 300 plus 400, which is 700." }
    ],
    qs: [
      { t: "num", q: "Leo has 4 packs of cards. Each pack has 5 cards. Then he gets 6 more cards. How many cards now?", a: 26, unit: "cards", why: "4 × 5 = 20. Then 20 + 6 = 26 cards." },
      { t: "num", q: "Mamá has 30 oranges. She puts 6 in each bag. She gives away 2 bags. How many bags are left?", a: 3, unit: "bags", why: "30 ÷ 6 = 5 bags. Then 5 − 2 = 3 bags left." },
      { t: "mc", q: "There are 5 boxes with 8 crayons each. 3 crayons break. Which equation finds n, the crayons that are not broken?", opts: ["5 + 8 − 3 = n", "5 × 8 + 3 = n", "5 × 8 − 3 = n", "8 − 5 × 3 = n"], a: 2, say: "There are 5 boxes with 8 crayons each. 3 crayons break. Which equation finds n, the crayons that are not broken? 5 plus 8 minus 3 equals n. 5 times 8 plus 3 equals n. 5 times 8 minus 3 equals n. 8 minus 5 times 3 equals n.", why: "Multiply first: 5 × 8 = 40. Then take away 3. n = 37." },
      { t: "num", q: "Tickets to the Tulare County Fair cost $7 each. Isabel buys 3 tickets. She pays with $25. How much change does she get?", a: 4, unit: "dollars", why: "3 × 7 = 21 dollars. Then 25 − 21 = 4 dollars back." },
      { t: "mc", q: "24 kids make 4 equal teams. Then 2 more kids join each team. How many kids are on each team now?", opts: ["6", "8", "10", "26"], a: 1, why: "24 ÷ 4 = 6. Then 6 + 2 = 8 kids on each team." },
      { t: "num", q: "Papá picks 45 peaches on Monday and 38 on Tuesday. He sells 20. How many peaches are left?", a: 63, unit: "peaches", why: "45 + 38 = 83. Then 83 − 20 = 63 peaches." },
      { t: "mc", q: "The López family drove 289 miles one day and 412 miles the next day. About how many miles is that? Round to the nearest hundred.", opts: ["500", "600", "800", "700"], a: 3, why: "289 is about 300. 412 is about 400. 300 + 400 = 700." },
      { t: "tf", q: "198 + 403 is about 600.", a: true, say: "198 plus 403 is about 600. True or false?", why: "Yes! 198 is about 200 and 403 is about 400. 200 + 400 = 600." },
      { t: "mc", q: "Jada says 52 + 39 = 121. Use rounding to check. Is her answer reasonable?", opts: ["No. 50 + 40 is about 90.", "Yes. It is close to 120.", "Yes. 52 is a big number.", "No. It should be about 200."], a: 0, why: "Round: 50 + 40 = 90. So 121 is too big. The real answer is 91." },
      { t: "num", q: "A school bus has 9 rows. Each row has 4 seats. 29 kids sit down. How many seats are empty?", a: 7, unit: "seats", why: "9 × 4 = 36 seats. Then 36 − 29 = 7 empty seats." }
    ]
  });

  /* ===================== 8. Patterns (3.OA.D.9) ===================== */
  K3.add({
    id: "m-mult-patterns",
    subject: "math",
    unit: "Multiplication & Division",
    title: "Patterns in Multiplication",
    standard: "3.OA.D.9",
    skill: "Find and explain number patterns",
    emoji: "🔢",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p>Count by 5s: 5, 10, 15, 20, 25, 30</p><p>The ones digit goes <b>5, 0, 5, 0</b>.</p>", pic: P.numline(0, 30, 6, [[5, "5"], [10, "10"], [15, "15"], [20, "20"], [25, "25"], [30, "30"]]), say: "Count by 5s. 5, 10, 15, 20, 25, 30. The ones digit goes 5, 0, 5, 0." },
      { html: "<p>Any number <b>× 2</b> is <b>even</b>.</p><p>2, 4, 6, 8, 10, 12 ...</p><p>Even numbers end in 0, 2, 4, 6, or 8.</p>", say: "Any number times 2 is even. 2, 4, 6, 8, 10, 12. Even numbers end in 0, 2, 4, 6, or 8." },
      { html: "<p><b>Even × any number = even</b></p><p>4 × 3 = 12</p><p><b>Odd × odd = odd</b></p><p>3 × 5 = 15</p>", say: "Even times any number is even. 4 times 3 equals 12. Odd times odd is odd. 3 times 5 equals 15." }
    ],
    qs: [
      { t: "mc", q: "What comes next? 4, 8, 12, 16, ___", opts: ["18", "20", "24", "22"], a: 1, say: "What comes next? 4, 8, 12, 16, blank. 18. 20. 24. 22.", why: "The pattern adds 4. 16 + 4 = 20." },
      { t: "tf", q: "4 × 7 is an even number.", a: true, say: "4 times 7 is an even number. True or false?", why: "Yes! 4 × 7 = 28. Even times any number is even." },
      { t: "num", q: "What comes next? 9, 18, 27, 36, □", a: 45, say: "What comes next? 9, 18, 27, 36, box.", why: "The pattern adds 9. 36 + 9 = 45." },
      { t: "mc", q: "Which answer is odd?", opts: ["6 × 3", "4 × 5", "3 × 7", "2 × 9"], a: 2, say: "Which answer is odd? 6 times 3. 4 times 5. 3 times 7. 2 times 9.", why: "3 × 7 = 21. Odd times odd is odd." },
      { t: "sort", q: "Is the answer even or odd?", bins: ["Even", "Odd"], items: [["2 × 7", 0], ["5 × 3", 1], ["6 × 5", 0], ["9 × 9", 1], ["8 × 3", 0], ["7 × 1", 1]], why: "If one factor is even, the answer is even. Odd × odd is odd." },
      { t: "mc", q: "Look: 10, 20, 30, 40. What is the ones digit every time?", opts: ["5", "1", "10", "0"], a: 3, why: "Every × 10 answer ends in 0." },
      { t: "num", q: "The pattern adds 6. What comes next? 6, 12, 18, □", a: 24, say: "The pattern adds 6. What comes next? 6, 12, 18, box.", why: "18 + 6 = 24." },
      { t: "numline", q: "Count by 3s: 3, 6, 9 ... Tap the next number.", min: 0, max: 15, ticks: 5, a: 12, label: "Count by 3s", say: "Count by 3s. 3, 6, 9. Tap the next number.", why: "9 + 3 = 12." },
      { t: "mc", q: "9s facts: 9, 18, 27, 36, 45. The tens digit goes up by 1. What does the ones digit do?", opts: ["Goes down by 1", "Goes up by 1", "Stays the same", "Goes up by 9"], a: 0, why: "The ones digit goes 9, 8, 7, 6, 5. It goes down by 1!" },
      { t: "tf", q: "6 × 6 is an odd number.", a: false, say: "6 times 6 is an odd number. True or false?", why: "6 × 6 = 36. 36 is even." }
    ]
  });

  /* ===================== 9. Rounding (3.NBT.A.1) ===================== */
  K3.add({
    id: "m-rounding",
    subject: "math",
    unit: "Place Value",
    title: "Rounding to 10 and 100",
    standard: "3.NBT.A.1",
    skill: "Round numbers to the nearest 10 or 100",
    emoji: "🎯",
    mins: 10,
    pass: 80,
    learn: [
      { html: "<p>Round to the nearest <b>10</b>.</p><p>47 is between 40 and 50.</p><p>It is closer to <b>50</b>.</p>", pic: P.numline(40, 50, 10, [[40, "40"], [47, "47"], [50, "50"]]), say: "Round to the nearest 10. 47 is between 40 and 50. It is closer to 50." },
      { html: "<p>Look at the <b>ones</b> digit.</p><p>5 or more: round <b>up</b>. 65 → 70</p><p>4 or less: round <b>down</b>. 64 → 60</p>", say: "Look at the ones digit. 5 or more, round up. 65 rounds to 70. 4 or less, round down. 64 rounds to 60." },
      { html: "<p>Round to the nearest <b>100</b>: look at the <b>tens</b> digit.</p><p>362 → 400 (6 tens is 5 or more)</p><p>238 → 200 (3 tens is 4 or less)</p>", pic: P.numline(200, 400, 2, [[238, "238"], [362, "362"]]), say: "Round to the nearest 100. Look at the tens digit. 362 rounds to 400. 238 rounds to 200." }
    ],
    qs: [
      { t: "numline", q: "Round 68 to the nearest 10. Tap the answer.", min: 0, max: 100, ticks: 10, a: 70, label: "Nearest 10", why: "68 is between 60 and 70. It is closer to 70." },
      { t: "num", q: "Round 34 to the nearest 10.", a: 30, why: "The ones digit is 4. Round down to 30." },
      { t: "num", q: "Round 85 to the nearest 10.", a: 90, why: "The ones digit is 5. Round up to 90." },
      { t: "mc", q: "Round 452 to the nearest 100.", opts: ["400", "450", "500", "460"], a: 2, why: "The tens digit is 5. 5 or more rounds up, so 452 rounds to 500." },
      { t: "mc", q: "Round 617 to the nearest 10.", opts: ["600", "620", "610", "700"], a: 1, why: "617 is between 610 and 620. The ones digit is 7, so round up to 620." },
      { t: "num", q: "Round 750 to the nearest 100.", a: 800, why: "The tens digit is 5. Round up to 800." },
      { t: "tf", q: "296 rounded to the nearest 10 is 300.", a: true, why: "Yes! 296 is between 290 and 300. The ones digit is 6, so it rounds up to 300." },
      { t: "sort", q: "Round to the nearest 100. Sort each number.", bins: ["Rounds to 300", "Rounds to 400"], items: [["349", 0], ["351", 1], ["283", 0], ["412", 1], ["399", 1], ["250", 0]], why: "Look at the tens digit. 4 or less rounds down. 5 or more rounds up." },
      { t: "mc", q: "There were 238 goats at the Tulare County Fair. Round to the nearest 10.", opts: ["200", "230", "300", "240"], a: 3, why: "238 is between 230 and 240. The ones digit is 8, so round up to 240." },
      { t: "numline", q: "Round 540 to the nearest 100. Tap the answer.", min: 500, max: 600, ticks: 10, a: 500, label: "Nearest 100", why: "540 is closer to 500. The tens digit is 4, so round down." }
    ]
  });

  /* ===================== 10. Add & subtract within 1000 (3.NBT.A.2) ===================== */
  K3.add({
    id: "m-add-sub-1000",
    subject: "math",
    unit: "Place Value",
    title: "Add and Subtract to 1000",
    standard: "3.NBT.A.2",
    skill: "Add and subtract within 1000",
    emoji: "🧮",
    mins: 15,
    pass: 80,
    learn: [
      { html: "<p><b>246</b> is 2 hundreds, 4 tens, 6 ones.</p><p>200 + 40 + 6</p>", pic: P.base10(2, 4, 6), say: "246 is 2 hundreds, 4 tens, and 6 ones. 200 plus 40 plus 6." },
      { html: "<p>To <b>add</b>: ones, then tens, then hundreds.</p><p>158 + 27</p><p>8 + 7 = 15 ones. Trade 10 ones for 1 ten.</p><p>158 + 27 = <b>185</b></p>", pic: P.base10(1, 5, 8), say: "To add, add the ones, then the tens, then the hundreds. 158 plus 27. 8 plus 7 is 15 ones. Trade 10 ones for 1 ten. 158 plus 27 equals 185." },
      { html: "<p>To <b>subtract</b>, you may need to trade.</p><p>52 − 18</p><p>Trade 1 ten for 10 ones. 12 − 8 = 4. 4 − 1 = 3.</p><p>52 − 18 = <b>34</b></p>", pic: P.base10(0, 5, 2), say: "To subtract, you may need to trade. 52 minus 18. Trade 1 ten for 10 ones. 12 minus 8 is 4. 4 tens minus 1 ten is 3 tens. 52 minus 18 equals 34." }
    ],
    qs: [
      { t: "num", q: "What number do the blocks show?", pic: P.base10(3, 2, 5), a: 325, why: "3 hundreds, 2 tens, 5 ones make 325." },
      { t: "num", q: "245 + 132 = ?", a: 377, say: "245 plus 132 equals what?", why: "5 + 2 = 7 ones. 4 + 3 = 7 tens. 2 + 1 = 3 hundreds. 377!" },
      { t: "num", q: "368 + 257 = ?", a: 625, say: "368 plus 257 equals what?", why: "8 + 7 = 15, trade a ten. 6 + 5 + 1 = 12 tens, trade a hundred. 3 + 2 + 1 = 6 hundreds. 625." },
      { t: "num", q: "500 − 236 = ?", a: 264, say: "500 minus 236 equals what?", why: "Count up: 236 + 4 = 240, + 60 = 300, + 200 = 500. 4 + 60 + 200 = 264." },
      { t: "mc", q: "752 − 418 = ?", opts: ["346", "444", "1170", "334"], a: 3, say: "752 minus 418 equals what? 346. 444. 1170. 334.", why: "Trade 1 ten: 12 − 8 = 4. 4 − 1 = 3 tens. 7 − 4 = 3 hundreds. 334." },
      { t: "num", q: "Alpine Vista kids read 348 books in October and 275 books in November. How many books in all?", a: 623, unit: "books", why: "348 + 275 = 623 books. Wow, readers!" },
      { t: "mc", q: "The farm had 920 oranges. They sold 485. How many oranges are left?", opts: ["545", "435", "465", "1405"], a: 1, why: "920 − 485 = 435. Check: 435 + 485 = 920." },
      { t: "tf", q: "406 − 199 = 207", a: true, say: "406 minus 199 equals 207. True or false?", why: "Yes! 199 is 1 less than 200. 406 − 200 = 206, then add 1 back: 207." },
      { t: "mc", q: "Which number is 300 + 60 + 4?", opts: ["346", "3604", "364", "634"], a: 2, say: "Which number is 300 plus 60 plus 4? 346. 3604. 364. 634.", why: "3 hundreds, 6 tens, 4 ones is 364." },
      { t: "num", q: "The stadium has 1000 seats. 637 people sit down. How many seats are empty?", a: 363, unit: "seats", why: "1000 − 637 = 363. Check: 637 + 363 = 1000." }
    ]
  });

  /* ===================== 11. Understanding fractions (3.NF.A.1, 3.NF.A.2) ===================== */
  K3.add({
    id: "m-frac-understand",
    subject: "math",
    unit: "Fractions",
    title: "Fractions and the Number Line",
    standard: "3.NF.A.1",
    skill: "Name fractions and find them on a number line",
    emoji: "🍕",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>A <b>fraction</b> is part of a whole.</p><p>The whole is cut into <b>equal</b> parts.</p><p><b>1/4</b> means 1 of 4 equal parts. It is a <b>unit fraction</b>.</p>", pic: P.frac(4, 1, "bar"), say: "A fraction is part of a whole. The whole is cut into equal parts. One fourth means 1 of 4 equal parts. It is a unit fraction." },
      { html: "<p>The <b>bottom</b> number tells how many equal parts.</p><p>The <b>top</b> number tells how many parts we count.</p><p><b>3/4</b> = 3 of 4 parts</p>", pic: P.frac(4, 3, "circle"), say: "The bottom number tells how many equal parts. The top number tells how many parts we count. Three fourths is 3 of 4 parts." },
      { html: "<p>Fractions live on a <b>number line</b> too.</p><p>Cut 0 to 1 into 4 equal jumps. Each jump is <b>1/4</b>.</p>", pic: P.numline(0, 1, 4, [[0, "0"], [0.25, "1/4"], [0.5, "2/4"], [0.75, "3/4"], [1, "1"]]), say: "Fractions live on a number line too. Cut 0 to 1 into 4 equal jumps. Each jump is one fourth." }
    ],
    qs: [
      { t: "shade", q: "Shade 3/4 of the bar.", parts: 4, a: 3, shape: "bar", say: "Shade three fourths of the bar.", why: "3/4 means 3 of 4 equal parts. Shade 3 parts." },
      { t: "mc", q: "What fraction is shaded?", pic: P.frac(3, 1, "circle"), opts: ["1/2", "1/3", "3/1", "2/3"], a: 1, say: "What fraction is shaded? One half. One third. Three over one. Two thirds.", why: "There are 3 equal parts. 1 is shaded. That is 1/3." },
      { t: "shade", q: "Shade 2/6 of the circle.", parts: 6, a: 2, shape: "circle", say: "Shade two sixths of the circle.", why: "2/6 means 2 of 6 equal parts." },
      { t: "mc", q: "A pizza has 8 equal slices. Marisol eats 1 slice. What fraction did she eat?", opts: ["1/8", "8/1", "7/8", "1/7"], a: 0, say: "A pizza has 8 equal slices. Marisol eats 1 slice. What fraction did she eat? One eighth. Eight over one. Seven eighths. One seventh.", why: "She ate 1 of 8 equal parts. That is 1/8." },
      { t: "numline", q: "Tap 3/4 on the number line.", min: 0, max: 1, ticks: 4, a: 0.75, label: "fourths", say: "Tap three fourths on the number line.", why: "Make 3 jumps of 1/4 from 0. You land on 3/4." },
      { t: "numline", q: "Tap 1/3 on the number line.", min: 0, max: 1, ticks: 3, a: 1 / 3, label: "thirds", say: "Tap one third on the number line.", why: "Cut 0 to 1 into 3 equal parts. One jump is 1/3." },
      { t: "tf", q: "In 5/6, the whole is cut into 6 equal parts.", a: true, say: "In five sixths, the whole is cut into 6 equal parts. True or false?", why: "Yes! The bottom number, 6, tells how many equal parts." },
      { t: "mc", q: "What fraction is at the ? mark?", pic: P.numline(0, 1, 6, [[0, "0"], [4 / 6, "?"], [1, "1"]]), opts: ["4/5", "6/4", "2/6", "4/6"], a: 3, say: "What fraction is at the question mark? Four fifths. Six fourths. Two sixths. Four sixths.", why: "The line has 6 equal jumps. The ? is 4 jumps from 0. That is 4/6." },
      { t: "num", q: "A bar has 8 equal parts. 5 parts are shaded. The fraction is □/8. What is □?", pic: P.frac(8, 5, "bar"), a: 5, say: "A bar has 8 equal parts. 5 parts are shaded. The fraction is box over 8. What is the box?", why: "5 parts are shaded, so the top number is 5. The fraction is 5/8." },
      { t: "mc", q: "Which is a unit fraction?", opts: ["2/3", "3/4", "1/6", "5/8"], a: 2, say: "Which is a unit fraction? Two thirds. Three fourths. One sixth. Five eighths.", why: "A unit fraction has 1 on top. 1/6 is a unit fraction." }
    ]
  });

  /* ===================== 12. Equivalent & comparing fractions (3.NF.A.3) ===================== */
  K3.add({
    id: "m-frac-compare",
    subject: "math",
    unit: "Fractions",
    title: "Equal and Compare Fractions",
    standard: "3.NF.A.3",
    skill: "Find equal fractions and compare fractions",
    emoji: "⚖️",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p><b>Equivalent</b> fractions are the same size.</p><p><b>1/2 = 2/4</b></p>", pic: P.frac(2, 1, "bar") + P.frac(4, 2, "bar"), say: "Equivalent fractions are the same size. One half equals two fourths." },
      { html: "<p>Same <b>bottom</b> number? More parts is bigger.</p><p><b>3/6 is greater than 2/6</b></p><p>Same <b>top</b> number? Fewer parts means bigger pieces.</p><p><b>1/3 is greater than 1/8</b></p>", pic: P.frac(3, 1, "bar") + P.frac(8, 1, "bar"), say: "Same bottom number? More parts is bigger. Three sixths is greater than two sixths. Same top number? Fewer parts means bigger pieces. One third is greater than one eighth." },
      { html: "<p>Whole numbers can be fractions.</p><p><b>4/4 = 1</b> whole</p><p><b>3/1 = 3</b></p>", pic: P.numline(0, 1, 4, [[0, "0"], [1, "4/4 = 1"]]), say: "Whole numbers can be fractions. Four fourths equals 1 whole. Three over one equals 3." }
    ],
    qs: [
      { t: "mc", q: "Look at the bars. Which is true?", pic: P.frac(2, 1, "bar") + P.frac(4, 2, "bar"), opts: ["1/2 = 2/4", "1/2 is greater than 2/4", "1/2 is less than 2/4"], a: 0, say: "Look at the bars. Which is true? One half equals two fourths. One half is greater than two fourths. One half is less than two fourths.", why: "The shaded parts are the same size. 1/2 = 2/4." },
      { t: "mc", q: "Compare 3/8 and 5/8.", pic: P.frac(8, 3, "bar") + P.frac(8, 5, "bar"), opts: ["3/8 is greater", "3/8 is less", "They are equal"], a: 1, say: "Compare three eighths and five eighths. Three eighths is greater. Three eighths is less. They are equal.", why: "Same size parts. 3 parts is less than 5 parts." },
      { t: "mc", q: "Compare 1/3 and 1/6.", pic: P.frac(3, 1, "bar") + P.frac(6, 1, "bar"), opts: ["1/3 is less", "They are equal", "1/3 is greater"], a: 2, say: "Compare one third and one sixth. One third is less. They are equal. One third is greater.", why: "Thirds are bigger pieces than sixths. So 1/3 is greater." },
      { t: "tf", q: "2/3 = 4/6", pic: P.frac(3, 2, "bar") + P.frac(6, 4, "bar"), a: true, say: "Two thirds equals four sixths. True or false?", why: "Yes! The shaded parts are the same size." },
      { t: "mc", q: "Which number is equal to 4/4?", opts: ["4", "0", "1/4", "1"], a: 3, say: "Which number is equal to four fourths? 4. 0. One fourth. 1.", why: "4 of 4 parts is the whole thing. 4/4 = 1." },
      { t: "num", q: "3/1 = □", a: 3, say: "Three over one equals what whole number?", why: "3/1 means 3 wholes. 3/1 = 3." },
      { t: "mc", q: "Pedro ate 1/4 of a burrito. Ana ate 1/2 of the same size burrito. Who ate more?", opts: ["Pedro", "Ana", "They ate the same"], a: 1, say: "Pedro ate one fourth of a burrito. Ana ate one half of the same size burrito. Who ate more? Pedro. Ana. They ate the same.", why: "Halves are bigger than fourths. Ana ate more." },
      { t: "sort", q: "Is it equal to 1/2? Sort each fraction.", bins: ["Equal to 1/2", "Not equal to 1/2"], items: [["2/4", 0], ["3/6", 0], ["4/8", 0], ["1/3", 1], ["3/4", 1], ["2/8", 1]], say: "Is it equal to one half? Sort each fraction.", why: "2/4, 3/6, and 4/8 are all half of the whole." },
      { t: "mc", q: "Which fraction is the biggest?", opts: ["2/8", "1/8", "5/8", "3/8"], a: 2, say: "Which fraction is the biggest? Two eighths. One eighth. Five eighths. Three eighths.", why: "They all have eighths. 5 eighths is the most parts." },
      { t: "num", q: "1/2 = □/4", pic: P.frac(2, 1, "bar") + P.frac(4, 0, "bar"), a: 2, say: "One half equals how many fourths?", why: "1/2 covers 2 of the 4 parts. 1/2 = 2/4." }
    ]
  });

  /* ===================== 13. Time (3.MD.A.1) ===================== */
  K3.add({
    id: "m-time",
    subject: "math",
    unit: "Measurement & Data",
    title: "Time to the Minute",
    standard: "3.MD.A.1",
    skill: "Tell time to the minute and find elapsed time",
    emoji: "⏰",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>The <b>short</b> hand shows the hour.</p><p>The <b>long</b> hand shows the minutes. Count by 5s.</p><p>This clock shows <b>3:25</b>.</p>", pic: P.clock(3, 25), say: "The short hand shows the hour. The long hand shows the minutes. Count by 5s. This clock shows 3:25." },
      { html: "<p>Each little mark is <b>1 minute</b>.</p><p>Count by 5s, then by 1s.</p><p>25, 26, 27. This clock shows <b>3:27</b>.</p>", pic: P.clock(3, 27), say: "Each little mark is 1 minute. Count by 5s, then by 1s. 25, 26, 27. This clock shows 3:27." },
      { html: "<p><b>Elapsed time</b> is how much time passes.</p><p>Start 2:15. End 2:45.</p><p>Count up: <b>30 minutes</b>.</p>", pic: P.numline(0, 30, 6, [[0, "2:15"], [30, "2:45"]]), say: "Elapsed time is how much time passes. Start at 2:15. End at 2:45. Count up. That is 30 minutes." }
    ],
    qs: [
      { t: "mc", q: "What time is it?", pic: P.clock(7, 40), opts: ["8:40", "7:40", "7:08", "8:07"], a: 1, say: "What time is it? 8:40. 7:40. 7:08. 8:07.", why: "The short hand is past 7. The long hand is on the 8, which is 40 minutes. 7:40." },
      { t: "mc", q: "What time is it?", pic: P.clock(10, 13), opts: ["10:13", "2:50", "10:03", "11:13"], a: 0, say: "What time is it? 10:13. 2:50. 10:03. 11:13.", why: "The long hand is 3 marks past the 2. That is 10, 11, 12, 13 minutes. 10:13." },
      { t: "mc", q: "What time is it?", pic: P.clock(4, 52), opts: ["5:52", "4:10", "10:20", "4:52"], a: 3, say: "What time is it? 5:52. 4:10. 10:20. 4:52.", why: "The short hand is almost at 5, but not yet. It is still 4. The long hand shows 52 minutes. 4:52." },
      { t: "num", q: "Recess starts at 10:15. It ends at 10:35. How many minutes is recess?", a: 20, unit: "minutes", why: "From 10:15 to 10:35 is 20 minutes." },
      { t: "mc", q: "Lunch starts at 11:50. It lasts 30 minutes. When does lunch end?", opts: ["12:30", "12:50", "12:20", "11:20"], a: 2, why: "11:50 + 10 minutes = 12:00. Then 20 more minutes = 12:20." },
      { t: "numline", q: "Soccer practice starts at 4:00. It ends at 4:50. How many minutes is practice? Tap it.", min: 0, max: 60, ticks: 12, a: 50, label: "minutes", why: "From 4:00 to 4:50 is 50 minutes." },
      { t: "num", q: "Mamá puts tamales on the stove at 3:10. They cook for 45 minutes. They are done at 3:__. Type the missing minutes.", a: 55, unit: "minutes", say: "Mamá puts tamales on the stove at 3:10. They cook for 45 minutes. They are done at 3 and how many minutes? Type the missing minutes.", why: "10 + 45 = 55. The tamales are done at 3:55. ¡Qué rico!" },
      { t: "tf", q: "This clock shows 6:05.", pic: P.clock(6, 5), a: true, why: "Yes! The short hand is just past 6. The long hand is on the 1, which is 5 minutes." },
      { t: "mc", q: "A movie starts at 1:20. It ends at 2:40. How long is the movie?", opts: ["1 hour 20 minutes", "2 hours 20 minutes", "1 hour 40 minutes", "40 minutes"], a: 0, why: "1:20 to 2:20 is 1 hour. 2:20 to 2:40 is 20 minutes. 1 hour 20 minutes." },
      { t: "num", q: "Library time starts at 9:05. It ends at 9:42. How many minutes is library time?", a: 37, unit: "minutes", why: "42 − 5 = 37 minutes." }
    ]
  });

  /* ===================== 14. Graphs (3.MD.B.3) ===================== */
  var lunchGraph = P.bars("Favorite Lunch", [["Tacos", 12], ["Pizza", 8], ["Salad", 4], ["Soup", 6]], "kids", 2);
  var cowGraph = P.bars("Cows Milked", [["Mon", 50], ["Tue", 35], ["Wed", 45], ["Thu", 20]], "cows", 5);
  K3.add({
    id: "m-graphs",
    subject: "math",
    unit: "Measurement & Data",
    title: "Picture and Bar Graphs",
    standard: "3.MD.B.3",
    skill: "Read picture graphs and bar graphs with a scale",
    emoji: "📊",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p>A <b>bar graph</b> uses bars to show data.</p><p>Read the <b>scale</b>. Here the lines count by <b>2</b>.</p><p>8 kids like peaches.</p>", pic: P.bars("Favorite Fruit", [["Orange", 6], ["Grape", 4], ["Peach", 8]], "kids", 2), say: "A bar graph uses bars to show data. Read the scale. Here the lines count by 2. 8 kids like peaches." },
      { html: "<p>A <b>picture graph</b> uses pictures.</p><p>Check the <b>key</b>! If each 🐄 = 5 cows, then 🐄🐄🐄 = <b>15</b> cows.</p>", pic: row("Barn A", "🐄", 3) + key("🐄", 5, "cows"), say: "A picture graph uses pictures. Check the key. If each cow picture means 5 cows, then 3 cow pictures mean 15 cows." }
    ],
    qs: [
      { t: "num", q: "How many kids like tacos best?", pic: lunchGraph, a: 12, unit: "kids", why: "The tacos bar goes up to 12." },
      { t: "num", q: "How many more kids like tacos than pizza?", pic: lunchGraph, a: 4, unit: "kids", why: "Tacos 12, pizza 8. 12 − 8 = 4 more kids." },
      { t: "mc", q: "Which lunch got the fewest votes?", pic: lunchGraph, opts: ["Tacos", "Pizza", "Soup", "Salad"], a: 3, why: "Salad has the shortest bar. Only 4 kids picked it." },
      { t: "num", q: "How many kids voted in all?", pic: lunchGraph, a: 30, unit: "kids", why: "12 + 8 + 4 + 6 = 30 kids." },
      { t: "mc", q: "On which day were 45 cows milked?", pic: cowGraph, opts: ["Mon", "Wed", "Tue", "Thu"], a: 1, say: "On which day were 45 cows milked? Monday. Wednesday. Tuesday. Thursday.", why: "The Wednesday bar stops at 45." },
      { t: "num", q: "How many fewer cows were milked on Thursday than on Monday?", pic: cowGraph, a: 30, unit: "cows", why: "Monday 50, Thursday 20. 50 − 20 = 30 fewer." },
      { t: "tf", q: "Tuesday and Thursday together equal Monday.", pic: cowGraph, a: false, why: "35 + 20 = 55. Monday is 50. They are not equal." },
      { t: "mc", q: "On a bar graph, each square = 5. A bar is 4 squares tall. What number does the bar show?", opts: ["4", "9", "20", "45"], a: 2, why: "4 squares of 5 is 4 × 5 = 20." },
      { t: "num", q: "How many oranges did Rancho Gómez pick?", pic: row("Rancho Gómez", "🍊", 6) + key("🍊", 10, "oranges"), a: 60, unit: "oranges", why: "Each 🍊 = 10. 6 × 10 = 60 oranges." },
      { t: "mc", q: "Ms. Reyes wants to show 40 books on a picture graph. Each 📚 = 10 books. How many 📚 should she draw?", opts: ["40", "4", "10", "14"], a: 1, say: "Ms. Reyes wants to show 40 books on a picture graph. Each book picture means 10 books. How many book pictures should she draw? 40. 4. 10. 14.", why: "40 ÷ 10 = 4. She draws 4 pictures." }
    ]
  });

  /* ===================== 15. Area (3.MD.C.5-7) ===================== */
  K3.add({
    id: "m-area",
    subject: "math",
    unit: "Measurement & Data",
    title: "Area",
    standard: "3.MD.C.7",
    skill: "Find area by counting squares and multiplying",
    emoji: "🟩",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p><b>Area</b> is how many unit squares cover a shape.</p><p>Count them: <b>12 square units</b>.</p>", pic: P.area(4, 3, "units", true), say: "Area is how many unit squares cover a shape. Count them. 12 square units." },
      { html: "<p>Faster: <b>multiply</b>!</p><p>3 rows of 4 squares</p><p>3 × 4 = <b>12 square units</b></p>", pic: P.array(3, 4, "🟩"), say: "Faster: multiply. 3 rows of 4 squares. 3 times 4 equals 12 square units." },
      { html: "<p>Big shape? <b>Break it</b> into rectangles. Then <b>add</b>.</p><p>4 × 3 = 12 and 2 × 2 = 4</p><p>12 + 4 = <b>16 square units</b></p>", pic: P.area(4, 3, "units", true) + P.area(2, 2, "units", true), say: "Big shape? Break it into rectangles. Then add. 4 times 3 equals 12, and 2 times 2 equals 4. 12 plus 4 equals 16 square units." }
    ],
    qs: [
      { t: "num", q: "Count the squares. What is the area?", pic: P.area(5, 2, "units", true), a: 10, unit: "square units", why: "2 rows of 5 squares. 2 × 5 = 10 square units." },
      { t: "num", q: "What is the area?", pic: P.area(6, 4, "units", true), a: 24, unit: "square units", why: "4 rows of 6 squares. 4 × 6 = 24 square units." },
      { t: "mc", q: "A garden is 7 feet long and 3 feet wide. What is its area?", pic: P.area(7, 3, "ft", false), opts: ["10 square feet", "21 square feet", "20 square feet", "14 square feet"], a: 1, why: "7 × 3 = 21 square feet." },
      { t: "num", q: "A rug is 8 feet long and 5 feet wide. What is its area?", a: 40, unit: "square feet", why: "8 × 5 = 40 square feet." },
      { t: "tf", q: "A rectangle is 9 units by 2 units. Its area is 11 square units.", a: false, why: "Area means multiply: 9 × 2 = 18 square units. 9 + 2 is not area." },
      { t: "mc", q: "Which is NOT a way to find the area of a 4 by 6 rectangle?", opts: ["4 × 6", "Count all the squares", "4 + 6", "6 + 6 + 6 + 6"], a: 2, why: "4 + 6 = 10 is wrong. The area is 4 × 6 = 24." },
      { t: "num", q: "A 4 by 9 rectangle is split into a 4 by 5 and a 4 by 4. 20 + 16 = □. What is the area?", a: 36, unit: "square units", say: "A 4 by 9 rectangle is split into a 4 by 5 and a 4 by 4. 20 plus 16 equals what? What is the area?", why: "20 + 16 = 36. And 4 × 9 = 36 too!" },
      { t: "num", q: "The class carpet is 10 feet long and 7 feet wide. What is its area?", a: 70, unit: "square feet", why: "10 × 7 = 70 square feet." },
      { t: "mc", q: "Tío Beto's garden is an L shape. It is a 4 by 3 rectangle and a 2 by 2 rectangle put together. What is the total area?", opts: ["16 square feet", "12 square feet", "20 square feet", "9 square feet"], a: 0, why: "4 × 3 = 12. 2 × 2 = 4. 12 + 4 = 16 square feet." },
      { t: "mc", q: "A rectangle has an area of 24 square units. One side is 6 units. How long is the other side?", opts: ["18 units", "30 units", "3 units", "4 units"], a: 3, why: "6 × 4 = 24. The other side is 4 units." }
    ]
  });

  /* ===================== 16. Perimeter (3.MD.D.8) ===================== */
  K3.add({
    id: "m-perimeter",
    subject: "math",
    unit: "Measurement & Data",
    title: "Perimeter",
    standard: "3.MD.D.8",
    skill: "Find the perimeter of a shape",
    emoji: "📏",
    mins: 12,
    pass: 80,
    learn: [
      { html: "<p><b>Perimeter</b> is the distance <b>around</b> a shape.</p><p>Add all the sides.</p><p>5 + 3 + 5 + 3 = <b>16 cm</b></p>", pic: P.area(5, 3, "cm", false), say: "Perimeter is the distance around a shape. Add all the sides. 5 plus 3 plus 5 plus 3 equals 16 centimeters." },
      { html: "<p><b>Area</b> covers the inside.</p><p><b>Perimeter</b> goes around the outside, like a fence.</p>", pic: P.area(5, 3, "cm", true), say: "Area covers the inside. Perimeter goes around the outside, like a fence." },
      { html: "<p>Missing side? <b>Subtract</b>.</p><p>Perimeter is 20. Sides are 6, 4, 6, and ?</p><p>6 + 4 + 6 = 16. 20 − 16 = <b>4</b></p>", say: "Missing side? Subtract. The perimeter is 20. The sides are 6, 4, 6, and a missing side. 6 plus 4 plus 6 is 16. 20 minus 16 is 4." }
    ],
    qs: [
      { t: "num", q: "A rectangle is 4 cm long and 2 cm wide. What is the perimeter?", pic: P.area(4, 2, "cm", false), a: 12, unit: "cm", why: "4 + 2 + 4 + 2 = 12 cm." },
      { t: "num", q: "A square has sides of 6 inches. What is the perimeter?", a: 24, unit: "inches", why: "A square has 4 equal sides. 6 + 6 + 6 + 6 = 24 inches." },
      { t: "mc", q: "Tío Manuel puts a fence around his garden. The garden is 9 feet by 5 feet. How much fence does he need?", opts: ["45 feet", "14 feet", "28 feet", "19 feet"], a: 2, why: "9 + 5 + 9 + 5 = 28 feet of fence." },
      { t: "num", q: "A triangle has sides of 5, 7, and 8 inches. What is the perimeter?", a: 20, unit: "inches", why: "5 + 7 + 8 = 20 inches." },
      { t: "sort", q: "Area or perimeter? Sort each job.", bins: ["Area", "Perimeter"], items: [["Fence around a yard", 1], ["Carpet for a floor", 0], ["Frame around a picture", 1], ["Tiles for a kitchen floor", 0], ["Grass seed for a soccer field", 0], ["Tape around the edge of a desk", 1]], why: "Covering the inside is area. Going around the edge is perimeter." },
      { t: "num", q: "A rectangle has a perimeter of 18 cm. Its sides are 5 cm, 4 cm, 5 cm, and □ cm. What is the missing side?", a: 4, unit: "cm", say: "A rectangle has a perimeter of 18 centimeters. Its sides are 5, 4, 5, and a missing side. What is the missing side?", why: "5 + 4 + 5 = 14. 18 − 14 = 4 cm." },
      { t: "mc", q: "These rectangles all have a perimeter of 16 units. Which one has the biggest area?", opts: ["4 by 4", "2 by 6", "3 by 5"], a: 0, say: "These rectangles all have a perimeter of 16 units. Which one has the biggest area? 4 by 4. 2 by 6. 3 by 5.", why: "4 × 4 = 16, 2 × 6 = 12, 3 × 5 = 15. The 4 by 4 square is biggest." },
      { t: "tf", q: "A 3 by 4 rectangle has a perimeter of 12 units.", a: false, why: "3 + 4 + 3 + 4 = 14 units. 12 is the area, not the perimeter." },
      { t: "mc", q: "A drawing of a soccer field is 10 m by 6 m. What is the perimeter?", opts: ["60 m", "16 m", "26 m", "32 m"], a: 3, why: "10 + 6 + 10 + 6 = 32 m." },
      { t: "mc", q: "A shape has 5 sides. Each side is 3 cm. What is the perimeter?", opts: ["8 cm", "15 cm", "18 cm", "53 cm"], a: 1, why: "5 sides of 3 cm is 5 × 3 = 15 cm." }
    ]
  });
})();
