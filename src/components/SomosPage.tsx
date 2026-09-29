import React, { useState } from 'react';
import { 
  Shield, Globe, Cpu, Wrench, Sparkles, CheckCircle2, Trees, Activity, 
  Radio, Compass, Users, Coins, Award, Network, ChevronRight, FileText,
  Camera, Plane, Scale, HeartHandshake, Layers, Sprout, Landmark,
  BookOpen, Eye, Search, AlertCircle, Feather, Sun, Droplets, Briefcase
} from 'lucide-react';

interface PartnerProfile {
  id: string;
  name: string;
  relation: string;
  role: string;
  location: string;
  flag: string;
  animalTotem: string;
  animalDescription: string;
  pillars: ('social' | 'digital' | 'tecnico' | 'finanzas' | 'comunicaciones')[];
  modality: string;
  description: string;
  responsibilities: string[];
  badgeColor: string;
  avatarGradient: string;
}

interface CooperativeMember {
  id: string;
  name: string;
  role: string;
  companyOrSpecialty: string;
  serviceCategory: string;
  animalTotem: string;
  animalDescription: string;
  description: string;
  technologies: string[];
  cooperativeRole: string;
  avatarGradient: string;
}

interface CouncilElder {
  id: string;
  name: string;
  title: string;
  institution: string;
  role: string;
  animalTotem: string;
  animalDescription: string;
  description: string;
  pillars: string[];
  contribution: string;
  avatarGradient: string;
}

interface OpenVacancy {
  id: string;
  title: string;
  category: string;
  statusBadge: string;
  iconName: string;
  description: string;
  profileSought: string;
  requirements: string[];
  cooperativeOffer: string;
}

