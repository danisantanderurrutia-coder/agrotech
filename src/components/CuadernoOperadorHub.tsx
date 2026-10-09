import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, CheckSquare, Square, Trash2, Download, ExternalLink, 
  Plus, ShieldCheck, User, Compass, Filter, Sparkles, AlertCircle
} from 'lucide-react';
import { AGROTECH_CURRENT_INFRASTRUCTURE } from '../data/permacultureData';

interface Task {
  id: string;
  text: string;
  branchId: string; // 'galpon' | 'invernadero' | 'establo' | 'incursion' | 'cerro' | 'mesa'
  isPersonal: boolean; // Flag para cosas personales del operador
  completed: boolean;
  createdAt: number;
}

export interface AoEBranchDef {
  id: string;
  name: string;
  hash: string;
  port: number;
  permacultureZone: string;
  summary: string;
  icon: string;
  color: string;
  aoeMenuBg: string;
}

// Las 6 Ramas Territoriales (exactamente equivalentes a los 6 menús AoE del territorio e instancias de trabajo)
export const AOE_BRANCHES: AoEBranchDef[] = [
  {
    id: 'galpon',
    name: 'El Galpón Predial (3D)',
    hash: '#predio',
    port: 7773,
    permacultureZone: 'Zona 0 & 1',
    summary: 'Motor Three.js desacoplado, insolación horaria y telemetría microclimática brote a brote.',
    icon: '🏡',
    color: '#38bdf8',
    aoeMenuBg: 'assets/ui/workshop_bg.png'
  },
  {
    id: 'invernadero',
    name: 'Invernadero & Cultivos',
    hash: '#invernadero',
    port: 7777,
    permacultureZone: 'Zona 1 & 2',
    summary: 'Domo biofábrica, producción de Bokashi maduro (1.5 kg/árbol), consorcios con trébol y agrovoltaico 120 kWp.',
    icon: '🌿',
    color: '#34d399',
    aoeMenuBg: 'assets/ui/invernadero_landing_bg.jpg'
  },
  {
    id: 'establo',
    name: 'Establo & Ganadería PRV',
    hash: '#establo',
    port: 7777,
    permacultureZone: 'Zona 2 & 3',
    summary: 'Pastoreo Racional Voisin en 8 potreros (P1 a P8), aforo de forraje kgMs/ha y flota Egg Mobile sanitizadora.',
    icon: '🐄',
    color: '#f59e0b',
    aoeMenuBg: 'assets/ui/establo_landing_bg.jpg'
  },
  {
    id: 'incursion',
    name: 'Incursión a Campo (Rewilding)',
    hash: '#incursion',
    port: 7772,
    permacultureZone: 'Zona 5',
    summary: 'Corredor ribereño nativo en Estero Colliguay (peumo, quillay, boldo, maitén) y conservación perpetua.',
    icon: '🌲',
    color: '#a3e635',
    aoeMenuBg: 'assets/ui/incursion_landing_bg.jpg'
  },
  {
    id: 'cerro',
    name: 'La Cumbre del Cerro (Cuenca)',
    hash: '#cerro',
    port: 7777,
    permacultureZone: 'Zona 4 & Macro',
    summary: 'Mirador de cuenca regional a escala macro (122.000 ha), riesgo de incendios FWI e hidrología de cuenca TWI.',
    icon: '🏔️',
    color: '#c084fc',
    aoeMenuBg: 'assets/ui/cerro_landing_bg.jpg'
  },
  {
    id: 'mesa',
    name: 'La Mesa Vecinal DAO',
    hash: '#mesa',
    port: 7777,
    permacultureZone: 'Infraestructura Social',
    summary: 'Gobernanza comunitaria, asambleas campesinas, pactos de agua con APRs y cooperativa de trabajo.',
    icon: '👥',
    color: '#60a5fa',
    aoeMenuBg: 'assets/ui/vecinal_meeting_landing.jpg'
  }
];

const STORAGE_KEY = 'agritwin_operator_fieldnotes_v1';

