/* k3-sample.js · SAMPLE content for testing the engine.
   index.html loads this file ONLY when the real content files added no activities
   or no passages (or when the page URL has ?sample=1). Safe to delete. */
(function () {
  var force = typeof location !== "undefined" && /[?&]sample=1/.test(location.search);
  var addActs = force || !(K3.acts && K3.acts.length), addPass = force || !(K3.passages && K3.passages.length);

  if (addActs) {
    K3.add({
      id: "m-sample-fractions", subject: "math", unit: "Fractions", title: "Fraction Fun at the Orange Grove",
      standard: "3.NF.A.2", skill: "Show fractions on a number line and with shapes", emoji: "🍊", mins: 8, pass: 80,
      learn: [
        { html: "<p>A <b>fraction</b> names equal parts of a whole.</p><p>The bottom number tells how many equal parts. The top number tells how many we count.</p>", pic: K3.pic.frac(4, 3, "bar"), say: "A fraction names equal parts of a whole. The bottom number tells how many equal parts. The top number tells how many we count." },
        { html: "<p>On a <b>number line</b>, split the space from 0 to 1 into equal parts.</p>", pic: K3.pic.numline(0, 1, 4, [[0.75, "3/4"]]), say: "On a number line, split the space from 0 to 1 into equal parts." }
      ],
      qs: [
        { t: "mc", q: "What fraction of the bar is shaded?", pic: K3.pic.frac(4, 1, "bar"), opts: ["1/4", "1/3", "3/4", "4/1"], a: 0, why: "1 part is shaded out of 4 equal parts. That is 1/4." },
        { t: "tf", q: "True or false: 2/4 of a pizza is the same as 1/2 of the pizza.", a: true, why: "2 out of 4 equal slices is half the pizza." },
        { t: "num", q: "Rosa picks 3 of the 4 equal rows of oranges. What fraction did she pick? Type it like 3/4.", a: 0.75, why: "3 rows out of 4 equal rows is 3/4." },
        { t: "shade", q: "Shade 2/3 of the circle.", parts: 3, a: 2, shape: "circle", why: "The circle has 3 equal parts. Shade 2 of them." },
        { t: "numline", q: "Put 3/4 on the number line.", min: 0, max: 1, ticks: 4, a: 0.75, label: "3/4", why: "Split 0 to 1 into 4 equal jumps. Count 3 jumps." },
        { t: "order", q: "Put these fractions in order from smallest to biggest.", items: ["1/8", "1/4", "1/2", "1"], why: "When the top number is 1, more parts means smaller pieces." },
        { t: "mc", q: "Which clock shows 3:30?", opts: [K3.pic.clock(6, 15), K3.pic.clock(3, 30), K3.pic.clock(12, 15)], a: 1, why: "The short hand is between 3 and 4. The long hand is on the 6." },
        { t: "num", q: "A garden is 4 feet long and 3 feet wide. What is its area?", pic: K3.pic.area(4, 3, "ft", true), a: 12, unit: "square feet", why: "4 times 3 is 12 square feet." }
      ]
    });

    K3.add({
      id: "r-sample-garden", subject: "reading", unit: "Key Ideas", title: "The School Garden",
      standard: "RL.3.1", skill: "Ask and answer questions about a story", emoji: "🌻", mins: 10, pass: 80,
      passage: {
        title: "The School Garden", lexile: "about 500L",
        text: [
          "Marisol Fuentes loved Tuesdays. On Tuesdays, her class worked in the school garden at Alpine Vista.",
          "This week the tomato plants looked sad. Their leaves were dry and brown. “I think they need water,” said her friend Diego.",
          "Marisol filled the watering can. She gave each plant a long, slow drink. By Friday the leaves were green again, and Marisol smiled."
        ]
      },
      qs: [
        { t: "mc", q: "Why did the tomato plants look sad?", opts: ["They had too much sun cream.", "They needed water.", "A dog ate them.", "It was too cold."], a: 1, why: "The leaves were dry and brown, so the plants needed water." },
        { t: "tap", q: "Tap the two NAMES of people in this sentence.", words: ["Marisol", "and", "Diego", "worked", "in", "the", "garden."], a: [0, 2], why: "Marisol and Diego are names of people." },
        { t: "build", q: "Build a sentence about the story.", words: ["Marisol", "watered", "the", "tomato", "plants."], why: "A sentence starts with a capital letter and ends with a period." },
        { t: "sort", q: "Sort: did it happen at the BEGINNING or the END?", bins: ["Beginning", "End"], items: [["The leaves were dry.", 0], ["The leaves were green.", 1], ["Diego said they need water.", 0], ["Marisol smiled.", 1]], why: "First the plants were dry. At the end they were green again." },
        { t: "tf", q: "True or false: The class worked in the garden on Tuesdays.", a: true, why: "The story says on Tuesdays her class worked in the garden." },
        { t: "mc", q: "How did Marisol feel at the end?", opts: ["Angry", "Sleepy", "Happy", "Scared"], a: 2, why: "Marisol smiled. That shows she was happy." },
        { t: "write", q: "How did Marisol help the plants? Use a detail from the story.", min: 8, frames: ["Marisol helped the plants by", "In the story,"], checks: [{ label: "Tell what Marisol did (water)", re: /water/i }, { label: "Start with a capital letter", re: /^\s*[A-Z]/ }, { label: "End with a period", re: /[.!]\s*$/ }], why: "Great readers use details from the story." }
      ]
    });

    K3.add({
      id: "s-sample-living", subject: "science", unit: "Life Cycles", title: "Living or Nonliving?",
      standard: "3-LS1-1", skill: "Tell how living things grow and change", emoji: "🐄", mins: 7, pass: 80,
      learn: [{ html: "<p><b>Living</b> things grow, need food and water, and make new living things.</p>", pic: K3.pic.groups(2, 3, "🐄"), say: "Living things grow, need food and water, and make new living things." }],
      qs: [
        { t: "sort", q: "Sort the things.", bins: ["Living 🌱", "Nonliving 🪨"], items: [["dairy cow", 0], ["rock", 1], ["orange tree", 0], ["soccer ball", 1], ["butterfly", 0]], why: "Cows, trees, and butterflies grow and need food. Rocks and balls do not." },
        { t: "order", q: "Put the butterfly life cycle in order.", items: ["egg", "caterpillar", "chrysalis", "butterfly"], why: "A butterfly starts as an egg, then a caterpillar, then a chrysalis." },
        { t: "mc", q: "What does a calf need to grow?", opts: ["Toys", "Milk and water", "A backpack", "Sunglasses"], a: 1, why: "Living things need food and water to grow." },
        { t: "tf", q: "True or false: A rock can grow into a bigger rock by eating.", a: false, why: "Rocks are not living. They do not eat or grow." },
        { t: "tap", q: "Tap the LIVING things.", words: ["cow", "chair", "tree", "pencil", "bee"], a: [0, 2, 4], why: "A cow, a tree, and a bee are alive." },
        { t: "mc", q: "How many cows in all? 3 groups of 4.", pic: K3.pic.array(3, 4, "🐄"), opts: ["7", "10", "11", "12"], a: 3, why: "3 rows of 4 is 12." }
      ]
    });
  }

  if (addPass) {
    K3.addPassage({ id: "p-sample-fall", title: "Saturday at the Farmers Market", season: "fall", text: "Every Saturday morning, Lucas and his abuela walk to the farmers market in downtown Tulare. The air smells like warm bread and sweet oranges. Abuela always brings her big blue bag. First they visit the stand with the shiny red apples. Mr. Ramirez lets Lucas pick six apples for the week. Next they buy fresh corn, green beans, and a bundle of cilantro. Lucas likes to count the money and hand it to the farmer. At the last stand, a woman sells honey from her bees. She lets Lucas taste a tiny spoonful. It is so sweet that he closes his eyes. On the walk home, the bag is heavy, so Lucas helps carry it. Abuela says the market is her favorite part of the week. Lucas thinks it is his favorite part too. When they get home, they wash the apples and put them in a bowl on the table. Then Abuela makes warm tortillas, and Lucas sets out the honey. They eat lunch together and talk about what to buy next Saturday." });
    K3.addPassage({ id: "p-sample-winter", title: "Fog Day", season: "winter", text: "In the winter, thick fog sometimes covers the Central Valley. One morning, Ana looked out her window and could not see the street. The whole world was gray and soft. Her dad turned on the car lights and drove very slowly to school. At Alpine Vista, the teachers kept everyone inside for morning recess. Ana and her friends played a quiet game of cards in the library. By lunch, the sun began to shine through the fog. Little by little, the trees and the playground came back. Ana ran outside and took a deep breath of the cool, wet air. She liked the fog, but she liked the sunshine even more." });
  }
})();
