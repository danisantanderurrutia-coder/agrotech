import React, { useState, useEffect } from 'react';
import { 
  UNIFIED_PITCH_SLIDES,
  PROJECT_PITCH_SLIDES, 
  MARKET_PITCH_SLIDES, 
  ORGANIZATION_PITCH_SLIDES, 
  COMMERCIAL_PITCH_SLIDES 
} from '../data/mockData';
import { PitchSlide } from '../types';
import { 
  X, ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Presentation, CheckCircle2, MessageSquare, Sparkles, Activity, Radio, 
  Globe, ShieldCheck, ArrowRight, Layers, Sun, BarChart3, Users, TrendingUp,
  Bookmark, ListOrdered
} from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDeckType?: 'unified' | 'project' | 'market' | 'organization' | 'commercial';
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isOpen, onClose, initialDeckType = 'unified' }) => {
  const [deckType, setDeckType] = useState<'unified' | 'project' | 'market' | 'organization' | 'commercial'>(initialDeckType);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const getActiveDeck = (): PitchSlide[] => {
    switch (deckType) {
      case 'market': return MARKET_PITCH_SLIDES;
      case 'organization': return ORGANIZATION_PITCH_SLIDES;
      case 'commercial': return COMMERCIAL_PITCH_SLIDES;
      case 'project': return PROJECT_PITCH_SLIDES;
      default: return UNIFIED_PITCH_SLIDES;
    }
  };

  const activeDeck: PitchSlide[] = getActiveDeck();
  const currentSlide: PitchSlide = activeDeck[currentSlideIndex] || activeDeck[0];

  // Capítulos del Pitch Unificado con sus índices correspondientes
  const UNIFIED_CHAPTERS = [
    { label: 'Portada', slideIdx: 0, range: 'Slide 1' },
    { label: 'Índice', slideIdx: 1, range: 'Slide 2' },
    { label: '1. Diagnóstico & Tech', slideIdx: 2, range: 'Slides 3-4' },
    { label: '2. Mercado & Ventas', slideIdx: 4, range: 'Slides 5-7' },
    { label: '3. Gobernanza Dual', slideIdx: 7, range: 'Slides 8-9' },
    { label: '4. Cierre & Ask', slideIdx: 9, range: 'Slides 10-11' },
  ];

  // Helper para saber en qué capítulo está el slide actual
  const getCurrentChapterIndex = (): number => {
    if (deckType !== 'unified') return -1;
    if (currentSlideIndex === 0) return 0;
    if (currentSlideIndex === 1) return 1;
    if (currentSlideIndex <= 3) return 2;
    if (currentSlideIndex <= 6) return 3;
    if (currentSlideIndex <= 8) return 4;
    return 5;
  };

  const activeChapterIdx = getCurrentChapterIndex();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex, activeDeck]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentSlideIndex < activeDeck.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleJumpToSlide = (idx: number) => {
    setCurrentSlideIndex(Math.min(Math.max(idx, 0), activeDeck.length - 1));
  };

  const handleSwitchDeck = (newType: 'unified' | 'project' | 'market' | 'organization' | 'commercial') => {
    setDeckType(newType);
    setCurrentSlideIndex(0);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-between text-slate-900 transition-all animate-fadeIn ${
      isFullscreen ? 'p-0' : 'p-2 sm:p-5'
    }`}>
      
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 border-b border-emerald-200 rounded-2xl shadow-sm py-2 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-300 p-1 flex items-center justify-center shrink-0 shadow-sm">
            <img src="./logo-peumo-quantum.jpg" alt="AgroTech Chile Emblem" className="w-full h-full object-contain rounded-lg" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm text-[#0B2519] tracking-wide font-sans">
                URRUTIA AGROTECH
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 font-mono font-bold flex items-center gap-1">
                <Sun className="w-3 h-3 text-emerald-600" />
                <span>PITCH UNIFICADO</span>
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 font-mono">
              Slide {currentSlideIndex + 1} de {activeDeck.length} • {currentSlide.category}
            </p>
          </div>
        </div>

        {/* Central Chapter Selector / Jumper */}
        {deckType === 'unified' ? (
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-sans">
            {UNIFIED_CHAPTERS.map((chap, cIdx) => (
              <button
                key={chap.label}
                onClick={() => handleJumpToSlide(chap.slideIdx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all font-bold ${
                  activeChapterIdx === cIdx
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
                title={`Saltar a ${chap.label} (${chap.range})`}
              >
                <span>{chap.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSwitchDeck('unified')}
              className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold shadow-sm"
            >
              ← Volver al Pitch Unificado
            </button>
          </div>
        )}

        {/* Top Right Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
              showSpeakerNotes
                ? 'bg-emerald-800 text-white border-emerald-700 shadow-sm'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100'
            }`}
            title="Notas del orador"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-bold">Notas</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 hover:bg-slate-200 transition-colors"
            title="Pantalla Completa"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 hover:bg-rose-200 transition-colors"
            aria-label="Cerrar Pitch Deck"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage (Transformed Luminous High-Contrast Executive Theme) */}
      <div className="flex-1 flex flex-col justify-center items-center my-2 sm:my-4 px-2 overflow-y-auto">
        
        <div className="w-full max-w-6xl rounded-3xl border-2 border-emerald-500/20 bg-white/95 shadow-2xl shadow-emerald-950/15 p-5 sm:p-9 relative overflow-hidden flex flex-col justify-between min-h-[480px] sm:min-h-[540px]">
          
          {/* Subtle Ambient Light Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Top Metadata Header */}
          <div className="flex items-center justify-between font-mono text-xs border-b border-emerald-100 pb-3 mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-emerald-900 font-bold uppercase tracking-wider">
                {currentSlide.category}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {currentSlide.badge && (
                <span className="hidden sm:inline-block px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-bold">
                  {currentSlide.badge}
                </span>
              )}
              <span className="text-amber-700 font-extrabold font-mono">
                SLIDE {currentSlideIndex + 1} / {activeDeck.length}
              </span>
            </div>
          </div>

          {/* Main Slide Content Grid: Left Visual Image HUD + Right Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center flex-1 relative z-10 my-2">
            
            {/* Left Visual HUD Container (If Image Available) */}
            {currentSlide.image && (
              <div className="lg:col-span-5 relative group">
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-md bg-emerald-50/40">
                  <img 
                    src={currentSlide.image} 
                    alt={currentSlide.title}
                    className="w-full h-48 sm:h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  
                  {/* Badge Overlay */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-md text-amber-950 text-[11px] font-mono font-bold border border-amber-300 shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentSlide.badge || 'Agro-Precisión Maule'}</span>
                  </div>

                  {/* Telemetry Bar at Image Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-200 text-slate-800 shadow-sm font-bold">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                      <span>Red Telemetría LoRa</span>
                    </div>
                    <span className="text-amber-700 font-extrabold">Maule 2026</span>
                  </div>
                </div>
              </div>
            )}

            {/* Right Main Text & Data Column */}
            <div className={`${currentSlide.image ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
              
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2519] tracking-tight leading-tight">
                  {currentSlide.title}
                </h2>
                <p className="text-sm sm:text-base text-amber-800 font-serif font-extrabold">
                  {currentSlide.subtitle}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-sans font-medium shadow-sm">
                {currentSlide.content.headline}
              </div>

              {/* Bullet Points */}
              <div className="space-y-2 pt-1">
                {currentSlide.content.points.map((point, idx) => {
                  const isIndexSlide = deckType === 'unified' && currentSlideIndex === 1;
                  const chapterSlideTargets = [2, 4, 7, 9];
                  const targetSlide = chapterSlideTargets[idx];

                  return (
                    <div 
                      key={idx} 
                      onClick={() => {
                        if (isIndexSlide && targetSlide !== undefined) {
                          handleJumpToSlide(targetSlide);
                        }
                      }}
                      className={`flex items-start gap-2.5 text-xs sm:text-sm font-sans font-medium leading-relaxed transition-all ${
                        isIndexSlide 
                          ? 'p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-300/80 hover:bg-emerald-100/90 hover:border-emerald-500 cursor-pointer text-emerald-950 shadow-xs' 
                          : 'text-slate-700'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isIndexSlide ? 'text-emerald-700' : 'text-emerald-600'}`} />
                      <span className="flex-1">{point}</span>
                      {isIndexSlide && (
                        <span className="text-[10px] font-mono font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-md border border-emerald-300 shrink-0 flex items-center gap-1">
                          <span>Ir al Capítulo</span>
                          <ArrowRight className="w-3 h-3 text-emerald-600" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Key Metrics Grid if present */}
              {currentSlide.content.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  {currentSlide.content.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-emerald-200 font-mono shadow-sm">
                      <span className="text-[10px] text-emerald-800 block uppercase tracking-wider font-bold">{m.label}</span>
                      <span className="text-[#0B2519] font-extrabold text-sm sm:text-base block">{m.value}</span>
                      <span className="text-[10px] text-amber-700 font-sans font-bold block mt-0.5">{m.detail}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlight Box if present */}
              {currentSlide.content.highlightBox && (
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-300 text-xs space-y-1 shadow-sm">
                  <span className="font-bold text-amber-900 uppercase font-mono block text-[11px]">
                    💡 {currentSlide.content.highlightBox.title}
                  </span>
                  <p className="text-slate-800 font-serif leading-relaxed">
                    {currentSlide.content.highlightBox.text}
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* Slide Footer Branding */}
          <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px] font-mono text-emerald-900 relative z-10 mt-2 font-bold">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>AgroTech Chile • Región del Maule, Chile</span>
            </span>
            <span className="text-amber-800 font-extrabold">contacto@urrutia.ag</span>
          </div>

        </div>

        {/* Speaker Notes Expandable Drawer */}
        {showSpeakerNotes && (
          <div className="w-full max-w-6xl mt-3 p-4 rounded-2xl bg-amber-50 border border-amber-300 font-mono text-xs text-amber-950 flex items-start gap-3 shadow-md animate-fadeIn">
            <MessageSquare className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-amber-900 font-bold uppercase text-[10px] block">NOTAS DEL ORADOR:</span>
              <p className="text-slate-800 font-sans leading-relaxed">{currentSlide.speakerNotes}</p>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Controls Bar & Thumbnails (Luminous Clean Design) */}
      <div className="bg-white/95 border-t border-emerald-200 rounded-2xl p-3 max-w-6xl mx-auto w-full space-y-3 shadow-sm">
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 transition-all duration-300 shadow-sm"
            style={{ width: `${((currentSlideIndex + 1) / activeDeck.length) * 100}%` }}
          />
        </div>

        {/* Navigation & Thumbnail Buttons */}
        <div className="flex items-center justify-between gap-2">
          
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Slide Thumbnails Quick Jump Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-lg px-2 py-1">
            {activeDeck.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                title={`Ir a Slide ${slide.id}: ${slide.title}`}
                className={`w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
                  idx === currentSlideIndex
                    ? 'bg-amber-500 text-[#0B2519] ring-2 ring-amber-400 shadow-md scale-105'
                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100'
                }`}
              >
                {slide.id}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === activeDeck.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] font-extrabold text-xs font-mono disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all shadow-md"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
};
