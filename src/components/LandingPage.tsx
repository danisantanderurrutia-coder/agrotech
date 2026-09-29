import React from 'react';
import { 
  Presentation, Cpu, Map, Layers, Sparkles, ArrowRight, CheckCircle2, 
  ShieldAlert, Thermometer, Radio, Activity, Globe, Leaf, FileText, Zap, Award 
} from 'lucide-react';
import { KiotTelemetrySimulator } from './KiotTelemetrySimulator';
import { InteractiveRewildMapper } from './InteractiveRewildMapper';
import { HeroSection } from './HeroSection';
import { BlackBoxAndSolutionsSection } from './BlackBoxAndSolutionsSection';

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
        <div className="space-y-2 text-center max-w-3xl mx-auto">
          <span className="text-amber-600 font-sans text-xs font-bold uppercase tracking-wider">
            PRODUCTOS CON MAYOR TRACCIÓN Y DEMANDA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
            Soluciones Estrella <span className="text-emerald-700">Agro-Precisión Maule</span>
          </h2>
          <p className="text-slate-600 text-base font-serif">
            Tres líneas clave que generan ingresos desde el Mes 1 hasta contratos B2B con exportadoras europeas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Kit KioT */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-emerald-500/50 transition-all space-y-4 flex flex-col justify-between group shadow-sm bg-white">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                  HARDWARE IOT
                </span>
                <span className="text-amber-700 font-bold">$180k-320k CLP</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Estación Telemétrica Anti-Heladas
              </h3>

              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Nodo estanco IP65 autónomo con sensor DS18B20 (±0.5°C) y conectividad LoRa/WiFi para alertar heladas en arándanos y viñedos.
              </p>
            </div>

            <button
              onClick={() => onNavigate('hardware')}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Ver Especificaciones Teóricas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Informes Climáticos */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-amber-500/50 transition-all space-y-4 flex flex-col justify-between group shadow-sm bg-white">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">
                  RIESGO PREDIAL
                </span>
                <span className="text-emerald-800 font-bold">€80 - €200</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                Informes de Riesgo Climático
              </h3>

              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Reporte PDF pre-compra de parcelas con histórico de heladas a 15 años y disponibilidad hídrica subterránea de la ESA/NASA.
              </p>
            </div>

            <button
              onClick={() => onNavigate('satellites')}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-mono text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Solicitar Informe Predial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: RewildMapper */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-emerald-600/50 transition-all space-y-4 flex flex-col justify-between group shadow-sm bg-white">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-bold">
                  SATÉLITE & ESG
                </span>
                <span className="text-emerald-800 font-bold">$65.000 CLP/mes</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                RewildMapper & Pasaporte Verde
              </h3>

              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Plataforma SaaS de diagnóstico satelital que certifica unidades de biodiversidad nativa (PBC) para exportadoras chilenas en la UE.
              </p>
            </div>

            <button
              onClick={() => onNavigate('satellites')}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-300 font-mono text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Probar Visor RewildMapper</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
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
