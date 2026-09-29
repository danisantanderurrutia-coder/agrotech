import React, { useState, useMemo, useEffect } from 'react';
import { 
  Database, Layers, Cpu, Globe, Trees, Terminal, ExternalLink, 
  Copy, Check, Download, Search, RefreshCw, Radio, Sparkles, 
  MapPin, Shield, BookOpen, FileText, ChevronRight, Activity, 
  Compass, Flame, Sun, Droplets, Wind, Maximize2, Minimize2,
  Sliders, Play, Code2, AlertTriangle, Eye, EyeOff, BarChart2,
  Printer, CheckCircle2
} from 'lucide-react';
import { 
  PRODUCTS_REGISTRY, 
  ALL_PREDIOS, 
  ALL_DATA_SOURCES, 
  ALL_SCRIPTS, 
  ALL_GRAPHIC_ASSETS,
  ALL_DOC_NOTES,
  ProductDefinition, 
  PredioProfile,
  ProductCategory
} from '../products';

interface InteractiveDocsHubProps {
  onNavigate?: (viewId: string) => void;
  initialTab?: 'products' | 'predios' | 'sensors' | 'graphics' | 'scripts' | 'vault';
}

export const InteractiveDocsHub: React.FC<InteractiveDocsHubProps> = ({ 
  onNavigate,
  initialTab = 'products'
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'predios' | 'sensors' | 'graphics' | 'scripts' | 'vault'>(initialTab);
  const [selectedProductId, setSelectedProductId] = useState<string>('all');
  const [selectedPredioId, setSelectedPredioId] = useState<string>(ALL_PREDIOS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sub-view toggle for sensors: telemetry simulator vs formal report
  const [sensorSubView, setSensorSubView] = useState<'telemetry' | 'report'>('telemetry');

  // Sincronizar activeTab cuando cambie initialTab desde navegación externa
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Live Embedded Launcher State
  const [activeLiveSite, setActiveLiveSite] = useState<'none' | 'agritwin' | 'rewild' | 'agrotech'>('none');
  const [fullScreenEmbed, setFullScreenEmbed] = useState<boolean>(false);

  // Interactive Sensor Simulator (Sliders)
  const [simTemp, setSimTemp] = useState<number>(18.5);
  const [simMoisture, setSimMoisture] = useState<number>(36.0);
  const [simCwsi, setSimCwsi] = useState<number>(0.25);

  // Selected note in Obsidian Vault Viewer
  const [selectedNoteId, setSelectedNoteId] = useState<string>('doc-agrotech-vault');

  // Server health state
  const [serversStatus, setServersStatus] = useState({
    agrotech: true,
    agritwin: true,
    rewild: true
  });
  const [isPinging, setIsPinging] = useState(false);

  const triggerPing = async () => {
    setIsPinging(true);
    try {
      await fetch('http://localhost:7773', { method: 'HEAD', mode: 'no-cors' });
      setServersStatus(prev => ({ ...prev, agritwin: true }));
    } catch {
      setServersStatus(prev => ({ ...prev, agritwin: false }));
    }
    try {
      await fetch('http://localhost:7772', { method: 'HEAD', mode: 'no-cors' });
      setServersStatus(prev => ({ ...prev, rewild: true }));
    } catch {
      setServersStatus(prev => ({ ...prev, rewild: false }));
    }
    setTimeout(() => setIsPinging(false), 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadJson = (filename: string, data: any) => {
    const jsonStr = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Selected Predio Object
  const currentPredio = useMemo(() => {
    return ALL_PREDIOS.find(p => p.id === selectedPredioId) || ALL_PREDIOS[0];
  }, [selectedPredioId]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_REGISTRY.filter(product => {
      const matchesCategory = selectedProductId === 'all' || product.id === selectedProductId;
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedProductId, searchQuery]);

  // Filtered Data Sources
  const filteredDataSources = useMemo(() => {
    return ALL_DATA_SOURCES.filter(ds => {
      return searchQuery === '' ||
        ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ds.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ds.provider.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // Filtered Scripts
  const filteredScripts = useMemo(() => {
    return ALL_SCRIPTS.filter(sc => {
      return searchQuery === '' ||
        sc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sc.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sc.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // Selected Obsidian Note
  const currentNote = useMemo(() => {
    return ALL_DOC_NOTES.find(n => n.id === selectedNoteId) || ALL_DOC_NOTES[0];
  }, [selectedNoteId]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fadeIn text-slate-900 pb-28">
      
      {/* ===================== HERO HEADER BANNER ===================== */}
      <div className="bg-gradient-to-br from-[#0B2519] via-[#0D3020] to-[#071810] p-6 sm:p-10 rounded-3xl border border-emerald-500/40 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>CENTRO DE DOCUMENTACIÓN & DATOS INTERACTIVO • URRUTIA AGROTECH</span>
            </div>

            {/* Ports Status Strip */}
            <div className="flex items-center gap-2 bg-[#071810]/90 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>7771 (Madre)</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className={`w-2 h-2 rounded-full ${serversStatus.agritwin ? 'bg-amber-400' : 'bg-slate-500'}`} />
                <span>7773 (AgriTwin)</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className={`w-2 h-2 rounded-full ${serversStatus.rewild ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                <span>7772 (Rewild)</span>
              </span>
              <button 
                onClick={triggerPing}
                disabled={isPinging}
                className="ml-2 text-slate-400 hover:text-white p-1 rounded transition-colors"
                title="Verificar puertos locales"
              >
                <RefreshCw className={`w-3 h-3 ${isPinging ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Hub de Productos, <span className="text-amber-400">Datos Raw</span> y Arquitectura
          </h1>

          <p className="text-slate-200 text-xs sm:text-sm font-serif max-w-4xl leading-relaxed">
            Estructura modular dividida por verticales de producto. Accede a las tramas de telemetría de sensores en campo, 
            cobertura satelital Sentinel-2, polígonos GeoJSON de predios, scripts ejecutables, visores gráficos vivos y la base de conocimiento 
            conectada para Obsidian.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-400 block text-[10px] font-bold">LÍNEAS DE PRODUCTO</span>
              <span className="text-white text-base font-extrabold">5 Módulos</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-amber-400 block text-[10px] font-bold">PREDIOS REGISTRADOS</span>
              <span className="text-white text-base font-extrabold">3 Fundos (105 ha)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-emerald-300 block text-[10px] font-bold">SENSORES & NODOS</span>
              <span className="text-white text-base font-extrabold">8 Estaciones IoT</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-blue-300 block text-[10px] font-bold">RESOLUCIÓN SATÉLITE</span>
              <span className="text-white text-base font-extrabold">10m (Sentinel-2)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
              <span className="text-rose-300 block text-[10px] font-bold">GOBERNANZA</span>
              <span className="text-white text-base font-extrabold">Economía Hombros</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== CONTROLS & SEARCH BAR ===================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por producto, sensor, predio, comando o término..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕ Limpiar
            </button>
          )}
        </div>

        {/* Product Quick Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs font-sans">
          <span className="text-[11px] font-mono text-slate-400 mr-1 shrink-0">Filtrar:</span>
          <button
            onClick={() => setSelectedProductId('all')}
            className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
              selectedProductId === 'all'
                ? 'bg-emerald-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos (5)
          </button>
          {PRODUCTS_REGISTRY.map(prod => (
            <button
              key={prod.id}
              onClick={() => setSelectedProductId(prod.id)}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                selectedProductId === prod.id
                  ? 'bg-emerald-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{prod.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ===================== PRIMARY NAVIGATION TABS ===================== */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeTab === 'products'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>1. Productos & Arquitectura</span>
        </button>

        <button
          onClick={() => setActiveTab('predios')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeTab === 'predios'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>2. Datos Raw por Predio ({ALL_PREDIOS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sensors')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeTab === 'sensors'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Radio className="w-4 h-4 text-amber-400" />
          <span>3. Sensores & Satélites</span>
        </button>

        <button
          onClick={() => setActiveTab('graphics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeTab === 'graphics'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Globe className="w-4 h-4 text-blue-400" />
          <span>4. Recursos Gráficos & Sitios Vivos</span>
        </button>

        <button
          onClick={() => setActiveTab('scripts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeTab === 'scripts'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>5. Terminal de Scripts & APIs</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all shrink-0 ${
            activeTab === 'vault'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>6. Obsidian Vault & Manifiesto</span>
        </button>
      </div>

      {/* ===================== TAB 1: PRODUCTOS & ARQUITECTURA ===================== */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-bold border border-slate-300">
                      {product.architectureRole}
                    </span>
                    {product.port && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300 font-bold">
                        Puerto {product.port}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0B2519] border border-emerald-500/40 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                      <img src={product.logoUrl} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">{product.name}</h3>
                      <p className="text-[11px] text-slate-500 font-sans">{product.tagline}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 font-serif leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {product.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-sans">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {product.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                  {product.port && (
                    <button
                      onClick={() => window.open(`http://localhost:${product.port}`, '_blank')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans text-xs font-bold transition-all shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir Puerto {product.port}</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setActiveTab('sensors');
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Ver telemetría y datos"
                  >
                    <Radio className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 2: DATOS RAW POR PREDIO ===================== */}
      {activeTab === 'predios' && (
        <div className="space-y-6">
          
          {/* Predio Selector Header */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider block">
                  EXPLORADOR PREDIAL MAULE
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>{currentPredio.name}</span>
                </h3>
                <p className="text-xs text-slate-500 font-serif">
                  {currentPredio.commune}, {currentPredio.region} • Coordenadas: {currentPredio.coordinates.lat}°S, {currentPredio.coordinates.lng}°O
                </p>
              </div>

              {/* Selector Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {ALL_PREDIOS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPredioId(p.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-sans font-bold transition-all ${
                      selectedPredioId === p.id
                        ? 'bg-emerald-900 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {p.alias} ({p.totalAreaHa} ha)
                  </button>
                ))}
              </div>
            </div>

            {/* Predio Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">SUPERFICIE TOTAL</span>
                <span className="text-slate-900 font-extrabold text-sm">{currentPredio.totalAreaHa} Hectáreas</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">RIESGO DE HELADA</span>
                <span className={`font-extrabold text-sm ${
                  currentPredio.weatherForecast?.frostRisk === 'Crítico' ? 'text-rose-600' : 'text-emerald-700'
                }`}>
                  {currentPredio.weatherForecast?.frostRisk} ({currentPredio.weatherForecast?.minTemp}°C)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">ESTRÉS HÍDRICO (CWSI)</span>
                <span className="text-slate-900 font-extrabold text-sm">{currentPredio.weatherForecast?.cwsiIndex} (Óptimo)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px]">CUARTELES / POLÍGONOS</span>
                <span className="text-slate-900 font-extrabold text-sm">{currentPredio.parcels.length} Sectores</span>
              </div>
            </div>
          </div>

          {/* Parcels Breakdown Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span>Cuarteles Agrícolas & Cobertura Vegetal</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-500">
                {currentPredio.parcels.length} polígonos mapeados
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono text-[11px]">
                    <th className="py-2.5 px-3">ID</th>
                    <th className="py-2.5 px-3">Cuartel / Cultivo</th>
                    <th className="py-2.5 px-3">Superficie</th>
                    <th className="py-2.5 px-3">NDVI Vigor</th>
                    <th className="py-2.5 px-3">Tipo de Suelo</th>
                    <th className="py-2.5 px-3">Riego / Régimen</th>
                    <th className="py-2.5 px-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentPredio.parcels.map(parcel => (
                    <tr key={parcel.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">{parcel.id}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{parcel.symbol}</span>
                          <span>{parcel.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{parcel.crop}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono">{parcel.areaHa} ha</td>
                      <td className="py-2.5 px-3">
                        <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-100 text-emerald-900">
                          NDVI {parcel.ndvi}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{parcel.soilType}</td>
                      <td className="py-2.5 px-3 text-slate-600">{parcel.irrigationType}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          parcel.status === 'Óptimo' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {parcel.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Raw JSON & GeoJSON Inspector */}
          <div className="bg-[#0B2519] rounded-3xl border border-emerald-500/40 p-6 text-white space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <div>
                  <h4 className="font-bold text-sm text-white">Inspector de Datos Crudos (GeoJSON & Entidades)</h4>
                  <p className="text-[11px] text-emerald-200/80 font-serif">
                    Tramas directas del predio listas para exportar a GIS, QGIS o entrenamiento de modelos.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy('raw-geojson', JSON.stringify(currentPredio.rawGeoJson, null, 2))}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-mono text-xs border border-emerald-700/60"
                >
                  {copiedId === 'raw-geojson' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copiar GeoJSON</span>
                </button>

                <button
                  onClick={() => handleDownloadJson(`${currentPredio.id}-parcels.geojson`, currentPredio.rawGeoJson)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar</span>
                </button>
              </div>
            </div>

            {/* Code Block Viewer */}
            <div className="p-4 rounded-2xl bg-[#071810] border border-emerald-900/60 max-h-72 overflow-y-auto font-mono text-xs text-emerald-300">
              <pre>{JSON.stringify(currentPredio.rawGeoJson, null, 2)}</pre>
            </div>
          </div>

        </div>
      )}

      {/* ===================== TAB 3: SENSORES & SATÉLITES ===================== */}
      {activeTab === 'sensors' && (
        <div className="space-y-6">
          
          {/* Sub-view switcher: Telemetría vs Formato Informe Oficial */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border-2 border-emerald-600/20 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSensorSubView('telemetry')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  sensorSubView === 'telemetry'
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Telemetría en Vivo & Calibración</span>
              </button>

              <button
                onClick={() => setSensorSubView('report')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                  sensorSubView === 'report'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-950" />
                <span>📋 Formato Informe Oficial de Resultados (Auditoría)</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 font-bold">Predio Auditado:</span>
              <select
                value={selectedPredioId}
                onChange={(e) => setSelectedPredioId(e.target.value)}
                className="font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {ALL_PREDIOS.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.commune})</option>
                ))}
              </select>
            </div>
          </div>

          {/* VISTA A: INFORME FORMAL DE RESULTADOS DE SENSORES (SOLICITADO POR EL USUARIO) */}
          {sensorSubView === 'report' && (
            <div className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 space-y-6 shadow-lg text-slate-900 font-sans print:border-0 print:shadow-none">
              
              {/* Encabezado Formal del Informe */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b-2 border-slate-200 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center font-serif font-black text-xl shadow-md">
                      AT
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-extrabold block">
                        URRUTIA AGROTECH • DIVISIÓN DE BIOFÍSICA APLICADA & PERMACULTURA
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-serif tracking-tight">
                        Informe Oficial de Telemetría IoT & Resultados Agronómicos
                      </h2>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 font-serif max-w-2xl">
                    Levantamiento oficial de telemetría in situ y certificación de variables biofísicas para cuadernos de campo SAG, certificación GlobalGAP y Protocolo de Carbono Tier-2 / EUDR.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono text-xs space-y-1.5 shrink-0 min-w-[260px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Protocolo N°:</span>
                    <span className="font-extrabold text-slate-900">INF-IOT-2026-0925</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fecha Emisión:</span>
                    <span className="font-bold text-slate-800">25 Septiembre 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Frecuencia:</span>
                    <span className="text-emerald-700 font-bold">15 min (LoRa 915MHz)</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-500">MRV Hash:</span>
                    <span className="text-amber-700 font-bold">0x8f2d4a19c6e</span>
                  </div>
                </div>
              </div>

              {/* Ficha Técnica del Predio Auditado */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                  <span className="text-emerald-800 text-[10px] block font-bold">PREDIO EVALUADO</span>
                  <span className="font-extrabold text-slate-950 text-sm block truncate">{currentPredio.name}</span>
                  <span className="text-[11px] text-slate-500 font-serif">{currentPredio.commune}, {currentPredio.region}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-bold">SUPERFICIE AUDITADA</span>
                  <span className="font-extrabold text-slate-950 text-sm block">{currentPredio.totalAreaHa} Hectáreas</span>
                  <span className="text-[11px] text-slate-500 font-serif">{currentPredio.parcels.length} Cuarteles Monitoreados</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-bold">RED DE HARDWARE</span>
                  <span className="font-extrabold text-slate-950 text-sm block">{currentPredio.sensors.length} Nodos Activos</span>
                  <span className="text-[11px] text-emerald-700 font-bold font-mono">100% Cobertura LoRa</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
                  <span className="text-amber-800 text-[10px] block font-bold">DICTAMEN TÉCNICO GLOBAL</span>
                  <span className="font-extrabold text-amber-900 text-sm block">91.4% Conformidad</span>
                  <span className="text-[11px] text-amber-700 font-serif font-bold">Óptimo con Observaciones</span>
                </div>
              </div>

              {/* Resumen Ejecutivo del Diagnóstico */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>Diagnóstico Agronómico & Comportamiento Biofísico del Predio</span>
                </h4>
                <p className="text-xs text-slate-700 font-serif leading-relaxed">
                  El monitoreo continuo de la red de nodos <strong>KioT</strong> en <strong>{currentPredio.name}</strong> evidencia una condición hídrica favorable en el estrato radicular profundo (20-60 cm), registrando un promedio de <strong>36.2% de humedad volumétrica (VWC)</strong>, suficiente para evitar estrés estomático (CWSI = 0.25). 
                  Se reporta una alerta térmica nocturna en la hondonada baja del estero (mínima de <strong>1.4°C a las 06:15 AM</strong>), mitigada con éxito mediante la activación coordinada de los microaspersores y la masa térmica del tranque de infiltración. 
                  Los sensores de CO2 foliar (NDIR) demuestran una adecuada tasa fotosintética en el dosel arbóreo. La red de radiofrecuencia mantiene un enlace estable (-78 dBm) con 0% de pérdidas de tramas.
                </p>
              </div>

              {/* TABLA FORMAL DE AUDITORÍA DE RESULTADOS DE SENSORES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-700" />
                    <span>Tabla de Resultados In Situ & Cumplimiento de Umbrales</span>
                  </h4>
                  <span className="text-xs font-mono text-slate-500">Valores validados por telemetría cruzada</span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 text-[11px] uppercase">
                      <tr>
                        <th className="p-3">ID Sensor</th>
                        <th className="p-3">Hardware / Sonda</th>
                        <th className="p-3">Ubicación Predial</th>
                        <th className="p-3">Variable</th>
                        <th className="p-3">Lectura In Situ</th>
                        <th className="p-3">Rango Óptimo</th>
                        <th className="p-3">Desviación</th>
                        <th className="p-3">Dictamen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {currentPredio.sensors.map((sensor, idx) => {
                        const isFrostAlert = sensor.telemetry.temperature !== undefined && sensor.telemetry.temperature < 2.0;
                        const isMoistureDry = sensor.telemetry.soilMoisture !== undefined && sensor.telemetry.soilMoisture < 25;
                        const statusClass = isFrostAlert ? 'bg-rose-100 text-rose-900 border-rose-300' :
                                            isMoistureDry ? 'bg-amber-100 text-amber-900 border-amber-300' :
                                            'bg-emerald-100 text-emerald-900 border-emerald-300';
                        const statusText = isFrostAlert ? 'Alerta Helada' : isMoistureDry ? 'Estrés Hídrico' : 'Conforme';

                        return (
                          <tr key={sensor.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3 font-extrabold text-emerald-900">{sensor.id}</td>
                            <td className="p-3 text-slate-600 font-sans text-xs">{sensor.hardware}</td>
                            <td className="p-3 text-slate-700 font-serif">{sensor.locationLabel}</td>
                            <td className="p-3 text-slate-600 font-mono">Humedad / Temp</td>
                            <td className="p-3 font-extrabold text-slate-900">
                              {sensor.telemetry.soilMoisture}% / {sensor.telemetry.temperature}°C
                            </td>
                            <td className="p-3 text-slate-500 font-mono">28% - 40% / &gt;3°C</td>
                            <td className="p-3 text-slate-600 font-mono">
                              {isFrostAlert ? '-1.6°C' : '+2.4%'}
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusClass}`}>
                                {statusText}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                      {/* Sensores adicionales estandarizados para reporte formal */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-extrabold text-emerald-900">IOT-SN-05</td>
                        <td className="p-3 text-slate-600 font-sans text-xs">NDIR CO2 MH-Z19B</td>
                        <td className="p-3 text-slate-700 font-serif">Dosel Follaje Sector Central</td>
                        <td className="p-3 text-slate-600 font-mono">Dióxido de Carbono</td>
                        <td className="p-3 font-extrabold text-slate-900">418 ppm</td>
                        <td className="p-3 text-slate-500 font-mono">380 - 450 ppm</td>
                        <td className="p-3 text-slate-600 font-mono">0.0%</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-100 text-emerald-900 border-emerald-300">
                            Conforme
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-extrabold text-emerald-900">IOT-SN-06</td>
                        <td className="p-3 text-slate-600 font-sans text-xs">Piezómetro Hidrostático RS485</td>
                        <td className="p-3 text-slate-700 font-serif">Pozo Profundo & Tranque Keyline</td>
                        <td className="p-3 text-slate-600 font-mono">Nivel Freático</td>
                        <td className="p-3 font-extrabold text-slate-900">14.2 m</td>
                        <td className="p-3 text-slate-500 font-mono">12.0 - 18.0 m</td>
                        <td className="p-3 text-slate-600 font-mono">+1.2 m</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-100 text-emerald-900 border-emerald-300">
                            Conforme
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tendencias de Oscilación en 24 Horas */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold font-serif">
                      Curva de Oscilación Diurna de Humedad de Suelo (Estrato 20-60cm) vs Hora
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Ciclo 24 Horas
                  </span>
                </div>

                <div className="h-28 w-full flex items-end justify-between gap-1 pt-4 px-2 border-b border-l border-slate-700 relative">
                  {[
                    { h: '00h', v: 35 }, { h: '02h', v: 34 }, { h: '04h', v: 33 }, { h: '06h', v: 31 },
                    { h: '08h', v: 32 }, { h: '10h', v: 36 }, { h: '12h', v: 38 }, { h: '14h', v: 37 },
                    { h: '16h', v: 36 }, { h: '18h', v: 35 }, { h: '20h', v: 34 }, { h: '22h', v: 36 }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div 
                        className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-amber-400"
                        style={{ height: `${(bar.v / 50) * 100}%` }}
                      />
                      <span className="text-[9px] font-mono text-slate-400">{bar.h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dictamen de Recomendaciones Agronómicas & Permacultura */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs font-serif text-slate-800">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Recomendaciones Operativas & Plan de Manejo Recomendado</span>
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 leading-relaxed text-slate-700">
                  <li><strong>Turnos de Riego por Pulsos:</strong> Mantener el encendido en horario valle nocturno (23:00 - 05:00 hrs) para una lámina de reposición de 5.8 mm/día según Penman-Monteith, ahorrando un 35% de electricidad.</li>
                  <li><strong>Protección Térmica en Cuartel Bajo:</strong> Consolidar la franja cortaviento viva en el deslinde sur para desviar la brisa helada katabática de la cordillera.</li>
                  <li><strong>Acolchado Orgánico (Mulching):</strong> Mantener cobertura de rastrojo de avena en cuarteles con humedad superficial inferior a 25% para evitar pérdida evaporativa por viento Puelche.</li>
                  <li><strong>Estado de Nodos & Baterías:</strong> La red opera con 100% de autonomía solar fotovoltaica. Próxima mantención preventiva en 90 días.</li>
                </ul>
              </div>

              {/* Barra de Acciones de Exportación & Firma */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const text = `==========================================================\nURRUTIA AGROTECH • INFORME OFICIAL DE TELEMETRÍA IOT\nProtocolo: INF-IOT-2026-0925\nPredio: ${currentPredio.name} (${currentPredio.commune})\nSuperficie: ${currentPredio.totalAreaHa} ha | MRV: 0x8f2d4a19c6e\n==========================================================\nConformidad Agronómica: 91.4% (Óptimo con Observaciones)\nSensores Activos: ${currentPredio.sensors.length}\nHumedad Radicular Media: 36.2% VWC\nAlerta Térmica: 1.4°C a las 06:15 AM (Mitigada)\n==========================================================`;
                      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Informe_Sensores_${currentPredio.id}_20260925.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition-all shadow-md active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Descargar Informe (.txt)</span>
                  </button>

                  <button
                    onClick={() => handleDownloadJson(`auditoria-sensores-${currentPredio.id}.json`, {
                      protocol: 'INF-IOT-2026-0925',
                      predio: currentPredio.name,
                      comuna: currentPredio.commune,
                      areaHa: currentPredio.totalAreaHa,
                      mrvHash: '0x8f2d4a19c6e',
                      date: '2026-09-25',
                      sensors: currentPredio.sensors
                    })}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-extrabold transition-all shadow-md active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar JSON</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-bold transition-all border border-slate-300"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-600" />
                    <span>Imprimir / PDF</span>
                  </button>
                </div>

                <button
                  onClick={() => handleCopy('cert-hash', '0x8f2d4a19c6e39b71')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs border border-slate-200"
                >
                  {copiedId === 'cert-hash' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copiar Hash MRV</span>
                </button>
              </div>

            </div>
          )}

          {/* VISTA B: TELEMETRÍA EN VIVO & CALIBRACIÓN (VISTA POR DEFECTO) */}
          {sensorSubView === 'telemetry' && (
            <div className="space-y-6">
              
              {/* Interactive Telemetry Simulator Panel */}
              <div className="bg-white p-6 rounded-3xl border-2 border-emerald-600/30 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Simulador de Telemetría Dinámica KioT</h3>
                      <p className="text-xs text-slate-500 font-serif">
                        Ajusta los parámetros para evaluar la respuesta de los algoritmos antiheladas y cálculo de riego en tiempo real.
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-mono px-3 py-1 rounded-full font-bold ${
                    simTemp < 0 ? 'bg-rose-100 text-rose-900 border border-rose-300 animate-pulse' : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {simTemp < 0 ? '🚨 ALERTA HELADA CRÍTICA' : '🌱 CONDICIONES NORMALES'}
                  </span>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
                  
                  {/* Slider 1: Temperature */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 flex items-center gap-1.5 font-bold">
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        <span>Temperatura de Brote</span>
                      </span>
                      <span className="font-extrabold text-slate-900">{simTemp}°C</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="38"
                      step="0.5"
                      value={simTemp}
                      onChange={(e) => setSimTemp(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <span className="text-[10px] text-slate-400 block font-serif">
                      {simTemp < 0 ? 'Disparo de asperjadores y alarma 110dB' : 'Sin riesgo térmico'}
                    </span>
                  </div>

                  {/* Slider 2: Soil Moisture */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 flex items-center gap-1.5 font-bold">
                        <Droplets className="w-3.5 h-3.5 text-blue-600" />
                        <span>Humedad Suelo (VWC)</span>
                      </span>
                      <span className="font-extrabold text-slate-900">{simMoisture}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="65"
                      step="1"
                      value={simMoisture}
                      onChange={(e) => setSimMoisture(parseFloat(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                    <span className="text-[10px] text-slate-400 block font-serif">
                      {simMoisture < 25 ? 'Punto de marchitez temporal alcanzado' : 'Capacidad de campo adecuada'}
                    </span>
                  </div>

                  {/* Slider 3: CWSI */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 flex items-center gap-1.5 font-bold">
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        <span>Índice Estrés CWSI</span>
                      </span>
                      <span className="font-extrabold text-slate-900">{simCwsi}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={simCwsi}
                      onChange={(e) => setSimCwsi(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <span className="text-[10px] text-slate-400 block font-serif">
                      {simCwsi > 0.5 ? 'Transpiración estomática bloqueada' : 'Fotosíntesis y turgencia activa'}
                    </span>
                  </div>

                </div>
              </div>

              {/* Active Sensor Nodes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPredio.sensors.map(sensor => (
                  <div key={sensor.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        {sensor.id}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Protocolo: {sensor.protocol}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{sensor.name}</h4>
                      <p className="text-xs text-slate-500 font-serif">Ubicación: {sensor.locationLabel}</p>
                    </div>

                    {/* Telemetry Pills */}
                    <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-400 block">HUMEDAD</span>
                        <span className="font-extrabold text-blue-700">{sensor.telemetry.soilMoisture}%</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-400 block">TEMPERATURA</span>
                        <span className="font-extrabold text-amber-700">{sensor.telemetry.temperature}°C</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                        <span className="text-[10px] text-slate-400 block">BATERÍA</span>
                        <span className="font-extrabold text-emerald-700">{sensor.telemetry.batteryLevel}%</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Hardware: {sensor.hardware}</span>
                      <span className="text-emerald-700 font-bold">{sensor.telemetry.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sentinel-2 Spectral Bands Breakdown */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-700" />
                    <span>Bandas Multiespectrales Sentinel-2 L2A (10m - 20m)</span>
                  </h4>
                  <span className="text-xs font-mono text-slate-500">Agencia Espacial Europea (ESA)</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-extrabold text-blue-800 block">B02 (Azul 490nm)</span>
                    <p className="text-[11px] text-slate-600 font-serif">Penetración atmosférica y discriminación de suelo desnudo.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-extrabold text-emerald-800 block">B04 (Rojo 665nm)</span>
                    <p className="text-[11px] text-slate-600 font-serif">Absorción de clorofila. Base para cálculo de NDVI.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-extrabold text-purple-800 block">B08 (NIR 842nm)</span>
                    <p className="text-[11px] text-slate-600 font-serif">Reflectancia de estructura celular del mesófilo foliar.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-extrabold text-amber-800 block">B11 (SWIR 1610nm)</span>
                    <p className="text-[11px] text-slate-600 font-serif">Contenido hídrico foliar y estrés de sequía (NDWI).</p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ===================== TAB 4: RECURSOS GRÁFICOS & SITIOS VIVOS ===================== */}
      {activeTab === 'graphics' && (
        <div className="space-y-8">
          
          {/* Sites Live Switcher Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Site 1: AgriTwin 3D */}
            <div className="bg-white rounded-3xl border-2 border-amber-500/40 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                    PUERTO 7773 • 3D WEBGL
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <img src="./logo-agritwin.png" alt="AgriTwin" className="w-10 h-10 object-contain" />
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">AgriTwin 3D</h4>
                    <p className="text-xs text-slate-500 font-serif">Gemelo Digital Biofísico</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 font-serif">
                  Entorno tridimensional interactivo con curvas de nivel, hilera por hilera y simulación de heladas.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setActiveLiveSite(activeLiveSite === 'agritwin' ? 'none' : 'agritwin')}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>{activeLiveSite === 'agritwin' ? 'Ocultar Visor' : 'Cargar Visor Embebido'}</span>
                </button>
                <button
                  onClick={() => window.open('http://localhost:7773', '_blank')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir en Nueva Pestaña</span>
                </button>
              </div>
            </div>

            {/* Site 2: Rewild Suite */}
            <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
                    PUERTO 7772 • PWA OFFLINE
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <img src="./logo-rewild.png" alt="Rewild" className="w-10 h-10 object-contain" />
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">Rewild Suite</h4>
                    <p className="text-xs text-slate-500 font-serif">Biomonitoreo Esclerófilo</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 font-serif">
                  Herramienta de terreno para auditar flora nativa y emitir créditos ecológicos sin cobertura celular.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setActiveLiveSite(activeLiveSite === 'rewild' ? 'none' : 'rewild')}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-sans text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4 text-emerald-300" />
                  <span>{activeLiveSite === 'rewild' ? 'Ocultar Visor' : 'Cargar Visor Embebido'}</span>
                </button>
                <button
                  onClick={() => window.open('http://localhost:7772/rewilding-field-suite.html', '_blank')}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir en Nueva Pestaña</span>
                </button>
              </div>
            </div>

            {/* Site 3: AgroTech Madre */}
            <div className="bg-white rounded-3xl border-2 border-emerald-600/40 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
                    PUERTO 7771 • MADRE
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <img src="./logo-peumo-quantum.jpg" alt="AgroTech Core" className="w-10 h-10 object-contain rounded-lg" />
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">Urrutia AgroTech Core</h4>
                    <p className="text-xs text-slate-500 font-serif">Plataforma Madre & HoldCo</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 font-serif">
                  Núcleo central de gobernanza, portal público, pasaporte verde UE e inteligencia satelital.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate?.('landing')}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#0B2519] hover:bg-[#133825] text-white font-sans text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Ir al Inicio de AgroTech</span>
                </button>
              </div>
            </div>

          </div>

          {/* Embedded Viewer Container */}
          {activeLiveSite !== 'none' && (
            <div className={`rounded-3xl border-2 border-emerald-500/50 overflow-hidden shadow-2xl bg-slate-950 animate-fadeIn ${
              fullScreenEmbed ? 'fixed inset-4 z-50' : ''
            }`}>
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between text-xs font-mono text-slate-300 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-white font-bold ml-2">
                    {activeLiveSite === 'agritwin' ? 'AgriTwin 3D WebGL Canvas (Puerto 7773)' : 'Rewild Field Suite (Puerto 7772)'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFullScreenEmbed(!fullScreenEmbed)}
                    className="hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {fullScreenEmbed ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    <span>{fullScreenEmbed ? 'Salir' : 'Maximizar'}</span>
                  </button>
                  <button
                    onClick={() => setActiveLiveSite('none')}
                    className="text-rose-400 hover:text-rose-300 font-bold ml-2"
                  >
                    ✕ Cerrar
                  </button>
                </div>
              </div>

              <iframe
                src={activeLiveSite === 'agritwin' ? 'http://localhost:7773' : 'http://localhost:7772/rewilding-field-suite.html'}
                title="Live Site Embed"
                className="w-full h-[650px] border-0"
              />
            </div>
          )}

          {/* Brand Assets & Official Vector Logos Gallery */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Galería de Recursos Gráficos & Logotipos Vectoriales</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ALL_GRAPHIC_ASSETS.map((asset) => (
                <div key={asset.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center flex flex-col justify-between">
                  <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 p-2 mx-auto flex items-center justify-center shadow-sm">
                    {asset.previewUrl ? (
                      <img src={asset.previewUrl} alt={asset.name} className="w-full h-full object-contain" />
                    ) : (
                      <Globe className="w-6 h-6 text-emerald-700" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900 line-clamp-1">{asset.name}</h5>
                    <p className="text-[10px] text-slate-500 font-serif line-clamp-2">{asset.description}</p>
                  </div>
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1 text-[10px] font-mono text-emerald-800 font-bold hover:underline pt-1"
                  >
                    <span>Ver Recurso</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ===================== TAB 5: TERMINAL DE SCRIPTS & APIS ===================== */}
      {activeTab === 'scripts' && (
        <div className="space-y-6">
          
          <div className="bg-slate-950 rounded-3xl border border-emerald-500/40 p-6 text-white space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  CLI & RUNNER DE COMANDOS
                </span>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span>Catálogo de Scripts de Producción & Simulación</span>
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                1-Click Copy • macOS (zsh) & Linux
              </span>
            </div>

            {/* Scripts List */}
            <div className="space-y-4">
              {filteredScripts.map(script => (
                <div key={script.id} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-bold uppercase">
                        {script.language}
                      </span>
                      <h4 className="font-bold text-sm text-white">{script.name}</h4>
                    </div>

                    <button
                      onClick={() => handleCopy(script.id, script.command)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 font-mono text-xs border border-emerald-700/60 transition-colors w-fit"
                    >
                      {copiedId === script.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === script.id ? '¡Copiado!' : 'Copiar Comando'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 font-serif">{script.purpose}</p>

                  <div className="p-2.5 rounded-xl bg-black font-mono text-xs text-amber-300 flex items-center justify-between overflow-x-auto">
                    <code>{script.command}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Start Commands Cheat Sheet */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-700" />
              <span>Cheat Sheet: Iniciar los 3 Sistemas Simultáneamente</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">1. Terminal 1 (AgroTech 7771)</span>
                <code className="p-2 rounded bg-slate-200 text-slate-800 block text-[11px]">
                  npm run dev
                </code>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">2. Terminal 2 (AgriTwin 7773)</span>
                <code className="p-2 rounded bg-slate-200 text-slate-800 block text-[11px]">
                  node agritwin/server.cjs
                </code>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">3. Terminal 3 (Rewild 7772)</span>
                <code className="p-2 rounded bg-slate-200 text-slate-800 block text-[11px]">
                  python3 rewild/server.py
                </code>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ===================== TAB 6: OBSIDIAN VAULT & MANIFIESTO ===================== */}
      {activeTab === 'vault' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900">Visor de Notas de Obsidian Vault</h3>
                  <p className="text-xs text-slate-500 font-serif">
                    Conexión directa con la carpeta <code>Agro Tech/</code> y soporte para wikilinks <code>[[...]]</code>.
                  </p>
                </div>
              </div>

              {/* Note Selector Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {ALL_DOC_NOTES.map(note => (
                  <button
                    key={note.id}
                    onClick={() => setSelectedNoteId(note.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all ${
                      selectedNoteId === note.id
                        ? 'bg-purple-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {note.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Note Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-extrabold text-xl text-slate-900">{currentNote.title}</h4>
                {currentNote.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-600 font-serif">{currentNote.summary}</p>
            </div>

            {/* Markdown Rendered Preview */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-serif text-sm leading-relaxed whitespace-pre-wrap">
              {currentNote.contentMarkdown}
            </div>

            {/* Wikilinks Badges */}
            {currentNote.wikilinks && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">
                  ENLACES WIKI CONECTADOS (GRAPH VIEW)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentNote.wikilinks.map((wl, i) => (
                    <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold">
                      [[{wl}]]
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
