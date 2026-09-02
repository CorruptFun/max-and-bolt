# Max & Bolt — Reading Adventures

A comic-book reading PWA that grows with the reader from 1st grade to 7th grade. Max is a backyard
inventor; Bolt is the robot raccoon he built from a toaster. Seven "Seasons" map to grades 1–7 — each
season's stories are written to that grade's sentence structures, vocabulary, and word counts.

**Every story:** comic panels · tap any word to hear it · dotted vocab words open a definition card ·
a reading timer (words per minute vs. the grade's fluency goal) · math problems that gate the plot ·
a 3-question quiz for stars · XP, ranks, stickers, and a day streak.

**Adaptive math:** every reader has a math level across 15 bands (counting to 5 → money with decimals).
After each story's own math a "bonus part" is generated at that level; three first-try rights climb a band,
a miss eases half a band. **Bolt's Workshop:** a 60-second blast at the adaptive level (or any fixed band).
**Reader profiles:** several kids on one device, each with their own name, progress, hero (Max or Maxie),
and look (classic or pink). **Season 0 "First Words"** is a Pre-K on-ramp: 2–4 word pages, counting to 5.
**Word Vault:** the words tapped for help and the vocab collected. **Parents (⚙️, gated by a times-table
question):** WPM trend chart, quiz / math accuracy, 14-day activity, most-tapped words, a level
recommendation, math-level easier/harder, unlock override, hero/theme/start settings, toggles, and a
copy-paste save code to move a reader between devices.

Vanilla HTML/CSS/JS, no build step, no dependencies, works offline once installed.

## Run locally
```bash
python3 dev-server.py 5188      # serves with no-store; plain http.server serves stale JS
```
The service worker caches assets stale-while-revalidate, so after editing a JS file **reload twice**
(or unregister the worker in DevTools → Application) to see the change.

## Deploy (GitHub Pages)
Live at https://corruptfun.github.io/max-and-bolt/ (repo `CorruptFun/max-and-bolt`, Pages on `main`).
```bash
scripts/deploy.sh "What changed"
```
It bumps the service-worker version, stamps every `?v=` asset URL, syntax-checks, commits, and pushes.

## Adding a story
Append to the right `js/stories/s<N>.js`. A story is `{ id, season, num, title, blurb, cover, vocab,
pages, quiz }`. A page is either `{ art, lines: [{ n: "narration" } | { w: "max", t: "speech" }] }` or
`{ art, math: { intro, q, answer, choices, hint, success } }`. `art` is a panel spec —
`{ bg, cast: [{ who, mood, pose, x, y, scale, flip }], props: [{ e: "🚀", x, y, s, r }], fx, bubble }`.
Write pronouns that refer to the hero as `{he} {He} {his} {His} {him} {himself} {son}` — they render as
she/her for a girl-hero profile, and every bare `Max` becomes the profile's hero name automatically.
Pronouns for Bolt, the cat, Dr. Dullsworth etc. stay plain. See `BRIEF.md` for the writing rules per
season and the full art vocabulary. Add a sticker emoji for the new id in `js/content.js` → `STICKERS`.

Regenerate icons after editing `scripts/icon.svg`: `scripts/make-icons.sh` (needs `brew install librsvg`).
