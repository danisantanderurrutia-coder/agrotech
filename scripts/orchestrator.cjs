#!/usr/bin/env node
/**
 * 🌾 AgroTech Chile — Orquestador Maestro de Servicios y Puertos
 * 
 * Gestiona el ciclo de vida del ecosistema distribuido según el Principio Árbol:
 *  - 7770: AgroTech HQ (Cockpit Fundador & Vault API)
 *  - 7771: AgroTech Web Portal (Vite React Comercial)
 *  - 7772: Rewild Suite (Python PWA Offline)
 *  - 7773: AgriTwin Predio 3D (Three.js Micro-fundo)
 *  - 7774: AgriTwin Cuenca / Regional (Leaflet Macro-territorio)
 *  - 7777: AgriTwin Hub / Master Unificado (Single-Pane-of-Glass)
 */

const { spawn, execSync } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const BASE_DIR = path.resolve(__dirname, '..');

const SERVICES = {
  hq: {
    name: 'AgroTech HQ (Vault API)',
    port: 7770,
    dir: 'agrotech-hq',
    cmd: 'node',
    args: ['server.cjs'],
    checkUrl: 'http://127.0.0.1:7770/'
  },
  web: {
    name: 'AgroTech Web Portal',
    port: 7771,
    dir: '.',
    cmd: 'npm',
    args: ['run', 'dev'],
    checkUrl: 'http://127.0.0.1:7771/'
  },
  rewild: {
    name: 'Rewild Suite PWA',
    port: 7772,
    dir: 'rewild',
    cmd: 'python3',
    args: ['server.py'],
    checkUrl: 'http://127.0.0.1:7772/'
  },
  hub: {
    name: 'AgriTwin General (Tronco Hub + Predio + Cuenca Unificados)',
    port: 7777,
    dir: 'agritwin-hub',
    cmd: 'node',
    args: ['server.cjs'],
    checkUrl: 'http://127.0.0.1:7777/'
  }
};

const PID_FILE = path.join(BASE_DIR, '.orchestrator_pids.json');

function getRunningPids() {
  if (fs.existsSync(PID_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(PID_FILE, 'utf8'));
    } catch {
      return {};
    }
  }
  return {};
}

function saveRunningPids(pids) {
  fs.writeFileSync(PID_FILE, JSON.stringify(pids, null, 2), 'utf8');
}

function checkPortInUse(port) {
  try {
    const out = execSync(`lsof -ti :${port} 2>/dev/null`, { encoding: 'utf8' }).trim();
    return out ? out.split('\n').map(p => parseInt(p, 10)).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function killPort(port) {
  const pids = checkPortInUse(port);
  if (pids.length > 0) {
    try {
      execSync(`kill -9 ${pids.join(' ')} 2>/dev/null`);
    } catch {}
  }
}

function pingService(url, timeoutMs = 1500) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = http.request({
        hostname: u.hostname,
        port: u.port,
        path: u.pathname,
        method: 'GET',
        timeout: timeoutMs
      }, (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 400);
      });
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    } catch {
      resolve(false);
    }
  });
}

async function startService(key) {
  const s = SERVICES[key];
  if (!s) {
    console.error(`❌ Servicio desconocido: ${key}`);
    return false;
  }

  // Pre-check: si ya responde, no lo reiniciamos a la fuerza
  const isAlive = await pingService(s.checkUrl, 500);
  if (isAlive) {
    console.log(`✅ [${s.port}] ${s.name} ya está activo y respondiendo.`);
    return true;
  }

  // Limpiar procesos zombies previos en el puerto
  killPort(s.port);

  const workDir = path.resolve(BASE_DIR, s.dir);
  const logFile = `/tmp/agrotech_${s.port}.log`;
  const out = fs.openSync(logFile, 'a');
  const err = fs.openSync(logFile, 'a');

  console.log(`🚀 Iniciando [${s.port}] ${s.name}...`);

  const child = spawn(s.cmd, s.args, {
    cwd: workDir,
    detached: true,
    stdio: ['ignore', out, err],
    env: { ...process.env, PORT: s.port.toString() }
  });

  child.unref();

  const pids = getRunningPids();
  pids[key] = { pid: child.pid, port: s.port, startedAt: new Date().toISOString() };
  saveRunningPids(pids);

  // Health check loop
  let ready = false;
  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 200));
    ready = await pingService(s.checkUrl, 400);
    if (ready) break;
  }

  if (ready) {
    console.log(`✨ [${s.port}] ${s.name} ONLINE → ${s.checkUrl}`);
    return true;
  } else {
    console.log(`⚠️ [${s.port}] ${s.name} iniciado (PID: ${child.pid}). Revisa logs en ${logFile}`);
    return false;
  }
}

