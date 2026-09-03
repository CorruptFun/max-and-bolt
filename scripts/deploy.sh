#!/usr/bin/env bash
# Deploy Max & Bolt to GitHub Pages. Bumps sw.js CACHE_VERSION (fires the "New version ready" nudge),
# stamps every ?v= asset URL so nothing can be served stale, commits, and pushes to main (push = deploy).
#   scripts/deploy.sh "Commit message"
set -euo pipefail
cd "$(dirname "$0")/.."
MSG="${1:-Deploy: ship latest build}"
STAMP="$(date +%Y%m%d-%H%M%S)"
sed -i.bak -E "s/const CACHE_VERSION *= *\"[^\"]*\";/const CACHE_VERSION = \"${STAMP}\";/; s/const ASSET_VERSION *= *\"[^\"]*\";/const ASSET_VERSION  = \"${STAMP}\";/" sw.js
sed -i.bak -E "s/\?v=[A-Za-z0-9-]+\"/?v=${STAMP}\"/g" index.html
rm -f sw.js.bak index.html.bak
STAMPED="$(grep -c "?v=${STAMP}\"" index.html || true)"
echo "→ CACHE_VERSION=${STAMP}, stamped ${STAMPED} asset URLs"
[ "${STAMPED}" -ge 15 ] || { echo "✗ expected 15 stamped URLs, found ${STAMPED} — aborting"; exit 1; }
node --check sw.js && node --check pwa-register.js && node --check js/app.js
git add -A
git diff --cached --quiet && { echo "Nothing to commit."; exit 0; }
git commit -m "${MSG}"
git pull --rebase --autostash
git push
echo "✅ Pushed. GitHub Pages rebuilds in ~1 min."
