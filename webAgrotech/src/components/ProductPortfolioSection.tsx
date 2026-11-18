import React, { useState } from 'react';
import { PRODUCT_PORTFOLIO } from '../data/mockData';
import { ProductLine } from '../types';
import { 
  FileText, Cpu, Activity, Globe, Leaf, GraduationCap, BookOpen, Camera,
  Layers, CheckCircle, ArrowUpRight, DollarSign, Target, Info, Download, X,
  Zap, Smartphone, ShieldAlert, Sparkles, Database, ArrowRight
} from 'lucide-react';

export const ProductPortfolioSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductLine>(PRODUCT_PORTFOLIO[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [phaseFilter, setPhaseFilter] = useState<'all' | 1 | 2 | 3>('all');

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileText': return FileText;
      case 'Cpu': return Cpu;
      case 'Activity': return Activity;
      case 'Globe': return Globe;
      case 'Leaf': return Leaf;
      case 'GraduationCap': return GraduationCap;
      case 'BookOpen': return BookOpen;
      case 'Camera': return Camera;
      default: return Layers;
    }
  };

  const handleOpenDetail = (product: ProductLine) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const filteredProducts = phaseFilter === 'all' 
    ? PRODUCT_PORTFOLIO 
    : PRODUCT_PORTFOLIO.filter(p => p.phase === phaseFilter);

  return (
    <section id="products" className="py-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-sans font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Línea Estratégica de Implementación · Software First</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
              Arquitectura de Productos: <span className="text-amber-600">Del Software al Ecosistema</span>
            </h2>
            
            <p className="text-slate-600 text-base font-serif">
              Habilitamos primero los softwares de forma secuencial para activar el <strong>Data Flywheel</strong> y el <strong>Feature Stacking</strong>. Luego conectamos el hardware en campo y finalmente desplegamos el ecosistema agroecológico total.
            </p>
          </div>

          {/* Phase Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-sans">
            <button
              onClick={() => setPhaseFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                phaseFilter === 'all'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({PRODUCT_PORTFOLIO.length})
            </button>
            <button
              onClick={() => setPhaseFilter(1)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                phaseFilter === 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              <Zap className="w-3 h-3 text-amber-300" />
              <span>Fase 1: Software & Micro-SaaS</span>
            </button>
            <button
              onClick={() => setPhaseFilter(2)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                phaseFilter === 2
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              <span>Fase 2: Hardware IoT</span>
            </button>
            <button
              onClick={() => setPhaseFilter(3)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                phaseFilter === 3
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-purple-700'
              }`}
            >
              <span>Fase 3: Ecosistema</span>
            </button>
          </div>
        </div>

        {/* ROADMAP / DATA FLYWHEEL STRATEGY BANNER */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B2519] via-[#0D3322] to-[#0A1A12] text-white border border-emerald-500/30 shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">1. ADQUISICIÓN RÁPIDA</span>
            <h4 className="text-lg font-bold">AgroAlerta de Bolsillo</h4>
            <p className="text-xs text-emerald-200/80 font-serif leading-relaxed">
              El agricultor entra por WhatsApp en 60s para protegerse de heladas e incendios sin descargar apps pesadas.
            </p>
          </div>

          <div className="space-y-1 border-y lg:border-y-0 lg:border-x border-white/10 py-4 lg:py-0 lg:px-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">2. DATA FLYWHEEL & STACKING</span>
            <h4 className="text-lg font-bold">El Twin Maestro</h4>
            <p className="text-xs text-emerald-200/80 font-serif leading-relaxed">
              Cada alerta delimita predios y acumula datos de suelo y cuenca. El cliente activa módulos de Riego (Agua), Fuego o Pasaporte UE.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">3. UPGRADE DE HARDWARE</span>
            <h4 className="text-lg font-bold">Fase 2: Conexión Física</h4>
            <p className="text-xs text-emerald-200/80 font-serif leading-relaxed">
              No vendemos fierros en frío. El cliente de software adquiere los kits KioT para calibrar su surco con precisión milimétrica.
            </p>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const Icon = getIcon(product.iconName);
            const isSelected = selectedProduct.id === product.id;
            const isAgroAlerta = product.id === 'agroalerta-pocket';

            return (
              <div
                key={product.id}
                onClick={() => handleOpenDetail(product)}
                className={`rounded-2xl p-6 border transition-all cursor-pointer group hover:-translate-y-1 flex flex-col justify-between ${
                  isAgroAlerta
                    ? 'border-2 border-emerald-500 bg-gradient-to-b from-emerald-50/50 via-white to-amber-50/20 shadow-md ring-2 ring-emerald-500/20 relative overflow-hidden'
                    : isSelected
                    ? 'border-emerald-600 shadow-md ring-2 ring-emerald-500/20 bg-white'
                    : 'border-slate-200 hover:border-emerald-500/50 shadow-sm bg-white'
                }`}
              >
                {/* Special Tag for AgroAlerta */}
                {isAgroAlerta && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-600 to-amber-500 text-white text-[9px] font-mono font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Smartphone className="w-3 h-3" />
                    <span>MICRO-SAAS ESTRELLA · WHATSAPP 60S</span>
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isAgroAlerta
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-emerald-50 border border-emerald-200 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end">
                      <span className={`text-[10px] font-sans font-bold uppercase px-2.5 py-1 rounded border ${
                        product.phase === 1 
                          ? 'bg-blue-50 text-blue-800 border-blue-200' 
                          : product.phase === 2
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-purple-50 text-purple-800 border-purple-200'
                      }`}>
                        {product.phaseLabel || product.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono mt-1">Línea #{product.number}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-serif mt-2 line-clamp-2">
                    {product.tagline}
                  </p>
                </div>

                {/* Key specs highlight */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-slate-500">Modelo:</span>
                    <span className="text-amber-800 font-bold truncate max-w-[180px]">{product.businessModel}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="text-slate-500">Rango Precio:</span>
                    <span className="text-emerald-800 font-bold">{product.priceRange}</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-sans text-emerald-800 font-bold">
                    <span>Ver Ficha Técnica Completa</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Modal */}
        {modalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900">
              
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-sans text-xs font-bold">
                  FICHA TÉCNICA • PRODUCTO #{selectedProduct.number}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 font-sans text-xs font-bold">
                  {selectedProduct.phaseLabel || `Fase ${selectedProduct.phase}`}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-sans text-xs font-bold">
                  {selectedProduct.category}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2519]">
                  {selectedProduct.title}
                </h3>
                <p className="text-base text-slate-600 font-serif mt-1">
                  {selectedProduct.tagline}
                </p>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                {selectedProduct.description}
              </div>

              {/* Impact Metric Banner */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-sans flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold uppercase text-[10px] text-emerald-800 block">IMPACTO PROBADO EN CAMPO</span>
                  <span>{selectedProduct.impactMetric}</span>
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#0B2519] font-sans uppercase flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-700" />
                  <span>Características Clave & Capacidad</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProduct.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Specs Grid */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#0B2519] font-sans uppercase flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-600" />
                  <span>Especificaciones Técnicas</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  {Object.entries(selectedProduct.specs).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] text-slate-500 block uppercase font-sans font-bold">{key}</span>
                      <span className="text-emerald-800 font-semibold block truncate">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Model & Target */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-sans text-xs">
                  <span className="text-amber-800 font-bold flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-amber-600" /> Modelo de Negocio & Precio
                  </span>
                  <p className="text-slate-900 font-bold">{selectedProduct.businessModel}</p>
                  <p className="text-emerald-800 font-bold">{selectedProduct.priceRange}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 font-sans text-xs">
                  <span className="text-slate-600 font-bold flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-emerald-700" /> Cliente Objetivo
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedProduct.targetAudience.map((target, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white text-slate-700 text-[10px] border border-slate-300">
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
                <a
                  href={`https://wa.me/56976696142?text=Hola%20AgroTech%20Chile,%20me%20interesa%20activar%20el%20producto:%20${encodeURIComponent(selectedProduct.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-sans font-bold hover:bg-emerald-600 transition-colors shadow-sm"
                >
                  <Smartphone className="w-4 h-4 text-amber-300" />
                  <span>Activar / Cotizar vía WhatsApp</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Ficha Técnica Oficial AgroTech Chile: ${selectedProduct.title}\nID: ${selectedProduct.id}\nFase: ${selectedProduct.phaseLabel}\nPrecio: ${selectedProduct.priceRange}\nModelo: ${selectedProduct.businessModel}`)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-xs font-sans font-medium hover:bg-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ver Ficha Técnica</span>
                  </button>

                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all"
                  >
                    Cerrar
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