async function stopService(key) {
  const s = SERVICES[key];
  if (!s) return;

  console.log(`🛑 Deteniendo [${s.port}] ${s.name}...`);
  killPort(s.port);

  const pids = getRunningPids();
  delete pids[key];
  saveRunningPids(pids);
}

async function showStatus() {
  console.log('\n📊 ESTADO DEL ECOSISTEMA AGROTECH:');
  console.log('═'.repeat(68));
  console.log(
    'Servicio'.padEnd(28) + 
    'Puerto'.padEnd(10) + 
    'PID(s)'.padEnd(14) + 
    'Estado HTTP'
  );
  console.log('─'.repeat(68));

  for (const [key, s] of Object.entries(SERVICES)) {
    const pids = checkPortInUse(s.port);
    const isAlive = await pingService(s.checkUrl, 600);
    const statusText = isAlive 
      ? '🟢 ONLINE' 
      : pids.length > 0 
      ? '🟡 PID ACTIVO (Sin HTTP)' 
      : '⚪ DETENIDO';

    console.log(
      s.name.padEnd(28) +
      s.port.toString().padEnd(10) +
      (pids.join(',') || '-').padEnd(14) +
      statusText
    );
  }
  console.log('═'.repeat(68) + '\n');
}

async function main() {
  const action = process.argv[2] || 'status';
  const target = process.argv[3] || 'all';

  if (action === 'start') {
    // Sincronizar docs de Obsidian antes de levantar la suite
    try {
      execSync('node scripts/sync-obsidian-docs.cjs', { stdio: 'inherit', cwd: BASE_DIR });
    } catch {}

    if (target === 'all') {
      console.log('\n🌱 INICIANDO SUITE COMPLETA AGROTECH...');
      for (const key of Object.keys(SERVICES)) {
        await startService(key);
      }
      await showStatus();
    } else {
      await startService(target);
    }
  } else if (action === 'stop') {
    if (target === 'all') {
      console.log('\n🛑 DETENIENDO TODOS LOS SERVICIOS AGROTECH...');
      for (const key of Object.keys(SERVICES)) {
        await stopService(key);
      }
      console.log('✅ Todos los servicios detenidos limpiamente.');
    } else {
      await stopService(target);
    }
  } else if (action === 'restart') {
    if (target === 'all') {
      for (const key of Object.keys(SERVICES)) {
        await stopService(key);
      }
      for (const key of Object.keys(SERVICES)) {
        await startService(key);
      }
      await showStatus();
    } else {
      await stopService(target);
      await startService(target);
    }
  } else if (action === 'status') {
    await showStatus();
  } else {
    console.log(`
Uso: node scripts/orchestrator.cjs <start|stop|restart|status> [servicio|all]

Servicios disponibles:
  - hq       (7770): AgroTech HQ / Vault API
  - web      (7771): AgroTech Web Portal (Vite React)
  - rewild   (7772): Rewild Suite PWA
  - predio   (7773): AgriTwin Predio 3D
  - cuenca   (7774): AgriTwin Cuenca Territorial
  - hub      (7777): AgriTwin Hub Master Unificado
  - all            : Toda la suite combinada
`);
  }
}

main().catch(err => {
  console.error('Error en orquestador:', err);
  process.exit(1);
});
