export interface PermaculturePoint {
  id: number;
  faseId: number;
  faseName: string;
  title: string;
  tagline: string;
  fullDescription: string;
  keyQuestions: string[];
  deliverables: string[];
  branch: 'digital' | 'tecnica' | 'social' | 'transversal';
  branchLabel: string;
  agroTechTool: string;
  branchViabilityNote: string;
  permanenceRank?: number; // Yeomans permanence ranking 1 to 8
  badgeColor: string;
}

export interface PermaculturePrinciple {
  id: number;
  title: string;
  subtitle: string;
  proverb: string;
  description: string;
  practicalExample: string;
  agroTechApplication: string;
  iconName: string;
}

export interface PermacultureZone {
  zone: number;
  name: string;
  frequency: string;
  humanEffort: string;
  description: string;
  elements: string[];
  techIntegration: string;
}

export interface PermanenceScaleLayer {
  rank: number;
  name: string;
  yeomansOriginal: boolean;
  easeOfChange: 'Muy difícil / Inalterable' | 'Difícil' | 'Moderado' | 'Fácil' | 'Muy dinámico';
  description: string;
  permacultureStrategy: string;
  agroTechSolution: string;
}

export interface PermacultureEthic {
  id: string;
  title: string;
  subtitle: string;
  essence: string;
  principlesInvolved: string;
  agroTechManifesto: string;
}

export interface PermacultureSector {
  id: string;
  name: string;
  nature: string;
  influence: string;
  designResponses: string[];
}

export interface FoodForestStratum {
  layer: number;
  name: string;
  height: string;
  role: string;
  maulinoExamples: string[];
  ecologicalFunction: string;
}

