import React, { useState } from 'react';
import { 
  Zap, Layers, RefreshCw, Smartphone, Cpu, Activity, Trees, 
  CheckCircle2, ArrowRight, ShieldCheck, Database, Globe, 
  HelpCircle, Sparkles, MapPin, Compass, Check, ChevronRight,
  Flame, Droplets, Clock, ExternalLink
} from 'lucide-react';

interface RoadmapProductosPageProps {
  onNavigate?: (viewId: string) => void;
}

export const RoadmapProductosPage: React.FC<RoadmapProductosPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'stacking' | 'flywheel' | 'roadmap'>('stacking');
  const [selectedStackLevel, setSelectedStackLevel] = useState<number>(1);

  const stackLevels = [
    {
      level: 1,
      tag: 'NIVEL 01 • ACCESO INMEDIATO (60 SEGUNDOS)',
      title: 'X AgroAlerta (WhatsApp & Móvil)',
      cost: 'Gancho Gratuito + Add-ons Pagos 1-Clic',
      time: 'Activación en 60 segundos',
      hw: 'Cero Hardware ($0 Inventario)',
      desc: 'El agricultor no necesita descargar apps pesadas ni aprender interfaces complejas. Con solo enviar las coordenadas GPS o dibujar su polígono por WhatsApp, el sistema monitorea su predio 24/7 y emite alertas preventivas antes de heladas críticas (-1.8 °C), vientos Puelche y estrés hídrico.',
      features: [
        'Alertas de helada katabática (-1.8 °C) con 72h de anticipación',
        'Monitoreo satelital Sentinel-2 de vigor vegetal (NDVI / NDRE)',
        'Avisos de estrés hídrico y ventanas seguras de pulverización',
        'Desbloqueo en 1 clic: Informe Predial Express (24h), Pasaporte Verde EUDR y Carpeta CNR'
      ],
      icon: Smartphone,
      color: 'emerald'
    },
    {
      level: 2,
      tag: 'NIVEL 02 • MICRO-SAAS VERTICALES DE RIESGO',
      title: 'X Agua, X Incendios & X Visión',
      cost: 'Suscripción Micro-SaaS ($25k - $45k CLP/mes)',
      time: 'Activación Inmediata en la Nube',
      hw: '100% Software (Aprovecha cámaras/drones existentes)',
      desc: 'Herramientas especializadas de operación y mitigación de riesgo. Balance hídrico FAO-56 para ahorro en tarifas eléctricas de riego, monitoreo piro-vórtice 30-30-30 con órdenes de humectación preventiva, y conexión de cámaras IP/4G o drones que el cliente ya posee.',
      features: [
        'X Agua & Riego: balance hídrico diario FAO-56 y ahorro en franjas eléctricas valle (-32%)',
        'X Incendios: simulación de frentes de fuego Rothermel, viento Puelche y cortafuegos preventivo',
        'X Visión & Vuelo: analítica IA con cámaras IP/4G del fundo y ortomosaicos NDVI con drones propios',
        'Integración por Webhook / API a sistemas de bombeo y PLCs existentes en el predio'
      ],
      icon: Globe,
      color: 'blue'
    },
    {
      level: 3,
      tag: 'NIVEL 03 • SUITE MAESTRO & DISEÑO REGENERATIVO',
      title: 'X AgriTwin Maestro & X Keyline',
      cost: 'SaaS Pro / Enterprise ($85k - $160k CLP/mes)',
      time: 'Modelado en 48 horas',
      hw: 'Sensores Virtuales (Richards-MONICA 1D sin sondas)',
      desc: 'El ápice tecnológico del software agropecuario. Calicata virtual profunda Richards-MONICA 1D para monitorear humedad radicular sin enterrar sondas físicas, visualización 3D en Three.js con drenaje katabático brote a brote, simulador What-If y diseño regenerativo permacultural Keyline desde cero.',
      features: [
        'Sensores Virtuales: calicata 1D Richards-MONICA sin costo ni mantenimiento de sondas',
        'Malla 3D AMR con simulación de drenaje de aire frío e inversión térmica brote a brote',
        'Simulador de escenarios What-If: cambios de cultivo, dotación hídrica y frentes climáticos',
        'X Keyline: diseño integral bajo Escala de Permanencia, cosecha de agua, CutSheetRX y pastoreo PRV'
      ],
      icon: Cpu,
      color: 'teal'
    },
    {
      level: 4,
      tag: 'NIVEL 04 • UPGRADE IOT & VALIDACIÓN DE CUENCA',
      title: 'X Kits IoT & X Territorio (Living Lab Parral)',
      cost: 'Hardware Just-In-Time & Contratos Territoriales B2G',
      time: 'Instalación 48h / Convenios de Cuenca',
      hw: 'Sondas FDR 3-Estratos + LiFePO4 + Estaciones LoRaWAN',
      desc: 'Capa física y territorial desplegada exclusivamente sobre clientes que ya operan y confían en el software. Ensamblaje Just-In-Time de sondas FDR multinivel, controladores físicos LoRaWAN y alianzas de resiliencia hídrica de cuencas validadas en el Living Lab ubicado donde Rudi (Parral).',
      features: [
        'Sondas FDR tri-estrato (0-20, 20-60, 60-100 cm) con telemetría LoRaWAN/4G',
        'Actuadores físicos para activación remota de bombas, aspersores y electroválvulas',
        'Energía solar autónoma con baterías LiFePO4 de 15 días de autonomía sin sol',
        'Validación agronómica en el Living Lab ubicado donde Rudi (Parral) y proyectos de cuenca B2G'
      ],
      icon: Activity,
      color: 'amber'
    }
  ];

  return (
    <div className="min-h-screen bg-[#07111B] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-emerald-900/40 bg-gradient-to-b from-[#0B2519]/70 via-[#07111B] to-[#07111B] py-16 sm:py-24 px-4 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto space-y-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider shadow-lg">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Roadmap de Productos & Filosofía de Evolución</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            De la Alerta en Bolsillo al <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-teal-300 bg-clip-text text-transparent">
              Gemelo Digital Predial
            </span>
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/80 font-serif max-w-3xl mx-auto leading-relaxed">
            Explicamos con total transparencia en qué está AgroTech y cómo evolucionamos: no vendemos hardware rígido que queda obsoleto en una bodega. Acompañamos al productor capa sobre capa (<span className="text-amber-300 font-sans font-bold">Data Stacking</span>), alimentando un volante territorial colaborativo (<span className="text-emerald-400 font-sans font-bold">Data Flywheel</span>).
          </p>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('stacking')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold font-mono text-xs transition-all ${
                activeTab === 'stacking'
                  ? 'bg-amber-400 text-slate-950 shadow-glow-gold'
                  : 'bg-[#0E1E30] text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>1. Data Stacking (Capas Modulares)</span>
            </button>

            <button
              onClick={() => setActiveTab('flywheel')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold font-mono text-xs transition-all ${
                activeTab === 'flywheel'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg'
                  : 'bg-[#0E1E30] text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>2. The Data Flywheel (Efecto Red)</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold font-mono text-xs transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-teal-400 text-slate-950 shadow-lg'
                  : 'bg-[#0E1E30] text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>3. Estado Actual & Fases de Maduración</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-16">

        {/* TAB 1: DATA STACKING */}
        {activeTab === 'stacking' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-3 text-center max-w-3xl mx-auto">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Principio N.° 1 • Arquitectura Progresiva
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Data Stacking: Active Solo lo que Necesita
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-serif leading-relaxed">
                El agricultor moderno no necesita asumir deudas de millones de pesos en sensores físicos desde el día uno. Nuestra escalera de valor le permite empezar gratis o con un bajo costo en WhatsApp, e ir activando capas más profundas de precisión a medida que su campo lo requiere.
              </p>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              {stackLevels.map((lvl) => {
                const isSelected = selectedStackLevel === lvl.level;
                const IconComponent = lvl.icon;
                return (
                  <button
                    key={lvl.level}
                    onClick={() => setSelectedStackLevel(lvl.level)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#0E2A1E] border-emerald-400 text-white shadow-xl scale-102 ring-2 ring-emerald-400/40'
                        : 'bg-[#0A1624] border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-400">CAPA 0{lvl.level}</span>
                      <IconComponent className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                    </div>
                    <span className="font-bold text-xs leading-tight text-white">{lvl.title.split('(')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Detailed Active Level Card */}
            {(() => {
              const current = stackLevels.find(l => l.level === selectedStackLevel) || stackLevels[0];
              const IconComp = current.icon;
              return (
                <div className="rounded-3xl bg-gradient-to-br from-[#0B1E2E] to-[#07131F] border border-emerald-500/40 p-6 sm:p-10 shadow-2xl space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-6">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                        {current.tag}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                        <IconComp className="w-7 h-7 text-emerald-400 shrink-0" />
                        <span>{current.title}</span>
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="px-3 py-1.5 rounded-xl bg-black/40 border border-slate-700 text-emerald-300">
                        {current.cost}
                      </span>
                      <span className="px-3 py-1.5 rounded-xl bg-black/40 border border-slate-700 text-amber-300">
                        {current.time}
                      </span>
                    </div>
                  </div>

                  <p className="text-base text-slate-200 font-serif leading-relaxed">
                    {current.desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {current.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#07111B]/80 border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300 font-sans leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Contextual CTA for active layer */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
                    <span className="text-xs font-mono text-slate-400">
                      Requisitos técnicos: <strong className="text-white">{current.hw}</strong>
                    </span>
                    <div className="flex items-center gap-3">
                      {current.level === 1 && (
                        <a
                          href="https://wa.me/56976696142?text=Hola%20AgroTech,%20quiero%20probar%20AgroAlerta%20para%20mi%20predio"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg transition-all"
                        >
                          <Smartphone className="w-4 h-4" />
                          <span>Activar AgroAlerta en WhatsApp</span>
                        </a>
                      )}
                      {current.level === 4 && onNavigate && (
                        <button
                          onClick={() => onNavigate('agritwin')}
                          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-glow-gold transition-all"
                        >
                          <Cpu className="w-4 h-4" />
                          <span>Ver Showcase AgriTwin 3D</span>
                        </button>
                      )}
                      {current.level !== 1 && current.level !== 4 && onNavigate && (
                        <button
                          onClick={() => onNavigate('hardware')}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-mono text-xs flex items-center gap-2 shadow-lg transition-all"
                        >
                          <span>Solicitar Demostración</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB 2: THE DATA FLYWHEEL */}
        {activeTab === 'flywheel' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-3 text-center max-w-3xl mx-auto">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Principio N.° 2 • Efecto Red Territorial
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                The Data Flywheel: ¿Por qué Cada Predio Mejora a sus Vecinos?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-serif leading-relaxed">
                A diferencia de los softwares tradicionales que cobran licencias aisladas, AgroTech opera como una red biofísica de cuenca. Cuando un nuevo fundo se suma, aporta datos de micro-relieve, drenaje de aire frío y humedad que perfeccionan los modelos de todo el valle.
              </p>
            </div>

            {/* Flywheel Loop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-6 rounded-2xl bg-[#0B1E2E] border border-emerald-500/30 space-y-3 relative group hover:border-emerald-400 transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-mono font-black text-amber-400 text-sm">
                  01
                </div>
                <h4 className="font-bold text-white text-base">Adopción Ligera (WhatsApp)</h4>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Productores ingresan su coordenada y cultivo en 60 segundos. Cero barreras de entrada ni costos prohibitivos de instalación.
                </p>
                <div className="pt-2 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <span>Densificación del Valle</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B1E2E] border border-blue-500/30 space-y-3 relative group hover:border-blue-400 transition-all">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center font-mono font-black text-blue-300 text-sm">
                  02
                </div>
                <h4 className="font-bold text-white text-base">Mapeo de Cuenca Hidrográfica</h4>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Los datos pasivos de cientos de hectáreas alimentan la malla territorial (Maule Sur, 122.000 ha), cruzando Sentinel-2 y estaciones DGA.
                </p>
                <div className="pt-2 text-[10px] font-mono text-blue-300 font-bold flex items-center gap-1">
                  <span>Resolución Submétrica</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B1E2E] border border-amber-500/30 space-y-3 relative group hover:border-amber-400 transition-all">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center font-mono font-black text-amber-300 text-sm">
                  03
                </div>
                <h4 className="font-bold text-white text-base">Calibración Microclimática</h4>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Las alertas de helada radiativa (-1.8 °C) y vientos Puelche aprenden de los puntos bajos y drenajes térmicos reales de cada sector.
                </p>
                <div className="pt-2 text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1">
                  <span>Cero Falsas Alarmas</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B1E2E] border border-teal-500/30 space-y-3 relative group hover:border-teal-400 transition-all">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center font-mono font-black text-teal-300 text-sm">
                  04
                </div>
                <h4 className="font-bold text-white text-base">Retorno Económico al Productor</h4>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">
                  Con heladas previstas 4 horas antes y riego dosificado al milímetro, el agricultor ahorra agua, combustible y protege su cosecha.
                </p>
                <div className="pt-2 text-[10px] font-mono text-teal-300 font-bold flex items-center gap-1">
                  <span>Reinversión en el Campo</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>

            </div>

            {/* Infographic Note */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-[#0B1E2E] border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="font-bold text-white text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Seguridad de Datos y Propiedad Privada Blindada</span>
                </h4>
                <p className="text-xs text-slate-300 font-serif max-w-2xl leading-relaxed">
                  Los datos agronómicos y coordenadas individuales de cada agricultor son confidenciales y están encriptados. El efecto red solo comparte tendencias macroclimáticas anónimas (temperatura, vectores de viento y balances hidrológicos de cuenca).
                </p>
              </div>
              <a
                href="https://wa.me/56976696142?text=Hola%20AgroTech,%20quiero%20conocer%20mas%20del%20efecto%20red%20para%20mi%20zona"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-mono font-bold text-xs shrink-0 flex items-center gap-1.5 hover:bg-emerald-400 transition-all shadow-lg"
              >
                <span>Consultar por Mi Comuna</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 3: ROADMAP & FASES DE MADURACIÓN */}
        {activeTab === 'roadmap' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-3 text-center max-w-3xl mx-auto">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                Principio N.° 3 • Transparencia de Maduración
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Roadmap Oficial en 3 Fases: En Qué Está AgroTech Hoy
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-serif leading-relaxed">
                Queremos que los agricultores, exportadoras e inversionistas entiendan con absoluta transparencia cómo evoluciona nuestra arquitectura: $0 inventario propio en Fase 1, upgrade físico IoT bajo demanda en Fase 2, y escala territorial y ecosistémica en Fase 3.
              </p>
            </div>

            {/* Timeline Horizontal / Staged Cards */}
            <div className="space-y-6">

              {/* FASE 1: ACTUAL */}
              <div className="rounded-3xl bg-[#091724] border-2 border-emerald-500/60 p-6 sm:p-8 space-y-5 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/60 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-mono font-black text-xs uppercase tracking-wide">
                      OPERATIVO HOY • FASE 1
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Fase 1: Ecosistema 100% Software & Micro-SaaS ($0 Inventario)
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">6 Productos Operativos</span>
                </div>

                <p className="text-sm text-slate-300 font-serif leading-relaxed">
                  Cero inventario propio ni compras forzadas a puerta fría. El agricultor entra gratis por WhatsApp en 60s con <strong>X AgroAlerta</strong>, desbloquea compras integradas en 1 clic (Informe Express, Pasaporte EUDR, Carpeta CNR), escala a micro-SaaS de riesgo y gestión predial avanzada con Sensores Virtuales (Richards-MONICA 1D), y diseña su campo desde cero con Keyline.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 font-sans text-xs">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-mono">1</span>
                      <span>X AgroAlerta</span>
                    </div>
                    <span className="text-slate-400 text-[11px] block">Gancho gratuito WhatsApp (60s) + add-ons pagos en 1 clic (Informe Express, EUDR, CNR).</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[10px] font-mono">2</span>
                      <span>X Agua & Riego</span>
                    </div>
                    <span className="text-slate-400 text-[11px] block">Balance FAO-56 diario, reservas de tranque y ahorro de energía en tarifa eléctrica nocturna valle.</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-mono">3</span>
                      <span>X Incendios</span>
                    </div>
                    <span className="text-slate-400 text-[11px] block">Monitoreo WUI, viento Puelche 30-30-30, simulación Rothermel y humectación preventiva por API.</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px] font-mono">4</span>
                      <span>X Visión & Vuelo</span>
                    </div>
                    <span className="text-slate-400 text-[11px] block">Conecta cámaras IP/4G y drones existentes del productor para vigilancia IA y ortomosaicos NDVI.</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-mono">5</span>
                      <span>X AgriTwin Maestro</span>
                    </div>
                    <span className="text-slate-400 text-[11px] block">Administración predial con Sensores Virtuales (Richards-MONICA 1D sin sondas), 3D AMR y What-If.</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-[10px] font-mono">6</span>
                      <span>X Keyline</span>
                    </div>
                    <span className="text-slate-400 text-[11px] block">Diseño regenerativo desde cero bajo Escala de Permanencia, líneas clave, tranques y CutSheetRX.</span>
                  </div>
                </div>
              </div>

              {/* FASE 2: HARDWARE */}
              <div className="rounded-3xl bg-[#091724] border border-amber-500/40 p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/60 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400 text-amber-300 font-mono font-bold text-xs uppercase tracking-wide">
                      UPGRADE BAJO DEMANDA • FASE 2
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Fase 2: X Kits IoT, Actuadores & Energía Off-Grid
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-bold">Solo Clientes Validados de Fase 1</span>
                </div>

                <p className="text-sm text-slate-300 font-serif leading-relaxed">
                  Para predios que ya operan y confían en nuestro software. Se despliega telemetría física in-situ de alta precisión mediante fabricación Just-In-Time: sondas capacitivas FDR tri-estrato, controladores de bombas y aspersores LoRaWAN, y estaciones solares LiFePO4 de 15 días de autonomía.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-sans text-xs">
                  <div className="p-3 rounded-xl bg-black/30 border border-amber-500/20 space-y-1">
                    <span className="font-bold text-white block">Sondas FDR Tri-Estrato</span>
                    <span className="text-slate-400 text-[11px]">Medición física de humedad radicular a 0-20, 20-60 y 60-100 cm.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/30 border border-amber-500/20 space-y-1">
                    <span className="font-bold text-white block">Controladores LoRaWAN</span>
                    <span className="text-slate-400 text-[11px]">Encendido remoto de electroválvulas, bombas y aspersores antihelada.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/30 border border-amber-500/20 space-y-1">
                    <span className="font-bold text-white block">Energía Solar LiFePO4</span>
                    <span className="text-slate-400 text-[11px]">Baterías de litio ferrofosfato con 15 días de autonomía sin sol directo.</span>
                  </div>
                </div>
              </div>

              {/* FASE 3: ECOSISTEMA */}
              <div className="rounded-3xl bg-[#091724] border border-teal-500/40 p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-900/60 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400 text-teal-300 font-mono font-bold text-xs uppercase tracking-wide">
                      SERVICIOS TERRITORIALES • FASE 3
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Fase 3: X Territorio, Cuencas & Living Lab
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-teal-400 font-bold">B2G & Validación Empírica</span>
                </div>

                <p className="text-sm text-slate-300 font-serif leading-relaxed">
                  Proyectos de resiliencia hídrica de cuencas para municipios, Juntas de Vigilancia (JVRL), comités de agua potable rural (APRs) e INDAP. Centro de investigación agronómica y demostración empírica en el <strong>Living Lab ubicado donde Rudi (Parral)</strong>, con validación de biopreparados, salud microbiológica de suelo y transferencia comunitaria.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-sans text-xs">
                  <div className="p-3 rounded-xl bg-black/30 border border-teal-500/20 space-y-1">
                    <span className="font-bold text-white block">Living Lab en Parral (donde Rudi)</span>
                    <span className="text-slate-400 text-[11px]">Validación empírica en campo de biopreparados, suelo y microclima.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/30 border border-teal-500/20 space-y-1">
                    <span className="font-bold text-white block">Resiliencia de Cuencas B2G</span>
                    <span className="text-slate-400 text-[11px]">Monitoreo hidrológico para Juntas de Vigilancia de Ríos y Comités APR.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/30 border border-teal-500/20 space-y-1">
                    <span className="font-bold text-white block">Transferencia Técnica</span>
                    <span className="text-slate-400 text-[11px]">Capacitación agroecológica comunitaria y fondos CNR Ley 18.450 / GORE.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* BOTTOM GLOBAL CALL TO ACTION */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0C2417] to-[#0A1A2B] border-2 border-emerald-400/50 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Únete a la Red Agrícola del Maule</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white">
            ¿Listo para Probar la Primera Capa en su Predio?
          </h3>

          <p className="text-sm sm:text-base text-slate-200 font-serif max-w-2xl mx-auto leading-relaxed">
            Active AgroAlerta en su teléfono en menos de un minuto o coordine una visita técnica a su campo para evaluar sensores FDR y modelado 3D.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/56976696142?text=Hola%20AgroTech,%20quiero%20activar%20AgroAlerta%20para%20mi%20predio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-sm flex items-center gap-2 shadow-xl transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Activar AgroAlerta (WhatsApp)</span>
            </a>

            {onNavigate && (
              <button
                onClick={() => onNavigate('agritwin')}
                className="px-6 py-3 rounded-xl bg-[#0E1E30] hover:bg-slate-800 border border-amber-400/60 text-amber-300 font-bold font-mono text-sm flex items-center gap-2 transition-all"
              >
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Explorar Gemelo 3D (Showcase)</span>
              </button>
            )}
          </div>
        </div>

      </main>

    </div>
  );
};
