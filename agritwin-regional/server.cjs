// ═══════════════════════════════════════════════════════════════════════════════
// AgroTwin Regional — Servidor Territorial & Modelador Microclimático
// Puerto 7774 — Cuenca Maule Sur (Parral - Retiro, 122.000 ha)
// ═══════════════════════════════════════════════════════════════════════════════
const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PORT     = process.env.PORT || 7774;
const ROOT_DIR = __dirname;
const CACHE_TILES_DIR = path.join(ROOT_DIR, 'cache_tiles');
if (!fs.existsSync(CACHE_TILES_DIR)) {
  fs.mkdirSync(CACHE_TILES_DIR, { recursive: true });
}

// ─── MIME Types ──────────────────────────────────────────────────────────────
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.geojson': 'application/geo+json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.mp3':  'audio/mpeg',
  '.mp4':  'video/mp4',
  '.wasm': 'application/wasm'
};

// ═══════════════════════════════════════════════════════════════════════════════
//  TELEMETRY DATA — Red Centinela Ground-Truth Mesh (9 Estaciones)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Genera el payload de telemetría consolidado de la Cuenca Maule Sur.
 * Los valores base representan la configuración operativa actual; las
 * funciones de variación simulan la oscilación diurna ±σ para que cada
 * llamada al endpoint devuelva valores ligeramente distintos (simulando
 * la lectura de sensores en vivo).
 */
