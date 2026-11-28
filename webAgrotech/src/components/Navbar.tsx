import React, { useState, useRef, useEffect } from 'react';
import { 
  Presentation, Layers, Map, ShoppingBag, Share2, Menu, X, Globe, Sparkles, Wrench, 
  GraduationCap, Cpu, ChevronDown, Leaf, ArrowRight, Shield, Activity, FileText,
  Users, Newspaper, Lock, BookOpen, Heart, Trees, QrCode, MonitorPlay, Database, MapPin,
  Smartphone, Zap, CheckCircle2, Compass
} from 'lucide-react';
import { resolveAsset, handleImageFallback } from '../utils/assets';

interface NavbarProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  onOpenPitchDeck: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenPitchDeck }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
      if (communityRef.current && !communityRef.current.contains(event.target as Node)) {
        setCommunityDropdownOpen(false);
      }
      if (storeRef.current && !storeRef.current.contains(event.target as Node)) {
        setStoreDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    setCommunityDropdownOpen(false);
    setStoreDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B2519] border-b border-[#1E3A2B] px-4 lg:px-8 py-3 transition-all shadow-md text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('landing')} 
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#071810] border border-emerald-500/40 flex items-center justify-center p-1 group-hover:border-amber-400 transition-all shadow-sm relative overflow-hidden">
            <img 
              src={resolveAsset('./logo-peumo-quantum.jpg')} 
              alt="AgroTech Chile Peumo Quantum Logo" 
              onError={(e) => handleImageFallback(e, './logo-peumo-quantum.jpg')}
              className="w-full h-full object-contain rounded-lg" 
            />
            <div className="img-error-fallback hidden absolute inset-0 items-center justify-center bg-emerald-950 text-emerald-400 text-xs font-bold">AT</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-white group-hover:text-amber-400 transition-colors font-sans">
                AGROTECH
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-sans font-bold">
                CHILE
              </span>
            </div>
            <p className="text-[10px] text-emerald-200/70 font-sans font-medium hidden sm:block">
              Maule, Chile 🇨🇱 / Friburgo, Alemania 🇩🇪
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#071A11] p-1.5 rounded-xl border border-[#1E3A2B] font-sans text-xs">

          {/* Productos & Soluciones (Dropdown) */}
          <div className="relative" ref={productsRef}>
            <button
              onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all ${
                ['hardware', 'satellites', 'apps', 'agritwin', 'rewild-hub', 'satellites-visor', 'satellites-rewild', 'satellites-pasaporte', 'store', 'roadmap', 'roadmap-productos'].includes(currentView) || productsDropdownOpen
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Productos</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsDropdownOpen ? 'rotate-180 text-amber-400' : 'text-emerald-400'}`} />
            </button>

            {productsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-96 bg-[#0B2519] rounded-2xl border border-emerald-500/40 p-3 space-y-2 shadow-2xl animate-fadeIn z-50">
                
                {/* GRUPO: FASE 1 (100% Software & Micro-SaaS) */}
                <div className="px-2 pt-1 pb-0.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Fase 1 • Software & Micro-SaaS
                  </span>
                  <span className="text-[9px] font-mono text-emerald-300/70">$0 Inventario</span>
                </div>

                {/* 1. X AgroAlerta Pocket (Hero) */}
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/80 to-[#071810] border border-emerald-500/50 hover:border-emerald-400 transition-all space-y-1.5">
                  <button
                    onClick={() => handleNavClick('landing')}
                    className="w-full flex items-start gap-2.5 text-left"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
                    </div>
                    <div className="flex-1">
                      <div>
                        <span className="font-bold text-xs text-white">X AgroAlerta (Gancho WhatsApp 60s)</span>
                      </div>
                      <span className="text-[10px] text-emerald-200/80 font-sans block">Alertas de helada (-1.8 °C) + Add-ons: Express, EUDR, CNR.</span>
                    </div>
                  </button>
                  <div className="pt-1.5 border-t border-emerald-900/60 flex items-center justify-between text-[10px] font-mono">
                    <button 
                      onClick={() => handleNavClick('landing')}
                      className="text-emerald-300 hover:text-white font-bold flex items-center gap-1"
                    >
                      <span>Ver en Home</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <a
                      href="https://wa.me/56976696142?text=Hola%20AgroTech,%20quiero%20activar%20X%20AgroAlerta%20para%20mi%20predio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-300 hover:text-white font-bold flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40"
                    >
                      <span>Activar WhatsApp</span>
                      <Globe className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* 2. X AgriTwin Maestro */}
                <div className={`p-2 rounded-xl transition-colors ${
                  currentView === 'agritwin' ? 'bg-[#071A11] border border-emerald-500/30' : 'hover:bg-[#071A11]'
                }`}>
                  <button
                    onClick={() => handleNavClick('agritwin')}
                    className="w-full flex items-start gap-2.5 text-left"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div>
                        <span className="font-bold text-xs text-white">X AgriTwin Maestro (3D & Sensores Virtuales)</span>
                      </div>
                      <span className="text-[10px] text-emerald-200/70 font-sans block">Richards-MONICA 1D sin sondas, drenaje katabático y What-If.</span>
                    </div>
                  </button>
                </div>

                {/* 3. X Satélites, Agua & Riesgo */}
                <div className={`p-2 rounded-xl transition-colors ${
                  ['satellites', 'satellites-pasaporte'].includes(currentView) ? 'bg-[#071A11] border border-emerald-500/30' : 'hover:bg-[#071A11]'
                }`}>
                  <button
                    onClick={() => handleNavClick('satellites')}
                    className="w-full flex items-start gap-2.5 text-left"
                  >
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div>
                        <span className="font-bold text-xs text-white">X Agua & Incendios (Satélites & WUI)</span>
                      </div>
                      <span className="text-[10px] text-emerald-200/70 font-sans block">Balance FAO-56, vientos Puelche 30-30-30 y Pasaporte EUDR.</span>
                    </div>
                  </button>
                </div>

                <div className="my-1 border-t border-emerald-900/60" />

                {/* GRUPO: FASE 2 (Upgrade Físico IoT) */}
                <div className="px-2 pt-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                    Fase 2 • Upgrade Físico IoT (Bajo Pedido)
                  </span>
                </div>

                {/* 4. X Kits IoT */}
                <button
                  onClick={() => handleNavClick('hardware')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'hardware' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">X Kits IoT, Actuadores & Energía</span>
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Sondas FDR tri-estrato, actuadores LoRaWAN y solar LiFePO4.</span>
                  </div>
                </button>

                <div className="my-1 border-t border-emerald-900/60" />

                {/* GRUPO: FASE 3 (Servicios Territoriales & Ecosistema) */}
                <div className="px-2 pt-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400">
                    Fase 3 • Servicios Territoriales & Ecosistema
                  </span>
                </div>

                {/* 5. X Territorio & Living Lab (Parral) */}
                <button
                  onClick={() => handleNavClick('rewild-hub')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'rewild-hub' ? 'bg-[#071A11] text-teal-300 border border-teal-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 border border-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-teal-300">
                    <Trees className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">X Territorio & Living Lab (Parral)</span>
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Centro I+D Parral (donde Rudi), cuencas B2G y agroecología.</span>
                  </div>
                </button>

                <div className="my-1 border-t border-emerald-900/60" />

                {/* 6. Tienda AgroTech */}
                <button
                  onClick={() => handleNavClick('store')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'store' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">Tienda AgroTech</span>
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Bio-insumos, kits IoT, preparados y herramientas de campo.</span>
                  </div>
                </button>

                {/* Footer link to Roadmap */}
                <div className="pt-2 border-t border-emerald-900/80 text-center">
                  <button
                    onClick={() => handleNavClick('roadmap')}
                    className={`w-full py-2 rounded-xl border transition-all flex items-center justify-center gap-2 font-mono text-[11px] font-bold ${
                      currentView === 'roadmap' || currentView === 'roadmap-productos'
                        ? 'bg-emerald-900 text-amber-300 border-amber-400 shadow-sm'
                        : 'bg-emerald-950/70 border-emerald-500/30 hover:border-amber-400 text-amber-300 hover:text-white'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    <span>Roadmap Oficial en 3 Fases</span>
                    <ArrowRight className="w-3 h-3 text-amber-400" />
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* Bóveda Tab */}
          <button
            onClick={() => handleNavClick('vault')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              currentView === 'vault' || currentView === 'docs'
                ? 'bg-purple-900 text-purple-100 border border-purple-400/50 shadow-sm'
                : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
            }`}
            title="Bóveda de Arquitectura de Datos, Modelos Biofísicos y Papers Canónicos"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Bóveda</span>
          </button>

          {/* Comunidad (Dropdown: Red & Sé Parte) */}
          <div className="relative" ref={communityRef}>
            <button
              onClick={() => setCommunityDropdownOpen(!communityDropdownOpen)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold transition-all ${
                ['community', 'join', 'community-join'].includes(currentView) || communityDropdownOpen
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Comunidad</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${communityDropdownOpen ? 'rotate-180 text-amber-400' : 'text-emerald-400'}`} />
            </button>

            {communityDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-[#0B2519] rounded-2xl border border-emerald-500/40 p-2.5 space-y-1.5 shadow-2xl animate-fadeIn z-50">
                {/* 1. Red & Actividades */}
                <button
                  onClick={() => handleNavClick('community')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'community' ? 'bg-[#071A11] border border-emerald-500/30' : 'hover:bg-[#071A11]'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-xs text-white block">Red & Actividades</span>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Foros, alianzas de campo y encuentros comunitarios.</span>
                  </div>
                </button>

                {/* 2. Sé Parte (Membresías) */}
                <button
                  onClick={() => handleNavClick('join')}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'join' || currentView === 'community-join' ? 'bg-[#071A11] border border-amber-400/50' : 'hover:bg-[#071A11]'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-rose-400">
                    <Heart className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-amber-300">Sé Parte (Membresías)</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Apoyo a la transición agroecológica y beneficios.</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Cursos */}
          <button
            onClick={() => handleNavClick('courses')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              currentView === 'courses'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Cursos</span>
          </button>

          {/* Blog */}
          <button
            onClick={() => handleNavClick('blog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              currentView === 'blog'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
            <span>Blog</span>
          </button>

          {/* Equipo */}
          <button
            onClick={() => handleNavClick('somos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              currentView === 'somos'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Somos</span>
          </button>

        </nav>

        {/* Action Buttons & Internal Partner Access */}
        <div className="flex items-center gap-2.5">

          {/* Panel de Administrador de la web (vista interna de esta misma app) */}
          <button
            onClick={() => handleNavClick('internal')}
            title="Panel de Administrador • Acceso Interno Socios"
            aria-label="Panel de Administrador"
            className={`p-2 rounded-xl border transition-all shadow-sm flex items-center justify-center ${
              currentView === 'internal' || currentView === 'social'
                ? 'bg-amber-500 border-amber-400 text-[#0B2519]'
                : 'bg-[#071A11] border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-[#0B2519]'
            }`}
          >
            <Lock className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenPitchDeck}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] font-sans font-extrabold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            <Presentation className="w-4 h-4 text-[#0B2519]" />
            <span>Pitch Deck</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-emerald-800 flex flex-col gap-1.5 font-sans text-xs animate-fadeIn bg-[#0B2519] p-4 rounded-2xl shadow-xl">
          <button onClick={() => handleNavClick('landing')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Inicio</span>
          </button>

          <button onClick={() => handleNavClick('vault')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-purple-200 font-bold bg-purple-950/80 border border-purple-500/40 hover:bg-purple-900">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Bóveda</span>
          </button>

          {/* 1. AgroAlerta Pocket Bot (WhatsApp) */}
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-950 to-[#071810] border border-emerald-500/50 space-y-1.5">
            <div className="flex items-center gap-2 text-white font-bold">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>AgroAlerta (WhatsApp)</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-emerald-900/60 text-[10px] font-mono">
              <button onClick={() => handleNavClick('landing')} className="text-emerald-300 hover:text-white flex items-center gap-1">
                <span>Ver en Home</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <a 
                href="https://wa.me/56976696142?text=Hola%20AgroTech,%20quiero%20activar%20AgroAlerta%20para%20mi%20predio" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-300 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40"
              >
                <span>Activar WhatsApp</span>
                <Globe className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 2. x AgriTwin 3D Flagship */}
          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 space-y-2">
            <button onClick={() => handleNavClick('agritwin')} className="w-full flex items-center gap-2 text-left text-white font-bold">
              <Cpu className="w-4 h-4 text-amber-400" />
              <span>X AgriTwin Maestro (Gemelo 3D & Virtual)</span>
            </button>
            <div className="flex items-center justify-between pt-1 border-t border-emerald-900/60 text-[10px] font-mono">
              <button onClick={() => handleNavClick('agritwin')} className="text-emerald-300 hover:text-white flex items-center gap-1">
                <span>Ver Showcase</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <a 
                href="https://danisantanderurrutia-coder.github.io/agritwin-app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-300 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30"
              >
                <span>Carta Ejecutiva B2B</span>
                <Globe className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 3. X Agua & Incendios */}
          <button onClick={() => handleNavClick('satellites')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>X Agua & Incendios (Satélites & WUI)</span>
          </button>

          {/* 4. X Kits IoT Hardware */}
          <button onClick={() => handleNavClick('hardware')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>X Kits IoT, Actuadores & Energía</span>
          </button>

          {/* 5. X Territorio & Living Lab (Parral) */}
          <button onClick={() => handleNavClick('rewild-hub')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Trees className="w-4 h-4 text-emerald-400" />
            <span>X Territorio & Living Lab (Parral)</span>
          </button>

          {/* 6. Tienda */}
          <button onClick={() => handleNavClick('store')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Tienda AgroTech</span>
          </button>

          {/* 7. Roadmap */}
          <button onClick={() => handleNavClick('roadmap')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-amber-300 font-bold bg-emerald-950/80 border border-emerald-500/40 hover:bg-emerald-900">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Roadmap Oficial en 3 Fases</span>
          </button>

          {/* Comunidad (Red & Sé Parte) */}
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5 my-1">
            <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider block px-1">
              Comunidad
            </span>
            <button onClick={() => handleNavClick('community')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900 transition-colors">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Red & Actividades</span>
            </button>
            <button onClick={() => handleNavClick('join')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-amber-300 font-bold bg-amber-950/40 border border-amber-400/40 hover:bg-amber-950 transition-colors">
              <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>✨ Sé Parte (Membresías)</span>
            </button>
          </div>

          <button onClick={() => handleNavClick('courses')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Cursos</span>
          </button>

          <button onClick={() => handleNavClick('blog')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Newspaper className="w-4 h-4 text-emerald-400" />
            <span>Blog</span>
          </button>

          <button onClick={() => handleNavClick('somos')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Somos</span>
          </button>

          <button onClick={() => handleNavClick('internal')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-amber-400 font-bold bg-amber-950/40 border border-amber-500/30">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Panel de Administrador</span>
          </button>
        </div>
      )}
    </header>
  );
};
