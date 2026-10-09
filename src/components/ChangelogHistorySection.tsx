import React, { useState } from 'react';
import { 
  History, GitCommit, CheckCircle2, Sparkles, Layers, Cpu, 
  ShieldCheck, Sprout, ArrowRight, Clock, Server,
  ExternalLink, FileCode, Users, Database, Globe, Filter
} from 'lucide-react';

export interface ChangelogMilestone {
  id: string;
  version: string;
  name: string;
  timestamp: string;
  category: 'arquitectura' | 'gobernanza' | 'agritwin' | 'regional' | 'esg' | 'hardware';
  badgeColor: string;
  summary: string;
  deliverables: string[];
  systemImpact: string;
  isCurrent?: boolean;
}

export const CHANGELOG_DATA: ChangelogMilestone[] = [
  {
    id: 'milestone-9',
    version: 'v2.7.0',
    name: 'Holding AgroTech, Obsidian Vault & Red Centinela Territorial',
    timestamp: 'Sábado 26 Sep 2026, 01:30 hrs',
    category: 'arquitectura',
    badgeColor: 'purple',
    isCurrent: true,
    summary: 'Consolidación del Holding AgroTech en 5 capas interoperables, integración nativa del Vault de Obsidian en AgroTech HQ, despliegue de la Red Centinela Ground-Truth Mesh con estaciones DMC/DGA/INIA, modelamiento micro-atmosférico y Ganadería PRV.',
    deliverables: [
      'AgroTech HQ: Cabina de mando privada para fundadores con integración REST directa al Vault de Obsidian (/Documents/Agrotech/Agro Tech).',
      'Renderizado en tiempo real de notas Markdown y enlaces profundos obsidian://open para edición inmediata.',
      'Red Centinela Local en AgroTwin Regional: Enlace de 5 nodos KioT con 4 estaciones oficiales (INIA Retiro, DGA Longaví, DMC Parral, DGA Bullileo).',
      'Modelamiento Micro-Atmosférico: Regla 30-30-30 en Viento Puelche (Foehn), drenaje catabático de heladas a 05:30 AM y balance ETo Penman-Monteith.',
      'Ganadería Regenerativa & PRV en AgriTwin 1: Matriz de 6 especies (bovinos, ovinos, gallinas, equinos, cerdos, piscicultura) con 1.8 UGM/ha y +4.2 kg MO/m².',
      'Generador de Informes Técnicos y Mapas de Riesgo Dinámicos con descarga .txt y exportación formal para auditorías CNR/CORFO.',
      'Módulo de 4 Fases de Transición Permacultural de Julio Pérez y Paulina Urrutia en Fundo Meniel (24.8 ha).'
    ],
    systemImpact: 'Gobernanza y documentación estratégica 100% blindadas en HQ, sincronizadas con la malla IoT física y la cartografía territorial de la Cuenca Maule Sur.'
  },
  {
    id: 'milestone-8',
    version: 'v2.6.0',
    name: 'Semilla Brotando',
    timestamp: 'Viernes 25 Sep 2026, 20:25 hrs',
    category: 'arquitectura',
    badgeColor: 'emerald',
    isCurrent: false,
    summary: 'Consolidación de la web comercial, purga de módulos técnicos hacia AgriTwin, renombre a "Somos", supresión de botón redundante "Inicio" y centralización de la trazabilidad y datos de versión en el Panel de Administrador.',
    deliverables: [
      'Renombre de "Socios y SpA" a "Somos" en toda la navegación de AgroTech Web.',
      'Supresión del botón "Inicio" (la navegación al landing se realiza pulsando el isotipo de Peumo Quantum).',
      'Retiro de la etiqueta de versión pública del Hero y Header para moverla al panel privado con candado.',
      'Desacople definitivo de InteractiveDocsHub: la web madre queda 100% enfocada en ventas, membresías y kits.',
      'Creación del Historial de Actualizaciones dinámico (prompt a prompt) con la versión "Semilla brotando".',
      'Sustitución de iframes embebidos por lanzadores directos de alto rendimiento a 60 FPS.'
    ],
    systemImpact: 'Separación quirúrgica de intereses: AgroTech Web (comercio/socios) vs AgriTwin 3D (ingeniería/telemetría) vs AgroTwin Regional (cartografía de riesgo) vs Rewild (PWA campo).'
  },
  {
    id: 'milestone-7',
    version: 'v2.5.0',
    name: 'AgroTwin Regional & Taller Diegético AoE II',
    timestamp: 'Viernes 25 Sep 2026, 19:15 hrs',
    category: 'regional',
    badgeColor: 'amber',
    summary: 'Nacimiento de la aplicación independiente AgroTwin Regional y reconstrucción del menú del gemelo digital como un taller diegético estilo Age of Empires II.',
    deliverables: [
      'Nueva aplicación independiente agritwin-regional/ para cartografía macro de cuenca.',
      'Simulador de Riesgo de Incendios FWI (Fine Fuel Moisture Code, vientos Puelche, factor combustible pino vs nativo).',
      'Simulador de Riesgo de Inundaciones TWI (Topographic Wetness Index, caudal ríos Longaví/Perquilauquén, períodos de retorno a 10, 50 y 100 años).',
      'Taller Agrícola con 6 estaciones diegéticas interactivas recortadas en PNG (Tablero IoT, Libreta Biofísica, Mesa de Planos, Libro ESG, Radio Comunal, Caja de Herramientas).',
      'Panel Maestro integrado con sliders de calibración de sondas FDR y generador de informe técnico certificable INF-IOT-2026-0925 con descarga .txt.'
    ],
    systemImpact: 'Capacidad de modelar simultáneamente la escala predial milimétrica (permacultura) y la escala territorial comunal (Parral/Retiro) en aplicaciones especializadas.'
  },
  {
    id: 'milestone-6',
    version: 'v2.4.0',
    name: 'Gobernanza Dual: SpA Mixta & Cooperativa de Trabajo',
    timestamp: 'Viernes 25 Sep 2026, 17:40 hrs',
    category: 'gobernanza',
    badgeColor: 'blue',
    summary: 'Formalización del modelo societario híbrido: SpA para socios capitalistas y horas de trabajo (sweat equity), y Cooperativa de Trabajo para miembros comunitarios y técnicos en terreno.',
    deliverables: [
      'Estructuración del pacto de accionistas SpA (Daniel Santander 40%, Paulina Urrutia 30%, Fondo Tecnológico 20%, Reserva Cooperativa 10%).',
      'Definición de derechos de autoría intelectual del AgriTwin bajo titularidad de Daniel con usufructo compartido para la SpA.',
      'Diseño del brazo cooperativo: acceso a proyectos comisionados B2G, comités APR y autogestión de cuadrillas de campo.',
      'Matriz de resolución de empates, vesting dinámico por horas y dividendos semestrales.'
    ],
    systemImpact: 'Protección legal del core tecnológico mientras se viabiliza la tracción comunitaria y comercial sin sueldos fijos iniciales mediante un sistema mixto verificable.'
  },
  {
    id: 'milestone-5',
    version: 'v2.3.0',
    name: 'MRV Ledger, EUDR & Pasaporte Verde Europeo',
    timestamp: 'Viernes 25 Sep 2026, 16:10 hrs',
    category: 'esg',
    badgeColor: 'emerald',
    summary: 'Construcción del sistema de trazabilidad ambiental con cálculo de captura de CO2, auditoría satelital de deforestación y etiquetas QR para exportación.',
    deliverables: [
      'Motor de balance de carbono MRV: 4.8 tCO2e/ha/año secuestradas verificadas en modelos IPCC Tier 2.',
      'Protocolo EUDR Cero Deforestación anclado a línea base satelital Sentinel-2 (corte 31 Diciembre 2020).',
      'Generación de hashes criptográficos inmutables (0x8f2d4a19c6e) para cada lote exportado.',
      'Pasaporte Verde QR para pallets de fruta y madera noble con lectura instantánea en puertos de Róterdam y Hamburgo.'
    ],
    systemImpact: 'Habilitación de contratos de exportación premium con sobreprecio del 12-18% para productores que cumplen normativas europeas sin trámites burocráticos.'
  },
  {
    id: 'milestone-4',
    version: 'v2.2.0',
    name: 'Simulación Permacultural & Transición Predial Meniels',
    timestamp: 'Viernes 25 Sep 2026, 14:30 hrs',
    category: 'agritwin',
    badgeColor: 'amber',
    summary: 'Modelado interactivo para rediseñar predios agrícolas convencionales hacia sistemas permaculturales optimizados por sol, viento y microclimas.',
    deliverables: [
      'Gemelo de transición para Fundo Meniels (Parral, Maule): trazado de curvas a nivel (Keyline).',
      'Cálculo de eficiencia energética: reducción de 2.400 kWh en bombeo mediante tranque gravitacional de 18.500 m³.',
      'Parque agrovoltaico bifacial de 9.9 kWp con sombra protectora sobre hortalizas.',
      'Modelado de drenaje katabático nocturno para evacuar heladas de los brotes tiernos hacia quebradas de amortiguación.'
    ],
    systemImpact: 'Demostración tangible del retorno de inversión (ROI) agronómico al rediseñar la disposición de cuarteles con biofísica antes de mover un solo metro de tierra.'
  },
  {
    id: 'milestone-3',
    version: 'v2.1.0',
    name: 'Compendio Obsidian & Base de Conocimiento Biofísica',
    timestamp: 'Viernes 25 Sep 2026, 12:45 hrs',
    category: 'esg',
    badgeColor: 'purple',
    summary: 'Generación del compendio completo de documentación técnica e interconexiones wiki en formato Obsidian Markdown para visualizar la magnitud del proyecto.',
    deliverables: [
      'Estructura de grafos interconectados: [[AGROTECH]], [[Permacultura]], [[IoE]], [[Pasaporte verde]], [[Juegos]].',
      'Fichas biofísicas de los tres predios piloto: Meniels (Parral), El Boldo (Curicó) y Quebrada Los Boldos (Constitución).',
      'Algoritmos biofísicos documentados: Penman-Monteith FAO-56, estratificación radicular en 3 capas (0-20, 20-60, 60-100 cm).',
      'Catálogo taxonómico botánico de especies esclerófilas nativas y frutales comerciales.'
    ],
    systemImpact: 'Puente directo entre la conceptualización académica de alto nivel y el software desplegable en terreno.'
  },
  {
    id: 'milestone-2',
    version: 'v2.0.0',
    name: 'Arquitectura Triádica y Desacople de Rendimiento',
    timestamp: 'Viernes 25 Sep 2026, 10:15 hrs',
    category: 'arquitectura',
    badgeColor: 'cyan',
    summary: 'Separación de la plataforma en 3 motores autónomos (Madre Comercial, PWA Rewild, AgriTwin Three.js) para garantizar fluidez a 60 FPS sin colapsar memoria.',
    deliverables: [
      'Servidor Vite principal optimizado para ventas y catálogo B2B.',
      'Servidor Rewild para relevamiento de biodiversidad en campo con SQLite/LocalStorage.',
      'Servidor AgriTwin con Three.js r128, shaders PBR y relieve DEM dinámico.',
      'Protocolo de comunicación postMessage y lanzadores desacoplados.'
    ],
    systemImpact: 'Carga instantánea de la tienda y portafolio en cualquier dispositivo móvil sin esperar la inicialización de motores 3D pesados.'
  },
  {
    id: 'milestone-1',
    version: 'v1.0.0',
    name: 'Cimentación AgroTech Maule & Nodos KioT',
    timestamp: 'Viernes 25 Sep 2026, 08:30 hrs',
    category: 'hardware',
    badgeColor: 'emerald',
    summary: 'Lanzamiento del núcleo de telemetría IoT, estaciones anti-heladas KioT y calibración con datos satelitales Sentinel-2 y ERA5.',
    deliverables: [
      'Diseño de hardware KioT: caja estanca IP65, ESP32 dual core, sensor de suelo FDR capacitivo y sonda DS18B20.',
      'Matriz de costos de fabricación (BOM) y esquema de enlace LoRaWAN 915 MHz.',
      'Simulador biofísico de estrés hídrico de canopia (CWSI).',
      'Identidad visual inicial AgroTech Chile inspirada en el peumo nativo y la permacultura del Maule.'
    ],
    systemImpact: 'Validación del hardware de bajo costo frente a estaciones comerciales importadas que cuadruplican su valor.'
  }
];

