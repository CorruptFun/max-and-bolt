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
      <div class="tiles">
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
  let R = null, timerInt = null;
  function readerLeave() { if (R && R.pageStart) { R.seconds += (Date.now() - R.pageStart) / 1000; R.pageStart = 0; } clearInterval(timerInt); timerInt = null; T.stop(); }
  function fmtTime(s) { s = Math.round(s); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }

  screens.reader = function ({ id, page }) {
    const story = C.story(id);
    if (!story) return go("home", {}, true);
    const season = C.season(story.season);
    R = { story, season, idx: page || 0, seconds: 0, pageStart: 0, words: 0, tapped: 0, mathFirst: 0, mathTotal: 0, quizFirst: 0, quizAnswers: [] };
    document.documentElement.style.setProperty("--read-size", story.season === 0 ? "1.8rem" : story.season <= 2 ? "1.45rem" : story.season <= 4 ? "1.25rem" : "1.12rem");
    renderPage();
  };

  function wordsHtml(text, story) {
    text = H(text);
    const vocab = story.vocab || {};
    return text.split(/(\s+)/).map((tok) => {
      if (!tok.trim()) return tok;
      const cw = cleanWord(tok);
      const isV = cw && vocab[cw];
      return `<span class="word ${isV ? "vocab" : ""}" data-w="${esc(cw)}">${esc(tok)}</span>`;
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
      <div class="reader-controls">
        <button class="btn big" id="read" title="Read to me" ${T.available ? "" : "disabled"}>🔊</button>
        <button class="btn big primary" id="next" ${isMath ? "disabled" : ""}>${idx === total - 1 ? "FINISH ▶" : "NEXT ▶"}</button>
      </div>
    </div>`);
    T.SFX.page();
    const textEl = $("#text");
    bindWords(textEl, story);
    $("#exit").addEventListener("click", () => { T.SFX.tap(); go("season", { n: story.season }); });
    $("#read").addEventListener("click", (e) => readAloud(isMath ? textEl : textEl, e.currentTarget));
    $("#next").addEventListener("click", () => { T.SFX.tap(); readerLeave(); R.idx++; renderPage(); });

    // timing: count words + run the clock only on reading pages (math pages are thinking time, not reading speed)
    if (!isMath) {
      R.words += p.lines.reduce((n, l) => n + C.wordCount(l.n || l.t || ""), 0);
      R.pageStart = Date.now();
      const tEl = $("#timer");
      timerInt = setInterval(() => { if (R && tEl) tEl.textContent = "⏱ " + fmtTime(R.seconds + (R.pageStart ? (Date.now() - R.pageStart) / 1000 : 0)); }, 500);
    } else {
      $("#timer").textContent = "⏱ " + fmtTime(R.seconds);
      let tries = 0; R.mathTotal++;
      $$(".choice").forEach((b) => b.addEventListener("click", () => {
        const ok = b.dataset.c === String(p.math.answer);
        tries++;
        if (ok) {
          T.SFX.right(); b.classList.add("right");
          $$(".choice").forEach((x) => x.disabled = true);
          if (tries === 1) R.mathFirst++;
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
      <div class="reader-controls"><button class="btn big" id="read" ${T.available ? "" : "disabled"}>🔊</button><button class="btn big primary" id="next" disabled>NEXT ▶</button></div>
    </div>`);
    bindWords($("#qtext"), story);
    $("#read").addEventListener("click", (e) => { const b = e.currentTarget; b.disabled = true; T.speak(H(q.q) + ". " + q.c.map((c, i) => `${["A", "B", "C", "D"][i]}: ${H(c)}`).join(". "), { onEnd: () => b.disabled = false }); });
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
    let xp = R.words + stars * 25 + R.mathFirst * 15 + (fast ? 20 : 0) + (first ? 50 : 0);
    if (rec.reads > 0) xp = Math.round(xp * .6);   // re-reads still pay, just less
    rec.reads++; rec.done = true; rec.stars = Math.max(rec.stars, stars); rec.lastWpm = wpm; rec.bestWpm = Math.max(rec.bestWpm, wpm);
    rec.quizRight += R.quizFirst; rec.quizTotal += story.quiz.length; rec.mathFirst += R.mathFirst; rec.mathTotal += R.mathTotal; rec.lastAt = Date.now();
    rec.history = (rec.history || []).concat([{ t: Date.now(), wpm, stars, tapped: R.tapped }]).slice(-20);
    d.xp += xp;
    const day = St.day(); day.words += R.words; day.seconds += Math.round(R.seconds); day.stories++;
    const newSticker = !d.stickers.includes(story.id); if (newSticker) d.stickers.push(story.id);
    let unlocked = false;
    if (C.storiesFor(story.season).every((s) => St.storyRec(s.id).done) && d.unlocked === story.season && story.season < C.MAX_SEASON) { d.unlocked = story.season + 1; unlocked = true; }
    St.save();
    const rank = C.rankFor(d.xp);
    const next = nextStory();
    const gaugeMax = season.wpm * 1.6, pos = Math.min(98, (wpm / gaugeMax) * 100), tgt = (season.wpm / gaugeMax) * 100;
    const msg = stars === 3 ? "Perfect quiz! You really read that." : stars === 2 ? "Great reading! One more star next time." : stars === 1 ? "Nice job finishing! Read it again for more stars." : "You finished! Try it again and watch for the details.";
    render(`<div class="screen">
      <div class="topbar"><div class="title">${esc(story.title)}</div></div>
      <div class="card yellow center">
        <div class="results-stars">${[0, 1, 2].map((i) => `<span class="${i < stars ? "" : "off"}">⭐</span>`).join("")}</div>
        <div class="display" style="font-size:1.4rem;margin-top:6px">${esc(msg)}</div>
      </div>
      <div class="card">
        <div class="row"><b>Reading speed</b><span class="grow"></span><span class="muted small">goal ${season.wpm} wpm</span></div>
        <div class="gauge"><div class="fill" id="gfill"></div><div class="target" style="left:${tgt}%"></div><div class="rocket" id="grocket">🚀</div></div>
        <div class="center display" style="font-size:1.6rem;margin-top:14px">${wpm} words per minute ${fast ? "🔥" : ""}</div>
        ${rec.bestWpm > wpm ? `<div class="center muted small">Your best is ${rec.bestWpm}</div>` : rec.reads > 1 ? `<div class="center muted small">New personal best!</div>` : ""}
      </div>
      <div class="statgrid">
        <div class="stat"><b>${R.words}</b><span>words</span></div>
        <div class="stat"><b>${fmtTime(R.seconds)}</b><span>time</span></div>
        <div class="stat"><b>${R.mathFirst}/${R.mathTotal}</b><span>math</span></div>
      </div>
      <div class="card center"><div class="display" style="font-size:1.5rem">+${xp} XP</div><div class="muted small">${rank.icon} ${rank.name}${rank.next ? ` · ${rank.next - d.xp} XP to ${rank.nextName}` : ""}</div>
        ${newSticker ? `<div class="sticker-pop">${C.STICKERS[story.id] || "🏅"}</div><div class="small"><b>New sticker!</b></div>` : ""}
        ${unlocked ? `<div class="display" style="font-size:1.3rem;margin-top:8px;color:var(--blue)">🔓 Season ${story.season + 1} unlocked!</div>` : ""}
      </div>
      <div class="row">
        <button class="btn grow" id="again">Read again</button>
        ${next ? `<button class="btn primary grow" id="nextstory">Next story ▶</button>` : `<button class="btn primary grow" id="homebtn">Home</button>`}
      </div>
      <button class="btn ghost small muted" id="home2">Back to seasons</button>
    </div>`);
    R = null;
    setTimeout(() => { $("#gfill").style.width = pos + "%"; $("#grocket").style.left = pos + "%"; }, 50);
    if (stars >= 2) { T.SFX.fanfare(); confetti(stars === 3 ? 160 : 90); } else T.SFX.star();
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
      if (isBest) { T.SFX.fanfare(); confetti(100); } else T.SFX.star();
      const b0 = C.bandFor(startLevel), b1 = C.bandFor(d.mathLevel);
      const moved = adaptive && b1.i !== b0.i ? (b1.i > b0.i ? `🚀 Moved up to Level ${b1.i + 1}: ${b1.name}` : `Eased back to Level ${b1.i + 1}: ${b1.name}. Next time!`) : "";
      render(`<div class="screen">
        <div class="topbar"><div class="title">Time's up!</div></div>
        <div class="panel-frame">${A.panel({ bg: "garage", cast: [{ who: "bolt", mood: score >= 10 ? "excited" : "happy", pose: score >= 10 ? "cheer" : "wave", x: 40 }, { who: "max", mood: "happy", pose: "point", x: 75, flip: true }], fx: isBest ? "sparkle" : "none" })}</div>
        <div class="card yellow center"><div class="display" style="font-size:2.6rem">${score} solved</div><div>${isBest ? "🏆 New best score!" : "Best: " + best}</div><div class="muted small">+${xp} XP</div>${moved ? `<div style="margin-top:8px"><b>${esc(moved)}</b></div>` : ""}</div>
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
    done.forEach((s) => (St.storyRec(s.id).history || []).forEach((h) => reads.push({ t: h.t, wpm: h.wpm, season: s.season, title: s.title })));
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
      <div class="card"><h2>Reading speed</h2><div class="chart" style="overflow-x:auto">${chart}</div></div>
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
      <div class="card"><h2>Settings</h2>
        <div class="field"><label>Reader's name</label><input type="text" id="pname" value="${esc(d.name)}" maxlength="16"></div>
        <div class="field" style="margin-top:10px"><label>Hero</label><select id="hero"><option value="boy" ${d.hero !== "girl" ? "selected" : ""}>Max (boy)</option><option value="girl" ${d.hero === "girl" ? "selected" : ""}>Maxie (girl)</option></select></div>
        <div class="field" style="margin-top:10px"><label>Hero's name (what the stories call the hero)</label><input type="text" id="heroname" value="${esc(d.heroName || "Max")}" maxlength="12"></div>
        <div class="field" style="margin-top:10px"><label>Look</label><select id="theme"><option value="classic" ${d.theme !== "pink" ? "selected" : ""}>Classic</option><option value="pink" ${d.theme === "pink" ? "selected" : ""}>Pink</option></select></div>
        <div class="field" style="margin-top:10px"><label>Starting point</label><select id="startseason"><option value="0" ${d.startSeason === 0 ? "selected" : ""}>First words (Pre-K, Season 0)</option><option value="1" ${d.startSeason !== 0 ? "selected" : ""}>Short sentences (Season 1)</option></select></div>
        <div class="field" style="margin-top:10px"><label>Seasons unlocked through</label><select id="unlock">${C.SEASONS.filter((s) => s.n >= 1).map((s) => `<option value="${s.n}" ${s.n === d.unlocked ? "selected" : ""}>Season ${s.n} — ${s.grade}</option>`).join("")}</select></div>
        <div class="toggle" style="margin-top:8px">Show the reading timer <div class="switch ${d.settings.timer ? "on" : ""}" data-s="timer"></div></div>
        <div class="toggle">Read-aloud voice <div class="switch ${d.settings.tts ? "on" : ""}" data-s="tts"></div></div>
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
