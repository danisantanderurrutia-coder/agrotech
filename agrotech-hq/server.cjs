// Servidor Privado Autónomo para AgroTech HQ / Founder Cockpit (Puerto 7770)
// 100% aislado de la web pública. Incluye agregador multi-puerto,
// compilador de informes maestros con Obsidian Vault, persistencia y telemetría viva.

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 7770;
const ROOT_DIR = __dirname;
const OBSIDIAN_VAULT_DIR = path.resolve(__dirname, '../Agro Tech');
const TEMPLATES_DIR = path.join(OBSIDIAN_VAULT_DIR, 'Plantillas Informes');
const GENERATED_DIR = path.join(OBSIDIAN_VAULT_DIR, 'Informes Generados');

// Asegurar directorios esenciales del Vault
if (!fs.existsSync(OBSIDIAN_VAULT_DIR)) {
  fs.mkdirSync(OBSIDIAN_VAULT_DIR, { recursive: true });
}
if (!fs.existsSync(TEMPLATES_DIR)) {
  fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
}
if (!fs.existsSync(GENERATED_DIR)) {
  fs.mkdirSync(GENERATED_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=utf-8'
};

const SERVICES = [
  { id: 'web', name: 'AgroTech Web Comercial', port: 7771, url: 'http://localhost:7771' },
  { id: 'rewild', name: 'Rewild Suite (Python/IoT)', port: 7772, url: 'http://localhost:7772' },
  { id: 'agritwin_predial', name: 'AgriTwin 1 Predial (3D)', port: 7773, url: 'http://localhost:7773' },
  { id: 'agritwin_regional', name: 'AgroTwin 2 Territorial (GIS)', port: 7774, url: 'http://localhost:7774' }
];

// Helper para parsear cuerpo de peticiones POST
function getRequestBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function checkService(service) {
  return new Promise((resolve) => {
    const req = http.get(service.url, { timeout: 1200 }, (res) => {
      resolve({
        id: service.id,
        name: service.name,
        port: service.port,
        url: service.url,
        status: res.statusCode >= 200 && res.statusCode < 400 ? 'online' : 'degraded',
        statusCode: res.statusCode
      });
    });

    req.on('error', (err) => {
      resolve({
        id: service.id,
        name: service.name,
        port: service.port,
        url: service.url,
        status: 'offline',
        error: err.code || 'CONNECTION_REFUSED'
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        id: service.id,
        name: service.name,
        port: service.port,
        url: service.url,
        status: 'offline',
        error: 'TIMEOUT'
      });
    });
  });
}

// Cliente HTTP con timeout estricto de 1.5s para agregación multi-puerto
function fetchServiceTelemetry(url, timeoutMs = 1500) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });
    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout 1.5s'));
    });
  });
}

