/* Max & Bolt — Home Connections. The teacher's weekly newsletter ends with "Home Connections": review questions a
   parent is meant to ask at the dinner table ("What is a sum?" "What are nouns?"). The parent pastes them into the
   dashboard; the kid gets BOLT'S BIG QUESTIONS — Bolt asks each one aloud, the kid explains it to a grown-up in a
   complete sentence, then Bolt shows his own answer and (for most topics) a one-tap quick check.
   BANK below is Bolt's built-in answers for the usual 2nd-grade topics, matched by keyword. A question Bolt doesn't
   know just needs the parent to add an answer after a dash: "What is a habitat? - Where an animal lives."
   Data: profile.homeq = { week, items:[{q,a?}], setAt, log:{q:{told,right,wrong,last}}, history[] }. */
(function () {
  const BANK = [
    { id: "addend", keys: [/\baddends?\b/], words: ["addend", "addends"], emoji: "➕",
      a: "Addends are the numbers you add together. In 6 + 4 = 10, the addends are 6 and 4.",
      check: { q: "In 5 + 2 = 7, what are 5 and 2 called?", c: ["Addends", "Sums", "Verbs", "Tens"] } },
    { id: "sum", keys: [/\bsums?\b/], words: ["sum"], emoji: "🟰",
      a: "A sum is the answer when you add. 6 + 4 = 10, so 10 is the sum.",
      check: { q: "What is the sum of 7 + 3?", c: ["10", "4", "73", "7"] } },
    { id: "difference", keys: [/\bdifference\b/, /\bsubtract/], words: ["difference"], emoji: "➖",
      a: "The difference is the answer when you subtract. 10 − 4 = 6, so 6 is the difference.",
      check: { q: "What is the difference: 9 − 3?", c: ["6", "12", "3", "9"] } },
    { id: "maketen", keys: [/\bmak\w*\b.*\b(a ten|ten|10)\b/, /ten frame/], words: [], emoji: "🔟",
      a: "To make a ten, find two numbers that add up to 10, like 7 + 3. It makes big adding easy: 7 + 5 is 7 + 3 + 2. That is 10 + 2, so 12!",
      check: { q: "Which pair makes a ten?", c: ["6 + 4", "5 + 6", "8 + 3", "9 + 2"] } },
    { id: "twostep", keys: [/two.step/, /word problem/], words: [], emoji: "🪜",
      a: "A two-step problem needs two math steps. First find one answer, then use it for the next. Max had 5 bolts, found 3 more, then used 2. 5 + 3 = 8, then 8 − 2 = 6.",
      check: { q: "Bolt had 4 spoons, found 4 more, then lost 3. How many now?", c: ["5", "8", "11", "1"] } },
    { id: "data", keys: [/\bdata\b/], words: ["data"], emoji: "📊",
      a: "Data is information you collect, like counting how many kids like pizza. You can put data in a graph so it is easy to see.",
      check: { q: "Max counted 4 red cars and 2 blue cars. What is that called?", c: ["Data", "A noun", "A sum", "A habitat"] } },
    { id: "graph", keys: [/\bgraphs?\b/], words: ["graph", "graphs"], emoji: "📈",
      a: "A picture graph uses little pictures to show how many. A bar graph uses bars. The taller the bar, the more there are!",
      check: { q: "On a bar graph, the tallest bar means…", c: ["The most", "The least", "A noun", "Zero"] } },
    { id: "evenodd", keys: [/\beven\b/, /\bodd\b/], words: [], emoji: "🐾",
      a: "Even numbers split into two equal groups: 2, 4, 6, 8, 10. Odd numbers have one left over: 1, 3, 5, 7, 9.",
      check: { q: "Which number is even?", c: ["8", "7", "5", "3"] } },
    { id: "placevalue", keys: [/place value/, /\btens\b.*\bones\b/, /\bdigits?\b/], words: [], emoji: "🔢",
      a: "In 47, the 4 means 4 tens and the 7 means 7 ones. That is place value: where a digit sits tells what it is worth.",
      check: { q: "In 63, what does the 6 mean?", c: ["6 tens", "6 ones", "6 hundreds", "6 dogs"] } },
    { id: "skip", keys: [/skip.?count/], words: [], emoji: "🦘",
      a: "Skip counting is counting by jumps: 5, 10, 15, 20. Bolt skip counts his batteries by 2s.",
      check: { q: "Count by 5s: 5, 10, 15, ?", c: ["20", "16", "25", "50"] } },
    { id: "compare", keys: [/greater/, /less than/, /\bcompare/], words: [], emoji: "🐊",
      a: "To compare numbers, think of an alligator mouth. It always eats the bigger number: 9 > 4.",
      check: { q: "Which number is greater?", c: ["42", "24", "4", "2"] } },
    { id: "noun", keys: [/\bnouns?\b/], words: ["noun", "nouns"], emoji: "🧸",
      a: "A noun is a person, a place, or a thing. Bolt, backyard, and spoon are all nouns.",
      check: { q: "Which word is a noun?", c: ["spoon", "jump", "fast", "run"] } },
    { id: "verb", keys: [/\bverbs?\b/], words: ["verb", "verbs"], emoji: "🏃",
      a: "A verb is an action word. It tells what someone does. Run, jump, and zap are verbs.",
      check: { q: "Which word is a verb?", c: ["jump", "cat", "red", "tree"] } },
    { id: "adjective", keys: [/\badjectives?\b/, /describing word/], words: ["adjective", "adjectives"], emoji: "✨",
      a: "An adjective describes a noun. Shiny, big, and loud tell you more about a thing.",
      check: { q: "Which word is an adjective?", c: ["shiny", "robot", "zap", "Bolt"] } },
    { id: "sentence", keys: [/complete sentence/, /\bsentences?\b/], words: [], emoji: "✏️",   // "sentence" shows up in plain narration, so only declared topics match
      a: "A complete sentence has a who and a what happened. It starts with a capital letter and ends with a period, a question mark, or an exclamation mark. 'Bolt ate a spoon.' is complete. 'Ate a spoon' is not.",
      check: { q: "Which one is a complete sentence?", c: ["Bolt ate a spoon.", "Ate a spoon", "The shiny spoon", "Bolt and Max"] } },
    { id: "blend", keys: [/\bblends?\b/], words: [], emoji: "🔤",
      a: "A consonant blend is two consonants stuck together where you still hear both sounds: st in stop, fr in frog, bl in blast.",
      check: { q: "Which word starts with a blend?", c: ["frog", "cat", "up", "bee"] } },
    { id: "syllable", keys: [/\bsyllables?\b/], words: ["syllable", "syllables"], emoji: "👏",
      a: "A syllable is one beat in a word. Clap it out: ro-bot has two beats, spoon has one.",
      check: { q: "How many syllables in 'robot'?", c: ["2", "1", "3", "4"] } },
    { id: "habitat", keys: [/\bhabitats?\b/], words: ["habitat", "habitats"], emoji: "🐸",
      a: "A habitat is where an animal lives and finds food, water, and a place to hide. A frog lives in a pond. A camel lives in the desert. Look at what the animal needs, and you can tell where it lives.",
      check: { q: "Which animal lives in a pond habitat?", c: ["A frog", "A camel", "A polar bear", "A robot raccoon"] } },
    { id: "plants", keys: [/\bplants?\b/, /\bseeds?\b/], words: ["seed", "seeds", "roots"], emoji: "🌱",
      a: "Plants need sunlight, water, air, and soil to grow. A seed sprouts roots first, then a stem, then leaves.",
      check: { q: "What does a plant need to grow?", c: ["Sun and water", "Batteries", "Spoons", "Bubbles"] } },
    { id: "asia", keys: [/\bancient\b/, /civilization/, /\bchina\b/], words: [], emoji: "🏯",
      a: "Long, long ago, people in ancient Asia built the Great Wall of China, invented paper, and wrote with brushes and ink. Tell a grown-up your favorite part!",
      check: { q: "Which one was invented in ancient China?", c: ["Paper", "Robots", "Cars", "TV"] } },
  ];
  const byId = (id) => BANK.find((t) => t.id === id);

  /* one question per line; "What is a sum? - The answer when you add." lets the parent give (or override) the answer.
     A pasted paragraph with several "?" in one line is split at each question mark. Bullets and numbering are stripped. */
  function parse(text) {
    const out = [], seen = new Set();
    String(text || "").split(/\n/).forEach((line) => {
      line = line.replace(/^\s*(?:[-•*·▪●]|\d+[.)])\s*/, "").trim(); if (!line) return;
      const m = line.match(/^(.*?\?)\s*(?:[-–—:]\s*(.+))?$/);
      const q = (m ? m[1] : line).trim(), a = m && m[2] ? m[2].trim() : "";
      if (!q || seen.has(q.toLowerCase())) return; seen.add(q.toLowerCase());
      out.push(a ? { q, a } : { q });
    });
    return out.slice(0, 20);
  }
  const topicFor = (q) => BANK.find((t) => t.keys.some((k) => k.test(String(q || "").toLowerCase()))) || null;
  /* an item as the kid screen uses it: the answer the parent typed wins; Bolt's bank fills in the rest */
  function resolve(item) {
    const t = topicFor(item.q);
    return { q: item.q, a: item.a || (t ? t.a : ""), topic: t, check: t ? t.check : null, own: !!item.a };
  }
  /* stories that teach these topics: a story's declared `topics` list, plus the topic's key words found in its text */
  function storiesWith(items, textOf) {
    const ids = new Set(items.map((it) => topicFor(it.q)).filter(Boolean).map((t) => t.id));
    if (!ids.size) return [];
    return window.STORIES.map((s) => {
      const found = new Set((s.topics || []).filter((id) => ids.has(id)));
      const words = (textOf(s).toLowerCase().match(/[a-z']+/g) || []);
      ids.forEach((id) => { const t = byId(id); if (t.words.some((w) => words.includes(w))) found.add(id); });
      return { story: s, found: [...found] };
    }).filter((x) => x.found.length).sort((a, b) => b.found.length - a.found.length || a.story.season - b.story.season || a.story.num - b.story.num);
  }
  window.HomeQ = { BANK, byId, parse, topicFor, resolve, storiesWith };
})();
