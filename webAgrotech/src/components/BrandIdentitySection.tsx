import React, { useState } from 'react';
import { Sparkles, Palette, Type, Shield, TreePine, Cpu, Check, Eye } from 'lucide-react';

export const BrandIdentitySection: React.FC = () => {
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
    <section id="brand" className="py-16 bg-cyber-dark border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-greenDeep border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sistema de Identidad Visual • Marca & Logotipos</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Identidad Visual: <span className="text-cyber-cyan font-serif italic">Ingeniería Agroclimática</span>
          </h2>
          
          <p className="text-cyber-paperMuted text-base font-serif">
            Un sistema de marca orgánico y tecnológico que une la botánica maulina con la ingeniería de microchips.
          </p>
        </div>

        {/* LOGO COMPARISON DISPLAYER: OPTION 1 (PEUMO QUANTUM - OFICIAL) VS OPTION D (TERRA RADAR GIS) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyber-border pb-4">
            <div>
              <span className="text-cyber-gold font-mono text-xs font-bold uppercase">OPCIONES CONCEPTUALES DE LOGO</span>
              <h3 className="text-2xl font-bold text-white">Logo Oficial (Opción 1) vs Opción D (Terra Radar)</h3>
            </div>

            <div className="flex items-center gap-2 bg-cyber-dark p-1.5 rounded-xl border border-cyber-border font-mono text-xs">
              <button
                onClick={() => setSelectedLogo('quantum')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedLogo === 'quantum' ? 'bg-cyber-cyan text-cyber-dark shadow-glow-cyan' : 'text-cyber-paperMuted hover:text-white'
                }`}
              >
                Opción 1: Peumo Quantum (Oficial)
              </button>
              <button
                onClick={() => setSelectedLogo('radar')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedLogo === 'radar' ? 'bg-cyber-gold text-cyber-dark shadow-glow-gold' : 'text-cyber-paperMuted hover:text-white'
                }`}
              >
                Opción D: Terra Radar GIS
              </button>
            </div>
          </div>

          <div className="glass-panel-green p-6 sm:p-8 rounded-3xl border border-cyber-cyan/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative group">
              <div className="rounded-2xl overflow-hidden border border-cyber-cyan/50 bg-cyber-dark p-4 shadow-2xl">
                <img 
                  src={selectedLogo === 'quantum' ? './logo-peumo-quantum.jpg' : './logo-terra-radar.jpg'} 
                  alt={selectedLogo === 'quantum' ? 'Logo Oficial Peumo Quantum' : 'Logo Opción D Terra Radar GIS'} 
                  className="w-full h-auto object-contain rounded-xl group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-cyber-gold font-mono text-xs uppercase font-bold">
                <Eye className="w-4 h-4" />
                <span>{selectedLogo === 'quantum' ? 'Opción 1 Seleccionada como Oficial' : 'Opción D (Exploratoria)'}</span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {selectedLogo === 'quantum' ? 'Opción 1: Peumo Quantum (Hoja & Circuito Cuántico)' : 'Opción D: Terra Radar GIS (Barrido Satelital)'}
              </h3>

              <p className="text-cyber-paper/90 text-sm leading-relaxed font-serif">
                {selectedLogo === 'quantum' 
                  ? 'Fusión simétrica de alta precisión: la mitad izquierda representa la estructura celular y nervaduras de una hoja nativa de Peumo maulino, mientras la mitad derecha integra las pistas de cobre y nodos de procesamiento de un microchip. Neón cian y dorado sobre fondo obsidiana.'
                  : 'Emblema circular inspirado en los barridos de radar satelital Sentinel-2. Combina contornos topográficos de elevación del suelo con la silueta de un árbol nativo y antenas de microondas.'}
              </p>

              <div className="p-4 rounded-xl bg-cyber-dark/90 border border-cyber-border font-mono text-xs space-y-1">
                <span className="text-cyber-cyan font-bold block text-[10px]">APLICADO EN TODO EL PROYECTO:</span>
                <p className="text-cyber-paperMuted">Favicon SVG, Cabecera del Sitio, Tarjeta de Presentación, Script de Escritorio y App macOS.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Color Palette Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <Palette className="w-5 h-5 text-cyber-cyan" />
            <h3>Paleta de Colores Agroclimáticos</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {brandColors.map((color) => (
              <div 
                key={color.hex} 
                className="glass-panel p-4 rounded-xl border border-cyber-border hover:border-cyber-cyan/40 transition-all space-y-3 group"
              >
                <div 
                  className="h-20 rounded-lg w-full shadow-inner flex items-end justify-end p-2 border border-white/10"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/60 text-white">
                    {color.hex}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-cyber-cyan transition-colors">
                    {color.name}
                  </h4>
                  <p className="text-xs text-cyber-gold font-mono font-medium">{color.role}</p>
                  <p className="text-[11px] text-cyber-paperMuted mt-1">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Type className="w-5 h-5 text-cyber-gold" />
            <h3>Sistema Tipográfico</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {typographySystem.map((item) => (
              <div key={item.type} className="p-3.5 rounded-xl bg-cyber-dark/80 border border-cyber-border space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyber-cyan font-bold">{item.type}</span>
                </div>
                <p className="text-sm font-semibold text-white tracking-wide">{item.sample}</p>
                <p className="text-[10px] text-cyber-paperMuted font-mono">{item.font} ({item.style})</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
