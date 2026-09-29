import React, { useState } from 'react';
import { 
  Shield, Globe, Cpu, Wrench, Sparkles, CheckCircle2, Trees, Activity, 
  Radio, Compass, Users, Coins, Award, Network, ChevronRight, FileText,
  Camera, Plane, Scale, HeartHandshake, Layers, Sprout, Landmark
} from 'lucide-react';

interface PartnerProfile {
  id: string;
  name: string;
  relation: string;
  role: string;
  location: string;
  flag: string;
  pillars: ('social' | 'digital' | 'tecnico' | 'finanzas' | 'comunicaciones')[];
  modality: string;
  description: string;
  responsibilities: string[];
  avatarUrl: string;
  badgeColor: string;
}

interface AssociateProfile {
  id: string;
  name: string;
  companyOrSpecialty: string;
  role: string;
  serviceCategory: string;
  description: string;
  technologies: string[];
  cooperativeRole: string;
  avatarUrl: string;
}

const SPA_PARTNERS: PartnerProfile[] = [
  {
    id: 'daniel',
    name: 'Daniel Santander',
    relation: 'Fundador & Director de Producto',
    role: 'Socio Fundador • Arquitectura de Software & Ciencia Biofísica',
    location: 'Friburgo / Berlín, Alemania 🇩🇪 & Maule, Chile 🇨🇱',
    flag: '🇩🇪🇨🇱',
    pillars: ['digital', 'comunicaciones'],
    modality: 'Fundador Originario • Aporte Mixto (IP + Sweat Equity + Capital)',
    description: 'Geofísico, permacultor y analista de ecología forestal y balances de gases de efecto invernadero. Autor moral e ideólogo de AgriTwin 3D. Lidera el modelado biofísico, el procesamiento satelital Sentinel-2 y el nexo con mercados ESG europeos.',
    responsibilities: [
      'Autoría moral y arquitectura de software de AgriTwin 3D',
      'Modelado de balances hídricos FAO-56 y drenaje katabático',
      'Ingesta satelital y calibración de reflectancia Sentinel-2 L2A',
      'Dirección estratégica de producto y alianzas de bioeconomía'
    ],
    avatarUrl: './assets/avatars/avatar_agricultora_campo.jpg',
    badgeColor: 'border-amber-500 bg-amber-50 text-amber-900'
  },
  {
    id: 'paulina',
    name: 'Paulina (Prima)',
    relation: 'Socia Fundadora & Jefa de Taller',
    role: 'Socia SpA • Manufactura Mecatrónica & Operación en Terreno',
    location: 'Talca, Región del Maule, Chile 🇨🇱',
    flag: '🇨🇱',
    pillars: ['tecnico', 'digital'],
    modality: 'Mixto (Sweat Equity de Laboratorio + Aporte de Capital Inicial)',
    description: 'Ingeniera en Automatización de Procesos. Lidera el laboratorio de prototipado mecatrónico en Talca: diseño de placas de circuito impreso en KiCad, soldadura de precisión, ensamblaje de gabinetes estancos IP65 UV-Proof y pruebas de enlace LoRaWAN en viñedos.',
    responsibilities: [
      'Diseño y fabricación de PCBs para nodos KioT (KiCad)',
      'Control de calidad y estanqueidad IP65 en gabinetes PETG',
      'Pruebas de enlace de radiofrecuencia LoRaWAN (915 MHz)',
      'Calibración de sondas FDR en campo y despliegue de kits'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    badgeColor: 'border-emerald-500 bg-emerald-50 text-emerald-900'
  },
  {
    id: 'wladimir',
    name: 'Wladimir',
    relation: 'Socio SpA • Finanzas & Red Social',
    role: 'Socio SpA • Estructuración Financiera & Gobernanza Social',
    location: 'Santiago & Región del Maule, Chile 🇨🇱',
    flag: '🇨🇱',
    pillars: ['finanzas', 'social', 'comunicaciones'],
    modality: 'Mixto (Sweat Equity Financiero/Gremial + Aporte Inicial)',
    description: 'Economista y gestor de proyectos con experiencia en economía social y finanzas corporativas. Lidera la estructuración de costos, flujos de caja y el despliegue del Pasaporte Verde conectando a la empresa con cooperativas campesinas, ferias locales y comités de agua potable rural.',
    responsibilities: [
      'Modelación de costos, tarifas de suscripción y flujo de caja',
      'Despliegue territorial del Pasaporte Verde y economías locales',
      'Organización de seminarios, foros ciudadanos y congresos',
      'Convenios de cooperación con comités de APR y gremios agrícolas'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    badgeColor: 'border-indigo-500 bg-indigo-50 text-indigo-900'
  },
  {
    id: 'pablo',
    name: 'Pablo',
    relation: 'Socio SpA • Finanzas, Software & Hardware',
    role: 'Socio SpA • Finanzas Cuantitativas, Código & Despliegue Técnico',
    location: 'Maule & Santiago, Chile 🇨🇱',
    flag: '🇨🇱',
    pillars: ['finanzas', 'tecnico', 'digital'],
    modality: 'Mixto (Sweat Equity de Desarrollo + Aporte de Capital Inicial)',
    description: 'Ingeniero con perfil híbrido en finanzas cuantitativas, arquitectura de software y despliegue de hardware. Conecta los modelos económicos de precios con la optimización de algoritmos en AgriTwin y apoya el control mecatrónico en la implementación de kits.',
    responsibilities: [
      'Optimización de algoritmos en WebGL/Three.js y backend',
      'Simulación económica de amortización de kits solares y telemetría',
      'Control de pruebas de estrés en hardware y protocolos de calibración',
      'Arquitectura de microservicios y sincronización de datos IoT'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    badgeColor: 'border-teal-500 bg-teal-50 text-teal-900'
  }
];

const COOPERATIVE_ASSOCIATES: AssociateProfile[] = [
  {
    id: 'luis-gonzalez',
    name: 'Luis González',
    companyOrSpecialty: 'DronAir SpA / Servicios Aéreos Agroforestales',
    role: 'Asociado Cooperado • Drones, Fotogrametría & Termografía Aérea',
    serviceCategory: 'Imágenes Aéreas & Multiespectral',
    description: 'Empresario y piloto certificado DGAC con flota de drones industriales equipados con cámaras multiespectrales (NDVI/NDRE) y sensores térmicos radiométricos FLIR. Provee los ortomosaicos aéreos centimétricos de alta definición que sirven de base topográfica y textura al gemelo digital AgriTwin.',
    technologies: [
      'DJI Matrice 300 RTK con sensor multiespectral MicaSense',
      'Fotogrametría centimétrica (<2 cm/px) y ortomosaicos georreferenciados',
      'Cámara termográfica FLIR para detección de estrés hídrico temprano',
      'Vuelos automáticos programados con estación base D-RTK 2'
    ],
    cooperativeRole: 'Proveedor estratégico de fotogrametría aérea con acceso preferencial a contratos de la cartera AgroTech y retorno de excedentes cooperativos.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'camila-morales',
    name: 'Dra. Camila Morales',
    companyOrSpecialty: 'Laboratorio de Edafología & Suelo Vivo Maule',
    role: 'Asociada Cooperada • Edafología & Permacultura Regenerativa',
    serviceCategory: 'Análisis de Suelos & Microbiología',
    description: 'Doctora en Ciencias del Suelo y diseñadora en permacultura certificada. Presta servicios de cromatografía cualitativa de Pfeiffer, análisis de biomasa de hongos/bacterias y formulación de planes de manejo para la certificación de Pasaporte Verde.',
    technologies: [
      'Microscopía biológica directa y relación hongo:bacteria (F:B)',
      'Cromatografía circular de suelo para evaluar humus y minerales',
      'Diseño Keyline para retención pasiva de agua de lluvia',
      'Planes de biofertilización y bocashi enriquecido con roca fosfórica'
    ],
    cooperativeRole: 'Auditora agronómica de terreno para predios que buscan la certificación de no-deforestación EUDR y Pasaporte Verde.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'matias-riquelme',
    name: 'Matías Riquelme',
    companyOrSpecialty: 'Estudio Jurídico Riquelme & Asociados',
    role: 'Asesor Cooperado • Derecho Ambiental, Aguas & Cooperativismo',
    serviceCategory: 'Legal, Derechos de Aguas & Gobernanza',
    description: 'Abogado especialista en recursos naturales, Código de Aguas de Chile (DGA) y Derecho Cooperativo (DFL 5). Asesora la formalización de convenios marco entre la SpA y la Cooperativa de Trabajo, la regularización de derechos de aprovechamiento de aguas y la protección legal de los socios.',
    technologies: [
      'Constitución y gobernanza de Cooperativas de Trabajo (DAES / DFL 5)',
      'Regularización de derechos de aprovechamiento de aguas (DGA / C.B.R.)',
      'Redacción de Pactos de Accionistas, Vesting y contratos de usufructo',
      'Protocolos de cumplimiento ambiental y trazabilidad legal de predios'
    ],
    cooperativeRole: 'Custodio de la legalidad de los convenios de trabajo y mediador en la distribución de excedentes cooperativos.',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ignacia-valenzuela',
    name: 'Ignacia Valenzuela',
    companyOrSpecialty: 'Red de Ferias Libres & Alianzas Campesinas Maule',
    role: 'Asociada Cooperada • Comercialización Ética & Vínculo INDAP',
    serviceCategory: 'Pilar Social & Comercio Justo',
    description: 'Ingeniera Comercial Rural y gestora comunitaria. Ha liderado programas de inclusión para la agricultura familiar campesina con INDAP y cooperativas vitivinícolas del secano interior maulino. Se encarga de abrir canales de comercialización ética para productos con Pasaporte Verde.',
    technologies: [
      'Circuitos cortos de comercialización y ferias campesinas gourmet',
      'Formulación de proyectos asociativos CORFO / Sercotec / INDAP',
      'Gobernanza participativa y asambleas comunitarias rurales',
      'Trazabilidad QR de origen campesino vinculada al Pasaporte Verde'
    ],
    cooperativeRole: 'Articuladora de mercado y logística para pequeños productores agrícolas integrados al ecosistema AgroTech.',
    avatarUrl: 'https://images.unsplash.com/photo-1534751516642-a171edd25218?auto=format&fit=crop&w=400&q=80'
  }
];

export const SomosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'arbol' | 'spa' | 'cooperativa' | 'gobernanza'>('arbol');
  const [selectedPartner, setSelectedPartner] = useState<PartnerProfile>(SPA_PARTNERS[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-12 animate-fadeIn pb-20">
      
      {/* ─── 1. HEADER Y MANIFIESTO INSTITUCIONAL ─── */}
      <div className="space-y-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-sans font-bold shadow-sm">
          <Shield className="w-4 h-4 text-emerald-700" />
          <span>Estructura Corporativa Dual • AgroTech SpA & Cooperativa de Trabajo</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B2519] tracking-tight leading-tight">
          "Un Árbol Pirámide enraizado en la{' '}
          <span className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-600 bg-clip-text text-transparent">
            Naturaleza y la Economía Sostenida."
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-700 font-serif leading-relaxed max-w-3xl mx-auto">
          Unimos la solidez mercantil de una <strong>Sociedad por Acciones (SpA)</strong> para blindar y desarrollar activos de software y hardware de alta precisión, con la fuerza colectiva de una <strong>Cooperativa de Trabajo</strong> donde especialistas como pilotos de drones, edafólogos y campesinos son dueños de su destino laboral.
        </p>
      </div>

      {/* ─── 2. SELECTOR DE PESTAÑAS (MENÚ INTERACTIVO) ─── */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl max-w-3xl mx-auto border border-slate-300 shadow-inner">
        <button
          onClick={() => setActiveTab('arbol')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all ${
            activeTab === 'arbol'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>1. El Árbol Pirámide</span>
        </button>

        <button
          onClick={() => setActiveTab('spa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all ${
            activeTab === 'spa'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Landmark className="w-4 h-4 text-amber-400" />
          <span>2. Socios SpA (Mixto)</span>
        </button>

        <button
          onClick={() => setActiveTab('cooperativa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all ${
            activeTab === 'cooperativa'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-blue-400" />
          <span>3. Cooperativa & Asociados</span>
        </button>

        <button
          onClick={() => setActiveTab('gobernanza')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all ${
            activeTab === 'gobernanza'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Scale className="w-4 h-4 text-purple-400" />
          <span>4. Gobernanza, Vesting & PI</span>
        </button>
      </div>

      {/* ─── 3. CONTENIDO DE LAS PESTAÑAS ─── */}

      {/* PESTAÑA 1: EL ÁRBOL PIRÁMIDE */}
      {activeTab === 'arbol' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Tarjeta del Núcleo */}
          <div className="bg-gradient-to-br from-[#0B2519] via-[#071B12] to-[#04100A] p-6 sm:p-10 rounded-3xl border border-emerald-500/30 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/40 text-emerald-300 text-xs font-mono">
                <Sprout className="w-3.5 h-3.5" />
                <span>NÚCLEO SISTÉMICO VITAL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-white">
                El Núcleo: Naturaleza & Bioeconomía Regenerativa
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/80 font-serif leading-relaxed">
                El modelo no sitúa al capital especulativo en el centro. El tronco nutricio de AgroTech es la <strong>Naturaleza</strong> (las leyes físicas del agua, el sol y el suelo vivo regidas por la Permacultura) entrelazada con la <strong>Economía Real</strong> (flujo de caja ético que financia la investigación y asegura la subsistencia digna de los agricultores).
              </p>
            </div>

            {/* Grilla de los 3 Pilares y Productos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              
              {/* Pilar Social */}
              <div className="p-6 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 backdrop-blur-sm space-y-3 hover:border-indigo-400 transition-all">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-indigo-900/80 border border-indigo-400/40 flex items-center justify-center text-xl">
                    🌿
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-indigo-900 text-indigo-200 border border-indigo-500/30">
                    Líder: Wladimir
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-indigo-100">1. Pilar Social</h3>
                  <div className="text-xs font-mono text-indigo-300 font-semibold mt-0.5">
                    Producto: Pasaporte Verde
                  </div>
                </div>
                <p className="text-xs text-indigo-100/70 font-serif leading-relaxed">
                  Establece economías locales y genera infraestructura para la venta justa. Conecta a la empresa con la sociedad mediante cursos, seminarios, foros, congresos y convenios con comités de Agua Potable Rural (APRs).
                </p>
              </div>

              {/* Pilar Digital */}
              <div className="p-6 rounded-2xl bg-teal-950/60 border border-teal-500/40 backdrop-blur-sm space-y-3 hover:border-teal-400 transition-all">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-teal-900/80 border border-teal-400/40 flex items-center justify-center text-xl">
                    💻
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-teal-900 text-teal-200 border border-teal-500/30">
                    Líder: Daniel Santander
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-teal-100">2. Pilar Digital</h3>
                  <div className="text-xs font-mono text-teal-300 font-semibold mt-0.5">
                    Producto: AgriTwin 3D
                  </div>
                </div>
                <p className="text-xs text-teal-100/70 font-serif leading-relaxed">
                  Motor WebGL del gemelo digital, simulación biofísica en 3 estratos de suelo, predicción de heladas katabáticas con 72h de anticipación y acoplamiento multiescala satelital Sentinel-2.
                </p>
              </div>

              {/* Pilar Técnico */}
              <div className="p-6 rounded-2xl bg-amber-950/60 border border-amber-500/40 backdrop-blur-sm space-y-3 hover:border-amber-400 transition-all">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-amber-900/80 border border-amber-400/40 flex items-center justify-center text-xl">
                    ⚙️
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-900 text-amber-200 border border-amber-500/30">
                    Líder: Paulina (Prima)
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-100">3. Pilar Técnico</h3>
                  <div className="text-xs font-mono text-amber-300 font-semibold mt-0.5">
                    Producto: Implementación de Kits
                  </div>
                </div>
                <p className="text-xs text-amber-100/70 font-serif leading-relaxed">
                  Manufactura local de hardware KioT en Talca, placas PCB KiCad, sondas de humedad FDR capacitivas, radioenlaces LoRaWAN (915 MHz) y cuadrillas de instalación en predios de cultivo y ganado.
                </p>
              </div>

            </div>

            {/* Áreas Transversales */}
            <div className="mt-8 pt-6 border-t border-emerald-500/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase font-sans">Área Transversal Finanzas</div>
                  <div className="text-xs text-slate-300 font-serif">A cargo de <strong>Wladimir & Pablo</strong> (Costos, precios y presupuestos).</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase font-sans">Área Transversal Comunicaciones</div>
                  <div className="text-xs text-slate-300 font-serif">A cargo de <strong>Daniel & Wladimir</strong> (Difusión, foros y alianzas europeas).</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* PESTAÑA 2: SOCIOS DE LA SpA */}
      {activeTab === 'spa' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-700 font-sans text-xs font-bold uppercase tracking-wider">
              ESTRUCTURA DE CAPITAL Y SWEAT EQUITY
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B2519]">Los 4 Socios de AgroTech SpA</h2>
            <p className="text-sm text-slate-600 font-serif">
              Ingresan bajo un sistema mixto que combina inversión inicial de capital con tiempo y trabajo comprometido (sin sueldo inicial), adquiriendo derechos de usufructo y participación sobre los productos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SPA_PARTNERS.map((partner) => (
              <div 
                key={partner.id} 
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-emerald-500/40 hover:shadow-md transition-all space-y-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-sm shrink-0 bg-slate-100">
                      <img 
                        src={partner.avatarUrl} 
                        alt={partner.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-[#0B2519]">{partner.name}</h3>
                        <span className="text-lg">{partner.flag}</span>
                      </div>
                      <p className="text-xs text-emerald-800 font-bold font-sans">{partner.role}</p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">{partner.location}</p>
                    </div>
                  </div>
                </div>

                {/* Pilares Asignados */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold mr-1">Pilares:</span>
                  {partner.pillars.map((pil) => (
                    <span 
                      key={pil}
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        pil === 'digital' ? 'bg-teal-100 text-teal-800 border border-teal-300' :
                        pil === 'tecnico' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        pil === 'social' ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' :
                        pil === 'finanzas' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        'bg-slate-100 text-slate-800 border border-slate-300'
                      }`}
                    >
                      {pil}
                    </span>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-serif">
                  <strong className="text-slate-800 font-sans block mb-1">Modalidad de Ingreso:</strong>
                  {partner.modality}
                </div>

                <p className="text-xs text-slate-600 font-serif leading-relaxed">
                  {partner.description}
                </p>

                {/* Responsabilidades Clave */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider block">
                    Entregables & Compromisos:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {partner.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA 3: COOPERATIVA DE TRABAJO & ASOCIADOS */}
      {activeTab === 'cooperativa' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-blue-700 font-sans text-xs font-bold uppercase tracking-wider">
              RED TERRITORIAL ASOCIATIVA
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B2519]">Cooperativa de Trabajo AgroTech</h2>
            <p className="text-sm text-slate-600 font-serif">
              Quienes se asocian a nosotros no son meros empleados, sino miembros cooperados con derecho a voto y participación en los excedentes de las faenas en las que forman parte de la arquitectura técnica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COOPERATIVE_ASSOCIATES.map((associate) => (
              <div 
                key={associate.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all space-y-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-400 shadow-sm shrink-0 bg-blue-50">
                      <img 
                        src={associate.avatarUrl} 
                        alt={associate.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-[#0B2519]">{associate.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-300">
                          Cooperado
                        </span>
                      </div>
                      <p className="text-xs text-blue-900 font-bold font-sans">{associate.companyOrSpecialty}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{associate.serviceCategory}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-serif leading-relaxed">
                  {associate.description}
                </p>

                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 font-serif">
                  <strong className="text-blue-900 font-sans block mb-1">Rol en el Ecosistema Cooperativo:</strong>
                  {associate.cooperativeRole}
                </div>

                {/* Tecnologías & Equipamiento */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider block">
                    Equipamiento y Capacidades que Aporta:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {associate.technologies.map((tech, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA 4: GOBERNANZA, VESTING & DERECHOS DE PROPIEDAD INTELECTUAL */}
      {activeTab === 'gobernanza' && (
        <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-purple-700 font-sans text-xs font-bold uppercase tracking-wider">
              BLINDAJE JURÍDICO & RECOMENDACIONES ESTRATÉGICAS
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B2519]">Protocolo de Acuerdos y Propiedad Intelectual</h2>
            <p className="text-sm text-slate-600 font-serif">
              Recomendaciones legales y administrativas para transicionar del acuerdo verbal inicial a contratos formales sostenibles en el tiempo.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Cláusula 1: Sistema Mixto & Vesting */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold font-mono">
                  01
                </div>
                <h3 className="text-xl font-bold text-[#0B2519]">
                  Del Acuerdo Verbal al Pacto de Accionistas con Vesting
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                El inicio basado en confianza y trabajo no remunerado (<strong>Sweat Equity</strong>) debe formalizarse mediante un <strong>Pacto de Accionistas (*Shareholders Agreement*)</strong> con calendario de <em>Vesting</em> a 24 o 36 meses con un <em>Cliff</em> de 6 meses.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800">Protección contra Deserciones</span>
                  <p className="text-slate-600 font-serif">Si un socio abandona el proyecto antes del periodo de consolidación, las acciones no devengadas revierten a la sociedad para incorporar a nuevos talentos.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800">Valorización del Aporte</span>
                  <p className="text-slate-600 font-serif">Se define una matriz de horas e hitos entregados que justifique la emisión de acciones ordinarias de la SpA.</p>
                </div>
              </div>
            </div>

            {/* Cláusula 2: Propiedad Intelectual de AgriTwin */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold font-mono">
                  02
                </div>
                <h3 className="text-xl font-bold text-[#0B2519]">
                  Derechos de Autor de Daniel y Usufructo Compartido de la SpA
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                Conforme a la Ley 17.336 de Propiedad Intelectual en Chile:
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-teal-950 font-sans">Derecho Moral Inalienable (Daniel Santander):</strong>
                    <span className="text-teal-900 font-serif block">
                      Reconocimiento público y perenne de la autoría original, concepción teórica y diseño algorítmico del software AgriTwin 3D.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                  <Coins className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-950 font-sans">Licencia Exclusiva de Explotación & Usufructo para AgroTech SpA:</strong>
                    <span className="text-emerald-900 font-serif block">
                      Daniel otorga una licencia de usufructo comercial exclusivo a la SpA. Los ingresos por suscripciones SaaS y servicios se integran al balance social de la empresa y se distribuyen en dividendos entre todos los socios (Daniel, Paulina, Wladimir, Pablo) según su porcentaje accionario.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-950 font-sans">Cláusula de Reversión Condicionada:</strong>
                    <span className="text-rose-900 font-serif block">
                      En caso de disolución de la SpA o desvío ético respecto a los principios de permacultura fundacionales, los derechos patrimoniales revierten a Daniel Santander, evitando que el código caiga en fondos buitre o monopolios.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cláusula 3: Convenio SpA - Cooperativa */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold font-mono">
                  03
                </div>
                <h3 className="text-xl font-bold text-[#0B2519]">
                  Convenio Marco de Colaboración SpA y Cooperativa
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                La SpA actúa como el cerebro de I+D, marketing y licenciamiento internacional; la Cooperativa de Trabajo actúa como el brazo ejecutor en terreno. Ambas firman un <strong>Convenio Marco de Faenas</strong> que garantiza tarifas justas para los cooperados (como Luis González en vuelos de drones) y reparto anual de excedentes cooperativos en proporción a los días de faena aportados.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