// ==========================================
// 1. LOS 18 PUNTOS DEL PLAN MAESTRO
// ==========================================
export const PERMACULTURE_18_POINTS: PermaculturePoint[] = [
  // FASE 1: CONTEXTO, METAS Y DIAGNÓSTICO BASE
  {
    id: 1,
    faseId: 1,
    faseName: "Fase 1: Contexto, Metas y Diagnóstico Base",
    title: "Entrevista de Metas, Visión y Límites del Habitante",
    tagline: "El punto de partida humano y ético de cualquier diseño",
    fullDescription: "Diagnóstico profundo del contexto humano: visión de vida, presupuesto de inversión disponible, horas semanales de dedicación, habilidades del equipo o familia, requerimientos de autosuficiencia y restricciones legales o comunitarias.",
    keyQuestions: [
      "¿Cuál es el propósito central del predio: autosuficiencia familiar, comercialización orgánica o regeneración ecológica?",
      "¿Con cuánto capital financiero y horas humanas semanales se cuenta para la fase de establecimiento?",
      "¿Qué visión a 10 y 20 años tiene la familia o cooperativa sobre este territorio?"
    ],
    deliverables: [
      "Ficha de Metas Holísticas (Holistic Context)",
      "Matriz de Tiempo/Capacidades disponibles",
      "Presupuesto de capital inicial y flujos proyectados"
    ],
    branch: "social",
    branchLabel: "🌿 Rama Social • Pasaporte Verde & Cooperativa",
    agroTechTool: "Módulo Onboarding Participativo & Encuesta de Contexto Predial",
    branchViabilityNote: "Liderado por el Pilar Social (Wladimir) para alinear las aspiraciones humanas con la viabilidad financiera cooperativa.",
    badgeColor: "emerald"
  },
  {
    id: 2,
    faseId: 1,
    faseName: "Fase 1: Contexto, Metas y Diagnóstico Base",
    title: "Mapa Base, Catastro y Límites Legales",
    tagline: "La cartografía fundamental sobre la que se asientan todas las capas",
    fullDescription: "Recopilación de cartografía oficial, límites de deslindes, servidumbres de paso, derechos de agua inscritos ante la DGA, cercos existentes y fotogrametría georreferenciada de alta precisión.",
    keyQuestions: [
      "¿Están legalmente saneados los deslindes y servidumbres de paso?",
      "¿Existe un ortomosaico reciente capturado con dron o satélite de alta resolución?",
      "¿Qué infraestructura física preexistente es inamovible (caminos vecinales, líneas eléctricas)?"
    ],
    deliverables: [
      "Mapa Base Vectorial (GeoJSON / SHP / CAD)",
      "Ortofotomosaico georreferenciado con drones (GSD < 3 cm/px)",
      "Tabla de servidumbres y restricciones legales"
    ],
    branch: "digital",
    branchLabel: "💻 Rama Digital • AgriTwin 3D",
    agroTechTool: "AgriTwin GIS Layer + Drones de Fotogrametría (Luis González)",
    branchViabilityNote: "Permite importar catastros y geometrías directas al visor 3D para trabajar con tolerancias métricas reales.",
    permanenceRank: 2,
    badgeColor: "blue"
  },
  {
    id: 3,
    faseId: 1,
    faseName: "Fase 1: Contexto, Metas y Diagnóstico Base",
    title: "Macro y Microclima (Régimen Térmico y Pluviometría)",
    tagline: "El clima macro no se puede cambiar, pero el microclima se diseña",
    fullDescription: "Análisis histórico de precipitaciones anuales, evapotranspiración potencial (ET0), fecha promedio de primera y última helada, acumulación de horas de frío (HF), grados día y microclimas generados por laderas y masas boscosas.",
    keyQuestions: [
      "¿Cuántos milímetros de precipitación anual caen en promedio y cómo se distribuyen estacionalmente?",
      "¿Cuál es el riesgo y recurrencia de heladas tardías de primavera?",
      "¿Qué laderas captan mayor radiación térmica o sufren mayor desecación por vientos secos?"
    ],
    deliverables: [
      "Gráfico de Balance Climático y Calendario de Heladas Históricas",
      "Mapa de Isoyetas e Isotermas del Predio",
      "Cálculo de Evapotranspiración según fórmula FAO-56 Penman-Monteith"
    ],
    branch: "digital",
    branchLabel: "💻 Rama Digital • AgriTwin 3D & Satélites",
    agroTechTool: "Conexión API Red Agromet / DGA + Algoritmo Katabático de Heladas",
    branchViabilityNote: "La rama digital cruza estaciones meteorológicas históricas con la telemetría en tiempo real de nodos de campo.",
    permanenceRank: 1,
    badgeColor: "blue"
  },
  {
    id: 4,
    faseId: 1,
    faseName: "Fase 1: Contexto, Metas y Diagnóstico Base",
    title: "Análisis de Cuenca e Hidrología Mayor",
    tagline: "Entender el agua antes de que caiga una sola gota",
    fullDescription: "Estudio de la microcuenca hidrográfica: de dónde viene el agua externa, cómo escurre superficialmente durante lluvias torrenciales, puntos de concentración de caudales, riesgos de erosión en cárcavas y capacidad de infiltración natural.",
    keyQuestions: [
      "¿Cuánta agua de escorrentía entra al predio proveniente de propiedades vecinas o laderas superiores?",
      "¿Dónde se ubican los cauces secos y las zonas de inundación en tormentas de retorno de 10 o 50 años?",
      "¿Qué derechos de aprovechamiento de agua superficial o subterránea existen legalmente?"
    ],
    deliverables: [
      "Mapa de Líneas de Flujo de Cuenca (Flow Accumulation Mesh)",
      "Delimitación de Subcuencas Aportantes y Puntos de Salida",
      "Estimación de caudales punta mediante Método Racional"
    ],
    branch: "digital",
    branchLabel: "💻 Rama Digital • AgriTwin Regional & Cuenca",
    agroTechTool: "AgroTwin Regional (:7774) + Modelo Digital de Elevación (DEM 12.5m)",
    branchViabilityNote: "La visualización en 3D permite ver los valles y crestas para diseñar el agua antes de cualquier excavación.",
    permanenceRank: 3,
    badgeColor: "blue"
  },
  {
    id: 5,
    faseId: 1,
    faseName: "Fase 1: Contexto, Metas y Diagnóstico Base",
    title: "Geología, Relieve y Topografía (Landshape & Keyline)",
    tagline: "La forma del paisaje determina el flujo de la energía y los nutrientes",
    fullDescription: "Mapeo de curvas de nivel a 1 metro de equidistancia, identificación de puntos de inflexión de pendiente (Keypoints), líneas de cresta, laderas de convergencia (valles) y divergencia (lomos) para aplicar el sistema Keyline de Yeomans.",
    keyQuestions: [
      "¿Dónde se ubican con precisión los Puntos Clave (Keypoints) en cada ladera?",
      "¿Cuáles son las pendientes críticas donde la maquinaria pesada no puede operar con seguridad?",
      "¿Qué material parental o sustrato geológico aflora en las distintas áreas del predio?"
    ],
    deliverables: [
      "Malla 3D de Curvas de Nivel de Alta Densidad",
      "Mapa de Pendientes (%) y Exposición (Aspect)",
      "Trazo preliminar de Líneas Guía Keyline para siembra y zanjas"
    ],
    branch: "digital",
    branchLabel: "💻 Rama Digital • AgriTwin 3D",
    agroTechTool: "Motor WebGL Three.js con visualizador topográfico interactivo",
    branchViabilityNote: "Calcula pendientes y curvas de nivel dinámicamente para exportar cotas a maquinaria guiada por GPS.",
    permanenceRank: 2,
    badgeColor: "blue"
  },
  {
    id: 6,
    faseId: 1,
    faseName: "Fase 1: Contexto, Metas y Diagnóstico Base",
    title: "Diagnóstico y Salud del Suelo Vivo",
    tagline: "El suelo no es un soporte inerte, es un ecosistema biológico",
    fullDescription: "Evaluación física, química y biológica: estratigrafía mediante calicatas, profundidad efectiva de raíces, compactación con penetrómetro, pH, materia orgánica (MO %), retención de humedad y presencia de microbiología beneficiosa (micorrizas y bacterias).",
    keyQuestions: [
      "¿A qué profundidad se encuentra el pie de arado o estrato compactado impermeable?",
      "¿Cuál es el porcentaje de materia orgánica y cómo varía entre los cuarteles agrícolas y el monte nativo?",
      "¿Cuál es la tasa de infiltración de agua (mm/hora) medida in situ?"
    ],
    deliverables: [
      "Registro fotográfico y descriptivo de Calicatas Estratigráficas",
      "Mapa de Tipos de Suelo y Texturas (Arena, Limo, Arcilla)",
      "Plan de Remineralización y Biofertilización Regenerativa"
    ],
    branch: "tecnica",
    branchLabel: "⚙️ Rama Técnica • KioT Sensórica & Biofábrica",
    agroTechTool: "Sondas FDR Multinivel + Domo Biofábrica Meniel (Bokashi maduro 1.5kg/árbol + Micorrizas)",
    branchViabilityNote: "Validación instrumental en tiempo real: los sensores registran infiltración y retención, mientras se audita la biomasa seca forrajera (kgMs/ha) en los 8 potreros.",
    permanenceRank: 8,
    badgeColor: "amber"
  },

  // FASE 2: ANÁLISIS DE FLUJOS Y ENERGÍAS EXTERNAS
  {
    id: 7,
    faseId: 2,
    faseName: "Fase 2: Análisis de Flujos y Energías Externas",
    title: "Análisis de Sectores (Energías No Controladas)",
    tagline: "Canalizar lo beneficioso, desviar o amortiguar lo dañino",
    fullDescription: "Mapeo radial de las energías que atraviesan el predio desde el exterior sin que podamos detenerlas: asoleamiento (ángulos de solsticio y equinoccio), vientos fríos invernales, vientos secos desecantes, riesgo de incendios forestales, polvo, ruido de carreteras y corredores de fauna.",
    keyQuestions: [
      "¿Desde qué cuadrantes provienen los vientos más violentos o fríos durante la floración?",
      "¿Cuál es el cuadrante de mayor riesgo de incendio forestal en verano (viento sur-suroeste + calor)?",
      "¿Dónde se proyectan las sombras largas de los cerros o árboles vecinos en el solsticio de invierno?"
    ],
    deliverables: [
      "Plano Circular de Análisis de Sectores (Solares, Viento, Fuego, Vistas)",
      "Carta Solar Estacional con Sombras Arrojadas",
      "Mapa de Frentes de Riesgo de Incendio (FWI)"
    ],
    branch: "digital",
    branchLabel: "💻 Rama Digital • AgriTwin 3D & Satélites",
    agroTechTool: "Simulador de Iluminación Solar Horaria + Vectores Katabáticos y de Fuego",
    branchViabilityNote: "El motor 3D proyecta sombras dinámicas y vectores de viento según la fecha y hora seleccionada.",
    badgeColor: "blue"
  },
  {
    id: 8,
    faseId: 2,
    faseName: "Fase 2: Análisis de Flujos y Energías Externas",
    title: "Zonificación Permacultural (Zonas 0 a 5)",
    tagline: "Ubicación relativa basada en la frecuencia de atención y visitas",
    fullDescription: "Ordenamiento del territorio en anillos o áreas concéntricas según la energía humana requerida para gestionarlas: Zona 0 (Hogar / Núcleo), Zona 1 (Huerto intensivo y semilleros), Zona 2 (Frutales y aves), Zona 3 (Cultivos extensivos y pastos), Zona 4 (Silvopastoreo y leña), Zona 5 (Reserva natural intocada).",
    keyQuestions: [
      "¿Están los elementos que requieren atención diaria (almácigos, compost de cocina) en la Zona 1 inmediata?",
      "¿Se minimizan los recorridos diarios innecesarios para alimentar animales o revisar riego?",
      "¿Existe una Zona 5 intocada que actúe como pulmón biológico y escuela de observación del bosque?"
    ],
    deliverables: [
      "Plano de Zonificación Permacultural Oficial (Zonas 0 a 5)",
      "Matriz de Frecuencia de Visitas por Cuartel/Elemento",
      "Presupuesto de Energía Humana y Desplazamiento"
    ],
    branch: "transversal",
    branchLabel: "🌲 Transversal • Diseño Permacultural Integrado",
    agroTechTool: "Mapeo de las 6 Salas Operativas del Hub Master (:7777): Galpón Z0, Invernadero Z1, Establo Z2-Z3, Agrovoltaico Z4, Incursión Rewilding Z5 y Cumbre Cuenca",
    branchViabilityNote: "Determina la arquitectura de redes y salas del sistema: alta frecuencia en Galpón/Invernadero, bajo consumo LoRaWAN en potreros y quebradas.",
    badgeColor: "emerald"
  },

  // FASE 3: INFRAESTRUCTURA PRINCIPAL (ESCALA DE PERMANENCIA)
  {
    id: 9,
    faseId: 3,
    faseName: "Fase 3: Infraestructura Principal (Escala de Permanencia)",
    title: "Diseño Hidrológico Integral (Agua Primero)",
    tagline: "Ralentizar, esparcir, infiltrar y almacenar cada gota de agua",
    fullDescription: "Estrategia para convertir el predio en una esponja hídrica: cosecha de agua de techumbres en estanques, zanjas de infiltración a nivel (swales), tranques de retención en puntos clave, aliviaderos diseñados para crecidas y reutilización de aguas grises tratadas con biofiltros.",
    keyQuestions: [
      "¿Dónde se puede ubicar un tranque en la cota más alta posible para regar por gravedad sin consumir combustible ni electricidad?",
      "¿Están calculadas las zanjas de infiltración con un aliviadero estabilizado para evitar desbordes destructivos?",
      "¿Cuántos m³ de agua de lluvia pueden cosecharse en las techumbres de la Zona 0 anualmente?"
    ],
    deliverables: [
      "Plan Maestro Hidrológico (Tranques, Swales, Conducciones)",
      "Memoria de Cálculo de Capacidad de Almacenamiento (m³)",
      "Dimensionamiento de Vertederos de Emergencia Estabilizados"
    ],
    branch: "tecnica",
    branchLabel: "⚙️ Rama Técnica • KioT & Obra Hidráulica",
    agroTechTool: "Embalse Australiano 18.000 m³ con Geomembrana HDPE (CROP-TRANQUE-01) + Infiltración Freática Subálveo Colliguay",
    branchViabilityNote: "Almacenamiento masivo en cota alta con geomembrana HDPE y diseño de aliviaderos que alimentan las franjas de infiltración del potrero P7.",
    permanenceRank: 3,
    badgeColor: "amber"
  },
  {
    id: 10,
    faseId: 3,
    faseName: "Fase 3: Infraestructura Principal (Escala de Permanencia)",
    title: "Red de Accesos, Caminos y Circulaciones",
    tagline: "Los caminos deben guiar el agua hacia las reservas, nunca provocar cárcavas",
    fullDescription: "Trazado de caminos vehiculares, huellas para tractores o carretillas y senderos peatonales. Los caminos principales deben ubicarse en líneas de cresta o ligeramente inclinados hacia adentro para que sus cunetas alimenten los tranques y swales, integrando transporte y cosecha de agua.",
    keyQuestions: [
      "¿Siguen los caminos las pendientes suaves del terreno para evitar la erosión de las capas de rodado?",
      "¿Pueden transitar vehículos de emergencia o camiones de bomberos en cualquier época del año?",
      "¿Actúan los caminos como cortafuegos pasivos y recolectores de agua de escorrentía?"
    ],
    deliverables: [
      "Plano de Red Vial Primaria, Secundaria y Peatonal",
      "Perfiles Transversales de Camino con Cunetas de Derivación",
      "Especificaciones de Estabilización y Vados de Cruce"
    ],
    branch: "digital",
    branchLabel: "💻 Rama Digital • AgriTwin 3D",
    agroTechTool: "Simulador de Rutas de Tránsito & Pendientes Críticas en AgriTwin",
    branchViabilityNote: "El gemelo 3D calcula pendientes longitudinales de caminos para asegurar que no superen el 8-10% máximo.",
    permanenceRank: 4,
    badgeColor: "blue"
  },
  {
    id: 11,
    faseId: 3,
    faseName: "Fase 3: Infraestructura Principal (Escala de Permanencia)",
    title: "Estructuras, Hábitats Bioclimáticos y Zona 0",
    tagline: "Construcciones que dialogan con el clima y aprovechan la energía pasiva",
    fullDescription: "Emplazamiento y diseño bioclimático de viviendas, talleres, galpones de acopio, invernaderos adosados, secadores solares y gallineros. Orientación solar norte (en el hemisferio sur), inercia térmica con barro o piedra, ventilación cruzada y captación solar pasiva.",
    keyQuestions: [
      "¿Está la vivienda principal ubicada en el cinturón térmico (fuera de las heladas del fondo del valle y de los vientos de cresta)?",
      "¿Aprovecha la orientación solar norte para calentar las habitaciones en invierno sin gastar leña excesiva?",
      "¿Están los techos diseñados con pendientes óptimas para captar lluvia y alojar paneles fotovoltaicos?"
    ],
    deliverables: [
      "Emplazamiento Bioclimático de Estructuras en Zona 0",
      "Detalle de Invernadero Pasivo con Acumulación Térmica de Agua",
      "Esquema de Ventilación Natural y Sombras Estacionales"
    ],
    branch: "tecnica",
    branchLabel: "⚙️ Rama Técnica • KioT Smart Home & Farm",
    agroTechTool: "Kits de Telemetría Ambiental Interior SHT31 + El Galpón Predial 3D (:7773)",
    branchViabilityNote: "Monitorea temperatura y humedad en bodegas e invernaderos para conservar alimentos y semillas.",
    permanenceRank: 6,
    badgeColor: "amber"
  },
  {
    id: 12,
    faseId: 3,
    faseName: "Fase 3: Infraestructura Principal (Escala de Permanencia)",
    title: "Subdivisiones, Cercas Vivas y Cortavientos",
    tagline: "Bordes productivos que filtran vientos, frenan fuegos y dirigen el pastoreo",
    fullDescription: "Diseño de cerramientos perimetrales y divisiones internas: setos vivos de especies espinosas y melíferas para protección, cortinas cortavientos de múltiples estratos para reducir la evapotranspiración de los cultivos, y cercos eléctricos solares para pastoreo rotacional de alta densidad.",
    keyQuestions: [
      "¿Tienen las cortinas cortavientos una permeabilidad del 40-50% para frenar el viento sin generar turbulencias?",
      "¿Incluyen las cercas vivas especies nativas con floración escalonada para polinizadores?",
      "¿Facilitan las subdivisiones el movimiento rápido del ganado entre potreros de pastoreo?"
    ],
    deliverables: [
      "Plano de Cortavientos y Cercos Vivos con Selección de Especies",
      "Diseño de Potreros para Manejo Holístico / Pastoreo Voisin (P1 a P8)",
      "Detalle de Cortina Cortafuego Silvopastoril con Pino Insigne Manejado (CROP-PIN-01)"
    ],
    branch: "tecnica",
    branchLabel: "⚙️ Rama Técnica • KioT Pastoreo Edge & Potreros PRV",
    agroTechTool: "Matriz de 8 Potreros PRV en Fundo Meniel (P1 a P8) + Cerca Eléctrica LoRaWAN",
    branchViabilityNote: "Manejo rotacional estricto con cálculo de días de descanso (hasta 44 días en P1) y cortinas perimetrales de amortiguación.",
    permanenceRank: 7,
    badgeColor: "amber"
  },

  // FASE 4: SISTEMAS BIOLÓGICOS Y PRODUCTIVOS
  {
    id: 13,
    faseId: 4,
    faseName: "Fase 4: Sistemas Biológicos y Productivos",
    title: "Metabolismo Circular, Energía Renovable y Residuos",
    tagline: "En la naturaleza no existe la basura; el residuo de uno es el alimento de otro",
    fullDescription: "Cierre de ciclos de materia y energía en el predio: generación solar fotovoltaica y minieólica con almacenamiento LiFePO4, calentadores solares de agua, tratamiento biológico de aguas negras y grises (humedales construidos), y pilas de compost termofílico (método Berkeley / Jean Pain).",
    keyQuestions: [
      "¿Cuál es el consumo eléctrico proyectado y cómo se abastece 100% con fuentes renovables locales?",
      "¿A dónde van las aguas negras y cómo se depuran biológicamente para que salgan aptas para riego forestal?",
      "¿Cómo se reciclan todos los rastrojos de poda y estiércol animal para generar compost y humus de lombriz?"
    ],
    deliverables: [
      "Balance de Metabolismo Predial (kWh, Litros de Agua, Kg de Biomasa)",
      "Esquema de Parque Agrovoltaico de 120 kWp con Seguidor Solar Elevado (CROP-AGRI-01)",
      "Diseño de Humedal Subsuperficial de Depuración de Aguas Grises"
    ],
    branch: "tecnica",
    branchLabel: "⚙️ Rama Técnica • KioT Energy & Agrovoltaico",
    agroTechTool: "Estructura Agrivoltaica 120 kWp + Telemetría de Baterías LiFePO4",
    branchViabilityNote: "Doble uso del suelo: generación eléctrica limpia fotovoltaica sobre laderas y pastura forrajera con sombra productiva para el ganado debajo.",
    badgeColor: "amber"
  },
  {
    id: 14,
    faseId: 4,
    faseName: "Fase 4: Sistemas Biológicos y Productivos",
    title: "Sistemas de Cultivo Intensivo (Zonas 1 y 2)",
    tagline: "Máxima densidad nutricional y frescura a metros de la cocina",
    fullDescription: "Diseño y manejo de huertos biointensivos, bancales elevados en contorno, espirales de aromáticas, invernaderos de propagación, camas de germinación y lombricultura. Policultivos asociados con flores repelentes (tagetes, caléndula) y acolchado orgánico permanente (mulching).",
    keyQuestions: [
      "¿Produce la Zona 1 hortalizas de hoja verde, raíces y hierbas frescas durante las 4 estaciones del año?",
      "¿Se practica la rotación estricta de familias botánicas para evitar el cansancio del suelo?",
      "¿Está el huerto protegido de heladas invernales mediante microclimas o túneles bajos?"
    ],
    deliverables: [
      "Calendario Anual de Siembra y Cosecha Biointensiva",
      "Plano de Distribución de Bancales y Espirales de Hierbas",
      "Plan de Coberturas Vivas y Mulch para Ahorro del 60% de Riego"
    ],
    branch: "tecnica",
    branchLabel: "⚙️ Rama Técnica • Kits de Cultivo & Biofábrica",
    agroTechTool: "Domo Biofábrica (CROP-BIO-01) + Riego Automatizado Penman-Monteith (FDR 20-40cm)",
    branchViabilityNote: "Invernadero bioclimático de producción de Bokashi, biopreparados, caldo sulfocálcico al 2% y bandas florales de aliso marítimo.",
    badgeColor: "amber"
  },
  {
    id: 15,
    faseId: 4,
    faseName: "Fase 4: Sistemas Biológicos y Productivos",
    title: "Agroforestería, Bosques de Alimentos y Rewilding",
    tagline: "Sistemas polifuncionales que imitan la estructura de un bosque maduro",
    fullDescription: "Creación de bosques comestibles de múltiples estratos (árboles altos, frutales menores, arbustos, herbáceas, raíces y trepadoras) combinando especies productivas con fijadoras de nitrógeno y especies nativas del bosque esclerófilo (peumo, quillay, boldo) para regeneración ecológica.",
    keyQuestions: [
      "¿Qué gremios de árboles (guilds) acompañan a los frutales con fijación de nitrógeno y acumulación de minerales?",
      "¿Cómo se restauran los corredores biológicos de quebrada para conectar con el monte nativo?",
      "¿Qué métricas de biomasa y biodiversidad se pueden auditar para certificar conservación?"
    ],
    deliverables: [
      "Diseño de Gremios Vegetales y Bosque Comestible de 7 Estratos",
      "Inventario Taxonómico Florístico con app GoWild Survey",
      "Certificado de Unidades de Biodiversidad Vegetal (BioToken PBC)"
    ],
    branch: "social",
    branchLabel: "🌿 Rama Social • Rewild & Pasaporte Verde",
    agroTechTool: "RewildMapper PWA Offline (:7772) + Corredor Ribereño Nativo (Quillay, Boldo, Maitén, Sauce, Maqui) consorciado con Trébol Blanco y Lavanda",
    branchViabilityNote: "Conecta la conservación de bosque nativo esclerófilo con gremios biológicos productivos y protocolos IPCC Tier-2 de carbono.",
    permanenceRank: 5,
    badgeColor: "emerald"
  },
  {
    id: 16,
    faseId: 4,
    faseName: "Fase 4: Sistemas Biológicos y Productivos",
    title: "Integración Animal Regenerativa y Silvopastoreo",
    tagline: "Los animales como herramientas de regeneración de suelos y control biológico",
    fullDescription: "Integración de gallinas pastoras en tractores móviles para desparasitar frutales y abonar huertos, patos para control de caracoles, apicultura para polinización de frutales, y rumiantes (ovejas o vacunos) bajo pastoreo rotacional regenerativo para reactivar la microbiología del suelo.",
    keyQuestions: [
      "¿Cumplen los animales funciones múltiples de abonado, control de plagas y consumo de rastrojos?",
      "¿Se respeta el tiempo de reposo del pasto para que las raíces se profundicen y secuestren carbono?",
      "¿Tienen los colmenares fuentes de agua limpia y floración escalonada a lo largo del año?"
    ],
    deliverables: [
      "Plan de Rotación de Pastoreo Regenerativo (Días de Ocupación vs Reposo en Potreros P1 a P8)",
      "Diseño de Infraestructura Móvil (Egg Mobile de 45 Gallinas, Bebederos Móviles)",
      "Trazabilidad Individual SAG RFID con Pesaje y Condición Corporal"
    ],
    branch: "tecnica",
    branchLabel: "⚙️ Rama Técnica • Módulo Establo & Ganadería PRV (#establo)",
    agroTechTool: "Módulo Ganadería PRV (#establo en Hub :7777) + Bovinos Clarita y Paloma + Ovino Lana + Equino Relincho + Flota Egg Mobile (45 gallinas)",
    branchViabilityNote: "Manejo con rumiantes rotando entre potreros P3 y P4, seguidos con 3 días de desfase por el Egg Mobile para romper el ciclo parasitario de moscas y abonar la pradera.",
    badgeColor: "amber"
  },

  // FASE 5: IMPLEMENTACIÓN, ECONOMÍA Y EVOLUCIÓN
  {
    id: 17,
    faseId: 5,
    faseName: "Fase 5: Implementación, Economía y Evolución",
    title: "Cronograma de Fases y Estrategia de Implementación",
    tagline: "El orden de los factores sí altera radicalmente el costo y éxito del diseño",
    fullDescription: "Secuenciación lógica de obras en el tiempo para evitar retrabajos: Año 0 (Observación y diseño), Año 1 (Agua, caminos y movimiento de tierras Keyline), Año 2 (Cercas vivas, cortavientos y árboles pioneros fijadores), Año 3+ (Frutales delicados, huertos y construcciones mayores).",
    keyQuestions: [
      "¿Se ejecutan primero las zanjas y tranques antes de plantar árboles para garantizar el agua?",
      "¿Están las cortinas cortavientos establecidas antes de plantar los frutales sensibles?",
      "¿Se avanza de forma modular y pequeña para validar cada subsistema antes de expandirse?"
    ],
    deliverables: [
      "Cronograma Maestro de Fases de Obra (Gantt Regenerativo)",
      "Presupuesto de Maquinaria Pesada y Jornales por Etapa",
      "Plan de Contingencia ante Sequías o Inviernos Extremadamente Lluviosos"
    ],
    branch: "digital",
    branchLabel: "💻 Rama Digital • Orquestador de Servicios & Hub Master",
    agroTechTool: "Orquestador Maestro (scripts/orchestrator.cjs) con Despliegue Multiescala: 7771 Web, 7772 Rewild, 7773 Predio 3D, 7774 Cuenca GIS, 7777 Hub Master",
    branchViabilityNote: "Permite secuenciar y probar cada componente de forma desacoplada y viva sin sobrecargar el sistema.",
    badgeColor: "blue"
  },
  {
    id: 18,
    faseId: 5,
    faseName: "Fase 5: Implementación, Economía y Evolución",
    title: "Economía Regenerativa, Pasaporte Verde y Monitoreo",
    tagline: "Un sistema que no es económicamente viable no es sostenible en el tiempo",
    fullDescription: "Estructuración del modelo de negocio del predio: venta directa en ferias campesinas, cajas de suscripción de alimentos, exportación certificada a mercados que pagan primas por sustentabilidad, emisión del Pasaporte Verde QR demostrando cero deforestación y monitoreo continuo de indicadores biológicos.",
    keyQuestions: [
      "¿Diversifica el predio sus fuentes de ingresos (frutas, miel, talleres, bonos de carbono, plantines)?",
      "¿Cumple la producción con normativas internacionales de debida diligencia ambiental (ej. EUDR en Europa)?",
      "¿Cómo se mide anualmente el incremento de carbono en suelo y la recarga de los acuíferos?"
    ],
    deliverables: [
      "Flujo de Caja Regenerativo y Punto de Equilibrio Financiero",
      "Emisión de Pasaporte Verde QR con trazabilidad inalterable",
      "Informe Anual de Salud Ecosistémica (Carbono, Agua y Biodiversidad)"
    ],
    branch: "social",
    branchLabel: "🌿 Rama Social • La Mesa Vecinal DAO & Pasaporte Verde",
    agroTechTool: "La Mesa Vecinal DAO (#mesa) + Manifiesto Infraestructura Social + Pasaporte Verde QR Exportación UE",
    branchViabilityNote: "Cierra el círculo: la organización como representación del ambiente, asociatividad campesina abierta, comités de agua potable rural (APRs) y gobernanza cooperativa.",
    permanenceRank: 8,
    badgeColor: "emerald"
  }
];

