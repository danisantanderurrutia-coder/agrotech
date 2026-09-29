/**
 * AgriTwin - AgroWorkshopOverlay Module
 * 
 * Implements the Age of Empires II diegetic Workshop Menu ("Taller Agrícola"):
 *  - Diegetic background layer (workshop_bg.png)
 *  - 6 Interactive cutout PNG sprites with percentage positioning
 *  - Physics hang/sway & golden glow hover effects
 *  - Diegetic wood & brass tooltips
 *  - Fixed Admin Panel with live audited File Tree and central engines dock
 *  - Interactive dynamic Chart.js replacement for Python static graphs
 *  - Seamless navigation to all audited tools and 3D digital twin
 */

import { bus } from '../utils/EventBus.js';

export const WORKSHOP_STATIONS_DATA = [
  {
    id: 'station_a',
    code: 'OBJ-A',
    title: 'Manual & Documentación Biofísica',
    shortTitle: 'Libreta Biofísica',
    category: 'Modelos Biofísicos',
    badge: 'FAO-56 / Penman',
    spriteSrc: 'assets/ui/sprite_a_clipboard.png',
    position: { top: '22%', left: '6.5%', width: '9.5%' },
    hangClass: 'sprite-a',
    description: 'Documentación técnica de algoritmos biofísicos: evapotranspiración real Penman-Monteith, balance hídrico en 3 estratos radiculares y modelo DEM de acumulación katabática de aire frío.',
    tools: [
      'FAO-56 Penman-Monteith (ETc = ETo × Kc)',
      'Balance Hídrico en 3 Estratos (0-20, 20-60, 60-100cm)',
      'Modelo DEM de Drenaje Katabático de Heladas',
      'Catálogo Taxonómico Botánico de Cultivos & Nativos'
    ],
    chartData: {
      labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      dataset1: [36, 34, 32, 33, 41, 39, 37, 36],
      dataset2: [28, 27, 26, 28, 35, 34, 31, 29],
      label1: 'Estrato 1 (0-20 cm) %',
      label2: 'Estrato 2 (20-60 cm) %'
    },
    action: (app, overlay) => {
      if (overlay) {
        overlay.showAdminPanel = true;
        overlay.activeAdminTab = 'predios';
        overlay.render();
      }
    }
  },
  {
    id: 'station_b',
    code: 'OBJ-B',
    title: 'Configurador IoT & Terreno',
    shortTitle: 'Tablero IoT',
    category: 'Hardware & Polígonos',
    badge: 'ESP32 / LoRaWAN',
    spriteSrc: 'assets/ui/sprite_b_iot_board.png',
    position: { top: '23%', left: '19.5%', width: '10.5%' },
    hangClass: 'sprite-b',
    description: 'Tablero de taller para calibración de sondas de humedad FDR capacitivas, gestión de enlaces LoRaWAN / 4G, delimitación de cuarteles con Pincel 3D e importación Shapefile.',
    tools: [
      'Gestor de Sondas IoT ESP32 / LoRaWAN',
      'Pincel 3D Poligonal & Medición de Superficies',
      'Tarjetas Flotantes HTML en Espacio 3D',
      'Importador/Exportador .agritwin y Shapefiles'
    ],
    chartData: {
      labels: ['Nodo 1', 'Nodo 2', 'Nodo 3', 'Nodo 4', 'Nodo 5'],
      dataset1: [38.2, 42.1, 29.4, 36.8, 35.0],
      dataset2: [94, 88, 76, 98, 85],
      label1: 'Humedad de Suelo (%)',
      label2: 'Batería del Nodo (%)'
    },
    action: (app, overlay) => {
      if (overlay) {
        overlay.showAdminPanel = true;
        overlay.activeAdminTab = 'sensors';
        overlay.render();
      }
    }
  },
  {
    id: 'station_c',
    code: 'OBJ-C',
    title: 'Visor Predial 3D / AgroTwin',
    shortTitle: 'Mesa de Planos 3D',
    category: 'Motor Gráfico WebGL',
    badge: 'Three.js / PBR',
    spriteSrc: 'assets/ui/sprite_c_monitor.png',
    position: { top: '56%', left: '50.5%', width: '13%' },
    hangClass: 'sprite-c',
    description: 'Centro de mando táctico del gemelo digital: relieve topográfico DEM dinámico, textura de suelo PBR con surcos normales, iluminación solar diurna y parcelas extruidas estilo Civ VI.',
    tools: [
      'Motor 3D Three.js r128 (PBR Shaders)',
      'Capas de Suelo, NDVI & Esri World Imagery',
      'Vegetación Instanciada (Single-Draw-Call)',
      'Simulador Solar Diurno & Hora Dorada'
    ],
    chartData: {
      labels: ['Cuartel A', 'Cuartel B', 'Cuartel C', 'Cuartel D', 'Borde Estero'],
      dataset1: [0.78, 0.82, 0.65, 0.71, 0.89],
      dataset2: [12.4, 8.6, 14.1, 9.8, 5.2],
      label1: 'Índice Vigor NDVI',
      label2: 'Área Cuartel (ha)'
    },
    action: (app, overlay) => {
      if (overlay) {
        overlay.showCampaignBoard = !overlay.showCampaignBoard;
        overlay.render();
      }
    }
  },
  {
    id: 'station_map',
    code: 'MOSAICO-PREDIAL',
    title: 'Mosaico & Límites Prediales (Rol SII)',
    shortTitle: 'Mosaico & Límites Prediales',
    category: 'Simulación Territorial Local',
    badge: 'Casillas Territoriales',
    spriteSrc: 'assets/ui/sprite_map_vecinal.png',
    position: { top: '54%', left: '68%', width: '13%' },
    hangClass: 'sprite-map',
    description: 'Mosaico predial y simulación territorial de casillas (15x11) para evaluar límites prediales contiguos, modelación de incendios forestales con viento Puelche, y amortiguación de crecidas fluviales con tranque Keyline.',
    tools: [
      'Cuadrícula Territorial de Casillas (15x11)',
      'Predios Vecinos Contiguos (Riesgo FWI / Interfaz)',
      'Simulador Fluvial TWI & Tranque Keyline',
      'Acople Biunívoco con Gemelo Predial 3D'
    ],
    chartData: {
      labels: ['Fundo Meniels', 'Forestal Los Pinos', 'Viña Santa Elena', 'Parcela Don Pedro', 'Reserva Esclerófila'],
      dataset1: [18, 72, 32, 28, 15],
      dataset2: [24.8, 140.0, 35.2, 18.0, 62.0],
      label1: 'Índice Riesgo FWI',
      label2: 'Superficie Predial (ha)'
    },
    action: (app, overlay) => {
      if (overlay) {
        const station = WORKSHOP_STATIONS_DATA.find(s => s.id === 'station_map');
        overlay.openStationModal(station);
      } else if (app?.uiController) {
        app.uiController.openVecinosCatanModal();
      }
    }
  },
  {
    id: 'station_d',
    code: 'OBJ-D',
    title: 'Histórico ESG / MRV Ledger',
    shortTitle: 'Libro de Registros ESG',
    category: 'Certificación & Carbono',
    badge: 'Cero Deforestación',
    spriteSrc: 'assets/ui/sprite_d_esg_book.png',
    position: { top: '69%', left: '33%', width: '10.5%' },
    hangClass: 'sprite-d',
    description: 'Libro maestro de auditoría ambiental: pasaporte digital de trazabilidad, secuestro de carbono tCO2e/ha certificado con hash criptográfico MRV y cumplimiento EUDR 100% Cero Deforestación.',
    tools: [
      'Balance de Carbono (4.8 tCO2e/ha secuestradas)',
      'EUDR Cero Deforestación (Línea base Sentinel-2 2020)',
      'Índice de Integridad Ecológica (IEI: 0.88)',
      'Hash Criptográfico MRV: 0x8f2d4a19c6e'
    ],
    chartData: {
      labels: ['2020', '2021', '2022', '2023', '2024', '2025 (Prev)'],
      dataset1: [1.8, 2.4, 3.1, 3.9, 4.8, 5.6],
      dataset2: [0.65, 0.70, 0.76, 0.82, 0.88, 0.92],
      label1: 'Carbono Secuestrado (tCO2e/ha)',
      label2: 'Índice Integridad IEI'
    },
    action: (app, overlay) => {
      if (overlay) {
        overlay.showAdminPanel = true;
        overlay.activeAdminTab = 'vault';
        overlay.render();
      }
    }
  },
  {
    id: 'station_e',
    code: 'OBJ-E',
    title: 'Red Territorial & APRs',
    shortTitle: 'Radio & Pizarra Comunal',
    category: 'Comunidad B2G',
    badge: 'Acuíferos & FWI',
    spriteSrc: 'assets/ui/sprite_e_radio.png',
    position: { top: '44%', left: '36%', width: '11%' },
    hangClass: 'sprite-e',
    description: 'Estación de enlace territorial: semáforo de recarga de acuíferos para Comités de Agua Potable Rural (APR), índice de riesgo de incendios FWI y cálculo de camiones aljibe evitados.',
    tools: [
      'Semáforo de Acuíferos & Pozos Comunitarios',
      'Índice de Incendios Forestales FWI & Combustible',
      'Planificación de Cortafuegos Preventivos (14.2 km)',
      'Monitoreo Social B2G: 1,420 Familias Abastecidas'
    ],
    chartData: {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      dataset1: [18, 24, 38, 45, 52, 42, 28],
      dataset2: [72, 70, 68, 65, 63, 62, 64],
      label1: 'Índice FWI Piro-Riesgo',
      label2: 'Nivel Freático Acuífero (%)'
    },
    action: (app, overlay) => {
      if (overlay) overlay.close();
      const btnTerritorial = document.getElementById('nav_profile_territorial');
      if (btnTerritorial) btnTerritorial.click();
    }
  },
  {
    id: 'station_f',
    code: 'OBJ-F',
    title: 'Ajustes del Sistema & Telemetría',
    shortTitle: 'Caja de Herramientas',
    category: 'Configuración & APIs',
    badge: 'Webhooks / n8n',
    spriteSrc: 'assets/ui/sprite_f_toolbox.png',
    position: { top: '68%', left: '10%', width: '12%' },
    hangClass: 'sprite-f',
    description: 'Caja de herramientas técnicas: inspección de shaders GLSL en vivo, calibración de post-procesamiento UnrealBloom, configuración de webhooks n8n y despacho de alertas autónomas a WhatsApp Business.',
    tools: [
      'Inspector Técnico 3D (FPS, Shaders, Memoria)',
      'Webhooks n8n & WhatsApp Cloud API',
      'Velocidad de Simulación Temporal (1x, 2x, 5x)',
      'Parámetros Globales & Protocolos de Calibración'
    ],
    chartData: {
      labels: ['Draw Calls', 'Triángulos (k)', 'Texturas (MB)', 'Shader Passes', 'FPS'],
      dataset1: [4, 48, 32, 6, 60],
      dataset2: [12, 120, 96, 10, 30],
      label1: 'Métricas Actuales',
      label2: 'Umbral Máximo Seguro'
    },
    action: (app, overlay) => {
      if (overlay) {
        overlay.showAdminPanel = true;
        overlay.activeAdminTab = 'scripts';
        overlay.render();
      }
    }
  }
];

