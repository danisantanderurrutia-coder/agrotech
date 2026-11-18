/**
 * ============================================================================
 * 🌿 AGROTECH / AGRITWIN — BOLETÍN SEMANAL DE PROGRESOS Y FOCOS (WEEKLY DIGEST)
 * ============================================================================
 * Automatización en Google Apps Script para consolidar los avances de las
 * 4 ramas operativas y alinear al equipo todos los lunes a las 08:30 AM.
 * 
 * Configuración:
 * 1. Crea una Google Sheet con las columnas indicadas en CONFIG.SHEET_NAME.
 * 2. Pega este código en Extensiones > Apps Script.
 * 3. Configura los correos del equipo en CONFIG.RECIPIENTS.
 * 4. Prueba con enviarBoletinPrueba() para verificar el diseño en tu correo.
 * 5. Agrega un Activador (Trigger) semanal por tiempo en "Activadores" (reloj).
 * ============================================================================
 */

const CONFIG = {
  // Lista de correos del equipo oficial
  RECIPIENTS: [
    'daniel@urrutia.ag',        // Daniel Santander (Fundador / IP)
    'pancho@urrutia.ag',        // Francisco Ipinza (Comercial B2B)
    'wladimir@urrutia.ag',      // Wladimir Gutiérrez (Finanzas / Social)
    'rudi@urrutia.ag',          // Rüdiger Kaatz (Off-Grid / Living Lab)
    'cantuarias@urrutia.ag',    // Cristian Cantuarias (UX / Front 3D)
    'lapiz@urrutia.ag',         // Luis González (Terreno / Drones)
    'daniela@urrutia.ag'        // Daniela Mendoza (Censat / QA Geoespacial)
  ],

  // Correo de prueba para verificar visualización
  TEST_EMAIL: 'daniel@urrutia.ag',

  // Asunto base del correo
  SUBJECT_PREFIX: '🌿 [AgroTech Digest] Progresos & Focos Semanales — Semana ',

  // Configuración de la hoja de cálculo de control (si se usa hoja vinculada)
  SHEET_NAME: 'Progresos_Semanales',

  // Enlaces institucionales
  URL_PANEL_WEB: 'https://agrotech.cl',
  URL_GITHUB: 'https://github.com/danisantanderurrutia-coder/agrotech'
};

/**
 * Función principal para ejecutar semanalmente mediante Time-Driven Trigger.
 * Lee la última fila activa de la hoja o utiliza los datos de la semana en curso.
 */
function enviarBoletinSemanal() {
  const data = obtenerDatosUltimaSemana();
  const htmlBody = compilarPlantillaHTML(data);
  const plainText = compilarTextoPlano(data);
  const subject = CONFIG.SUBJECT_PREFIX + (data.numeroSemana || new Date().toLocaleDateString('es-CL'));

  GmailApp.sendEmail(
    CONFIG.RECIPIENTS.join(','),
    subject,
    plainText,
    {
      htmlBody: htmlBody,
      name: 'AgroTech SpA • Dirección de Operaciones',
      noReply: false
    }
  );

  Logger.log('✅ Boletín semanal enviado exitosamente a ' + CONFIG.RECIPIENTS.length + ' destinatarios.');
}

/**
 * Función de prueba: envía el correo únicamente a CONFIG.TEST_EMAIL para
 * auditar el diseño, colores y tipografía antes del envío general.
 */
function enviarBoletinPrueba() {
  const data = obtenerDatosUltimaSemana();
  const htmlBody = compilarPlantillaHTML(data);
  const plainText = compilarTextoPlano(data);
  const subject = '[PREVIEW] ' + CONFIG.SUBJECT_PREFIX + (data.numeroSemana || 'Demo');

  GmailApp.sendEmail(
    CONFIG.TEST_EMAIL,
    subject,
    plainText,
    {
      htmlBody: htmlBody,
      name: 'AgroTech SpA • Test Preview'
    }
  );

  Logger.log('🧪 Correo de prueba enviado a ' + CONFIG.TEST_EMAIL);
}

/**
 * Obtiene los progresos de la Google Sheet vinculada.
 * Si la hoja está vacía o se ejecuta como standalone, usa datos mock actualizados.
 */
