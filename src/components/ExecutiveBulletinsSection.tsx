import React, { useState } from 'react';
import { ShieldCheck, Scale, Clock, Users, ArrowUpRight, CheckCircle2, AlertCircle, FileText, ChevronRight, Layers, Sparkles } from 'lucide-react';

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
      author: 'Daniel (Fundador / Custodia IP)'
    },
    {
      id: 'boletin-2',
      number: 2,
      title: 'Tracción de Campo y Acuerdos CNR',
      subtitle: 'Resultados del Mes 1 en Parral y Catastro de Subsidios Ley 18.450',
      date: 'Próximamente (Nov 2026)',
      status: 'draft',
      author: 'Dirección AgroTech'
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
              Documentos de trabajo interno, acuerdos de gobernanza corporativa, modelos de compensación y estrategia fundacional compartida con el equipo.
            </p>
          </div>

          {/* Selector de Boletines */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-emerald-300/80 font-mono">Índice de Boletines:</span>
            <div className="flex flex-wrap gap-2">
              {bulletins.map((b) => (
                <button
                  key={b.id}
                  onClick={() => b.status === 'published' && setSelectedBulletinId(b.id)}
                  disabled={b.status === 'draft'}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedBulletinId === b.id
                      ? 'bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-300/50'
                      : b.status === 'draft'
                      ? 'bg-emerald-950/40 border border-emerald-900/40 text-emerald-600 cursor-not-allowed'
                      : 'bg-[#071A11] border border-emerald-500/30 text-emerald-200 hover:bg-emerald-900/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Boletín N.° {b.number}</span>
                  {b.status === 'draft' && <span className="text-[10px] opacity-60 font-mono">(Borrador)</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metadatos del Boletín Seleccionado */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold font-mono">
              N.° 1 — VIGENTE
            </span>
            <span className="text-emerald-300 font-semibold">Octubre 2026</span>
            <span className="text-emerald-500">•</span>
            <span className="text-emerald-200">Autoría: {bulletins[0].author}</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-amber-300 bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Documento Vinculante al Acuerdo Interno (MoU)</span>
          </div>
        </div>
      </div>

      {/* Cuerpo del Boletín N.° 1 */}
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

          {/* Subpestañas del Boletín */}
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
                2. Encuadre para el Equipo & Preguntas
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

          {/* Contenido Subpestaña 1: Gobierno */}
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
                    <h5 className="font-extrabold text-white text-base">Daniel (Fundador / Custodia IP)</h5>
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

          {/* Contenido Subpestaña 2: Roles */}
          {activeSubTab === 'roles' && (
            <div className="space-y-4">
              <p className="text-xs text-emerald-200/80 font-serif">
                Propuestas de encuadre constructivo y preguntas de alineación preparadas para la reunión de equipo:
              </p>

              {/* Pablo, Pancho, Wladimir */}
              <div className="p-5 rounded-xl bg-[#0B2519] border border-emerald-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💼</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">Pablo, Pancho & Wladimir</h4>
                      <p className="text-xs text-emerald-400">Canal Comercial, Redes Agrícolas e Institucionales</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                    Comisiones + Pool Accionario
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-emerald-900/50">
                  <p>• <b>Caja Inmediata:</b> 25% del Setup Fee inicial + 15% del MRR durante los primeros 12 meses de cada contrato.</p>
                  <p>• <b>Venta Spot:</b> 30% del valor neto facturado por cada Informe de Riesgo Satelital para compradores de parcelas.</p>
                  <p>• <b>Entrada al Equity:</b> Consolidación de acciones en la SpA operativa ligada a metas anuales de facturación.</p>
                  <div className="bg-[#071A11] p-3 rounded-lg border-l-2 border-emerald-400 text-emerald-200 mt-2 font-sans italic">
                    <b>Pregunta para la Reunión:</b> "¿Se sienten cómodos y motivados con una estructura donde sus ingresos crecen directamente con lo que cierren, respaldada por la opción de consolidar acciones operativas según su volumen de ventas?"
                  </div>
                </div>
              </div>

              {/* Luis */}
              <div className="p-5 rounded-xl bg-[#0B2519] border border-amber-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🚜</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">Luis (Parral & Retiro)</h4>
                      <p className="text-xs text-amber-400">Infraestructura de Campo, Sensores y Conectividad</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                    Doble Alternativa Abierta
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-amber-900/50">
                  <p>• <b>Opción A (Contratista Preferente):</b> 100% margen de mano de obra de montaje + margen por venta de hardware + 10% MRR recurrente por clientes que traiga al SaaS. Cero ataduras legales.</p>
                  <p>• <b>Opción B (Socio Operativo Regional):</b> Mantiene su esquema de márgenes y asume la dirección técnica de campo en el Maule Sur con participación por vesting en la SpA.</p>
                  <div className="bg-[#071A11] p-3 rounded-lg border-l-2 border-amber-400 text-amber-200 mt-2 font-sans italic">
                    <b>Pregunta para la Reunión:</b> "¿Prefieres operar con liquidez directa como contratista preferente o te interesa asumir un rol de socio operativo regional con equity en la empresa comercial?"
                  </div>
                </div>
              </div>

              {/* Cantuarias */}
              <div className="p-5 rounded-xl bg-[#0B2519] border border-indigo-500/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🎨</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">Cantuarias</h4>
                      <p className="text-xs text-indigo-400">Diseño de Interacción, UX/UI y Gamificación 3D</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
                    Hitos vs. Vesting
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-300 space-y-1.5 border-t border-indigo-900/50">
                  <p>• <b>Opción A (Consultor por Hitos):</b> Honorarios cerrados por entregables validados de interfaz en Figma y componentes de gamificación.</p>
                  <p>• <b>Opción B (Socio de Producto):</b> Acciones de la SpA operativa con vesting a 4 años, comprometiendo dedicación continua al frontend.</p>
                  <div className="bg-[#071A11] p-3 rounded-lg border-l-2 border-indigo-400 text-indigo-200 mt-2 font-sans italic">
                    <b>Pregunta para la Reunión:</b> "Dada tu disponibilidad actual: ¿prefieres honorarios contra entregables específicos o tienes el interés de vincularte como socio de producto mediante vesting a largo plazo?"
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contenido Subpestaña 3: Vesting */}
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

          {/* Contenido Subpestaña 4: Mes 1 */}
          {activeSubTab === 'mes1' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-[#0B2519] border border-emerald-500/30 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Brazo 1 • Spot ($0 Costo de Inventario)
                  </span>
                  <h4 className="font-extrabold text-white text-base">Informes Prediales de Riesgo Satelital</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-serif">
                    Validación satelital y legal de derechos de agua DGA, napas freáticas y riesgo de heladas/incendios para compradores de parcelas de agrado (5.000 m²).
                  </p>
                  <div className="pt-3 border-t border-emerald-900/50 flex justify-between items-center text-xs">
                    <span className="text-emerald-300">Meta: 10 a 15 informes</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">$1.200.000 a $1.800.000 CLP</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#0B2519] border border-amber-500/30 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Brazo 2 • Recurrencia (MRR)
                  </span>
                  <h4 className="font-extrabold text-white text-base">Upgrade Digital a Clientes de Luis en Parral</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-serif">
                    Conectar al gemelo digital y alertas climáticas a agricultores y fundos que ya compraron sistemas solares o cámaras 4G a Luis en Parral.
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

    </div>
  );
};