// ==========================================
// 2. LAS 3 ÉTICAS DE LA PERMACULTURA
// ==========================================
export const PERMACULTURE_ETHICS: PermacultureEthic[] = [
  {
    id: "earth-care",
    title: "Cuidado de la Tierra",
    subtitle: "Reconstruir el capital natural y regenerar los ciclos biológicos",
    essence: "Todas las acciones humanas deben conservar los suelos vivos, purificar las aguas, regenerar la cubierta boscosa y preservar la diversidad biológica. La Tierra es la fuente sagrada de toda vida, no un almacén de recursos a saquear.",
    principlesInvolved: "Sustenta directamente los 12 principios de diseño y la prioridad absoluta del agua y el suelo.",
    agroTechManifesto: "AgroTech implementa el Cuidado de la Tierra monitoreando el contenido de agua en suelo con sondas FDR multinivel, auditando la cero deforestación satelital y protegiendo el bosque esclerófilo con Rewild."
  },
  {
    id: "people-care",
    title: "Cuidado de las Personas",
    subtitle: "Soberanía alimentaria, salud comunitaria y desarrollo humano digno",
    essence: "Garantizar que las personas y comunidades tengan acceso a comida limpia, agua pura, hábitats saludables y oportunidades de aprendizaje. Fomentar la autosuficiencia local y el apoyo mutuo sin depender de corporaciones extractivas.",
    principlesInvolved: "Se expresa en la Zona 0 bioclimática, la ergonomía de los huertos biointensivos y la educación campesina.",
    agroTechManifesto: "Nuestra cooperativa democratiza la tecnología haciéndola asequible, creando kits que liberan al campesino del trabajo forzado y ofreciendo talleres comunitarios en Urrutia Edulab."
  },
  {
    id: "fair-share",
    title: "Reparto Justo y Límites al Consumo",
    subtitle: "Economía distributiva, reinversión de excedentes y respeto a los límites planetarios",
    essence: "Cuando un sistema produce excedentes (abundancia de semillas, frutos, energía o dinero), estos no deben acumularse codiciosamente, sino reinvertirse en las dos primeras éticas: regenerar más tierra y cuidar a más personas, autorregulando nuestro consumo.",
    principlesInvolved: "Inspira el principio de 'Aceptar la retroalimentación y aplicar la autorregulación' y 'No producir residuos'.",
    agroTechManifesto: "AgroTech materializa el Reparto Justo en la 'Economía de los Hombros': gobernanza SpA + Cooperativa de Trabajo donde se reconoce la autoría intelectual y se distribuyen los excedentes con equidad."
  }
];

