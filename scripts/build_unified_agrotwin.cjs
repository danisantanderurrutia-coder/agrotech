const fs = require('fs');
const path = require('path');

const regionalDir = path.join(__dirname, '..', 'agritwin-regional');
const masterDir = path.join(__dirname, '..', 'agrotwin-master');
const backupPath = path.join(regionalDir, 'index.html.backup');
const targetPath = path.join(masterDir, 'index.html');

let src = fs.readFileSync(backupPath, 'utf-8');

// ── 1. ESTILOS CSS ADICIONALES ──────────────────────────────────────────────
const customStyles = `
        /* ═══════════════════════════════════════════════════════════════════
           ESTILOS UNIFICADOS: BADGES HEXAGONALES, VISTAS & DRAWER VECINAL
           ═══════════════════════════════════════════════════════════════════ */
        .hex-badge-wrapper {
            position: relative;
            width: 44px;
            height: 50px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hex-badge-wrapper:hover {
            transform: scale(1.28) translateY(-4px);
            z-index: 1000 !important;
        }
        .hex-badge-inner {
            width: 100%;
            height: 100%;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            background: #080c14;
            padding: 2px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.85);
        }
        .hex-badge-inner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .hex-badge-halo {
            position: absolute;
            inset: -3px;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            opacity: 0.85;
            animation: hexPulse 3s infinite ease-in-out;
            pointer-events: none;
        }
        @keyframes hexPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.08); opacity: 1; filter: drop-shadow(0 0 8px currentColor); }
        }

        /* Vistas de pantalla completa */
        .master-view {
            position: absolute;
            top: 3.5rem;
            bottom: 2rem;
            left: 0;
            right: 0;
            background: #080c14;
            z-index: 35;
            overflow-y: auto;
            display: none;
        }
        .master-view.active-view {
            display: block;
        }

        /* Drawer Lateral para Fichas Vecinales */
        #neighborDrawer {
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #neighborDrawer.drawer-open {
            transform: translateX(0);
        }
        #neighborDrawer.drawer-closed {
            transform: translateX(105%);
        }

        /* Hero Dual Portals */
        .portal-card {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .portal-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 35px rgba(16, 185, 129, 0.25);
        }

        /* Perfil Estratigráfico del Suelo */
        .soil-horizon-card {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(8, 12, 20, 0.95));
            border-left: 4px solid #10b981;
        }

        /* Tabs de Documentación */
        .docs-subtab-btn.active {
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            border-color: rgba(16, 185, 129, 0.4);
        }
    </style>`;

src = src.replace('</style>', customStyles);

// ── 2. ACTUALIZAR HEADER CON NAVEGACIÓN SINGLE-PANE-OF-GLASS ────────────────
const oldHeaderRegex = /<header class="fixed top-0 left-0 right-0 h-14[\s\S]*?<\/header>/;
const newHeader = `
    <!-- HEADER BAR UNIFICADO AGROTWIN -->
    <header class="fixed top-0 left-0 right-0 h-14 glass-panel z-50 flex items-center justify-between px-4 border-b border-white/10">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/40 bg-emerald-950/60 p-1 shrink-0 flex items-center justify-center font-black text-emerald-400 font-mono text-xs">
                🌱
            </div>
            <div>
                <h1 class="text-emerald-400 font-extrabold text-sm sm:text-base tracking-wider flex items-center gap-1.5 leading-none">
                    AGROTWIN <span class="text-white font-bold">MASTER SUITE</span>
                </h1>
                <span class="text-[9px] text-slate-400 font-mono hidden sm:inline">CUENCA MAULE SUR • 122K HA • GROUND-TRUTH</span>
            </div>
        </div>

        <!-- SELECTOR DE VISTAS MAESTRAS (SINGLE-PANE-OF-GLASS) -->
        <nav class="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
            <button onclick="switchMasterView('landing')" id="navBtn-landing" class="master-nav-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5">
                <span>🏛️</span> Centro de Mando
            </button>
            <button onclick="switchMasterView('territory')" id="navBtn-territory" class="master-nav-btn active-nav px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm transition-all flex items-center gap-1.5">
                <span>🗺️</span> Terminal Territorial & Vecinos
            </button>
            <button onclick="switchMasterView('telemetry')" id="navBtn-telemetry" class="master-nav-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5">
                <span>📊</span> Telemetry Studio
            </button>
            <button onclick="switchMasterView('docs')" id="navBtn-docs" class="master-nav-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5">
                <span>📚</span> Documentación & Vault
            </button>
        </nav>

        <!-- TELEMETRÍA EN VIVO Y ACCESO PREDIAL -->
        <div class="flex items-center gap-2">
            <div class="hidden xl:flex items-center gap-4 text-[11px] data-mono text-slate-300 mr-2 border-r border-white/10 pr-4">
                <div class="flex flex-col"><span class="text-slate-500 text-[9px]">Caudal Longaví</span><span class="text-sky-400 font-bold" id="hdr-caudal">124.5 m³/s</span></div>
                <div class="flex flex-col"><span class="text-slate-500 text-[9px]">Índice FWI</span><span class="text-amber-400 font-bold" id="hdr-fwi">24 (Bajo)</span></div>
                <div class="flex flex-col"><span class="text-slate-500 text-[9px]">Red Centinela</span><span class="text-emerald-400 font-bold flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>9 Nodos</span></div>
            </div>

            <!-- Botón Volar a Predio 3D (:7773) -->
            <a href="http://localhost:7773" target="_blank" class="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/50 text-xs font-semibold font-mono flex items-center gap-1.5 transition-all shadow-sm" title="Abrir Gemelo Predial 3D WebGL (Three.js)">
                <span>🏡</span> <span class="hidden sm:inline">Predio 3D</span> (:7773)
            </a>

            <!-- Dossier Modal Button -->
            <button onclick="openModal()" class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 shadow-sm">
                <span>📑</span> Dossier
            </button>
        </div>
    </header>`;

src = src.replace(oldHeaderRegex, newHeader);

