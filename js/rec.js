/* Max & Bolt — "hear yourself read": microphone recording (MediaRecorder) kept in IndexedDB so a parent can play
   back how a page sounded last week. Nothing leaves the device. Max ~40 recordings per reader; oldest are pruned. */
(function () {
  const ok = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  const MAX = 40;
  let stream = null, mr = null, parts = [], startAt = 0, dbp = null;

  function db() {
    if (dbp) return dbp;
    dbp = new Promise((res, rej) => {
      if (!window.indexedDB) return rej(new Error("no idb"));
      const r = indexedDB.open("maxbolt", 1);
      r.onupgradeneeded = () => { const s = r.result.createObjectStore("recs", { keyPath: "id", autoIncrement: true }); s.createIndex("profile", "profile"); };
      r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
    });
    return dbp;
  }
  const tx = (mode, fn) => db().then((d) => new Promise((res, rej) => { const t = d.transaction("recs", mode); const s = t.objectStore("recs"); const out = fn(s); t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error); }));

  async function start() {
    if (!ok) throw new Error("This device can't record.");
    if (!stream) stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    parts = [];
    const type = (MediaRecorder.isTypeSupported ? ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"].find((t) => MediaRecorder.isTypeSupported(t)) : null);
    mr = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
    mr.ondataavailable = (e) => { if (e.data && e.data.size) parts.push(e.data); };
    mr.start(250);
    startAt = Date.now();
  }
  function stop() {
    return new Promise((res) => {
      const m = mr; mr = null;
      if (!m || m.state === "inactive") return res(null);
      m.onstop = () => res({ blob: new Blob(parts, { type: m.mimeType || "audio/webm" }), seconds: (Date.now() - startAt) / 1000 });
      try { m.stop(); } catch (e) { res(null); }
    });
  }
  const recording = () => !!(mr && mr.state === "recording");
  function release() {
    if (mr && mr.state !== "inactive") { try { mr.onstop = null; mr.stop(); } catch (e) { } }
    mr = null;
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
  }

  async function save(rec) {   // { profile, story, page, blob, seconds } → id
    const id = await tx("readwrite", (s) => s.add(Object.assign({ t: Date.now() }, rec)));
    const all = await list(rec.profile);
    for (const r of all.slice(MAX)) await remove(r.id);
    return id;
  }
  function list(profile) {   // newest first
    return tx("readonly", (s) => s.index("profile").getAll(profile)).then((a) => (a || []).sort((x, y) => y.t - x.t)).catch(() => []);
  }
  const remove = (id) => tx("readwrite", (s) => s.delete(id));
  const clear = (profile) => list(profile).then((a) => Promise.all(a.map((r) => remove(r.id))));

  let cur = null;
  function play(blob, onEnd) {
    if (cur) { try { cur.pause(); URL.revokeObjectURL(cur.src); } catch (e) { } }
    const a = new Audio(URL.createObjectURL(blob));
    cur = a;
    a.onended = a.onerror = () => { if (onEnd) onEnd(); if (cur === a) cur = null; try { URL.revokeObjectURL(a.src); } catch (e) { } };
    a.play().catch(() => { if (onEnd) onEnd(); });
    return a;
  }
  function stopPlay() { if (cur) { try { cur.pause(); } catch (e) { } cur = null; } }

  window.Rec = { ok, start, stop, recording, release, save, list, remove, clear, play, stopPlay };
})();