function obtenerDatosUltimaSemana() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) {
      const sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.getActiveSheet();
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        const values = sheet.getRange(lastRow, 1, 1, 9).getValues()[0];
        return {
          numeroSemana: values[0] || 'Semana ' + getWeekNumber(new Date()),
          fecha: values[1] || new Date().toLocaleDateString('es-CL'),
          rama1_hardware: values[2] || '• Montaje de nodos y validación en Living Lab Parral.',
          rama2_ventas: values[3] || '• Prospección con corredoras y diagnóstico de parcelas.',
          rama3_ux: values[4] || '• Optimización del visor 3D y vista estratégica diegética.',
          rama4_core_ip: values[5] || '• Ingesta satelital Sentinel-2 L2A y calibración de balance hídrico.',
          focosProximaSemana: values[6] || '• Validación en terreno Parral y firma de primeros 2 acuerdos B2B.',
          metricasClave: values[7] || 'Kits: 4 activos | Clientes en embudo: 8 | Cobertura: 122.000 ha',
          notaDireccion: values[8] || 'Seguimos con paso firme en terreno y blindaje de nuestra tecnología.'
        };
      }
    }
  } catch (e) {
    Logger.log('Aviso: Operando en modo standalone (sin hoja vinculada). ' + e.message);
  }

  // Fallback con datos por defecto alineados a la estructura real
  return {
    numeroSemana: 'Semana ' + getWeekNumber(new Date()),
    fecha: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }),
    rama1_hardware: '• Rudi Kaatz & Luis González: Despliegue de cámaras 4G solares en Parral y bancos de baterías LiFePO4.\n• Living Lab demostrativo preparado para visitas de compradores extranjeros.',
    rama2_ventas: '• Pancho Ipinza: Negociación con 2 desarrolladores de loteos en el Maule para emisión de informes satelitales.\n• Wladimir: Ronda de contacto con comités APR y estructuración del Pasaporte Verde.',
    rama3_ux: '• Cristian Cantuarias: Prototipado del visor 3D estilo simulación estratégica en rama feature/ui.\n• Integración de controles de cámara orbital e interacción con cuarteles.',
    rama4_core_ip: '• Daniel Santander: Motor biofísico y algoritmos de balance FAO-56 conectados a Copernicus Sentinel-2.\n• Daniela Mendoza: Protocolo de validación QA/QC cartográfico y capas hidrográficas.',
    focosProximaSemana: '1. Jornada técnica en Living Lab Parral (Rudi, Luis, Daniel).\n2. Cierre de convenio con corredora de parcelas para informe satelital de riesgo (Pancho).\n3. Pull Request de la interfaz 3D gamificada para revisión y merge (Cantuarias).\n4. Validación de índices de suelo y cuencas con Censat Colombia (Daniela).',
    metricasClave: 'Nodos KioT: 6 unidades listas | Leads Loteos: 12 | Ha Monitoreadas: 24.8 ha piloto',
    notaDireccion: '"Cero consultorías de escritorio. Mecatrónica de terreno con las botas en el barro, respaldada por ciencia de frontera y gobernanza justa."'
  };
}

/**
 * Plantilla HTML con diseño responsivo, tipografía moderna y paleta corporativa
 * (Verde bosque #0B2519, Esmeralda #059669, Dorado Ámbar #D97706, Pizarra #1E293B).
 */