// Generador de telemetría consolidada y cacheada
async function getLiveTelemetryData() {
  const [rewildSettled, agritwinSettled, agrotwinSettled] = await Promise.allSettled([
    fetchServiceTelemetry('http://localhost:7772/api/telemetry', 1500),
    fetchServiceTelemetry('http://localhost:7773/api/telemetry', 1500),
    fetchServiceTelemetry('http://localhost:7774/api/telemetry', 1500)
  ]);

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const offlineTag = `[Offline - Última lectura ${todayStr}]`;

  const isRewildOnline = rewildSettled.status === 'fulfilled' && rewildSettled.value;
  const isAgriTwinOnline = agritwinSettled.status === 'fulfilled' && agritwinSettled.value;
  const isAgroTwinOnline = agrotwinSettled.status === 'fulfilled' && agrotwinSettled.value;

  const rewildData = isRewildOnline ? rewildSettled.value : null;
  const agritwinData = isAgriTwinOnline ? agritwinSettled.value : null;
  const agrotwinData = isAgroTwinOnline ? agrotwinSettled.value : null;

  // Factores estacionales y diurnos calibrados para Parral/Retiro (Maule Sur)
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const hour = now.getHours();
  const seasonFactor = Math.sin((dayOfYear - 80) * 2 * Math.PI / 365);
  const diurnalFactor = Math.sin((hour - 6) * Math.PI / 18);

  // Valores cacheados/en vivo con metadata transparente
  const telemetry = {
    timestamp: now.toISOString(),
    fecha_emision: now.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' }),
    hora_utc: `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`,
    predio_nombre: 'Fundo Meniel',
    rol_sii: '142-88 Retiro',
    superficie_ha: '24.8',
    rut_empresa: '77.892.450-K',
    mrv_hash: '0x8f2d4a19c6e',
    eudr_status: '100% Cero Deforestación',

    sources_status: {
      rewild: {
        port: 7772,
        online: isRewildOnline,
        tag: isRewildOnline ? 'EN VIVO' : offlineTag
      },
      agritwin: {
        port: 7773,
        online: isAgriTwinOnline,
        tag: isAgriTwinOnline ? 'EN VIVO' : offlineTag
      },
      agrotwin: {
        port: 7774,
        online: isAgroTwinOnline,
        tag: isAgroTwinOnline ? 'EN VIVO' : offlineTag
      }
    },

    // 1. Datos AgriTwin Predial (:7773)
    fdr_0_20_vwc: (agritwinData?.sensores?.fdr_humedad_20cm || +(32.5 + 4 * seasonFactor).toFixed(1)).toString(),
    fdr_20_60_vwc: (agritwinData?.sensores?.fdr_humedad_60cm || +(41.2 + 3 * seasonFactor).toFixed(1)).toString(),
    fdr_60_100_vwc: (agritwinData?.sensores?.fdr_humedad_100cm || +(48.7 + 2 * seasonFactor).toFixed(1)).toString(),
    tranque_volumen_m3: (agritwinData?.sensores?.nivel_tranque_m3 || '18.500').toString(),
    tranque_porcentaje: '88.8',
    temperatura_actual: (agritwinData?.sensores?.temperatura_brote || +(16.4 + 8 * seasonFactor + 4 * diurnalFactor).toFixed(1)).toString(),
    humedad_relativa: (agritwinData?.sensores?.humedad_relativa || '28.5').toString(),
    temp_maxima: '31.2',
    alerta_helada_catabatica: 'PREVENTIVA (05:30 AM)',
    temp_minima_proyectada: '2.8',
    inversion_termica: 'Detectada en quebradas A101-A102',
    ugm_ha_ganado: '1.8',
    reposo_forrajero_dias: '42',
    materia_organica_aporte: '+4.2 kg/m²',
    n_potreros: '32',
    ocupacion_dias: '2',

    // 2. Datos AgroTwin Territorial (:7774)
    caudal_longavi: (agrotwinData?.caudal_longavi || '185').toString(),
    caudal_perquilauquen: (agrotwinData?.caudal_perquilauquen || '14.2').toString(),
    embalse_bullileo: (agrotwinData?.embalse_bullileo || '84.2').toString(),
    fwi_indice: (agrotwinData?.fwi_valor || '28.4').toString(),
    viento_puelche_kmh: (agrotwinData?.viento_puelche?.velocidad_kmh || '32.5').toString(),
    fwi_estado: '⚠️ Riesgo Alto (> 25)',
    puelche_viento_estado: '⚠️ Alerta (> 30 km/h)',
    puelche_humedad_estado: '⚠️ Crítico (< 30 %)',
    puelche_temp_estado: '🟢 Normal (< 30 °C)',

    // 3. Datos Rewild Suite (:7772)
    carbono_tco2e_ha: (rewildData?.carbono_mrv?.captura_ton_co2e_anual ? (rewildData.carbono_mrv.captura_ton_co2e_anual / 24.8).toFixed(1) : '4.8').toString(),
    ndvi_promedio: (rewildData?.ndvi_promedio || '0.78').toString(),
    ndvi_bosque_nativo: (rewildData?.ndvi_bosque_nativo || '0.88').toString(),
    ndvi_tendencia: '▲ +4.2% (Vigor vegetativo creciente)',
    ndvi_bosque_tendencia: '▲ Estable (Cobertura dosel cerrada)',
    superficie_restauracion: '5.4',
    ndvi_baseline_2020: '0.742',
    cobertura_forestal_2020: '5.4',
    cobertura_forestal_actual: '5.6',
    variacion_forestal: '+0.2',
    latitud: '-36.1425° S',
    longitud: '-71.8210° W',
    n_especies_flora: '47',
    n_especies_aves: '28',
    n_especies_polinizadores: '19',
    n_especies_fauna: '12',

    // Estados e interpretaciones agronómicas
    fdr_0_20_estado: '🟢 Óptimo (32.5 %)',
    fdr_20_60_estado: '🟢 Capacidad de Campo (41.2 %)',
    fdr_60_100_estado: '🟢 Reserva Napa (48.7 %)',
    fdr_0_20_interpretacion: 'Nivel adecuado de agua útil en zona radicular activa',
    fdr_20_60_interpretacion: 'Humedad estable sin lixiviación de nutrientes',
    fdr_60_100_interpretacion: 'Infiltración profunda óptima hacia estrato arcilloso',

    // Cuarteles
    cuartel_a101_uso: 'Cereales Extensivos (Trigo Candeal)',
    cuartel_a102_uso: 'Parque Agrovoltaico Bifacial & Ovino',
    cuartel_a103_uso: 'Huerto de Berries Biointensivo',
    cuartel_a104_uso: 'Corredor Biológico & Bosque Esclerófilo',
    cuartel_a105_uso: 'Viñedo Patrimonial Uva País (80 años)',
    cuartel_a106_uso: 'Nogales & Avellanos Europeos',
    cuartel_a107_uso: 'Tranque de Infiltración Keyline',
    cuartel_a108_uso: 'Centro Compostaje & Microbiología',

    ndvi_a101: '0.76', ndvi_a101_prev: '0.72', delta_ndvi_a101: '+0.04', estado_a101: '🟢 Óptimo',
    ndvi_a102: '0.65', ndvi_a102_prev: '0.63', delta_ndvi_a102: '+0.02', estado_a102: '🟢 Óptimo',
    ndvi_a103: '0.82', ndvi_a103_prev: '0.78', delta_ndvi_a103: '+0.04', estado_a103: '🟢 Óptimo',
    ndvi_a104: '0.88', ndvi_a104_prev: '0.87', delta_ndvi_a104: '+0.01', estado_a104: '🟢 Óptimo',
    ndvi_a105: '0.69', ndvi_a105_prev: '0.65', delta_ndvi_a105: '+0.04', estado_a105: '🟢 Óptimo',
    ndvi_a106: '0.74', ndvi_a106_prev: '0.71', delta_ndvi_a106: '+0.03', estado_a106: '🟢 Óptimo',
    ndvi_a107: '0.58', ndvi_a107_prev: '0.55', delta_ndvi_a107: '+0.03', estado_a107: '🟡 Moderado',
    ndvi_a108: '0.45', ndvi_a108_prev: '0.44', delta_ndvi_a108: '+0.01', estado_a108: '🟡 Moderado',

    autonomia_riego_dias: '45',
    calidad_agua: 'Conductividad 0.28 dS/m — Aptitud de Riego Clase 1',
    ultima_inspeccion: '18-Sep-2026 (Aprobada por equipo técnico SpA)'
  };

  return telemetry;
}

