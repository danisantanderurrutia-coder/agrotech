import React, { useState } from 'react';
import { 
  Layers, Satellite, Cpu, MessageSquare, ArrowRight, CheckCircle2, 
  Building2, ShieldAlert, Sparkles, Droplets, Flame, Globe2, 
  TreePine, FileText, Check, ChevronRight, Share2, Compass, Zap
} from 'lucide-react';

interface BlackBoxAndSolutionsProps {
  onOpenPitchDeck: () => void;
  onNavigate: (viewId: string) => void;
}

export const BlackBoxAndSolutionsSection: React.FC<BlackBoxAndSolutionsProps> = ({ 
  onOpenPitchDeck, 
  onNavigate 
}) => {
  const [activeProfile, setActiveProfile] = useState<'b2b' | 'gov' | 'esg' | 'perma'>('b2b');

  const profiles = [
    {
      id: 'b2b' as const,
      label: 'Agrícolas & Viñedos',
      tag: 'B2B PRIVADO',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      headline: 'Riego Milimétrico & Blindaje Anti-Heladas por Cuartel',
      subheadline: 'Elimina el sobrecosto eléctrico por bombeo y optimiza el calibre de uvas y frutales mediante simulación biofísica.',
      dashboardPreview: {
        title: 'AgroTwin Enterprise Suite',
        metric1Label: 'ESTRÉS HÍDRICO (CWSI)',
        metric1Val: '0.24 (Óptimo)',
        metric2Label: 'LÁMINA DE RIEGO',
        metric2Val: '28 mm / semana',
        metric3Label: 'ALERTA DE HELADA',
        metric3Val: 'Sin riesgo (> 2.5°C)',
        outputChannel: 'WhatsApp del Administrador + Panel Web 3D'
      },
      deliverable: 'Plan semanal de riego por milímetros y alerta temprana de heladas radiativas a las 05:00 AM.',
      ctaText: 'Solicitar Simulación de Mi Predio (Demo 48h)',
      ctaAction: () => onOpenPitchDeck()
    },
    {
      id: 'gov' as const,
      label: 'Municipios & APRs',
      tag: 'GOBERNANZA & TERRITORIO',
      tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
      headline: 'Semáforo de Acuíferos & Prevención de Incendios',
      subheadline: 'Monitoreo de balance hídrico de cuenca y carga de combustible seco en la interfaz urbano-forestal para alcaldías y comités de agua.',
      dashboardPreview: {
        title: 'AgroTwin Territorial Monitor',
        metric1Label: 'RECARGA ACUÍFERO',
        metric1Val: 'Semáforo Amarillo (68%)',
        metric2Label: 'CONSUMO COMUNAL',
        metric2Val: '-12% tasa estacional',
        metric3Label: 'PIRO-RIESGO INTERFAZ',
        metric3Val: 'Alto en Ribera Sur (FWI 42)',
        outputChannel: 'Boletín COE Municipal + Alerta APR'
      },
      deliverable: 'Mapa de cortafuegos prioritarios y proyección de agotamiento de pozos para evitar camiones aljibe.',
      ctaText: 'Solicitar Diagnóstico Territorial & Cuenca',
      ctaAction: () => onOpenPitchDeck()
    },
    {
      id: 'esg' as const,
      label: 'Fondos ESG & Cooperación',
      tag: 'MRV & FINANZAS VERDES',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      headline: 'Auditoría de Carbono & Cero Deforestación (EUDR)',
      subheadline: 'Métricas de biomasa y biodiversidad nativa con series de 10 años respaldadas con firma inmutable para la UE, GIZ y BID.',
      dashboardPreview: {
        title: 'AgroTwin ESG / MRV Ledger',
        metric1Label: 'CAPTURA DE CARBONO',
        metric1Val: '4.8 tCO2e / ha / año',
        metric2Label: 'INTEGRIDAD ECOLÓGICA',
        metric2Val: 'Índice IEI: 0.88 / 1.0',
        metric3Label: 'COMPLIANCE EUDR',
        metric3Val: '100% Cero Deforestación post-2020',
        outputChannel: 'Pasaporte Verde Criptográfico PDF/JSON'
      },
      deliverable: 'Informe técnico de debida diligencia ambiental listo para bancos internacionales y directivas europeas.',
      ctaText: 'Agendar Auditoría MRV de Biodiversidad',
      ctaAction: () => onNavigate('satellites-pasaporte')
    },
    {
      id: 'perma' as const,
      label: 'Permacultura & Huertos',
      tag: 'AGROECOLOGÍA FAMILIAR',
      tagColor: 'bg-lime-100 text-lime-900 border-lime-300',
      headline: 'Cosecha de Agua de Lluvia & Resiliencia Regenerativa',
      subheadline: 'Diseño hidrológico en curvas de nivel (Keyline) y calendario bioclimático adaptado a la sequía del valle central.',
      dashboardPreview: {
        title: 'AgroTwin Comunitario Abierto',
        metric1Label: 'ZANJAS DE INFILTRACIÓN',
        metric1Val: '3 líneas recomendadas',
        metric2Label: 'HUMEDAD EN RAÍZ 20CM',
        metric2Val: '58% Capacidad de Campo',
        metric3Label: 'CALENDARIO BIOCLIMÁTICO',
        metric3Val: 'Siembra óptima: Semana 38',
        outputChannel: 'Ficha Agroecológica de Bolsillo'
      },
      deliverable: 'Guía práctica para retener agua en el suelo sin fertilizantes químicos ni riego motorizado costoso.',
      ctaText: 'Acceder a Diagnóstico Comunitario',
      ctaAction: () => onNavigate('community')
    }
  ];

  const currentProfileData = profiles.find(p => p.id === activeProfile)!;

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-amber-600 font-sans text-xs font-bold uppercase tracking-wider">
          ARQUITECTURA DE VALOR ADAPTATIVA
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B2519] tracking-tight">
          Una Sola Ciencia Biofísica, <br />
          <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 bg-clip-text text-transparent">
            4 Soluciones a tu Medida
          </span>
        </h2>
        <p className="text-slate-600 text-base font-serif">
          El mismo núcleo de simulación geoespacial se adapta al lenguaje de cada actor territorial, entregando exactamente las métricas que mueven su aguja económica o ambiental.
        </p>
      </div>

      {/* 4 PROFILES SELECTOR TABS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {profiles.map((p) => {
          const isActive = activeProfile === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActiveProfile(p.id)}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                isActive 
                  ? 'bg-[#0B2519] text-white border-emerald-500/50 shadow-lg ring-2 ring-emerald-500/30' 
                  : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block w-fit border ${
                isActive ? 'bg-emerald-900/80 text-emerald-300 border-emerald-500/40' : p.tagColor
              }`}>
                {p.tag}
              </span>
              <div className="font-bold text-sm sm:text-base">{p.label}</div>
            </button>
          );
        })}
      </div>

      {/* PROFILE DETAIL DISPLAY BOX */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left column: Story & Pitch */}
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${currentProfileData.tagColor}`}>
              {currentProfileData.tag}
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {currentProfileData.headline}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 font-serif leading-relaxed">
              {currentProfileData.subheadline}
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
              <span className="text-xs font-mono font-bold text-emerald-900 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Entregable Concreto de Decisión:
              </span>
              <p className="text-xs sm:text-sm text-emerald-950 font-serif">
                {currentProfileData.deliverable}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={currentProfileData.ctaAction}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] font-bold text-sm shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{currentProfileData.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right column: Simulated Dashboard Mockup */}
        <div className="lg:col-span-5 bg-[#071810] p-8 sm:p-10 text-white border-t lg:border-t-0 lg:border-l border-emerald-900/50 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-emerald-300">
                  {currentProfileData.dashboardPreview.title}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-amber-400 border border-emerald-500/30">
                Ground-Truth Sim
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#0B2519] border border-emerald-800/60 space-y-0.5">
                <span className="text-[10px] font-mono text-emerald-300/70 block">
                  {currentProfileData.dashboardPreview.metric1Label}
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {currentProfileData.dashboardPreview.metric1Val}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B2519] border border-emerald-800/60 space-y-0.5">
                <span className="text-[10px] font-mono text-emerald-300/70 block">
                  {currentProfileData.dashboardPreview.metric2Label}
                </span>
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {currentProfileData.dashboardPreview.metric2Val}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0B2519] border border-emerald-800/60 space-y-0.5">
                <span className="text-[10px] font-mono text-emerald-300/70 block">
                  {currentProfileData.dashboardPreview.metric3Label}
                </span>
                <span className="text-sm font-bold text-amber-400 font-mono">
                  {currentProfileData.dashboardPreview.metric3Val}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-900/60 text-xs font-mono text-emerald-200/80 flex items-center justify-between">
            <span>Canal:</span>
            <span className="text-white font-bold">{currentProfileData.dashboardPreview.outputChannel}</span>
          </div>
        </div>

      </div>

      {/* THE "BLACK BOX EXPLAINED" ARCHITECTURE SECTION */}
      <div className="bg-[#071810] rounded-3xl p-8 sm:p-12 border border-emerald-500/30 text-white space-y-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative z-10">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            EL MOTOR DETRÁS DE LA CORTINA
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Cómo Transformamos Datos Complejos en <span className="text-amber-400">Decisiones en WhatsApp</span>
          </h3>
          <p className="text-emerald-100/80 text-sm sm:text-base font-serif leading-relaxed">
            No necesitas ser un meteorólogo ni un físico de suelos. Nuestro software absorbe terabytes de datos invisibles, ejecuta las ecuaciones biofísicas oficiales y te entrega la orden de riego o alerta en tu teléfono.
          </p>
        </div>

        {/* 3-STEP PIPELINE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* Step 1 */}
          <div className="bg-[#0B2519] p-6 rounded-2xl border border-emerald-500/30 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h4 className="text-lg font-bold text-white">Ingesta Multi-Órbita & Microclima</h4>
              <p className="text-xs text-emerald-100/80 font-serif leading-relaxed">
                Sentinel-2 y Landsat fotografían el predio en infrarrojo cada 5 días. Acoplamos reanálisis climático horario ERA5-Land y modelos de elevación topográfica (DEM).
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-900/60 font-mono text-[11px] text-amber-400">
              Datos Abiertos • 10m Resolución
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#0B2519] p-6 rounded-2xl border border-emerald-500/30 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h4 className="text-lg font-bold text-white">Motor Biofísico AgroTwin</h4>
              <p className="text-xs text-emerald-100/80 font-serif leading-relaxed">
                Calcula la evapotranspiración real con Penman-Monteith FAO-56 y simula el agua en 3 capas de suelo (0-20, 20-60, 60-100cm) acoplada al drenaje de aire frío.
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-900/60 font-mono text-[11px] text-emerald-400">
              Ground-Truth Sim • FAO-56 ETo
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0B2519] p-6 rounded-2xl border border-emerald-500/30 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h4 className="text-lg font-bold text-white">Acción Directa en WhatsApp</h4>
              <p className="text-xs text-emerald-100/80 font-serif leading-relaxed">
                El agricultor recibe un mensaje simple: "Regar 35 min hoy en Sector 2" o "Riesgo de helada de -1.5°C a las 05:30". Cuando enchufa sensores físicos, el gemelo se autocalibra a &gt;95%.
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-900/60 font-mono text-[11px] text-amber-400">
              Acción Inmediata • Cero Fricción
            </div>
          </div>

        </div>

        {/* DATA FLYWHEEL FOOTNOTE */}
        <div className="pt-4 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>El Flywheel: Simulación Satelital Hoy ➔ Calibración LoRaWAN en Terreno Mañana</span>
          </div>
          <button
            onClick={() => onNavigate('agritwin')}
            className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
          >
            <span>Ver el Gemelo AgroTwin en Acción</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </section>
  );
};