function compilarPlantillaHTML(d) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AgroTech Digest Semanal</title>
  <style>
    body { margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; }
    .container { max-width: 640px; margin: 24px auto; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #E2E8F0; }
    .header { background: linear-gradient(135deg, #0B2519 0%, #064E3B 100%); padding: 32px 28px; text-align: left; }
    .header-badge { display: inline-block; background-color: rgba(16, 185, 129, 0.2); border: 1px solid #10B981; color: #6EE7B7; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; border-radius: 12px; margin-bottom: 12px; }
    .header h1 { color: #FFFFFF; margin: 0 0 6px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { color: #A7F3D0; margin: 0; font-size: 13px; }
    .content { padding: 28px; }
    .metric-strip { background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 14px; padding: 14px 18px; margin-bottom: 24px; font-size: 12px; font-weight: 600; color: #0F172A; text-align: center; }
    .branch-card { background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 18px; margin-bottom: 16px; transition: border 0.2s; }
    .branch-card.b1 { border-left: 4px solid #F59E0B; }
    .branch-card.b2 { border-left: 4px solid #3B82F6; }
    .branch-card.b3 { border-left: 4px solid #06B6D4; }
    .branch-card.b4 { border-left: 4px solid #10B981; }
    .branch-title { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
    .branch-content { font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-line; }
    .focus-box { background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%); border: 1px solid #F59E0B; border-radius: 14px; padding: 20px; margin: 24px 0; }
    .focus-title { font-size: 13px; font-weight: 800; text-transform: uppercase; color: #92400E; margin-bottom: 10px; }
    .focus-list { font-size: 13px; line-height: 1.65; color: #78350F; white-space: pre-line; }
    .quote-box { background-color: #F0FDF4; border: 1px dashed #10B981; border-radius: 12px; padding: 14px 18px; font-style: italic; font-size: 12px; color: #065F46; text-align: center; margin-bottom: 24px; }
    .btn-row { text-align: center; margin: 24px 0 12px 0; }
    .btn { display: inline-block; background-color: #064E3B; color: #FFFFFF !important; text-decoration: none; font-size: 12px; font-weight: 700; padding: 12px 24px; border-radius: 10px; margin: 0 6px; }
    .footer { background-color: #0B2519; color: #94A3B8; padding: 24px; font-size: 11px; text-align: center; line-height: 1.6; }
    .footer a { color: #6EE7B7; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- Encabezado -->
    <div class="header">
      <div class="header-badge">🌿 AGROTECH SpA • BOLETÍN SEMANAL</div>
      <h1>Sincronización de Equipo: ${d.numeroSemana}</h1>
      <p>Edición oficial del ${d.fecha} • Maule 🇨🇱 / Berlín 🇩🇪</p>
    </div>

    <div class="content">
      
      <!-- Pastilla de Métricas Rápidas -->
      <div class="metric-strip">
        📊 <strong>Pulso Operativo:</strong> ${d.metricasClave}
      </div>

      <!-- Rama 1: Hardware & Off-Grid -->
      <div class="branch-card b1">
        <div class="branch-title" style="color: #B45309;">
          🔋 Rama 1: Acceso & Hardware de Campo (Rudi & Luis)
        </div>
        <div class="branch-content">${d.rama1_hardware}</div>
      </div>

      <!-- Rama 2: Comercial & Ventas -->
      <div class="branch-card b2">
        <div class="branch-title" style="color: #1D4ED8;">
          💼 Rama 2: Clientes & Ventas B2B / Loteos (Pancho & Wladimir)
        </div>
        <div class="branch-content">${d.rama2_ventas}</div>
      </div>

      <!-- Rama 3: Producto & UX -->
      <div class="branch-card b3">
        <div class="branch-title" style="color: #0E7490;">
          🎨 Rama 3: Experiencia de Usuario & Gamificación 3D (Cantuarias & Daniel)
        </div>
        <div class="branch-content">${d.rama3_ux}</div>
      </div>

      <!-- Rama 4: Core IP & Data Engine -->
      <div class="branch-card b4">
        <div class="branch-title" style="color: #047857;">
          🛰️ Rama 4: Motor Biofísico & Teledetección (Daniel & Daniela)
        </div>
        <div class="branch-content">${d.rama4_core_ip}</div>
      </div>

      <!-- Focos de la Próxima Semana -->
      <div class="focus-box">
        <div class="focus-title">🎯 Focos Críticos de la Semana Entrante</div>
        <div class="focus-list">${d.focosProximaSemana}</div>
      </div>

      <!-- Cita / Nota de Dirección -->
      <div class="quote-box">
        ${d.notaDireccion}
      </div>

      <!-- Botones de Acción -->
      <div class="btn-row">
        <a href="${CONFIG.URL_PANEL_WEB}" class="btn">Abrir Panel Web AgroTech</a>
        <a href="${CONFIG.URL_GITHUB}" class="btn" style="background-color: #334155;">Ver Repositorio Git</a>
      </div>

    </div>

    <!-- Pie de Página de Gobernanza -->
    <div class="footer">
      <p style="margin: 0 0 6px 0;"><strong>AgroTech Chile SpA & Living Lab Parral</strong></p>
      <p style="margin: 0 0 10px 0;">Ecosistema Agroecológico, Telemetría Satelital y Resiliencia Hídrica.</p>
      <p style="margin: 0;">Este es un despacho automatizado interno para socios y líderes de rama.<br>
      Para sugerencias o ajustes de entregables, responde directamente a este correo.</p>
    </div>

  </div>
</body>
</html>
  `;
}

/**
 * Fallback a texto plano para clientes de correo sin renderizado HTML.
 */
function compilarTextoPlano(d) {
  return `
====================================================
🌿 AGROTECH SpA — BOLETÍN SEMANAL (${d.numeroSemana})
Fecha: ${d.fecha}
====================================================

PULSO OPERATIVO:
${d.metricasClave}

----------------------------------------------------
1. RAMA 1: ACCESO & HARDWARE DE CAMPO (Rudi & Luis)
----------------------------------------------------
${d.rama1_hardware}

----------------------------------------------------
2. RAMA 2: CLIENTES & VENTAS B2B / LOTEOS (Pancho & Wladimir)
----------------------------------------------------
${d.rama2_ventas}

----------------------------------------------------
3. RAMA 3: EXPERIENCIA DE USUARIO & GAMIFICACIÓN (Cantuarias & Daniel)
----------------------------------------------------
${d.rama3_ux}

----------------------------------------------------
4. RAMA 4: MOTOR BIOFÍSICO & TELEDETECCIÓN (Daniel & Daniela)
----------------------------------------------------
${d.rama4_core_ip}

----------------------------------------------------
🎯 FOCOS CRÍTICOS DE LA PRÓXIMA SEMANA:
${d.focosProximaSemana}

----------------------------------------------------
"${d.notaDireccion}"

Plataforma Web: ${CONFIG.URL_PANEL_WEB}
Repositorio: ${CONFIG.URL_GITHUB}
====================================================
  `;
}

/**
 * Helper para calcular el número de semana ISO del año.
 */
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}
