import React, { useState, useEffect } from 'react';
import { 
  Layers, Cpu, Globe, ExternalLink, Terminal, CheckCircle2, 
  AlertCircle, Play, RefreshCw, Sparkles, Trees, ShieldCheck, 
  Activity, ArrowRight, Compass, Info, Maximize2, MonitorPlay,
  Zap, Database, Radio, Server, Check, Flame, ChevronRight,
  MapPin, Shield, Mountain, Droplets, Wind
} from 'lucide-react';
import { PermacultureSection } from './PermacultureSection';

interface EcosystemAppsHubProps {
  initialApp?: 'agritwin' | 'regional' | 'rewild' | 'overview' | 'permaculture';
  onNavigate?: (viewId: string) => void;
}

export const EcosystemAppsHub: React.FC<EcosystemAppsHubProps> = ({ 
  initialApp = 'overview', 
  onNavigate 
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'agritwin' | 'regional' | 'rewild' | 'permaculture'>(
    initialApp === 'agritwin' ? 'agritwin' : initialApp === 'regional' ? 'regional' : initialApp === 'rewild' ? 'rewild' : initialApp === 'permaculture' ? 'permaculture' : 'overview'
  );
  
  useEffect(() => {
    if (initialApp) {
      setSelectedTab(initialApp);
    }
  }, [initialApp]);
  
  // Live ping status (Zero iframe overhead)
  const [agrotechOnline, setAgrotechOnline] = useState<boolean | null>(true);
  const [agritwinOnline, setAgritwinOnline] = useState<boolean | null>(null);
  const [rewildOnline, setRewildOnline] = useState<boolean | null>(null);
  const [agritwinRegionalOnline, setAgritwinRegionalOnline] = useState<boolean | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  const checkServers = async () => {
    setCheckingStatus(true);
    try {
      const atRes = await fetch('http://localhost:7773', { method: 'HEAD', mode: 'no-cors' })
        .then(() => true)
        .catch(() => false);
      setAgritwinOnline(atRes);
    } catch {
      setAgritwinOnline(false);
    }

    try {
      const rwRes = await fetch('http://localhost:7772', { method: 'HEAD', mode: 'no-cors' })
        .then(() => true)
        .catch(() => false);
      setRewildOnline(rwRes);
    } catch {
      setRewildOnline(false);
    }

    try {
      const regRes = await fetch('http://localhost:7777', { method: 'HEAD', mode: 'no-cors' })
        .then(() => true)
        .catch(() => false);
      setAgritwinRegionalOnline(regRes);
    } catch {
      setAgritwinRegionalOnline(false);
    }

    try {
      const mainRes = await fetch('http://localhost:7771', { method: 'HEAD', mode: 'no-cors' })
        .then(() => true)
        .catch(() => false);
      setAgrotechOnline(mainRes);
    } catch {
      setAgrotechOnline(true);
    }

    setCheckingStatus(false);
  };

  useEffect(() => {
    checkServers();
    const interval = setInterval(checkServers, 15000);
    return () => clearInterval(interval);
  }, []);

  const getRewildUrl = (file = 'rewilding-field-suite.html') => {
    // Si estamos corriendo en GitHub Pages u otro host remoto, usar ruta relativa integrada
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocalhost || !rewildOnline) {
      return `./rewild/${file}`;
    }
    return `http://localhost:7772/${file}`;
  };

  const openAppTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-12 animate-fadeIn pb-20">
      
      {/* Top Header Banner: Architecture Manifesto */}
      <div className="bg-[#0B2519] p-6 sm:p-10 rounded-3xl border border-emerald-500/30 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-5 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/70 border border-emerald-500/40 text-emerald-300 text-xs font-sans font-bold">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Ecosistema de Simulación Multiescala • Máximo Rendimiento</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Ecosistema de <span className="text-amber-400">3 Suites Autónomas</span> de Simulación
          </h1>

          <p className="text-slate-200 text-sm sm:text-base font-serif leading-relaxed">
            Para garantizar máxima fluidez y escalabilidad, la arquitectura se divide en tres suites autónomas: 
            la <strong>Plataforma Central AgroTech</strong> (inteligencia comercial, satelital y gobernanza SpA/Cooperativa), 
            <strong>AgriTwin 3D Predial</strong> (simulación biofísica brote a brote y microclima) y 
            <strong>AgroTwin Regional</strong> (cuenca macro de 122.000 ha y gestión hidrológica).
          </p>

          {/* Quick status bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            {/* AgroTech */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#071810] border border-emerald-500/30">
              <span className={`w-2.5 h-2.5 rounded-full ${agrotechOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
              <span className="text-slate-300 font-bold">AgroTech Core</span>
            </div>

            {/* AgriTwin Predial */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#071810] border border-emerald-500/30">
              <span className={`w-2.5 h-2.5 rounded-full ${agritwinOnline ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-slate-300">AgriTwin Predial 3D</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${agritwinOnline ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-slate-800 text-slate-400'}`}>
                {agritwinOnline ? 'Online' : 'Disponible'}
              </span>
            </div>

            {/* AgroTwin Regional */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#071810] border border-amber-500/40">
              <span className={`w-2.5 h-2.5 rounded-full ${agritwinRegionalOnline ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-amber-200 font-bold">Regional Maule</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${agritwinRegionalOnline ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-slate-800 text-slate-400'}`}>
                {agritwinRegionalOnline ? 'Online' : 'Disponible'}
              </span>
            </div>

            {/* Rewild Suite */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#071810] border border-emerald-500/30">
              <span className={`w-2.5 h-2.5 rounded-full ${rewildOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-slate-300">Rewild Suite</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${rewildOnline ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-slate-800 text-slate-400'}`}>
                {rewildOnline ? 'Online' : 'Disponible'}
              </span>
            </div>

            <button 
              onClick={checkServers} 
              disabled={checkingStatus}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 transition-colors border border-emerald-700/50"
              title="Actualizar estado de conexión"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checkingStatus ? 'animate-spin' : ''}`} />
              <span>Verificar Conexión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
              selectedTab === 'overview'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            <span>1. Panorama de Suites</span>
          </button>

          <button
            onClick={() => setSelectedTab('agritwin')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
              selectedTab === 'agritwin'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>2. AgriTwin 3D Predial</span>
          </button>

          <button
            onClick={() => setSelectedTab('regional')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
              selectedTab === 'regional'
                ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400/50'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Mountain className="w-4 h-4 text-amber-400" />
            <span>3. AgroTwin Cuenca Regional</span>
          </button>

          <button
            onClick={() => setSelectedTab('rewild')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
              selectedTab === 'rewild'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Trees className="w-4 h-4 text-emerald-400" />
            <span>4. Rewild Suite de Campo</span>
          </button>

          <button
            onClick={() => setSelectedTab('permaculture')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
              selectedTab === 'permaculture'
                ? 'bg-[#0B2519] text-white shadow-md ring-2 ring-emerald-400/50'
                : 'bg-emerald-50 text-emerald-950 border border-emerald-300 hover:bg-emerald-100 font-extrabold'
            }`}
          >
            <Trees className="w-4 h-4 text-emerald-600" />
            <span>5. Permacultura (Plan Maestro & Docs)</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono hidden sm:block">
          Sin sobrecarga WebGL • Navegación a 60 FPS
        </div>
      </div>

      {/* TAB 1: OVERVIEW OF THE 4 PLATFORM ENGINES */}
      {selectedTab === 'overview' && (
        <div className="space-y-12 animate-fadeIn">
          
          {/* 4 Main Ecosystem Apps with Official Logos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. AGROTECH CORE */}
            <div className="bg-white rounded-3xl border-2 border-emerald-600/30 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                    NÚCLEO CENTRAL • HOLDCO
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>

                {/* Logo Peumo Quantum */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B2519] border-2 border-emerald-500/40 p-2 shadow-md shrink-0 flex items-center justify-center">
                    <img 
                      src="./logo-peumo-quantum.jpg" 
                      alt="AgroTech Chile Peumo Quantum Logo" 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0B2519]">AgroTech Chile</h3>
                    <p className="text-xs text-emerald-800 font-mono font-bold">Núcleo Central & Comercio</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                  Orquestador maestro: Gobernanza SpA y Cooperativa, ventas de hardware KioT, pasaporte verde de exportación UE y cursos agroclimáticos.
                </p>

                <div className="space-y-2 pt-2 text-xs font-mono text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Stack: React 18 + Vite + Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Tienda, Membresías y Fichas B2B</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Gobernanza Dual SpA & Cooperativa</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate && onNavigate('hardware')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-sans text-xs font-bold transition-all shadow-md active:scale-98"
                >
                  <span>Explorar Productos y Kits KioT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. SUITE 1: AGRITWIN 3D PREDIAL */}
            <div className="bg-white rounded-3xl border-2 border-amber-500/40 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-bold border border-amber-300">
                    SUITE PREDIAL 3D • 6 RAMAS
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${agritwinOnline ? 'bg-emerald-500' : 'bg-amber-400'} animate-pulse`} />
                </div>

                {/* Logo AgriTwin */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-500/40 p-1.5 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                    <img 
                      src="./logo-agritwin.png" 
                      alt="AgriTwin 3D Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">AgriTwin 3D</h3>
                    <p className="text-xs text-amber-800 font-mono font-bold">Gemelo Mecatrónico Predial</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                  Simulación biofísica 3D en Three.js con curvas de nivel, telemetría IoT de sensores KioT brote a brote, taller diegético AoE II y emisión de informes certificados.
                </p>

                <div className="space-y-2 pt-2 text-xs font-mono text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Motor: Three.js WebGL + Shaders PBR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Taller Diegético AoE II & Panel Maestro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Penman-Monteith en 3 Estratos de Suelo</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => openAppTab('http://localhost:7773')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0B2519] font-sans text-xs font-extrabold transition-all shadow-md active:scale-98"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir AgriTwin 3D</span>
                </button>
                <button
                  onClick={() => setSelectedTab('agritwin')}
                  className="w-full text-center text-[11px] text-slate-500 hover:text-slate-800 font-sans font-bold"
                >
                  Ver Ficha Técnica y Módulos $\rightarrow$
                </button>
              </div>
            </div>

            {/* 3. SUITE 2: AGROTWIN REGIONAL MAULE */}
            <div className="bg-white rounded-3xl border-2 border-amber-600/50 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-bold border border-amber-300">
                    SUITE REGIONAL • 122K HA
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${agritwinRegionalOnline ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                </div>

                {/* Logo AgroTwin Regional */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-16 h-16 rounded-2xl bg-[#07130c] border-2 border-amber-500/60 p-1 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                    <img 
                      src="./assets/ui/logo_agritwin_regional.jpg" 
                      alt="AgroTwin Regional Logo" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">AgroTwin Regional</h3>
                    <p className="text-xs text-amber-800 font-mono font-bold">Cartografía & Riesgos Macro</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                  Cartografía macroscópica de 122.000 ha estilo Civilization. Modelación de riesgos de incendios FWI con vientos Puelche e inundaciones fluviales TWI.
                </p>

                <div className="space-y-2 pt-2 text-xs font-mono text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Lentes Tácticos FWI / TWI / LULC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Cuenca Parral, Retiro & Longaví</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Acople Directo con Fundo Meniels</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => openAppTab('http://localhost:7777/#cerro')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-sans text-xs font-extrabold transition-all shadow-md active:scale-98"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir Cuenca Regional</span>
                </button>
                <button
                  onClick={() => setSelectedTab('regional')}
                  className="w-full text-center text-[11px] text-slate-500 hover:text-slate-800 font-sans font-bold"
                >
                  Ver Ficha Cuenca & Acople $\rightarrow$
                </button>
              </div>
            </div>

            {/* 4. SUITE 3: REWILD SUITE */}
            <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                    BIOMONITOREO • PWA OFFLINE
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${rewildOnline ? 'bg-emerald-500' : 'bg-amber-400'} animate-pulse`} />
                </div>

                {/* Logo Rewild */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-emerald-500/40 p-1.5 shadow-md shrink-0 flex items-center justify-center overflow-hidden">
                    <img 
                      src="./logo-rewild.png" 
                      alt="Rewild Suite Logo" 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">Rewild Suite</h3>
                    <p className="text-xs text-emerald-800 font-mono font-bold">Biomonitoreo & PWA Offline</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                  Suite de campo para auditar y certificar bosque nativo esclerófilo. Funciona 100% offline en quebradas y cerros sin señal celular con GoWild Survey.
                </p>

                <div className="space-y-2 pt-2 text-xs font-mono text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>PWA Offline con Service Worker</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>GoWild Survey Georreferenciado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Cálculo CO2e IPCC Tier 2</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => openAppTab(getRewildUrl('rewilding-field-suite.html'))}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-sans text-xs font-bold transition-all shadow-md active:scale-98"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-300" />
                  <span>Abrir Rewild Field Suite ↗</span>
                </button>
                <button
                  onClick={() => setSelectedTab('rewild')}
                  className="w-full text-center text-[11px] text-slate-500 hover:text-slate-800 font-sans font-bold"
                >
                  Ver Ficha Técnica y PWA $\rightarrow$
                </button>
              </div>
            </div>

          </div>

          {/* Architecture Integration Flow: Predio -> Cuenca -> Central */}
          <div className="bg-[#0B2519] p-8 sm:p-10 rounded-3xl border border-emerald-500/30 text-white space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Flujo de Orquestación Multiescala
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Cómo Conversan el Predio, la Cuenca y el Núcleo
              </h3>
              <p className="text-xs text-slate-300 font-serif">
                Ninguna aplicación satura a la otra. La telemetría micro alimenta la cuenca macro y la central consolida la gobernanza.
              </p>
            </div>

            {/* Architecture Schema Visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-4">
              
              {/* Box 1: Predial Telemetry */}
              <div className="p-5 rounded-2xl bg-[#071810] border border-amber-500/30 space-y-3 text-center">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-amber-300">1. Escala Micro: AgriTwin 3D</h4>
                <p className="text-xs text-slate-300 font-serif">
                  Sensores FDR y Penman-Monteith en 3 estratos de suelo en el <strong>Fundo Meniels</strong>.
                </p>
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">
                  Puerto 7773
                </span>
              </div>

              {/* Box 2: Regional Cartography */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1a1208] to-[#0c0804] border-2 border-amber-400/50 space-y-3 text-center shadow-lg relative">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto">
                  <Mountain className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-amber-300">2. Escala Macro: AgroTwin Regional</h4>
                <p className="text-xs text-amber-100/90 font-serif">
                  Agrega 122.000 ha de cuenca Maule. Modela índices <strong>FWI de incendios</strong> y <strong>TWI de crecidas</strong>.
                </p>
                <span className="inline-block text-[10px] font-mono px-2.5 py-1 rounded bg-amber-900 text-amber-200 border border-amber-600 font-bold">
                  Puerto 7774
                </span>
              </div>

              {/* Box 3: AgroTech Core */}
              <div className="p-5 rounded-2xl bg-[#071810] border border-emerald-500/30 space-y-3 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-emerald-300">3. Núcleo Central: AgroTech HoldCo</h4>
                <p className="text-xs text-slate-300 font-serif">
                  Cruza telemetría con <strong>Sentinel-2</strong>, emite el <strong>Pasaporte Verde QR</strong> y gestiona la SpA.
                </p>
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                  Puerto 7771
                </span>
              </div>

            </div>

            {/* Performance Callout */}
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans text-xs">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Garantía de Rendimiento en macOS & Navegador</span>
                  <span className="text-emerald-200/70">
                    Al abrirse en sus propias pestañas, Three.js y los motores cartográficos no consumen recursos cuando estás revisando la tienda o el portal de socios.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openAppTab('http://localhost:7773')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
                >
                  Abrir 7773
                </button>
                <button
                  onClick={() => openAppTab('http://localhost:7774')}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-500"
                >
                  Abrir 7774
                </button>
                <button
                  onClick={() => openAppTab('http://localhost:7772')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-600"
                >
                  Abrir 7772
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: AGRITWIN 3D DEDICATED SPEC & LAUNCHER */}
      {selectedTab === 'agritwin' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0B2519] border border-amber-400 p-2 shrink-0 shadow-md">
                  <img src="./logo-agritwin.png" alt="AgriTwin" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">AgriTwin 3D</h2>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold">
                      Puerto 7773 • Escala Predial
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-serif">
                    Gemelo Digital de Huerto y Brotes • Simulación Biofísica Three.js & Taller Diegético AoE II
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openAppTab('http://localhost:7773')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0B2519] font-sans text-xs font-extrabold shadow-lg transition-all active:scale-95 ring-2 ring-amber-300/50"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir AgriTwin 3D en Puerto 7773 (Pestaña Dedicada)</span>
                </button>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-700" />
                  <span>Motor Three.js PBR Shaders</span>
                </h4>
                <p className="text-xs text-slate-600 font-serif">
                  Renderiza topografía con curvas de nivel, distribución de cuarteles y exposición solar horaria de cada hilera de cultivo.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Drenaje Katabático de Heladas</span>
                </h4>
                <p className="text-xs text-slate-600 font-serif">
                  Modelado de acumulación de aire frío en laderas y microcuencas para rescate preventivo de brotes con 72h de anticipación.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-slate-700" />
                  <span>FAO-56 en 3 Capas de Suelo</span>
                </h4>
                <p className="text-xs text-slate-600 font-serif">
                  Balance de humedad Penman-Monteith (0-20, 20-60, 60-100 cm) con dictamen de riego en formato informe oficial descargable.
                </p>
              </div>
            </div>

            {/* 3 Enterprise Ready Modules Breakdown */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Los 3 Módulos Operativos de AgriTwin
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 border-l-4 border-l-emerald-600">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">Módulo 1</span>
                  <h4 className="text-sm font-bold text-slate-900">AgriTwin Enterprise (Viñas & Frutales)</h4>
                  <p className="text-xs text-slate-600 font-serif">
                    Curva de estrés hídrico CWSI, lámina de reposición de riego semanal ($mm$), y optimización de tarifas eléctricas de bombeo.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 border-l-4 border-l-blue-600">
                  <span className="text-[10px] font-mono font-bold text-blue-800 uppercase block">Módulo 2</span>
                  <h4 className="text-sm font-bold text-slate-900">AgriTwin Territorial (Municipios & APRs)</h4>
                  <p className="text-xs text-slate-600 font-serif">
                    Semáforo hidrogeológico de recarga de cuenca, índice FWI de piro-riesgo y mapa de cortafuegos en interfaz periurbana.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 border-l-4 border-l-amber-500">
                  <span className="text-[10px] font-mono font-bold text-amber-800 uppercase block">Módulo 3</span>
                  <h4 className="text-sm font-bold text-slate-900">AgriTwin ESG / MRV (Fondos & UE)</h4>
                  <p className="text-xs text-slate-600 font-serif">
                    Series temporales de biomasa de carbono Tier-2, índice de integridad ecológica y reporte de cero deforestación (EUDR).
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: AGROTWIN REGIONAL MAULE SPEC & LAUNCHER (NEW CIV VI EXPERIENCE) */}
      {selectedTab === 'regional' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#07130c] border-2 border-amber-500 p-1 shrink-0 shadow-md overflow-hidden">
                  <img src="./assets/ui/logo_agritwin_regional.jpg" alt="AgroTwin Regional" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">AgriTwin Cuenca (Regional / Cerro)</h2>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 font-bold border border-amber-300">
                      Hub Puerto 7777 • Escala Macro (122.000 ha)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-serif">
                    Cartografía Estratégica & Mirador Cerro • Modelación de Incendios FWI e Hidrología de Cuenca Maule Sur
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openAppTab('http://localhost:7777/#cerro')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-sans text-xs font-extrabold shadow-lg transition-all active:scale-95 ring-2 ring-amber-300/50"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir AgriTwin Cuenca en Hub :7777 (#cerro)</span>
                </button>
              </div>
            </div>

            {/* Banner Panorámico de la Expedición Regional */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-900/40 shadow-xl group">
              <img 
                src="./assets/ui/agritwin_regional_landing.jpg" 
                alt="AgroTwin Regional Expedición Maule" 
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white space-y-2">
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 w-fit font-bold">
                  CAMPAMENTO REGIONAL & MANDO CIVILISATION
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Expedición Agroclimática Cuenca del Maule (Parral, Retiro & Longaví)
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-serif max-w-3xl leading-relaxed">
                  Monitoreo de 122.000 hectáreas con cuadrícula hexagonal interactiva, vectores de viento Puelche andino, y cálculo de amortiguación hídrica entre el predio local y la cuenca fluvial.
                </p>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-600" />
                  <span>Simulador de Incendios FWI</span>
                </h4>
                <p className="text-xs text-slate-600 font-serif">
                  Propagación de fuego en función de humedad del combustible fino (FFMC), viento Puelche (65 km/h) y factor inflamable pino (0.92) vs esclerófilo (0.35).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                  <span>Simulador de Inundación TWI</span>
                </h4>
                <p className="text-xs text-slate-600 font-serif">
                  Índice topográfico de humedad $\ln(a/\tan\beta)$ y desborde fluvial de los ríos Longaví y Perquilauquén para períodos de retorno a 10, 50 y 100 años.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Emisión de Decretos Oficiales</span>
                </h4>
                <p className="text-xs text-slate-600 font-serif">
                  Generación de informes ejecutivos con hash criptográfico MRV para SENAPRED, Delegación Provincial de Linares y Comités de Agua Potable Rural (APR).
                </p>
              </div>
            </div>

            {/* Deep Coupling Section: How Regional couples with AgriTwin 1 Predial */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c0804] to-[#1a1208] text-white border-2 border-amber-500/40 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-900/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    🔗
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-amber-300">
                      Acople Biunívoco con AgriTwin 1 (Predial)
                    </h3>
                    <p className="text-xs text-slate-300 font-serif">
                      Conexión directa entre el micro-modelo de Fundo Meniels y la macro-cuenca territorial
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    Sincronización Bidireccional
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 font-serif">
                <div className="p-4 rounded-2xl bg-[#080503] border border-amber-600/30 space-y-2">
                  <h4 className="font-bold text-amber-300 font-sans flex items-center gap-2">
                    <span>🌱</span>
                    <span>Del Predio Meniels (:7773) a la Cuenca (:7774)</span>
                  </h4>
                  <p className="leading-relaxed">
                    Las obras de permacultura diseñadas en AgriTwin 1 (tranque Keyline de 18.500 m³ y cortinas de árboles nativos) se incorporan en tiempo real a la cartografía regional. Esto reduce el coeficiente de escorrentía comunal y atenúa el pico de inundación en Retiro un <strong>3.2%</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#080503] border border-amber-600/30 space-y-2">
                  <h4 className="font-bold text-cyan-300 font-sans flex items-center gap-2">
                    <span>📡</span>
                    <span>De la Cuenca (:7774) al Predio Meniels (:7773)</span>
                  </h4>
                  <p className="leading-relaxed">
                    Las alertas macroscópicas de viento Puelche (65 km/h) y sequedad regional se transmiten hacia el motor 3D de AgriTwin 1, activando automáticamente el protocolo de riego nocturno y el encendido preventivo de microaspersores anti-heladas en los cuarteles críticos.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs">
                <span className="text-slate-400">
                  Predio Piloto Centrado: <strong>Fundo Meniels (Parral, Maule • 36.14°S, 71.82°O)</strong>
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openAppTab('http://localhost:7774')}
                    className="px-4 py-2 rounded-xl bg-amber-600 text-slate-950 font-bold hover:bg-amber-500 transition-all shadow"
                  >
                    Ver en Cuenca (:7774)
                  </button>
                  <button
                    onClick={() => openAppTab('http://localhost:7773')}
                    className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-600 transition-all shadow"
                  >
                    Ver en 3D (:7773)
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: REWILD SUITE DEDICATED SPEC & LAUNCHER */}
      {selectedTab === 'rewild' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0B2519] border border-emerald-400 p-2 shrink-0 shadow-md">
                  <img src="./logo-rewild.png" alt="Rewild" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Rewild Suite</h2>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                      Puerto 7772 • Suite de Campo
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-serif">
                    Auditoría de Biodiversidad Nativa & PWA de Terreno 100% Offline
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => openAppTab(getRewildUrl('rewilding-field-suite.html'))}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-sans text-xs font-bold shadow-lg transition-all active:scale-95 ring-2 ring-emerald-500/40"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-300" />
                  <span>Abrir Field Suite PWA (Pestaña Dedicada)</span>
                </button>

                <button
                  onClick={() => openAppTab(getRewildUrl('gowild-survey.html'))}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-sans text-xs font-bold border border-emerald-600/30 transition-all shadow-md"
                >
                  <Trees className="w-4 h-4 text-emerald-400" />
                  <span>Abrir GoWild Survey Clásico</span>
                </button>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Trees className="w-4 h-4 text-emerald-700" />
                  <span>Bosque Esclerófilo & Métricas IPCC</span>
                </h4>
                <p className="text-xs text-slate-600 font-serif">
                  Cuantificación de estratos arbóreos nativos (peumo, quillay, boldo) para cálculo de biomasa y secuestro de carbono.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-600" />
                  <span>Operación 100% Offline</span>
                </h4>
                <p className="text-xs text-slate-600 font-serif">
                  Equipado con Progressive Web App y Service Worker. El técnico guarda los puntos en la quebrada y se sincronizan al volver a base.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-700" />
                  <span>Servidor Local Python</span>
                </h4>
                <p className="text-xs text-slate-600 font-serif">
                  Corre con <strong>server.py</strong> en el puerto 7772 o mediante el icono <strong>Rewild.app</strong> en tu Escritorio.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: PERMACULTURA (PLAN MAESTRO & DOCS) */}
      {selectedTab === 'permaculture' && (
        <PermacultureSection onNavigate={onNavigate} />
      )}

    </div>
  );
};