// ── 3. INYECTAR LAS VISTAS DE PANTALLA COMPLETA ANTES DE <div id="map"> ───────
const viewContainers = `
    <!-- ═══════════════════════════════════════════════════════════════════════
         VISTA 1: CENTRO DE MANDO / LANDING (HERO DUAL CON AMBAS IMÁGENES)
         ═══════════════════════════════════════════════════════════════════════ -->
    <div id="view-landing" class="master-view p-6 sm:p-10">
        <div class="max-w-7xl mx-auto space-y-8">
            <!-- Header Landing -->
            <div class="text-center space-y-2">
                <span class="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                    Plataforma Unificada AgroTech • Modelo Tridimensional Anidado
                </span>
                <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    AgroTwin: Del Suelo Biofísico a la Cuenca Territorial
                </h1>
                <p class="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto">
                    Conexión inmutable entre la micro-gestión regenerativa de potrero (PRV, Keyline, 15 sondas FDR) y el terminal hidrológico B2B de cuenca (Río Longaví, Red APRs, Roles SII).
                </p>
            </div>

            <!-- HERO DUAL-PORTAL (LAS DOS IMÁGENES CON BOTONES ACTIVOS) -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <!-- PORTAL A: TALLER AGRÍCOLA PREDIAL (AoE II Edition) -->
                <div class="portal-card relative rounded-3xl overflow-hidden border-2 border-amber-600/50 bg-[#120d09] flex flex-col justify-between shadow-2xl">
                    <div class="relative h-72 sm:h-80 overflow-hidden">
                        <img src="assets/ui/workshop_bg.png" alt="Taller Agrícola Menú" class="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#120d09] via-black/40 to-transparent"></div>
                        
                        <div class="absolute top-4 left-4 flex items-center gap-2">
                            <span class="px-2.5 py-1 rounded-md bg-amber-500/90 text-slate-950 text-[10px] font-black font-mono uppercase tracking-wider shadow">
                                NÚCLEO PREDIAL 3D
                            </span>
                            <span class="px-2 py-0.5 rounded bg-black/60 text-amber-200 text-[10px] font-mono border border-amber-500/30">
                                Puerto :7773
                            </span>
                        </div>

                        <!-- Tablón rústico flotante estilo AoE II -->
                        <div class="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-4 rounded-2xl border border-amber-500/30">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="text-lg font-extrabold text-amber-100 flex items-center gap-2">
                                    <span>🏰</span> Taller Agrícola • Fundo Colliguay
                                </h3>
                                <span class="text-xs font-mono text-emerald-400 font-bold">12.8 ha • PRV</span>
                            </div>
                            <p class="text-xs text-slate-300 mb-3">
                                Simulación de 8 potreros regenerativos, fauna 3D trazable, solsticio solar heliotópico, surcos Keyline y balance Penman-Monteith.
                            </p>
                            <div class="flex items-center gap-3">
                                <a href="http://localhost:7773" target="_blank" class="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs font-mono flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95">
                                    <span>▶</span> Volar a Fundo Colliguay 3D (:7773)
                                </a>
                                <button onclick="switchMasterView('telemetry')" class="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-mono border border-white/10 transition-colors" title="Ver telemetría del predio">
                                    📊 Sensores
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PORTAL B: TERMINAL TERRITORIAL DE CUENCA (Palantir Edition) -->
                <div class="portal-card relative rounded-3xl overflow-hidden border-2 border-emerald-500/50 bg-[#081014] flex flex-col justify-between shadow-2xl">
                    <div class="relative h-72 sm:h-80 overflow-hidden">
                        <img src="assets/ui/agritwin_regional_landing.jpg" alt="AgroTwin Regional Banner" class="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-[#081014] via-black/40 to-transparent"></div>
                        
                        <div class="absolute top-4 left-4 flex items-center gap-2">
                            <span class="px-2.5 py-1 rounded-md bg-emerald-500/90 text-slate-950 text-[10px] font-black font-mono uppercase tracking-wider shadow">
                                TERMINAL GIS B2B
                            </span>
                            <span class="px-2 py-0.5 rounded bg-black/60 text-emerald-200 text-[10px] font-mono border border-emerald-500/30">
                                Puerto :7774
                            </span>
                        </div>

                        <!-- Panel de mando territorial -->
                        <div class="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/30">
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="text-lg font-extrabold text-emerald-100 flex items-center gap-2">
                                    <span>🏔️</span> Cuenca Maule Sur • Retiro - Parral
                                </h3>
                                <span class="text-xs font-mono text-sky-400 font-bold">122.000 ha</span>
                            </div>
                            <p class="text-xs text-slate-300 mb-3">
                                Mosaico de 10 predios catastrados (Roles SII), 5 Comités APR, crecidas del Río Longaví (T=10, 50, 100) y riesgo pirogénico FWI / Puelche.
                            </p>
                            <div class="flex items-center gap-3">
                                <button onclick="switchMasterView('territory')" class="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs font-mono flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95">
                                    <span>🗺️</span> Abrir Terminal & Vecindario
                                </button>
                                <button onclick="switchMasterView('docs')" class="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-mono border border-white/10 transition-colors" title="Ver documentación">
                                    📚 Docs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- TARJETAS DE MÓDULOS TRANSVERSALES -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div onclick="switchMasterView('telemetry')" class="cursor-pointer p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 transition-all hover:-translate-y-1">
                    <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mb-3 border border-emerald-500/30">
                        📊
                    </div>
                    <h4 class="font-bold text-white text-sm mb-1">Telemetry Deep-Dive Studio</h4>
                    <p class="text-xs text-slate-400">
                        Corte estratigráfico del suelo en 10, 30 y 60 cm, Capacidad de Campo, napas freáticas de los 5 APRs y balance Penman-Monteith.
                    </p>
                </div>

                <div onclick="switchMasterView('docs')" class="cursor-pointer p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 transition-all hover:-translate-y-1">
                    <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-xl mb-3 border border-sky-500/30">
                        📚
                    </div>
                    <h4 class="font-bold text-white text-sm mb-1">Centro de Documentación & Vault</h4>
                    <p class="text-xs text-slate-400">
                        Diagramas de arquitectura del merge, galería de biomas Gemini, tablas catastrales oficiales, capas GeoJSON y scripts matemáticos.
                    </p>
                </div>

                <div onclick="switchMasterView('territory'); selectSidebarTab('tab-obras');" class="cursor-pointer p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 transition-all hover:-translate-y-1">
                    <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl mb-3 border border-amber-500/30">
                        🛠️
                    </div>
                    <h4 class="font-bold text-white text-sm mb-1">Banco de Proyectos de Borde</h4>
                    <p class="text-xs text-slate-400">
                        Infraestructura cooperativa: Faja Cortafuegos de 45m, Tranque Keyline compartido de 18.500 m³ y red LoRaWAN transpredial.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════════
         VISTA 2: TELEMETRY DEEP-DIVE STUDIO (VISOR DE SENSORES PANTALLA COMPLETA)
         ═══════════════════════════════════════════════════════════════════════ -->
    <div id="view-telemetry" class="master-view p-6">
        <div class="max-w-7xl mx-auto space-y-6">
            
            <!-- Encabezado Telemetry Studio -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                    <div class="flex items-center gap-2">
                        <h2 class="text-2xl font-black text-white tracking-tight">Telemetry Deep-Dive Studio</h2>
                        <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold uppercase">Red Centinela 9 Nodos</span>
                    </div>
                    <p class="text-xs text-slate-400">
                        Inspección estratigráfica multinivel en suelo, balance evapotranspirativo FAO-56 y dinámica de napas freáticas APR.
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <select id="telemetryNodeSelector" onchange="renderSelectedTelemetryNode(this.value)" class="bg-black/60 border border-white/15 text-slate-200 text-xs rounded-xl px-3 py-2 font-mono focus:border-emerald-500 outline-none">
                        <optgroup label="Fundo Colliguay / Meniel (Sondas FDR)">
                            <option value="FDR-01" selected>Sonda 01 • Cerezos Lapins (0-20 cm)</option>
                            <option value="FDR-02">Sonda 02 • Avellano Tonda (20-40 cm)</option>
                            <option value="FDR-03">Sonda 03 • Pradera PRV (Sward 15cm)</option>
                            <option value="FDR-04">Sonda 04 • Zanja de Infiltración Keyline</option>
                            <option value="FDR-05">Sonda 05 • Cortafuegos Verde Meniel</option>
                        </optgroup>
                        <optgroup label="Red de Comités APR (Napas Freáticas)">
                            <option value="APR-01">APR Retiro Centro (Pozo 68m • 1.450 Familias)</option>
                            <option value="APR-02">APR Copihue (Pozo 52m • 680 Familias)</option>
                            <option value="APR-03">APR Romeral-San Luis (Pozo 44m • 380 Familias)</option>
                            <option value="APR-04">APR Villaseca (Pozo 58m • 420 Familias)</option>
                            <option value="APR-05">APR Los Cuarteles (Pozo 36m • 290 Familias)</option>
                        </optgroup>
                    </select>
                    <button onclick="refreshLiveStudioTelemetry()" class="px-3 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors">
                        <span>🔄</span> Sincronizar
                    </button>
                </div>
            </div>

            <!-- GRID PRINCIPAL DE TELEMETRÍA -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                <!-- COLUMNA 1: CORTE ESTRATIGRÁFICO VERTICAL DEL SUELO (5 COLS) -->
                <div class="lg:col-span-5 space-y-4">
                    <div class="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <span>🌱</span> Perfil Estratigráfico Multinivel
                            </h3>
                            <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                                Sonda FDR Capacitiva
                            </span>
                        </div>

                        <!-- Estrato 1: 10 cm (Horizonte A) -->
                        <div class="soil-horizon-card p-4 rounded-xl space-y-2">
                            <div class="flex items-center justify-between text-xs">
                                <span class="font-bold text-slate-200">10 cm • Horizonte A (Radicular Activo)</span>
                                <span class="font-mono text-emerald-400 font-extrabold text-sm" id="vwc-10cm">38.4% VWC</span>
                            </div>
                            <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                <div class="bg-emerald-500 h-full rounded-full transition-all duration-500" style="width: 76%"></div>
                            </div>
                            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span>Temp: 14.8°C</span>
                                <span>CE: 0.42 dS/m</span>
                                <span class="text-emerald-400 font-bold">Capacidad de Campo (CC)</span>
                            </div>
                        </div>

                        <!-- Estrato 2: 30 cm (Horizonte B) -->
                        <div class="soil-horizon-card p-4 rounded-xl space-y-2" style="border-left-color: #0ea5e9;">
                            <div class="flex items-center justify-between text-xs">
                                <span class="font-bold text-slate-200">30 cm • Horizonte B (Bulbo de Retención)</span>
                                <span class="font-mono text-sky-400 font-extrabold text-sm" id="vwc-30cm">29.1% VWC</span>
                            </div>
                            <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                <div class="bg-sky-500 h-full rounded-full transition-all duration-500" style="width: 58%"></div>
                            </div>
                            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span>Temp: 13.5°C</span>
                                <span>CE: 0.38 dS/m</span>
                                <span class="text-sky-400 font-bold">Agua Fácilmente Disponible</span>
                            </div>
                        </div>

                        <!-- Estrato 3: 60 cm (Horizonte C) -->
                        <div class="soil-horizon-card p-4 rounded-xl space-y-2" style="border-left-color: #6366f1;">
                            <div class="flex items-center justify-between text-xs">
                                <span class="font-bold text-slate-200">60 cm • Horizonte C (Percolación & Recarga)</span>
                                <span class="font-mono text-indigo-400 font-extrabold text-sm" id="vwc-60cm">44.0% VWC</span>
                            </div>
                            <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                                <div class="bg-indigo-500 h-full rounded-full transition-all duration-500" style="width: 88%"></div>
                            </div>
                            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400">
                                <span>Temp: 12.1°C</span>
                                <span>CE: 0.31 dS/m</span>
                                <span class="text-indigo-400 font-bold">Recarga Hacia Napa Freática</span>
                            </div>
                        </div>

                        <!-- Diagnóstico de Hardware LoRaWAN -->
                        <div class="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                            <div class="p-2 rounded bg-black/30 border border-white/5">
                                <div class="text-slate-500">Batería LiFePO4</div>
                                <div class="text-emerald-400 font-bold">3.92 V (94%)</div>
                            </div>
                            <div class="p-2 rounded bg-black/30 border border-white/5">
                                <div class="text-slate-500">Señal RSSI</div>
                                <div class="text-emerald-400 font-bold">-78 dBm (LQI 98)</div>
                            </div>
                            <div class="p-2 rounded bg-black/30 border border-white/5">
                                <div class="text-slate-500">Enlace Gateway</div>
                                <div class="text-sky-400 font-bold">915 MHz OK</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- COLUMNA 2: GRÁFICOS TEMPORALES & BALANCE FAO-56 (7 COLS) -->
                <div class="lg:col-span-7 space-y-4">
                    <div class="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-sm font-bold text-white uppercase tracking-wider">
                                    Dinámica de Humedad vs. Evapotranspiración Penman-Monteith
                                </h3>
                                <p class="text-[10px] text-slate-400">Histórico de 24 horas con bandas de Capacidad de Campo (CC) y Punto de Marchitez (PMP)</p>
                            </div>
                            <span class="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded border border-sky-800">
                                ET₀: 4.2 mm/día
                            </span>
                        </div>

                        <div class="h-64">
                            <canvas id="studioSoilChart"></canvas>
                        </div>
                    </div>

                    <!-- ESTADO DE LOS 5 COMITÉS DE AGUA POTABLE RURAL (APRs) -->
                    <div class="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                        <div class="flex items-center justify-between">
                            <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <span>💧</span> Red de Pozos Comunitarios APR (Monitoreo de Napas)
                            </h3>
                            <span class="text-[10px] text-slate-400 font-mono">3.220 Familias Bajo Vigilancia</span>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2">
                            <div class="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                                <div class="text-[10px] font-bold text-slate-300">Retiro Centro</div>
                                <div class="text-base font-extrabold text-sky-400 font-mono">68 m</div>
                                <div class="text-[9px] text-slate-500">Nivel freático estable</div>
                            </div>
                            <div class="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                                <div class="text-[10px] font-bold text-slate-300">Copihue</div>
                                <div class="text-base font-extrabold text-sky-400 font-mono">52 m</div>
                                <div class="text-[9px] text-slate-500">Recarga Keyline +2%</div>
                            </div>
                            <div class="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                                <div class="text-[10px] font-bold text-slate-300">Romeral-San Luis</div>
                                <div class="text-base font-extrabold text-amber-400 font-mono">44 m</div>
                                <div class="text-[9px] text-amber-400/80">Alerta de abatimiento</div>
                            </div>
                            <div class="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                                <div class="text-[10px] font-bold text-slate-300">Villaseca</div>
                                <div class="text-base font-extrabold text-sky-400 font-mono">58 m</div>
                                <div class="text-[9px] text-slate-500">Nivel freático óptimo</div>
                            </div>
                            <div class="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                                <div class="text-[10px] font-bold text-slate-300">Los Cuarteles</div>
                                <div class="text-base font-extrabold text-sky-400 font-mono">36 m</div>
                                <div class="text-[9px] text-slate-500">Próximo a vega Longaví</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════════
         VISTA 3: CENTRO DE DOCUMENTACIÓN & ASSET VAULT
         ═══════════════════════════════════════════════════════════════════════ -->
    <div id="view-docs" class="master-view p-6 sm:p-10">
        <div class="max-w-7xl mx-auto space-y-6">
            
            <!-- Encabezado Vault -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                    <h2 class="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <span>📚</span> Knowledge & Asset Vault Unificado
                    </h2>
                    <p class="text-xs text-slate-400">
                        Centro técnico y científico: Arquitectura del Merge, Catálogo de Biomas Gemini, Tablas Catastrales, Datasets GeoJSON y Scripts Biofísicos.
                    </p>
                </div>
            </div>

            <!-- Subnavegación del Vault -->
            <div class="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
                <button onclick="switchDocsTab('docs-arch')" id="docsTabBtn-arch" class="docs-subtab-btn active px-3.5 py-2 rounded-xl text-xs font-semibold border border-transparent transition-all">
                    🏛️ Arquitectura & Merge
                </button>
                <button onclick="switchDocsTab('docs-biomes')" id="docsTabBtn-biomes" class="docs-subtab-btn px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white border border-transparent transition-all">
                    🎨 Galería de Biomas Gemini
                </button>
                <button onclick="switchDocsTab('docs-tables')" id="docsTabBtn-tables" class="docs-subtab-btn px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white border border-transparent transition-all">
                    📋 Tablas Catastrales & APR
                </button>
                <button onclick="switchDocsTab('docs-geojson')" id="docsTabBtn-geojson" class="docs-subtab-btn px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white border border-transparent transition-all">
                    🗺️ Datasets GeoJSON
                </button>
                <button onclick="switchDocsTab('docs-scripts')" id="docsTabBtn-scripts" class="docs-subtab-btn px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white border border-transparent transition-all">
                    ⚙️ Scripts Biofísicos
                </button>
            </div>

            <!-- SUBTAB 1: ARQUITECTURA DEL MERGE -->
            <div id="docs-arch" class="docs-subcontent space-y-5">
                <div class="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <h3 class="text-lg font-bold text-white flex items-center gap-2">
                        <span>🏛️</span> Arquitectura de Integración Bidireccional
                    </h3>
                    <p class="text-xs text-slate-300 leading-relaxed">
                        El sistema fusiona la telemetría predial hiperlocal con los modelos de cuenca mediante dos flujos acoplados en tiempo real:
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                        <div class="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
                            <span class="text-emerald-400 font-bold">1. DOWNSCALING (Macro-Cuenca ➔ Predio 3D)</span>
                            <p class="text-slate-300 font-sans text-xs">
                                El servidor territorial (:7774) computa la velocidad del viento Puelche, la evapotranspiración de cuenca y el caudal del Río Longaví, e inyecta estas condiciones de contorno hacia :7773 para simular el estrés hídrico de la pastura y el avance pirogénico.
                            </p>
                            <div class="bg-black/60 p-2 rounded text-[10px] text-emerald-300">
                                GET /api/basin-sync ➔ Tasa de deshidratación PRV & Alerta FWI
                            </div>
                        </div>

                        <div class="p-4 rounded-xl bg-slate-900/80 border border-sky-500/30 space-y-2">
                            <span class="text-sky-400 font-bold">2. UPSCALING GROUND-TRUTH (Predio ➔ Macro-Cuenca)</span>
                            <p class="text-slate-300 font-sans text-xs">
                                Las 15 sondas FDR capacitivas y el pastoreo de impacto en el cortafuegos de Colliguay demuestran retención hídrica empírica (18.500 m³ en tranque Keyline), calibrando las alertas de los Comités APR y las curvas de inundación comunal.
                            </p>
                            <div class="bg-black/60 p-2 rounded text-[10px] text-sky-300">
                                15 Nodos FDR + Tranque Keyline ➔ Amortiguación de Crecidas TWI
                            </div>
                        </div>
                    </div>

                    <!-- Inspector de APIs Vivas -->
                    <div class="pt-4 border-t border-white/10 space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-mono font-bold text-slate-300">Inspector de Endpoints en Vivo</span>
                            <button onclick="testLiveApi()" class="px-3 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-xs font-mono rounded border border-emerald-500/30">
                                Testear /api/telemetry/summary
                            </button>
                        </div>
                        <pre id="api-live-output" class="p-4 bg-black/80 rounded-xl text-[10px] font-mono text-emerald-400 overflow-x-auto max-h-48 border border-white/5">// Presiona 'Testear' para inspeccionar la respuesta viva del Gateway...</pre>
                    </div>
                </div>
            </div>

            <!-- SUBTAB 2: GALERÍA DE BIOMAS GEMINI -->
            <div id="docs-biomes" class="docs-subcontent hidden space-y-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="biomesGalleryGrid">
                    <!-- Populated dynamically by JS -->
                </div>
            </div>

            <!-- SUBTAB 3: TABLAS CATASTRALES & APR -->
            <div id="docs-tables" class="docs-subcontent hidden space-y-5">
                <div class="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Mosaico Catastral de los 10 Predios Rurales</h3>
                        <button onclick="exportParcelsToCSV()" class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-slate-200 font-mono border border-white/10">
                            📥 Exportar CSV
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs font-mono border-collapse" id="parcelsMasterTable">
                            <thead>
                                <tr class="border-b border-white/15 text-slate-400">
                                    <th class="py-2 px-3">Predio</th>
                                    <th class="py-2 px-3">Rol SII</th>
                                    <th class="py-2 px-3">Superficie</th>
                                    <th class="py-2 px-3">Cultivo / Bioma</th>
                                    <th class="py-2 px-3">Derechos DGA</th>
                                    <th class="py-2 px-3">FWI Riesgo</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5 text-slate-300" id="parcelsMasterTableBody">
                                <!-- Populated dynamically -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- SUBTAB 4: DATASETS GEOJSON -->
            <div id="docs-geojson" class="docs-subcontent hidden space-y-5">
                <div class="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Capas Vectoriales GeoJSON (Maule Sur)</h3>
                        <button onclick="copyGeoJSONToClipboard()" class="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 text-xs font-mono">
                            📋 Copiar GeoJSON Predios
                        </button>
                    </div>
                    <pre class="p-4 bg-black/80 rounded-xl text-[10px] font-mono text-slate-300 overflow-x-auto max-h-72 border border-white/5" id="geojsonCodeView">// Cargando geometrías vectoriales...</pre>
                </div>
            </div>

            <!-- SUBTAB 5: SCRIPTS BIOFÍSICOS -->
            <div id="docs-scripts" class="docs-subcontent hidden space-y-5">
                <div class="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <h3 class="text-sm font-bold text-white uppercase tracking-wider">Algoritmo Evapotranspirativo Penman-Monteith (FAO-56)</h3>
                    <pre class="p-4 bg-black/80 rounded-xl text-[10px] font-mono text-emerald-300 overflow-x-auto border border-white/5"><code>/**
 * Cálculo de Evapotranspiración de Referencia (ET0) bajo el estándar FAO-56.
 * @param {number} t - Temperatura media (°C)
 * @param {number} u2 - Velocidad del viento a 2m (m/s)
 * @param {number} rn - Radiación solar neta (MJ/m²/día)
 * @param {number} g - Flujo de calor en el suelo (MJ/m²/día)
 * @param {number} es - Presión de vapor de saturación (kPa)
 * @param {number} ea - Presión de vapor real (kPa)
 * @param {number} delta - Pendiente de la curva de presión de vapor (kPa/°C)
 * @param {number} gamma - Constante psicrométrica (kPa/°C)
 */
function calculateFAO56_ET0(t, u2, rn, g, es, ea, delta, gamma) {
    const numerator = 0.408 * delta * (rn - g) + gamma * (900 / (t + 273)) * u2 * (es - ea);
    const denominator = delta + gamma * (1 + 0.34 * u2);
    return +(numerator / denominator).toFixed(2); // mm/día
}</code></pre>
                </div>
            </div>

        </div>
    </div>
`;