interface CuadernoOperadorHubProps {
  onNavigate?: (viewId: string) => void;
}

export const CuadernoOperadorHub: React.FC<CuadernoOperadorHubProps> = ({ onNavigate }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [scratchpad, setScratchpad] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all'); // 'all' o branch.id
  const [filterPersonalOnly, setFilterPersonalOnly] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'scratchpad'>('tasks');
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [newTaskBranch, setNewTaskBranch] = useState<string>('galpon');
  const [newTaskIsPersonal, setNewTaskIsPersonal] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('Guardado localmente');

  // Cargar datos desde localStorage (persistencia autónoma)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.tasks)) {
          // Normalizar las tareas si venían del formato anterior
          const normalized = parsed.tasks.map((t: any) => ({
            id: t.id || 'task_' + Math.random(),
            text: t.text || '',
            branchId: AOE_BRANCHES.some(b => b.id === t.branchId) ? t.branchId : 'galpon',
            isPersonal: Boolean(t.isPersonal || t.branchId === 'personal'),
            completed: Boolean(t.completed),
            createdAt: t.createdAt || Date.now()
          }));
          setTasks(normalized);
        }
        if (typeof parsed.scratchpad === 'string') {
          setScratchpad(parsed.scratchpad);
        }
      } else {
        // Datos iniciales de demostración en los 6 lugares del territorio
        const demoTasks: Task[] = [
          {
            id: 'demo_1',
            text: 'Revisar lubricación de cuchillas y herramientas en el Taller del Galpón',
            branchId: 'galpon',
            isPersonal: false,
            completed: false,
            createdAt: Date.now() - 3600000
          },
          {
            id: 'demo_2',
            text: 'Revisar volteo de pila de Bokashi en el Domo del Invernadero',
            branchId: 'invernadero',
            isPersonal: false,
            completed: false,
            createdAt: Date.now() - 2800000
          },
          {
            id: 'demo_3',
            text: 'Rotar bovinos desde Potrero P3 hacia P4 y limpiar bebedero gravitacional',
            branchId: 'establo',
            isPersonal: false,
            completed: false,
            createdAt: Date.now() - 1800000
          },
          {
            id: 'demo_4',
            text: 'Monitorear vigor de rebrotes de Peumo en transecto ribereño del Estero',
            branchId: 'incursion',
            isPersonal: false,
            completed: false,
            createdAt: Date.now() - 5400000
          },
          {
            id: 'demo_5',
            text: 'Verificar estación meteorológica y alerta de viento Puelche en la Cumbre',
            branchId: 'cerro',
            isPersonal: false,
            completed: false,
            createdAt: Date.now() - 6200000
          },
          {
            id: 'demo_6',
            text: 'Preparar minuta para asamblea de agua con vecinos y directiva APR',
            branchId: 'mesa',
            isPersonal: false,
            completed: false,
            createdAt: Date.now() - 7200000
          },
          {
            id: 'demo_7',
            text: 'Comprar botas de recambio para faena y avisar horario de salida a casa',
            branchId: 'galpon',
            isPersonal: true,
            completed: true,
            createdAt: Date.now() - 9000000
          }
        ];
        const demoScratchpad = "Bitácora libre del operador:\n- Jornada con cielo despejado y buen aforo en zanjas Keyline.\n- Clarita y el rebaño respondieron bien a la rotación Voisin en potrero P3.\n- Apunte personal: solicitar recambio de guantes de faena para la próxima semana.";
        setTasks(demoTasks);
        setScratchpad(demoScratchpad);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          tasks: demoTasks,
          scratchpad: demoScratchpad
        }));
      }
    } catch (e) {
      console.warn('Error leyendo Cuaderno de localStorage:', e);
    }
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      parsed.tasks = newTasks;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      setSaveStatus('Guardado');
      setTimeout(() => setSaveStatus('Guardado localmente'), 2000);
    } catch (e) {
      console.error('Error guardando tareas:', e);
    }
  };

  const handleScratchpadChange = (text: string) => {
    setScratchpad(text);
    setSaveStatus('Guardando...');
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      parsed.scratchpad = text;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      setSaveStatus('Guardado');
      setTimeout(() => setSaveStatus('Guardado localmente'), 1500);
    } catch (e) {
      console.error('Error guardando scratchpad:', e);
    }
  };

  const handleAddTask = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: 'task_' + Date.now(),
      text: newTaskText.trim(),
      branchId: newTaskBranch,
      isPersonal: newTaskIsPersonal,
      completed: false,
      createdAt: Date.now()
    };

    saveTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  const handleToggleTask = (taskId: string) => {
    const updated = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    saveTasks(updated);
  };

  const handleDeleteTask = (taskId: string) => {
    const updated = tasks.filter(t => t.id !== taskId);
    saveTasks(updated);
  };

  const handleClearCompleted = () => {
    const count = tasks.filter(t => t.completed).length;
    if (count === 0) return;
    if (window.confirm(`¿Eliminar las ${count} tareas completadas?`)) {
      saveTasks(tasks.filter(t => !t.completed));
    }
  };

  const handleExportTxt = () => {
    const dateStr = new Date().toISOString().split('T')[0];
    let content = `=== AGRITWIN • CUADERNO DEL OPERADOR (${dateStr}) ===\n`;
    content += `* Apuntes y tareas por las 6 ramas territoriales (menús AoE / Twin)\n`;
    content += `* (100% Desacoplado de bases de datos consolidadas)\n\n`;

    AOE_BRANCHES.forEach(branch => {
      const branchTasks = tasks.filter(t => t.branchId === branch.id);
      content += `=================================================\n`;
      content += `${branch.icon} RAMA: ${branch.name.toUpperCase()} (${branch.permacultureZone})\n`;
      content += `Destino: :${branch.port}${branch.hash} | ${branch.summary}\n`;
      content += `-------------------------------------------------\n`;
      
      const pending = branchTasks.filter(t => !t.completed);
      const done = branchTasks.filter(t => t.completed);

      if (pending.length === 0 && done.length === 0) {
        content += `(Sin tareas en esta rama)\n\n`;
      } else {
        pending.forEach(t => {
          content += `[ ] ${t.text} ${t.isPersonal ? '[👤 Personal]' : '[🌱 Operativo]'}\n`;
        });
        done.forEach(t => {
          content += `[X] ${t.text} ${t.isPersonal ? '[👤 Personal]' : '[🌱 Operativo]'}\n`;
        });
        content += `\n`;
      }
    });

    content += `--- BLOC LIBRE DEL OPERADOR (SCRATCHPAD) ---\n`;
    content += (scratchpad || '(Vacío)') + `\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cuaderno_operador_6_ramas_${dateStr}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openAoeMenu = (branch: AoEBranchDef) => {
    let url = `http://localhost:${branch.port}/${branch.hash}`;
    if (branch.id === 'galpon') {
      url = 'http://localhost:7773/?mode=3d';
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Filtrado de tareas
  const filteredTasks = tasks.filter(t => {
    if (selectedBranch !== 'all' && t.branchId !== selectedBranch) return false;
    if (filterPersonalOnly && !t.isPersonal) return false;
    return true;
  });

  const pendingTasks = filteredTasks.filter(t => !t.completed);
  const completedTasks = filteredTasks.filter(t => t.completed);
  const totalPending = tasks.filter(t => !t.completed).length;
  const personalPending = tasks.filter(t => t.isPersonal && !t.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-fadeIn pb-24 text-white">
      
      {/* 1. Header Principal del Cuaderno */}
      <div className="bg-[#0B2519] p-6 sm:p-8 rounded-3xl border border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/15 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ClipboardList className="w-3.5 h-3.5 text-amber-400" />
                Cuaderno de Operaciones • 6 Ramas del Territorio
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] font-bold">
                100% Desacoplado • No Consolidado
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Bitácora de Campo en las 6 Ramas & Menús AoE
            </h1>

            <p className="text-emerald-200/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Las <strong>6 ramas de trabajo</strong> corresponden exactamente a los <strong>6 menús AoE y lugares del territorio</strong>. En este cuaderno puedes llevar tanto tus apuntes y tareas operativas de cada lugar como tus notas personales, con acceso directo para saltar al Gemelo Digital o Menú AoE respectivo.
            </p>
          </div>

          {/* Acciones Rápidas del Header */}
          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportTxt}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#071A11] border border-emerald-500/40 text-emerald-200 text-xs font-bold hover:text-white hover:border-amber-400 transition-all shadow-sm"
                title="Descargar todos mis apuntes organizados por las 6 ramas en .txt"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Exportar Apuntes (.txt)</span>
              </button>

              <button
                onClick={handleClearCompleted}
                disabled={tasks.filter(t => t.completed).length === 0}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 text-xs font-bold hover:bg-red-900/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                title="Eliminar tareas completadas"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Limpiar ({tasks.filter(t => t.completed).length})</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-emerald-400/80 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{saveStatus}</span>
              <span className="text-emerald-600">•</span>
              <span className="text-amber-300 font-bold">{totalPending} pendientes</span>
              <span className="text-purple-300">({personalPending} personales)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Selector de las 6 Ramas Territoriales (Lugares e Instancias de Trabajo AoE) */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-300 font-mono">
              Las 6 Ramas Territoriales & Menús AoE Vinculados
            </h2>
          </div>

          {/* Toggle de Filtro: Tareas Personales del Trabajador */}
          <button
            onClick={() => setFilterPersonalOnly(!filterPersonalOnly)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
              filterPersonalOnly
                ? 'bg-purple-900 text-white border-purple-400 shadow-sm'
                : 'bg-[#071A11] text-purple-300 border-purple-500/30 hover:border-purple-400'
            }`}
          >
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span>{filterPersonalOnly ? 'Mostrando: Solo Personales' : 'Filtrar: Solo Personales'}</span>
            <span className="font-mono text-[10px] bg-purple-950 px-1.5 py-0.2 rounded-full border border-purple-700">
              {personalPending}
            </span>
          </button>
        </div>

        {/* Grid de las 6 Ramas del Territorio + Tarjeta Todas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          
          {/* Tarjeta 0: Todas las Ramas */}
          <button
            onClick={() => setSelectedBranch('all')}
            className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              selectedBranch === 'all'
                ? 'bg-emerald-900/60 border-amber-400 ring-1 ring-amber-400/60 shadow-lg'
                : 'bg-[#071A11] border-emerald-500/20 hover:border-emerald-500/50 hover:bg-[#0B2519]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-xl">🌐</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  selectedBranch === 'all' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  {totalPending}
                </span>
              </div>
              <div className="font-bold text-xs text-white">Todas</div>
              <div className="text-[10px] text-emerald-200/60 mt-0.5">Visión total</div>
            </div>
            <div className="text-[9px] font-mono text-emerald-400/70 mt-2">6 Lugares</div>
          </button>

          {/* Tarjetas de las 6 Ramas AoE del Territorio */}
          {AOE_BRANCHES.map(branch => {
            const branchPending = tasks.filter(t => t.branchId === branch.id && !t.completed).length;
            const isSelected = selectedBranch === branch.id;

            return (
              <div
                key={branch.id}
                onClick={() => setSelectedBranch(branch.id)}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'bg-emerald-900/60 border-amber-400 ring-1 ring-amber-400/60 shadow-lg'
                    : 'bg-[#071A11] border-emerald-500/20 hover:border-emerald-500/50 hover:bg-[#0B2519]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-xl">{branch.icon}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-black/40 border border-emerald-500/20 text-emerald-300">
                      {branchPending}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {branch.name}
                  </div>
                  <div className="text-[10px] text-emerald-200/60 mt-0.5 font-mono">
                    {branch.permacultureZone}
                  </div>
                </div>

                {/* Enlace al Menú AoE / Twin de esa rama */}
                <div className="mt-3 pt-2 border-t border-emerald-900/50 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-emerald-400/70">
                    :{branch.port}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openAoeMenu(branch);
                    }}
                    className="text-[10px] text-amber-400 hover:text-white flex items-center gap-0.5 font-bold transition-colors"
                    title={`Abrir Menú AoE en :${branch.port} (${branch.hash})`}
                  >
                    <span>AoE</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Pestañas de Vista: Tareas vs Bloc Libre */}
      <div className="flex items-center gap-2 border-b border-emerald-800/60 pb-3">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'tasks'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/40'
          }`}
        >
          <CheckSquare className="w-4 h-4 text-amber-400" />
          <span>Lista de Tareas & Apuntes ({filteredTasks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('scratchpad')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'scratchpad'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'text-emerald-200/70 hover:text-white hover:bg-emerald-900/40'
          }`}
        >
          <ClipboardList className="w-4 h-4 text-amber-400" />
          <span>Bloc Libre (Scratchpad de Turno)</span>
        </button>
      </div>

      {/* 4. Contenido Principal */}
      {activeTab === 'tasks' ? (
        <div className="space-y-6">
          
          {/* Caja de Entrada Rápida de Tarea */}
          <form onSubmit={handleAddTask} className="bg-[#071A11] p-4 rounded-2xl border border-emerald-500/30 shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Añadir apunte o tarea en el territorio... [Presiona Enter]"
                className="flex-1 bg-black/40 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-emerald-600/70 focus:outline-none focus:border-amber-400"
              />

              <div className="flex flex-wrap items-center gap-2">
                {/* Selector de las 6 Ramas AoE */}
                <select
                  value={newTaskBranch}
                  onChange={(e) => setNewTaskBranch(e.target.value)}
                  className="bg-black/40 border border-emerald-500/30 text-amber-300 rounded-xl px-3 py-2.5 text-xs font-medium focus:outline-none focus:border-amber-400"
                >
                  {AOE_BRANCHES.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.icon} {b.name}
                    </option>
                  ))}
                </select>

                {/* Checkbox para Asuntos Personales */}
                <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-bold cursor-pointer hover:bg-purple-900/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={newTaskIsPersonal}
                    onChange={(e) => setNewTaskIsPersonal(e.target.checked)}
                    className="rounded bg-black border-purple-500 text-purple-600 focus:ring-0"
                  />
                  <span>Personal</span>
                </label>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#0B2519]" />
                  <span>Añadir</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-emerald-400/70 font-mono">
              <span>Lugar asignado: <strong>{AOE_BRANCHES.find(b => b.id === newTaskBranch)?.name}</strong></span>
              <span className="hidden sm:inline">Presiona [Enter ↵] para guardar al instante</span>
            </div>
          </form>

          {/* Listado de Tareas */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="bg-[#071A11]/60 border border-dashed border-emerald-800/60 rounded-2xl p-10 text-center space-y-2">
                <div className="text-3xl">🌱</div>
                <div className="text-sm font-bold text-emerald-200">No hay tareas pendientes en esta selección</div>
                <div className="text-xs text-emerald-400/60 max-w-sm mx-auto">
                  Registra apuntes rápidos, tareas de faena o cosas personales que debas revisar en esta rama del predio.
                </div>
              </div>
            ) : (
              <>
                {/* Tareas Pendientes */}
                <div className="space-y-2">
                  {pendingTasks.map(task => {
                    const branch = AOE_BRANCHES.find(b => b.id === task.branchId) || AOE_BRANCHES[0];
                    return (
                      <div
                        key={task.id}
                        className="bg-[#071A11] p-3.5 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-start justify-between gap-3 group"
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <button
                            onClick={() => handleToggleTask(task.id)}
                            className="mt-0.5 text-emerald-400/70 hover:text-emerald-300 transition-colors shrink-0"
                          >
                            <Square className="w-4 h-4" />
                          </button>
                          
                          <div className="space-y-1 min-w-0">
                            <p className="text-xs text-white leading-relaxed break-words">
                              {task.text}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono text-emerald-400/70">
                              <span 
                                className="px-2 py-0.5 rounded-md font-bold flex items-center gap-1"
                                style={{ backgroundColor: `${branch.color}15`, color: branch.color, border: `1px solid ${branch.color}30` }}
                              >
                                {branch.icon} {branch.name}
                              </span>

                              {task.isPersonal && (
                                <span className="px-2 py-0.5 rounded-md font-bold bg-purple-950 text-purple-300 border border-purple-700/60 flex items-center gap-1">
                                  <span>👤</span> Personal
                                </span>
                              )}

                              <span>•</span>
                              <span>{new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              
                              {/* Botón de salto al Menú AoE o Gemelo 3D */}
                              <button
                                onClick={() => openAoeMenu(branch)}
                                className="text-amber-400 hover:text-white ml-2 flex items-center gap-1 underline underline-offset-2"
                                title={`Abrir menú AoE de ${branch.name}`}
                              >
                                <span>Abrir :{branch.port} {branch.hash}</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-red-400 hover:bg-red-950/40 transition-all shrink-0"
                          title="Eliminar tarea"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Tareas Completadas */}
                {completedTasks.length > 0 && (
                  <div className="pt-4 space-y-2">
                    <div className="text-[11px] font-mono font-bold text-emerald-400/60 uppercase tracking-wider flex items-center justify-between border-b border-emerald-900/60 pb-1">
                      <span>Completadas ({completedTasks.length})</span>
                    </div>

                    {completedTasks.map(task => {
                      const branch = AOE_BRANCHES.find(b => b.id === task.branchId) || AOE_BRANCHES[0];
                      return (
                        <div
                          key={task.id}
                          className="bg-[#071A11]/50 p-3 rounded-xl border border-emerald-900/40 opacity-60 flex items-start justify-between gap-3 group"
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <button
                              onClick={() => handleToggleTask(task.id)}
                              className="mt-0.5 text-emerald-400 shrink-0"
                            >
                              <CheckSquare className="w-4 h-4" />
                            </button>
                            
                            <div className="space-y-1 min-w-0">
                              <p className="text-xs line-through text-emerald-300/70 break-words">
                                {task.text}
                              </p>
                              <span className="text-[9px] font-mono text-emerald-400/50">
                                {branch.icon} {branch.name} {task.isPersonal ? '• [Personal]' : ''}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-1 rounded text-red-400 hover:bg-red-950/40 transition-all shrink-0"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        /* 5. Scratchpad Libre (Bloc de notas de texto continuo) */
        <div className="bg-[#071A11] p-6 rounded-2xl border border-emerald-500/30 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <ClipboardList className="w-4 h-4 text-amber-400" />
              <span>Bloc de Notas Libre del Operador (Sin Estructura)</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400/70">
              {scratchpad.length} caracteres
            </span>
          </div>

          <textarea
            value={scratchpad}
            onChange={(e) => handleScratchpadChange(e.target.value)}
            placeholder="Escribe libremente tus apuntes de campo, bitácora de faena, cálculos rápidos, números de contacto o reflexiones del día..."
            className="w-full h-80 bg-black/40 border border-emerald-500/30 rounded-xl p-4 text-xs font-sans text-white leading-relaxed placeholder-emerald-600/70 focus:outline-none focus:border-amber-400 resize-y"
          />

          <div className="flex items-center justify-between text-[11px] text-emerald-400/70 font-mono">
            <span>🔒 Tus notas se guardan automáticamente en tu navegador.</span>
            <button
              onClick={handleExportTxt}
              className="text-amber-400 hover:text-white flex items-center gap-1 font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Guardar copia .txt</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. Footer Informativo de Desacoplamiento */}
      <div className="p-4 rounded-xl bg-black/40 border border-emerald-800/40 text-[11px] text-emerald-200/70 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Garantía de Desacoplamiento:</strong> Los datos del Cuaderno son independientes y autónomos del tronco central del Hub y sus modelos biofísicos.
          </span>
        </div>
        <span className="font-mono text-emerald-400 text-xs shrink-0">
          Clave local: {STORAGE_KEY}
        </span>
      </div>

    </div>
  );
};
