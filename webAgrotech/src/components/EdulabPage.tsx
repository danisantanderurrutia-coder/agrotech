import React from 'react';
import { UrrutiaEdulabSection } from './UrrutiaEdulabSection';
import { GraduationCap, ArrowLeft, BookOpen, Award } from 'lucide-react';

interface EdulabPageProps {
  onNavigate: (viewId: string) => void;
}

export const EdulabPage: React.FC<EdulabPageProps> = ({ onNavigate }) => {
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
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Capacitación agronómica en terreno y manuales operacionales</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Urrutia Edulab & <span className="text-amber-400">Juego "Raíces y Chips"</span>
            </h1>

            <p className="text-base text-emerald-100/80 font-serif max-w-3xl">
              Talleres presenciales en la Región del Maule, webinars online de precisión agrícola y literatura técnica sin jerga corporativa para agricultores y equipos de campo.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <UrrutiaEdulabSection />
      </div>

    </div>
  );
};