// Insertar las vistas maestras antes de <div id="map">
src = src.replace('<div id="map"></div>', `${viewContainers}\n    <!-- MAP CONTAINER -->\n    <div id="map"></div>`);

// ── 4. AGREGAR PESTAÑA "OBRAS DE BORDE" EN EL SIDEBAR DEL GIS ────────────────
const sidebarTabsRegex = /<button class="tab-btn flex-1 py-3 px-2 text-\[11px\] font-semibold text-slate-400 border-b-2 border-transparent hover:bg-white\/5 transition-colors whitespace-nowrap" data-target="tab-water">💧 Hídrico<\/button>/;
const newSidebarTabs = `<button class="tab-btn flex-1 py-3 px-2 text-[11px] font-semibold text-slate-400 border-b-2 border-transparent hover:bg-white/5 transition-colors whitespace-nowrap" data-target="tab-water">💧 Hídrico</button>
            <button class="tab-btn flex-1 py-3 px-2 text-[11px] font-semibold text-slate-400 border-b-2 border-transparent hover:bg-white/5 transition-colors whitespace-nowrap" data-target="tab-obras">🛠️ Obras Borde</button>`;

src = src.replace(sidebarTabsRegex, newSidebarTabs);

// Agregar el contenido de la pestaña tab-obras
const tabWaterEndRegex = /<\/div>\s*<!-- TAB: RED CENTINELA -->/i;
const tabObrasContent = `
            <!-- TAB: OBRAS DE BORDE COOPERATIVAS -->
            <div id="tab-obras" class="tab-content space-y-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-sm text-white font-bold uppercase tracking-wider">Obras de Borde Cooperativas</h2>
                        <p class="text-[10px] text-slate-400">Infraestructura regenerativa y acuerdos de mitigación vecinal</p>
                    </div>
                    <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">3 Proyectos</span>
                </div>

                <div class="space-y-3" id="cooperativeProjectsList">
                    <!-- Populated dynamically via /api/projects -->
                </div>
            </div>

            <!-- TAB: RED CENTINELA -->`;