function buildTelemetrySummary() {
  const now    = new Date();
  const hour   = now.getHours();
  const minute = now.getMinutes();

  // ── Funciones auxiliares de micro-variación ────────────────────────────
  const jitter = (base, pct = 0.03) =>
    +(base * (1 + (Math.random() - 0.5) * 2 * pct)).toFixed(2);

  // Temperatura con curva diurna simplificada (máx ~15h, mín ~06h)
  const diurnalTempOffset = 5 * Math.sin(((hour - 6) / 24) * 2 * Math.PI);

  // Humedad relativa inversa a temperatura
  const diurnalHROffset = -8 * Math.sin(((hour - 6) / 24) * 2 * Math.PI);

  // ── Red Centinela: 5 Nodos KioT Mesh (Fundo Meniel) ───────────────────
  const kiotNodes = [
    {
      id:       'FDR-01',
      name:     'Cerezos',
      type:     'soil_moisture_fdr',
      depth_cm: '0-20',
      lat:      -36.2095,
      lng:      -71.6060,
      network:  'KioT Mesh',
      status:   'online',
      readings: {
        vwc_percent:   jitter(36.2),
        temp_soil_c:   jitter(14.8),
        ec_dS_m:       jitter(0.42),
        battery_pct:   92,
        lqi:           98,
        last_tx:       now.toISOString()
      }
    },
    {
      id:       'FDR-02',
      name:     'Avellanos',
      type:     'soil_moisture_fdr',
      depth_cm: '20-60',
      lat:      -36.2120,
      lng:      -71.6030,
      network:  'KioT Mesh',
      status:   'online',
      readings: {
        vwc_percent:   jitter(34.8),
        temp_soil_c:   jitter(13.5),
        ec_dS_m:       jitter(0.38),
        battery_pct:   88,
        lqi:           95,
        last_tx:       now.toISOString()
      }
    },
    {
      id:       'FDR-03',
      name:     'Keyline Sur (Infiltración)',
      type:     'soil_moisture_fdr',
      depth_cm: '0-40',
      lat:      -36.2145,
      lng:      -71.6050,
      network:  'KioT Mesh',
      status:   'online',
      readings: {
        vwc_percent:   jitter(37.1),
        temp_soil_c:   jitter(14.2),
        infiltration_active: true,
        battery_pct:   95,
        lqi:           97,
        last_tx:       now.toISOString()
      }
    },
    {
      id:       'FDR-04',
      name:     'Silvopastoril PRV',
      type:     'soil_moisture_fdr',
      depth_cm: '0-30',
      lat:      -36.2105,
      lng:      -71.6080,
      network:  'KioT Mesh',
      status:   'online',
      readings: {
        vwc_percent:   jitter(35.0),
        temp_soil_c:   jitter(13.9),
        ec_dS_m:       jitter(0.51),
        battery_pct:   90,
        lqi:           94,
        last_tx:       now.toISOString()
      }
    },
    {
      id:       'PIEZO-TQ',
      name:     'Piezómetro Tranque Meniel',
      type:     'piezometer',
      lat:      -36.2110,
      lng:      -71.6045,
      network:  'KioT Mesh',
      status:   'online',
      readings: {
        volume_m3:       jitter(18500, 0.01),
        cota_msnm:       198,
        capacity_pct:    100,
        autonomy_days:   42,
        battery_pct:     99,
        last_tx:         now.toISOString()
      }
    }
  ];

  // ── Red Centinela: 4 Estaciones Públicas Oficiales ─────────────────────
  const baseTemp = 22.4 + diurnalTempOffset;
  const baseHR   = Math.max(12, Math.min(65, 38 + diurnalHROffset));
  const baseWind = jitter(38, 0.10);

  const publicStations = [
    {
      id:       'INIA-RETIRO',
      name:     'INIA Retiro (Agroclimática)',
      agency:   'INIA',
      lat:      -36.0580,
      lng:      -71.7610,
      network:  'INIA Red Agroclimática',
      status:   'online',
      readings: {
        temp_air_c:        jitter(baseTemp),
        humidity_pct:      jitter(baseHR),
        eto_mm_day:        jitter(4.8),
        radiation_w_m2:    jitter(620),
        precip_24h_mm:     0,
        last_update:       now.toISOString()
      }
    },
    {
      id:       'DGA-LONGAVI',
      name:     'DGA Fluviométrica Río Longaví',
      agency:   'DGA',
      lat:      -36.1750,
      lng:      -71.6700,
      network:  'DGA Aguas',
      status:   'online',
      readings: {
        caudal_m3_s:       jitter(185, 0.05),
        nivel_m:           jitter(2.15, 0.04),
        caudal_max_m3_s:   185,
        trend:             'estable',
        last_update:       now.toISOString()
      }
    },
    {
      id:       'DMC-PARRAL',
      name:     'DMC Parral Centro (Aeronáutica)',
      agency:   'DMC',
      lat:      -36.1432,
      lng:      -71.8267,
      network:  'DMC Aeronáutica',
      status:   'online',
      readings: {
        wind_speed_kmh:    jitter(baseWind),
        wind_dir:          'E-NE',
        wind_type:         'Puelche (Foehn)',
        pressure_hpa:      jitter(1014, 0.005),
        temp_air_c:        jitter(baseTemp + 1.2),
        humidity_pct:      jitter(baseHR - 5),
        last_update:       now.toISOString()
      }
    },
    {
      id:       'DGA-BULLILEO',
      name:     'DGA Embalse Bullileo',
      agency:   'DGA',
      lat:      -36.2800,
      lng:      -71.4200,
      network:  'DGA Embalses',
      status:   'online',
      readings: {
        volume_hm3:        jitter(84.2, 0.02),
        cota_msnm:         395,
        fill_pct:          78,
        trend:             'estable',
        last_update:       now.toISOString()
      }
    }
  ];

  // ── Cálculos Derivados ─────────────────────────────────────────────────

  // FWI simplificado (pseudo–Canadian FWI)
  const fwiTemp = publicStations[0].readings.temp_air_c;
  const fwiHR   = publicStations[0].readings.humidity_pct;
  const fwiWind = publicStations[2].readings.wind_speed_kmh;
  let fwi = Math.round((fwiTemp * 1.5) + (fwiWind * 0.8) - (fwiHR * 0.5));
  if (fwi < 0)   fwi = 5;
  if (fwi > 100) fwi = 100;

  let fwiLevel;
  if (fwi < 30)       fwiLevel = 'BAJO';
  else if (fwi < 50)  fwiLevel = 'ALTO';
  else                fwiLevel = 'CATASTRÓFICO';

  // Regla 30-30-30 Puelche
  const rule303030 = {
    active:   fwiTemp > 30 && fwiHR < 30 && fwiWind > 30,
    temp_gt30: fwiTemp > 30,
    hr_lt30:   fwiHR < 30,
    wind_gt30: fwiWind > 30,
    mitigation_windbreak_pct: 62,
    windbreak_species: ['Peumo (Cryptocarya alba)', 'Quillay (Quillaja saponaria)']
  };

  // Drenaje Catabático Nocturno (Inversión Térmica)
  const catabaticRisk = (hour >= 3 && hour <= 7);
  const catabaticModel = {
    risk_window:     '03:00 – 07:00 hrs',
    peak_hour:       '05:30 AM',
    frost_zone_msnm: '< 170',
    frost_temp_c:    -2.4,
    safe_keyline_c:  +2.1,
    air_density_kg_m3: 1.29,
    active_now:      catabaticRisk,
    recommendation:  catabaticRisk
      ? 'ALERTA: Ventana de drenaje catabático activa — verificar aspersión anti-helada en cuarteles bajo cota 170m'
      : 'Fuera de ventana de riesgo catabático'
  };

  // ETo Penman-Monteith (simplificado)
  const eto_mm_day = jitter(5.1);

  // VWC promedio predial
  const vwcValues = kiotNodes
    .filter(n => n.type === 'soil_moisture_fdr')
    .map(n => n.readings.vwc_percent);
  const avgVWC = +(vwcValues.reduce((a, b) => a + b, 0) / vwcValues.length).toFixed(1);

  // PRV (Pastoreo Racional Voisin) — Modelo Ganadero Territorial
  const prvModel = {
    carga_ugm_ha:             1.8,
    reposo_dias:              42,
    mo_increment_kg_m2:       4.2,
    water_retention_L_ha_per_pct_mo: 144000,
    cortafuegos_franja_m:     25,
    cortafuegos_km_activos:   2.4
  };

  // ── Payload Final ──────────────────────────────────────────────────────
  return {
    meta: {
      service:     'agritwin-regional',
      version:     '2.6',
      port:        PORT,
      cuenca:      'Maule Sur (Parral – Retiro)',
      area_ha:     122070,
      timestamp:   now.toISOString(),
      fundo_meniel: {
        lat: -36.21156,
        lng: -71.60530,
        rol_sii: '142-88 Retiro',
        area_ha: 24.8
      }
    },
    sentinel_network: {
      total_stations: 9,
      kiot_mesh:      kiotNodes,
      public:         publicStations
    },
    derived: {
      fwi: {
        value:    fwi,
        level:    fwiLevel,
        fwi_meniel:  fwi,
        fwi_monocultivo: Math.min(100, fwi + 44)
      },
      puelche_foehn:  rule303030,
      catabatic:      catabaticModel,
      eto_penman_monteith_mm_day: eto_mm_day,
      avg_vwc_pct:    avgVWC,
      prv_ganadero:   prvModel
    },
    hydrology: {
      rio_longavi: {
        caudal_m3_s:  publicStations[1].readings.caudal_m3_s,
        nivel_m:      publicStations[1].readings.nivel_m,
        trend:        publicStations[1].readings.trend
      },
      embalse_bullileo: {
        volume_hm3: publicStations[3].readings.volume_hm3,
        fill_pct:   publicStations[3].readings.fill_pct
      },
      tranque_meniel: {
        volume_m3:      kiotNodes[4].readings.volume_m3,
        autonomy_days:  kiotNodes[4].readings.autonomy_days,
        capacity_pct:   kiotNodes[4].readings.capacity_pct
      },
      infiltracion_L_s: 320,
      atenuacion_crecida_pct: -3.2
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HTTP SERVER
// ═══════════════════════════════════════════════════════════════════════════════

const server = http.createServer((req, res) => {
  // ── CORS Headers ─────────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const urlPath = decodeURI(req.url.split('?')[0]);

  // ── Favicon ───────────────────────────────────────────────────────────
  if (urlPath === '/favicon.ico') {
    const icoPath = path.join(ROOT_DIR, 'favicon.ico');
    if (fs.existsSync(icoPath)) {
      res.writeHead(200, { 'Content-Type': 'image/x-icon', 'Cache-Control': 'public, max-age=86400' });
      fs.createReadStream(icoPath).pipe(res);
      return;
    }
  }

  // ── Tile Proxy & Offline Local Cache (/api/tiles/:provider/:z/:x/:y.png) ────
  const tileMatch = urlPath.match(/^\/api\/tiles\/([a-zA-Z0-9_-]+)\/(\d+)\/(\d+)\/(\d+)\.png$/);
  if (tileMatch && (req.method === 'GET' || req.method === 'HEAD')) {
    const [, provider, z, x, y] = tileMatch;
    const providerDir = path.join(CACHE_TILES_DIR, provider);
    if (!fs.existsSync(providerDir)) {
      fs.mkdirSync(providerDir, { recursive: true });
    }
    const tileFileName = `${z}_${x}_${y}.png`;
    const localTilePath = path.join(providerDir, tileFileName);

    // Si es HEAD y existe en disco
    if (req.method === 'HEAD') {
      res.writeHead(fs.existsSync(localTilePath) ? 200 : 302, {
        'Content-Type': 'image/png'
      });
      res.end();
      return;
    }

    // 1. Si el tile ya está en caché local, servirlo directamente (100% offline!)
    if (fs.existsSync(localTilePath)) {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Tile-Cache': 'HIT-DISK'
      });
      fs.createReadStream(localTilePath).pipe(res);
      return;
    }

    // 2. Si no está en caché, descargarlo desde Google Maps o proveedor
    let remoteUrl = '';
    const sub = (parseInt(x, 10) + parseInt(y, 10)) % 4; // Round-robin entre servidores mt0, mt1, mt2, mt3
    if (provider === 'google-hybrid' || provider === 'google') {
      remoteUrl = `https://mt${sub}.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}`;
    } else if (provider === 'google-sat') {
      remoteUrl = `https://mt${sub}.google.com/vt/lyrs=s&x=${x}&y=${y}&z=${z}`;
    } else if (provider === 'google-terrain') {
      remoteUrl = `https://mt${sub}.google.com/vt/lyrs=p&x=${x}&y=${y}&z=${z}`;
    } else if (provider === 'google-streets') {
      remoteUrl = `https://mt${sub}.google.com/vt/lyrs=m&x=${x}&y=${y}&z=${z}`;
    } else if (provider === 'osm') {
      remoteUrl = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
    } else {
      remoteUrl = `https://mt${sub}.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}`;
    }

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 3500
    };

    https.get(remoteUrl, options, (remoteRes) => {
      if (remoteRes.statusCode === 200) {
        res.writeHead(200, {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'X-Tile-Cache': 'MISS-FETCHED'
        });

        const fileStream = fs.createWriteStream(localTilePath);
        remoteRes.pipe(fileStream);
        remoteRes.pipe(res);
      } else {
        res.writeHead(remoteRes.statusCode, { 'Content-Type': 'text/plain' });
        res.end(`Tile upstream error: ${remoteRes.statusCode}`);
      }
    }).on('error', () => {
      // Fallback offline elegante: pixel transparente o fallback para no romper el mapa
      const transparentPixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'X-Tile-Cache': 'FALLBACK-OFFLINE'
      });
      res.end(transparentPixel);
    });
    return;
  }

  // ── API Routes ───────────────────────────────────────────────────────

  // GET /api/telemetry/summary — Telemetría consolidada para HQ (:7770)
  if (urlPath === '/api/telemetry/summary' && req.method === 'GET') {
    const payload = buildTelemetrySummary();
    const body    = JSON.stringify(payload, null, 2);
    res.writeHead(200, {
      'Content-Type':  'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body),
      'Cache-Control': 'no-store, max-age=0',
      'X-AgroTwin':    'regional-telemetry-v2.6'
    });
    res.end(body);
    return;
  }

  // GET /api/basin-sync — Condiciones de borde para AgriTwin 3D (:7773)
  if (urlPath === '/api/basin-sync' && req.method === 'GET') {
    const telemetry = buildTelemetrySummary();
    const payload = {
      source: 'regional-gateway-7774',
      status: 'connected',
      timestamp: new Date().toISOString(),
      macro_fwi: telemetry.derived.fwi.value,
      macro_fwi_label: telemetry.derived.fwi.label,
      q_longavi_m3_s: telemetry.derived.longavi_q_m3s,
      puelche_gusts_kmh: telemetry.derived.puelche_gusts_kmh,
      aprs_summary: telemetry.apr_summary,
      buffer_mitigation_pct: 45,
      tranque_keyline_capacity_m3: 18500
    };
    const body = JSON.stringify(payload, null, 2);
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body),
      'Cache-Control': 'no-store, max-age=0'
    });
    res.end(body);
    return;
  }

  // GET & POST /api/notes — Notas de inteligencia vecinal
  const NOTES_FILE = path.join(ROOT_DIR, 'data', 'parcels_notes.json');
  if (urlPath === '/api/notes' && req.method === 'GET') {
    let data = {};
    if (fs.existsSync(NOTES_FILE)) {
      try { data = JSON.parse(fs.readFileSync(NOTES_FILE, 'utf-8')); } catch(e) {}
    }
    const body = JSON.stringify(data, null, 2);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(body);
    return;
  }

  if (urlPath === '/api/notes' && req.method === 'POST') {
    let bodyData = '';
    req.on('data', chunk => bodyData += chunk);
    req.on('end', () => {
      try {
        const update = JSON.parse(bodyData);
        let existing = {};
        if (fs.existsSync(NOTES_FILE)) {
          try { existing = JSON.parse(fs.readFileSync(NOTES_FILE, 'utf-8')); } catch(e) {}
        }
        if (update.id) {
          existing[update.id] = {
            ...existing[update.id],
            ...update,
            updated_at: new Date().toISOString()
          };
          fs.writeFileSync(NOTES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ status: 'ok', saved: existing[update.id] }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing parcel id' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // GET & POST /api/projects — Banco de Proyectos & Obras de Borde
  const PROJECTS_FILE = path.join(ROOT_DIR, 'data', 'cooperative_projects.json');
  if (urlPath === '/api/projects' && req.method === 'GET') {
    let list = [];
    if (fs.existsSync(PROJECTS_FILE)) {
      try { list = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8')); } catch(e) {}
    }
    const body = JSON.stringify(list, null, 2);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(body);
    return;
  }

  if (urlPath === '/api/projects/toggle' && req.method === 'POST') {
    let bodyData = '';
    req.on('data', chunk => bodyData += chunk);
    req.on('end', () => {
      try {
        const { id } = JSON.parse(bodyData);
        let list = [];
        if (fs.existsSync(PROJECTS_FILE)) {
          try { list = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf-8')); } catch(e) {}
        }
        const proj = list.find(p => p.id === id);
        if (proj) {
          proj.executed = !proj.executed;
          proj.last_audit = new Date().toISOString().split('T')[0];
          fs.writeFileSync(PROJECTS_FILE, JSON.stringify(list, null, 2), 'utf-8');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', project: proj }));
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Project not found' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // GET /api/health — Health check rápido
  if (urlPath === '/api/health' && req.method === 'GET') {
    const body = JSON.stringify({
      status: 'ok',
      service: 'agritwin-regional',
      port: PORT,
      uptime_s: Math.round(process.uptime()),
      timestamp: new Date().toISOString()
    });
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body)
    });
    res.end(body);
    return;
  }

  // ── Static File Server (fallback) ────────────────────────────────────
  let safePath = path.normalize(urlPath);
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, safePath);

  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Not Found</h1><p>Archivo no encontrado: ${safePath}</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

// ─── Startup ─────────────────────────────────────────────────────────────────
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n══════════════════════════════════════════════════════════`);
  console.log(`🏔️  AGROTWIN REGIONAL — Cuenca Maule Sur (122K ha)`);
  console.log(`══════════════════════════════════════════════════════════`);
  console.log(`📡  Visor GIS:          http://localhost:${PORT}`);
  console.log(`📊  Telemetría API:     http://localhost:${PORT}/api/telemetry/summary`);
  console.log(`💚  Health Check:       http://localhost:${PORT}/api/health`);
  console.log(`🌐  Red:                http://0.0.0.0:${PORT}`);
  console.log(`══════════════════════════════════════════════════════════\n`);
});
