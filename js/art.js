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

  /* ---------- characters (v2: rounder "chibi" look — big heads, soft bodies, sparkly eyes) ---------- */
  const INK = "#2b2a33";
  const SW = 3;
  const DEFS = `<defs>
    <linearGradient id="mtl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef1f6"/><stop offset="1" stop-color="#b7bfcc"/></linearGradient>
    <linearGradient id="mtlD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d7688"/><stop offset="1" stop-color="#4a5262"/></linearGradient>
    <radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#b8ffd2"/><stop offset=".55" stop-color="#3cff7a"/><stop offset="1" stop-color="#17c95a"/></radialGradient>
  </defs>`;

  const eye = (cx, cy, rx, ry, px, py) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${INK}" stroke-width="2.2"/>
    <circle cx="${cx + (px || 0)}" cy="${cy + (py || 1)}" r="${rx * .55}" fill="${INK}"/><circle cx="${cx + (px || 0) - rx * .2}" cy="${cy + (py || 1) - ry * .3}" r="${rx * .22}" fill="#fff"/>`;
  const arc = (cx, cy, w, up) => `<path d="M${cx - w} ${cy} Q${cx} ${cy + (up ? -w * 1.3 : w * 1.3)} ${cx + w} ${cy}" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const blush = `<circle cx="-19" cy="9" r="5" fill="#ff8aa8" opacity=".45"/><circle cx="19" cy="9" r="5" fill="#ff8aa8" opacity=".45"/>`;

  /* human face, relative to head centre, head radius 30 */
  function face(mood) {
    const open = eye(-11, -2, 7.5, 8.5) + eye(11, -2, 7.5, 8.5);
    const wide = eye(-11, -2, 8.5, 9.5, 0, 0) + eye(11, -2, 8.5, 9.5, 0, 0);
    const happyEyes = arc(-11, -2, 7, true) + arc(11, -2, 7, true);
    const closed = arc(-11, -1, 7, false) + arc(11, -1, 7, false);
    const sly = `<path d="M-18 -8 L-4 -8" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M4 -8 L18 -8" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>` + eye(-11, 0, 7, 5.5) + eye(11, 0, 7, 5.5);
    const browMad = `<path d="M-19 -15 L-5 -10 M19 -15 L5 -10" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`;
    const browWorry = `<path d="M-19 -11 L-5 -15 M19 -11 L5 -15" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`;
    const browUp = `<path d="M-18 -16 Q-11 -20 -4 -16 M18 -16 Q11 -20 4 -16" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    const smile = `<path d="M-9 12 Q0 21 9 12" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
    const grin = `<path d="M-12 10 Q0 27 12 10Z" fill="#d94a63" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-8 11.5 Q0 15 8 11.5" fill="#fff"/>`;
    const bigLaugh = `<path d="M-13 9 Q0 30 13 9Z" fill="#d94a63" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/><path d="M-9 11 Q0 15 9 11" fill="#fff"/><ellipse cx="0" cy="21" rx="6" ry="3" fill="#ff8aa8"/>`;
    const oh = `<ellipse cx="0" cy="15" rx="5.5" ry="7" fill="#d94a63" stroke="${INK}" stroke-width="2.6"/>`;
    const frown = `<path d="M-8 18 Q0 11 8 18" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
    const flat = `<path d="M-7 15 L7 14" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`;
    const smirk = `<path d="M-8 13 Q3 21 12 10" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
    const m = {
      happy: open + smile, excited: happyEyes + grin, surprised: browUp + wide + oh, worried: browWorry + open + frown,
      mad: browMad + open + frown, sly: sly + smirk, sleepy: closed + `<ellipse cx="0" cy="15" rx="4" ry="4.5" fill="#d94a63" stroke="${INK}" stroke-width="2.2"/>`,
      think: open + flat, laugh: happyEyes + bigLaugh, love: open + smile,
    };
    return blush + (m[mood] || m.happy);
  }

  /* arms: soft curves from the shoulders. pose → [left end, right end] relative to shoulder (x mirrored for left). */
  const POSES = {
    down: [[-6, 34], [6, 34]], up: [[-18, -34], [18, -34]], point: [[-6, 34], [36, -10]], think: [[-6, 34], [-6, -12]],
    wave: [[-6, 34], [26, -30]], hips: [[-18, 24], [18, 24]], run: [[-20, -10], [24, 14]], hold: [[-2, 30], [2, 30]], cheer: [[-28, -26], [28, -26]],
  };
  function arms(pose, skin, sleeve, sx, sy, hand) {
    const [l, r] = POSES[pose] || POSES.down;
    const one = (x0, y0, dx, dy) => {
      const ex = x0 + dx, ey = y0 + dy, cx = x0 + dx * .3 + (dx > 0 ? 6 : -6), cy = y0 + dy * .6 + 6;
      const d = `M${x0} ${y0} Q${cx} ${cy} ${ex} ${ey}`;
      return `<path d="${d}" stroke="${INK}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${sleeve}" stroke-width="9" fill="none" stroke-linecap="round"/>
        <circle cx="${ex}" cy="${ey}" r="${hand || 7}" fill="${skin}" stroke="${INK}" stroke-width="2.4"/>`;
    };
    return one(-sx, sy, l[0], l[1]) + one(sx, sy, r[0], r[1]);
  }

  /* generic human: feet at (0,0). o = { skin, top, bottom, shoe, hair(behind|front), headY, bodyTop, bodyBot, w, legH } */
  function human(o, mood, pose) {
    const w = o.w || 22, bt = o.bodyTop, bb = o.bodyBot, hy = o.headY, legH = o.legH || 22;
    const body = `M${-w} ${bt} Q${-w - 5} ${bb} ${-w + 7} ${bb} L${w - 7} ${bb} Q${w + 5} ${bb} ${w} ${bt} Q0 ${bt - 8} ${-w} ${bt}Z`;
    return `
      <g>
        ${o.hairBack || ""}
        ${arms(pose, o.skin, o.top, w - 3, bt + 10)}
        <rect x="${-w + 3}" y="${bb - 4}" width="${w - 5}" height="${legH}" rx="8" fill="${o.bottom}" stroke="${INK}" stroke-width="${SW}"/>
        <rect x="2" y="${bb - 4}" width="${w - 5}" height="${legH}" rx="8" fill="${o.bottom}" stroke="${INK}" stroke-width="${SW}"/>
        <ellipse cx="${-w / 2 - 1}" cy="-5" rx="${w / 2 + 3}" ry="6.5" fill="${o.shoe}" stroke="${INK}" stroke-width="${SW}"/>
        <ellipse cx="${w / 2 + 1}" cy="-5" rx="${w / 2 + 3}" ry="6.5" fill="${o.shoe}" stroke="${INK}" stroke-width="${SW}"/>
        <path d="${body}" fill="${o.top}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
        ${o.chest || ""}
        <circle cx="0" cy="${hy}" r="30" fill="${o.skin}" stroke="${INK}" stroke-width="${SW}"/>
        <ellipse cx="-11" cy="${hy - 13}" rx="9" ry="5" fill="#fff" opacity=".28"/>
        ${o.hairFront || ""}
        <g transform="translate(0 ${hy})">${face(mood)}</g>
        ${o.extra || ""}
      </g>`;
  }

  const HERO = { gender: "boy", name: "Max" };
  function setHero(h) { HERO.gender = h.gender === "girl" ? "girl" : "boy"; HERO.name = h.name || (HERO.gender === "girl" ? "Maxie" : "Max"); NAMES.max = HERO.name; }

  const CHAR = {
    max(mood, pose) {
      const girl = HERO.gender === "girl";
      const skin = "#f8d3b0", hy = -95;
      const hairC = "#ee8a2e";
      const hairFront = girl
        ? `<path d="M-31 ${hy - 4} Q-30 ${hy - 40} 0 ${hy - 38} Q30 ${hy - 40} 31 ${hy - 4} Q22 ${hy - 26} 4 ${hy - 20} Q-6 ${hy - 26} -31 ${hy - 4}Z" fill="${hairC}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
           <circle cx="-33" cy="${hy - 6}" r="6" fill="#ff5e9e" stroke="${INK}" stroke-width="2.2"/><circle cx="33" cy="${hy - 6}" r="6" fill="#ff5e9e" stroke="${INK}" stroke-width="2.2"/>`
        : `<path d="M-30 ${hy - 6} Q-34 ${hy - 30} -20 ${hy - 36} Q-14 ${hy - 46} -4 ${hy - 36} Q4 ${hy - 50} 12 ${hy - 36} Q24 ${hy - 44} 26 ${hy - 28} Q34 ${hy - 26} 30 ${hy - 6} Q22 ${hy - 24} 8 ${hy - 20} Q-8 ${hy - 26} -30 ${hy - 6}Z" fill="${hairC}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`;
      const hairBack = girl
        ? `<path d="M-30 ${hy - 8} Q-52 ${hy} -44 ${hy + 36} Q-36 ${hy + 44} -32 ${hy + 12}Z" fill="${hairC}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
           <path d="M30 ${hy - 8} Q52 ${hy} 44 ${hy + 36} Q36 ${hy + 44} 32 ${hy + 12}Z" fill="${hairC}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`
        : "";
      const bolt = `<path d="M-1 -60 L7 -60 L1 -48 L9 -48 L-5 -30 L-1 -42 L-9 -42Z" fill="#ffe66d" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`;
      return human({ skin, top: girl ? "#ff6fae" : "#3fb64f", bottom: girl ? "#8e44ad" : "#3a6cc8", shoe: "#e5473d", headY: hy, bodyTop: -68, bodyBot: -26, w: 22, hairFront, hairBack, chest: bolt,
        extra: `<circle cx="-15" cy="${hy + 9}" r="1.3" fill="#d29a6b"/><circle cx="-20" cy="${hy + 6}" r="1.3" fill="#d29a6b"/><circle cx="16" cy="${hy + 9}" r="1.3" fill="#d29a6b"/><circle cx="21" cy="${hy + 6}" r="1.3" fill="#d29a6b"/>` }, mood, pose);
    },
    zoe(mood, pose) {
      const skin = "#eec39a", hy = -112, hair = "#4a2c1a";
      return human({ skin, top: "#9b59d0", bottom: "#2c3e50", shoe: "#fff", headY: hy, bodyTop: -84, bodyBot: -32, w: 22, legH: 24,
        hairBack: `<path d="M26 ${hy - 12} Q56 ${hy - 20} 50 ${hy + 24} Q42 ${hy + 46} 30 ${hy + 16}Z" fill="${hair}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`,
        hairFront: `<path d="M-31 ${hy - 2} Q-32 ${hy - 40} 0 ${hy - 38} Q32 ${hy - 40} 31 ${hy - 2} Q24 ${hy - 22} 10 ${hy - 18} Q-4 ${hy - 28} -31 ${hy - 2}Z" fill="${hair}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
                    <circle cx="30" cy="${hy - 8}" r="5" fill="#ffd93d" stroke="${INK}" stroke-width="2"/>`,
        chest: `<path d="M-22 -76 Q0 -62 22 -76" stroke="#7a3fa8" stroke-width="3" fill="none"/><rect x="-9" y="-52" width="18" height="16" rx="5" fill="#7a3fa8" stroke="${INK}" stroke-width="2.2"/>` }, mood, pose);
    },
    mom(mood, pose) {
      const skin = "#f8d3b0", hy = -118, hair = "#e0771a";
      return human({ skin, top: "#ff7a59", bottom: "#5c6bc0", shoe: "#2b2a33", headY: hy, bodyTop: -90, bodyBot: -40, w: 22, legH: 28,
        hairBack: `<path d="M-32 ${hy + 4} Q-38 ${hy - 44} 0 ${hy - 40} Q38 ${hy - 44} 32 ${hy + 4} L28 ${hy + 24} Q0 ${hy + 30} -28 ${hy + 24}Z" fill="${hair}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`,
        hairFront: `<path d="M-31 ${hy - 4} Q-28 ${hy - 40} 0 ${hy - 38} Q28 ${hy - 40} 31 ${hy - 4} Q20 ${hy - 22} 0 ${hy - 18} Q-20 ${hy - 22} -31 ${hy - 4}Z" fill="${hair}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`,
        chest: `<circle cx="0" cy="-70" r="3" fill="#fff" opacity=".7"/><circle cx="0" cy="-58" r="3" fill="#fff" opacity=".7"/>` }, mood, pose);
    },
    dull(mood, pose) {
      const skin = "#eccfa8", hy = -126;
      const m = mood === "happy" ? "think" : mood;
      return human({ skin, top: "#6b6f7a", bottom: "#4a4d57", shoe: "#1f1f26", headY: hy, bodyTop: -96, bodyBot: -42, w: 19, legH: 30,
        hairFront: `<path d="M-30 ${hy - 4} Q-30 ${hy - 26} -14 ${hy - 28} L-14 ${hy - 14} Q-24 ${hy - 12} -30 ${hy - 4}Z M30 ${hy - 4} Q30 ${hy - 26} 14 ${hy - 28} L14 ${hy - 14} Q24 ${hy - 12} 30 ${hy - 4}Z" fill="#b8bcc6" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/>`,
        chest: `<path d="M-4 -96 L0 -66 L4 -96Z" fill="#c62828" stroke="${INK}" stroke-width="1.6"/>`,
        extra: `<g transform="translate(0 ${hy})"><path d="M-13 9 Q-7 3 0 9 Q7 3 13 9 Q7 12 0 10.5 Q-7 12 -13 9Z" fill="#6b6f7a" stroke="${INK}" stroke-width="1.6"/>
                <rect x="-22" y="-12" width="17" height="12" rx="4" fill="none" stroke="${INK}" stroke-width="2"/><rect x="5" y="-12" width="17" height="12" rx="4" fill="none" stroke="${INK}" stroke-width="2"/><path d="M-5 -6 L5 -6" stroke="${INK}" stroke-width="2"/></g>` }, m, pose);
    },
    bolt(mood, pose) {
      const hy = -94;
      const E = (dx, cy, r) => `<circle cx="${dx}" cy="${cy}" r="${r}" fill="url(#glow)"/><circle cx="${dx - r * .35}" cy="${cy - r * .35}" r="${r * .3}" fill="#fff" opacity=".9"/>`;
      const eyes = {
        happy: E(-11, 0, 7) + E(11, 0, 7) + `<path d="M-6 13 Q0 19 6 13" stroke="#3cff7a" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
        excited: `<path d="M-18 1 Q-11 -9 -4 1" stroke="#3cff7a" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M4 1 Q11 -9 18 1" stroke="#3cff7a" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M-9 10 Q0 22 9 10Z" fill="#3cff7a"/>`,
        surprised: E(-11, 0, 9) + E(11, 0, 9) + `<circle cx="0" cy="15" r="4.5" fill="#3cff7a"/>`,
        worried: `<circle cx="-11" cy="0" r="7" fill="#ffd166"/><circle cx="11" cy="0" r="7" fill="#ffd166"/><circle cx="-13" cy="-2" r="2" fill="#fff"/><circle cx="9" cy="-2" r="2" fill="#fff"/><path d="M-6 17 Q0 11 6 17" stroke="#ffd166" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
        mad: `<path d="M-18 -8 L-5 -3 M18 -8 L5 -3" stroke="#ff5252" stroke-width="3.2" stroke-linecap="round"/><circle cx="-11" cy="2" r="5.5" fill="#ff5252"/><circle cx="11" cy="2" r="5.5" fill="#ff5252"/><path d="M-6 17 Q0 11 6 17" stroke="#ff5252" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
        sly: `<rect x="-18" y="-2" width="14" height="4.5" rx="2" fill="#3cff7a"/><rect x="4" y="-2" width="14" height="4.5" rx="2" fill="#3cff7a"/><path d="M-6 11 Q3 18 9 9" stroke="#3cff7a" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
        sleepy: `<path d="M-18 0 Q-11 7 -4 0 M4 0 Q11 7 18 0" stroke="#3cff7a" stroke-width="3.2" fill="none" stroke-linecap="round"/><text x="20" y="-16" font-size="13" fill="#3cff7a" font-family="Bangers,Impact,sans-serif">z</text>`,
        think: E(-11, 0, 7) + E(11, 0, 7) + `<rect x="-5" y="13" width="10" height="2.6" rx="1.3" fill="#3cff7a"/>`,
        laugh: `<path d="M-18 1 Q-11 -9 -4 1" stroke="#3cff7a" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M4 1 Q11 -9 18 1" stroke="#3cff7a" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M-11 9 Q0 24 11 9Z" fill="#3cff7a"/>`,
        love: `<text x="-19" y="6" font-size="16">❤</text><text x="3" y="6" font-size="16">❤</text><path d="M-6 13 Q0 19 6 13" stroke="#3cff7a" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
      };
      const tail = `M-22 -34 Q-64 -30 -54 -76`;
      return `
        <g>
          <path d="${tail}" stroke="${INK}" stroke-width="19" fill="none" stroke-linecap="round"/>
          <path d="${tail}" stroke="url(#mtl)" stroke-width="14" fill="none" stroke-linecap="round"/>
          ${[.3, .6, .88].map((t) => { const x = -22 + (-54 + 22) * t - 12 * Math.sin(t * 3), y = -34 + (-76 + 34) * t + 10; return `<ellipse cx="${x}" cy="${y}" rx="7.5" ry="6" fill="url(#mtlD)"/>`; }).join("")}
          ${arms(pose, "#d7dde8", "#5b6472", 24, -48, 7.5)}
          <rect x="-13" y="-8" width="16" height="10" rx="5" fill="url(#mtlD)" stroke="${INK}" stroke-width="2.4"/><rect x="-3" y="-8" width="16" height="10" rx="5" fill="url(#mtlD)" stroke="${INK}" stroke-width="2.4"/>
          <path d="M-26 -60 Q-32 -10 0 -6 Q32 -10 26 -60 Q0 -72 -26 -60Z" fill="url(#mtl)" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
          <rect x="-13" y="-52" width="26" height="22" rx="7" fill="#eaf6ff" stroke="${INK}" stroke-width="2.2"/>
          <path d="M-9 -38 L-4 -44 L0 -36 L4 -46 L9 -40" stroke="#3cff7a" stroke-width="2" fill="none" stroke-linecap="round"/>
          <circle cx="0" cy="-20" r="5.5" fill="#ff5e5e" stroke="${INK}" stroke-width="2.2"/><circle cx="-1.5" cy="-21.5" r="1.6" fill="#fff" opacity=".8"/>
          <g transform="translate(0 ${hy})">
            <line x1="0" y1="-26" x2="0" y2="-40" stroke="${INK}" stroke-width="3"/><circle cx="0" cy="-44" r="5.5" fill="#ffd166" stroke="${INK}" stroke-width="2.2"/><circle cx="-1.5" cy="-45.5" r="1.8" fill="#fff" opacity=".9"/>
            <path d="M-30 -12 Q-36 -32 -18 -30 Q-10 -26 -12 -18Z M30 -12 Q36 -32 18 -30 Q10 -26 12 -18Z" fill="url(#mtl)" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
            <path d="M-26 -10 Q-22 -28 0 -28 Q22 -28 26 -10 Q30 8 24 20 Q12 28 0 28 Q-12 28 -24 20 Q-30 8 -26 -10Z" fill="url(#mtl)" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
            <path d="M-27 -6 Q-14 -18 -2 -8 L0 -6 L2 -8 Q14 -18 27 -6 Q28 6 24 10 Q12 14 2 8 L0 6 L-2 8 Q-12 14 -24 10 Q-28 6 -27 -6Z" fill="#2c3440" stroke="${INK}" stroke-width="2"/>
            <ellipse cx="0" cy="18" rx="6" ry="4" fill="#2c3440"/><ellipse cx="-2" cy="17" rx="2" ry="1.2" fill="#fff" opacity=".6"/>
            <ellipse cx="-12" cy="-16" rx="7" ry="3.5" fill="#fff" opacity=".35"/>
            ${eyes[mood] || eyes.happy}
          </g>
        </g>`;
    },
    cat(mood) {
      const O = "#f5a742", D = "#d9822b";
      const e = mood === "sly" ? `<path d="M-14 -3 L-4 -3 M4 -3 L14 -3" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` :
        mood === "surprised" ? eye(-9, -3, 7, 7.5, 0, 0) + eye(9, -3, 7, 7.5, 0, 0) :
          `<ellipse cx="-9" cy="-3" rx="6" ry="6.5" fill="#c8e64c" stroke="${INK}" stroke-width="2.2"/><ellipse cx="9" cy="-3" rx="6" ry="6.5" fill="#c8e64c" stroke="${INK}" stroke-width="2.2"/><ellipse cx="-9" cy="-3" rx="2" ry="4.5" fill="${INK}"/><ellipse cx="9" cy="-3" rx="2" ry="4.5" fill="${INK}"/><circle cx="-10.5" cy="-5" r="1.4" fill="#fff"/><circle cx="7.5" cy="-5" r="1.4" fill="#fff"/>`;
      return `
        <g>
          <path d="M22 -14 Q54 -12 46 -46" stroke="${INK}" stroke-width="13" fill="none" stroke-linecap="round"/>
          <path d="M22 -14 Q54 -12 46 -46" stroke="${O}" stroke-width="9" fill="none" stroke-linecap="round"/>
          <path d="M32 -14 Q36 -20 30 -22 M40 -24 Q46 -28 42 -34" stroke="${D}" stroke-width="3" fill="none" stroke-linecap="round"/>
          <ellipse cx="0" cy="-18" rx="30" ry="18" fill="${O}" stroke="${INK}" stroke-width="${SW}"/>
          <path d="M-8 -34 Q-2 -26 2 -34 M8 -32 Q14 -24 18 -32" stroke="${D}" stroke-width="3" fill="none" stroke-linecap="round"/>
          ${[-18, -6, 6, 18].map((x) => `<ellipse cx="${x}" cy="-4" rx="6" ry="5" fill="${O}" stroke="${INK}" stroke-width="2.2"/>`).join("")}
          <g transform="translate(-6 -44)">
            <path d="M-22 -8 Q-26 -32 -6 -22Z M22 -8 Q26 -32 6 -22Z" fill="${O}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
            <path d="M-19 -10 Q-20 -24 -9 -18Z M19 -10 Q20 -24 9 -18Z" fill="#ffc9a3"/>
            <circle cx="0" cy="0" r="24" fill="${O}" stroke="${INK}" stroke-width="${SW}"/>
            <path d="M-12 -20 Q-9 -12 -6 -18 M12 -20 Q9 -12 6 -18 M0 -24 Q0 -16 2 -20" stroke="${D}" stroke-width="3" fill="none" stroke-linecap="round"/>
            <ellipse cx="-9" cy="-9" rx="7" ry="3.5" fill="#fff" opacity=".3"/>
            ${e}
            <path d="M-3.5 6 L3.5 6 L0 10Z" fill="#e57373" stroke="${INK}" stroke-width="1.5"/>
            <path d="M0 10 Q-5 15 -9 12 M0 10 Q5 15 9 12" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M-24 4 L-36 2 M-24 8 L-36 10 M24 4 L36 2 M24 8 L36 10" stroke="${INK}" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="-16" cy="6" r="4" fill="#ff8aa8" opacity=".4"/><circle cx="16" cy="6" r="4" fill="#ff8aa8" opacity=".4"/>
            <path d="M-34 -18 Q0 -26 34 -18 Q34 -14 30 -13 Q0 -20 -30 -13 Q-34 -14 -34 -18Z" fill="#2c3e50" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M-22 -20 L-19 -40 Q0 -50 19 -40 L22 -20 Q0 -26 -22 -20Z" fill="#2c3e50" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M-20 -28 Q0 -33 20 -28" stroke="#e74c3c" stroke-width="4" fill="none"/>
            <path d="M-8 -44 Q0 -48 6 -44" stroke="#5d6d7e" stroke-width="2" fill="none"/>
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
    return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="panel-art" role="img" aria-label="${esc(spec.alt || "comic panel")}">${DEFS}
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
    const yOff = { max: 95, bolt: 94, zoe: 112, cat: 44, dull: 126, mom: 118 }[who] || 95;
    return `<svg viewBox="-34 -34 68 68" class="portrait" xmlns="http://www.w3.org/2000/svg">${DEFS}<clipPath id="pc"><circle r="33"/></clipPath>
      <g clip-path="url(#pc)"><circle r="34" fill="${{ max: HERO.gender === "girl" ? "#ffd1e8" : "#ffe66d", bolt: "#7fe0ff", zoe: "#f4b6ff", cat: "#ffd9a0", dull: "#d0d0d0", mom: "#ffc9b8" }[who] || "#eee"}"/>
      <g transform="translate(0 ${yOff * .9}) scale(.9)">${draw(mood || "happy", "down")}</g></g></svg>`;
  }

  const NAMES = { max: "Max", bolt: "Bolt", zoe: "Zoe", cat: "Mr. Whiskers", dull: "Dr. Dullsworth", mom: "Mom", narrator: "" };

  window.Art = { panel, portrait, NAMES, setHero, HERO, BG: Object.keys(BG), CHARS: Object.keys(CHAR), draw: (who, mood, pose) => (CHAR[who] || CHAR.max)(mood || "happy", pose || "down"), defs: DEFS };
})();
