import React from 'react';
import { ChefAgtechKitsSection } from './ChefAgtechKitsSection';
import { KiotTelemetrySimulator } from './KiotTelemetrySimulator';
import { BomAndHardwareMatrix } from './BomAndHardwareMatrix';
import { Cpu, ArrowLeft } from 'lucide-react';

interface HardwarePageProps {
  onNavigate: (viewId: string) => void;
}

export const HardwarePage: React.FC<HardwarePageProps> = ({ onNavigate }) => {
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-sans font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Sensórica Telemétrica, Edge Computing & Mecatrónica de Campo</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Hardware Telemétrico & Estaciones IP65
            </h1>

            <p className="text-base text-emerald-100/80 font-serif max-w-3xl">
              Equipos mecatrónicos autónomos diseñados y ensamblados en Talca (Región del Maule). Resistentes a heladas extremas, radiación UV y lluvia intensa.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
        <ChefAgtechKitsSection />
        <KiotTelemetrySimulator />
        <BomAndHardwareMatrix />
      </div>

    </div>
  );
};
