import React, { useState } from 'react';
import { BOM_MATRIX } from '../data/mockData';
import type { BomItem } from '../types';
import { Cpu, DollarSign, Layers, Wrench, ShieldCheck, ArrowRight, Download, Filter } from 'lucide-react';

export const BomAndHardwareMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [importDiscountActive, setImportDiscountActive] = useState<boolean>(false);

  const categories = ['All', 'Procesamiento', 'Visión', 'Conectividad', 'Sensórica Suelo', 'Sensórica Clima', 'Sensórica Hoja', 'Sensórica Fauna', 'Actuador', 'Alimentación', 'Gabinete'];

  const filteredBom = selectedCategory === 'All' 
    ? BOM_MATRIX 
    : BOM_MATRIX.filter(item => item.category === selectedCategory);

  return (
    <section id="bom-matrix" className="py-16 bg-cyber-dark border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-greenDeep border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
              <Wrench className="w-3.5 h-3.5" />
              <span>Matriz de Materiales (BOM) • Manufactura Local Maule</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Lista de Componentes <span className="text-cyber-cyan">Bill of Materials</span>
            </h2>

            <p className="text-cyber-paperMuted text-base font-serif">
              Prototipado rápido con componentes locales en Chile (MCI, MercadoLibre) y escalamiento con importación directa desde China (40-60% reducción de costo).
            </p>
          </div>

          {/* Import Direct Toggle */}
          <button
            onClick={() => setImportDiscountActive(!importDiscountActive)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border ${
              importDiscountActive
                ? 'bg-cyber-gold text-cyber-dark border-cyber-gold shadow-glow-gold'
                : 'bg-cyber-panel border-cyber-border text-cyber-paper hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>{importDiscountActive ? 'Simulando Importación Directa China (-50%)' : 'Modo Compra Local Chile (MVP)'}</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                selectedCategory === cat
                  ? 'bg-cyber-cyan text-cyber-dark font-bold'
                  : 'bg-cyber-panel text-cyber-paperMuted border border-cyber-border hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* BOM Table */}
        <div className="glass-panel rounded-2xl border border-cyber-border overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-cyber-dark/90 border-b border-cyber-border text-cyber-cyan uppercase text-[11px]">
                <tr>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Componente</th>
                  <th className="p-4">Especificación / Modelo</th>
                  <th className="p-4">Precio Est. (CLP)</th>
                  <th className="p-4">Proveedor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border/60 text-cyber-paper/90">
                {filteredBom.map((item, idx) => (
                  <tr key={idx} className="hover:bg-cyber-panel/60 transition-colors">
                    <td className="p-4 text-cyber-gold font-bold">{item.category}</td>
                    <td className="p-4 font-semibold text-white">{item.component}</td>
                    <td className="p-4 text-cyber-paperMuted">{item.spec}</td>
                    <td className="p-4 text-cyber-cyan font-bold">
                      {importDiscountActive ? 'Desc. Importación ~50%' : item.priceClp}
                    </td>
                    <td className="p-4 text-xs">{item.supplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PCB Engineering & Firmware Roadmap */}
        <div className="glass-panel-green p-6 sm:p-8 rounded-2xl border border-cyber-cyan/30 space-y-4 font-mono">
          <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyber-cyan" />
            <span>Hoja de Ruta de Ingeniería: Custom PCB & Deep Sleep (&lt;20 µA)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-border space-y-1.5">
              <span className="text-cyber-gold font-bold block text-[10px]">1. CUSTOM PCB (KICAD)</span>
              <p className="text-cyber-paperMuted">Placa integrada con zócalos ESP32, conectores estancos M12 a rosca y optoacopladores de protección para relés.</p>
            </div>

            <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-border space-y-1.5">
              <span className="text-emerald-400 font-bold block text-[10px]">2. FIRMWARE DEEP SLEEP</span>
              <p className="text-cyber-paperMuted">Consumo &lt; 20 µA. Transmisión rápida cada 60 min o interrupción física en pin de helada/PIR.</p>
            </div>

            <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-border space-y-1.5">
              <span className="text-cyber-cyan font-bold block text-[10px]">3. CONECTIVIDAD M2M 4G</span>
              <p className="text-cyber-paperMuted">SIMs IoT multicompañía (LTE-M/NB-IoT) con conmutación automática entre Entel, Movistar y Claro en Maule.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