src = src.replace(/<!-- TAB: RED CENTINELA -->/i, tabObrasContent);

// ── 5. INYECTAR EL DRAWER LATERAL DE FICHAS VECINALES ANTES DE </body> ───────
const neighborDrawerHtml = `
    <!-- ═══════════════════════════════════════════════════════════════════════
         DRAWER LATERAL: FICHA TERRITORIAL VECINAL & CUADERNO DE CAMPO
         ═══════════════════════════════════════════════════════════════════════ -->
    <div id="neighborDrawer" class="drawer-closed fixed right-0 top-14 bottom-8 w-full sm:w-[480px] bg-[#0b0f19] border-l border-white/10 z-50 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl">
        
        <!-- Header con el Arte Hexagonal Gemini del Bioma -->
        <div class="relative h-44 shrink-0 overflow-hidden border-b border-white/10">
            <img id="drawerBiomeImg" src="assets/catan/tile_colliguay.jpg" alt="Bioma" class="w-full h-full object-cover filter brightness-90 contrast-105">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-black/40 to-transparent"></div>
            
            <button onclick="closeNeighborDrawer()" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors">
                &times;
            </button>

            <div class="absolute bottom-3 left-4 right-4">
                <span id="drawerBiomeTag" class="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/80 text-slate-950 font-black">
                    NÚCLEO PREDIAL
                </span>
                <h3 id="drawerParcelName" class="text-lg font-black text-white mt-1 leading-tight">
                    Fundo Meniel
                </h3>
                <div class="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <span id="drawerParcelRol">Rol: 142-88 Retiro</span>
                    <span>•</span>
                    <span id="drawerParcelArea" class="text-sky-400 font-bold">24.8 ha</span>
                </div>
            </div>
        </div>

        <!-- Contenido Desplazable del Drawer -->
        <div class="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
            
            <!-- SECCIÓN 1: DATA AGROTECH AUTOMÁTICA -->
            <div class="space-y-3">
                <h4 class="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <span>📡</span> Telemetría & Datos Satelitales
                </h4>

                <div class="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div class="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <div class="text-slate-500 text-[10px]">Cultivo / Cobertura</div>
                        <div class="text-slate-200 font-semibold" id="drawerParcelCrop">Cerezos & Avellano</div>
                    </div>
                    <div class="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <div class="text-slate-500 text-[10px]">Derechos DGA</div>
                        <div class="text-sky-400 font-bold" id="drawerParcelWater">42.5 L/s</div>
                    </div>
                    <div class="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <div class="text-slate-500 text-[10px]">Humedad FDR</div>
                        <div class="text-emerald-400 font-bold" id="drawerParcelVwc">36.2%</div>
                    </div>
                    <div class="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <div class="text-slate-500 text-[10px]">Piro-Riesgo FWI</div>
                        <div class="text-amber-400 font-bold" id="drawerParcelFwi">24 (Bajo)</div>
                    </div>
                </div>
            </div>

            <!-- SECCIÓN 2: CUADERNO DE INTELIGENCIA VECINAL (EDITABLE) -->
            <div class="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                <div class="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 class="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                        <span>📝</span> Cuaderno de Inteligencia de Campo
                    </h4>
                    <span class="text-[9px] text-slate-500 font-mono">Editable por Productor</span>
                </div>

                <div class="space-y-2">
                    <div>
                        <label class="text-[10px] text-slate-400 font-mono">Administrador / Contacto:</label>
                        <input type="text" id="noteAdmin" class="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-amber-400 font-mono" placeholder="Ej. Don Pedro Morales">
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="text-[10px] text-slate-400 font-mono">Teléfono:</label>
                            <input type="text" id="notePhone" class="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-amber-400 font-mono" placeholder="+56 9...">
                        </div>
                        <div>
                            <label class="text-[10px] text-slate-400 font-mono">Canal Radio VHF:</label>
                            <input type="text" id="noteRadio" class="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-amber-400 font-mono" placeholder="Canal 4...">
                        </div>
                    </div>

                    <div>
                        <label class="text-[10px] text-slate-400 font-mono">Estado de Cortafuegos Perimetral:</label>
                        <input type="text" id="noteCortafuego" class="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-amber-400 font-mono" placeholder="Faja limpia, pastoreo PRV...">
                    </div>

                    <div>
                        <label class="text-[10px] text-slate-400 font-mono">Acuerdos / Oportunidades Cooperativas:</label>
                        <textarea id="noteAgreements" rows="2" class="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-amber-400 font-mono" placeholder="Convenio de pastoreo en rastrojos, turno de agua..."></textarea>
                    </div>

                    <div>
                        <label class="text-[10px] text-slate-400 font-mono">Notas Libres del Predio:</label>
                        <textarea id="noteText" rows="2" class="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-slate-200 outline-none focus:border-amber-400 font-mono" placeholder="Observaciones de suelo, ganado..."></textarea>
                    </div>

                    <button onclick="saveCurrentNeighborNotes()" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs font-mono flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95">
                        <span>💾</span> Guardar Notas en el Servidor
                    </button>
                    <div id="saveNoteToast" class="hidden text-center text-[10px] font-mono text-emerald-400 font-bold py-1">
                        ✅ Notas de campo guardadas con éxito
                    </div>
                </div>
            </div>

        </div>
    </div>
`;

