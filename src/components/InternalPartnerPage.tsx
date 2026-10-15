import React, { useState } from 'react';
import { CommercialStrategySection } from './CommercialStrategySection';
import { ProductPortfolioSection } from './ProductPortfolioSection';
import { MarketStudyAndEconomicsSection } from './MarketStudyAndEconomicsSection';
import { BomAndHardwareMatrix } from './BomAndHardwareMatrix';
import { SocialMediaKitSection } from './SocialMediaKitSection';
import { FounderAcademySection } from './FounderAcademySection';
import { ChangelogHistorySection } from './ChangelogHistorySection';
import { ExecutiveBulletinsSection } from './ExecutiveBulletinsSection';
import { Lock, ArrowLeft, Presentation, Share2, Layers, BarChart3, Wrench, ShieldCheck, Sparkles, BookOpen, Sprout, History, TrendingUp, FileText } from 'lucide-react';

interface InternalPartnerPageProps {
  onNavigate: (viewId: string) => void;
  onOpenPitchDeck: () => void;
}

export const InternalPartnerPage: React.FC<InternalPartnerPageProps> = ({ onNavigate, onOpenPitchDeck }) => {
  const [internalTab, setInternalTab] = useState<'changelog' | 'commercial' | 'bulletins' | 'academy' | 'economics' | 'revenue' | 'bom' | 'social'>('bulletins');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('agrotech_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === '2026') {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('agrotech_admin_auth', 'true');
      } catch {
        // no-op
      }
      setErrorMsg('');
    } else {
      setErrorMsg('Contraseña incorrecta. Acceso restringido.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('agrotech_admin_auth');
    } catch {
      // no-op
    }
    setPasswordInput('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#071A11]">
        <div className="w-full max-w-md bg-[#0B2519] border border-emerald-500/30 rounded-2xl p-8 shadow-2xl space-y-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              Seguridad Fundacional • SpA
            </span>
            <h2 className="text-2xl font-black text-white">Panel de Administrador</h2>
            <p className="text-xs text-emerald-200/70 font-serif">
              Ingresa la clave maestra para acceder a los Boletines Ejecutivos, métricas financieras y estrategia de gobierno.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-mono text-emerald-300">Contraseña de Acceso:</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="••••"
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-emerald-500/40 text-center text-xl tracking-widest text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all placeholder:text-slate-600"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 font-medium bg-rose-950/40 border border-rose-800/60 py-2 rounded-lg animate-shake">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-lg hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
            >
              Desbloquear Panel
            </button>
          </form>

          <button
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Inicio</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B2519] py-12 border-b border-[#1E3A2B] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigate('landing')}
                className="inline-flex items-center gap-2 font-sans font-bold text-xs text-amber-400 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a Inicio</span>
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/60 border border-rose-800/50 text-rose-300 text-[11px] font-mono hover:bg-rose-900 transition-colors"
                title="Bloquear panel de administrador"
              >
                <Lock className="w-3 h-3 text-rose-400" />
                <span>Bloquear</span>
              </button>
            </div>

            {/* HQ privado (:7770) y suites solo existen en la máquina local */}
            {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
              <a
                href="http://localhost:7770"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#071A11] border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold hover:bg-amber-500 hover:text-[#0B2519] transition-all"
                title="Consola privada del fundador"
              >
                <Lock className="w-3 h-3" />
                <span>Abrir AgroTech HQ (Cockpit Fundador)</span>
              </a>
            )}
          </div>

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
                onClick={() => setInternalTab('bulletins')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                  internalTab === 'bulletins'
                    ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300/50 font-black'
                    : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-900'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Boletines Ejecutivos (N.° 1)</span>
              </button>

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
        
        {internalTab === 'bulletins' && (
          <ExecutiveBulletinsSection />
        )}

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
