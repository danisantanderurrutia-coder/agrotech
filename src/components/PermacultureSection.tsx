import React, { useState, useMemo } from 'react';
import { 
  Trees, Layers, CheckCircle2, ChevronRight, Compass, Eye, Sun, 
  Droplets, Wind, Mountain, Shield, Zap, Sparkles, Sliders, 
  MapPin, Check, ExternalLink, HelpCircle, ArrowRight, Heart,
  Cpu, Radio, FileText, BarChart2, BookOpen, Clock, Activity,
  Maximize2, RefreshCw, Feather
} from 'lucide-react';
import { 
  PERMACULTURE_18_POINTS, 
  PERMACULTURE_ETHICS, 
  PERMACULTURE_12_PRINCIPLES, 
  PERMACULTURE_ZONES, 
  SCALE_OF_PERMANENCE_LAYERS, 
  FOOD_FOREST_STRATA,
  AGROTECH_CURRENT_INFRASTRUCTURE,
  PermaculturePoint 
} from '../data/permacultureData';

interface PermacultureSectionProps {
  onNavigate?: (viewId: string) => void;
}

export const PermacultureSection: React.FC<PermacultureSectionProps> = ({ onNavigate }) => {
  // Main sub-tabs inside Permaculture Section
  const [activeSubTab, setActiveSubTab] = useState<'18-points' | 'ethics' | 'principles' | 'zones' | 'permanence' | 'food-forest' | 'infrastructure'>('18-points');
  
  // 18 Points State
  const [selectedPointId, setSelectedPointId] = useState<number>(1);
  const [faseFilter, setFaseFilter] = useState<number | 'all'>('all');
  const [branchFilter, setBranchFilter] = useState<'all' | 'digital' | 'tecnica' | 'social'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Point Object
  const selectedPoint = useMemo(() => {
    return PERMACULTURE_18_POINTS.find(p => p.id === selectedPointId) || PERMACULTURE_18_POINTS[0];
  }, [selectedPointId]);

  // Filtered Points List
  const filteredPoints = useMemo(() => {
    return PERMACULTURE_18_POINTS.filter(p => {
      const matchFase = faseFilter === 'all' || p.faseId === faseFilter;
      const matchBranch = branchFilter === 'all' || p.branch === branchFilter || p.branch === 'transversal';
      const matchSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fullDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.agroTechTool.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFase && matchBranch && matchSearch;
    });
  }, [faseFilter, branchFilter, searchQuery]);

  // Zones State
  const [selectedZone, setSelectedZone] = useState<number>(0);
  const currentZone = useMemo(() => {
    return PERMACULTURE_ZONES.find(z => z.zone === selectedZone) || PERMACULTURE_ZONES[0];
  }, [selectedZone]);

  // Permanence Scale Active Rank
  const [selectedLayerRank, setSelectedLayerRank] = useState<number>(1);
  const currentLayer = useMemo(() => {
    return SCALE_OF_PERMANENCE_LAYERS.find(l => l.rank === selectedLayerRank) || SCALE_OF_PERMANENCE_LAYERS[0];
  }, [selectedLayerRank]);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Banner: Permaculture Framework & Foundations */}
      <div className="bg-[#0B2519] p-6 sm:p-10 rounded-3xl border border-emerald-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
            <Trees className="w-3.5 h-3.5 text-amber-400" />
            <span>Base Filosófica & Metodológica • Asesoría Julio Pérez (Urrutia Edulab)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Permacultura & <span className="text-amber-400">Diseño Regenerativo</span>
          </h2>

          <p className="text-slate-200 text-xs sm:text-sm font-serif max-w-3xl leading-relaxed">
            La permacultura es la raíz que nutre el modelo del <strong>Árbol Pirámide de AgroTech</strong>. 
            Aquí puedes explorar detalladamente los <strong>18 puntos para construir un Plan Maestro</strong>, 
            estudiar cómo se articulan con nuestras 3 ramas operativas (Digital, Técnica y Social), y consultar 
            las éticas, los 12 principios de Holmgren, la zonificación energética y la escala de permanencia.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-400 block text-[10px] font-bold">PLAN MAESTRO</span>
              <span className="text-white text-lg font-extrabold">18 Puntos</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-amber-400 block text-[10px] font-bold">ÉTICAS & PRINCIPIOS</span>
              <span className="text-white text-lg font-extrabold">3 Éticas + 12 Principios</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-blue-300 block text-[10px] font-bold">ZONIFICACIÓN</span>
              <span className="text-white text-lg font-extrabold">Zonas 0 a 5</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-rose-300 block text-[10px] font-bold">PERMANENCIA</span>
              <span className="text-white text-lg font-extrabold">10 Capas (Regrarians)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Permaculture Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('18-points')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeSubTab === '18-points'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>1. Los 18 Puntos del Plan Maestro</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ethics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'ethics'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-400" />
          <span>2. Las 3 Éticas Fundamentales</span>
        </button>

        <button
          onClick={() => setActiveSubTab('principles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'principles'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>3. Los 12 Principios (Holmgren)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('zones')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'zones'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>4. Zonificación (Zonas 0 a 5)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('permanence')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'permanence'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Mountain className="w-4 h-4 text-blue-400" />
          <span>5. Escala de Permanencia (Yeomans)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('food-forest')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'food-forest'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Trees className="w-4 h-4 text-emerald-400" />
          <span>6. Bosque de Alimentos (7 Estratos)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('infrastructure')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeSubTab === 'infrastructure'
              ? 'bg-[#0B2519] text-white shadow-md ring-2 ring-emerald-400/50'
              : 'bg-emerald-50 text-emerald-950 border border-emerald-300 hover:bg-emerald-100 font-extrabold'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>7. Infraestructura Viva Meniel (2026)</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* SUB-TAB 1: LOS 18 PUNTOS DEL PLAN MAESTRO                    */}
      {/* ============================================================ */}
      {activeSubTab === '18-points' && (
        <div className="space-y-6">
          
          {/* Controls: Search & Filters by Fase and Branch */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Buscar entre los 18 puntos por nombre, concepto o herramienta..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all font-sans"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Branch Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-sans">
                <span className="text-[11px] font-mono text-slate-400 mr-1 shrink-0">Rama AgroTech:</span>
                <button
                  onClick={() => setBranchFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                    branchFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setBranchFilter('digital')}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                    branchFilter === 'digital'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>💻 Digital</span>
                </button>
                <button
                  onClick={() => setBranchFilter('tecnica')}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                    branchFilter === 'tecnica'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>⚙️ Técnica</span>
                </button>
                <button
                  onClick={() => setBranchFilter('social')}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                    branchFilter === 'social'
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  <Trees className="w-3.5 h-3.5" />
                  <span>🌿 Social</span>
                </button>
              </div>
            </div>

            {/* Fase Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 text-xs font-sans">
              <span className="text-[11px] font-mono text-slate-400 mr-2 shrink-0">Fase del Diseño:</span>
              <button
                onClick={() => setFaseFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                  faseFilter === 'all'
                    ? 'bg-emerald-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todas las Fases (18)
              </button>
              {[
                { id: 1, label: "Fase 1: Diagnóstico Base (1-6)" },
                { id: 2, label: "Fase 2: Flujos y Sectores (7-8)" },
                { id: 3, label: "Fase 3: Infraestructura (9-12)" },
                { id: 4, label: "Fase 4: Sistemas Biológicos (13-16)" },
                { id: 5, label: "Fase 5: Fases y Economía (17-18)" }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFaseFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                    faseFilter === f.id
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Master 2-Column Layout: Points Navigation List + Detailed Inspector Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Interactive Selector List */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[850px] overflow-y-auto pr-1">
              <div className="text-xs font-mono text-slate-400 px-1 flex justify-between items-center">
                <span>Puntos encontrados: {filteredPoints.length}</span>
                <span>Haz clic para inspeccionar</span>
              </div>

              {filteredPoints.map((point) => {
                const isSelected = point.id === selectedPoint.id;
                return (
                  <button
                    key={point.id}
                    onClick={() => setSelectedPointId(point.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#0B2519] border-emerald-500 text-white shadow-lg ring-2 ring-emerald-500/30'
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-lg text-xs font-mono font-extrabold flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {point.id}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold truncate ${
                          point.branch === 'digital'
                            ? (isSelected ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-700')
                            : point.branch === 'tecnica'
                            ? (isSelected ? 'bg-amber-900 text-amber-200' : 'bg-amber-50 text-amber-700')
                            : point.branch === 'social'
                            ? (isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-50 text-emerald-700')
                            : (isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600')
                        }`}>
                          {point.branch === 'digital' ? '💻 Digital' : point.branch === 'tecnica' ? '⚙️ Técnica' : point.branch === 'social' ? '🌿 Social' : '🌲 Transversal'}
                        </span>
                        {point.permanenceRank && (
                          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-500'
                          }`}>
                            Permanencia #{point.permanenceRank}
                          </span>
                        )}
                      </div>

                      <h4 className={`text-xs sm:text-sm font-extrabold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {point.title}
                      </h4>
                      <p className={`text-[11px] font-serif line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {point.tagline}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Deep Dive Point Inspector Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 sticky top-20">
              
              {/* Header of Selected Point */}
              <div className="space-y-3 border-b border-slate-100 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 text-base font-extrabold flex items-center justify-center font-mono shadow-sm">
                      {selectedPoint.id}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        {selectedPoint.faseName}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2519]">
                        {selectedPoint.title}
                      </h3>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    selectedPoint.branch === 'digital'
                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                      : selectedPoint.branch === 'tecnica'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : selectedPoint.branch === 'social'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-800 border border-slate-200'
                  }`}>
                    {selectedPoint.branchLabel}
                  </span>
                </div>

                <p className="text-sm font-serif italic text-emerald-800">
                  "{selectedPoint.tagline}"
                </p>

                <p className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed">
                  {selectedPoint.fullDescription}
                </p>
              </div>

              {/* Guiding Questions Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-sans">
                  <HelpCircle className="w-4 h-4 text-emerald-700" />
                  <span>Preguntas Guía para el Diagnóstico del Predio</span>
                </div>
                <div className="space-y-2">
                  {selectedPoint.keyQuestions.map((q, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-serif">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tangible Deliverables Card */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-sans">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Entregables Tangibles del Plan Maestro</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPoint.deliverables.map((deliv, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-sans text-slate-800 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integration with the 3 AgroTech Branches Card */}
              <div className={`rounded-2xl p-5 border space-y-3 ${
                selectedPoint.branch === 'digital'
                  ? 'bg-blue-50/70 border-blue-200 text-blue-950'
                  : selectedPoint.branch === 'tecnica'
                  ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                  : selectedPoint.branch === 'social'
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold font-sans">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Integración en la App AgroTech (Viabilidad)</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/80">
                    {selectedPoint.agroTechTool.split('•')[0] || selectedPoint.branch}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs font-serif">
                  <p className="font-bold font-sans text-slate-900">
                    Herramienta asociada: <span className="font-normal">{selectedPoint.agroTechTool}</span>
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedPoint.branchViabilityNote}
                  </p>
                </div>
              </div>

              {/* Navigation buttons: Previous / Next */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-sans">
                <button
                  onClick={() => setSelectedPointId(prev => Math.max(1, prev - 1))}
                  disabled={selectedPoint.id === 1}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-all font-bold text-slate-700"
                >
                  ← Punto Anterior ({Math.max(1, selectedPoint.id - 1)})
                </button>
                <span className="text-slate-400 font-mono text-[11px]">
                  Punto {selectedPoint.id} de 18
                </span>
                <button
                  onClick={() => setSelectedPointId(prev => Math.min(18, prev + 1))}
                  disabled={selectedPoint.id === 18}
                  className="px-4 py-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-700 disabled:opacity-30 disabled:pointer-events-none transition-all font-bold shadow-sm"
                >
                  Siguiente Punto ({Math.min(18, selectedPoint.id + 1)}) →
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 2: LAS 3 ÉTICAS FUNDAMENTALES                         */}
      {/* ============================================================ */}
      {activeSubTab === 'ethics' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2519]">
              Las 3 Éticas Fundamentales de la Permacultura
            </h3>
            <p className="text-xs sm:text-sm font-serif text-slate-600 leading-relaxed max-w-3xl">
              Propuestas por Bill Mollison y David Holmgren, no son normas punitivas sino un compás moral universal. 
              Cualquier decisión de diseño (sea técnica, agronómica o de software) debe pasar la prueba de estas tres éticas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PERMACULTURE_ETHICS.map((ethic, idx) => (
              <div 
                key={ethic.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative overflow-hidden"
              >
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 font-mono font-extrabold text-sm flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <Heart className="w-4 h-4 text-rose-500" />
                  </div>

                  <h4 className="text-lg font-extrabold text-slate-900">
                    {ethic.title}
                  </h4>
                  <p className="text-xs font-mono text-emerald-700 font-bold">
                    {ethic.subtitle}
                  </p>
                  <p className="text-xs font-serif text-slate-600 leading-relaxed">
                    {ethic.essence}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold font-sans text-slate-900">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Aplicación en AgroTech</span>
                  </div>
                  <p className="text-[11px] font-serif text-slate-600 leading-relaxed">
                    {ethic.agroTechManifesto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 3: LOS 12 PRINCIPIOS DE HOLMGREN                      */}
      {/* ============================================================ */}
      {activeSubTab === 'principles' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2519]">
              Los 12 Principios de Diseño de David Holmgren
            </h3>
            <p className="text-xs sm:text-sm font-serif text-slate-600 leading-relaxed max-w-3xl">
              Publicados en su obra cumbre <em>"Permacultura: Principios y senderos más allá de la sustentabilidad"</em>, 
              estos principios actúan como guías heurísticas de pensamiento sistémico para diseñar cualquier paisaje o tecnología.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERMACULTURE_12_PRINCIPLES.map((pr) => (
              <div 
                key={pr.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-950 font-mono font-extrabold text-sm flex items-center justify-center">
                      #{pr.id}
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900">
                    {pr.title}
                  </h4>
                  <p className="text-xs font-serif italic text-emerald-800">
                    "{pr.proverb}"
                  </p>
                  <p className="text-xs font-serif text-slate-600 leading-relaxed">
                    {pr.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-[10px] font-mono text-slate-500 block uppercase">Ejemplo Práctico en Campo</span>
                    <p className="text-[11px] font-serif text-slate-700 mt-1">
                      {pr.practicalExample}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                    <span className="font-bold text-[10px] font-mono text-emerald-800 block uppercase">Conexión con AgroTech</span>
                    <p className="text-[11px] font-serif text-emerald-950 mt-1">
                      {pr.agroTechApplication}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 4: ZONIFICACIÓN PERMACULTURAL (0 A 5)                 */}
      {/* ============================================================ */}
      {activeSubTab === 'zones' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2519]">
              Zonificación Energética Permacultural (Zonas 0 a 5)
            </h3>
            <p className="text-xs sm:text-sm font-serif text-slate-600 leading-relaxed max-w-3xl">
              La zonificación es una herramienta de ordenamiento espacial que optimiza la energía humana y mecánica. 
              Los elementos que demandan mayor atención y visitas diarias se ubican cerca del centro de control (Zona 0), 
              mientras que los sistemas autónomos o de conservación se sitúan en la periferia (Zonas 4 y 5).
            </p>

            {/* Zone Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2 font-mono text-xs">
              {PERMACULTURE_ZONES.map((z) => (
                <button
                  key={z.zone}
                  onClick={() => setSelectedZone(z.zone)}
                  className={`p-3 rounded-2xl border text-center transition-all font-bold ${
                    selectedZone === z.zone
                      ? 'bg-[#0B2519] border-emerald-500 text-white shadow-md ring-2 ring-emerald-400/40'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-base font-extrabold font-mono text-amber-400">
                    Zona {z.zone}
                  </span>
                  <span className="text-[10px] font-sans truncate block mt-0.5">
                    {z.name.split(':')[1]?.trim() || z.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Zone Detail Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider block">
                  Perfil de Zonificación
                </span>
                <h4 className="text-2xl font-extrabold text-[#0B2519]">
                  {currentZone.name}
                </h4>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700">
                  <span className="text-slate-400 block text-[9px]">FRECUENCIA VISITAS</span>
                  <span className="font-bold">{currentZone.frequency}</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <span className="text-emerald-500 block text-[9px]">ESFUERZO HUMANO</span>
                  <span className="font-bold">{currentZone.humanEffort}</span>
                </div>
              </div>
            </div>

            <p className="text-sm font-serif text-slate-700 leading-relaxed">
              {currentZone.description}
            </p>

            {/* Elements list & Tech Integration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h5 className="text-xs font-bold font-sans text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Elementos Típicos en esta Zona</span>
                </h5>
                <div className="space-y-2">
                  {currentZone.elements.map((el, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{el}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-bold font-sans text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>Arquitectura de Telemetría AgroTech</span>
                </h5>
                <div className="p-5 rounded-2xl bg-[#0B2519] text-white border border-emerald-500/30 space-y-3">
                  <p className="text-xs font-serif text-slate-200 leading-relaxed">
                    {currentZone.techIntegration}
                  </p>
                  <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-emerald-300">
                    Nivel de Conectividad: {currentZone.zone <= 2 ? 'Alta Frecuencia (WiFi / BLE / MQTT)' : 'Largo Alcance Ultra Bajo Consumo (LoRaWAN / Satélite)'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 5: ESCALA DE PERMANENCIA (YEOMANS & REGRARIANS)       */}
      {/* ============================================================ */}
      {activeSubTab === 'permanence' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2519]">
              La Escala de Permanencia de P.A. Yeomans & Regrarians (10 Capas)
            </h3>
            <p className="text-xs sm:text-sm font-serif text-slate-600 leading-relaxed max-w-3xl">
              Formulada originalmente por P.A. Yeomans (creador del Keyline) y expandida a 10 capas por Darren Doherty (Regrarians Platform), 
              establece el <strong>orden inquebrantable de prioridades</strong> en el diseño de un terreno: de lo más inalterable y permanente (el clima y la forma del relieve) 
              a lo más maleable y rápido de cambiar (el suelo y la energía).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Ladder List */}
            <div className="lg:col-span-5 space-y-2">
              {SCALE_OF_PERMANENCE_LAYERS.map((layer) => {
                const isSelected = layer.rank === currentLayer.rank;
                return (
                  <button
                    key={layer.rank}
                    onClick={() => setSelectedLayerRank(layer.rank)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#0B2519] border-emerald-500 text-white shadow-md ring-2 ring-emerald-500/30'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {layer.rank}
                      </span>
                      <div>
                        <h5 className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {layer.name}
                        </h5>
                        <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          Dificultad de cambio: {layer.easeOfChange}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Detail Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5 sticky top-20">
              <div className="border-b border-slate-100 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-600">
                    Capa #{currentLayer.rank} de la Escala
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
                    {currentLayer.easeOfChange}
                  </span>
                </div>
                <h4 className="text-2xl font-extrabold text-[#0B2519]">
                  {currentLayer.name}
                </h4>
                <p className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed">
                  {currentLayer.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 font-sans block">
                  Estrategia Permacultural en esta Capa:
                </span>
                <p className="text-xs font-serif text-slate-700 leading-relaxed">
                  {currentLayer.permacultureStrategy}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="text-xs font-bold text-emerald-950 font-sans block flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Solución Tecnológica AgroTech:</span>
                </span>
                <p className="text-xs font-serif text-emerald-900 leading-relaxed">
                  {currentLayer.agroTechSolution}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 6: BOSQUE DE ALIMENTOS (7 ESTRATOS)                   */}
      {/* ============================================================ */}
      {activeSubTab === 'food-forest' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2519]">
              Diseño de Bosques de Alimentos (Food Forest de 7 Estratos)
            </h3>
            <p className="text-xs sm:text-sm font-serif text-slate-600 leading-relaxed max-w-3xl">
              Un bosque de alimentos (agroforestería sintrópica o silvopastoril) imita la estratificación vertical de un bosque maduro. 
              En lugar de cultivar en un solo plano bidimensional, multiplica la superficie fotosintética aprovechando la luz, la sombra y el suelo en 7 dimensiones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOOD_FOREST_STRATA.map((stratum) => (
              <div
                key={stratum.layer}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 font-mono font-extrabold text-sm flex items-center justify-center">
                      E{stratum.layer}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                      {stratum.height}
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-slate-900">
                    {stratum.name}
                  </h4>
                  <p className="text-xs font-serif text-slate-600 leading-relaxed">
                    {stratum.role}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-[10px] font-mono text-slate-500 block uppercase">Especies Modelo en el Maule</span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {stratum.maulinoExamples.map((ex, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-sans font-medium text-slate-700">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                    <span className="font-bold text-[10px] font-mono text-emerald-800 block uppercase">Función Ecológica</span>
                    <p className="text-[11px] font-serif text-emerald-950 mt-1">
                      {stratum.ecologicalFunction}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-TAB 7: INFRAESTRUCTURA VIVA ACTUAL (FUNDO MENIEL 2026)   */}
      {/* ============================================================ */}
      {activeSubTab === 'infrastructure' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header Banner */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                  Infraestructura Actual • Versión {AGROTECH_CURRENT_INFRASTRUCTURE.version}
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-[#0B2519]">
                  {AGROTECH_CURRENT_INFRASTRUCTURE.pilotFarm.name}
                </h3>
                <p className="text-xs text-slate-500 font-serif mt-1">
                  {AGROTECH_CURRENT_INFRASTRUCTURE.pilotFarm.region} • {AGROTECH_CURRENT_INFRASTRUCTURE.pilotFarm.totalHectares} ha • Score Suelo Vivo: {AGROTECH_CURRENT_INFRASTRUCTURE.pilotFarm.soilHealthScore}/100
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="http://localhost:7777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-sans text-xs font-extrabold shadow-md transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir Hub Unificado</span>
                </a>
                <a
                  href="http://localhost:7773"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-sans text-xs font-bold shadow-md transition-all"
                >
                  <Cpu className="w-4 h-4 text-emerald-300" />
                  <span>AgriTwin 3D en Vivo</span>
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-serif text-slate-600 leading-relaxed max-w-3xl">
              Esta sección mapea cómo la permacultura no se queda en teoría: se encuentra 100% implementada en la infraestructura 
              técnica y biológica actual de AgroTech, integrando la arquitectura de servicios interconectados, las 6 salas del Hub Master, 
              los 8 potreros de Pastoreo Racional Voisin (PRV), el censo animal SAG y las obras hidráulicas y agrovoltaicas.
            </p>
          </div>

          {/* 1. Orquestador de Servicios */}
          <div className="space-y-4">
            <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>1. Arquitectura del Orquestador de Servicios (Módulos Conectados)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {AGROTECH_CURRENT_INFRASTRUCTURE.orchestratorPorts.map((srv) => (
                <div key={srv.port} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold px-2 py-0.5 rounded bg-[#0B2519] text-amber-400">
                      Módulo • {srv.name}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <h5 className="font-extrabold text-sm text-slate-900">{srv.name}</h5>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">{srv.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Las 6 Salas Operativas del Hub Unificado */}
          <div className="space-y-4">
            <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>2. Las 6 Salas de Operación en el Hub Unificado</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {AGROTECH_CURRENT_INFRASTRUCTURE.hubModules.map((mod) => (
                <div key={mod.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                        {mod.permacultureZone}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">
                        {mod.name}
                      </span>
                    </div>
                    <h5 className="font-extrabold text-base text-slate-900">{mod.name}</h5>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed">{mod.summary}</p>
                  </div>

                  <a
                    href={`http://localhost:${mod.port}/${mod.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-sans font-bold border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Abrir en :{mod.port} {mod.hash}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Pastoreo Racional Voisin (PRV) - 8 Potreros */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>3. Manejo Holístico & Pastoreo Racional Voisin (8 Potreros P1 a P8)</span>
              </h4>
              <span className="text-xs font-mono text-slate-500">
                Rotación diaria con control de descanso para regeneración del suelo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {AGROTECH_CURRENT_INFRASTRUCTURE.paddocksPRV.map((pad) => (
                <div 
                  key={pad.id}
                  className={`p-4 rounded-2xl border transition-all space-y-2 ${
                    pad.status === 'active'
                      ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/40'
                      : pad.status === 'ready'
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : pad.status === 'coop'
                      ? 'bg-yellow-50/70 border-yellow-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm text-[#0B2519]">{pad.id}</span>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                      pad.status === 'active' ? 'bg-amber-600 text-white animate-pulse' :
                      pad.status === 'ready' ? 'bg-emerald-700 text-white' :
                      pad.status === 'coop' ? 'bg-yellow-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {pad.status === 'active' ? 'En Pastoreo' : pad.status === 'ready' ? 'Listo (Óptimo)' : pad.status === 'coop' ? 'Egg Mobile' : 'En Reposo'}
                    </span>
                  </div>
                  <h6 className="text-xs font-bold text-slate-900 truncate">{pad.name}</h6>
                  
                  <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] font-mono text-center">
                    <div className="p-1.5 rounded-lg bg-white/80 border border-slate-200">
                      <span className="text-slate-400 block text-[8px]">REPOSO</span>
                      <span className="font-extrabold text-slate-800">{pad.restDays} d</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/80 border border-slate-200">
                      <span className="text-slate-400 block text-[8px]">ALTURA</span>
                      <span className="font-extrabold text-slate-800">{pad.forrajeCm} cm</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/80 border border-slate-200">
                      <span className="text-slate-400 block text-[8px]">BIOMASA</span>
                      <span className="font-extrabold text-emerald-800">{pad.kgMsHa}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Censo Animal & Flota Egg Mobile */}
          <div className="space-y-4">
            <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Trees className="w-4 h-4 text-amber-600" />
              <span>4. Censo Animal, Trazabilidad SAG RFID & Sanitización de Pasturas</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {AGROTECH_CURRENT_INFRASTRUCTURE.livestock.map((ani) => (
                <div key={ani.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B2519]">{ani.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                      {ani.rfid}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 font-bold">{ani.species}</p>
                  <p className="text-xs text-slate-600 font-serif">{ani.role}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Ubicación: <strong className="text-slate-800">{ani.location}</strong></span>
                    <span>Condición: <strong className="text-emerald-700">{ani.bcs}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Infraestructura Física & Clave */}
          <div className="space-y-4">
            <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-700" />
              <span>5. Obras Físicas & Activos Clave de Permacultura en Fundo Meniel</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AGROTECH_CURRENT_INFRASTRUCTURE.infrastructureAssets.map((asset) => (
                <div key={asset.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h6 className="font-extrabold text-sm text-slate-900">{asset.name}</h6>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
                      {asset.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">{asset.specs}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