// ==========================================
// 3. LOS 12 PRINCIPIOS DE DAVID HOLMGREN
// ==========================================
export const PERMACULTURE_12_PRINCIPLES: PermaculturePrinciple[] = [
  {
    id: 1,
    title: "1. Observar e Interactuar",
    subtitle: "La naturaleza es la mejor maestra",
    proverb: "La belleza está en los ojos de quien mira",
    description: "Antes de modificar cualquier terreno, es imperativo pasar tiempo observando cómo se comporta en las 4 estaciones: por dónde corre el agua en la lluvia más intensa, dónde se acumula la helada, de dónde sopla el viento y qué plantas pioneras crecen naturalmente.",
    practicalExample: "Dejar pasar un año completo antes de construir una casa o plantar un huerto frutal para conocer los microclimas reales.",
    agroTechApplication: "Telemetría continua con sensores KioT y series temporales de satélite Sentinel-2 para observar datos objetivos antes de intervenir.",
    iconName: "Eye"
  },
  {
    id: 2,
    title: "2. Captar y Almacenar Energía",
    subtitle: "Aprovechar los picos de abundancia para los valles de escasez",
    proverb: "Recoge el heno mientras brilla el sol",
    description: "Desarrollar sistemas que atrapen y acumulen la energía cuando abunda (sol en verano, agua en invierno, biomasa en primavera) para utilizarla en las épocas de carencia, acumulándola en suelos ricos en materia orgánica, tranques de agua y bancos de baterías.",
    practicalExample: "Tranques en cotas altas que almacenan agua de lluvia invernal para regar por gravedad en los meses secos de verano.",
    agroTechApplication: "Baterías LiFePO4 de carga solar en los nodos KioT y modelado del balance hídrico anual en AgriTwin.",
    iconName: "Sun"
  },
  {
    id: 3,
    title: "3. Obtener un Rendimiento",
    subtitle: "El sistema debe ser productivo y autosustentable",
    proverb: "No se puede trabajar con el estómago vacío",
    description: "No basta con que un diseño sea ecológicamente bello; debe producir beneficios inmediatos tangibles (alimento, leña, ingresos) para que quienes lo gestionan puedan sostener su vida y no abandonen el proyecto por extenuación económica.",
    practicalExample: "Intercalar cultivos de ciclo corto (lechugas, rabanitos) entre los frutales recién plantados para cosechar alimento en el primer mes.",
    agroTechApplication: "Pasaporte Verde QR que permite a los agricultores vender a precio premium en mercados europeos desde la primera cosecha auditada.",
    iconName: "Apple"
  },
  {
    id: 4,
    title: "4. Aplicar la Autorregulación y Aceptar la Retroalimentación",
    subtitle: "Escuchar las consecuencias de nuestros actos",
    proverb: "Los pecados de los padres se castigan en los hijos hasta la 7ª generación",
    description: "La naturaleza nos envía señales cuando algo está mal (erosión, plagas repentinas, agotamiento del agua). Debemos ser humildes para reconocer los errores de diseño, frenar la actividad dañina y autorregular nuestras intervenciones.",
    practicalExample: "Si aparece una plaga de pulgones, no usar veneno químico; entender que hay exceso de nitrógeno o falta de depredadores (chinitas) y corregir.",
    agroTechApplication: "Alertas automáticas de estrés hídrico (CWSI) y riesgo de helada katabática para intervenir solo cuando el sistema lo requiere.",
    iconName: "RefreshCw"
  },
  {
    id: 5,
    title: "5. Usar y Valorar los Servicios y Recursos Renovables",
    subtitle: "Dejar que las fuerzas vivas hagan el trabajo pesado",
    proverb: "Deja que la naturaleza siga su curso",
    description: "Reducir nuestra dependencia de insumos no renovables (petróleo, abonos sintéticos) aprovechando los servicios ecosistémicos gratuitos: el sol para calentar, el viento para ventilar, las leguminosas para fijar nitrógeno y las gallinas para desmalezar.",
    practicalExample: "Uso de trébol subterráneo como abono verde fijador de nitrógeno en vez de comprar urea petroquímica.",
    agroTechApplication: "Riego gravitacional diseñado con Keyline que prescinde de bombas diésel contaminantes.",
    iconName: "Wind"
  },
  {
    id: 6,
    title: "6. Dejar de Producir Residuos",
    subtitle: "La basura es un error de diseño",
    proverb: "Evitando el desperdicio, se evita la carencia",
    description: "En los ecosistemas naturales maduros, el residuo de un organismo es el alimento de otro. Todo ciclo debe cerrarse: reciclar aguas grises en riego forestal, convertir estiércol en biogás y compostar toda la materia orgánica.",
    practicalExample: "Biofiltro de lombrices (sistema Tohá) para limpiar las aguas de lavado de la cocina y reutilizarlas en el huerto frutal.",
    agroTechApplication: "Cálculo metabólico predial que rastrea los flujos de biomasa, leña y agua en el Fundo Meniels.",
    iconName: "Recycle"
  },
  {
    id: 7,
    title: "7. Diseñar desde los Patrones hacia los Detalles",
    subtitle: "Primero la visión global, luego la microespecificación",
    proverb: "El árbol no deja ver el bosque",
    description: "Comprender primero los grandes patrones del paisaje (la forma de la cuenca, las líneas de cresta, los vientos dominantes) antes de obsesionarse con la especie exacta de tomate que se va a plantar en una esquina.",
    practicalExample: "Definir primero las vías de agua y caminos en todo el campo siguiendo las curvas de nivel antes de ubicar los gallineros.",
    agroTechApplication: "De la cuenca regional del Maule (:7774) al predio 3D (:7773) y de ahí al sensor del brote: diseño multiescala.",
    iconName: "Compass"
  },
  {
    id: 8,
    title: "8. Integrar más que Segregar",
    subtitle: "Cada elemento cumple múltiples funciones y cada función es sostenida por múltiples elementos",
    proverb: "Muchas manos aligeran el trabajo",
    description: "En lugar de separar los componentes (un monocultivo aquí, animales allá, bodega aislada), colocarlos en relaciones sinérgicas donde se ayuden mutuamente. Por ejemplo, un invernadero adosado al gallinero comparte calor mutuo.",
    practicalExample: "Un estanque no solo guarda agua: cría peces, atrae libélulas controladoras de mosquitos y refleja luz solar a los frutales vecinos.",
    agroTechApplication: "Los nodos KioT no solo miden humedad: miden temperatura de brote para heladas y comandan el riego en un solo dispositivo integrado.",
    iconName: "Network"
  },
  {
    id: 9,
    title: "9. Usar Soluciones Lentas y Pequeñas",
    subtitle: "La resiliencia se construye paso a paso",
    proverb: "Lento y constante gana la carrera",
    description: "Las intervenciones a gran escala y de golpe suelen tener efectos secundarios imprevistos y costosos. Los sistemas pequeños son más fáciles de mantener, permiten aprender de la práctica y son menos vulnerables a desastres imprevistos.",
    practicalExample: "Hacer una zanja de infiltración piloto de 20 metros y observar cómo responde el suelo en invierno antes de excavar kilómetros con retroexcavadora.",
    agroTechApplication: "Despliegue de kits IoT modulares: empezar con 2 nodos en el cuartel crítico antes de instrumentar las 100 hectáreas.",
    iconName: "Sliders"
  },
  {
    id: 10,
    title: "10. Usar y Valorar la Diversidad",
    subtitle: "La diversidad es el seguro de vida de los ecosistemas",
    proverb: "No pongas todos los huevos en la misma cesta",
    description: "La monocultura es frágil ante plagas y fluctuaciones de mercado. La policultura de especies, variedades genéticas patrimoniales y nichos ecológicos genera resiliencia: si un año falla la cereza por una helada tardía, el nogal o el membrillo sobreviven.",
    practicalExample: "Asociar 8 variedades distintas de árboles frutales con floraciones desfasadas junto a especies nativas melíferas.",
    agroTechApplication: "Auditoría botánica multisatélite para identificar heterogeneidad de canopia y prevenir monocultivos vulnerables.",
    iconName: "Trees"
  },
  {
    id: 11,
    title: "11. Usar los Bordes y Valorar lo Marginal",
    subtitle: "En la frontera entre dos mundos ocurre la mayor fecundidad",
    proverb: "No creas que estás en el camino correcto solo porque ves muchas huellas",
    description: "La interfase entre dos ecosistemas diferentes (el ecotono, como el borde entre el bosque nativo y la pradera, o la orilla de un estanque) es la zona de mayor intercambio biológico, densidad de especies y productividad.",
    practicalExample: "Diseñar los bordes de los tranques con orillas serpenteantes y ensenadas en lugar de formas cuadradas para multiplicar la vida acuática.",
    agroTechApplication: "Monitoreo específico de las franjas de amortiguación (buffer zones) entre predios agrícolas y quebradas en Rewild.",
    iconName: "Maximize2"
  },
  {
    id: 12,
    title: "12. Usar y Responder Creativamente al Cambio",
    subtitle: "El cambio es la única constante",
    proverb: "La visión no es ver las cosas como son, sino como serán",
    description: "El cambio no es una amenaza que deba resistirse tercamente, sino una oportunidad para evolucionar. El cambio climático, la sucesión ecológica o las variaciones socioeconómicas deben anticiparse para dirigir el diseño hacia la regeneración.",
    practicalExample: "Acompañar la sucesión natural plantando especies pioneras fijadoras de suelo que preparen la llegada del bosque esclerófilo clímax.",
    agroTechApplication: "Simulador de transición climática a 10 años que modela el cambio de temperaturas para adaptar las variedades agrícolas del Maule.",
    iconName: "Sparkles"
  }
];

