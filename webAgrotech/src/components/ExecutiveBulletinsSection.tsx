import React, { useState } from 'react';
import { ShieldCheck, Scale, Clock, Users, ArrowUpRight, CheckCircle2, AlertCircle, FileText, ChevronRight, Layers, Sparkles, BatteryCharging, Flame, MapPin, GitBranch, Cpu, Briefcase, Zap, Smartphone, RefreshCw } from 'lucide-react';

interface Bulletin {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  date: string;
  status: 'published' | 'draft';
  author: string;
}

export const ExecutiveBulletinsSection: React.FC = () => {
  const [selectedBulletinId, setSelectedBulletinId] = useState<string>('boletin-3');
  const [activeSubTab, setActiveSubTab] = useState<'gobierno' | 'roles' | 'vesting' | 'mes1'>('gobierno');

  const bulletins: Bulletin[] = [
    {
      id: 'boletin-3',
      number: 3,
      title: 'Data Flywheel, AgroAlerta & Moratoria de Hardware',
      subtitle: 'Inversión del Embudo: Software-First en WhatsApp, Eliminación de Riesgo de Stock y Stacking de Margen Alto',
      date: 'Noviembre 2026',
      status: 'published',
      author: 'Daniel Santander (Fundador & Dirección Estratégica)'
    },
    {
      id: 'boletin-1',
      number: 1,
      title: 'Vesting, Soberanía y Esquema Interno',
      subtitle: 'Hacia la Formalización Operativa, Reparto Mixto de Valor y Blindaje Tecnológico',
      date: 'Octubre 2026',
      status: 'published',
      author: 'Daniel Santander (Fundador / Custodia IP)'
    },
    {
      id: 'boletin-2',
      number: 2,
      title: 'Despliegue Living Lab Parral & Alianzas Off-Grid',
      subtitle: 'Validación en Predio Rudi, Baterías Recicladas, Defensa Anti-Incendios y Red Expatriados',
      date: 'Noviembre 2026',
      status: 'published',
      author: 'Dirección AgroTech & Asesores Off-Grid'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Top Banner */}
      <div className="bg-[#0B2519] border border-emerald-500/30 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-emerald-900/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Boletines de Dirección & Gobernanza SpA</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Boletines Ejecutivos <span className="text-amber-400">AgroTech</span>
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/80 font-serif max-w-2xl mt-1">
              Documentos de trabajo interno, acuerdos de gobernanza corporativa, modelos de compensación y estrategia fundacional compartida con el equipo y asesores.
            </p>
          </div>

          {/* Selector de Boletines */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-emerald-300/80 font-mono">Índice de Boletines:</span>
            <div className="flex flex-wrap gap-2">
              {bulletins.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBulletinId(b.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedBulletinId === b.id
                      ? 'bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-300/50'
                      : 'bg-[#071A11] border border-emerald-500/30 text-emerald-200 hover:bg-emerald-900/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Boletín N.° {b.number}</span>
                  {b.id === 'boletin-3' && <span className="text-[10px] text-slate-950 bg-amber-400 px-1.5 py-0.5 rounded font-mono font-bold">Vigente 2026</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metadatos del Boletín Seleccionado */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold font-mono">
              {selectedBulletinId === 'boletin-3' ? 'N.° 3 — VIGENTE / ESTRATEGIA 2026' : selectedBulletinId === 'boletin-2' ? 'N.° 2 — EN DESPLIEGUE' : 'N.° 1 — FORMALIZADO'}
            </span>
            <span className="text-emerald-300 font-semibold">
              {bulletins.find(b => b.id === selectedBulletinId)?.date}
            </span>
            <span className="text-emerald-500">•</span>
            <span className="text-emerald-200">
              Autoría: {bulletins.find(b => b.id === selectedBulletinId)?.author}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-amber-300 bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Documento Vinculante al Acuerdo Interno (MoU)</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          CUERPO DEL BOLETÍN N.° 3: DATA FLYWHEEL & ROADMAP 3 FASES
          ======================================================== */}
      {selectedBulletinId === 'boletin-3' && (
        <div className="bg-[#071A11] border border-emerald-500/30 rounded-2xl p-6 lg:p-8 space-y-8 shadow-xl text-slate-100 animate-fadeIn">
          
          <div className="border-b border-emerald-900/60 pb-5 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Resolución Directiva de Estrategia • Vigente Noviembre 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono font-bold border border-amber-400/30">
                Aprobado por Fundador & Consejo
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Inversión del Embudo: Software-First, AgroAlerta y Moratoria de Stock Físico
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 font-serif leading-relaxed max-w-4xl">
              Resolución obligatoria para todo el equipo comercial y operativo: queda formalmente prohibido intentar vender hardware físico KioT en frío o inmovilizar capital de trabajo en inventario en bodega. Toda captación de clientes se realiza mediante el micro-SaaS de WhatsApp <strong>AgroAlerta</strong>, alimentando el <strong>Data Flywheel</strong> de la cuenca y escalando tickets vía <strong>Feature Stacking</strong>.
            </p>
          </div>

          {/* 4 Acuerdos Fundacionales del Boletín 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-xl bg-[#0B2519] border border-amber-500/30 hover:border-amber-400/60 transition-all space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-1 border border-amber-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">1. Moratoria de Hardware en Frío</h4>
              <p className="text-xs text-amber-200/80 font-serif leading-relaxed">
                El hardware físico pasa a <strong>Fase 2</strong>. Solo se cotiza o ensambla bajo pedido (Just-In-Time) como un upgrade de calibración in-situ para agricultores que ya pagan software. Cero riesgo de obsolescencia.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0B2519] border border-emerald-500/30 hover:border-emerald-400/60 transition-all space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-1 border border-emerald-500/20">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">2. AgroAlerta WhatsApp (CAC $18)</h4>
              <p className="text-xs text-emerald-200/80 font-serif leading-relaxed">
                El canal de penetración primario es WhatsApp. En 60 segundos el productor registra su Rol y cultivo. El costo de servicio es ~$0 gracias a la telemetría abierta Sentinel-2, Landsat y reanálisis climático ERA5.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0B2519] border border-teal-500/30 hover:border-teal-400/60 transition-all space-y-2">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-1 border border-teal-500/20">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">3. El Loop Virtuoso (Datawheel)</h4>
              <p className="text-xs text-teal-200/80 font-serif leading-relaxed">
                Cada predio nuevo ingresado auto-delinea su polígono y densifica la Malla Hexgrid H3 de la cuenca (Curicó, Linares, Talca). El Gemelo Maestro afina su precisión microclimática sin gastar un peso en brigadas de campo.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0B2519] border border-blue-500/30 hover:border-blue-400/60 transition-all space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-1 border border-blue-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">4. Feature Stacking (Margen 91%)</h4>
              <p className="text-xs text-blue-200/80 font-serif leading-relaxed">
                Una vez ganada la confianza diaria del agrónomo, se activan módulos de alto ticket con 1 clic: BV Agua ($45k/mes), BV Fuego ($60k/mes) y Pasaporte Verde EUDR (€1.100), elevando el ARPU sin nuevo CAC.
              </p>
            </div>

          </div>

          {/* Tabla de Metas Operativas Maule Q4 2026 - Q1 2027 */}
          <div className="p-6 rounded-2xl bg-[#0B2519] border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-base text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>Plan de Ejecución Territorial Maule (Q4 2026 — Q1 2027)</span>
              </h4>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                Objetivo: 120 Predios Conectados
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-emerald-800/80 text-emerald-300 font-mono">
                    <th className="py-2.5 pr-4">Hito Operativo</th>
                    <th className="py-2.5 px-4">Canal / Producto</th>
                    <th className="py-2.5 px-4">Zona Prioritaria</th>
                    <th className="py-2.5 px-4">Métrica de Éxito</th>
                    <th className="py-2.5 pl-4 text-right">Responsable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/40 text-slate-200">
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">Despliegue AgroAlerta WhatsApp</td>
                    <td className="py-3 px-4 font-mono text-emerald-400">Micro-SaaS Heladas / Agua</td>
                    <td className="py-3 px-4">Curicó & Linares (Cerezo / Avellano)</td>
                    <td className="py-3 px-4">120 usuarios activos (&gt;75% retención)</td>
                    <td className="py-3 pl-4 text-right font-mono text-amber-300">Daniel Santander</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">Feature Stacking: BV Agua & Fuego</td>
                    <td className="py-3 px-4 font-mono text-teal-400">Software Satelital Recurrente</td>
                    <td className="py-3 px-4">Valle Central Maule</td>
                    <td className="py-3 px-4">35% conversión a planes de pago ($52k ARPU)</td>
                    <td className="py-3 pl-4 text-right font-mono text-amber-300">Equipo Comercial</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">Upgrade a Hardware Físico KioT</td>
                    <td className="py-3 px-4 font-mono text-amber-400">Fase 2: Sensores de Precisión</td>
                    <td className="py-3 px-4">Clientes Software Pro</td>
                    <td className="py-3 px-4">30 estaciones bajo pedido (cero stock ocioso)</td>
                    <td className="py-3 pl-4 text-right font-mono text-amber-300">Rüdiger Kaatz & Daniel</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-bold text-white">Living Lab & Alianzas</td>
                    <td className="py-3 px-4 font-mono text-blue-400">Fase 3: I+D & Academia</td>
                    <td className="py-3 px-4">San Clemente & Parral</td>
                    <td className="py-3 px-4">Postulación ANID / CORFO y validación agroecológica</td>
                    <td className="py-3 pl-4 text-right font-mono text-amber-300">Daniel & Asesores</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================
          CUERPO DEL BOLETÍN N.° 1
          ======================================================== */}
      {selectedBulletinId === 'boletin-1' && (
        <div className="bg-[#071A11] border border-emerald-500/20 rounded-2xl p-6 lg:p-8 space-y-8 shadow-xl text-slate-100">
          
          {/* 3 Principios Fundacionales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#0B2519] border border-emerald-500/30 hover:border-emerald-400/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Soberanía de IP</h3>
              <p className="text-xs text-emerald-200/70 mt-2 leading-relaxed">
                El motor matemático, código fuente y shaders de AgriTwin quedan bajo custodia y titularidad exclusiva del fundador (Daniel), licenciándose a la SpA operativa.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0B2519] border border-amber-500/30 hover:border-amber-400/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 mb-3 border border-amber-500/20">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Reparto Mixto de Valor</h3>
              <p className="text-xs text-amber-200/70 mt-2 leading-relaxed">
                Nadie financia inventario ni trabaja gratis. Flujo de caja inmediato (comisiones de venta y margen de hardware) + acceso a equity en la SpA operativa por resultados.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0B2519] border border-indigo-500/30 hover:border-indigo-400/50 transition-all">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3 border border-indigo-500/20">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Vesting Protector</h3>
              <p className="text-xs text-indigo-200/70 mt-2 leading-relaxed">
                Plan a 4 años con 1 año de Cliff. Se premia la permanencia y el trabajo real, eliminando de raíz el riesgo de socios fantasma (<i>dead equity</i>).
              </p>
            </div>
          </div>

          {/* Subpestañas del Boletín N.° 1 */}
          <div className="border-b border-emerald-900/60 pb-3">
            <div className="flex flex-wrap gap-2 text-xs font-bold font-sans">
              <button
                onClick={() => setActiveSubTab('gobierno')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeSubTab === 'gobierno'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'bg-[#0B2519] text-emerald-300 hover:bg-emerald-900 border border-emerald-800'
                }`}
              >
                1. Arquitectura Societaria & Blindaje IP
              </button>
              <button
                onClick={() => setActiveSubTab('roles')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeSubTab === 'roles'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                    : 'bg-[#0B2519] text-amber-300 hover:bg-emerald-900 border border-emerald-800'
                }`}
              >
                2. Encuadre para el Equipo & Asesores
              </button>
              <button
                onClick={() => setActiveSubTab('vesting')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeSubTab === 'vesting'
                    ? 'bg-indigo-400 text-slate-950 font-black shadow-md'
                    : 'bg-[#0B2519] text-indigo-300 hover:bg-emerald-900 border border-emerald-800'
                }`}
              >
                3. Cronología del Vesting (4 Años / Cliff)
              </button>
              <button
                onClick={() => setActiveSubTab('mes1')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeSubTab === 'mes1'
                    ? 'bg-emerald-400 text-slate-950 font-black shadow-md'
                    : 'bg-[#0B2519] text-emerald-300 hover:bg-emerald-900 border border-emerald-800'
                }`}
              >
                4. Plan Táctico Mes 1 ($0 Inventario)
              </button>
            </div>
          </div>

          {/* Subpestaña 1: Gobierno */}
          {activeSubTab === 'gobierno' && (
            <div className="space-y-6">
              <div className="bg-[#0B2519]/80 border border-emerald-500/20 rounded-xl p-6">
                <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  La Regla de las Dos Entidades (Separación Patrimonial)
                </h4>
                <p className="text-xs text-emerald-200/80 leading-relaxed mb-6 font-serif">
                  Para que la empresa pueda operar con flexibilidad comercial sin arriesgar jamás la matriz de código construida, dividimos la estructura en dos niveles bajo la Ley N° 17.336 de Propiedad Intelectual de Chile:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      Nivel 1 • Activo Intangible Soberano
                    </span>
                    <h5 className="font-extrabold text-white text-base">Daniel Santander (Fundador / Custodia IP)</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Titular moral y patrimonial absoluto de la plataforma AgriTwin, el motor biofísico 3D, algoritmos FAO-56, pipelines satelitales Sentinel-2 y marcas comerciales.
                    </p>
                    <div className="text-[11px] text-emerald-300 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800 font-mono">
                      🔒 Inalienable: No entra a reparto inicial ni se diluye.
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">
                      Nivel 2 • Vehículo Mercantil Operativo
                    </span>
                    <h5 className="font-extrabold text-white text-base">Chile AgroTech SpA</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Sociedad por Acciones chilena que firma contratos con agricultores, cobra suscripciones SaaS, compra insumos de hardware y reparte utilidades al equipo.
                    </p>
                    <div className="text-[11px] text-indigo-300 bg-indigo-950/60 p-2.5 rounded-lg border border-indigo-800 font-mono">
                      📜 Licencia Comercial temporal, no exclusiva y revocable.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subpestaña 2: Roles y Asesores Actualizados */}
          {activeSubTab === 'roles' && (
            <div className="space-y-4">
              <p className="text-xs text-emerald-200/80 font-serif">
                Estructura de compensación y encuadre operativo con nombres completos y apodos para la alineación del equipo:
              </p>

              {/* Rüdiger Kaatz (Rudi) - Conector Operativo y Living Lab */}
              <div className="p-5 rounded-xl bg-[#0B2519] border border-amber-500/50 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🔋</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Rüdiger Kaatz ("Rudi")
                      </h4>
                      <p className="text-xs text-amber-300">
                        Ingeniero Informático • El Conector Operativo, Infraestructura Off-Grid & Living Lab Parral
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                    Operación de Campo + Living Lab + Pool SpA
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-amber-900/50">
                  <p>• <b>Paquetización y Logística en Terreno:</b> Centraliza y ensambla los kits KioT plug-and-play con códigos QR, coordinando la movilidad y entrega directa en el Maule Sur.</p>
                  <p>• <b>Venta Directa B2C (Parcelas):</b> Lidera la comercialización directa de Informes Prediales de Riesgo Satelital ($80k-$150k c/u) con 30% de comisión directa.</p>
                  <p>• <b>Ingeniería Off-Grid & Baterías:</b> Almacenamiento con bancos LiFePO4 recicladas de alta densidad y sistemas de aspersión perimetral anti-incendios.</p>
                  <p>• <b>Living Lab Demostrativo Parral:</b> Showroom en su predio para validación técnica en vivo y canal de prospección con inversionistas y clientes extranjeros.</p>
                </div>
              </div>

              {/* Luis González (Lápiz) */}
              <div className="p-5 rounded-xl bg-[#0B2519] border border-emerald-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🚜</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Luis González ("Lápiz")
                      </h4>
                      <p className="text-xs text-emerald-300">
                        Asesor Técnico Autónomo de Infraestructura Off-Grid & Terreno Parral
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                    Asesoría Autónoma & Montaje
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-emerald-900/50">
                  <p>• <b>Montaje e Instalación Física:</b> 100% del margen de mano de obra en montaje físico de postes, cámaras 4G solares, sensores y cableados.</p>
                  <p>• <b>Hardware Fotovoltaico y Seguridad:</b> Margen sobre venta de equipos fotovoltaicos y módulos de biovisión perimetral.</p>
                  <p>• <b>Canal de Clientes y Royalty:</b> 10% de MRR recurrente por clientes de su red en Parral/Retiro que adopten el gemelo digital AgriTwin.</p>
                </div>
              </div>

              {/* Wladimir Gutierrez (Nene) & Francisco Ipinza (Pancho) */}
              <div className="p-5 rounded-xl bg-[#0B2519] border border-indigo-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💼</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Wladimir Gutierrez ("Nene") & Francisco Ipinza ("Pancho")
                      </h4>
                      <p className="text-xs text-indigo-300">Fuerza Comercial B2B & Relacionamiento Agroindustrial</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
                    Comisiones B2B + Vesting Accionario
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-indigo-900/50">
                  <p>• <b>Cuentas B2B Medianas:</b> 25% del Setup Fee + 15% del MRR durante los primeros 12 meses en viñas, frigoríficos, packings y frutícolas.</p>
                  <p>• <b>Convenios Inmobiliarios (Pancho):</b> Alianzas con corredoras de propiedades y desarrolladores de loteos para venta masiva de informes.</p>
                  <p>• <b>Pool de Vesting:</b> Consolidación de acciones en la SpA operativa a 4 años con 1 año de cliff por metas de facturación anual.</p>
                </div>
              </div>

              {/* Cristian Cantuarias (Cantuarias) */}
              <div className="p-5 rounded-xl bg-[#0B2519] border border-cyan-500/40 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🎨</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">Cristian Cantuarias ("Cantuarias")</h4>
                      <p className="text-xs text-cyan-300">Lead Game Designer & Co-Diseñador UI/UX Front-End 3D</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                    IP Assignment + Git Flow + Vesting
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-cyan-900/50">
                  <p>• <b>Visor 3D Diegético:</b> Co-diseño del gemelo digital estilo simulación estratégica (Civilization / Farming Simulator / Taller Agrícola).</p>
                  <p>• <b>Gobernanza de Código:</b> Trabajo en ramas protegidas (<code>feature/ui</code>, <code>feature/gamification</code>) con Pull Requests aprobados por Daniel.</p>
                  <p>• <b>Cesión de IP:</b> Acuerdo formal de cesión de derechos de autor de sus desarrollos (IP Assignment) a cambio de participación en el pool de vesting accionario de la SpA.</p>
                </div>
              </div>

              {/* Daniela Mendoza */}
              <div className="p-5 rounded-xl bg-[#0B2519] border border-teal-500/40 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🗺️</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">Daniela Mendoza</h4>
                      <p className="text-xs text-teal-300">Lead de Validación Geoespacial & Teledetección (Geógrafa Censat Colombia)</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                    QA/QC Cartográfico + Validación Científica
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-teal-900/50">
                  <p>• <b>Validación y QA/QC de Mapas:</b> Control de calidad científico de las capas satelitales (Sentinel-2, NDVI/NDRE, coberturas y drenaje).</p>
                  <p>• <b>Análisis de Cuencas y Relieve:</b> Validación de límites de cuencas hidrográficas, escorrentía superficial y modelos topográficos ALOS PALSAR.</p>
                  <p>• <b>Ruta al Pasaporte Verde:</b> Estandarización metodológica para la certificación socioambiental y trazabilidad de deforestación.</p>
                </div>
              </div>

            </div>
          )}

          {/* Subpestaña 3: Vesting */}
          {activeSubTab === 'vesting' && (
            <div className="bg-[#0B2519]/80 border border-emerald-500/20 rounded-xl p-6 space-y-6">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Mecánica del Pool de Vesting (4 Años con 1 Año de Cliff)
              </h4>
              <p className="text-xs text-emerald-200/80 leading-relaxed font-serif">
                El vesting es el estándar de las empresas tecnológicas para asegurar que nadie se quede con acciones de la empresa si abandona el barco en los primeros meses:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] font-bold">Hito 0</span>
                  <h5 className="font-bold text-white text-sm">Día 0: Firma MoU</h5>
                  <p className="text-slate-400 text-[11px]">0% acciones. Inicio formal del reloj de permanencia y fijación de metas comerciales.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">Meses 1-11</span>
                  <h5 className="font-bold text-amber-300 text-sm">El "Cliff" Protector</h5>
                  <p className="text-slate-300 text-[11px]">Perciben comisiones y honorarios activos. Si alguien se retira, se va con <b>0% de acciones</b>.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">Mes 12</span>
                  <h5 className="font-bold text-emerald-400 text-sm">Fin del Cliff (25%)</h5>
                  <p className="text-slate-300 text-[11px]">Cumplidas las metas mínimas anuales, se consolida de golpe el <b>25% de las acciones asignadas</b>.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold">Meses 13-48</span>
                  <h5 className="font-bold text-indigo-300 text-sm">Pro-Rata Mensual</h5>
                  <p className="text-slate-300 text-[11px]">Desbloqueo gradual del <b>2.08% mensual</b> hasta completar el 100% de la participación al año 4.</p>
                </div>
              </div>
            </div>
          )}

          {/* Subpestaña 4: Mes 1 */}
          {activeSubTab === 'mes1' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#0B2519] border border-emerald-500/30 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Brazo 1 • Spot ($0 Costo de Inventario)
                  </span>
                  <h4 className="font-extrabold text-white text-base">Informes Prediales de Riesgo Satelital</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-serif">
                    Validación satelital y legal de derechos de agua DGA, napas freáticas y riesgo de heladas/incendios para compradores de parcelas de agrado (5.000 m²). Liderado por Rudi, Pancho y Nene.
                  </p>
                  <div className="pt-3 border-t border-emerald-900/50 flex justify-between items-center text-xs">
                    <span className="text-emerald-300">Meta: 10 a 15 informes</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">$1.200.000 a $1.800.000 CLP</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0B2519] border border-amber-500/30 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Brazo 2 • Recurrencia & Living Lab
                  </span>
                  <h4 className="font-extrabold text-white text-base">Upgrade Clientes de Lápiz & Living Lab de Rudi</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-serif">
                    Conectar al gemelo digital y alertas climáticas a agricultores de Lápiz en Parral, complementado con las visitas técnicas al predio demostrativo de Rudi.
                  </p>
                  <div className="pt-3 border-t border-amber-900/50 flex justify-between items-center text-xs">
                    <span className="text-amber-300">Meta: 3 a 5 fundos</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">$120.000 a $200.000 CLP/mes</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================
          CUERPO DEL BOLETÍN N.° 2: LIVING LAB PARRAL
          ======================================================== */}
      {selectedBulletinId === 'boletin-2' && (
        <div className="bg-[#071A11] border border-amber-500/30 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl text-slate-100 animate-fadeIn">
          <div className="border-b border-emerald-900/60 pb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono font-bold mb-2 border border-amber-400/30">
              <MapPin className="w-3.5 h-3.5" />
              Living Lab Parral • Precordillera Maule Sur
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">
              Despliegue del Centro Demostrativo y Alianzas Off-Grid
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/70 font-serif mt-1">
              Validación en terreno real con Rüdiger Kaatz ("Rudi") y Luis González ("Lápiz").
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#0B2519] border border-emerald-500/30 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">1. Baterías Recicladas LiFePO4</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-serif">
                Ingeniería desarrollada por Rudi para almacenamiento off-grid a una fracción del costo de baterías comerciales, permitiendo autonomía total sin red de CGE.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0B2519] border border-amber-500/30 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">2. Defensa Activa Anti-Incendios</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-serif">
                Sistema perimetral de aspersión de alta presión con bombeo solar y disparo automático por detección térmica del gemelo digital ante focos de fuego.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0B2519] border border-indigo-500/30 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">3. Canal Expatriados & Parceleros</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-serif">
                Showroom en terreno para recibir a compradores europeos y de alto poder adquisitivo que buscan parcelas autosustentables y seguras en la precordillera.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold font-mono">Articulación Logística:</span>
              <span className="text-slate-300">Rüdiger Kaatz ("Rudi") coordina el empaque, integración y entrega de los kits demostrativos validados en el Living Lab.</span>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">Estado: En Implementación</span>
          </div>
        </div>
      )}

    </div>
  );
};
