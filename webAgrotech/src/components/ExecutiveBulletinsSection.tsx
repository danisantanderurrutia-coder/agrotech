import React, { useState } from 'react';
import { ShieldCheck, Scale, Clock, Users, ArrowUpRight, CheckCircle2, AlertCircle, FileText, ChevronRight, Layers, Sparkles, BatteryCharging, Flame, MapPin, GitBranch, Cpu, Briefcase } from 'lucide-react';

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
  const [selectedBulletinId, setSelectedBulletinId] = useState<string>('boletin-1');
  const [activeSubTab, setActiveSubTab] = useState<'gobierno' | 'roles' | 'vesting' | 'mes1'>('gobierno');

  const bulletins: Bulletin[] = [
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
                  {b.id === 'boletin-2' && <span className="text-[10px] text-amber-900 bg-amber-300/80 px-1 rounded font-mono">Nuevo</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metadatos del Boletín Seleccionado */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold font-mono">
              {selectedBulletinId === 'boletin-1' ? 'N.° 1 — VIGENTE' : 'N.° 2 — EN DESPLIEGUE'}
            </span>
            <span className="text-emerald-300 font-semibold">
              {selectedBulletinId === 'boletin-1' ? 'Octubre 2026' : 'Noviembre 2026'}
            </span>
            <span className="text-emerald-500">•</span>
            <span className="text-emerald-200">
              Autoría: {selectedBulletinId === 'boletin-1' ? bulletins[0].author : bulletins[1].author}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-amber-300 bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Documento Vinculante al Acuerdo Interno (MoU)</span>
          </div>
        </div>
      </div>

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

              {/* Luis González (Lápiz) & Rüdiger Kaatz (Rudi) */}
              <div className="p-5 rounded-xl bg-[#0B2519] border border-amber-500/40 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🚜</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Luis González ("Lápiz") & Rüdiger Kaatz ("Rudi")
                      </h4>
                      <p className="text-xs text-amber-300">
                        Asesores Técnicos Autónomos de Infraestructura Off-Grid & Terreno Parral
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                    Asesoría Autónoma + Living Lab
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-300 space-y-2 border-t border-amber-900/50">
                  <p>• <b>Luis González ("Lápiz"):</b> 100% del margen de mano de obra en montaje físico + margen sobre venta de hardware fotovoltaico/cámaras + 10% MRR recurrente por clientes de su red que adopten el gemelo digital.</p>
                  <p>• <b>Rüdiger Kaatz ("Rudi"):</b> Ingeniería en baterías recicladas (LiFePO4) y sistemas de aspersión perimetral anti-incendios + habilitación de su predio en Parral como <b>Living Lab Demostrativo</b> + canal comercial con inversionistas y residentes extranjeros.</p>
                  <p>• <b>Autonomía:</b> Sin relación laboral dependiente; operan como socios y proveedores estratégicos preferentes.</p>
                </div>
              </div>

              {/* Pablo Perez (Pablito) */}
              <div className="p-5 rounded-xl bg-[#0B2519] border border-emerald-500/40 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⚡</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">Pablo Perez ("Pablito")</h4>
                      <p className="text-xs text-emerald-300">El Conector Operativo & Venta Directa B2C</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                    Comisiones Spot + Paquetización + Pool SpA
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-emerald-900/50">
                  <p>• <b>Paquetización y Logística:</b> Recibe el hardware de Lápiz y Rudi, lo ensambla en kits KioT plug-and-play con código QR y lo moviliza en terreno.</p>
                  <p>• <b>Venta Directa Parcelas:</b> Lidera la venta de Informes Prediales de Riesgo Satelital ($80k-$150k c/u) con 30% de comisión directa.</p>
                  <p>• <b>Soporte Técnico:</b> Articula con Daniel en soporte informático de los pipelines de datos e ingesta predial.</p>
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
                    Validación satelital y legal de derechos de agua DGA, napas freáticas y riesgo de heladas/incendios para compradores de parcelas de agrado (5.000 m²). Liderado por Pablito, Pancho y Nene.
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
              <span className="text-slate-300">Pablo Perez ("Pablito") coordina el empaque y entrega de los kits demostrativos validados en el Living Lab.</span>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">Estado: En Implementación</span>
          </div>
        </div>
      )}

    </div>
  );
};
