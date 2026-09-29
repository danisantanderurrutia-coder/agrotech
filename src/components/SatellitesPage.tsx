import React from 'react';
import { InteractiveRewildMapper } from './InteractiveRewildMapper';
import { Map, ArrowLeft, Globe, Leaf, FileText, CheckCircle } from 'lucide-react';

interface SatellitesPageProps {
  onNavigate: (viewId: string) => void;
  initialSubTab?: 'visor' | 'rewild' | 'pasaporte';
}

export const SatellitesPage: React.FC<SatellitesPageProps> = ({ onNavigate, initialSubTab = 'visor' }) => {
  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B2519] py-12 border-b border-[#1E3A2B] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          <button 
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-2 font-sans font-bold text-xs text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Inicio</span>
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-amber-500/40 text-amber-300 text-xs font-sans font-bold">
              <Map className="w-3.5 h-3.5" />
              <span>Geofísica Satelital & Certificación ESG de Exportación</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Inteligencia Satelital: <span className="text-amber-400">3 Soluciones de Campo</span>
            </h1>

            <p className="text-base text-emerald-100/80 font-serif max-w-3xl">
              1. Visor Satelital Predial • 2. RewildMapper SaaS (Carbono & Biodiversidad) • 3. Pasaporte Verde de Exportación a la Unión Europea.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
        <InteractiveRewildMapper initialTab={initialSubTab} />
      </div>

    </div>
  );
};
