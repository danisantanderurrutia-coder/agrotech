import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, Smartphone, Zap, Shield, Flame, Droplets, ArrowRight, 
  RefreshCw, Layers, CheckCircle2, AlertTriangle, TrendingUp, DollarSign, 
  Database, Cpu, Sprout, Building, Users, Sparkles, ChevronRight, Play, 
  Check, Copy, ExternalLink, Sliders, ShieldCheck, HelpCircle, FileText
} from 'lucide-react';

export const DatawheelRoadmapSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flywheel' | 'stacking' | 'roadmap' | 'calculator' | 'pitch'>('flywheel');
  
  // WhatsApp Mockup State
  const [waStep, setWaStep] = useState<number>(2);
  const [selectedCrop, setSelectedCrop] = useState<'cherry' | 'vineyard' | 'hazelnut' | 'avocado'>('cherry');
  const [selectedZone, setSelectedZone] = useState<'curico' | 'linares' | 'rancagua' | 'cauquenes'>('curico');
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  // Growth Simulator State
  const [agroAlertaUsers, setAgroAlertaUsers] = useState<number>(120);
  const [stackingProRate, setStackingProRate] = useState<number>(35); // 35%
  const [hardwareUpgradeRate, setHardwareUpgradeRate] = useState<number>(18); // 18%

  // Simulation Calculations
  const sim = useMemo(() => {
    const freeUsers = Math.round(agroAlertaUsers * (1 - (stackingProRate / 100)));
    const proUsers = Math.round(agroAlertaUsers * (stackingProRate / 100));
    
    // Average monthly revenue per pro stacked user (blend of Pocket Pro $15 + BV Agua $45 + BV Fuego $60)
    // Avg ARPU Pro = ~$55 USD/mo = ~52,000 CLP/mo
    const mrrSoftwareClp = proUsers * 52000;
    const arrSoftwareClp = mrrSoftwareClp * 12;

    // Hardware upgrades in Phase 2:
    const hwUpgrades = Math.round(proUsers * (hardwareUpgradeRate / 100));
    const hwRevenueClp = hwUpgrades * 220000;
    const hwMarginClp = hwUpgrades * (220000 - 92000); // 58% margin

    // Estimated traditional Hardware CAC ($1,200 USD = ~1,140,000 CLP per deal) vs Micro-SaaS CAC ($18 USD = ~17,100 CLP)
    const traditionalCacTotal = hwUpgrades * 1140000;
    const microSaasCacTotal = agroAlertaUsers * 17100;
    const cacSavingsClp = Math.max(0, traditionalCacTotal - microSaasCacTotal);

    // Hectares monitored (average 16 ha per farmer)
    const hectaresMonitored = agroAlertaUsers * 16.5;

    return {
      freeUsers,
      proUsers,
      mrrSoftwareClp,
      arrSoftwareClp,
      hwUpgrades,
      hwRevenueClp,
      hwMarginClp,
      cacSavingsClp,
      hectaresMonitored,
      softwareGrossMarginPercent: 91
    };
  }, [agroAlertaUsers, stackingProRate, hardwareUpgradeRate]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?view=internal&tab=datawheel`;
    navigator.clipboard.writeText(url);
    setHasCopiedLink(true);
    setTimeout(() => setHasCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-10 animate-fadeIn">

      {/* Hero Banner Strategy */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#06180E] via-[#0B2519] to-[#0D1F2D] border border-emerald-500/30 p-6 md:p-10 shadow-2xl overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Arquitectura Comercial 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Software-First • Zero Stock Risk
              </span>
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-emerald-300 hover:text-white text-xs font-mono transition-all hover:bg-slate-800"
              title="Copiar enlace directo a esta vista"
            >
              {hasCopiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">¡Enlace copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Compartir con Equipo</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Estrategia <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Data Flywheel</span> & <span className="text-amber-400">AgroAlerta</span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 font-serif leading-relaxed">
              El Caballo de Troya comercial de Chile AgroTech: cómo pasar de un Micro-SaaS de bolsillo en WhatsApp a un Gemelo Digital de cuenca completo mediante <strong>Feature Stacking</strong> secuencial y sin riesgo de inventario físico.
            </p>
          </div>

          {/* Quick Metrics KPI Strip */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm">
              <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold">CAC AgroAlerta</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">$18 USD</div>
              <div className="text-[10px] text-emerald-200/60 font-serif">vs. $1,200 en venta fría hardware</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm">
              <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold">Tiempo Onboarding</div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5">60 seg</div>
              <div className="text-[10px] text-emerald-200/60 font-serif">WhatsApp: GPS + Rol + Cultivo</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm">
              <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold">Costo Marginal Telemetría</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-0.5">~$0 / predio</div>
              <div className="text-[10px] text-emerald-200/60 font-serif">Copernicus Sentinel-2 & ERA5</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 backdrop-blur-sm">
              <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold">Margen Bruto Software</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">91%</div>
              <div className="text-[10px] text-emerald-200/60 font-serif">Escala sin cuadrillas de campo</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/30 backdrop-blur-sm col-span-2 md:col-span-1">
              <div className="text-[11px] font-mono uppercase text-amber-400 font-bold">Hardware KioT</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">Fase 2 Upgrade</div>
              <div className="text-[10px] text-amber-200/70 font-serif">Solo a usuarios calientes de software</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-emerald-900/60 pb-3">
        <button
          onClick={() => setActiveTab('flywheel')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'flywheel'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 ring-2 ring-emerald-400/40'
              : 'bg-white dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800/60 text-slate-700 dark:text-emerald-200 hover:bg-slate-50 dark:hover:bg-emerald-900/80'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${activeTab === 'flywheel' ? 'animate-spin' : 'text-emerald-500'}`} style={{ animationDuration: '6s' }} />
          <span>1. The Data Flywheel & WhatsApp Bot</span>
        </button>

        <button
          onClick={() => setActiveTab('stacking')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'stacking'
              ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400/40'
              : 'bg-white dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800/60 text-slate-700 dark:text-emerald-200 hover:bg-slate-50 dark:hover:bg-emerald-900/80'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-500" />
          <span>2. Feature Stacking (De $0 a $350/mo)</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'roadmap'
              ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400/40'
              : 'bg-white dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800/60 text-slate-700 dark:text-emerald-200 hover:bg-slate-50 dark:hover:bg-emerald-900/80'
          }`}
        >
          <Sliders className="w-4 h-4 text-teal-400" />
          <span>3. Roadmap de 3 Fases (Software ➔ HW ➔ Ecosistema)</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-400/40'
              : 'bg-white dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800/60 text-slate-700 dark:text-emerald-200 hover:bg-slate-50 dark:hover:bg-emerald-900/80'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>4. Simulador de Conversión & CAC</span>
        </button>

        <button
          onClick={() => setActiveTab('pitch')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'pitch'
              ? 'bg-amber-500 text-slate-950 shadow-lg ring-2 ring-amber-300/40 font-black'
              : 'bg-white dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800/60 text-slate-700 dark:text-emerald-200 hover:bg-slate-50 dark:hover:bg-emerald-900/80'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-500" />
          <span>5. Argumentario para Directorio & Socios</span>
        </button>
      </div>

      {/* TAB 1: THE FLYWHEEL & WHATSAPP SIMULATOR */}
      {activeTab === 'flywheel' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Flywheel Diagram Interactive Flow */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-[#0B2519] border border-slate-200 dark:border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                      <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">El Mecanismo del Data Flywheel</h2>
                      <p className="text-xs text-slate-500 dark:text-emerald-300/70 font-mono">Autocalibración continua sin costo de levantamiento</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">Loop Virtuoso</span>
                </div>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-emerald-500/20 hover:border-emerald-400 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">1</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Captación WhatsApp (Micro-SaaS AgroAlerta)</h3>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-mono">Fricción Cero</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-serif">
                        El agricultor solo envía su ubicación o Rol por WhatsApp. Sin apps pesadas, sin inducción técnica ni visitas a terreno.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-emerald-500/20 hover:border-emerald-400 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">2</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Ingesta Automática de Polígono & Especie</h3>
                        <span className="text-[10px] bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded font-mono">Zero Survey Cost</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-serif">
                        El bot auto-delimita el polígono con catastro y geocodifica la fenología del cultivo (ej. cerezo Lapins sobre patrón Colt, semana 42).
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-emerald-500/20 hover:border-emerald-400 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">3</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Enriquecimiento de la Malla Territorial (AgriTwin Core)</h3>
                        <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-mono">Efecto Red H3</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-serif">
                        Cada predio nuevo ingresado densifica el modelo microclimático de la cuenca (Curicó, Lontué, Maule). El modelo regional aprende gradientes de helada y escorrentía.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200/80 dark:border-amber-500/30 hover:border-amber-400 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-mono font-bold text-sm flex items-center justify-center shrink-0">4</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Feature Stacking & Upsell a Hardware</h3>
                        <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded font-mono">LTV Expansion</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-serif">
                        Confiando en el bot diario, el productor activa con 1 clic BV Agua ($45k/mes), BV Fuego ($60k/mes) o solicita KioT Hardware físico para calibración sub-métrica.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-xs text-emerald-200 font-serif">
                    <strong>Resultado estratégico:</strong> Menor CAC por recomendación entre vecinos contiguos. El gemelo digital se nutre del software sin arriesgar capital en logística ni inventario.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: WhatsApp Pocket Bot Interactive Simulator */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#111B21] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[580px]">
                
                {/* Phone Header */}
                <div className="bg-[#202C33] p-4 flex items-center justify-between border-b border-slate-700/60 text-white">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-sm">
                        AA
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#202C33] rounded-full" />
                    </div>
                    <div>
                      <div className="font-bold text-sm flex items-center gap-1.5">
                        <span>AgroAlerta Pocket Bot</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">OFICIAL</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-sans">en línea • Chile AgroTech SpA</div>
                    </div>
                  </div>
                  <Smartphone className="w-5 h-5 text-slate-400" />
                </div>

                {/* Chat History Box */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0B141A] text-xs font-sans">
                  
                  {/* Message 1: Bot Welcome */}
                  <div className="flex justify-start">
                    <div className="bg-[#202C33] text-slate-100 max-w-[85%] p-3 rounded-2xl rounded-tl-sm space-y-1 shadow">
                      <p className="font-bold text-emerald-400 text-[11px]">AgroAlerta • Micro-SaaS</p>
                      <p>👋 Hola Daniel. Bienvenido a <strong>AgroAlerta Pocket</strong>. ¿En qué predio deseas activar monitoreo satelital de heladas y agua?</p>
                      <span className="text-[9px] text-slate-400 float-right">08:14</span>
                    </div>
                  </div>

                  {/* Message 2: Farmer Response */}
                  <div className="flex justify-end">
                    <div className="bg-[#005C4B] text-white max-w-[85%] p-3 rounded-2xl rounded-tr-sm space-y-1 shadow">
                      <p>📍 <strong>Fundo El Roble</strong>, Sector Los Niches, Curicó.<br/>Cultivo: Cerezo Lapins (18 ha). Rol: 1420-55.</p>
                      <span className="text-[9px] text-emerald-200/70 float-right">08:15 ✓✓</span>
                    </div>
                  </div>

                  {/* Message 3: Realtime Alert */}
                  {waStep >= 1 && (
                    <div className="flex justify-start animate-fadeIn">
                      <div className="bg-[#202C33] text-slate-100 max-w-[90%] p-3.5 rounded-2xl rounded-tl-sm space-y-2 border-l-4 border-amber-400 shadow">
                        <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>ALERTA HELADA RADIATIVA CRÍTICA</span>
                        </div>
                        <p className="text-slate-200">
                          ❄️ <strong>Madrugada Jueves (04:15 - 06:45 AM):</strong><br/>
                          Temperatura mínima prevista en cota baja de tu predio: <strong>-1.8 °C</strong>.<br/>
                          Estado fenológico: <em>Caída de pétalos</em>.<br/>
                          Riesgo daño en fruta cuajada: <strong>65%</strong>.
                        </p>
                        <div className="p-2 bg-black/40 rounded-lg text-[10px] space-y-0.5 text-emerald-200 font-mono">
                          <div>💡 Sugerencia: Encender torres de viento a las 03:45 AM.</div>
                          <div>💧 Suelo: Humedad previa recomendada &gt; 22%.</div>
                        </div>
                        <span className="text-[9px] text-slate-400 float-right">08:16</span>
                      </div>
                    </div>
                  )}

                  {/* Message 4: Upsell Trigger */}
                  {waStep >= 2 && (
                    <div className="flex justify-start animate-fadeIn">
                      <div className="bg-[#202C33] text-slate-100 max-w-[90%] p-3.5 rounded-2xl rounded-tl-sm space-y-2 border-l-4 border-emerald-400 shadow">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                          <Droplets className="w-3.5 h-3.5" />
                          <span>MÓDULO BV AGUA DISPONIBLE</span>
                        </div>
                        <p className="text-slate-200">
                          Sentinel-2 detecta estrés hídrico incipiente en Cuartel 3 (NDVI cayó de 0.78 a 0.69).<br/>
                          ¿Deseas activar balance Penman-Monteith por $45.000 CLP/mes?
                        </p>
                        <div className="flex gap-2 pt-1">
                          <button 
                            onClick={() => setActiveTab('stacking')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-1"
                          >
                            <span>Activar Módulo</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[9px] text-slate-400 float-right">08:18</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Phone Controls Simulation */}
                <div className="p-3 bg-[#202C33] border-t border-slate-700 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-300 font-mono">Simulador Bot:</div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setWaStep(1)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold ${waStep === 1 ? 'bg-amber-500 text-black' : 'bg-slate-700 text-slate-200'}`}
                    >
                      Paso 1: Alerta
                    </button>
                    <button
                      onClick={() => setWaStep(2)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold ${waStep === 2 ? 'bg-emerald-500 text-black' : 'bg-slate-700 text-slate-200'}`}
                    >
                      Paso 2: Upsell
                    </button>
                  </div>
                </div>

              </div>
              <p className="text-[11px] text-center text-slate-500 dark:text-emerald-300/60 font-serif">
                Interfaz real del flujo que experimenta el agricultor en terreno en menos de 2 minutos.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: FEATURE STACKING FUNNEL */}
      {activeTab === 'stacking' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="bg-white dark:bg-[#0B2519] border border-slate-200 dark:border-emerald-500/20 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">Monetización Progresiva</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                La Escalera de Valor: Feature Stacking en 1 Clic
              </h2>
              <p className="text-sm text-slate-600 dark:text-emerald-100/70 font-serif">
                Cómo expandir el ticket promedio mensual (ARPU) desde $0 a más de $350 USD por predio sin vender hardware en frío. Cada módulo se activa en la misma cuenta sin nueva instalación.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* Tier 0 */}
              <div className="rounded-2xl p-5 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-emerald-900/60 space-y-3 relative">
                <span className="text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">NIVEL 0 • GANCHO</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between">
                  <span>AgroAlerta Free</span>
                  <span className="text-emerald-500 font-mono text-sm">$0</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-serif">
                  Alertas meteorológicas generales de cuenca por WhatsApp. Obtiene el consentimiento, teléfono, rol y polígono del predio.
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-emerald-950 text-[11px] font-mono text-slate-500 dark:text-emerald-400">
                  🎯 Meta: Captar 500 agricultores en Maule
                </div>
              </div>

              {/* Tier 1 */}
              <div className="rounded-2xl p-5 bg-emerald-50/50 dark:bg-emerald-950/30 border-2 border-emerald-500/60 space-y-3 relative shadow-md">
                <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">NIVEL 1 • HERO PRODUCT</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between">
                  <span>AgroAlerta Pocket Pro</span>
                  <span className="text-emerald-400 font-mono text-sm">$14.990 / mes</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-serif">
                  Alertas hiperlocales a nivel de cuartel. Ventanas de helada con 72h de anticipación y aviso de vientos críticos para pulverización.
                </p>
                <div className="pt-2 border-t border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                  ⚡ Margen bruto: 96%
                </div>
              </div>

              {/* Tier 2 */}
              <div className="rounded-2xl p-5 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-emerald-900/60 space-y-3 relative">
                <span className="text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">NIVEL 2 • MÓDULO AGUA</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between">
                  <span>BV Agua Satelital</span>
                  <span className="text-teal-400 font-mono text-sm">$45.000 / mes</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-serif">
                  Evapotranspiración FAO-56 Penman-Monteith satelital, mapa de vigor NDVI/NDRE cada 5 días y horas de riego recomendadas.
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-emerald-950 text-[11px] font-mono text-teal-400">
                  💧 Ahorro hídrico: 18% a 32%
                </div>
              </div>

              {/* Tier 3 */}
              <div className="rounded-2xl p-5 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-emerald-900/60 space-y-3 relative">
                <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">NIVEL 3 • MÓDULO FUEGO</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between">
                  <span>BV Fuego & Cortafuegos</span>
                  <span className="text-amber-400 font-mono text-sm">$60.000 / mes</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-serif">
                  Detección termográfica de focos NASA FIRMS en 20 km a la redonda y cálculo de humedad de combustible seco (Puelche).
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-emerald-950 text-[11px] font-mono text-amber-400">
                  🔥 Protección perimetral activa
                </div>
              </div>

              {/* Tier 4 */}
              <div className="rounded-2xl p-5 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-emerald-900/60 space-y-3 relative">
                <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">NIVEL 4 • EXPORTACIÓN</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Pasaporte Verde EUDR</span>
                  <span className="text-blue-400 font-mono text-sm">€1.100 / lote</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-serif">
                  Certificación satelital de no-deforestación requerida para exportar avellanas, cerezas y vino a la Unión Europea.
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-emerald-950 text-[11px] font-mono text-blue-400">
                  🇪🇺 Cumplimiento legal UE obligatorio
                </div>
              </div>

              {/* Tier 5 (Upgrade Hardware) */}
              <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/40 space-y-3 relative">
                <span className="text-[10px] font-mono font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded">FASE 2 • UPGRADE FÍSICO</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center justify-between">
                  <span>KioT Estación IoT</span>
                  <span className="text-amber-400 font-mono text-sm">$220.000 CLP</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-serif">
                  Estación física in-situ para calibrar en terreno el modelo de suelo, humedad por estratos y microclima sub-canopia.
                </p>
                <div className="pt-2 border-t border-amber-500/30 text-[11px] font-mono text-amber-300">
                  ⚙️ Se ofrece SOLO a usuarios de software
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 3: THE 3-PHASE ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Phase 1 */}
            <div className="bg-white dark:bg-[#0B2519] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                    FASE 1 • AHORA (MESES 1-6)
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Software First & Data Flywheel</h3>
                  <p className="text-xs text-emerald-500 dark:text-emerald-400 font-mono font-bold">Pocket Micro-SaaS • Cero Hardware</p>
                </div>

                <p className="text-xs text-slate-600 dark:text-emerald-100/80 font-serif leading-relaxed">
                  Lanzamiento y saturación en los valles del Maule (Curicó, Linares, Talca) y O'Higgins. El agricultor entra vía WhatsApp con AgroAlerta.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-emerald-900/60">
                  <div className="text-[11px] font-mono uppercase text-slate-400 dark:text-emerald-300/70 font-bold">Habilitaciones en Fase 1:</div>
                  <ul className="text-xs space-y-1.5 text-slate-700 dark:text-emerald-100/90 font-sans">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>AgroAlerta WhatsApp (Heladas / Viento / Fuego)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Informes Satelitales Terran Express (24h)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Módulos Satelitales BV Agua & BV Fuego</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Pasaporte Verde EUDR para Exportadores</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
                🚀 Meta: 120 clientes de software y $0 stock en bodega.
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white dark:bg-[#0B2519] border border-slate-200 dark:border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                    FASE 2 • MEDIO PLAZO (MESES 7-18)
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Hardware como Upgrade de Precisión</h3>
                  <p className="text-xs text-amber-500 dark:text-amber-400 font-mono font-bold">KioT IoT Nodes • Clientes Cautivos</p>
                </div>

                <p className="text-xs text-slate-600 dark:text-emerald-100/80 font-serif leading-relaxed">
                  Solo cuando el cliente confía en las alertas satelitales diarias, se le ofrece la estación física para calibración in-situ con micro-sensores.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-emerald-900/60">
                  <div className="text-[11px] font-mono uppercase text-slate-400 dark:text-amber-300/70 font-bold">Habilitaciones en Fase 2:</div>
                  <ul className="text-xs space-y-1.5 text-slate-700 dark:text-emerald-100/90 font-sans">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Kits KioT de suelo (humedad a 30 y 60 cm)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Micro-estación meteorológica de canopia</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Fabricación bajo pedido (Just-In-Time)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Instalación y mantención con técnicos locales</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-500/20 text-[11px] font-mono text-amber-300">
                ⚙️ Meta: 40 kits vendidos a clientes existentes.
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white dark:bg-[#0B2519] border border-slate-200 dark:border-teal-500/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-mono font-bold">
                    FASE 3 • LARGO PLAZO (MES 18+)
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">Ecosistema & Living Lab Territorial</h3>
                  <p className="text-xs text-teal-500 dark:text-teal-400 font-mono font-bold">Living Lab • Regeneración • Academia</p>
                </div>

                <p className="text-xs text-slate-600 dark:text-emerald-100/80 font-serif leading-relaxed">
                  Consolidación del Living Lab ubicado donde Rudi (Parral), proyectos de resiliencia territorial de cuencas para municipios/APRs/JVRL, investigación aplicada con universidades y fondos de fomento.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-emerald-900/60">
                  <div className="text-[11px] font-mono uppercase text-slate-400 dark:text-teal-300/70 font-bold">Habilitaciones en Fase 3:</div>
                  <ul className="text-xs space-y-1.5 text-slate-700 dark:text-emerald-100/90 font-sans">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Living Lab Demostrativo (validación empírica en Parral, donde Rudi)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Modelado hidrológico y resiliencia de cuenca para municipios y APRs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Transferencia técnica, biopreparados y microbiología de suelo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>Economías regenerativas y créditos de biodiversidad/agua</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-teal-950/40 rounded-xl border border-teal-500/20 text-[11px] font-mono text-teal-300">
                🌱 Meta: Hub de I+D referente del cono sur.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: GROWTH & CONVERSION SIMULATOR */}
      {activeTab === 'calculator' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sliders Input */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0B2519] border border-slate-200 dark:border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Variables de Crecimiento</h3>
                <p className="text-xs text-slate-500 dark:text-emerald-300/70 font-mono">Modela la captura con WhatsApp y el stacking de módulos</p>
              </div>

              {/* Slider 1: AgroAlerta Users */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 dark:text-emerald-200">Usuarios AgroAlerta Captados:</span>
                  <span className="font-mono font-black text-emerald-500 dark:text-emerald-300 text-sm">{agroAlertaUsers} agricultores</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={agroAlertaUsers}
                  onChange={(e) => setAgroAlertaUsers(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-200 dark:bg-emerald-950 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>20 (Piloto Maule)</span>
                  <span>500 (Valle Central)</span>
                </div>
              </div>

              {/* Slider 2: Stacking Pro Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 dark:text-emerald-200">Tasa de Stacking Pro (Módulos de Pago):</span>
                  <span className="font-mono font-black text-amber-500 dark:text-amber-300 text-sm">{stackingProRate}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="70"
                  step="5"
                  value={stackingProRate}
                  onChange={(e) => setStackingProRate(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-200 dark:bg-emerald-950 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>10% (Conservador)</span>
                  <span>70% (Alta retención)</span>
                </div>
              </div>

              {/* Slider 3: Hardware Upgrade Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 dark:text-emerald-200">Upgrade a Hardware Físico KioT (Fase 2):</span>
                  <span className="font-mono font-black text-teal-500 dark:text-teal-300 text-sm">{hardwareUpgradeRate}% de usuarios Pro</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={hardwareUpgradeRate}
                  onChange={(e) => setHardwareUpgradeRate(Number(e.target.value))}
                  className="w-full accent-teal-500 h-2 bg-slate-200 dark:bg-emerald-950 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5% (Solo grandes)</span>
                  <span>50% (Alta intensidad)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-emerald-500/20 text-xs font-mono space-y-1.5 text-emerald-200">
                <div className="flex justify-between">
                  <span>Hectáreas Monitoreadas:</span>
                  <span className="font-bold text-white">{sim.hectaresMonitored.toLocaleString('es-CL')} ha</span>
                </div>
                <div className="flex justify-between">
                  <span>Usuarios Pro Activos:</span>
                  <span className="font-bold text-amber-300">{sim.proUsers} productores</span>
                </div>
                <div className="flex justify-between">
                  <span>Estaciones KioT Requeridas:</span>
                  <span className="font-bold text-teal-300">{sim.hwUpgrades} kits (JIT)</span>
                </div>
              </div>
            </div>

            {/* Results Output */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0B2519] border border-slate-200 dark:border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Impacto Económico SpA</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Métricas de Rentabilidad y Capital Eficiente
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">MRR Software Recurrente</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    ${Math.round(sim.mrrSoftwareClp).toLocaleString('es-CL')} <span className="text-xs font-normal text-slate-500 dark:text-emerald-300/70">CLP/mes</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-emerald-200/70 font-mono mt-0.5">
                    ARR: ${(Math.round(sim.arrSoftwareClp) / 1000000).toFixed(1)}M CLP
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <div className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">Ingreso Hardware Fase 2 (Upgrades)</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    ${Math.round(sim.hwRevenueClp).toLocaleString('es-CL')} <span className="text-xs font-normal text-slate-500 dark:text-amber-300/70">CLP</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-amber-200/70 font-mono mt-0.5">
                    Margen Hardware: ${(Math.round(sim.hwMarginClp) / 1000000).toFixed(1)}M CLP (58%)
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-teal-600 dark:text-teal-400 font-bold">Ahorro Estimado en CAC (vs. Venta en Frío)</div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                        ${(Math.round(sim.cacSavingsClp) / 1000000).toFixed(1)} Millones CLP
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs font-bold">
                      -85% CAC
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-teal-100/70 font-serif mt-2">
                    En lugar de enviar un comercial en camioneta a visitar 100 fundos (gasto en combustible, viáticos y fricción de cierre), AgroAlerta capta a los clientes mientras ellos mismos duermen y cuidan sus heladas.
                  </p>
                </div>

              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-serif leading-relaxed">
                💡 <strong>Conclusión para el Directorio:</strong> El modelo Software-First permite financiar el desarrollo y la eventual fabricación de hardware con el flujo de caja operativo de los clientes de Micro-SaaS, logrando un <em>cash-conversion cycle</em> positivo.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 5: PITCH TALKING POINTS FOR BOARD & PARTNERS */}
      {activeTab === 'pitch' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="bg-white dark:bg-[#0B2519] border border-slate-200 dark:border-emerald-500/20 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Guión de Negociación</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Cómo Defender la Estrategia ante el Equipo y Socios
              </h2>
              <p className="text-sm text-slate-600 dark:text-emerald-100/70 font-serif">
                Respuestas preparadas para los cuestionamientos típicos de un directorio o inversor conservador.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Question 1 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-emerald-900/60 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-500 dark:text-amber-400">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>"¿Por qué no empezamos vendiendo las estaciones físicas KioT si ya las diseñamos?"</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-100/80 font-serif pl-6 leading-relaxed">
                  <strong>Respuesta:</strong> Porque el hardware tiene ciclo de venta largo (3 a 6 meses), exige inmovilizar capital en componentes (BOM), fletes e instalaciones, y un fallo en una placa quema la reputación del cliente. Al vender primero AgroAlerta vía software, el cliente comprueba el valor en 7 días sin desembolsar millones. Cuando luego le ofrecemos el hardware, <em>él ya confía en nosotros</em> y la compra es un trámite.
                </p>
              </div>

              {/* Question 2 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-emerald-900/60 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-500 dark:text-emerald-400">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>"¿Por qué WhatsApp y no una aplicación nativa para iPhone y Android en la tienda?"</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-100/80 font-serif pl-6 leading-relaxed">
                  <strong>Respuesta:</strong> En el campo chileno (Maule, O'Higgins, Ñuble), los administradores de campo y dueños de fundo borran o nunca abren apps especializadas. Pero WhatsApp lo tienen abierto en la mano las 24 horas del día. Recibir un aviso a las 4 AM diciendo: <em>"Temperatura en cuartel bajo de cerezo: -1.2 °C, enciende hélices"</em> tiene una tasa de apertura del 98%, frente al 12% de una notificación push de app nativa.
                </p>
              </div>

              {/* Question 3 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-emerald-900/60 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-teal-500 dark:text-teal-400">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>"¿Qué pasa con el Living Lab y la pata de permacultura/solarpunk?"</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-100/80 font-serif pl-6 leading-relaxed">
                  <strong>Respuesta:</strong> El Living Lab ubicado donde Rudi (Parral) es nuestro centro de validación empírica en terreno y nuestro campo de pruebas para levantar proyectos públicos (CORFO, FIA, CNR) y alianzas con universidades y comunidades de regantes. No se elimina: se ubica en la <strong>Fase 3</strong>, solventada por el flujo de caja del Micro-SaaS de la Fase 1 ($0 inventario propio). Así el proyecto se sostiene por sus propios méritos comerciales y no por caridad.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
