/* Season 0 — Pre-K "First Words". 2–4 word pages, big pictures, counting to 5. Meant to be read WITH a grown-up or the 🔊 button. */
(function () {
  const S = (window.STORIES = window.STORIES || []);

  S.push({
    id: "s0e1", season: 0, num: 1, title: "Hi, Bolt!",
    blurb: "Say hi to Max and Bolt. Bolt can hop!",
    cover: { bg: "yard", cast: [{ who: "max", mood: "happy", pose: "wave", x: 32 }, { who: "bolt", mood: "excited", pose: "wave", x: 66, flip: true }], fx: "sparkle" },
    vocab: { big: "Not small.", hop: "A little jump." },
    pages: [
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "happy", pose: "wave", x: 50 }] }, lines: [{ w: "bolt", t: "Hi, Max!" }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "happy", pose: "wave", x: 50 }] }, lines: [{ w: "max", t: "Hi, Bolt!" }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "excited", pose: "up", x: 50, scale: 1.2 }] }, lines: [{ n: "Bolt is big." }] },
      { art: { bg: "yard", cast: [{ who: "cat", mood: "happy", x: 50, y: 92, scale: .7 }] }, lines: [{ n: "The cat is small." }] },
      { art: { bg: "night", cast: [{ who: "bolt", mood: "happy", pose: "point", x: 30 }], props: [{ e: "⭐", x: 60, y: 30, s: 50 }, { e: "⭐", x: 78, y: 45, s: 50 }, { e: "⭐", x: 68, y: 70, s: 50 }] },
        math: { intro: "Look up!", q: "How many stars?", answer: "3", choices: ["1", "2", "3", "4"], hint: "Point and count. One, two, three.", success: "Three stars! Good counting!" } },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "excited", pose: "cheer", x: 50, y: 70 }], fx: "whoosh" }, lines: [{ n: "Bolt can hop." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "laugh", pose: "cheer", x: 30, y: 75 }, { who: "max", mood: "laugh", pose: "cheer", x: 70, y: 70, flip: true }], fx: "sparkle" }, lines: [{ n: "Hop, hop, hop!" }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "happy", pose: "wave", x: 32 }, { who: "bolt", mood: "happy", pose: "wave", x: 66, flip: true }], fx: "hearts" }, lines: [{ n: "The end." }] },
    ],
    quiz: [
      { q: "Who is big?", c: ["🤖 Bolt", "🐱 The cat", "🐜 A bug", "🍎 An apple"], a: 0 },
      { q: "Who is small?", c: ["🌳 A tree", "🐱 The cat", "🏠 A house", "🚌 A bus"], a: 1 },
      { q: "What can Bolt do?", c: ["Fly", "Swim", "Hop", "Sing"], a: 2 },
    ],
  });

  S.push({
    id: "s0e2", season: 0, num: 2, title: "Red, Blue, Green",
    blurb: "Three balloons. One pop. Who has one more?",
    cover: { bg: "park", cast: [{ who: "bolt", mood: "happy", pose: "hold", x: 50 }], props: [{ e: "🎈", x: 40, y: 30, s: 60 }, { p: "balloon", c: "#4d96ff", x: 60, y: 22, s: 50 }, { p: "balloon", c: "#3fb64f", x: 78, y: 35, s: 50 }] },
    vocab: { pop: "A quick bang, like a balloon breaking.", more: "Another one; extra." },
    pages: [
      { art: { bg: "park", cast: [{ who: "max", mood: "happy", pose: "up", x: 50 }], props: [{ e: "🎈", x: 62, y: 30, s: 70 }] }, lines: [{ n: "A red balloon." }] },
      { art: { bg: "park", cast: [{ who: "max", mood: "happy", pose: "up", x: 50 }], props: [{ e: "🎈", x: 62, y: 30, s: 70 }, { p: "balloon", c: "#4d96ff", x: 30, y: 25, s: 60 }] }, lines: [{ n: "A blue balloon." }] },
      { art: { bg: "park", cast: [{ who: "max", mood: "excited", pose: "up", x: 50 }], props: [{ e: "🎈", x: 62, y: 30, s: 70 }, { p: "balloon", c: "#4d96ff", x: 30, y: 25, s: 60 }, { p: "balloon", c: "#3fb64f", x: 85, y: 40, s: 60 }] }, lines: [{ n: "A green balloon." }] },
      { art: { bg: "park", cast: [{ who: "bolt", mood: "think", pose: "point", x: 30 }], props: [{ e: "🎈", x: 62, y: 30, s: 60 }, { p: "balloon", c: "#4d96ff", x: 78, y: 45, s: 50 }, { p: "balloon", c: "#3fb64f", x: 68, y: 70, s: 50 }] },
        math: { intro: "Count with Bolt.", q: "How many balloons?", answer: "3", choices: ["2", "3", "4", "5"], hint: "Red, blue, green. One, two, three.", success: "Three balloons!" } },
      { art: { bg: "park", cast: [{ who: "bolt", mood: "surprised", pose: "up", x: 50 }], fx: "boom" }, lines: [{ n: "Pop!" }] },
      { art: { bg: "park", cast: [{ who: "bolt", mood: "worried", x: 50 }], fx: "rain" }, lines: [{ n: "Bolt is sad." }] },
      { art: { bg: "park", cast: [{ who: "max", mood: "happy", pose: "point", x: 30 }, { who: "bolt", mood: "surprised", x: 70, flip: true }], props: [{ e: "🎈", x: 50, y: 30, s: 70 }] }, lines: [{ n: "Max has one more." }] },
      { art: { bg: "park", cast: [{ who: "bolt", mood: "love", pose: "up", x: 50 }], props: [{ e: "🎈", x: 62, y: 28, s: 70 }], fx: "hearts" }, lines: [{ n: "Bolt is happy!" }] },
    ],
    quiz: [
      { q: "What color is the first balloon?", c: ["🟢 Green", "🔵 Blue", "🔴 Red", "🟡 Yellow"], a: 2 },
      { q: "What happened to a balloon?", c: ["It flew", "It popped", "It sang", "It ate"], a: 1 },
      { q: "Who gave Bolt one more?", c: ["Max", "The cat", "Zoe", "Mom"], a: 0 },
    ],
  });

  S.push({
    id: "s0e3", season: 0, num: 3, title: "Count with Bolt",
    blurb: "One cat. Two dogs. Can you count to five?",
    cover: { bg: "park", cast: [{ who: "bolt", mood: "excited", pose: "point", x: 30 }], props: [{ e: "1️⃣", x: 60, y: 30, s: 40 }, { e: "2️⃣", x: 75, y: 30, s: 40 }, { e: "3️⃣", x: 90, y: 30, s: 40 }] },
    vocab: { count: "To say numbers in order: 1, 2, 3." },
    pages: [
      { art: { bg: "park", cast: [{ who: "cat", mood: "happy", x: 50, y: 92 }], props: [{ e: "1️⃣", x: 85, y: 20, s: 50 }] }, lines: [{ n: "One cat." }] },
      { art: { bg: "park", cast: [{ who: "bolt", mood: "happy", pose: "point", x: 20 }], props: [{ e: "🐕", x: 55, y: 80, s: 60 }, { e: "🐕", x: 78, y: 80, s: 60 }, { e: "2️⃣", x: 85, y: 20, s: 50 }] }, lines: [{ n: "Two dogs." }] },
      { art: { bg: "park", cast: [{ who: "bolt", mood: "happy", pose: "point", x: 20 }], props: [{ e: "🐞", x: 50, y: 75, s: 50 }, { e: "🐞", x: 66, y: 82, s: 50 }, { e: "🐞", x: 82, y: 74, s: 50 }, { e: "3️⃣", x: 85, y: 20, s: 50 }] }, lines: [{ n: "Three bugs." }] },
      { art: { bg: "kitchen", cast: [{ who: "max", mood: "happy", pose: "point", x: 20 }], props: [{ e: "🍎", x: 50, y: 40, s: 50 }, { e: "🍎", x: 66, y: 40, s: 50 }, { e: "🍎", x: 82, y: 40, s: 50 }, { e: "🍎", x: 58, y: 62, s: 50 }] },
        math: { intro: "Snack time!", q: "How many apples?", answer: "4", choices: ["3", "4", "5", "2"], hint: "Touch each apple. One, two, three, four.", success: "Four apples! One for Max, one for Zoe, one for Mom, and one for the cat." } },
      { art: { bg: "park", cast: [{ who: "bolt", mood: "happy", pose: "point", x: 15 }], props: [{ e: "🦆", x: 40, y: 82, s: 46 }, { e: "🦆", x: 55, y: 82, s: 46 }, { e: "🦆", x: 70, y: 82, s: 46 }, { e: "🦆", x: 85, y: 82, s: 46 }, { e: "4️⃣", x: 88, y: 20, s: 50 }] }, lines: [{ n: "Four ducks." }] },
      { art: { bg: "night", cast: [{ who: "bolt", mood: "excited", pose: "up", x: 20 }], props: [{ e: "⭐", x: 45, y: 25, s: 44 }, { e: "⭐", x: 60, y: 40, s: 44 }, { e: "⭐", x: 75, y: 22, s: 44 }, { e: "⭐", x: 88, y: 45, s: 44 }, { e: "⭐", x: 55, y: 65, s: 44 }, { e: "5️⃣", x: 88, y: 75, s: 50 }] }, lines: [{ n: "Five stars." }] },
      { art: { bg: "yard", cast: [{ who: "bolt", mood: "laugh", pose: "cheer", x: 50 }], fx: "sparkle" }, lines: [{ n: "Bolt can count!" }] },
      { art: { bg: "yard", cast: [{ who: "max", mood: "happy", pose: "point", x: 32 }, { who: "bolt", mood: "happy", pose: "point", x: 66, flip: true }] }, lines: [{ n: "Can you?" }] },
    ],
    quiz: [
      { q: "How many dogs?", c: ["1", "2", "3", "4"], a: 1 },
      { q: "How many stars?", c: ["3", "4", "5", "6"], a: 2 },
      { q: "Who can count?", c: ["🤖 Bolt", "🦆 A duck", "🐞 A bug", "🍎 An apple"], a: 0 },
    ],
  });
})();
