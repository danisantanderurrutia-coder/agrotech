import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, Landmark, TreePine, Wrench, Droplets, Flame, 
  ShieldAlert, Sparkles, ExternalLink, Maximize2, RefreshCw, 
  Layers, Cpu, Activity, CheckCircle2, ChevronRight, MessageSquare, 
  FileText, ShieldCheck, Eye, Compass, Sun, MapPin, Gauge,
  Download, Sliders, Wind, Zap, TrendingDown, Clock, ArrowRight,
  Trees, Globe, Check, AlertTriangle, Radio, BarChart3, Database
} from 'lucide-react';

export type ViewMode = 'ENTERPRISE' | 'TERRITORIAL' | 'ESG' | 'STUDIO' | 'REPORTS' | 'TRANSITION' | 'REGIONAL';

interface BiophysicalState {
  simulatedHour: string;
  avgMoisture: string;
  globalRisk: string;
  enterprise: {
    layer1_0_20cm: number | string;
    layer2_20_60cm: number | string;
    layer3_60_100cm: number | string;
    cwsi: number | string;
    irrigationSheetMm: number | string;
    irrigationDurationMin: number;
    et0PenmanMonteith: number | string;
    frostMinTemp: number | string;
    frostRiskLevel: string;
    frostLocation: string;
    frostHourPredict: string;
  };
  territorial: {
    aquiferRechargePercent: number;
    aquiferStatus: string;
    fwiScore: number;
    fwiCategory: string;
    fuelLoadTonHa: number;
    aprCommitteesCount: number;
    familiesSupplied: number;
    waterTrucksAvoided: number;
    savingsClp: string;
    firebreaksCleanKm: number;
    criticalSector: string;
  };
  esg: {
    carbonTco2eHa: number;
    ieiScore: number;
    eudrCompliance: string;
    baselineYear: string;
    mrvHash: string;
    biodiversityCredits: number;
    restorationCorridorHa: number;
  };
}

const DEFAULT_BIOPHYSICAL_DATA: BiophysicalState = {
  simulatedHour: '10:00',
  avgMoisture: '37.2%',
  globalRisk: 'optimal',
  enterprise: {
    layer1_0_20cm: '24.8',
    layer2_20_60cm: '36.2',
    layer3_60_100cm: '42.5',
    cwsi: 0.26,
    irrigationSheetMm: 5.8,
    irrigationDurationMin: 42,
    et0PenmanMonteith: 3.6,
    frostMinTemp: 1.4,
    frostRiskLevel: 'warning',
    frostLocation: 'Hondonada baja del Estero',
    frostHourPredict: '06:15 AM'
  },
  territorial: {
    aquiferRechargePercent: 68,
    aquiferStatus: 'warning',
    fwiScore: 38,
    fwiCategory: 'Alto',
    fuelLoadTonHa: 4.5,
    aprCommitteesCount: 6,
    familiesSupplied: 1420,
    waterTrucksAvoided: 14,
    savingsClp: '$4.2M CLP',
    firebreaksCleanKm: 14.2,
    criticalSector: 'Sector Ribera Sur (3.2 km)'
  },
  esg: {
    carbonTco2eHa: 4.8,
    ieiScore: 0.88,
    eudrCompliance: '100% Cero Deforestación',
    baselineYear: 'Diciembre 2020 (Sentinel-2)',
    mrvHash: '0x8f2d4a19c6e',
    biodiversityCredits: 128,
    restorationCorridorHa: 8.4
  }
};

interface AgroTwinDynamicViewerProps {
  initialMode?: ViewMode;
  onNavigate?: (viewId: string) => void;
  serverUrl?: string;
  onOpenStandalone?: () => void;
}

