#!/bin/bash
# ══════════════════════════════════════════════════════════════════════════
# AgroTech Launcher Engine (Ports 7770 - 7774)
# Garantiza: Cero Servidores Fantasma + Fuerza Recarga en Opera con Última Versión
# ══════════════════════════════════════════════════════════════════════════

PORT="$1"
NAME="$2"
SUBDIR="$3"
CMD="$4"

if [ -z "$PORT" ] || [ -z "$NAME" ]; then
    echo "Uso: $0 <port> <name> [subdir] [cmd]"
    exit 1
fi

BASE_DIR="/Users/danielsantander/Documents/Agrotech"
if [ -n "$SUBDIR" ] && [ "$SUBDIR" != "." ]; then
    TARGET_DIR="$BASE_DIR/$SUBDIR"
else
    TARGET_DIR="$BASE_DIR"
fi

# Configurar PATH en entornos macOS Finder
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
if [ -d "$HOME/.nvm/versions/node" ]; then
  LATEST_NVM=$(ls -d "$HOME/.nvm/versions/node"/* 2>/dev/null | tail -n 1)
  if [ -n "$LATEST_NVM" ]; then
    export PATH="$LATEST_NVM/bin:$PATH"
  fi
fi

# 1. ELIMINAR SERVIDORES FANTASMA
OLD_PIDS=$(lsof -ti :$PORT 2>/dev/null)
if [ -n "$OLD_PIDS" ]; then
    kill -9 $OLD_PIDS 2>/dev/null || true
    for _ in {1..20}; do
        if ! lsof -ti :$PORT >/dev/null 2>&1; then
            break
        fi
        sleep 0.1
    done
fi

cd "$TARGET_DIR" || exit 1

# 2. RESOLVER COMANDO DE INICIO SEGÚN PUERTO
if [ -z "$CMD" ]; then
    if [ "$PORT" = "7772" ]; then
        CMD="python3 server.py"
    elif [ -f "$TARGET_DIR/server.cjs" ]; then
        NODE_BIN="node"
        if [ -x "/opt/homebrew/bin/node" ]; then
            NODE_BIN="/opt/homebrew/bin/node"
        elif [ -x "/usr/local/bin/node" ]; then
            NODE_BIN="/usr/local/bin/node"
        fi
        CMD="$NODE_BIN server.cjs"
    else
        CMD="python3 -m http.server $PORT"
    fi
fi

# Caso especial 7771 (Web): Asegurar que dist esté compilado
if [ "$PORT" = "7771" ] && [ ! -f "$TARGET_DIR/dist/index.html" ]; then
    if command -v npm > /dev/null 2>&1; then
        npm run build > /tmp/agrotech_build.log 2>&1
    fi
fi

# 3. LANZAR SERVIDOR FRESCO Y LIMPIO (Desacoplado permanentemente bajo launchd)
osascript -e "do shell script \"cd '$TARGET_DIR' && $CMD > '/tmp/agrotech_${PORT}_server.log' 2>&1 &\""

# 4. ESPERAR RESPUESTA HTTP ACTIVA (Health Check)
READY=false
for _ in {1..30}; do
    CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:$PORT/" 2>/dev/null || echo "000")
    if [ "$CODE" = "200" ] || [ "$CODE" = "304" ] || [ "$CODE" = "302" ]; then
        READY=true
        break
    fi
    sleep 0.15
done

# 5. FORZAR ACTUALIZACIÓN EN OPERA (Evitar Caché de Navegador)
TIMESTAMP=$(date +%s)
TARGET_URL="http://localhost:${PORT}/?_t=${TIMESTAMP}"

osascript <<EOF
set targetPort to "${PORT}"
set targetUrl to "${TARGET_URL}"

tell application "System Events"
  set isOperaRunning to (count (every process whose bundle identifier is "com.operasoftware.Opera")) > 0
end tell

if isOperaRunning then
  tell application "Opera"
    activate
    set reloaded to false
    repeat with w in windows
      set tabCount to count of tabs of w
      repeat with tabIdx from 1 to tabCount
        set t to tab tabIdx of w
        set tabUrl to URL of t
        if tabUrl contains ("localhost:" & targetPort) or tabUrl contains ("127.0.0.1:" & targetPort) then
          set active tab index of w to tabIdx
          set URL of t to targetUrl
          reload t
          set reloaded to true
          exit repeat
        end if
      end repeat
      if reloaded then exit repeat
    end repeat
    if not reloaded then
      open location targetUrl
    end if
  end tell
else
  do shell script "open -a '/Applications/Opera.app' '" & targetUrl & "' 2>/dev/null || open '" & targetUrl & "'"
end if
EOF
