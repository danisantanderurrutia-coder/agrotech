import React, { useState, useMemo, useEffect } from 'react';
import { 
  Cpu, Layers, Satellite, ShieldCheck, Droplets, Flame, Wind, 
  ArrowRight, ExternalLink, Calendar, Sparkles, Compass, 
  Check, X, Send, PhoneCall, FileText, Activity, AlertTriangle, 
  Sliders, Gauge, Mail, Globe, MapPin, Download, CheckCircle2,
  Maximize2, Eye, ShieldAlert, Waves, ZoomIn, Terminal, BarChart3,
  Database, Workflow, CheckCircle, Clock, Zap, Target, BookOpen,
  ChevronRight, Server, ArrowLeft
} from 'lucide-react';

interface AgriTwinShowcasePageProps {
  onNavigate?: (viewId: string) => void;
}

export const AgriTwinShowcasePage: React.FC<AgriTwinShowcasePageProps> = ({ onNavigate }) => {
  // Idioma activo: 'en' (default) | 'es'
  const [lang, setLang] = useState<'en' | 'es'>('en');

  // Actualizar el título del documento según el idioma
  useEffect(() => {
    document.title = lang === 'en'
      ? 'AgriTwin OS | Cyber-Physical Digital Twin for Agriculture & Watershed Intelligence'
      : 'AgriTwin OS | Gemelo Digital Ciberfísico para Agricultura y Cuencas Hidrográficas';
  }, [lang]);

  // Modal de demostración / contacto
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Modal para ver capturas en alta resolución
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  // ─── PARÁMETROS DEL SIMULADOR BIOFÍSICO EN VIVO ──────────────────────────
  const [simTemp, setSimTemp] = useState<number>(1.2);
  const [simSoilMoisture, setSimSoilMoisture] = useState<number>(23);
  const [simWindSpeed, setSimWindSpeed] = useState<'calm' | 'breeze' | 'puelche'>('calm');
  const [simCrop, setSimCrop] = useState<'avellano' | 'vid' | 'pradera'>('avellano');
  const [simSoilType, setSimSoilType] = useState<'arcilloso' | 'limoso' | 'arenoso'>('arcilloso');

  // Presets técnicos basados en eventos de campo documentados
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
      setSimCrop('avellano');
      setSimSoilType('arcilloso');
      setSimSoilMoisture(17);
    } else if (preset === 'saturation') {
      setSimTemp(14.5);
      setSimWindSpeed('breeze');
      setSimCrop('avellano');
      setSimSoilType('arcilloso');
      setSimSoilMoisture(44);
    }
  };

  // ─── CÁLCULO DETERMINISTA EN TIEMPO REAL (FAO-56 & VAN GENUCHTEN) ────────
  const sim = useMemo(() => {
    const kcMap = { avellano: 0.85, vid: 0.65, pradera: 0.95 };
    const kc = kcMap[simCrop];

    const windSpeedMs = simWindSpeed === 'calm' ? 0.8 : simWindSpeed === 'breeze' ? 2.4 : 6.8;

    let soilLabel = lang === 'en' ? 'Clay-Loam (Parral Series)' : 'Franco-Arcilloso (Serie Parral)';
    let cc = 36;
    let pmp = 18;
    if (simSoilType === 'limoso') {
      soilLabel = lang === 'en' ? 'Silt-Loam (Alluvial Riverbank)' : 'Franco-Limoso (Ribera Aluvial)';
      cc = 30;
      pmp = 12;
    } else if (simSoilType === 'arenoso') {
      soilLabel = lang === 'en' ? 'Sandy-Loam (Colluvial Foothill)' : 'Franco-Arenoso (Piedemonte Coluvial)';
      cc = 22;
      pmp = 8;
    }

    const cropName = simCrop === 'avellano' 
      ? (lang === 'en' ? 'European Hazelnut (Corylus avellana cv. Tonda)' : 'Avellano Europeo (Corylus avellana cv. Tonda)')
      : simCrop === 'vid' 
      ? (lang === 'en' ? 'Wine Grape (Vitis vinifera cv. Carménère)' : 'Vid Vinífera (Vitis vinifera cv. Carménère)')
      : (lang === 'en' ? 'Permanent Pasture (Lolium perenne)' : 'Pradera Permanente (Lolium perenne)');

    const tempFactor = Math.max(0.1, (simTemp + 5) / 25);
    const windFactor = 1 + (windSpeedMs * 0.12);
    const et0 = Math.max(0.4, (2.8 * tempFactor * windFactor));
    const etc = (et0 * kc).toFixed(2);

    const es = 0.6108 * Math.exp((17.27 * Math.max(0, simTemp)) / (Math.max(0, simTemp) + 237.3));
    const ea = es * (simWindSpeed === 'puelche' ? 0.32 : 0.72);
    const vpd = Math.max(0.05, es - ea).toFixed(2);

    const layer1 = simSoilMoisture;
    const layer2 = Math.min(48, Math.max(10, Math.round(simSoilMoisture * 0.92)));
    const layer3 = Math.min(45, Math.max(12, Math.round(simSoilMoisture * 0.85)));

    let frostStatus: 'none' | 'warning' | 'critical' | 'heat_stress' = 'none';
    let frostMsg = lang === 'en'
      ? `Atmospheric boundary layer stable. Vertical thermal gradient normal (+${(simTemp - 1.2).toFixed(1)}°C dew point).`
      : `Capa límite atmosférica estable. Gradiente térmico vertical normal (punto de rocío en +${(simTemp - 1.2).toFixed(1)}°C).`;

    if (simTemp <= 0 && simWindSpeed === 'calm') {
      frostStatus = 'critical';
      frostMsg = lang === 'en'
        ? `CRITICAL NOCTURNAL RADIATION FROST (-${Math.abs(simTemp)}°C). Strong ground thermal inversion. Cold air accumulation in lower swales. Immediate activation of wind machines / sprinkler towers recommended.`
        : `HELADA CATABÁTICA CRÍTICA (-${Math.abs(simTemp)}°C). Fuerte inversión térmica superficial. Acumulación de aire frío en bajos de vaguada. Activación inmediata de torres de viento o aspersión recomendada.`;
    } else if (simTemp <= 2.5 && simWindSpeed === 'calm') {
      frostStatus = 'warning';
      frostMsg = lang === 'en'
        ? `KATABATIC PRE-ALERT: Active laminar drainage (${simTemp}°C, u2 < 1 m/s). Radiative cooling advancing toward valley floor with 4-hour lead time.`
        : `PRE-ALERTA CATABÁTICA: Drenaje laminar activo (${simTemp}°C, u2 < 1 m/s). Enfriamiento radiativo avanzando hacia fondos de cuenca con 4 horas de margen.`;
    } else if (simTemp >= 32) {
      frostStatus = 'heat_stress';
      frostMsg = lang === 'en'
        ? `EXTREME FOEHN HEAT STRESS: High VPD (${vpd} kPa, ${simTemp}°C). Severe stomatal closure in progress. Transpiration halted; canopy misting or pulse irrigation advised.`
        : `ESTRÉS TÉRMICO EXTREMO (PUELCHE): VPD elevado (${vpd} kPa, ${simTemp}°C). Cierre estomático severo en curso. Transpiración bloqueada; se aconseja riego de pulso o enfriamiento de copa.`;
    }

    let waterStatus: 'deficit' | 'optimal' | 'saturation' = 'optimal';
    let waterMsg = lang === 'en'
      ? `Optimal root hydration in Horizon B (${layer2}% vol). Matric potential balanced between -33 kPa and -100 kPa.`
      : `Hidratación radicular óptima en Horizonte B (${layer2}% vol). Potencial matricial balanceado entre -33 kPa y -100 kPa.`;

    if (layer1 < pmp + 4) {
      waterStatus = 'deficit';
      waterMsg = lang === 'en'
        ? `ROOT WATER DEFICIT: Horizon A below refill point. Cumulative deficit requires immediate replenishment of 0-60 cm root zone.`
        : `DÉFICIT HÍDRICO EN RAÍZ: Horizonte A bajo umbral de recarga. El balance acumulado exige reposición de la zona radicular (0-60 cm).`;
    } else if (layer1 > cc + 4) {
      waterStatus = 'saturation';
      waterMsg = lang === 'en'
        ? `HYPOXIA RISK (ROOT ASPHYXIA): Soil moisture exceeds Field Capacity (${cc}% vol). Pumping shutdown commanded to avoid anaerobic root rot and save electricity.`
        : `RIESGO DE HIPOXIA / ASFIXIA RADICULAR: Humedad excede Capacidad de Campo (${cc}% vol). Corte de bombeo indicado para prevenir pudrición anaeróbica y ahorrar energía.`;
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

  // Formulario de contacto / Demo request
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    phone: '',
    interest: 'Commercial Fruit Orchard Digital Twin'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const msg = `AgriTwin Technical Demo Request:%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Institution/Company:* ${encodeURIComponent(formData.institution)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Project Scope:* ${encodeURIComponent(formData.interest)}`;
    window.open(`https://wa.me/56976696142?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#07111B] text-slate-100 font-sans relative selection:bg-[#FF5A36] selection:text-white">
      
      {/* ─── RETÍCULA DE FONDO MILIMÉTRICA TWILIGHT CON RESPLANDOR ATMOSFÉRICO ── */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #2DD4BF 1px, transparent 1px), linear-gradient(to bottom, #2DD4BF 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="fixed top-0 right-1/4 w-[750px] h-[380px] bg-[#FF5A36]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="fixed top-1/2 left-5 w-[650px] h-[350px] bg-[#2DD4BF]/8 blur-[150px] pointer-events-none rounded-full" />
      <div className="fixed bottom-10 right-10 w-[550px] h-[300px] bg-[#FB7185]/8 blur-[130px] pointer-events-none rounded-full" />

      {/* ─── 0. CABECERA EJECUTIVA UNIFICADA EN PALETA THERMAL TWILIGHT ───────── */}
      <header className="sticky top-0 z-50 bg-[#07111B]/95 backdrop-blur-md border-b border-[#1A314A] py-3.5 px-4 lg:px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Volver al Portal */}
          <div className="flex items-center gap-3">
            {onNavigate ? (
              <button 
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0E1E30] hover:bg-[#162C46] border border-[#23456B] text-slate-300 hover:text-white text-xs font-mono transition-all"
                title="Volver al Portal AgroTech"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span className="hidden sm:inline">AgroTech</span>
              </button>
            ) : (
              <a 
                href="https://danisantanderurrutia-coder.github.io/agrotech/"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0E1E30] hover:bg-[#162C46] border border-[#23456B] text-slate-300 hover:text-white text-xs font-mono transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#2DD4BF]" />
                <span className="hidden sm:inline">AgroTech</span>
              </a>
            )}

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0E1E30] border border-[#FF5A36]/60 flex items-center justify-center p-1 shadow-[0_0_12px_rgba(255,90,54,0.3)]">
                <img src="./logo-peumo-quantum.jpg" alt="AgriTwin Emblem" className="w-full h-full object-contain rounded" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base tracking-wider text-white font-mono">
                    AGRITWIN<span className="text-[#FF5A36]">.OS</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#092226] border border-[#2DD4BF]/50 text-[#2DD4BF] font-mono font-bold hidden md:inline">
                    v2.6.4 LIVING LAB
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono hidden lg:block">
                  Maule South Observatory [35°58'48"S, 71°45'00"W]
                </p>
              </div>
            </div>
          </div>

          {/* Navegación por Secciones Técnicas */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-mono">
            <a href="#dossier" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
              {lang === 'en' ? '01. Executive Brief' : '01. Memoria Técnica'}
            </a>
            <a href="#casos" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
              {lang === 'en' ? '02. Field Cases' : '02. Casos de Campo'}
            </a>
            <a href="#sandbox" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
              {lang === 'en' ? '03. Physics Engine' : '03. Motor Físico'}
            </a>
            <a href="#especificaciones" className="text-slate-300 hover:text-[#2DD4BF] transition-colors">
              {lang === 'en' ? '04. Data Architecture' : '04. Arquitectura'}
            </a>
          </nav>

          {/* Selector de Idioma & CTA Primario */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#0B1726] rounded-xl border border-[#1F3A5A] p-0.5 text-xs font-mono font-bold">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  lang === 'en' ? 'bg-[#FF5A36] text-white shadow-[0_0_10px_rgba(255,90,54,0.4)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('es')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  lang === 'es' ? 'bg-[#FF5A36] text-white shadow-[0_0_10px_rgba(255,90,54,0.4)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                ES
              </button>
            </div>

            {/* Botón Principal Coral Magma */}
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#FF5A36] hover:bg-[#FF6E4A] text-white font-bold text-xs font-mono transition-all shadow-[0_0_20px_rgba(255,90,54,0.4)] hover:shadow-[0_0_30px_rgba(255,90,54,0.65)] active:scale-[0.98] cursor-pointer"
            >
              {lang === 'en' ? 'Schedule Demo' : 'Agendar Demo'}
            </button>
          </div>

        </div>
      </header>

      {/* ─── 1. DOSSIER HERO: MEMORIA TÉCNICA EDITORIAL ──────────────────────── */}
      <section id="dossier" className="relative pt-16 pb-20 border-b border-[#1A314A] bg-gradient-to-b from-[#050D15] via-[#091522] to-[#0D1E30] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 space-y-8">
          
          {/* Eyebrow de Documento Técnico */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-[#0E2034] border border-[#2DD4BF]/60 text-[#2DD4BF] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(45,212,191,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" />
              {lang === 'en' ? 'OPERATIONAL BIOPHYSICAL DOSSIER' : 'MEMORIA TÉCNICA OPERACIONAL'}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">
              {lang === 'en' ? 'Target: Maule South Watershed & Parral Commercial Orchard' : 'Área: Cuenca Maule Sur & Huerto Comercial Parral'}
            </span>
          </div>

          {/* Gran Título Editorial */}
          <div className="space-y-6 max-w-5xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {lang === 'en' ? (
                <>From Watershed Hydrology to <span className="text-[#FF5A36] underline decoration-[#FF5A36]/40 underline-offset-8">3D Root Architecture</span>: A Deterministic Twin.</>
              ) : (
                <>De la Hidrología de Cuenca a la <span className="text-[#FF5A36] underline decoration-[#FF5A36]/40 underline-offset-8">Física Radicular 3D</span>: Un Gemelo Determinista.</>
              )}
            </h1>
            
            {/* Párrafo Narrativo Técnico (Cero AI-speak) */}
            <p className="text-base sm:text-lg text-slate-300 font-serif leading-relaxed max-w-4xl">
              {lang === 'en' ? (
                'Conventional agricultural monitoring is severed into two blind extremes: satellite vegetation indexes with 5-day latency detached from soil moisture, and scattered IoT sensors that ignore watershed hydrology. AgriTwin resolves this physical discontinuity by coupling 122,000 hectares of ALOS PALSAR topography, Canadian FWI wildfire propagation, and DGA river telemetry directly into millimetric 3D canopy thermodynamics and three-layer vadose zone physics.'
              ) : (
                'La modelación agrícola convencional está fracturada en dos extremos ciegos: índices satelitales con 5 días de latencia desconectados del suelo, y sensores aislados que ignoran la dinámica hidrológica de la cuenca. AgriTwin resuelve esta discontinuidad física al acoplar 122.000 hectáreas de topografía ALOS PALSAR, propagación de incendios FWI y caudales DGA directamente con la termodinámica 3D del dosel y el transporte de agua en la zona vadosa tri-estrato.'
              )}
            </p>
          </div>

          {/* Botones Principales con Colores Vivos de la Paleta */}
          <div className="flex flex-wrap items-center gap-4 pt-3 font-mono text-xs">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF5A36] hover:bg-[#FF6E4A] text-white font-bold transition-all shadow-[0_4px_25px_rgba(255,90,54,0.45)] hover:shadow-[0_6px_35px_rgba(255,90,54,0.65)] active:scale-[0.98] cursor-pointer"
            >
              <span>{lang === 'en' ? 'Request Pilot Calibration for Your Property' : 'Solicitar Calibración en tu Predio'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <a
              href="#casos"
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#092226] hover:bg-[#0E3238] border-2 border-[#2DD4BF] text-[#2DD4BF] hover:text-white font-bold transition-all shadow-[0_0_15px_rgba(45,212,191,0.25)]"
            >
              <span>{lang === 'en' ? 'Review Field Screen Captures &darr;' : 'Examinar Capturas del Sistema &darr;'}</span>
            </a>

            <a
              href="#sandbox"
              className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-[#0F1E30] hover:bg-[#162B44] border border-[#23456B] text-slate-200 font-semibold transition-all"
            >
              <Sliders className="w-4 h-4 text-[#FF5A36]" />
              <span>{lang === 'en' ? 'Interactive FAO-56 Simulator' : 'Simulador FAO-56 Interactivo'}</span>
            </a>
          </div>

          {/* Cinta de Validación Numérica Real de Campo */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#0B1726] border border-[#1F3A5A] space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block tracking-wider">
                {lang === 'en' ? 'Watershed Domain' : 'Dominio de Cuenca'}
              </span>
              <div className="text-2xl font-bold text-white">122,000 ha</div>
              <p className="text-[11px] text-[#2DD4BF] font-sans">
                {lang === 'en' ? 'Maule South Digital Elevation Grid' : 'Malla de Elevación Digital Maule Sur'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1726] border border-[#1F3A5A] space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block tracking-wider">
                {lang === 'en' ? 'Soil Empirical Proof' : 'Calibración en Suelo'}
              </span>
              <div className="text-2xl font-bold text-[#2DD4BF]">R² = 0.942</div>
              <p className="text-[11px] text-slate-300 font-sans">
                {lang === 'en' ? 'Shelby core samples vs. 3-depth FDR' : 'Muestras Shelby vs. sondas FDR tri-estrato'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1726] border border-[#1F3A5A] space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block tracking-wider">
                {lang === 'en' ? 'Katabatic Warning' : 'Alerta Catabática'}
              </span>
              <div className="text-2xl font-bold text-[#FB7185]">4 Hours Ahead</div>
              <p className="text-[11px] text-slate-300 font-sans">
                {lang === 'en' ? 'Thermodynamic inversion forecast' : 'Inversión térmica antes de -1.8°C crítico'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1726] border border-[#1F3A5A] space-y-1">
              <span className="text-slate-400 text-[10px] uppercase block tracking-wider">
                {lang === 'en' ? 'Energy Optimization' : 'Optimización de Bombeo'}
              </span>
              <div className="text-2xl font-bold text-[#FF5A36]">-32.4% kWh</div>
              <p className="text-[11px] text-slate-300 font-sans">
                {lang === 'en' ? 'Eliminating over-irrigation anoxia' : 'Eliminando anoxia por sobreriego'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 2. CASOS DE CAMPO: RECORRIDO CON PANTALLAZOS DE LA APP REAL ──────── */}
      <section id="casos" className="py-20 border-b border-[#1A314A] bg-[#07111B] space-y-24">
        
        {/* Caso 1: Escala Cuenca - Propagación de Incendios y Red Hídrica */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1A314A] pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5A36] uppercase tracking-wider">
                <Flame className="w-4 h-4 text-[#FF5A36]" />
                <span>{lang === 'en' ? 'CASE STUDY 01 • MACRO SCALE (122,000 HA)' : 'CASO OPERATIVO 01 • ESCALA MACRO (122.000 HA)'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                {lang === 'en' ? 'Watershed Hydrology & FWI Fire Spread Hindcast' : 'Hidrología de Cuenca & Propagación de Fuego FWI'}
              </h2>
              <p className="text-slate-300 text-sm font-serif">
                {lang === 'en' 
                  ? 'Real-time assimilation of Longaví and Perquilauquén river gauges, piezometric levels across 32 rural drinking water wells (APR), and fire perimeter spread modeling under easterly Puelche foehn winds.'
                  : 'Asimilación continua de estaciones fluviométricas DGA (ríos Longaví y Perquilauquén), piezometría de 32 pozos APR comunitarios y modelación perimetral de incendios forestales bajo viento Puelche.'
                }
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-[#0E1E30] border border-[#FF5A36]/50 text-[#FF5A36] font-bold">
                {lang === 'en' ? 'Canadian FWI Grid' : 'Malla FWI Canadiense'}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#0E1E30] border border-[#2DD4BF]/50 text-[#2DD4BF] font-bold">
                {lang === 'en' ? 'DEM: 12.5m ALOS' : 'DEM: 12.5m ALOS'}
              </span>
            </div>
          </div>

          {/* Screenshot de Incendios en Contenedor Twilight */}
          <div className="rounded-3xl bg-[#0A1624] border-2 border-[#FF5A36]/50 p-4 sm:p-6 shadow-[0_15px_50px_rgba(7,17,27,0.9)] space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#1A314A] pb-3 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FB7185] inline-block shadow-[0_0_6px_rgba(251,113,133,0.8)]" />
                  <span className="w-3 h-3 rounded-full bg-[#FF5A36] inline-block shadow-[0_0_6px_rgba(255,90,54,0.8)]" />
                  <span className="w-3 h-3 rounded-full bg-[#2DD4BF] inline-block shadow-[0_0_6px_rgba(45,212,191,0.8)]" />
                </div>
                <span className="text-slate-400 ml-2">agritwin://watershed/wildfire-fwi-spread-model</span>
              </div>
              <span className="text-[#FF5A36] font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#FF5A36]" />
                {lang === 'en' ? 'LIVE APP SCREENSHOT' : 'PANTALLAZO OPERATIVO EN VIVO'}
              </span>
            </div>

            <div 
              onClick={() => setLightboxImage({
                src: './assets/app_screens/cuenca_wildfire_simulation.jpg',
                title: lang === 'en' ? 'Wildfire Spread & Plume Prediction' : 'Predicción y Propagación de Incendio Forestal',
                desc: lang === 'en' ? 'Real simulation of fire perimeter, smoke plume, wind vectors, and Keyline slowdown barriers.' : 'Simulación real de perímetro de fuego, pluma de humo, vectores de viento y desaceleración en Keyline.'
              })}
              className="rounded-2xl overflow-hidden border border-[#FF5A36]/40 relative h-[380px] sm:h-[480px] bg-black cursor-pointer group"
            >
              <img 
                src="./assets/app_screens/cuenca_wildfire_simulation.jpg" 
                alt="AgriTwin Wildfire Spread Tool" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050D15]/95 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#FF5A36] font-bold block">
                    {lang === 'en' ? '● FWI Fire Propagation & Keyline Slowdown' : '● Propagación FWI & Amortiguación por Keyline'}
                  </span>
                  <p className="text-xs text-slate-300 font-serif max-w-2xl">
                    {lang === 'en' 
                      ? 'Actual AgriTwin screen modeling flame advance vectors under 24.5 km/h Puelche winds, showing vegetative barrier slowdown.'
                      : 'Captura real de AgriTwin modelando vectores de avance del frente de fuego bajo viento Puelche de 24.5 km/h y desaceleración en cortafuegos.'
                    }
                  </p>
                </div>
                <span className="pointer-events-none px-3 py-1.5 rounded-lg bg-[#07111B]/80 border border-[#FF5A36]/50 text-[#FF5A36] text-xs font-mono flex items-center gap-1.5 backdrop-blur-md">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Enlarge' : 'Ampliar'}</span>
                </span>
              </div>
            </div>

            {/* Cintas de Métricas con Colores Vivos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-[#0E1E30] border border-[#FF5A36]/40">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Fire Weather Index (FWI)' : 'Índice FWI de Incendio'}</span>
                <span className="text-[#FF5A36] font-bold text-sm">{lang === 'en' ? 'Extreme (FWI > 38)' : 'Extremo (FWI > 38)'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E1E30] border border-[#FF5A36]/40">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Puelche Wind Acceleration' : 'Aceleración Viento Puelche'}</span>
                <span className="text-orange-300 font-bold text-sm">24.5 km/h E-SE (HR &lt; 18%)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E1E30] border border-[#2DD4BF]/40">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Buffer Slowdown Ratio' : 'Desaceleración por Cortafuegos'}</span>
                <span className="text-[#2DD4BF] font-bold text-sm">{lang === 'en' ? '-58% Spread Rate' : '-58% Tasa de Avance'}</span>
              </div>
            </div>

          </div>

          {/* Notas de Ingeniería de Campo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-4 rounded-xl bg-[#0B1726] border border-[#1F3A5A] space-y-1.5">
              <h4 className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-[#2DD4BF]" />
                {lang === 'en' ? 'DGA Hydrometric Coupling' : 'Acoplamiento Fluviométrico DGA'}
              </h4>
              <p className="text-slate-300 font-serif leading-relaxed">
                {lang === 'en' 
                  ? 'Continuous integration with official stream gauges on Longaví and Perquilauquén rivers for irrigation water entitlement management.'
                  : 'Integración continua de telemetría de caudales con estaciones oficiales DGA en ríos Longaví y Perquilauquén para gestión de turnos.'
                }
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1726] border border-[#1F3A5A] space-y-1.5">
              <h4 className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-[#2DD4BF]" />
                {lang === 'en' ? '32 Rural APR Wells' : '32 Pozos APR Comunitarios'}
              </h4>
              <p className="text-slate-300 font-serif leading-relaxed">
                {lang === 'en' 
                  ? 'Dynamic piezometric head tracking across rural drinking water committees to anticipate summer aquifer drawdown.'
                  : 'Monitoreo de niveles freáticos en 32 comités de agua potable rural para predecir con anticipación el abatimiento estival.'
                }
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1726] border border-[#1F3A5A] space-y-1.5">
              <h4 className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#FF5A36]" />
                {lang === 'en' ? 'Topographic Wind Vectoring' : 'Vectores de Viento Topográfico'}
              </h4>
              <p className="text-slate-300 font-serif leading-relaxed">
                {lang === 'en' 
                  ? 'Numerical modeling of down-valley Foehn acceleration that triggers flash-dry soil events and catastrophic fire spread.'
                  : 'Modelación numérica de aceleración catabática del Puelche que detona desecamiento súbito del suelo y riesgo de incendio.'
                }
              </p>
            </div>
          </div>

        </div>

        {/* Caso 2: Escala Predio - Casa Tudor y Panel de Clima 7 Días */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1A314A] pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FB7185] uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#FB7185]" />
                <span>{lang === 'en' ? 'CASE STUDY 02 • MICRO SCALE (24.8 HA)' : 'CASO OPERATIVO 02 • ESCALA MICRO (24.8 HA)'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                {lang === 'en' ? '3D Property Twin & 7-Day Microclimate Drawer' : 'Gemelo 3D de Predio & Cajón Microclimático 7 Días'}
              </h2>
              <p className="text-slate-300 text-sm font-serif">
                {lang === 'en' 
                  ? 'High-resolution WebGL 3D architectural and parcel reconstruction of Fundo Meniel, featuring real-time lateral weather drawers, 7-day hourly forecasting, and nocturnal thermal inversion warnings.'
                  : 'Reconstrucción 3D WebGL de arquitectura y parcelas de Fundo Meniel, con panel lateral agrometeorológico en vivo, pronóstico horario a 7 días y alertas de inversión térmica.'
                }
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-[#0E1E30] border border-[#FB7185]/50 text-[#FB7185] font-bold">
                {lang === 'en' ? 'Engine: Three.js PBR' : 'Motor: Three.js PBR'}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#0E1E30] border border-[#2DD4BF]/50 text-[#2DD4BF] font-bold">
                {lang === 'en' ? 'Plot: 24.8 Hectares' : 'Predio: 24.8 Hectáreas'}
              </span>
            </div>
          </div>

          {/* Screenshot de Casa Tudor + Cajón Lateral */}
          <div className="rounded-3xl bg-[#0A1624] border-2 border-[#FB7185]/40 p-4 sm:p-6 shadow-[0_15px_50px_rgba(7,17,27,0.9)] space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#1A314A] pb-3 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FB7185] inline-block shadow-[0_0_6px_rgba(251,113,133,0.8)]" />
                  <span className="w-3 h-3 rounded-full bg-[#FF5A36] inline-block shadow-[0_0_6px_rgba(255,90,54,0.8)]" />
                  <span className="w-3 h-3 rounded-full bg-[#2DD4BF] inline-block shadow-[0_0_6px_rgba(45,212,191,0.8)]" />
                </div>
                <span className="text-slate-400 ml-2">agritwin://property/fundo-meniel/house-weather-telemetry</span>
              </div>
              <span className="text-[#FB7185] font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#FB7185]" />
                {lang === 'en' ? 'LIVE APP SCREENSHOT' : 'PANTALLAZO OPERATIVO EN VIVO'}
              </span>
            </div>

            <div 
              onClick={() => setLightboxImage({
                src: './assets/app_screens/predio_house_timeline.jpg',
                title: lang === 'en' ? 'Farmhouse Architecture & 7-Day Weather Panel' : 'Casa Principal y Panel Agrometeorológico 7 Días',
                desc: lang === 'en' ? 'Three.js 3D view of the central farmhouse on the left, with the live diagnostic drawer open on the right displaying 7-day weather forecast, wind regimes, and nocturnal frost risk.' : 'Vista Three.js 3D de la casa principal a la izquierda, con el panel de diagnóstico lateral abierto a la derecha mostrando el pronóstico meteorológico a 7 días, regímenes de viento y riesgo de heladas.'
              })}
              className="rounded-2xl overflow-hidden border border-[#FB7185]/40 relative h-[380px] sm:h-[500px] bg-black cursor-pointer group"
            >
              <img 
                src="./assets/app_screens/predio_house_timeline.jpg" 
                alt="AgriTwin Farmhouse and Live Weather Panel" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050D15]/95 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#FB7185] font-bold block">
                    {lang === 'en' ? '● Farmhouse & Lateral Agrometeorological Drawer' : '● Casa Principal & Cajón Lateral Agrometeorológico'}
                  </span>
                  <p className="text-xs text-slate-300 font-serif max-w-2xl">
                    {lang === 'en' 
                      ? 'Live screenshot of AgriTwin 3D: central farmhouse on the left, and operational weather drawer on the right showing thermal wind dynamics and 7-day projections.'
                      : 'Captura en vivo de AgriTwin 3D: casa principal a la izquierda, y el panel operativo del tiempo a la derecha mostrando vientos térmicos y proyecciones a 7 días.'
                    }
                  </p>
                </div>
                <span className="pointer-events-none px-3 py-1.5 rounded-lg bg-[#07111B]/80 border border-[#FB7185]/50 text-[#FB7185] text-xs font-mono flex items-center gap-1.5 backdrop-blur-md">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Enlarge' : 'Ampliar'}</span>
                </span>
              </div>
            </div>

            {/* Cintas de Métricas con Colores Vivos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-[#0E1E30] border border-[#2DD4BF]/40">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Local Weather Station' : 'Estación Agrometeorológica Local'}</span>
                <span className="text-[#2DD4BF] font-bold text-sm">Meniel (Lat -36.14°S, Lon -71.60°W)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E1E30] border border-[#FF5A36]/40">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Coastal Thermal Wind (SSW)' : 'Viento Térmico Costero (SSW)'}</span>
                <span className="text-orange-300 font-bold text-sm">16.5 km/h Pelluhue</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E1E30] border border-[#FB7185]/40">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Nocturnal Thermal Inversion' : 'Inversión Térmica Nocturna'}</span>
                <span className="text-[#FB7185] font-bold text-sm">{lang === 'en' ? 'Superficial Katabatic Drain' : 'Drenaje Catabático Superficial'}</span>
              </div>
            </div>

          </div>

          {/* Notas de Ingeniería de Campo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-4 rounded-xl bg-[#0B1726] border border-[#1F3A5A] space-y-1.5">
              <h4 className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#2DD4BF]" />
                {lang === 'en' ? 'Sub-Meter DEM Topography' : 'Topografía DEM Submétrica'}
              </h4>
              <p className="text-slate-300 font-serif leading-relaxed">
                {lang === 'en' 
                  ? 'Centimetric elevation meshes that map slope vectors where cold air drains into micro-depressions at 04:30 AM.'
                  : 'Mallas de elevación centimétricas que mapean vectores de pendiente donde drena el aire frío hacia depresiones a las 04:30 AM.'
                }
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1726] border border-[#1F3A5A] space-y-1.5">
              <h4 className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FB7185]" />
                {lang === 'en' ? '4-Hour Lead Frost Defense' : 'Pre-Alerta de Helada con 4 Horas'}
              </h4>
              <p className="text-slate-300 font-serif leading-relaxed">
                {lang === 'en' 
                  ? 'Thermodynamic alerts triggered before temperatures cross the lethal bud threshold (-1.8°C), enabling timely wind machine ignition.'
                  : 'Alertas termodinámicas antes de que la temperatura cruce el umbral letal para yemas (-1.8°C), encendiendo torres a tiempo.'
                }
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1726] border border-[#1F3A5A] space-y-1.5">
              <h4 className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#2DD4BF]" />
                {lang === 'en' ? '7-Day Hourly Micro-Forecast' : 'Pronóstico Horario a 7 Días'}
              </h4>
              <p className="text-slate-300 font-serif leading-relaxed">
                {lang === 'en' 
                  ? 'Local downscaling of ECMWF/GFS models calibrated with the on-site weather station for precise spray windows.'
                  : 'Reducción de escala local de modelos ECMWF/GFS calibrada con la estación del fundo para ventanas de pulverización.'
                }
              </p>
            </div>
          </div>

        </div>

        {/* Caso 3: Escala Cuartel - Sensores FDR Tri-Estrato y Canopia */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1A314A] pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2DD4BF] uppercase tracking-wider">
                <Layers className="w-4 h-4 text-[#2DD4BF]" />
                <span>{lang === 'en' ? 'CASE STUDY 03 • VADOSE ZONE & CROP CANOPY' : 'CASO OPERATIVO 03 • ZONA VADOSA & DOSIS RADICULAR'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                {lang === 'en' ? 'In-Scene 3D HUDs & Tri-Horizon Soil Sensors' : 'Tarjetas HUD en Escena 3D & Sondas Tri-Estrato'}
              </h2>
              <p className="text-slate-300 text-sm font-serif">
                {lang === 'en' 
                  ? 'Interactive 3D billboard cards pinned directly over hazelnut crop parcels, displaying continuous FDR capacitance soil moisture across Horizon A (0-20cm), B (20-60cm), and C (60-100cm).'
                  : 'Tarjetas flotantes en la escena 3D sobre cuarteles de avellanos, desplegando humedad capacitiva FDR continua en tres profundidades: Horizonte A (0-20cm), B (20-60cm) y C (60-100cm).'
                }
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-[#0E1E30] border border-[#2DD4BF]/50 text-[#2DD4BF] font-bold">
                {lang === 'en' ? 'Mesh: LoRaWAN 915MHz' : 'Red: LoRaWAN 915MHz'}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#0E1E30] border border-[#FF5A36]/50 text-[#FF5A36] font-bold">
                {lang === 'en' ? 'Probes: Sentek 90cm' : 'Sondas: Sentek 90cm'}
              </span>
            </div>
          </div>

          {/* Screenshot de Cuarteles y Sensores */}
          <div className="rounded-3xl bg-[#0A1624] border-2 border-[#2DD4BF]/40 p-4 sm:p-6 shadow-[0_15px_50px_rgba(7,17,27,0.9)] space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#1A314A] pb-3 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FB7185] inline-block shadow-[0_0_6px_rgba(251,113,133,0.8)]" />
                  <span className="w-3 h-3 rounded-full bg-[#FF5A36] inline-block shadow-[0_0_6px_rgba(255,90,54,0.8)]" />
                  <span className="w-3 h-3 rounded-full bg-[#2DD4BF] inline-block shadow-[0_0_6px_rgba(45,212,191,0.8)]" />
                </div>
                <span className="text-slate-400 ml-2">agritwin://property/fundo-meniel/orchard-sensors-telemetry</span>
              </div>
              <span className="text-[#2DD4BF] font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#2DD4BF]" />
                {lang === 'en' ? 'LIVE APP SCREENSHOT' : 'PANTALLAZO OPERATIVO EN VIVO'}
              </span>
            </div>

            <div 
              onClick={() => setLightboxImage({
                src: './assets/app_screens/predio_crops_sensors.jpg',
                title: lang === 'en' ? 'Orchard Parcels & In-Field Sensor Network' : 'Cuarteles de Frutales y Red de Sensores en Campo',
                desc: lang === 'en' ? 'Three.js 3D view of hazelnut and cherry crop parcels with in-field 3D HUD billboard telemetry, and the live sensor drawer displaying multi-depth FDR soil moisture, temperature, and battery health.' : 'Vista Three.js 3D de cuarteles de avellanos y cerezos con tarjetas HUD flotantes en escena y panel lateral desplegando telemetría de humedad FDR a 3 profundidades, temperatura y batería.'
              })}
              className="rounded-2xl overflow-hidden border border-[#2DD4BF]/40 relative h-[380px] sm:h-[500px] bg-black cursor-pointer group"
            >
              <img 
                src="./assets/app_screens/predio_crops_sensors.jpg" 
                alt="AgriTwin Crops and Live Sensor Telemetry" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050D15]/95 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#2DD4BF] font-bold block">
                    {lang === 'en' ? '● Fruit Canopy & Multi-Horizon FDR Probes' : '● Canopia Frutal & Sondas FDR Tri-Estrato'}
                  </span>
                  <p className="text-xs text-slate-300 font-serif max-w-2xl">
                    {lang === 'en' 
                      ? 'Live screenshot of crop parcels with active in-field telemetry billboards and lateral drawer tracking continuous root zone hydration (0-20, 20-60, 60-100cm).'
                      : 'Captura en vivo de cuarteles agrícolas con tarjetas de telemetría flotantes y cajón lateral con seguimiento continuo de hidratación radicular (0-20, 20-60, 60-100cm).'
                    }
                  </p>
                </div>
                <span className="pointer-events-none px-3 py-1.5 rounded-lg bg-[#07111B]/80 border border-[#2DD4BF]/50 text-[#2DD4BF] text-xs font-mono flex items-center gap-1.5 backdrop-blur-md">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Enlarge' : 'Ampliar'}</span>
                </span>
              </div>
            </div>

            {/* Cintas de Métricas con Colores Vivos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
              <div className="p-3.5 rounded-xl bg-[#0E1E30] border border-[#2DD4BF]/40">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Active Sensor Mesh' : 'Red de Sondas Activas'}</span>
                <span className="text-[#2DD4BF] font-bold text-sm">{lang === 'en' ? '19 Operational Stations' : '19 Nodos Operativos'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E1E30] border border-[#2DD4BF]/40">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Root Zone Hydration (20-60cm)' : 'Humedad Radicular (20-60cm)'}</span>
                <span className="text-cyan-300 font-bold text-sm">36.2% vol ({lang === 'en' ? 'Target Range' : 'Rango Óptimo'})</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E1E30] border border-[#FF5A36]/40">
                <span className="text-slate-400 text-[10px] block">{lang === 'en' ? 'Root Asphyxia Prevention' : 'Prevención de Asfixia Radicular'}</span>
                <span className="text-[#FF5A36] font-bold text-sm">{lang === 'en' ? '-32.4% Pumping Energy' : '-32.4% Gasto Eléctrico'}</span>
              </div>
            </div>

          </div>

          {/* Notas de Ingeniería de Campo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-4 rounded-xl bg-[#0B1726] border border-[#1F3A5A] space-y-1.5">
              <h4 className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#2DD4BF]" />
                {lang === 'en' ? 'Tri-Horizon Moisture Separation' : 'Separación Edafológica en 3 Estratos'}
              </h4>
              <p className="text-slate-300 font-serif leading-relaxed">
                {lang === 'en' 
                  ? 'Horizon A (0-20cm, direct evaporation), Horizon B (20-60cm, active hazelnut root zone), and Horizon C (60-100cm, deep percolation).'
                  : 'Horizonte A (0-20cm, evaporación directa), Horizonte B (20-60cm, bulbo radicular activo de avellano) y C (60-100cm, percolación profunda).'
                }
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1726] border border-[#1F3A5A] space-y-1.5">
              <h4 className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#FF5A36]" />
                {lang === 'en' ? 'Automated Cutoff on Saturation' : 'Corte Automático por Saturación'}
              </h4>
              <p className="text-slate-300 font-serif leading-relaxed">
                {lang === 'en' 
                  ? 'Commands irrigation valve shutdowns as soon as moisture reaches Field Capacity, stopping root hypoxia before Phytophthora outbreak.'
                  : 'Ordena el corte de turnos de riego apenas el suelo alcanza Capacidad de Campo, evitando hipoxia radicular y hongos fitopatógenos.'
                }
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1726] border border-[#1F3A5A] space-y-1.5">
              <h4 className="font-bold text-white font-mono text-xs flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#2DD4BF]" />
                {lang === 'en' ? 'True 3D Spatial Context' : 'Contexto Espacial 3D'}
              </h4>
              <p className="text-slate-300 font-serif leading-relaxed">
                {lang === 'en' 
                  ? 'Agronomists and farm managers inspect parcel metrics directly inside the 3D model without jumping across fragmented tabular spreadsheets.'
                  : 'Los administradores inspeccionan los cuarteles directamente en el modelo 3D sin perder tiempo en planillas Excel fragmentadas.'
                }
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* ─── 3. SIMULADOR BIOFÍSICO EN VIVO (SANDBOX PARAMÉTRICO SCADA) ──────── */}
      <section id="sandbox" className="py-20 border-b border-[#1A314A] bg-[#050D15]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-[#2DD4BF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#092226] border border-[#2DD4BF]/50">
              {lang === 'en' ? 'INTERACTIVE DETERMINISTIC SCADA CONSOLE' : 'CONSOLA INTERACTIVA DETERMINISTA SCADA'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {lang === 'en' ? 'Calibrate the FAO-56 & Vadose Zone Engine' : 'Calibra el Motor FAO-56 y Zona Vadosa'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-serif">
              {lang === 'en'
                ? 'Adjust physical air temperature, root hydration, and wind regimes to test instant deterministic response of Penman-Monteith ETc and katabatic frost detection.'
                : 'Ajusta la temperatura física, humedad radicular y viento para evaluar la respuesta determinista instantánea de la ecuación Penman-Monteith y detección de heladas.'
              }
            </p>
          </div>

          {/* Presets Rápidos */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 font-mono text-xs">
            <span className="text-slate-400 text-[11px] uppercase mr-2">{lang === 'en' ? 'Load Field Scenarios:' : 'Cargar Escenarios de Campo:'}</span>
            <button
              onClick={() => applyPreset('frost')}
              className="px-3.5 py-1.5 rounded-lg bg-[#2E0D18] hover:bg-[#3E1220] border border-[#FB7185]/70 text-[#FB7185] font-bold transition-all cursor-pointer shadow-[0_0_10px_rgba(251,113,133,0.2)]"
            >
              ❄️ {lang === 'en' ? 'Radiation Frost (-1.8°C)' : 'Helada Radiativa (-1.8°C)'}
            </button>
            <button
              onClick={() => applyPreset('heatwave')}
              className="px-3.5 py-1.5 rounded-lg bg-[#2E120A] hover:bg-[#3D1A10] border border-[#FF5A36]/70 text-[#FF5A36] font-bold transition-all cursor-pointer shadow-[0_0_10px_rgba(255,90,54,0.2)]"
            >
              🔥 {lang === 'en' ? 'Puelche Foehn Wind (35.2°C)' : 'Viento Puelche (35.2°C)'}
            </button>
            <button
              onClick={() => applyPreset('saturation')}
              className="px-3.5 py-1.5 rounded-lg bg-[#062424] hover:bg-[#0A3333] border border-[#2DD4BF]/70 text-[#2DD4BF] font-bold transition-all cursor-pointer shadow-[0_0_10px_rgba(45,212,191,0.2)]"
            >
              💧 {lang === 'en' ? 'Soil Anoxia Saturation (44%)' : 'Saturación y Anoxia (44%)'}
            </button>
          </div>

          {/* Consola de Control de Parámetros */}
          <div className="bg-[#0A1624] border-2 border-[#2DD4BF]/50 rounded-3xl p-6 sm:p-8 shadow-[0_15px_60px_rgba(7,17,27,0.9)] grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono text-xs">
            
            {/* Controles (Izquierda) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="flex justify-between items-center border-b border-[#1A314A] pb-2">
                <span className="font-bold text-[#FF5A36] uppercase">{lang === 'en' ? 'Input Variables' : 'Variables Físicas'}</span>
                <span className="text-[10px] text-[#2DD4BF]">FAO-56 PM & van Genuchten</span>
              </div>

              {/* Slider Temperatura */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center font-sans">
                  <span className="text-slate-300 text-xs">{lang === 'en' ? 'Air Temperature (Ta):' : 'Temperatura del Aire (Ta):'}</span>
                  <span className="font-mono font-bold text-orange-400 text-sm">{simTemp} °C</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="38"
                  step="0.2"
                  value={simTemp}
                  onChange={(e) => setSimTemp(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black/70 rounded-lg appearance-none cursor-pointer accent-[#FF5A36]"
                />
              </div>

              {/* Slider Humedad Horizonte A */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center font-sans">
                  <span className="text-slate-300 text-xs">{lang === 'en' ? 'Horizon A Soil Moisture (0-20cm):' : 'Humedad Horizonte A (0-20cm):'}</span>
                  <span className="font-mono font-bold text-[#2DD4BF] text-sm">{simSoilMoisture}% vol</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="50"
                  step="1"
                  value={simSoilMoisture}
                  onChange={(e) => setSimSoilMoisture(parseInt(e.target.value))}
                  className="w-full h-2 bg-black/70 rounded-lg appearance-none cursor-pointer accent-[#2DD4BF]"
                />
              </div>

              {/* Régimen de Viento */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-300 font-sans block">{lang === 'en' ? 'Wind Regime (u2 at 2m):' : 'Régimen de Viento (u2 a 2m):'}</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSimWindSpeed('calm')}
                    className={`py-2 px-2 rounded-lg text-center font-sans text-xs font-bold transition-all ${
                      simWindSpeed === 'calm' ? 'bg-[#FF5A36] text-white shadow-[0_0_12px_rgba(255,90,54,0.4)]' : 'bg-black/50 text-slate-400 border border-[#1A314A]'
                    }`}
                  >
                    {lang === 'en' ? 'Calm (<1m/s)' : 'Calma (<1m/s)'}
                  </button>
                  <button
                    onClick={() => setSimWindSpeed('breeze')}
                    className={`py-2 px-2 rounded-lg text-center font-sans text-xs font-bold transition-all ${
                      simWindSpeed === 'breeze' ? 'bg-[#FF5A36] text-white shadow-[0_0_12px_rgba(255,90,54,0.4)]' : 'bg-black/50 text-slate-400 border border-[#1A314A]'
                    }`}
                  >
                    {lang === 'en' ? 'Breeze (2.4m/s)' : 'Brisa (2.4m/s)'}
                  </button>
                  <button
                    onClick={() => setSimWindSpeed('puelche')}
                    className={`py-2 px-2 rounded-lg text-center font-sans text-xs font-bold transition-all ${
                      simWindSpeed === 'puelche' ? 'bg-gradient-to-r from-[#FF5A36] to-[#E11D48] text-white shadow-[0_0_15px_rgba(255,90,54,0.5)]' : 'bg-black/50 text-slate-400 border border-[#1A314A]'
                    }`}
                  >
                    {lang === 'en' ? 'Foehn (6.8m/s)' : 'Puelche (6.8m/s)'}
                  </button>
                </div>
              </div>

              {/* Selectores de Cultivo y Textura */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-sans text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">{lang === 'en' ? 'Target Crop Species:' : 'Especie Cultivada:'}</label>
                  <select
                    value={simCrop}
                    onChange={(e) => setSimCrop(e.target.value as any)}
                    className="w-full p-2 rounded-lg bg-black/70 border border-[#1F3A5A] text-white font-mono text-[11px] focus:outline-none focus:border-[#FF5A36]"
                  >
                    <option value="avellano">{lang === 'en' ? 'Hazelnut (Kc 0.85)' : 'Avellano (Kc 0.85)'}</option>
                    <option value="vid">{lang === 'en' ? 'Grapevine (Kc 0.65)' : 'Vid (Kc 0.65)'}</option>
                    <option value="pradera">{lang === 'en' ? 'Pasture (Kc 0.95)' : 'Pradera (Kc 0.95)'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">{lang === 'en' ? 'Soil Texture Profile:' : 'Textura de Suelo:'}</label>
                  <select
                    value={simSoilType}
                    onChange={(e) => setSimSoilType(e.target.value as any)}
                    className="w-full p-2 rounded-lg bg-black/70 border border-[#1F3A5A] text-white font-mono text-[11px] focus:outline-none focus:border-[#FF5A36]"
                  >
                    <option value="arcilloso">{lang === 'en' ? 'Clay-Loam' : 'Franco-Arcilloso'}</option>
                    <option value="limoso">{lang === 'en' ? 'Silt-Loam' : 'Franco-Limoso'}</option>
                    <option value="arenoso">{lang === 'en' ? 'Sandy-Loam' : 'Franco-Arenoso'}</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Salida Diagnóstica (Derecha) */}
            <div className="lg:col-span-7 space-y-4 bg-[#08101C] p-5 rounded-2xl border border-[#2DD4BF]/40 flex flex-col justify-between">
              
              <div className="space-y-3.5">
                <div className="flex justify-between items-center border-b border-[#1A314A] pb-2">
                  <span className="font-bold text-[#2DD4BF] uppercase">{lang === 'en' ? 'Deterministic Diagnostic' : 'Diagnóstico Determinista en Tiempo Real'}</span>
                  <span className="text-[10px] text-slate-400">VPD: <strong className="text-orange-400">{sim.vpd} kPa</strong></span>
                </div>

                {/* Tarjeta de Estado de Heladas / Microclima */}
                <div className={`p-4 rounded-xl border ${
                  sim.frostStatus === 'critical' ? 'bg-[#2E0D18] border-[#FB7185] text-rose-200' :
                  sim.frostStatus === 'warning' ? 'bg-[#2E120A] border-[#FF5A36] text-orange-200' :
                  sim.frostStatus === 'heat_stress' ? 'bg-[#2E120A] border-[#FF5A36] text-orange-200' :
                  'bg-[#062424] border-[#2DD4BF]/60 text-teal-200'
                }`}>
                  <div className="flex justify-between items-center font-bold text-xs uppercase mb-1">
                    <span>{lang === 'en' ? 'Atmospheric Boundary Layer' : 'Capa Límite Atmosférica'}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40">{sim.frostStatus.toUpperCase()}</span>
                  </div>
                  <p className="text-xs font-serif leading-relaxed">{sim.frostMsg}</p>
                </div>

                {/* Tarjeta de Estado Hídrico FAO-56 */}
                <div className={`p-4 rounded-xl border ${
                  sim.waterStatus === 'deficit' ? 'bg-[#2E120A] border-[#FF5A36] text-orange-200' :
                  sim.waterStatus === 'saturation' ? 'bg-[#0E2034] border-[#2DD4BF] text-cyan-200' :
                  'bg-[#062424] border-[#2DD4BF]/60 text-teal-200'
                }`}>
                  <div className="flex justify-between items-center font-bold text-xs mb-1">
                    <span>{lang === 'en' ? 'FAO-56 Water Balance' : 'Balance Hídrico FAO-56'}</span>
                    <span className="text-[#FF5A36] font-mono font-bold text-sm">ETc = {sim.etc} mm/day</span>
                  </div>
                  <p className="text-xs font-serif leading-relaxed">{sim.waterMsg}</p>
                </div>

                {/* Despliegue Gráfico de los 3 Horizontes */}
                <div className="space-y-2 pt-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-300">{lang === 'en' ? 'Horizon A (0-20cm, direct evaporation):' : 'Horizonte A (0-20cm, evaporación directa):'}</span>
                    <span className="text-[#2DD4BF] font-bold">{sim.layer1}% vol</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/70 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2DD4BF] to-teal-400" style={{ width: `${(sim.layer1 / 50) * 100}%` }} />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span className="text-slate-300">{lang === 'en' ? 'Horizon B (20-60cm, active root zone):' : 'Horizonte B (20-60cm, bulbo radicular activo):'}</span>
                    <span className="text-[#2DD4BF] font-bold">{sim.layer2}% vol</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/70 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-[#2DD4BF]" style={{ width: `${(sim.layer2 / 50) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Botones de Descarga de Datos y Calibración */}
              <div className="pt-4 border-t border-[#1A314A] flex flex-wrap justify-between items-center gap-3">
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
                  className="px-3.5 py-2 rounded-xl bg-[#0E1E30] hover:bg-[#162C46] border border-[#2DD4BF]/50 text-[#2DD4BF] text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-[#2DD4BF]" />
                  <span>{lang === 'en' ? 'Export Simulation JSON' : 'Exportar JSON de Simulación'}</span>
                </button>

                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#FF5A36] hover:bg-[#FF6E4A] text-white font-bold text-xs cursor-pointer shadow-[0_0_15px_rgba(255,90,54,0.35)] transition-all"
                >
                  {lang === 'en' ? 'Calibrate on Your Property' : 'Calibrar en tu Predio'}
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. ESPECIFICACIONES TÉCNICAS & ARQUITECTURA DE DATOS FAIR ────────── */}
      <section id="especificaciones" className="py-20 border-b border-[#1A314A] bg-[#07111B]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-[#2DD4BF] uppercase tracking-widest px-3 py-1 rounded-full bg-[#092226] border border-[#2DD4BF]/50">
              {lang === 'en' ? 'ENTERPRISE SYSTEM SPECIFICATIONS' : 'ESPECIFICACIONES TÉCNICAS DEL SISTEMA'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {lang === 'en' ? 'Deterministic Architecture & Open FAIR Pipeline' : 'Arquitectura Determinista & Principios de Datos FAIR'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-serif">
              {lang === 'en'
                ? 'From spaceborne multispectral constellations down to sub-GHz LoRaWAN telemetry and GPU WebGL client views.'
                : 'Desde constelaciones multiespectrales orbitales hasta telemetría LoRaWAN sub-GHz y visores WebGL acelerados por GPU.'
              }
            </p>
          </div>

          {/* Tabla de Especificaciones Técnicas */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-[#1A314A] rounded-2xl overflow-hidden bg-[#0A1624]">
              <thead className="bg-[#0E1E30] text-[#2DD4BF] border-b border-[#1A314A]">
                <tr>
                  <th className="py-3 px-4">{lang === 'en' ? 'Subsystem' : 'Subsistema'}</th>
                  <th className="py-3 px-4">{lang === 'en' ? 'Physics / Ingestion Standard' : 'Estándar Físico / Ingesta'}</th>
                  <th className="py-3 px-4">{lang === 'en' ? 'Temporal Resolution' : 'Resolución Temporal'}</th>
                  <th className="py-3 px-4">{lang === 'en' ? 'Spatial Coverage / Output' : 'Cobertura / Salida'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A314A] text-slate-300 font-sans">
                <tr className="hover:bg-[#0E1E30]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">Macro-Basin GIS</td>
                  <td className="py-3.5 px-4 font-serif">Copernicus Sentinel-2 L2A (10m) + DGA Stream Gauges</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-300">5-day optical / 15-min river telemetry</td>
                  <td className="py-3.5 px-4 font-serif">122,000 ha (Maule South Watershed)</td>
                </tr>
                <tr className="hover:bg-[#0E1E30]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">Fire Spread (FWI)</td>
                  <td className="py-3.5 px-4 font-serif">Canadian Forest Fire Weather Index + Keyline buffers</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-300">Hourly meteorological recalculation</td>
                  <td className="py-3.5 px-4 font-serif">Perimeter vector propagation grid</td>
                </tr>
                <tr className="hover:bg-[#0E1E30]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">3D Farm Twin</td>
                  <td className="py-3.5 px-4 font-serif">Three.js WebGL (PBR materials, sub-meter DEM)</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-300">60 FPS interactive client rendering</td>
                  <td className="py-3.5 px-4 font-serif">24.8 ha (Fundo Meniel cadastre)</td>
                </tr>
                <tr className="hover:bg-[#0E1E30]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">Vadose Zone Soil Probes</td>
                  <td className="py-3.5 px-4 font-serif">FDR Capacitance (Sentek 90cm) + van Genuchten curves</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-300">15-min LoRaWAN 915 MHz broadcast</td>
                  <td className="py-3.5 px-4 font-serif">3 Horizons: 0-20, 20-60, 60-100cm</td>
                </tr>
                <tr className="hover:bg-[#0E1E30]/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">Crop Water Balance</td>
                  <td className="py-3.5 px-4 font-serif">FAO-56 Penman-Monteith dual crop coefficient (Kc)</td>
                  <td className="py-3.5 px-4 font-mono text-cyan-300">Continuous daily accumulated balance</td>
                  <td className="py-3.5 px-4 font-serif">ETc in mm/day, matrix potential (kPa)</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ─── 5. LLAMADO FINAL A LA ACCIÓN & ONBOARDING EN 7 DÍAS ─────────────── */}
      <section id="contacto" className="py-20 bg-gradient-to-t from-[#04090F] to-[#0A1624] text-center border-t border-[#1A314A]">
        <div className="max-w-4xl mx-auto px-4 space-y-7">
          <span className="px-3 py-1 rounded-full bg-[#0E1E30] border border-[#2DD4BF]/50 text-[#2DD4BF] font-mono text-xs font-bold uppercase tracking-wider">
            {lang === 'en' ? 'ENTERPRISE ONBOARDING IN 7 BUSINESS DAYS' : 'IMPLEMENTACIÓN LLAVE EN MANO EN 7 DÍAS'}
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {lang === 'en' 
              ? 'Deploy AgriTwin Across Your Farm or Watershed' 
              : 'Despliega AgriTwin en tu Predio o Cuenca Hidrográfica'
            }
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-serif max-w-2xl mx-auto leading-relaxed">
            {lang === 'en'
              ? 'Our engineering team ingests your cadastral parcel boundaries, generates the 3D elevation mesh, connects local LoRaWAN sensors, and calibrates FAO-56 models without operational downtime.'
              : 'Nuestro equipo de ingeniería carga tus roles catastrales, genera la malla 3D de elevación, enlaza tus sensores LoRaWAN y calibra los modelos FAO-56 sin interrumpir tus labores de campo.'
            }
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 font-mono text-xs">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-8 py-4 rounded-xl bg-[#FF5A36] hover:bg-[#FF6E4A] text-white font-bold text-sm shadow-[0_4px_30px_rgba(255,90,54,0.5)] hover:shadow-[0_6px_40px_rgba(255,90,54,0.7)] active:scale-[0.98] cursor-pointer transition-all"
            >
              {lang === 'en' ? 'Schedule a 30-Minute Technical Demo' : 'Agendar Demostración Técnica (30 Min)'}
            </button>

            <a
              href="mailto:contacto@agrotechchile.cl?subject=AgriTwin%20Technical%20Consultation"
              className="px-6 py-4 rounded-xl bg-[#0E1E30] hover:bg-[#162C46] text-[#2DD4BF] border border-[#2DD4BF]/50 font-bold transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#FF5A36]" />
              <span>contacto@agrotechchile.cl</span>
            </a>
          </div>

          <div className="pt-4 text-[11px] font-mono text-slate-400 flex items-center justify-center gap-6">
            <span>Direct WhatsApp: +56 9 7669 6142</span>
            <span>•</span>
            <span>Maule Living Lab: Parral, Chile</span>
          </div>
        </div>
      </section>

      {/* ─── 6. PIE INSTITUCIONAL EN PALETA THERMAL TWILIGHT ──────────────────── */}
      <footer className="bg-[#050D15] border-t border-[#13283E] py-8 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">AgriTwin OS</span>
            <span>•</span>
            <span>AgroTech Chile SpA & Living Lab Maule Sur</span>
          </div>
          <div>
            <span>Talca & Parral, Chile 🇨🇱 / Freiburg, Germany 🇩🇪</span>
          </div>
        </div>
      </footer>

      {/* ─── MODAL DE DEMOSTRACIÓN & CONTACTO TÉCNICO ────────────────────────── */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0A1624] border-2 border-[#FF5A36]/60 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-white relative max-h-[90vh] overflow-y-auto font-sans">
            
            <button
              onClick={() => { setIsDemoModalOpen(false); setIsSubmitted(false); }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#FF5A36] font-bold">
                    {lang === 'en' ? 'DIRECT TECHNICAL DEMO' : 'ACCESO TÉCNICO DIRECTO'}
                  </span>
                  <h3 className="text-xl font-bold text-white font-mono">
                    {lang === 'en' ? 'Schedule Guided Property Demo' : 'Agendar Demostración con tu Predio'}
                  </h3>
                  <p className="text-xs text-slate-300 font-serif">
                    {lang === 'en' 
                      ? 'We will prepare a live 3D session configured with your property cadastral coordinates.'
                      : 'Prepararemos una sesión en vivo con los polígonos satelitales y curvas de nivel de tu predio.'
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
                      placeholder={lang === 'en' ? 'Dr. Andrew Walker' : 'Dr(a). Andrés Ovalle'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#1F3A5A] text-white focus:outline-none focus:border-[#FF5A36] font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">{lang === 'en' ? 'Company / University / Basin Authority *' : 'Empresa / Institución / Junta de Vigilancia *'}</label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder={lang === 'en' ? 'e.g. San Pedro Agribusiness / INIA / Water Board' : 'Ej. Agrícola San Pedro / INIA / Junta de Vigilancia'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#1F3A5A] text-white focus:outline-none focus:border-[#FF5A36] font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">{lang === 'en' ? 'Corporate or Institutional Email *' : 'Email Corporativo o Institucional *'}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={lang === 'en' ? 'investigator@company.com' : 'investigador@agricola.cl'}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#1F3A5A] text-white focus:outline-none focus:border-[#FF5A36] font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">{lang === 'en' ? 'Project Focus' : 'Enfoque del Proyecto'}</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#1F3A5A] text-white focus:outline-none focus:border-[#FF5A36] font-mono text-xs"
                    >
                      <option value="Commercial Fruit Orchard Digital Twin">{lang === 'en' ? 'Commercial Fruit Orchard 3D Twin' : 'Gemelo 3D de Huerto Frutal Comercial'}</option>
                      <option value="Territorial Basin GIS & Wildfire Model">{lang === 'en' ? 'Territorial Basin GIS & Wildfire Model' : 'GIS de Cuenca & Modelo de Incendios'}</option>
                      <option value="Water Board & APR Groundwater Monitoring">{lang === 'en' ? 'Water Board & APR Groundwater Monitoring' : 'Junta de Vigilancia & Pozos APR'}</option>
                      <option value="Katabatic Nocturnal Frost Warning">{lang === 'en' ? 'Katabatic Nocturnal Frost Warning' : 'Pre-Alerta de Heladas Catabáticas'}</option>
                      <option value="Research Grant Partnership (ANID / Horizon)">{lang === 'en' ? 'Research Grant Partnership (ANID / Horizon)' : 'Postulación a Fondos I+D (ANID / Horizon)'}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FF5A36] hover:bg-[#FF6E4A] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,90,54,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4 text-white" />
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
                <div className="w-14 h-14 rounded-full bg-[#062424] border border-[#2DD4BF] text-[#2DD4BF] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white font-mono">
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
                    className="px-5 py-2 rounded-xl bg-[#0E1E30] hover:bg-[#162C46] border border-[#2DD4BF]/50 text-[#2DD4BF] font-mono text-xs font-bold"
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
            className="max-w-5xl w-full bg-[#0A1624] border-2 border-[#FF5A36]/60 rounded-2xl overflow-hidden shadow-2xl space-y-3 p-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#1A314A] font-mono text-xs">
              <span className="text-[#FF5A36] font-bold">{lightboxImage.title}</span>
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
