import React, { useState, useMemo } from 'react';
import { 
  Cpu, Layers, Satellite, ShieldCheck, Droplets, Flame, Wind, 
  ArrowRight, ExternalLink, Calendar, Sparkles, Compass, 
  Check, X, Send, PhoneCall, FileText, Activity, AlertTriangle, 
  Sliders, Gauge, Mail, Globe, MapPin, Download, CheckCircle2,
  Maximize2, Eye, ShieldAlert, Waves, ZoomIn
} from 'lucide-react';

interface AgriTwinShowcasePageProps {
  onNavigate?: (viewId: string) => void;
}

export const AgriTwinShowcasePage: React.FC<AgriTwinShowcasePageProps> = ({ onNavigate }) => {
  // Idioma activo: 'en' (default) | 'es'
  const [lang, setLang] = useState<'en' | 'es'>('en');

  // Modal de demostración / contacto
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Modal para ver capturas en alta resolución
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  // ─── PARÁMETROS DEL SIMULADOR BIOFÍSICO ──────────────────────────────────
  const [simTemp, setSimTemp] = useState<number>(1.2);
  const [simSoilMoisture, setSimSoilMoisture] = useState<number>(23);
  const [simWindSpeed, setSimWindSpeed] = useState<'calm' | 'breeze' | 'puelche'>('calm');
  const [simCrop, setSimCrop] = useState<'avellano' | 'vid' | 'pradera'>('avellano');
  const [simSoilType, setSimSoilType] = useState<'arcilloso' | 'limoso' | 'arenoso'>('arcilloso');

  // Presets rápidos para investigadores
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

  // Cálculos reactivos
  const sim = useMemo(() => {
    const kc = simCrop === 'avellano' ? 0.85 : simCrop === 'vid' ? 0.65 : 0.95;
    const cropName = lang === 'en'
      ? (simCrop === 'avellano' ? 'Hazelnut (Corylus avellana)' : simCrop === 'vid' ? 'Wine Grape (Vitis vinifera)' : 'PRV Pasture')
      : (simCrop === 'avellano' ? 'Avellano Europeo' : simCrop === 'vid' ? 'Vid Vinífera' : 'Pradera PRV');

    let cc = 32;
    let pmp = 15;
    let soilLabel = lang === 'en' ? 'Clay-Loam (Maule Series)' : 'Franco-Arcilloso (Serie Maule)';
    if (simSoilType === 'limoso') {
      cc = 27;
      pmp = 12;
      soilLabel = lang === 'en' ? 'Silt-Loam Fluvial' : 'Franco-Limoso Fluvial';
    } else if (simSoilType === 'arenoso') {
      cc = 18;
      pmp = 8;
      soilLabel = lang === 'en' ? 'Sandy-Loam Colluvial' : 'Franco-Arenoso Coluvial';
    }

    const windSpeedMs = simWindSpeed === 'calm' ? 0.6 : simWindSpeed === 'breeze' ? 2.4 : 6.8;
    const windFactor = simWindSpeed === 'calm' ? 0.7 : simWindSpeed === 'breeze' ? 1.8 : 3.6;

    const es = 0.6108 * Math.exp((17.27 * simTemp) / (simTemp + 237.3));
    const vpd = Math.max(0.05, es * 0.35).toFixed(2);
    const et0 = Math.max(0.6, (simTemp * 0.16) + windFactor);
    const etc = (et0 * kc).toFixed(2);

    const layer1 = Math.max(8, Math.min(50, simSoilMoisture));
    const layer2 = Math.max(10, Math.min(48, Math.round(simSoilMoisture * 0.92 + (simSoilType === 'arcilloso' ? 4 : 2))));
    const layer3 = Math.max(12, Math.min(46, Math.round(simSoilMoisture * 0.86 + (simSoilType === 'arcilloso' ? 7 : 4))));

    let frostStatus: 'normal' | 'warning' | 'critical' | 'heat_stress' = 'normal';
    let frostMsg = lang === 'en' 
      ? 'Atmospheric equilibrium. Neutral boundary layer, no thermal inversion.'
      : 'Equilibrio atmosférico. Capa límite neutra, sin inversión térmica.';

    if (simTemp <= 0 && simWindSpeed === 'calm') {
      frostStatus = 'critical';
      frostMsg = lang === 'en'
        ? `CRITICAL THERMAL INVERSION (${simTemp}°C, wind <0.8 m/s). Dense cold air trapped in depressions. Frost damage risk.`
        : `INVERSIÓN TÉRMICA CRÍTICA (${simTemp}°C, viento <0.8 m/s). Aire frío estancado en quebradas. Riesgo de helada.`;
    } else if (simTemp <= 0 && simWindSpeed !== 'calm') {
      frostStatus = 'critical';
      frostMsg = lang === 'en'
        ? `ADVECTION / POLAR FROST (${simTemp}°C, wind ${windSpeedMs} m/s). Turbulent convective freezing.`
        : `HELADA POLAR / ADVECCIÓN (${simTemp}°C, viento ${windSpeedMs} m/s). Congelamiento convectivo turbulento.`;
    } else if (simTemp <= 2.5 && simWindSpeed === 'calm') {
      frostStatus = 'warning';
      frostMsg = lang === 'en'
        ? `PRE-ALERT: Katabatic drainage active (${simTemp}°C). Rapid cooling towards valley bottoms.`
        : `PRE-ALERTA: Drenaje catabático en curso (${simTemp}°C). Enfriamiento rápido hacia fondos de quebrada.`;
    } else if (simTemp >= 32) {
      frostStatus = 'heat_stress';
      frostMsg = lang === 'en'
        ? `HIGH HEAT STRESS (VPD=${vpd} kPa, ${simTemp}°C). Stomatal closure induced. Evaporative cooling needed.`
        : `ESTRÉS TÉRMICO ELEVADO (VPD=${vpd} kPa, ${simTemp}°C). Cierre estomático inducido. Riego de refresco requerido.`;
    }

    let waterStatus: 'deficit' | 'optimal' | 'saturation' = 'optimal';
    let waterMsg = lang === 'en'
      ? `Balanced root moisture (${layer2}% vol). Matrix potential within target range (-33 to -100 kPa).`
      : `Humedad radicular balanceada (${layer2}% vol). Potencial matricial en rango óptimo (-33 a -100 kPa).`;

    if (layer1 < pmp + 4) {
      waterStatus = 'deficit';
      waterMsg = lang === 'en'
        ? `ROOT WATER DEFICIT: Soil moisture below threshold. Irrigation required to restore 0-60 cm layer.`
        : `DÉFICIT HÍDRICO RADICULAR: Humedad bajo umbral. Riego requerido para reponer estrato 0-60 cm.`;
    } else if (layer1 > cc + 4) {
      waterStatus = 'saturation';
      waterMsg = lang === 'en'
        ? `SATURATION / ANOXIA RISK: Soil exceeds Field Capacity (${cc}%). Suspended irrigation advised to prevent root asphyxia.`
        : `SATURACIÓN / RIESGO DE ASFIXIA: Suelo supera Capacidad de Campo (${cc}%). Suspender turnos de riego.`;
    }

    return {
      etc,
      et0: et0.toFixed(2),
      vpd,
      layer1,
      layer2,
      layer3,
      cc,
      pmp,
      soilLabel,
      cropName,
      windSpeedMs,
      frostStatus,
      frostMsg,
      waterStatus,
      waterMsg
    };
  }, [simTemp, simSoilMoisture, simWindSpeed, simCrop, simSoilType, lang]);

  // Formulario de contacto
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    interest: 'Territorial Basin GIS & Wildfire Model'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const msg = `AgriTwin Scientific Request:%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Institution:* ${encodeURIComponent(formData.institution)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Interest:* ${encodeURIComponent(formData.interest)}`;
    window.open(`https://wa.me/56976696142?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050F0A] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans relative">
      
      {/* Retícula de fondo milimétrica */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #10B981 1px, transparent 1px), linear-gradient(to bottom, #10B981 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* ─── 0. SUB-HEADER STICKY: IDIOMA & TELEMETRÍA ─────────────────────── */}
      <div className="sticky top-16 z-30 bg-[#06140D]/90 backdrop-blur-md border-b border-emerald-900/50 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto text-[11px] font-mono">
          
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AGRITWIN OS
            </span>
            <span className="text-slate-400 hidden sm:inline">
              MAULE SOUTH LIVING LAB (35.98°S, 71.75°W)
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-black/60 rounded-lg border border-emerald-500/40 p-0.5 font-bold">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${lang === 'en' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('es')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${lang === 'es' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                ES
              </button>
            </div>

            <a
              href="https://danisantanderurrutia-coder.github.io/agritwin-app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 font-bold flex items-center gap-1.5 transition-all"
            >
              <span>{lang === 'en' ? 'Live Showcase App' : 'App en Vivo'}</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </a>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-3.5 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition-all cursor-pointer"
            >
              {lang === 'en' ? 'Request Access' : 'Solicitar Acceso'}
            </button>
          </div>

        </div>
      </div>

      {/* ─── 1. HERO CONTEXTUAL CONCISO ─────────────────────────────────────── */}
      <section className="relative pt-12 pb-16 border-b border-emerald-950/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 space-y-6">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase">
              {lang === 'en' ? 'Cyber-Physical Digital Twin' : 'Gemelo Digital Ciberfísico'}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
              Sentinel-2 L2A • LoRaWAN 915MHz • DGA Network
            </span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {lang === 'en' ? (
                <>From Watershed Hydrology to <span className="bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">3D Root Zone</span> Physics.</>
              ) : (
                <>De la Hidrología de Cuenca a la <span className="bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">Física Radicular 3D</span>.</>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-serif leading-relaxed">
              {lang === 'en' ? (
                'AgriTwin operates at two continuous scales: the 122,000-hectare Maule South macro-basin (wildfire spread, DGA rivers, and rural water wells) followed immediately by the 24.8-ha 3D micro-plot twin (soil horizons, katabatic frost, and FAO-56 balance).'
              ) : (
                'AgriTwin opera en dos escalas continuas: la macrocuenca Maule Sur de 122.000 ha (propagación de incendios, ríos DGA y pozos APR) seguida inmediatamente por el gemelo 3D de 24.8 ha (horizontes de suelo, heladas catabáticas y balance FAO-56).'
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition-all shadow-md cursor-pointer"
            >
              <span>{lang === 'en' ? 'Request Interactive Demo' : 'Solicitar Demostración'}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
            <a
              href="#cuenca"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-black/40 hover:bg-black/60 border border-emerald-500/30 text-emerald-300 font-semibold transition-all"
            >
              <span>{lang === 'en' ? 'Explore Working Modules &darr;' : 'Explorar Módulos en Vivo &darr;'}</span>
            </a>
          </div>

        </div>
      </section>

      {/* ─── 2. SECCIÓN A: ESCALA MACRO (CUENCA 122.000 HA) ─────────────────── */}
      <section id="cuenca" className="py-16 border-b border-emerald-950/80 bg-[#06140D]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Macro Scale • 122,000 Hectares' : 'Escala Macro • 122.000 Hectáreas'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {lang === 'en' ? '1. Territorial Basin GIS & Wildfire Dynamics' : '1. GIS Territorial de Cuenca & Dinámica de Incendios'}
            </h2>
            <p className="text-slate-400 text-sm font-serif max-w-3xl">
              {lang === 'en' 
                ? 'Spatial decision-support system coupling official DGA river telemetry (Longaví & Perquilauquén), 5 rural water deep wells (APR), and real-time FWI wildfire propagation under Puelche foehn winds.'
                : 'Sistema de soporte a la decisión territorial que acopla estaciones fluviométricas DGA (Longaví y Perquilauquén), 5 pozos profundos APR y simulación de incendios forestales FWI bajo viento Puelche.'
              }
            </p>
          </div>

          {/* Screenshot 1: Wildfire Spread Simulation (HERRAMIENTA REAL DE INCENDIOS) */}
          <div className="rounded-3xl bg-[#081B11] border-2 border-amber-500/40 p-4 sm:p-6 shadow-2xl space-y-4">
            
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-slate-400 ml-2">agritwin://basin/wildfire-fwi-spread</span>
              </div>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'en' ? 'LIVE TOOL: WILDFIRE HINDCAST' : 'HERRAMIENTA EN VIVO: INCENDIO FORESTAL'}
              </span>
            </div>

            {/* App Screenshot Image Frame */}
            <div 
              onClick={() => setLightboxImage({
                src: './assets/app_screens/cuenca_wildfire_simulation.jpg',
                title: lang === 'en' ? 'Wildfire Spread & Plume Prediction' : 'Predicción y Propagación de Incendio Forestal',
                desc: lang === 'en' ? 'Real simulation of fire perimeter, smoke plume, wind vectors, and Keyline slowdown barriers.' : 'Simulación real de perímetro de fuego, pluma de humo, vectores de viento y desaceleración en Keyline.'
              })}
              className="rounded-2xl overflow-hidden border border-emerald-500/30 relative h-[380px] sm:h-[480px] bg-black cursor-pointer group"
            >
              <img 
                src="./assets/app_screens/cuenca_wildfire_simulation.jpg" 
                alt="AgriTwin Wildfire Spread Tool" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-amber-300 font-bold block">
                    {lang === 'en' ? '● FWI Fire Propagation Engine' : '● Motor de Propagación de Incendios FWI'}
                  </span>
                  <p className="text-xs text-slate-300 font-serif max-w-xl">
                    {lang === 'en' 
                      ? 'Real screenshot of AgriTwin modeling fire perimeter advance, wind vectors, and agroecological buffer slowdown.'
                      : 'Captura real de AgriTwin modelando el avance perimetral del fuego, vectores de viento y amortiguación por cortafuegos agroforestales.'
                    }
                  </p>
                </div>
                <span className="pointer-events-none px-3 py-1.5 rounded-lg bg-black/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 backdrop-blur-md">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Enlarge' : 'Ampliar'}</span>
                </span>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Fire Weather Index (FWI)' : 'Índice FWI Meteorológico'}</span>
                <span className="text-amber-400 font-bold text-sm">Extreme (FWI &gt; 38)</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Puelche Wind Acceleration' : 'Viento Puelche Acelerado'}</span>
                <span className="text-sky-300 font-bold text-sm">24.5 km/h E-SE</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Buffer Slowdown Ratio' : 'Ralentización por Cortafuegos'}</span>
                <span className="text-emerald-400 font-bold text-sm">-58% Spread Rate</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 3. SECCIÓN B: ESCALA MICRO (PREDIO EXPERIMENTAL 24.8 HA) ────────── */}
      <section id="predio" className="py-16 border-b border-emerald-950/80 bg-[#05110A]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'en' ? 'Micro Scale • 24.8-Hectare Plot' : 'Escala Micro • Parcela de 24.8 Hectáreas'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {lang === 'en' ? '2. 3D Digital Twin with Live Telemetry Panels' : '2. Gemelo Digital 3D con Paneles de Telemetría en Vivo'}
            </h2>
            <p className="text-slate-400 text-sm font-serif max-w-3xl">
              {lang === 'en' 
                ? 'High-resolution Three.js twin of Fundo Meniel running real-time microclimate diagnostics, 7-day agro-meteorological forecasting, and parcel-by-parcel FDR soil sensor telemetry.'
                : 'Gemelo Three.js en alta resolución de Fundo Meniel con diagnóstico microclimático en tiempo real, pronóstico agrometeorológico a 7 días y telemetría edáfica FDR por cuartel.'
              }
            </p>
          </div>

          {/* Screenshot 1: House on Left + Weather & Forecast Panel on Right */}
          <div className="rounded-3xl bg-[#081B11] border-2 border-emerald-500/40 p-4 sm:p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-slate-400 ml-2">agritwin://twin3d/fundo-meniel/house-weather-telemetry</span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'en' ? 'MICROCLIMATE & 7-DAY FORECAST' : 'MICROCLIMA & PRONÓSTICO 7 DÍAS'}
              </span>
            </div>

            <div 
              onClick={() => setLightboxImage({
                src: './assets/app_screens/predio_house_timeline.jpg',
                title: lang === 'en' ? 'Farmhouse Architecture & 7-Day Weather Panel' : 'Casa Principal y Panel Agrometeorológico 7 Días',
                desc: lang === 'en' ? 'Three.js 3D view of the central farmhouse on the left, with the live diagnostic drawer open on the right displaying 7-day weather forecast, wind regimes, and nocturnal frost risk.' : 'Vista Three.js 3D de la casa principal a la izquierda, con el panel de diagnóstico lateral abierto a la derecha mostrando el pronóstico meteorológico a 7 días, regímenes de viento y riesgo de heladas.'
              })}
              className="rounded-2xl overflow-hidden border border-emerald-500/30 relative h-[380px] sm:h-[500px] bg-black cursor-pointer group"
            >
              <img 
                src="./assets/app_screens/predio_house_timeline.jpg" 
                alt="AgriTwin Farmhouse and Live Weather Panel" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-cyan-300 font-bold block">
                    {lang === 'en' ? '● Farmhouse & Lateral Agrometeorological Drawer' : '● Casa Principal & Cajón Lateral Agrometeorológico'}
                  </span>
                  <p className="text-xs text-slate-300 font-serif max-w-xl">
                    {lang === 'en' 
                      ? 'Live screenshot of AgriTwin 3D: central farmhouse on the left, and the operational weather drawer on the right showing thermal wind dynamics and 7-day rainfall projections.'
                      : 'Captura en vivo de AgriTwin 3D: casa principal a la izquierda, y el panel operativo del tiempo a la derecha mostrando vientos térmicos y proyecciones de lluvia a 7 días.'
                    }
                  </p>
                </div>
                <span className="pointer-events-none px-3 py-1.5 rounded-lg bg-black/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 backdrop-blur-md">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Enlarge' : 'Ampliar'}</span>
                </span>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Local Station (Meniel)' : 'Estación Local (Meniel)'}</span>
                <span className="text-cyan-300 font-bold text-sm">Lat -36.14°S, Lon -71.60°W</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Coastal Thermal Wind (SSW)' : 'Viento Térmico Costero (SSW)'}</span>
                <span className="text-amber-400 font-bold text-sm">16.5 km/h Pelluhue</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Nocturnal Thermal Inversion' : 'Inversión Térmica Nocturna'}</span>
                <span className="text-emerald-400 font-bold text-sm">Superficial Katabatic Drain</span>
              </div>
            </div>

          </div>

          {/* Screenshot 2: Crops & Live Sensor Telemetry */}
          <div className="rounded-3xl bg-[#081B11] border-2 border-emerald-500/40 p-4 sm:p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-slate-400 ml-2">agritwin://twin3d/fundo-meniel/orchard-sensors-telemetry</span>
              </div>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'en' ? 'ORCHARD CROPS & SENSOR NETWORK' : 'CULTIVOS & RED DE SENSORES IOT'}
              </span>
            </div>

            <div 
              onClick={() => setLightboxImage({
                src: './assets/app_screens/predio_crops_sensors.jpg',
                title: lang === 'en' ? 'Orchard Parcels & In-Field Sensor Network' : 'Cuarteles de Frutales y Red de Sensores en Campo',
                desc: lang === 'en' ? 'Three.js 3D view of hazelnut and cherry crop parcels with in-field 3D HUD billboard telemetry, and the live sensor drawer displaying multi-depth FDR soil moisture, temperature, and battery health.' : 'Vista Three.js 3D de cuarteles de avellanos y cerezos con tarjetas HUD flotantes en escena y panel lateral desplegando telemetría de humedad FDR a 3 profundidades, temperatura y batería.'
              })}
              className="rounded-2xl overflow-hidden border border-emerald-500/30 relative h-[380px] sm:h-[500px] bg-black cursor-pointer group"
            >
              <img 
                src="./assets/app_screens/predio_crops_sensors.jpg" 
                alt="AgriTwin Crops and Live Sensor Telemetry" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-emerald-300 font-bold block">
                    {lang === 'en' ? '● Fruit Canopy & Multi-Horizon FDR Probes' : '● Canopia Frutal & Sondas FDR Tri-Estrato'}
                  </span>
                  <p className="text-xs text-slate-300 font-serif max-w-xl">
                    {lang === 'en' 
                      ? 'Live screenshot of crop parcels with active in-field telemetry billboards and lateral drawer tracking continuous root zone hydration (0-20, 20-60, 60-100cm).'
                      : 'Captura en vivo de cuarteles agrícolas con tarjetas de telemetría flotantes y cajón lateral con seguimiento continuo de hidratación radicular (0-20, 20-60, 60-100cm).'
                    }
                  </p>
                </div>
                <span className="pointer-events-none px-3 py-1.5 rounded-lg bg-black/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 backdrop-blur-md">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Enlarge' : 'Ampliar'}</span>
                </span>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'FDR Sensor Mesh' : 'Red de Sondas FDR'}</span>
                <span className="text-emerald-400 font-bold text-sm">19 Active Stations</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Root Zone Moisture (20-60cm)' : 'Humedad Radicular (20-60cm)'}</span>
                <span className="text-teal-300 font-bold text-sm">36.2% vol (Optimal)</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-950">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Deep Hypoxia Prevention' : 'Prevención de Asfixia Radicular'}</span>
                <span className="text-sky-300 font-bold text-sm">-32.4% Energy Waste</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. SIMULADOR BIOFÍSICO EN VIVO (SANDBOX PARAMÉTRICO) ─────────────── */}
      <section className="py-16 border-b border-emerald-950/80 bg-[#06140D]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              {lang === 'en' ? 'Interactive Physics Sandbox' : 'Sandbox de Física Interactiva'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {lang === 'en' ? 'Calibrate the Deterministic Engine' : 'Calibra el Motor Determinista'}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-serif">
              {lang === 'en'
                ? 'Adjust air temperature, soil moisture, and wind regime to test real-time FAO-56 Penman-Monteith and katabatic frost diagnostics.'
                : 'Ajusta la temperatura, humedad edáfica y viento para evaluar la respuesta en tiempo real de la ecuación FAO-56 y detección de heladas.'
              }
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            <span className="text-slate-400 text-[11px] uppercase mr-2">{lang === 'en' ? 'Quick Test Scenarios:' : 'Escenarios Rápidos:'}</span>
            <button
              onClick={() => applyPreset('frost')}
              className="px-3 py-1.5 rounded-lg bg-sky-950/70 hover:bg-sky-900 border border-sky-500/40 text-sky-200 transition-all cursor-pointer"
            >
              ❄️ {lang === 'en' ? 'Radiation Frost (-1.8°C)' : 'Helada Radiativa (-1.8°C)'}
            </button>
            <button
              onClick={() => applyPreset('heatwave')}
              className="px-3 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-500/40 text-amber-200 transition-all cursor-pointer"
            >
              🔥 {lang === 'en' ? 'Heatwave & Foehn (35.2°C)' : 'Ola de Calor & Puelche (35.2°C)'}
            </button>
            <button
              onClick={() => applyPreset('saturation')}
              className="px-3 py-1.5 rounded-lg bg-teal-950/70 hover:bg-teal-900 border border-teal-500/40 text-teal-200 transition-all cursor-pointer"
            >
              💧 {lang === 'en' ? 'Soil Anoxia / Saturation (44%)' : 'Anoxia / Saturación (44%)'}
            </button>
          </div>

          {/* Sandbox Grid */}
          <div className="bg-[#08180F] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono text-xs">
            
            {/* Sliders (Left) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="flex justify-between items-center border-b border-emerald-900 pb-2">
                <span className="font-bold text-amber-400 uppercase">{lang === 'en' ? 'Input Parameters' : 'Parámetros de Entrada'}</span>
                <span className="text-[10px] text-slate-400">FAO-56 PM</span>
              </div>

              {/* Slider Ta */}
              <div className="space-y-1">
                <div className="flex justify-between items-center font-sans">
                  <span className="text-slate-300 text-xs">{lang === 'en' ? 'Air Temperature (Ta):' : 'Temperatura Aire (Ta):'}</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">{simTemp} °C</span>
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
              </div>

              {/* Slider Soil Moisture */}
              <div className="space-y-1">
                <div className="flex justify-between items-center font-sans">
                  <span className="text-slate-300 text-xs">{lang === 'en' ? 'Horizon A Moisture (0-20cm):' : 'Humedad Horizonte A (0-20cm):'}</span>
                  <span className="font-mono font-bold text-teal-300 text-sm">{simSoilMoisture}% vol</span>
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
              </div>

              {/* Wind selector */}
              <div className="space-y-1">
                <label className="text-[11px] text-slate-300 font-sans block">{lang === 'en' ? 'Wind Speed (u2):' : 'Velocidad de Viento (u2):'}</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSimWindSpeed('calm')}
                    className={`py-1.5 px-2 rounded-lg text-center font-sans text-xs font-bold transition-all ${simWindSpeed === 'calm' ? 'bg-amber-400 text-slate-950' : 'bg-black/40 text-slate-400'}`}
                  >
                    {lang === 'en' ? 'Calm (<1m/s)' : 'Calma (<1m/s)'}
                  </button>
                  <button
                    onClick={() => setSimWindSpeed('breeze')}
                    className={`py-1.5 px-2 rounded-lg text-center font-sans text-xs font-bold transition-all ${simWindSpeed === 'breeze' ? 'bg-amber-400 text-slate-950' : 'bg-black/40 text-slate-400'}`}
                  >
                    {lang === 'en' ? 'Breeze (2.4m/s)' : 'Brisa (2.4m/s)'}
                  </button>
                  <button
                    onClick={() => setSimWindSpeed('puelche')}
                    className={`py-1.5 px-2 rounded-lg text-center font-sans text-xs font-bold transition-all ${simWindSpeed === 'puelche' ? 'bg-amber-400 text-slate-950' : 'bg-black/40 text-slate-400'}`}
                  >
                    {lang === 'en' ? 'Foehn (6.8m/s)' : 'Puelche (6.8m/s)'}
                  </button>
                </div>
              </div>

              {/* Crop & Soil Selectors */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-sans text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">{lang === 'en' ? 'Crop Species:' : 'Cultivo:'}</label>
                  <select
                    value={simCrop}
                    onChange={(e) => setSimCrop(e.target.value as any)}
                    className="w-full p-1.5 rounded-lg bg-black/60 border border-emerald-900 text-white font-mono text-[11px]"
                  >
                    <option value="avellano">Corylus (Kc 0.85)</option>
                    <option value="vid">Vitis (Kc 0.65)</option>
                    <option value="pradera">Pasture (Kc 0.95)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">{lang === 'en' ? 'Soil Texture:' : 'Textura Suelo:'}</label>
                  <select
                    value={simSoilType}
                    onChange={(e) => setSimSoilType(e.target.value as any)}
                    className="w-full p-1.5 rounded-lg bg-black/60 border border-emerald-900 text-white font-mono text-[11px]"
                  >
                    <option value="arcilloso">Clay-Loam</option>
                    <option value="limoso">Silt-Loam</option>
                    <option value="arenoso">Sandy-Loam</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Output (Right) */}
            <div className="lg:col-span-7 space-y-4 bg-[#06150D] p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-emerald-900 pb-2">
                  <span className="font-bold text-emerald-400 uppercase">{lang === 'en' ? 'Deterministic Diagnostic' : 'Diagnóstico Determinista'}</span>
                  <span className="text-[10px] text-slate-400">VPD: {sim.vpd} kPa</span>
                </div>

                {/* Frost status card */}
                <div className={`p-3.5 rounded-xl border ${
                  sim.frostStatus === 'critical' ? 'bg-red-950/60 border-red-500/80 text-red-200' :
                  sim.frostStatus === 'warning' ? 'bg-amber-950/60 border-amber-500/80 text-amber-200' :
                  sim.frostStatus === 'heat_stress' ? 'bg-orange-950/60 border-orange-500/80 text-orange-200' :
                  'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                }`}>
                  <div className="flex justify-between items-center font-bold text-xs uppercase mb-1">
                    <span>{lang === 'en' ? 'Boundary Layer & Microclimate' : 'Capa Límite & Microclima'}</span>
                    <span className="text-[10px]">{sim.frostStatus.toUpperCase()}</span>
                  </div>
                  <p className="text-xs font-serif leading-relaxed">{sim.frostMsg}</p>
                </div>

                {/* Water status card */}
                <div className={`p-3.5 rounded-xl border ${
                  sim.waterStatus === 'deficit' ? 'bg-amber-950/50 border-amber-500/60 text-amber-200' :
                  sim.waterStatus === 'saturation' ? 'bg-blue-950/50 border-blue-500/60 text-blue-200' :
                  'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                }`}>
                  <div className="flex justify-between items-center font-bold text-xs mb-1">
                    <span>{lang === 'en' ? 'FAO-56 Water Balance' : 'Balance Hídrico FAO-56'}</span>
                    <span className="text-amber-300">ETc = {sim.etc} mm/day</span>
                  </div>
                  <p className="text-xs font-serif leading-relaxed">{sim.waterMsg}</p>
                </div>

                {/* 3 soil layers display */}
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Horizon A (0-20cm):</span>
                    <span className="text-teal-300 font-bold">{sim.layer1}% vol</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400" style={{ width: `${(sim.layer1 / 50) * 100}%` }} />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>Horizon B (20-60cm root zone):</span>
                    <span className="text-teal-300 font-bold">{sim.layer2}% vol</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-600 to-emerald-500" style={{ width: `${(sim.layer2 / 50) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-emerald-900/60 flex flex-wrap justify-between items-center gap-2">
                <button
                  onClick={() => {
                    const data = {
                      timestamp: new Date().toISOString(),
                      crop: sim.cropName,
                      temperature_c: simTemp,
                      wind_speed_ms: sim.windSpeedMs,
                      soil_moisture_layers: [sim.layer1, sim.layer2, sim.layer3],
                      etc_mm_day: sim.etc,
                      vpd_kpa: sim.vpd,
                      frost_status: sim.frostStatus
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `agritwin_simulation_${Date.now()}.json`;
                    a.click();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-black/50 hover:bg-black/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Download JSON Data' : 'Descargar Datos JSON'}</span>
                </button>

                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                >
                  {lang === 'en' ? 'Request Calibration with Your Farm' : 'Solicitar Calibración con tu Predio'}
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─── 5. FINAL CALL TO ACTION ────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-t from-black to-[#07170E] text-center border-t border-emerald-950/80">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            {lang === 'en' 
              ? 'Ready to Deploy AgriTwin in Your Basin or Research Project?' 
              : '¿Listo para Desplegar AgriTwin en tu Cuenca o Proyecto de Investigación?'
            }
          </h2>
          <p className="text-slate-300 text-sm font-serif">
            {lang === 'en'
              ? 'We configure the digital twin with your cadastral coordinates, integrate local LoRaWAN sensors or weather stations, and calibrate FAO-56 models in under 7 business days.'
              : 'Configuramos el gemelo digital con las coordenadas de tu rol SII o cuenca, conectamos sensores LoRaWAN locales y calibramos los modelos FAO-56 en menos de 7 días hábiles.'
            }
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono text-xs">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold transition-all shadow-lg cursor-pointer"
            >
              {lang === 'en' ? 'Request Private Demonstration' : 'Solicitar Demostración Privada'}
            </button>
            <a
              href="mailto:contacto@agrotechchile.cl?subject=AgriTwin%20Inquiry"
              className="px-5 py-3 rounded-xl bg-[#091F13] hover:bg-[#10301F] text-emerald-300 border border-emerald-500/40 font-bold transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>contacto@agrotechchile.cl</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── MODAL DE DEMOSTRACIÓN & CONTACTO ───────────────────────────────── */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#081A10] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-white relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => { setIsDemoModalOpen(false); setIsSubmitted(false); }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                    {lang === 'en' ? 'DIRECT TECHNICAL ACCESS' : 'ACCESO TÉCNICO DIRECTO'}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {lang === 'en' ? 'Request Guided Demonstration' : 'Solicitar Demostración Guiada'}
                  </h3>
                  <p className="text-xs text-slate-300 font-serif">
                    {lang === 'en' 
                      ? 'We will prepare a live session tailored to your farm coordinates or basin project.'
                      : 'Prepararemos una sesión en vivo con los polígonos satelitales de tu predio o cuenca.'
                    }
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">{lang === 'en' ? 'Full Name *' : 'Nombre Completo *'}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr(a). Andrés Ovalle"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">{lang === 'en' ? 'Company / University / Basin *' : 'Empresa / Institución / Cuenca *'}</label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="Ej. Agrícola San Pedro / INIA / Junta de Vigilancia"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">{lang === 'en' ? 'Corporate or Institutional Email *' : 'Email Corporativo o Institucional *'}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="investigador@agricola.cl"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">{lang === 'en' ? 'Area of Interest' : 'Área de Interés'}</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                    >
                      <option value="Territorial Basin GIS & Wildfire Model">{lang === 'en' ? 'Territorial Basin GIS & Wildfire Model' : 'GIS de Cuenca & Modelo de Incendios'}</option>
                      <option value="3D Farm Twin & FAO-56 Irrigation">{lang === 'en' ? '3D Farm Twin & FAO-56 Irrigation' : 'Gemelo 3D de Predio & Riego FAO-56'}</option>
                      <option value="Katabatic Nocturnal Frost Warning">{lang === 'en' ? 'Katabatic Nocturnal Frost Warning' : 'Pre-Alerta de Heladas Catabáticas'}</option>
                      <option value="Research Grant Partnership (ANID / Horizon)">{lang === 'en' ? 'Research Grant Partnership (ANID / Horizon)' : 'Postulación a Fondos I+D (ANID / Horizon)'}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>{lang === 'en' ? 'Submit and Connect via WhatsApp' : 'Enviar y Conectar por WhatsApp'}</span>
                  </button>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 font-mono">
                    <span>Direct: +56 9 7669 6142</span>
                    <span>contacto@agrotechchile.cl</span>
                  </div>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {lang === 'en' ? 'Request Sent Successfully!' : '¡Solicitud Enviada con Éxito!'}
                </h3>
                <p className="text-xs text-slate-300 font-serif max-w-sm mx-auto">
                  {lang === 'en'
                    ? `Thank you ${formData.name}. Our technical engineering team will contact you within 24 business hours.`
                    : `Gracias ${formData.name}. Nuestro equipo de ingeniería te contactará en menos de 24 horas hábiles.`
                  }
                </p>
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => { setIsDemoModalOpen(false); setIsSubmitted(false); }}
                    className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-mono text-xs font-bold"
                  >
                    {lang === 'en' ? 'Close' : 'Cerrar'}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ─── LIGHTBOX MODAL PARA EXPANDIR CAPTURAS ───────────────────────────── */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full bg-[#081B11] border border-emerald-500/40 rounded-2xl overflow-hidden shadow-2xl space-y-3 p-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-emerald-900/60 font-mono text-xs">
              <span className="text-amber-300 font-bold">{lightboxImage.title}</span>
              <button 
                onClick={() => setLightboxImage(null)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-hidden rounded-xl bg-black flex items-center justify-center">
              <img src={lightboxImage.src} alt={lightboxImage.title} className="w-full h-auto object-contain max-h-[72vh]" />
            </div>
            <p className="text-xs text-slate-300 font-serif pt-1">
              {lightboxImage.desc}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