// ─── 1. SOCIOS FUNDADORES DE LA SpA (4 SOCIOS) ───
const SPA_PARTNERS: PartnerProfile[] = [
  {
    id: 'daniel',
    name: 'Daniel Santander',
    relation: 'Fundador & Director de Producto',
    role: 'Socio Fundador • Arquitectura de Software & Ciencia Biofísica',
    location: 'Friburgo / Berlín, Alemania 🇩🇪 & Maule, Chile 🇨🇱',
    flag: '🇩🇪🇨🇱',
    animalTotem: '🦅 Cóndor Andino',
    animalDescription: 'Visión de altura sobre la cuenca macro y precisión geométrica en las corrientes de viento.',
    pillars: ['digital', 'comunicaciones'],
    modality: 'Fundador Originario • Aporte Mixto (IP + Sweat Equity + Capital)',
    description: 'Geofísico, permacultor y analista de ecología forestal y balances de gases de efecto invernadero. Autor moral e ideólogo de AgriTwin 3D. Lidera el modelado biofísico, el procesamiento satelital Sentinel-2 y el nexo con mercados ESG europeos.',
    responsibilities: [
      'Autoría moral y arquitectura de software de AgriTwin 3D',
      'Modelado de balances hídricos FAO-56 y drenaje katabático',
      'Ingesta satelital y calibración de reflectancia Sentinel-2 L2A',
      'Dirección estratégica de producto y alianzas de bioeconomía europea'
    ],
    badgeColor: 'border-amber-500 bg-amber-50 text-amber-900',
    avatarGradient: 'from-amber-600 via-amber-700 to-emerald-900'
  },
  {
    id: 'paulina',
    name: 'Paulina Urrutia',
    relation: 'Socia Fundadora & Jefa de Taller',
    role: 'Socia SpA • Manufactura Mecatrónica & Operación en Terreno',
    location: 'Talca, Región del Maule, Chile 🇨🇱',
    flag: '🇨🇱',
    animalTotem: '🐝 Abeja Nativa (Caupolicana) / Puma',
    animalDescription: 'Laboriosidad incansable de taller y resiliencia territorial en el secano maulino.',
    pillars: ['tecnico', 'digital'],
    modality: 'Mixto (Sweat Equity de Laboratorio + Aporte de Capital Inicial)',
    description: 'Ingeniera en Automatización de Procesos. Lidera el laboratorio de prototipado mecatrónico en Talca: diseño de placas de circuito impreso en KiCad, soldadura de precisión, ensamblaje de gabinetes estancos IP65 UV-Proof y pruebas de enlace LoRaWAN en viñedos.',
    responsibilities: [
      'Diseño y fabricación de PCBs para nodos KioT (KiCad)',
      'Control de calidad y estanqueidad IP65 en gabinetes PETG',
      'Pruebas de enlace de radiofrecuencia LoRaWAN (915 MHz)',
      'Calibración de sondas FDR en campo y despliegue de kits'
    ],
    badgeColor: 'border-emerald-500 bg-emerald-50 text-emerald-900',
    avatarGradient: 'from-emerald-600 via-teal-700 to-slate-900'
  },
  {
    id: 'wladimir',
    name: 'Wladimir Gutiérrez',
    relation: 'Socio SpA • Finanzas & Red Social',
    role: 'Socio SpA • Estructuración Financiera & Gobernanza Social',
    location: 'Santiago & Región del Maule, Chile 🇨🇱',
    flag: '🇨🇱',
    animalTotem: '🦌 Pudú del Maule',
    animalDescription: 'Prudencia, discreción táctica y agilidad para navegar las economías comunitarias.',
    pillars: ['finanzas', 'social', 'comunicaciones'],
    modality: 'Mixto (Sweat Equity Financiero/Gremial + Aporte Inicial)',
    description: 'Economista y gestor de proyectos con experiencia en economía social y finanzas corporativas. Lidera la estructuración de costos, flujos de caja y el despliegue del Pasaporte Verde conectando a la empresa con cooperativas campesinas, ferias locales y comités de agua potable rural.',
    responsibilities: [
      'Modelación de costos, tarifas de suscripción y flujo de caja',
      'Despliegue territorial del Pasaporte Verde y economías locales',
      'Organización de seminarios, foros ciudadanos y congresos',
      'Convenios de cooperación con comités de APR y gremios agrícolas'
    ],
    badgeColor: 'border-indigo-500 bg-indigo-50 text-indigo-900',
    avatarGradient: 'from-indigo-600 via-purple-700 to-slate-900'
  },
  {
    id: 'pablo',
    name: 'Pablo Pérez',
    relation: 'Socio SpA • Finanzas, Software & Hardware',
    role: 'Socio SpA • Finanzas Cuantitativas, Código & Despliegue Técnico',
    location: 'Maule & Santiago, Chile 🇨🇱',
    flag: '🇨🇱',
    animalTotem: '🦊 Zorro Culpeo',
    animalDescription: 'Astucia algorítmica, adaptación rápida al terreno y optimización de recursos escasos.',
    pillars: ['finanzas', 'tecnico', 'digital'],
    modality: 'Mixto (Sweat Equity de Desarrollo + Aporte de Capital Inicial)',
    description: 'Ingeniero con perfil híbrido en finanzas cuantitativas, arquitectura de software y despliegue de hardware. Conecta los modelos económicos de precios con la optimización de algoritmos en AgriTwin y apoya el control mecatrónico en la implementación de kits.',
    responsibilities: [
      'Optimización de algoritmos en WebGL/Three.js y backend',
      'Simulación económica de amortización de kits solares y telemetría',
      'Control de pruebas de estrés en hardware y protocolos de calibración',
      'Arquitectura de microservicios y sincronización de datos IoT'
    ],
    badgeColor: 'border-teal-500 bg-teal-50 text-teal-900',
    avatarGradient: 'from-teal-600 via-cyan-700 to-slate-900'
  }
];

