import React, { useState } from 'react';
import { Sparkles, Palette, Type, Eye, Presentation, Compass, Layers, ExternalLink, ArrowRight, ShieldCheck, CheckCircle2, MonitorPlay } from 'lucide-react';

interface BrandIdentitySectionProps {
  initialTab?: 'naming' | 'visual';
}

export const BrandIdentitySection: React.FC<BrandIdentitySectionProps> = ({ initialTab = 'naming' }) => {
  const [activeTab, setActiveTab] = useState<'naming' | 'visual'>(initialTab);
  const [selectedLogo, setSelectedLogo] = useState<'quantum' | 'radar'>('quantum');

  const brandColors = [
    { name: 'Forest Deep', hex: '#0B2B1D', role: 'Verde Nativo Chileno', usage: 'Fondos primarios y empaques' },
    { name: 'Volcanic Earth', hex: '#0A0F0D', role: 'Negro Volcánico', usage: 'Dark Mode UI y chasis IP65' },
    { name: 'Satellite Cyan', hex: '#00F0FF', role: 'Cian Satelital', usage: 'Telemetría, sensores y código' },
    { name: 'Harvest Gold', hex: '#E5A93C', role: 'Dorado Cosecha', usage: 'Acentos premium, ESG y alertas' },
    { name: 'Natural Paper', hex: '#F4F1EA', role: 'Papel Orgánico', usage: 'Tipografía de cuerpo y manuales' },
  ];

  const typographySystem = [
    { type: 'Headlines & Logos', font: 'Space Grotesk', style: 'Bold / Geometric Sans', sample: 'URRUTIA AGROTECH' },
    { type: 'IoT & Telemetría', font: 'JetBrains Mono', style: 'Monospace Tech', sample: 'ESP32_TEMP: -1.2°C [LoRa 915MHz]' },
    { type: 'Cuerpo & Narrativa', font: 'Plus Jakarta Sans', style: 'Humanist Serif Accent', sample: 'Donde la raíz maulina encuentra la alta tecnología.' },
  ];

  return (
    <section id="brand" className="py-12 bg-[#0B0D11] text-[#F3F4F6] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Top Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SALA ESTRATÉGICA DE MARCA & HOLDING // 2026</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Ecosistema de Marca & Naming
            </h2>
          </div>

          {/* Navigation Pill */}
          <div className="flex items-center gap-2 bg-[#12161F] p-1.5 rounded-2xl border border-white/10 font-mono text-xs">
            <button
              onClick={() => setActiveTab('naming')}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'naming'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>01. Naming & Deck (18 Slides)</span>
            </button>
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all ${
                activeTab === 'visual'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>02. Logotipo & Paleta</span>
            </button>
          </div>
        </div>

        {/* TAB 1: NAMING & SLIDE DECK (TODO INTEGRADO DENTRO DE LAS DIAPOSITIVAS) */}
        {activeTab === 'naming' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header with Direct Fullscreen Link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold">PRESENTACIÓN EJECUTIVA COMPLETA · 18 SLIDES</span>
                <h3 className="text-2xl font-bold text-white">Deck Estratégico del Holding: Bautizando la Nave Nodriza</h3>
              </div>
              <a
                href="./naming-slides.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono text-white font-bold transition shadow-lg shadow-blue-600/25"
              >
                <MonitorPlay className="w-4 h-4" />
                <span>Abrir en Pantalla Completa</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
              </a>
            </div>

            {/* Embedded Slide Deck Canvas (16:9) */}
            <div className="relative w-full rounded-2xl border border-white/15 overflow-hidden bg-black shadow-2xl" style={{ aspectRatio: '16/9', minHeight: '520px' }}>
              <iframe
                src="./naming-slides.html"
                title="Presentación Naming Chile AgroTech Completa"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>

            {/* Quick Overview Navigation Map Below Slides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 bg-[#121620] rounded-xl border border-white/5 space-y-1">
                <span className="text-blue-400 font-bold block">SLIDES 01 - 06:</span>
                <p className="text-neutral-300">Arquitectura Institucional y Autopsia Crítica a fondo (AgroTech, Buen Vivir y Solarpunks).</p>
              </div>

              <div className="p-4 bg-[#121620] rounded-xl border border-white/5 space-y-1">
                <span className="text-emerald-400 font-bold block">SLIDES 07 - 09:</span>
                <p className="text-neutral-300">Las 8 Reglas Innegociables de Naming (Prueba de radio, dialéctica, rigor científico e INAPI).</p>
              </div>

              <div className="p-4 bg-[#121620] rounded-xl border border-white/5 space-y-1">
                <span className="text-amber-400 font-bold block">SLIDES 10 - 18:</span>
                <p className="text-neutral-300">Las 6 Rutas Conceptuales completas, Matriz Comparativa y Dinámica de Votación en 30 min.</p>
              </div>
            </div>

            {/* Keyboard Guide Footer */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold">CONTROLES DENTRO DEL DECK:</span>
                <span>[←] [→] o [ESPACIO] Navegar</span>
                <span>•</span>
                <span>[N] Activar Notas de Orador</span>
              </div>
              <a
                href="./naming-slides.html"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 underline font-semibold"
              >
                Ver enlace autónomo directo →
              </a>
            </div>

          </div>
        )}

        {/* TAB 2: VISUAL IDENTITY (ORIGINAL) */}
        {activeTab === 'visual' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Section Header */}
            <div className="space-y-2 max-w-3xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Identidad Visual: <span className="text-emerald-400 font-serif italic">Ingeniería Agroclimática</span>
              </h3>
              <p className="text-neutral-400 text-sm font-serif">
                Un sistema de marca orgánico y tecnológico que une la botánica maulina con la ingeniería de microchips.
              </p>
            </div>

            {/* LOGO COMPARISON DISPLAYER */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-amber-400 font-mono text-xs font-bold uppercase">OPCIONES CONCEPTUALES DE LOGO</span>
                  <h4 className="text-xl font-bold text-white">Logo Oficial (Opción 1) vs Opción D (Terra Radar)</h4>
                </div>

                <div className="flex items-center gap-2 bg-[#121620] p-1.5 rounded-xl border border-white/10 font-mono text-xs">
                  <button
                    onClick={() => setSelectedLogo('quantum')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      selectedLogo === 'quantum' ? 'bg-cyan-500 text-black shadow-md' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Opción 1: Peumo Quantum (Oficial)
                  </button>
                  <button
                    onClick={() => setSelectedLogo('radar')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      selectedLogo === 'radar' ? 'bg-amber-400 text-black shadow-md' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Opción D: Terra Radar GIS
                  </button>
                </div>
              </div>

              <div className="bg-[#121620] p-6 sm:p-8 rounded-3xl border border-cyan-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 relative group">
                  <div className="rounded-2xl overflow-hidden border border-cyan-500/40 bg-black p-4 shadow-2xl">
                    <img 
                      src="./logo-peumo-quantum.jpg" 
                      alt={selectedLogo === 'quantum' ? 'Logo Oficial Peumo Quantum' : 'Logo Opción D Terra Radar GIS'} 
                      className="w-full h-auto object-contain rounded-xl group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold">
                    <Eye className="w-4 h-4" />
                    <span>{selectedLogo === 'quantum' ? 'Opción 1 Seleccionada como Oficial' : 'Opción D (Exploratoria)'}</span>
                  </div>

                  <h4 className="text-2xl font-bold text-white">
                    {selectedLogo === 'quantum' ? 'Opción 1: Peumo Quantum (Hoja & Circuito Cuántico)' : 'Opción D: Terra Radar GIS (Barrido Satelital)'}
                  </h4>

                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-serif">
                    {selectedLogo === 'quantum' 
                      ? 'Fusión simétrica de alta precisión: la mitad izquierda representa la estructura celular y nervaduras de una hoja nativa de Peumo maulino, mientras la mitad derecha integra las pistas de cobre y nodos de procesamiento de un microchip. Neón cian y dorado sobre fondo obsidiana.'
                      : 'Emblema circular inspirado en los barridos de radar satelital Sentinel-2. Combina contornos topográficos de elevación del suelo con la silueta de un árbol nativo y antenas de microondas.'}
                  </p>

                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-1">
                    <span className="text-cyan-400 font-bold block text-[10px]">APLICADO EN TODO EL PROYECTO:</span>
                    <p className="text-neutral-400">Favicon SVG, Cabecera del Sitio, Tarjeta de Presentación, Script de Escritorio y App macOS.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Palette Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-xl">
                <Palette className="w-5 h-5 text-cyan-400" />
                <h3>Paleta de Colores Agroclimáticos</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {brandColors.map((color) => (
                  <div 
                    key={color.hex} 
                    className="p-4 rounded-xl bg-[#121620] border border-white/10 hover:border-cyan-400/40 transition-all space-y-3 group"
                  >
                    <div 
                      className="h-20 rounded-lg w-full shadow-inner flex items-end justify-end p-2 border border-white/10"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/70 text-white">
                        {color.hex}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                        {color.name}
                      </h5>
                      <p className="text-xs text-amber-400 font-mono font-medium">{color.role}</p>
                      <p className="text-[11px] text-neutral-400 mt-1">{color.usage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="p-6 rounded-2xl bg-[#121620] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <Type className="w-5 h-5 text-amber-400" />
                <h3>Sistema Tipográfico</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {typographySystem.map((item) => (
                  <div key={item.type} className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-400 font-bold">{item.type}</span>
                    </div>
                    <p className="text-sm font-semibold text-white tracking-wide">{item.sample}</p>
                    <p className="text-[10px] text-neutral-400 font-mono">{item.font} ({item.style})</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
