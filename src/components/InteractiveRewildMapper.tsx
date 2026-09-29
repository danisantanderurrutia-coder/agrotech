import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Map, Layers, Eye, ShieldCheck, Sparkles, Trees, Award, ArrowUpRight, 
  BarChart3, CheckCircle, QrCode, Globe, FileText, Check, Shield
} from 'lucide-react';

interface InteractiveRewildMapperProps {
  initialTab?: 'visor' | 'rewild' | 'pasaporte';
}

export const InteractiveRewildMapper: React.FC<InteractiveRewildMapperProps> = ({ initialTab = 'visor' }) => {
  const [currentTab, setCurrentTab] = useState<'visor' | 'rewild' | 'pasaporte'>(initialTab);
  const [activeLayer, setActiveLayer] = useState<'ndvi' | 'thermal' | 'carbon'>('ndvi');
  const [hectares, setHectares] = useState<number>(45);
  const [issuedTokens, setIssuedTokens] = useState<number>(12);
  const [qrGenerated, setQrGenerated] = useState<boolean>(false);

  // BioToken Rewild calculator formulas
  const estimatedCO2 = (hectares * 3.8).toFixed(1);
  const pbcUnits = Math.round(hectares * 2.4);

  const handleIssueToken = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F0FF', '#E5A93C', '#10B981']
    });
    setIssuedTokens(prev => prev + 1);
  };

  const handleGenerateQR = () => {
    setQrGenerated(true);
    setTimeout(() => setQrGenerated(false), 5000);
  };

  return (
    <section id="gis-demo" className="py-10 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
      
      {/* Product Subtabs Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-1">
          <span className="text-amber-800 font-sans text-xs font-bold uppercase">TECNOLOGÍA SATELITAL MULTIESPECTRAL</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2519]">Inteligencia Satelital & Certificación ESG</h2>
        </div>

        {/* 3 Distinct Product Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 font-sans text-xs">
          <button
            onClick={() => setCurrentTab('visor')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition-all ${
              currentTab === 'visor'
                ? 'bg-[#0B2519] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-amber-400" />
            <span>1. Visor Satelital Predial</span>
          </button>

          <button
            onClick={() => setCurrentTab('rewild')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition-all ${
              currentTab === 'rewild'
                ? 'bg-[#0B2519] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trees className="w-3.5 h-3.5 text-emerald-400" />
            <span>2. RewildMapper SaaS</span>
          </button>

          <button
            onClick={() => setCurrentTab('pasaporte')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition-all ${
              currentTab === 'pasaporte'
                ? 'bg-[#0B2519] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Pasaporte Verde UE</span>
          </button>
        </div>
      </div>

      {/* PRODUCT 1: VISOR SATELITAL PREDIAL */}
      {currentTab === 'visor' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Map className="w-3.5 h-3.5 text-emerald-700" />
              <span>Producto #1 • Diagnóstico Satelital Abierto</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#0B2519]">Visor Satelital Predial (Sentinel-2 L2A)</h3>
            <p className="text-slate-600 text-sm font-serif">
              Accede a capas espectrales NDVI, índice hídrico NDWI y comportamiento térmico de suelo con resolución espacial de 10m por píxel, integrando modelos meteorológicos de la Agencia Espacial Europea.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* GIS Map View Frame */}
            <div className="lg:col-span-8 bg-[#0B2519] p-5 rounded-2xl border border-emerald-500/30 space-y-4 text-white shadow-xl">
              
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono bg-[#071810] p-3 rounded-xl border border-emerald-900">
                <div className="flex items-center gap-2 text-emerald-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SENTINEL-2 L2A • Predio Maule-Cordillera A4</span>
                </div>

                <div className="flex items-center gap-1 bg-[#0B2519] p-1 rounded-lg border border-emerald-900">
                  <button
                    onClick={() => setActiveLayer('ndvi')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                      activeLayer === 'ndvi' ? 'bg-emerald-600 text-white' : 'text-emerald-200/70 hover:text-white'
                    }`}
                  >
                    NDVI Vegetación
                  </button>
                  <button
                    onClick={() => setActiveLayer('thermal')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                      activeLayer === 'thermal' ? 'bg-amber-600 text-white' : 'text-emerald-200/70 hover:text-white'
                    }`}
                  >
                    Térmico Suelo
                  </button>
                  <button
                    onClick={() => setActiveLayer('carbon')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                      activeLayer === 'carbon' ? 'bg-teal-600 text-white' : 'text-emerald-200/70 hover:text-white'
                    }`}
                  >
                    Carbono
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-emerald-900 group shadow-md">
                <img 
                  src="./rewildmapper-gis.png" 
                  alt="Visor Satelital Predial View" 
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700 bg-[#071810]"
                />

                {activeLayer === 'ndvi' && (
                  <div className="absolute inset-0 bg-emerald-500/10 mix-blend-color-dodge pointer-events-none" />
                )}
                {activeLayer === 'thermal' && (
                  <div className="absolute inset-0 bg-amber-500/15 mix-blend-color-burn pointer-events-none" />
                )}
                {activeLayer === 'carbon' && (
                  <div className="absolute inset-0 bg-teal-500/10 mix-blend-soft-light pointer-events-none" />
                )}

                <div className="absolute bottom-3 left-3 bg-[#0B2519]/90 backdrop-blur-md p-3 rounded-lg border border-emerald-500/30 text-xs font-mono space-y-1.5 max-w-[220px]">
                  <span className="text-emerald-400 font-bold block text-[10px] uppercase">
                    CAPA ACTIVA: {activeLayer.toUpperCase()}
                  </span>
                  <div className="h-2 rounded bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-500" />
                  <div className="flex justify-between text-[9px] text-emerald-200/80">
                    <span>Suelo Expuesto</span>
                    <span>Bosque Nativo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Info Panel */}
            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 font-sans text-xs text-slate-700">
              <span className="text-amber-800 font-bold block text-xs uppercase">BENEFICIOS DEL VISOR:</span>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Evaluación Hídrica Pre-Compra:</strong> Analiza la disponibilidad de agua subterránea a 10 años.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Histórico de Heladas:</strong> Registro acumulado de eventos bajo 0°C en los últimos 15 años.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Resolución Espacial:</strong> 10 metros por píxel con pase de satélite cada 5 días.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* PRODUCT 2: REWILDMAPPER SAAS */}
      {currentTab === 'rewild' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Trees className="w-3.5 h-3.5 text-emerald-700" />
              <span>Producto #2 • SaaS de Biodiversidad & Carbono</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#0B2519]">RewildMapper: Motor de Certificación ESG</h3>
            <p className="text-slate-600 text-sm font-serif">
              Calcula y monetiza la conservación del bosque esclerófilo nativo en tu fundo. Emite Unidades de Biodiversidad Vegetal (PBC) y cuantifica la captura anual de CO2e.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Calculator Panel */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-1 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2 text-amber-700 font-sans text-xs font-bold uppercase">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Calculadora de Activos de Biodiversidad (PBC)</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900">Simulador Predial Maulino</h4>
              </div>

              {/* Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-slate-700 font-medium">Superficie de Bosque Nativo a Conservar:</span>
                  <span className="text-emerald-800 font-bold text-sm">{hectares} Hectáreas</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="200" 
                  step="5" 
                  value={hectares} 
                  onChange={(e) => setHectares(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-sans uppercase font-bold">CAPTURA CO2e</span>
                  <span className="text-emerald-800 font-bold text-base">{estimatedCO2} Ton / año</span>
                  <p className="text-[10px] text-slate-500 font-sans">Tier 2 IPCC Satelital</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-slate-500 text-[10px] block font-sans uppercase font-bold">UNIDADES BIODIVERSIDAD</span>
                  <span className="text-amber-700 font-bold text-base">{pbcUnits} Certificados</span>
                  <p className="text-[10px] text-slate-500 font-sans">Índice Vegetal Maule</p>
                </div>
              </div>

              <button
                onClick={handleIssueToken}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-600 text-white font-bold text-xs font-sans uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Emitir Certificado PBC (Demostración)</span>
              </button>
            </div>

            {/* Info Image Card */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 relative h-80 shadow-sm group">
              <img 
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80" 
                alt="Bosque Nativo Maule RewildMapper" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent p-6 flex flex-col justify-end text-white space-y-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-[#0B2519] font-bold text-[10px] w-fit">
                  MONITOREO CONTINUO SENTINEL
                </span>
                <h4 className="font-extrabold text-xl">Bosque Esclerófilo Nativo Maulino</h4>
                <p className="text-xs text-emerald-100/80 font-serif">Protección de Peumo, Quillay, Boldo y Maitén integrados al sistema de créditos ecológicos auditados.</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* PRODUCT 3: PASAPORTE VERDE UE */}
      {currentTab === 'pasaporte' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
              <QrCode className="w-3.5 h-3.5 text-amber-700" />
              <span>Producto #3 • Certificación para Exportación a Europa</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#0B2519]">Pasaporte Verde de Exportación (EUDR & CSRD)</h3>
            <p className="text-slate-600 text-sm font-serif">
              Genera la certificación digital exigida por supermercados y compradores de frutas y vinos en la Unión Europea. Código QR dinámico impreso en pallets con auditoría mensual no-deforestación.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* QR Mockup & Verification Panel */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-emerald-800 font-bold text-xs block uppercase">ESTÁNDAR CSRD / EUDR COMPLIANCE</span>
                  <h4 className="text-xl font-bold text-[#0B2519]">Pallet QR Code Generator</h4>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                  +12-18% Sobreprecio UE
                </span>
              </div>

              {qrGenerated && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-sans space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>¡Pasaporte Verde Generado Exitosamente!</span>
                  </div>
                  <p>Código QR asignado al Pallet #UE-MAULE-8842. Listo para impresión y despacho a Rotterdam.</p>
                </div>
              )}

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-6">
                <div className="w-28 h-28 rounded-xl bg-white p-2 border border-slate-300 flex items-center justify-center shrink-0 shadow-sm">
                  <QrCode className="w-full h-full text-[#0B2519]" />
                </div>
                <div className="space-y-2 text-xs font-sans">
                  <span className="font-bold text-slate-900 block text-sm">Pallet ID: #UE-MAULE-8842</span>
                  <p className="text-slate-600">Verificación de cero deforestación mediante pases de satélite Sentinel-2 en los últimos 36 meses.</p>
                  <span className="text-emerald-800 font-bold block text-[11px]">✓ Auditable en Blockchain / Cloud</span>
                </div>
              </div>

              <button
                onClick={handleGenerateQR}
                className="w-full py-3 rounded-xl bg-[#0B2519] text-white font-sans font-bold text-xs hover:bg-emerald-900 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Generar Pasaporte QR de Prueba</span>
              </button>
            </div>

            {/* Benefits & Standards Checklist */}
            <div className="lg:col-span-6 bg-emerald-50/70 p-6 sm:p-8 rounded-2xl border border-emerald-200 space-y-4 font-sans text-xs text-slate-800">
              <span className="text-emerald-900 font-bold text-xs uppercase block">NORMATIVAS UE CUBIERTAS:</span>
              
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white border border-emerald-200 space-y-1">
                  <span className="font-bold text-emerald-900 block">1. Reglamento Deforestación UE (EUDR):</span>
                  <p className="text-slate-600 text-[11px]">Demuestra geolocalización predial exacta sin tala de bosque nativo posterior a 2020.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-emerald-200 space-y-1">
                  <span className="font-bold text-emerald-900 block">2. Directiva CSRD (Reporte de Sostenibilidad):</span>
                  <p className="text-slate-600 text-[11px]">Cálculo de huella de carbono y biodiversidad integrado al reporte del importador europeo.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-emerald-200 space-y-1">
                  <span className="font-bold text-emerald-900 block">3. Pasaporte Digital de Producto (DPP):</span>
                  <p className="text-slate-600 text-[11px]">Enlace accesible por el consumidor final en Europa escaneando el código en el empaque.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