// ─── 2. MIEMBROS ACTIVOS DE LA COOPERATIVA DE TRABAJO (4 PROFESIONALES) ───
const COOPERATIVE_MEMBERS: CooperativeMember[] = [
  {
    id: 'walterio-lopez',
    name: 'Walterio López',
    role: 'Abogado y Gestión Legal de Predios',
    companyOrSpecialty: 'Derecho Agrario, Aguas & Regularización Territorial',
    serviceCategory: 'Legal, Derechos de Aguas & Gobernanza Predial',
    animalTotem: '🦉 Tucúquere Andino',
    animalDescription: 'Vigilancia legal silenciosa y agudeza para clarificar la propiedad y los caudales.',
    description: 'Abogado especialista en Código de Aguas de Chile (DGA), saneamiento de títulos, servidumbres de paso y regularización de predios agrícolas y forestales. Asesora la formalización de convenios marco entre la SpA y la Cooperativa de Trabajo, la certeza jurídica de las cuencas y la protección legal de los socios.',
    technologies: [
      'Código de Aguas DGA & Derechos de Aprovechamiento Consuntivo',
      'Saneamiento y Regularización de Títulos de Dominio (C.B.R.)',
      'Pactos de Usufructo y Contratos de Conservación Ambiental',
      'Gobernanza Cooperativa DFL 5 y Mediación de Conflictos Rurales'
    ],
    cooperativeRole: 'Custodio de la seguridad jurídica territorial de los proyectos y mediador en la distribución de excedentes cooperativos.',
    avatarGradient: 'from-blue-700 via-indigo-800 to-slate-900'
  },
  {
    id: 'fabian-reyes',
    name: 'Fabián Reyes',
    role: 'Ingeniero Agrícola y Ambientalista',
    companyOrSpecialty: 'Agroecología, Manejo Regenerativo & Restauración',
    serviceCategory: 'Agronomía Sostenible & Protección de Cuencas',
    animalTotem: '🦎 Ranita de Darwin',
    animalDescription: 'Bioindicador de pureza ambiental, humedad del sotobosque y regeneración de microecosistemas.',
    description: 'Ingeniero Agrícola con vasta experiencia en sustentabilidad, manejo ecológico de plagas, conservación de suelos y diseño hidrológico en cuencas del Maule. Formula planes de manejo para la certificación de Pasaporte Verde, transición libre de pesticidas y restauración del bosque esclerófilo nativo.',
    technologies: [
      'Planes de Manejo Agroecológico y Regeneración de Suelo Vivo',
      'Auditoría Ambiental y Monitoreo Biológico de Cuencas',
      'Diseño de Corredores Biológicos y Cortinas Cortavientos Nativas',
      'Transición Agropecuaria Libre de Químicos y Manejo Integrado'
    ],
    cooperativeRole: 'Director de auditorías agronómicas en terreno y enlace técnico con agricultores en transición regenerativa.',
    avatarGradient: 'from-emerald-700 via-green-800 to-slate-900'
  },
  {
    id: 'matias-martinez',
    name: 'Matías Martínez',
    role: 'Meteorólogo',
    companyOrSpecialty: 'Modelación Microclimática & Alerta Temprana de Heladas',
    serviceCategory: 'Ciencias Atmosféricas & Agroclimatología',
    animalTotem: '🦅 Aguilucho Cordillerano',
    animalDescription: 'Lectura precisa de los frentes de aire, presiones barométricas y corrientes térmicas.',
    description: 'Especialista en física de la atmósfera y microclimas de cuencas interiores. Modela la inversión térmica y el drenaje katabático en el valle central para alimentar las alertas predictivas de heladas en arándanos y viñedos con 72h de anticipación en el gemelo digital AgriTwin.',
    technologies: [
      'Modelos Numéricos WRF y Calibración Microclimática Local',
      'Predicción de Heladas Katabáticas y de Evaporación Radiativa',
      'Correlación de Estaciones KioT con Modelos Satelitales Sentinel/ECMWF',
      'Análisis de Evapotranspiración Real (ET0) y Déficit de Presión de Vapor'
    ],
    cooperativeRole: 'Científico meteorológico de referencia para los modelos de microclima y mitigación de eventos climáticos extremos.',
    avatarGradient: 'from-sky-700 via-blue-800 to-slate-900'
  },
  {
    id: 'alexis-gonzalez',
    name: 'Aléxis González',
    role: 'Ingeniero Eléctrico y Sistemas',
    companyOrSpecialty: 'Telemetría IoT, Redes LoRaWAN & Energía Solar Autónoma',
    serviceCategory: 'Infraestructura de Campo, Electrónica & Telecom',
    animalTotem: '⚡ Luciérnaga / Rayo Andino',
    animalDescription: 'Flujo energético constante en la oscuridad y sincronización de señales invisibles.',
    description: 'Ingeniero en Electricidad y Sistemas de Telecomunicaciones. Diseña la topología de red de largo alcance LoRaWAN (915 MHz), sistemas de captación solar fotovoltaica off-grid y servidores de borde para telemetría continua en predios rurales y aislados.',
    technologies: [
      'Redes Mesh LoRaWAN y Gateways Industriales IP67 de Campo',
      'Dimensionamiento Solar Off-Grid y Gestión de Baterías LiFePO4',
      'Firmware Embebido ESP32 / STM32 de Ultrabajo Consumo',
      'Protocolos MQTT, CoAP y Sincronización Edge-to-Cloud'
    ],
    cooperativeRole: 'Arquitecto de telecomunicaciones rurales y robustez eléctrica de los nodos de sensado en terreno.',
    avatarGradient: 'from-amber-600 via-orange-700 to-slate-900'
  }
];

