import React, { useState, useMemo } from 'react';
import { 
  Cpu, Layers, Satellite, ShieldCheck, Droplets, Flame, Wind, 
  Play, CheckCircle2, ArrowRight, ExternalLink, Calendar,
  BarChart3, Sparkles, Building2, Trees, Video,
  Compass, Eye, Check, X, Send, PhoneCall, HelpCircle,
  FileText, Activity, Radio, RefreshCw, AlertTriangle,
  Sliders, Gauge, ChevronRight, CheckCircle, Mail, Globe,
  MapPin, Share2, Info, Terminal, Database, BookOpen, Download
} from 'lucide-react';

interface AgriTwinShowcasePageProps {
  onNavigate?: (viewId: string) => void;
}

export const AgriTwinShowcasePage: React.FC<AgriTwinShowcasePageProps> = ({ onNavigate }) => {
  // Selector de Lente Dual Científico (Macro Cuenca vs Micro Parcela Experimental)
  const [activeLensMode, setActiveLensMode] = useState<'basin' | 'plot'>('basin');
  
  // Modal de solicitud institucional y alianzas I+D
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'testbed_access' | 'research_grant' | 'data_api'>('testbed_access');

  // Video cápsulas experimentales
  const [activeVideoClip, setActiveVideoClip] = useState<'3d' | 'frost' | 'basin'>('3d');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Galería de capas espectrales y modelos
  const [activeGalleryTab, setActiveGalleryTab] = useState<number>(0);

  // Pestaña del pipeline de asimilación de datos
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);

  // ─── PARÁMETROS DEL BANCO DE ENSAYOS PARAMÉTRICOS (SANDBOX BIOFÍSICO) ───
  const [simTemp, setSimTemp] = useState<number>(1.2); // °C (-3 a 38)
  const [simSoilMoisture, setSimSoilMoisture] = useState<number>(23); // % volumétrica (8 a 50)
  const [simWindSpeed, setSimWindSpeed] = useState<'calm' | 'breeze' | 'puelche'>('calm');
  const [simCrop, setSimCrop] = useState<'avellano' | 'vid' | 'pradera'>('avellano');
  const [simSoilType, setSimSoilType] = useState<'arcilloso' | 'limoso' | 'arenoso'>('arcilloso');

  // Presets de escenarios agroclimáticos extremos para el investigador
  const applyPreset = (preset: 'frost' | 'heatwave' | 'saturation') => {
    if (preset === 'frost') {
      setSimTemp(-1.8);
      setSimWindSpeed('calm');
      setSimCrop('avellano');
      setSimSoilType('arcilloso');
      setSimSoilMoisture(24);
    } else if (preset === 'heatwave') {
      setSimTemp(35.2);
      setSimWindSpeed('puelche');
      setSimCrop('vid');
      setSimSoilType('limoso');
      setSimSoilMoisture(16);
    } else if (preset === 'saturation') {
      setSimTemp(14.0);
      setSimWindSpeed('breeze');
      setSimSoilType('arcilloso');
      setSimSoilMoisture(44);
    }
  };

  // Cálculos deterministas auditables (FAO-56 Penman-Monteith 1998 & Hidrodinámica Vadosa)
  const simulationResults = useMemo(() => {
    // Coeficiente fenológico de cultivo Kc y resistencia estomática mínima rs
    let kc = 0.85;
    let rs = 100; // s/m
    let cropLatin = 'Corylus avellana L.';
    let cropName = 'Avellano Europeo (Corylus avellana)';
    if (simCrop === 'vid') {
      kc = 0.65;
      rs = 150;
      cropLatin = 'Vitis vinifera L. (cv. Carménère)';
      cropName = 'Vid Vinífera (Vitis vinifera)';
    } else if (simCrop === 'pradera') {
      kc = 0.95;
      rs = 70;
      cropLatin = 'Poaceae / Fabaceae polifítica';
      cropName = 'Pradera Polifítica PRV';
    }

    // Parámetros edafológicos de van Genuchten (θr, θs, α, n)
    let cc = 32; // Capacidad de Campo (θ_CC %)
    let pmp = 15; // Punto de Marchitez Permanente (θ_PMP %)
    let bulkDensity = 1.28; // g/cm³
    let soilLabel = 'Franco-Arcilloso (Serie Talca / Maule Sur)';
    if (simSoilType === 'limoso') {
      cc = 27;
      pmp = 12;
      bulkDensity = 1.34;
      soilLabel = 'Franco-Limoso Aluvial (Terraza Fluvial)';
    } else if (simSoilType === 'arenoso') {
      cc = 18;
      pmp = 8;
      bulkDensity = 1.45;
      soilLabel = 'Franco-Arenoso Coluvial (Río Perquilauquén)';
    }

    // Aerodinámica y velocidad a 2 metros (u2)
    const windSpeedMs = simWindSpeed === 'calm' ? 0.6 : simWindSpeed === 'breeze' ? 2.4 : 6.8;
    const windFactor = simWindSpeed === 'calm' ? 0.7 : simWindSpeed === 'breeze' ? 1.8 : 3.6;

    // Presión de vapor de saturación es (kPa) y déficit de presión de vapor VPD
    const es = 0.6108 * Math.exp((17.27 * simTemp) / (simTemp + 237.3));
    const ea = es * 0.65; // Asumiendo HR media 65%
    const vpd = Math.max(0.05, es - ea).toFixed(2);

    // Evapotranspiración de referencia Penman-Monteith (mm/día)
    const et0 = Math.max(0.6, (simTemp * 0.16) + windFactor);
    const etc = (et0 * kc).toFixed(2);

    // Modelación en 3 horizontes edáficos (0-20 cm, 20-60 cm, 60-100 cm)
    const layer1 = Math.max(8, Math.min(50, simSoilMoisture));
    const layer2 = Math.max(10, Math.min(48, Math.round(simSoilMoisture * 0.92 + (simSoilType === 'arcilloso' ? 4 : 2))));
    const layer3 = Math.max(12, Math.min(46, Math.round(simSoilMoisture * 0.86 + (simSoilType === 'arcilloso' ? 7 : 4))));

    // Número de Richardson en capa límite para heladas catabáticas
    const isThermalInversion = simTemp <= 2.5 && simWindSpeed === 'calm';
    const riNumber = isThermalInversion ? 0.38 : 0.05; // Ri > 0.25 suprime turbulencia = inversión crítica

    let frostStatus: 'normal' | 'warning' | 'critical' | 'heat_stress' = 'normal';
    let frostDiagnostic = 'Capa límite atmosférica neutra. Flujo de calor sensible equilibrado; sin inversión estagnante.';

    if (simTemp <= 0 && simWindSpeed === 'calm') {
      frostStatus = 'critical';
      frostDiagnostic = `INVERSIÓN TÉRMICA CRÍTICA (Ri=${riNumber}, T=${simTemp}°C). El drenaje catabático por gravedad estanca masas densas de aire frío en fondos de quebrada. Tasa de enfriamiento radiativo > 1.4°C/h.`;
    } else if (simTemp <= 0 && simWindSpeed !== 'calm') {
      frostStatus = 'critical';
      frostDiagnostic = `HELADA ADVECCIÓN / POLAR (T=${simTemp}°C, u₂=${windSpeedMs} m/s). Capa límite turbulenta; congelamiento convectivo sin desacople térmico vertical.`;
    } else if (simTemp <= 2.5 && simWindSpeed === 'calm') {
      frostStatus = 'warning';
      frostDiagnostic = `TRANSICIÓN CATABÁTICA EN CURSO: Desacople radiativo superficial a ${simTemp}°C. Monitoreo piezométrico y térmico de pre-alerta activado.`;
    } else if (simTemp >= 32) {
      frostStatus = 'heat_stress';
      frostDiagnostic = `ESTRÉS TÉRMICO & CIERRE ESTOMÁTICO (VPD=${vpd} kPa, T=${simTemp}°C). Se excede la conductancia estomática máxima; desacople de la asimilación neta de CO₂.`;
    }

    // Balance hidrodinámico en zona vadosa
    let waterStatus: 'deficit' | 'optimal' | 'saturation' = 'optimal';
    let waterDiagnostic = `Reserva útil disponible (RAW) en estrato activo (20-60 cm: ${layer2}%). Humedad matricial en rango de confort fisiológico (-33 a -100 kPa).`;
    let deficitVolume = 0;

    if (layer1 < pmp + 4) {
      waterStatus = 'deficit';
      deficitVolume = Math.round((cc - layer1) * bulkDensity * 2.0); // mm lámina requerida
      waterDiagnostic = `DÉFICIT HÍDRICO EN ZONA RADICULAR: Potencial matricial ψm < -1500 kPa en horizonte A. Déficit de lámina calculado: ${deficitVolume} mm (${(deficitVolume * 10).toFixed(0)} m³/ha).`;
    } else if (layer1 > cc + 4) {
      waterStatus = 'saturation';
      waterDiagnostic = `CONDICIÓN DE ANÓXIA / ASFIXIA RADICULAR: Humedad volumétrica (${layer1}%) supera Capacidad de Campo (${cc}%). Espacio poroso de aireación < 10%; riesgo de pudrición por Phytophthora cactorum.`;
    }

    return {
      etc,
      et0: et0.toFixed(2),
      vpd,
      riNumber,
      layer1,
      layer2,
      layer3,
      cc,
      pmp,
      bulkDensity,
      soilLabel,
      cropName,
      cropLatin,
      windSpeedMs,
      frostStatus,
      frostDiagnostic,
      waterStatus,
      waterDiagnostic,
      deficitVolume
    };
  }, [simTemp, simSoilMoisture, simWindSpeed, simCrop, simSoilType]);

  // Formulario institucional para investigadores
  const [formData, setFormData] = useState({
    investigatorName: '',
    institution: '',
    email: '',
    role: 'Investigador Principal (PI)',
    fundingGrant: 'FONDEF / ANID IDeA',
    researchFocus: 'Modelación Hidroclimática & FAO-56',
    comments: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInstitutionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const text = `Solicitud Institucional de Acceso a Testbed AgriTwin:%0A%0A*Investigador:* ${encodeURIComponent(formData.investigatorName)}%0A*Institución:* ${encodeURIComponent(formData.institution)}%0A*Rol:* ${encodeURIComponent(formData.role)}%0A*Fondo / Proyecto:* ${encodeURIComponent(formData.fundingGrant)}%0A*Línea I+D:* ${encodeURIComponent(formData.researchFocus)}`;
    setTimeout(() => {
      window.open(`https://wa.me/56976696142?text=${text}`, '_blank');
    }, 1200);
  };

  const galleryItems = [
    {
      title: 'Mosaico Espectral Copernicus Sentinel-2 L2A',
      subtitle: 'Reflectancias BOA (Bottom-of-Atmosphere) • Bandas B4, B8, B8A',
      image: './img-coastal-hud.jpg',
      badge: 'Teledetección 10m',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      description: 'Asimilación directa de reflectancias multiespectrales con cálculo automatizado de NDVI, NDRE (clorofila en borde rojo B5-B7) y NDWI para calibración de biomasa sin sesgo atmosférico.'
    },
    {
      title: 'Gemelo Ciberfísico Predial 3D (Fundo Meniel)',
      subtitle: 'Microtopografía LiDAR & Mallas de Cuartel en Three.js',
      image: './arbol_alquimico_splash.jpg',
      badge: 'Testbed Predial',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      description: 'Reconstrucción vectorial y topográfica de 24.8 hectáreas con exposición solar horaria (sombras proyectadas DEM) y malla celular para análisis de variabilidad intra-parcelar.'
    },
    {
      title: 'Cartografía Hidrogeológica Cuenca Maule Sur',
      subtitle: '122.000 Hectáreas • Red de 5 Piezómetros APR y Estaciones DGA',
      image: './assets/ui/agritwin_regional_landing.jpg',
      badge: 'Macro Observatorio',
      badgeColor: 'bg-sky-950/80 text-sky-300 border-sky-500/40',
      description: 'Cartografía regional que unifica cuencas de los ríos Longaví y Perquilauquén con telemetría de niveles estáticos/dinámicos en pozos profundos de comités de agua potable rural.'
    },
    {
      title: 'Dinámica de Capa Límite & Flujo Catabático',
      subtitle: 'Drenaje Nocturno de Aire Frío • Pre-alerta Radiativa 72h',
      image: './cerro_landing_bg.jpg',
      badge: 'Física Atmosférica',
      badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      description: 'Simulación determinista del escurrimiento gravitacional de masas de aire denso sobre la pendiente hacia depresiones topográficas bajo condición de inversión térmica (Ri > 0.25).'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050F0A] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans relative">
      
      {/* ─── RETÍCULA MILIMÉTRICA SUBYACENTE (GRID 10M CIENTÍFICO) ──────────── */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #10B981 1px, transparent 1px), linear-gradient(to bottom, #10B981 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* ─── 0. SCIENTIFIC TELEMETRY SUB-HEADER ─────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-[#06140D]/90 backdrop-blur-md border-b border-emerald-900/50 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto text-[11px] font-mono">
          
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AGRITWIN TESTBED v2.6
            </span>
            <span className="text-slate-400 hidden md:inline">
              DATUM: WGS84 • EPSG: 32719 • MAULE SOUTH LIVING LAB (35.98°S, 71.75°W)
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="https://danisantanderurrutia-coder.github.io/agritwin-app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 font-bold flex items-center gap-1.5 transition-all"
              title="Abrir Dossier Metodológico y Carta Oficial en Vivo"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Dossier Técnico Oficial</span>
              <span className="sm:hidden">Dossier</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </a>

            <button
              onClick={() => {
                setModalType('testbed_access');
                setIsDemoModalOpen(true);
              }}
              className="px-3.5 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold transition-all shadow-sm cursor-pointer"
            >
              Solicitar Acceso I+D
            </button>
          </div>

        </div>
      </div>

      {/* ─── 1. HERO INSTITUCIONAL CIENTÍFICO ────────────────────────────────── */}
      <section className="relative pt-12 pb-20 border-b border-emerald-950/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[650px] h-[320px] bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[260px] bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 space-y-8">
          
          {/* Geodetic Header Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Living Lab Territorial • Infraestructura Ciberfísica
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 text-xs font-mono">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              FAIR Data Principles Ready
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              Validación Empírica R² &gt; 0.94 (RMSE ±1.8%)
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-5 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Plataforma Ciberfísica & Living Lab para <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">Investigación Agroclimática</span> Multiescala.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-serif leading-relaxed">
              AgriTwin integra <strong>122.000 hectáreas instrumentadas en el Maule Sur</strong> con un motor biofísico determinista (FAO-56 Penman-Monteith, hidrodinámica en zona vadosa y corrientes catabáticas). Una infraestructura científica abierta para centros de I+D, consorcios agroecológicos y proyectos de postulación competitiva (<strong>ANID, FONDEF, Horizon Europe</strong>).
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            <button
              onClick={() => {
                setModalType('testbed_access');
                setIsDemoModalOpen(true);
              }}
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-slate-950" />
              <span>Solicitar Sandbox de Investigación</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <a
              href="https://danisantanderurrutia-coder.github.io/agritwin-app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0c2317] hover:bg-[#123120] text-amber-300 border border-amber-400/40 font-bold transition-all"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Ver Dossier Metodológico en Vivo</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>

            <a
              href="#sandbox"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-850 text-slate-300 border border-slate-700 font-semibold transition-all"
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Banco de Calibración Paramétrica &darr;</span>
            </a>
          </div>

          {/* Scientific Telemetry Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-emerald-950/60 font-mono text-xs">
            <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Superficie Living Lab</span>
              <div className="text-xl sm:text-2xl font-bold text-amber-300">122.000 ha</div>
              <div className="text-[10px] text-slate-500 font-serif">Cuenca Maule Sur (Retiro / Parral / Longaví)</div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Red Piezométrica in-situ</span>
              <div className="text-xl sm:text-2xl font-bold text-sky-300">5 Pozos APR</div>
              <div className="text-[10px] text-slate-500 font-serif">Nivel freático continuo hasta 68m prof.</div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Resolución Espectral</span>
              <div className="text-xl sm:text-2xl font-bold text-emerald-300">10 m / 5 días</div>
              <div className="text-[10px] text-slate-500 font-serif">Copernicus Sentinel-2 L2A (B4, B8, B8A)</div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Estratificación Edáfica</span>
              <div className="text-xl sm:text-2xl font-bold text-teal-300">3 Horizontes</div>
              <div className="text-[10px] text-slate-500 font-serif">0-20 cm, 20-60 cm y 60-100 cm (FDR KioT)</div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 2. CONSOLA BI-ESCALA: EL LENTE DUAL (MACRO CUENCA VS MICRO TESTBED) ── */}
      <section className="py-20 border-b border-emerald-950/80 bg-[#06140D]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-400" />
                Arquitectura Bi-Escala Ciberfísica
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Observatorio Territorial & Parcela Experimental
              </h2>
              <p className="text-slate-400 text-sm font-serif">
                Conmuta entre la escala hidrológica regional (asimilación de cuenca) y la escala biofísica predial (dinámica de fluidos y zona vadosa).
              </p>
            </div>

            {/* Lens Switcher */}
            <div className="p-1.5 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setActiveLensMode('basin')}
                className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeLensMode === 'basin' 
                    ? 'bg-amber-400 text-slate-950 shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Macro Cuenca (122.000 ha)</span>
              </button>

              <button
                onClick={() => setActiveLensMode('plot')}
                className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeLensMode === 'plot' 
                    ? 'bg-emerald-500 text-slate-950 shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Micro Parcela Meniel (24.8 ha)</span>
              </button>
            </div>
          </div>

          {/* Active Lens Display HUD */}
          <div className="bg-[#081B11] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visualizer Frame */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-emerald-500/30 relative h-[380px] sm:h-[440px] bg-black group">
              <img 
                src={activeLensMode === 'basin' ? './assets/ui/agritwin_regional_landing.jpg' : './arbol_alquimico_splash.jpg'} 
                alt={activeLensMode === 'basin' ? 'Observatorio Regional Cuenca' : 'Parcela Experimental 3D'} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded bg-black/75 border border-emerald-400/50 text-emerald-300 text-[10px] font-mono font-bold backdrop-blur-md">
                  {activeLensMode === 'basin' ? 'MODO: MACRO-HIDROLOGÍA REGIONAL' : 'MODO: GEMELO CIBERFÍSICO 3D (LiDAR)'}
                </span>
                <span className="px-2.5 py-1 rounded bg-black/75 border border-slate-700 text-slate-300 text-[10px] font-mono backdrop-blur-md">
                  {activeLensMode === 'basin' ? 'GRID: 122.000 ha HEX' : 'RESOLUCIÓN: MALLA SUB-MÉTRICA'}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 border border-emerald-900/60 backdrop-blur-md text-[11px] font-mono text-slate-300 flex justify-between items-center">
                <span>COORD: 35°58&apos;32&quot;S | 71°45&apos;18&quot;W</span>
                <span className="text-amber-400">{activeLensMode === 'basin' ? 'Estaciones DGA: Río Longaví & Perquilauquén' : '6 Ramas Productivas Three.js'}</span>
              </div>
            </div>

            {/* Scientific Specs Pane */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  {activeLensMode === 'basin' ? 'Protocolo Hidrogeológico Territorial' : 'Protocolo Micrometeorológico & Edafológico'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeLensMode === 'basin' ? 'Observatorio Cuenca Maule Sur' : 'Banco Experimental Fundo Meniel'}
                </h3>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  {activeLensMode === 'basin' 
                    ? 'Monitoreo dinámico del balance hidrológico en cuenca mediterránea bajo estrés hídrico crónico. Integra series históricas y telemetría de caudales oficiales DGA con niveles piezométricos de pozos rurales.'
                    : 'Testbed predial instrumentado con mallas LiDAR de alta resolución, balance continuo en 3 horizontes edáficos y simulación de capas límite nocturnas para eventos de helada por inversión térmica.'
                  }
                </p>
              </div>

              {/* Data Points Grid */}
              <div className="space-y-2.5 font-mono text-xs">
                {activeLensMode === 'basin' ? (
                  <>
                    <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Red de 5 Piezómetros APR:</strong>
                        <p className="text-[11px] text-slate-400 font-serif">Curvas de abatimiento en pozos de Retiro Centro, Copihue y Romeral.</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Caudales Fluviales DGA:</strong>
                        <p className="text-[11px] text-slate-400 font-serif">Modelación de curvas de gasto para T=10, 50 y 100 años (Longaví y Perquilauquén).</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Modelación Pirogénica FWI:</strong>
                        <p className="text-[11px] text-slate-400 font-serif">Índice Fire Weather Index acoplado a ráfagas de viento Puelche.</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Balance en 3 Horizontes (FDR):</strong>
                        <p className="text-[11px] text-slate-400 font-serif">0-20 cm (brote), 20-60 cm (absorbente) y 60-100 cm (reserva profunda).</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Dinámica Catabática de Heladas:</strong>
                        <p className="text-[11px] text-slate-400 font-serif">Drenaje de aire frío denso sobre DEM topográfico con 4h de pre-alerta nocturna.</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-emerald-950 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Pastoreo Voisin & IPCC Tier 2:</strong>
                        <p className="text-[11px] text-slate-400 font-serif">Rotación biointensiva en 8 potreros con auditoría de carbono edáfico.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono">
                <a
                  href="https://danisantanderurrutia-coder.github.io/agritwin-app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:underline flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Ver Especificación Metodológica Completa &rarr;</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─── 3. BANCO DE ENSAYOS PARAMÉTRICOS (SIMULATION SANDBOX) ─────────────── */}
      <section id="sandbox" className="py-20 border-b border-emerald-950/80 bg-[#051009] relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Banco de Ensayos Paramétricos & Calibración
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Simulador Determinista de Ecuaciones Biofísicas
            </h2>
            <p className="text-slate-400 text-sm font-serif">
              Evalúa la sensibilidad de la ecuación Penman-Monteith (FAO-56) y el desacople radiativo nocturno ajustando las variables microclimáticas y edafológicas.
            </p>
          </div>

          {/* Quick Scenario Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs">
            <span className="text-slate-400 text-[11px] uppercase mr-2">Cargar Escenario Experimental:</span>
            <button
              onClick={() => applyPreset('frost')}
              className="px-3.5 py-1.5 rounded-lg bg-sky-950/70 hover:bg-sky-900 border border-sky-500/40 text-sky-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>❄️ Helada Radiativa Inversión (-1.8°C)</span>
            </button>
            <button
              onClick={() => applyPreset('heatwave')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-500/40 text-amber-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🔥 Estrés Térmico & Puelche (35.2°C)</span>
            </button>
            <button
              onClick={() => applyPreset('saturation')}
              className="px-3.5 py-1.5 rounded-lg bg-teal-950/70 hover:bg-teal-900 border border-teal-500/40 text-teal-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>💧 Anoxia / Suelo Saturado (44%)</span>
            </button>
          </div>

          {/* Simulator Console */}
          <div className="bg-[#08180F] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-5 space-y-5 font-mono text-xs">
              
              <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                <span className="font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  Variables de Entrada (Ground-Truth)
                </span>
                <span className="text-[10px] text-slate-400">FAIR Compliant</span>
              </div>

              {/* Slider 1: Ta */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 flex items-center gap-1.5 font-sans">
                    <ThermometerIcon temp={simTemp} />
                    Temperatura Aire (Ta):
                  </span>
                  <span className={`font-bold text-sm ${simTemp <= 0 ? 'text-sky-300' : simTemp >= 32 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {simTemp} °C
                  </span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="38"
                  step="0.2"
                  value={simTemp}
                  onChange={(e) => setSimTemp(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>-3.0°C (Helada Crítica)</span>
                  <span>15°C (Neutro)</span>
                  <span>38.0°C (Estrés Extremo)</span>
                </div>
              </div>

              {/* Slider 2: Volumetric Soil Moisture */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 flex items-center gap-1.5 font-sans">
                    <Droplets className="w-3.5 h-3.5 text-teal-400" />
                    Humedad Volumétrica Horizonte A (θ₁):
                  </span>
                  <span className="font-bold text-sm text-teal-300">
                    {simSoilMoisture}% vol
                  </span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="50"
                  step="1"
                  value={simSoilMoisture}
                  onChange={(e) => setSimSoilMoisture(parseInt(e.target.value))}
                  className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>θ_PMP: {simulationResults.pmp}%</span>
                  <span>θ_CC: {simulationResults.cc}%</span>
                  <span>50% (Saturación)</span>
                </div>
              </div>

              {/* Wind Regime */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 flex items-center gap-1.5 font-sans">
                    <Wind className="w-3.5 h-3.5 text-sky-400" />
                    Régimen Eólico (u₂ a 2m):
                  </span>
                  <span className="text-sky-300">{simulationResults.windSpeedMs} m/s</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSimWindSpeed('calm')}
                    className={`p-2 rounded-xl text-[11px] font-sans font-bold transition-all text-center ${
                      simWindSpeed === 'calm' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm' : 'bg-black/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Calma (&lt;1 m/s)
                    <span className="block text-[9px] font-mono opacity-80">Ri = 0.38</span>
                  </button>
                  <button
                    onClick={() => setSimWindSpeed('breeze')}
                    className={`p-2 rounded-xl text-[11px] font-sans font-bold transition-all text-center ${
                      simWindSpeed === 'breeze' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm' : 'bg-black/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Brisa (2.4 m/s)
                    <span className="block text-[9px] font-mono opacity-80">Capa Neutra</span>
                  </button>
                  <button
                    onClick={() => setSimWindSpeed('puelche')}
                    className={`p-2 rounded-xl text-[11px] font-sans font-bold transition-all text-center ${
                      simWindSpeed === 'puelche' ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm' : 'bg-black/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Puelche (6.8 m/s)
                    <span className="block text-[9px] font-mono opacity-80">VPD Crítico</span>
                  </button>
                </div>
              </div>

              {/* Species & Soil Selectors */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-sans">Especie Monitoreada:</label>
                  <select
                    value={simCrop}
                    onChange={(e) => setSimCrop(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-emerald-900 text-white font-mono text-[11px] focus:outline-none focus:border-amber-400"
                  >
                    <option value="avellano">Corylus avellana (Kc 0.85)</option>
                    <option value="vid">Vitis vinifera (Kc 0.65)</option>
                    <option value="pradera">Pradera PRV (Kc 0.95)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-sans">Serie Edafológica:</label>
                  <select
                    value={simSoilType}
                    onChange={(e) => setSimSoilType(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-emerald-900 text-white font-mono text-[11px] focus:outline-none focus:border-amber-400"
                  >
                    <option value="arcilloso">Franco-Arcilloso (Maule Sur)</option>
                    <option value="limoso">Franco-Limoso Fluvial</option>
                    <option value="arenoso">Franco-Arenoso Coluvial</option>
                  </select>
                </div>
              </div>

              {/* Formulation Box */}
              <div className="p-3 rounded-xl bg-black/50 border border-emerald-900/60 text-[10px] text-slate-400 font-mono space-y-1">
                <div className="text-amber-400 font-bold flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>Ecuación Rectora Penman-Monteith (FAO-56):</span>
                </div>
                <p className="italic text-slate-300">
                  ETc = Kc · [ Δ(Rn - G) + ρa·cp·(es - ea)/ra ] / [ Δ + γ·(1 + rs/ra) ]
                </p>
                <div className="flex justify-between pt-1 border-t border-white/5 text-[9px]">
                  <span>VPD = {simulationResults.vpd} kPa</span>
                  <span>Densidad aparente = {simulationResults.bulkDensity} g/cm³</span>
                </div>
              </div>

            </div>

            {/* Scientific Diagnostic Output (Right Column) */}
            <div className="lg:col-span-7 space-y-5 bg-[#06150D] p-6 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
              
              <div className="space-y-4 font-mono text-xs">
                
                <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                  <span className="font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    Telemetría Determinista en Tiempo Real
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Cálculo Ciberfísico Activo
                  </span>
                </div>

                {/* Frost / Microclimate Diagnostic Card */}
                <div className={`p-4 rounded-xl border transition-all ${
                  simulationResults.frostStatus === 'critical'
                    ? 'bg-red-950/60 border-red-500/80 text-red-200'
                    : simulationResults.frostStatus === 'warning'
                    ? 'bg-amber-950/60 border-amber-500/80 text-amber-200'
                    : simulationResults.frostStatus === 'heat_stress'
                    ? 'bg-orange-950/60 border-orange-500/80 text-orange-200'
                    : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                }`}>
                  <div className="flex items-center justify-between font-bold text-xs uppercase">
                    <span className="flex items-center gap-2">
                      {simulationResults.frostStatus === 'critical' ? (
                        <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                      <span>Diagnóstico de Capa Límite & Heladas</span>
                    </span>
                    <span className="text-[10px]">{simulationResults.frostStatus.toUpperCase()}</span>
                  </div>
                  <p className="text-xs font-serif pt-1.5 leading-relaxed">
                    {simulationResults.frostDiagnostic}
                  </p>
                </div>

                {/* FAO-56 Water Balance Diagnostic Card */}
                <div className={`p-4 rounded-xl border transition-all ${
                  simulationResults.waterStatus === 'deficit'
                    ? 'bg-amber-950/50 border-amber-500/60 text-amber-200'
                    : simulationResults.waterStatus === 'saturation'
                    ? 'bg-blue-950/50 border-blue-500/60 text-blue-200'
                    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-xs">
                    <span className="flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-teal-400" />
                      Balance en Zona Vadosa (FAO-56)
                    </span>
                    <span className="text-amber-300">
                      ET₀: {simulationResults.et0} mm • ETc: {simulationResults.etc} mm/día
                    </span>
                  </div>
                  <p className="text-xs font-serif pt-1.5 leading-relaxed">
                    {simulationResults.waterDiagnostic}
                  </p>
                </div>

                {/* 3 Edaphic Layers Graph */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-[11px] text-slate-400 flex justify-between">
                    <span>Estratificación Edáfica ({simulationResults.soilLabel}):</span>
                    <span>Sondas FDR KioT</span>
                  </div>

                  {/* Horizon 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-sans">
                      <span className="text-slate-300">Horizonte A (0-20 cm) • Riego & Raíz Fina:</span>
                      <span className="font-mono text-teal-300 font-bold">{simulationResults.layer1}% vol</span>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-emerald-950">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${(simulationResults.layer1 / 50) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Horizon 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-sans">
                      <span className="text-slate-300">Horizonte B (20-60 cm) • Zona de Asimilación Activa:</span>
                      <span className="font-mono text-teal-300 font-bold">{simulationResults.layer2}% vol</span>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-emerald-950">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 transition-all duration-300"
                        style={{ width: `${(simulationResults.layer2 / 50) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Horizon 3 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-sans">
                      <span className="text-slate-300">Horizonte C (60-100 cm) • Reserva Profunda / Drenaje:</span>
                      <span className="font-mono text-teal-300 font-bold">{simulationResults.layer3}% vol</span>
                    </div>
                    <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-emerald-950">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-700 to-emerald-600 transition-all duration-300"
                        style={{ width: `${(simulationResults.layer3 / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
                <button
                  onClick={() => {
                    const payload = {
                      experiment: 'AgriTwin_Synthetic_Parametric_Run',
                      timestamp: new Date().toISOString(),
                      crop: simulationResults.cropLatin,
                      ta_celsius: simTemp,
                      u2_ms: simulationResults.windSpeedMs,
                      soil_type: simulationResults.soilLabel,
                      volumetric_moisture_pct: {
                        layer_0_20cm: simulationResults.layer1,
                        layer_20_60cm: simulationResults.layer2,
                        layer_60_100cm: simulationResults.layer3
                      },
                      fao56_outputs: {
                        et0_mm_day: simulationResults.et0,
                        etc_mm_day: simulationResults.etc,
                        vpd_kpa: simulationResults.vpd
                      },
                      boundary_layer: {
                        ri_number: simulationResults.riNumber,
                        frost_status: simulationResults.frostStatus
                      }
                    };
                    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `agritwin_parametric_${Date.now()}.json`;
                    a.click();
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-black/50 hover:bg-black/80 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  title="Descargar matriz en formato JSON estructurado"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar Matriz (JSON)</span>
                </button>

                <button
                  onClick={() => {
                    setModalType('testbed_access');
                    setIsDemoModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition-all shadow-md cursor-pointer"
                >
                  Solicitar Calibración con Sensores In-Situ
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. PIPELINE DE INTEROPERABILIDAD CIENTÍFICA & DATOS FAIR ────────── */}
      <section className="py-20 border-b border-emerald-950/80 bg-[#06140D]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Database className="w-4 h-4 text-amber-400" />
              Tubería de Asimilación & Conectores de Investigación
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Arquitectura de Datos FAIR & Conectividad Científica
            </h2>
            <p className="text-slate-400 text-sm font-serif">
              Datos limpios, reproducibles y accesibles directamente desde tus scripts de investigación en Python, R o plataformas GIS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            
            {/* Source 1 */}
            <div className="p-6 rounded-2xl bg-[#081B11] border border-emerald-500/30 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
                <Satellite className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-sans">Copernicus Sentinel-2</h3>
              <p className="text-slate-300 text-xs font-serif leading-relaxed">
                Ingesta programada L2A (10m) con corrección atmosférica sen2cor. Generación automática de tensores NDVI, NDRE (Red-Edge clorofila) y NDWI con máscaras de nubes automatizadas.
              </p>
              <div className="pt-2 border-t border-emerald-900/60 text-[11px] text-emerald-400">
                Formatos: Cloud-Optimized GeoTIFF (COG), STAC API
              </div>
            </div>

            {/* Source 2 */}
            <div className="p-6 rounded-2xl bg-[#081B11] border border-sky-500/30 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-sans">Red LoRaWAN in-situ KioT</h3>
              <p className="text-slate-300 text-xs font-serif leading-relaxed">
                Nodos LoRaWAN 915 MHz sin ataduras propietarias. Telemetría cada 15 minutos: sondas capacitivas FDR de 3 profundidades, temperatura foliar infrarroja y piezómetros de nivel freático.
              </p>
              <div className="pt-2 border-t border-emerald-900/60 text-[11px] text-sky-400">
                Formatos: MQTT, Webhooks, REST JSON Time-Series
              </div>
            </div>

            {/* Source 3 */}
            <div className="p-6 rounded-2xl bg-[#081B11] border border-amber-500/30 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-sans">SDK Python & R Científico</h3>
              <p className="text-slate-300 text-xs font-serif leading-relaxed">
                Librería cliente para cargar cubos multidimensionales directamente en pipelines de Jupyter Notebooks (`xarray`, `geopandas`) y R Studio (`terra`, `sf`) sin etapas intermedias de limpieza.
              </p>
              <div className="pt-2 border-t border-emerald-900/60 text-[11px] text-amber-300">
                Integración: NetCDF-4, CF Metadata Conventions
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 5. CASOS REALES & VALIDACIÓN EMPÍRICA (PUBLICABILIDAD) ─────────── */}
      <section className="py-20 border-b border-emerald-950/80 bg-[#051109]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Ground-Truth • Validación In-Situ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Fichas de Validación Empírica & Publicabilidad
            </h2>
            <p className="text-slate-400 text-sm font-serif">
              Datos auditados en terreno contrastados contra mediciones gravimétricas de laboratorio, piezometría oficial y estaciones DGA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Paper 1 */}
            <div className="p-6 rounded-3xl bg-[#081B11] border border-emerald-500/30 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold uppercase">
                    Ensayo 01 • Edafología
                  </span>
                  <span className="text-slate-400">R² = 0.942</span>
                </div>
                <h3 className="text-xl font-bold text-white">Balance Radicular Tri-Estrato</h3>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Calibración de curvas van Genuchten en huerto de Avellano Europeo de 24.8 ha. Contraste de sondas FDR contra muestras gravimétricas de tubo Shelby a 3 horizontes.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-emerald-900/50 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">RMSE Humedad:</span>
                    <span className="text-emerald-300 font-bold">± 1.4% vol</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Ahorro Bombeo:</span>
                    <span className="text-amber-300 font-bold">-32.4% m³ auditados</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Lixiviación NO₃⁻:</span>
                    <span className="text-teal-300 font-bold">Reducción del 41%</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 text-[11px] text-slate-300 font-serif">
                <em>Dataset disponible bajo acuerdo de co-autoría académica para estudios de zona vadosa mediterránea.</em>
              </div>
            </div>

            {/* Paper 2 */}
            <div className="p-6 rounded-3xl bg-[#081B11] border border-sky-500/30 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-700 font-bold uppercase">
                    Ensayo 02 • Hidrogeología
                  </span>
                  <span className="text-slate-400">122.000 ha</span>
                </div>
                <h3 className="text-xl font-bold text-white">Dinámica de Cuenca & Pozos APR</h3>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Monitoreo hidrogeológico multianual acoplando caudales superficiales DGA (Ríos Longaví y Perquilauquén) con 5 piezómetros de comités APR en Parral y Retiro.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-sky-900/50 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Piezómetros Activos:</span>
                    <span className="text-sky-300 font-bold">5 pozos continuos</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Cálculo de Retorno:</span>
                    <span className="text-amber-300 font-bold">T=10, 50, 100 años</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Resolución Temporal:</span>
                    <span className="text-teal-300 font-bold">15 min telemetría</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-sky-500/20 text-[11px] text-slate-300 font-serif">
                <em>Modelo ideal para tesis doctorales y proyectos de resiliencia hídrica comunal ANID / Bienes Públicos CORFO.</em>
              </div>
            </div>

            {/* Paper 3 */}
            <div className="p-6 rounded-3xl bg-[#081B11] border border-amber-500/30 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700 font-bold uppercase">
                    Ensayo 03 • Micrometeorología
                  </span>
                  <span className="text-slate-400">Pre-alerta 4h</span>
                </div>
                <h3 className="text-xl font-bold text-white">Drenaje Nocturno de Heladas</h3>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Modelación de capas estables superficiales bajo enfriamiento radiativo. Verificación de la acumulación de aire frío en microdepresiones topográficas (-1.8°C).
                </p>
                <div className="space-y-1.5 pt-2 border-t border-amber-900/50 font-mono text-xs">
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Número Richardson:</span>
                    <span className="text-amber-300 font-bold">Ri &gt; 0.25 (Crítico)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Pérdida de Yemas:</span>
                    <span className="text-emerald-300 font-bold">0% brotes perdidos</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Validación Térmica:</span>
                    <span className="text-teal-300 font-bold">Termopares a 0.5m y 2m</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/20 text-[11px] text-slate-300 font-serif">
                <em>Metodología auditable para publicaciones en revistas Q1 de agrometeorología y física de fluidos geofísicos.</em>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 6. ALIANZAS I+D & FONDOS CONCURSABLES (FONDEF / HORIZON) ───────── */}
      <section className="py-20 bg-gradient-to-t from-black to-[#07170E] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-8 relative z-10">
          
          <div className="inline-flex p-3 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            AgriTwin como Plataforma Tecnológica para Proyectos Concursables
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-serif max-w-2xl mx-auto">
            Integra nuestro Living Lab de 122.000 ha y motor ciberfísico como infraestructura habilitante en tus postulaciones a <strong>FONDEF IDeA, ANID, Horizon Europe o CORFO</strong>. Aportamos capacidades de campo validadas, hardware LoRaWAN y arquitectura de software certificada.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono text-xs">
            <button
              onClick={() => {
                setModalType('research_grant');
                setIsDemoModalOpen(true);
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold shadow-xl transition-all cursor-pointer"
            >
              Proponer Alianza para Postulación I+D
            </button>

            <a
              href="mailto:contacto@agrotechchile.cl?subject=Alianza%20I%2BD%20AgriTwin%20Testbed"
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-[#091F13] hover:bg-[#10301F] text-emerald-300 border border-emerald-500/40 font-bold transition-all"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Coordinar Reunión con Equipo Científico</span>
            </a>
          </div>

        </div>
      </section>

      {/* ─── MODAL INSTITUCIONAL: ACCESO A TESTBED / ALIANZAS I+D ──────────── */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#081A10] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl text-white relative max-h-[90vh] overflow-y-auto font-sans">
            
            <button
              onClick={() => { setIsDemoModalOpen(false); setIsSubmitted(false); }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleInstitutionalSubmit} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
                    PROTOCOLO DE ACCESO INSTITUCIONAL & I+D
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {modalType === 'research_grant' ? 'Alianza para Postulación a Fondos I+D' : 'Solicitud de Sandbox & Dataset Académico'}
                  </h3>
                  <p className="text-xs text-slate-300 font-serif">
                    Completa la ficha técnica para coordinar credenciales de API o cartas de patrocinio tecnológico institucional.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Investigador / Contacto *</label>
                    <input
                      type="text"
                      required
                      value={formData.investigatorName}
                      onChange={(e) => setFormData({ ...formData, investigatorName: e.target.value })}
                      placeholder="Dr(a). Nombre Apellido"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Institución / Centro / Universidad *</label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="Ej. INIA / U. de Talca / Fraunhofer"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Email Institucional *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="investigador@instituto.cl"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Rol Académico</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white focus:outline-none focus:border-amber-400 font-mono"
                    >
                      <option value="Investigador Principal (PI)">Investigador Principal (PI)</option>
                      <option value="Co-Investigador / Postdoc">Co-Investigador / Postdoc</option>
                      <option value="Director de Centro / Facultad">Director de Centro / Facultad</option>
                      <option value="Estudiante de Postgrado (PhD/MSc)">Estudiante de Postgrado (PhD/MSc)</option>
                      <option value="Gestor Tecnológico OTL">Gestor Tecnológico OTL / I+D</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Marco de Financiamiento / Concurso</label>
                    <select
                      value={formData.fundingGrant}
                      onChange={(e) => setFormData({ ...formData, fundingGrant: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white focus:outline-none focus:border-amber-400 font-mono"
                    >
                      <option value="FONDEF / ANID IDeA">FONDEF / ANID IDeA o I+D</option>
                      <option value="Horizon Europe / Internacional">Horizon Europe / Cooperación Internacional</option>
                      <option value="CORFO Bienes Públicos / Centros">CORFO Bienes Públicos / Centros</option>
                      <option value="FONDECYT Regular / Iniciación">FONDECYT Regular / Iniciación</option>
                      <option value="Financiamiento Interno Universidad">Financiamiento Propio / Interno</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Línea de Interés Principal</label>
                    <select
                      value={formData.researchFocus}
                      onChange={(e) => setFormData({ ...formData, researchFocus: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white focus:outline-none focus:border-amber-400 font-mono"
                    >
                      <option value="Modelación Hidroclimática & FAO-56">Modelación Hidroclimática & FAO-56</option>
                      <option value="Dinámica Catabática de Heladas">Dinámica Catabática de Heladas</option>
                      <option value="Monitoreo de Acuíferos & Pozos APR">Monitoreo de Acuíferos & Pozos APR</option>
                      <option value="Trazabilidad Satelital & Carbono IPCC">Trazabilidad Satelital & Carbono IPCC</option>
                      <option value="Despliegue de Sensores & Nodos LoRaWAN">Despliegue de Sensores & Nodos LoRaWAN</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 space-y-3 font-mono text-xs">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-sans font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Enviar Solicitud Institucional</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-serif pt-1">
                    <span>Contacto directo I+D: <strong>+56 9 7669 6142</strong></span>
                    <a
                      href="mailto:contacto@agrotechchile.cl?subject=Solicitud%20Investigacion%20AgriTwin"
                      className="text-amber-300 hover:underline flex items-center gap-1 font-mono"
                    >
                      <Mail className="w-3 h-3" />
                      <span>contacto@agrotechchile.cl</span>
                    </a>
                  </div>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-5 animate-fadeIn font-mono">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white font-sans">¡Solicitud Registrada en el Protocolo I+D!</h3>
                  <p className="text-sm text-slate-300 font-serif max-w-md mx-auto">
                    Gracias <strong>{formData.investigatorName}</strong> ({formData.institution}). Nuestro equipo de I+D revisará los antecedentes de tu línea experimental.
                  </p>
                  <p className="text-xs text-amber-300 pt-1">
                    Ticket Experimental: #RES-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-3 text-left text-xs">
                  <span className="text-[11px] text-amber-300 uppercase font-bold block">
                    Canales Inmediatos
                  </span>
                  
                  <div className="flex flex-col sm:flex-row gap-2 font-sans font-bold">
                    <a
                      href={`https://wa.me/56976696142?text=Hola%20AgroTech%20Chile,%20solicito%20acceso%20institucional%20a%20AgriTwin%20Testbed.%0A%0A*Investigador:*%20${encodeURIComponent(formData.investigatorName)}%0A*Institución:*%20${encodeURIComponent(formData.institution)}%0A*Fondo:*%20${encodeURIComponent(formData.fundingGrant)}%0A*Línea:*%20${encodeURIComponent(formData.researchFocus)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Conectar por WhatsApp</span>
                    </a>

                    <a
                      href={`mailto:contacto@agrotechchile.cl?subject=Solicitud%20I%2BD%20AgriTwin%20-%20${encodeURIComponent(formData.institution)}&body=Investigador:%20${encodeURIComponent(formData.investigatorName)}%0AInstitución:%20${encodeURIComponent(formData.institution)}%0AEmail:%20${encodeURIComponent(formData.email)}%0AFondo:%20${encodeURIComponent(formData.fundingGrant)}%0ALínea:%20${encodeURIComponent(formData.researchFocus)}`}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1.5 border border-slate-600"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>Enviar Copia por Email</span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-emerald-950 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-serif">Mientras tanto, consulta el dossier oficial:</span>
                    <a
                      href="https://danisantanderurrutia-coder.github.io/agritwin-app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-amber-300 hover:underline flex items-center gap-1"
                    >
                      <span>Ver Dossier en Vivo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="pt-2 flex justify-center gap-3 font-sans font-bold">
                  <button
                    onClick={() => { setIsDemoModalOpen(false); setIsSubmitted(false); }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-white text-xs cursor-pointer"
                  >
                    Cerrar y Volver a la Web
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

// Helper Icon para Temperatura
function ThermometerIcon({ temp }: { temp: number }) {
  if (temp <= 0) return <span className="text-sky-300">❄️</span>;
  if (temp < 15) return <span className="text-amber-300">🌤️</span>;
  if (temp >= 32) return <span className="text-red-400">🔥</span>;
  return <span className="text-amber-400">☀️</span>;
}