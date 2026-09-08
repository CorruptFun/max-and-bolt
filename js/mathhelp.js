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

  /* render(box, p, { auto, onDone(total) }) — manipulatives the kid DRAGS (or taps):
       count / add / mul → drag every item from the pile into Bolt's box, Bolt counts each one as it lands
       more              → the box has empty spots; drag spare items into them, counting UP from what's there
       take              → the box is full; drag b of them out to Bolt's hands ("take away 1, 2, 3"), then count what's left
     auto=true: Bolt moves them himself (second miss). */
  function render(box, p, o) {
    o = o || {};
    const T = window.TTS;
    const say = (t, cb) => T.speak(String(t), { rate: .95, onEnd: cb });
    const words = {
      count: "Drag each one into the box. Count!", add: "Put them ALL in the box. Count as you go!", mul: "Put them all in the box. Count!",
      more: "Fill the empty spots. Count up!", take: `Take ${p.b} away. Drag them to Bolt.`,
    };
    const item = (g) => `<button class="mh-item g${g}" type="button">${p.emoji}</button>`;
    let src = "", dst = "", srcLabel = "", dstLabel = "";
    if (p.kind === "count") { src = Array.from({ length: p.total }, () => item(1)).join(""); srcLabel = "pile"; dstLabel = "📦 Bolt's box"; }
    else if (p.kind === "add") { src = Array.from({ length: p.a }, () => item(1)).join("") + `<span class="ctr-sep">+</span>` + Array.from({ length: p.b }, () => item(2)).join(""); srcLabel = `${p.a} and ${p.b}`; dstLabel = "📦 Bolt's box"; }
    else if (p.kind === "mul") { src = Array.from({ length: p.rows }, (_, r) => Array.from({ length: p.cols }, () => item(r % 2 ? 2 : 1)).join("") + `<i class="ctr-br"></i>`).join(""); srcLabel = `${p.rows} rows of ${p.cols}`; dstLabel = "📦 Bolt's box"; }
    else if (p.kind === "more") { src = Array.from({ length: p.need - p.have + 2 }, () => item(2)).join(""); srcLabel = "spares"; dstLabel = `📦 needs ${p.need}`;
      dst = Array.from({ length: p.have }, () => `<span class="mh-slot"><button class="mh-item g1 fixed" type="button">${p.emoji}</button></span>`).join("") + Array.from({ length: p.need - p.have }, () => `<span class="mh-slot empty"></span>`).join(""); }
    else if (p.kind === "take") { src = Array.from({ length: p.a }, () => item(1)).join(""); srcLabel = `📦 Bolt's box · ${p.a}`; dstLabel = "🤖 Bolt's hands"; }
    box.innerHTML = `<div class="help-say">🤖 ${words[p.kind]}</div>
      <div class="mh">
        <div class="mh-zone mh-src ${p.kind === "take" ? "mh-boxlook" : ""}"><span class="mh-label" id="srclabel">${srcLabel}</span><div class="mh-items">${src}</div></div>
        <div class="mh-arrow">${p.kind === "take" ? "👇 take away" : "👇 put in"}</div>
        <div class="mh-zone mh-dst ${p.kind === "take" ? "" : "mh-boxlook"}"><span class="mh-label" id="dstlabel">${dstLabel}</span><div class="mh-items" id="dst">${dst}</div></div>
      </div>
      <div class="help-total" id="helptotal"></div>`;
    const srcZone = box.querySelector(".mh-src"), dstZone = box.querySelector(".mh-dst"), dstItems = box.querySelector("#dst");
    const dstLabelEl = box.querySelector("#dstlabel"), srcLabelEl = box.querySelector("#srclabel"), sayEl = box.querySelector(".help-say"), totalEl = box.querySelector("#helptotal");
    const movable = () => [...srcZone.querySelectorAll(".mh-item:not(.fixed):not(.gone)")];
    let n = p.kind === "more" ? p.have : 0, taken = 0, done = false, locked = false;
    const finish = (phrase) => { if (done) return; done = true; locked = true; totalEl.textContent = "= " + p.total; say(phrase, () => { if (o.onDone) o.onDone(p.total); }); };

    function land(el) {
      if (locked || done) return false;
      el.style.transform = ""; el.classList.remove("dragging"); el.classList.add("landed");
      setTimeout(() => el.classList.remove("landed"), 350);
      if (p.kind === "take") {
        dstItems.appendChild(el); taken++;
        dstLabelEl.textContent = `🤖 Bolt's hands · ${taken}`; srcLabelEl.textContent = `📦 Bolt's box · ${p.a - taken}`;
        if (taken < p.b) { say(taken === 1 ? "Take away 1" : String(taken)); return true; }
        locked = true;
        say(`${taken}. Now count what's left.`, () => {
          sayEl.textContent = "🤖 Count what's left!";
          const left = movable(); let k = 0;
          (function tick() { if (k >= left.length) return finish(`${p.total} left!`); left[k].classList.add("on"); say(String(++k), () => setTimeout(tick, 120)); })();
        });
        return true;
      }
      if (p.kind === "more") { const slot = dstItems.querySelector(".mh-slot.empty"); if (!slot) return false; slot.classList.remove("empty"); slot.appendChild(el); }
      else dstItems.appendChild(el);
      n++;
      const target = p.kind === "more" ? p.need : p.total;
      dstLabelEl.textContent = (p.kind === "more" ? `📦 ${n} of ${p.need}` : `📦 Bolt's box · ${n}`);
      if (n < target) { say(String(n)); return true; }
      if (p.kind === "more") { srcZone.querySelectorAll(".mh-item").forEach((x) => x.classList.add("gone")); }
      finish(p.kind === "add" ? `${n}! ${p.a} and ${p.b} make ${n}.` : p.kind === "more" ? `${n}! That is ${p.total} more.` : p.kind === "mul" ? `${n} in all!` : `${n}!`);
      return true;
    }
    const inside = (zone, x, y) => { const r = zone.getBoundingClientRect(); return x >= r.left - 8 && x <= r.right + 8 && y >= r.top - 8 && y <= r.bottom + 8; };
    let drag = null;
    box.querySelectorAll(".mh-item:not(.fixed)").forEach((el) => {
      el.addEventListener("pointerdown", (e) => { if (locked || done || o.auto) return; e.preventDefault(); try { el.setPointerCapture(e.pointerId); } catch (x) { } drag = { el, sx: e.clientX, sy: e.clientY, moved: false }; el.classList.add("dragging"); });
      el.addEventListener("pointermove", (e) => { if (!drag || drag.el !== el) return; const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy; if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true; el.style.transform = `translate(${dx}px,${dy}px)`; });
      const up = (e) => {
        if (!drag || drag.el !== el) return;
        const over = inside(dstZone, e.clientX, e.clientY);
        const ok = (over || !drag.moved) && el.parentElement && srcZone.contains(el) ? land(el) : false;
        if (!ok) { el.style.transform = ""; el.classList.remove("dragging"); if (drag.moved && !over) T.SFX.wrong(); } else T.SFX.tap();
        drag = null;
      };
      el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
      // iOS belt-and-braces: touch-action:none is what stops the page scrolling under a drag; older Safari needs the touchmove blocked too
      el.addEventListener("touchmove", (e) => { if (drag && drag.el === el) e.preventDefault(); }, { passive: false });
      el.addEventListener("contextmenu", (e) => e.preventDefault());
    });
    say(words[p.kind], () => {
      if (!o.auto) return;
      const order = p.kind === "take" ? movable().slice(0, p.b) : movable().slice(0, p.kind === "more" ? p.need - p.have : movable().length);
      let k = 0;
      (function step() { if (done || locked || k >= order.length) return; const el = order[k++]; el.classList.add("dragging"); setTimeout(() => { land(el); T.SFX.tap(); setTimeout(step, 550); }, 250); })();
    });
  }

  window.MathHelp = { plan, render, picture, emojiFor };
})();
