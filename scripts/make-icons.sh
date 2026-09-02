#!/usr/bin/env bash
# Rasterise scripts/icon.svg into every PNG the manifest + <head> reference. Needs: brew install librsvg
set -euo pipefail
cd "$(dirname "$0")/.."
for s in 192 512; do rsvg-convert -w $s -h $s scripts/icon.svg -o icon-$s.png; done
rsvg-convert -w 180 -h 180 scripts/icon.svg -o apple-touch-icon.png
rsvg-convert -w 64 -h 64 scripts/icon.svg -o favicon.png
# maskable: same art with extra safe-zone padding (icon shrunk to 80%)
sed 's|<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">|<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#ffd93d"/><g transform="translate(51 51) scale(0.8)">|; s|</svg>|</g></svg>|' scripts/icon.svg > /tmp/mb-maskable.svg
rsvg-convert -w 512 -h 512 /tmp/mb-maskable.svg -o icon-maskable-512.png
echo "icons written"