// ==========================================
// 4. ZONIFICACIÓN PERMACULTURAL (0 A 5)
// ==========================================
export const PERMACULTURE_ZONES: PermacultureZone[] = [
  {
    zone: 0,
    name: "Zona 0: El Hogar y Núcleo Metabólico",
    frequency: "Constante (24 horas / día)",
    humanEffort: "Máximo control bioclimático",
    description: "El centro neurálgico del sistema: la vivienda, la cocina, la oficina de administración y el almacenamiento de semillas. Diseñada bajo principios bioclimáticos para maximizar la inercia térmica, captar sol y recolectar agua de techos.",
    elements: [
      "Vivienda bioclimática con orientación solar",
      "Cocina y despensa de conservación de alimentos",
      "Banco de baterías y panel solar fotovoltaico central",
      "Calentador solar de agua y estufa de masa térmica (Rocket)",
      "Recolección de lluvia de techumbres en estanques herméticos"
    ],
    techIntegration: "Gateway LoRaWAN central, servidor local AgriTwin y panel de control de la energía del hogar."
  },
  {
    zone: 1,
    name: "Zona 1: Huerto Biointensivo y Semilleros",
    frequency: "Varias veces al día (1 a 4 visitas)",
    humanEffort: "Intensivo pero en área muy reducida",
    description: "El espacio inmediatamente adyacente a la casa. Alberga los cultivos más delicados que requieren atención continua: plántulas, hierbas culinarias, ensaladas de corte diario y la compostera de restos de cocina.",
    elements: [
      "Espiral de hierbas aromáticas y medicinales junto a la cocina",
      "Bancales biointensivos de hortalizas de hoja rápida",
      "Invernadero de germinación y almácigos",
      "Vermicompostera (humus de lombriz) y compost rápido",
      "Pila de compostaje Berkeley de 18 días"
    ],
    techIntegration: "Sondas capacitivas de alta frecuencia conectadas a electroválvulas de micropulso de riego."
  },
  {
    zone: 2,
    name: "Zona 2: Huerto Semi-Intensivo, Frutales Menores y Aves",
    frequency: "Diaria (1 a 2 visitas al día)",
    humanEffort: "Moderado (manejo mecanizado ligero o animal)",
    description: "Zona productiva para cultivos perennes y pequeños animales: árboles frutales injertados, arbustos de bayas (arándanos, frambuesas), gallinero con acceso a parque y pequeños estanques de riego.",
    elements: [
      "Frutales de carozo y pepita con acolchado grueso",
      "Arbustos de berries protegidos con mallas antipájaros",
      "Gallinero con corral rotativo para desmalezar",
      "Estanque intermedio de biofiltración y patos",
      "Cercas vivas melíferas para abejas"
    ],
    techIntegration: "Sensores de temperatura de brote para alerta de heladas y control de gallineros solares automatizados."
  },
  {
    zone: 3,
    name: "Zona 3: Agricultura Comercial y Pasturas Principales",
    frequency: "Semanal o periódica (según labores estacionales)",
    humanEffort: "Bajo por metro cuadrado (alta eficiencia)",
    description: "El área de cultivo extensivo y comercial: cereales, leguminosas, viñedos patrimoniales de secano y potreros principales para pastoreo de rumiantes (vacas, ovejas). La intervención es estacional: siembra, cosecha y rotación.",
    elements: [
      "Viñedo patrimonial o huerto comercial de nogales/cerezos",
      "Cultivos anuales extensivos (trigo, maíz, porotos)",
      "Potreros con cercado eléctrico para Manejo Holístico",
      "Zanjas de infiltración Keyline a gran escala",
      "Almacenes de forraje y fardos de heno"
    ],
    techIntegration: "Sondas FDR multinivel inalámbricas a batería solar y monitoreo de vigor vegetal Sentinel-2 NDVI."
  },
  {
    zone: 4,
    name: "Zona 4: Silvopastoreo y Cosecha Forestal Sustentable",
    frequency: "Mensual o estacional",
    humanEffort: "Mínimo (manejo silvícola ocasional)",
    description: "La zona semi-silvestre del predio: bosques de maderas nobles, producción de leña sustentable mediante recepe (coppicing), recolección de hongos y frutos silvestres, y pastoreo diferido bajo arbolado maduro.",
    elements: [
      "Bosque maderero con podas de formación",
      "Plantaciones de leña de rápido crecimiento para autoabastecimiento",
      "Silvopastoreo de baja carga animal",
      "Grandes tranques de almacenamiento y recarga de acuífero",
      "Cajas nido para aves rapaces controladoras de roedores"
    ],
    techIntegration: "Nodos LoRaWAN de largo alcance para monitoreo de humedad profunda y alerta temprana de fuego (FWI)."
  },
  {
    zone: 5,
    name: "Zona 5: Reserva Silvestre y Naturaleza Intocada",
    frequency: "Esporádica (solo para observar y meditar)",
    humanEffort: "Cero intervención humana (estricta conservación)",
    description: "El espacio sagrado de la naturaleza en el predio. Quebradas nativas, cumbres rocosas y remanentes de bosque esclerófilo donde el ser humano entra solo como observador humilde para aprender cómo se autorregula la vida virgen.",
    elements: [
      "Bosque nativo esclerófilo maduro (peumo, quillay, boldo, litre)",
      "Quebradas vivas con cursos de agua protegidos",
      "Refugio de fauna nativa (zorros, pumas, carpinteros negros)",
      "Banco vivo de semillas silvestres autóctonas",
      "Puntos de observación para la meditación y contemplación"
    ],
    techIntegration: "Biomonitoreo pasivo con Rewild Suite: trampas cámara, acústica de aves y certificación BioToken PBC."
  }
];

