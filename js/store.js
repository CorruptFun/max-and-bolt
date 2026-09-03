/* Max & Bolt — save data. v2: several reader profiles on one device (two kids share Dad's phone).
   localStorage "maxbolt.v2" = { active, profiles: { id: profile } }. Store.load() returns the ACTIVE profile,
   so the rest of the app reads/writes one profile at a time. A v1 save is migrated into the first profile. */
(function () {
  const KEY = "maxbolt.v2", OLD = "maxbolt.save.v1";
  const freshProfile = (o) => Object.assign({
    id: "p" + Math.random().toString(36).slice(2, 8), v: 2,
    name: "", hero: "boy", heroName: "Max", theme: "classic", startSeason: 1,
    xp: 0, unlocked: 1, mathLevel: 1, mathLog: [],
    stories: {}, tapped: {}, vocab: {}, days: {}, stickers: [], workshop: {},
    spelling: { label: "", list: [], hints: {}, words: {}, tests: [] },
    settings: { timer: true, tts: true, sfx: true, bonus: true, readHelp: "wait", gate: true },
    createdAt: Date.now(),
  }, o || {});
  let root = null, temp = null;

  function loadRoot() {
    if (root) return root;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) root = JSON.parse(raw);
    } catch (e) { root = null; }
    if (!root || typeof root !== "object" || !root.profiles) root = { active: null, profiles: {} };
    // migrate a v1 single-reader save into a profile
    try {
      const old = localStorage.getItem(OLD);
      if (old && !Object.keys(root.profiles).length) {
        const o = JSON.parse(old);
        const p = freshProfile(o); p.id = "p" + Math.random().toString(36).slice(2, 8); p.v = 2;
        p.settings = Object.assign(freshProfile().settings, o.settings || {});
        p.mathLevel = { 1: 1, 2: 3, 3: 5, 4: 7, 5: 9, 6: 11, 7: 13 }[o.unlocked] || 1;
        if (p.name) { root.profiles[p.id] = p; root.active = p.id; }
        localStorage.removeItem(OLD);
        saveRoot();
      }
    } catch (e) { }
    Object.values(root.profiles).forEach((p) => { p.settings = Object.assign(freshProfile().settings, p.settings || {}); if (p.mathLevel == null) p.mathLevel = 1; if (!p.mathLog) p.mathLog = []; p.spelling = Object.assign(freshProfile().spelling, p.spelling || {}); });
    return root;
  }
  function saveRoot() { try { localStorage.setItem(KEY, JSON.stringify(loadRoot())); } catch (e) { } }

  function load() {
    const r = loadRoot();
    if (r.active && r.profiles[r.active]) return r.profiles[r.active];
    const ids = Object.keys(r.profiles);
    if (ids.length) { r.active = ids[0]; return r.profiles[ids[0]]; }
    if (!temp) temp = freshProfile();   // nobody yet — an in-memory profile so screens can render
    return temp;
  }
  function save() { saveRoot(); }
  const hasProfiles = () => Object.keys(loadRoot().profiles).length > 0;
  const profiles = () => Object.values(loadRoot().profiles).sort((a, b) => a.createdAt - b.createdAt);
  const activeId = () => loadRoot().active;
  function addProfile(o) {
    const r = loadRoot();
    const p = freshProfile(o);
    if (!p.heroName) p.heroName = p.hero === "girl" ? "Maxie" : "Max";
    p.mathLevel = p.startSeason === 0 ? 0 : 1;
    r.profiles[p.id] = p; r.active = p.id; temp = null; saveRoot();
    return p;
  }
  function switchTo(id) { const r = loadRoot(); if (r.profiles[id]) { r.active = id; saveRoot(); } }
  function deleteProfile(id) { const r = loadRoot(); delete r.profiles[id]; if (r.active === id) r.active = Object.keys(r.profiles)[0] || null; saveRoot(); }

  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  function day(key) {
    const d = load();
    const k = key || today();
    d.days[k] = d.days[k] || { words: 0, seconds: 0, stories: 0, math: 0 };
    const r = d.days[k]; if (r.pass == null) r.pass = 0; if (r.spell == null) r.spell = 0;
    return r;
  }
  function storyRec(id) {
    const d = load();
    d.stories[id] = d.stories[id] || { reads: 0, done: false, stars: 0, bestWpm: 0, lastWpm: 0, quizRight: 0, quizTotal: 0, mathFirst: 0, mathTotal: 0, lastAt: 0 };
    return d.stories[id];
  }
  function streak() {
    const d = load();
    let n = 0;
    const t = new Date();
    for (let i = 0; i < 365; i++) {
      const k = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
      const rec = d.days[k];
      if (rec && (rec.words > 0 || rec.math > 0 || rec.spell > 0)) n++;
      else if (i > 0) break;
      t.setDate(t.getDate() - 1);
    }
    return n;
  }
  function exportJSON() { return JSON.stringify(load()); }
  function importJSON(text) {
    const obj = JSON.parse(text);
    if (!obj || typeof obj !== "object" || !("stories" in obj)) throw new Error("Not a Max & Bolt save.");
    const r = loadRoot();
    const cur = load();
    const p = freshProfile(obj); p.id = cur.id || p.id; p.createdAt = cur.createdAt || p.createdAt;
    p.settings = Object.assign(freshProfile().settings, obj.settings || {});
    r.profiles[p.id] = p; r.active = p.id; temp = null; saveRoot();
  }
  function reset() { const r = loadRoot(); const id = r.active; if (id) deleteProfile(id); }

  window.Store = { load, save, day, today, storyRec, streak, exportJSON, importJSON, reset,
    hasProfiles, profiles, activeId, addProfile, switchTo, deleteProfile };
})();
