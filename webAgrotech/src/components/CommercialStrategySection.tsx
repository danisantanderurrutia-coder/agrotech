import React, { useState, useMemo } from 'react';
import { 
  DollarSign, TrendingUp, Users, CheckCircle2, AlertTriangle, ShieldCheck, 
  Presentation, BarChart3, Calculator, Layers, Sparkles, Sprout, ArrowRight,
  Sun, Droplets, Zap, Building2, Wrench, Download, Clock, Target, PhoneCall
} from 'lucide-react';

interface CommercialStrategySectionProps {
  onOpenPitchDeck?: () => void;
}

export const CommercialStrategySection: React.FC<CommercialStrategySectionProps> = ({ onOpenPitchDeck }) => {
  const [subTab, setSubTab] = useState<'simulator' | 'pricing' | 'roi' | 'pipeline' | 'roles'>('simulator');

  // Simulator State
  const [agriTwinSubscribers, setAgriTwinSubscribers] = useState<number>(25);
  const [kiotKitsSold, setKiotKitsSold] = useState<number>(30);
  const [greenPassports, setGreenPassports] = useState<number>(8);
  const [expressReports, setExpressReports] = useState<number>(15);

  // ROI Calculator State
  const [cropType, setCropType] = useState<'cherry' | 'vineyard' | 'blueberry' | 'rice'>('cherry');
  const [cropHectares, setCropHectares] = useState<number>(15);
  const [currentElectricBill, setCurrentElectricBill] = useState<number>(1400000); // CLP monthly

  // Calculations for Simulator
  const simResults = useMemo(() => {
    // Average Monthly SaaS: Blend of Básico (30% @ $45k), Pro (60% @ $85k), Enterprise (10% @ $160k) = ~$80,500 CLP/mes
    const avgSaaS = 80500;
    const mrrClp = agriTwinSubscribers * avgSaaS;
    const arrSaaSClp = mrrClp * 12;

    // Average Hardware Kit Revenue: ~$220,000 CLP with 58% margin
    const avgHwPrice = 220000;
    const avgHwCost = 92000; // BOM + assembly base
    const hwRevenueClp = kiotKitsSold * avgHwPrice;
    const hwMarginClp = kiotKitsSold * (avgHwPrice - avgHwCost);

    // Green Passport: €1,100 (~$1,130,000 CLP) with 70% margin
    const passportPrice = 1130000;
    const passportRevenueClp = greenPassports * passportPrice;
    const passportMarginClp = passportRevenueClp * 0.70;

    // Express Reports: €130 (~$133,000 CLP) with 85% margin
    const reportPrice = 133000;
    const reportRevenueClp = expressReports * reportPrice;
    const reportMarginClp = reportRevenueClp * 0.85;

    // Annualized Total
    const totalAnnualRevenueClp = arrSaaSClp + hwRevenueClp + passportRevenueClp + reportRevenueClp;
    
    // Coop payout (installations @ ~$45k per kit + drone surveys @ ~$150k per 5 passports)
    const coopInstallationFund = (kiotKitsSold * 45000) + (greenPassports * 180000);
    
    // SpA Estimated Gross Margin
    const totalGrossProfitClp = (arrSaaSClp * 0.90) + hwMarginClp + passportMarginClp + reportMarginClp - coopInstallationFund;
    const globalMarginPercent = totalAnnualRevenueClp > 0 ? (totalGrossProfitClp / totalAnnualRevenueClp) * 100 : 0;

    return {
      mrrClp,
      arrSaaSClp,
      hwRevenueClp,
      passportRevenueClp,
      reportRevenueClp,
      totalAnnualRevenueClp,
      coopInstallationFund,
      totalGrossProfitClp,
      globalMarginPercent: Math.round(globalMarginPercent)
    };
  }, [agriTwinSubscribers, kiotKitsSold, greenPassports, expressReports]);

  // Calculations for Farmer ROI
  const farmerRoi = useMemo(() => {
    let frostRiskPerHa = 20000000; // Cereza default: $20M CLP/ha
    let frostProbabilityYear = 0.25; // 25% chance of severe event
    let waterSavingPercent = 0.22; // 22% water saving

    if (cropType === 'vineyard') {
      frostRiskPerHa = 10000000;
      frostProbabilityYear = 0.20;
      waterSavingPercent = 0.28;
    } else if (cropType === 'blueberry') {
      frostRiskPerHa = 16000000;
      frostProbabilityYear = 0.30;
      waterSavingPercent = 0.25;
    } else if (cropType === 'rice') {
      frostRiskPerHa = 3500000;
      frostProbabilityYear = 0.15;
      waterSavingPercent = 0.35;
    }

    // Expected annual frost damage avoided (considering 85% mitigation efficacy)
    const annualFrostLossAverted = (cropHectares * frostRiskPerHa * frostProbabilityYear) * 0.85;
    
    // Annual electric saving (pump optimization 32% average in valley hours)
    const annualElectricSavings = (currentElectricBill * 12) * 0.32;

    // Total farmer benefit
    const totalAnnualFarmerBenefit = annualFrostLossAverted + annualElectricSavings;

    // Cost of AgroTech: Plan Pro ($85k/mo = $1.02M/yr) + 2 Kits KioT ($440k CLP setup once)
    const agroTechAnnualCost = (85000 * 12) + 440000;

    const netFarmerSavings = totalAnnualFarmerBenefit - agroTechAnnualCost;
    const roiMultiplier = agroTechAnnualCost > 0 ? (totalAnnualFarmerBenefit / agroTechAnnualCost) : 0;
    const paybackMonths = totalAnnualFarmerBenefit > 0 ? (agroTechAnnualCost / (totalAnnualFarmerBenefit / 12)) : 0;

    return {
      annualFrostLossAverted,
      annualElectricSavings,
      totalAnnualFarmerBenefit,
      agroTechAnnualCost,
      netFarmerSavings,
      roiMultiplier: roiMultiplier.toFixed(1),
      paybackMonths: paybackMonths.toFixed(1)
    };
  }, [cropType, cropHectares, currentElectricBill]);

  const formatClp = (val: number) => {
    return '$' + Math.round(val).toLocaleString('es-CL') + ' CLP';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-sans font-bold">
            <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
            <span>Dirección Comercial & Go-To-Market SpA • Maule & UE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
            Estrategia de Ventas, <span className="text-emerald-700">Precios & Tracción 2026-2027</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-serif">
            Hoja de ruta comercial ejecutiva para el equipo fundador (Daniel Santander, Francisco Ipinza, Wladimir Gutiérrez, Rüdiger Kaatz, Cristian Cantuarias). Catálogo oficial de 3 fases, recorrido Product-Led Growth, simulador de ingresos en vivo, calculadora de ROI para clientes y embudo de terreno.
          </p>
        </div>

        {/* CTA Launch Deck */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {onOpenPitchDeck && (
            <button
              onClick={onOpenPitchDeck}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-[#0B2519] text-white font-sans font-bold text-xs shadow-md hover:brightness-110 transition-all"
            >
              <Presentation className="w-4 h-4 text-emerald-300" />
              <span>Ver Pitch Deck Comercial (10 Slides)</span>
            </button>
          )}
        </div>
      </div>

      {/* Convención de Nombres Provisional ("X") */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
        <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 font-mono text-xs">
          X
        </div>
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide font-sans">
            Convención de Nombres Provisional • Marcador "X"
          </h4>
          <p className="text-xs text-amber-900/90 font-serif leading-relaxed">
            Mientras consolidamos el <em>Naming</em> oficial de la marca madre, todos los productos y módulos de nuestro catálogo utilizan provisionalmente el prefijo <strong>"X"</strong> (p. ej. <em>X AgroAlerta</em>, <em>X AgriTwin Maestro</em>, <em>X Keyline</em>).
          </p>
        </div>
      </div>

      {/* Introducción Estratégica: Recorrido del Cliente sin Fricción (Product-Led Growth) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B2519] via-[#0D2E1F] to-[#071810] text-white border border-emerald-500/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800/60 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
              Estrategia Product-Led Growth (PLG) • Adopción sin Fricción
            </span>
          </div>
          <span className="text-[11px] font-mono text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30 font-bold">
            $0 Inventario en Fase 1
          </span>
        </div>

        <p className="text-xs sm:text-sm text-emerald-100/90 font-serif leading-relaxed">
          Nuestra arquitectura comercial rompe la barrera tradicional de ventas agrícolas. No forzamos al productor a comprar fierros costosos a puerta fría:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[11px]">1</span>
              <span>Entrada Gratis (60s)</span>
            </div>
            <p className="text-[11px] text-slate-300 font-serif">
              El agricultor entra gratis por WhatsApp o móvil con <strong>X AgroAlerta</strong>: dibuja su polígono y recibe alertas tempranas de helada y Puelche en 60 segundos.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold font-mono">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-[11px]">2</span>
              <span>Add-ons en 1 Clic</span>
            </div>
            <p className="text-[11px] text-slate-300 font-serif">
              Dentro del chat desbloquea documentos pagos sin fricción: <strong>Informe Predial Express 24h</strong>, <strong>Pasaporte Verde EUDR</strong> y <strong>Carpeta Técnica CNR (Ley 18.450)</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-teal-300 font-bold font-mono">
              <span className="w-5 h-5 rounded-full bg-teal-400/20 text-teal-300 flex items-center justify-center text-[11px]">3</span>
              <span>Micro-SaaS & Maestro</span>
            </div>
            <p className="text-[11px] text-slate-300 font-serif">
              Escala a verticales de riesgo (<strong>X Agua & Riego</strong>, <strong>X Incendios</strong>, <strong>X Visión & Vuelo</strong>), <strong>X AgriTwin Maestro</strong> con Sensores Virtuales, y permacultura con <strong>X Keyline</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold font-mono">
              <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center text-[11px]">4</span>
              <span>Fases 2 & 3 (IoT & Cuencas)</span>
            </div>
            <p className="text-[11px] text-slate-300 font-serif">
              Solo cuando ya confía en el software se ofrece en <strong>Fase 2</strong> el upgrade físico IoT (sondas FDR / actuadores), y en <strong>Fase 3</strong> servicios territoriales en el <strong>Living Lab (Parral)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setSubTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-bold transition-all ${
            subTab === 'simulator'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>1. Simulador Financiero en Vivo</span>
        </button>

        <button
          onClick={() => setSubTab('pricing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-bold transition-all ${
            subTab === 'pricing'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>2. Catálogo de Precios & Tiers</span>
        </button>

        <button
          onClick={() => setSubTab('roi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-bold transition-all ${
            subTab === 'roi'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>3. Calculadora de ROI para Clientes</span>
        </button>

        <button
          onClick={() => setSubTab('pipeline')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-bold transition-all ${
            subTab === 'pipeline'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>4. Embudo de Ventas & Showroom</span>
        </button>

        <button
          onClick={() => setSubTab('roles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-sans font-bold transition-all ${
            subTab === 'roles'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>5. Roles de Socios & Plan 90 Días</span>
        </button>
      </div>

      {/* TAB 1: FINANCIAL SIMULATOR */}
      {subTab === 'simulator' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-1 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-[#0B2519] flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-700" />
                  <span>Variables de Proyección</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Modifica los volúmenes para ver la facturación anual y margen neto.
                </p>
              </div>

              {/* Slider 1: AgriTwin Subscribers */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-sans font-bold">
                  <span className="text-slate-700">Predios AgriTwin Activos:</span>
                  <span className="text-emerald-700 font-mono text-sm">{agriTwinSubscribers} predios</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="150" 
                  step="5" 
                  value={agriTwinSubscribers}
                  onChange={(e) => setAgriTwinSubscribers(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5 (Pilotos)</span>
                  <span>50 (Meta Año 1)</span>
                  <span>150 (Escala)</span>
                </div>
              </div>

              {/* Slider 2: KioT Kits Sold */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-sans font-bold">
                  <span className="text-slate-700">Kits KioT Instalados:</span>
                  <span className="text-amber-700 font-mono text-sm">{kiotKitsSold} kits</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="250" 
                  step="5" 
                  value={kiotKitsSold}
                  onChange={(e) => setKiotKitsSold(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5 kits</span>
                  <span>100 kits</span>
                  <span>250 kits</span>
                </div>
              </div>

              {/* Slider 3: Green Passports */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-sans font-bold">
                  <span className="text-slate-700">Pasaportes Verdes UE:</span>
                  <span className="text-blue-700 font-mono text-sm">{greenPassports} fundos</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  step="2" 
                  value={greenPassports}
                  onChange={(e) => setGreenPassports(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0</span>
                  <span>15 fundos</span>
                  <span>40 fundos</span>
                </div>
              </div>

              {/* Slider 4: Express Reports */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-sans font-bold">
                  <span className="text-slate-700">Informes Express Vendidos:</span>
                  <span className="text-indigo-700 font-mono text-sm">{expressReports} informes</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5" 
                  value={expressReports}
                  onChange={(e) => setExpressReports(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0</span>
                  <span>50 informes</span>
                  <span>100 informes</span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
                <span className="font-bold block">💡 Punto de Equilibrio (Break-Even):</span>
                <span>Se cubre la infraestructura y costos de taller con solo <strong>14 predios Pro</strong> y <strong>18 kits</strong> instalados.</span>
              </div>
            </div>

            {/* Right Output Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Highlight KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900 to-[#0B2519] text-white space-y-2 shadow-sm">
                  <span className="text-[11px] font-sans font-bold uppercase text-emerald-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>MRR Recurrente (SaaS)</span>
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    {formatClp(simResults.mrrClp)}
                  </div>
                  <span className="text-xs text-emerald-200/80 block">
                    ARR Anualizado: {formatClp(simResults.arrSaaSClp)}
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 text-white space-y-2 shadow-sm">
                  <span className="text-[11px] font-sans font-bold uppercase text-amber-200 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Facturación Total Año</span>
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    {formatClp(simResults.totalAnnualRevenueClp)}
                  </div>
                  <span className="text-xs text-amber-100 block">
                    SaaS + Hardware + Pasaportes
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-2 shadow-sm">
                  <span className="text-[11px] font-sans font-bold uppercase text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Margen Bruto Global</span>
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                    {simResults.globalMarginPercent}%
                  </div>
                  <span className="text-xs text-slate-300 block">
                    Utilidad Bruta: {formatClp(simResults.totalGrossProfitClp)}
                  </span>
                </div>

              </div>

              {/* Revenue Breakdown Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-sans font-bold text-xs text-slate-700 flex justify-between items-center">
                  <span>Desglose por Línea de Negocio</span>
                  <span className="text-emerald-700 font-mono">Moneda: CLP</span>
                </div>

                <div className="divide-y divide-slate-100 text-xs font-sans">
                  
                  <div className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block">Suscripciones AgriTwin (SaaS)</span>
                      <span className="text-slate-500">{agriTwinSubscribers} predios activos con cobro mensual</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-800 text-sm">{formatClp(simResults.arrSaaSClp)} /año</span>
                  </div>

                  <div className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block">Venta de Hardware KioT</span>
                      <span className="text-slate-500">{kiotKitsSold} kits ensamblados en taller Talca</span>
                    </div>
                    <span className="font-mono font-bold text-amber-700 text-sm">{formatClp(simResults.hwRevenueClp)}</span>
                  </div>

                  <div className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block">Pasaporte Verde UE (Certificación de Exportación)</span>
                      <span className="text-slate-500">{greenPassports} dossiers técnicos de no-deforestación EUDR</span>
                    </div>
                    <span className="font-mono font-bold text-blue-700 text-sm">{formatClp(simResults.passportRevenueClp)}</span>
                  </div>

                  <div className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block">Informes Express de Riesgo Agroclimático</span>
                      <span className="text-slate-500">{expressReports} estudios prediales para tasaciones y compras</span>
                    </div>
                    <span className="font-mono font-bold text-indigo-700 text-sm">{formatClp(simResults.reportRevenueClp)}</span>
                  </div>

                  {/* Cooperative Payout Line */}
                  <div className="p-4 bg-emerald-50/60 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Fondo Cooperativa de Trabajo (Mano de Obra Local)</span>
                      </span>
                      <span className="text-emerald-700 text-[11px]">Pagos directos a técnicos instaladores y pilotos de dron de la zona</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-900 text-sm">{formatClp(simResults.coopInstallationFund)}</span>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: PRICING & TIERS (CATÁLOGO OFICIAL 3 FASES) */}
      {subTab === 'pricing' && (
        <div className="space-y-12 animate-fadeIn">
          
          {/* ========================================================================= */}
          {/* FASE 1: 100% SOFTWARE & MICRO-SAAS ($0 INVENTARIO PROPIO) */}
          {/* ========================================================================= */}
          <div className="space-y-6">
            <div className="border-b border-emerald-900/30 pb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  FASE 1 • $0 INVENTARIO PROPIO • 100% SOFTWARE & MICRO-SAAS
                </span>
                <h3 className="text-2xl font-black text-[#0B2519] mt-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-700" />
                  <span>Suite de Software, Alertas & Administración Predial</span>
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                Margen Bruto Software: 85% - 96%
              </span>
            </div>

            {/* 1. X AgroAlerta & Add-ons Pagos */}
            <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-[#0B2519] to-teal-950 text-white p-6 sm:p-8 space-y-6 shadow-xl border border-emerald-500/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-800/60 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center font-mono">1</span>
                    <h4 className="text-xl sm:text-2xl font-black text-white">X AgroAlerta</h4>
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black font-mono">GANCHO GRATUITO (60s)</span>
                  </div>
                  <p className="text-xs text-emerald-200/80 font-serif mt-1">
                    Alertas predictivas vía WhatsApp/móvil: heladas katabáticas (-1.8 °C), viento Puelche, estrés hídrico y ventana de pulverización. Cero fricción, enrolamiento en 60s dibujando el polígono.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400 font-bold block">Acceso Inmediato</span>
                  <span className="text-2xl font-black text-white font-mono">$0 / mes</span>
                </div>
              </div>

              {/* Add-ons 1-Clic dentro de X AgroAlerta */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold block">
                  Compras Integradas en 1 Clic ($0 Inventario • Entrega Automatizada):
                </span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-emerald-300 font-mono">Informe Predial Express (24h)</span>
                        <span className="text-xs font-mono text-amber-300 font-bold">$133.000 CLP</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-serif mt-1">
                        Diagnóstico satelital completo en 24 horas: aptitud de suelo, historial de heladas de 5 años, estrés hídrico y balance de cuenca.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold pt-2 border-t border-emerald-900/60 block">85% Margen SpA</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-emerald-300 font-mono">Pasaporte Verde EUDR</span>
                        <span className="text-xs font-mono text-amber-300 font-bold">$1.130.000 CLP</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-serif mt-1">
                        Certificación geoespacial de no-deforestación requerida por la UE con código QR sellado y polígonos auditados multitemporalmente.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold pt-2 border-t border-emerald-900/60 block">70% Margen SpA</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-emerald-300 font-mono">Carpeta Técnica CNR (Ley 18.450)</span>
                        <span className="text-xs font-mono text-amber-300 font-bold">$350.000 CLP</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-serif mt-1">
                        Expediente técnico hidrológico y topográfico para postulación a bonificación estatal de riego y tranques de la Comisión Nacional de Riego.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold pt-2 border-t border-emerald-900/60 block">80% Margen SpA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid 2 a 6: Micro-SaaS Especializados & Maestro */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              
              {/* 2. X Agua & Riego */}
              <div className="rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-emerald-500 transition-all flex flex-col justify-between bg-white shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-900">
                      2 • MICRO-SAAS HÍDRICO
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold">100% Software</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-[#0B2519]">X Agua & Riego</h4>
                  <div className="font-mono text-2xl font-extrabold text-blue-800">
                    $45.000 <span className="text-xs font-normal text-slate-500">CLP / mes</span>
                  </div>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    Historial y pronóstico de precipitaciones, balance FAO-56 diario en estratos radiculares, reservas en tranques y programación nocturna de riego (-32% en la cuenta eléctrica). Cruza el déficit hídrico como predictor de incendios.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Balance hídrico diario FAO-56 Penman-Monteith</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Optimización en franjas valle de electricidad</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Monitoreo de tranques y caudales de canales DGA</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-slate-100 text-center font-mono text-[11px] text-blue-800 font-bold">
                  Anual: $459.000 CLP (15% off)
                </div>
              </div>

              {/* 3. X Incendios */}
              <div className="rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-amber-500 transition-all flex flex-col justify-between bg-white shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900">
                      3 • DEFENSA CONTRA INCENDIOS
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold">100% Software</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-[#0B2519]">X Incendios</h4>
                  <div className="font-mono text-2xl font-extrabold text-amber-700">
                    $39.000 <span className="text-xs font-normal text-slate-500">CLP / mes</span>
                  </div>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    Monitoreo Piro-Vórtice WUI y viento Puelche con condición 30-30-30. Simulación Rothermel de propagación, cálculo de cortafuegos y orden de humectación preventiva integrable vía API a bombas existentes del predio.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Anomalías térmicas MODIS/VIIRS a 25 km</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Alerta de viento Puelche y piro-vórtice WUI</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Integración API a bombas y PLCs existentes</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-slate-100 text-center font-mono text-[11px] text-amber-800 font-bold">
                  Estacional: $199.000 CLP (6 meses verano)
                </div>
              </div>

              {/* 4. X Visión & Vuelo */}
              <div className="rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-purple-500 transition-all flex flex-col justify-between bg-white shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-purple-100 text-purple-900">
                      4 • VÍDEO & DRONES
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold">100% Software</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-[#0B2519]">X Visión & Vuelo</h4>
                  <div className="font-mono text-2xl font-extrabold text-purple-800">
                    $25.000 <span className="text-xs font-normal text-slate-500">CLP / mes</span>
                  </div>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    Conecta cámaras IP/4G y drones comerciales que el agricultor ya posee. Analítica de video con IA (intrusión, aforo de canales, fauna) y procesamiento de ortomosaicos aéreos para calcular NDVI, NDRE y humo.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Streaming WebRTC de baja latencia rural</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Inferencia YOLOv11 en bordes perimetrales</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>Generación de ortomosaicos NDVI desde drones propios</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-slate-100 text-center font-mono text-[11px] text-purple-800 font-bold">
                  Por flujo o cámara activa adicional: $12.000 CLP/mes
                </div>
              </div>

              {/* 5. X AgriTwin Maestro */}
              <div className="rounded-2xl border-2 border-emerald-600 p-6 space-y-4 shadow-md bg-emerald-50/20 flex flex-col justify-between relative">
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-700 text-white font-sans text-[10px] font-extrabold uppercase tracking-wide">
                  Suite Insignia • 3D
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      5 • GEMELO DIGITAL & VIRTUAL SENSORS
                    </span>
                    <span className="text-xs font-mono text-emerald-700 font-bold">Pro / Enterprise</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-[#0B2519]">X AgriTwin Maestro</h4>
                  <div className="font-mono text-2xl font-extrabold text-emerald-700">
                    $85.000 <span className="text-xs font-normal text-slate-500">CLP / mes (Pro)</span>
                  </div>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    Administración predial avanzada con <strong>Sensores Virtuales</strong> (calicata 1D Richards-MONICA sin enterrar sondas), malla topográfica AMR 2D/3D, drenaje katabático brote a brote y simulador de escenarios What-If.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-200">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Sensores Virtuales: calicata 1D Richards-MONICA</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Malla 3D AMR con drenaje katabático de heladas</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Simulaciones What-If de riego, variedades y clima</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-emerald-200 text-center font-mono text-[11px] text-emerald-800 font-bold">
                  Enterprise (multi-predio): $160.000 CLP / mes
                </div>
              </div>

              {/* 6. X Keyline */}
              <div className="rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-emerald-500 transition-all flex flex-col justify-between bg-white shadow-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      6 • DISEÑO PERMACULTURAL
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold">Proyecto / SaaS</span>
                  </div>
                  <h4 className="text-xl font-extrabold text-[#0B2519]">X Keyline</h4>
                  <div className="font-mono text-2xl font-extrabold text-emerald-900">
                    $350.000 <span className="text-xs font-normal text-slate-500">CLP / proyecto</span>
                  </div>
                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    Diseño predial integral desde cero bajo la Escala de Permanencia de Yeomans: siembra de agua, curvas a desnivel, tranques en cabecera, planos CutSheetRX para maquinaria, cercos móviles y pastoreo regenerativo PRV.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Trazado de líneas clave (Keyline) y surcos a nivel</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Planos CutSheetRX para operador de retroexcavadora</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Zonificación Zonas 0 a 5 y módulos PRV</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-slate-100 text-center font-mono text-[11px] text-emerald-800 font-bold">
                  Incluye soporte de diseño y exportación CAD/GIS
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* FASE 2: UPGRADE FÍSICO IOT (SOLO CLIENTES QUE YA USAN FASE 1) */}
          {/* ========================================================================= */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div className="border-b border-amber-900/30 pb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-900 font-bold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  FASE 2 • UPGRADE FÍSICO IOT • SOLO CLIENTES VALIDADOS EN FASE 1
                </span>
                <h3 className="text-2xl font-black text-[#0B2519] mt-2 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-600" />
                  <span>X Kits IoT, Actuadores & Energía Off-Grid</span>
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                Fabricación Just-In-Time • $0 Inventario Ocioso
              </span>
            </div>

            <p className="text-xs text-slate-600 font-serif leading-relaxed max-w-3xl">
              El hardware nunca se ofrece a puerta fría: se instala exclusivamente en campos que ya operan y confían en nuestro software, agregando telemetría física in-situ de suelo (sondas FDR 3-estratos), controladores de bomba LoRaWAN y nodos solares LiFePO4.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Kit Base: Riego & FDR Suelo</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">58% Margen</span>
                </div>
                <div className="font-mono text-2xl font-bold text-slate-900">$185.000 CLP</div>
                <p className="text-xs text-slate-600 font-serif">
                  Nodo solar IP65 + Sonda FDR capacitiva + Relé electroválvula 12V con antena LoRaWAN.
                </p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 space-y-1">
                  <div>• Costo BOM: $38.500 CLP</div>
                  <div>• Ganancia Bruta SpA: $107.500 CLP</div>
                  <div>• Pago a Instalador Cooperado: $39.000 CLP</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-300 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-900">Kit Crítico Anti-Heladas</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">59% Margen</span>
                </div>
                <div className="font-mono text-2xl font-bold text-amber-900">$220.000 CLP</div>
                <p className="text-xs text-slate-600 font-serif">
                  Nodo IP65 + Sonda DS18B20 (±0.5°C) + Barómetro + Sirena 110dB + Batería LiFePO4.
                </p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-amber-200 space-y-1">
                  <div>• Costo BOM: $44.200 CLP</div>
                  <div>• Ganancia Bruta SpA: $130.800 CLP</div>
                  <div>• Pago a Instalador Cooperado: $45.000 CLP</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Modalidad HaaS (Arriendo Operativo)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">Cero Entrada</span>
                </div>
                <div className="font-mono text-2xl font-bold text-blue-900">$28.000 CLP / mes</div>
                <p className="text-xs text-slate-600 font-serif">
                  Hardware instalado sin costo inicial para clientes activos de software, con garantía y reposición.
                </p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 space-y-1">
                  <div>• Contrato mínimo: 18 meses</div>
                  <div>• Recambio express ante fallas en 24h</div>
                  <div>• Incluye visita de calibración semestral</div>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* FASE 3: SERVICIOS TERRITORIALES & ECOSISTEMA (B2G / IMPACTO) */}
          {/* ========================================================================= */}
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div className="border-b border-teal-900/30 pb-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-900 font-bold bg-teal-100 px-3 py-1 rounded-full border border-teal-300">
                  FASE 3 • SERVICIOS TERRITORIALES, B2G & ECOSISTEMA
                </span>
                <h3 className="text-2xl font-black text-[#0B2519] mt-2 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-700" />
                  <span>X Territorio, Cuencas & Living Lab</span>
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-teal-900 bg-teal-50 px-3 py-1 rounded-xl border border-teal-200">
                Alianzas Institucionales & Validación Empírica
              </span>
            </div>

            <div className="rounded-2xl border border-teal-200 bg-teal-50/30 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-200 pb-3">
                <div>
                  <h4 className="font-extrabold text-base text-teal-950">
                    Proyectos de Resiliencia Territorial & Living Lab (Parral)
                  </h4>
                  <p className="text-xs text-slate-600 font-serif mt-1">
                    Convenios con municipios, Comités de Agua Potable Rural (APRs), Juntas de Vigilancia de Ríos (JVRL) e INDAP. Centro de investigación y validación empírica en el <strong>Living Lab ubicado donde Rudi (Parral)</strong>.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-100 px-3 py-1.5 rounded-xl border border-teal-300 shrink-0">
                  Proyectos a Medida • Fondos CNR / GORE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                <div className="p-4 rounded-xl bg-white border border-teal-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Monitoreo Hidrológico de Cuenca</span>
                  <p className="text-[11px] text-slate-600 font-serif">
                    Malla territorial de 122.070 ha para balance de recarga y gestión de derechos de aprovechamiento.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-teal-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Living Lab en Parral (donde Rudi)</span>
                  <p className="text-[11px] text-slate-600 font-serif">
                    Demostración en vivo de biopreparados, salud microbiológica de suelo, agroforestería y microclima.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-teal-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block">Transferencia Técnica & Capacitación</span>
                  <p className="text-[11px] text-slate-600 font-serif">
                    Acompañamiento a comunidades agrícolas en transición agroecológica y postulación a subsidios de riego.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: FARMER ROI CALCULATOR */}
      {subTab === 'roi' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                Herramienta de Cierre de Ventas
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Calculadora de Retorno de Inversión para el Productor
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80 font-serif max-w-2xl">
                Demuestra numéricamente al agricultor cómo la inversión en AgroTech se paga sola al evitar pérdidas por heladas y optimizar el consumo eléctrico de riego.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-emerald-900">
              
              {/* Input 1: Crop */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-300 block">Tipo de Cultivo Principal:</label>
                <select 
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value as any)}
                  className="w-full bg-[#071A11] border border-emerald-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                >
                  <option value="cherry">Cerezos de Exportación (Lapins, Regina)</option>
                  <option value="vineyard">Viña / Uva Vinífera (Cabernet, Carmenere)</option>
                  <option value="blueberry">Arándanos & Berries</option>
                  <option value="rice">Arrozal Tecnificado (Parral / Retiro)</option>
                </select>
              </div>

              {/* Input 2: Hectares */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-emerald-300">
                  <span>Superficie del Predio:</span>
                  <span className="text-amber-400 font-mono">{cropHectares} ha</span>
                </div>
                <input 
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={cropHectares}
                  onChange={(e) => setCropHectares(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Input 3: Electric bill */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-emerald-300">
                  <span>Gasto Eléctrico Riego Mensual:</span>
                  <span className="text-amber-400 font-mono">{formatClp(currentElectricBill)}</span>
                </div>
                <input 
                  type="range"
                  min="300000"
                  max="6000000"
                  step="100000"
                  value={currentElectricBill}
                  onChange={(e) => setCurrentElectricBill(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-900/80">
              
              <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <span className="text-[11px] text-emerald-300 block">Pérdida por Helada Evitada:</span>
                <span className="text-lg font-bold font-mono text-white">
                  {formatClp(farmerRoi.annualFrostLossAverted)}
                </span>
                <span className="text-[10px] text-emerald-400 block">Probabilidad ponderada anual</span>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-1">
                <span className="text-[11px] text-emerald-300 block">Ahorro Eléctrico Anual:</span>
                <span className="text-lg font-bold font-mono text-emerald-300">
                  {formatClp(farmerRoi.annualElectricSavings)}
                </span>
                <span className="text-[10px] text-emerald-400 block">-32% por riego nocturno valle</span>
              </div>

              <div className="p-4 rounded-xl bg-amber-500 text-[#0B2519] space-y-1 font-sans">
                <span className="text-[11px] font-bold block uppercase tracking-wider">Ahorro Neto al Año:</span>
                <span className="text-xl font-extrabold font-mono block">
                  {formatClp(farmerRoi.netFarmerSavings)}
                </span>
                <span className="text-[10px] font-bold block">Ya descontado costo AgroTech</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-600 text-white space-y-1 font-sans">
                <span className="text-[11px] font-bold text-emerald-200 block uppercase tracking-wider">Retorno / Payback:</span>
                <div className="text-2xl font-black font-mono">
                  {farmerRoi.roiMultiplier}x ROI
                </div>
                <span className="text-[10px] text-emerald-100 block">
                  Se paga en solo {farmerRoi.paybackMonths} meses
                </span>
              </div>

            </div>

          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Cómo presentar esto en terreno ante un cliente:</span>
            </span>
            <p>
              "Don Juan, su costo anual en AgroTech Plan Pro con 2 sensores es de <strong>{formatClp(farmerRoi.agroTechAnnualCost)}</strong>. Pero si le evitamos una sola helada y le bajamos la cuenta eléctrica al regar de noche, usted se ahorra <strong>{formatClp(farmerRoi.totalAnnualFarmerBenefit)}</strong>. Cada peso que pone en AgroTech le devuelve <strong>{farmerRoi.roiMultiplier} pesos</strong> en su bolsillo."
            </p>
          </div>

        </div>
      )}

      {/* TAB 4: SALES PIPELINE & FIELD STRATEGY */}
      {subTab === 'pipeline' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-[#0B2519] flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-700" />
              <span>Embudo de Ventas en Terreno (Field Sales Pipeline)</span>
            </h3>
            <p className="text-xs text-slate-600 font-serif">
              Metodología de 4 fases para captar y cerrar contratos agrícolas en las provincias de Linares, Talca y Curicó.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold font-mono flex items-center justify-center text-sm">
                01
              </div>
              <h4 className="font-bold text-sm text-slate-900">Atracción & Showroom</h4>
              <p className="text-xs text-slate-600">
                Día de Campo en <strong>Predio Meniels</strong> (Parral) o <strong>Fundo El Boldo</strong>. Demostración en vivo del gemelo 3D y activación de sirenas.
              </p>
              <div className="text-[11px] text-emerald-700 font-sans font-bold pt-2 border-t border-slate-200">
                Canal: Convenios APRs y Asociaciones de Canalistas.
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-bold font-mono flex items-center justify-center text-sm">
                02
              </div>
              <h4 className="font-bold text-sm text-slate-900">Diagnóstico en 30 Min</h4>
              <p className="text-xs text-slate-600">
                Rudi Kaatz, Luis González o técnico de campo visita el predio con medidor de terreno. Identifica puntos bajos propensos a heladas y toma de bombeo.
              </p>
              <div className="text-[11px] text-amber-700 font-sans font-bold pt-2 border-t border-slate-200">
                Entregable: Cotización formal con ROI calculado en el acto.
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-bold font-mono flex items-center justify-center text-sm">
                03
              </div>
              <h4 className="font-bold text-sm text-slate-900">Piloto con Garantía</h4>
              <p className="text-xs text-slate-600">
                Instalación de Kit KioT y activación inmediata de AgriTwin. Garantía de 30 días de devolución si no se comprueba valor.
              </p>
              <div className="text-[11px] text-blue-700 font-sans font-bold pt-2 border-t border-slate-200">
                Firma: Contrato SpA en cuotas o pago cosecha.
              </div>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-slate-50/50">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-bold font-mono flex items-center justify-center text-sm">
                04
              </div>
              <h4 className="font-bold text-sm text-slate-900">Expansión & Retención</h4>
              <p className="text-xs text-slate-600">
                Emisión de Pasaporte Verde para exportación y módulos de detección de plagas. Referidos con bonificación del 10%.
              </p>
              <div className="text-[11px] text-purple-700 font-sans font-bold pt-2 border-t border-slate-200">
                Soporte: Mantención preventiva semestral por cooperativa.
              </div>
            </div>

          </div>

          {/* Objection Handling */}
          <div className="rounded-2xl border border-slate-200 p-6 space-y-4">
            <h4 className="font-extrabold text-base text-[#0B2519] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Guía de Respuestas a Objeciones Clásicas del Agricultor</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block">"Ya miro el pronóstico del tiempo en el celular"</span>
                <p className="text-slate-600">
                  <strong>Respuesta:</strong> Las estaciones públicas están en ciudades a 30 km. En su fondo de quebrada la temperatura puede ser 4°C menor. Nuestro sensor mide el brote exacto de su árbol.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block">"No tengo internet ni WiFi en el potrero"</span>
                <p className="text-slate-600">
                  <strong>Respuesta:</strong> Nuestros nodos usan LoRaWAN de largo alcance (hasta 10 km) sin chip celular por sensor. Solo un nodo central se conecta satelital o por 4G.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block">"La electrónica se rompe con el barro y el tractor"</span>
                <p className="text-slate-600">
                  <strong>Respuesta:</strong> Los gabinetes son IP65 impresos en PETG industrial resistente a rayos UV y golpes. Además, nuestro equipo técnico de terreno garantiza reemplazo en menos de 24 horas.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: PARTNER ROLES & 90-DAY PLAN */}
      {subTab === 'roles' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-[#0B2519] flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700" />
              <span>Matriz de Responsabilidades Comerciales del Equipo</span>
            </h3>
            <p className="text-xs text-slate-600 font-serif">
              Distribución de tareas comerciales claras para Daniel Santander, Francisco Ipinza, Wladimir Gutiérrez, Rüdiger Kaatz, Cristian Cantuarias, Luis González y Daniela Mendoza.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Daniel */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-emerald-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-sm font-sans">
                  DS
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Daniel Santander</h4>
                  <span className="text-[10px] text-emerald-700 font-bold block uppercase">Dirección, IP & Alianzas ESG</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Custodia y evolución de la IP, algoritmos y motor biofísico.</li>
                <li>• Cierre de contratos con exportadoras internacionales y nexo ESG Europa.</li>
                <li>• Co-diseño de producto y supervisión técnica general.</li>
              </ul>
            </div>

            {/* Francisco (Pancho) */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-blue-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-sm font-sans">
                  FI
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Francisco Ipinza ("Pancho")</h4>
                  <span className="text-[10px] text-blue-700 font-bold block uppercase">Dirección Comercial B2B & Loteos</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Prospección y alianzas con corredoras y desarrolladores de parcelas.</li>
                <li>• Cierre de contratos B2B con viñas, packings y agroindustrias medianas.</li>
                <li>• Venta masiva de diagnósticos prediales satelitales a compradores de loteos.</li>
              </ul>
            </div>

            {/* Wladimir (Nene) */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-indigo-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-indigo-700 text-white font-bold flex items-center justify-center text-sm font-sans">
                  WG
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Wladimir Gutiérrez ("Nene")</h4>
                  <span className="text-[10px] text-indigo-700 font-bold block uppercase">Finanzas & Redes Gremiales</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Acuerdos comerciales con APRs, juntas de regadío y cooperativas.</li>
                <li>• Gestión de cobranza, contratos, flujo de caja y tarifas SpA.</li>
                <li>• Organización de foros y seminarios presenciales comunitarios.</li>
              </ul>
            </div>

            {/* Rudi */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-amber-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-sm font-sans">
                  RK
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Rüdiger Kaatz ("Rudi")</h4>
                  <span className="text-[10px] text-amber-700 font-bold block uppercase">Ing. Informático • Conector Terreno & Living Lab</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Paquetización modular y distribución de kits mecatrónicos en terreno.</li>
                <li>• Demostraciones en vivo en el Living Lab Parral para inversionistas y compradores.</li>
                <li>• Ingeniería de almacenamiento con baterías recicladas y sistemas anti-incendios.</li>
              </ul>
            </div>

            {/* Cantuarias */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-cyan-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-cyan-700 text-white font-bold flex items-center justify-center text-sm font-sans">
                  CC
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Cristian Cantuarias</h4>
                  <span className="text-[10px] text-cyan-700 font-bold block uppercase">Lead UI/UX & Gamificación 3D</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Co-diseño del visor 3D interactivo y experiencia de simulación estratégica.</li>
                <li>• Diseño visual y gamificación de la interfaz para aumentar adopción comercial.</li>
                <li>• Desarrollo front-end bajo flujo de ramas Git Flow con cesión formal de IP.</li>
              </ul>
            </div>

            {/* Luis (Lápiz) */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-emerald-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-teal-800 text-white font-bold flex items-center justify-center text-sm font-sans">
                  LG
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Luis González ("Lápiz")</h4>
                  <span className="text-[10px] text-teal-700 font-bold block uppercase">Infraestructura Off-Grid & Drones</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Despliegue de cámaras 4G solares y enlaces de comunicación en Parral.</li>
                <li>• Levantamiento y patrullaje aéreo con drones para inspección predial.</li>
                <li>• Montaje físico de hardware y soporte técnico inmediato en terreno.</li>
              </ul>
            </div>

            {/* Daniela Mendoza */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-teal-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-sm font-sans">
                  DM
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Daniela Mendoza</h4>
                  <span className="text-[10px] text-teal-700 font-bold block uppercase">QA/QC Geoespacial & Censat</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Validación cartográfica y control de calidad (QA/QC) de capas satelitales.</li>
                <li>• Análisis de cuencas hidrográficas y delimitación territorial técnica.</li>
                <li>• Estandarización de criterios de certificación ambiental y pasaporte verde.</li>
              </ul>
            </div>

          </div>

          {/* 90-Day Milestones */}
          <div className="rounded-2xl border border-slate-200 p-6 space-y-4">
            <h4 className="font-extrabold text-base text-[#0B2519] flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Metas Cuantitativas del Plan a 90 Días (Q4 2026 / Q1 2027)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Meta Clientes Iniciales</span>
                <span className="text-xl font-extrabold font-mono text-emerald-800">8 Contratos Firmados</span>
                <span className="text-slate-500 block">5 en Parral / Retiro y 3 en Curicó</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Meta Facturación Q1</span>
                <span className="text-xl font-extrabold font-mono text-amber-700">$8.500.000 CLP</span>
                <span className="text-slate-500 block">Hardware KioT + Setup fees + Suscripciones</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Día de Campo Showroom</span>
                <span className="text-xl font-extrabold font-mono text-blue-700">Predio Meniels</span>
                <span className="text-slate-500 block">Convocatoria a 20 agricultores de la zona</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
