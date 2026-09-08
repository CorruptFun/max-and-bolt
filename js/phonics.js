/* Max & Bolt — sound-it-out. Splits a word into chunks a kid can say one at a time, then blend:
   one-syllable words → onset + rime (b-ox, st-op, sh-ip, m-ake); longer words → syllables (rob-ot, bas-ket);
   common endings peel off first (jump-ed, look-s, run-ning, like-d). Sight words don't split — you just know them.
   Each chunk is { t: what to show, say: what the voice says, kind: onset|rime|syl|suffix|sight }. */
(function () {
  const VOW = "aeiou";
  const isV = (w, i) => i >= 0 && i < w.length && (VOW.includes(w[i]) || (w[i] === "y" && i > 0));
  const isVL = (c) => VOW.includes(c);
  const DIGRAPH = ["sh", "ch", "th", "wh", "ph", "ck", "ng", "qu"];
  const ONSET2 = ["bl", "br", "cl", "cr", "dr", "fl", "fr", "gl", "gr", "pl", "pr", "sc", "sk", "sl", "sm", "sn", "sp", "st", "sw", "tr", "tw", "wr", "kn", "gn", "sh", "ch", "th", "wh", "ph", "qu"];
  const ONSET3 = ["str", "spr", "scr", "spl", "thr", "shr", "squ", "chr"];
  /* how the voice says a consonant chunk on its own (a TTS voice would spell "b" as "bee") */
  const SAY = {
    b: "buh", c: "kuh", d: "duh", f: "fff", g: "guh", h: "huh", j: "juh", k: "kuh", l: "lll", m: "mmm", n: "nnn", p: "puh", r: "rrr", s: "sss", t: "tuh", v: "vvv", w: "wuh", x: "ks", y: "yuh", z: "zzz",
    sh: "shh", ch: "chuh", th: "thuh", wh: "wuh", ph: "fff", qu: "kwuh", kn: "nnn", wr: "rrr", gn: "nnn", ck: "kuh", ng: "ng",
    bl: "bluh", br: "bruh", cl: "cluh", cr: "cruh", dr: "druh", fl: "fluh", fr: "fruh", gl: "gluh", gr: "gruh", pl: "pluh", pr: "pruh", sc: "skuh", sk: "skuh", sl: "sluh", sm: "smuh", sn: "snuh", sp: "spuh", st: "stuh", sw: "swuh", tr: "truh", tw: "twuh",
    str: "struh", spr: "spruh", scr: "scruh", spl: "spluh", thr: "thruh", shr: "shruh", squ: "skwuh", chr: "kruh",
    ed: "ed", ing: "ing", er: "er", est: "est", ly: "lee", s: "sss", es: "ez", d: "duh", r: "rrr", ful: "full", ness: "ness", less: "less", ment: "ment", tion: "shun", sion: "zhun",
  };
  /* words kids are taught to recognize whole — no chunks, just say it */
  const SIGHT = new Set(("the a an of to was were said are you your they there their what who one two does do is his has have come some love give live once where here been put could would should want again any many very only into from because through though thought laugh eye eyes people friend friends busy pretty sure".split(" ")));
  /* hand-tuned splits: "text/say text/say" — when the rules would get a common word wrong */
  const OVERRIDES = {
    zoe: "zo/zo e/ee", seven: "sev en", river: "riv er", lemon: "lem on", robin: "rob in", cabin: "cab in", planet: "plan et", wagon: "wag on", magic: "mag ic",
    comet: "com et", visit: "vis it", habit: "hab it", camel: "cam el", salad: "sal ad", second: "sec ond", finish: "fin ish", body: "bod y/ee", very: "ver y/ee",
    water: "wa/wah ter", ever: "ev er", never: "nev er", even: "e/ee ven", open: "o/oh pen", over: "o/oh ver", tiny: "ti/tie ny/nee", idea: "i/eye de/dee a/uh", pizza: "piz za/zuh",
    whiskers: "whisk ers", dullsworth: "dull sworth", raccoon: "rac coon", toaster: "toast er", battery: "bat ter y/ee", mister: "mis ter", doctor: "doc tor",
    engine: "en gine/jin", rocket: "rock et", pocket: "pock et", bucket: "buck et", jacket: "jack et", basket: "bas ket", little: "lit tle", middle: "mid dle",
    money: "mon ey/ee", monkey: "mon key/kee", honey: "hon ey/ee", city: "cit y/ee", happy: "hap py/pee", funny: "fun ny/nee", puppy: "pup py/pee", family: "fam i/ih ly/lee",
    another: "an oth er", mother: "moth er", father: "fath er", brother: "broth er", sister: "sis ter", other: "oth er", together: "to/tuh geth er",
    about: "a/uh bout", away: "a/uh way", again: "a/uh gain/gen", around: "a/uh round", along: "a/uh long", ago: "a/uh go", today: "to/tuh day", tomorrow: "to/tuh mor row/roh",
  };

  function vowelGroups(w) {
    const g = []; let i = 0;
    while (i < w.length) {
      if (isV(w, i)) { let j = i; while (j < w.length && isV(w, j)) j++; g.push([i, j]); i = j; } else i++;
    }
    // magic e: a final e after a consonant, with an earlier vowel, is silent
    if (g.length > 1 && w[w.length - 1] === "e" && !isV(w, w.length - 2)) { const last = g[g.length - 1]; if (last[0] === w.length - 1) g.pop(); }
    return g;
  }
  const isOnset = (s) => (s.length === 1 && !isVL(s)) || ONSET2.includes(s) || ONSET3.includes(s);

  /* split a stem (no suffix) into syllables */
  function syllables(w) {
    const g = vowelGroups(w);
    if (g.length <= 1) return [w];
    const out = []; let start = 0;
    for (let k = 0; k < g.length - 1; k++) {
      const cs = g[k][1], ce = g[k + 1][0];     // consonants between the two vowel groups: w[cs..ce)
      const c = w.slice(cs, ce);
      let cut;
      if (c.length === 0) cut = cs;
      else if (c.length === 1) cut = (c === "x") ? cs + 1 : cs;                          // ro-bot, ex-it
      else if (c.length === 2) cut = (c === "ck" || c === "ng") ? cs + 2 : DIGRAPH.includes(c) ? cs : cs + 1;   // rock-et, ra-ther, bas-ket
      else cut = isOnset(c.slice(-2)) ? ce - 2 : ce - 1;                                  // mon-ster, pump-kin
      out.push(w.slice(start, cut)); start = cut;
    }
    out.push(w.slice(start));
    return out.filter(Boolean);
  }

  /* peel a common ending off: returns [stem, suffixChunk] or null */
  function peel(w) {
    const g = vowelGroups(w);
    if (g.length < 2 && !/(s|es|ed)$/.test(w)) return null;
    const stemOf = (s) => w.slice(0, -s.length);
    const hasV = (s) => vowelGroups(s).length > 0;
    // -es after x, s, sh, ch, z (boxes, wishes, buses)
    if (w.length >= 5 && w.endsWith("es") && /(x|s|sh|ch|z)$/.test(stemOf("es")) && hasV(stemOf("es"))) return [stemOf("es"), { t: "es", say: "ez", kind: "suffix" }];
    // -s (looks, makes) — never after a vowel unless it's magic-e
    if (w.length >= 4 && w.endsWith("s") && !w.endsWith("ss")) {
      const st = stemOf("s"), last = st[st.length - 1], prev = st[st.length - 2];
      const magic = last === "e" && !isVL(prev) && st.length >= 3 && isVL(st[st.length - 3]);
      if (hasV(st) && (!isVL(last) || magic || last === "y")) return [st, { t: "s", say: "sss", kind: "suffix" }];
    }
    for (const s of ["ing", "ed", "est", "er", "ly", "ful", "ness", "less", "ment", "tion", "sion"]) {
      if (!w.endsWith(s)) continue;
      let st = stemOf(s);
      if (st.length < (s === "ing" ? 2 : 3) || !hasV(st)) continue;
      const last = st[st.length - 1], prev = st[st.length - 2], prev2 = st[st.length - 3];
      if ((s === "ed" || s === "er" || s === "est") && isVL(last) && last !== "y") continue;   // spe-ed, ne-ed: no (play-ed: yes)
      if (s === "ly" && isVL(last)) continue;
      // doubled consonant: run-ning, big-ger, hop-ped
      if (!isVL(last) && last === prev && st.length >= 3) return [st.slice(0, -1), { t: last + s, say: last + s, kind: "suffix" }];
      // magic-e stem: lik-ed → like-d, bak-er → bake-r, nic-est → nice-st
      if ((s === "ed" || s === "er" || s === "est") && vowelGroups(st).length === 1 && !isVL(last) && isVL(prev) && prev2 != null && !isVL(prev2) && "bcdfgklmnprstvz".includes(last))
        return [st + "e", { t: s.slice(1), say: SAY[s.slice(1)] || s.slice(1), kind: "suffix" }];
      return [st, { t: s, say: SAY[s] || s, kind: "suffix" }];
    }
    return null;
  }

  function onsetRime(w) {
    let i = 0;
    while (i < w.length && !isV(w, i)) i++;
    if (i === 1 && w[0] === "q" && w[1] === "u") i = 2;   // qu is one sound (kw)
    if (i === 0 || i >= w.length) return [{ t: w, say: w, kind: "rime" }];
    const on = w.slice(0, i), rime = w.slice(i);
    if (rime.length < 1) return [{ t: w, say: w, kind: "rime" }];
    return [{ t: on, say: SAY[on] || on.split("").map((c) => SAY[c] || c).join(" "), kind: "onset" }, { t: rime, say: rime, kind: "rime" }];
  }

  /* chunks("basket") → [{t:"bas"},{t:"ket"}] · chunks("box") → [{t:"b",say:"buh"},{t:"ox"}] · chunks("the") → [{t:"the",kind:"sight"}] · null if not a plain word */
  function chunks(word) {
    const w = String(word || "").toLowerCase();
    if (!/^[a-z]+$/.test(w) || w.length < 2) return null;
    if (SIGHT.has(w)) return [{ t: w, say: w, kind: "sight" }];
    if (OVERRIDES[w]) return OVERRIDES[w].split(" ").map((p) => { const [t, say] = p.split("/"); return { t, say: say || t, kind: "syl" }; });
    if (vowelGroups(w).length === 0) return [{ t: w, say: w, kind: "sight" }];
    const tail = [];
    let stem = w;
    // consonant + le: lit-tle, ta-ble
    if (/[^aeiou]le$/.test(stem) && stem.length > 3 && vowelGroups(stem.slice(0, -3)).length) { tail.unshift({ t: stem.slice(-3), say: stem.slice(-3), kind: "syl" }); stem = stem.slice(0, -3); }
    else { const p = peel(stem); if (p) { stem = p[0]; tail.unshift(p[1]); } }
    let parts;
    const syl = syllables(stem);
    if (syl.length === 1 && stem.length <= 6) parts = onsetRime(stem); else parts = syl.map((s) => ({ t: s, say: s, kind: "syl" }));
    const all = parts.concat(tail);
    if (all.length === 1) return [{ t: w, say: w, kind: all[0].kind === "onset" ? "syl" : all[0].kind }];
    return all;
  }

  window.Phonics = { chunks, syllables, isSight: (w) => SIGHT.has(String(w).toLowerCase()) };
})();
