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
                {/* Highlight: Ecosistema de 3 Suites Tecnológicas */}
                <button
                  onClick={() => handleNavClick('apps')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all border ${
                    currentView === 'apps'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] border-amber-400 shadow-md font-bold'
                      : 'bg-gradient-to-r from-[#071A11] to-[#0d2a1c] text-white border-emerald-500/40 hover:border-amber-400/70 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0B2519] border border-amber-400/40 p-1 flex items-center justify-center shrink-0">
                      <img src="./logo-peumo-quantum.jpg" alt="Logo" className="w-full h-full object-contain rounded" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-xs">Ecosistema de 3 Suites</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black">AUTÓNOMOS</span>
                      </div>
                      <span className="text-[10px] text-emerald-200/80 font-sans block">Predial (7773) + Regional (7774) + Rewild (7772)</span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </button>

                <div className="my-1 border-t border-emerald-900/60" />

                <button
                  onClick={() => handleNavClick('agritwin')}
                  className={`w-full flex items-start gap-3 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'agritwin' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">AgriTwin 3D (Gemelo Digital)</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold">PUERTO 7773</span>
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Motor Three.js, microclima y telemetría de brote.</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('rewild-hub')}
                  className={`w-full flex items-start gap-3 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'rewild-hub' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                    <Trees className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white">Rewild Suite (Biodiversidad)</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-400/20 text-emerald-300 font-bold">PUERTO 7772</span>
                    </div>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Field Suite & GoWild Survey para bosque nativo.</span>
                  </div>
                </button>

                <div className="my-1 border-t border-emerald-900/60" />

                <button
                  onClick={() => handleNavClick('hardware')}
                  className={`w-full flex items-start gap-3 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'hardware' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs block text-white">KioT Sensores & Hardware</span>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Cultivo protegido, anti-heladas y microclima IP65.</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('satellites-visor')}
                  className={`w-full flex items-start gap-3 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'satellites-visor' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <Map className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs block text-white">Visor Satelital Predial</span>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Imágenes Sentinel-2, NDVI & riesgo hídrico.</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('satellites-rewild')}
                  className={`w-full flex items-start gap-3 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'satellites-rewild' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <Trees className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs block text-white">RewildMapper SaaS</span>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Cálculo CO2e IPCC & Certificados de Biodiversidad.</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('satellites-pasaporte')}
                  className={`w-full flex items-start gap-3 p-2 rounded-xl text-left transition-colors ${
                    currentView === 'satellites-pasaporte' ? 'bg-[#071A11] text-amber-400 border border-emerald-500/30' : 'hover:bg-[#071A11] text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs block text-white">Pasaporte Verde UE</span>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Certificación ESG Pallets QR para Europa.</span>
                  </div>
                </button>

                <a
                  href="http://localhost:7774"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-start gap-3 p-2 rounded-xl text-left transition-colors hover:bg-[#071A11] text-white border-t border-emerald-900/40 mt-1 pt-2"
                >
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs flex items-center gap-1.5 text-amber-300">
                      <span>AgroTwin Regional (:7774)</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-200 border border-amber-500/40 uppercase">Macro</span>
                    </span>
                    <span className="text-[10px] text-emerald-200/70 font-sans block">Cuenca 122k ha, Riesgos FWI incendios y TWI inundaciones.</span>
                  </div>
                </a>
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

          {/* Private Founder Mission Control HQ Link (:7770 Air-Gapped) */}
          <a
            href="http://localhost:7770"
            target="_blank"
            rel="noopener noreferrer"
            title="Consola Privada Fundador • AgroTech HQ (:7770)"
            className="p-2 rounded-xl border bg-[#071A11] border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-[#0B2519] transition-all shadow-sm flex items-center justify-center"
          >
            <Lock className="w-4 h-4" />
          </a>

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

          <button onClick={() => handleNavClick('hardware')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Sensores y Kits</span>
          </button>

          <button onClick={() => handleNavClick('satellites')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Map className="w-4 h-4 text-amber-400" />
            <span>Inteligencia Satelital & ESG</span>
          </button>

          <button onClick={() => handleNavClick('apps')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-amber-300 font-bold bg-amber-950/40 border border-amber-500/30">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Ecosistema de 3 Suites</span>
          </button>

          <button onClick={() => handleNavClick('store')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Tienda (Merch, Libros & Manuales)</span>
          </button>

          <button onClick={() => handleNavClick('community')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Comunidad (Red & Bitácora de Terreno)</span>
          </button>

          <button onClick={() => handleNavClick('join')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-amber-300 font-extrabold bg-gradient-to-r from-amber-950/80 to-emerald-950/80 border border-amber-400/50 shadow-sm">
            <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>✨ Sé Parte (Membresías & Apoyo)</span>
          </button>

          <button onClick={() => handleNavClick('courses')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Cursos & Webinars</span>
          </button>

          <button onClick={() => handleNavClick('blog')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Newspaper className="w-4 h-4 text-emerald-400" />
            <span>Blog Agroclimático</span>
          </button>

          <button onClick={() => handleNavClick('somos')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white hover:bg-emerald-900">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Somos</span>
          </button>

          <button onClick={() => handleNavClick('internal')} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-amber-400 font-bold bg-amber-950/40 border border-amber-500/30">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Panel Interno Socios</span>
          </button>
        </div>
      )}
    </header>
  );
};
