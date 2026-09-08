/* Max & Bolt — "Bolt, help!" for math. Turns a word problem into counters a kid can TAP to count while Bolt says the
   numbers: How many? (count) · a + b (add: two groups) · "needs 6, has 4, how many more?" (count UP the empty ones) ·
   "has 10, spills 3, how many left?" (take away: cross out b, count the rest) · a groups of b (mul). The plan is inferred
   from the numbers in the question and the answer, so every authored problem in S0–S2 and every generated one at
   bands 0–2 gets it for free. Totals over 30 or non-integer answers → no counters (Bolt reads the hint instead). */
(function () {
  const EMOJI = [[/\bbolts?\b|\bscrews?\b|\bnuts?\b/, "🔩"], [/\bboards?\b|\blogs?\b|\bwood\b|\bplanks?\b/, "🪵"], [/\brocks?\b|\bstones?\b/, "🪨"], [/\bglitter\b|\btubes?\b/, "✨"], [/\bcups?\b/, "🥤"], [/\bsnacks?\b|\bcookies?\b/, "🍪"],
    [/\bballoons?\b/, "🎈"], [/\btoys?\b/, "🧸"], [/\bstars?\b/, "⭐"], [/\bapples?\b/, "🍎"], [/\bpancakes?\b/, "🥞"], [/\bbatter(y|ies)\b/, "🔋"], [/\brockets?\b/, "🚀"], [/\bsteps?\b/, "👣"], [/\bspoons?\b/, "🥄"],
    [/\bcoins?\b|\bcents?\b|\bquarters?\b|\bpenn(y|ies)\b|\bdollars?\b/, "🪙"], [/\bbooks?\b/, "📚"], [/\bcats?\b|\bkittens?\b/, "🐱"], [/\beggs?\b/, "🥚"], [/\bsocks?\b/, "🧦"], [/\bcars?\b/, "🚗"], [/\bfish\b/, "🐟"],
    [/\bflowers?\b/, "🌸"], [/\bbirds?\b|\bducks?\b/, "🐦"], [/\bcans?\b/, "🥫"], [/\bmarbles?\b/, "🔵"], [/\bbuttons?\b/, "🔘"], [/\bwheels?\b/, "🛞"], [/\bbox(es)?\b/, "📦"], [/\bleaf\b|\bleaves\b/, "🍃"],
    [/\bbugs?\b|\bants?\b/, "🐜"], [/\bdogs?\b|\bpupp(y|ies)\b/, "🐶"], [/\bballs?\b/, "⚽"], [/\bcand(y|ies)\b|\bsweets?\b/, "🍬"], [/\bcrackers?\b|\bpretzels?\b/, "🥨"], [/\bjumps?\b/, "🦘"], [/\bthings?\b|\bparts?\b|\bitems?\b|\bpieces?\b/, "📦"]];
  function emojiFor(q) {
    const m = q.match(/\p{Extended_Pictographic}/u); if (m) return m[0];
    const s = String(q).replace(/\b(Bolt|Max|Maxie|Zoe|Mom|Chomp)\b/g, " ").toLowerCase();   // character names aren't objects
    const hm = s.match(/how (?:many|much) ([a-z]+)/);   // the noun being asked about wins
    if (hm) for (const [re, e] of EMOJI) if (re.test(hm[1])) return e;
    for (const [re, e] of EMOJI) if (re.test(s)) return e;
    return "🔵";
  }
  /* plan(questionText, answerString) → { kind, total, emoji, ... } or null */
  function plan(q, answer) {
    if (!/^\d+$/.test(String(answer).trim())) return null;
    const ans = +String(answer).trim();
    if (ans < 0 || ans > 30) return null;
    const nums = (String(q).match(/\d+/g) || []).map(Number);
    const emoji = emojiFor(String(q));
    if (!nums.length) return /how many|count/i.test(q) && ans > 0 ? { kind: "count", total: ans, emoji } : null;
    const [a, b] = nums;
    if (nums.length >= 2) {
      if (a + b === ans) return { kind: "add", a, b, total: ans, emoji };
      if (a - b === ans && a <= 30) return /\bmore\b|need/i.test(q) ? { kind: "more", have: b, need: a, total: ans, emoji } : { kind: "take", a, b, total: ans, emoji };
      if (b - a === ans && b <= 30) return { kind: "more", have: a, need: b, total: ans, emoji };
      if (a * b === ans && Math.min(a, b) <= 6 && Math.max(a, b) <= 10) return { kind: "mul", rows: Math.min(a, b), cols: Math.max(a, b), total: ans, emoji };
    }
    if (nums.length === 1 && a === ans && /how many|count/i.test(q)) return { kind: "count", total: ans, emoji };
    return null;
  }

  /* a plain string of counters for rapid-fire screens (no interaction) */
  function picture(p) {
    if (!p) return "";
    const rep = (n, e) => (e || p.emoji).repeat(Math.max(0, n));
    if (p.kind === "add") return `${rep(p.a)} + ${rep(p.b, p.emoji === "🔵" ? "🟡" : p.emoji)}`;
    if (p.kind === "take") return `${rep(p.a)}  take away ${p.b}`;
    if (p.kind === "more") return `${rep(p.have)} ${"◯".repeat(p.need - p.have)}`;
    if (p.kind === "mul") return Array.from({ length: p.rows }, () => rep(p.cols)).join("\n");
    return rep(p.total);
  }

  /* render(box, p, { auto, onDone(total) }) — builds the tappable counters inside box. auto=true: Bolt does the tapping. */
  function render(box, p, o) {
    o = o || {};
    const T = window.TTS;
    const say = (t, cb) => T.speak(String(t), { rate: .95, onEnd: cb });
    const words = { count: "Tap each one to count!", add: "Tap them all. Count them up!", more: "Tap the empty ones. Count up!", take: `Tap ${p.b} to take away.`, mul: "Tap them all. Count them up!" };
    let items = [];   // { el, kind }
    if (p.kind === "count") items = Array.from({ length: p.total }, () => ({ g: 1 }));
    else if (p.kind === "add") items = [...Array.from({ length: p.a }, () => ({ g: 1 })), { sep: "+" }, ...Array.from({ length: p.b }, () => ({ g: 2 }))];
    else if (p.kind === "more") items = [...Array.from({ length: p.have }, () => ({ g: 1, pre: true })), ...Array.from({ length: p.need - p.have }, () => ({ g: 2, empty: true }))];
    else if (p.kind === "take") items = Array.from({ length: p.a }, () => ({ g: 1, pre: true }));
    else if (p.kind === "mul") { for (let r = 0; r < p.rows; r++) { if (r) items.push({ br: true }); for (let c = 0; c < p.cols; c++) items.push({ g: r % 2 ? 2 : 1 }); } }
    box.innerHTML = `<div class="help-say">🤖 ${words[p.kind]}</div>
      <div class="counters">${items.map((it, i) => it.sep ? `<span class="ctr-sep">${it.sep}</span>` : it.br ? `<i class="ctr-br"></i>` : `<button class="ctr g${it.g} ${it.pre ? "lit" : ""} ${it.empty ? "empty" : ""}" data-i="${i}">${it.empty ? "" : p.emoji}</button>`).join("")}</div>
      <div class="help-total" id="helptotal"></div>`;
    const btns = [...box.querySelectorAll(".ctr")];
    const totalEl = box.querySelector("#helptotal");
    let n = p.kind === "more" ? p.have : 0, done = false, taken = 0;
    const finish = (phrase) => {
      if (done) return; done = true;
      totalEl.textContent = "= " + p.total;
      say(phrase, () => { if (o.onDone) o.onDone(p.total); });
    };
    const tapOne = (b) => {
      if (done) return;
      if (p.kind === "take") {
        if (b.classList.contains("out") || taken >= p.b) return;
        b.classList.add("out"); taken++;
        say(taken === 1 ? "Take away 1" : String(taken));
        if (taken === p.b) {
          box.querySelector(".help-say").textContent = "🤖 Now count what's left!";
          const left = btns.filter((x) => !x.classList.contains("out"));
          let k = 0;
          const tick = () => { if (k >= left.length) return finish(`${p.total} left!`); left[k].classList.add("on"); say(String(++k), () => setTimeout(tick, 120)); };
          setTimeout(tick, 500);
        }
        return;
      }
      if (b.classList.contains("on") || (p.kind === "more" && !b.classList.contains("empty"))) return;
      b.classList.add("on"); if (b.classList.contains("empty")) { b.textContent = p.emoji; }
      n++;
      const last = n === (p.kind === "more" ? p.need : p.total);
      if (!last) return say(String(n));
      const phrase = p.kind === "add" ? `${n}! ${p.a} and ${p.b} make ${n}.` : p.kind === "more" ? `${n}! That is ${p.total} more.` : p.kind === "mul" ? `${n} in all!` : `${n}!`;
      finish(phrase);
    };
    btns.forEach((b) => b.addEventListener("click", () => { T.SFX.tap(); tapOne(b); }));
    say(words[p.kind], () => {
      if (!o.auto) return;
      // Bolt counts it out himself, one counter at a time
      const order = p.kind === "take" ? btns.slice(0, p.b) : p.kind === "more" ? btns.filter((b) => b.classList.contains("empty")) : btns;
      let k = 0;
      (function step() { if (done || k >= order.length) return; tapOne(order[k++]); setTimeout(step, 650); })();
    });
  }

  window.MathHelp = { plan, render, picture, emojiFor };
})();
