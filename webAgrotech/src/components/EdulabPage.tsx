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
              <span>Laboratorio Vivo Territorial, Innovación Abierta & Juegos Estratégicos</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              X Living Lab & <span className="text-amber-400">Juegos Estratégicos de Campo</span>
            </h1>

            <p className="text-base text-emerald-100/80 font-serif max-w-3xl">
              Laboratorio vivo de campo en la Región del Maule: validación comunitaria de las líneas operativas ("x Products"), juegos de mesa territoriales ("Raíces y Chips"), talleres de biofísica y transferencia tecnológica sin jerga corporativa.
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