// ==========================================
// 5. ESCALA DE PERMANENCIA (YEOMANS & REGRARIANS)
// ==========================================
export const SCALE_OF_PERMANENCE_LAYERS: PermanenceScaleLayer[] = [
  {
    rank: 1,
    name: "1. Clima",
    yeomansOriginal: true,
    easeOfChange: "Muy difícil / Inalterable",
    description: "La atmósfera, radiación solar, régimen térmico, estaciones y pluviometría. Es la fuerza motriz del ecosistema sobre la que el ser humano no tiene control directo.",
    permacultureStrategy: "Aceptar el macroclima y diseñar microclimas mediante laderas, sombras y cortinas de árboles.",
    agroTechSolution: "Ingesta de estaciones oficiales Agromet y modelado de heladas katabáticas en AgriTwin."
  },
  {
    rank: 2,
    name: "2. Topografía / Geografía (Landshape)",
    yeomansOriginal: true,
    easeOfChange: "Muy difícil / Inalterable",
    description: "Las formas geológicas del relieve, montañas, lomas, valles, pendientes y puntos de inflexión (Keypoints). Modificar la montaña exige energías titánicas.",
    permacultureStrategy: "Ubicar los elementos según la pendiente: estructuras en cotas altas, caminos en crestas y agua en valles.",
    agroTechSolution: "Modelos Digitales de Elevación (DEM) con mallas 3D de curvas de nivel a 1 metro de resolución."
  },
  {
    rank: 3,
    name: "3. Agua",
    yeomansOriginal: true,
    easeOfChange: "Difícil",
    description: "Los patrones de escorrentía, caudales, manantiales, arroyos y napas freáticas. El agua debe canalizarse en el punto más alto posible para obtener energía potencial.",
    permacultureStrategy: "Diseño hidrológico Keyline: tranques en puntos clave, swales para infiltración y drenaje sin erosión.",
    agroTechSolution: "Simulador de escorrentía superficial y balance hídrico computacional en AgriTwin Regional."
  },
  {
    rank: 4,
    name: "4. Accesos y Caminos",
    yeomansOriginal: true,
    easeOfChange: "Moderado",
    description: "Caminos principales, huellas y senderos. Determinan por dónde se mueve la gente, la maquinaria y los animales, y pueden canalizar o destruir el flujo de agua.",
    permacultureStrategy: "Trazar caminos sobre lomos o ligeramente paralelos a las curvas de nivel para que sus cunetas cosechen agua.",
    agroTechSolution: "Trazado asistido por pendientes máximas admisibles en el software para evitar erosión vial."
  },
  {
    rank: 5,
    name: "5. Silvicultura y Árboles (Forestry)",
    yeomansOriginal: true,
    easeOfChange: "Moderado",
    description: "Bosques nativos, cortinas cortavientos, montes madereros y huertos frutales perennes. Tardan décadas en madurar pero transforman radicalmente el suelo y el clima.",
    permacultureStrategy: "Plantación densa inicial con especies nodrizas de rápido crecimiento seguidas de frutales de alto valor.",
    agroTechSolution: "Auditoría de biomasa e índices Sentinel-2 (NDVI, NDWI) para medir el vigor del dosel."
  },
  {
    rank: 6,
    name: "6. Construcciones y Estructuras",
    yeomansOriginal: true,
    easeOfChange: "Moderado",
    description: "Casas, galpones, talleres, bodegas, invernaderos y puentes. Deben situarse cerca de buenos caminos y con orientación solar favorable.",
    permacultureStrategy: "Bioarquitectura pasiva en Zona 0 con materiales locales (tierra, madera, paja) e inercia térmica.",
    agroTechSolution: "Simulación de asoleamiento y confort térmico en estructuras modeladas en WebGL."
  },
  {
    rank: 7,
    name: "7. Cercas y Subdivisiones (Fencing)",
    yeomansOriginal: true,
    easeOfChange: "Fácil",
    description: "Cerramientos para manejo animal, linderos de propiedad y fajas de protección. Son fácilmente reubicables en comparación con un camino o un tranque.",
    permacultureStrategy: "Cercados móviles eléctricos para pastoreo rotacional de ultra-alta densidad y setos vivos multifuncionales.",
    agroTechSolution: "Electrificadores inteligentes LoRaWAN monitoreados en la nube con alertas de caída de voltaje."
  },
  {
    rank: 8,
    name: "8. Suelo Vivo",
    yeomansOriginal: true,
    easeOfChange: "Muy dinámico",
    description: "La capa biológica superficial: microorganismos, materia orgánica, minerales disponibles y estructura esponjosa. Cambia de mes a mes según el manejo humano.",
    permacultureStrategy: "Cero labranza, coberturas vegetales vivas permanentes, biocarbón (biochar) y biofertilizantes líquidos.",
    agroTechSolution: "Sondas de capacitancia FDR multinivel que miden la retención volumétrica de humedad en 4 estratos."
  },
  {
    rank: 9,
    name: "9. Economía y Finanzas (Regrarians)",
    yeomansOriginal: false,
    easeOfChange: "Muy dinámico",
    description: "Capa agregada por Darren Doherty en la Plataforma Regrarians: modelos de comercialización, flujos de caja, cadenas de valor éticas y capital de trabajo.",
    permacultureStrategy: "Economía circular distributiva, venta directa del productor al consumidor y pasaportes ecológicos.",
    agroTechSolution: "Pasaporte Verde QR para exportación con cero deforestación y modelo cooperativo 'Economía de los Hombros'."
  },
  {
    rank: 10,
    name: "10. Energía (Regrarians)",
    yeomansOriginal: false,
    easeOfChange: "Muy dinámico",
    description: "Sistemas de generación, almacenamiento y consumo energético: paneles solares, biogás, biomasa, tracción animal o motriz.",
    permacultureStrategy: "Autosuficiencia energética distribuida en cada unidad predial mediante tecnologías apropiadas.",
    agroTechSolution: "Controladores solares MPPT y telemetría de baterías LiFePO4 integrados en el hardware KioT."
  }
];

