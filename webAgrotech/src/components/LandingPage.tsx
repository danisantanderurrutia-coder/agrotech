import React from 'react';
import { 
  Presentation, Cpu, Map, Layers, Sparkles, ArrowRight, CheckCircle2, 
  ShieldAlert, Thermometer, Radio, Activity, Globe, Leaf, FileText, Zap, Award 
} from 'lucide-react';
import { KiotTelemetrySimulator } from './KiotTelemetrySimulator';
import { InteractiveRewildMapper } from './InteractiveRewildMapper';
import { HeroSection } from './HeroSection';
import { BlackBoxAndSolutionsSection } from './BlackBoxAndSolutionsSection';
import { ProductPortfolioSection } from './ProductPortfolioSection';

interface LandingPageProps {
  onOpenPitchDeck: () => void;
  onNavigate: (viewId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenPitchDeck, onNavigate }) => {
  return (
    <div className="space-y-20 animate-fadeIn pb-12">
      
      {/* HERO SECTION */}
      <HeroSection 
        onOpenPitchDeck={onOpenPitchDeck}
        onNavigateToProducts={() => onNavigate('hardware')}
        onNavigateToAgroTwin={() => onNavigate('agritwin')}
      />

      {/* MATRIZ DE 4 PERFILES & ARQUITECTURA CAJA NEGRA */}
      <BlackBoxAndSolutionsSection 
        onOpenPitchDeck={onOpenPitchDeck}
        onNavigate={onNavigate}
      />

      {/* SECCIÓN TRÍO ESTRELLA DE PRODUCTOS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-sans font-bold">
            <span>Roadmap de Despliegue Secuencial · Software First</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
            Soluciones Estrella <span className="text-emerald-700">Agro-Precisión Maule</span>
          </h2>
          <p className="text-slate-600 text-base font-serif">
            Habilitamos el software de uno en uno: desde alertas de bolsillo en WhatsApp hasta el gemelo digital de cuenca. El hardware y el ecosistema físico se conectan como upgrade progresivo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-mono text-slate-600">
            <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 font-bold">FASE 1: SOFTWARE & DATA FLYWHEEL (HOY)</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-bold">FASE 2: HARDWARE IOT CONECTADO</span>
            <span>→</span>
            <span className="px-2.5 py-1 rounded bg-purple-100 text-purple-800 font-bold">FASE 3: ECOSISTEMA & LIVING LAB</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: AgroAlerta Pocket (Hero Micro-SaaS) */}
          <div className="glass-panel p-6 rounded-2xl border-2 border-emerald-500 hover:border-emerald-400 transition-all space-y-4 flex flex-col justify-between group shadow-lg bg-gradient-to-b from-emerald-50/40 via-white to-amber-50/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-600 to-amber-500 text-white text-[9px] font-mono font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              MICRO-SAAS ESTRELLA · WHATSAPP 60S
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                  DE BOLSILLO · CERO FRICCIÓN
                </span>
                <span className="text-emerald-700 font-bold">Gratis / $9.900 mes</span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors">
                AgroAlerta: Telemetría de Bolsillo
              </h3>

              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Alertas satelitales en 60 segundos directo a tu WhatsApp: heladas katabáticas (ColdFlow), piro-riesgo extremo de incendios (FWI), estrés hídrico radicular y ventanas de viento. Sin apps pesadas ni configuraciones.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="https://wa.me/56976696142?text=Hola%20AgroTech,%20quiero%20activar%20AgroAlerta%20para%20mi%20predio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Activar Alertas por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>
          </div>

          {/* Card 2: AgriTwin 3D Maestro */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-emerald-500/50 transition-all space-y-4 flex flex-col justify-between group shadow-sm bg-white">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-900 font-bold border border-blue-300">
                  EL TWIN MAESTRO
                </span>
                <span className="text-blue-800 font-bold">SaaS Cuencas & B2B</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                AgriTwin 3D: Núcleo Biofísico
              </h3>

              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                El Plan Maestro territorial que procesa topografía 3D WebGL, balance hídrico de cuenca completa y provee las APIs para el Feature Stacking de todos los módulos hijos.
              </p>
            </div>

            <button
              onClick={() => onNavigate('agritwin')}
              className="w-full py-2.5 rounded-xl bg-[#0B2519] border border-emerald-500/50 text-amber-300 font-mono text-xs font-bold hover:bg-[#123827] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explorar Gemelo 3D en Vivo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Pasaporte Verde UE & Informes Terran */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-emerald-600/50 transition-all space-y-4 flex flex-col justify-between group shadow-sm bg-white">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-bold">
                  EXPORTACIÓN & ESG
                </span>
                <span className="text-emerald-800 font-bold">Desde $85k / €650</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Informes Terran & Pasaporte Verde
              </h3>

              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Monetización inmediata en 24h: diagnóstico geofísico pre-compra de parcelas (agua y heladas) + auditoría satelital libre de deforestación EUDR con QR para aduanas europeas.
              </p>
            </div>

            <button
              onClick={() => onNavigate('satellites')}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-300 font-mono text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Pedir Informe / Certificar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* PORTAFOLIO COMPLETO DE 7 LÍNEAS DE PRODUCTOS & PRECIOS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <ProductPortfolioSection />
      </section>

      {/* CONSOLA DUAL DE DEMOSTRACIÓN (IoT TELEMETRY + REWILDMAPPER) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 space-y-8">
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <span className="text-emerald-800 font-mono text-xs font-bold uppercase tracking-wider">
            DEMOSTRACIÓN INTERACTIVA DE INGENIERÍA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
            Prueba las Consolas de <span className="text-amber-600">Telemetría & Satélite</span>
          </h2>
        </div>

        <div className="space-y-12">
          <KiotTelemetrySimulator />
          <InteractiveRewildMapper />
        </div>
      </section>

      {/* QUICK SOMOS BANNER TEASER */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="glass-panel-green p-8 sm:p-12 rounded-3xl border border-emerald-500/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0B2519] text-white">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-amber-400 font-mono text-xs font-bold uppercase">
              CONOCE AL EQUIPO FUNDADOR (MAULE 🇨🇱 & ALEMANIA 🇩🇪)
            </span>
            <h3 className="text-3xl font-extrabold text-white">
              "No vendemos trajes de escritorio. Vendemos mecatrónica de terreno con las botas en el barro."
            </h3>
            <p className="text-sm text-emerald-100/80 font-serif leading-relaxed">
              Descubre la sinergia entre el taller de soldadura PCB en Talca y el laboratorio de geofísica climática en Friburgo.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              onClick={() => onNavigate('somos')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold font-mono text-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-md"
            >
              <span>Conocer al Equipo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
