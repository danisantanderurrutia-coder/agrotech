import React, { useState, useMemo } from 'react';
import { 
  Cpu, Layers, Satellite, ShieldCheck, Droplets, Flame, Wind, 
  Play, CheckCircle2, ArrowRight, ExternalLink, Calendar,
  BarChart3, Sparkles, Building2, Trees, Video,
  Compass, Eye, Check, X, Send, PhoneCall, HelpCircle,
  FileText, Activity, Radio, RefreshCw, AlertTriangle,
  Sliders, Gauge, ChevronRight, CheckCircle
} from 'lucide-react';

interface AgriTwinShowcasePageProps {
  onNavigate?: (viewId: string) => void;
}

export const AgriTwinShowcasePage: React.FC<AgriTwinShowcasePageProps> = ({ onNavigate }) => {
  const [activeGalleryTab, setActiveGalleryTab] = useState<number>(0);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeVideoClip, setActiveVideoClip] = useState<'3d' | 'frost' | 'basin'>('3d');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Pestaña activa del flujo "¿Cómo Funciona?"
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);

  // Parámetros reactivos del Simulador Biofísico en Vivo (Sandbox)
  const [simTemp, setSimTemp] = useState<number>(2.0); // °C (-3 a 38)
  const [simSoilMoisture, setSimSoilMoisture] = useState<number>(24); // % (10 a 50)
  const [simWindCalm, setSimWindCalm] = useState<boolean>(true); // Viento calmo (favorece inversión)
  const [simCrop, setSimCrop] = useState<'avellano' | 'vid' | 'pradera'>('avellano');

  // Cálculos dinámicos del Simulador Biofísico
  const simulationResults = useMemo(() => {
    // Coeficiente de cultivo Kc
    const kc = simCrop === 'avellano' ? 0.85 : simCrop === 'vid' ? 0.65 : 0.95;
    
    // Evapotranspiración de referencia Penman-Monteith simplificada ETo
    const et0 = Math.max(0.5, (simTemp * 0.18) + (simWindCalm ? 0.8 : 2.2));
    const etc = (et0 * kc).toFixed(1);

    // Humedad en 3 estratos
    const layer1 = Math.max(10, Math.min(50, simSoilMoisture)); // 0-20 cm
    const layer2 = Math.max(12, Math.min(48, Math.round(simSoilMoisture * 0.92 + 3))); // 20-60 cm
    const layer3 = Math.max(15, Math.min(45, Math.round(simSoilMoisture * 0.85 + 7))); // 60-100 cm

    // Diagnóstico de helada catabática
    let frostStatus: 'normal' | 'warning' | 'critical' = 'normal';
    let frostMessage = 'Condición microclimática estable. Sin riesgo de congelamiento.';
    if (simTemp <= 0 && simWindCalm) {
      frostStatus = 'critical';
      frostMessage = `¡HELADA CRÍTICA POR INVERSIÓN! Aire denso estancado a ${simTemp}°C. Alerta a aspersores o quema controlada perimetral.`;
    } else if (simTemp <= 2.5 && simWindCalm) {
      frostStatus = 'warning';
      frostMessage = `PRE-ALERTA: Drenaje catabático en curso (${simTemp}°C). Enfriamiento acelerado en fondos de quebrada.`;
    }

    // Dictamen de riego FAO-56
    let irrigationStatus: 'deficit' | 'optimal' | 'excess' = 'optimal';
    let irrigationAction = 'Capacidad de campo balanceada. Sin consumo eléctrico necesario.';
    let minutesToIrrigate = 0;

    if (layer1 < 21) {
      irrigationStatus = 'deficit';
      minutesToIrrigate = Math.round((26 - layer1) * 8.5);
      irrigationAction = `DÉFICIT HÍDRICO RADICULAR: Se prescribe riego de ${minutesToIrrigate} min (${(minutesToIrrigate * 0.42).toFixed(1)} m³/cuartel).`;
    } else if (layer1 > 38) {
      irrigationStatus = 'excess';
      irrigationAction = 'SATURACIÓN / ANATOMÍA DE ASFIXIA: Suspender turnos de riego para evitar pudrición de cuello (Phytophthora).';
    }

    return {
      etc,
      layer1,
      layer2,
      layer3,
      frostStatus,
      frostMessage,
      irrigationStatus,
      irrigationAction,
      minutesToIrrigate
    };
  }, [simTemp, simSoilMoisture, simWindCalm, simCrop]);

  const pipelineSteps = [
    {
      step: '01',
      title: 'Ingesta de Datos Multifuente (Cero digitación manual)',
      subtitle: 'Satélites Sentinel-2, DGA, INIA y Sondas LoRaWAN en campo',
      icon: Satellite,
      color: 'from-amber-400 to-amber-600',
      description: 'El gemelo no requiere que ingreses datos a mano. Cada madrugada sincroniza automáticamente reflectancias satelitales Sentinel-2 (NDVI, NDRE), descarga caudales oficiales de estaciones DGA y compila las lecturas horarias de las sondas FDR KioT instaladas en el huerto.',
      bullets: [
        'Constelación Sentinel-2 (bandas B4, B8, B8A a 10m de resolución)',
        'Red oficial DGA (caudales en m³/s de Río Longaví y Perquilauquén)',
        'Sondas multinivel LoRaWAN KioT cada 15 minutos sin cables'
      ]
    },
    {
      step: '02',
      title: 'Motor Biofísico & Fluidos (Física Real, No IA Genérica)',
      subtitle: 'Balance hídrico FAO-56 en 3 estratos y dinámica catabática de heladas',
      icon: Cpu,
      color: 'from-emerald-400 to-emerald-600',
      description: 'A diferencia de los paneles estadísticos tradicionales, AgriTwin ejecuta modelos deterministas basados en física agronómica: calcula la evapotranspiración diaria real Penman-Monteith y modela el flujo de masas de aire frío por gravedad sobre la topografía LiDAR.',
      bullets: [
        'Ecuación FAO-56 estratificada: 0-20 cm (brote), 20-60 cm (radicular), 60-100 cm (reserva)',
        'Ecuaciones Navier-Stokes simplificadas para drenaje nocturno de heladas',
        'Cálculo acumulativo de horas de frío (Chilling Hours) para dormancia'
      ]
    },
    {
      step: '03',
      title: 'Gemelo Digital 3D & Cartografía Bi-Escala',
      subtitle: 'Desde las 122.000 ha de la Cuenca hasta el cuartel en Three.js',
      icon: Layers,
      color: 'from-cyan-400 to-blue-600',
      description: 'Toda la física se proyecta en dos entornos visuales interactivos: la Cartografía Territorial de Cuenca para coordinar derechos de agua con APRs y juntas de vigilancia, y el Gemelo 3D fotorrealista para examinar el vigor y el estrés de cada hilera.',
      bullets: [
        'Visor Cuenca GIS: Red de 5 APRs, cuotas DGA y mapas de calor FWI',
        'Gemelo Predial 3D: Curvas de nivel, exposición solar horaria y mallas PBR',
        'Soporte para fotogrametría aérea y misiones con drones autónomos'
      ]
    },
    {
      step: '04',
      title: 'Salida Operativa & Automatización Directa',
      subtitle: 'WhatsApp para el mayordomo, bombas de riego y Pasaporte Verde',
      icon: ShieldCheck,
      color: 'from-teal-400 to-emerald-600',
      description: 'El conocimiento se transforma en decisiones automáticas: el mayordomo de campo recibe un mensaje de WhatsApp con los minutos de riego exactos a programar, se activan compuertas solares off-grid y se emite el Pasaporte Verde de libre deforestación para la exportadora.',
      bullets: [
        'Alertas tempranas de helada 4 horas antes del punto crítico',
        'Dictamen de riego oficial en PDF con firma técnica auditable',
        'Trazabilidad satelital EUDR (Reglamento UE 2023/1115) con código QR'
      ]
    }
  ];

  // Formulario de demostración privada
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    farmName: '',
    region: 'Maule (Retiro / Parral / Linares)',
    hectares: '10 - 50 ha',
    cropType: 'Avellanos Europeos / Frutales',
    interest: 'Simulación de Riego FAO-56 & Heladas'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const galleryItems = [
    {
      title: 'Cartografía Estratégica de Cuenca (122.000 ha)',
      subtitle: 'Escala Territorial • Maule Sur, Red APR y DGA',
      image: './assets/ui/agritwin_regional_landing.jpg',
      badge: 'Escala Cuenca',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      description: 'Mosaico continuo de 122.000 hectáreas con cuadrícula hexagonal interactiva, pozos de comités APR, monitoreo de caudales de ríos Longaví y Perquilauquén y modelado de vientos catabáticos Puelche.'
    },
    {
      title: 'Gemelo Digital 3D de Predio (Fundo Meniel 24.8 ha)',
      subtitle: 'Escala Predial • Topografía Three.js & Mallas LiDAR',
      image: './arbol_alquimico_splash.jpg',
      badge: 'Escala Predio',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      description: 'Reconstrucción milimétrica de cuarteles, hileras de plantación, curvas de nivel y exposición solar horaria con sombreadores PBR fotorrealistas para cálculo de estrés térmico.'
    },
    {
      title: 'Drenaje Catabático & Predicción de Heladas',
      subtitle: 'Física Microclimática • 72h de Pre-alerta',
      image: './cerro_landing_bg.jpg',
      badge: 'Física de Fluidos',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
      description: 'Simulación de flujo de aire frío por gravedad hacia fondos de quebrada y microdepresiones topográficas. Identificación visual de puntos de acumulación de escarcha antes de la pérdida de brotes.'
    },
    {
      title: 'Balance Radicular FAO-56 a 3 Profundidades',
      subtitle: 'Evapotranspiración Penman-Monteith • 0-20, 20-60, 60-100 cm',
      image: './invernadero_landing_bg.jpg',
      badge: 'Balance Hídrico',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
      description: 'Integración continua entre sondas FDR KioT en campo y ecuaciones FAO-56. Genera la prescripción exacta de minutos de riego por cuartel para evitar asfixia radicular y lixiviación.'
    },
    {
      title: 'Teledetección Satelital Sentinel-2 & PlanetScope',
      subtitle: 'Mosaicos Multiespectrales • NDVI, NDRE y Humedad de Suelo',
      image: './img-coastal-hud.jpg',
      badge: 'Teledetección',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
      description: 'Superposición directa de índices de vigor vegetal (NDVI y NDRE de clorofila) sobre la malla tridimensional del predio, permitiendo comparar el avance fenológico histórico temporada a temporada.'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Abrir WhatsApp con mensaje pre-rellenado para contacto inmediato opcional
    const text = `Hola AgroTech Chile, solicito una Demostración Privada de AgriTwin.%0A%0A*Contacto:* ${formData.name}%0A*Predio:* ${formData.farmName}%0A*Región:* ${formData.region}%0A*Superficie:* ${formData.hectares}%0A*Cultivo:* ${formData.cropType}%0A*Interés Clave:* ${formData.interest}`;
    setTimeout(() => {
      window.open(`https://wa.me/56976696142?text=${text}`, '_blank');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#07130c] text-white selection:bg-amber-500 selection:text-black">
      
      {/* ─── 0. QUICK NAVIGATION SUB-HEADER ─────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-[#06140d]/90 backdrop-blur-md border-b border-emerald-900/60 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto text-xs font-sans">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <span className="font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
              AgriTwin OS
            </span>
            <a href="#vision" className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 font-semibold">
              Visión
            </a>
            <a href="#como-funciona" className="px-3 py-1.5 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-amber-400/10 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>¿Cómo Funciona?</span>
            </a>
            <a href="#simulador" className="px-3 py-1.5 rounded-lg text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulador en Vivo</span>
            </a>
            <a href="#arquitectura" className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 font-semibold">
              Cuenca vs Predio
            </a>
            <a href="#galeria" className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 font-semibold">
              Galería & Video
            </a>
            <a href="#casos-de-estudio" className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 font-semibold">
              Casos Reales
            </a>
          </div>

          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="shrink-0 px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Solicitar Demo
          </button>
        </div>
      </div>

      {/* ─── 1. HERO COMERCIAL & PITCH DE PRODUCTO ───────────────────────────── */}
      <section id="vision" className="relative overflow-hidden pt-12 pb-20 border-b border-emerald-950/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-[#07130c] to-[#040a06] pointer-events-none" />
        
        {/* Glow ambient */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-500/10 via-emerald-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 space-y-10">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              AgriTwin • Gemelo Digital Biofísico 2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Arquitectura Multiescala: Cuenca + Predio
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Validación de Campo Auditada
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              El Gemelo Digital que <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">comprende la física</span> de tu territorio.
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-serif leading-relaxed">
              AgriTwin no es un simple visor de mapas: es un motor de simulación ciberfísica que modela el balance hídrico continuo (FAO-56), las heladas por inversión térmica y la dinámica hidroclimática desde la <strong>Cuenca Maule Sur (122.000 ha)</strong> hasta el <strong>estrato radicular de cada cuartel</strong>.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-sans font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>Solicitar Demostración Privada</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <a
              href="#como-funciona"
              className="flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-[#0c2016] hover:bg-[#122e20] text-amber-200 border border-amber-500/30 text-sm font-bold transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Ver Cómo Funciona el Twin</span>
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-emerald-950/60">
            <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">122.000 ha</div>
              <div className="text-xs text-slate-400 font-serif pt-1">Cuenca Maule Sur modelada</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">-32.4%</div>
              <div className="text-xs text-slate-400 font-serif pt-1">Ahorro hídrico en riego auditado</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">4 Horas</div>
              <div className="text-xs text-slate-400 font-serif pt-1">Pre-alerta en heladas catabáticas</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/20 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-mono">3 Estratos</div>
              <div className="text-xs text-slate-400 font-serif pt-1">Balance FAO-56 (0-20, 20-60, 60-100cm)</div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 2. ¿CÓMO FUNCIONA EL TWIN? (PIPELINE EN 4 PASOS) ───────────────── */}
      <section id="como-funciona" className="py-20 border-b border-emerald-950/80 bg-[#051109] relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Flujo Operativo Ciberfísico
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              ¿Cómo Funciona AgriTwin?
            </h2>
            <p className="text-slate-400 text-sm font-serif">
              De la señal satelital y el sensor bajo tierra a la prescripción diaria de riego y la alerta de helada en tu WhatsApp.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activePipelineStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isActive 
                      ? 'bg-[#0d2819] border-amber-400 shadow-lg shadow-amber-500/10' 
                      : 'bg-[#07170e] border-emerald-900/60 hover:bg-[#0a2014] text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-extrabold px-2 py-0.5 rounded ${isActive ? 'bg-amber-400 text-black' : 'bg-black/40 text-slate-500'}`}>
                      Paso {step.step}
                    </span>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  </div>
                  <div className={`text-xs font-bold leading-snug ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {step.title.split('(')[0].trim()}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Showcase Card */}
          <div className="bg-[#081f13] border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Paso {pipelineSteps[activePipelineStep].step} • {pipelineSteps[activePipelineStep].subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {pipelineSteps[activePipelineStep].title}
                </h3>
              </div>

              <p className="text-slate-300 font-serif text-sm leading-relaxed">
                {pipelineSteps[activePipelineStep].description}
              </p>

              <div className="space-y-2.5 pt-2">
                {pipelineSteps[activePipelineStep].bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs font-sans text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-black/50 border border-emerald-500/30 rounded-2xl p-6 space-y-4 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                <span className="text-[10px] text-amber-400 uppercase font-bold">Telemetría de Pipeline</span>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Activo 24/7
                </span>
              </div>

              {activePipelineStep === 0 && (
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Sentinel-2 Tile:</span>
                    <span className="text-white">T19HBD (Maule Sur)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Estación DGA:</span>
                    <span className="text-white">Río Longaví en Quiriquina</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Nodos KioT:</span>
                    <span className="text-emerald-400">5 Sondas FDR Online</span>
                  </div>
                </div>
              )}

              {activePipelineStep === 1 && (
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Ecuación FAO-56:</span>
                    <span className="text-white">Penman-Monteith 1998</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Modelo Helada:</span>
                    <span className="text-white">Katabatic Fluid Drainage</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Horizontes Edáficos:</span>
                    <span className="text-amber-400">3 Estratos (0-20, 20-60, 60-100cm)</span>
                  </div>
                </div>
              )}

              {activePipelineStep === 2 && (
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Motor 3D:</span>
                    <span className="text-white">Three.js WebGL + PBR Shaders</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Escala Cuenca:</span>
                    <span className="text-white">Leaflet GIS 122.000 ha</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Predio Meniel:</span>
                    <span className="text-teal-400">24.8 ha con mallas de cuartel</span>
                  </div>
                </div>
              )}

              {activePipelineStep === 3 && (
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Canal de Alerta:</span>
                    <span className="text-white">WhatsApp Business API</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-slate-400">Certificación EUDR:</span>
                    <span className="text-white">PDF con polígono y corte 2020</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Accionamiento:</span>
                    <span className="text-emerald-400">Relé LoRaWAN para bomba</span>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <a
                  href="#simulador"
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Probar en el Simulador en Vivo &darr;</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 3. SIMULADOR BIOFÍSICO EN VIVO (SANDBOX INTERACTIVO) ─────────────── */}
      <section id="simulador" className="py-20 border-b border-emerald-950/80 bg-[#06140d]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Laboratorio en Vivo • Simulación Ciberfísica
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Prueba el Motor Biofísico en Tiempo Real
            </h2>
            <p className="text-slate-400 text-sm font-serif">
              Ajusta los controles de temperatura, humedad y viento para ver cómo reaccionan las ecuaciones FAO-56 y el detector de heladas de AgriTwin.
            </p>
          </div>

          <div className="bg-[#091f13] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Controles del Simulador (Izquierda) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  Parámetros de Entrada
                </span>
                <span className="text-[10px] font-mono text-slate-400">Interactúa con los sliders</span>
              </div>

              {/* Slider 1: Temperatura */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <ThermometerIcon temp={simTemp} />
                    Temperatura Ambiente:
                  </span>
                  <span className={`font-mono font-bold text-sm ${simTemp <= 0 ? 'text-cyan-400' : simTemp < 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {simTemp} °C
                  </span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="35"
                  step="0.5"
                  value={simTemp}
                  onChange={(e) => setSimTemp(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>-3°C (Helada Severa)</span>
                  <span>15°C</span>
                  <span>35°C (Estrés Térmico)</span>
                </div>
              </div>

              {/* Slider 2: Humedad en Suelo */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-teal-400" />
                    Humedad en Estrato A (0-20 cm):
                  </span>
                  <span className={`font-mono font-bold text-sm ${simSoilMoisture < 20 ? 'text-red-400' : simSoilMoisture > 38 ? 'text-blue-400' : 'text-emerald-400'}`}>
                    {simSoilMoisture}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="1"
                  value={simSoilMoisture}
                  onChange={(e) => setSimSoilMoisture(parseInt(e.target.value))}
                  className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>10% (Punto de Marchitez)</span>
                  <span>28% (Capacidad de Campo)</span>
                  <span>50% (Saturado)</span>
                </div>
              </div>

              {/* Switch de Viento / Inversión */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-900/60 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-sans font-bold text-slate-200 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-cyan-400" />
                    Viento Calmo (&lt; 1 m/s)
                  </div>
                  <div className="text-[10px] text-slate-400 font-serif">
                    Favorece la estratificación e inversión térmica nocturna.
                  </div>
                </div>
                <button
                  onClick={() => setSimWindCalm(!simWindCalm)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                    simWindCalm ? 'bg-amber-400 text-black' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {simWindCalm ? 'Calmo (Inversión)' : 'Brisa (Mezcla)'}
                </button>
              </div>

              {/* Selector de Cultivo */}
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-semibold text-slate-300">Tipo de Cultivo / Cuartel:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSimCrop('avellano')}
                    className={`p-2 rounded-xl text-xs font-sans font-bold transition-all ${
                      simCrop === 'avellano' ? 'bg-emerald-700 text-white border border-emerald-400' : 'bg-black/30 text-slate-400'
                    }`}
                  >
                    Avellano (Kc 0.85)
                  </button>
                  <button
                    onClick={() => setSimCrop('vid')}
                    className={`p-2 rounded-xl text-xs font-sans font-bold transition-all ${
                      simCrop === 'vid' ? 'bg-emerald-700 text-white border border-emerald-400' : 'bg-black/30 text-slate-400'
                    }`}
                  >
                    Vid (Kc 0.65)
                  </button>
                  <button
                    onClick={() => setSimCrop('pradera')}
                    className={`p-2 rounded-xl text-xs font-sans font-bold transition-all ${
                      simCrop === 'pradera' ? 'bg-emerald-700 text-white border border-emerald-400' : 'bg-black/30 text-slate-400'
                    }`}
                  >
                    Pradera PRV (Kc 0.95)
                  </button>
                </div>
              </div>
            </div>

            {/* Resultados Reactivos del Simulador (Derecha) */}
            <div className="lg:col-span-7 space-y-5 bg-[#06170e] p-6 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    Salida Reactiva del Motor Biofísico
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Cálculo Instantáneo
                  </span>
                </div>

                {/* Card de Alerta de Helada */}
                <div className={`p-4 rounded-xl border transition-all ${
                  simulationResults.frostStatus === 'critical'
                    ? 'bg-red-950/60 border-red-500/80 text-red-200'
                    : simulationResults.frostStatus === 'warning'
                    ? 'bg-amber-950/60 border-amber-500/80 text-amber-200'
                    : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-xs uppercase font-mono">
                    {simulationResults.frostStatus === 'critical' ? (
                      <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                    ) : simulationResults.frostStatus === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>Microclima & Heladas Catabáticas</span>
                  </div>
                  <p className="text-xs font-serif pt-1 leading-relaxed">
                    {simulationResults.frostMessage}
                  </p>
                </div>

                {/* Card de Dictamen de Riego FAO-56 */}
                <div className={`p-4 rounded-xl border transition-all ${
                  simulationResults.irrigationStatus === 'deficit'
                    ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                    : simulationResults.irrigationStatus === 'excess'
                    ? 'bg-blue-950/40 border-blue-500/60 text-blue-200'
                    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                }`}>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-teal-400" />
                      Dictamen de Riego FAO-56 (Penman-Monteith)
                    </span>
                    <span className="text-amber-400">ETc = {simulationResults.etc} mm/día</span>
                  </div>
                  <p className="text-xs font-serif pt-1.5 leading-relaxed">
                    {simulationResults.irrigationAction}
                  </p>
                </div>

                {/* Gráfico Dinámico de 3 Estratos de Suelo */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                    <span>Estratificación Edáfica Radicular:</span>
                    <span>Lectura FDR Estimada</span>
                  </div>

                  {/* Estrato 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-sans">
                      <span className="text-slate-300 font-medium">Estrato 1 (0 - 20 cm) • Brotes & Goteo:</span>
                      <span className="font-mono text-teal-300 font-bold">{simulationResults.layer1}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-emerald-950">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${(simulationResults.layer1 / 50) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Estrato 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-sans">
                      <span className="text-slate-300 font-medium">Estrato 2 (20 - 60 cm) • Raíz Absorbente:</span>
                      <span className="font-mono text-teal-300 font-bold">{simulationResults.layer2}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-emerald-950">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 transition-all duration-300"
                        style={{ width: `${(simulationResults.layer2 / 50) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Estrato 3 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-sans">
                      <span className="text-slate-300 font-medium">Estrato 3 (60 - 100 cm) • Reserva Profunda:</span>
                      <span className="font-mono text-teal-300 font-bold">{simulationResults.layer3}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-emerald-950">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-700 to-emerald-600 transition-all duration-300"
                        style={{ width: `${(simulationResults.layer3 / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-4 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] font-serif text-slate-400 text-center sm:text-left">
                  ¿Quieres calibrar este motor con las coordenadas y el suelo de tu predio?
                </span>
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs whitespace-nowrap cursor-pointer shadow-md"
                >
                  Agendar Demostración con mis Datos
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. ARQUITECTURA MULTIESCALA: CUENCA VS PREDIO ───────────────────── */}
      <section id="arquitectura" className="py-20 border-b border-emerald-950/80 bg-[#051109] relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              El Principio Árbol • Bi-Escala Ciberfísica
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Dos escalas interconectadas. Un solo ecosistema de decisión.
            </h2>
            <p className="text-slate-400 text-sm font-serif">
              Un predio agrícola no es una isla aislada: depende del acuífero, del viento cordillerano y de las decisiones de la cuenca vecina.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tarjeta 1: Escala Cuenca */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0d2217] to-[#07150e] border border-amber-500/30 space-y-6 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Escala Macro • Regional</span>
                    <h3 className="text-2xl font-bold text-white">AgriTwin Cuenca</h3>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-200">
                  122.000 ha
                </span>
              </div>

              <p className="text-sm text-slate-300 font-serif leading-relaxed">
                Sistema de Información Geográfica y Soporte a la Decisión (SDSS) para mesas de regantes, comités APR y gobernanzas comunales de Parral, Retiro y Longaví.
              </p>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200"><strong>Red de 5 APRs georreferenciados:</strong> Monitoreo de niveles estáticos y dinámicos en pozos profundos de Retiro Centro, Copihue y Romeral.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200"><strong>Caudales Fluviales DGA en tiempo real:</strong> Curvas hidrológicas para $T=10$, $T=50$ y $T=100$ años en Río Longaví y Perquilauquén.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200"><strong>Riesgo Pirogénico FWI & Viento Puelche:</strong> Simulación de propagación de incendios forestales en la interfaz cordillerana.</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden border border-amber-500/30 h-48 relative">
                  <img src="./assets/ui/agritwin_regional_landing.jpg" alt="AgriTwin Cuenca" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-[11px] font-mono text-amber-300">Terminal GIS B2B Territorial • Sincronización REST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Escala Predio */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0a2016] to-[#06140d] border border-emerald-500/30 space-y-6 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Escala Micro • Huerto</span>
                    <h3 className="text-2xl font-bold text-white">AgriTwin Predio 3D</h3>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-200">
                  Meniel 24.8 ha
                </span>
              </div>

              <p className="text-sm text-slate-300 font-serif leading-relaxed">
                Gemelo tridimensional en Three.js que traslada los datos satelitales y de sensores LoRaWAN a la realidad operativa del administrador de campo.
              </p>

              <div className="space-y-3 font-sans text-xs">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200"><strong>Balance Radicular FAO-56:</strong> Algoritmo Penman-Monteith adaptado a 3 horizontes edáficos con cálculo de reserva útil diaria.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200"><strong>Modelo Catabático de Heladas:</strong> Predicción topográfica de enfriamiento por inversión térmica en fondos de quebrada.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200"><strong>Pastoreo PRV & Corredores Nativos:</strong> Rotación biointensiva de animales en 8 potreros y auditoría de carbono IPCC.</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden border border-emerald-500/30 h-48 relative">
                  <img src="./arbol_alquimico_splash.jpg" alt="AgriTwin Predio 3D" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-[11px] font-mono text-emerald-300">Gemelo Ciberfísico Three.js • 6 Ramas Productivas</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 5. GALERÍA INTERACTIVA HD & DEMO DE VIDEO ──────────────────────── */}
      <section id="galeria" className="py-20 border-b border-emerald-950/80 bg-[#040c07]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                Galería HD & Capacidades Visuales
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Evidencia visual del entorno de trabajo
              </h2>
              <p className="text-slate-400 text-sm font-serif">
                Explora las diferentes pantallas, capas biofísicas y tableros de control que utilizan los administradores y regantes.
              </p>
            </div>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-sans text-xs font-bold transition-all shadow-md self-start md:self-auto cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Demo Guiada en Vivo</span>
            </button>
          </div>

          {/* Selector de Pestañas de la Galería */}
          <div className="flex flex-wrap gap-2 border-b border-emerald-900/60 pb-3">
            {galleryItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveGalleryTab(idx)}
                className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
                  activeGalleryTab === idx
                    ? 'bg-amber-400 text-slate-950 shadow-lg'
                    : 'bg-[#0a1e14] text-slate-300 hover:bg-[#122e20] hover:text-white border border-emerald-900/40'
                }`}
              >
                {item.title.split('(')[0].trim()}
              </button>
            ))}
          </div>

          {/* Visor Activo de la Galería */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#071910] p-6 sm:p-10 rounded-3xl border border-emerald-500/30 shadow-2xl">
            
            <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl relative group bg-black">
              <img 
                src={galleryItems[activeGalleryTab].image} 
                alt={galleryItems[activeGalleryTab].title}
                className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border backdrop-blur-md ${galleryItems[activeGalleryTab].badgeColor}`}>
                  {galleryItems[activeGalleryTab].badge}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">
                  {galleryItems[activeGalleryTab].subtitle}
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  {galleryItems[activeGalleryTab].title}
                </h3>
              </div>

              <p className="text-slate-300 font-serif text-sm leading-relaxed">
                {galleryItems[activeGalleryTab].description}
              </p>

              <div className="pt-4 border-t border-emerald-900/60 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Sin código expuesto • Renderizado cliente seguro</span>
                </div>
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 font-sans text-xs font-bold transition-all text-center"
                >
                  Ver este módulo en una sesión interactiva privada &rarr;
                </button>
              </div>
            </div>

          </div>

          {/* SOPORTE DE VIDEO DEMOSTRATIVO */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0a1e14] via-[#0d2a1b] to-[#07180f] border border-emerald-500/40 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">Recorridos Demostrativos en Video</h3>
                </div>
                <p className="text-xs text-slate-300 font-serif">
                  Selecciona una cápsula de demostración técnica para visualizar la interactividad del gemelo digital.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setActiveVideoClip('3d'); setIsPlayingVideo(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${activeVideoClip === '3d' ? 'bg-amber-400 text-black' : 'bg-black/40 text-slate-300'}`}
                >
                  Recorrido 3D
                </button>
                <button
                  onClick={() => { setActiveVideoClip('frost'); setIsPlayingVideo(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${activeVideoClip === 'frost' ? 'bg-amber-400 text-black' : 'bg-black/40 text-slate-300'}`}
                >
                  Heladas Catabáticas
                </button>
                <button
                  onClick={() => { setActiveVideoClip('basin'); setIsPlayingVideo(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${activeVideoClip === 'basin' ? 'bg-amber-400 text-black' : 'bg-black/40 text-slate-300'}`}
                >
                  Gobernanza Cuenca
                </button>
              </div>
            </div>

            {/* Video Player Mockup / Embed container */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 aspect-video max-h-[460px] bg-slate-950 flex items-center justify-center">
              {!isPlayingVideo ? (
                <>
                  <img 
                    src={activeVideoClip === '3d' ? './arbol_alquimico_splash.jpg' : activeVideoClip === 'frost' ? './cerro_landing_bg.jpg' : './assets/ui/agritwin_regional_landing.jpg'} 
                    alt="Video Demo Preview" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                  <div className="absolute flex flex-col items-center gap-3 text-center px-4">
                    <button
                      onClick={() => setIsPlayingVideo(true)}
                      className="w-16 h-16 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <Play className="w-7 h-7 fill-slate-950 ml-1" />
                    </button>
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {activeVideoClip === '3d' && 'Cápsula 1: Navegación y Cuarteles en Three.js'}
                        {activeVideoClip === 'frost' && 'Cápsula 2: Simulación de Helada por Inversión Térmica (-1.8 °C)'}
                        {activeVideoClip === 'basin' && 'Cápsula 3: Cartografía Territorial Maule Sur & Pozos APR'}
                      </h4>
                      <p className="text-xs text-slate-300 font-serif">Haz clic para reproducir la demostración interactiva guiada</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center space-y-4 bg-[#051109]">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white">Transmisión de Demostración Privada</h4>
                    <p className="text-xs text-slate-300 max-w-md font-serif">
                      El streaming directo en alta resolución requiere credenciales de sesión activa de AgriTwin. Para una demostración interactiva en vivo con datos reales de tu predio, solicita un acceso guiado.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDemoModalOpen(true)}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                  >
                    Solicitar Acceso a la Demo en Vivo
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ─── 6. CASOS DE ESTUDIO Y VALIDACIÓN CIENTÍFICO-TÉCNICA ─────────────── */}
      <section id="casos-de-estudio" className="py-20 border-b border-emerald-950/80 bg-[#06140c]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Ground-Truth • Validación en Terreno
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Fichas de Casos de Estudio Reales
            </h2>
            <p className="text-slate-400 text-sm font-serif">
              Datos auditados y contrastados con mediciones directas en suelo, pozos APR y estaciones agroclimáticas INIA/DGA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Caso 1 */}
            <div className="p-6 rounded-3xl bg-[#091f14] border border-emerald-500/30 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold uppercase">
                    Caso 01 • Predial
                  </span>
                  <span className="text-xs font-mono text-slate-400">Retiro, Maule</span>
                </div>
                <h3 className="text-xl font-bold text-white">Fundo Meniel (24.8 ha)</h3>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Huerto de Avellano Europeo con praderas polifíticas bajo Pastoreo Racional Voisin (PRV) y tranque de 18.500 m³.
                </p>
                <div className="space-y-2 pt-2 border-t border-emerald-900/50 text-xs font-sans">
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Ahorro Hídrico:</span>
                    <span className="font-mono font-bold text-emerald-300">-32.4% m³ bombeados</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Evento de Helada:</span>
                    <span className="font-mono font-bold text-amber-300">-1.8 °C (0 brotes perdidos)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Materia Orgánica:</span>
                    <span className="font-mono font-bold text-teal-300">+4.2 kg MO/m² en 18 meses</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 text-[11px] text-slate-300 font-serif">
                <em>"El dictamen de riego FAO-56 tridimensional evitó el sobre-riego en el estrato arcilloso inferior, reduciendo el gasto eléctrico de bombeo en $1.8M CLP al mes."</em>
              </div>
            </div>

            {/* Caso 2 */}
            <div className="p-6 rounded-3xl bg-[#091f14] border border-amber-500/30 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-amber-950 text-amber-300 border border-amber-700 font-bold uppercase">
                    Caso 02 • Cuenca
                  </span>
                  <span className="text-xs font-mono text-slate-400">Cuenca Maule Sur</span>
                </div>
                <h3 className="text-xl font-bold text-white">Red de 5 APRs & Regantes</h3>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Monitoreo hidrogeológico conjunto entre 10 predios agrícolas y comités de agua potable rural de Retiro y Parral.
                </p>
                <div className="space-y-2 pt-2 border-t border-amber-900/50 text-xs font-sans">
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Territorio Auditado:</span>
                    <span className="font-mono font-bold text-amber-300">122.000 ha cartografiadas</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Pozos Vigilados:</span>
                    <span className="font-mono font-bold text-emerald-300">5 APRs (hasta 68m prof.)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Alerta de Inundación:</span>
                    <span className="font-mono font-bold text-cyan-300">Modelado $T=50$ años Longaví</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/20 text-[11px] text-slate-300 font-serif">
                <em>"Permitió a la mesa de agua anticipar el estrés del acuífero antes de la temporada estival, acordando turnos de canal transparentes sin litigios."</em>
              </div>
            </div>

            {/* Caso 3 */}
            <div className="p-6 rounded-3xl bg-[#091f14] border border-teal-500/30 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-teal-950 text-teal-300 border border-teal-700 font-bold uppercase">
                    Caso 03 • ESG / EUDR
                  </span>
                  <span className="text-xs font-mono text-slate-400">Exportación & Viñas</span>
                </div>
                <h3 className="text-xl font-bold text-white">Pasaporte Verde & Rewilding</h3>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Certificación satelital de libre deforestación (Reglamento UE 2023/1115 EUDR) y cortafuegos verde agroecológico.
                </p>
                <div className="space-y-2 pt-2 border-t border-teal-900/50 text-xs font-sans">
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Trazabilidad EUDR:</span>
                    <span className="font-mono font-bold text-teal-300">100% de polígonos validados</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-950">
                    <span className="text-slate-400">Corredor Biológico:</span>
                    <span className="font-mono font-bold text-emerald-300">Peumo, Quillay y Boldo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Reporte Exportable:</span>
                    <span className="font-mono font-bold text-amber-300">Dossier PDF con firma digital</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-teal-500/20 text-[11px] text-slate-300 font-serif">
                <em>"Los compradores europeos pudieron auditar el polígono del predio satelitalmente con fecha de corte de 2020 sin contratar certificadoras internacionales."</em>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 7. BANNER FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-t from-black to-[#07150d] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 space-y-8 relative z-10">
          <div className="inline-flex p-3 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Lleva la inteligencia ciberfísica a tu predio o cuenca
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-serif max-w-2xl mx-auto">
            Configuramos el gemelo digital con las coordenadas de tu rol SII, conectamos tus sensores o estaciones meteorológicas y calibramos el modelo FAO-56 en menos de 7 días.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-sans font-extrabold text-sm shadow-2xl transition-all cursor-pointer"
            >
              Solicitar Demostración Técnica Privada
            </button>
            <a
              href="https://wa.me/56976696142?text=Hola%20AgroTech%20Chile,%20deseo%20conocer%20m%C3%A1s%20sobre%20la%20implementaci%C3%B3n%20de%20AgriTwin%20en%20mi%20campo."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-[#0a2016] hover:bg-[#123122] text-emerald-300 border border-emerald-500/40 text-sm font-bold transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Conversar con un Ingeniero Agrónomo</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── MODAL INTERACTIVO: SOLICITAR DEMOSTRACIÓN PRIVADA ───────────────── */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#091a11] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl text-white relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => { setIsDemoModalOpen(false); setIsSubmitted(false); }}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">ACCESO CORPORATIVO & B2B</span>
                  <h3 className="text-2xl font-bold text-white">Solicitar Demostración Privada</h3>
                  <p className="text-xs text-slate-300 font-serif">
                    Te prepararemos una sesión en vivo con los polígonos satelitales y curvas de nivel de tu comuna o predio.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Nombre y Apellido *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Andrés Ovalle"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Email Corporativo / Personal *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="andres@agricola.cl"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Teléfono o WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+56 9 1234 5678"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Nombre del Predio o Empresa *</label>
                    <input
                      type="text"
                      required
                      value={formData.farmName}
                      onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                      placeholder="Ej. Agrícola San Pedro / Fundo El Roble"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Región / Comuna</label>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Superficie Aproximada</label>
                    <select
                      value={formData.hectares}
                      onChange={(e) => setFormData({ ...formData, hectares: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800/80 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Menos de 10 ha">Menos de 10 ha (Parcelación / Familiar)</option>
                      <option value="10 - 50 ha">10 a 50 ha (Comercial Mediano)</option>
                      <option value="50 - 200 ha">50 a 200 ha (Agroindustria)</option>
                      <option value="Más de 200 ha / Cuenca">Más de 200 ha / Junta de Vigilancia / APR</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs font-sans">
                  <label className="text-slate-300 font-semibold">Desafío Clave a Resolver</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-emerald-800/80 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Simulación de Riego FAO-56 & Heladas">Optimización de Riego FAO-56 & Heladas Catabáticas</option>
                    <option value="Monitoreo Hidrológico de Cuenca & Pozos APR">Monitoreo Hidrológico de Cuenca & Pozos APR</option>
                    <option value="Certificación EUDR & Pasaporte Verde">Certificación de Libre Deforestación EUDR / Pasaporte Verde</option>
                    <option value="Pastoreo PRV & Transición Agroecológica">Pastoreo Racional Voisin (PRV) & Regenerativo</option>
                    <option value="Integración de Cámaras Solares & Drones">AgriTwin Vision (Drones Autónomos & Cámaras 4G)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-sans font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirmar y Enviar Solicitud</span>
                  </button>
                  <p className="text-[11px] text-slate-400 text-center pt-2 font-serif">
                    Te contactaremos en menos de 24 horas hábiles. Tus datos de predio se tratan bajo estricta confidencialidad.
                  </p>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">¡Solicitud Registrada con Éxito!</h3>
                  <p className="text-sm text-slate-300 font-serif max-w-md mx-auto">
                    Gracias <strong>{formData.name}</strong>. Hemos recibido los antecedentes de <strong>{formData.farmName}</strong>.
                  </p>
                  <p className="text-xs text-amber-300 font-mono pt-2">
                    Ticket de Demostración: #AT-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => { setIsDemoModalOpen(false); setIsSubmitted(false); }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-sans text-xs font-bold"
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
  if (temp <= 0) return <span className="text-cyan-400">❄️</span>;
  if (temp < 15) return <span className="text-amber-300">🌤️</span>;
  return <span className="text-amber-500">☀️</span>;
}
