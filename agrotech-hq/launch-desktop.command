#!/bin/bash
PROJECT_DIR="/Users/danielsantander/Documents/Agrotech/agrotech-hq"
PORT=7770

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/danielsantander/.gemini/antigravity/bin:/Users/danielsantander/Library/Application Support/Antigravity/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity-ide/antigravity-ide/bin:/Users/danielsantander/.antigravity/antigravity/bin:/Applications/Wine Stable.app/Contents/Resources/wine/bin:/Applications/Wine Stable.app/Contents/Resources/wine/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/opt/X11/bin:/opt/homebrew/bin"

NODE_BIN=""
if command -v node > /dev/null 2>&1; then
  NODE_BIN="/opt/homebrew/bin/node"
elif [ -x "/opt/homebrew/bin/node" ]; then
  NODE_BIN="/opt/homebrew/bin/node"
elif [ -x "/usr/local/bin/node" ]; then
  NODE_BIN="/usr/local/bin/node"
fi

cd "" || exit 1

if curl -s "http://localhost:" > /dev/null 2>&1; then
  open "http://localhost:"
  exit 0
fi

if [ -n "" ]; then
  "" "/server.cjs" > /tmp/agrotech_7770.log 2>&1 &
fi

for i in {1..20}; do
  if curl -s "http://localhost:" > /dev/null 2>&1; then
    break
  fi
  sleep 0.2
done

open "http://localhost:"
