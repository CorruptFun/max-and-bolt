# Max & Bolt — notes for agents
- Read `BRIEF.md` first (cast, season ladder, art vocabulary, rules). Vault note: `01_Projects/Max & Bolt.md`.
- No build step. Run with `python3 dev-server.py 5188` (no-store). After editing JS, reload **twice** — the
  service worker is stale-while-revalidate — or the fix will look like a no-op.
- Hero pronouns in story text are tokens (`{he} {his} {him} {son}`) — never write bare he/his for the hero;
  Bolt/cat/neighbor pronouns stay plain. Every bare `Max` is substituted with the profile's hero name.
- Stories: `js/stories/s<N>.js`, one file per season/grade (s0 = Pre-K). Keep the season's sentence shape and word
  budget from BRIEF.md. Every story has ≥1 in-plot math page, 3 quiz questions (one inference), 4–6 vocab.
- Kid screens stay big-button and low-text; analytics go behind the parent gate only.
- Deploy: `scripts/deploy.sh "msg"` (bumps SW version + stamps asset URLs; push to main is the deploy).
- Panel props are drawn SVG in `js/props.js` (`{ p: "name" }`, or `hat:` on a character) — no emoji in art.
  New emoji in a story spec = add a drawing + an `EMOJI` entry, never ship the glyph.
- Icons: edit `scripts/icon.svg`, run `scripts/make-icons.sh`.
- Family app: **no farm theming** (Austin's standing rule).