// ─── Procedural Audio Engine (Silenciado Total por instrucción de usuario) ────
class WorkshopAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }
  init() {}
  playWoodClick() {}
  playBellGong() {}
  playParchmentOpen() {}
}

export class AgroWorkshopOverlay {
  constructor(app) {
    this.app = app;
    this.audio = new WorkshopAudioEngine();
    this.overlayEl = null;
    this.activeModalStation = null;
    this.showAdminPanel = false;
    this.activeAdminTab = 'sensors';
    this.sensorSubView = 'telemetry';
    this.simTemp = 18.5;
    this.simMoisture = 36.2;
    this.simCwsi = 0.25;
    this.selectedPredioId = 'meniels';
    this.currentChartInstance = null;
    this.showCampaignBoard = true;
  }

  init() {
    this.injectHTML();
    this.bindEvents();
    if (window.location.hash.includes('predio') || window.location.hash.includes('twin')) {
      this.close();
    }
  }

  injectHTML() {
    let overlay = document.getElementById('workshopOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'workshopOverlay';
      overlay.className = 'workshop-overlay';
      document.body.appendChild(overlay);
    }
    this.overlayEl = overlay;
    this.render();
  }

  render() {
    this.overlayEl.innerHTML = `
      <!-- Header Superior Fijo Unificado (Master Suite Proportions) -->
      <header class="workshop-header" style="height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(13, 19, 34, 0.95); backdrop-filter: blur(16px); z-index: 50; font-family: 'Plus Jakarta Sans', sans-serif;">
        <div class="workshop-brand" style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 32px; height: 32px; border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.4); background: rgba(120, 53, 15, 0.5); display: flex; align-items: center; justify-content: center; font-size: 14px;">
            🏡
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.35rem; line-height: 1;">
              <span style="font-weight: 800; font-size: 13px; color: #f59e0b; letter-spacing: 0.05em;">AGROTWIN</span>
              <span style="font-weight: 700; font-size: 13px; color: white;">3D PREDIAL</span>
            </div>
            <div style="font-size: 9px; color: #94a3b8; font-family: 'JetBrains Mono', monospace;">MOMENTO 1 • EL GALPÓN (FUNDO COLLIGUAY)</div>
          </div>
        </div>

        <!-- SELECTOR DE VISTAS MAESTRAS UNIFICADO -->
        <nav style="display: flex; align-items: center; gap: 4px; background: rgba(0,0,0,0.4); padding: 4px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); font-family: 'Plus Jakarta Sans', sans-serif;">
          <a target="_top" href="http://localhost:7777" style="padding: 5px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; color: #cbd5e1; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.08)'; this.style.color='white'" onmouseout="this.style.background='transparent'; this.style.color='#cbd5e1'">
            <span>🏛️</span> Centro
          </a>
          <span style="padding: 5px 10px; border-radius: 8px; font-size: 12px; font-weight: 700; color: #fde047; background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.4); display: flex; align-items: center; gap: 5px; cursor: default;">
            <span>🏡</span> El Galpón (3D)
          </span>
          <a target="_top" href="http://localhost:7777/#cerro" style="padding: 5px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; color: #cbd5e1; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: all 0.2s;" onmouseover="this.style.background='rgba(14, 165, 233, 0.15)'; this.style.color='#38bdf8'" onmouseout="this.style.background='transparent'; this.style.color='#cbd5e1'">
            <span>🏔️</span> El Cerro (Cuenca)
          </a>
          <a target="_top" href="http://localhost:7777/#mesa" style="padding: 5px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; color: #cbd5e1; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: all 0.2s;" onmouseover="this.style.background='rgba(16, 185, 129, 0.15)'; this.style.color='#34d399'" onmouseout="this.style.background='transparent'; this.style.color='#cbd5e1'">
            <span>🤝</span> La Mesa (Vecinos)
          </a>
          <a target="_top" href="http://localhost:7777/#telemetry" style="padding: 5px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; color: #cbd5e1; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.08)'; this.style.color='white'" onmouseout="this.style.background='transparent'; this.style.color='#cbd5e1'">
            <span>📊</span> Telemetría
          </a>
          <a target="_top" href="http://localhost:7777/#docs" style="padding: 5px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; color: #cbd5e1; text-decoration: none; display: flex; align-items: center; gap: 5px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.08)'; this.style.color='white'" onmouseout="this.style.background='transparent'; this.style.color='#cbd5e1'">
            <span>📚</span> Vault Docs
          </a>
        </nav>

        <!-- Acciones: Panel Administrador y Entrar al Gemelo -->
        <div class="workshop-actions" style="display: flex; align-items: center; gap: 8px;">
          <button id="btnWorkshopAdminToggle" class="btn-workshop-action ${this.showAdminPanel ? 'active' : ''}" style="padding: 6px 12px; border-radius: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #cbd5e1; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;" title="Abrir Panel de Administrador, Documentación y Árbol de Archivos">
            <span>📂</span>
            <span>Panel Administrador</span>
          </button>

          <button id="btnWorkshopLaunchTwin" class="btn-workshop-action btn-workshop-primary" style="padding: 6px 14px; border-radius: 8px; background: linear-gradient(135deg, #f59e0b, #d97706); border: 1px solid rgba(251, 191, 36, 0.4); color: #1e1103; font-size: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);" title="Volar al Gemelo Digital 3D">
            <span>🌾</span>
            <span>Entrar al Fundo 3D</span>
          </button>

          <button id="btnWorkshopClose" class="btn-workshop-close" style="width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Cerrar Taller (Esc)">
            &times;
          </button>
        </div>
      </header>

      <!-- Escena Diegética: Fondo + Sprites PNG -->
      <div class="workshop-stage-container">
        <div class="workshop-stage-viewport">
          <img src="assets/ui/workshop_bg.png" alt="Taller Agrícola Menú" class="workshop-bg-img" draggable="false">
          <div class="workshop-vignette"></div>

          <!-- Panel Central Obsidian Glass: Selección y Despacho Predial (Solo visible al hacer clic en Mesa de Planos) -->
          ${this.showCampaignBoard ? `
          <div class="workshop-campaign-board" id="workshopCampaignBoard" style="position: absolute; top: 24px; left: 50%; transform: translateX(-50%); z-index: 45; width: 620px; max-width: 94vw; animation: fadeIn 0.25s ease-out;">
            <div style="position: relative; background: rgba(13, 19, 34, 0.96); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 20px; padding: 22px 24px; box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 158, 11, 0.2); text-align: center;">

              <!-- Botón Cerrar Tablero -->
              <button id="btnCloseCampaignBoard" style="position: absolute; top: 12px; right: 14px; width: 28px; height: 28px; border-radius: 8px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #cbd5e1; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" onmouseover="this.style.color='white'; this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.color='#cbd5e1'; this.style.background='rgba(255,255,255,0.08)'">&times;</button>

              <!-- Ribbon de Identificación -->
              <div style="display: inline-flex; align-items: center; gap: 6px; padding: 3px 12px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 9999px; margin-bottom: 10px;">
                <span style="font-size: 11px;">🏡</span>
                <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #fbbf24;">
                  MOMENTO 1 • TRABAJO DIARIO EN EL GALPÓN
                </span>
              </div>

              <!-- Título del Predio -->
              <div style="margin-bottom: 12px;">
                <h2 style="font-size: 22px; font-weight: 800; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: -0.02em; margin: 0 0 4px 0;">
                  ${this.app?.projectManager?.currentProject?.name || 'Fundo Estero Colliguay'}
                </h2>
                <div style="font-size: 11px; color: #94a3b8; font-family: 'JetBrains Mono', monospace; display: flex; align-items: center; justify-content: center; gap: 8px;">
                  <span>📍 Parral, Maule Sur</span>
                  <span>•</span>
                  <span>12.8 ha • PRV & Keyline</span>
                  <span>•</span>
                  <span style="color: #10b981;">Ground-Truth Activo</span>
                </div>
              </div>

              <!-- Píldoras de Telemetría Predial -->
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 18px; font-family: 'JetBrains Mono', monospace;">
                <div style="background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.06); padding: 8px; border-radius: 12px; text-align: center;">
                  <span style="font-size: 9px; color: #64748b; display: block; text-transform: uppercase;">Superficie</span>
                  <span style="font-size: 13px; font-weight: 800; color: #f8fafc;">12.8 ha</span>
                </div>
                <div style="background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.06); padding: 8px; border-radius: 12px; text-align: center;">
                  <span style="font-size: 9px; color: #64748b; display: block; text-transform: uppercase;">Red IoT</span>
                  <span style="font-size: 13px; font-weight: 800; color: #10b981;">5 Sondas</span>
                </div>
                <div style="background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.06); padding: 8px; border-radius: 12px; text-align: center;">
                  <span style="font-size: 9px; color: #64748b; display: block; text-transform: uppercase;">Humedad Suelo</span>
                  <span style="font-size: 13px; font-weight: 800; color: #0ea5e9;">37.2% VWC</span>
                </div>
                <div style="background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.06); padding: 8px; border-radius: 12px; text-align: center;">
                  <span style="font-size: 9px; color: #64748b; display: block; text-transform: uppercase;">Tranque Keyline</span>
                  <span style="font-size: 13px; font-weight: 800; color: #f59e0b;">18.5k m³</span>
                </div>
              </div>

              <!-- Modos de Interacción (3 Momentos Unificados) -->
              <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
                <!-- Modo 1: Entrar al Gemelo Predial 3D -->
                <button id="btnBoardLaunchColliguay" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-radius: 14px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(180, 83, 9, 0.15)); border: 1px solid rgba(245, 158, 11, 0.5); cursor: pointer; text-align: left; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(245, 158, 11, 0.8)'" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(245, 158, 11, 0.5)'">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 24px;">🏡</span>
                    <div>
                      <div style="font-weight: 800; font-size: 13px; color: #fef08a; font-family: 'Plus Jakarta Sans', sans-serif;">Entrar al Fundo Colliguay 3D</div>
                      <div style="font-size: 11px; color: #cbd5e1; font-family: 'JetBrains Mono', monospace;">WebGL Three.js • 8 Potreros PRV • Curvas Keyline</div>
                    </div>
                  </div>
                  <span style="font-weight: 800; color: #f59e0b; font-size: 14px;">▶</span>
                </button>

