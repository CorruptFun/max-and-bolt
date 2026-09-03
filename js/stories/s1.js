/* Season 1 — 1st grade. Short sentences, sight words, sound-it-out words. ~50–70 words each. */
(function () {
  const S = (window.STORIES = window.STORIES || []);

  S.push({
    id: "s1e1", season: 1, num: 1, title: "The Toaster Robot",
    blurb: "Max builds a robot out of a toaster. It works. Sort of.",
    cover: { bg: "garage", cast: [{ who: "max", mood: "excited", pose: "up", x: 35 }, { who: "bolt", mood: "surprised", x: 68, flip: true }], fx: "zap" },
    vocab: { plan: "An idea about what to do.", robot: "A machine that can move and do jobs.", toaster: "A machine that makes bread hot and crispy.", shiny: "Bright, like it is full of light.", grab: "To take hold of something fast." },
    pages: [
      { art: { bg: "garage", cast: [{ who: "max", mood: "think", pose: "think", x: 40 }], props: [{ e: "📦", x: 75, y: 75, s: 50 }] },
        lines: [{ n: "Max has a plan." }, { w: "max", t: "I will make a robot!" }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "happy", pose: "hold", x: 40 }], props: [{ e: "🍞", x: 68, y: 55, s: 44 }, { e: "🧰", x: 84, y: 76, s: 44 }, { e: "🪛", x: 20, y: 76, s: 36 }] },
        lines: [{ n: "{He} gets a toaster." }, { n: "{He} gets a fan." }, { n: "{He} gets a lot of tape." }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "worried", pose: "point", x: 35 }], props: [{ e: "🔩", x: 72, y: 70, s: 40 }] },
        math: { intro: "Max looks in the box.", q: "Max needs 6 bolts. {He} has 4. How many more does {he} need?", answer: "2", choices: ["1", "2", "3", "4"], hint: "Count up from 4. Five, six. That is 2 more.", success: "Max has 6 bolts. Yes!" } },
      { art: { bg: "garage", cast: [{ who: "max", mood: "surprised", pose: "point", x: 30 }, { who: "bolt", mood: "excited", pose: "up", x: 68, flip: true }], fx: "zap" },
        lines: [{ n: "Max taps the red button." }, { w: "bolt", t: "Hi! I am Bolt." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "excited", pose: "run", x: 45 }], fx: "speed" },
        lines: [{ n: "Bolt can talk." }, { n: "Bolt can run." }, { n: "Bolt can grab." }] },
      { art: { bg: "kitchen", cast: [{ who: "bolt", mood: "love", pose: "up", x: 40 }], props: [{ e: "🥄", x: 68, y: 40, s: 50 }], fx: "sparkle" },
        lines: [{ n: "Bolt sees a spoon." }, { n: "It is shiny." }, { w: "bolt", t: "Mine!" }] },
      { art: { bg: "kitchen", cast: [{ who: "zoe", mood: "mad", pose: "point", x: 30 }, { who: "bolt", mood: "worried", pose: "hold", x: 70, flip: true }], props: [{ e: "🥄", x: 70, y: 70, s: 30 }] },
        lines: [{ n: "Zoe sees Bolt." }, { n: "Zoe sees the spoon." }, { w: "zoe", t: "MOM!" }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "laugh", pose: "run", x: 35 }, { who: "bolt", mood: "excited", pose: "run", x: 65 }], fx: "speed" },
        lines: [{ n: "Max and Bolt run." }, { n: "This is a good day." }] },
    ],
    quiz: [
      { q: "What did Max use to make Bolt?", c: ["A toaster", "A rock", "A cake", "A hat"], a: 0 },
      { q: "What does Bolt love?", c: ["Mud", "Shiny things", "Rain", "Naps"], a: 1 },
      { q: "Who yelled MOM?", c: ["Max", "Bolt", "Zoe", "The cat"], a: 2 },
    ],
  });

  S.push({
    id: "s1e2", season: 1, num: 2, title: "The Big Jump",
    blurb: "A bike. A ramp. A robot in a box. What could go wrong?",
    cover: { bg: "yard", cast: [{ who: "max", mood: "excited", pose: "up", x: 30 }, { who: "bolt", mood: "worried", x: 70, flip: true }], props: [{ e: "🚲", x: 50, y: 80, s: 60 }] },
    vocab: { ramp: "A slope you can go up.", mud: "Wet, sticky dirt.", land: "To come down after being in the air.", fast: "Moving very quick." },
    pages: [
      { art: { bg: "yard", cast: [{ who: "max", mood: "happy", pose: "point", x: 35 }], props: [{ e: "🚲", x: 70, y: 82, s: 60 }, { e: "☀️", x: 12, y: 15, s: 40 }] },
        lines: [{ n: "It is hot." }, { n: "Max has a bike." }, { w: "max", t: "Let's jump!" }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "happy", pose: "hold", x: 30 }, { who: "bolt", mood: "happy", pose: "hold", x: 65, flip: true }], props: [{ e: "🪵", x: 48, y: 78, s: 50 }, { e: "🪵", x: 52, y: 66, s: 50 }] },
        lines: [{ n: "Max and Bolt make a ramp." }, { n: "It is big." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "worried", pose: "hips", x: 35 }, { who: "max", mood: "excited", pose: "cheer", x: 68, flip: true }] },
        lines: [{ w: "bolt", t: "I do not like this." }, { w: "max", t: "You will love it." }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "think", pose: "hold", x: 30 }, { who: "bolt", mood: "think", pose: "hold", x: 70, flip: true }], props: [{ e: "🪵", x: 50, y: 72, s: 40 }, { e: "🪵", x: 50, y: 84, s: 40 }] },
        math: { intro: "The ramp needs boards.", q: "Max has 2 boards. Bolt has 2 boards. How many boards is that?", answer: "4", choices: ["2", "3", "4", "5"], hint: "Two and two. Count them: 1, 2, 3, 4.", success: "Four boards! Big ramp!" } },
      { art: { bg: "yard", cast: [{ who: "max", mood: "excited", pose: "hold", x: 35, y: 80 }, { who: "bolt", mood: "worried", x: 65, y: 80, scale: .8 }], props: [{ e: "🚲", x: 35, y: 90, s: 70 }, { e: "📦", x: 65, y: 92, s: 50 }] },
        lines: [{ n: "Max gets on the bike." }, { n: "Bolt gets in the box." }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "excited", pose: "cheer", x: 55, y: 55 }], props: [{ e: "🚲", x: 55, y: 66, s: 70, r: -20 }], fx: "speed" },
        lines: [{ n: "The bike goes fast!" }, { n: "Up the ramp!" }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "laugh", pose: "up", x: 35 }, { who: "bolt", mood: "excited", pose: "up", x: 65, flip: true }], props: [{ e: "🟤", x: 50, y: 92, s: 90 }], fx: "splat" },
        lines: [{ n: "They land in the mud." }, { n: "Splat!" }, { w: "bolt", t: "I love it!" }] },
      { art: { bg: "yard", cast: [{ who: "zoe", mood: "think", pose: "hips", x: 30 }, { who: "max", mood: "sly", x: 60 }, { who: "bolt", mood: "sly", x: 82, scale: .9 }], props: [{ e: "🟤", x: 70, y: 92, s: 80 }] },
        lines: [{ n: "Zoe looks at the mud." }, { w: "zoe", t: "Mom will not love it." }] },
    ],
    quiz: [
      { q: "What did Max and Bolt make?", c: ["A cake", "A ramp", "A boat", "A bed"], a: 1 },
      { q: "Where did they land?", c: ["On the roof", "In the pool", "In the mud", "On a cat"], a: 2 },
      { q: "Who did not like the plan at first?", c: ["Bolt", "Max", "Mom", "Zoe"], a: 0 },
    ],
  });

  S.push({
    id: "s1e3", season: 1, num: 3, title: "Is the Cat a Spy?",
    blurb: "Mr. Whiskers has a hat. Where does a cat with a hat go?",
    cover: { bg: "yard", cast: [{ who: "cat", mood: "sly", x: 60, y: 90 }, { who: "bolt", mood: "surprised", pose: "point", x: 25 }] },
    vocab: { spy: "Someone who watches in secret.", hide: "To go where no one can see you.", deep: "Going a long way down.", wink: "To close one eye fast, as a joke." },
    pages: [
      { art: { bg: "room", cast: [{ who: "cat", mood: "happy", x: 50, y: 92 }, { who: "bolt", mood: "mad", pose: "point", x: 20, scale: .9 }, { who: "max", mood: "happy", x: 82, flip: true, scale: .9 }] },
        lines: [{ n: "This is Mr. Whiskers." }, { n: "He is a cat." }, { w: "bolt", t: "He is a spy." }, { w: "max", t: "Cats are not spies." }] },
      { art: { bg: "room", cast: [{ who: "cat", mood: "sly", x: 70, y: 92 }], props: [{ e: "🚪", x: 90, y: 62, s: 80 }], fx: "speed" },
        lines: [{ n: "The cat has a hat." }, { n: "He runs out the door." }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "surprised", x: 22, scale: .85 }, { who: "bolt", mood: "sly", x: 36, scale: .85 }, { who: "cat", mood: "sly", x: 80, y: 92, scale: .8 }] },
        lines: [{ n: "Max and Bolt go after him." }, { n: "They hide by a tree." }] },
      { art: { bg: "park", cast: [{ who: "cat", mood: "happy", x: 30, y: 90 }], props: [{ e: "🪨", x: 50, y: 88, s: 36 }, { e: "🪨", x: 62, y: 88, s: 36 }, { e: "🪨", x: 74, y: 88, s: 36 }] },
        math: { intro: "The cat jumps and jumps.", q: "The cat jumps over 3 rocks. Then 3 more rocks. How many rocks is that?", answer: "6", choices: ["3", "5", "6", "7"], hint: "Three rocks, then three more. 4, 5, 6.", success: "Six rocks! That cat can jump." } },
      { art: { bg: "yard", cast: [{ who: "cat", mood: "sly", x: 60, y: 84, scale: .8 }], props: [{ e: "📦", x: 60, y: 82, s: 90 }], propsBehind: false },
        lines: [{ n: "The cat goes in a box." }, { n: "The box has a door!" }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "worried", pose: "think", x: 40 }, { who: "bolt", mood: "surprised", x: 70, flip: true }], props: [{ e: "📦", x: 20, y: 84, s: 80 }], fx: "dark" },
        lines: [{ n: "Max looks in the box." }, { n: "It is dark." }, { n: "It is deep." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "sly", pose: "point", x: 35 }, { who: "max", mood: "think", pose: "hips", x: 68, flip: true }] },
        lines: [{ w: "bolt", t: "See? A spy." }, { w: "max", t: "It is just a box, Bolt." }] },
      { art: { bg: "night", cast: [{ who: "cat", mood: "sly", x: 50, y: 88, scale: 1.2 }], fx: "sparkle" },
        lines: [{ n: "The cat winks." }, { n: "The cat is a spy." }] },
    ],
    quiz: [
      { q: "What did the cat have on?", c: ["A hat", "A coat", "A shoe", "A bell"], a: 0 },
      { q: "Where did the cat go?", c: ["Up a tree", "In a box", "In the car", "To bed"], a: 1 },
      { q: "Is the cat a spy?", c: ["No", "He is a dog", "Yes", "He is a fish"], a: 2 },
    ],
  });

  S.push({
    id: "s1e4", season: 1, num: 4, title: "The Fun Ray",
    blurb: "Zoe is sad. Max has a fan, some glitter, and a very bad idea.",
    cover: { bg: "garage", cast: [{ who: "max", mood: "excited", pose: "point", x: 30 }, { who: "zoe", mood: "surprised", x: 70, flip: true }], fx: "sparkle" },
    vocab: { glitter: "Tiny bits that sparkle.", safe: "Not going to hurt you.", zap: "To hit with a beam, fast.", mad: "Very upset." },
    pages: [
      { art: { bg: "room", cast: [{ who: "zoe", mood: "worried", x: 30 }, { who: "max", mood: "happy", pose: "point", x: 70, flip: true }], fx: "rain" },
        lines: [{ n: "Zoe is sad." }, { n: "It is a bad day." }, { w: "max", t: "I can fix it!" }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "excited", pose: "hold", x: 40 }], props: [{ e: "🪭", x: 68, y: 62, s: 50 }, { e: "✨", x: 82, y: 40, s: 40 }] },
        lines: [{ n: "Max makes a Fun Ray." }, { n: "It has a fan." }, { n: "It has glitter." }] },
      { art: { bg: "garage", cast: [{ who: "bolt", mood: "worried", pose: "point", x: 30 }, { who: "max", mood: "sly", pose: "hips", x: 68, flip: true }] },
        lines: [{ w: "bolt", t: "Is it safe?" }, { w: "max", t: "It is fun. That is like safe." }] },
      { art: { bg: "garage", cast: [{ who: "bolt", mood: "surprised", pose: "hold", x: 40 }], props: [{ e: "✨", x: 62, y: 80, s: 30 }, { e: "✨", x: 72, y: 84, s: 30 }, { e: "✨", x: 82, y: 78, s: 30 }] },
        math: { intro: "Bolt drops some glitter.", q: "The Fun Ray has 10 tubes of glitter. Bolt spills 3. How many tubes are left?", answer: "7", choices: ["6", "7", "8", "13"], hint: "Start at 10. Take 3 away: 9, 8, 7.", success: "Seven tubes! Still a lot of glitter." } },
      { art: { bg: "yard", cast: [{ who: "max", mood: "excited", pose: "point", x: 25 }, { who: "zoe", mood: "surprised", pose: "up", x: 72, flip: true }], fx: "sparkle" },
        lines: [{ n: "Max zaps Zoe." }, { n: "Whoosh!" }] },
      { art: { bg: "yard", cast: [{ who: "zoe", mood: "surprised", x: 50 }], props: [{ e: "✨", x: 44, y: 38, s: 30 }, { e: "✨", x: 56, y: 44, s: 26 }, { e: "✨", x: 50, y: 90, s: 26 }], fx: "sparkle" },
        lines: [{ n: "Zoe has glitter in her hair." }, { n: "Glitter on her nose." }, { n: "Glitter in her shoes." }] },
      { art: { bg: "yard", cast: [{ who: "zoe", mood: "mad", pose: "point", x: 30 }, { who: "max", mood: "worried", x: 70, flip: true }], fx: "shake" },
        lines: [{ w: "zoe", t: "MAX!" }, { n: "She is mad." }, { n: "Very mad." }] },
      { art: { bg: "yard", cast: [{ who: "zoe", mood: "laugh", x: 30 }, { who: "bolt", mood: "happy", x: 68, flip: true }], props: [{ e: "✨", x: 66, y: 60, s: 30 }, { e: "✨", x: 74, y: 76, s: 26 }], fx: "hearts" },
        lines: [{ n: "Then she looks at Bolt." }, { n: "Bolt has glitter, too." }, { n: "Zoe laughs." }, { n: "It is a good day." }] },
    ],
    quiz: [
      { q: "Why did Max make the Fun Ray?", c: ["Zoe was sad", "He was hungry", "It was dark", "Bolt was lost"], a: 0 },
      { q: "What was in the Fun Ray?", c: ["Water", "Mud", "Glitter", "Jam"], a: 2 },
      { q: "How did Zoe feel at the end?", c: ["Sad", "Happy", "Sleepy", "Cold"], a: 1 },
    ],
  });
})();

