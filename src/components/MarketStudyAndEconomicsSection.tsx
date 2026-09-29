import React, { useState } from 'react';
import { 
  Users, BarChart3, TrendingUp, ShieldCheck, DollarSign, Target, Cpu, 
  Layers, Globe2, AlertTriangle, CheckCircle2, Zap, Droplets, 
  Gauge, Building2, Coins, ArrowUpRight, Scale, Briefcase
} from 'lucide-react';

export const MarketStudyAndEconomicsSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'architecture' | 'competitors' | 'traction' | 'bom-unit' | 'variables' | 'funding'>('architecture');

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-sans font-bold">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Estudio de Mercado, Costos & Modelo de Negocio • Dirección Industrial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
            Ingeniería de Negocios & <span className="text-emerald-700">Sostenibilidad Corporativa</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-serif">
            Evaluación técnica-económica del ecosistema basada en 1 Producto Insigne (AgroTwin) y 2 Complementarios (KioT + Pasaporte Verde), benchmarking de competidores globales, unit economics y variables críticas de control.
          </p>
        </div>

        {/* Badge Metric */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-right shrink-0">
          <span className="text-[10px] font-sans font-bold uppercase text-slate-500 block">Ratio LTV / CAC</span>
          <span className="text-2xl font-extrabold text-emerald-700 font-mono">12.1x</span>
          <span className="text-[11px] text-slate-500 block font-sans">Payback en 4,2 meses</span>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveSubTab('architecture')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all ${
            activeSubTab === 'architecture'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>1. Portafolio Triádico</span>
        </button>

        <button
          onClick={() => setActiveSubTab('competitors')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all ${
            activeSubTab === 'competitors'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>2. Competencia & Moats</span>
        </button>

        <button
          onClick={() => setActiveSubTab('bom-unit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all ${
            activeSubTab === 'bom-unit'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>3. Costos (BOM) & Unit Economics</span>
        </button>

        <button
          onClick={() => setActiveSubTab('variables')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all ${
            activeSubTab === 'variables'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>5. Variables Críticas</span>
        </button>

        <button
          onClick={() => setActiveSubTab('funding')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all ${
            activeSubTab === 'funding'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          <span>6. Inversión Multinivel & Ask</span>
        </button>
      </div>

      {/* TAB 1: ARQUITECTURA TRIÁDICA */}
      {activeSubTab === 'architecture' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900">Estructura del Portafolio: 1 Insigne + 2 Complementarios</h3>
            <p className="text-sm text-slate-600 font-serif">
              Diseñado para resolver el terreno físico, la toma de decisiones basada en datos y la monetización del cumplimiento ambiental en Europa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Producto Insigne */}
            <div className="bg-gradient-to-b from-emerald-50 to-white p-6 rounded-2xl border-2 border-emerald-600 shadow-md relative space-y-4">
              <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-emerald-700 text-white font-sans text-[10px] font-bold uppercase tracking-wider">
                PRODUCTO INSIGNE (CORE FLAGSHIP)
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">AgroTwin</h4>
                <p className="text-xs text-emerald-800 font-sans font-semibold">Gemelo Digital Predial 3D & Automatización</p>
              </div>
              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Plataforma SaaS Cloud GIS que orquesta la telemetría microclimática de terreno con los pases de Sentinel-2. Simula balance hídrico, predice heladas y automatiza válvulas.
              </p>
              <div className="pt-3 border-t border-emerald-200/60 space-y-1.5 font-sans text-xs">
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Modelo:</span>
                  <span className="font-bold">SaaS $45k - $180k CLP/mes</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Margen Bruto:</span>
                  <span className="font-bold text-emerald-700">93% recurrente</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Impacto:</span>
                  <span className="font-bold">-35% consumo hídrico</span>
                </div>
              </div>
            </div>

            {/* Complementario 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm space-y-4">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-sans text-[10px] font-bold uppercase">
                COMPLEMENTARIO 1 (HARDWARE ON-FIELD)
              </span>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">KioT Agro-Shield & Chef-Kits</h4>
                <p className="text-xs text-amber-800 font-sans font-semibold">Hardware IoT IP65 Plug-and-Play</p>
              </div>
              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Nodos de campo ultra robustos fabricados en Talca (ESP32 + LoRaWAN + Sonda DS18B20 ±0.5°C). Capturan datos de brote y raíz para evitar la destrucción por heladas.
              </p>
              <div className="pt-3 border-t border-slate-100 space-y-1.5 font-sans text-xs">
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Costo Producción:</span>
                  <span className="font-bold font-mono">$60.000 CLP (~€60)</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">PVP Venta:</span>
                  <span className="font-bold font-mono">$200.000 CLP (~€200)</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Margen HW:</span>
                  <span className="font-bold text-emerald-700">70% de margen directo</span>
                </div>
              </div>
            </div>

            {/* Complementario 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm space-y-4">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-sans text-[10px] font-bold uppercase">
                COMPLEMENTARIO 2 (ESG & EXPORTACIÓN)
              </span>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                <Globe2 className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Pasaporte Verde & RewildMapper</h4>
                <p className="text-xs text-amber-800 font-sans font-semibold">Certificación Satelital ESG & Carbono UE</p>
              </div>
              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Certifica no-deforestación (EUDR) y captura de carbono en bosque nativo para exportadoras de fruta y vino hacia Europa. Código QR dinámico impreso en pallets de exportación.
              </p>
              <div className="pt-3 border-t border-slate-100 space-y-1.5 font-sans text-xs">
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Ticket B2B:</span>
                  <span className="font-bold font-mono">€500 - €2.000 / fundo</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Valor al Cliente:</span>
                  <span className="font-bold text-amber-800">+12-18% Green Premium</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span className="text-slate-500">Mercado Destino:</span>
                  <span className="font-bold">Alemania, Holanda, Reino Unido</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPETENCIA & MOATS */}
      {activeSubTab === 'traction' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>ESTRATEGIA DE ADOPCIÓN ACELERADA • VALLE DEL MAULE 2026</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Cómo Logramos Tracción Real con Clientes Agrícolas</h3>
            <p className="text-sm text-slate-600 font-serif">
              El agricultor no adopta promesas en PowerPoint; adopta tecnología cuando se derriba el riesgo percibido en su propio predio con métricas irrefutables.
            </p>
          </div>

          {/* 4 Pilares de Tracción */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-emerald-500 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-extrabold text-sm">
                  01
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Pilotos "Zero-Risk" (Cuartel Centinela)</h4>
                  <span className="text-xs text-emerald-700 font-mono font-bold">Conversión esperada &gt; 75%</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                Instalación de 1 nodo KioT en el cuartel más vulnerable (zona de helada tardía o sector crítico de riego) por 30 días sin costo anticipado. Cuando la alarma nocturna de helada alerta a tiempo o se demuestra un ahorro de energía del 25% en bombeo, el productor adquiere la cobertura del predio completo.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-emerald-500 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-mono font-extrabold text-sm">
                  02
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Caballo de Troya: Diagnóstico Satelital</h4>
                  <span className="text-xs text-blue-700 font-mono font-bold">Generación de Demanda Inbound</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                Entrega gratuita de un Informe de Vigor Vegetativo (NDVI) y balance hídrico histórico con Copernicus Sentinel-2. Al ver desde el espacio la variabilidad y sectores estresados que ignoraba, el agricultor solicita la red de sensores KioT en tierra para cerrar la brecha de decisión agronómica.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-emerald-500 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-mono font-extrabold text-sm">
                  03
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Alianzas de Cuenca & Asociaciones de Canalistas</h4>
                  <span className="text-xs text-amber-700 font-mono font-bold">Adquisición Masiva 1-a-Muchos</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                Convenios estratégicos con la Junta de Vigilancia del Río Maule, Asociaciones de Canalistas y Fedefruta. Permite presentar la solución en asambleas gremiales técnicas, logrando cerrar lotes de 20 a 50 predios con la confianza y aval institucional de sus pares.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-emerald-500 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-mono font-extrabold text-sm">
                  04
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Canal Exportadoras (Directiva EUDR)</h4>
                  <span className="text-xs text-purple-700 font-mono font-bold">Tracción B2B Top-Down</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                Las exportadoras de fruta de la zona central necesitan certificar trazabilidad de no-deforestación y huella ambiental para mantener sus góndolas en Alemania, Países Bajos y Reino Unido. La exportadora cofinancia o prescribe el Pasaporte Verde a su red de agricultores asociados.
              </p>
            </div>
          </div>

          {/* Métricas y Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6 bg-emerald-950 text-white rounded-2xl border border-emerald-800">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono block">Predios en Validación</span>
              <span className="text-2xl font-extrabold font-mono">12 Fundos</span>
              <span className="text-[11px] text-emerald-200 block">Maule & O'Higgins</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono block">Cartas de Intención (LOI)</span>
              <span className="text-2xl font-extrabold font-mono text-amber-400">US$ 85.000</span>
              <span className="text-[11px] text-emerald-200 block">Pre-temporada 2026/27</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono block">Tasa de Conversión</span>
              <span className="text-2xl font-extrabold font-mono text-emerald-300">&gt; 75%</span>
              <span className="text-[11px] text-emerald-200 block">Piloto a contrato anual</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono block">Tiempo de Payback</span>
              <span className="text-2xl font-extrabold font-mono">4,2 Meses</span>
              <span className="text-[11px] text-emerald-200 block">Flujo de caja positivo</span>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'competitors' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900">Benchmarking de Competencia & Fosos Defensivos (Moats)</h3>
            <p className="text-sm text-slate-600 font-serif">
              Análisis comparativo frente a referentes globales en base a CAPEX, soporte, soberanía técnica y cumplimiento ambiental.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[11px]">
                <tr>
                  <th className="p-3.5">Actor / Marca</th>
                  <th className="p-3.5">Enfoque Primario</th>
                  <th className="p-3.5">Modelo de Costos</th>
                  <th className="p-3.5">Limitación Principal</th>
                  <th className="p-3.5 text-emerald-800">Ventaja AgroTwin & KioT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">WiseConn / DropControl (Chile/EE.UU.)</td>
                  <td className="p-3.5">Control hidráulico y telemetría de válvulas</td>
                  <td className="p-3.5 font-mono">CAPEX US$3.000 - $6.000 + SaaS US$100/m</td>
                  <td className="p-3.5">Sistema cerrado, sin gemelo 3D ni certificación de biodiversidad</td>
                  <td className="p-3.5 font-semibold text-emerald-800">Holístico (riego + helada + Pasaporte Verde UE)</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">Pessl Instruments / METOS (Austria)</td>
                  <td className="p-3.5">Estaciones meteorológicas tradicionales</td>
                  <td className="p-3.5 font-mono">CAPEX US$4.000 - $8.000 + Licencias</td>
                  <td className="p-3.5">Cajas negras; repuestos importados lentos ante emergencias</td>
                  <td className="p-3.5 font-semibold text-emerald-800">Fabricación y soporte local en Talca en &lt; 2 hrs</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">Arable Labs (EE.UU.)</td>
                  <td className="p-3.5">Sensor todo-en-uno solar para dosel vegetal</td>
                  <td className="p-3.5 font-mono">SaaS US$1.500 - $2.200 / año</td>
                  <td className="p-3.5">Sin sondas de suelo profundo; costo prohibitivo para medianos</td>
                  <td className="p-3.5 font-semibold text-emerald-800">Medición a nivel de suelo real y precio accesible</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">Kilimo (Argentina / LatAm)</td>
                  <td className="p-3.5">Software satelital de balance hídrico</td>
                  <td className="p-3.5 font-mono">Compensaciones de agua B2B / SaaS</td>
                  <td className="p-3.5">Ciego a heladas por inversión térmica (no tiene hardware de campo)</td>
                  <td className="p-3.5 font-semibold text-emerald-800">Calibración en tierra con sensores a 30 cm de altura</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: BOM & UNIT ECONOMICS */}
      {activeSubTab === 'bom-unit' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* BOM Hardware */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-700" />
                  <span>BOM Nodo KioT Anti-Heladas (Costos Directos)</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                  Margen: 70%
                </span>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">ESP32 + Módulo LoRaWAN SX1262</span>
                  <span className="font-bold font-mono">$10.000 CLP</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">Sonda Térmica DS18B20 IP67 + Humedad v1.2</span>
                  <span className="font-bold font-mono">$5.600 CLP</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">Sensor Microclima SHT31 (Precisión)</span>
                  <span className="font-bold font-mono">$4.900 CLP</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">PCB KiCad + Relé de Potencia 10A</span>
                  <span className="font-bold font-mono">$5.000 CLP</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">Gabinete PETG IP65 + Batería LiFePO4 + Panel Solar</span>
                  <span className="font-bold font-mono">$16.500 CLP</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">Cables siliconados, sellos y mano de obra ensamble</span>
                  <span className="font-bold font-mono">$18.000 CLP</span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-emerald-800 text-white font-bold font-mono text-sm">
                  <span>COSTO TOTAL FABRICACIÓN (COGS):</span>
                  <span>$60.000 CLP (~€60)</span>
                </div>
                <p className="text-[11px] text-slate-500 font-serif pt-1">
                  * Precio de venta al productor: $200.000 CLP (~€200). Genera $140.000 CLP de margen bruto por nodo.
                </p>
              </div>
            </div>

            {/* Unit Economics SaaS */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span>Unit Economics de Cuenta Tipo (15 Hectáreas)</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono text-xs font-bold">
                  SaaS Margin: 93%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 block">CAC Promedio</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">US$ 380</span>
                  <span className="text-[10px] text-slate-400 block">Adquisición y terreno</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 block">Ticket Inicial Hardware</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">US$ 1.050</span>
                  <span className="text-[10px] text-slate-400 block">4 Nodos KioT + Gateway</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 block">ARR Recurrente</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">US$ 960/año</span>
                  <span className="text-[10px] text-slate-400 block">$75.000 CLP/mes AgroTwin</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 block">Customer Lifetime (LTV)</span>
                  <span className="text-lg font-extrabold text-emerald-700 font-mono">US$ 4.600</span>
                  <span className="text-[10px] text-slate-400 block">Ciclo de vida de 5 años</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs font-sans">
                <div className="space-y-0.5">
                  <span className="font-bold text-emerald-900 block">Período de Recuperación (Payback)</span>
                  <span className="text-emerald-700 text-[11px]">Recuperación total del CAC</span>
                </div>
                <span className="text-base font-extrabold text-emerald-800 font-mono">4,2 Meses</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: VARIABLES CRÍTICAS */}
      {activeSubTab === 'variables' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900">Las Variables que Gobiernan la Salud del Negocio</h3>
            <p className="text-sm text-slate-600 font-serif">
              Como director de operaciones y sostenibilidad, estos son los indicadores operativos y financieros de control semanal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Gauge className="w-4 h-4 text-emerald-700" />
                <span>Variables Técnicas</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Latencia de Alerta:</strong> &lt; 45 segundos para notificar descensos bajo 0.5°C antes de la helada.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>RMA Rate (Fallos de Hardware):</strong> Mantener por debajo del 3% anual con pruebas de estanqueidad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Deep-Sleep Efficiency:</strong> 95% del tiempo en reposo para autonomía solar indefinida.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <DollarSign className="w-4 h-4 text-amber-700" />
                <span>Variables Financieras</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Ciclo de Caja:</strong> Cobro 50% al reservar y 50% al instalar para evitar financiar inventario.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Mitigación Churn Invernal:</strong> Contratos anuales prorrateados en 12 cuotas con soporte pre-temporada.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>NRR &gt; 110%:</strong> Expansión de más nodos y módulos ESG en clientes existentes.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Globe2 className="w-4 h-4 text-cyan-700" />
                <span>Variables de Sostenibilidad (ESG)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                  <span><strong>Intensidad Hídrica (m³/kg):</strong> Reducción del 35% de agua extraída de napas subterráneas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                  <span><strong>Emisiones Evitadas:</strong> 40% ahorro eléctrico en motores de pozo profundo (tCO2e auditables).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                  <span><strong>Certificación EUDR:</strong> Verificación de cero deforestación con Sentinel-2 cada 5 días.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: INVERSIÓN MULTINIVEL */}
      {activeSubTab === 'funding' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900">Estrategia de Financiación Multinivel & Uso de Fondos</h3>
            <p className="text-sm text-slate-600 font-serif">
              Ruta estructurada para minimizar la dilución temprana de los fundadores apalancando fondos públicos no dilutivos y capital semilla estratégico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Nivel 1 • Completado</span>
              <h4 className="font-extrabold text-slate-900 text-sm">Bootstrapping</h4>
              <p className="text-xs text-slate-600 font-serif">€20.000 propios en I+D, diseño KiCad, primeros prototipos y venta de reportes.</p>
              <div className="pt-2 font-sans text-[11px] text-emerald-800 font-bold">Dilución: 0%</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Nivel 2 • En Ejecución</span>
              <h4 className="font-extrabold text-slate-900 text-sm">Fondos No Dilutivos</h4>
              <p className="text-xs text-slate-600 font-serif">CORFO Semilla Inicia ($15M CLP) + FIA Innovación ($45M-$90M CLP) para certificaciones y lote de gabinetes.</p>
              <div className="pt-2 font-sans text-[11px] text-emerald-800 font-bold">Dilución: 0%</div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-600 space-y-2 relative shadow-sm">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Nivel 3 • Actual (El Ask)</span>
              <h4 className="font-extrabold text-slate-900 text-sm">Ronda Semilla €75.000</h4>
              <p className="text-xs text-slate-700 font-serif">Instrumento SAFE (20% desc. / Cap €1.2M) para fabricar Lote de 200 nodos KioT y escalar AgroTwin.</p>
              <div className="pt-2 font-sans text-[11px] text-emerald-900 font-bold">Objetivo: Breakeven operacional</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Nivel 4 • 2028</span>
              <h4 className="font-extrabold text-slate-900 text-sm">Serie A / Expansión</h4>
              <p className="text-xs text-slate-600 font-serif">€1.5M - €3.0M con VCs europeos de ClimaTech para expansión comercial a Perú y Argentina.</p>
              <div className="pt-2 font-sans text-[11px] text-slate-600 font-bold">Escala Cono Sur & UE</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