// ─── 3. CONSEJO DE SABIOS (ESCUELA DE PERMACULTURA DE CHILE) ───
const COUNCIL_OF_ELDERS: CouncilElder[] = [
  {
    id: 'julio-perez',
    name: 'Julio Pérez',
    title: 'Arquitecto & Permacultor',
    institution: 'Escuela de Permacultura de Chile',
    role: 'Consejo de Sabios • Arquitectura Bioclimática & Diseño Territorial',
    animalTotem: '🌲 Roble Maulino Centenario',
    animalDescription: 'Raíces profundas en la tierra y estructura sólida que alberga vida por generaciones.',
    description: 'Arquitecto y maestro permacultor de vasta trayectoria en Chile y Latinoamérica. Referente fundamental de la Escuela de Permacultura de Chile. Asesora en el diseño bioclimático de asentamientos humanos rurales, captación pasiva de aguas, diseño Keyline a gran escala y zonificación permacultural de predios.',
    pillars: [
      'Diseño Keyline (Línea Clave) y Escala de Permanencia de Yeomans',
      'Bioarquitectura con Materiales Locales y Confort Térmico Pasivo',
      'Master Planning y Zonificación de Fincas y Asentamientos Humanos',
      'Lectura de Patrones Naturales aplicados a la Planificación del Territorio'
    ],
    contribution: 'Guía moral y técnica en la armonización entre la infraestructura física construida, los caminos del agua y los ritmos naturales del paisaje.',
    avatarGradient: 'from-emerald-800 via-teal-900 to-amber-950'
  },
  {
    id: 'carolina-miranda',
    name: 'Carolina Miranda',
    title: 'Agroecóloga & Permacultora',
    institution: 'Escuela de Permacultura de Chile',
    role: 'Consejo de Sabios • Agroecología, Bosques de Alimentos & Suelo Vivo',
    animalTotem: '🌸 Flor de Canelo / Colibrí Austral',
    animalDescription: 'Polinización de saberes ancestrales y medicina natural para la tierra herida.',
    description: 'Agroecóloga, educadora y permacultora de la Escuela de Permacultura de Chile. Especialista en la creación de bosques comestibles multifuncionales, cromatografía de suelos vivos, bancos de semillas tradicionales y sistemas de policultivos de alta resiliencia climática.',
    pillars: [
      'Diseño de Bosques de Alimentos (Food Forests) de 7 Estratos',
      'Microbiología Autóctona del Suelo y Reproducción de Microorganismos',
      'Preservación de Variedades Campesinas y Soberanía de Semillas Libres',
      'Dinámicas Sociales Comunitarias y Pedagogía Regenerativa'
    ],
    contribution: 'Custodia de los principios de soberanía alimentaria, salud microbiológica del suelo y transmisión de saberes agroecológicos a las nuevas generaciones.',
    avatarGradient: 'from-amber-700 via-rose-800 to-emerald-950'
  }
];

