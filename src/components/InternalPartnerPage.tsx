import React, { useState } from 'react';
import { CommercialStrategySection } from './CommercialStrategySection';
import { ProductPortfolioSection } from './ProductPortfolioSection';
import { MarketStudyAndEconomicsSection } from './MarketStudyAndEconomicsSection';
import { BomAndHardwareMatrix } from './BomAndHardwareMatrix';
import { SocialMediaKitSection } from './SocialMediaKitSection';
import { FounderAcademySection } from './FounderAcademySection';
import { ChangelogHistorySection } from './ChangelogHistorySection';
import { Lock, ArrowLeft, Presentation, Share2, Layers, BarChart3, Wrench, ShieldCheck, Sparkles, BookOpen, Sprout, History, TrendingUp } from 'lucide-react';

interface InternalPartnerPageProps {
  onNavigate: (viewId: string) => void;
  onOpenPitchDeck: () => void;
}

export const InternalPartnerPage: React.FC<InternalPartnerPageProps> = ({ onNavigate, onOpenPitchDeck }) => {
  const [internalTab, setInternalTab] = useState<'changelog' | 'commercial' | 'academy' | 'economics' | 'revenue' | 'bom' | 'social'>('commercial');

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B2519] py-12 border-b border-[#1E3A2B] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          <button 
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-2 font-sans font-bold text-xs text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Inicio</span>
          </button>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-sans font-bold">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Acceso Interno Socios • Daniel Santander & Paulina Urrutia</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071A11] border border-emerald-500/40 text-emerald-300 text-xs font-mono shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-amber-400">Versión: "Semilla brotando"</span>
                <span className="text-emerald-500">•</span>
                <span>v2.6.0 (Vie 25 Sep 2026, 20:25)</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Panel de Administrador <span className="text-amber-400">& Estrategia B2B</span>
            </h1>

            <p className="text-base text-emerald-100/80 font-serif max-w-3xl">
              Centro de mando privado para fundadores. Historial evolutivo prompt a prompt, datos de versión vigentes, academia B2B, finanzas SpA y costos de hardware.
            </p>
          </div>

          {/* Internal Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-emerald-900/60">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setInternalTab('changelog')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                  internalTab === 'changelog'
                    ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/50 font-black'
                    : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span>Historial & Versión ("Semilla brotando")</span>
              </button>

              <button
                onClick={() => setInternalTab('commercial')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                  internalTab === 'commercial'
                    ? 'bg-amber-500 text-[#0B2519] shadow-md ring-2 ring-amber-400/50 font-black'
                    : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-amber-300" />
                <span>Estrategia Comercial & GTM</span>
              </button>

              <button
                onClick={() => setInternalTab('academy')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                  internalTab === 'academy'
                    ? 'bg-amber-500 text-[#0B2519] shadow-md ring-2 ring-amber-400/50'
                    : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#0B2519]" />
                <span>Academia del Fundador (B2B)</span>
              </button>

              <button
                onClick={() => setInternalTab('economics')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                  internalTab === 'economics'
                    ? 'bg-amber-500 text-[#0B2519] shadow-md'
                    : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Estudio Mercado & Costos</span>
              </button>

              <button
                onClick={() => setInternalTab('revenue')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                  internalTab === 'revenue'
                    ? 'bg-amber-500 text-[#0B2519] shadow-md'
                    : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Portafolio Triádico (7 Líneas)</span>
              </button>

              <button
                onClick={() => setInternalTab('bom')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                  internalTab === 'bom'
                    ? 'bg-amber-500 text-[#0B2519] shadow-md'
                    : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>Matriz BOM Hardware</span>
              </button>

              <button
                onClick={() => setInternalTab('social')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                  internalTab === 'social'
                    ? 'bg-amber-500 text-[#0B2519] shadow-md'
                    : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>Kit de Redes Sociales</span>
              </button>
            </div>

            <button
              onClick={onOpenPitchDeck}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] font-sans font-bold text-xs shadow-md hover:brightness-110 transition-all"
            >
              <Presentation className="w-4 h-4" />
              <span>Pitch Decks (Proyecto • Mercado • Gobernanza • Comercial)</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {internalTab === 'changelog' && (
          <ChangelogHistorySection />
        )}

        {internalTab === 'commercial' && (
          <CommercialStrategySection onOpenPitchDeck={onOpenPitchDeck} />
        )}

        {internalTab === 'academy' && (
          <FounderAcademySection />
        )}

        {internalTab === 'economics' && (
          <MarketStudyAndEconomicsSection />
        )}

        {internalTab === 'revenue' && (
          <ProductPortfolioSection />
        )}

        {internalTab === 'bom' && (
          <div className="rounded-3xl overflow-hidden border border-slate-200">
            <BomAndHardwareMatrix />
          </div>
        )}

        {internalTab === 'social' && (
          <SocialMediaKitSection />
        )}

      </div>

    </div>
  );
};
