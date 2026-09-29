import React, { useState } from 'react';
import { EDULAB_GAMES } from '../data/mockData';
import { EdulabGameProduct } from '../types';
import { 
  Gamepad2, Sparkles, CheckCircle2, ShoppingBag, Map, Leaf, Cpu, 
  Smile, Award, Users, Filter, Check, Heart, HelpCircle
} from 'lucide-react';

interface UrrutiaEdulabSectionProps {
  onNavigate?: (viewId: string) => void;
}

export const UrrutiaEdulabSection: React.FC<UrrutiaEdulabSectionProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'raices-chip' | 'guardianes-cuenca' | 'rewilding-maule'>('all');
  const [cartSuccessProduct, setCartSuccessProduct] = useState<EdulabGameProduct | null>(null);

  const filteredGames = selectedFilter === 'all'
    ? EDULAB_GAMES
    : EDULAB_GAMES.filter(g => g.lineId === selectedFilter);

  const handleAddToCart = (product: EdulabGameProduct) => {
    setCartSuccessProduct(product);
    setTimeout(() => setCartSuccessProduct(null), 3500);
  };

  const getLineIcon = (lineId: string) => {
    switch (lineId) {
      case 'raices-chip':
        return <Cpu className="w-5 h-5 text-amber-600" />;
      case 'guardianes-cuenca':
        return <Map className="w-5 h-5 text-cyan-600" />;
      case 'rewilding-maule':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      default:
        return <Gamepad2 className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section id="edulab" className="py-8 space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-sans font-bold">
              <Gamepad2 className="w-4 h-4 text-amber-700" />
              <span>Ecosistema Edulab Infantil • 9 Espacios Didácticos</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
              3 Juegos Principales & <span className="text-amber-600 font-serif italic">6 Adaptaciones Didácticas</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base font-serif leading-relaxed">
              Descubre nuestra matriz de 9 experiencias lúdicas simplificadas para niñas y niños. Cada juego cuenta con su <strong>Producto Principal</strong> y <strong>2 Subproductos/Adaptaciones</strong> (Laboratorio, Preescolar o Expansión) para colegios y familias.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-[#0B2519] p-5 rounded-2xl text-white font-sans space-y-2 shrink-0 border border-emerald-900 shadow-md">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Matriz Completa 9/9</span>
            </div>
            <div className="text-2xl font-extrabold">3 Juegos × 3 Formatos</div>
            <p className="text-[11px] text-emerald-200/80 font-serif">1 Producto Base + 2 Subproductos adaptados</p>
          </div>
        </div>

        {/* Interactive Category Filters */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 font-sans text-xs">
          <span className="text-slate-500 font-bold flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filtrar Espacios:</span>
          </span>

          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-amber-500 text-[#0B2519] shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos los 9 Espacios (9)
          </button>

          <button
            onClick={() => setSelectedFilter('raices-chip')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === 'raices-chip'
                ? 'bg-[#0B2519] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Raíces y Chips (3)</span>
          </button>

          <button
            onClick={() => setSelectedFilter('guardianes-cuenca')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === 'guardianes-cuenca'
                ? 'bg-cyan-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-cyan-300" />
            <span>2. Guardianes de la Cuenca (3)</span>
          </button>

          <button
            onClick={() => setSelectedFilter('rewilding-maule')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
              selectedFilter === 'rewilding-maule'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-300" />
            <span>3. Rewilding Maule (3)</span>
          </button>
        </div>
      </div>

      {/* Cart Notification Toast */}
      {cartSuccessProduct && (
        <div className="p-4 rounded-2xl bg-emerald-900 text-white border border-emerald-500 font-sans text-xs flex items-center justify-between shadow-xl animate-fadeIn">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-amber-400 shrink-0" />
            <span>¡Agregado con éxito a tu carrito: <strong>"{cartSuccessProduct.title}"</strong>!</span>
          </div>
          <span className="font-bold text-amber-300 font-mono">{cartSuccessProduct.priceClp}</span>
        </div>
      )}

      {/* Grid of Games & Subproducts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredGames.map((game) => {
          const isMain = game.type === 'main';

          return (
            <div
              key={game.id}
              className={`bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group border-2 ${
                isMain
                  ? 'border-amber-400 ring-2 ring-amber-400/20'
                  : 'border-slate-200 hover:border-emerald-300'
              }`}
            >
              {/* Top Banner Tag */}
              <div className="space-y-4">
                <div className="h-48 w-full rounded-2xl overflow-hidden relative shadow-inner">
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge Overlay */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0B2519]/90 text-white font-bold text-[10px] shadow-sm backdrop-blur-sm flex items-center gap-1.5 border border-emerald-500/30">
                    {getLineIcon(game.lineId)}
                    <span className="font-mono">{game.subproductLabel}</span>
                  </div>

                  {/* Age & Player Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-slate-800 font-bold border border-slate-200 shadow-sm">
                    <span className="flex items-center gap-1 text-emerald-800">
                      <Smile className="w-3 h-3 text-emerald-600" />
                      <span>{game.ageRange}</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-700">
                      <Users className="w-3 h-3 text-amber-600" />
                      <span>{game.players}</span>
                    </span>
                  </div>
                </div>

                {/* Line title & Price */}
                <div className="flex items-center justify-between font-sans text-xs">
                  <span className="text-[11px] font-bold text-slate-500 font-mono uppercase tracking-wider">
                    {game.lineBadge}
                  </span>
                  <span className="text-emerald-900 font-extrabold text-sm font-mono bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                    {game.priceClp}
                  </span>
                </div>

                {/* Card Title & Tagline */}
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-[#0B2519] leading-tight group-hover:text-amber-700 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-amber-800 font-serif font-bold italic">
                    "{game.tagline}"
                  </p>
                </div>

                {/* Simplified Description */}
                <p className="text-xs text-slate-600 font-serif leading-relaxed">
                  {game.description}
                </p>

                {/* Features list for kids */}
                <div className="space-y-2 pt-2 border-t border-slate-100 font-sans text-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    ¿Por qué les encanta a los niños?
                  </span>
                  {game.kidFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-700 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => handleAddToCart(game)}
                  className={`w-full py-2.5 rounded-xl font-sans text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isMain
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] hover:brightness-110'
                      : 'bg-[#0B2519] text-white hover:bg-emerald-900'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Comprar Espacio ({game.priceClp})</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
