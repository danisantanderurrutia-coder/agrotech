import React, { useState, useRef, useEffect } from 'react';
import { 
  Presentation, Layers, Map, ShoppingBag, Share2, Menu, X, Globe, Sparkles, Wrench, 
  GraduationCap, Cpu, ChevronDown, Leaf, ArrowRight, Shield, Activity, FileText,
  Users, Newspaper, Lock, BookOpen, Heart, Trees, QrCode, MonitorPlay, Database, MapPin
} from 'lucide-react';

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
          <div className="w-10 h-10 rounded-xl bg-[#071810] border border-emerald-500/40 flex items-center justify-center p-1 group-hover:border-amber-400 transition-all shadow-sm">
            <img src="./logo-peumo-quantum.jpg" alt="AgroTech Chile Peumo Quantum Logo" className="w-full h-full object-contain rounded-lg" />
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
                ['hardware', 'satellites', 'apps', 'agritwin', 'rewild-hub', 'satellites-visor', 'satellites-rewild', 'satellites-pasaporte'].includes(currentView) || productsDropdownOpen
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Productos</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsDropdownOpen ? 'rotate-180 text-amber-400' : 'text-emerald-400'}`} />
            </button>

            {productsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-92 bg-[#0B2519] rounded-2xl border border-emerald-500/40 p-2.5 space-y-1.5 shadow-2xl animate-fadeIn z-50">
                {/* Ver Catálogo Completo */}
                <button
                  onClick={() => handleNavClick('landing')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-[#0B2519] border border-amber-500/40 text-white hover:border-amber-400 transition-all text-left shadow-sm group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0B2519] border border-amber-400/40 p-1 flex items-center justify-center shrink-0">
                      <img src="./logo-peumo-quantum.jpg" alt="Logo" className="w-full h-full object-contain rounded" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-xs">Catálogo AgroTech Chile</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black">7 LÍNEAS</span>
                      </div>
                      <span className="text-[10px] text-emerald-200/80 font-sans block">Gemelos Digitales • Hardware • Certificación</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="my-1 border-t border-emerald-900/60" />

                {/* 1. AgriTwin 3D Flagship */}
                <button
                  onClick={() => handleNavClick('agritwin')}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
                    currentView === 'agritwin' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">AgriTwin 3D (Gemelo Digital)</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-300 font-bold">FLAGSHIP • 6 RAMAS</span>
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Simulación biofísica, heladas katabáticas y FAO-56.</span>
                  </div>
                </button>

                {/* 2. Kits KioT Hardware */}
                <button
                  onClick={() => handleNavClick('hardware')}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
                    currentView === 'hardware' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">Kits A.P.I.S. / KioT Hardware</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold">HARDWARE IP65</span>
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Sondas FDR tri-estrato, heladas y válvulas LoRaWAN.</span>
                  </div>
                </button>

                {/* 3. Rewild Suite */}
                <button
                  onClick={() => handleNavClick('rewild-hub')}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
                    currentView === 'rewild-hub' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                    <Trees className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">Rewild Suite (Biodiversidad)</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-300 font-bold">ESG & RESTAURACIÓN</span>
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Field Suite & GoWild Survey para bosque nativo.</span>
                  </div>
                </button>

                <div className="my-1 border-t border-emerald-900/60" />

                {/* 4. Informes de Riesgo Predial */}
                <button
                  onClick={() => handleNavClick('satellites')}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
                    currentView === 'satellites' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-400 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">Informes de Riesgo Predial</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-400/20 text-blue-300 font-bold">24H EXPRESS</span>
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Diagnóstico geofísico pre-compra: agua y heladas.</span>
                  </div>
                </button>

                {/* 5. Pasaporte Verde UE */}
                <button
                  onClick={() => handleNavClick('satellites-pasaporte')}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-colors ${
                    currentView === 'satellites-pasaporte' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                    <QrCode className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">Pasaporte Verde UE (EUDR)</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold">CERTIFICACIÓN</span>
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Auditoría no-deforestación y QR para pallets a Europa.</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Tienda (Dropdown / Direct Link) */}
          <button
            onClick={() => handleNavClick('store')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              currentView === 'store'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Tienda</span>
          </button>

          {/* Comunidad */}
          <button
            onClick={() => handleNavClick('community')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              currentView === 'community'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/60'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Comunidad</span>
          </button>

          {/* Sé parte - Separada con Brillo Especial */}
          <button
            onClick={() => handleNavClick('join')}
            className={`relative group flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all shadow-md overflow-hidden ${
              currentView === 'join'
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-[#0B2519] ring-2 ring-amber-300 shadow-glow-gold'
                : 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-amber-300 border border-amber-400/70 hover:border-amber-300 hover:shadow-glow-gold'
            }`}
            title="Membresías y Red de Apoyo Agroecológico"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
            <Heart className="w-3.5 h-3.5 text-rose-400 animate-pulse shrink-0" />
            <span className="font-extrabold tracking-wide text-xs">Sé Parte</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
          </button>

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

          {/* 1. AgriTwin 3D Flagship */}
          <button onClick={() => handleNavClick('agritwin')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-amber-300 font-bold bg-emerald-950/60 border border-emerald-500/40">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>AgriTwin 3D (Tronco & 6 Ramas)</span>
          </button>

          {/* 2. Kits KioT Hardware */}
          <button onClick={() => handleNavClick('hardware')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Kits A.P.I.S. / KioT Hardware</span>
          </button>

          {/* 3. Informes de Riesgo Predial */}
          <button onClick={() => handleNavClick('satellites')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Informes de Riesgo Predial (24h)</span>
          </button>

          {/* 4. Pasaporte Verde UE */}
          <button onClick={() => handleNavClick('satellites-pasaporte')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <QrCode className="w-4 h-4 text-amber-400" />
            <span>Pasaporte Verde UE (EUDR)</span>
          </button>

          {/* 5. Rewild Suite */}
          <button onClick={() => handleNavClick('rewild-hub')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Trees className="w-4 h-4 text-emerald-400" />
            <span>Rewild Suite (Biodiversidad ESG)</span>
          </button>

          <button onClick={() => handleNavClick('store')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Tienda</span>
          </button>

          <button onClick={() => handleNavClick('community')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Comunidad</span>
          </button>

          <button onClick={() => handleNavClick('join')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-amber-300 font-extrabold bg-gradient-to-r from-amber-950/80 to-emerald-950/80 border border-amber-400/50 shadow-sm">
            <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>✨ Sé Parte</span>
          </button>

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
