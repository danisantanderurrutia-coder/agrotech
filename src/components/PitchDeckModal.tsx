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
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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

  // Capítulos del Pitch Unificado (28 slides) con sus índices correspondientes
  const UNIFIED_CHAPTERS = [
    { label: 'Portada', slideIdx: 0, range: 'Slide 1' },
    { label: '¿Quiénes Somos?', slideIdx: 1, range: 'Slide 2' },
    { label: 'Índice', slideIdx: 2, range: 'Slide 3' },
    { label: '1. Visión & Diagnóstico', slideIdx: 3, range: 'Slides 4-6' },
    { label: '2. Ecosistema & Exp.', slideIdx: 6, range: 'Slides 7-15' },
    { label: '3. Datos & Negocio', slideIdx: 15, range: 'Slides 16-21' },
    { label: '4. Org & Era IA', slideIdx: 21, range: 'Slides 22-26' },
    { label: '5. Escala & Ask', slideIdx: 26, range: 'Slides 27-28' },
  ];

  // Helper para saber en qué capítulo está el slide actual
  const getCurrentChapterIndex = (): number => {
    if (deckType !== 'unified') return -1;
    if (currentSlideIndex === 0) return 0;
    if (currentSlideIndex === 1) return 1;
    if (currentSlideIndex === 2) return 2;
    if (currentSlideIndex <= 5) return 3;
    if (currentSlideIndex <= 14) return 4;
    if (currentSlideIndex <= 20) return 5;
    if (currentSlideIndex <= 25) return 6;
    return 7;
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
      <div className="flex-1 min-h-0 flex flex-col justify-center items-center my-1 sm:my-2 px-1 sm:px-2 overflow-y-auto">
        
        <div className="w-full max-w-6xl max-h-full rounded-2xl sm:rounded-3xl border-2 border-emerald-500/20 bg-white/95 shadow-2xl shadow-emerald-950/15 p-4 sm:p-6 lg:p-7 relative overflow-hidden flex flex-col justify-between">
          
          {/* Subtle Ambient Light Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Top Metadata Header */}
          <div className="flex items-center justify-between font-mono text-xs border-b border-emerald-100 pb-2 mb-2 sm:mb-3 relative z-10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-emerald-900 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                {currentSlide.category}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {currentSlide.badge && (
                <span className="hidden sm:inline-block px-3 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-[10px] font-bold">
                  {currentSlide.badge}
                </span>
              )}
              <span className="text-amber-700 font-extrabold font-mono text-[11px] sm:text-xs">
                SLIDE {currentSlideIndex + 1} / {activeDeck.length}
              </span>
            </div>
          </div>

          {/* Main Slide Content Grid: Left Visual Image HUD + Right Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center flex-1 min-h-0 relative z-10 overflow-y-auto pr-1">
            
            {/* Left Visual HUD Container (If Image Available) */}
            {currentSlide.image && (
              <div className="lg:col-span-5 relative group shrink-0">
                <div 
                  onClick={() => setZoomedImage(currentSlide.image || null)}
                  className="relative rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-md bg-emerald-50/40 cursor-zoom-in group"
                  title="Haz clic para agrandar la imagen"
                >
                  <img 
                    src={currentSlide.image} 
                    alt={currentSlide.title}
                    className="w-full h-36 sm:h-48 md:h-56 lg:h-60 max-h-[32vh] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Badge Overlay */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-white/95 backdrop-blur-md text-amber-950 text-[10px] sm:text-[11px] font-mono font-bold border border-amber-300 shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentSlide.badge || 'Agro-Precisión Maule'}</span>
                  </div>

                  {/* Zoom In Button Hint */}
                  <div className="absolute top-2.5 right-2.5 p-1 sm:p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/30 opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-mono font-bold">
                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Agrandar</span>
                  </div>

                  {/* Telemetry Bar at Image Bottom */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-emerald-200 text-slate-800 shadow-sm font-bold">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 animate-pulse" />
                      <span>Red Telemetría LoRa</span>
                    </div>
                    <span className="text-amber-700 font-extrabold">Maule 2026</span>
                  </div>
                </div>
              </div>
            )}

            {/* Right Main Text & Data Column */}
            <div className={`${currentSlide.image ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-2.5 sm:space-y-3.5`}>
              
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B2519] tracking-tight leading-tight">
                  {currentSlide.title}
                </h2>
                <p className="text-xs sm:text-sm lg:text-base text-amber-800 font-serif font-extrabold">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Headline / Manifesto Quote */}
              {currentSlide.badge === 'MANIFIESTO' || currentSlide.content.points.length === 0 ? (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-900 to-[#0B2519] border-2 border-emerald-600/40 text-amber-100 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />
                  <span className="text-amber-400 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest block mb-1">
                    DECLARACIÓN FUNDACIONAL
                  </span>
                  <blockquote className="text-sm sm:text-base lg:text-lg font-serif font-extrabold leading-snug tracking-tight text-white drop-shadow-sm">
                    "{currentSlide.content.headline}"
                  </blockquote>
                </div>
              ) : (
                <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-sans font-medium shadow-sm leading-snug">
                  {currentSlide.content.headline}
                </div>
              )}

              {/* Bullet Points */}
              {currentSlide.content.points.length > 0 && (
                <div className="space-y-1.5 sm:space-y-2 pt-0.5">
                  {currentSlide.content.points.map((point, idx) => {
                    const isIndexSlide = deckType === 'unified' && currentSlideIndex === 2;
                    const chapterSlideTargets = [0, 1, 3, 6, 15, 21, 26];
                    const targetSlide = chapterSlideTargets[idx];

                    return (
                      <div 
                        key={idx} 
                        onClick={() => {
                          if (isIndexSlide && targetSlide !== undefined) {
                            handleJumpToSlide(targetSlide);
                          }
                        }}
                        className={`flex items-start gap-2 text-xs sm:text-sm font-sans font-medium leading-relaxed transition-all ${
                          isIndexSlide 
                            ? 'p-2 rounded-xl bg-emerald-50/80 border border-emerald-300/80 hover:bg-emerald-100/90 hover:border-emerald-500 cursor-pointer text-emerald-950 shadow-xs' 
                            : 'text-slate-700'
                        }`}
                      >
                        <CheckCircle2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${isIndexSlide ? 'text-emerald-700' : 'text-emerald-600'}`} />
                        <span className="flex-1">{point}</span>
                        {isIndexSlide && (
                          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-emerald-300 shrink-0 flex items-center gap-1">
                            <span>Ir al Capítulo</span>
                            <ArrowRight className="w-3 h-3 text-emerald-600" />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Key Metrics Grid if present */}
              {currentSlide.content.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {currentSlide.content.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-emerald-200 font-mono shadow-sm">
                      <span className="text-[9px] sm:text-[10px] text-emerald-800 block uppercase tracking-wider font-bold">{m.label}</span>
                      <span className="text-[#0B2519] font-extrabold text-xs sm:text-sm lg:text-base block">{m.value}</span>
                      <span className="text-[9px] sm:text-[10px] text-amber-700 font-sans font-bold block mt-0.5">{m.detail}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlight Box if present */}
              {currentSlide.content.highlightBox && (
                <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-300 text-xs space-y-1 shadow-sm">
                  <span className="font-bold text-amber-900 uppercase font-mono block text-[10px] sm:text-[11px]">
                    💡 {currentSlide.content.highlightBox.title}
                  </span>
                  <p className="text-slate-800 font-serif leading-relaxed text-[11px] sm:text-xs">
                    {currentSlide.content.highlightBox.text}
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* Slide Footer Branding */}
          <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-emerald-900 relative z-10 mt-2 font-bold shrink-0">
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
      <div className="bg-white/95 border-t border-emerald-200 rounded-2xl p-2 sm:p-2.5 max-w-6xl mx-auto w-full space-y-2 shadow-sm shrink-0">
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 sm:h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
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
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 transition-all shadow-sm shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          {/* Slide Thumbnails Quick Jump Bar */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-lg px-1 sm:px-2 py-0.5">
            {activeDeck.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlideIndex(idx)}
                title={`Ir a Slide ${slide.id}: ${slide.title}`}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all shrink-0 ${
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
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] font-extrabold text-xs font-mono disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all shadow-md shrink-0"
          >
            <span className="hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* Lightbox Modal for Zoomed Image */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            {/* Top Close bar */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                {currentSlide.title} • Vista Ampliada
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedImage(null);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-mono text-xs flex items-center gap-1.5 transition-colors border border-white/20"
              >
                <X className="w-4 h-4" />
                <span>Cerrar (Esc)</span>
              </button>
            </div>

            {/* Large Image */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative rounded-2xl overflow-hidden border-2 border-emerald-400/50 shadow-2xl bg-black/50 max-h-[80vh] flex items-center justify-center"
            >
              <img 
                src={zoomedImage} 
                alt={currentSlide.title} 
                className="max-h-[78vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