export const ChangelogHistorySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedMilestone, setExpandedMilestone] = useState<string>('milestone-8');

  const filteredMilestones = selectedCategory === 'all' 
    ? CHANGELOG_DATA 
    : CHANGELOG_DATA.filter(m => m.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Banner de Versión Vigente: "Semilla brotando" */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B2519] via-[#071810] to-[#04110b] border-2 border-emerald-500/50 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700 flex items-center justify-center text-slate-950 font-black shadow-lg">
                <Sprout className="w-7 h-7 text-white animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    ESTADO DEL SISTEMA EN PRODUCCIÓN
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Versión Actual: <span className="text-amber-400">"Semilla brotando"</span>
                </h2>
              </div>
            </div>

            {/* Version Meta Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#071A11] border border-amber-400/40 text-xs font-mono">
              <span className="text-amber-400 font-bold">v2.6.0-semilla-brotando</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-300">Vie 25 Sep 2026, 20:25 hrs</span>
            </div>
          </div>

          <p className="text-slate-200 text-sm sm:text-base font-serif leading-relaxed max-w-4xl">
            La plataforma ha completado su fase embrionaria y se encuentra en estado de <strong>"Semilla brotando"</strong>. 
            La arquitectura está plenamente desacoplada en cuatro nodos autónomos (Web Comercial, AgriTwin Predial 3D, AgroTwin Regional Maule y Rewild Suite). 
            La SpA asegura la titularidad y el usufructo comercial compartido, mientras la Cooperativa canaliza el trabajo de campo y la red campesina comunitaria.
          </p>

          {/* Cluster Status Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 block font-bold">PLATAFORMA MADRE</span>
                <span className="text-xs font-bold text-white">AgroTech Web</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 block font-bold">GEMELO PREDIAL</span>
                <span className="text-xs font-bold text-white">AgriTwin 3D</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 block font-bold">CUENCA REGIONAL</span>
                <span className="text-xs font-bold text-white">AgroTwin 122k ha</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 block font-bold">SUITE CAMPO PWA</span>
                <span className="text-xs font-bold text-white">Rewild Suite</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Control de Filtros por Categoría */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-emerald-700" />
          <h3 className="text-lg font-bold text-slate-900">
            Historial de Actualizaciones (Prompt a Prompt)
          </h3>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
            {CHANGELOG_DATA.length} Hitos Registrados
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 font-sans text-xs">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'arquitectura', label: 'Arquitectura' },
            { id: 'regional', label: 'AgroTwin Regional' },
            { id: 'agritwin', label: 'AgriTwin 3D' },
            { id: 'gobernanza', label: 'Gobernanza SpA' },
            { id: 'esg', label: 'MRV / ESG' },
            { id: 'hardware', label: 'Hardware KioT' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-emerald-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline de Hitos */}
      <div className="space-y-6">
        {filteredMilestones.map((m, idx) => {
          const isExpanded = expandedMilestone === m.id;

          return (
            <div 
              key={m.id}
              className={`rounded-2xl border transition-all ${
                m.isCurrent 
                  ? 'border-emerald-500/70 bg-emerald-50/20 shadow-md ring-1 ring-emerald-500/30' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Encabezado del Hito */}
              <div 
                onClick={() => setExpandedMilestone(isExpanded ? '' : m.id)}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs font-black ${
                    m.isCurrent 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {CHANGELOG_DATA.length - CHANGELOG_DATA.findIndex(item => item.id === m.id)}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-base text-slate-900">
                        {m.version} • "{m.name}"
                      </span>
                      {m.isCurrent && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black uppercase tracking-wider animate-pulse">
                          ACTIVA EN PRODUCCIÓN
                        </span>
                      )}
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                        {m.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{m.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {isExpanded ? 'Ocultar detalles' : 'Ver entregables'}
                  </span>
                  <div className={`w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                </div>
              </div>

              {/* Detalle Desplegable */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-4 animate-fadeIn">
                  <p className="text-xs sm:text-sm text-slate-700 font-serif leading-relaxed">
                    {m.summary}
                  </p>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Entregables e Implementaciones Clave:</span>
                    </span>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-sans">
                      {m.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                          <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-amber-400 font-bold">Impacto en el Ecosistema: </span>
                      <span className="text-slate-300 font-sans">{m.systemImpact}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
