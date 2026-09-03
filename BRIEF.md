# Max & Bolt — design brief

## Why
Austin's son (7) needs a reason to *want* to read. Calvin & Hobbes × Phineas and Ferb: a kid inventor,
a companion with a personality, a sister who busts them, a pet who is secretly a spy, a neighbor who hates
fun. Funny, adventurous, short. The app tracks fluency and comprehension without feeling like a test.

## Cast
- **Max / Maxie** — 7, backyard inventor, lightning shirt, red sneakers. Catchphrase energy: "I have an idea."
  The hero slot is per reader profile: boy (Max, green shirt, spiky hair) or girl (Maxie, pink shirt, pigtails).
  Story text marks hero pronouns as `{he} {his} {him} {son}` so both render correctly; `Max` is substituted.
- **Bolt** — robot raccoon built from a toaster. Loves shiny things ("Mine!"), has a magnet arm, a spoon
  obsession, a tail full of batteries. Brave in words, shaky in practice. Deadpan.
- **Zoe** — big sister (10). Purple hoodie, phone, "MOM!" Turns out to be the competent one every time.
- **Mr. Whiskers** — orange cat with a tiny fedora and headset. Runs a base under the shed. Card: "— W."
- **Dr. Dullsworth** — gray-house neighbor. Hates noise, fun, and children, in that order. Softens by S7.
- **Mom** — laughs first, asks questions later. (Also plays Ms. Perez in the art; same drawing.)

## Season ladder (one per grade)
| S | Grade | Sentence shape | Words/story | WPM goal | Math |
|---|---|---|---|---|---|
| 0 | Pre-K | 2–4 words a page, one idea, picture carries it | 20–40 | 30 | counting to 5 |
| 1 | 1st | 3–7 words, sight + CVC words, present tense | 80–95 | 60 | add/sub to 20 |
| 2 | 2nd | and/but/so, past tense, 2-syllable words | 140–190 | 100 | to 100, skip counting |
| 3 | 3rd | paragraphs, dialogue tags, adjectives, cause→effect | 270–290 | 112 | ×/÷ facts, simple fractions |
| 4 | 4th | because/although/while/until, inference | 360–420 | 133 | multi-digit ×, elapsed time, % |
| 5 | 5th | similes, longer paragraphs, mixed feelings | 430–460 | 146 | decimals, fractions of a whole |
| 6 | 6th | idioms, irony, varied openers | 460–520 | 150 | area, fractions of space, majority |
| 7 | 7th | grown-up vocab, flashback, narrator with attitude | ~625 | 155 | money decimals, fractions of qty |

Word counts include the math pages' text (it is read too). WPM goals are spring-of-grade oral reading fluency norms (Hasbrouck & Tindal), ~50th percentile.
The timer only runs on reading pages — math pages are thinking time.