// ==========================================
// 6. ESTRATOS DEL BOSQUE DE ALIMENTOS (7 CAPAS)
// ==========================================
export const FOOD_FOREST_STRATA: FoodForestStratum[] = [
  {
    layer: 1,
    name: "Estrato 1: Dosel Arbóreo Superior (Canopy)",
    height: "10 a 20+ metros",
    role: "Árboles dominantes de gran porte que crean el microclima, frenan vientos y bombean nutrientes desde estratos geológicos profundos.",
    maulinoExamples: ["Nogal de Castilla", "Castaño", "Roble maulino", "Peumo centenario", "Quillay maduro"],
    ecologicalFunction: "Fijación masiva de carbono, sombra para especies inferiores y producción de frutos secos de alto valor calórico."
  },
  {
    layer: 2,
    name: "Estrato 2: Subdosel / Árboles Bajos (Understory)",
    height: "3 a 9 metros",
    role: "La columna vertebral frutal del bosque comestible. Crecen bajo la luz filtrada del dosel superior.",
    maulinoExamples: ["Manzanos patrimoniales", "Perales", "Ciruelos", "Cerezos", "Higuera", "Maitén"],
    ecologicalFunction: "Producción de fruta fresca de mesa, néctar para polinizadores y refugio de aves insectívoras."
  },
  {
    layer: 3,
    name: "Estrato 3: Estrato Arbustivo (Shrub Layer)",
    height: "1 a 3 metros",
    role: "Arbustos perennes con bayas, flores y follaje denso que ocupan los claros y bordes del bosque.",
    maulinoExamples: ["Arándanos", "Frambuesas", "Moras sin espinas", "Maqui", "Murta nativa", "Grosellas"],
    ecologicalFunction: "Producción de frutos antioxidantes, forraje para aves de corral y barreras físicas contra viento bajo."
  },
  {
    layer: 4,
    name: "Estrato 4: Estrato Herbáceo (Herbaceous Layer)",
    height: "0.2 a 1.5 metros",
    role: "Hierbas perennes y anuales que acumulan minerales dinámicos, atraen insectos benéficos y repelen plagas.",
    maulinoExamples: ["Consuelda rusa (Symphytum)", "Lavanda", "Romero", "Menta", "Caléndula", "Borraja"],
    ecologicalFunction: "Bombeo de potasio y calcio con raíces pivotantes, medicina natural y forraje de corte continuo para mulch."
  },
  {
    layer: 5,
    name: "Estrato 5: Rizosfera y Raíces (Rhizosphere)",
    height: "Bajo tierra (0 a -1 metro)",
    role: "Tubérculos, raíces engrosadas y bulbos que crecen bajo la superficie sin competir por la luz solar.",
    maulinoExamples: ["Papas nativas chilotas", "Topinambur (alcachofa de Jerusalén)", "Ajos chilotes", "Cebollines", "Zanahorias"],
    ecologicalFunction: "Aireación biológica del suelo al cosechar y almacenamiento de almidones resistentes a sequías."
  },
  {
    layer: 6,
    name: "Estrato 6: Cobertura de Suelo y Rastreras (Soil Cover)",
    height: "0 a 15 centímetros",
    role: "Alfombra viva que cubre el 100% de la tierra desnuda para evitar la evaporación de agua y la erosión por impacto de lluvia.",
    maulinoExamples: ["Frutilla silvestre chilena (Fragaria chiloensis)", "Trébol blanco rastrero", "Tomillo rastrero", "Capuchina"],
    ecologicalFunction: "Fijación biológica de nitrógeno, retención de humedad sin gastar mulch seco y control total de malezas invasoras."
  },
  {
    layer: 7,
    name: "Estrato 7: Trepadoras y Enredaderas (Vertical Layer)",
    height: "Ascienden por troncos y pérgolas",
    role: "Especies verticales que trepan por los troncos del dosel aprovechando el espacio aéreo sin requerir terreno extra.",
    maulinoExamples: ["Vid vinífera patrimonial (País/Cariñena)", "Kiwi", "Maracuyá resistente al frío", "Porotos trepadores"],
    ecologicalFunction: "Aprovechamiento tridimensional del espacio y sombra estacional (caída de hojas en invierno para dejar pasar el sol)."
  }
];

