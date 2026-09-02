/* Max & Bolt — speech (Web Speech API) + tiny synthesized sound effects. No audio files ship. */
(function () {
  const synth = window.speechSynthesis;
  let voice = null, voicesReady = false;

  function pickVoice() {
    if (!synth) return;
    const vs = synth.getVoices();
    if (!vs.length) return;
    voicesReady = true;
    const prefer = ["Samantha", "Google US English", "Microsoft Aria", "Microsoft Jenny", "Karen", "Daniel", "Alex"];
    voice = prefer.map((n) => vs.find((v) => v.name.indexOf(n) === 0 && /^en/i.test(v.lang))).find(Boolean)
      || vs.find((v) => /^en[-_]US/i.test(v.lang)) || vs.find((v) => /^en/i.test(v.lang)) || vs[0];
  }
  if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }

  function stop() { if (synth) synth.cancel(); }

  /* speak(text, {rate, onWord(charIndex), onEnd}) */
  function speak(text, opts) {
    opts = opts || {};
    if (!synth || !window.Store.load().settings.tts) { if (opts.onEnd) opts.onEnd(); return null; }
    stop();
    if (!voicesReady) pickVoice();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = (voice && voice.lang) || "en-US";
    u.rate = opts.rate || 0.9;
    u.pitch = opts.pitch || 1.05;
    if (opts.onWord) u.onboundary = (e) => { if (e.name === "word" || e.charLength || e.charIndex != null) opts.onWord(e.charIndex); };
    u.onend = () => { if (opts.onEnd) opts.onEnd(); };
    u.onerror = () => { if (opts.onEnd) opts.onEnd(); };
    // Chrome bug: long utterances can stall; a resume() nudge keeps it going.
    const tick = setInterval(() => { if (!synth.speaking) clearInterval(tick); else synth.resume(); }, 5000);
    synth.speak(u);
    return u;
  }
  function sayWord(w) { speak(w, { rate: 0.75 }); }

  /* ---- sfx ---- */
  let ctx = null;
  function ac() { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { } } return ctx; }
  function tone(f, t, dur, type, gain) {
    const c = ac(); if (!c || !window.Store.load().settings.sfx) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(f, c.currentTime + t);
    g.gain.setValueAtTime(0, c.currentTime + t);
    g.gain.linearRampToValueAtTime(gain || .15, c.currentTime + t + .01);
    g.gain.exponentialRampToValueAtTime(.0001, c.currentTime + t + dur);
    o.connect(g).connect(c.destination);
    o.start(c.currentTime + t); o.stop(c.currentTime + t + dur + .05);
  }
  const SFX = {
    tap: () => tone(600, 0, .08, "triangle", .08),
    right: () => { tone(523, 0, .12, "triangle"); tone(659, .1, .12, "triangle"); tone(784, .2, .25, "triangle"); },
    wrong: () => { tone(200, 0, .18, "sawtooth", .08); tone(160, .15, .25, "sawtooth", .08); },
    page: () => tone(880, 0, .06, "sine", .05),
    star: () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .09, .3, "triangle", .12)); },
    fanfare: () => { [392, 523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * .11, .35, "square", .07)); },
    tick: () => tone(1200, 0, .03, "square", .03),
  };
  function unlock() { const c = ac(); if (c && c.state === "suspended") c.resume(); }

  window.TTS = { speak, sayWord, stop, SFX, unlock, available: !!synth };
})();