export const AgroTwinDynamicViewer: React.FC<AgroTwinDynamicViewerProps> = ({
  initialMode = 'ENTERPRISE',
  onNavigate,
  serverUrl = 'http://localhost:7773',
  onOpenStandalone
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  const [biophysicalData, setBiophysicalData] = useState<BiophysicalState>(DEFAULT_BIOPHYSICAL_DATA);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [showBioSimModal, setShowBioSimModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Master Format: Predial (Táctico) vs Regional (Estratégico)
  const [twinFormat, setTwinFormat] = useState<'PREDIAL' | 'REGIONAL'>(
    initialMode === 'REGIONAL' ? 'REGIONAL' : 'PREDIAL'
  );

  // States for new features:
  // 1. Reports Sub-tab
  const [selectedReportType, setSelectedReportType] = useState<'fire' | 'flood' | 'carbon' | 'ecological'>('fire');
  const [reportGenerated, setReportGenerated] = useState(false);

  // 2. Permaculture Transition Phase & Regional Coupling
  const [transitionPhase, setTransitionPhase] = useState<'actual' | 'phase1' | 'phase2' | 'phase3'>('phase1');
  const [isIntegratedWithRegional, setIsIntegratedWithRegional] = useState<boolean>(false);

  // 3. Regional AgroTwin Land Cover Layer Toggles Independientes
  const [activeRegionalLayers, setActiveRegionalLayers] = useState<{
    native_forest: boolean;
    agriculture: boolean;
    water: boolean;
    mountain: boolean;
    monoculture: boolean;
    urban: boolean;
    towns: boolean;
    buoys: boolean;
  }>({
    native_forest: true,
    agriculture: true,
    water: true,
    mountain: true,
    monoculture: true,
    urban: true,
    towns: true,
    buoys: true
  });

  const toggleRegionalLayer = (layer: keyof typeof activeRegionalLayers) => {
    setActiveRegionalLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  const setAllRegionalLayers = (enable: boolean) => {
    setActiveRegionalLayers({
      native_forest: enable,
      agriculture: enable,
      water: enable,
      mountain: enable,
      monoculture: enable,
      urban: enable,
      towns: enable,
      buoys: enable
    });
  };

  // Escuchar mensajes provenientes del motor 3D en WebGL
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'simulation:tick') {
        setBiophysicalData(prev => ({
          ...prev,
          ...event.data
        }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleProfileSelect = (mode: ViewMode) => {
    setViewMode(mode);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const internalProfile = mode === 'ENTERPRISE' ? 'enterprise' :
                              mode === 'TERRITORIAL' ? 'territorial' :
                              mode === 'ESG' ? 'esg' : 'studio';
      iframeRef.current.contentWindow.postMessage({
        action: 'switch_profile',
        profile: internalProfile
      }, '*');
    }
  };

  const handleOpenDedicatedTab = () => {
    if (onOpenStandalone) {
      onOpenStandalone();
    } else {
      window.open(serverUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleDownloadReport = (title: string) => {
    setReportGenerated(true);
    const content = `==========================================================\nURRUTIA AGROTECH & AGRITWIN 3D • INFORME TÉCNICO OFICIAL\n==========================================================\nDocumento: ${title}\nFecha de Emisión: 2026-09-25\nPredio Analizado: Predio Meniels (Parral, Maule - 36.14°S, 71.82°O)\nSuperficie: 24.8 hectáreas\nFuente de Datos: Sentinel-2 L2A + Nodos KioT in situ + FAO-56\nMRV Hash: 0x8f2d4a19c6e\n==========================================================\nESTADO DE RIESGO & INDICADORES:\n- Piro-Riesgo FWI: ${biophysicalData.territorial.fwiScore} (${biophysicalData.territorial.fwiCategory})\n- Carga de Combustible: ${biophysicalData.territorial.fuelLoadTonHa} ton/ha\n- Captura Neta de Carbono: ${biophysicalData.esg.carbonTco2eHa} tCO2e/ha/año\n- Integridad Ecológica (IEI): ${biophysicalData.esg.ieiScore}/1.00\n- Ahorro Eléctrico Proyectado por Orientación Solar: 66% (320 kWh/mes)\n==========================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Informe_AgroTwin_${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTimeout(() => setReportGenerated(false), 3000);
  };

  return (
    <div className="w-full bg-[#030B07] text-white rounded-3xl border border-emerald-500/30 overflow-hidden shadow-2xl relative font-sans">
      
      {/* ─── BARRA DE ESTADO SUPERIOR CON PERFILES ─── */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-[#071810] via-[#0B2519] to-[#071810] border-b border-emerald-500/20 space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-400/40 p-1.5 flex items-center justify-center shrink-0 shadow-inner">
              <img src="./logo-agritwin.png" alt="AgriTwin 3D" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-wide text-white">AgriTwin 3D</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/90 text-emerald-300 border border-emerald-500/40">
                  v2.4.0 Engine
                </span>
              </div>
              <p className="text-xs text-emerald-200/70 font-serif">
                Predio Meniels • Parral, Maule (36.14°S, 71.82°O)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBioSimModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 text-xs border border-emerald-600/40 transition-all font-mono"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Bio-Simulador FAO</span>
            </button>

            <button
              onClick={() => setShowWhatsAppModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-600/70 text-white text-xs border border-emerald-400/40 transition-all font-mono"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Alertas KioT</span>
            </button>

            <button
              onClick={handleOpenDedicatedTab}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all active:scale-95 shadow-md"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir 7773</span>
            </button>
          </div>
        </div>

        {/* ─── DUAL MASTER FORMAT SELECTOR: PREDIAL (TÁCTICO) VS REGIONAL (ESTRATÉGICO) ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-emerald-500/20">
          <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-2xl border border-emerald-500/40">
            <button
              onClick={() => {
                setTwinFormat('PREDIAL');
                if (viewMode === 'REGIONAL') setViewMode('ENTERPRISE');
              }}
              className={`px-4 py-2 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${
                twinFormat === 'PREDIAL'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg border border-emerald-400/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🏡 Formato Predial (Táctico • Civ VI Micro)</span>
            </button>

            <button
              onClick={() => {
                setTwinFormat('REGIONAL');
                setViewMode('REGIONAL');
              }}
              className={`px-4 py-2 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${
                twinFormat === 'REGIONAL'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-lg border border-cyan-400/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🗺️ Formato Regional-Climático (Estratégico • Civ VI Macro)</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-emerald-300/80 hidden md:block">
            {twinFormat === 'PREDIAL' 
              ? '🔍 Escala Finca: Micro-hexágonos, estratos radiculares 3D & sensores puntuales' 
              : '🛰️ Escala Cuenca: 122.000 ha, DEM Hillshade, ríos & vectores de viento Puelche'}
          </span>
        </div>

        {/* ─── SUB-MODOS DEL FORMATO SELECCIONADO ─── */}
        {twinFormat === 'PREDIAL' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-sans">
            <button
              onClick={() => {
                setViewMode('ENTERPRISE');
                window.open('http://localhost:7773', '_blank');
              }}
              className="px-3 py-2 rounded-xl font-bold shrink-0 transition-all flex items-center gap-1.5 bg-emerald-600 text-white shadow-md hover:bg-emerald-500"
              title="Abrir AgriTwin 3D en pestaña completa"
            >
              <span>🏰 Fundo Colliguay 3D (:7773)</span>
            </button>

            {/* NUEVO 1: GENERADOR DE INFORMES */}
            <button
              onClick={() => handleProfileSelect('REPORTS')}
              className={`px-3.5 py-2 rounded-xl font-bold shrink-0 transition-all flex items-center gap-1.5 border ${
                viewMode === 'REPORTS'
                  ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white border-rose-400 shadow-lg'
                  : 'bg-rose-950/40 text-rose-300 border-rose-800/40 hover:bg-rose-900/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>📊 Informes & Riesgos (Incendios / Inundación)</span>
            </button>

            {/* NUEVO 2: SIMULADOR DE TRANSICIÓN PERMACULTURAL */}
            <button
              onClick={() => handleProfileSelect('TRANSITION')}
              className={`px-3.5 py-2 rounded-xl font-bold shrink-0 transition-all flex items-center gap-1.5 border ${
                viewMode === 'TRANSITION'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-300 shadow-lg'
                  : 'bg-emerald-950/40 text-emerald-300 border-emerald-700/40 hover:bg-emerald-900/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>🌱 Transición Permacultural (Predio Tío)</span>
            </button>

          </div>
        )}

        {twinFormat === 'REGIONAL' && (
          <div className="flex items-center justify-between gap-3 bg-blue-950/40 p-2.5 rounded-2xl border border-blue-500/30 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-bold">Cuenca Parral & Retiro:</span>
              <span className="text-slate-300">Monitoreo Macro-Escala GIS • Calibración por Red de Boyas In Situ</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAllRegionalLayers(true)}
                className="px-2.5 py-1 rounded-lg bg-blue-900/80 hover:bg-blue-800 text-cyan-200 text-[11px]"
              >
                Activar Todas
              </button>
              <button
                onClick={() => setAllRegionalLayers(false)}
                className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 text-slate-400 text-[11px]"
              >
                Desactivar Todas
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ─── CONTENIDO DINÁMICO SEGÚN MODO ─── */}

      {/* MODO 1: INFORMES & MAPAS DE RIESGO */}
      {viewMode === 'REPORTS' && (
        <div className="p-6 space-y-6 animate-fadeIn bg-[#071810]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
            <div>
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider block">
                MÓDULO DE RISK & CLIMATE INTELLIGENCE
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-rose-400" />
                <span>Generador Oficial de Informes Agroclimáticos & Mapas de Riesgo</span>
              </h3>
              <p className="text-xs text-slate-300 font-serif">
                Cruza telemetría de sensores KioT, CO2 in situ, pendientes SRTM e imágenes multiespectrales Sentinel-2.
              </p>
            </div>

            <button
              onClick={() => handleDownloadReport(selectedReportType === 'fire' ? 'Riesgo_Incendios_FWI' : selectedReportType === 'flood' ? 'Riesgo_Inundaciones' : selectedReportType === 'carbon' ? 'Captura_Carbono_CO2' : 'Integridad_Ecologica')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{reportGenerated ? '¡Informe Generado!' : 'Descargar Informe Oficial'}</span>
            </button>
          </div>

          {/* Selector de Tipo de Informe */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <button
              onClick={() => setSelectedReportType('fire')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedReportType === 'fire'
                  ? 'bg-rose-950/80 border-rose-400 text-white ring-1 ring-rose-400'
                  : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-rose-400 mb-1">
                <Flame className="w-4 h-4" />
                <span>1. Riesgo de Incendios</span>
              </div>
              <span className="text-[11px] text-slate-300 font-serif block">FWI 38 • Interfaz combustible</span>
            </button>

            <button
              onClick={() => setSelectedReportType('flood')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedReportType === 'flood'
                  ? 'bg-blue-950/80 border-blue-400 text-white ring-1 ring-blue-400'
                  : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-blue-400 mb-1">
                <Droplets className="w-4 h-4" />
                <span>2. Riesgo Inundaciones</span>
              </div>
              <span className="text-[11px] text-slate-300 font-serif block">Escorrentía & desbordes</span>
            </button>

            <button
              onClick={() => setSelectedReportType('carbon')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedReportType === 'carbon'
                  ? 'bg-emerald-950/80 border-emerald-400 text-white ring-1 ring-emerald-400'
                  : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
                <Trees className="w-4 h-4" />
                <span>3. Captura de Carbono</span>
              </div>
              <span className="text-[11px] text-slate-300 font-serif block">4.8 tCO2e/ha • CO2 medido</span>
            </button>

            <button
              onClick={() => setSelectedReportType('ecological')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedReportType === 'ecological'
                  ? 'bg-purple-950/80 border-purple-400 text-white ring-1 ring-purple-400'
                  : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-purple-400 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>4. Informe Ecológico</span>
              </div>
              <span className="text-[11px] text-slate-300 font-serif block">IEI 0.88 • Cero Def. EUDR</span>
            </button>
          </div>

          {/* Visualizador de Capa / Mapa de Riesgo Seleccionado */}
          <div className="p-6 rounded-3xl bg-black/60 border border-emerald-500/30 space-y-4">
            
            {selectedReportType === 'fire' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                    <h4 className="font-bold text-sm text-white">Mapa de Riesgo de Incendios Forestales (FWI & Carga Combustible)</h4>
                  </div>
                  <span className="text-xs font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-600">
                    Nivel Crítico en Laderas Sur
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">ÍNDICE METEOROLÓGICO FWI</span>
                    <span className="text-2xl font-black text-rose-400">38.4 FWI</span>
                    <p className="text-[11px] text-slate-300 font-serif">Condiciones extremas con viento Puelche &gt;25 km/h.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">CARGA DE BIOMASA SECA</span>
                    <span className="text-2xl font-black text-amber-400">4.5 ton/ha</span>
                    <p className="text-[11px] text-slate-300 font-serif">Pasto seco estival en borde de viñedo patrimonial.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">CORTAFUEGOS VERIFICADOS</span>
                    <span className="text-2xl font-black text-emerald-400">14.2 km</span>
                    <p className="text-[11px] text-slate-300 font-serif">Franjas minerales limpias con trazabilidad satelital.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/40 text-xs text-rose-200 font-serif">
                  📍 <strong>Recomendación Operativa AgriTwin:</strong> Humedecer el cuartel A105 mediante microaspersores entre las 13:00 y 16:00 hrs y mantener despejada la interfaz con el bosque esclerófilo.
                </div>
              </div>
            )}

            {selectedReportType === 'flood' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                    <h4 className="font-bold text-sm text-white">Mapa de Riesgo de Inundación & Anegamiento Predial</h4>
                  </div>
                  <span className="text-xs font-mono text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-600">
                    Crecidas Estacionales Longaví / Perquilauquén
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">PENDIENTE MEDIA DE ESCORRENTÍA</span>
                    <span className="text-2xl font-black text-blue-400">3.2% Gradiente</span>
                    <p className="text-[11px] text-slate-300 font-serif">Drenaje natural hacia tranque de cota baja A107.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">CAPACIDAD TRANQUE KEYLINE</span>
                    <span className="text-2xl font-black text-cyan-400">18.500 m³</span>
                    <p className="text-[11px] text-slate-300 font-serif">Volumen amortiguador de avenidas torrenciales.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">INFILTRACIÓN EN SWALES</span>
                    <span className="text-2xl font-black text-emerald-400">85 mm/hora</span>
                    <p className="text-[11px] text-slate-300 font-serif">Zanjas en contorno que evitan erosión en zanjón.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/40 text-xs text-blue-200 font-serif">
                  💧 <strong>Alerta Hidrológica AgriTwin:</strong> Las hondonadas de cereales en A101 toleran hasta 60mm en 24h gracias al drenaje de zanjas. No se proyecta anegamiento en casa principal.
                </div>
              </div>
            )}

            {selectedReportType === 'carbon' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <h4 className="font-bold text-sm text-white">Informe de Captura de Carbono & Balance de Suelo Vivo</h4>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600">
                    Protocolo IPCC Tier-2 • Suelos Maulinos
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">CAPTURA TOTAL ANUAL</span>
                    <span className="text-2xl font-black text-emerald-400">119 tCO2e/año</span>
                    <p className="text-[11px] text-slate-300 font-serif">Calculado en las 24.8 hectáreas del predio.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">CO2 AMBIENTAL IN SITU</span>
                    <span className="text-2xl font-black text-amber-400">418 ppm</span>
                    <p className="text-[11px] text-slate-300 font-serif">Sensor NDIR MH-Z19B bajo dosel de peumos.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">MATERIA ORGÁNICA SUELO</span>
                    <span className="text-2xl font-black text-cyan-400">6.8% (Óptimo)</span>
                    <p className="text-[11px] text-slate-300 font-serif">Secuestro biológico en estrato 0-40cm.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs text-emerald-200 font-serif">
                  🌱 <strong>Certificación Lista:</strong> Datos aptos para la emisión de créditos en el Pasaporte Verde de Exportación hacia la Unión Europea.
                </div>
              </div>
            )}

            {selectedReportType === 'ecological' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
                    <h4 className="font-bold text-sm text-white">Informe de Integridad Ecosistémica & Biodiversidad</h4>
                  </div>
                  <span className="text-xs font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-600">
                    Sello EUDR Verificado
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">ÍNDICE DE INTEGRIDAD (IEI)</span>
                    <span className="text-2xl font-black text-purple-400">0.88 / 1.00</span>
                    <p className="text-[11px] text-slate-300 font-serif">Estratificación arbórea y sotobosque nativo.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">CORREDOR DE FAUNA</span>
                    <span className="text-2xl font-black text-emerald-400">5.4 ha Continuas</span>
                    <p className="text-[11px] text-slate-300 font-serif">Conexión con esteros y quebradas colindantes.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-600/40 space-y-1">
                    <span className="text-slate-400 block text-[10px]">AUDITORÍA SATELITAL HISTÓRICA</span>
                    <span className="text-2xl font-black text-blue-400">0% Deforestación</span>
                    <p className="text-[11px] text-slate-300 font-serif">Línea base post-2020 intacta.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* MODO 2: SIMULADOR DE TRANSICIÓN PERMACULTURAL (PREDIO DE MI TÍO) */}
      {viewMode === 'TRANSITION' && (
        <div className="p-6 space-y-6 animate-fadeIn bg-[#071810]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                ROADMAP DE REORDENAMIENTO PREDIAL ESCALONADO
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>Simulador de Transición Permacultural: Predio de mi Tío (Meniels)</span>
              </h3>
              <p className="text-xs text-slate-300 font-serif">
                Instrucciones paso a paso para pasar del modelo actual a uno regenerativo optimizando electricidad, energía solar, viento y agua sin agotar recursos.
              </p>
            </div>

            {/* Selector de Fase */}
            <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-2xl border border-emerald-500/30 text-xs font-mono">
              <button
                onClick={() => setTransitionPhase('actual')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  transitionPhase === 'actual' ? 'bg-rose-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Estado Actual
              </button>
              <button
                onClick={() => setTransitionPhase('phase1')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  transitionPhase === 'phase1' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Fase 1 (Bajo Costo)
              </button>
              <button
                onClick={() => setTransitionPhase('phase2')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  transitionPhase === 'phase2' ? 'bg-cyan-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Fase 2 (Swales)
              </button>
              <button
                onClick={() => setTransitionPhase('phase3')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  transitionPhase === 'phase3' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                4. Fase 3 (Integral)
              </button>
            </div>
          </div>

          {/* BOTÓN ESPECIAL DE INTEGRACIÓN: CONECTAR CAPA REGIONAL CON PREDIAL */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-cyan-950 via-[#06242c] to-emerald-950 border-2 border-cyan-400/60 shadow-2xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-extrabold">
                    ACOPLAMIENTO MULTIESCALA: MICRO-PREDIO ⇄ CUENCA REGIONAL
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2 font-serif">
                  <Compass className="w-5 h-5 text-cyan-400" />
                  <span>Conectar Dinámica de Cuenca Regional (Parral-Retiro) con el Predio (Meniels)</span>
                </h4>
                <p className="text-xs text-slate-300 font-serif max-w-2xl">
                  Simula cómo las amenazas macro-climáticas de la cuenca (viento Puelche 38 km/h, heladas cordilleranas y crecidas fluviales) son interceptadas, amortiguadas y aprovechadas por las obras de permacultura predial.
                </p>
              </div>

              <button
                onClick={() => setIsIntegratedWithRegional(!isIntegratedWithRegional)}
                className={`px-5 py-3 rounded-2xl font-black text-xs font-mono shrink-0 transition-all shadow-xl flex items-center gap-2 border ${
                  isIntegratedWithRegional
                    ? 'bg-cyan-400 text-slate-950 border-white ring-4 ring-cyan-500/40 animate-pulse'
                    : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 border-emerald-300 hover:brightness-110 active:scale-95'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isIntegratedWithRegional ? 'animate-spin' : ''}`} />
                <span>{isIntegratedWithRegional ? '✓ Integración Regional Conectada' : '🔄 Conectar con Capa Regional'}</span>
              </button>
            </div>

            {/* Panel de Acoplamiento Multiescala Activo */}
            {isIntegratedWithRegional && (
              <div className="pt-4 border-t border-cyan-800/60 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                  
                  {/* Factor 1: Viento Puelche */}
                  <div className="p-3.5 rounded-2xl bg-black/60 border border-cyan-500/40 space-y-1.5">
                    <span className="text-[10px] text-cyan-300 block font-bold">1. VIENTO PUELCHE (MACRO)</span>
                    <span className="text-white font-extrabold text-sm block">38 km/h • 14% HR</span>
                    <p className="text-[11px] text-slate-300 font-serif">
                      <strong>Respuesta Predial:</strong> Cortina viva de Quillay y Peumo en deslinde Sur-Este frena el viento a 12 km/h y conserva 42% de humedad foliar en cuarteles de cerezos.
                    </p>
                  </div>

                  {/* Factor 2: Helada Katabática */}
                  <div className="p-3.5 rounded-2xl bg-black/60 border border-blue-500/40 space-y-1.5">
                    <span className="text-[10px] text-blue-300 block font-bold">2. HELADA VALLE (CUENCA)</span>
                    <span className="text-white font-extrabold text-sm block">-2.4°C en Cuenca Baja</span>
                    <p className="text-[11px] text-slate-300 font-serif">
                      <strong>Respuesta Predial:</strong> Masa térmica del Tranque Keyline eleva la temperatura nocturna local en +1.8°C; aspersores protegen brotes en cuartel A101.
                    </p>
                  </div>

                  {/* Factor 3: Avenidas de Lluvia */}
                  <div className="p-3.5 rounded-2xl bg-black/60 border border-emerald-500/40 space-y-1.5">
                    <span className="text-[10px] text-emerald-300 block font-bold">3. ESCORRENTÍA TORRENCIAL</span>
                    <span className="text-white font-extrabold text-sm block">65 mm / 24h</span>
                    <p className="text-[11px] text-slate-300 font-serif">
                      <strong>Respuesta Predial:</strong> Zanjas en contorno (swales) cosechan 180.000 litros e infiltran en napa sin erosión hacia zanjones colindantes.
                    </p>
                  </div>

                  {/* Factor 4: Autonomía Energética */}
                  <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-500/40 space-y-1.5">
                    <span className="text-[10px] text-amber-300 block font-bold">4. VULNERABILIDAD ELÉCTRICA</span>
                    <span className="text-white font-extrabold text-sm block">Red Rural Inestable</span>
                    <p className="text-[11px] text-slate-300 font-serif">
                      <strong>Respuesta Predial:</strong> Bombeo solar bifacial autónomo y riego por gravedad; reducción de costo eléctrico en un 66% ($320.000 CLP/mes).
                    </p>
                  </div>

                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-cyan-200">
                    Sincronizado con la Red de Boyas Centinela de Parral & Retiro
                  </span>
                  <button
                    onClick={() => {
                      setTwinFormat('REGIONAL');
                      setViewMode('REGIONAL');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-900/80 hover:bg-cyan-800 text-cyan-200 border border-cyan-600 font-bold flex items-center gap-1.5"
                  >
                    <span>Ver Cuenca Completa en Modo Regional</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Comparativa Energética & Microclimática */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-slate-400 block text-[10px]">CONSUMO ELÉCTRICO MENSUAL</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-black ${
                  transitionPhase === 'actual' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {transitionPhase === 'actual' ? '480 kWh' : transitionPhase === 'phase1' ? '310 kWh' : transitionPhase === 'phase2' ? '210 kWh' : '160 kWh'}
                </span>
                {transitionPhase !== 'actual' && (
                  <span className="text-emerald-400 text-xs font-bold">
                    {transitionPhase === 'phase1' ? '-35%' : transitionPhase === 'phase2' ? '-56%' : '-66%'}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-serif">Ahorro en bombeo por gravedad y solar.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-slate-400 block text-[10px]">VULNERABILIDAD A HELADA SUR</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-black ${
                  transitionPhase === 'actual' ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {transitionPhase === 'actual' ? 'Alta (85%)' : transitionPhase === 'phase1' ? 'Media (45%)' : 'Baja (18%)'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-serif">Freno eólico con cortavientos nativos.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-slate-400 block text-[10px]">AUTONOMÍA SOLAR BIFACIAL</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-400">
                  {transitionPhase === 'actual' ? '0 kWp' : transitionPhase === 'phase1' ? '3.2 kWp' : '9.9 kWp'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-serif">Inyección neta y bombeo sin red.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-slate-400 block text-[10px]">INVERSIÓN ESTIMADA DE FASE</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">
                  {transitionPhase === 'actual' ? '$0 CLP' : transitionPhase === 'phase1' ? '$280.000 CLP' : transitionPhase === 'phase2' ? '$650.000 CLP' : '$1.800.000 CLP'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-serif">Retorno en &lt;14 meses por luz y fruta salvada.</p>
            </div>
          </div>

          {/* Guía Paso a Paso de Transición según la Fase */}
          <div className="p-6 rounded-3xl bg-black/50 border border-emerald-500/30 space-y-4">
            <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Instrucciones de Campo para el Predio (Fase Activa: {transitionPhase.toUpperCase()})</span>
            </h4>

            {transitionPhase === 'actual' && (
              <div className="space-y-3 text-xs font-serif text-slate-300">
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-600/40 text-rose-200">
                  ⚠️ <strong>Diagnóstico del Predio de mi Tío (Problemas Detectados):</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>La motobomba bombea agua hacia la cota más alta en horario punta eléctrico (consumo excesivo de dinero en boleta).</li>
                    <li>Las hileras de cerezos y viñas están orientadas perpendicularmente a los vientos fríos del sur, canalizando aire helado a las hondonadas.</li>
                    <li>No existen zanjas de infiltración: el agua de lluvia escurre y lava el suelo fértil hacia el camino vecinal.</li>
                    <li>El invernadero actual recibe sombra de árboles no productivos en los meses de invierno.</li>
                  </ul>
                </div>
              </div>
            )}

            {transitionPhase === 'phase1' && (
              <div className="space-y-3 text-xs font-serif text-slate-300">
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-600/40 text-amber-200">
                  🌱 <strong>Paso 1 (Inmediato / Recursos Mínimos):</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Reconfiguración de Turnos de Riego:</strong> Pasar el encendido de motobomba de las 18:00 hrs a las 23:00 hrs (tarifa valle), reduciendo la factura un 35% de inmediato con cero inversión de maquinaria.</li>
                    <li><strong>Plantación de Franja Cortaviento Viva:</strong> Sembrar 60 plántulas de Quillay y Peumo en el deslinde sur para desviar la corriente de aire frío de la cordillera.</li>
                    <li><strong>Mulching de Paja en Cuarteles Críticos:</strong> Cobertura de suelo con restos de avena para reducir la evaporación directa.</li>
                  </ul>
                </div>
              </div>
            )}

            {transitionPhase === 'phase2' && (
              <div className="space-y-3 text-xs font-serif text-slate-300">
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-600/40 text-cyan-200">
                  💧 <strong>Paso 2 (Trazado Keyline & Infiltración Pasiva):</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Zanjas en Contorno (Swales):</strong> Con arado subsolador en 1 jornada, trazar 2 curvas de nivel en la cota media para cosechar 180.000 litros de agua por evento de lluvia.</li>
                    <li><strong>Alimentación del Tranque por Gravedad:</strong> Conectar el rebose de las zanjas hacia el tranque A107 sin usar motobombas eléctricas.</li>
                    <li><strong>Reubicación de Camas de Compost:</strong> Mover las pilas de abono orgánico en la cabecera del huerto para que los lixiviados nutran el cuartel biointensivo por gravedad.</li>
                  </ul>
                </div>
              </div>
            )}

            {transitionPhase === 'phase3' && (
              <div className="space-y-3 text-xs font-serif text-slate-300">
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-600/40 text-emerald-200">
                  ☀️ <strong>Paso 3 (Independencia Energética & Microclima Maduro):</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Agrovoltaica Bifacial:</strong> 18 paneles Tier-1 orientados 15° Norte que alimentan la bomba sumergible y brindan sombra para pastoreo ovino en verano.</li>
                    <li><strong>Masa Térmica del Tranque:</strong> El espejo de agua de 1.2 ha estabiliza la temperatura nocturna, elevando en +1.8°C la temperatura en el cuartel de frutales adyacente.</li>
                    <li><strong>Autonomía Total:</strong> Ahorro neto anual de $1.850.000 CLP en electricidad y fertilizantes sintéticos.</li>
                  </ul>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* MODO 3: AGROTWIN REGIONAL PARRAL & RETIRO (FORMATO ESTRATÉGICO CIV VI MACRO) */}
      {(viewMode === 'REGIONAL' || twinFormat === 'REGIONAL') && (
        <div className="p-6 space-y-6 animate-fadeIn bg-[#071810]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  MACRO-ESCALA GIS & CUENCA HIDROGRÁFICA
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-900/80 text-cyan-300 border border-cyan-500/40">
                  Civ VI Macro Zoom Out
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>AgroTwin Regional: Cuenca de Parral & Retiro (Maule Sur)</span>
              </h3>
              <p className="text-xs text-slate-300 font-serif">
                Monitoreo satelital macro a menor resolución (10m - 30m) con calibración en tiempo real por la red de boyas y predios centinela terrestres.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-blue-950 text-cyan-300 border border-blue-700 font-bold">
                Cuenca Ríos Longaví & Perquilauquén • 122.000 ha
              </span>
              <button
                onClick={() => {
                  setTwinFormat('PREDIAL');
                  setViewMode('TRANSITION');
                }}
                className="px-3 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-200 border border-emerald-600 font-bold flex items-center gap-1.5"
              >
                <span>Bajar al Predio Meniels</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* BANNER DESTACADO: NUEVA APP DEDICADA AGROTWIN REGIONAL (PUERTO 7774) */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/60 shadow-2xl group bg-black">
            <img 
              src="./assets/ui/agritwin_regional_landing.jpg" 
              alt="AgroTwin Regional Banner" 
              className="w-full h-64 sm:h-72 object-cover filter contrast-105 brightness-90 group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg shrink-0 bg-[#091810]">
                  <img src="./assets/ui/logo_agritwin_regional.jpg" alt="Logo Regional" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-lg text-white font-serif">AgroTwin Regional • Aplicación Independiente</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-black uppercase">Puerto 7774</span>
                  </div>
                  <p className="text-xs text-amber-100/80 font-serif">
                    Simulación de Riesgo de Incendios FWI, Viento Puelche y Crecidas Fluviales TWI para 122.000 ha.
                  </p>
                </div>
              </div>

              <a 
                href="http://localhost:7774" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs font-mono transition-all shadow-xl active:scale-95 flex items-center gap-2 shrink-0"
              >
                <ExternalLink className="w-4 h-4 text-slate-950" />
                <span>Abrir AgroTwin Regional (:7774)</span>
              </a>
            </div>
          </div>

          {/* BANNER COMPARATIVO: PROPUESTA DE DIFERENCIAS ESTILO CIVILIZATION VI */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-[#06202a] to-slate-950 border border-cyan-500/30 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-cyan-300 font-mono flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Diferencias de Formato: Civilisation VI Micro (Predio) vs Macro (Regional)</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Diseño Cartográfico de Escala</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-serif text-slate-300">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-emerald-400 font-bold font-mono text-xs block">🏡 Formato Predial (Táctico Micro):</span>
                <p>
                  Grilla de micro-hexágonos de cuartel, textura PBR de suelo con relieve exagerable (0.5x - 2.5x), 3 estratos radiculares geológicos (0-20, 20-60, 60-100cm), hileras de cerezos individuales, aspersores y postes de sensores KioT en 3D.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-cyan-400 font-bold font-mono text-xs block">🗺️ Formato Regional (Estratégico Macro Zoom Out):</span>
                <p>
                  Niebla de guerra cartográfica (Fog of War), relieve topográfico sombreado (Hillshade DEM) de 122.000 ha, hidrografía de cuenca fluvial, vectores de viento Puelche seco, capas LULC independientes y red de boyas centinela terrestres.
                </p>
              </div>
            </div>
          </div>

          {/* SELECTOR DE CAPAS LULC & BOYAS (TOGGLES INDEPENDIENTES) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Capas de Cobertura de Suelo (LULC) & Red Terrestre (Activa o desactiva con libertad):</span>
              </span>

              {/* Botones de Presets Rápidos */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                <button
                  onClick={() => setAllRegionalLayers(true)}
                  className="px-2 py-0.5 rounded bg-blue-900/60 hover:bg-blue-800 text-cyan-200 border border-blue-700"
                >
                  Todas (122k ha)
                </button>
                <button
                  onClick={() => setActiveRegionalLayers({
                    native_forest: false,
                    agriculture: false,
                    water: false,
                    mountain: false,
                    monoculture: true,
                    urban: false,
                    towns: true,
                    buoys: true
                  })}
                  className="px-2 py-0.5 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700"
                >
                  🔥 Foco Piro-Riesgo
                </button>
                <button
                  onClick={() => setActiveRegionalLayers({
                    native_forest: true,
                    agriculture: true,
                    water: true,
                    mountain: true,
                    monoculture: false,
                    urban: false,
                    towns: false,
                    buoys: true
                  })}
                  className="px-2 py-0.5 rounded bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700"
                >
                  💧 Foco Hídrico
                </button>
                <button
                  onClick={() => setAllRegionalLayers(false)}
                  className="px-2 py-0.5 rounded bg-black/40 hover:bg-black/60 text-slate-400 border border-white/10"
                >
                  Limpiar
                </button>
              </div>
            </div>

            {/* 8 Toggles Independientes Multi-Select */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs font-mono">
              
              {/* 1. Bosque Nativo */}
              <button
                onClick={() => toggleRegionalLayer('native_forest')}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  activeRegionalLayers.native_forest
                    ? 'bg-emerald-900/90 text-white border-emerald-400 shadow-md ring-1 ring-emerald-400'
                    : 'bg-black/40 text-slate-500 border-white/10 opacity-60'
                }`}
              >
                <span className="text-base">🌳</span>
                <span className="font-bold text-[11px] leading-tight">Bosque Nativo</span>
                <span className="text-[9px] text-emerald-300 font-serif">18.4k ha</span>
              </button>

              {/* 2. Agrícola Tradicional */}
              <button
                onClick={() => toggleRegionalLayer('agriculture')}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  activeRegionalLayers.agriculture
                    ? 'bg-amber-900/90 text-white border-amber-400 shadow-md ring-1 ring-amber-400'
                    : 'bg-black/40 text-slate-500 border-white/10 opacity-60'
                }`}
              >
                <span className="text-base">🌾</span>
                <span className="font-bold text-[11px] leading-tight">Agrícola / Arroz</span>
                <span className="text-[9px] text-amber-300 font-serif">42.6k ha</span>
              </button>

              {/* 3. Agua & Embalses */}
              <button
                onClick={() => toggleRegionalLayer('water')}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  activeRegionalLayers.water
                    ? 'bg-blue-900/90 text-white border-blue-400 shadow-md ring-1 ring-blue-400'
                    : 'bg-black/40 text-slate-500 border-white/10 opacity-60'
                }`}
              >
                <span className="text-base">💧</span>
                <span className="font-bold text-[11px] leading-tight">Embalses & Ríos</span>
                <span className="text-[9px] text-blue-300 font-serif">8.2k ha</span>
              </button>

              {/* 4. Montañas */}
              <button
                onClick={() => toggleRegionalLayer('mountain')}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  activeRegionalLayers.mountain
                    ? 'bg-stone-800 text-white border-stone-400 shadow-md ring-1 ring-stone-400'
                    : 'bg-black/40 text-slate-500 border-white/10 opacity-60'
                }`}
              >
                <span className="text-base">⛰️</span>
                <span className="font-bold text-[11px] leading-tight">Montañas / Andes</span>
                <span className="text-[9px] text-stone-300 font-serif">14.5k ha</span>
              </button>

              {/* 5. Monocultivo Pino */}
              <button
                onClick={() => toggleRegionalLayer('monoculture')}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  activeRegionalLayers.monoculture
                    ? 'bg-rose-950 text-white border-rose-500 shadow-md ring-1 ring-rose-400'
                    : 'bg-black/40 text-slate-500 border-white/10 opacity-60'
                }`}
              >
                <span className="text-base">🌲</span>
                <span className="font-bold text-[11px] leading-tight">Monocultivo Pino</span>
                <span className="text-[9px] text-rose-300 font-serif">31.8k ha</span>
              </button>

              {/* 6. Urbano */}
              <button
                onClick={() => toggleRegionalLayer('urban')}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  activeRegionalLayers.urban
                    ? 'bg-slate-700 text-white border-slate-400 shadow-md ring-1 ring-slate-400'
                    : 'bg-black/40 text-slate-500 border-white/10 opacity-60'
                }`}
              >
                <span className="text-base">🏙️</span>
                <span className="font-bold text-[11px] leading-tight">Centros Urbanos</span>
                <span className="text-[9px] text-slate-300 font-serif">4.2k ha</span>
              </button>

              {/* 7. Poblados Rurales */}
              <button
                onClick={() => toggleRegionalLayer('towns')}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  activeRegionalLayers.towns
                    ? 'bg-purple-900/90 text-white border-purple-400 shadow-md ring-1 ring-purple-400'
                    : 'bg-black/40 text-slate-500 border-white/10 opacity-60'
                }`}
              >
                <span className="text-base">🏘️</span>
                <span className="font-bold text-[11px] leading-tight">Villorrios Rurales</span>
                <span className="text-[9px] text-purple-300 font-serif">2.3k ha</span>
              </button>

              {/* 8. Boyas Centinela */}
              <button
                onClick={() => toggleRegionalLayer('buoys')}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  activeRegionalLayers.buoys
                    ? 'bg-cyan-900/90 text-white border-cyan-400 shadow-md ring-1 ring-cyan-400'
                    : 'bg-black/40 text-slate-500 border-white/10 opacity-60'
                }`}
              >
                <span className="text-base">📡</span>
                <span className="font-bold text-[11px] leading-tight">Boyas Centinela</span>
                <span className="text-[9px] text-cyan-300 font-serif">4 Nodos KioT</span>
              </button>

            </div>
          </div>

          {/* BARRA DE KPIS REGIONALES CALCULADOS EN TIEMPO REAL */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            
            {/* KPI 1: Superficie Activa */}
            <div className="p-4 rounded-2xl bg-black/50 border border-cyan-500/30 space-y-1">
              <span className="text-slate-400 block text-[10px]">SUPERFICIE FILTRADA EN PANTALLA</span>
              <span className="text-2xl font-black text-cyan-300">
                {(
                  (activeRegionalLayers.native_forest ? 18400 : 0) +
                  (activeRegionalLayers.agriculture ? 42600 : 0) +
                  (activeRegionalLayers.water ? 8200 : 0) +
                  (activeRegionalLayers.mountain ? 14500 : 0) +
                  (activeRegionalLayers.monoculture ? 31800 : 0) +
                  (activeRegionalLayers.urban ? 4200 : 0) +
                  (activeRegionalLayers.towns ? 2300 : 0)
                ).toLocaleString('es-CL')} ha
              </span>
              <p className="text-[10px] text-slate-400 font-serif">De un total de 122.000 ha de cuenca.</p>
            </div>

            {/* KPI 2: Riesgo de Incendio Ponderado */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-slate-400 block text-[10px]">PIRO-RIESGO FWI PONDERADO</span>
              <span className={`text-2xl font-black ${
                activeRegionalLayers.monoculture ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {activeRegionalLayers.monoculture ? '38.4 FWI (Alto)' : '18.2 FWI (Bajo)'}
              </span>
              <p className="text-[10px] text-slate-400 font-serif">
                {activeRegionalLayers.monoculture ? 'Carga de biomasa seca en plantaciones' : 'Matriz de baja inflamabilidad'}
              </p>
            </div>

            {/* KPI 3: Viento Puelche Cordillerano */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-slate-400 block text-[10px]">VECTOR VIENTO PUELCHE (E-SE)</span>
              <span className="text-2xl font-black text-amber-400">
                36 km/h • 14% HR
              </span>
              <p className="text-[10px] text-slate-400 font-serif">Corredor cordillerano hacia el llano.</p>
            </div>

            {/* KPI 4: Red de Boyas In Situ */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-slate-400 block text-[10px]">BOYAS CENTINELA TERRESTRES</span>
              <span className="text-2xl font-black text-white">
                {activeRegionalLayers.buoys ? '4 Conectadas' : '0 (Ocultas)'}
              </span>
              <p className="text-[10px] text-emerald-400 font-serif">Uptime 99.8% • Telemetría LoRa</p>
            </div>

          </div>

          {/* RED DE BOYAS CENTINELA EN TERRENO (GROUND-TRUTH MESH) */}
          {activeRegionalLayers.buoys && (
            <div className="p-5 rounded-3xl bg-black/60 border border-cyan-500/40 space-y-4">
              <div className="flex items-center justify-between border-b border-cyan-800/60 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <h4 className="font-bold text-sm text-cyan-300">
                    Boyas Centinela In Situ Activas (Calibración Terrestre en Vivo)
                  </h4>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-700">
                  Ground-Truth de Cuenca
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                
                {/* Boya 1: Meniels */}
                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-300 font-bold">📍 Boya Meniels (Parral)</span>
                    <span className="text-[10px] text-emerald-400">Predio Tío</span>
                  </div>
                  <div className="text-white font-extrabold text-sm">Humedad: 36.2% • Temp: 18.5°C</div>
                  <span className="text-[10px] text-slate-300 block font-serif">Riego Keyline activo • CWSI 0.25</span>
                </div>

                {/* Boya 2: Remulcao */}
                <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-rose-300 font-bold">📍 Boya Remulcao (Retiro)</span>
                    <span className="text-[10px] text-rose-400 font-bold animate-pulse">Alerta FWI 42</span>
                  </div>
                  <div className="text-white font-extrabold text-sm">Humedad: 16.5% • Temp: 27.2°C</div>
                  <span className="text-[10px] text-slate-300 block font-serif">Interfaz monocultivo pino seco</span>
                </div>

                {/* Boya 3: Embalse Bullileo */}
                <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-300 font-bold">📍 Embalse Bullileo</span>
                    <span className="text-[10px] text-blue-400">Precordillera</span>
                  </div>
                  <div className="text-white font-extrabold text-sm">Cota: 88% • Caudal: 18.4 m³/s</div>
                  <span className="text-[10px] text-slate-300 block font-serif">Reserva hídrica cuenca Longaví</span>
                </div>

                {/* Boya 4: El Boldo */}
                <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/40 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300 font-bold">📍 Fundo El Boldo</span>
                    <span className="text-[10px] text-purple-400">Curicó</span>
                  </div>
                  <div className="text-white font-extrabold text-sm">Humedad: 34.0% • Temp: 19.1°C</div>
                  <span className="text-[10px] text-slate-300 block font-serif">Frutales y agrofloresta madura</span>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* ─── CANVAS 3D INTERACTIVO THREE.JS (MODOS ENTERPRISE, TERRITORIAL, ESG, STUDIO) ─── */}
      {!['REPORTS', 'TRANSITION', 'REGIONAL'].includes(viewMode) && (
        <div className="relative w-full h-[520px] sm:h-[600px] bg-[#020805] overflow-hidden">
          
          {/* Iframe que incrusta el motor 3D local en puerto 7773 */}
          <iframe
            ref={iframeRef}
            src={serverUrl}
            title="AgriTwin 3D Viewport"
            className="w-full h-full border-0"
            onLoad={() => setIsIframeLoaded(true)}
          />

          {/* Loader Overlay */}
          {!isIframeLoaded && (
            <div className="absolute inset-0 bg-[#071810] flex flex-col items-center justify-center gap-3 z-10">
              <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-emerald-300 tracking-wider">
                Iniciando Motor 3D & Telemetría KioT...
              </span>
            </div>
          )}

          {/* HUD Overlay Bottom */}
          <div className="absolute bottom-4 left-4 right-4 bg-[#071810]/85 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300">Humedad Suelo Media:</span>
                <span className="text-white font-extrabold">{biophysicalData.avgMoisture}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-slate-400">
                <span>CWSI:</span>
                <span className="text-amber-400 font-bold">{biophysicalData.enterprise.cwsi}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-slate-400">Perfil Activo:</span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-900 text-emerald-200 font-bold border border-emerald-600/50">
                {viewMode}
              </span>
            </div>
          </div>

        </div>
      )}

      {/* ─── MODAL BIO-SIMULADOR FAO-56 ─── */}
      {showBioSimModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0B2519] border border-emerald-500/40 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl text-white font-sans">
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Simulación Biofísica FAO-56 Penman-Monteith</span>
              </h3>
              <button onClick={() => setShowBioSimModal(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              El modelo calcula la evapotranspiración de referencia ($ET_0$) y la lámina de reposición para evitar estrés celular en brotes de frutales y viñas del Maule.
            </p>
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-900">
                <span className="text-slate-400 text-[10px] block">ET0 Calculada</span>
                <span className="text-emerald-400 font-bold text-base">{biophysicalData.enterprise.et0PenmanMonteith} mm/día</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-900">
                <span className="text-slate-400 text-[10px] block">Riego Recomendado</span>
                <span className="text-amber-400 font-bold text-base">{biophysicalData.enterprise.irrigationDurationMin} minutos</span>
              </div>
            </div>
            <button
              onClick={() => setShowBioSimModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              Cerrar Simulador
            </button>
          </div>
        </div>
      )}

      {/* ─── MODAL ALERTAS KIOT WHATSAPP ─── */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0B2519] border border-emerald-500/40 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl text-white font-sans">
            <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Consola de Alertas KioT (WhatsApp / Push)</span>
              </h3>
              <button onClick={() => setShowWhatsAppModal(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>
            <div className="p-4 rounded-2xl bg-[#071810] border border-emerald-900 font-mono text-xs space-y-2">
              <div className="text-emerald-400 font-bold">📱 Vista Previa Mensaje Agrónomo:</div>
              <p className="text-slate-200 font-serif text-[11px] leading-relaxed">
                🚨 <strong>ALERTA HELADA PARRAL:</strong> Sensor IOT-SN-05 registró caída a {biophysicalData.enterprise.frostMinTemp}°C a las {biophysicalData.enterprise.frostHourPredict} en {biophysicalData.enterprise.frostLocation}. Microaspersores activados automáticamente para rescate de brotes.
              </p>
            </div>
            <button
              onClick={() => setShowWhatsAppModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
