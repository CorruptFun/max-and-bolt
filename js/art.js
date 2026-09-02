/* Max & Bolt — comic panel art. Pure SVG, no assets.
   Art.panel(spec) → SVG string. spec = { bg, cast:[{who,mood,pose,x,y,scale,flip}], props:[{e,x,y,s,r}], fx }
   Coordinates are percentages of a 400×300 panel (x 0–100, y 0–100). Characters stand on y (feet). */
(function () {
  const W = 400, H = 300;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- backgrounds ---------- */
  const BG = {
    yard: () => `
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd4ff"/><stop offset="1" stop-color="#d9f3ff"/></linearGradient></defs>
      <rect width="400" height="300" fill="url(#sky)"/>
      <circle cx="340" cy="52" r="26" fill="#ffe66d" stroke="#f2b134" stroke-width="3"/>
      ${cloud(70, 55, 1)}${cloud(220, 40, .7)}
      <rect x="0" y="120" width="400" height="60" fill="#c9b08a"/>
      <rect x="0" y="118" width="400" height="6" fill="#8b6b45"/>
      ${[30, 110, 190, 270, 350].map((x) => `<rect x="${x}" y="95" width="10" height="30" fill="#8b6b45"/><rect x="${x - 4}" y="120" width="18" height="6" fill="#8b6b45"/>`).join("")}
      <rect x="0" y="180" width="400" height="120" fill="#79c94b"/>
      <path d="M0 200 Q100 190 200 200 T400 200 V300 H0Z" fill="#65b83a"/>
      ${grass()}
      <ellipse cx="60" cy="130" rx="42" ry="34" fill="#3f9d3a"/><rect x="55" y="140" width="10" height="45" fill="#7a4d2b"/>`,
    garage: () => `
      <rect width="400" height="300" fill="#e8e2d6"/>
      <rect x="0" y="0" width="400" height="200" fill="#d6cfc2"/>
      <rect x="0" y="200" width="400" height="100" fill="#9b9b9b"/>
      <rect x="0" y="198" width="400" height="6" fill="#6f6f6f"/>
      <rect x="20" y="40" width="130" height="90" rx="4" fill="#8c6b4a" stroke="#5b432c" stroke-width="3"/>
      ${[0, 1, 2].map((i) => `<rect x="30" y="${50 + i * 26}" width="110" height="6" fill="#5b432c"/>`).join("")}
      <text x="40" y="70" font-size="18">🔧</text><text x="70" y="70" font-size="18">🧲</text><text x="100" y="70" font-size="18">🔩</text>
      <text x="40" y="96" font-size="18">🔋</text><text x="70" y="96" font-size="18">🧪</text><text x="100" y="96" font-size="18">📦</text>
      <text x="40" y="122" font-size="18">🪛</text><text x="70" y="122" font-size="18">🧰</text><text x="100" y="122" font-size="18">💡</text>
      <rect x="250" y="20" width="120" height="110" rx="4" fill="#fff6c8" stroke="#d3b95a" stroke-width="3"/>
      <path d="M262 110 L290 50 L310 90 L335 40 L358 110Z" fill="none" stroke="#3a6cc8" stroke-width="3" stroke-linejoin="round"/>
      <text x="270" y="42" font-size="14" font-family="Bangers,Impact,sans-serif" fill="#3a6cc8">PLAN B</text>
      <rect x="170" y="140" width="220" height="60" fill="#b05a2a" stroke="#6b3418" stroke-width="3"/>
      <rect x="180" y="200" width="12" height="60" fill="#6b3418"/><rect x="368" y="200" width="12" height="60" fill="#6b3418"/>`,
    tree: () => `
      <defs><linearGradient id="skyt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fdcff"/><stop offset="1" stop-color="#e2f6ff"/></linearGradient></defs>
      <rect width="400" height="300" fill="url(#skyt)"/>
      ${cloud(300, 45, .9)}${cloud(60, 70, .6)}
      <rect x="150" y="150" width="70" height="150" fill="#7a4d2b"/>
      <ellipse cx="185" cy="90" rx="150" ry="80" fill="#3f9d3a"/>
      <ellipse cx="110" cy="120" rx="80" ry="55" fill="#4fb046"/>
      <ellipse cx="270" cy="115" rx="90" ry="60" fill="#4fb046"/>
      <rect x="60" y="170" width="260" height="14" fill="#b07a45" stroke="#6b3418" stroke-width="3"/>
      <rect x="60" y="130" width="8" height="40" fill="#6b3418"/><rect x="312" y="130" width="8" height="40" fill="#6b3418"/>
      <rect x="60" y="128" width="260" height="5" fill="#6b3418"/>
      <rect x="0" y="260" width="400" height="40" fill="#79c94b"/>`,
    room: () => `
      <rect width="400" height="300" fill="#f5e9ff"/>
      <rect x="0" y="0" width="400" height="210" fill="#cfe4ff"/>
      ${[40, 120, 200, 280, 360].map((x) => `<text x="${x}" y="40" font-size="16">⭐</text><text x="${x - 30}" y="100" font-size="16">🚀</text>`).join("")}
      <rect x="0" y="210" width="400" height="90" fill="#c7a27a"/>
      <rect x="240" y="120" width="140" height="90" rx="6" fill="#3a6cc8" stroke="#22467f" stroke-width="3"/>
      <rect x="240" y="120" width="140" height="30" rx="6" fill="#ff6b6b" stroke="#22467f" stroke-width="3"/>
      <rect x="20" y="130" width="90" height="80" fill="#8c6b4a" stroke="#5b432c" stroke-width="3"/>
      ${[0, 1, 2].map((i) => `<rect x="${28 + i * 26}" y="138" width="20" height="28" fill="${["#ff6b6b", "#ffd93d", "#6bcB77"][i]}" stroke="#333" stroke-width="2"/>`).join("")}
      <rect x="28" y="175" width="74" height="28" fill="#fff" stroke="#333" stroke-width="2"/>`,
    kitchen: () => `
      <rect width="400" height="300" fill="#fff3cf"/>
      <rect x="0" y="0" width="400" height="200" fill="#ffe9a8"/>
      <rect x="0" y="200" width="400" height="100" fill="#d8c19a"/>
      <rect x="20" y="130" width="360" height="70" fill="#7fbfd9" stroke="#3b6f86" stroke-width="3"/>
      <rect x="20" y="126" width="360" height="8" fill="#e4e4e4" stroke="#999" stroke-width="2"/>
      <rect x="300" y="30" width="70" height="100" rx="6" fill="#f4f4f4" stroke="#999" stroke-width="3"/>
      <rect x="300" y="70" width="70" height="4" fill="#999"/>
      <text x="60" y="110" font-size="30">🍞</text><text x="110" y="110" font-size="30">🥛</text><text x="160" y="110" font-size="30">🍕</text>`,
    street: () => `
      <rect width="400" height="300" fill="#a9e2ff"/>
      ${cloud(80, 50, .8)}${cloud(310, 60, .6)}
      ${[0, 1, 2, 3].map((i) => `<rect x="${i * 105 - 10}" y="${90 + (i % 2) * 15}" width="90" height="110" fill="${["#f2b6a0", "#a0c8f2", "#f2e6a0", "#c9a0f2"][i]}" stroke="#333" stroke-width="3"/><path d="M${i * 105 - 15} ${92 + (i % 2) * 15} L${i * 105 + 35} ${55 + (i % 2) * 15} L${i * 105 + 85} ${92 + (i % 2) * 15}Z" fill="#c0392b" stroke="#333" stroke-width="3"/><rect x="${i * 105 + 25}" y="${150 + (i % 2) * 15}" width="20" height="50" fill="#6b3418"/>`).join("")}
      <rect x="0" y="200" width="400" height="30" fill="#d3d3d3"/>
      <rect x="0" y="230" width="400" height="70" fill="#555"/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${i * 90 + 10}" y="262" width="40" height="6" fill="#ffe66d"/>`).join("")}`,
    park: () => `
      <rect width="400" height="300" fill="#a9e2ff"/>
      <circle cx="60" cy="50" r="24" fill="#ffe66d" stroke="#f2b134" stroke-width="3"/>
      ${cloud(250, 45, .9)}
      <rect x="0" y="170" width="400" height="130" fill="#79c94b"/>
      <ellipse cx="330" cy="200" rx="60" ry="14" fill="#5fb7e8"/>
      <ellipse cx="90" cy="140" rx="46" ry="38" fill="#3f9d3a"/><rect x="85" y="150" width="10" height="45" fill="#7a4d2b"/>
      <ellipse cx="280" cy="130" rx="40" ry="34" fill="#4fb046"/><rect x="275" y="140" width="10" height="40" fill="#7a4d2b"/>
      <path d="M0 220 Q200 205 400 220 V232 Q200 217 0 232Z" fill="#d9c39a"/>
      ${grass()}`,
    space: () => `
      <rect width="400" height="300" fill="#0b1030"/>
      ${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 97) % 400}" cy="${(i * 61) % 300}" r="${1 + (i % 3) * .6}" fill="#fff"/>`).join("")}
      <circle cx="320" cy="70" r="40" fill="#e8e8f0"/><circle cx="305" cy="60" r="8" fill="#c9c9d6"/><circle cx="335" cy="85" r="5" fill="#c9c9d6"/>
      <circle cx="70" cy="60" r="22" fill="#ff8c42"/><ellipse cx="70" cy="60" rx="38" ry="8" fill="none" stroke="#ffd166" stroke-width="4"/>
      <ellipse cx="200" cy="300" rx="260" ry="60" fill="#5f6bb3"/>`,
    sea: () => `
      <defs><linearGradient id="seag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4fb7e8"/><stop offset="1" stop-color="#0f5f8a"/></linearGradient></defs>
      <rect width="400" height="300" fill="url(#seag)"/>
      ${Array.from({ length: 12 }, (_, i) => `<circle cx="${(i * 71) % 400}" cy="${(i * 43) % 220}" r="${3 + (i % 3) * 2}" fill="none" stroke="#dff6ff" stroke-width="2"/>`).join("")}
      <path d="M0 260 Q60 240 120 260 T240 260 T360 260 T480 260 V300 H0Z" fill="#d9c39a"/>
      <path d="M40 260 Q45 200 50 260 M60 262 Q70 210 80 262" stroke="#2e8b57" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M320 262 Q325 205 335 262 M345 262 Q350 215 360 262" stroke="#2e8b57" stroke-width="6" fill="none" stroke-linecap="round"/>
      <text x="200" y="120" font-size="24">🐠</text><text x="90" y="80" font-size="20">🐟</text>`,
    night: () => `
      <rect width="400" height="300" fill="#1a1f4d"/>
      ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 89) % 400}" cy="${(i * 53) % 170}" r="${1 + (i % 2)}" fill="#fff"/>`).join("")}
      <circle cx="330" cy="60" r="30" fill="#fff6c8"/>
      <rect x="0" y="180" width="400" height="120" fill="#2f6b3a"/>
      <path d="M0 200 Q100 190 200 200 T400 200 V300 H0Z" fill="#24552d"/>
      <rect x="0" y="120" width="400" height="60" fill="#5a4a3a"/>
      <ellipse cx="60" cy="130" rx="42" ry="34" fill="#1f5a2a"/><rect x="55" y="140" width="10" height="45" fill="#3d2a1a"/>`,
    school: () => `
      <rect width="400" height="300" fill="#fdf6e3"/>
      <rect x="0" y="0" width="400" height="200" fill="#e8f0d8"/>
      <rect x="40" y="30" width="320" height="120" fill="#2f5d3a" stroke="#6b3418" stroke-width="6"/>
      <text x="60" y="75" font-size="22" font-family="'Patrick Hand',cursive" fill="#fff">2 + 2 = 4</text>
      <text x="60" y="115" font-size="22" font-family="'Patrick Hand',cursive" fill="#fff">cat  hat  bat</text>
      <rect x="0" y="200" width="400" height="100" fill="#c7a27a"/>
      <rect x="230" y="160" width="140" height="12" fill="#b07a45" stroke="#6b3418" stroke-width="3"/>
      <rect x="240" y="172" width="8" height="40" fill="#6b3418"/><rect x="352" y="172" width="8" height="40" fill="#6b3418"/>`,
    lab: () => `
      <rect width="400" height="300" fill="#d8e8f0"/>
      <rect x="0" y="0" width="400" height="200" fill="#c2d6e2"/>
      <rect x="0" y="200" width="400" height="100" fill="#7f8c9a"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${i * 50 + 5}" y="20" width="40" height="80" fill="#aac5d6" stroke="#5f7d92" stroke-width="2"/>`).join("")}
      <rect x="30" y="120" width="340" height="80" fill="#f4f4f4" stroke="#7f8c9a" stroke-width="3"/>
      <text x="50" y="112" font-size="34">🧪</text><text x="100" y="112" font-size="34">⚗️</text><text x="150" y="112" font-size="34">🔬</text><text x="300" y="112" font-size="34">🧫</text>
      <rect x="180" y="40" width="120" height="70" rx="6" fill="#111" stroke="#5f7d92" stroke-width="3"/>
      <text x="196" y="82" font-size="16" font-family="monospace" fill="#3cff7a">SYSTEM OK_</text>`,
    jungle: () => `
      <rect width="400" height="300" fill="#8fd18f"/>
      <ellipse cx="60" cy="60" rx="80" ry="70" fill="#2e7d32"/><ellipse cx="340" cy="70" rx="90" ry="75" fill="#2e7d32"/>
      <ellipse cx="200" cy="30" rx="120" ry="60" fill="#388e3c"/>
      <rect x="40" y="100" width="18" height="160" fill="#6b3418"/><rect x="330" y="110" width="18" height="150" fill="#6b3418"/>
      <path d="M58 100 Q120 140 100 200" stroke="#2e7d32" stroke-width="8" fill="none"/>
      <rect x="0" y="240" width="400" height="60" fill="#4caf50"/>
      <text x="160" y="90" font-size="28">🦜</text><text x="250" y="140" font-size="26">🐒</text>`,
    snow: () => `
      <rect width="400" height="300" fill="#cfe9ff"/>
      ${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 83) % 400}" cy="${(i * 47) % 200}" r="2.5" fill="#fff"/>`).join("")}
      <path d="M0 190 Q100 120 200 190 T400 190 V300 H0Z" fill="#fff"/>
      <path d="M0 230 Q200 200 400 230 V300 H0Z" fill="#eef6ff"/>
      <path d="M300 190 L330 110 L360 190Z" fill="#2e7d32"/><path d="M300 150 L330 90 L360 150Z" fill="#388e3c"/>
      <path d="M40 200 L70 130 L100 200Z" fill="#2e7d32"/>`,
    city: () => `
      <rect width="400" height="300" fill="#ffd9a0"/>
      <circle cx="80" cy="60" r="28" fill="#ff8c42"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${i * 70 - 10}" y="${60 + (i * 37) % 80}" width="60" height="${240 - (i * 37) % 80}" fill="${["#5a6b8c", "#3f4d6b", "#6b7a9c"][i % 3]}" stroke="#222" stroke-width="3"/>${[0, 1, 2, 3].map((r) => `<rect x="${i * 70}" y="${75 + (i * 37) % 80 + r * 30}" width="12" height="14" fill="#ffe66d"/><rect x="${i * 70 + 25}" y="${75 + (i * 37) % 80 + r * 30}" width="12" height="14" fill="#ffe66d"/>`).join("")}`).join("")}
      <rect x="0" y="240" width="400" height="60" fill="#444"/>
      ${[0, 1, 2, 3, 4].map((i) => `<rect x="${i * 90 + 10}" y="268" width="40" height="6" fill="#ffe66d"/>`).join("")}`,
    stage: () => `
      <rect width="400" height="300" fill="#4a1c6b"/>
      <path d="M0 0 H400 V90 Q300 60 200 90 Q100 60 0 90Z" fill="#b71c1c"/>
      <rect x="0" y="0" width="60" height="300" fill="#b71c1c"/><rect x="340" y="0" width="60" height="300" fill="#b71c1c"/>
      <rect x="60" y="200" width="280" height="100" fill="#8d6e63"/>
      <rect x="60" y="196" width="280" height="8" fill="#5d4037"/>
      <circle cx="200" cy="150" r="90" fill="#fff59d" opacity=".35"/>`,
    cave: () => `
      <rect width="400" height="300" fill="#2d2d3a"/>
      <path d="M0 0 H400 V80 Q350 120 300 70 Q250 130 200 80 Q150 130 100 70 Q50 120 0 80Z" fill="#1a1a24"/>
      <path d="M0 300 V230 Q60 200 90 250 Q120 210 160 260 Q220 210 260 250 Q320 200 360 250 Q380 220 400 240 V300Z" fill="#1a1a24"/>
      <text x="180" y="150" font-size="26">💎</text><text x="60" y="130" font-size="22">🦇</text>`,
  };

  function cloud(x, y, s) {
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" stroke="#cfe5f2" stroke-width="2">
      <ellipse cx="0" cy="0" rx="40" ry="18"/><circle cx="-18" cy="-8" r="16"/><circle cx="8" cy="-14" r="20"/><circle cx="26" cy="-4" r="14"/></g>`;
  }
  function grass() {
    return Array.from({ length: 14 }, (_, i) => {
      const x = (i * 31) % 400, y = 235 + (i * 17) % 55;
      return `<path d="M${x} ${y} l3 -10 l3 10 M${x + 6} ${y} l3 -8 l3 8" stroke="#4e9b2e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    }).join("");
  }

  /* ---------- faces (humans) ---------- */
  function face(mood) {
    // eyes at (-9,-4) & (9,-4), mouth at (0,10) — relative to head center; head radius ~24
    const eyeOpen = (dx) => `<circle cx="${dx}" cy="-4" r="5" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="${dx + 1.5}" cy="-3" r="2.4" fill="#222"/>`;
    const eyeWide = (dx) => `<circle cx="${dx}" cy="-4" r="7" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="${dx + 1}" cy="-3" r="2.8" fill="#222"/>`;
    const eyeHappy = (dx) => `<path d="M${dx - 5} -3 Q${dx} -10 ${dx + 5} -3" stroke="#222" stroke-width="2.5" fill="none"/>`;
    const eyeSly = (dx) => `<path d="M${dx - 5} -6 L${dx + 5} -6" stroke="#222" stroke-width="2.5"/><circle cx="${dx}" cy="-3" r="4" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="${dx + 1}" cy="-2.5" r="2" fill="#222"/>`;
    const eyeSleep = (dx) => `<path d="M${dx - 5} -3 Q${dx} 2 ${dx + 5} -3" stroke="#222" stroke-width="2.5" fill="none"/>`;
    const browMad = `<path d="M-15 -14 L-4 -9 M15 -14 L4 -9" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>`;
    const browWorry = `<path d="M-15 -10 L-4 -14 M15 -10 L4 -14" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>`;
    const browUp = `<path d="M-14 -15 Q-9 -18 -4 -15 M14 -15 Q9 -18 4 -15" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    const m = {
      happy: eyeOpen(-9) + eyeOpen(9) + `<path d="M-9 8 Q0 18 9 8" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
      excited: eyeHappy(-9) + eyeHappy(9) + `<path d="M-11 6 Q0 22 11 6Z" fill="#c0392b" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/><path d="M-8 8 Q0 12 8 8" fill="#fff"/>`,
      surprised: browUp + eyeWide(-9) + eyeWide(9) + `<ellipse cx="0" cy="12" rx="5" ry="7" fill="#c0392b" stroke="#222" stroke-width="2.5"/>`,
      worried: browWorry + eyeOpen(-9) + eyeOpen(9) + `<path d="M-8 14 Q0 8 8 14" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
      mad: browMad + eyeOpen(-9) + eyeOpen(9) + `<path d="M-9 14 Q0 8 9 14" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
      sly: eyeSly(-9) + eyeSly(9) + `<path d="M-9 9 Q2 16 11 6" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
      sleepy: eyeSleep(-9) + eyeSleep(9) + `<ellipse cx="0" cy="12" rx="4" ry="4" fill="#c0392b" stroke="#222" stroke-width="2"/>`,
      think: eyeOpen(-9) + eyeOpen(9) + `<path d="M-6 12 L6 10" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>`,
      laugh: eyeHappy(-9) + eyeHappy(9) + `<path d="M-12 6 Q0 24 12 6Z" fill="#c0392b" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>`,
    };
    return m[mood] || m.happy;
  }

  /* arms: returns two paths given shoulder positions. pose names: down, up, point, think, wave, hips, run */
  function arms(pose, skin, sleeve) {
    const L = (d) => `<path d="${d}" stroke="${sleeve}" stroke-width="11" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${skin}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    const hand = (x, y) => `<circle cx="${x}" cy="${y}" r="6.5" fill="${skin}" stroke="#222" stroke-width="2"/>`;
    const outline = (d) => `<path d="${d}" stroke="#222" stroke-width="15" fill="none" stroke-linecap="round"/>`;
    const P = {
      down: ["M-16 8 L-22 40", "M16 8 L22 40"],
      up: ["M-16 8 L-30 -30", "M16 8 L30 -30"],
      point: ["M-16 8 L-22 40", "M16 8 L48 -6"],
      think: ["M-16 8 L-22 40", "M16 8 L14 -20"],
      wave: ["M-16 8 L-22 40", "M16 8 L34 -28"],
      hips: ["M-16 8 L-30 30 L-14 34", "M16 8 L30 30 L14 34"],
      run: ["M-16 8 L-34 -6", "M16 8 L36 24"],
      hold: ["M-16 8 L-16 34", "M16 8 L16 34"],
      cheer: ["M-16 8 L-36 -24", "M16 8 L36 -24"],
    };
    const [a, b] = P[pose] || P.down;
    const end = (d) => { const m = d.match(/L\s*(-?[\d.]+)\s+(-?[\d.]+)\s*$/); return [+m[1], +m[2]]; };
    const [ax, ay] = end(a), [bx, by] = end(b);
    return outline(a) + outline(b) + L(a) + L(b) + hand(ax, ay) + hand(bx, by);
  }

  /* hero (the "max" slot) can be a boy or a girl — set per reader profile */
  const HERO = { gender: "boy", name: "Max" };
  function setHero(h) { HERO.gender = h.gender === "girl" ? "girl" : "boy"; HERO.name = h.name || (HERO.gender === "girl" ? "Maxie" : "Max"); NAMES.max = HERO.name; }

  /* ---------- characters. each draws standing with feet at (0,0), ~110 tall ---------- */
  const CHAR = {
    max(mood, pose) {
      const girl = HERO.gender === "girl";
      const skin = "#f6c9a0", shirt = girl ? "#ff6fae" : "#3fb64f", shorts = girl ? "#8e44ad" : "#3a6cc8";
      const hair = girl
        ? `<path d="M-26 -8 Q-30 -34 0 -34 Q30 -34 26 -8 Q14 -20 0 -18 Q-14 -20 -26 -8Z" fill="#e0771a" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
           <path d="M-26 -10 Q-46 -6 -40 22 Q-32 30 -30 8Z" fill="#e0771a" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
           <path d="M26 -10 Q46 -6 40 22 Q32 30 30 8Z" fill="#e0771a" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
           <circle cx="-29" cy="-8" r="5" fill="#ff5e9e" stroke="#222" stroke-width="2"/><circle cx="29" cy="-8" r="5" fill="#ff5e9e" stroke="#222" stroke-width="2"/>`
        : `<path d="M-26 -8 L-30 -34 L-16 -22 L-10 -40 L2 -24 L12 -42 L18 -22 L30 -32 L26 -6Z" fill="#e0771a" stroke="#222" stroke-width="3" stroke-linejoin="round"/>`;
      return `
        <g transform="translate(0 -110)">
          ${arms(pose, skin, shirt)}
          <rect x="-20" y="0" width="40" height="48" rx="10" fill="${shirt}" stroke="#222" stroke-width="3"/>
          <path d="M-2 10 L6 10 L0 24 L8 24 L-4 42 L0 28 L-8 28Z" fill="#ffe66d" stroke="#222" stroke-width="1.5"/>
          <rect x="-20" y="46" width="18" height="30" rx="4" fill="${shorts}" stroke="#222" stroke-width="3"/>
          <rect x="2" y="46" width="18" height="30" rx="4" fill="${shorts}" stroke="#222" stroke-width="3"/>
          <rect x="-24" y="74" width="24" height="36" rx="2" fill="${skin}" stroke="#222" stroke-width="3"/>
          <rect x="0" y="74" width="24" height="36" rx="2" fill="${skin}" stroke="#222" stroke-width="3"/>
          <rect x="-26" y="98" width="26" height="14" rx="5" fill="#e53935" stroke="#222" stroke-width="3"/>
          <rect x="0" y="98" width="26" height="14" rx="5" fill="#e53935" stroke="#222" stroke-width="3"/>
          <rect x="-26" y="106" width="26" height="6" fill="#fff" stroke="#222" stroke-width="2"/>
          <rect x="0" y="106" width="26" height="6" fill="#fff" stroke="#222" stroke-width="2"/>
          <g transform="translate(0 -20)">
            ${hair}
            <circle cx="0" cy="0" r="24" fill="${skin}" stroke="#222" stroke-width="3"/>
            ${girl ? `<path d="M-24 -6 Q-12 -26 0 -14 Q12 -26 24 -6 Q10 -14 0 -8 Q-10 -14 -24 -6Z" fill="#e0771a"/>` : ""}
            <circle cx="-14" cy="6" r="1.5" fill="#d29a6b"/><circle cx="-19" cy="4" r="1.5" fill="#d29a6b"/><circle cx="16" cy="6" r="1.5" fill="#d29a6b"/><circle cx="20" cy="3" r="1.5" fill="#d29a6b"/>
            ${face(mood)}
          </g>
        </g>`;
    },
    bolt(mood, pose) {
      const metal = "#c6ccd8", dark = "#5b6472";
      const eyes = {
        happy: `<circle cx="-9" cy="0" r="5" fill="#3cff7a"/><circle cx="9" cy="0" r="5" fill="#3cff7a"/><path d="M-6 12 Q0 18 6 12" stroke="#3cff7a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
        excited: `<path d="M-14 0 Q-9 -8 -4 0" stroke="#3cff7a" stroke-width="3" fill="none"/><path d="M4 0 Q9 -8 14 0" stroke="#3cff7a" stroke-width="3" fill="none"/><path d="M-8 10 Q0 20 8 10Z" fill="#3cff7a"/>`,
        surprised: `<circle cx="-9" cy="0" r="7" fill="#3cff7a"/><circle cx="9" cy="0" r="7" fill="#3cff7a"/><circle cx="0" cy="13" r="4" fill="#3cff7a"/>`,
        worried: `<circle cx="-9" cy="0" r="5" fill="#ffd166"/><circle cx="9" cy="0" r="5" fill="#ffd166"/><path d="M-6 16 Q0 10 6 16" stroke="#ffd166" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
        mad: `<path d="M-15 -6 L-4 -1 M15 -6 L4 -1" stroke="#ff5252" stroke-width="3"/><circle cx="-9" cy="2" r="4" fill="#ff5252"/><circle cx="9" cy="2" r="4" fill="#ff5252"/><path d="M-6 16 Q0 10 6 16" stroke="#ff5252" stroke-width="2.5" fill="none"/>`,
        sly: `<rect x="-14" y="-2" width="10" height="4" fill="#3cff7a"/><rect x="4" y="-2" width="10" height="4" fill="#3cff7a"/><path d="M-6 10 Q2 16 8 8" stroke="#3cff7a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
        sleepy: `<path d="M-14 0 Q-9 6 -4 0 M4 0 Q9 6 14 0" stroke="#3cff7a" stroke-width="3" fill="none"/><text x="18" y="-16" font-size="12" fill="#3cff7a" font-family="Bangers,Impact,sans-serif">z</text>`,
        think: `<circle cx="-9" cy="0" r="5" fill="#3cff7a"/><circle cx="9" cy="0" r="5" fill="#3cff7a"/><rect x="-5" y="12" width="10" height="2.5" fill="#3cff7a"/>`,
        laugh: `<path d="M-14 0 Q-9 -8 -4 0" stroke="#3cff7a" stroke-width="3" fill="none"/><path d="M4 0 Q9 -8 14 0" stroke="#3cff7a" stroke-width="3" fill="none"/><path d="M-10 9 Q0 22 10 9Z" fill="#3cff7a"/>`,
        love: `<text x="-16" y="5" font-size="14">❤</text><text x="2" y="5" font-size="14">❤</text><path d="M-6 12 Q0 18 6 12" stroke="#3cff7a" stroke-width="2.5" fill="none"/>`,
      };
      const armP = {
        down: ["M-20 -40 L-30 -14", "M20 -40 L30 -14"], up: ["M-20 -40 L-34 -72", "M20 -40 L34 -72"],
        point: ["M-20 -40 L-30 -14", "M20 -40 L52 -50"], think: ["M-20 -40 L-30 -14", "M20 -40 L16 -66"],
        wave: ["M-20 -40 L-30 -14", "M20 -40 L38 -72"], hips: ["M-20 -40 L-34 -22 L-20 -18", "M20 -40 L34 -22 L20 -18"],
        run: ["M-20 -40 L-36 -56", "M20 -40 L38 -30"], hold: ["M-20 -40 L-18 -14", "M20 -40 L18 -14"], cheer: ["M-20 -40 L-40 -70", "M20 -40 L40 -70"],
      };
      const [a, b] = armP[pose] || armP.down;
      const arm = (d) => `<path d="${d}" stroke="#222" stroke-width="12" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${dark}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
      const claw = (d) => { const m = d.match(/L\s*(-?[\d.]+)\s+(-?[\d.]+)\s*$/); return `<circle cx="${m[1]}" cy="${m[2]}" r="6" fill="${metal}" stroke="#222" stroke-width="2"/>`; };
      return `
        <g>
          <path d="M-22 -30 Q-70 -20 -60 -70" stroke="#222" stroke-width="16" fill="none" stroke-linecap="round"/>
          <path d="M-22 -30 Q-70 -20 -60 -70" stroke="${metal}" stroke-width="12" fill="none" stroke-linecap="round"/>
          ${[.25, .55, .85].map((t) => { const x = -22 + (-60 + 22) * t - 10 * Math.sin(t * 3), y = -30 + (-70 + 30) * t + 8; return `<circle cx="${x}" cy="${y}" r="7" fill="${dark}"/>`; }).join("")}
          ${arm(a)}${arm(b)}
          <rect x="-24" y="-56" width="48" height="52" rx="14" fill="${metal}" stroke="#222" stroke-width="3"/>
          <rect x="-12" y="-44" width="24" height="26" rx="6" fill="#e9edf3" stroke="#222" stroke-width="2"/>
          <circle cx="0" cy="-31" r="6" fill="#ff5252" stroke="#222" stroke-width="2"/>
          <rect x="-20" y="-6" width="16" height="8" rx="3" fill="${dark}" stroke="#222" stroke-width="2"/><rect x="4" y="-6" width="16" height="8" rx="3" fill="${dark}" stroke="#222" stroke-width="2"/>
          ${claw(a)}${claw(b)}
          <g transform="translate(0 -78)">
            <line x1="0" y1="-26" x2="0" y2="-42" stroke="#222" stroke-width="3"/><circle cx="0" cy="-45" r="5" fill="#ffd166" stroke="#222" stroke-width="2"/>
            <path d="M-26 -14 L-30 -30 L-12 -20Z M26 -14 L30 -30 L12 -20Z" fill="${metal}" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
            <rect x="-28" y="-24" width="56" height="46" rx="18" fill="${metal}" stroke="#222" stroke-width="3"/>
            <path d="M-26 -8 Q-14 -18 -2 -8 L0 -6 L2 -8 Q14 -18 26 -8 L26 6 Q14 12 2 6 L0 8 L-2 6 Q-14 12 -26 6Z" fill="#2c3440" stroke="#222" stroke-width="2"/>
            <ellipse cx="0" cy="16" rx="8" ry="5" fill="#2c3440"/>
            ${eyes[mood] || eyes.happy}
          </g>
        </g>`;
    },
    zoe(mood, pose) {
      const skin = "#e9b98c", hood = "#8e44ad";
      return `
        <g transform="translate(0 -128)">
          ${arms(pose, skin, hood)}
          <rect x="-22" y="0" width="44" height="58" rx="12" fill="${hood}" stroke="#222" stroke-width="3"/>
          <path d="M-22 6 Q0 20 22 6" stroke="#6c3483" stroke-width="3" fill="none"/>
          <rect x="-8" y="30" width="16" height="18" rx="3" fill="#6c3483" stroke="#222" stroke-width="2"/>
          <rect x="-20" y="56" width="18" height="36" rx="4" fill="#2c3e50" stroke="#222" stroke-width="3"/>
          <rect x="2" y="56" width="18" height="36" rx="4" fill="#2c3e50" stroke="#222" stroke-width="3"/>
          <rect x="-24" y="90" width="24" height="24" rx="2" fill="${skin}" stroke="#222" stroke-width="3"/>
          <rect x="0" y="90" width="24" height="24" rx="2" fill="${skin}" stroke="#222" stroke-width="3"/>
          <rect x="-26" y="112" width="26" height="14" rx="5" fill="#fff" stroke="#222" stroke-width="3"/>
          <rect x="0" y="112" width="26" height="14" rx="5" fill="#fff" stroke="#222" stroke-width="3"/>
          <g transform="translate(0 -20)">
            <path d="M20 -10 Q44 -30 40 10 Q30 30 22 12Z" fill="#3e2723" stroke="#222" stroke-width="3"/>
            <circle cx="0" cy="0" r="24" fill="${skin}" stroke="#222" stroke-width="3"/>
            <path d="M-26 -4 Q-24 -32 0 -30 Q24 -32 26 -4 Q20 -18 0 -16 Q-20 -18 -26 -4Z" fill="#3e2723" stroke="#222" stroke-width="3"/>
            ${face(mood)}
          </g>
        </g>`;
    },
    cat(mood) {
      const e = mood === "sly" ? `<path d="M-12 -4 L-4 -4 M4 -4 L12 -4" stroke="#222" stroke-width="3"/>` :
        mood === "surprised" ? `<circle cx="-8" cy="-4" r="6" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="8" cy="-4" r="6" fill="#fff" stroke="#222" stroke-width="2"/><circle cx="-8" cy="-4" r="3" fill="#222"/><circle cx="8" cy="-4" r="3" fill="#222"/>` :
          `<circle cx="-8" cy="-4" r="5" fill="#c8e64c" stroke="#222" stroke-width="2"/><circle cx="8" cy="-4" r="5" fill="#c8e64c" stroke="#222" stroke-width="2"/><ellipse cx="-8" cy="-4" rx="1.5" ry="4" fill="#222"/><ellipse cx="8" cy="-4" rx="1.5" ry="4" fill="#222"/>`;
      return `
        <g transform="translate(0 -30)">
          <path d="M22 4 Q50 0 44 -30" stroke="#222" stroke-width="12" fill="none" stroke-linecap="round"/>
          <path d="M22 4 Q50 0 44 -30" stroke="#f39c12" stroke-width="8" fill="none" stroke-linecap="round"/>
          <ellipse cx="0" cy="8" rx="30" ry="20" fill="#f39c12" stroke="#222" stroke-width="3"/>
          <path d="M-14 0 Q-8 -8 -2 0 M6 0 Q12 -8 18 0" stroke="#c0392b" stroke-width="3" fill="none"/>
          ${[-18, -6, 6, 18].map((x) => `<rect x="${x - 4}" y="22" width="8" height="10" rx="3" fill="#f39c12" stroke="#222" stroke-width="2"/>`).join("")}
          <g transform="translate(-6 -18)">
            <path d="M-20 -8 L-22 -30 L-6 -16Z M20 -8 L22 -30 L6 -16Z" fill="#f39c12" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
            <circle cx="0" cy="0" r="22" fill="#f39c12" stroke="#222" stroke-width="3"/>
            <path d="M-14 -20 L-10 -10 M14 -20 L10 -10" stroke="#c0392b" stroke-width="3"/>
            ${e}
            <path d="M-3 6 L3 6 L0 10Z" fill="#e57373" stroke="#222" stroke-width="1.5"/>
            <path d="M0 10 Q-5 15 -9 12 M0 10 Q5 15 9 12" stroke="#222" stroke-width="2" fill="none"/>
            <path d="M-22 4 L-34 2 M-22 8 L-34 10 M22 4 L34 2 M22 8 L34 10" stroke="#222" stroke-width="1.5"/>
            <path d="M-24 -26 L24 -26 L20 -34 L14 -46 L-14 -46 L-20 -34Z" fill="#2c3e50" stroke="#222" stroke-width="2.5"/>
            <rect x="-20" y="-36" width="40" height="5" fill="#e74c3c"/>
          </g>
        </g>`;
    },
    dull(mood, pose) {
      const skin = "#e6c39c", suit = "#616161";
      return `
        <g transform="translate(0 -150)">
          ${arms(pose, skin, suit)}
          <rect x="-18" y="0" width="36" height="66" rx="8" fill="${suit}" stroke="#222" stroke-width="3"/>
          <path d="M-4 0 L0 30 L4 0Z" fill="#c62828" stroke="#222" stroke-width="1.5"/>
          <rect x="-17" y="64" width="16" height="50" rx="3" fill="#424242" stroke="#222" stroke-width="3"/>
          <rect x="1" y="64" width="16" height="50" rx="3" fill="#424242" stroke="#222" stroke-width="3"/>
          <rect x="-22" y="112" width="22" height="12" rx="4" fill="#212121" stroke="#222" stroke-width="3"/>
          <rect x="0" y="112" width="22" height="12" rx="4" fill="#212121" stroke="#222" stroke-width="3"/>
          <g transform="translate(0 -22)">
            <ellipse cx="0" cy="0" rx="20" ry="26" fill="${skin}" stroke="#222" stroke-width="3"/>
            <path d="M-20 -8 Q-18 -30 0 -28 Q18 -30 20 -8 Q10 -20 0 -18 Q-10 -20 -20 -8Z" fill="#9e9e9e" stroke="#222" stroke-width="2.5"/>
            ${face(mood === "happy" ? "mad" : mood)}
            <path d="M-12 8 Q-6 3 0 8 Q6 3 12 8 Q6 10 0 9 Q-6 10 -12 8Z" fill="#616161" stroke="#222" stroke-width="1.5"/>
          </g>
        </g>`;
    },
    mom(mood, pose) {
      const skin = "#f6c9a0", top = "#ff7043";
      return `
        <g transform="translate(0 -142)">
          ${arms(pose, skin, top)}
          <rect x="-20" y="0" width="40" height="60" rx="10" fill="${top}" stroke="#222" stroke-width="3"/>
          <rect x="-18" y="58" width="36" height="50" rx="4" fill="#5c6bc0" stroke="#222" stroke-width="3"/>
          <rect x="-22" y="106" width="20" height="12" rx="4" fill="#212121" stroke="#222" stroke-width="3"/>
          <rect x="2" y="106" width="20" height="12" rx="4" fill="#212121" stroke="#222" stroke-width="3"/>
          <g transform="translate(0 -22)">
            <path d="M-28 10 Q-30 -34 0 -32 Q30 -34 28 10 L20 14 Q26 -20 0 -20 Q-26 -20 -20 14Z" fill="#e0771a" stroke="#222" stroke-width="3"/>
            <circle cx="0" cy="0" r="24" fill="${skin}" stroke="#222" stroke-width="3"/>
            ${face(mood)}
          </g>
        </g>`;
    },
  };

  /* ---------- effects ---------- */
  const FX = {
    none: "",
    boom: `<g transform="translate(200 120)"><path d="${starburst(12, 120, 80)}" fill="#ffd166" stroke="#222" stroke-width="4" stroke-linejoin="round"/><text x="0" y="16" text-anchor="middle" font-size="46" font-family="Bangers,Impact,sans-serif" fill="#e53935" stroke="#222" stroke-width="1.5">BOOM!</text></g>`,
    zap: `<g transform="translate(200 110)"><path d="${starburst(10, 100, 66)}" fill="#7fe0ff" stroke="#222" stroke-width="4" stroke-linejoin="round"/><text x="0" y="14" text-anchor="middle" font-size="42" font-family="Bangers,Impact,sans-serif" fill="#3a6cc8">ZAP!</text></g>`,
    splat: `<g transform="translate(200 120)"><path d="${starburst(14, 110, 74)}" fill="#8bc34a" stroke="#222" stroke-width="4" stroke-linejoin="round"/><text x="0" y="14" text-anchor="middle" font-size="40" font-family="Bangers,Impact,sans-serif" fill="#2e7d32">SPLAT!</text></g>`,
    whoosh: `<g><path d="M20 120 H120 M10 150 H100 M30 180 H110" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/><text x="60" y="100" font-size="34" font-family="Bangers,Impact,sans-serif" fill="#fff" stroke="#222" stroke-width="1.5">WHOOSH!</text></g>`,
    sparkle: `<g fill="#fff" stroke="#f2b134" stroke-width="2">${[[60, 60], [340, 80], [120, 220], [300, 210], [200, 40]].map(([x, y]) => `<path d="M${x} ${y - 12} L${x + 3} ${y - 3} L${x + 12} ${y} L${x + 3} ${y + 3} L${x} ${y + 12} L${x - 3} ${y + 3} L${x - 12} ${y} L${x - 3} ${y - 3}Z"/>`).join("")}</g>`,
    speed: `<g stroke="#222" stroke-width="3" opacity=".5">${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="0" y1="${60 + i * 40}" x2="${80 + (i % 3) * 30}" y2="${60 + i * 40}"/>`).join("")}</g>`,
    shake: `<g stroke="#222" stroke-width="3" fill="none">${[[70, 90], [330, 100], [200, 60]].map(([x, y]) => `<path d="M${x - 14} ${y} Q${x - 7} ${y - 10} ${x} ${y} T${x + 14} ${y}"/>`).join("")}</g>`,
    stink: `<g stroke="#8bc34a" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9">${[160, 200, 240].map((x) => `<path d="M${x} 150 Q${x - 10} 130 ${x} 110 T${x} 70"/>`).join("")}</g>`,
    hearts: `<g>${[[80, 70], [300, 60], [180, 40], [340, 150]].map(([x, y]) => `<text x="${x}" y="${y}" font-size="26">💖</text>`).join("")}</g>`,
    rain: `<g stroke="#5fa8d3" stroke-width="2" stroke-linecap="round">${Array.from({ length: 40 }, (_, i) => `<line x1="${(i * 53) % 400}" y1="${(i * 37) % 260}" x2="${(i * 53) % 400 - 3}" y2="${(i * 37) % 260 + 12}"/>`).join("")}</g>`,
    dark: `<rect width="400" height="300" fill="#000" opacity=".55"/>`,
  };
  function starburst(n, R, r) {
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
      const a = (Math.PI * i) / n, rad = i % 2 ? r : R;
      pts.push(`${(Math.cos(a) * rad).toFixed(1)} ${(Math.sin(a) * rad * .75).toFixed(1)}`);
    }
    return "M" + pts.join(" L") + "Z";
  }

  /* ---------- panel assembly ---------- */
  function panel(spec) {
    spec = spec || {};
    const bg = (BG[spec.bg] || BG.yard)();
    const cast = (spec.cast || []).map((c) => {
      const draw = CHAR[c.who] || CHAR.max;
      const x = (c.x == null ? 50 : c.x) / 100 * W;
      const y = (c.y == null ? 92 : c.y) / 100 * H;
      const s = (c.scale || 1) * (c.who === "cat" ? .9 : 1);
      const flip = c.flip ? -1 : 1;
      return `<g transform="translate(${x} ${y}) scale(${s * flip} ${s})">${draw(c.mood || "happy", c.pose || "down")}</g>`;
    }).join("");
    const props = (spec.props || []).map((p) => {
      const x = (p.x == null ? 50 : p.x) / 100 * W, y = (p.y == null ? 60 : p.y) / 100 * H;
      const s = p.s || 40;
      return `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${p.r || 0} ${x} ${y})">${esc(p.e)}</text>`;
    }).join("");
    const fx = FX[spec.fx] || "";
    const fxBefore = spec.fx === "dark" || spec.fx === "rain" ? fx : "";
    const fxAfter = fxBefore ? "" : fx;
    const bubble = spec.bubble ? drawBubble(spec.bubble) : "";
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="panel-art" role="img" aria-label="${esc(spec.alt || "comic panel")}">
      ${bg}${fxBefore}${spec.propsBehind ? props : ""}${cast}${spec.propsBehind ? "" : props}${bubble}${fxAfter}</svg>`;
  }

  /* small in-art bubble for a sound/word (e.g. "?!" or "Zzz") */
  function drawBubble(b) {
    const x = (b.x == null ? 50 : b.x) / 100 * W, y = (b.y == null ? 20 : b.y) / 100 * H;
    const w = Math.max(50, (b.text || "").length * 14 + 20);
    return `<g><rect x="${x - w / 2}" y="${y - 18}" width="${w}" height="36" rx="18" fill="#fff" stroke="#222" stroke-width="3"/>
      <path d="M${x - 8} ${y + 16} L${x + (b.tailDir === "left" ? -30 : 30)} ${y + 40} L${x + 10} ${y + 16}Z" fill="#fff" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
      <rect x="${x - 12}" y="${y + 8}" width="26" height="12" fill="#fff"/>
      <text x="${x}" y="${y + 8}" text-anchor="middle" font-size="22" font-family="Bangers,Impact,sans-serif" fill="#222">${esc(b.text || "")}</text></g>`;
  }

  /* portrait: head-only avatar for dialogue tags */
  function portrait(who, mood) {
    const draw = CHAR[who] || CHAR.max;
    const yOff = { max: 130, bolt: 78, zoe: 150, cat: 48, dull: 172, mom: 164 }[who] || 130;
    return `<svg viewBox="-34 -34 68 68" class="portrait" xmlns="http://www.w3.org/2000/svg"><clipPath id="pc"><circle r="33"/></clipPath>
      <g clip-path="url(#pc)"><circle r="34" fill="${{ max: HERO.gender === "girl" ? "#ffd1e8" : "#ffe66d", bolt: "#7fe0ff", zoe: "#f4b6ff", cat: "#ffd9a0", dull: "#d0d0d0", mom: "#ffc9b8" }[who] || "#eee"}"/>
      <g transform="translate(0 ${yOff}) scale(1.05)">${draw(mood || "happy", "down")}</g></g></svg>`;
  }

  const NAMES = { max: "Max", bolt: "Bolt", zoe: "Zoe", cat: "Mr. Whiskers", dull: "Dr. Dullsworth", mom: "Mom", narrator: "" };

  window.Art = { panel, portrait, NAMES, setHero, HERO, BG: Object.keys(BG), CHARS: Object.keys(CHAR) };
})();