src = src.replace('</body>', `${neighborDrawerHtml}\n</body>`);

// ── 6. JAVASCRIPT DE INTEGRACIÓN UNIFICADA ──────────────────────────────────
const unifiedJsCode = `
        // ═══════════════════════════════════════════════════════════════════
        // MAPEO DE BIOMAS GEMINI A PREDIOS
        // ═══════════════════════════════════════════════════════════════════
        const BIOMES_MAP = {
            'MENIEL': {
                name: 'Agricultura Regenerativa & Keyline',
                image: 'assets/catan/tile_colliguay.jpg',
                tag: 'Núcleo AgroTech',
                color: '#10b981',
                desc: 'Predio núcleo con diseño Keyline, pastoreo PRV y matriz de 15 sondas FDR.'
            },
            'SAN_JOSE': {
                name: 'Vega Ribereña & Cultivo de Inundación',
                image: 'assets/catan/tile_water.jpg',
                tag: 'Arroz & Humedal',
                color: '#0ea5e9',
                desc: 'Cuarteles de arroz inundado contiguos al Río Longaví, actuando como zona de disipación.'
            },
            'LOS_BOLDOS': {
                name: 'Monocultivo Forestal (Pino Radiata)',
                image: 'assets/catan/tile_pines.jpg',
                tag: 'Piro-Riesgo Crítico',
                color: '#ef4444',
                desc: 'Plantación forestal densa en ladera granítica, alta exposición a viento Puelche.'
            },
            'RETIRO_PONIENTE': {
                name: 'Cultivos Anuales & Granos Dorados',
                image: 'assets/catan/tile_wheat.jpg',
                tag: 'Trigo Candeal',
                color: '#f59e0b',
                desc: 'Suelos aluviales profundos bajo rotación de cereales de invierno y maíz.'
            },
            'STA_LUCIA': {
                name: 'Frutales Menores & Huerto de Riego',
                image: 'assets/catan/tile_pasture.jpg',
                tag: 'Arándanos & Huape',
                color: '#8b5cf6',
                desc: 'Huerto intensivo tecnificado con riego por goteo y malla sombreante.'
            },
            'EL_CULENAR': {
                name: 'Silvopastoril PRV & Bosque Esclerófilo',
                image: 'assets/catan/tile_forest.jpg',
                tag: 'PRV & Nativo',
                color: '#14b8a6',
                desc: 'Pastoreo racional integrado a parches de Quillay, Peumo y espinos nativos.'
            },
            'VINA_AUSTRAL': {
                name: 'Viñedo Patrimonial de Secano Interior',
                image: 'assets/catan/tile_vineyard.jpg',
                tag: 'País & Carignan',
                color: '#ec4899',
                desc: 'Parras centenarias de secano en ladera roja meteorizada de alto valor patrimonial.'
            },
            'EL_SAUCE': {
                name: 'Pastura Natural & Forraje Tradicional',
                image: 'assets/catan/tile_pasture.jpg',
                tag: 'Forrajero',
                color: '#84cc16',
                desc: 'Praderas naturales de secano para crianza extensiva bovina y ovina.'
            },
            'SAN_CRISTOBAL': {
                name: 'Chacras & Granos Tradicionales',
                image: 'assets/catan/tile_wheat.jpg',
                tag: 'Maíz & Hortalizas',
                color: '#eab308',
                desc: 'Policultivos de temporada estival con derechos de canal matriz.'
            },
            'LA_PALMA': {
                name: 'Precordillera & Matorral Esclerófilo Andino',
                image: 'assets/catan/tile_mountain.jpg',
                tag: 'Amortiguación Andina',
                color: '#6366f1',
                desc: 'Zona de transición hacia los Andes maulinos, cabecera de quebradas hidrológicas.'
            }
        };

        // ═══════════════════════════════════════════════════════════════════
        // CONTROLADOR DE VISTAS MAESTRAS (SINGLE-PANE-OF-GLASS)
        // ═══════════════════════════════════════════════════════════════════
        let currentMasterView = 'landing';

        function switchMasterView(viewId) {
            currentMasterView = viewId;
            
            // Ocultar todas las vistas de pantalla completa
            document.querySelectorAll('.master-view').forEach(el => el.classList.remove('active-view'));
            
            // Desactivar todos los botones nav
            document.querySelectorAll('.master-nav-btn').forEach(btn => {
                btn.classList.remove('active-nav', 'bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/40', 'border');
                btn.classList.add('text-slate-300');
            });

            // Activar botón nav correspondiente
            const activeBtn = document.getElementById('navBtn-' + viewId);
            if (activeBtn) {
                activeBtn.classList.add('active-nav', 'bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/40', 'border');
                activeBtn.classList.remove('text-slate-300');
            }

            if (viewId === 'territory') {
                // Modo mapa interactivo normal
                if (map) setTimeout(() => map.invalidateSize(), 100);
            } else {
                const targetEl = document.getElementById('view-' + viewId);
                if (targetEl) targetEl.classList.add('active-view');
            }

            // Inicializar vistas específicas si es necesario
            if (viewId === 'telemetry') {
                initStudioCharts();
            } else if (viewId === 'docs') {
                initDocsCatalog();
            }
        }

        // Subtabs del Centro de Documentación
        function switchDocsTab(tabId) {
            document.querySelectorAll('.docs-subcontent').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.docs-subtab-btn').forEach(b => b.classList.remove('active'));
            
            const content = document.getElementById(tabId);
            if (content) content.classList.remove('hidden');

            const btnId = tabId.replace('docs-', 'docsTabBtn-');
            const btn = document.getElementById(btnId);
            if (btn) btn.classList.add('active');
        }

        // ═══════════════════════════════════════════════════════════════════
        // BADGES HEXAGONALES EN EL MAPA SATELITAL
        // ═══════════════════════════════════════════════════════════════════
        let hexMarkersGroup = L.layerGroup();

        function addHexBadgesToMap() {
            if (!geojsonPredios || !geojsonPredios.features) return;

            geojsonPredios.features.forEach(feat => {
                const p = feat.properties;
                const coords = feat.geometry.coordinates[0];
                
                // Calcular centroide simple del polígono
                let latSum = 0, lngSum = 0;
                coords.forEach(c => { lngSum += c[0]; latSum += c[1]; });
                const centerLat = latSum / coords.length;
                const centerLng = lngSum / coords.length;

                const biome = BIOMES_MAP[p.id] || {
                    image: 'assets/catan/tile_pasture.jpg',
                    color: p.color || '#10b981'
                };

                const hexHtml = \`
                    <div class="hex-badge-wrapper" onclick="openNeighborDrawer('\${p.id}')" title="\${p.name} • \${p.rol}">
                        <div class="hex-badge-halo" style="background: \${biome.color}; color: \${biome.color};"></div>
                        <div class="hex-badge-inner" style="border: 2px solid \${biome.color};">
                            <img src="\${biome.image}" alt="\${p.name}">
                        </div>
                    </div>
                \`;

                const hexIcon = L.divIcon({
                    html: hexHtml,
                    className: 'custom-hex-div-icon',
                    iconSize: [44, 50],
                    iconAnchor: [22, 25]
                });

                const marker = L.marker([centerLat, centerLng], { icon: hexIcon });
                marker.on('click', () => openNeighborDrawer(p.id));
                hexMarkersGroup.addLayer(marker);
            });

            hexMarkersGroup.addTo(map);
            overlayLayers['badges_gemini'] = hexMarkersGroup;
        }

        // ═══════════════════════════════════════════════════════════════════
        // DRAWER LATERAL: FICHA TERRITORIAL VECINAL
        // ═══════════════════════════════════════════════════════════════════
        let activeParcelId = 'MENIEL';

        async function openNeighborDrawer(parcelId) {
            activeParcelId = parcelId;
            const feat = geojsonPredios.features.find(f => f.properties.id === parcelId);
            if (!feat) return;
            const p = feat.properties;
            const biome = BIOMES_MAP[parcelId] || {
                image: 'assets/catan/tile_pasture.jpg',
                name: p.crop,
                tag: 'Predio Vecino',
                color: p.color
            };

            // Rellenar cabecera visual
            document.getElementById('drawerBiomeImg').src = biome.image;
            document.getElementById('drawerBiomeTag').innerText = biome.tag;
            document.getElementById('drawerBiomeTag').style.backgroundColor = biome.color;
            document.getElementById('drawerParcelName').innerText = p.name;
            document.getElementById('drawerParcelRol').innerText = 'Rol: ' + p.rol;
            document.getElementById('drawerParcelArea').innerText = p.area_ha + ' ha';

            // Rellenar telemetría
            document.getElementById('drawerParcelCrop').innerText = p.crop;
            document.getElementById('drawerParcelWater').innerText = p.water_L_s + ' L/s';
            document.getElementById('drawerParcelVwc').innerText = p.vwc;
            document.getElementById('drawerParcelFwi').innerText = p.fwi + ' (' + p.fwi_status + ')';

            // Cargar notas desde /api/notes
            try {
                const res = await fetch('/api/notes');
                const allNotes = await res.json();
                const note = allNotes[parcelId] || {};
                document.getElementById('noteAdmin').value = note.admin || p.owner || '';
                document.getElementById('notePhone').value = note.phone || '';
                document.getElementById('noteRadio').value = note.radio_channel || '';
                document.getElementById('noteCortafuego').value = note.cortafuego_status || '';
                document.getElementById('noteAgreements').value = note.agreements || '';
                document.getElementById('noteText').value = note.notes || '';
            } catch (_) {}

            const drawer = document.getElementById('neighborDrawer');
            drawer.classList.remove('drawer-closed');
            drawer.classList.add('drawer-open');
        }

        function closeNeighborDrawer() {
            const drawer = document.getElementById('neighborDrawer');
            drawer.classList.remove('drawer-open');
            drawer.classList.add('drawer-closed');
        }

        async function saveCurrentNeighborNotes() {
            const payload = {
                id: activeParcelId,
                admin: document.getElementById('noteAdmin').value,
                phone: document.getElementById('notePhone').value,
                radio_channel: document.getElementById('noteRadio').value,
                cortafuego_status: document.getElementById('noteCortafuego').value,
                agreements: document.getElementById('noteAgreements').value,
                notes: document.getElementById('noteText').value
            };

            try {
                const res = await fetch('/api/notes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    const toast = document.getElementById('saveNoteToast');
                    toast.classList.remove('hidden');
                    setTimeout(() => toast.classList.add('hidden'), 3000);
                }
            } catch (err) {
                alert("Error al guardar notas: " + err.message);
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // BANCO DE PROYECTOS & OBRAS DE BORDE
        // ═══════════════════════════════════════════════════════════════════
        async function loadCooperativeProjects() {
            const listEl = document.getElementById('cooperativeProjectsList');
            if (!listEl) return;
            try {
                const res = await fetch('/api/projects');
                const projects = await res.json();
                listEl.innerHTML = projects.map(proj => \`
                    <div class="p-3.5 rounded-xl bg-slate-900/80 border \${proj.executed ? 'border-emerald-500/50' : 'border-white/10'} space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-white flex items-center gap-1.5">
                                <span>\${proj.executed ? '✅' : '⏳'}</span> \${proj.name}
                            </span>
                            <span class="text-[10px] font-mono font-bold \${proj.executed ? 'text-emerald-400 bg-emerald-950/60' : 'text-amber-400 bg-amber-950/60'} px-2 py-0.5 rounded border border-white/10">
                                \${proj.executed ? 'EJECUTADA' : 'PLANIFICADA'}
                            </span>
                        </div>
                        <p class="text-[10px] text-slate-300">\${proj.description}</p>
                        <div class="text-[9px] font-mono text-sky-400 font-bold">\${proj.impact}</div>
                        <div class="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] font-mono text-slate-400">
                            <span>CAPEX: $\${(proj.capex_clp / 1000000).toFixed(1)}M CLP</span>
                            <button onclick="toggleProjectExecution('\${proj.id}')" class="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-200 transition-colors">
                                \${proj.executed ? 'Desmarcar' : 'Marcar Ejecutada'}
                            </button>
                        </div>
                    </div>
                \`).join('');
            } catch (_) {}
        }

        async function toggleProjectExecution(id) {
            try {
                await fetch('/api/projects/toggle', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                loadCooperativeProjects();
            } catch (_) {}
        }

        // ═══════════════════════════════════════════════════════════════════
        // TELEMETRY STUDIO INITIALIZER
        // ═══════════════════════════════════════════════════════════════════
        let studioChartInstance = null;

        function initStudioCharts() {
            const ctx = document.getElementById('studioSoilChart');
            if (!ctx || studioChartInstance) return;

            studioChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                    datasets: [
                        {
                            label: 'Colliguay 10cm (Keyline)',
                            data: [39.1, 38.8, 38.5, 37.8, 36.9, 36.2, 37.0, 38.4],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            borderWidth: 2,
                            tension: 0.35,
                            fill: true
                        },
                        {
                            label: 'Colliguay 30cm (Retención)',
                            data: [29.5, 29.4, 29.3, 29.2, 29.1, 29.0, 29.1, 29.1],
                            borderColor: '#0ea5e9',
                            borderWidth: 2,
                            tension: 0.35
                        },
                        {
                            label: 'Testigo Vecino Convencional (10cm)',
                            data: [32.0, 30.5, 29.0, 26.5, 23.0, 21.5, 22.0, 23.5],
                            borderColor: '#f59e0b',
                            borderDash: [5, 5],
                            borderWidth: 2,
                            tension: 0.35
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } },
                            title: { display: true, text: 'Humedad Volumétrica VWC (%)', color: '#64748b', font: { size: 10 } }
                        },
                        x: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: '#cbd5e1', font: { family: 'Plus Jakarta Sans', size: 10 } } }
                    }
                }
            });
        }

        function refreshLiveStudioTelemetry() {
            // Animación sutil de micro-actualización
            const v10 = (37 + Math.random() * 2).toFixed(1);
            const v30 = (28 + Math.random() * 2).toFixed(1);
            const v60 = (43 + Math.random() * 2).toFixed(1);
            document.getElementById('vwc-10cm').innerText = v10 + '% VWC';
            document.getElementById('vwc-30cm').innerText = v30 + '% VWC';
            document.getElementById('vwc-60cm').innerText = v60 + '% VWC';
        }

        // ═══════════════════════════════════════════════════════════════════
        // DOCUMENTATION VAULT INITIALIZER
        // ═══════════════════════════════════════════════════════════════════
        function initDocsCatalog() {
            // Galería de Biomas
            const gallery = document.getElementById('biomesGalleryGrid');
            if (gallery && gallery.children.length === 0) {
                gallery.innerHTML = Object.entries(BIOMES_MAP).map(([id, b]) => \`
                    <div class="rounded-2xl overflow-hidden bg-black/50 border border-white/10 space-y-3 p-4 flex flex-col justify-between">
                        <div class="space-y-2">
                            <div class="relative h-40 rounded-xl overflow-hidden border border-white/10">
                                <img src="\${b.image}" alt="\${b.name}" class="w-full h-full object-cover">
                                <span class="absolute top-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase text-slate-950" style="background: \${b.color}">
                                    \${b.tag}
                                </span>
                            </div>
                            <h4 class="font-bold text-white text-sm">\${b.name}</h4>
                            <p class="text-[11px] text-slate-400">\${b.desc}</p>
                        </div>
                        <a href="\${b.image}" download class="w-full py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-mono text-center transition-colors">
                            ⬇️ Descargar PNG HD
                        </a>
                    </div>
                \`).join('');
            }

            // Tabla Catastral
            const tableBody = document.getElementById('parcelsMasterTableBody');
            if (tableBody && tableBody.children.length === 0) {
                tableBody.innerHTML = geojsonPredios.features.map(f => {
                    const p = f.properties;
                    return \`
                        <tr class="hover:bg-white/5 transition-colors">
                            <td class="py-2.5 px-3 font-bold text-white">\${p.name}</td>
                            <td class="py-2.5 px-3 text-slate-400">\${p.rol}</td>
                            <td class="py-2.5 px-3 text-sky-400 font-bold">\${p.area_ha} ha</td>
                            <td class="py-2.5 px-3 text-slate-300">\${p.crop}</td>
                            <td class="py-2.5 px-3 text-emerald-400 font-bold">\${p.water_L_s} L/s</td>
                            <td class="py-2.5 px-3 font-bold \${p.fwi > 50 ? 'text-red-400' : 'text-emerald-400'}">\${p.fwi}</td>
                        </tr>
                    \`;
                }).join('');
            }

            // Visor GeoJSON
            const geoJsonView = document.getElementById('geojsonCodeView');
            if (geoJsonView) {
                geoJsonView.innerText = JSON.stringify(geojsonPredios, null, 2);
            }
        }

        function exportParcelsToCSV() {
            let csv = "ID,Nombre,Rol,Area_Ha,Cultivo,Derechos_DGA_Ls,FWI\\n";
            geojsonPredios.features.forEach(f => {
                const p = f.properties;
                csv += \`"\${p.id}","\${p.name}","\${p.rol}",\${p.area_ha},"\${p.crop}",\${p.water_L_s},\${p.fwi}\\n\`;
            });
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'catastro_predios_maule_sur.csv';
            a.click();
        }

        function copyGeoJSONToClipboard() {
            navigator.clipboard.writeText(JSON.stringify(geojsonPredios, null, 2));
            alert("✅ GeoJSON de los 10 predios copiado al portapapeles");
        }

        // Llamada de inicialización de Badges y Obras al cargar el mapa
        setTimeout(() => {
            addHexBadgesToMap();
            loadCooperativeProjects();
        }, 500);
`;

// Cambiar title y vista por defecto a Landing
src = src.replace('<title>AgroTwin Regional - Cuenca Maule Sur</title>', '<title>AgroTwin Master Suite • Plataforma Unificada</title>');
src = src.replace('id="view-landing" class="master-view p-6 sm:p-10"', 'id="view-landing" class="master-view active-view p-6 sm:p-10"');
src = src.replace('id="navBtn-landing" class="master-nav-btn px-3 py-1.5', 'id="navBtn-landing" class="master-nav-btn active-nav bg-emerald-500/20 text-emerald-300 border-emerald-500/40 border px-3 py-1.5');
src = src.replace('id="navBtn-territory" class="master-nav-btn active-nav px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm transition-all flex items-center gap-1.5"', 'id="navBtn-territory" class="master-nav-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"');

// Insertar el nuevo bloque de JavaScript antes del cierre del script principal
const lastScriptIdx = src.lastIndexOf('</script>');
if (lastScriptIdx !== -1) {
  src = src.slice(0, lastScriptIdx) + '\n' + unifiedJsCode + '\n' + src.slice(lastScriptIdx);
}

// Guardar archivo final
fs.writeFileSync(targetPath, src, 'utf-8');
console.log("Unified AgroTwin index.html compiled successfully!");