/* Season 1 — episodes 5–8 (added 2026-09-02). */
(function () {
  const S = (window.STORIES = window.STORIES || []);

  S.push({
    id: "s1e5", season: 1, num: 5, title: "Bolt Gets Wet",
    blurb: "Drip, drop. Bolt does not like wet. Max has a very big hat.",
    cover: { bg: "yard", cast: [{ who: "bolt", mood: "worried", pose: "up", x: 40, hat: "bighat" }, { who: "max", mood: "happy", pose: "point", x: 75, flip: true }], fx: "rain" },
    vocab: { wet: "Covered in water.", dry: "Not wet at all.", idea: "A thought about what to do.", hide: "To go where no one can see you." },
    pages: [
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "worried", pose: "up", x: 50 }], fx: "rain" }, lines: [{ n: "Drip, drop. It is wet out." }, { w: "bolt", t: "I do not like wet." }] },
      { art: { bg: "garage", cast: [{ who: "bolt", mood: "worried", x: 45, y: 84, scale: .8 }], props: [{ e: "📦", x: 45, y: 82, s: 90 }] }, lines: [{ n: "Bolt runs in." }, { n: "Bolt hides in a box." }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "excited", pose: "up", x: 40 }], props: [{ e: "💡", x: 40, y: 20, s: 50 }] }, lines: [{ n: "Max has an idea." }, { w: "max", t: "A hat! A big hat!" }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "think", pose: "hold", x: 35 }], props: [{ e: "🥤", x: 62, y: 76, s: 34 }, { e: "🥤", x: 72, y: 76, s: 34 }, { e: "🥤", x: 82, y: 76, s: 34 }, { e: "🥤", x: 67, y: 60, s: 34 }, { e: "🥤", x: 77, y: 60, s: 34 }] },
        math: { intro: "The hat needs cups.", q: "Max needs 8 cups. {He} has 5. How many more does {he} need?", answer: "3", choices: ["2", "3", "4", "13"], hint: "Count up from 5 to 8. Six, seven, eight. That is 3.", success: "Three more cups! Bolt had them in the box." } },
      { art: { bg: "garage", cast: [{ who: "max", mood: "happy", pose: "hold", x: 40 }, { who: "bolt", mood: "surprised", x: 72, flip: true }], props: [{ p: "bighat", x: 40, y: 58, s: 64 }, { p: "cup", x: 78, y: 46, s: 22, r: -20 }, { p: "cup", x: 86, y: 40, s: 22, r: 15 }] }, lines: [{ n: "Max makes a hat." }, { n: "It is big. It is red." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "think", x: 50, hat: "bighat", hatS: 84 }], fx: "rain" }, lines: [{ n: "Bolt puts on the hat." }, { n: "Bolt goes out." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "excited", pose: "cheer", x: 50, hat: "bighat", hatS: 84 }], props: [{ p: "puddle", x: 50, y: 95, s: 90 }], fx: "rain" }, lines: [{ n: "Drip, drop. Bolt is dry!" }, { w: "bolt", t: "I love wet!" }] },
      { art: { bg: "yard", cast: [{ who: "zoe", mood: "mad", pose: "hips", x: 35 }, { who: "bolt", mood: "sly", x: 72, flip: true, hat: "bighat", hatS: 80 }], props: [{ p: "drop", x: 24, y: 40, s: 16 }, { p: "drop", x: 44, y: 34, s: 14 }, { p: "puddle", x: 35, y: 95, s: 80 }], fx: "rain" }, lines: [{ n: "Zoe gets wet." }, { w: "zoe", t: "Where is MY hat?" }] },
    ],
    quiz: [
      { q: "Where did Bolt hide?", c: ["In a box", "In a tree", "In the car", "In bed"], a: 0 },
      { q: "What did Max make?", c: ["A boat", "A hat", "A cake", "A bike"], a: 1 },
      { q: "Who got wet at the end?", c: ["Bolt", "Max", "Zoe", "The cat"], a: 2 },
    ],
  });

  S.push({
    id: "s1e6", season: 1, num: 6, title: "The Snack Bot",
    blurb: "Max is hungry. The Snack Bot can help. The Snack Bot has a very strong arm.",
    cover: { bg: "kitchen", cast: [{ who: "max", mood: "surprised", pose: "up", x: 30 }, { who: "bolt", mood: "excited", x: 70, flip: true }], props: [{ e: "🥨", x: 50, y: 20, s: 40, r: 30 }, { e: "🥨", x: 80, y: 30, s: 40, r: -20 }], fx: "zap" },
    vocab: { hungry: "Wanting to eat.", snack: "A small bit of food.", fling: "To throw hard and fast.", spring: "A coil that bounces." },
    pages: [
      { art: { bg: "kitchen", cast: [{ who: "max", mood: "worried", pose: "hold", x: 35 }, { who: "bolt", mood: "happy", x: 70, flip: true }] }, lines: [{ n: "Max is hungry." }, { n: "Bolt is not. Bolt cannot eat." }, { w: "max", t: "I will make a Snack Bot!" }] },
      { art: { bg: "garage", cast: [{ who: "max", mood: "happy", pose: "point", x: 30 }], props: [{ e: "🤖", x: 65, y: 70, s: 70 }, { e: "🥨", x: 85, y: 50, s: 34 }] }, lines: [{ n: "The Snack Bot has an arm." }, { n: "It has a cup. It has a spring." }] },
      { art: { bg: "kitchen", cast: [{ who: "max", mood: "surprised", x: 25 }], props: [{ e: "🤖", x: 55, y: 74, s: 60 }, { e: "🥨", x: 80, y: 20, s: 40, r: 45 }], fx: "zap" }, lines: [{ n: "Max puts in a snack." }, { n: "Zap! The snack flies!" }] },
      { art: { bg: "kitchen", cast: [{ who: "bolt", mood: "think", pose: "point", x: 30 }], props: [{ e: "🤖", x: 65, y: 74, s: 60 }, { e: "🥨", x: 88, y: 30, s: 30 }, { e: "🥨", x: 78, y: 20, s: 30 }] },
        math: { intro: "The snacks fly and fly.", q: "The Snack Bot has 9 snacks. It flings 4. How many snacks are left?", answer: "5", choices: ["4", "5", "6", "13"], hint: "Start at 9. Take away 4: 8, 7, 6, 5.", success: "Five snacks left. For now." } },
      { art: { bg: "kitchen", cast: [{ who: "zoe", mood: "surprised", x: 30 }, { who: "mom", mood: "surprised", x: 72, flip: true }], props: [{ e: "🥨", x: 30, y: 40, s: 34 }, { e: "🥨", x: 72, y: 36, s: 34 }] }, lines: [{ n: "One snack hits Zoe." }, { n: "One snack hits Mom." }] },
      { art: { bg: "kitchen", cast: [{ who: "cat", mood: "surprised", x: 50, y: 70, scale: .9 }], props: [{ e: "🥨", x: 50, y: 35, s: 40 }], fx: "sparkle" }, lines: [{ n: "The cat jumps up." }, { n: "The cat gets a snack." }] },
      { art: { bg: "yard", cast: [{ who: "cat", mood: "sly", x: 20, y: 92, scale: .8 }, { who: "max", mood: "surprised", pose: "run", x: 50 }, { who: "bolt", mood: "excited", pose: "run", x: 80 }], fx: "speed" }, lines: [{ n: "The cat runs." }, { n: "Max runs. Bolt runs." }] },
      { art: { bg: "kitchen", cast: [{ who: "max", mood: "worried", pose: "hold", x: 35 }, { who: "bolt", mood: "laugh", x: 70, flip: true }], props: [{ e: "🤖", x: 88, y: 76, s: 40 }] }, lines: [{ n: "The Snack Bot is fun." }, { n: "Max is still hungry." }] },
    ],
    quiz: [
      { q: "Why did Max make the Snack Bot?", c: ["Max was hungry", "Bolt was sad", "It was raining", "Zoe asked"], a: 0 },
      { q: "What did the Snack Bot do?", c: ["It sang", "It flung snacks", "It slept", "It ran"], a: 1 },
      { q: "Who got a snack?", c: ["Max", "Bolt", "The cat", "Dr. Dullsworth"], a: 2 },
    ],
  });

  S.push({
    id: "s1e7", season: 1, num: 7, title: "Up, Up, Bolt!",
    blurb: "One balloon. Then ten. Bolt is in the sky!",
    cover: { bg: "park", cast: [{ who: "bolt", mood: "surprised", pose: "up", x: 50, y: 60 }], props: [{ e: "🎈", x: 40, y: 22, s: 50 }, { e: "🎈", x: 55, y: 15, s: 50 }, { e: "🎈", x: 68, y: 25, s: 50 }], fx: "whoosh" },
    vocab: { sky: "The space way up above us.", pop: "A quick bang, like a balloon breaking.", ladder: "Steps you climb to get up high.", hug: "To hold someone close." },
    pages: [
      { art: { bg: "park", cast: [{ who: "max", mood: "happy", pose: "hold", x: 30 }, { who: "bolt", mood: "love", x: 70, flip: true }], props: [{ e: "🎈", x: 30, y: 40, s: 50 }, { e: "🎈", x: 22, y: 30, s: 50 }] }, lines: [{ n: "It is a big day." }, { n: "Max has balloons. Bolt wants one." }] },
      { art: { bg: "park", cast: [{ who: "bolt", mood: "excited", pose: "up", x: 50 }], props: [{ e: "🎈", x: 30, y: 30, s: 44 }, { e: "🎈", x: 42, y: 20, s: 44 }, { e: "🎈", x: 55, y: 15, s: 44 }, { e: "🎈", x: 68, y: 22, s: 44 }, { e: "🎈", x: 78, y: 34, s: 44 }] }, lines: [{ n: "Bolt gets one." }, { n: "Then two. Then ten!" }] },
      { art: { bg: "park", cast: [{ who: "bolt", mood: "surprised", pose: "up", x: 50, y: 45 }, { who: "max", mood: "surprised", pose: "up", x: 20 }], props: [{ e: "🎈", x: 42, y: 8, s: 44 }, { e: "🎈", x: 55, y: 5, s: 44 }, { e: "🎈", x: 66, y: 10, s: 44 }], fx: "whoosh" }, lines: [{ n: "Up, up, up!" }, { n: "Bolt is in the sky!" }, { w: "bolt", t: "Help!" }] },
      { art: { bg: "park", cast: [{ who: "max", mood: "think", pose: "point", x: 30 }, { who: "bolt", mood: "worried", pose: "up", x: 70, y: 50 }], props: [{ e: "🎈", x: 64, y: 14, s: 40 }, { e: "🎈", x: 76, y: 10, s: 40 }] },
        math: { intro: "Max has a plan.", q: "Bolt has 10 balloons. Max pops 6. How many balloons are left?", answer: "4", choices: ["3", "4", "5", "16"], hint: "Start at 10. Take away 6: 9, 8, 7, 6, 5, 4.", success: "Four balloons! Not enough to fly. Just enough to float." } },
      { art: { bg: "park", cast: [{ who: "bolt", mood: "worried", pose: "up", x: 60, y: 60 }], props: [{ e: "🎈", x: 55, y: 25, s: 40 }, { e: "💥", x: 70, y: 20, s: 40 }], fx: "boom" }, lines: [{ n: "Pop! Pop!" }, { n: "Bolt comes down. Bit by bit." }] },
      { art: { bg: "tree", cast: [{ who: "bolt", mood: "sly", pose: "hips", x: 50, y: 56, scale: .8 }], props: [{ e: "🐦", x: 80, y: 30, s: 30 }] }, lines: [{ n: "Bolt lands in a tree." }, { w: "bolt", t: "I am a bird now." }] },
      { art: { bg: "tree", cast: [{ who: "zoe", mood: "think", pose: "hold", x: 20, y: 96, scale: .9 }, { who: "max", mood: "happy", pose: "up", x: 45, y: 56, scale: .8 }, { who: "bolt", mood: "happy", x: 68, y: 56, scale: .8, flip: true }], props: [{ e: "🪜", x: 20, y: 70, s: 60 }] }, lines: [{ n: "Zoe gets a ladder." }, { n: "Max gets Bolt." }] },
      { art: { bg: "park", cast: [{ who: "max", mood: "happy", pose: "hold", x: 40 }, { who: "bolt", mood: "love", pose: "hold", x: 58, flip: true }], fx: "hearts" }, lines: [{ n: "Bolt hugs Max." }, { w: "bolt", t: "No more balloons." }, { n: "He wants a kite next." }] },
    ],
    quiz: [
      { q: "What lifted Bolt up?", c: ["A bird", "Balloons", "A rocket", "The wind"], a: 1 },
      { q: "Where did Bolt land?", c: ["In a pool", "On a car", "In a tree", "On the roof"], a: 2 },
      { q: "Who got the ladder?", c: ["Zoe", "Max", "Mom", "The cat"], a: 0 },
    ],
  });

  S.push({
    id: "s1e8", season: 1, num: 8, title: "The Big Mess",
    blurb: "Max's room is a mess. Bolt can clean fast. Too fast.",
    cover: { bg: "room", cast: [{ who: "bolt", mood: "excited", pose: "run", x: 50 }], props: [{ e: "🧸", x: 20, y: 80, s: 40 }, { e: "🧦", x: 80, y: 78, s: 34 }, { e: "🚗", x: 30, y: 60, s: 34 }], fx: "speed" },
    vocab: { mess: "Things all over the place.", clean: "Neat, with nothing on the floor.", spin: "To turn round and round.", oops: "What you say when you make a mistake." },
    pages: [
      { art: { bg: "room", cast: [{ who: "mom", mood: "mad", pose: "point", x: 30 }, { who: "max", mood: "worried", x: 70, flip: true }], props: [{ e: "🧸", x: 50, y: 88, s: 36 }, { e: "🧦", x: 85, y: 90, s: 30 }, { e: "🚗", x: 15, y: 90, s: 30 }, { e: "📚", x: 62, y: 92, s: 30 }] }, lines: [{ n: "Max's room is a mess." }, { n: "Mom is not happy." }, { w: "mom", t: "Clean up, Max." }] },
      { art: { bg: "room", cast: [{ who: "max", mood: "worried", pose: "point", x: 30 }, { who: "bolt", mood: "sly", pose: "hips", x: 70, flip: true }] }, lines: [{ w: "max", t: "Bolt, help me." }, { w: "bolt", t: "I have a plan." }] },
      { art: { bg: "room", cast: [{ who: "bolt", mood: "excited", pose: "run", x: 50 }], props: [{ e: "🧸", x: 20, y: 40, s: 36, r: 40 }, { e: "🧦", x: 80, y: 30, s: 30, r: -30 }, { e: "🚗", x: 30, y: 65, s: 30, r: 90 }], fx: "speed" }, lines: [{ n: "Bolt spins. Bolt grabs." }, { n: "Bolt is fast!" }] },
      { art: { bg: "room", cast: [{ who: "bolt", mood: "happy", pose: "hold", x: 40 }], props: [{ e: "📦", x: 70, y: 82, s: 70 }, { e: "🧸", x: 15, y: 88, s: 30 }, { e: "🚗", x: 25, y: 92, s: 26 }] },
        math: { intro: "Bolt counts the toys.", q: "There are 12 toys. Bolt puts 7 in the box. How many toys are still out?", answer: "5", choices: ["4", "5", "6", "19"], hint: "Start at 12. Take away 7. Or count up from 7 to 12: 8, 9, 10, 11, 12. That is 5.", success: "Five more toys! Bolt spins again." } },
      { art: { bg: "room", cast: [{ who: "max", mood: "excited", pose: "cheer", x: 35 }, { who: "bolt", mood: "sly", x: 70, flip: true }], props: [{ e: "📦", x: 88, y: 84, s: 60 }], fx: "sparkle" }, lines: [{ n: "The room is clean!" }, { n: "But..." }] },
      { art: { bg: "room", cast: [{ who: "max", mood: "surprised", pose: "point", x: 25 }], props: [{ e: "📦", x: 65, y: 80, s: 90 }, { e: "🧦", x: 58, y: 62, s: 26 }, { e: "🧸", x: 72, y: 60, s: 26 }, { e: "🐱", x: 65, y: 70, s: 30 }] }, lines: [{ n: "Bolt put it ALL in the box." }, { n: "The toys. The socks. The cat." }] },
      { art: { bg: "room", cast: [{ who: "cat", mood: "surprised", x: 40, y: 92 }, { who: "bolt", mood: "worried", x: 75, flip: true }], fx: "shake" }, lines: [{ n: "The cat is mad." }, { w: "bolt", t: "Oops." }] },
      { art: { bg: "room", cast: [{ who: "mom", mood: "laugh", x: 25 }, { who: "max", mood: "laugh", x: 55 }, { who: "cat", mood: "sly", x: 85, y: 92, scale: .8 }], fx: "hearts" }, lines: [{ n: "Mom laughs. Max laughs." }, { n: "The cat does not." }] },
    ],
    quiz: [
      { q: "Why did Max need help?", c: ["The room was a mess", "Bolt was lost", "It was late", "The cat was sad"], a: 0 },
      { q: "Who cleaned up fast?", c: ["Mom", "Bolt", "Zoe", "Max"], a: 1 },
      { q: "What went in the box by mistake?", c: ["The bed", "The door", "The cat", "Mom"], a: 2 },
    ],
  });
})();
