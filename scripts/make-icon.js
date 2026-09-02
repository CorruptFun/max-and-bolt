// Builds scripts/icon.svg from the live character art (Max + Bolt), then run scripts/make-icons.sh to rasterise.
global.window = {}; require("../js/art.js"); const A = global.window.Art;
const fs = require("fs"), path = require("path");
A.setHero({ gender: "boy", name: "Max" });
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${A.defs}
  <defs>
    <linearGradient id="bgy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#ffb800"/></linearGradient>
    <clipPath id="disc"><circle cx="256" cy="268" r="196"/></clipPath>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bgy)"/>
  <g fill="#fff" opacity=".55">${[[60, 70, 10], [452, 96, 8], [86, 430, 7], [440, 420, 9]].map(([x, y, r]) => `<path d="M${x} ${y - r * 2} L${x + r * .6} ${y - r * .6} L${x + r * 2} ${y} L${x + r * .6} ${y + r * .6} L${x} ${y + r * 2} L${x - r * .6} ${y + r * .6} L${x - r * 2} ${y} L${x - r * .6} ${y - r * .6}Z"/>`).join("")}</g>
  <circle cx="256" cy="268" r="196" fill="#fff8e7" stroke="#2b2a33" stroke-width="12"/>
  <circle cx="256" cy="268" r="196" fill="#7fd4ff" opacity=".35"/>
  <g clip-path="url(#disc)">
    <ellipse cx="256" cy="470" rx="260" ry="80" fill="#79c94b"/>
    <g transform="translate(166 458) scale(2.35)">${A.draw("max", "excited", "cheer")}</g>
    <g transform="translate(352 466) scale(-2.25 2.25)">${A.draw("bolt", "excited", "wave")}</g>
  </g>
  <circle cx="256" cy="268" r="196" fill="none" stroke="#2b2a33" stroke-width="12"/>
</svg>`;
fs.writeFileSync(path.join(__dirname, "icon.svg"), svg);
console.log("icon.svg written");
