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
            Hoja de ruta comercial ejecutiva para el equipo fundador (Daniel, Paulina, Wladimir, Pablo). Catálogo de precios, simulador de ingresos en vivo, calculadora de ROI para clientes y embudo de terreno.
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

      {/* TAB 2: PRICING & TIERS */}
      {subTab === 'pricing' && (
        <div className="space-y-10 animate-fadeIn">
          
          {/* Section 1: AgriTwin SaaS Tiers */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#0B2519] flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-700" />
                <span>1. Planes de Suscripción AgriTwin (SaaS Predial)</span>
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Cobro recurrente mensual o anual con 15% de descuento por prepago.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Plan Básico */}
              <div className="rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-emerald-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-sans text-xs font-bold">
                    Predio Familiar
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900">Plan Básico</h4>
                  <div className="font-mono text-3xl font-extrabold text-emerald-800">
                    $45.000 <span className="text-xs font-normal text-slate-500">CLP / mes</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Ideal para parcelas y pequeños agricultores de hasta 10 hectáreas.
                  </p>
                  
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Índices NDVI y NDWI Sentinel-2 cada 5 días</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Alertas de heladas y temperatura por WhatsApp</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>1 usuario con acceso móvil</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Setup georreferenciado: $120.000 CLP</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 text-center">
                  <span className="text-[11px] font-mono text-emerald-700 font-bold block">
                    Anual: $459.000 CLP (15% off)
                  </span>
                </div>
              </div>

              {/* Plan Pro Frutícola */}
              <div className="rounded-2xl border-2 border-emerald-600 p-6 space-y-4 shadow-md bg-emerald-50/20 flex flex-col justify-between relative">
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-sans text-[10px] font-extrabold uppercase tracking-wide">
                  Más Popular • Frutícola
                </div>

                <div className="space-y-3">
                  <div className="inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-sans text-xs font-bold">
                    Cerezos, Viñas & Frutales
                  </div>
                  <h4 className="text-2xl font-extrabold text-[#0B2519]">Plan Pro</h4>
                  <div className="font-mono text-3xl font-extrabold text-emerald-700">
                    $85.000 <span className="text-xs font-normal text-slate-500">CLP / mes</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Para fundos medianos y fruticultores de alto valor (hasta 50 hectáreas).
                  </p>
                  
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Todo lo del plan Básico incluido</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Gemelo Digital 3D biofísico WebGL</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Balance hídrico diario FAO-56 en 3 estratos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Predicción katabática de heladas con 72h</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Setup e integración inicial: $180.000 CLP</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-emerald-200 text-center">
                  <span className="text-[11px] font-mono text-emerald-800 font-bold block">
                    Anual: $867.000 CLP (15% off)
                  </span>
                </div>
              </div>

              {/* Plan Enterprise */}
              <div className="rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-emerald-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-flex px-3 py-1 rounded-full bg-slate-900 text-white font-sans text-xs font-bold">
                    Exportadoras & Multi-Predio
                  </div>
                  <h4 className="text-2xl font-extrabold text-slate-900">Plan Enterprise</h4>
                  <div className="font-mono text-3xl font-extrabold text-slate-900">
                    $160.000 <span className="text-xs font-normal text-slate-500">CLP / mes</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Para exportadoras con más de 50 ha o carteras de múltiples predios.
                  </p>
                  
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Superficie ilimitada y multi-campo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Auditoría continua de no-deforestación EUDR</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>API LoRaWAN dedicada para telemetría</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Vuelo trimestral de dron multiespectral</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>SLA de respuesta prioritaria en 2 horas</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 text-center">
                  <span className="text-[11px] font-mono text-slate-800 font-bold block">
                    Anual: $1.632.000 CLP (15% off)
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: Hardware Kits Pricing */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#0B2519] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-600" />
                <span>2. Hardware KioT: Venta, Margen & Modalidad HaaS</span>
              </h3>
              <p className="text-xs text-slate-500 font-serif">
                Fabricación mecatrónica en Talca por Paulina y despliegue por la Cooperativa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Kit Base: Riego & Suelo</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">58% Margen</span>
                </div>
                <div className="font-mono text-2xl font-bold text-slate-900">$185.000 CLP</div>
                <p className="text-xs text-slate-600">
                  Nodo IP65 + Sonda capacitiva V1.2 + Relé electroválvula 12V.
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
                <p className="text-xs text-slate-600">
                  Nodo IP65 + Sonda DS18B20 (±0.5°C) + Barómetro + Sirena 110dB.
                </p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-amber-200 space-y-1">
                  <div>• Costo BOM: $44.200 CLP</div>
                  <div>• Ganancia Bruta SpA: $130.800 CLP</div>
                  <div>• Pago a Instalador Cooperado: $45.000 CLP</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">Modalidad HaaS (Arriendo)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">Cero Entrada</span>
                </div>
                <div className="font-mono text-2xl font-bold text-blue-900">$28.000 CLP / mes</div>
                <p className="text-xs text-slate-600">
                  Hardware instalado sin costo inicial con mantención y garantía total.
                </p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 space-y-1">
                  <div>• Contrato mínimo: 18 meses</div>
                  <div>• Recambio express ante roturas</div>
                  <div>• Incluye visita semestral de calibración</div>
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
                Paulina o técnico de la cooperativa visita el predio con medidor de terreno. Identifica puntos bajos propensos a heladas y toma de bombeo.
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
                  <strong>Respuesta:</strong> Los gabinetes son IP65 impresos en PETG industrial resistente a rayos UV y golpes. Además, nuestro taller en Talca garantiza reemplazo en menos de 24 horas.
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
              Distribución de tareas comerciales claras para Daniel, Paulina, Wladimir, Pablo y la red cooperativa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Daniel */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-emerald-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-sm font-sans">
                  DS
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Daniel Santander</h4>
                  <span className="text-[10px] text-emerald-700 font-bold block uppercase">Dirección & Alianzas ESG</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Cierre de contratos con exportadoras internacionales.</li>
                <li>• Vínculo con importadores en Europa para Pasaporte Verde.</li>
                <li>• Dirección científica y evolución de AgriTwin 3D.</li>
              </ul>
            </div>

            {/* Paulina */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-amber-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm font-sans">
                  PU
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Paulina Urrutia</h4>
                  <span className="text-[10px] text-amber-700 font-bold block uppercase">Ventas Técnicas & Taller</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Diagnósticos técnicos y visitas de campo a clientes.</li>
                <li>• Dirección del ensamble de kits KioT en taller Talca.</li>
                <li>• Asignación de órdenes de instalación a la cooperativa.</li>
              </ul>
            </div>

            {/* Wladimir */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-blue-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-sm font-sans">
                  WL
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Wladimir</h4>
                  <span className="text-[10px] text-blue-700 font-bold block uppercase">Finanzas & Alianzas Maule</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Acuerdos comerciales con APRs y juntas de regadío.</li>
                <li>• Gestión de cobranza, contratos y flujo de caja SpA.</li>
                <li>• Organización de seminarios presenciales "Manos en la Tierra".</li>
              </ul>
            </div>

            {/* Pablo */}
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-purple-50/30">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center text-sm font-sans">
                  PB
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Pablo</h4>
                  <span className="text-[10px] text-purple-700 font-bold block uppercase">Inteligencia Comercial & Software</span>
                </div>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-200">
                <li>• Mantenimiento del simulador de precios y CRM.</li>
                <li>• Análisis de métricas de embudo, CAC y churn.</li>
                <li>• Soporte en optimización de algoritmos biofísicos.</li>
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
