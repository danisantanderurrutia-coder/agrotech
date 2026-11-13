import React, { useState } from 'react';
import { MERCH_ITEMS } from '../data/mockData';
import { MerchItem } from '../types';
import { ShoppingBag, Tag, Check, Sparkles, Shirt, ShieldAlert, Camera } from 'lucide-react';

export const MerchandiseSection: React.FC = () => {
  const [selectedMerch, setSelectedMerch] = useState<MerchItem>(MERCH_ITEMS[0]);

  return (
    <section id="merch" className="py-16 bg-tech-grid border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-greenDeep border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Entregable #5 • Merchandising & Lifestyle AgroTech</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Colección Oficial: <span className="text-cyber-gold">Code Meets Roots</span>
          </h2>

          <p className="text-cyber-paperMuted text-base font-serif">
            Hacer visible y deseable la revolución tecnológica rural. Estética de Precisión: La ingeniería se encuentra con la tradición del campo chileno.
          </p>
        </div>

        {/* Merch Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MERCH_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMerch(item)}
              className={`glass-panel p-5 rounded-2xl border transition-all cursor-pointer group hover:-translate-y-1 ${
                selectedMerch.id === item.id
                  ? 'border-cyber-cyan shadow-glow-cyan bg-cyber-panel/90'
                  : 'border-cyber-border hover:border-cyber-cyan/40'
              }`}
            >
              {/* Card Header & Badge */}
              <div className="flex items-center justify-between mb-4 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-cyber-dark text-cyber-gold border border-cyber-gold/30 font-bold text-[10px]">
                  {item.badge}
                </span>
                <span className="text-cyber-paperMuted">{item.category}</span>
              </div>

              {/* Merch Mockup Box */}
              <div className="h-48 rounded-xl bg-cyber-dark border border-cyber-border flex items-center justify-center p-0 relative overflow-hidden group-hover:border-cyber-cyan/60 transition-all duration-300">
                {item.imageUrl ? (
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/30 to-transparent" />
                    
                    {/* Brand overlay watermark badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-cyber-dark/85 backdrop-blur-md px-2 py-1 rounded-full border border-cyber-cyan/30">
                      <div className="w-4 h-4 rounded-full bg-cyber-greenDeep border border-cyber-cyan flex items-center justify-center p-0.5">
                        <img src="./logo-cyber-pampa.png" alt="Emblem" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] font-mono text-cyber-cyan font-bold">CYBER-PAMPA</span>
                    </div>

                    <div className="absolute top-2 right-2 text-[9px] font-mono text-cyber-paperMuted/80 bg-cyber-dark/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-cyber-border/40">
                      Unsplash
                    </div>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-cyber-greenDeep/80 border border-cyber-cyan/30 flex items-center justify-center p-2 shadow-glow-green">
                    <img src="./logo-cyber-pampa.png" alt="Emblem" className="w-full h-full object-contain" />
                  </div>
                )}
                <div className="absolute bottom-2 right-2 text-[11px] font-mono text-cyber-gold font-bold bg-cyber-dark/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyber-gold/40 shadow-lg">
                  {item.price}
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="mt-4 space-y-1">
                <h3 className="font-bold text-white text-base group-hover:text-cyber-cyan transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-cyber-paperMuted font-serif line-clamp-2">
                  {item.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-cyber-border/60 flex items-center justify-between text-xs font-mono text-cyber-cyan font-semibold">
                <span>Ver Especificaciones</span>
                <Tag className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Selected Merch Detail Showcase */}
        {selectedMerch && (
          <div className="glass-panel-green p-6 sm:p-8 rounded-2xl border border-cyber-cyan/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="h-72 sm:h-80 rounded-xl bg-cyber-dark border border-cyber-cyan/40 flex items-center justify-center p-0 shadow-2xl relative overflow-hidden group">
                {selectedMerch.imageUrl ? (
                  <>
                    <img 
                      src={selectedMerch.imageUrl} 
                      alt={selectedMerch.name} 
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 brightness-95" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/20 to-transparent rounded-xl pointer-events-none" />
                    
                    <div className="absolute top-4 left-4 font-mono text-xs text-cyber-gold font-bold bg-cyber-dark/90 backdrop-blur-md px-3 py-1 rounded-lg border border-cyber-gold/40 shadow-lg">
                      EDICIÓN CYBER-PAMPA MAULE
                    </div>

                    <div className="absolute top-4 right-4 text-[10px] font-mono text-cyber-cyan bg-cyber-dark/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyber-cyan/40 flex items-center gap-1">
                      <Camera className="w-3 h-3 text-cyber-cyan" />
                      <span>Fotografía Unsplash</span>
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyber-dark/90 backdrop-blur-md border border-cyber-cyan flex items-center justify-center p-1.5 shadow-glow-cyan">
                        <img src="./logo-cyber-pampa.png" alt="Emblem" className="w-full h-full object-contain" />
                      </div>
                      <div className="font-mono text-xs text-cyber-paper font-bold bg-cyber-dark/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyber-border">
                        {selectedMerch.category} • {selectedMerch.badge}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-32 h-32 rounded-full bg-cyber-greenDeep border border-cyber-cyan flex items-center justify-center p-3 shadow-glow-cyan">
                      <img src="./logo-cyber-pampa.png" alt="Emblem" className="w-full h-full object-contain" />
                    </div>
                    <span className="absolute top-4 left-4 font-mono text-xs text-cyber-gold font-bold bg-cyber-panel px-3 py-1 rounded-lg border border-cyber-border">
                      EDICIÓN CYBER-PAMPA MAULE
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 font-sans">
              <div className="flex items-center gap-2 text-cyber-cyan font-mono text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>PRODUCTO DE ESTILO DE VIDA SELECTO</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">
                {selectedMerch.name}
              </h3>

              <p className="text-cyber-paper/90 text-sm leading-relaxed font-serif">
                {selectedMerch.description}
              </p>

              {/* Specs list */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono font-bold text-cyber-gold uppercase block">MATERIALES & CONSTRUCCIÓN:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedMerch.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-cyber-paperMuted p-2 rounded-lg bg-cyber-dark/80 border border-cyber-border">
                      <Check className="w-3.5 h-3.5 text-cyber-cyan shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <span className="text-2xl font-bold text-cyber-gold font-mono">{selectedMerch.price}</span>
                <button
                  onClick={() => alert(`Reserva de merchandising enviada para: ${selectedMerch.name}`)}
                  className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-cyber-dark font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all"
                >
                  Reservar Unidad
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