// ─── 4. CONVOCATORIAS ABIERTAS / "SE BUSCA" ───
const OPEN_VACANCIES: OpenVacancy[] = [
  {
    id: 'se-busca-drones',
    title: 'SE BUSCA: Piloto de Drones & Fotogrametría Aérea Multiespectral',
    category: 'Imágenes Aéreas & Percepción Remota',
    statusBadge: '🔍 CONVOCATORIA ABIERTA',
    iconName: 'Plane',
    description: 'Buscamos profesional o empresa de servicios aéreos certificada por la DGAC, equipada con sensores multiespectrales (NDVI/NDRE) y cámaras termográficas radiométricas para levantamientos topográficos centimétricos (<2 cm/px) y ortomosaicos georreferenciados en viñedos y frutales del Maule.',
    profileSought: 'Piloto DGAC con experiencia en fotogrametría agrícola, calibración radiométrica y procesamiento con Pix4D o WebODM.',
    requirements: [
      'Licencia DGAC al día para aeronaves pilotadas a distancia (RPA)',
      'Equipo propio multiespectral (MicaSense o similar) o sensor térmico FLIR',
      'Experiencia demostrable en vuelos autónomos con estación base RTK',
      'Residencia o disponibilidad operativa en la Región del Maule'
    ],
    cooperativeOffer: 'Asociación a la Cooperativa de Trabajo con acceso preferencial a contratos prediales de la cartera AgroTech y retorno de excedentes cooperativos por faena.'
  },
  {
    id: 'se-busca-suelos',
    title: 'SE BUSCA: Edafólogo/a & Especialista en Suelo Vivo y Microbiología',
    category: 'Análisis de Suelos & Edafología Regenerativa',
    statusBadge: '🔍 CONVOCATORIA ABIERTA',
    iconName: 'Microscope',
    description: 'Buscamos especialista en ciencias del suelo, microscopía de biomasa de hongos y bacterias, y cromatografía cualitativa de Pfeiffer para auditar predios campesinos, formular planes de biofertilización y respaldar la trazabilidad de no-deforestación EUDR y Pasaporte Verde.',
    profileSought: 'Científico/a o técnico/a con laboratorio propio o capacidad de análisis directo en terreno de suelo vivo.',
    requirements: [
      'Formación en agronomía, bioquímica, biología o ciencias del suelo',
      'Manejo de técnicas de microscopía biológica directa y relación hongo:bacteria',
      'Conocimiento en biofertilización, bocashi enriquecido y cromatografía circular',
      'Compromiso ético con la agricultura regenerativa y el trabajo campesino'
    ],
    cooperativeOffer: 'Convenio marco con arancel asegurado por informe predial, proyectos de investigación y membresía cooperativa con voto en asamblea.'
  },
  {
    id: 'se-busca-comercial',
    title: 'SE BUSCA: Gestor/a de Comercialización Campesina & Canales Éticos',
    category: 'Pilar Social & Comercio Justo',
    statusBadge: '🔍 CONVOCATORIA ABIERTA',
    iconName: 'ShoppingBag',
    description: 'Buscamos articulador comercial y gestor comunitario para abrir canales de comercialización ética para productos auditados con Pasaporte Verde, vinculando a la agricultura familiar campesina con ferias locales gourmet, comités de agua potable rural y mercados europeos.',
    profileSought: 'Profesional de agronegocios o gestor territorial con redes en el Maule y experiencia en inclusión comercial campesina.',
    requirements: [
      'Experiencia en circuitos cortos, ferias campesinas y cooperativas rurales',
      'Conocimiento de instrumentos asociativos CORFO, Sercotec e INDAP',
      'Habilidad en negociación ética y trazabilidad QR de origen campesino',
      'Arraigo territorial en la Región del Maule y la zona centro-sur'
    ],
    cooperativeOffer: 'Comisiones cooperativas por volumen comercializado, asiento en la comisión social y liderazgo en el despliegue del Pasaporte Verde.'
  }
];