## Reading, not listening
- The 🔊 whole-page voice is a *helper*: the "Help me" button only appears after a fair try at the page
  (about 3× the season's goal pace, 20–90 s; Pre-K gets it at once). Tapping a word always says it.
  Parents choose wait / always / never in the dashboard; every use is counted (`history[].helped`).
- ◀ goes back a page. Words count once per page; the clock runs on every visit. A solved math page stays solved.
- **The quiz is the proof of reading.** 2 of 3 first-try answers passes. Under that, or faster than 2.5× the grade's
  WPM goal (that's tapping NEXT, not reading), the story is *not done*: no sticker, no unlock, no first-finish bonus,
  and the results screen has one button — "Read it again". XP for the words still pays. Parents can switch the gate off.

## Spelling words (js/app.js SPELLING)
- A parent pastes the week's list from school (one per line, optional `word: hint sentence`) in the dashboard.
- Kid side: **Practice** = look at the word (🔊), hide it, build it from letter tiles (its letters + 2 look-alike
  decoys); wrong shows the fix letter by letter, then try again. **Test** = hear it (or read the hint), spell it on a
  26-key board, one shot per word; scored and kept in `spelling.tests[]` for the parent view.
- Mastery dots = times in a row spelled right (max 3). Spelling words glow inside stories; tapping one opens a
  spell-it-out card, and every one that appears in a story pays +5 XP at the end.

## Daily missions
Three a day on the home screen — read a story, pass a quiz with 2+ stars, practice 5 spelling words (or 5 math parts
when there's no list) — +50 XP the moment all three are done. Counted from `days[today]` (`stories pass spell math`).

## Rules that keep it fun
- Nothing is a fail state. Wrong answers get a hint and another try; stars are for first-try answers.
- Re-reading is rewarded (60% XP) — fluency comes from re-reads, and the parent view says so.
- Every story's math is *in* the plot (Bolt needs 6 bolts). Never a worksheet.
- Kid-facing screens are big-button, no dense text. Anything analytical lives behind the parent gate.
- No farm theming in the family apps (Austin's rule). Backyard, garage, treehouse, school, space, sea.

## Art style (v2, 2026-09-02)
Rounder "chibi" characters: head ≈ 45% of height, soft body blob, capsule legs, curved arms with round
hands, big white eyes with a highlight, blush, ink `#2b2a33` at 3px. Bolt uses `url(#mtl)` metal gradients
and `url(#glow)` eyes (defs are injected into every panel/portrait SVG). Every character is a function
`CHAR.who(mood, pose)` with feet at (0,0); humans share `human(o, mood, pose)`. The icon is composed from the
same art by `scripts/make-icon.js` → `scripts/icon.svg` → `scripts/make-icons.sh`.

## Art vocabulary (js/art.js)
- `bg`: yard garage tree room kitchen street park space sea night school lab jungle snow city stage cave
- `who`: max bolt zoe cat dull mom · `mood`: happy excited surprised worried mad sly sleepy think laugh
  (+ `love` for Bolt) · `pose`: down up point think wave hips run hold cheer
- `fx`: boom zap splat whoosh sparkle speed shake stink hearts rain dark · `bubble: {text,x,y}` for a
  sound word inside the panel.
- `props` (js/props.js): **drawn**, not emoji. `{ p: "balloon", c: "#4d96ff", x, y, s, r, flip }` — `p` is a name from
  `Props.P` (balloon bubble cup pancakes box pretzel bike clip lemon star flashlight spoon wheel cart frame bighat
  log coin teddy sock car rocket backpack volcano envelope cloud bucket soap duck robot robodog fire battery drop
  splash apple rock mud puddle mirror hole bell key phone dish clipboard ladybug house medal headset cookie leaf
  tent bulb bolt wrench hammer screwdriver toolbox trophy book books musicnote sun rainbow cake icecream question
  zzz boom lightning card dot number:3 …). An emoji `{ e: "🎈" }` still works — `Props.EMOJI` maps it to the
  drawing — but write new art with `p`. Anything unmapped falls back to the glyph; add a drawing instead.
- `hat` on a cast member sits a prop on their head: `{ who: "bolt", hat: "bighat", hatS: 84, hatC: "#e5473d" }`.
- x/y are percentages of a 400×300 panel; characters stand on `y` (default 92). Zoe/Dull are taller —
  use `scale:.8` on the treehouse.

## Adaptive math (js/content.js BANDS)
15 bands: Counting to 5 · Adding to 10 · ±20 · ±50 · to 100 & skip counting · ×÷ to 5 · ×÷ to 10 & halves ·
big multiplication · time & percent · decimals · fractions of a whole · percent & area · negatives ·
equations & ratios · money. `mathLevel` is a float; integer part = band. Story bonus: right +0.34, retry 0,
wrong −0.5. Workshop uses 0.6× / 0.8× of that (rapid fire). Season → start band: 0→0, 1→1, 2→3, 3→5, 4→7, 5→9, 6→11, 7→13.
Parents can nudge ± a band. In-story authored math stays at the season's level; the bonus part is where "harder" lives.

## Progress model (js/store.js, localStorage `maxbolt.v2` = { active, profiles })
per profile: name, hero, heroName, theme, startSeason, mathLevel, mathLog, xp, unlocked … then per story: reads, done, stars (best), bestWpm, lastWpm, quiz/math tallies, history[] · tapped{word:n} ·
vocab{word} · days{date:{words,seconds,stories,math}} · xp · unlocked (season) · stickers · workshop bests.
Next season unlocks when every story in the current one is finished once. Parents can override.
Saves are per device — the parent view has a copy/paste save code.