                <!-- Modo 2: Subir a la Cumbre del Cerro -->
                <a target="_top" href="http://localhost:7777/#cerro" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-radius: 14px; background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(3, 105, 161, 0.1)); border: 1px solid rgba(14, 165, 233, 0.4); text-decoration: none; cursor: pointer; text-align: left; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(14, 165, 233, 0.8)'" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(14, 165, 233, 0.4)'">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 24px;">🏔️</span>
                    <div>
                      <div style="font-weight: 800; font-size: 13px; color: #7dd3fc; font-family: 'Plus Jakarta Sans', sans-serif;">Subir a la Cumbre del Cerro (Cuenca)</div>
                      <div style="font-size: 11px; color: #cbd5e1; font-family: 'JetBrains Mono', monospace;">Macro-Paisaje 122k ha • Río Longaví • Riesgo FWI</div>
                    </div>
                  </div>
                  <span style="font-weight: 800; color: #38bdf8; font-size: 14px;">↗</span>
                </a>

                <!-- Modo 3: La Mesa de Vecinos -->
                <a target="_top" href="http://localhost:7777/#mesa" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-radius: 14px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(4, 120, 87, 0.1)); border: 1px solid rgba(16, 185, 129, 0.4); text-decoration: none; cursor: pointer; text-align: left; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(16, 185, 129, 0.8)'" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(16, 185, 129, 0.4)'">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 24px;">🤝</span>
                    <div>
                      <div style="font-weight: 800; font-size: 13px; color: #6ee7b7; font-family: 'Plus Jakarta Sans', sans-serif;">Unirse a la Mesa de Vecinos (DAO)</div>
                      <div style="font-size: 11px; color: #cbd5e1; font-family: 'JetBrains Mono', monospace;">10 Predios • Voto Cuadrático • Acuerdos de Borde</div>
                    </div>
                  </div>
                  <span style="font-weight: 800; color: #34d399; font-size: 14px;">↗</span>
                </a>
              </div>

              <!-- Acciones Secundarias de Proyecto -->
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                <button id="btnBoardNewProject" style="padding: 8px 10px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">
                  <span>✨</span> Nuevo Predio
                </button>
                <button id="btnBoardOpenProject" style="padding: 8px 10px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">
                  <span>📁</span> Cargar .agritwin
                </button>
                <button id="btnBoardImportGis" style="padding: 8px 10px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.06)'">
                  <span>🗺️</span> Importar (.shp)
                </button>
              </div>

              <div style="margin-top: 14px; font-size: 10px; color: #64748b; font-family: 'JetBrains Mono', monospace;">
                💡 Explora las estaciones técnicas diegéticas o presiona <kbd style="background: rgba(255,255,255,0.1); padding: 1px 5px; border-radius: 4px; color: #cbd5e1;">W</kbd> para alternar el taller.
              </div>
            </div>
          </div>
          ` : ''}

          <!-- Los 6 Sprites Recortados Diegéticos -->
          ${WORKSHOP_STATIONS_DATA.map(st => `
            <div class="workshop-sprite-anchor ${st.hangClass}" data-station-id="${st.id}" style="top: ${st.position.top}; left: ${st.position.left}; width: ${st.position.width};">
              <img src="${st.spriteSrc}" alt="${st.title}" class="workshop-sprite-img" draggable="false">
              <span class="sprite-ping-dot"></span>

              <!-- Cartela Tooltip Madera y Latón -->
              <div class="workshop-tooltip">
                <div class="tooltip-cartela">
                  <div class="tooltip-header">
                    <span class="tooltip-code">${st.code} • ${st.badge}</span>
                    <span class="tooltip-category">${st.category}</span>
                  </div>
                  <h4 class="tooltip-title">${st.title}</h4>
                  <p class="tooltip-desc">${st.description}</p>
                  <div class="tooltip-footer">
                    <span class="tooltip-callout">▶ Clic para interactuar</span>
                    <span style="color: #a8a29e;">${st.tools.length} submódulos</span>
                  </div>
                </div>
              </div>

              <!-- Letrero Colgante Inferior -->
              <div class="sprite-hanging-label">
                <span>${st.shortTitle}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Panel Lateral de Administrador & Árbol de Archivos (Dockeable) -->
      ${this.showAdminPanel ? this.renderAdminPanelHTML() : ''}

      <!-- Modal de Detalle de Estación con Gráfica Dinámica Chart.js -->
      ${this.activeModalStation ? this.renderStationModalHTML(this.activeModalStation) : ''}
    `;

    this.bindDynamicListeners();
  }

  renderAdminPanelHTML() {
    return `
      <aside class="workshop-admin-panel" style="background: rgba(13, 19, 34, 0.98); backdrop-filter: blur(20px); border-left: 1px solid rgba(255, 255, 255, 0.12); font-family: 'Plus Jakarta Sans', sans-serif;">
        <div class="admin-panel-header" style="height: 56px; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.4); padding: 0 16px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 28px; height: 28px; border-radius: 6px; background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.4); display: flex; align-items: center; justify-content: center; font-size: 13px;">
              📚
            </div>
            <div>
              <div style="font-size: 12px; font-weight: 800; color: #f8fafc; letter-spacing: -0.01em;">
                PANEL MAESTRO PREDIAL & TELEMETRÍA
              </div>
              <div style="font-size: 10px; color: #94a3b8; font-family: 'JetBrains Mono', monospace;">
                MOMENTO 1 • CENTRO TÉCNICO & REGISTRO DE CAMPO
              </div>
            </div>
          </div>
          <button id="btnCloseAdminPanel" class="btn-workshop-close" style="width: 28px; height: 28px; border-radius: 6px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1; cursor: pointer; display: flex; align-items: center; justify-content: center;">&times;</button>
        </div>

        <nav class="admin-tabs-nav" style="display: flex; gap: 4px; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2); flex-wrap: wrap;">
          <button class="admin-tab-btn ${this.activeAdminTab === 'sensors' ? 'active' : ''}" data-tab="sensors">📟 Sensores IoT</button>
          <button class="admin-tab-btn ${this.activeAdminTab === 'predios' ? 'active' : ''}" data-tab="predios">📋 Libreta Biofísica</button>
          <button class="admin-tab-btn ${this.activeAdminTab === 'scripts' ? 'active' : ''}" data-tab="scripts">🧰 Herramientas & CLI</button>
          <button class="admin-tab-btn ${this.activeAdminTab === 'vault' ? 'active' : ''}" data-tab="vault">📖 Libro ESG / MRV</button>
          <button class="admin-tab-btn ${this.activeAdminTab === 'tree' ? 'active' : ''}" data-tab="tree">🌳 Árbol</button>
          <button class="admin-tab-btn ${this.activeAdminTab === 'engines' ? 'active' : ''}" data-tab="engines">⚙️ Motores</button>
        </nav>

        <div class="admin-panel-body" style="padding: 16px; display: flex; flex-direction: column; gap: 14px;">

          <!-- ================= TAB: SENSORES IOT & INFORME ================= -->
          ${this.activeAdminTab === 'sensors' ? `
            <div style="display: flex; gap: 6px; background: rgba(0,0,0,0.4); padding: 4px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
              <button id="btnSubTelemetria" style="flex: 1; padding: 6px; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: bold; border-radius: 6px; border: none; cursor: pointer; ${this.sensorSubView === 'telemetry' ? 'background: rgba(245, 158, 11, 0.3); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.5);' : 'background: transparent; color: #94a3b8;'}">
                📡 Telemetría & Calibración
              </button>
              <button id="btnSubInforme" style="flex: 1; padding: 6px; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: bold; border-radius: 6px; border: none; cursor: pointer; ${this.sensorSubView === 'report' ? 'background: rgba(16, 185, 129, 0.3); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.5);' : 'background: transparent; color: #94a3b8;'}">
                📋 Formato Informe Oficial
              </button>
            </div>

            ${this.sensorSubView === 'telemetry' ? `
              <!-- Sliders de Calibración Interactiva -->
              <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); font-family: 'JetBrains Mono', monospace; font-size: 11px; display: flex; flex-direction: column; gap: 10px;">
                <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #fbbf24; font-size: 12px;">Calibración de Sondas FDR en Vivo:</div>
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span style="color: #cbd5e1;">Temperatura de Suelo:</span>
                    <span id="txtSimTemp" style="color: #fbbf24; font-weight: bold;">${this.simTemp}°C</span>
                  </div>
                  <input type="range" id="sliderSimTemp" min="0" max="42" step="0.5" value="${this.simTemp}" style="width: 100%; accent-color: #f59e0b;">
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span style="color: #cbd5e1;">Humedad Estrato 1 (0-20cm):</span>
                    <span id="txtSimMoisture" style="color: #38bdf8; font-weight: bold;">${this.simMoisture}%</span>
                  </div>
                  <input type="range" id="sliderSimMoisture" min="10" max="60" step="0.5" value="${this.simMoisture}" style="width: 100%; accent-color: #0284c7;">
                </div>
                <div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span style="color: #cbd5e1;">Índice CWSI (Estrés Hídrico):</span>
                    <span id="txtSimCwsi" style="color: #4ade80; font-weight: bold;">${this.simCwsi}</span>
                  </div>
                  <input type="range" id="sliderSimCwsi" min="0" max="1" step="0.05" value="${this.simCwsi}" style="width: 100%; accent-color: #22c55e;">
                </div>
              </div>

              <!-- Nodos Activos en Predio Meniels -->
              <div style="background: #1c1008; padding: 10px; border-radius: 8px; border: 1px solid rgba(120,53,15,0.6); font-family: monospace; font-size: 11px; display: flex; flex-direction: column; gap: 6px;">
                <span style="color: #fbbf24; font-weight: bold;">Telemetría Nodos KioT in situ:</span>
                <div style="display: flex; justify-content: space-between; padding: 4px 6px; background: #27160c; border-radius: 4px;">
                  <span>🟢 Nodo 1 (Cuartel A - Cerezo)</span>
                  <span style="color: #38bdf8;">38.2% | Bat: 94%</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 4px 6px; background: #27160c; border-radius: 4px;">
                  <span>🟢 Nodo 2 (Cuartel B - Parrón)</span>
                  <span style="color: #38bdf8;">42.1% | Bat: 88%</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 4px 6px; background: #27160c; border-radius: 4px;">
                  <span>🟢 Nodo 3 (Hondonada Estero)</span>
                  <span style="color: #38bdf8;">29.4% | Bat: 76%</span>
                </div>
              </div>
            ` : `
              <!-- Vista de Formato Informe Oficial de Auditoría -->
              <div style="background: #ffffff; color: #0f172a; padding: 16px; border-radius: 12px; font-family: sans-serif; font-size: 11px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
                <div style="border-bottom: 2px solid #059669; padding-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <div style="font-size: 9px; font-family: monospace; font-weight: bold; color: #047857; text-transform: uppercase;">
                      URRUTIA AGROTECH & AGRITWIN 3D • AUDITORÍA OFICIAL
                    </div>
                    <div style="font-size: 13px; font-weight: 800; color: #0f172a;">
                      Informe Técnico de Telemetría IoT (INF-IOT-2026-0925)
                    </div>
                    <div style="font-size: 10px; color: #64748b;">Predio: Fundo Meniels • Parral, Región del Maule</div>
                  </div>
                  <span style="background: #ecfdf5; color: #047857; border: 1px solid #10b981; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 10px;">
                    SAG / GlobalGAP Apto
                  </span>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-family: monospace; font-size: 10px;">
                  <div style="background: #f8fafc; padding: 6px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <span style="color: #64748b; display: block;">Humedad 0-20cm</span>
                    <strong style="color: #0284c7; font-size: 12px;">${this.simMoisture}%</strong>
                  </div>
                  <div style="background: #f8fafc; padding: 6px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <span style="color: #64748b; display: block;">Estrato 20-60cm</span>
                    <strong style="color: #047857; font-size: 12px;">34.8%</strong>
                  </div>
                  <div style="background: #f8fafc; padding: 6px; border-radius: 6px; border: 1px solid #e2e8f0;">
                    <span style="color: #64748b; display: block;">Estrato 60-100cm</span>
                    <strong style="color: #0f766e; font-size: 12px;">41.2%</strong>
                  </div>
                </div>

                <div style="background: #fefce8; border: 1px solid #fef08a; padding: 8px; border-radius: 6px; font-size: 10px; color: #854d0e;">
                  <strong>Dictamen Agronómico:</strong> Bulbo húmedo óptimo en estrato medio. Se recomienda retrasar riego en cuartel A en 18 horas para forzar anclaje radicular.
                </div>

                <button id="btnDownloadIoTReport" style="width: 100%; padding: 8px; background: #0f172a; color: #ffffff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 10px;">
                  📥 Descargar Copia Certificada (.txt)
                </button>
              </div>
            `}
          ` : ''}

          <!-- ================= TAB: LIBRETA BIOFÍSICA & PREDIOS ================= -->
          <!-- ================= TAB: LIBRETA BIOFÍSICA & PREDIOS ================= -->
          ${this.activeAdminTab === 'predios' ? `
            <div style="background: #24140b; padding: 12px; border-radius: 10px; border: 1px solid #78350f; display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-family: Georgia, serif; font-weight: bold; color: #fbbf24; font-size: 12px;">Libreta Biofísica & Permacultura:</span>
                <select id="selectAdminPredio" style="background: #140b06; color: #fbbf24; border: 1px solid #b45309; padding: 4px 8px; border-radius: 6px; font-size: 10px; font-family: monospace;">
                  <option value="meniels" ${this.selectedPredioId === 'meniels' ? 'selected' : ''}>Fundo Estero Colliguay (Parral, Maule)</option>
                  <option value="boldo" ${this.selectedPredioId === 'boldo' ? 'selected' : ''}>Fundo El Boldo (Curicó)</option>
                  <option value="quebrada" ${this.selectedPredioId === 'quebrada' ? 'selected' : ''}>Reserva Quebrada Los Boldos</option>
                </select>
              </div>

              <div style="font-size: 11px; color: #cbd5e1; line-height: 1.4;">
                ${this.selectedPredioId === 'meniels' 
                  ? 'Predio piloto Fundo Estero Colliguay (12.8 ha, Lat -36.14°S). Viña patrimonial País, cerezos Lapins y pasturas polifíticas. Incorpora sistema Keyline de 18.500 m³ y zonificación permacultural concéntrica 0 a 5.' 
                  : this.selectedPredioId === 'boldo'
                  ? 'Fundo El Boldo (18.5 ha). Cerezas de exportación Lapins con red telemétrica antiheladas crítica en Talca.'
                  : 'Reserva Quebrada Los Boldos (62.0 ha). Bosque nativo esclerófilo maduro (peumo, quillay, boldo) con emisión de créditos de biodiversidad.'}
              </div>

              <!-- Documentación Permacultura & Keyline -->
              <div style="background: #140b06; padding: 8px 10px; border-radius: 6px; border-left: 3px solid #10b981; font-size: 10.5px; color: #d6c4a8; line-height: 1.45;">
                <strong style="color: #6ee7b7; display: block; margin-bottom: 2px;">🌱 Zonificación Concéntrica 0-5 (Bill Mollison):</strong>
                • <strong>Zona 0:</strong> Casona central, taller de decisiones e infraestructura IoT.<br>
                • <strong>Zona 1:</strong> Huerto biointensivo de autoconsumo y espiral de hierbas.<br>
                • <strong>Zona 2:</strong> Aves de corral, árboles frutales menores y composteras.<br>
                • <strong>Zona 3:</strong> Cuarteles de cerezos, viña y 8 potreros de pastoreo rotacional.<br>
                • <strong>Zona 4:</strong> Silvopastoreo leñoso, cortavientos andinos y forraje.<br>
                • <strong>Zona 5:</strong> Reserva de bosque esclerófilo y amortiguación Estero Colliguay.
              </div>

              <div style="background: #140b06; padding: 8px 10px; border-radius: 6px; border-left: 3px solid #38bdf8; font-size: 10.5px; color: #d6c4a8; line-height: 1.45;">
                <strong style="color: #7dd3fc; display: block; margin-bottom: 2px;">💧 Hidrología Keyline (P.A. Yeomans):</strong>
                Surcos de descompactación trazados al 1% de pendiente sobre el relieve real del DEM, conduciendo el escurrimiento de lluvias desde las crestas secas hacia los valles y alimentando por gravedad el tranque acumulador (18.500 m³).
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-family: monospace; font-size: 10px;">
                <div style="background: #140b06; padding: 6px; border-radius: 6px; color: #38bdf8;">
                  ETc Penman: 3.6 mm/día
                </div>
                <div style="background: #140b06; padding: 6px; border-radius: 6px; color: #4ade80;">
                  Drenaje Heladas: 06:15 AM
                </div>
              </div>
            </div>
          ` : ''}

          <!-- ================= TAB: CAJA DE HERRAMIENTAS & SCRIPTS ================= -->
          ${this.activeAdminTab === 'scripts' ? `
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <span style="font-family: Georgia, serif; font-weight: bold; color: #fbbf24; font-size: 12px;">Comandos de Terminal (1-Click Copy):</span>
              
              <div style="background: #1a0f08; padding: 8px 10px; border-radius: 8px; border: 1px solid #78350f; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-size: 11px; color: #ffffff; font-weight: bold;">Lanzador AgriTwin 3D (Predial)</div>
                  <code style="font-size: 10px; color: #fbbf24; font-family: monospace;">node agritwin/server.cjs</code>
                </div>
                <button class="btn-copy-cmd" data-cmd="node agritwin/server.cjs" style="padding: 4px 8px; background: #b45309; color: #fff; border: none; border-radius: 4px; font-size: 10px; cursor: pointer;">Copiar</button>
              </div>

              <div style="background: #1a0f08; padding: 8px 10px; border-radius: 8px; border: 1px solid #78350f; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-size: 11px; color: #ffffff; font-weight: bold;">Lanzador AgroTwin Regional (Cuenca)</div>
                  <code style="font-size: 10px; color: #fbbf24; font-family: monospace;">node agritwin-regional/server.cjs</code>
                </div>
                <button class="btn-copy-cmd" data-cmd="node agritwin-regional/server.cjs" style="padding: 4px 8px; background: #b45309; color: #fff; border: none; border-radius: 4px; font-size: 10px; cursor: pointer;">Copiar</button>
              </div>

              <div style="background: #1a0f08; padding: 8px 10px; border-radius: 8px; border: 1px solid #78350f; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-size: 11px; color: #ffffff; font-weight: bold;">Lanzador Rewild Suite</div>
                  <code style="font-size: 10px; color: #fbbf24; font-family: monospace;">python3 rewild/server.py</code>
                </div>
                <button class="btn-copy-cmd" data-cmd="python3 rewild/server.py" style="padding: 4px 8px; background: #b45309; color: #fff; border: none; border-radius: 4px; font-size: 10px; cursor: pointer;">Copiar</button>
              </div>
            </div>
          ` : ''}

          <!-- ================= TAB: LIBRO DE REGISTROS ESG, MRV & GANADERÍA ================= -->
          ${this.activeAdminTab === 'vault' ? `
            <div style="background: #24140b; padding: 12px; border-radius: 10px; border: 1px solid #78350f; display: flex; flex-direction: column; gap: 10px; font-size: 11px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="font-family: Georgia, serif; font-weight: bold; color: #fbbf24;">MRV Ledger & Pasaporte Verde:</span>
                <span style="color: #4ade80; font-family: monospace; font-weight: bold;">100% EUDR Cero Deforestación</span>
              </div>
              <p style="color: #d6c4a8; margin: 0; line-height: 1.4;">
                Libro de contabilidad de carbono y biodiversidad verificado mediante línea base satelital Sentinel-2 (Diciembre 2020) y sensores in situ.
              </p>
              <div style="background: #140b06; padding: 8px; border-radius: 6px; font-family: monospace; font-size: 10px; color: #fbbf24;">
                Hash Criptográfico MRV: <strong>0x8f2d4a19c6e</strong><br>
                Balance de Carbono: <strong>4.8 tCO2e/ha/año</strong><br>
                Integridad Ecológica (IEI): <strong>0.88 / 1.00</strong>
              </div>

              <!-- Documentación Ganadería Regenerativa PRV -->
              <div style="background: #140b06; padding: 8px 10px; border-radius: 6px; border-left: 3px solid #f59e0b; font-size: 10.5px; color: #d6c4a8; line-height: 1.45;">
                <strong style="color: #fde047; display: block; margin-bottom: 2px;">🐄 Ganadería Regenerativa (PRV) & Censo Predial:</strong>
                • <strong>Bovinos (Sur-Oeste):</strong> 6 vacas Clavel Alemán y Angus en pasturas polifíticas (P1-P4).<br>
                • <strong>Ovinos (Centro-Oeste):</strong> 5 ovejas Suffolk Down en cuadro P5.<br>
                • <strong>Gallinas (Nor-Este):</strong> 60 ponedoras en Egg Mobile sanitario P8, despejadas de paneles solares.<br>
                • <strong>Caballos Chilenos:</strong> 4 equinos criollos sueltos y libres en la pradera abierta.<br>
                • <strong>Carga Global:</strong> 1.8 UGM/ha con rotación estricta bajo las 4 Leyes de André Voisin.<br>
                • <strong>Interactividad:</strong> Fichas editables en tiempo real y reubicación precisa con cota DEM.
              </div>
            </div>
          ` : ''}

          <!-- ================= TAB: ÁRBOL DE ARCHIVOS ================= -->
          ${this.activeAdminTab === 'tree' ? `
            <div style="background: #24150d; padding: 8px 10px; border-radius: 8px; border: 1px solid rgba(120,53,15,0.6); font-size: 10px; color: #fde68a;">
              <strong>Arquitectura Unificada</strong>: Todo componente corre mapeado a las estaciones diegéticas.
            </div>
            <div class="file-tree-container" style="max-height: 280px; overflow-y: auto;">
              <div class="file-tree-node folder">📁 agritwin/</div>
              <div class="file-tree-children">
                <div class="file-tree-node folder">📁 js/</div>
                <div class="file-tree-children">
                  <div class="file-tree-node file">📄 app.js (Orquestador Three.js)</div>
                  <div class="file-tree-node file" style="color: #fbbf24;">📄 AgroWorkshopOverlay.js (Taller AoE)</div>
                  <div class="file-tree-node file">📄 MapManager.js (PBR & Relieve)</div>
                  <div class="file-tree-node file">📄 SimulationEngine.js (FAO-56)</div>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- ================= TAB: MOTORES & AUDITORÍA ================= -->
          ${this.activeAdminTab === 'engines' ? `
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <!-- 1. Motor Gráfico 3D -->
              <div style="background: #1f120a; padding: 12px; border-radius: 8px; border: 1px solid #78350f; font-size: 11px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: #fbbf24; font-size: 12px;">💻 Motor Gráfico 3D (Three.js WebGL)</strong>
                  <span style="color: #38bdf8; font-family: monospace; background: rgba(56,189,248,0.15); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(56,189,248,0.3);">60 FPS • PBR</span>
                </div>
                <p style="color: #cbd5e1; margin: 0 0 10px 0; line-height: 1.4;">
                  Sombreadores PBR con relieve topográfico DEM dinámico, surcos normales de suelo, vegetación instanciada y sombreado solar diurno según hora astronómica del Maule.
                </p>
                <button id="btnAdminLaunchEngineInspector" class="btn-workshop-action" style="width: 100%; justify-content: center; background: rgba(168, 85, 247, 0.25); border-color: rgba(168, 85, 247, 0.6); color: #c084fc; font-weight: bold;">
                  ⚙️ Abrir Inspector 3D & Shaders GLSL (Shift+D / I)
                </button>
              </div>

              <!-- 2. Motor Biofísico -->
              <div style="background: #1f120a; padding: 12px; border-radius: 8px; border: 1px solid #78350f; font-size: 11px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: #fbbf24; font-size: 12px;">🌱 Motor Biofísico (FAO-56 Penman)</strong>
                  <span style="color: #fbbf24; font-family: monospace; background: rgba(245,158,11,0.15); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(245,158,11,0.3);">3 Capas • Evapotranspiración</span>
                </div>
                <p style="color: #cbd5e1; margin: 0 0 10px 0; line-height: 1.4;">
                  Cálculo de balance hídrico estratificado (0-20cm, 20-60cm, 60-100cm), lámina neta de reposición por cuartel y estrés CWSI acoplado a la cuenca.
                </p>
                <button id="btnAdminLaunchBioSim" class="btn-workshop-action" style="width: 100%; justify-content: center; background: rgba(245, 158, 11, 0.25); border-color: rgba(245, 158, 11, 0.6); color: #fde047; font-weight: bold;">
                  🔬 Ver Especificación del Motor Biofísico FAO-56
                </button>
              </div>

              <!-- 3. Informe Técnico Predial -->
              <div style="background: #1f120a; padding: 12px; border-radius: 8px; border: 1px solid #78350f; font-size: 11px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <strong style="color: #fbbf24; font-size: 12px;">📑 Módulo de Auditoría & Informe Técnico</strong>
                  <span style="color: #34d399; font-family: monospace; background: rgba(16,185,129,0.15); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(16,185,129,0.3);">SAG / GlobalGAP</span>
                </div>
                <p style="color: #cbd5e1; margin: 0 0 10px 0; line-height: 1.4;">
                  Generación de informe técnico oficial consolidado de telemetría IoT, balances hídricos, trazabilidad de cuarteles y mapa de riesgo para certificación.
                </p>
                <button id="btnAdminLaunchReporteTecnico" class="btn-workshop-action" style="width: 100%; justify-content: center; background: rgba(56, 189, 248, 0.25); border-color: rgba(56, 189, 248, 0.6); color: #7dd3fc; font-weight: bold;">
                  📋 Generar / Ver Informe Técnico Oficial
                </button>
              </div>
            </div>
          ` : ''}

        </div>
      </aside>
    `;
  }

  renderStationModalHTML(station) {
    return `
      <div class="modal-overlay glass-modal-backdrop" style="display: flex; z-index: 70;">
        <div class="station-modal-container">
          <!-- Header Modal -->
          <div style="padding: 16px 20px; background: #27150c; border-bottom: 2px solid #78350f; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 44px; height: 44px; border-radius: 8px; background: #1a0e07; border: 1px solid #d97706; padding: 4px; display: flex; align-items: center; justify-content: center;">
                <img src="${station.spriteSrc}" alt="${station.title}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-family: monospace; font-size: 11px; font-weight: 800; color: #fbbf24; background: #451a03; padding: 1px 6px; border-radius: 4px; border: 1px solid #92400e;">
                    ${station.code}
                  </span>
                  <h3 style="margin: 0; font-family: Georgia, serif; font-size: 16px; font-weight: 800; color: #ffffff;">
                    ${station.title}
                  </h3>
                </div>
                <div style="font-size: 11px; color: #d6c4a8; font-style: italic;">
                  ${station.category} • ${station.badge}
                </div>
              </div>
            </div>
            <button id="btnCloseStationModal" class="btn-workshop-close">&times;</button>
          </div>

          <!-- Body Modal con Gráfica Dinámica Reemplazando Python -->
          <div style="padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; color: #e6ccb2;">
            <div style="background: #24130a; padding: 12px 14px; border-radius: 10px; border: 1px solid rgba(120,53,15,0.6); font-size: 12px; line-height: 1.5;">
              ${station.description}
            </div>

            <div>
              <div style="font-family: monospace; font-size: 11px; font-weight: 800; color: #fbbf24; text-transform: uppercase; margin-bottom: 8px;">
                🛠️ Submódulos Auditados
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                ${station.tools.map(tool => `
                  <div style="background: #140a05; padding: 8px 10px; border-radius: 6px; border: 1px solid #451a03; font-size: 11px; display: flex; align-items: center; gap: 6px; color: #cbd5e1;">
                    <span style="color: #34d399;">✓</span>
                    <span>${tool}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Contenedor del Gráfico Dinámico Chart.js -->
            <div style="background: #120804; padding: 14px; border-radius: 12px; border: 1px solid rgba(120,53,15,0.8);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                <div style="font-family: Georgia, serif; font-size: 13px; font-weight: 800; color: #fff;">
                  📊 Gráfica Interactiva en Tiempo Real (Reemplazo Python)
                </div>
                <span style="font-family: monospace; font-size: 10px; background: rgba(16,185,129,0.2); color: #34d399; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(16,185,129,0.4);">
                  Chart.js 60fps
                </span>
              </div>
              <div style="position: relative; height: 160px; width: 100%;">
                <canvas id="stationDynamicChart"></canvas>
              </div>
            </div>
          </div>

          <!-- Footer Modal -->
          <div style="padding: 14px 20px; background: #231309; border-top: 1px solid #78350f; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 11px; color: #a89984; font-family: Georgia, serif;">
              Presiona Esc para volver al taller
            </span>
            <div style="display: flex; gap: 8px;">
              <button id="btnDismissStationModal" class="btn-workshop-action">
                Cerrar
              </button>
              <button id="btnExecuteStationAction" class="btn-workshop-action btn-workshop-primary">
                ${station.id === 'station_c' ? 'Abrir Gemelo 3D' : station.id === 'station_map' ? 'Abrir Simulación Territorial' : 'Abrir Herramienta'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Abrir/cerrar con tecla W o Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'w' || e.key === 'W') {
        if (!e.target.matches('input, textarea')) {
          this.toggle();
        }
      }
      if (e.key === 'Escape' && this.overlayEl.classList.contains('active')) {
        if (this.activeModalStation) {
          this.closeStationModal();
        } else if (this.showAdminPanel) {
          this.showAdminPanel = false;
          this.render();
        } else {
          this.close();
        }
      }
    });
  }

  bindDynamicListeners() {
    // Botón Salto al Gemelo 3D (Header)
    const btnLaunch = document.getElementById('btnWorkshopLaunchTwin');
    if (btnLaunch) {
      btnLaunch.addEventListener('click', () => {
        this.close();
        if (this.app && this.app.mapManager) {
          this.app.mapManager.flyToPreset('overview');
        }
        bus.emit('ui:show_toast', '🌾 Bienvenido al Fundo Estero Colliguay. Gemelo 3D activo.');
      });
    }

    // Acciones del Tablón de Campaña Diegético (AoE II)
    const btnBoardLaunch = document.getElementById('btnBoardLaunchColliguay');
    if (btnBoardLaunch) {
      btnBoardLaunch.addEventListener('click', () => {
        this.close();
        if (this.app && this.app.mapManager) {
          this.app.mapManager.flyToPreset('overview');
        }
        bus.emit('ui:show_toast', '🌾 Bienvenido al Fundo Estero Colliguay. Gemelo 3D activo.');
      });
    }

    // Modo 2: Lanzar Vista Vecinal (Segundo modo de juego)
    const btnBoardVecinos = document.getElementById('btnBoardLaunchVecinos');
    if (btnBoardVecinos) {
      btnBoardVecinos.addEventListener('click', () => {
        this.close();
        if (this.app && this.app.uiController) {
          this.app.uiController.openVecinosCatanModal();
        }
        bus.emit('ui:show_toast', '🗺️ Modo Vecinal activo: Explorando predios contiguos y riesgo territorial.');
      });
    }

    const btnBoardNew = document.getElementById('btnBoardNewProject');
    if (btnBoardNew) {
      btnBoardNew.addEventListener('click', () => {
        this.close();
        if (this.app && this.app.drawingManager) {
          this.app.drawingManager.toggleDrawingMode(true);
        }
        bus.emit('ui:show_toast', '✨ Nuevo predio en blanco. Usa el Pincel 3D para trazar tus primeras parcelas.');
      });
    }

    const btnBoardOpen = document.getElementById('btnBoardOpenProject');
    if (btnBoardOpen) {
      btnBoardOpen.addEventListener('click', () => {
        const agritwinInput = document.getElementById('agritwinFileInput');
        if (agritwinInput) {
          agritwinInput.click();
        } else {
          bus.emit('ui:show_toast', '📁 Selector de archivo .agritwin no disponible.');
        }
      });
    }

    const btnBoardImportGis = document.getElementById('btnBoardImportGis');
    if (btnBoardImportGis) {
      btnBoardImportGis.addEventListener('click', () => {
        this.close();
        if (this.app && this.app.projectManager && typeof this.app.projectManager.openImporterModal === 'function') {
          this.app.projectManager.openImporterModal();
        } else {
          const shapefileModal = document.getElementById('shapefileModal');
          if (shapefileModal) shapefileModal.style.display = 'flex';
        }
        bus.emit('ui:show_toast', '🗺️ Importador Shapefile (.shp / GeoJSON) abierto.');
      });
    }

    // Botón Cerrar Tablero Campaña
    const btnCloseCampaign = document.getElementById('btnCloseCampaignBoard');
    if (btnCloseCampaign) {
      btnCloseCampaign.addEventListener('click', () => {
        this.showCampaignBoard = false;
        this.render();
      });
    }

    // Botón Cerrar
    const btnClose = document.getElementById('btnWorkshopClose');
    if (btnClose) {
      btnClose.addEventListener('click', () => this.close());
    }

    // Toggle Admin Panel
    const btnAdminToggle = document.getElementById('btnWorkshopAdminToggle');
    if (btnAdminToggle) {
      btnAdminToggle.addEventListener('click', () => {
        this.showAdminPanel = !this.showAdminPanel;
        this.render();
      });
    }

    const btnCloseAdmin = document.getElementById('btnCloseAdminPanel');
    if (btnCloseAdmin) {
      btnCloseAdmin.addEventListener('click', () => {
        this.showAdminPanel = false;
        this.render();
      });
    }

    // Tabs del Admin Panel
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeAdminTab = btn.dataset.tab;
        this.render();
      });
    });

    // Clicks en los Sprites Diegéticos con protección contra arrastre (drag/pan)
    document.querySelectorAll('.workshop-sprite-anchor').forEach(el => {
      let startX = 0;
      let startY = 0;

      el.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
      });

      el.addEventListener('click', (e) => {
        const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
        if (dist > 8) return; // Si el usuario estaba desplazando la pantalla, ignorar

        this.audio?.playWoodClick();
        const id = el.dataset.stationId;
        const station = WORKSHOP_STATIONS_DATA.find(s => s.id === id);
        if (station && station.action) {
          station.action(this.app, this);
        } else if (station) {
          this.openStationModal(station);
        }
      });
    });

    // Clicks en saltos de estación del Admin Panel
    document.querySelectorAll('.station-jump-card').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.stationId;
        const station = WORKSHOP_STATIONS_DATA.find(s => s.id === id);
        if (station && station.action) {
          station.action(this.app, this);
        } else if (station) {
          this.openStationModal(station);
        }
      });
    });

    // Sub-vistas de Sensores: Telemetría vs Formato Informe
    const btnSubTelemetria = document.getElementById('btnSubTelemetria');
    if (btnSubTelemetria) {
      btnSubTelemetria.addEventListener('click', () => {
        this.sensorSubView = 'telemetry';
        this.render();
      });
    }

    const btnSubInforme = document.getElementById('btnSubInforme');
    if (btnSubInforme) {
      btnSubInforme.addEventListener('click', () => {
        this.sensorSubView = 'report';
        this.render();
      });
    }

    // Sliders de Calibración FDR en Vivo
    const sliderTemp = document.getElementById('sliderSimTemp');
    if (sliderTemp) {
      sliderTemp.addEventListener('input', (e) => {
        this.simTemp = parseFloat(e.target.value);
        const txt = document.getElementById('txtSimTemp');
        if (txt) txt.innerText = `${this.simTemp}°C`;
      });
    }

    const sliderMoisture = document.getElementById('sliderSimMoisture');
    if (sliderMoisture) {
      sliderMoisture.addEventListener('input', (e) => {
        this.simMoisture = parseFloat(e.target.value);
        const txt = document.getElementById('txtSimMoisture');
        if (txt) txt.innerText = `${this.simMoisture}%`;
      });
    }

    const sliderCwsi = document.getElementById('sliderSimCwsi');
    if (sliderCwsi) {
      sliderCwsi.addEventListener('input', (e) => {
        this.simCwsi = parseFloat(e.target.value);
        const txt = document.getElementById('txtSimCwsi');
        if (txt) txt.innerText = `${this.simCwsi}`;
      });
    }

    // Selector de Predios en Libreta Biofísica
    const selectPredio = document.getElementById('selectAdminPredio');
    if (selectPredio) {
      selectPredio.addEventListener('change', (e) => {
        this.selectedPredioId = e.target.value;
        this.render();
      });
    }

    // Botones de 1-Click Copy en Herramientas & CLI
    document.querySelectorAll('.btn-copy-cmd').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.dataset.cmd;
        if (cmd) {
          navigator.clipboard.writeText(cmd).then(() => {
            const originalText = btn.innerText;
            btn.innerText = '✓ ¡Copiado!';
            setTimeout(() => { btn.innerText = originalText; }, 2000);
            bus.emit('ui:show_toast', `📋 Comando copiado: ${cmd}`);
          }).catch(() => {
            bus.emit('ui:show_toast', `Comando: ${cmd}`);
          });
        }
      });
    });

    // Descarga de Informe Oficial de Telemetría IoT en formato TXT
    const btnDownloadReport = document.getElementById('btnDownloadIoTReport');
    if (btnDownloadReport) {
      btnDownloadReport.addEventListener('click', () => {
        const reportContent = `========================================================================
URRUTIA AGROTECH & AGRITWIN 3D - CERTIFICADO TÉCNICO OFICIAL DE TELEMETRÍA IOT
Código Documento: INF-IOT-2026-0925
Fecha Emisión: ${new Date().toISOString()}
Norma / Estándar: SAG / GlobalGAP / EUDR Verificado
========================================================================

1. ANTECEDENTES DEL PREDIO
------------------------------------------------------------------------
- Predio: Fundo Meniels
- Ubicación: Parral, Región del Maule, Chile
- Superficie: 24.8 Hectáreas
- Conducción Hidrológica: Tranque Keyline 18.500 m³ + Micro-embalses
- Operador MRV: Urrutia AgroTech SpA & Cooperativa de Trabajo

2. TELEMETRÍA IN SITU (NODOS KioT ESP32 / LORAWAN)
------------------------------------------------------------------------
- Temperatura Suelo Promedio: ${this.simTemp} °C
- Humedad Suelo Estrato 1 (0-20 cm): ${this.simMoisture} % (Capacidad Campo Óptima)
- Humedad Suelo Estrato 2 (20-60 cm): 34.8 %
- Humedad Suelo Estrato 3 (60-100 cm): 41.2 %
- Índice CWSI (Estrés Hídrico de Canopia): ${this.simCwsi} (Nivel Sin Estrés)
- Nodos Operativos: 5/5 (Batería Promedio: 88%)

3. DICTAMEN TÉCNICO AGRONÓMICO & DECISIÓN DE RIEGO
------------------------------------------------------------------------
El estrato radicular efectivo se encuentra en rango de capacidad de campo.
Se dictamina postergar la ventana de fertirriego programada en 18 horas para
favorecer la penetración radicular y ahorrar 2.400 kWh de bombeo fotovoltaico.

Firma Digital: 0x8f2d4a19c6e3b7fa99d140e
AgriTwin Telemetry Engine v2.4 - AgroTech Maule
========================================================================`;
        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'INF-IOT-2026-0925_Fundo_Meniels.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        bus.emit('ui:show_toast', '📥 Informe oficial descargado exitosamente (.txt)');
      });
    }

    // Acciones de la Pestaña Motores & Auditoría en el Admin Panel
    const btnLaunchInspector = document.getElementById('btnAdminLaunchEngineInspector');
    if (btnLaunchInspector) {
      btnLaunchInspector.addEventListener('click', () => {
        this.close();
        if (this.app?.engineInspectorModal) {
          this.app.engineInspectorModal.open();
        } else {
          bus.emit('ui:show_toast', '⚙️ Presiona Shift+D para abrir el Inspector de Motor 3D.');
        }
      });
    }

    const btnLaunchBioSim = document.getElementById('btnAdminLaunchBioSim');
    if (btnLaunchBioSim) {
      btnLaunchBioSim.addEventListener('click', () => {
        const modal = document.getElementById('bioSimModal');
        if (modal) modal.style.display = 'flex';
      });
    }

    const btnLaunchReporte = document.getElementById('btnAdminLaunchReporteTecnico');
    if (btnLaunchReporte) {
      btnLaunchReporte.addEventListener('click', () => {
        const modal = document.getElementById('reporteTecnicoModal');
        if (modal) modal.style.display = 'flex';
      });
    }

    // Modal listeners
    const btnCloseModal = document.getElementById('btnCloseStationModal');
    const btnDismissModal = document.getElementById('btnDismissStationModal');
    if (btnCloseModal) btnCloseModal.addEventListener('click', () => this.closeStationModal());
    if (btnDismissModal) btnDismissModal.addEventListener('click', () => this.closeStationModal());

    const btnAction = document.getElementById('btnExecuteStationAction');
    if (btnAction && this.activeModalStation) {
      btnAction.addEventListener('click', () => {
        const st = this.activeModalStation;
        this.close();
        if (st.action) {
          st.action(this.app);
        }
      });
    }

    // Inicializar Gráfica Chart.js si el modal está abierto
    if (this.activeModalStation) {
      this.initChart(this.activeModalStation);
    }
  }

  openStationModal(station) {
    this.activeModalStation = station;
    this.audio?.playParchmentOpen();
    this.render();
  }

  closeStationModal() {
    if (this.currentChartInstance) {
      this.currentChartInstance.destroy();
      this.currentChartInstance = null;
    }
    this.activeModalStation = null;
    this.render();
  }

  initChart(station) {
    const canvas = document.getElementById('stationDynamicChart');
    if (!canvas || !window.Chart) return;

    if (this.currentChartInstance) {
      this.currentChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    const cData = station.chartData;

    // Gradiente dorado / esmeralda
    const grad1 = ctx.createLinearGradient(0, 0, 0, 160);
    grad1.addColorStop(0, 'rgba(251, 191, 36, 0.45)');
    grad1.addColorStop(1, 'rgba(251, 191, 36, 0.02)');

    const grad2 = ctx.createLinearGradient(0, 0, 0, 160);
    grad2.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
    grad2.addColorStop(1, 'rgba(16, 185, 129, 0.02)');

    this.currentChartInstance = new window.Chart(ctx, {
      type: station.id === 'station_f' ? 'bar' : 'line',
      data: {
        labels: cData.labels,
        datasets: [
          {
            label: cData.label1,
            data: cData.dataset1,
            borderColor: '#fbbf24',
            backgroundColor: grad1,
            borderWidth: 2,
            tension: 0.35,
            fill: true,
            pointBackgroundColor: '#fbbf24',
            pointRadius: 3
          },
          {
            label: cData.label2,
            data: cData.dataset2,
            borderColor: '#34d399',
            backgroundColor: grad2,
            borderWidth: 2,
            tension: 0.35,
            fill: true,
            pointBackgroundColor: '#34d399',
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#d6c4a8',
              font: { family: 'Georgia, serif', size: 10 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(22, 14, 10, 0.95)',
            titleColor: '#fbbf24',
            bodyColor: '#e6ccb2',
            borderColor: '#b45309',
            borderWidth: 1,
            padding: 10
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(120, 53, 15, 0.2)' },
            ticks: { color: '#94a3b8', font: { size: 9, family: 'monospace' } }
          },
          y: {
            grid: { color: 'rgba(120, 53, 15, 0.2)' },
            ticks: { color: '#94a3b8', font: { size: 9, family: 'monospace' } }
          }
        }
      }
    });
  }

  open(playSound = true) {
    if (this.overlayEl) {
      this.overlayEl.classList.add('active');
      this.showCampaignBoard = true;
      this.render();
      if (playSound) this.audio?.playBellGong();
    }
  }

  close() {
    if (this.overlayEl) {
      this.audio?.playWoodClick();
      this.overlayEl.classList.remove('active');
      this.closeStationModal();
      if (this.app?.mapManager?.onWindowResize) {
        setTimeout(() => this.app.mapManager.onWindowResize(), 50);
      }
    }
  }

  toggle() {
    if (this.overlayEl && this.overlayEl.classList.contains('active')) {
      this.close();
    } else {
      this.open();
    }
  }
}
