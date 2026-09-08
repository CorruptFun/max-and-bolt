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

## Reading support (v1.2, 2026-09-08) — built for a reader who is behind
- **Sound it out** (`js/phonics.js`): tapping any word opens a card with the word in chunks — onset + rime for
  one-syllable words (b·ox, st·op, sh·ip), syllables for longer ones (rob·ot, bas·ket), endings peeled off
  (jump·ed, look·s, run·ning). Chunks light up as the voice says each, then slide together and the whole word is
  said. Sight words (the, said, was…) don't chunk — the card says "just know it". Plain words auto-close after the
  blend; vocab cards stay. Parent switch `settings.soundOut`. Hand-tuned splits live in `OVERRIDES`.
- **Echo reading**: on every reading page Bolt reads first (words highlight), NEXT is locked, then the strip flips
  to "🎤 Your turn!" and only then does the clock run. `settings.echo` = always | first (first read only) | off.
  Read-aloud always pauses the clock, so WPM is only ever the kid's own reading.
- **Race your ghost**: a story you've read before shows a 👻 gliding along the progress bar at your best pace.
  Beat it to the end → "🏁 You beat your ghost!" + 15 XP; the results gauge marks the old best.
- **Hear yourself** (`js/rec.js`): 🎙️ records a page (MediaRecorder → IndexedDB, device-only, newest 40 kept);
  stopping — or tapping NEXT — saves it and shows "▶ Hear yourself · 🔊 Hear Bolt". Parent dashboard lists and
  plays recordings. `settings.mic` hides the button.
- **Bolt, help!** (`js/mathhelp.js`): every story math page and bonus part has a help button. It reads the problem
  aloud, then infers a picture from the numbers + answer (count · a+b two groups · "needs 6, has 4" count-up ·
  "has 10, spills 3" take-away · a rows of b) and shows DRAG-AND-DROP manipulatives: items start in a pile and the kid
  drags them into Bolt's box (adding/counting), drags b of them out to Bolt's hands (taking away, then the rest are
  counted), or fills the empty spots in the box (count up). Bolt says each number as an item lands; tapping an item
  also moves it (drag fallback); dropping elsewhere snaps back. Ends on the total ("Now tap 2!"). Miss once → help opens by itself; miss twice → Bolt counts it out and the right choice
  pulses. Helped answers keep the star but don't move `mathLevel`. Totals > 30 or money answers → hint read aloud
  instead. Workshop shows a static counter picture under bands 0–2 questions. Echo reading also reads math pages.
- **Spelling Blast**: the parent types the week's school list (10–12 words; "there - The cat is over there."
  adds a sentence Bolt says for context). Kid side: Bolt says the word, kid builds it from letter tiles (+2–3
  decoys); hints 🔤 sound it out / 👀 peek (look-cover-write-check). Wrong = word shown + retry; two misses ghost
  the letters into the slots. Mastered = 3 first-tries in a row (✅). Words get a ⭐ wavy underline in every
  story, story cards show "⭐ N spelling", and the Spelling Blast screen lists stories that use them.
  Data: `profile.spelling = { week, words:[{w,s?}], log:{word:{right,wrong,streak}}, history[] }`.

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
  sound word inside the panel · `props`: any emoji at x/y (percent), size `s`, rotation `r`.
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
