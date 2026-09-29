#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AgroTech Universal Service Launcher Engine
Compatible con: macOS, Node.js, Python, Opera Browser
Servicios:
  7770: AgroTech HQ (Cockpit Central)
  7771: AgroTech Web Comercial
  7772: Rewild Suite
  7773: AgriTwin 1 Predial (3D)
  7774: AgroTwin 2 Territorial (GIS)

Garantías:
  1. Cero Servidores Fantasma: Detecta y elimina procesos zombis en el puerto.
  2. Desacoplamiento Total (setsid): El servidor se ejecuta como daemon permanente.
  3. Health Check: Verifica respuesta HTTP 200 activa.
  4. Fuerza Recarga en Opera: Activa Opera, localiza la pestaña o crea una nueva,
     inyecta parámetro anti-caché ?_t=timestamp y fuerza la recarga.
"""

import os
import sys
import time
import subprocess
import urllib.request
import urllib.error

SERVICES = {
    7770: {
        'name': 'AgroTech HQ',
        'subdir': 'agrotech-hq',
        'type': 'node',
        'script': 'server.cjs'
    },
    7771: {
        'name': 'AgroTech Web',
        'subdir': '.',
        'type': 'node',
        'script': 'server.cjs'
    },
    7772: {
        'name': 'Rewild Suite',
        'subdir': 'rewild',
        'type': 'python',
        'script': 'server.py'
    },
    7773: {
        'name': 'AgriTwin 3D',
        'subdir': 'agritwin',
        'type': 'node',
        'script': 'server.cjs'
    },
    7774: {
        'name': 'AgroTwin 2 Territorial',
        'subdir': 'agritwin-regional',
        'type': 'node',
        'script': 'server.cjs'
    }
}

BASE_DIR = '/Users/danielsantander/Documents/Agrotech'

def find_node():
    for p in ['/opt/homebrew/bin/node', '/usr/local/bin/node']:
        if os.path.exists(p) and os.access(p, os.X_OK):
            return p
    try:
        out = subprocess.check_output(['which', 'node'], text=True).strip()
        if out:
            return out
    except Exception:
        pass
    # NVM fallback
    nvm_dir = os.path.expanduser('~/.nvm/versions/node')
    if os.path.isdir(nvm_dir):
        versions = sorted(os.listdir(nvm_dir))
        if versions:
            candidate = os.path.join(nvm_dir, versions[-1], 'bin/node')
            if os.path.exists(candidate):
                return candidate
    return 'node'

def kill_ghost_servers(port):
    """Elimina agresivamente procesos zombis o duplicados en el puerto."""
    try:
        out = subprocess.check_output(['lsof', '-ti', f':{port}'], text=True, stderr=subprocess.DEVNULL)
        pids = out.strip().split()
        for pid in pids:
            if pid:
                subprocess.run(['kill', '-9', pid], stderr=subprocess.DEVNULL)
        # Esperar liberación del socket
        for _ in range(25):
            res = subprocess.run(['lsof', '-ti', f':{port}'], capture_output=True, text=True)
            if not res.stdout.strip():
                break
            time.sleep(0.05)
    except Exception:
        pass

def launch_server(port, config):
    kill_ghost_servers(port)
    target_dir = os.path.abspath(os.path.join(BASE_DIR, config['subdir']))
    
    # Caso 7771: Compilar si no existe dist/index.html
    if port == 7771:
        dist_index = os.path.join(target_dir, 'dist/index.html')
        if not os.path.exists(dist_index):
            subprocess.run(['npm', 'run', 'build'], cwd=target_dir, capture_output=True)

    if config['type'] == 'python':
        cmd = [sys.executable or 'python3', config['script']]
    else:
        node_bin = find_node()
        cmd = [node_bin, config['script']]

    log_path = f'/tmp/agrotech_{port}_server.log'
    with open(log_path, 'w') as log_file:
        try:
            subprocess.Popen(
                cmd,
                cwd=target_dir,
                stdout=log_file,
                stderr=log_file,
                stdin=subprocess.DEVNULL,
                start_new_session=True
            )
        except (PermissionError, OSError):
            full_script = os.path.join(target_dir, config['script'])
            subprocess.Popen(
                [cmd[0], full_script],
                cwd='/tmp',
                stdout=log_file,
                stderr=log_file,
                stdin=subprocess.DEVNULL,
                start_new_session=True
            )

    # Health check (esperar a que responda HTTP 200/302/304)
    url = f'http://127.0.0.1:{port}/'
    for _ in range(30):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'AgroTech-Health/1.0'})
            with urllib.request.urlopen(req, timeout=0.8) as resp:
                if resp.status in (200, 302, 304):
                    break
        except Exception:
            time.sleep(0.1)

def refresh_opera(port):
    """Fuerza a Opera a actualizarse con la última versión de la app."""
    ts = int(time.time())
    cache_busted_url = f'http://localhost:{port}/?_t={ts}'

    is_opera_running = subprocess.run(
        ['pgrep', '-x', 'Opera'],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    ).returncode == 0

    reloaded = False
    if is_opera_running:
        ascript = f'''
set targetPort to "{port}"
set targetUrl to "{cache_busted_url}"

tell application "Opera"
    activate
    set wasReloaded to false
    repeat with w in windows
        repeat with t in tabs of w
            set u to URL of t
            if u contains ("localhost:" & targetPort) or u contains ("127.0.0.1:" & targetPort) then
                set active tab index of w to (index of t)
                set URL of t to targetUrl
                set wasReloaded to true
                exit repeat
            end if
        end repeat
        if wasReloaded then exit repeat
    end repeat
    if not wasReloaded then
        open location targetUrl
    end if
end tell
'''
        res = subprocess.run(['osascript', '-e', ascript], capture_output=True, text=True)
        if res.returncode == 0:
            reloaded = True

    if not reloaded:
        if os.path.exists('/Applications/Opera.app'):
            subprocess.run(['open', '-a', '/Applications/Opera.app', cache_busted_url], stderr=subprocess.DEVNULL)
        else:
            subprocess.run(['open', cache_busted_url], stderr=subprocess.DEVNULL)

def main():
    if len(sys.argv) < 2:
        print("Uso: launch.py <puerto: 7770..7774>")
        sys.exit(1)

    port = int(sys.argv[1])
    if port not in SERVICES:
        print(f"Puerto {port} no reconocido. Opciones: {list(SERVICES.keys())}")
        sys.exit(1)

    config = SERVICES[port]
    launch_server(port, config)
    refresh_opera(port)

if __name__ == '__main__':
    main()
