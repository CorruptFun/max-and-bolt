/* Max & Bolt — app: screens, reader, math, quiz, results, workshop, word vault, parent dashboard. */
(function () {
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => [...(el || document).querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const app = $("#app");
  const C = window.Content, A = window.Art, T = window.TTS, St = window.Store;
  const cleanWord = (w) => w.toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "").replace(/’/g, "'");

  /* ---------- hero: the "Max" slot can be a boy or a girl, per reader profile ---------- */
  const PRON = {
    boy: { he: "he", He: "He", his: "his", His: "His", him: "him", Him: "Him", himself: "himself", son: "son", boy: "boy" },
    girl: { he: "she", He: "She", his: "her", His: "Her", him: "her", Him: "Her", himself: "herself", son: "daughter", boy: "girl" },
  };
  function H(text) {
    const p = St.load();
    const map = PRON[p.hero === "girl" ? "girl" : "boy"];
    const name = p.heroName || (p.hero === "girl" ? "Maxie" : "Max");
    return String(text).replace(/\{(\w+)\}/g, (m, k) => map[k] != null ? map[k] : m).replace(/\bMax(?=\b|')/g, name);
  }
  function applyProfile() {
    const p = St.load();
    document.documentElement.dataset.theme = p.theme || "classic";
    A.setHero({ gender: p.hero === "girl" ? "girl" : "boy", name: p.heroName || (p.hero === "girl" ? "Maxie" : "Max") });
  }

  /* ---------- navigation ---------- */
  const screens = {};
  let current = null, currentArgs = null;
  function go(name, args, replace) {
    if (current === "reader") readerLeave();
    T.stop();
    current = name; currentArgs = args || {};
    window.scrollTo(0, 0);
    app.innerHTML = "";
    screens[name](currentArgs);
    try { (replace ? history.replaceState : history.pushState).call(history, { name, args: currentArgs }, ""); } catch (e) { }
  }
  window.addEventListener("popstate", (e) => {
    const s = e.state;
    if (s && screens[s.name] && s.name !== "reader" && s.name !== "results") { if (current === "reader") readerLeave(); T.stop(); current = s.name; currentArgs = s.args || {}; app.innerHTML = ""; screens[s.name](currentArgs); }
    else go("home", {}, true);
  });
  function render(html) { app.innerHTML = html; return app.firstElementChild; }
  function topbar(title, meta, backTo) {
    return `<div class="topbar">
      <button class="btn icon" data-act="back" data-to="${backTo || "home"}" aria-label="Back">←</button>
      <div class="title">${esc(title)}</div>${meta ? `<div class="meta">${meta}</div>` : ""}</div>`;
  }
  app.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act=back]");
    if (b) { T.SFX.tap(); go(b.dataset.to || "home"); }
  });
  document.addEventListener("pointerdown", () => T.unlock(), { once: true });

  /* ---------- modal ---------- */
  function modal(html, opts) {
    const bg = document.createElement("div");
    bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal">${html}</div>`;
    bg.addEventListener("click", (e) => { if (e.target === bg || e.target.closest("[data-close]")) close(); });
    function close() { bg.remove(); if (opts && opts.onClose) opts.onClose(); }
    document.body.appendChild(bg);
    return { el: bg, close };
  }
  function wordCard(word, def) {
    T.sayWord(word);
    modal(`<div class="word-big">${esc(word)}</div>${def ? `<div class="def">${esc(def)}</div>` : ""}
      <div class="row"><button class="btn grow" data-say>🔊 Say it</button><button class="btn primary grow" data-close>Got it</button></div>`)
      .el.querySelector("[data-say]").addEventListener("click", () => T.sayWord(word));
  }

  /* ---------- confetti ---------- */
  function confetti(n) {
    let cv = $("#confetti");
    if (!cv) { cv = document.createElement("canvas"); cv.id = "confetti"; document.body.appendChild(cv); }
    cv.width = innerWidth; cv.height = innerHeight;
    const ctx = cv.getContext("2d");
    const cols = ["#ffd93d", "#4d96ff", "#3fb64f", "#ff5e5e", "#b06cff", "#2ec4b6"];
    const ps = Array.from({ length: n || 120 }, () => ({ x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * .5, vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 4, r: 4 + Math.random() * 6, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6, va: (Math.random() - .5) * .3 }));
    let t = 0;
    (function frame() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ps.forEach((p) => { p.x += p.vx; p.y += p.vy; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * .6); ctx.restore(); });
      if (++t < 220) requestAnimationFrame(frame); else cv.remove();
    })();
  }

  /* =====================================================================
     WELCOME
     ===================================================================== */
  screens.welcome = function () {
    if (!St.hasProfiles()) return screens.newProfile({ first: true });
    const list = St.profiles();
    document.documentElement.dataset.theme = "classic";
    render(`<div class="screen welcome">
      <div class="logo">Max &amp; Bolt<small>Reading Adventures</small></div>
      <div class="display" style="font-size:1.5rem">Who's reading?</div>
      <div class="profiles">
        ${list.map((p) => { A.setHero({ gender: p.hero, name: p.heroName }); const rk = C.rankFor(p.xp); return `<button class="profile ${p.theme === "pink" ? "pink" : ""}" data-pid="${p.id}"><div class="portrait">${A.portrait("max", "happy")}</div><div class="pname">${esc(p.name)}</div><div class="psub">${rk.icon} ${rk.name}</div></button>`; }).join("")}
        <button class="profile add" id="add"><div style="font-size:2rem">➕</div><div class="pname" style="font-size:1.1rem">Add reader</div></button>
      </div>
    </div>`);
    applyProfile();
    $$("[data-pid]").forEach((b) => b.addEventListener("click", () => { St.switchTo(b.dataset.pid); applyProfile(); T.SFX.fanfare(); go("home", {}, true); }));
    $("#add").addEventListener("click", () => { T.SFX.tap(); go("newProfile"); });
  };

  screens.newProfile = function ({ first }) {
    const sel = { hero: "boy", theme: "classic", start: 1 };
    const heroCard = (g) => { A.setHero({ gender: g, name: g === "girl" ? "Maxie" : "Max" }); return A.portrait("max", "excited"); };
    const boyP = heroCard("boy"), girlP = heroCard("girl");
    applyProfile();
    render(`<div class="screen welcome" style="justify-content:flex-start">
      ${first ? `<div class="logo">Max &amp; Bolt<small>Reading Adventures</small></div>` : topbar("New reader", "", "welcome")}
      <div class="card" style="width:100%;max-width:480px;text-align:left;display:flex;flex-direction:column;gap:14px">
        <div class="field"><label>Reader's name</label><input type="text" id="name" maxlength="16" placeholder="Your name" autocomplete="off"></div>
        <div class="field"><label>Who's the hero?</label>
          <div class="pick" id="hero">
            <div class="opt on" data-v="boy"><div class="portrait">${boyP}</div>Max<small>the inventor</small></div>
            <div class="opt" data-v="girl"><div class="portrait">${girlP}</div>Maxie<small>the inventor</small></div>
          </div></div>
        <div class="field"><label>Look</label>
          <div class="pick" id="theme">
            <div class="opt on" data-v="classic"><div class="swatch" style="background:linear-gradient(135deg,#ffd93d,#4d96ff)"></div>Classic</div>
            <div class="opt pinkopt" data-v="pink"><div class="swatch" style="background:linear-gradient(135deg,#ff8fc8,#b06cff)"></div>Pink</div>
          </div></div>
        <div class="field"><label>Where to start?</label>
          <div class="pick" id="start">
            <div class="opt" data-v="0">🧸 First words<small>Pre-K · counting to 5</small></div>
            <div class="opt on" data-v="1">📖 Short sentences<small>1st grade and up</small></div>
          </div></div>
        <button class="btn big primary wide" id="create">LET'S GO!</button>
      </div>
    </div>`);
    const inp = $("#name");
    ["hero", "theme", "start"].forEach((k) => $$("#" + k + " .opt").forEach((o) => o.addEventListener("click", () => {
      T.SFX.tap(); $$("#" + k + " .opt").forEach((x) => x.classList.remove("on")); o.classList.add("on");
      sel[k] = k === "start" ? +o.dataset.v : o.dataset.v;
      if (k === "theme") document.documentElement.dataset.theme = sel.theme;
    })));
    const create = () => {
      const v = inp.value.trim(); if (!v) { inp.focus(); return; }
      St.addProfile({ name: v, hero: sel.hero, heroName: sel.hero === "girl" ? "Maxie" : "Max", theme: sel.theme, startSeason: sel.start });
      applyProfile(); T.SFX.fanfare(); go("home", {}, true);
    };
    $("#create").addEventListener("click", create);
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") create(); });
    setTimeout(() => inp.focus(), 50);
  };

  /* ---------- spelling list helpers (the week's words from school, entered by a parent) ---------- */
  const spellList = () => (St.load().spelling && St.load().spelling.list) || [];
  const spellSet = () => new Set(spellList());
  function spellStat(w) { const sp = St.load().spelling; sp.words[w] = sp.words[w] || { right: 0, wrong: 0, streak: 0, last: 0 }; return sp.words[w]; }
  /* mastery 0–3: how many times in a row it's been spelled right (capped) */
  const mastery = (w) => Math.min(3, (St.load().spelling.words[w] || {}).streak || 0);

  /* ---------- daily missions: three small goals a day, a bonus for all three ---------- */
  function missions() {
    const d = St.load(), day = St.day();
    const hasSpell = spellList().length > 0;
    return [
      { icon: "📖", name: "Read a story", done: day.stories >= 1 },
      { icon: "⭐", name: "Pass a quiz with 2+ stars", done: day.pass >= 1 },
      hasSpell ? { icon: "🔤", name: "Practice 5 spelling words", done: day.spell >= 5 } : { icon: "🔧", name: "Solve 5 math parts", done: day.math >= 5 },
    ];
  }
  const MISSION_XP = 50;
  /* call after anything that could finish a mission; returns true the moment all three are done today */
  function checkMissions() {
    const day = St.day();
    if (day.bonus || !missions().every((m) => m.done)) return false;
    day.bonus = true; St.load().xp += MISSION_XP; St.save();
    return true;
  }
  function missionsHtml() {
    const day = St.day(), m = missions(), n = m.filter((x) => x.done).length;
    return `<div class="card missions"><div class="row" style="justify-content:space-between"><h2 style="margin:0">🎯 Today's missions</h2><span class="muted small">${day.bonus ? "Done! +" + MISSION_XP + " XP" : n + " / 3 · +" + MISSION_XP + " XP"}</span></div>
      ${m.map((x) => `<div class="mission ${x.done ? "done" : ""}"><span class="mi">${x.done ? "✅" : x.icon}</span><span>${esc(x.name)}</span></div>`).join("")}</div>`;
  }

  /* =====================================================================
     HOME
     ===================================================================== */
  function nextStory() {
    const d = St.load();
    for (const s of C.SEASONS) {
      if (s.n < (d.startSeason || 0)) continue;
      if (s.n > d.unlocked) break;
      const list = C.storiesFor(s.n);
      const open = list.find((st) => !St.storyRec(st.id).done);
      if (open) return open;
    }
    return null;
  }
  function starsHtml(n) { return `<span class="stars">${[0, 1, 2].map((i) => `<span class="${i < n ? "" : "off"}">⭐</span>`).join("")}</span>`; }

  screens.home = function () {
    const d = St.load();
    if (!St.hasProfiles()) return screens.welcome();
    applyProfile();
    const rank = C.rankFor(d.xp);
    const pct = rank.next ? Math.round(((d.xp - rank.min) / (rank.next - rank.min)) * 100) : 100;
    const nxt = nextStory();
    const streak = St.streak();
    const band = C.bandFor(d.mathLevel);
    render(`<div class="screen">
      <div class="hero">
        <button class="avatar" id="switch" title="Switch reader">${A.portrait("max", "happy")}</button>
        <div class="who">
          <h1>Hi, ${esc(d.name)}!</h1>
          <div class="rank">${rank.icon} ${rank.name} <span class="muted">· ${d.xp} XP</span></div>
          <div class="xpbar"><i style="width:${pct}%"></i></div>
        </div>
        <div class="streak" title="Days in a row">🔥 ${streak}</div>
      </div>
      ${nxt ? `<button class="story-card" data-story="${nxt.id}">
        <div class="cover">${A.panel(nxt.cover)}</div>
        <div class="body"><div class="ep">▶ CONTINUE · SEASON ${nxt.season}</div><div class="name">${esc(nxt.title)}</div><div class="blurb">${esc(H(nxt.blurb))}</div></div>
      </button>` : `<div class="card yellow center"><h2>You finished every story!</h2><div class="muted">Read them again for 3 stars, or go beat your Workshop score.</div></div>`}
      ${missionsHtml()}
      <div class="tiles">
        <button class="tile" data-go="spelling"><div class="emoji">🔤</div><div class="name">Spelling</div><div class="sub">${spellList().length ? `${spellList().filter((w) => mastery(w) >= 3).length} / ${spellList().length} words nailed` : "Ask a grown-up for this week's words"}</div></button>
        <button class="tile" data-go="workshop"><div class="emoji">🔧</div><div class="name">Bolt's Workshop</div><div class="sub">Math level ${band.i + 1}: ${esc(band.name)}</div></button>
        <button class="tile" data-go="vault"><div class="emoji">📚</div><div class="name">Word Vault</div><div class="sub">${Object.keys(d.vocab).length + Object.keys(d.tapped).length} words</div></button>
        <button class="tile" data-go="stickers"><div class="emoji">⭐</div><div class="name">Stickers</div><div class="sub">${d.stickers.length} / ${window.STORIES.length}</div></button>
      </div>
      <h2 style="font-size:1.6rem;margin-top:4px">Seasons</h2>
      <div class="season-list">
        ${C.SEASONS.filter((s) => s.n >= (d.startSeason || 0)).map((s) => {
          const list = C.storiesFor(s.n);
          const locked = s.n > d.unlocked;
          const doneN = list.filter((st) => St.storyRec(st.id).done).length;
          const cover = list[0] ? list[0].cover : { bg: "yard" };
          return `<button class="season-card ${locked ? "locked" : ""}" data-season="${s.n}">
            <div class="cover">${A.panel(cover)}</div>
            <div class="body"><div class="num">SEASON ${s.n} · ${s.grade.toUpperCase()}</div><div class="name">${locked ? "🔒 " : ""}${esc(s.title)}</div>
            <div class="grade">${locked ? "Finish Season " + (s.n - 1) + " to unlock" : doneN + " / " + list.length + " stories"}</div>
            <div class="dots">${list.map((st) => { const r = St.storyRec(st.id); return `<i class="${r.done ? (r.stars === 3 ? "gold" : "on") : ""}"></i>`; }).join("")}</div></div>
          </button>`;
        }).join("")}
      </div>
      <div class="row" style="justify-content:center;margin-top:6px"><button class="btn ghost small muted" data-go="parent">⚙️ Parents</button></div>
    </div>`);
    $$("[data-go]").forEach((b) => b.addEventListener("click", () => { T.SFX.tap(); go(b.dataset.go); }));
    $("#switch").addEventListener("click", () => { T.SFX.tap(); go("welcome"); });
    $$("[data-story]").forEach((b) => b.addEventListener("click", () => { T.SFX.tap(); go("reader", { id: b.dataset.story }); }));
    $$("[data-season]").forEach((b) => b.addEventListener("click", () => {
      const n = +b.dataset.season;
      if (n > d.unlocked) { T.SFX.wrong(); modal(`<h2>🔒 Locked</h2><div class="def">Finish every story in Season ${n - 1} to open Season ${n}. You've got this!</div><button class="btn primary" data-close>Okay</button>`); return; }
      T.SFX.tap(); go("season", { n });
    }));
  };

  /* =====================================================================
     SEASON
     ===================================================================== */
  screens.season = function ({ n }) {
    const s = C.season(n);
    const list = C.storiesFor(n);
    render(`<div class="screen">
      ${topbar("Season " + n + ": " + s.title, s.grade)}
      <div class="card yellow"><div><b>Reading:</b> ${esc(s.skills)}</div><div style="margin-top:4px"><b>Math:</b> ${esc(s.math)}</div></div>
      ${list.map((st) => { const r = St.storyRec(st.id); return `<button class="story-card" data-story="${st.id}">
        <div class="cover">${A.panel(st.cover)}</div>
        <div class="body"><div class="ep">EPISODE ${st.num} · ${C.storyWords(st)} WORDS</div><div class="name">${esc(st.title)}</div><div class="blurb">${esc(H(st.blurb))}</div>
        <div class="stats">${starsHtml(r.stars)}${r.bestWpm ? `<span class="muted">🚀 ${r.bestWpm} wpm</span>` : ""}${r.reads ? `<span class="muted">read ${r.reads}×</span>` : ""}</div></div>
      </button>`; }).join("")}
    </div>`);
    $$("[data-story]").forEach((b) => b.addEventListener("click", () => { T.SFX.tap(); go("reader", { id: b.dataset.story }); }));
  };

  /* =====================================================================
     READER
     ===================================================================== */
  let R = null, timerInt = null, helpTO = null;
  function readerLeave() { if (R && R.pageStart) { R.seconds += (Date.now() - R.pageStart) / 1000; R.pageStart = 0; } clearInterval(timerInt); timerInt = null; clearTimeout(helpTO); helpTO = null; T.stop(); }
  function fmtTime(s) { s = Math.round(s); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }

  screens.reader = function ({ id, page }) {
    const story = C.story(id);
    if (!story) return go("home", {}, true);
    const season = C.season(story.season);
    R = { story, season, idx: page || 0, seconds: 0, pageStart: 0, words: 0, tapped: 0, helped: 0, mathFirst: 0, mathTotal: 0, quizFirst: 0, quizAnswers: [], counted: {}, seenMath: {}, solved: {}, spellFound: new Set() };
    document.documentElement.style.setProperty("--read-size", story.season === 0 ? "1.8rem" : story.season <= 2 ? "1.45rem" : story.season <= 4 ? "1.25rem" : "1.12rem");
    renderPage();
  };

  function wordsHtml(text, story) {
    text = H(text);
    const vocab = story.vocab || {};
    const sp = spellSet();
    return text.split(/(\s+)/).map((tok) => {
      if (!tok.trim()) return tok;
      const cw = cleanWord(tok);
      const isV = cw && vocab[cw];
      const isS = cw && sp.has(cw);
      return `<span class="word ${isV ? "vocab" : ""} ${isS ? "spell" : ""}" data-w="${esc(cw)}">${esc(tok)}</span>`;
    }).join("");
  }
  function linesHtml(lines, story) {
    return lines.map((l) => {
      if (l.n != null) return `<div class="caption">${wordsHtml(l.n, story)}</div>`;
      return `<div class="speech"><div class="portrait">${A.portrait(l.w, "happy")}</div><div class="bubble"><span class="name">${esc(A.NAMES[l.w] || l.w)}</span>${wordsHtml(l.t, story)}</div></div>`;
    }).join("");
  }
  function bindWords(root, story) {
    $$(".word", root).forEach((el) => el.addEventListener("click", () => {
      const w = el.dataset.w; if (!w) return;
      const d = St.load();
      $$(".word.hl", root).forEach((x) => x.classList.remove("hl"));
      el.classList.add("hl"); setTimeout(() => el.classList.remove("hl"), 900);
      if (spellSet().has(w)) {
        // one of this week's spelling words, hiding in the story — a quick spell-it-out card
        const fresh = R && !R.spellFound.has(w); if (R) R.spellFound.add(w);
        T.sayWord(w);
        modal(`<div class="muted small center" style="font-family:var(--font-ui);letter-spacing:.1em">🔤 SPELLING WORD${fresh ? " · +5 XP" : ""}</div><div class="word-big">${esc(w)}</div><div class="spell-out">${w.split("").map((ch) => `<span>${esc(ch)}</span>`).join("")}</div>
          <div class="row"><button class="btn grow" data-say>🔊 Say it</button><button class="btn primary grow" data-close>Got it</button></div>`)
          .el.querySelector("[data-say]").addEventListener("click", () => T.sayWord(w));
        return;
      }
      if (story.vocab && story.vocab[w]) { d.vocab[w] = true; St.save(); wordCard(w, story.vocab[w]); return; }
      d.tapped[w] = (d.tapped[w] || 0) + 1; if (R) R.tapped++; St.save();
      T.sayWord(w);
    }));
  }
  function readAloud(root, btn) {
    const words = $$(".word", root);
    const parts = []; let text = ""; const offsets = [];
    words.forEach((w) => { offsets.push(text.length); text += w.textContent + " "; });
    let last = -1;
    btn.disabled = true;
    if (R) R.helped++;
    T.speak(text.trim(), {
      rate: R.story.season <= 2 ? .8 : .9,
      onWord(ci) {
        let i = offsets.findIndex((o, k) => o <= ci && (k === offsets.length - 1 || offsets[k + 1] > ci));
        if (i < 0 || i === last) return;
        if (last >= 0) words[last].classList.remove("hl");
        words[i].classList.add("hl"); last = i;
      },
      onEnd() { if (last >= 0) words[last].classList.remove("hl"); btn.disabled = false; },
    });
  }

  /* Read-aloud is a helper, not a narrator: the page button only appears after the reader has had a fair go at
     the page (about 3× the season's goal pace, 20–90 s). Pre-K pages are meant to be read with help, so they get it
     right away. Tapping a single word always works. Parents can set "always" or "never" in the dashboard. */
  function helpDelay(words) {
    const mode = St.load().settings.readHelp || "wait";
    if (mode === "never" || !T.available || !St.load().settings.tts) return -1;
    if (mode === "always" || R.season.n === 0) return 0;
    if (!words) return 30000;
    return Math.min(90, Math.max(20, Math.round((words / R.season.wpm) * 60 * 3))) * 1000;
  }
  function armHelp(btn, words) {
    const ms = helpDelay(words);
    if (ms < 0) { btn.remove(); return; }
    const show = () => { btn.hidden = false; btn.classList.add("pop"); };
    if (ms === 0) show(); else helpTO = setTimeout(show, ms);
  }
  function navButtons(idx, total, isMath) {
    return `<div class="reader-controls">
        <button class="btn big" id="back" aria-label="Back" ${idx === 0 ? "disabled" : ""}>◀</button>
        <button class="btn big help" id="read" hidden>🔊 Help me</button>
        <button class="btn big primary" id="next" ${isMath ? "disabled" : ""}>${idx === total - 1 ? "FINISH ▶" : "NEXT ▶"}</button>
      </div>`;
  }

  function renderPage() {
    const { story, idx } = R;
    const total = story.pages.length;
    if (idx >= total) return renderQuiz();
    const p = story.pages[idx];
    const d = St.load();
    const isMath = !!p.math;
    render(`<div class="screen reader">
      <div class="topbar"><button class="btn icon" id="exit" aria-label="Exit">✕</button><div class="title">${esc(story.title)}</div><div class="timer ${d.settings.timer ? "" : "hidden"}" id="timer">⏱ 0:00</div></div>
      <div class="progress"><i style="width:${Math.round((idx / (total + 1)) * 100)}%"></i></div>
      <div class="panel-frame"><div class="pnum">${idx + 1} / ${total}</div>${A.panel(p.art)}</div>
      <div class="text-area" id="text">
        ${isMath ? `${p.math.intro ? `<div class="caption">${wordsHtml(p.math.intro, story)}</div>` : ""}
          <div class="card"><div class="q-label">🔧 BOLT NEEDS MATH</div><div class="question">${wordsHtml(p.math.q, story)}</div></div>
          <div class="choices ${p.math.choices.length === 4 ? "four" : ""}" id="choices">${p.math.choices.map((c) => `<button class="choice" data-c="${esc(c)}">${esc(c)}</button>`).join("")}</div>
          <div id="feedback"></div>`
        : linesHtml(p.lines, story)}
      </div>
      ${navButtons(idx, total, isMath && !R.solved[idx])}
    </div>`);
    T.SFX.page();
    const textEl = $("#text");
    bindWords(textEl, story);
    $("#exit").addEventListener("click", () => { T.SFX.tap(); go("season", { n: story.season }); });
    $("#read").addEventListener("click", (e) => readAloud(textEl, e.currentTarget));
    $("#next").addEventListener("click", () => { T.SFX.tap(); readerLeave(); R.idx++; renderPage(); });
    $("#back").addEventListener("click", () => { if (R.idx === 0) return; T.SFX.tap(); readerLeave(); R.idx--; renderPage(); });

    // timing: count words + run the clock only on reading pages (math pages are thinking time, not reading speed).
    // Words count once per page; the clock runs on every visit, so going back to re-read is honest reading time.
    if (!isMath) {
      const pw = p.lines.reduce((n, l) => n + C.wordCount(l.n || l.t || ""), 0);
      if (!R.counted[idx]) { R.words += pw; R.counted[idx] = true; }
      R.pageStart = Date.now();
      const tEl = $("#timer");
      timerInt = setInterval(() => { if (R && tEl) tEl.textContent = "⏱ " + fmtTime(R.seconds + (R.pageStart ? (Date.now() - R.pageStart) / 1000 : 0)); }, 500);
      armHelp($("#read"), pw);
    } else if (R.solved[idx]) {
      // came back to a math page already answered: show it solved, no second try, no second bonus
      $("#timer").textContent = "⏱ " + fmtTime(R.seconds);
      $$(".choice").forEach((x) => { x.disabled = true; if (x.dataset.c === String(p.math.answer)) x.classList.add("right"); });
      $("#feedback").innerHTML = `<div class="success">✅ ${wordsHtml(p.math.success || "Nice!", story)}</div>`;
      bindWords($("#feedback"), story);
      $("#read").remove();
    } else {
      $("#timer").textContent = "⏱ " + fmtTime(R.seconds);
      armHelp($("#read"), 0);
      let tries = 0; if (!R.seenMath[idx]) { R.mathTotal++; R.seenMath[idx] = true; }
      $$(".choice").forEach((b) => b.addEventListener("click", () => {
        const ok = b.dataset.c === String(p.math.answer);
        tries++;
        if (ok) {
          T.SFX.right(); b.classList.add("right");
          $$(".choice").forEach((x) => x.disabled = true);
          if (tries === 1) R.mathFirst++;
          R.solved[idx] = true;
          $("#feedback").innerHTML = `<div class="success">✅ ${wordsHtml(p.math.success || "Nice!", story)}</div>`;
          bindWords($("#feedback"), story);
          St.day().math++; St.save();
          renderBonus();
        } else {
          T.SFX.wrong(); b.classList.add("wrong"); b.disabled = true;
          $("#feedback").innerHTML = `<div class="hint">💡 ${esc(H(p.math.hint || "Try again!"))}</div>`;
        }
      }));
    }
  }

  /* Bonus part: one generated problem at the reader's adaptive math level, right after the story's own math.
     First-try right climbs the level, a miss eases it. Never blocks for long — after two misses the answer is shown. */
  function renderBonus() {
    const d = St.load();
    const fb = $("#feedback");
    if (d.settings.bonus === false || !fb) { $("#next").disabled = false; return; }
    const prob = C.adaptiveProblem(d.mathLevel);
    const band = C.bandFor(d.mathLevel);
    const box = document.createElement("div");
    box.className = "card bonus";
    box.innerHTML = `<div class="row" style="justify-content:space-between"><div class="q-label">🔩 BONUS PART</div><span class="level-pill"><b>LVL ${band.i + 1}</b> ${esc(band.name)}</span></div>
      <div class="question" style="margin-top:6px">${esc(prob.q)}</div>
      <div class="choices four" style="margin-top:10px">${prob.choices.map((c) => `<button class="choice" data-c="${esc(c)}">${esc(c)}</button>`).join("")}</div><div class="bfb" style="margin-top:8px"></div>`;
    fb.after(box);
    let tries = 0;
    $$(".choice", box).forEach((b) => b.addEventListener("click", () => {
      tries++;
      const ok = b.dataset.c === prob.answer;
      if (ok) { T.SFX.right(); b.classList.add("right"); } else { T.SFX.wrong(); b.classList.add("wrong"); b.disabled = true; }
      if (ok || tries >= 2) {
        $$(".choice", box).forEach((x) => { x.disabled = true; if (!ok && x.dataset.c === prob.answer) x.classList.add("right"); });
        const result = ok ? (tries === 1 ? "right" : "retry") : "wrong";
        C.adjustLevel(d, result);
        const nb = C.bandFor(d.mathLevel);
        $(".bfb", box).innerHTML = ok
          ? `<div class="success">${nb.i > band.i ? "🚀 Level up! Now: <b>" + esc(nb.name) + "</b>" : "✅ Bolt got the part!"}</div>`
          : `<div class="hint">The answer was <b>${esc(prob.answer)}</b>. Bolt will hand you easier parts for a bit.</div>`;
        St.day().math++; St.save();
        $("#next").disabled = false;
      } else {
        $(".bfb", box).innerHTML = `<div class="hint">Not that one. One more try!</div>`;
      }
    }));
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /* ---------- quiz ---------- */
  function renderQuiz() {
    const { story } = R;
    const qi = R.quizAnswers.length;
    if (qi >= story.quiz.length) return finishStory();
    const q = story.quiz[qi];
    render(`<div class="screen reader">
      <div class="topbar"><div class="title">Quiz time!</div><div class="meta">${qi + 1} / ${story.quiz.length}</div></div>
      <div class="progress"><i style="width:${Math.round(((story.pages.length + qi / story.quiz.length) / (story.pages.length + 1)) * 100)}%"></i></div>
      <div class="panel-frame">${A.panel({ bg: "room", cast: [{ who: "bolt", mood: "think", pose: "think", x: 50 }], props: [{ e: "❓", x: 75, y: 30, s: 60 }] })}</div>
      <div class="card"><div class="q-label">📖 QUESTION ${qi + 1}</div><div class="question" id="qtext">${wordsHtml(q.q, story)}</div></div>
      <div class="choices" id="choices">${q.c.map((c, i) => `<button class="choice" data-i="${i}">${esc(H(c))}</button>`).join("")}</div>
      <div id="feedback"></div>
      <div class="reader-controls">
        <button class="btn big" id="back" aria-label="Back to the story">◀</button>
        <button class="btn big help" id="read" hidden>🔊 Help me</button>
        <button class="btn big primary" id="next" disabled>NEXT ▶</button>
      </div>
    </div>`);
    bindWords($("#qtext"), story);
    armHelp($("#read"), 0);
    $("#read").addEventListener("click", (e) => { const b = e.currentTarget; b.disabled = true; R.helped++; T.speak(H(q.q) + ". " + q.c.map((c, i) => `${["A", "B", "C", "D"][i]}: ${H(c)}`).join(". "), { onEnd: () => b.disabled = false }); });
    // back into the story to check — answers already given stay given, the quiz picks up where it left off
    $("#back").addEventListener("click", () => { T.SFX.tap(); readerLeave(); R.idx = story.pages.length - 1; renderPage(); });
    let tries = 0;
    $$(".choice").forEach((b) => b.addEventListener("click", () => {
      tries++;
      if (+b.dataset.i === q.a) {
        T.SFX.right(); b.classList.add("right"); $$(".choice").forEach((x) => x.disabled = true);
        R.quizAnswers.push(tries === 1); if (tries === 1) { R.quizFirst++; T.SFX.star(); }
        $("#next").disabled = false;
      } else { T.SFX.wrong(); b.classList.add("wrong"); b.disabled = true; $("#feedback").innerHTML = `<div class="hint">Not quite. Think about the story and try again!</div>`; }
    }));
    $("#next").addEventListener("click", () => { T.SFX.tap(); renderQuiz(); });
  }

  /* ---------- results ---------- */
  function finishStory() {
    const { story, season } = R;
    const d = St.load();
    const rec = St.storyRec(story.id);
    const minutes = Math.max(R.seconds, 5) / 60;
    const wpm = Math.round(R.words / minutes);
    const stars = R.quizFirst;
    const first = !rec.done;
    const fast = wpm >= season.wpm;
    // The quiz is the proof of reading: 2 of 3 first-try answers passes. Below that the story isn't finished —
    // no sticker, no unlock, and the next story stays closed until it's read again (parents can switch the gate off).
    // Faster than 2.5× the grade's goal isn't reading, it's tapping NEXT — that counts as not read, and doesn't set a best.
    const skimmed = wpm > season.wpm * 2.5;
    const passed = (stars >= 2 && !skimmed) || d.settings.gate === false;
    const gated = !passed && !rec.done;
    const spellHits = spellList().filter((w) => story.pages.some((pg) => (pg.lines || []).some((l) => new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(H(l.n || l.t || ""))))).length;
    let xp = R.words + stars * 25 + R.mathFirst * 15 + (fast ? 20 : 0) + (first && passed ? 50 : 0) + spellHits * 5;
    if (rec.reads > 0) xp = Math.round(xp * .6);   // re-reads still pay, just less
    rec.reads++; if (passed) rec.done = true; rec.stars = Math.max(rec.stars, stars); rec.lastWpm = wpm; if (!skimmed) rec.bestWpm = Math.max(rec.bestWpm, wpm);
    rec.quizRight += R.quizFirst; rec.quizTotal += story.quiz.length; rec.mathFirst += R.mathFirst; rec.mathTotal += R.mathTotal; rec.lastAt = Date.now();
    rec.history = (rec.history || []).concat([{ t: Date.now(), wpm, stars, tapped: R.tapped, helped: R.helped, passed }]).slice(-20);
    d.xp += xp;
    const day = St.day(); day.words += R.words; day.seconds += Math.round(R.seconds); day.stories++; if (stars >= 2) day.pass++;
    const newSticker = passed && !d.stickers.includes(story.id); if (newSticker) d.stickers.push(story.id);
    let unlocked = false;
    if (passed && C.storiesFor(story.season).every((s) => St.storyRec(s.id).done) && d.unlocked === story.season && story.season < C.MAX_SEASON) { d.unlocked = story.season + 1; unlocked = true; }
    St.save();
    const missionsDone = checkMissions();
    const rank = C.rankFor(d.xp);
    const next = nextStory();
    const gaugeMax = season.wpm * 1.6, pos = Math.min(98, (wpm / gaugeMax) * 100), tgt = (season.wpm / gaugeMax) * 100;
    const msg = gated && skimmed ? "Whoa, that was fast! Even Bolt can't read that fast. Read it again — slowly — and get 2 stars to open the next story."
      : gated ? "Hmm. Bolt thinks some pages got skipped. Read it again — slowly — and get 2 stars to open the next story."
      : stars === 3 ? "Perfect quiz! You really read that." : stars === 2 ? "Great reading! One more star next time." : stars === 1 ? "Nice job finishing! Read it again for more stars." : "You finished! Try it again and watch for the details.";
    render(`<div class="screen">
      <div class="topbar"><div class="title">${esc(story.title)}</div></div>
      ${gated ? `<div class="panel-frame">${A.panel({ bg: "room", cast: [{ who: "bolt", mood: "think", pose: "think", x: 36 }, { who: "max", mood: "worried", pose: "hold", x: 72, flip: true }], props: [{ p: "book", x: 72, y: 62, s: 34 }, { p: "question", x: 36, y: 22, s: 40 }] })}</div>` : ""}
      <div class="card yellow center">
        <div class="results-stars">${[0, 1, 2].map((i) => `<span class="${i < stars ? "" : "off"}">⭐</span>`).join("")}</div>
        <div class="display" style="font-size:1.4rem;margin-top:6px">${esc(msg)}</div>
      </div>
      <div class="card">
        <div class="row"><b>Reading speed</b><span class="grow"></span><span class="muted small">goal ${season.wpm} wpm</span></div>
        <div class="gauge"><div class="fill" id="gfill"></div><div class="target" style="left:${tgt}%"></div><div class="rocket" id="grocket">🚀</div></div>
        <div class="center display" style="font-size:1.6rem;margin-top:14px">${wpm} words per minute ${skimmed ? "🤔" : fast ? "🔥" : ""}</div>
        ${rec.bestWpm > wpm ? `<div class="center muted small">Your best is ${rec.bestWpm}</div>` : rec.reads > 1 ? `<div class="center muted small">New personal best!</div>` : ""}
      </div>
      <div class="statgrid">
        <div class="stat"><b>${R.words}</b><span>words</span></div>
        <div class="stat"><b>${fmtTime(R.seconds)}</b><span>time</span></div>
        <div class="stat"><b>${R.mathFirst}/${R.mathTotal}</b><span>math</span></div>
      </div>
      <div class="card center"><div class="display" style="font-size:1.5rem">+${xp} XP</div><div class="muted small">${rank.icon} ${rank.name}${rank.next ? ` · ${rank.next - d.xp} XP to ${rank.nextName}` : ""}</div>
        ${spellHits ? `<div class="small" style="margin-top:4px">🔤 ${spellHits} spelling word${spellHits === 1 ? "" : "s"} in this story · +${spellHits * 5}</div>` : ""}
        ${newSticker ? `<div class="sticker-pop">${C.STICKERS[story.id] || "🏅"}</div><div class="small"><b>New sticker!</b></div>` : ""}
        ${unlocked ? `<div class="display" style="font-size:1.3rem;margin-top:8px;color:var(--blue)">🔓 Season ${story.season + 1} unlocked!</div>` : ""}
        ${missionsDone ? `<div class="display" style="font-size:1.2rem;margin-top:8px;color:var(--green)">🎯 All missions done! +${MISSION_XP} XP</div>` : ""}
      </div>
      <div class="row">
        ${gated ? `<button class="btn primary grow" id="again">Read it again ▶</button>` : `<button class="btn grow" id="again">Read again</button>
        ${next ? `<button class="btn primary grow" id="nextstory">Next story ▶</button>` : `<button class="btn primary grow" id="homebtn">Home</button>`}`}
      </div>
      <button class="btn ghost small muted" id="home2">Back to seasons</button>
    </div>`);
    R = null;
    setTimeout(() => { $("#gfill").style.width = pos + "%"; $("#grocket").style.left = pos + "%"; }, 50);
    if (stars >= 2) { T.SFX.fanfare(); confetti(stars === 3 ? 160 : 90); } else if (gated) T.SFX.wrong(); else T.SFX.star();
    try { history.replaceState({ name: "season", args: { n: story.season } }, ""); } catch (e) { }
    $("#again").addEventListener("click", () => { T.SFX.tap(); go("reader", { id: story.id }); });
    const nb = $("#nextstory"); if (nb) nb.addEventListener("click", () => { T.SFX.tap(); go("reader", { id: next.id }); });
    const hb = $("#homebtn"); if (hb) hb.addEventListener("click", () => go("home"));
    $("#home2").addEventListener("click", () => go("season", { n: story.season }));
  }

  /* =====================================================================
     BOLT'S WORKSHOP — 60-second math blast
     ===================================================================== */
  function ladderHtml(level) {
    const b = C.bandFor(level);
    return `<div class="ladder">${C.BANDS.map((_, i) => `<i class="${i < b.i ? "on" : i === b.i ? "cur" : ""}" title="${esc(C.BANDS[i].name)}"></i>`).join("")}</div>`;
  }
  screens.workshop = function ({ mode }) {
    const d = St.load();
    const band = C.bandFor(d.mathLevel);
    const pick = mode || "auto";
    render(`<div class="screen">
      ${topbar("Bolt's Workshop", "")}
      <div class="panel-frame">${A.panel({ bg: "garage", cast: [{ who: "bolt", mood: "excited", pose: "hold", x: 40 }], props: [{ e: "🔧", x: 40, y: 58, s: 34 }, { e: "⏱️", x: 78, y: 40, s: 50 }] })}</div>
      <div class="card yellow"><h2>60-second math blast</h2><div>Bolt needs parts, fast. Solve as many as you can before the timer runs out. Get them right and the parts get harder. Miss a few and Bolt eases up.</div></div>
      <div class="card">
        <div class="row" style="justify-content:space-between;margin-bottom:8px"><b>Your math level</b><span class="level-pill"><b>LVL ${band.i + 1}</b> ${esc(band.name)}</span></div>
        ${ladderHtml(d.mathLevel)}
        <div class="field" style="margin-top:12px"><label>Practice</label><select id="mode">
          <option value="auto" ${pick === "auto" ? "selected" : ""}>My level (gets harder as I go) — recommended</option>
          ${C.BANDS.map((b, i) => `<option value="${i}" ${String(pick) === String(i) ? "selected" : ""}>Level ${i + 1} · ${b.name}</option>`).join("")}
        </select></div>
        <div class="muted small" style="margin-top:8px">Best score: <b id="best">${d.workshop[pick] || 0}</b></div></div>
      <button class="btn big primary wide" id="start">START! 🔧</button>
    </div>`);
    $("#mode").addEventListener("change", (e) => { $("#best").textContent = d.workshop[e.target.value] || 0; });
    $("#start").addEventListener("click", () => runWorkshop($("#mode").value));
  };
  function runWorkshop(mode) {
    const d = St.load();
    const adaptive = mode === "auto";
    const startLevel = d.mathLevel;
    let score = 0, left = 60, prob = null, ended = false, tries = 0;
    const quips = ["Bolt approves.", "Shiny!", "Faster than a toaster!", "Zoe would be jealous.", "The cat is taking notes.", "Dr. Dullsworth hates this.", "More parts!", "Beep boop, correct."];
    render(`<div class="screen">
      <div class="topbar"><button class="btn icon" id="quit">✕</button><div class="title">Workshop</div><div class="ws-timer" id="t">1:00</div></div>
      <div class="row"><div class="card center grow" style="padding:8px"><div class="muted small">SCORE</div><div class="display" style="font-size:2.2rem" id="score">0</div></div>
        <div class="card center grow" style="padding:8px"><div class="muted small">LEVEL</div><div class="display" style="font-size:2.2rem" id="lvl">${adaptive ? C.bandFor(d.mathLevel).i + 1 : +mode + 1}</div></div></div>
      <div class="card center"><div class="ws-big" id="q"></div><div class="muted small" id="bname"></div></div>
      <div class="choices four" id="choices"></div>
      <div class="center display" id="quip" style="font-size:1.2rem;min-height:1.4rem;color:var(--muted)"></div>
    </div>`);
    const tEl = $("#t");
    const tick = setInterval(() => {
      left--; tEl.textContent = "0:" + String(left).padStart(2, "0");
      if (left <= 10) { tEl.classList.add("low"); T.SFX.tick(); }
      if (left <= 0) end();
    }, 1000);
    function next() {
      prob = adaptive ? C.adaptiveProblem(d.mathLevel) : C.problemFromBand(+mode);
      tries = 0;
      $("#q").textContent = prob.q; $("#bname").textContent = prob.bandName;
      $("#lvl").textContent = prob.band + 1;
      $("#choices").innerHTML = prob.choices.map((c) => `<button class="choice" data-c="${esc(c)}">${esc(c)}</button>`).join("");
      $$(".choice").forEach((b) => b.addEventListener("click", () => {
        if (ended) return;
        tries++;
        if (b.dataset.c === prob.answer) {
          score++; $("#score").textContent = score; T.SFX.right(); St.day().math++;
          const before = C.bandFor(d.mathLevel).i;
          if (adaptive) C.adjustLevel(d, tries === 1 ? "right" : "retry", .6);
          const after = C.bandFor(d.mathLevel).i;
          $("#quip").textContent = after > before ? "🚀 LEVEL UP!" : quips[Math.floor(Math.random() * quips.length)];
          next();
        } else {
          T.SFX.wrong(); b.classList.add("wrong"); b.disabled = true;
          if (adaptive && tries === 1) C.adjustLevel(d, "wrong", .8);
          $("#quip").textContent = tries >= 2 ? "The answer is " + prob.answer + "." : "Hmm, try another.";
          if (tries >= 2) { $$(".choice").forEach((x) => { x.disabled = true; if (x.dataset.c === prob.answer) x.classList.add("right"); }); setTimeout(() => { if (!ended) next(); }, 1200); }
        }
      }));
    }
    function end() {
      ended = true; clearInterval(tick);
      const best = Math.max(d.workshop[mode] || 0, score); const isBest = score > (d.workshop[mode] || 0) && score > 0;
      d.workshop[mode] = best; const xp = score * 3; d.xp += xp; St.save();
      const missionsDone = checkMissions();
      if (isBest) { T.SFX.fanfare(); confetti(100); } else T.SFX.star();
      const b0 = C.bandFor(startLevel), b1 = C.bandFor(d.mathLevel);
      const moved = adaptive && b1.i !== b0.i ? (b1.i > b0.i ? `🚀 Moved up to Level ${b1.i + 1}: ${b1.name}` : `Eased back to Level ${b1.i + 1}: ${b1.name}. Next time!`) : "";
      render(`<div class="screen">
        <div class="topbar"><div class="title">Time's up!</div></div>
        <div class="panel-frame">${A.panel({ bg: "garage", cast: [{ who: "bolt", mood: score >= 10 ? "excited" : "happy", pose: score >= 10 ? "cheer" : "wave", x: 40 }, { who: "max", mood: "happy", pose: "point", x: 75, flip: true }], fx: isBest ? "sparkle" : "none" })}</div>
        <div class="card yellow center"><div class="display" style="font-size:2.6rem">${score} solved</div><div>${isBest ? "🏆 New best score!" : "Best: " + best}</div><div class="muted small">+${xp} XP</div>${moved ? `<div style="margin-top:8px"><b>${esc(moved)}</b></div>` : ""}${missionsDone ? `<div style="margin-top:8px;color:var(--green)"><b>🎯 All missions done! +${MISSION_XP} XP</b></div>` : ""}</div>
        <div class="card">${ladderHtml(d.mathLevel)}<div class="muted small center" style="margin-top:6px">Math level ${b1.i + 1} of ${C.BANDS.length}: ${esc(b1.name)}</div></div>
        <div class="row"><button class="btn grow" id="again">Again</button><button class="btn primary grow" id="home">Home</button></div>
      </div>`);
      $("#again").addEventListener("click", () => runWorkshop(mode));
      $("#home").addEventListener("click", () => go("home"));
    }
    $("#quit").addEventListener("click", () => { clearInterval(tick); ended = true; St.save(); go("workshop", { mode }); });
    next();
  }

  /* =====================================================================
     SPELLING — this week's words from school. Practice: look, hide, build it from letter tiles.
     Test: hear it, spell it on the keyboard, one shot per word. Parents enter the list in the dashboard.
     ===================================================================== */
  const spellPanel = (mood, pose, word) => A.panel({ bg: "school", cast: [{ who: "bolt", mood, pose, x: 30 }, { who: "max", mood: "happy", pose: "point", x: 74, flip: true }], props: [{ p: "note", x: 74, y: 58, s: 30 }, { p: "sparkle", x: 88, y: 22, s: 30 }], bubble: word ? { text: word.toUpperCase().split("").join("-"), x: 44, y: 16 } : null });
  screens.spelling = function () {
    const d = St.load(), sp = d.spelling, list = sp.list;
    const lastTest = sp.tests[sp.tests.length - 1];
    render(`<div class="screen">
      ${topbar("Spelling", sp.label || "")}
      <div class="panel-frame">${spellPanel("happy", "wave", list.length ? list[0].slice(0, 6) : "")}</div>
      ${!list.length ? `<div class="card yellow center"><h2>No words yet</h2><div>Ask a grown-up to put this week's spelling words in ⚙️ Parents.</div></div>` : `
      <div class="card"><h2>${sp.label ? esc(sp.label) : "This week's words"}</h2>
        <div class="chips">${list.map((w) => `<button class="chip spellchip" data-w="${esc(w)}">${esc(w)}<small class="dots-m">${[0, 1, 2].map((i) => `<i class="${i < mastery(w) ? "on" : ""}"></i>`).join("")}</small></button>`).join("")}</div>
        <div class="muted small" style="margin-top:8px">Tap a word to hear it. Dots fill as you spell it right in a row.</div></div>
      <div class="tiles">
        <button class="tile" id="practice"><div class="emoji">🔤</div><div class="name">Practice</div><div class="sub">Look, hide, build it</div></button>
        <button class="tile" id="test"><div class="emoji">🏆</div><div class="name">Test</div><div class="sub">${lastTest ? `Last: ${lastTest.score} / ${lastTest.total}` : "Hear it, spell it"}</div></button>
      </div>`}
    </div>`);
    $$(".spellchip").forEach((b) => b.addEventListener("click", () => T.sayWord(b.dataset.w)));
    const pr = $("#practice"); if (pr) pr.addEventListener("click", () => { T.SFX.tap(); runSpell("practice"); });
    const te = $("#test"); if (te) te.addEventListener("click", () => { T.SFX.tap(); runSpell("test"); });
  };

  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function runSpell(mode) {
    const d = St.load(), sp = d.spelling;
    const test = mode === "test";
    // practice: weakest words first, at most 10 a session. test: every word, shuffled.
    let queue = test ? shuffle(sp.list) : sp.list.slice().sort((a, b) => (mastery(a) - mastery(b)) || (spellStat(b).wrong - spellStat(a).wrong)).slice(0, 10);
    if (!test) queue = shuffle(queue.slice(0, 4)).concat(shuffle(queue.slice(4)));
    const S = { i: 0, score: 0, xp: 0, missed: [], tries: 0 };
    const total = queue.length;

    function frame(inner, sub) {
      render(`<div class="screen spell">
        <div class="topbar"><button class="btn icon" id="exit" aria-label="Exit">✕</button><div class="title">${test ? "Spelling test" : "Spelling practice"}</div><div class="muted small">${S.i + 1} / ${total}</div></div>
        <div class="progress"><i style="width:${Math.round((S.i / total) * 100)}%"></i></div>
        ${inner}
      </div>`);
      $("#exit").addEventListener("click", () => { T.SFX.tap(); go("spelling"); });
    }
    const slots = (word, typed) => `<div class="slots">${word.split("").map((_, i) => `<span class="slot ${typed[i] ? "filled" : ""}">${esc(typed[i] || "")}</span>`).join("")}</div>`;

    function look(word) {
      const hint = sp.hints[word];
      frame(`<div class="panel-frame">${spellPanel("excited", "point", word)}</div>
        <div class="card yellow center"><div class="muted small" style="font-family:var(--font-ui);letter-spacing:.1em">LOOK AT IT</div>
          <div class="word-big" id="w">${esc(word)}</div>${hint ? `<div class="def">${esc(hint)}</div>` : ""}</div>
        <div class="row"><button class="btn big grow" id="say" ${T.available ? "" : "disabled"}>🔊</button><button class="btn big primary grow" id="hide">Hide it ▶</button></div>`);
      T.sayWord(word);
      $("#say").addEventListener("click", () => T.sayWord(word));
      $("#hide").addEventListener("click", () => { T.SFX.tap(); spell(word); });
    }

    function spell(word) {
      const hint = sp.hints[word];
      let typed = [];
      const letters = test ? "abcdefghijklmnopqrstuvwxyz'".split("") : shuffle(word.split("").concat(decoys(word, 2)));
      const canHear = T.available && d.settings.tts;
      frame(`<div class="panel-frame">${spellPanel("think", "think")}</div>
        <div class="card center">
          <div class="muted small" style="font-family:var(--font-ui);letter-spacing:.1em">${test ? "SPELL THE WORD YOU HEAR" : "NOW SPELL IT"}</div>
          ${hint ? `<div class="def small" style="margin-top:4px">${esc(hint)}</div>` : ""}
          <div id="slots">${slots(word, typed)}</div>
          <div id="fb"></div>
        </div>
        <div class="keys ${test ? "kbd" : "tiles-row"}" id="keys">${letters.map((ch, i) => `<button class="key" data-i="${i}" data-ch="${esc(ch)}">${esc(ch)}</button>`).join("")}<button class="key back" id="del">⌫</button></div>
        <div class="reader-controls"><button class="btn big" id="say" ${canHear ? "" : "disabled"}>🔊</button><button class="btn big primary" id="check" disabled>CHECK ✓</button></div>`);
      const keysEl = $("#keys"), checkB = $("#check");
      if (test && !canHear && !hint) { // nothing to hear and no hint: flash it for a moment so the test still works
        const fb = $("#fb"); fb.innerHTML = `<div class="word-big">${esc(word)}</div>`; setTimeout(() => { fb.innerHTML = ""; }, 1500);
      }
      if (canHear) setTimeout(() => T.sayWord(word), test ? 200 : 0);
      const redraw = () => { $("#slots").innerHTML = slots(word, typed); checkB.disabled = typed.length !== word.length; };
      $("#say").addEventListener("click", () => T.sayWord(word));
      $$(".key[data-ch]", keysEl).forEach((k) => k.addEventListener("click", () => {
        if (typed.length >= word.length) return;
        T.SFX.tap(); typed.push(k.dataset.ch);
        if (!test) { k.disabled = true; k.classList.add("used"); k.dataset.pos = typed.length - 1; }
        redraw();
      }));
      $("#del").addEventListener("click", () => {
        if (!typed.length) return;
        typed.pop();
        if (!test) { const k = $(`.key[data-pos="${typed.length}"]`, keysEl); if (k) { k.disabled = false; k.classList.remove("used"); delete k.dataset.pos; } }
        redraw();
      });
      checkB.addEventListener("click", () => {
        const got = typed.join("");
        const st = spellStat(word); st.last = Date.now();
        checkB.disabled = true; $$(".key", keysEl).forEach((k) => k.disabled = true);
        if (got === word) {
          T.SFX.right(); St.day().spell++;
          const firstTry = S.tries === 0;
          if (firstTry) { S.score++; st.right++; st.streak++; } else st.streak = Math.max(0, st.streak);
          const gain = test ? 10 : (firstTry ? 5 : 2); S.xp += gain; d.xp += gain; St.save();
          $("#fb").innerHTML = `<div class="success">✅ ${esc(word)}! +${gain} XP</div>`;
          $$(".slot").forEach((x) => x.classList.add("right"));
          if (canHear) T.speak(word + ". " + word.split("").join(", "), { rate: .8 });
          setTimeout(() => { S.i++; S.tries = 0; nextWord(); }, canHear ? 1800 : 1000);
        } else {
          T.SFX.wrong(); st.wrong++; st.streak = 0; St.save();
          // show where it went wrong
          $("#slots").innerHTML = `<div class="slots">${word.split("").map((ch, i) => `<span class="slot filled ${typed[i] === ch ? "right" : "wrong"}">${esc(typed[i] || "·")}</span>`).join("")}</div>
            <div class="muted small" style="margin:6px 0 2px">It's spelled</div><div class="spell-out">${word.split("").map((ch) => `<span>${esc(ch)}</span>`).join("")}</div>`;
          if (test) {
            St.day().spell++; S.missed.push(word);
            $("#fb").innerHTML = `<div class="hint">Not this time. Next word!</div>`;
            setTimeout(() => { S.i++; S.tries = 0; nextWord(); }, 2200);
          } else {
            S.tries++;
            $("#fb").innerHTML = `<div class="hint">Look at it, then try again.</div>`;
            const b = document.createElement("button"); b.className = "btn primary wide"; b.style.marginTop = "8px"; b.textContent = "Try again ▶";
            b.addEventListener("click", () => { T.SFX.tap(); spell(word); });
            $("#fb").appendChild(b);
          }
        }
      });
    }
    function nextWord() { if (S.i >= total) return done(); const w = queue[S.i]; if (test) spell(w); else look(w); }
    function done() {
      const perfect = S.score === total;
      const stars = perfect ? 3 : S.score >= total * .8 ? 2 : S.score >= total * .6 ? 1 : 0;
      let bonus = 0;
      if (test) { bonus = perfect ? 30 : 0; sp.tests = sp.tests.concat([{ t: Date.now(), score: S.score, total, missed: S.missed, label: sp.label }]).slice(-12); }
      else if (perfect) bonus = 15;
      d.xp += bonus; S.xp += bonus; St.save();
      const missionsDone = checkMissions();
      if (stars >= 2) { T.SFX.fanfare(); confetti(perfect ? 160 : 90); } else T.SFX.star();
      render(`<div class="screen">
        <div class="topbar"><div class="title">${test ? "Test done!" : "Nice practice!"}</div></div>
        <div class="panel-frame">${A.panel({ bg: "school", cast: [{ who: "bolt", mood: perfect ? "excited" : "happy", pose: perfect ? "cheer" : "wave", x: 32 }, { who: "max", mood: "laugh", pose: "cheer", x: 70, flip: true }], props: [{ p: "trophy", x: 50, y: 30, s: perfect ? 56 : 0 }], fx: perfect ? "sparkle" : "none" })}</div>
        <div class="card yellow center">
          <div class="results-stars">${[0, 1, 2].map((i) => `<span class="${i < stars ? "" : "off"}">⭐</span>`).join("")}</div>
          <div class="display" style="font-size:2rem;margin-top:6px">${S.score} / ${total}</div>
          <div>${perfect ? "Every word! Bolt is speechless." : S.score >= total * .8 ? "So close to perfect. Keep going!" : "Good work. The tricky ones will come around again."}</div>
        </div>
        ${S.missed.length ? `<div class="card"><h2>Look again</h2><div class="chips">${S.missed.map((w) => `<button class="chip spellchip" data-w="${esc(w)}">${esc(w)}</button>`).join("")}</div></div>` : ""}
        <div class="card center"><div class="display" style="font-size:1.5rem">+${S.xp} XP</div>${missionsDone ? `<div style="color:var(--green)"><b>🎯 All missions done! +${MISSION_XP} XP</b></div>` : ""}</div>
        <div class="row"><button class="btn grow" id="again">${test ? "Practice" : "Again"}</button><button class="btn primary grow" id="home">Done</button></div>
      </div>`);
      $$(".spellchip").forEach((b) => b.addEventListener("click", () => T.sayWord(b.dataset.w)));
      $("#again").addEventListener("click", () => runSpell("practice"));
      $("#home").addEventListener("click", () => go("spelling"));
    }
    nextWord();
  }
  /* letters that look like they belong, so the tiles aren't a giveaway */
  function decoys(word, n) {
    const near = { a: "eo", b: "dp", c: "ks", d: "bt", e: "ai", f: "v", g: "j", i: "ey", k: "c", m: "n", n: "m", o: "au", p: "b", s: "cz", t: "d", u: "o", v: "f", y: "i" };
    const out = [];
    const pool = shuffle(word.split("").flatMap((ch) => (near[ch] || "").split("")).concat("aeiourstln".split("")));
    for (const ch of pool) { if (out.length >= n) break; if (!out.includes(ch)) out.push(ch); }
    return out;
  }

  /* =====================================================================
     WORD VAULT
     ===================================================================== */
  screens.vault = function () {
    const d = St.load();
    const defs = {};
    window.STORIES.forEach((s) => Object.assign(defs, s.vocab || {}));
    const vocab = Object.keys(d.vocab).sort();
    const tapped = Object.entries(d.tapped).sort((a, b) => b[1] - a[1]).slice(0, 60);
    render(`<div class="screen">
      ${topbar("Word Vault", "")}
      <div class="panel-frame">${A.panel({ bg: "room", cast: [{ who: "max", mood: "happy", pose: "hold", x: 35 }, { who: "bolt", mood: "love", x: 70, flip: true }], props: [{ e: "📚", x: 35, y: 58, s: 40 }, { e: "💎", x: 70, y: 40, s: 36 }] })}</div>
      <div class="card"><h2>Words you learned (${vocab.length})</h2><div class="muted small" style="margin-bottom:8px">Dotted words in the stories. Tap to hear the meaning again.</div>
        <div class="chips">${vocab.length ? vocab.map((w) => `<button class="chip vocab" data-w="${esc(w)}">${esc(w)}</button>`).join("") : `<span class="muted">Tap a dotted word in a story to collect it.</span>`}</div></div>
      <div class="card"><h2>Words you asked about (${Object.keys(d.tapped).length})</h2><div class="muted small" style="margin-bottom:8px">Words you tapped to hear. Practice them here!</div>
        <div class="chips">${tapped.length ? tapped.map(([w, n]) => `<button class="chip" data-w="${esc(w)}">${esc(w)}<small>×${n}</small></button>`).join("") : `<span class="muted">Tap any word in a story to hear it.</span>`}</div></div>
    </div>`);
    $$(".chip").forEach((b) => b.addEventListener("click", () => wordCard(b.dataset.w, defs[b.dataset.w])));
  };

  /* =====================================================================
     STICKERS
     ===================================================================== */
  screens.stickers = function () {
    const d = St.load();
    render(`<div class="screen">
      ${topbar("Sticker Book", `${d.stickers.length} / ${window.STORIES.length}`)}
      <div class="card"><div class="tiles" style="grid-template-columns:repeat(auto-fill,minmax(88px,1fr))">
        ${window.STORIES.slice().sort((a, b) => a.season - b.season || a.num - b.num).map((s) => { const got = d.stickers.includes(s.id); return `<div class="tile center" style="min-height:0;align-items:center;${got ? "" : "opacity:.35;filter:grayscale(1)"}"><div class="emoji" style="font-size:2.4rem">${got ? C.STICKERS[s.id] || "🏅" : "❔"}</div><div class="sub">${got ? esc(s.title) : "S" + s.season + " E" + s.num}</div></div>`; }).join("")}
      </div></div>
      <div class="muted small center">Finish a story to earn its sticker.</div>
    </div>`);
  };

  /* =====================================================================
     PARENTS
     ===================================================================== */
  let parentOK = false;
  screens.parent = function () {
    if (parentOK) return parentDash();
    const a = 6 + Math.floor(Math.random() * 4), b = 6 + Math.floor(Math.random() * 4);
    let entry = "";
    render(`<div class="screen">
      ${topbar("Parents only", "")}
      <div class="card center"><h2>Quick check</h2><div class="question">What is ${a} × ${b}?</div><div class="pin-display" id="pin">&nbsp;</div></div>
      <div class="numpad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, "⌫", 0, "OK"].map((k) => `<button class="btn ${k === "OK" ? "primary" : ""}" data-k="${k}">${k}</button>`).join("")}</div>
    </div>`);
    $$("[data-k]").forEach((btn) => btn.addEventListener("click", () => {
      const k = btn.dataset.k;
      if (k === "⌫") entry = entry.slice(0, -1);
      else if (k === "OK") { if (+entry === a * b) { parentOK = true; parentDash(); } else { T.SFX.wrong(); entry = ""; } }
      else if (entry.length < 3) entry += k;
      const p = $("#pin"); if (p) p.innerHTML = entry || "&nbsp;";
    }));
  };
  function parentDash() {
    const d = St.load();
    const all = window.STORIES.slice().sort((a, b) => a.season - b.season || a.num - b.num);
    const done = all.filter((s) => St.storyRec(s.id).done);
    const totWords = Object.values(d.days).reduce((n, x) => n + x.words, 0);
    const totSec = Object.values(d.days).reduce((n, x) => n + x.seconds, 0);
    const qR = done.reduce((n, s) => n + St.storyRec(s.id).quizRight, 0), qT = done.reduce((n, s) => n + St.storyRec(s.id).quizTotal, 0);
    const mR = done.reduce((n, s) => n + St.storyRec(s.id).mathFirst, 0), mT = done.reduce((n, s) => n + St.storyRec(s.id).mathTotal, 0);
    // WPM chart: every completed read in time order, with the season goal line
    const reads = [];
    done.forEach((s) => (St.storyRec(s.id).history || []).forEach((h) => reads.push({ t: h.t, wpm: h.wpm, helped: h.helped || 0, season: s.season, title: s.title })));
    reads.sort((a, b) => a.t - b.t);
    const last = reads.slice(-16);
    const maxW = Math.max(60, ...last.map((r) => r.wpm), ...last.map((r) => C.season(r.season).wpm)) * 1.15;
    const chart = last.length ? `<svg viewBox="0 0 ${Math.max(320, last.length * 34)} 160">
      ${last.map((r, i) => { const h = (r.wpm / maxW) * 130, g = (C.season(r.season).wpm / maxW) * 130, x = 10 + i * 34; return `<rect x="${x}" y="${140 - h}" width="24" height="${h}" fill="${r.wpm >= C.season(r.season).wpm ? "#3fb64f" : "#4d96ff"}" stroke="#1b1b1f" stroke-width="2" rx="3"/><line x1="${x - 3}" x2="${x + 27}" y1="${140 - g}" y2="${140 - g}" stroke="#1b1b1f" stroke-width="2" stroke-dasharray="3 2"/><text x="${x + 12}" y="${136 - h}" text-anchor="middle" font-size="10" font-weight="700">${r.wpm}</text><text x="${x + 12}" y="154" text-anchor="middle" font-size="9" fill="#6b6b75">S${r.season}</text>`; }).join("")}
    </svg><div class="muted small">Bars: words per minute per read (green = met the season goal). Dashed line: that season's goal.</div>` : `<div class="muted">No completed stories yet.</div>`;
    // 14-day activity
    const days = []; const t = new Date();
    for (let i = 13; i >= 0; i--) { const dd = new Date(t); dd.setDate(t.getDate() - i); const k = `${dd.getFullYear()}-${String(dd.getMonth() + 1).padStart(2, "0")}-${String(dd.getDate()).padStart(2, "0")}`; const r = d.days[k]; const w = r ? r.words + r.math * 10 : 0; days.push(`<i class="${w > 400 ? "l3" : w > 150 ? "l2" : w > 0 ? "l1" : ""}" title="${k}: ${r ? r.words + " words, " + r.math + " math" : "—"}"></i>`); }
    const topTapped = Object.entries(d.tapped).sort((a, b) => b[1] - a[1]).slice(0, 15);
    // level recommendation
    const cur = C.season(d.unlocked);
    const curDone = C.storiesFor(cur.n).filter((s) => St.storyRec(s.id).done);
    const curWpm = curDone.length ? Math.round(curDone.reduce((n, s) => n + St.storyRec(s.id).bestWpm, 0) / curDone.length) : 0;
    const curQuiz = curDone.length ? Math.round((curDone.reduce((n, s) => n + St.storyRec(s.id).quizRight, 0) / curDone.reduce((n, s) => n + St.storyRec(s.id).quizTotal, 0)) * 100) : 0;
    const rec = curDone.length === 0 ? `Start reading Season ${cur.n} to see a recommendation.` :
      (curWpm >= cur.wpm && curQuiz >= 80) ? `Ready to move up: averaging ${curWpm} wpm (goal ${cur.wpm}) with ${curQuiz}% quiz accuracy in Season ${cur.n}.` :
        curQuiz < 70 ? `Stay in Season ${cur.n} a while: quiz accuracy is ${curQuiz}%. Re-reading stories for 3 stars builds comprehension.` :
          `Building fluency in Season ${cur.n}: ${curWpm} wpm so far (goal ${cur.wpm}). Re-reads are the fastest way up.`;

    render(`<div class="screen">
      ${topbar("Parent dashboard", "")}
      <div class="card yellow"><h2>Recommendation</h2><div>${esc(rec)}</div></div>
      <div class="statgrid">
        <div class="stat"><b>${totWords.toLocaleString()}</b><span>words read</span></div>
        <div class="stat"><b>${Math.round(totSec / 60)}</b><span>minutes</span></div>
        <div class="stat"><b>${done.length}</b><span>stories</span></div>
        <div class="stat"><b>${qT ? Math.round((qR / qT) * 100) : 0}%</b><span>quiz</span></div>
        <div class="stat"><b>${mT ? Math.round((mR / mT) * 100) : 0}%</b><span>math 1st try</span></div>
        <div class="stat"><b>${St.streak()}</b><span>day streak</span></div>
      </div>
      <div class="card"><h2>Reading speed</h2><div class="chart" style="overflow-x:auto">${chart}</div>
        ${last.length ? `<div class="muted small" style="margin-top:6px">${(() => { const n = last.reduce((a, r) => a + r.helped, 0); return n ? `Tapped "Help me" (page read aloud) ${n} time${n === 1 ? "" : "s"} in the last ${last.length} read${last.length === 1 ? "" : "s"}.` : `Never used "Help me" (page read aloud) in the last ${last.length} read${last.length === 1 ? "" : "s"} — reading solo.`; })()}</div>` : ""}</div>
      <div class="card"><h2>Last 14 days</h2><div class="days">${days.join("")}</div></div>
      <div class="card"><h2>Words ${esc(d.name)} needed help with</h2><div class="chips">${topTapped.length ? topTapped.map(([w, n]) => `<span class="chip">${esc(w)}<small>×${n}</small></span>`).join("") : `<span class="muted">None tapped yet.</span>`}</div></div>
      <div class="card"><h2>Stories</h2><table class="table"><tr><th>Story</th><th>Stars</th><th>Best wpm</th><th>Quiz</th><th>Reads</th></tr>
        ${all.map((s) => { const r = St.storyRec(s.id); return `<tr><td>S${s.season} · ${esc(s.title)}</td><td>${r.done ? "⭐".repeat(r.stars) || "–" : "<span class='muted'>–</span>"}</td><td>${r.bestWpm || "–"}</td><td>${r.quizTotal ? Math.round((r.quizRight / r.quizTotal) * 100) + "%" : "–"}</td><td>${r.reads || "–"}</td></tr>`; }).join("")}
      </table></div>
      <div class="card"><h2>Math level</h2>
        ${(() => { const b = C.bandFor(d.mathLevel); const log = (d.mathLog || []).slice(-20); const acc = log.length ? Math.round((log.filter((x) => x.r === "right").length / log.length) * 100) : null; return `
        <div class="row" style="justify-content:space-between;margin-bottom:8px"><span class="level-pill"><b>LVL ${b.i + 1}</b> ${esc(b.name)}</span><span class="muted small">${acc == null ? "no bonus problems yet" : acc + "% first-try, last " + log.length}</span></div>
        ${ladderHtml(d.mathLevel)}
        <div class="muted small" style="margin:8px 0">Bonus parts and the Workshop pull from this level. Three first-try rights climb a level; a miss eases it half a level. Levels: ${C.BANDS.map((x, i) => (i + 1) + " " + x.name).join(" · ")}.</div>
        <div class="row"><button class="btn grow" id="easier">◀ Easier</button><button class="btn grow" id="harder">Harder ▶</button></div>
        <div class="toggle" style="margin-top:8px">Bonus math part after each story's math <div class="switch ${d.settings.bonus !== false ? "on" : ""}" data-s="bonus"></div></div>`; })()}
      </div>
      <div class="card"><h2>Spelling words</h2>
        <div class="muted small">This week's list from school, one word per line (commas work too). Add a hint after a colon and it shows during practice and gets read out in the test — <i>because: I stayed in because it rained.</i></div>
        <div class="field" style="margin-top:8px"><label>Week label (optional)</label><input type="text" id="spl-label" value="${esc(d.spelling.label || "")}" placeholder="Week of Sept 8" maxlength="24"></div>
        <div class="field" style="margin-top:8px"><label>Words</label><textarea id="spl" style="font-family:inherit;font-size:1rem;min-height:120px" placeholder="cat&#10;hat&#10;because: I stayed in because it rained.">${esc(d.spelling.list.map((w) => d.spelling.hints[w] ? w + ": " + d.spelling.hints[w] : w).join("\n"))}</textarea></div>
        <div class="row" style="margin-top:8px"><button class="btn primary grow" id="spl-save">Save list</button></div>
        ${d.spelling.list.length ? `<table class="ptable" style="margin-top:10px"><tr><th>Word</th><th>First try</th><th>In a row</th></tr>${d.spelling.list.map((w) => { const st = d.spelling.words[w] || { right: 0, wrong: 0, streak: 0 }; const t = st.right + st.wrong; return `<tr><td>${esc(w)}</td><td>${t ? Math.round((st.right / t) * 100) + "% of " + t : "—"}</td><td>${"●".repeat(Math.min(3, st.streak))}${"○".repeat(3 - Math.min(3, st.streak))}</td></tr>`; }).join("")}</table>` : ""}
        ${d.spelling.tests.length ? `<div class="muted small" style="margin-top:8px"><b>Tests:</b> ${d.spelling.tests.slice(-6).reverse().map((t) => `${new Date(t.t).toLocaleDateString(undefined, { month: "short", day: "numeric" })} ${t.score}/${t.total}${t.missed.length ? " (missed " + t.missed.join(", ") + ")" : ""}`).join(" · ")}</div>` : ""}
      </div>
      <div class="card"><h2>Settings</h2>
        <div class="field"><label>Reader's name</label><input type="text" id="pname" value="${esc(d.name)}" maxlength="16"></div>
        <div class="field" style="margin-top:10px"><label>Hero</label><select id="hero"><option value="boy" ${d.hero !== "girl" ? "selected" : ""}>Max (boy)</option><option value="girl" ${d.hero === "girl" ? "selected" : ""}>Maxie (girl)</option></select></div>
        <div class="field" style="margin-top:10px"><label>Hero's name (what the stories call the hero)</label><input type="text" id="heroname" value="${esc(d.heroName || "Max")}" maxlength="12"></div>
        <div class="field" style="margin-top:10px"><label>Look</label><select id="theme"><option value="classic" ${d.theme !== "pink" ? "selected" : ""}>Classic</option><option value="pink" ${d.theme === "pink" ? "selected" : ""}>Pink</option></select></div>
        <div class="field" style="margin-top:10px"><label>Starting point</label><select id="startseason"><option value="0" ${d.startSeason === 0 ? "selected" : ""}>First words (Pre-K, Season 0)</option><option value="1" ${d.startSeason !== 0 ? "selected" : ""}>Short sentences (Season 1)</option></select></div>
        <div class="field" style="margin-top:10px"><label>Seasons unlocked through</label><select id="unlock">${C.SEASONS.filter((s) => s.n >= 1).map((s) => `<option value="${s.n}" ${s.n === d.unlocked ? "selected" : ""}>Season ${s.n} — ${s.grade}</option>`).join("")}</select></div>
        <div class="toggle" style="margin-top:8px">Must get 2 of 3 quiz answers to finish a story <div class="switch ${d.settings.gate !== false ? "on" : ""}" data-s="gate"></div></div>
        <div class="toggle">Show the reading timer <div class="switch ${d.settings.timer ? "on" : ""}" data-s="timer"></div></div>
        <div class="toggle">Read-aloud voice (tap a word to hear it) <div class="switch ${d.settings.tts ? "on" : ""}" data-s="tts"></div></div>
        <div class="field" style="margin-top:10px"><label>"Help me" button that reads the whole page</label><select id="readhelp">
          <option value="wait" ${(d.settings.readHelp || "wait") === "wait" ? "selected" : ""}>Only after a fair try at reading it (recommended)</option>
          <option value="always" ${d.settings.readHelp === "always" ? "selected" : ""}>Always available</option>
          <option value="never" ${d.settings.readHelp === "never" ? "selected" : ""}>Never — words only</option></select>
          <div class="muted small" style="margin-top:4px">Pre-K stories always offer it. The dashboard counts how often it gets used.</div></div>
        <div class="toggle">Sound effects <div class="switch ${d.settings.sfx ? "on" : ""}" data-s="sfx"></div></div>
      </div>
      <div class="card"><h2>Move progress to another device</h2>
        <div class="muted small">Progress lives on this device only. Copy this code and paste it into the app on the other device.</div>
        <textarea id="exp" readonly>${esc(St.exportJSON())}</textarea>
        <div class="row" style="margin-top:8px"><button class="btn grow" id="copy">Copy code</button><button class="btn grow" id="doimport">Paste &amp; import</button></div>
        <textarea id="imp" placeholder="Paste a save code here, then tap Paste & import" style="margin-top:8px"></textarea>
      </div>
      <div class="card"><h2>Danger zone</h2><button class="btn red" id="reset">Delete this reader</button></div>
      <button class="btn primary wide" id="done">Done</button>
    </div>`);
    $("#pname").addEventListener("change", (e) => { d.name = e.target.value.trim() || d.name; St.save(); });
    $("#hero").addEventListener("change", (e) => { d.hero = e.target.value; if (!$("#heroname").value.trim() || ["Max", "Maxie"].includes($("#heroname").value.trim())) { d.heroName = d.hero === "girl" ? "Maxie" : "Max"; $("#heroname").value = d.heroName; } St.save(); applyProfile(); });
    $("#heroname").addEventListener("change", (e) => { d.heroName = e.target.value.trim() || (d.hero === "girl" ? "Maxie" : "Max"); St.save(); applyProfile(); });
    $("#theme").addEventListener("change", (e) => { d.theme = e.target.value; St.save(); applyProfile(); });
    $("#startseason").addEventListener("change", (e) => { d.startSeason = +e.target.value; St.save(); });
    $("#unlock").addEventListener("change", (e) => { d.unlocked = +e.target.value; St.save(); });
    $("#readhelp").addEventListener("change", (e) => { d.settings.readHelp = e.target.value; St.save(); });
    $("#spl-save").addEventListener("click", () => {
      const hints = {}, list = [];
      $("#spl").value.split(/[\n,]+/).forEach((line) => {
        const m = line.trim().match(/^([^:]+?)\s*(?::\s*(.+))?$/); if (!m) return;
        const w = m[1].toLowerCase().replace(/[^a-z'\-]/g, ""); if (!w || list.includes(w)) return;
        list.push(w); if (m[2]) hints[w] = m[2].trim();
      });
      d.spelling.list = list; d.spelling.hints = hints; d.spelling.label = $("#spl-label").value.trim();
      St.save(); T.SFX.right(); parentDash(); window.scrollTo(0, 0);
    });
    $("#easier").addEventListener("click", () => { d.mathLevel = Math.max(0, Math.floor(d.mathLevel) - 1); St.save(); parentDash(); });
    $("#harder").addEventListener("click", () => { d.mathLevel = Math.min(C.BANDS.length - .01, Math.floor(d.mathLevel) + 1); St.save(); parentDash(); });
    $$(".switch").forEach((sw) => sw.addEventListener("click", () => { d.settings[sw.dataset.s] = !d.settings[sw.dataset.s]; sw.classList.toggle("on", d.settings[sw.dataset.s]); St.save(); }));
    $("#copy").addEventListener("click", async () => { const ta = $("#exp"); ta.select(); try { await navigator.clipboard.writeText(ta.value); $("#copy").textContent = "Copied!"; } catch (e) { document.execCommand("copy"); $("#copy").textContent = "Copied!"; } });
    $("#doimport").addEventListener("click", () => { try { St.importJSON($("#imp").value.trim()); parentOK = true; go("parent", {}, true); } catch (e) { modal(`<h2>Couldn't import</h2><div class="def">${esc(e.message)}</div><button class="btn primary" data-close>OK</button>`); } });
    $("#reset").addEventListener("click", () => { modal(`<h2>Delete ${esc(d.name)}?</h2><div class="def">All of this reader's stars, XP, and words. Other readers on this device are not affected. This cannot be undone.</div><div class="row"><button class="btn grow" data-close>Keep it</button><button class="btn red grow" id="yes">Erase</button></div>`).el.querySelector("#yes").addEventListener("click", () => { St.reset(); parentOK = false; go("welcome", {}, true); }); });
    $("#done").addEventListener("click", () => go("home"));
  }

  /* ---------- boot ---------- */
  applyProfile();
  go(St.hasProfiles() ? "home" : "welcome", {}, true);
  window.MB = { go, screens };
})();
