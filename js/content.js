/* Max & Bolt — seasons, reading targets, ranks, stickers, and the ADAPTIVE math engine.
   Stories live in js/stories/s*.js and push onto window.STORIES. */
(function () {
  window.STORIES = window.STORIES || [];

  // One season per grade (Season 0 = Pre-K first words). wpm = spring-of-grade oral reading fluency target (Hasbrouck & Tindal, ~50th %ile).
  const SEASONS = [
    { n: 0, grade: "Pre-K", title: "First Words", color: "#ff8fc8", wpm: 30,
      skills: "Two to four words a page. Big pictures. Read it together, or tap 🔊 and Bolt reads.",
      math: "Counting to 5." },
    { n: 1, grade: "1st grade", title: "Meet Bolt", color: "#ffd93d", wpm: 60,
      skills: "Short sentences. Sight words. Sound-it-out words like box, run, mud.",
      math: "Adding and taking away up to 20." },
    { n: 2, grade: "2nd grade", title: "Big Ideas", color: "#6bcb77", wpm: 100,
      skills: "Longer sentences joined with and, but, so. Past tense. Words with two parts.",
      math: "Adding and subtracting to 100. Skip counting by 2s, 5s, 10s. Coins." },
    { n: 3, grade: "3rd grade", title: "Secret Missions", color: "#4d96ff", wpm: 112,
      skills: "Paragraphs. Who said what. Describing words. Why things happen.",
      math: "Times tables. Dividing into groups. Simple fractions." },
    { n: 4, grade: "4th grade", title: "Storm Season", color: "#ff6b6b", wpm: 133,
      skills: "Sentences with because, although, while, until. Reading between the lines.",
      math: "Big-number multiplication. Elapsed time. Percent of a battery." },
    { n: 5, grade: "5th grade", title: "Time & Sky", color: "#c77dff", wpm: 146,
      skills: "Similes and pictures made with words. Longer paragraphs. Characters who feel two things at once.",
      math: "Decimals and fractions of a whole." },
    { n: 6, grade: "6th grade", title: "The Whisker Files", color: "#ff9f1c", wpm: 150,
      skills: "Idioms. Sarcasm and irony. Sentences that start many different ways.",
      math: "Area. Fractions of a space. Majority votes." },
    { n: 7, grade: "7th grade", title: "Machine Day", color: "#2ec4b6", wpm: 155,
      skills: "Grown-up vocabulary. Flashbacks. A narrator with an attitude.",
      math: "Money with decimals. Fractions of a quantity." },
  ];
  const MAX_SEASON = 7;
  const season = (n) => SEASONS.find((s) => s.n === n) || SEASONS[1];

  const RANKS = [
    [0, "Rookie Reader", "🥚"], [150, "Page Turner", "📖"], [400, "Bookworm", "🐛"], [800, "Word Wizard", "🧙"],
    [1500, "Story Sprinter", "🏃"], [2500, "Comic Captain", "🦸"], [4000, "Legend of Letters", "🏆"], [6500, "Grand Master", "👑"],
  ];
  function rankFor(xp) {
    let r = RANKS[0], next = null;
    for (let i = 0; i < RANKS.length; i++) {
      if (xp >= RANKS[i][0]) r = RANKS[i]; else { next = RANKS[i]; break; }
    }
    return { name: r[1], icon: r[2], min: r[0], next: next ? next[0] : null, nextName: next ? next[1] : null };
  }

  /* ---------- adaptive math ----------
     A reader has a continuous mathLevel 0–14.99. Its integer part picks a BAND below. Three first-try rights
     climb one band; a miss drops half a band. Bands are ordered so "harder" always means slightly bigger
     numbers or one new idea, never a jump. Season → starting band: 0→0, 1→1, 2→3, 3→5, 4→7, 5→9, 6→11, 7→13. */
  const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const money = (v) => "$" + v.toFixed(2);
  const BANDS = [
    { name: "Counting to 5", gen() { const n = ri(1, 5), e = pick(["🍎", "⭐", "🐞", "🎈", "🦆", "🍪"]); return { q: `How many? ${e.repeat(n)}`, a: n, lo: 1, hi: 6 }; } },
    { name: "Adding to 10", gen() { const a = ri(1, 6), b = ri(1, 10 - a); return { q: `${a} + ${b}`, a: a + b }; } },
    { name: "Add & take away to 20", gen() { if (Math.random() < .5) { const a = ri(3, 12), b = ri(1, 20 - a); return { q: `${a} + ${b}`, a: a + b }; } const a = ri(5, 20), b = ri(1, a - 1); return { q: `${a} − ${b}`, a: a - b }; } },
    { name: "Add & take away to 50", gen() { if (Math.random() < .5) { const a = ri(10, 35), b = ri(5, 50 - a); return { q: `${a} + ${b}`, a: a + b }; } const a = ri(20, 50), b = ri(5, a - 1); return { q: `${a} − ${b}`, a: a - b }; } },
    { name: "To 100 & skip counting", gen() { const t = ri(0, 2); if (t === 0) { const a = ri(20, 70), b = ri(10, 100 - a); return { q: `${a} + ${b}`, a: a + b }; } if (t === 1) { const a = ri(40, 99), b = ri(10, a - 1); return { q: `${a} − ${b}`, a: a - b }; } const s = pick([2, 5, 10]), k = ri(2, 7); return { q: `Count by ${s}s: ${Array.from({ length: k }, (_, i) => s * (i + 1)).join(", ")}, ?`, a: s * (k + 1) }; } },
    { name: "Times tables to 5", gen() { if (Math.random() < .65) { const a = ri(2, 5), b = ri(1, 10); return { q: `${a} × ${b}`, a: a * b }; } const b = ri(2, 5), r = ri(1, 10); return { q: `${b * r} ÷ ${b}`, a: r }; } },
    { name: "Times tables to 10 & halves", gen() { const t = ri(0, 2); if (t === 0) { const a = ri(3, 10), b = ri(3, 10); return { q: `${a} × ${b}`, a: a * b }; } if (t === 1) { const b = ri(3, 9), r = ri(2, 9); return { q: `${b * r} ÷ ${b}`, a: r }; } const d = pick([2, 3, 4, 5]), w = d * ri(2, 8); return { q: `1/${d} of ${w}`, a: w / d }; } },
    { name: "Big multiplication", gen() { if (Math.random() < .6) { const a = ri(11, 45), b = ri(3, 9); return { q: `${a} × ${b}`, a: a * b }; } const a = ri(200, 900), b = ri(50, a - 1); return { q: `${a} − ${b}`, a: a - b }; } },
    { name: "Time & percent", gen() { if (Math.random() < .5) { const h = ri(1, 5), m = pick([15, 30, 45]), h2 = h + ri(1, 3); return { q: `From ${h}:00 to ${h2}:${m} is how many minutes?`, a: (h2 - h) * 60 + m }; } const s = pick([60, 80, 90, 100]), r = pick([5, 10, 15, 20]), hrs = ri(2, 4); return { q: `Battery at ${s}%. It drains ${r}% each hour. After ${hrs} hours?`, a: s - r * hrs, unit: "%" }; } },
    { name: "Decimals", gen() { const a = ri(1, 9) + ri(1, 9) / 10, b = ri(1, 9) + ri(1, 9) / 10; if (Math.random() < .5) return { q: `${a.toFixed(1)} + ${b.toFixed(1)}`, a: Math.round((a + b) * 10) / 10, step: .5 }; const x = Math.max(a, b), y = Math.min(a, b); return { q: `${x.toFixed(1)} − ${y.toFixed(1)}`, a: Math.round((x - y) * 10) / 10, step: .5 }; } },
    { name: "Fractions of a whole", gen() { const d = pick([3, 4, 5, 6, 8, 10]), n = ri(1, d - 1), w = d * ri(2, 9); return { q: `${n}/${d} of ${w}`, a: (w * n) / d }; } },
    { name: "Percent & area", gen() { if (Math.random() < .5) { const p = pick([10, 20, 25, 50, 75]), w = pick([40, 60, 80, 120, 200, 300]); return { q: `${p}% of ${w}`, a: (p * w) / 100 }; } const l = ri(5, 20), w = ri(3, 12); return { q: `Area of a ${l} by ${w} room`, a: l * w }; } },
    { name: "Negative numbers", gen() { const a = ri(-15, 15), b = ri(-15, 15); if (Math.random() < .5) return { q: `${a} + (${b})`, a: a + b }; return { q: `${a} − (${b})`, a: a - b }; } },
    { name: "Equations & ratios", gen() { if (Math.random() < .5) { const x = ri(2, 12), k = ri(2, 9), c = ri(1, 20); return { q: `${k}x + ${c} = ${k * x + c}.  x = ?`, a: x }; } const a = ri(2, 9), b = ri(2, 9), m = ri(2, 6); return { q: `${a} : ${b}  =  ? : ${b * m}`, a: a * m }; } },
    { name: "Money", gen() { if (Math.random() < .5) { const p = pick([1.25, 1.5, 2.5, 0.75]), n = ri(4, 12); return { q: `${n} cups × ${money(p)}`, a: Math.round(p * n * 100) / 100, money: true, step: .25 }; } const cost = ri(1, 4) + pick([.25, .5, .75]); return { q: `Pay ${money(5)} for something that costs ${money(cost)}. Change?`, a: Math.round((5 - cost) * 100) / 100, money: true, step: .25 }; } },
  ];
  const START_BAND = { 0: 0, 1: 1, 2: 3, 3: 5, 4: 7, 5: 9, 6: 11, 7: 13 };
  const clampLevel = (l) => Math.max(0, Math.min(BANDS.length - 0.01, l));
  function bandFor(level) { const i = Math.max(0, Math.min(BANDS.length - 1, Math.floor(level || 0))); return { i, name: BANDS[i].name, total: BANDS.length }; }
  const startLevel = (seasonN) => START_BAND[seasonN] != null ? START_BAND[seasonN] : 1;

  function choicesAround(ans, n, spread, step, lo) {
    const set = new Set([ans]);
    const floor = lo != null ? lo : (ans < 0 ? ans - spread * step : 0);
    let guard = 0;
    while (set.size < n && guard++ < 80) {
      const c = Math.round((ans + ri(-spread, spread) * step) * 100) / 100;
      if (c !== ans && c >= floor) set.add(c);
    }
    for (let k = 1; set.size < n; k++) set.add(Math.round((ans + (spread + k) * step) * 100) / 100);
    return [...set].sort(() => Math.random() - .5);
  }
  function problemFromBand(i) {
    const band = BANDS[Math.max(0, Math.min(BANDS.length - 1, i))];
    const p = band.gen();
    const ans = p.a;
    const step = p.step || 1;
    const spread = p.hi != null ? p.hi - p.lo : (Math.abs(ans) > 50 ? Math.max(5, Math.round(Math.abs(ans) * .15)) : 3);
    const raw = choicesAround(ans, 4, spread, step, p.lo);
    const fmt = (v) => p.money ? money(v) : (p.unit ? v + p.unit : String(v));
    return { q: p.q, answer: fmt(ans), choices: raw.map(fmt), band: i, bandName: band.name };
  }
  const adaptiveProblem = (level) => problemFromBand(Math.floor(level || 0));
  /* result: "right" (first try) → +0.34 · "retry" (right on 2nd try) → 0 · "wrong" → −0.5 */
  function adjustLevel(profile, result, scale) {
    const delta = (result === "right" ? .34 : result === "wrong" ? -.5 : 0) * (scale || 1);
    const before = profile.mathLevel || 0;
    profile.mathLevel = clampLevel(before + delta);
    profile.mathLog = (profile.mathLog || []).concat([{ t: Date.now(), b: Math.floor(before), r: result }]).slice(-60);
    return profile.mathLevel;
  }

  const STICKERS = { s0e1: "👋", s0e2: "🎈", s0e3: "🔢", s1e1: "🤖", s1e2: "🚲", s1e3: "🐱", s1e4: "✨", s1e5: "☂️", s1e6: "🥨", s1e7: "🎈", s1e8: "📦",
    s2e1: "🫧", s2e2: "📎", s2e3: "🚀", s2e4: "🐕", s2e5: "⛺", s2e6: "🍋", s3e1: "🥞", s3e2: "🕵️", s3e3: "🐜", s4e1: "⚡", s4e2: "📡", s5e1: "📼", s5e2: "🛩️", s6e1: "🌧️", s6e2: "🗂️", s7e1: "🏆" };

  window.Content = { SEASONS, MAX_SEASON, season, RANKS, rankFor, STICKERS,
    BANDS, bandFor, startLevel, adaptiveProblem, problemFromBand, adjustLevel,
    storiesFor: (n) => window.STORIES.filter((s) => s.season === n).sort((a, b) => a.num - b.num),
    story: (id) => window.STORIES.find((s) => s.id === id),
    wordCount: (text) => (text.replace(/\{\w+\}/g, "x").trim().match(/[A-Za-z0-9'’$%.-]+/g) || []).length,
    storyWords(story) {
      let n = 0;
      story.pages.forEach((p) => {
        if (p.lines) p.lines.forEach((l) => { n += window.Content.wordCount(l.t || l.n || ""); });
        if (p.math) n += window.Content.wordCount((p.math.intro || "") + " " + p.math.q);
      });
      return n;
    },
  };
})();