export const SomosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'arbol' | 'spa' | 'cooperativa' | 'sabios' | 'convocatorias' | 'gobernanza'>('arbol');

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
          Unimos la solidez mercantil de una <strong>Sociedad por Acciones (SpA)</strong> para blindar y desarrollar activos de software y hardware de alta precisión, con la fuerza colectiva de una <strong>Cooperativa de Trabajo</strong> guiada por un <strong>Consejo de Sabios</strong> de la Escuela de Permacultura de Chile, donde especialistas son dueños de su destino laboral.
        </p>

        {/* Badge de Anonimato e Identidad de Fauna */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 border border-slate-300 text-slate-600 text-[11px] font-mono">
          <Eye className="w-3.5 h-3.5 text-slate-500" />
          <span>Identidad de Equipo: Perfiles de incógnito protegidos por arquetipos de la Fauna Nativa de Chile 🇨🇱</span>
        </div>
      </div>

      {/* ─── 2. SELECTOR DE PESTAÑAS (MENÚ INTERACTIVO) ─── */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-200/80 rounded-2xl max-w-4xl mx-auto border border-slate-300 shadow-inner">
        <button
          onClick={() => setActiveTab('arbol')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all ${
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
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all ${
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
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all ${
            activeTab === 'cooperativa'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-blue-400" />
          <span>3. Cooperativa de Trabajo</span>
        </button>

        <button
          onClick={() => setActiveTab('sabios')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all ${
            activeTab === 'sabios'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Trees className="w-4 h-4 text-emerald-400" />
          <span>4. Consejo de Sabios</span>
        </button>

        <button
          onClick={() => setActiveTab('convocatorias')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all ${
            activeTab === 'convocatorias'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Search className="w-4 h-4 text-amber-400" />
          <span>5. Se Busca (Vacantes)</span>
        </button>

        <button
          onClick={() => setActiveTab('gobernanza')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all ${
            activeTab === 'gobernanza'
              ? 'bg-[#0B2519] text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Scale className="w-4 h-4 text-purple-400" />
          <span>6. Gobernanza & PI</span>
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
                    Líder: Wladimir Gutiérrez
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
                    Líder: Paulina Urrutia
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
                  <div className="text-xs text-slate-300 font-serif">A cargo de <strong>Wladimir Gutiérrez & Pablo Pérez</strong> (Costos, precios y presupuestos).</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase font-sans">Área Transversal Comunicaciones</div>
                  <div className="text-xs text-slate-300 font-serif">A cargo de <strong>Daniel Santander & Wladimir Gutiérrez</strong> (Difusión, foros y alianzas europeas).</div>
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
                    {/* Avatar Incógnito / Animal Totem */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${partner.avatarGradient} border-2 border-slate-300 shadow-md shrink-0 flex flex-col items-center justify-center text-white relative overflow-hidden group`}>
                      <span className="text-2xl filter drop-shadow">
                        {partner.animalTotem.split(' ')[0]}
                      </span>
                      <span className="text-[8px] font-mono font-bold uppercase tracking-tighter text-slate-200 mt-0.5">
                        INCÓGNITO
                      </span>
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

                {/* Arquetipo Animal de Protección */}
                <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 font-sans">Arquetipo Fauna:</span>
                  <span className="font-bold text-emerald-800 font-mono">{partner.animalTotem}</span>
                </div>
                <p className="text-[11px] text-slate-500 font-serif italic -mt-2">
                  "{partner.animalDescription}"
                </p>

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

      {/* PESTAÑA 3: COOPERATIVA DE TRABAJO */}
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
            {COOPERATIVE_MEMBERS.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:border-blue-500/40 hover:shadow-md transition-all space-y-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar Incógnito / Animal Cooperativo */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.avatarGradient} border-2 border-blue-400 shadow-md shrink-0 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                      <span className="text-2xl filter drop-shadow">
                        {member.animalTotem.split(' ')[0]}
                      </span>
                      <span className="text-[8px] font-mono font-bold uppercase tracking-tighter text-blue-200 mt-0.5">
                        COOPERADO
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-[#0B2519]">{member.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-300">
                          Cooperado
                        </span>
                      </div>
                      <p className="text-xs text-blue-900 font-bold font-sans">{member.role}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{member.serviceCategory}</p>
                    </div>
                  </div>
                </div>

                {/* Arquetipo Animal */}
                <div className="px-3.5 py-2 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-950 font-sans">Fauna Aliada:</span>
                  <span className="font-bold text-blue-800 font-mono">{member.animalTotem}</span>
                </div>
                <p className="text-[11px] text-slate-500 font-serif italic -mt-2">
                  "{member.animalDescription}"
                </p>

                <p className="text-xs text-slate-600 font-serif leading-relaxed">
                  {member.description}
                </p>

                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 font-serif">
                  <strong className="text-blue-900 font-sans block mb-1">Rol en el Ecosistema Cooperativo:</strong>
                  {member.cooperativeRole}
                </div>

                {/* Tecnologías & Equipamiento */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider block">
                    Equipamiento y Capacidades que Aporta:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {member.technologies.map((tech, idx) => (
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

      {/* PESTAÑA 4: CONSEJO DE SABIOS (ESCUELA DE PERMACULTURA DE CHILE) */}
      {activeTab === 'sabios' && (
        <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-emerald-700 font-sans text-xs font-bold uppercase tracking-wider">
              SABIDURÍA PERMACULTURAL & ÉTICA DE LA TIERRA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
              Consejo de Sabios
            </h2>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold font-sans">
              <Trees className="w-4 h-4 text-emerald-700" />
              <span>Escuela de Permacultura de Chile</span>
            </div>
            <p className="text-sm text-slate-600 font-serif">
              Custodios de los principios de diseño de Bill Mollison y David Holmgren: Cuidado de la Tierra, Cuidado de las Personas y Reparto Justo de los Excedentes. Guían las decisiones biofísicas de AgroTech.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {COUNCIL_OF_ELDERS.map((elder) => (
              <div 
                key={elder.id}
                className="bg-gradient-to-b from-white to-emerald-50/40 rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 shadow-md hover:border-emerald-500 transition-all space-y-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar Sabio / Totem Ancestral */}
                    <div className={`w-18 h-18 rounded-2xl bg-gradient-to-br ${elder.avatarGradient} border-2 border-emerald-400 shadow-lg shrink-0 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                      <span className="text-3xl filter drop-shadow">
                        {elder.animalTotem.split(' ')[0]}
                      </span>
                      <span className="text-[8px] font-mono font-bold uppercase tracking-tighter text-emerald-200 mt-0.5">
                        SABIO
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-[#0B2519]">{elder.name}</h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-100 font-bold border border-emerald-600">
                          Permacultor
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900 font-bold font-sans">{elder.title}</p>
                      <p className="text-[11px] text-amber-800 font-mono font-semibold">{elder.institution}</p>
                    </div>
                  </div>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-emerald-100/70 border border-emerald-300 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-950 font-sans">Símbolo Natural:</span>
                  <span className="font-bold text-emerald-900 font-mono">{elder.animalTotem}</span>
                </div>
                <p className="text-[11px] text-slate-500 font-serif italic -mt-2">
                  "{elder.animalDescription}"
                </p>

                <p className="text-xs text-slate-700 font-serif leading-relaxed">
                  {elder.description}
                </p>

                {/* Contribución Ética */}
                <div className="p-4 rounded-xl bg-emerald-900/10 border border-emerald-500/30 text-xs text-emerald-950 font-serif space-y-1">
                  <strong className="text-emerald-900 font-sans block text-xs">Aporte al Ecosistema AgroTech:</strong>
                  <p>{elder.contribution}</p>
                </div>

                {/* Pilares Permaculturales */}
                <div className="space-y-1.5 pt-2 border-t border-emerald-200">
                  <span className="text-[10px] font-sans font-bold text-emerald-800 uppercase tracking-wider block">
                    Áreas Maestras de Asesoría:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
                    {elder.pillars.map((pil, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-white border border-emerald-200/80 flex items-start gap-2 shadow-2xs">
                        <Sprout className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{pil}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA 5: SE BUSCA (CONVOCATORIAS ABIERTAS) */}
      {activeTab === 'convocatorias' && (
        <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-amber-700 font-sans text-xs font-bold uppercase tracking-wider">
              CONVOCATORIAS ACTIVAS & BÚSQUEDA DE TALENTO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
              Se Busca: Nuevos Especialistas Cooperados
            </h2>
            <p className="text-sm text-slate-600 font-serif">
              La Cooperativa de Trabajo AgroTech abre convocatorias periódicas para sumar a los mejores profesionales en terreno del centro-sur de Chile. No contratamos empleados: sumamos socios de faena.
            </p>
          </div>

          <div className="space-y-6">
            {OPEN_VACANCIES.map((vacancy) => (
              <div 
                key={vacancy.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm hover:border-amber-500 hover:shadow-md transition-all space-y-5 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Badge Incógnito / Se Busca */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 border-2 border-amber-300 shadow-md shrink-0 flex flex-col items-center justify-center text-[#0B2519]">
                      <Search className="w-6 h-6 stroke-[2.5]" />
                      <span className="text-[7px] font-mono font-black uppercase mt-0.5">OPEN</span>
                    </div>

                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold">
                        <span>{vacancy.statusBadge}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-[#0B2519]">
                        {vacancy.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">{vacancy.category}</p>
                    </div>
                  </div>

                  <a
                    href="mailto:contacto@agrotech.cl?subject=Postulacion%20Cooperativa%20AgroTech"
                    className="px-4 py-2 rounded-xl bg-[#0B2519] text-white hover:bg-emerald-900 text-xs font-bold font-sans flex items-center justify-center gap-1.5 shadow-sm transition-colors self-start shrink-0"
                  >
                    <span>Postular a la Cooperativa</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 font-serif leading-relaxed">
                  {vacancy.description}
                </p>

                {/* Perfil Buscado & Requisitos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-900 uppercase font-sans flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-amber-700" />
                      <span>Perfil Profesional Solicitado</span>
                    </span>
                    <p className="text-xs text-slate-600 font-serif leading-relaxed">
                      {vacancy.profileSought}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                    <span className="text-[11px] font-bold text-amber-950 uppercase font-sans flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-700" />
                      <span>Propuesta de la Cooperativa</span>
                    </span>
                    <p className="text-xs text-amber-900 font-serif leading-relaxed">
                      {vacancy.cooperativeOffer}
                    </p>
                  </div>
                </div>

                {/* Requisitos Específicos */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-wider block">
                    Requisitos Técnicos Deseados:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {vacancy.requirements.map((req, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA 6: GOBERNANZA, VESTING & DERECHOS DE PROPIEDAD INTELECTUAL */}
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
                El inicio basado en confianza y trabajo no remunerado (<strong>Sweat Equity</strong>) debe formalizarse mediante un <strong>Pacto de Accionistas (*Shareholders Agreement*)</strong> con calendario de <em>Vesting</em> a 24 o 36 meses con un <em>Cliff</em> de 6 meses para Daniel Santander, Paulina Urrutia, Wladimir Gutiérrez y Pablo Pérez.
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
                      Daniel otorga una licencia de usufructo comercial exclusivo a la SpA. Los ingresos por suscripciones SaaS y servicios se integran al balance social de la empresa y se distribuyen en dividendos entre todos los socios (Daniel Santander, Paulina Urrutia, Wladimir Gutiérrez, Pablo Pérez) según su porcentaje accionario.
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
                La SpA actúa como el cerebro de I+D, marketing y licenciamiento internacional; la Cooperativa de Trabajo actúa como el brazo ejecutor en terreno con profesionales como Walterio López, Fabián Reyes, Matías Martínez y Aléxis González. Ambas firman un <strong>Convenio Marco de Faenas</strong> que garantiza tarifas justas para los cooperados y reparto anual de excedentes cooperativos en proporción a los días de faena aportados.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