// ==========================================
// 7. ESTADO DE LA INFRAESTRUCTURA ACTUAL (2026)
// ==========================================
export const AGROTECH_CURRENT_INFRASTRUCTURE = {
  version: "2.0.0-holistic",
  pilotFarm: {
    name: "Fundo Meniel (Estero Colliguay)",
    region: "Parral, Maule Sur, Chile",
    totalHectares: 12.8,
    designer: "Julio Pérez & AgroTech Core Team",
    soilHealthScore: 89
  },
  orchestratorPorts: [
    { port: 7770, id: "hq", name: "AgroTech HQ", role: "Cockpit Fundador & Vault API (26 notas Obsidian)" },
    { port: 7771, id: "web", name: "AgroTech Web Portal", role: "Portal Comercial, Hub & Cockpit React" },
    { port: 7772, id: "rewild", name: "Rewild Suite PWA", role: "Auditoría de Terreno Offline & Protocolo IPCC" },
    { port: 7773, id: "predio", name: "AgriTwin Predio 3D", role: "Gemelo Digital Three.js a escala brote a brote" },
    { port: 7774, id: "cuenca", name: "AgriTwin Cuenca GIS", role: "Cartografía Territorial Regional (122.000 ha)" },
    { port: 7777, id: "hub", name: "AgriTwin Hub Master", role: "Single-Pane-of-Glass Unificado con 6 salas operativas" }
  ],
  hubModules: [
    {
      id: "galpon",
      name: "El Galpón Predial (3D)",
      hash: "#predio",
      port: 7773,
      tier: "premium",
      summary: "Motor Three.js desacoplado, insolación horaria y telemetría microclimática brote a brote.",
      permacultureZone: "Zona 0 & 1"
    },
    {
      id: "invernadero",
      name: "Invernadero & Cultivos",
      hash: "#invernadero",
      port: 7777,
      tier: "free",
      summary: "Domo biofábrica, producción de Bokashi maduro (1.5 kg/árbol), consorcios con trébol y agrovoltaico 120 kWp.",
      permacultureZone: "Zona 1 & 2"
    },
    {
      id: "establo",
      name: "Establo & Ganadería PRV",
      hash: "#establo",
      port: 7777,
      tier: "free",
      summary: "Pastoreo Racional Voisin en 8 potreros (P1 a P8), aforo de forraje kgMs/ha y flota Egg Mobile sanitizadora.",
      permacultureZone: "Zona 2 & 3"
    },
    {
      id: "incursion",
      name: "Incursión a Campo (Rewilding)",
      hash: "#incursion",
      port: 7772,
      tier: "free",
      summary: "Corredor ribereño nativo en Estero Colliguay (peumo, quillay, boldo, maitén, sauce chileno) y conservación perpetua.",
      permacultureZone: "Zona 5"
    },
    {
      id: "cerro",
      name: "La Cumbre del Cerro (Cuenca)",
      hash: "#cerro",
      port: 7774,
      tier: "premium",
      summary: "Mirador de cuenca regional a escala macro (122.000 ha), riesgo de incendios FWI e hidrología de cuenca TWI.",
      permacultureZone: "Zona 4 & Macro"
    },
    {
      id: "mesa",
      name: "La Mesa Vecinal DAO",
      hash: "#mesa",
      port: 7777,
      tier: "free",
      summary: "Gobernanza comunitaria, asambleas campesinas, pactos de agua con APRs y cooperativa de trabajo.",
      permacultureZone: "Infraestructura Social"
    }
  ],
  paddocksPRV: [
    { id: "P1", name: "Potrero 1 - Trébol Blanco & Festuca", restDays: 44, forrajeCm: 24, kgMsHa: 2850, status: "ready" },
    { id: "P2", name: "Potrero 2 - Alfalfa & Raygrass Perenne", restDays: 41, forrajeCm: 22, kgMsHa: 2600, status: "ready" },
    { id: "P3", name: "Potrero 3 - Pastura Sur-Oeste (Bovinos)", restDays: 1, forrajeCm: 25, kgMsHa: 3100, status: "active" },
    { id: "P4", name: "Potrero 4 - Silvopastoreo Borde Cerezos", restDays: 32, forrajeCm: 18, kgMsHa: 1950, status: "resting" },
    { id: "P5", name: "Potrero 5 - Trébol Subterráneo & Dáctilo (Ovinos)", restDays: 24, forrajeCm: 16, kgMsHa: 1750, status: "resting" },
    { id: "P6", name: "Potrero 6 - Pradera Regenerativa Este", restDays: 16, forrajeCm: 12, kgMsHa: 1250, status: "resting" },
    { id: "P7", name: "Potrero 7 - Franja de Infiltración Sur (Aliviadero)", restDays: 8, forrajeCm: 10, kgMsHa: 950, status: "resting" },
    { id: "P8", name: "Potrero 8 - Cuadro Nor-Este (Egg Mobile)", restDays: 4, forrajeCm: 8, kgMsHa: 750, status: "coop" }
  ],
  livestock: [
    {
      id: "COW-01",
      name: "Clarita",
      species: "Bovino Overo Colorado (540 kg)",
      role: "Matriarca Lechera & Guía de Pastoreo",
      location: "Potrero P3 (Rotación hacia P4 en 24h)",
      rfid: "SAG-CL-78192-01",
      bcs: "3.75/5 (Óptima)"
    },
    {
      id: "COW-02",
      name: "Paloma",
      species: "Bovino Clavel Alemán (490 kg)",
      role: "Nodriza & Cría Regenerativa",
      location: "Potrero P3 (Rotación hacia P4)",
      rfid: "SAG-CL-78192-02",
      bcs: "3.5/5"
    },
    {
      id: "SHEEP-01",
      name: "Lana",
      species: "Ovino Suffolk Down (68 kg)",
      role: "Pastoreo fino sin dañar corteza de frutales",
      location: "Potrero P5",
      rfid: "SAG-OV-44101-01",
      bcs: "3.5/5"
    },
    {
      id: "HORSE-01",
      name: "Relincho",
      species: "Caballo Chileno Corralero (420 kg)",
      role: "Patrullaje rural y tiro liviano",
      location: "Potrero P4 (Silvopastoreo)",
      rfid: "SAG-EQ-10022-01",
      bcs: "4.0/5"
    },
    {
      id: "COOP-01",
      name: "Flota Egg Mobile (45 Gallinas)",
      species: "Gallina Ponedora Sussex & Araucana",
      role: "Sanitización de bostas, desparasitación en 24h & 40 huevos/día",
      location: "Potrero P8 (Sigue a las vacas con 3 días de desfase)",
      rfid: "SAG-AV-9901-LOTE",
      bcs: "Plumaje denso y postura activa"
    }
  ],
  infrastructureAssets: [
    {
      id: "CROP-AGRI-01",
      name: "Parque Agrovoltaico Elevado 120 kWp",
      category: "Energía Limpia & Sombra Agrícola",
      specs: "Seguidor solar a 3.5m de despeje. Permite pastoreo de ganado y protección contra insolación extrema."
    },
    {
      id: "CROP-TRANQUE-01",
      name: "Embalse Australiano 18.000 m³ con Geomembrana HDPE",
      category: "Infraestructura Hídrica Keyline",
      specs: "Almacenamiento en cota alta para riego por gravedad. Vertedero estabilizado hacia la franja de infiltración P7."
    },
    {
      id: "CROP-BIO-01",
      name: "Domo Biofábrica & Biopreparados",
      category: "Microbiología y Fertilidad Regenerativa",
      specs: "Invernadero bioclimático de 4.2m para producción de Bokashi maduro, caldo sulfocálcico y biofertilizantes."
    },
    {
      id: "CROP-PIN-01",
      name: "Cortina Cortafuego Silvopastoril con Pino Insigne Manejado",
      category: "Defensa contra Incendios & Madera",
      specs: "Pino insigne con poda de ramas bajas hasta 6m y sotobosque pastoreado para eliminar combustible fino."
    }
  ]
};