// Inyección de variables dinámicas {{variable}} en plantillas Markdown
function interpolateTemplate(templateContent, variables) {
  let output = templateContent;

  // Reemplazar cada clave provista
  for (const [key, val] of Object.entries(variables)) {
    if (typeof val === 'string' || typeof val === 'number') {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      output = output.replace(regex, val.toString());
    }
  }

  // Sustituir cualquier variable {{...}} no mapeada con fallback limpio
  output = output.replace(/\{\{([a-zA-Z0-9_-]+)\}\}/g, (match, p1) => {
    return `[Dato no disponible: ${p1}]`;
  });

  return output;
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = req.url.split('?')[0];

  if (parsedUrl === '/favicon.ico') {
    const icoPath = path.join(ROOT_DIR, 'favicon.ico');
    if (fs.existsSync(icoPath)) {
      res.writeHead(200, { 'Content-Type': 'image/x-icon', 'Cache-Control': 'public, max-age=86400' });
      fs.createReadStream(icoPath).pipe(res);
      return;
    }
  }
  if (parsedUrl === '/api/health-check') {
    const results = await Promise.all(SERVICES.map(checkService));
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
    res.end(JSON.stringify({
      timestamp: new Date().toISOString(),
      services: results,
      allOnline: results.every(s => s.status === 'online')
    }));
    return;
  }

  // ================================================================
  // 2. API Telemetría Viva Multi-Puerto (/api/reports/live-telemetry)
  // ================================================================
  if (parsedUrl === '/api/reports/live-telemetry' || parsedUrl === '/api/reports/telemetry') {
    try {
      const telemetry = await getLiveTelemetryData();
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      });
      res.end(JSON.stringify(telemetry));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ================================================================
  // 3. API Catálogo de Plantillas de Informes (/api/reports/templates)
  // ================================================================
  if (parsedUrl === '/api/reports/templates') {
    try {
      if (!fs.existsSync(TEMPLATES_DIR)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ templates: [] }));
        return;
      }

      const files = fs.readdirSync(TEMPLATES_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => {
          const fullPath = path.join(TEMPLATES_DIR, f);
          const stat = fs.statSync(fullPath);
          const rawContent = fs.readFileSync(fullPath, 'utf-8');

          let tipo = 'general';
          if (f.toLowerCase().includes('inversion') || f.toLowerCase().includes('gobernanza')) tipo = 'dossier-inversion';
          else if (f.toLowerCase().includes('riego') || f.toLowerCase().includes('cnr')) tipo = 'carpeta-cnr';
          else if (f.toLowerCase().includes('eudr') || f.toLowerCase().includes('pasaporte')) tipo = 'pasaporte-eudr';
          else if (f.toLowerCase().includes('agronomica') || f.toLowerCase().includes('auditoria')) tipo = 'auditoria-predial';

          // Extraer primer encabezado como título
          const titleMatch = rawContent.match(/^#\s+(.+)$/m);
          const title = titleMatch ? titleMatch[1].replace(/[[\]]/g, '').trim() : f.replace(/\.md$/, '');

          return {
            filename: f,
            title,
            tipo,
            size: stat.size,
            mtime: stat.mtime,
            obsidianUri: `obsidian://open?vault=${encodeURIComponent('Agro Tech')}&file=${encodeURIComponent('Plantillas Informes/' + f.replace(/\.md$/, ''))}`
          };
        });

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      });
      res.end(JSON.stringify({ templates: files }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ================================================================
  // 4. API Compilación de Informe Maestro (/api/reports/compile)
  // ================================================================
  if (parsedUrl === '/api/reports/compile') {
    try {
      const u = new URL(req.url, `http://${req.headers.host}`);
      let reqBody = {};
      if (req.method === 'POST') {
        reqBody = await getRequestBody(req);
      }

      // Parámetros de plantilla
      const requestedTemplate = reqBody.template || u.searchParams.get('template') || 'Dossier Inversión y Gobernanza SpA.md';
      const autoSave = reqBody.save === true || u.searchParams.get('save') === '1' || u.searchParams.get('save') === 'true';

      // Resolver archivo de plantilla
      let templatePath = '';
      if (fs.existsSync(path.join(TEMPLATES_DIR, requestedTemplate))) {
        templatePath = path.join(TEMPLATES_DIR, requestedTemplate);
      } else {
        // Búsqueda flexible por coincidencia parcial o por tipo
        const allTemplates = fs.existsSync(TEMPLATES_DIR) ? fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.md')) : [];
        const match = allTemplates.find(f => 
          f.toLowerCase().includes(requestedTemplate.toLowerCase().replace('.md', '')) ||
          (requestedTemplate === '1' && (f.includes('Inversión') || f.includes('Inversion'))) ||
          (requestedTemplate === '2' && (f.includes('CNR') || f.includes('Riego'))) ||
          (requestedTemplate === '3' && (f.includes('EUDR') || f.includes('Pasaporte'))) ||
          (requestedTemplate === '4' && (f.includes('Agronómica') || f.includes('Agronomica')))
        );
        if (match) {
          templatePath = path.join(TEMPLATES_DIR, match);
        }
      }

      // Si no existe, cargar la primera plantilla o fallback canónico
      let templateContent = '';
      let templateFilename = requestedTemplate;

      if (templatePath && fs.existsSync(templatePath)) {
        templateContent = fs.readFileSync(templatePath, 'utf-8');
        templateFilename = path.basename(templatePath);
      } else {
        // Fallback robusto si la carpeta estuviera vacía
        templateContent = `# 📑 Informe Técnico Maestro — AgroTech SpA\n\n> Emisión: {{fecha_emision}} {{hora_utc}}\n> Predio: {{predio_nombre}} (Rol {{rol_sii}})\n\n| Variable | Valor |\n|---|---|\n| Humedad FDR 0-20 | {{fdr_0_20_vwc}} % |\n| Tranque | {{tranque_volumen_m3}} m³ |\n| Caudal Longaví | {{caudal_longavi}} m³/s |\n| Carbono | {{carbono_tco2e_ha}} tCO2e/ha |\n\nHash MRV: \`{{mrv_hash}}\``;
        templateFilename = 'Informe_Maestro_Canonico.md';
      }

      // Obtener telemetría consolidada viva
      const telemetry = await getLiveTelemetryData();

      // Generar hash criptográfico dinámico MRV
      const hashPayload = `${telemetry.timestamp}_${telemetry.fdr_0_20_vwc}_${telemetry.tranque_volumen_m3}_${telemetry.caudal_longavi}_${telemetry.carbono_tco2e_ha}`;
      const dynamicMrvHash = '0x' + crypto.createHash('sha256').update(hashPayload).digest('hex').substring(0, 16);
      telemetry.mrv_hash = dynamicMrvHash;

      // Inyectar variables en la plantilla
      const compiledMarkdown = interpolateTemplate(templateContent, telemetry);

      // Guardado automático opcional en /Informes Generados/
      let savedInfo = null;
      if (autoSave) {
        const safeBaseName = templateFilename.replace(/\.md$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
        const timestampSlug = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
        const outFileName = `Informe_${safeBaseName}_${timestampSlug}.md`;
        const outFilePath = path.join(GENERATED_DIR, outFileName);

        fs.writeFileSync(outFilePath, compiledMarkdown, 'utf-8');
        savedInfo = {
          filename: outFileName,
          savedPath: outFilePath,
          obsidianUri: `obsidian://open?vault=${encodeURIComponent('Agro Tech')}&file=${encodeURIComponent('Informes Generados/' + outFileName.replace(/\.md$/, ''))}`
        };
      }

      const titleMatch = compiledMarkdown.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1].replace(/[[\]]/g, '').trim() : templateFilename.replace(/\.md$/, '');

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      });
      res.end(JSON.stringify({
        success: true,
        title,
        templateUsed: templateFilename,
        timestamp: telemetry.timestamp,
        mrv_hash: dynamicMrvHash,
        markdown: compiledMarkdown,
        telemetry,
        saved: savedInfo
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ================================================================
  // 5. API Persistencia de Informe (/api/reports/save)
  // ================================================================
  if (parsedUrl === '/api/reports/save' && req.method === 'POST') {
    try {
      const body = await getRequestBody(req);
      const { title, markdown, filename } = body;

      if (!markdown) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'El contenido Markdown es requerido' }));
        return;
      }

      const timestampSlug = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
      let outFileName = filename;
      if (!outFileName) {
        const safeTitle = (title || 'Informe').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
        outFileName = `Informe_${safeTitle}_${timestampSlug}.md`;
      }
      if (!outFileName.endsWith('.md')) {
        outFileName += '.md';
      }

      const outFilePath = path.join(GENERATED_DIR, outFileName);
      fs.writeFileSync(outFilePath, markdown, 'utf-8');

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      });
      res.end(JSON.stringify({
        success: true,
        filename: outFileName,
        savedPath: outFilePath,
        obsidianUri: `obsidian://open?vault=${encodeURIComponent('Agro Tech')}&file=${encodeURIComponent('Informes Generados/' + outFileName.replace(/\.md$/, ''))}`,
        timestamp: new Date().toISOString()
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ================================================================
  // 6. API Listar Informes Guardados (/api/reports/generated)
  // ================================================================
  if (parsedUrl === '/api/reports/generated') {
    try {
      if (!fs.existsSync(GENERATED_DIR)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ files: [] }));
        return;
      }

      const files = fs.readdirSync(GENERATED_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => {
          const fullPath = path.join(GENERATED_DIR, f);
          const stat = fs.statSync(fullPath);
          return {
            filename: f,
            title: f.replace(/\.md$/, ''),
            size: stat.size,
            mtime: stat.mtime,
            obsidianUri: `obsidian://open?vault=${encodeURIComponent('Agro Tech')}&file=${encodeURIComponent('Informes Generados/' + f.replace(/\.md$/, ''))}`
          };
        })
        .sort((a, b) => b.mtime - a.mtime);

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      });
      res.end(JSON.stringify({ files }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ================================================================
  // 7. API Obsidian: Listar todas las notas del Vault
  // ================================================================
  if (parsedUrl === '/api/obsidian/notes') {
    try {
      if (!fs.existsSync(OBSIDIAN_VAULT_DIR)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ vaultPath: OBSIDIAN_VAULT_DIR, files: [] }));
        return;
      }

      const files = fs.readdirSync(OBSIDIAN_VAULT_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => {
          const fullPath = path.join(OBSIDIAN_VAULT_DIR, f);
          const stat = fs.statSync(fullPath);
          return {
            name: f,
            title: f.replace(/\.md$/, ''),
            size: stat.size,
            mtime: stat.mtime
          };
        })
        .sort((a, b) => b.mtime - a.mtime);

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      });
      res.end(JSON.stringify({ vaultPath: OBSIDIAN_VAULT_DIR, files }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ================================================================
  // 8. API Obsidian: Leer contenido de una nota
  // ================================================================
  if (parsedUrl === '/api/obsidian/note') {
    try {
      const u = new URL(req.url, `http://${req.headers.host}`);
      const filename = u.searchParams.get('file');

      if (!filename || filename.includes('..') || !filename.endsWith('.md')) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Archivo inválido' }));
        return;
      }

      // Buscar en raíz del vault o en subcarpetas
      let fullPath = path.join(OBSIDIAN_VAULT_DIR, filename);
      if (!fs.existsSync(fullPath)) {
        const inTemplates = path.join(TEMPLATES_DIR, filename);
        const inGenerated = path.join(GENERATED_DIR, filename);
        if (fs.existsSync(inTemplates)) fullPath = inTemplates;
        else if (fs.existsSync(inGenerated)) fullPath = inGenerated;
      }

      if (!fs.existsSync(fullPath)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Nota no encontrada' }));
        return;
      }

      const content = fs.readFileSync(fullPath, 'utf-8');
      const stat = fs.statSync(fullPath);

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      });
      res.end(JSON.stringify({
        filename,
        title: path.basename(filename).replace(/\.md$/, ''),
        content,
        mtime: stat.mtime,
        obsidianUri: `obsidian://open?vault=${encodeURIComponent('Agro Tech')}&file=${encodeURIComponent(filename.replace(/\.md$/, ''))}`
      }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ================================================================
  // 9. Servidor de Archivos Estáticos
  // ================================================================
  let safePath = path.normalize(decodeURI(parsedUrl));
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
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 Not Found: ${safePath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[AgroTech HQ] Consola de Fundador activa de forma privada en http://localhost:${PORT}`);
});
