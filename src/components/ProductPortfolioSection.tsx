import React, { useState } from 'react';
import { PRODUCT_PORTFOLIO } from '../data/mockData';
import { ProductLine } from '../types';
import { 
  FileText, Cpu, Activity, Globe, Leaf, GraduationCap, BookOpen, 
  Layers, CheckCircle, ArrowUpRight, DollarSign, Target, Info, Download, X 
} from 'lucide-react';

export const ProductPortfolioSection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductLine>(PRODUCT_PORTFOLIO[0]);
  const [modalOpen, setModalOpen] = useState(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'FileText': return FileText;
      case 'Cpu': return Cpu;
      case 'Activity': return Activity;
      case 'Globe': return Globe;
      case 'Leaf': return Leaf;
      case 'GraduationCap': return GraduationCap;
      case 'BookOpen': return BookOpen;
      default: return Layers;
    }
  };

  const handleOpenDetail = (product: ProductLine) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <section id="products" className="py-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-sans font-bold">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Portafolio de 7 Líneas de Precisión Agronómica</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
              Una Plataforma, <span className="text-amber-600">Siete Líneas de Ingreso</span>
            </h2>
            
            <p className="text-slate-600 text-base font-serif">
              Desde monetización inmediata en el Mes 1 con Informes Prediales hasta certificación de biodiversidad y pasaportes verdes para exportación a Europa.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-sans text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Selecciona un producto para ver su Ficha Técnica</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_PORTFOLIO.map((product) => {
            const Icon = getIcon(product.iconName);
            const isSelected = selectedProduct.id === product.id;

            return (
              <div
                key={product.id}
                onClick={() => handleOpenDetail(product)}
                className={`rounded-2xl p-6 border transition-all cursor-pointer group hover:-translate-y-1 bg-white ${
                  isSelected
                    ? 'border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-emerald-500/50 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-sans font-bold uppercase px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-300">
                      {product.category}
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
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-sans text-emerald-800 font-bold">
                  <span>Ver Ficha Técnica Completa</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed One-Pager Modal */}
        {modalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900">
              
              {/* Modal Close Button */}
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
                  href={`https://wa.me/56976696142?text=Hola%20AgroTech%20Chile,%20me%20interesa%20cotizar%20formalmente%20el%20producto:%20${encodeURIComponent(selectedProduct.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-sans font-bold hover:bg-emerald-600 transition-colors shadow-sm"
                >
                  <span>Cotizar este Producto vía WhatsApp</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Ficha Técnica Oficial AgroTech Chile: ${selectedProduct.title}\nID: ${selectedProduct.id}\nPrecio: ${selectedProduct.priceRange}\nModelo: ${selectedProduct.businessModel}`)}
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
