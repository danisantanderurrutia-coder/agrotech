import { 
  ProductLine, PitchSlide, MerchItem, SocialTemplate, TeamMember, GtmPhase, 
  ChefKit, BookItem, BlogPost, Course, CommunityPost, MembershipTier, EdulabGameProduct 
} from '../types';

export interface BomItem {
  category: string;
  component: string;
  spec: string;
  priceClp: string;
  supplier: string;
}

export const CHEF_KITS: ChefKit[] = [
  {
    id: 'kit-cultivo-protegido',
    title: 'Kit Base: Cultivo Protegido & Riego',
    useCase: 'Automatización de riego e invernaderos familiares o hidropónicos',
    sensors: ['Sensor capacitivo V1.2 anticorrosión', 'Sonda ambiental SHT31 (Temp/Hum)', 'ESP32 Dual Core'],
    actuators: ['Relé octoacoplado 2 canales', 'Electroválvula 12V 3/4"'],
    deliverables: ['Curva de secado de suelo en la web', 'Sugerencias diarias de riego por WhatsApp'],
    hwPriceClp: '$35.000 - $45.000 CLP',
    subPriceClp: '$9.900 CLP / mes',
    whatsappPreview: '🌱 *Sugerencia Riego Maule*: Humedad de suelo al 28% VWC. Apertura recomendada: Válvula 1 por 25 minutos a las 20:00 hrs.',
    badge: 'Popular',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kit-anti-heladas',
    title: 'Kit Alerta Temprana Anti-Heladas',
    useCase: 'Protección de frutales de alto valor (cerezos, arándanos, viñedos)',
    sensors: ['Sonda DS18B20 IP67 (±0.5°C)', 'Barómetro BMP280 (Presión hPa)', 'Punto de rocío Dew-point'],
    actuators: ['Buzzer local 12V 110dB', 'Relé para activación de asperjadores / molinos'],
    deliverables: ['Llamada de voz automática', 'Alerta urgente por WhatsApp previo a caídas < 0°C'],
    hwPriceClp: '$40.000 - $55.000 CLP',
    subPriceClp: '$12.900 CLP / mes',
    whatsappPreview: '🚨 *ALERTA HELADA MAULE*: Temperatura predial en 0.5°C descendiendo a -1.8°C a las 05:00 AM. Asperjadores activados.',
    badge: 'Crítico Frutícola',
    imageUrl: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kit-fungi-cultivo',
    title: 'Kit Automatizado de Cultivo de Hongos & Micelio',
    useCase: 'Control de microclima húmedo de alta precisión para cultivo de Gárgolas, Shiitake y Melena de León',
    sensors: ['Sonda digital SHT31 (0-100% HR)', 'Sensor CO2 NDIR MH-Z19B', 'Sensor de nivel de agua capacitivo'],
    actuators: ['Nebulizador ultrasonido 24V (Niebla fina)', 'Extractor ventilador con filtro HEPA'],
    deliverables: ['Monitoreo continuo de humedad saturada (85-95%)', 'Recetas de fructificación y automatización de intercambios de aire'],
    hwPriceClp: '$42.000 - $58.000 CLP',
    subPriceClp: '$11.900 CLP / mes',
    whatsappPreview: '🍄 *Fungi Monitor Maule*: Humedad en 92% HR y CO2 en 750 ppm. Ciclo de fructificación óptimo. Próxima cosecha recomendada en 48 hrs.',
    badge: 'Nuevo • Micología',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kit-bio-vision',
    title: 'Kit Bio-Visión & Salud Vegetal (Cámara + Satélite)',
    useCase: 'Detección de plagas, clorosis por deficiencia nutricional e índice NDVI',
    sensors: ['Módulo ESP32-CAM con lente IP65', 'Integración satelital Sentinel-2 L2A'],
    actuators: ['Iluminación LED infrarroja/blanca nocturna', 'Cámara OV2640 RGB'],
    deliverables: ['Mapa NDVI satelital georeferenciado', 'Diagnóstico semanal por IA con recetas de bioinsumos'],
    hwPriceClp: '$50.000 CLP',
    subPriceClp: '$15.900 CLP / mes',
    whatsappPreview: '🔍 *Diagnóstico IA Bio-Visión*: Foto analizada. Patrón de clorosis interlineal detectado (Deficiencia de Hierro/Nitrógeno). Aplicar bio-estimulante.',
    badge: 'IA Integrada',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kit-bio-ahuyentador',
    title: 'Kit Bio-Ahuyentador de Fauna Invasora',
    useCase: 'Disuasión de conejos, roedores y perros en huertos jóvenes',
    sensors: ['Radar de microondas RCWL-0516', 'Sensor PIR HC-SR501 Infrarrojo'],
    actuators: ['Transductor piezoeléctrico ultrasonido (20-65kHz)', 'Luces LED estroboscópicas'],
    deliverables: ['Reporte nocturno de intromisión', 'Mapa de calor de presencia animal'],
    hwPriceClp: '$35.000 CLP',
    subPriceClp: '$7.900 CLP / mes',
    whatsappPreview: '🐇 *Reporte Fauna Nocturna*: 4 eventos de intromisión disuadidos por ultrasonido entre 02:00 y 04:30 AM en Cuartel Norte.',
    badge: 'Ecológico',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'
  }
];

export const BOM_MATRIX: BomItem[] = [
  { category: 'Procesamiento', component: 'Microcontrolador IoT', spec: 'ESP32-WROOM-32 (Wi-Fi/Bluetooth/LoRa)', priceClp: '$4.500 - $6.500', supplier: 'MCI Electronics / Import' },
  { category: 'Visión', component: 'Módulo de Cámara', spec: 'ESP32-CAM + OV2640 IP65 Lens', priceClp: '$7.000 - $9.500', supplier: 'Prometec / AliExpress' },
  { category: 'Conectividad', component: 'Módulo Celular 4G', spec: 'SIM800L GSM / A7670C 4G LTE M2M', priceClp: '$6.000 - $12.000', supplier: 'MCI Electronics / RobotShop' },
  { category: 'Sensórica Suelo', component: 'Humedad Capacitiva', spec: 'Sensor V1.2 Análogo Anti-Corrosión', priceClp: '$1.500 - $2.500', supplier: 'Casa Electrónica Chile' },
  { category: 'Sensórica Suelo', component: 'Sonda NPK / EC Industrial', spec: 'Sensor RS485 Modbus 7 en 1', priceClp: '$35.000 - $55.000', supplier: 'Importación Directa China' },
  { category: 'Sensórica Clima', component: 'Temperatura Digital', spec: 'Sonda DS18B20 Sumergible IP67', priceClp: '$2.500 - $4.000', supplier: 'Electroventas Chile' },
  { category: 'Sensórica Clima', component: 'Temp/Hum/Presión', spec: 'Sensor BME280 / SHT31 (Precisión hPa)', priceClp: '$4.000 - $7.000', supplier: 'MCI Electronics Chile' },
  { category: 'Sensórica Hoja', component: 'Mojadura Foliar', spec: 'Sensor de Resistencia de Gotas (Botrytis)', priceClp: '$2.000 - $3.500', supplier: 'Prometec / AliExpress' },
  { category: 'Sensórica Fauna', component: 'Radar & Infrarrojo', spec: 'PIR HC-SR501 / RCWL-0516 Microondas', priceClp: '$1.500 - $3.000', supplier: 'Casa de la Electrónica' },
  { category: 'Actuador', component: 'Módulo Relé', spec: 'Relé Octoacoplado 5V 1-4 Canales', priceClp: '$2.000 - $4.500', supplier: 'Electroventas Chile' },
  { category: 'Actuador', component: 'Válvula de Agua', spec: 'Electroválvula 12V DC (3/4")', priceClp: '$6.500 - $11.000', supplier: 'MercadoLibre / Import' },
  { category: 'Actuador', component: 'Ultrasonido Fauna', spec: 'Transductor Piezoeléctrico 20-65kHz', priceClp: '$1.500 - $3.000', supplier: 'AliExpress / Local' },
  { category: 'Actuador', component: 'Bomba Nutrientes', spec: 'Mini Bomba Peristáltica 12V DC Bioinsumos', priceClp: '$8.000 - $12.000', supplier: 'Amazon Chile / Import' },
  { category: 'Alimentación', component: 'Autonomía Solar', spec: 'Panel Solar 6V 3W + Cargador TP4056', priceClp: '$6.000 - $9.000', supplier: 'MCI Electronics' },
  { category: 'Alimentación', component: 'Baterías Li-ion', spec: 'Celda 18650 3.7V (2600mAh) x2', priceClp: '$5.000 - $8.000', supplier: 'ChileBaterias' },
  { category: 'Gabinete', component: 'Carcasa IP65', spec: 'Gabinete Estanco IP65 + PETG 3D Print', priceClp: '$3.500 - $6.000', supplier: 'Prototipado Local Maule' },
];

export const PRODUCT_PORTFOLIO: ProductLine[] = [
  {
    id: 'climate-reports',
    number: 1,
    title: 'Informes de Riesgo Climático Predial',
    tagline: 'Diagnóstico satelital e hídrico pre-compra para parcelas y fundos en el Maule',
    category: 'Risk Analysis',
    businessModel: 'Venta por informe (B2B / B2C)',
    priceRange: '€80 - €200 por reporte',
    targetAudience: ['Compradores de parcelas', 'Corredores de propiedades rurales', 'Agricultores pequeños y medianos'],
    description: 'Reporte técnico en PDF de alta resolución que evalúa la factibilidad climática e hídrica de cualquier terreno en el Maule antes de realizar la inversión.',
    keyFeatures: [
      'Disponibilidad de agua subterránea a 10 años (modelos geofísicos open-data)',
      'Histórico de heladas y eventos térmicos extremos (últimos 15 años)',
      'Simulación de riesgo de inundación y comportamiento térmico del suelo',
      'Integración de Sentinel-2, Landsat 8/9 y modelos meteorológicos abiertos'
    ],
    specs: {
      'Formato': 'PDF técnico interactivo 15-20 páginas',
      'Tiempo de Entrega': '24 a 48 horas automáticas',
      'Resolución Espacial': '10m px satelital + datos locales',
      'Fuentes': 'ESA Sentinel, NASA SRTM, DGA Chile, Agromet'
    },
    impactMetric: 'Reduce el riesgo de inversión inmobiliaria rural en un 85%',
    iconName: 'FileText',
    highlightColor: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'kiot-hardware',
    number: 2,
    title: 'KioT Anti-Heladas & Riego',
    tagline: 'Nodo de control plug-and-play IP65 con sensores de campo y transmisión LoRa/WiFi',
    category: 'Hardware IoT',
    businessModel: 'Venta de Hardware + Suscripción Cloud opcional',
    priceRange: '$180.000 - $320.000 CLP por kit completo',
    targetAudience: ['Fruticultores (arándanos, manzanos, cerezos)', 'Vitivinicultores del Valle del Maule'],
    description: 'Kit de hardware robusto fabricado localmente en Maule para monitoreo crítico de heladas y estrés hídrico a nivel de microclima de árbol/parra.',
    keyFeatures: [
      'Gabinete estanco IP65 resistente a radiación UV y lluvias maulinas',
      'Sensor de temperatura DS18B20 de alta precisión (±0.5°C) para alerta rápida de congelamiento',
      'Sensor capacitivo de humedad de suelo anticorrosivo',
      'Microcontrolador ESP32 con antena externa WiFi / LoRaWAN para cobertura en zonas ciegas'
    ],
    specs: {
      'Microcontrolador': 'ESP32 Dual Core 240MHz',
      'Conectividad': 'LoRaWAN 915MHz / WiFi 2.4GHz',
      'Autonomía': 'Batería LiFePO4 + Panel Solar integrado',
      'Rango Térmico': '-20°C a +70°C (Precisión ±0.5°C)'
    },
    impactMetric: 'Previene hasta un 90% la pérdida de brotes por heladas tempranas',
    iconName: 'Cpu',
    highlightColor: 'from-emerald-500 to-green-400'
  },
  {
    id: 'automation-ecosystem',
    number: 3,
    title: 'Ecosistema de Automatización & Biotecnología',
    tagline: 'Control inteligente centralizado: hardware local + satélite + IA predial',
    category: 'Automation & AI',
    businessModel: 'Suscripción SaaS + Consultoría e Instalación',
    priceRange: 'Desde $45.000 CLP / mes por predio',
    targetAudience: ['Agrónomos administradores', 'Exportadoras agrícolas interprediales'],
    description: 'El pilar tecnológico más avanzado. Conecta la automatización física de riego y electroválvulas con predicciones de IA basadas en imágenes satelitales.',
    keyFeatures: [
      'Automatización autónoma de válvulas de riego según evaporación satelital',
      'Alertas preventivas por IA en WhatsApp/Telegram sobre heladas imminentes',
      'Visualizador 3D de capas de humedad y gradiente de biomasa predial',
      'Asistente de IA Agronómica AgroTech Chile entrenado en microbiología de suelos del Maule'
    ],
    specs: {
      'Latencia de Alerta': '< 15 segundos vía Push/SMS',
      'Protocolos': 'Modbus, MQTT, HTTP REST, LoRaWAN',
      'IA Engine': 'Modelos de clima predial AgroTech Chile',
      'Integración': 'Sistemas de riego Netafim/Hunter/RainBird'
    },
    impactMetric: 'Ahorro del 35% en consumo hídrico y 40% en electricidad de bombas',
    iconName: 'Activity',
    highlightColor: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'green-passport',
    number: 4,
    title: 'Pasaporte Verde de Exportación',
    tagline: 'Certificación ecológica digital con captura de carbono para el mercado europeo',
    category: 'Export ESG',
    businessModel: 'Fee por certificación B2B + Renovación anual',
    priceRange: '€500 - €2.000 por fundo exportador',
    targetAudience: ['Exportadoras de vino, manzanas y berries del Maule', 'Compradores ESG de la Unión Europea'],
    description: 'Sello ecológico auditable que mide la salud ambiental del predio (captura de carbono en suelos y bosques nativos) para posicionar la fruta en Europa a precios premium.',
    keyFeatures: [
      'Cálculo satelital de biomasa y secuestro anual de CO2e (Sentinel 2/Landsat)',
      'Verificación de biodiversidad en bordes de arroyos y parches nativos',
      'Pasaporte Digital QR dinámico impreso en pallets de exportación',
      'Auditoría compatible con normativas de sostenibilidad UE (CSRD & EUDR)'
    ],
    specs: {
      'Estándar': 'Basado en IPCC Tier 2 / GHG Protocol',
      'Verificación': 'Auditoría satelital mensual',
      'Salida': 'Dashboard público con verificación Blockchain/QR',
      'Idiomas': 'Español, Inglés, Alemán'
    },
    impactMetric: 'Permite sobreprecio del 12-18% en envíos a supermercados europeos',
    iconName: 'Globe',
    highlightColor: 'from-amber-500 to-yellow-400'
  },
  {
    id: 'biotoken-rewild',
    number: 5,
    title: 'BioToken Rewild & RewildMapper',
    tagline: 'Certificación de biodiversidad vegetal nativa y mercado de activos ecológicos',
    category: 'BioTech & Token',
    businessModel: 'Fee de emisión de tokens + Suscripción SaaS RewildMapper + Marketplace',
    priceRange: 'SaaS RewildMapper: $65.000 CLP/mes + % sobre tokens transados',
    targetAudience: ['Propietarios de bosques nativos maulinos', 'Empresas con compromisos ESG en Chile y Europa'],
    description: 'Análogo ecológico de los mercados de carbono enfocado en la restauración vegetal nativa activa (boldo, peumo, roble). Certifica unidades de biodiversidad recuperada.',
    keyFeatures: [
      'Software SaaS RewildMapper: Diagnóstico satelital con IA para planes de restauración',
      'Generación de Certificados de Biodiversidad Vegetal (PBC - Plant Biodiversity Certificates)',
      'Monitoreo satelital continuo de cobertura nativa y tasa de regeneración',
      'Marketplace B2B para conectar conservacionistas locales con financiamiento corporativo ESG'
    ],
    specs: {
      'Plataforma SaaS': 'RewildMapper Cloud GIS Engine',
      'Métrica Base': 'Índice de Diversidad Vegetal Nativa (IDVN)',
      'Monitoreo Satelital': 'Pases cada 5 días (Sentinel-2 Spectral)',
      'Certificación': 'Auditable por terceros y comunidades'
    },
    impactMetric: 'Ha impulsado la restauración de +450 hectáreas de bosque nativo maulino',
    iconName: 'Leaf',
    highlightColor: 'from-green-500 to-emerald-400'
  },
  {
    id: 'seminars-courses',
    number: 6,
    title: 'Seminarios & Cursos Urrutia Edulab',
    tagline: 'Programa educativo presencial y online para agricultores y juego "Raíces y Chips"',
    category: 'Education',
    businessModel: 'Venta de entradas + Suscripciones online + Venta de juego de cartas',
    priceRange: '$25.000 - $120.000 CLP por alumno',
    targetAudience: ['Agricultores locales', 'Estudiantes de agronomía', 'Comunidades escolares maulinas'],
    description: 'División educativa Urrutia Edulab. Convierte el conocimiento mecatrónico y ecológico en talleres de campo, webinars y el juego educativo de cartas "Raíces y Chips".',
    keyFeatures: [
      'Juego de cartas educativo infantil "Raíces y Chips" sobre ecosistemas y heladas',
      'Talleres presenciales "Manos en la Tierra" en el Maule (sensores, biotecnología y compostaje)',
      'Cursos online de precisión agrícola y manejo de microclimas con Google Earth Engine',
      'Comunidad agrícola de precisión con apoyo técnico continuo'
    ],
    specs: {
      'Modalidades': 'Presencial en campo (Maule) + Streaming HD',
      'Edulab Product': 'Juego de Cartas "Raíces y Chips" ($15.000 CLP)',
      'Certificación': 'Diploma de Capacitación Técnica AgroTech Chile',
      'Frecuencia': '2 talleres presenciales al mes + webinars'
    },
    impactMetric: '+320 agricultores y 15 colegios maulinos capacitados',
    iconName: 'GraduationCap',
    highlightColor: 'from-purple-500 to-indigo-400'
  },
  {
    id: 'agricultural-manuals',
    number: 7,
    title: 'Manuales & Libros Agrícolas Prácticos',
    tagline: 'Guías de campo ilustradas con IA: pasos claros, cero jerga, 100% aplicables',
    category: 'Publishing',
    businessModel: 'Venta digital (Ebook/PDF) + Impresión bajo demanda (POD)',
    priceRange: '$12.000 - $28.000 CLP por libro',
    targetAudience: ['Parceleros de fin de semana', 'Pequeños productores', 'Aficionados a la permacultura'],
    description: 'Manuales prácticos diseñados para el agricultor que aprende haciendo. Diagramas visuales con IA, pasos directos y consejos probados en el suelo maulino.',
    keyFeatures: [
      'Línea editorial de precisión agrícola: infografías claras y explicaciones sin rodeos',
      'Capítulos sobre control de heladas casero, sensores caseros y abonos nativos',
      'Ilustraciones técnicas generadas por IA y esquemas de circuito paso a paso',
      'Distribución digital inmediata en PDF/ePub e impresa en papel kraft ecológico'
    ],
    specs: {
      'Páginas': '120 - 180 páginas a color',
      'Formato': 'Digital PDF/ePub + Físico Rustico Tapa Blanda',
      'Idioma': 'Español (Chile/Latam)',
      'Licencia': 'Open-knowledge agro-geek'
    },
    impactMetric: '+1.200 copias digitales y físicas distribuidas en el centro de Chile',
    iconName: 'BookOpen',
    highlightColor: 'from-amber-600 to-orange-400'
  }
];

export const PROJECT_PITCH_SLIDES: PitchSlide[] = [
  {
    id: 1,
    title: 'AgroTech Chile',
    subtitle: 'Donde la Raíz Chilena Encuentra la Alta Tecnología',
    category: 'Portada & Visión',
    image: './img-agri-hub-farm.jpg',
    badge: 'ECOSISTEMA MAULE 2026',
    content: {
      headline: 'Revolucionando el Ecosistema Agrícola y de Restauración en la Región del Maule',
      points: [
        'Ecosistema AgroTech Chile: Hardware IoT de fabricación local + Satélite Abierto + Inteligencia Ecológica.',
        'Fundados en Talca (Maule, Chile) con sinergia científica directa desde Alemania.',
        'Meta 2030: Convertir al Maule en el polo líder de agricultura de precisión y biodiversidad en Sudamérica.'
      ],
      metrics: [
        { label: 'Ubicación Base', value: 'Región del Maule', detail: 'Valle Central de Chile' },
        { label: 'Capa Tecnológica', value: '1 Plataforma', detail: '4 Capas de Solución' },
        { label: 'Líneas de Ingreso', value: '7 Productos', detail: 'Ingresos desde el Mes 1' }
      ]
    },
    speakerNotes: 'Bienvenidos a la presentación de AgroTech Chile. Unimos las raíces rurales maulinas con la máxima tecnología de frontera.'
  },
  {
    id: 2,
    title: 'El Problema en el Campo Maulino',
    subtitle: 'Heladas devastadoras, escasez hídrica y presión verde europea',
    category: 'Problema & Oportunidad',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    badge: 'CRISIS TRIPLEMENTE CRÍTICA',
    content: {
      headline: 'Los agricultores y exportadores del Maule enfrentan 3 crisis simultáneas:',
      points: [
        '1. Heladas impredecibles de primavera que destruyen hasta el 70% de brotes en arándanos, cerezos y viñedos.',
        '2. Incertidumbre hídrica y falta de datos subterráneos antes de comprar tierras o planificar riego.',
        '3. Exigencias europeas de trazabilidad ecológica (ESG / EUDR): las exportadoras necesitan demostrar captura de carbono o pierden mercado.'
      ],
      metrics: [
        { label: 'Pérdidas por Heladas', value: 'US$ 120M/año', detail: 'Impacto estimado en zona central' },
        { label: 'Déficit Hídrico', value: '10+ Años', detail: 'Mega-sequía histórica en el Maule' },
        { label: 'Barrera EU ESG', value: '2026+', detail: 'Nuevas regulaciones de la UE' }
      ],
      highlightBox: {
        title: 'El dolor del agricultor local',
        text: 'La tecnología corporativa existente es costosa, compleja de usar y no entiende la realidad del campo maulino.'
      }
    },
    speakerNotes: 'El Maule es el corazón frutícola y vitivinícola de Chile, pero sigue operando con herramientas del siglo pasado.'
  },
  {
    id: 3,
    title: 'La Solución: Ecosistema Agro-Precisión Maule',
    subtitle: 'Una sola plataforma integral organizada en 4 capas tecnológicas',
    category: 'Solución',
    image: './img-coastal-hud.jpg',
    badge: 'ARQUITECTURA INTEGRAL 4 CAPAS',
    content: {
      headline: 'Biotecnología, Sensores Edge y Satélite Abierto sin burocracia corporativa',
      points: [
        'Capa 1 (Datos Libres): Diagnóstico satelital y modelos geofísicos climáticos prediales.',
        'Capa 2 (Edge IoT): Hardware KioT IP65 autónomo con sensores de campo (DS18B20 y humedad).',
        'Capa 3 (IA Predial): Automatización inteligente de riego y alertas instantáneas por heladas.',
        'Capa 4 (Activos Verdes): Pasaporte Verde de Exportación y tokens BioToken Rewild.'
      ],
      metrics: [
        { label: 'Hardware', value: 'Plug & Play IP65', detail: 'ESP32 / LoRaWAN' },
        { label: 'Satélite', value: 'Sentinel + Landsat', detail: 'Monitoreo cada 5 días' },
        { label: 'Biotecnología', value: 'RewildMapper', detail: 'Certificación de Biodiversidad' }
      ]
    },
    speakerNotes: 'No vendemos cajas negras inaccesibles. Entregamos un ecosistema modular que acompaña al agricultor desde la pre-compra de la tierra hasta la exportación.'
  },
  {
    id: 4,
    title: 'Portafolio de 7 Productos',
    subtitle: 'Diversificación estratégica de ingresos recurrentes y puntuales',
    category: 'Productos',
    image: './rewildmapper-gis.png',
    badge: 'MONETIZACIÓN TRIPLE',
    content: {
      headline: '7 líneas de negocio diseñadas para traccionar desde el Día 1:',
      points: [
        '1. Informes Climáticos Prediales (B2C/B2B €80-200): Venta inmediata pre-compra de parcelas.',
        '2. Kit KioT Anti-Heladas & Riego ($180k-320k CLP): Hardware IoT de fabricación local.',
        '3. AgroTwin & Automatización SaaS: Control inteligente de válvulas y gemelo digital predial.',
        '4. Pasaporte Verde Exportación (€500-2000): Certificación ecológica para frutícolas y viñas.',
        '5. BioToken Rewild / RewildMapper (SaaS + Tokens): Mercado de biodiversidad nativa.',
        '6. Cursos & Seminarios Urrutia Edulab: Motor de adquisición y juego "Raíces y Chips".',
        '7. Libros & Manuales Prácticos Ilustrados: Venta digital e impresa sin jerga corporativa.'
      ]
    },
    speakerNotes: 'Cada producto alimenta al siguiente. Los informes y cursos construyen confianza inmediata para luego vender hardware y servicios de certificación.'
  },
  {
    id: 5,
    title: 'Tamaño de Mercado & Target',
    subtitle: 'Desde el agricultor maulino hasta las corporaciones compradoras en Europa',
    category: 'Mercado',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
    badge: 'MERCADO EXPANSIVO CHILE-UE',
    content: {
      headline: 'Un mercado direccionable que conecta la tierra chilena con el capital ESG global',
      points: [
        'SOM (Maule Regional): 18.000+ productores agrícolas y parceleros en búsqueda de datos e infiltración hídrica.',
        'SAM (Chile Agroexportador): 4.500 exportadoras de fruta y viñedos obligadas a certificar huella ecológica.',
        'TAM (Mercado ESG & Bio-Tokens): Mercado global de créditos de biodiversidad y carbon farming de US$ 40B+.'
      ],
      metrics: [
        { label: 'Predios Maule', value: '25.000+', detail: 'Terrenos agrícolas y forestales' },
        { label: 'Exportadoras Fruta', value: '600+', detail: 'En el Valle Central' },
        { label: 'Mercado ESG UE', value: '€18B', detail: 'Demanda de insumos certificados' }
      ]
    },
    speakerNotes: 'Comenzamos en la cuna agrícola de Chile (Maule) con expansión natural a las regiones de O\'Higgins, Ñuble y bio-créditos en Europa.'
  },
  {
    id: 6,
    title: 'Arquitectura Tecnológica & IoT',
    subtitle: 'Fabricación local en Maule + Modelos de frontera en Alemania',
    category: 'Tecnología',
    image: './kiot-hardware.png',
    badge: 'KioT EDGE HARDWARE IP65',
    content: {
      headline: 'Ingeniería de hardware robusta y geofísica abierta',
      points: [
        'Nodo Edge KioT: Microcontrolador ESP32 dual core, protocolo LoRaWAN 915MHz con alcance de 8km en valle.',
        'Sensores: Probe DS18B20 de acero inoxidable (precisión ±0.5°C) + Sensor capacitivo de suelo anticorrosión.',
        'Satelital & Clima: Integración directa con Sentinel Hub API, modelos meteorológicos GFS/ECMWF y geofísica DGA.',
        'IA Agroclimática: Modelos livianos de IA predial desplegados en la nube para detección temprana de eventos extremos.'
      ],
      metrics: [
        { label: 'Gabinete', value: 'IP65 UV Proof', detail: 'Impresión 3D + Sellado' },
        { label: 'Alcance LoRa', value: '8 - 12 km', detail: 'Línea de vista en campo' },
        { label: 'Frecuencia Datos', value: 'Cada 30 seg', detail: 'Telemetría en tiempo real' }
      ]
    },
    speakerNotes: 'Nuestra tecnología está hecha para resistir el polvo, el barro y el frío maulino, sin requerir internet de alta velocidad en el predio.'
  },
  {
    id: 7,
    title: 'Estrategia Go-To-Market (3 Fases)',
    subtitle: 'Plan acelerado de monetización de 5 meses',
    category: 'Estrategia',
    image: './img-forest-rewild.jpg',
    badge: 'HOJA DE RUTA ACELERADA',
    content: {
      headline: 'Monetización inmediata desde el Mes 1 sin depender de rondas masivas',
      points: [
        'Fase 1 (Mes 1) - Monetización Inmediata: Lanzamiento de Informes Climáticos Prediales + 5 predios piloto en RewildMapper (Beta gratis) + Educación masiva en TikTok/Instagram.',
        'Fase 2 (Meses 2-3) - Hardware & BioToken Beta: Reinversión de capital de Fase 1 para ensamblar Kits KioT + Lanzamiento oficial SaaS RewildMapper y primer piloto PBC.',
        'Fase 3 (Meses 4-5) - Validación Ecológica & Ventas ESG: Primer ciclo de monitoreo satelital de rewilding + Alianzas con exportadoras vitivinícolas y frutícolas en Maule.'
      ],
      metrics: [
        { label: 'Mes 1', value: 'Informes & TikTok', detail: 'Caja rápida B2C' },
        { label: 'Meses 2-3', value: 'KioT & RewildMapper', detail: 'Hardware + SaaS' },
        { label: 'Meses 4-5', value: 'Green Passport B2B', detail: 'Certificación ESG' }
      ]
    },
    speakerNotes: 'No necesitamos esperar 2 años para generar ventas. El modelo en 3 fases valida la tracción desde la primera semana.'
  },
  {
    id: 8,
    title: 'Equipo Fundador',
    subtitle: 'Sinergia perfecta: Ingeniería de Terreno en Maule + Ciencia Macro en Alemania',
    category: 'Equipo',
    image: './logo-peumo-quantum.jpg',
    badge: 'SINERGIA TALCA 🇨🇱 • FRIBURGO 🇩🇪',
    content: {
      headline: 'Conocimiento práctico del suelo chileno combinado con ciencia ambiental europea',
      points: [
        'Paulina Urrutia Maureira (Maule, Chile): Ingeniera en Automatización de Procesos. Lidera ensamblaje de hardware, impresión 3D, soporte en terreno y ventas locales.',
        'Daniel Santander Urrutia (Alemania): Geofísico, Permacultor y Experto en Ecología Forestal & Gases de Efecto Invernadero. Lidera procesamiento macro de datos, modelos climáticos y estrategia de contenidos.'
      ],
      metrics: [
        { label: 'Presencia Terreno', value: 'Talca & Maule', detail: 'Atención a minutos del campo' },
        { label: 'Modelos Clima', value: 'Alemania / UE', detail: 'Conexión con mercados ESG' },
        { label: 'Enfoque', value: 'Ingeniería Real', detail: 'Soluciones de precisión de alto impacto en terreno' }
      ]
    },
    speakerNotes: 'El equilibrio entre estar con las botas en el barro en el Maule y procesar modelos climáticos globales desde Alemania es nuestra mayor ventaja competitiva.'
  },
  {
    id: 9,
    title: 'Proyecciones Financieras & Unit Economics',
    subtitle: 'Crecimiento orgánico sustentable con márgenes de hardware y SaaS',
    category: 'Finanzas',
    image: './logo-terra-radar.jpg',
    badge: 'HIGH-MARGIN SAAS & HW',
    content: {
      headline: 'Modelo de negocio diversificado con alto margen operativo',
      points: [
        'Margen Informes Climáticos: 85% de margen bruto (costo computable satelital mínimo).',
        'Margen Kit KioT: 55% a 70% de margen en hardware ($60.000 CLP costo de componentes vs $200.000 CLP venta).',
        'Margen SaaS & Green Passport: 80% a 93% recurrente anual.',
        'Proyección Año 1: $140.000 EUR en ingresos totales / Proyección Año 3: $1.2M EUR con expansión regional.'
      ],
      metrics: [
        { label: 'Margen SaaS', value: '80% +', detail: 'RewildMapper & Pasaporte' },
        { label: 'Margen HW', value: '55% - 70%', detail: 'Kit KioT Anti-Heladas' },
        { label: 'Meta Año 1', value: '€ 140.000', detail: 'Bootstrapped + Capital Semilla' }
      ]
    },
    speakerNotes: 'La combinación de venta puntual de hardware y SaaS recurrente nos da estabilidad de caja en todas las temporadas agrícolas.'
  },
  {
    id: 10,
    title: 'La Propuesta & Visión 2030',
    subtitle: 'Sé parte de la innovación agrotecnológica en el Maule',
    category: 'Cierre & Ask',
    image: './logo-cyber-hexagon.jpg',
    badge: 'SEMILLA / ANGEL €75K',
    content: {
      headline: 'Buscamos socios estratégicos, fundos piloto y capital semilla',
      points: [
        'Requerimiento de Capital: €75.000 para escalar la fabricación de 200 kits KioT y acelerar el motor GIS RewildMapper.',
        'Uso de Fondos: 45% Fabricación & Componentes IoT / 35% Desarrollo SaaS & Satelital / 20% Marketing Educativo de Campo.',
        'Visión 2030: Convertir el Maule en el referente global de ecosistemas regenerativos respaldados por tecnología transparente.'
      ],
      metrics: [
        { label: 'Levantamiento', value: '€ 75.000', detail: 'Semilla / Angel' },
        { label: 'Meta Kits', value: '200 Unidades', detail: 'Despliegue Maule 2026' },
        { label: 'Contacto', value: 'contacto@urrutia.ag', detail: 'Región del Maule, Chile' }
      ],
      highlightBox: {
        title: 'Únete al movimiento Agro-Precisión',
        text: 'Transformemos juntos el campo chileno. Raíces maulinas, tecnología sin límites.'
      }
    },
    speakerNotes: 'Gracias por su atención. Estamos listos para responder sus preguntas y mostrarles una demostración en vivo de los sensores KioT.'
  }
];

export const MARKET_PITCH_SLIDES: PitchSlide[] = [
  {
    id: 1,
    title: 'AgroTech Chile & AgroTwin',
    subtitle: 'Donde la Raíz del Maule se Convierte en Inteligencia Agrícola Global',
    category: 'Portada & Tesis',
    image: './img-agri-hub-farm.jpg',
    badge: 'ECOSISTEMA MAULE 2026 • DIGITAL TWIN & ESG',
    content: {
      headline: 'Revolución Agroclimática: Gemelo Digital, Hardware Abierto de Terreno y Cumplimiento ESG',
      points: [
        'Ecosistema Integral: Plataforma Insigne AgroTwin (Digital Twin 3D) + Hardware IoT KioT + Pasaporte Verde de Exportación.',
        'Sinergia Operativa: Mecatrónica y ensamblaje local con "botas en el barro" en Talca (Chile) + Procesamiento satelital y nexo comercial en Friburgo/Berlín (Alemania).',
        'Tesis de Inversión: Resolver la vulnerabilidad climática del agricultor con hardware accesible mientras desbloqueamos el green premium de exportación en la Unión Europea.'
      ],
      metrics: [
        { label: 'Modelo de Solución', value: '1 Insigne + 2 Compl.', detail: 'AgroTwin + KioT + Pasaporte' },
        { label: 'Presencia Estratégica', value: 'Chile 🇨🇱 / Alemania 🇩🇪', detail: 'Campo Maule + Mercado UE' },
        { label: 'Tracción de Flujo', value: 'Día 1 / Mes 1', detail: 'Ventas inmediatas sin dilución' }
      ]
    },
    speakerNotes: 'Bienvenidos al Pitch Deck de Mercado de AgroTech Chile. Presentamos una solución triádica validada en el Maule con ingeniería de costos real y nexo directo al mercado de exportación europeo.'
  },
  {
    id: 2,
    title: 'El Problema Agrícola & Regulatorio Triple',
    subtitle: 'Heladas devastadoras, megasequía estructural y barreras normativas de la UE',
    category: 'Problema de Mercado',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    badge: 'TRIPLE AMENAZA PRODUCTIVA',
    content: {
      headline: 'Los agricultores y exportadores del Valle Central enfrentan 3 crisis simultáneas:',
      points: [
        '1. Heladas tardías por inversión térmica: Caídas imprevistas bajo 0°C en floración que destruyen hasta el 70% de brotes en cerezos, arándanos y viñedos (pérdidas de US.000 a US.000 por hectárea en una sola noche).',
        '2. Megasequía y desinformación hídrica: 14+ años de déficit hídrico en la cuenca del Maule; falta de datos dinámicos sobre curvas de secado del suelo y balance de acuíferos.',
        '3. Barreras ESG y Directivas de la UE (EUDR & CSRD): Exigencia ineludible de trazabilidad de no-deforestación y huella de carbono para ingresar al retail europeo; riesgo inminente de multas y bloqueo comercial.'
      ],
      metrics: [
        { label: 'Pérdidas Heladas', value: 'US$ 120M / año', detail: 'Zona central de Chile' },
        { label: 'Déficit Hídrico', value: '14+ Años', detail: 'Megasequía en el Maule' },
        { label: 'Normativa EUDR', value: 'Obligatoria UE', detail: 'Trazabilidad y cero deforestación' }
      ],
      highlightBox: {
        title: 'La falla de las soluciones actuales',
        text: 'La tecnología importada existente son "cajas negras" de US.000 inaccesibles, con repuestos lentos y sin conexión con los requerimientos de auditoría ambiental europea.'
      }
    },
    speakerNotes: 'El agricultor no puede seguir dependiendo de una estación meteorológica a 20 km de distancia ni de auditorías manuales en papel para cumplir con la Unión Europea.'
  },
  {
    id: 3,
    title: 'La Propuesta Triádica: 1 Insigne + 2 Complementarios',
    subtitle: 'Arquitectura modular que resuelve terreno, toma de decisiones y cumplimiento comercial',
    category: 'Propuesta de Valor',
    image: './img-coastal-hud.jpg',
    badge: 'PRODUCT-MARKET FIT INTEGRAL',
    content: {
      headline: 'Una cadena de valor integrada desde el sensor físico hasta el consumidor en Europa:',
      points: [
        'PRODUCTO INSIGNE • AgroTwin (Agricultural Digital Twin): Plataforma SaaS y Cloud GIS que replica en 3D el predio; integra telemetría microclimática con Sentinel-2 y genera recomendaciones predictivas de riego y heladas.',
        'COMPLEMENTARIO 1 • KioT Agro-Shield (Hardware IoT IP65): Nodos de campo autónomos con ESP32, LoRaWAN y sondas DS18B20/humedad; activación autónoma de aspersores y alertas urgentes a celular en <45 segundos.',
        'COMPLEMENTARIO 2 • Pasaporte Verde & RewildMapper (ESG Export): Certificación digital continua de no-deforestación, captura de carbono y biodiversidad nativa con código QR en pallets para obtener un sobreprecio del 12-18% en Europa.'
      ],
      metrics: [
        { label: 'AgroTwin Insigne', value: 'Gemelo Digital 3D', detail: 'Predicción y orquestación' },
        { label: 'KioT Hardware', value: 'Plug & Play IP65', detail: '1/3 del costo de importación' },
        { label: 'Pasaporte Verde', value: '+15% Green Premium', detail: 'Cumplimiento normativo UE' }
      ]
    },
    speakerNotes: 'No vendemos hardware o software por separado. KioT captura la verdad del suelo, AgroTwin orquesta la decisión agronómica y el Pasaporte Verde monetiza la sostenibilidad.'
  },
  {
    id: 4,
    title: 'Estudio de Competencias & Fosos Defensivos (Moats)',
    subtitle: 'Por qué nuestras ventajas locales y científicas superan a las multinacionales',
    category: 'Benchmarking & Moats',
    image: './rewildmapper-gis.png',
    badge: 'VENTAJA COMPETITIVA BLINDADA',
    content: {
      headline: 'Análisis comparativo frente a los actores dominantes de la industria:',
      points: [
        'vs. WiseConn / DropControl: Excelente en control hidráulico corporativo, pero con CAPEX elevado (USk-k), sistema cerrado y sin gemelo digital de bosque nativo ni certificación ESG.',
        'vs. Pessl Instruments (METOS): Marca histórica con estaciones de US.000-.000; repuestos importados que tardan semanas en llegar ante fallas críticas de campo.',
        'vs. Arable Labs: Hardware all-in-one de alto diseño pero con suscripciones de US.000/año sin sondas de profundidad de suelo y sin reparabilidad local.',
        'vs. Kilimo: Enfoque 100% satelital de bajo costo, pero ciego ante las heladas por inversión térmica microclimática que ocurren a ras de suelo.'
      ],
      metrics: [
        { label: 'Soberanía Técnica', value: 'Fabricado en Talca', detail: 'Soporte y recambio en < 2 hrs' },
        { label: 'Costo Marginal HW', value: '-65% vs Mercado', detail: 'PCB KiCad y PETG local' },
        { label: 'Eje Transcontinental', value: 'Chile 🇨🇱 + Alemania 🇩🇪', detail: 'Operación campo + Enlace ESG' }
      ],
      highlightBox: {
        title: 'Nuestros Fosos Defensivos (Moats)',
        text: 'Efecto de red microclimático por cuenca, derecho a reparar con repuestos estándar y doble presencia operativa terreno-Europa.'
      }
    },
    speakerNotes: 'Los competidores venden cajas negras cerradas o software satelital ciego. Nosotros fusionamos la cercanía física en el Maule con la ciencia de teledetección europea.'
  },
  {
    id: 5,
    title: 'Dimensionamiento de Mercado & Segmentación B2B',
    subtitle: 'Desde el corazón frutícola del Maule hacia el corredor exportador del Cono Sur y la UE',
    category: 'Mercado (TAM-SAM-SOM)',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
    badge: 'OPORTUNIDAD DE ESCALAMIENTO',
    content: {
      headline: 'Segmentación rigurosa de mercado basada en valor y riesgo agronómico:',
      points: [
        'TAM (Mercado Global AgTech & ClimaTech): US$ 22.000 Millones (crecimiento sostenido al 13,5% CAGR al 2030).',
        'SAM (Fruticultura & Viñas Exportadoras Cono Sur): US$ 350 Millones (380.000 hectáreas tecnificables de alto valor en Chile central).',
        'SOM (Años 1-3 • Maule, O\'Higgins y Ñuble): US$ 4,5 Millones anuales (1.200 fundos de cerezas, arándanos, avellanos europeos y viñedos patrimoniales).',
        'Buyer Personas Clave: 1) Fruticultor Exportador Mediano (compra seguridad anti-heladas); 2) Gerente de Sostenibilidad B2B (compra pasaporte EUDR); 3) Parcelero Neorrural (compra kits y reportes).'
      ],
      metrics: [
        { label: 'TAM Global', value: 'US$ 22.000 M', detail: 'AgTech & Smart Farming' },
        { label: 'SAM Chile/Cono Sur', value: 'US$ 350 M', detail: 'Fruticultura de exportación' },
        { label: 'SOM Años 1-3', value: 'US$ 4,5 M', detail: '1.200 fundos objetivo' }
      ]
    },
    speakerNotes: 'El mercado no es hipotético. Solo en el Maule y O\'Higgins se concentra la mayor densidad de cerezas de exportación del mundo, donde cada hectárea arriesga decenas de miles de dólares por helada.'
  },
  {
    id: 6,
    title: 'Estrategia Go-To-Market & Adquisición por Redes',
    subtitle: 'Funnel multicanal de bajo costo de adquisición (CAC) y alta conversión técnica',
    category: 'Estrategia de Adquisición',
    image: './kiot-hardware.png',
    badge: 'CAC EFICIENTE • FUNNEL MULTICANAL',
    content: {
      headline: 'Adquisición segmentada según perfil, formato de contenido y canal:',
      points: [
        'TikTok & Shorts (Viralidad Técnica): Videos de "teardown" mecatrónico, sensores congelándose a -5°C e impresión 3D de gabinetes IP65. Lead magnet: Guía Anti-Heladas en PDF (descargas masivas).',
        'Instagram (Educación de Terreno): Carruseles de imágenes satelitales Sentinel-2 comparativas ("Lo que no te dicen del agua de tu parcela"). Canal directo de venta de Informes Climáticos (€80-€200).',
        'LinkedIn B2B (Decisores Corporativos): Artículos técnicos sobre el impacto de la directiva europea EUDR y el diferencial de precio del 15% con el Pasaporte Verde para gerentes de exportación.',
        'Días de Campo (Field Days en el Maule): Demostraciones prácticas en fundos piloto; instalación en vivo con productores para cerrar ventas de hardware y suscripciones en el acto.'
      ],
      metrics: [
        { label: 'CAC Promedio', value: 'US$ 380', detail: 'Costo adquisición B2B' },
        { label: 'Lead Magnet', value: 'Guía Anti-Heladas', detail: 'Captura orgánica en TikTok/IG' },
        { label: 'Conversión Terreno', value: '> 35%', detail: 'En Días de Campo (Field Days)' }
      ]
    },
    speakerNotes: 'No gastamos presupuesto en publicidad genérica. Creamos contenido técnico que educa, demuestra la robustez del hardware y convierte orgánicamente en terreno.'
  },
  {
    id: 7,
    title: 'Tracción con Clientes & Validación Comercial',
    subtitle: 'Derribando la inercia agrícola: De pilotos "Zero-Risk" a contratos anuales de cuenca',
    category: 'Tracción & Validación',
    image: './img-agri-hub-farm.jpg',
    badge: 'TRACCIÓN DE TERRENO • VALIDACIÓN COMERCIAL 2026',
    content: {
      headline: 'Estrategia probada para generar tracción y adopción acelerada en el agro:',
      points: [
        '1. Pilotos "Zero-Risk" (Cuartel Centinela): Instalación de 1 nodo KioT en el cuartel más crítico (zona de helada o estrés hídrico) por 30 días sin costo inicial. Al demostrar un ahorro de agua del 25% o alertar con éxito una helada, el fundo convierte a compra de predio completo (>75% tasa de cierre).',
        '2. Estrategia Caballo de Troya (Diagnóstico Satelital): Entrega gratuita de un Informe de Vigor y Estrés Hídrico (Sentinel-2). Al visualizar la variabilidad oculta de su campo desde el espacio, el agricultor solicita sensórica en suelo para cerrar la brecha de decisión.',
        '3. Alianzas de Cuenca & Asociaciones de Canalistas: Convenios con Juntas de Vigilancia de Canales del Río Maule, Fedefruta y gremios viñateros. Permite acceder a grupos de 30-50 productores mediante 1 sola charla técnica con respaldo de sus pares.',
        '4. Canal Exportadoras (Tracción Top-Down): Validación directa con empresas exportadoras de cerezas y viñas que necesitan certificar cumplimiento EUDR y carbono. Las exportadoras financian o exigen la plataforma a sus productores asociados para blindar sus envíos a la UE.'
      ],
      metrics: [
        { label: 'Predios Piloto', value: '12 Fundos', detail: 'Valle del Maule y Cachapoal' },
        { label: 'Pipeline / LOIs', value: 'US$ 85.000', detail: 'Pre-acuerdos temporada 2026/27' },
        { label: 'Tasa Conversión', value: '> 75%', detail: 'De piloto centinela a contrato' }
      ],
      highlightBox: {
        title: 'La Regla de Oro en AgTech: "Ver para Creer"',
        text: 'El productor agrícola no cree en promesas de software; cree cuando ve en su WhatsApp o app una alerta nocturna de helada 40 minutos antes que su termómetro tradicional y salva brotes valorados en miles de dólares.'
      }
    },
    speakerNotes: 'La clave de la tracción en el agro es eliminar el riesgo percibido del agricultor. Con el Cuartel Centinela y las alianzas con canalistas y exportadoras, transformamos un ciclo de ventas largo en una adopción rápida y referida.'
  },
  {
    id: 8,
    title: 'Ingeniería de Costos (BOM) & Margen de Hardware KioT',
    subtitle: 'Bill of Materials optimizado para manufactura local con 70% de margen bruto',
    category: 'Estructura de Costos',
    image: './img-forest-rewild.jpg',
    badge: 'BOM AUDITADO • PRODUCCIÓN TALCA',
    content: {
      headline: 'Desglose unitario de costos de fabricación del nodo KioT Anti-Heladas & Riego IP65:',
      points: [
        'Procesamiento & RF: Microcontrolador ESP32-WROOM-32E (.200) + Módulo LoRa SX1262 915MHz y antena (.800).',
        'Sensórica Industrial: Sonda DS18B20 acero inox IP67 (.200) + Sonda humedad de suelo capacitiva v1.2 (.400) + Sensor microclima SHT31 (.900).',
        'Potencia & Control: Placa PCB KiCad industrial (.800) + Relé de potencia para electroválvula (.200).',
        'Autonomía & Estanqueidad: Caja estanca IP65 PETG UV (.500) + Batería LiFePO4 (.500) + Panel solar 6V (.500) + Mano de obra ensamble/testeo (.000).',
        'Costo Directo de Producción (COGS): .000 CLP (~€60). Precio de Venta (PVP): .000 CLP (~€200).'
      ],
      metrics: [
        { label: 'COGS Hardware', value: '.000 CLP', detail: 'Costo unitario fabricado' },
        { label: 'PVP de Venta', value: '.000 CLP', detail: 'Precio nodo industrial' },
        { label: 'Margen Bruto HW', value: '70%', detail: 'Saludable y defendible' }
      ]
    },
    speakerNotes: 'El desglose de componentes demuestra que podemos entregar hardware de nivel industrial a .000 CLP reteniendo un 70% de margen bruto, algo impensable para importadores de cajas cerradas.'
  },
  {
    id: 9,
    title: 'Unit Economics & Infraestructura Cloud',
    subtitle: 'SaaS recurrente de alto margen (93%) y ratio LTV/CAC de 12.1x',
    category: 'Unit Economics & SaaS',
    image: './logo-peumo-quantum.jpg',
    badge: 'MÉTRICAS FINANCIERAS ROBUSTAS',
    content: {
      headline: 'Economía unitaria por cuenta B2B representativa (fundo frutícola de 15 hectáreas):',
      points: [
        'Costo de Adquisición de Clientes (CAC): US$ 380 (incluye logística de visita y marketing segmentado).',
        'Ticket Inicial Hardware (4 Nodos KioT + Gateway): .000 CLP (~US$ 1.050) con margen del 70%.',
        'Ingreso Recurrente Anual (ARR SaaS AgroTwin): .000 CLP/mes (.000 CLP/año ~ US$ 960/año).',
        'Costo Cloud Unitario: Datos abiertos Sentinel de la ESA (zsh) + Servidores TimescaleDB/MQTT = ~,8 USD/predio/mes. Margen SaaS del 93%.',
        'Customer Lifetime Value (LTV): US$ 4.600 (a 5 años con churn del 8%). Ratio LTV / CAC = 12,1x. Periodo de Payback: 4,2 meses.'
      ],
      metrics: [
        { label: 'Ratio LTV / CAC', value: '12,1 x', detail: 'Referente SaaS > 3x' },
        { label: 'Payback Period', value: '4,2 Meses', detail: 'Rápida recuperación de caja' },
        { label: 'Margen Bruto SaaS', value: '93%', detail: 'Datos Sentinel sin costo API' }
      ]
    },
    speakerNotes: 'Con un payback de solo 4 meses y un LTV de más de 12 veces el costo de adquisición, cada cliente incorporado genera flujo de caja positivo inmediato para financiar el crecimiento orgánico.'
  },
  {
    id: 10,
    title: 'Las Variables Críticas del Negocio',
    subtitle: 'Gestión rigurosa de parámetros operacionales, financieros y de sostenibilidad',
    category: 'Control de Operaciones',
    image: './logo-terra-radar.jpg',
    badge: 'MATRIZ DE RIESGO & OPERACIÓN',
    content: {
      headline: 'Los indicadores no negociables que monitoreamos semanalmente:',
      points: [
        'Operacionales / Técnicas: Latencia de alerta de helada < 45 segundos (con canal dual push y llamada); Tasa de falla en terreno (RMA) < 3% con prueba de inmersión en taller; Eficiencia Deep-Sleep > 95% para autonomía infinita de batería.',
        'Financieras & Comerciales: Ciclo de Conversión de Efectivo < 30 días (cobro de hardware 50% reserva / 50% instalación); Eliminación del churn invernal mediante contratos anuales prorrateados en 12 cuotas.',
        'Sostenibilidad & ESG: Intensidad hídrica auditada (reducción del 35% de agua y 40% energía de bombas); Monitoreo y certificación de hectáreas de bosque nativo esclerófilo para respaldo EUDR.'
      ],
      metrics: [
        { label: 'Latencia Helada', value: '< 45 seg', detail: 'Respuesta crítica nocturna' },
        { label: 'RMA Terreno', value: '< 3%', detail: 'Confiabilidad mecatrónica' },
        { label: 'Ahorro Hídrico', value: '35%', detail: 'Medido en pozo y cuenca' }
      ]
    },
    speakerNotes: 'Una startup de hardware muere si no controla el RMA o si el agricultor cancela en invierno. Nosotros blindamos el negocio con contratos anuales y estándares rigurosos de control de calidad.'
  },
  {
    id: 11,
    title: 'Estrategia de Financiamiento Multinivel & El "Ask"',
    subtitle: 'Ruta de capital no dilutivo y ronda semilla de €75.000 para acelerar tracción',
    category: 'Estrategia de Capital',
    image: './logo-cyber-hexagon.jpg',
    badge: 'RONDA SEMILLA €75.000 (SAFE)',
    content: {
      headline: 'Estructura de financiamiento por etapas minimizando la dilución de los fundadores:',
      points: [
        'Nivel 1 (Bootstrapping Fundadores): €20.000 propios invertidos en I+D, PCBs y validación inicial de producto.',
        'Nivel 2 (Subvenciones Públicas No Dilutivas): Postulación a CORFO Semilla Inicia (M CLP) y FIA Innovación Agraria (M-M CLP) con 0% de dilución.',
        'Nivel 3 (Ronda Semilla Actual • El "Ask"): €75.000 vía instrumento SAFE (descuento 20% / Cap €1.2M) para fabricar el Lote 1 de 200 nodos KioT, expandir servidores AgroTwin y acelerar alianzas exportadoras en la UE.',
        'Nivel 4 (Serie A 2028): Expansión internacional a Perú (Ica) y Argentina (Mendoza) con fondos de Venture Capital ClimaTech europeos (€1.5M - €3.0M).'
      ],
      metrics: [
        { label: 'Ticket Semilla', value: '€ 75.000', detail: 'Instrumento SAFE 20% desc.' },
        { label: 'Meta de Lote', value: '200 Nodos KioT', detail: 'Despliegue Maule 2026/27' },
        { label: 'Fondos No Dilutivos', value: 'CORFO / FIA', detail: 'Apalancamiento estatal' }
      ],
      highlightBox: {
        title: 'Uso Detallado de los Fondos (€75.000)',
        text: '45% Componentes y fabricación de 200 nodos KioT • 35% Infraestructura Cloud AgroTwin y Pasaporte Verde • 20% Fuerza de ventas de terreno y Días de Campo.'
      }
    },
    speakerNotes: 'Buscamos inversores estratégicos que entiendan la oportunidad de conectar el agro chileno con los requerimientos corporativos de Europa. €75.000 nos llevan a rentabilidad operativa.'
  },
  {
    id: 12,
    title: 'Equipo Fundador & Visión 2030',
    subtitle: 'Ingeniería con "botas en el barro" en Talca y ciencia ambiental en Alemania',
    category: 'Equipo & Cierre',
    image: './rewildmapper-gis.png',
    badge: 'EQUIPO FUNDADOR COMPLEMENTARIO',
    content: {
      headline: 'La combinación exacta de capacidad operativa en terreno y visión científica global:',
      points: [
        'Paulina Urrutia Maureira (Talca, Chile): Ingeniera en Automatización de Procesos. Lidera el diseño de PCBs en KiCad, fabricación mecatrónica, pruebas de estanqueidad IP65 y atención directa a productores en fundo.',
        'Daniel Santander Urrutia (Friburgo / Berlín, Alemania): Geofísico, permacultor y analista de ecología forestal y GEI. Lidera el pipeline satelital Sentinel-2, modelos AgroTwin y conexión comercial ESG en la Unión Europea.',
        'Manifiesto de Ingeniería: "Cero consultorías de escritorio. Mecatrónica de terreno con las botas en el barro."',
        'Visión 2030: Consolidar a la Región del Maule como el referente sudamericano de agricultura regenerativa y de precisión de código abierto y alta tecnología.'
      ],
      metrics: [
        { label: 'Paulina Urrutia', value: 'Operaciones Maule', detail: 'Hardware, PCB y Terreno' },
        { label: 'Daniel Santander', value: 'Satélites & ESG UE', detail: 'Geofísica y Mercados Europa' },
        { label: 'Contacto', value: 'contacto@urrutia.ag', detail: 'Talca, Chile • Berlín, Alemania' }
      ],
      highlightBox: {
        title: 'Únete a la Transformación Agroclimática',
        text: 'Estamos listos para desplegar la tecnología que protegerá la próxima cosecha. ¡Muchas gracias!'
      }
    },
    speakerNotes: 'Muchas gracias por su atención. Quedamos a su disposición para preguntas, revisión del código y demostración en vivo del nodo KioT y la plataforma AgroTwin.'
  }
];

export const ORGANIZATION_PITCH_SLIDES: PitchSlide[] = [
  {
    id: 1,
    title: 'Gobernanza & Modelo de Trabajo Colaborativo',
    subtitle: 'Cómo Organizamos el Esfuerzo entre Alta Tecnología y Terreno Comunitario',
    category: 'Estructura & Organización',
    image: './img-agri-hub-farm.jpg',
    badge: 'ARQUITECTURA DE TRABAJO 2026',
    content: {
      headline: 'Una estructura justa, transparente y ágil diseñada para operar sin quemar caja en nóminas fijas',
      points: [
        'El Desafío: Levantar un ecosistema ecotecnológico de frontera con presencia en Alemania y Chile sin asumir pasivos laborales tempranos que asfixien el proyecto.',
        'La Solución Híbrida: Separar la Propiedad Intelectual (SpA Tecnológica) de la Operación Territorial (Cooperativa de Servicios de Campo y Eventos).',
        'El Principio Rector: Quien aporta intelecto y software retiene el control de su creación; quien pone trabajo físico en terreno es dueño de sus excedentes con reglas claras desde el Día 1.'
      ],
      metrics: [
        { label: 'Estructura', value: 'SpA + Cooperativa', detail: 'Tecnología + Terreno' },
        { label: 'Reparto Interno', value: 'Slicing Pie Dinámico', detail: 'Mérito y horas reales' },
        { label: 'Relación Laboral', value: 'Sin Quema de Caja', detail: 'Pago por entregables' }
      ]
    },
    speakerNotes: 'Bienvenidos a la presentación de nuestro modelo de trabajo. Aquí explicamos con total transparencia cómo nos organizamos, cómo se protege el intelecto y cómo todos los colaboradores ganan de forma justa.'
  },
  {
    id: 2,
    title: 'El Dilema de las Startups en Etapa Temprana',
    subtitle: 'Por qué los contratos tradicionales matan proyectos antes de que despeguen',
    category: 'Problema Organizacional',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    badge: 'GESTIÓN DE RIESGO TEMPRANO',
    content: {
      headline: 'Los dos errores fatales que destruyen a los equipos emprendedores:',
      points: [
        'Error 1: Contratar empleados fijos antes de tener ventas recurrentes. Imponer sueldos mensuales con 20-25% de leyes sociales en Chile genera un burn rate insostenible que quiebra la startup en meses.',
        'Error 2: El reparto igualitario ingenuo ("50/50 entre amigos"). Repartir acciones a ciegas genera resentimiento cuando uno trabaja 50 horas por semana y otro se desmotiva a los tres meses pero se queda con la empresa.',
        'Nuestra Respuesta: Organización por mérito demostrable, contratos por hitos y reparto dinámico donde cada contribución queda matemáticamente registrada.'
      ],
      metrics: [
        { label: 'Costo Fijo Inicial', value: '$0 CLP Nómina', detail: 'Preserva liquidez de caja' },
        { label: 'Incentivo', value: '100% Variable', detail: 'Alineado a resultados reales' },
        { label: 'Seguridad Legal', value: 'Cero Contingencia DT', detail: 'Autonomía y cooperativismo' }
      ],
      highlightBox: {
        title: 'Nuestra Filosofía de Trabajo',
        text: 'Nadie trabaja gratis por promesas vacías, pero nadie asume el costo de mantener estructuras burocráticas antes de generar ingresos.'
      }
    },
    speakerNotes: 'No queremos jefes ni empleados explotados. Queremos un ecosistema de socios y colaboradores donde el esfuerzo de cada uno se recompense con precisión matemática.'
  },
  {
    id: 3,
    title: 'La Estructura Dual: SpA Tecnológica + Cooperativa Local',
    subtitle: 'El Modelo Híbrido Mondragón / Fairshares adaptado a la Región del Maule',
    category: 'Arquitectura Legal Dual',
    image: './rewildmapper-gis.png',
    badge: 'MODELO DUAL ESTRATÉGICO',
    content: {
      headline: 'Dos entidades jurídicas complementarias con propósitos claramente delimitados:',
      points: [
        '1. La SpA Tecnológica (AgroTech Chile / AgroTwin SpA): Dueña de la Propiedad Intelectual, código de software (AgriTwin 3D, RewildMapper), diseños de hardware KiCad, contratos SaaS internacionales y postulaciones CORFO/FIA.',
        '2. La Cooperativa de Trabajo & Servicios de Campo: Entidad chilena (Ley DFL 5) formada por técnicos locales, talleristas y colaboradores. Factura por ensamblaje de hardware, instalación física en predios, eventos Edulab y difusión comunitaria.',
        'Relación Contractual: La SpA entrega componentes y licencia el uso de marca y software a la Cooperativa. La Cooperativa ejecuta el trabajo físico y retiene la totalidad de los excedentes generados por sus servicios.'
      ],
      metrics: [
        { label: 'SpA Tecnológica', value: 'Cerebro & IP', detail: 'Software, Patentes y Capital' },
        { label: 'Cooperativa', value: 'Músculo & Campo', detail: 'Ensamble, Terreno y Eventos' },
        { label: 'Sinergia', value: 'Alianza Exclusiva', detail: 'Desarrollo territorial Maule' }
      ]
    },
    speakerNotes: 'La SpA protege la tecnología y permite levantar capital con fondos europeos o CORFO. La Cooperativa da empleo digno y formalidad comunitaria en el Maule.'
  },
  {
    id: 4,
    title: 'Blindaje de la Propiedad Intelectual & Liderazgo',
    subtitle: 'Por qué la autoría intelectual, el software y la visión tienen un rumbo firme',
    category: 'Gobernanza & Veto',
    image: './kiot-hardware.png',
    badge: 'PROTECCIÓN DE LA VISIÓN',
    content: {
      headline: 'Cómo garantizamos que el creador de la tecnología mantenga el timón sin parálisis asamblearia:',
      points: [
        'Autoría Intangible: Quien concibió el proyecto, montó la arquitectura ecotecnológica, desarrolló los softwares (AgriTwin/Rewild) y diseñó la red, retiene la titularidad y control de la SpA.',
        'Acciones Fundador Serie A (Golden Shares): Acciones con derecho de veto reservado sobre la venta o alteración del software, cesión de patentes y definición de la hoja de ruta técnica.',
        'Sin Parálisis Operativa: La Cooperativa tiene autonomía democrática para organizar sus turnos de instalación y eventos, pero no puede votar alterar el código ni vender la tecnología desarrollada por el arquitecto.',
        'Cesión de IP Obligatoria: Quien colabore en código o diseños técnicos firma acuerdos de cesión de IP y confidencialidad a favor de la SpA antes de escribir la primera línea.'
      ],
      metrics: [
        { label: 'Control de IP', value: '100% Blindado', detail: 'En la SpA Tecnológica' },
        { label: 'Derechos de Veto', value: 'Acciones Serie A', detail: 'Protección del Arquitecto' },
        { label: 'Autonomía Campo', value: 'Gestión Cooperativa', detail: 'Democracia en terreno' }
      ]
    },
    speakerNotes: 'Una cooperativa pura donde cualquiera puede votar cómo programar el software destruye la innovación. La SpA mantiene la dirección técnica y la Cooperativa gestiona el terreno.'
  },
  {
    id: 5,
    title: 'Slicing Pie en el Core Team: Reparto de Acciones Justo',
    subtitle: 'Modelo matemático dinámico para los fundadores y colaboradores clave de la SpA',
    category: 'Equity Dinámico (Slicing Pie)',
    image: './logo-peumo-quantum.jpg',
    badge: 'MÉRITO MATEMÁTICO REAL',
    content: {
      headline: 'Cómo se divide la propiedad de la empresa madre entre el equipo fundador:',
      points: [
        'Valoración de Activos Preexistentes: El software ya desarrollado, la web, los modelos matemáticos y la visión previa se valoran como una base de acciones mayoritaria para el creador principal desde el Día 1.',
        'Ponderación por Hora de Esfuerzo: Cada hora de trabajo no remunerada se tasa a valor de mercado según complejidad (arquitectura de software vs tareas administrativas) multiplicada por un factor de riesgo 2x.',
        'Ponderación por Capital Puesto: Cada euro o peso invertido de bolsillo en compras de hardware, licencias o trámites legales se multiplica por un factor de 4x.',
        'Consolidación por Hitos (Vesting): El pastel accionario se congela y formaliza al llegar a un hito mayor (ganar CORFO o cerrar la ronda semilla), reflejando con exactitud quién aportó qué.'
      ],
      metrics: [
        { label: 'IP Preexistente', value: 'Reconocida Inicial', detail: 'Ventaja para el Arquitecto' },
        { label: 'Factor Riesgo Horas', value: '2x Puntos', detail: 'Sobre valor de mercado' },
        { label: 'Factor Capital Cash', value: '4x Puntos', detail: 'Incentivo de inversión' }
      ]
    },
    speakerNotes: 'El Slicing Pie elimina las peleas entre fundadores. Si trabajas y aportas, ganas rebanadas del pastel; si no trabajas, tu participación no crece a costa de los demás.'
  },
  {
    id: 6,
    title: 'Reparto de Excedentes en la Cooperativa de Campo',
    subtitle: 'El Slicing Pie de flujo de caja: Cómo cobra cada colaborador de terreno',
    category: 'Finanzas de la Cooperativa',
    image: './img-forest-rewild.jpg',
    badge: 'DIVISIÓN JUSTA DEL DINERO',
    content: {
      headline: 'Cómo se distribuyen los ingresos de cada proyecto físico entre quienes pusieron el cuerpo:',
      points: [
        'Cobro por Proyecto / Servicio: La cooperativa factura por instalar nodos KioT en un fundo ($40.000-$60.000 CLP/nodo), dictar talleres Edulab o vender entradas a seminarios.',
        'Fondo de Costos Directos: Se descuentan los gastos operativos reales (combustible de la camioneta, filamento PETG 3D, insumos de soldadura, catering de eventos).',
        'Reparto Proporcional de Excedentes: El remanente neto se divide entre los cooperados en base a horas y complejidad del trabajo realizado en ese proyecto específico.',
        'Cero Explotación: No hay un "patrón" quedándose con la plusvalía del esfuerzo del técnico de terreno; las ganancias de la instalación van directo al bolsillo de los instaladores.'
      ],
      metrics: [
        { label: 'Margen Instalación', value: '100% Cooperativa', detail: 'Va al equipo de terreno' },
        { label: 'Excedente Neto', value: 'Reparto por Puntos', detail: 'Según horas y tareas' },
        { label: 'Frecuencia de Pago', value: 'Por Proyecto Cerrado', detail: 'Flujo rápido sin atrasos' }
      ],
      highlightBox: {
        title: 'Ejemplo Práctico de Reparto',
        text: 'Si un proyecto de instalación deja $4.000.000 CLP de excedente neto tras descontar insumos, se reparte entre el soldador de taller, el instalador de cerro y el coordinador según los puntos devengados.'
      }
    },
    speakerNotes: 'La cooperativa garantiza que quien se ensucie las botas en el barro gane el fruto directo de su trabajo físico, mientras la SpA se sostiene con el SaaS del software.'
  },
  {
    id: 7,
    title: 'Extensión Territorial: Red de Instaladores Certificados',
    subtitle: 'Modelo estilo franquicia / micro-agencias para crecer fuera del Maule',
    category: 'Escalamiento (Modelo B)',
    image: './logo-terra-radar.jpg',
    badge: 'ESCALA SIN EMPLEADOS',
    content: {
      headline: 'Cómo expandimos el servicio a O\'Higgins, Ñuble, Colchagua y más allá:',
      points: [
        'Formación y Certificación: La SpA y la Cooperativa capacitan a técnicos agrícolas y agrónomos independientes en el montaje y mantenimiento de nodos KioT IP65.',
        'Ingreso Inmediato por Instalación: El instalador certificado cobra directamente su tarifa por cada nodo que monta en un fundo de su zona ($40.000 - $60.000 CLP).',
        'Ingreso Recurrente por Mantenimiento (Revenue Share): El instalador se lleva entre el 15% y el 20% de la suscripción SaaS mensual de AgroTwin de ese cliente durante todo el tiempo que mantenga el nodo funcionando.',
        'Alineación Perfecta de Incentivos: El técnico cuida que el sensor nunca falle porque, si el cliente cancela el servicio, él pierde su renta mensual recurrente.'
      ],
      metrics: [
        { label: 'Fee Instalación', value: '$50.000 CLP / nodo', detail: 'Ingreso inmediato técnico' },
        { label: 'Revenue Share SaaS', value: '15% - 20% Mensual', detail: 'Renta pasiva recurrente' },
        { label: 'Costo para la Startup', value: '$0 Costo Fijo', detail: 'Expansión 100% a éxito' }
      ]
    },
    speakerNotes: 'Este modelo convierte a técnicos locales de otras provincias en embajadores apasionados de nuestra tecnología. Crecemos regionalmente sin contratar un solo empleado fijo.'
  },
  {
    id: 8,
    title: 'Mapeo de Roles: Dónde Encaja Cada Colaborador',
    subtitle: 'La orquestación exacta entre Europa, el Maule y el equipo de campo',
    category: 'Roles & Responsabilidades',
    image: './logo-cyber-hexagon.jpg',
    badge: 'ORGANIGRAMA MATRICIAL',
    content: {
      headline: 'Definición nítida de funciones sin solapamientos ni zonas grises:',
      points: [
        'Liderazgo Intelectual, Producto & Expansión UE (Daniel • Alemania): Dirección de software (AgriTwin/Rewild), modelos satelitales Sentinel-2, arquitectura de red, web global, relaciones ESG y levantamiento de capital.',
        'Liderazgo Mecatrónica & Operaciones Maule (Paulina • Talca): Dirección de diseño PCB KiCad, pruebas de estanqueidad IP65, control de calidad en taller, compras locales y coordinación de la cooperativa en terreno.',
        'Técnicos de Ensamble y Calibración (Cooperativa): Armado de placas, soldadura, pruebas de sensores DS18B20 y empaque de Chef-Kits (pago por unidad testeada).',
        'Instaladores de Fundo y Soporte de Heladas: Despliegue de antenas LoRaWAN, cableado en bombas de pozo y atención rápida de emergencia predial.',
        'Comunidad, Eventos & Edulab: Organización de talleres presenciales, venta del juego "Raíces y Chips", gestión de redes sociales y prensa rural.'
      ],
      metrics: [
        { label: 'Dirección Software', value: 'Alemania / SpA', detail: 'Producto y Ciencia Macro' },
        { label: 'Dirección Terreno', value: 'Talca / Maule', detail: 'Mecatrónica y Operación' },
        { label: 'Fuerza Colaborativa', value: 'Cooperativa Maule', detail: 'Ensamble y Ejecución' }
      ]
    },
    speakerNotes: 'Cada persona tiene un rol con límites y recompensas claras. No hay confusiones sobre quién decide qué ni sobre cómo se retribuye el esfuerzo.'
  },
  {
    id: 9,
    title: 'Las 4 Reglas de Oro de Gobernanza y Convivencia',
    subtitle: 'Principios éticos y legales para proteger la armonía del equipo desde el día 1',
    category: 'Pacto de Gobernanza',
    image: './img-coastal-hud.jpg',
    badge: 'TRANSPARENCIA & ÉTICA',
    content: {
      headline: 'Los acuerdos fundamentales que todos los participantes firman al ingresar:',
      points: [
        '1. Transparencia Contable Total (Open Books): Todos los costos de materiales, ingresos de proyectos y cálculos de puntos Slicing Pie están abiertos para consulta de los miembros.',
        '2. Blindaje de Propiedad Intelectual (IP Assignment): Toda mejora técnica o código desarrollado para el ecosistema se cede contractualmente a la SpA para garantizar la unidad del proyecto.',
        '3. Autonomía con Responsabilidad: Se evalúa por entregables cumplidos (nodo soldado, sensor instalado, evento ejecutado), no por horas sentado calentando una silla.',
        '4. Cláusula de Salida Amigable (Good Leaver / Bad Leaver): Si un colaborador decide retirarse, se le pagan sus puntos devengados de proyectos completados, pero no puede retener herramientas ni perjudicar la operación.'
      ],
      metrics: [
        { label: 'Libros Contables', value: '100% Abiertos', detail: 'Confianza mutua total' },
        { label: 'Acuerdo de IP', value: 'Firma Previa', detail: 'Seguridad jurídica SpA' },
        { label: 'Criterio de Evaluación', value: 'Por Entregables', detail: 'Cero burocracia de horario' }
      ]
    },
    speakerNotes: 'La claridad previene los conflictos. Cuando las reglas del juego están escritas y aceptadas desde el principio, el equipo trabaja con entusiasmo y sin sospechas.'
  },
  {
    id: 10,
    title: 'La Invitación: Sé Parte de un Movimiento Histórico',
    subtitle: 'Tecnología de frontera con raíces maulinas y justicia distributiva real',
    category: 'Llamado a la Acción',
    image: './rewildmapper-gis.png',
    badge: 'ÚNETE AL EQUIPO',
    content: {
      headline: 'Buscamos técnicos apasionados, agrónomos inquietos y colaboradores de terreno',
      points: [
        'Por qué sumarte: Trabajarás con tecnología de nivel internacional (ESP32, LoRaWAN, satélites de la ESA, Three.js) resolviendo el problema más urgente del campo chileno: la crisis climática y la sequía.',
        'Cómo participar: 1) Como técnico de taller o instalador en la Cooperativa del Maule; 2) Como asesor comercial certificado en tu provincia; 3) Como tallerista o divulgador de Edulab.',
        'El Compromiso: Aprenderás, ganarás en proporción directa al valor que ayudes a crear y serás protagonista de la modernización regenerativa del campo chileno.',
        'Contáctanos: Conversemos directamente con Paulina en Talca o con Daniel vía streaming desde Alemania.'
      ],
      metrics: [
        { label: 'Sede Terreno', value: 'Talca, Chile 🇨🇱', detail: 'Taller mecatrónico operativo' },
        { label: 'Sede Producto', value: 'Berlín, Alemania 🇩🇪', detail: 'Ciencia satelital y ESG' },
        { label: 'Contacto Directo', value: 'contacto@urrutia.ag', detail: 'Inscripción de colaboradores' }
      ],
      highlightBox: {
        title: 'El Manifiesto AgroTech',
        text: 'Cero consultorías de escritorio. Mecatrónica de terreno con las botas en el barro, respaldada por ciencia de vanguardia y gobernanza justa.'
      }
    },
    speakerNotes: 'Gracias por tu tiempo. Estamos listos para construir juntos el futuro del agro chileno. ¿Preguntas o listos para comenzar?'
  }
];

export const COMMERCIAL_PITCH_SLIDES: PitchSlide[] = [
  {
    id: 1,
    title: 'Plan Comercial & Go-To-Market 2026-2027',
    subtitle: 'De la Ciencia Biofísica al Flujo de Caja Ético y Recurrente',
    category: '1. Tesis Comercial',
    badge: 'Estrategia SpA',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
    content: {
      headline: 'Cómo transformamos la ventaja tecnológica de AgroTech en contratos anuales de alta retención.',
      points: [
        'Propuesta centrada en el dolor del agricultor: No vendemos software abstracto ni features; vendemos protección contra pérdidas catastróficas de cosechas y ahorro eléctrico directo.',
        'Sinergia SpA + Cooperativa: La SpA captura ingresos recurrentes (SaaS) y contratos corporativos, mientras la Cooperativa ejecuta instalaciones en terreno con mano de obra local remunerada justamente.',
        'Múltiples vías de monetización: Suscripciones por predio, venta e instalación de hardware KioT, certificaciones de exportación UE (Pasaporte Verde) y proyectos subsidiados por CNR/CORFO.'
      ],
      metrics: [
        { label: 'Mercado Maule', value: '122.000 ha', detail: 'Cuenca Parral-Retiro foco inicial' },
        { label: 'Retorno para Cliente', value: '> 5x ROI', detail: 'Ahorro directo vs costo anual' },
        { label: 'Margen Global', value: '62% - 71%', detail: 'Modelo híbrido SaaS + Hardware' }
      ],
      highlightBox: {
        title: 'Principio Rector Comercial',
        text: 'El agricultor adopta tecnología cuando el riesgo de no tenerla supera con creces el costo de la suscripción mensual.'
      }
    },
    speakerNotes: 'Bienvenidos al deck comercial de AgroTech SpA. Hoy presentamos cómo monetizaremos cada pilar de nuestra tecnología para alcanzar la autosustentabilidad financiera y remunerar el esfuerzo del equipo.'
  },
  {
    id: 2,
    title: 'El Costo Oculto de la Inacción Agrícola',
    subtitle: 'Por Qué el Agricultor Necesita AgroTech Hoy Mismo',
    category: '2. Problema & Urgencia',
    badge: 'Dolor del Cliente',
    image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=1200&q=80',
    content: {
      headline: 'Los tres eventos críticos que desangran la rentabilidad del campo maulino sin tecnología in situ.',
      points: [
        'Heladas de Radiación Imprevistas: Una caída a -2°C durante floración destruye entre $15M y $35M CLP por hectárea de cerezas o arándanos. Las estaciones meteorológicas de TV no detectan microclimas de fondo de quebrada.',
        'Despilfarro Eléctrico en Bombeo: Regar en horas punta triplica el costo de la energía. Sin sensores continuos de humedad en estratos (0-60cm), se bombea un 30% más de agua de la necesaria.',
        'Barrera Aduanera Europea (EUDR): A partir de las normas de la UE, cargamentos sin trazabilidad satelital georreferenciada son rechazados inmediatamente en destino.'
      ],
      metrics: [
        { label: 'Pérdida por Helada', value: '$25M CLP/ha', detail: 'Riesgo promedio cerezos en flor' },
        { label: 'Sobrecosto Bombeo', value: '+35% kWh', detail: 'Riego fuera de horario valle' },
        { label: 'Riesgo Aduana UE', value: '100% Rechazo', detail: 'Falta de auditoría no-deforestación' }
      ],
      highlightBox: {
        title: 'El Gancho de Venta Ineludible',
        text: 'Nuestra suscripción anual cuesta menos del 3% de lo que un agricultor pierde en una sola helada no anticipada.'
      }
    },
    speakerNotes: 'El argumento comercial más contundente es el contraste entre el precio de nuestra solución ($85.000 CLP/mes) y el costo astronómico de perder la cosecha por falta de alerta temprana.'
  },
  {
    id: 3,
    title: 'Arquitectura de Monetización en 4 Pilares',
    subtitle: 'Diversificación de Ingresos para Flujo de Caja Saludable',
    category: '3. Fuentes de Ingreso',
    badge: 'Modelo de Negocio',
    content: {
      headline: 'Cuatro motores complementarios que estabilizan la caja y aceleran la tracción.',
      points: [
        '1. Suscripción SaaS (AgriTwin): Ingresos recurrentes mensuales (MRR) con contratos anuales y cobro automatizado por predio o hectárea.',
        '2. Venta & Despliegue de Hardware (KioT): Margen de hardware superior al 55% sobre BOM, más cobro de setup e instalación profesional en campo.',
        '3. Certificación Pasaporte Verde UE: Facturación por evento/campaña (€650 a €1.800) a fundos exportadores que necesitan compliance internacional.',
        '4. Informes Express de Riesgo Agroclimático: Producto transaccional rápido (€95 - €180) para tasaciones, compraventa de parcelas y bancos.'
      ],
      metrics: [
        { label: 'Pilar 1 (SaaS)', value: 'MRR Estable', detail: '$45K - $160K CLP/mes' },
        { label: 'Pilar 2 (Kits)', value: 'Caja Inmediata', detail: '$185K - $380K CLP/kit' },
        { label: 'Pilar 3 (Export)', value: 'Ticket Alto', detail: '€650 - €1.800/dossier' }
      ],
      highlightBox: {
        title: 'Flujo de Caja Equilibrado',
        text: 'La venta de hardware y los informes express financian el costo inicial de adquisición de clientes (CAC), mientras el SaaS genera valor patrimonial acumulado.'
      }
    },
    speakerNotes: 'No dependemos únicamente del software. El hardware KioT genera ingresos inmediatos en efectivo y afianza al cliente en la plataforma digital a largo plazo.'
  },
  {
    id: 4,
    title: 'AgriTwin SaaS: Planes y Empaquetamiento',
    subtitle: 'Niveles de Servicio Diseñados para Cada Perfil de Productor',
    category: '4. Pricing SaaS',
    badge: 'Catálogo de Planes',
    content: {
      headline: 'Estructura escalonada sin barreras de entrada para productores familiares hasta grandes exportadoras.',
      points: [
        'Plan Básico ($45.000 CLP/mes): Pensado para predios familiares o parcelas de hasta 10 ha. Incluye NDVI/NDWI satelital Sentinel-2 cada 5 días y alertas de heladas por WhatsApp.',
        'Plan Pro ($85.000 CLP/mes): Para fundos comerciales frutícolas y vitivinícolas de hasta 50 ha. Suma gemelo digital 3D, balance hídrico FAO-56, simulación de drenaje de aire frío a 72h y multi-cuartel.',
        'Plan Enterprise ($160.000 CLP/mes): Para exportadoras y fundos mayores a 50 ha. Agrega auditoría continua de no-deforestación EUDR, API LoRaWAN ilimitada y reportes ejecutivos para directorio.',
        'Setup Fee Inicial: $120.000 a $250.000 CLP por levantamiento georreferenciado, calibración satelital y configuración de alertas de terreno.'
      ],
      metrics: [
        { label: 'Básico', value: '$45K/mes', detail: 'Hasta 10 hectáreas' },
        { label: 'Pro Frutícola', value: '$85K/mes', detail: 'Hasta 50 ha + 3D' },
        { label: 'Enterprise', value: '$160K/mes', detail: 'Exportadores + EUDR' }
      ],
      highlightBox: {
        title: 'Descuento por Pago Anual',
        text: 'Ofrecemos 15% de descuento por pago anticipado anual, asegurando caja líquida inmediata para la SpA durante la temporada de siembra/poda.'
      }
    },
    speakerNotes: 'El Plan Pro es nuestro producto estrella. Representa el punto óptimo de valor para fruticultores de cerezos, arándanos y viñedos de Parral, Retiro y Curicó.'
  },
  {
    id: 5,
    title: 'Hardware KioT: Márgenes y Opciones de Pago',
    subtitle: 'Mecatrónica Robusta Fabricada en Talca con Reparto Justo',
    category: '5. Hardware & Margen',
    badge: 'Producción & BOM',
    content: {
      headline: 'Diseño de bajo costo de componentes y alto margen comercial gracias al ensamblaje local de Paulina.',
      points: [
        'Kit Base Riego: Costo BOM $38.500 CLP → Precio venta $185.000 CLP (Margen SpA 58% = $107.500 CLP). Pago a cooperado instalador: $39.000 CLP.',
        'Kit Crítico Anti-Heladas: Costo BOM $44.200 CLP → Precio venta $220.000 CLP (Margen SpA 59% = $130.800 CLP). Incluye sirena 110dB y sonda industrial DS18B20.',
        'Estación Predial Completa: Costo BOM $96.000 CLP → Precio venta $380.000 CLP (Margen SpA 56% = $214.000 CLP). Incluye 3 nodos mesh y panel solar.',
        'Modalidad HaaS (Hardware as a Service): Para agricultores con restricción de liquidez, arriendo a $28.000 CLP/mes con contrato a 18 meses y mantención incluida.'
      ],
      metrics: [
        { label: 'Margen SpA', value: '56% - 59%', detail: 'Margen bruto sobre BOM' },
        { label: 'Pago a Cooperativa', value: '$39K - $70K', detail: 'Por cada instalación realizada' },
        { label: 'Taller Local', value: 'Talca 🇨🇱', detail: 'Ensamblaje liderado por Paulina' }
      ],
      highlightBox: {
        title: 'Economía Circular Local',
        text: 'La SpA no subcontrata instalaciones a terceros lejanos; remunera a los cooperados de la zona, garantizando soporte técnico en menos de 2 horas ante cualquier falla.'
      }
    },
    speakerNotes: 'Estos márgenes de hardware son extraordinariamente atractivos. Al no importar productos terminados de marca, capturamos el margen de valor agregado del ensamblaje mecatrónico.'
  },
  {
    id: 6,
    title: 'Pasaporte Verde: Cumplimiento de Exportación UE',
    subtitle: 'La Llave para Cerezos, Vinos y Avellanas en Mercados Internacionales',
    category: '6. Trazabilidad ESG',
    badge: 'Ticket Alto',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    content: {
      headline: 'Cómo convertimos una exigencia regulatoria europea en un servicio premium de alta rentabilidad.',
      points: [
        'Regulación Antideforestación de la UE (EUDR): Exige que cada kilo de producto importado cuente con coordenadas poligonales exactas y prueba satelital de no-deforestación desde 2020.',
        'Dossier Técnico Automatizado: Generamos el informe pericial en formato compatible con aduanas europeas mediante Sentinel-2 y el algoritmo de Integridad Ecosistémica (IEI).',
        'Precios por Fundo Exportador: Entre €650 y €1.800 según la superficie y cantidad de predios asociados. Margen SpA superior al 70%.',
        'Canal de Distribución: Acuerdos con exportadoras que descuentan el costo de la liquidación de retorno a sus productores asociados.'
      ],
      metrics: [
        { label: 'Precio Promedio', value: '€1.100', detail: 'Por certificación de exportación' },
        { label: 'Margen SpA', value: '70%', detail: 'Automatización satelital' },
        { label: 'Tiempo Entrega', value: '5 días', detail: 'Dossier auditado listo' }
      ],
      highlightBox: {
        title: 'Ventaja Geográfica',
        text: 'La conexión de Daniel con clientes y contrapartes en Alemania y España nos permite certificar con el estándar exacto que exigen los importadores europeos.'
      }
    },
    speakerNotes: 'El Pasaporte Verde es nuestro producto con mayor margen porcentual y ticket promedio. Un solo contrato con una exportadora de cerezas de Curicó puede representar 15 a 20 predios certificados.'
  },
  {
    id: 7,
    title: 'Proyección Financiera SpA (24 Meses)',
    subtitle: 'Evolución de Tracción, Ingresos Recurrentes y Utilidad Neta',
    category: '7. Métricas & Finanzas',
    badge: 'Unit Economics',
    content: {
      headline: 'Trayectoria desde los primeros 8 predios piloto hasta consolidar $250M+ CLP facturados al año 1.',
      points: [
        'Q1 2027 (Fase Siembra): 8 predios AgriTwin, 12 kits KioT. Facturación trimestral: $8.9M CLP. Enfoque: Validación en Parral y Curicó.',
        'Q2 2027 (Brote): 22 predios, 35 kits, 6 Pasaportes Verdes. Facturación trimestral: $19.7M CLP. Ingreso recurrente MRR supera $1.6M CLP.',
        'Q4 2027 (Cosecha Año 1): 80 predios activos, 140 kits en campo. Facturación anualizada supera los $250.000.000 CLP con margen bruto del 68%.',
        'Año 2 (Consolidación Regional): Expansión a 240 predios en O Higgins, Maule y Ñuble. Facturación anual proyectada: $614.000.000 CLP.'
      ],
      metrics: [
        { label: 'Facturación Año 1', value: '$250M CLP', detail: 'Venta hardware + SaaS + Consultoría' },
        { label: 'MRR Mes 12', value: '$6.4M CLP', detail: 'Base recurrente predecible' },
        { label: 'Fondo Cooperativa', value: '$50M+ CLP', detail: 'Repartido a técnicos locales' }
      ],
      highlightBox: {
        title: 'Validación con Cero Deuda',
        text: 'El modelo no requiere endeudamiento bancario agresivo; el hardware se ensambla contra orden de compra y el setup fee financia la calibración.'
      }
    },
    speakerNotes: 'Wladimir Gutiérrez y Pablo Pérez pueden auditar estos números: la estructura de costos es sumamente ágil. Nuestro punto de equilibrio operativo se alcanza con solo 14 predios activos en Plan Pro.'
  },
  {
    id: 8,
    title: 'Embudo de Ventas en Terreno & Showrooms',
    subtitle: 'El Arte de Venderle al Agricultor con las Botas en el Barro',
    category: '8. Estrategia de Campo',
    badge: 'Proceso de Venta',
    content: {
      headline: 'Metodología probada para convertir desconfianza rural en contratos firmados.',
      points: [
        '1. Showrooms de Terreno: Utilizar el Predio Meniels (Parral) y Fundo El Boldo (Curicó) para "Días de Campo". El agricultor ve el gemelo 3D, toca el sensor y escucha sonar la sirena antiheladas en vivo.',
        '2. El "Gancho Gratuito" (Lead Magnet): Entregar a presidentes de canales de regadío y APRs un Informe de Riesgo Agroclimático gratuito de su zona para abrir puertas de reunión.',
        '3. Visita de Diagnóstico Técnico (30 min): Paulina Urrutia o un técnico cooperado visita el campo con medidor de terreno, identifica los 2 puntos críticos y cotiza en el acto.',
        '4. Garantía de 30 Días: Si durante el primer mes de uso el sistema no detecta anomalías o alertas útiles, se reembolsa el 100% de la suscripción.'
      ],
      metrics: [
        { label: 'Showroom 1', value: 'Predio Meniels', detail: 'Parral • 24.8 ha en operación' },
        { label: 'Showroom 2', value: 'Fundo El Boldo', detail: 'Curicó • Frutales de exportación' },
        { label: 'Tasa Conversión', value: '45%', detail: 'Visitas showroom a cierre de venta' }
      ],
      highlightBox: {
        title: 'La Venta Agrícola es de Confianza',
        text: 'Nadie le compra software a un comercial en traje de Santiago. Nos compran a nosotros porque estamos en Talca, conocemos los caminos de tierra y hablamos su mismo idioma.'
      }
    },
    speakerNotes: 'El Día de Campo en el Predio Meniels será nuestro evento de lanzamiento comercial más potente. Con un asado campestre y demostración en vivo, cerramos a los primeros 5 clientes.'
  },
  {
    id: 9,
    title: 'Apalancamiento con Fondos Públicos & Subsidios',
    subtitle: 'Cómo Lograr que el Estado Financie Hasta el 80% de Nuestras Instalaciones',
    category: '9. Subsidios & Leyes',
    badge: 'Financiamiento Público',
    content: {
      headline: 'Instrumentos estatales chilenos que subsidian la adopción de AgroTech para nuestros clientes.',
      points: [
        'Ley de Fomento al Riego CNR (Comisión Nacional de Riego): Bonifica entre el 70% y el 80% de inversiones en telemetría y telecontrol hídrico. Entregamos el proyecto técnico listo para postulación.',
        'CORFO Innova Región Maule: Subsidio no reembolsable de hasta $50M CLP para el escalamiento de manufactura de hardware KioT y calibración de modelos satelitales.',
        'Programas INDAP (SAT y Prodesal): Convenios para equipar pequeños agricultores con kits de bajo costo cofinanciados por el Ministerio de Agricultura.',
        'Alianzas con Cooperativas Locales: Emisión de facturas por la SpA con facilidades de pago diferidas al momento de la liquidación de cosecha (arroz o fruta).'
      ],
      metrics: [
        { label: 'Subsidio CNR', value: 'Hasta 80%', detail: 'Telemetría de riego para clientes' },
        { label: 'Fondo CORFO', value: '$30M - $50M', detail: 'Postulación I+D y manufactura' },
        { label: 'Copago Cliente', value: 'Solo 20-30%', detail: 'Cero barrera de entrada económica' }
      ],
      highlightBox: {
        title: 'Estrategia Ganar-Ganar',
        text: 'Le decimos al agricultor: "Te postulamos a la Ley de Riego; el Estado paga el 80% del hardware y tú solo cubres la suscripción mensual de monitoreo".'
      }
    },
    speakerNotes: 'Wladimir Gutiérrez tiene amplia experiencia en la articulación con comités y organismos públicos. Postular a los agricultores a la Ley de Riego prácticamente elimina la objeción del costo inicial.'
  },
  {
    id: 10,
    title: 'Roles Comerciales & Plan de Acción a 90 Días',
    subtitle: 'Compromisos de los Socios para Alcanzar el Primer Hito Financiero',
    category: '10. Ejecución Inmediata',
    badge: 'Hoja de Ruta',
    content: {
      headline: 'Distribución transparente de tareas y metas cuantitativas para el próximo trimestre.',
      points: [
        'Daniel Santander: Cierre de alianzas con 2 exportadoras clave para Pasaporte Verde y dirección de la plataforma digital.',
        'Wladimir Gutiérrez: Presentación de convenios con 3 comités de APR y asociaciones de canalistas en Parral y Linares; control de caja y cobranzas.',
        'Paulina Urrutia: Ensamblaje y pruebas de 10 Kits KioT en taller de Talca; coordinación de visitas técnicas y stock.',
        'Pablo Pérez: Puesta en producción del simulador de precios y calculadora de ROI; seguimiento semanal de prospectos y métricas.',
        'Meta Trimestral: Alcanzar los primeros 8 contratos firmados de AgriTwin y $8.500.000 CLP de facturación acumulada antes del 31 de diciembre.'
      ],
      metrics: [
        { label: 'Meta Clientes', value: '8 Contratos', detail: 'Pilotos comerciales pagados' },
        { label: 'Meta Facturación', value: '$8.500.000 CLP', detail: 'Hardware + Suscripciones Q1' },
        { label: 'Reunión Semanal', value: 'Viernes 18:00', detail: 'Seguimiento de ventas y avances' }
      ],
      highlightBox: {
        title: 'El Compromiso de los Socios',
        text: 'Nuestra tecnología ya funciona. Ahora salimos a la cancha con precios claros, propuestas formales y la convicción de crear valor real en el Maule.'
      }
    },
    speakerNotes: 'Este es el plan. Los roles están claros, los números son realistas y la oportunidad es inmejorable. ¿Estamos todos de acuerdo para dar el vamos oficial a la etapa comercial?'
  }
];

export const PITCH_SLIDES: PitchSlide[] = PROJECT_PITCH_SLIDES;

export const SOCIAL_TEMPLATES: SocialTemplate[] = [
  {
    id: 'tiktok-frost-alert',
    platform: 'TikTok',
    title: 'TikTok: Alerta de Helada Agro-Tech',
    format: 'Video Vertical 9:16 (1080x1920)',
    headlinePrompt: '¡No quemes tu arándano con fuego! Mira cómo un ESP32 detecta la helada 2 horas antes 🌡️⚡',
    visualConcept: 'Primer plano del sensor DS18B20 congelándose en vivo con overlay de gráfico de temperatura descendiendo a -1.5°C. Música de campo agro-tech de fondo.',
    callToAction: 'Comenta "MAULE" para enviarte la guía gratuita anti-heladas en PDF.',
    captionTemplate: '¿Sabías que una helada de 30 minutos a -1°C te puede costar toda la temporada de cerezas? 🍒 Congelamos este sensor en el Maule para mostrarte cómo funciona el Kit KioT. #AgroTech #Maule #HeladasChile #ESP32 #AgroPrecision'
  },
  {
    id: 'ig-post-sat-carousel',
    platform: 'Instagram Post',
    title: 'Carrusel IG: Anatomía Satelital de tu Fundo',
    format: 'Carrusel Cuadrado 1:1 (1080x1080)',
    headlinePrompt: 'Lo que el corredor de propiedades NO te dice sobre el agua de tu parcela 🛰️💧',
    visualConcept: 'Deslizable de 5 láminas: 1) Mapa falso color Sentinel-2, 2) Histórico térmico a 10 años, 3) Mapa de acuíferos subterráneos, 4) Esquema KioT, 5) Logo AgroTech Chile.',
    callToAction: 'Pide tu Informe de Riesgo Climático Predial en el link del perfil.',
    captionTemplate: 'Antes de comprar esa parcela en el Maule, analiza el suelo. Nuestro Informe Climático analiza 10 años de agua subterránea y heladas históricas con datos abiertos de la ESA. 🚜📊 #AgroTech #ParcelasMaule #Biotecnologia #ChileRiego'
  },
  {
    id: 'ig-story-real-field',
    platform: 'Instagram Story',
    title: 'Story IG: Live Field Hardware Teardown',
    format: 'Vertical Story 9:16 (1080x1920)',
    headlinePrompt: 'Ensamblando nodos KioT IP65 en el taller de Talca 🛠️',
    visualConcept: 'Video rápido de impresión 3D de gabinetes y soldadura de placa ESP32 con sticker de la marca. Poll interactivo: "¿Tuviste helada anoche?".',
    callToAction: 'Desliza para reservar tu kit del lote 2.',
    captionTemplate: '100% fabricado y testeado en la Región del Maule. Resistente a la lluvia, la radiación UV y el barro. 🌿⚡'
  },
  {
    id: 'linkedin-green-passport',
    platform: 'LinkedIn',
    title: 'LinkedIn B2B: Pasaporte Verde para Exportadoras',
    format: 'Banner Horizontal 1.91:1 (1200x627)',
    headlinePrompt: 'Cómo las exportadoras del Maule aseguran precios premium en supermercados de Alemania y Holanda 🍷🍏',
    visualConcept: 'Infografía técnica limpia: Imagen satelital de viñedo maulino enlazada a un código QR dinámico y sello Pasaporte Verde.',
    callToAction: 'Agende una sesión técnica con nuestro equipo de ciencia ambiental.',
    captionTemplate: 'Las regulaciones de la UE (CSRD) exigen trazabilidad real de biomasa y captura de carbono. Con el Pasaporte Verde de AgroTech Chile, transformamos los parches de bosque nativo de sus fundos en una ventaja comercial auditable. #Agribusiness #ChileExporta #ESG #CarbonFarming #Maule'
  }
];

export const MERCH_ITEMS: MerchItem[] = [
  {
    id: 'merch-tshirt',
    name: 'Polera AgroTech Chile Organic Cotton',
    tagline: 'Code Meets Roots — Algodón orgánico chileno',
    category: 'Apparel',
    price: '$22.000 CLP',
    description: 'Polera de algodón 100% orgánico pesado (220 GSM) en verde bosque profundo. Presenta el emblema de la raíz Peumo-Chip estampado en serigrafía al agua de alta durabilidad.',
    specs: ['100% Algodón Orgánico', 'Impresión Serigrafía Ecológica', 'Corte Agro-Tech Regular Fit', 'Hecho en Chile'],
    badge: 'Bestseller',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'merch-cap',
    name: 'Jockey de Campo "Huaso-Tech"',
    tagline: 'Gorra táctica de baja perfil con bordado frontal Peumo-Chip',
    category: 'Headwear',
    price: '$18.000 CLP',
    description: 'Gorra ultra resistente con malla trasera respirable y visera curva. Bordado 3D de alta densidad con el logotipo de AgroTech Chile y pestaña de ajuste traseras.',
    specs: ['Lona de algodón & Malla respirable', 'Bordado 3D Verde & Gold', 'Resistente a radiación UV', 'Talla única ajustable'],
    badge: 'Nuevo',
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'merch-tote',
    name: 'Tote Bag Heavy Canvas "Rewilding Maule"',
    tagline: 'Bolso de lona cruda pesada para planos de terreno y laptop',
    category: 'Accessories',
    price: '$14.000 CLP',
    description: 'Tote bag funcional de lona cruda reforzada (14 oz) en tono papel natural. Gráfica técnica con coordenadas del Río Maule e infografía de biodiversidad vegetal.',
    specs: ['Lona Cruda Heavy Weight', 'Asas reforzadas para 15kg', 'Bolsillo interno para sensores/herramientas', '100% Biodegradable'],
    badge: 'Edición Limitada',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'merch-stickers',
    name: 'Pack de Stickers IP65 Heavy Duty',
    tagline: 'Vinyl impermeable para gabinetes de campo, herramientas y laptops',
    category: 'Stationery',
    price: '$6.000 CLP',
    description: 'Pack de 8 stickers troquelados de vinilo laminado matte con adhesivo ultra fuerte. Diseñados para resistir sol, agua y raspaduras en el tractor o el gabinete IoT.',
    specs: ['Vinilo laminado UV-Proof', '8 Diseños exclusivos Agro-Precisión', 'Resistente a agua y barro', 'Troquelado preciso'],
    badge: 'Must Have',
    imageUrl: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Socio 1 (Maule)',
    role: 'Ingeniero en Automatización & Operaciones de Campo',
    location: 'Talca, Región del Maule, Chile',
    flag: '🇨🇱',
    avatarBg: 'bg-emerald-900/60 border-emerald-500',
    bio: 'Especialista en ingeniería mecatrónica, ensamblaje de hardware en gabinetes IP65, diseño de placas PCB en KiCad, impresión 3D local y ventas de terreno con agricultores del Maule.',
    skills: ['IoT & Microcontroladores (ESP32)', 'Mecatrónica de Riego', 'Impresión 3D & Prototipado', 'Soporte & Ventas Campo'],
    focus: 'Hardware, PCB KiCad, Ensamblaje y Atención Directa en Fundo'
  },
  {
    name: 'Socio 2 (Alemania)',
    role: 'Geofísico & Analista de Ciencias Ambientales',
    location: 'Friburgo / Berlín, Alemania',
    flag: '🇩🇪',
    avatarBg: 'bg-cyan-900/60 border-cyan-500',
    bio: 'Experto en geofísica aplicada, permacultura, dinámica de bosques nativos y balance de gases de efecto invernadero. Dirige el procesamiento satelital y la divulgación agro-geek.',
    skills: ['Geofísica & Datos Abiertos ESA/NASA', 'Ecología Forestal & Suelos', 'Modelos Climáticos & GEI', 'Divulgación Científica'],
    focus: 'Motor GIS RewildMapper, Modelos Clima & Redes'
  }
];

export const GTM_PHASES: GtmPhase[] = [
  {
    phase: 'Fase 1',
    timeframe: 'Mes 1',
    title: 'Monetización Inmediata & Tracción Inicial',
    focus: 'Informes Climáticos + Beta RewildMapper + TikTok Educativo',
    milestones: [
      'Lanzamiento comercial de Informes de Riesgo Climático Predial (€80-200) para parceleros.',
      'Activación de 5 predios piloto en RewildMapper en modalidad beta gratuita.',
      'Campaña educativa masiva en TikTok e Instagram explicando sensores y lectura satelital.'
    ],
    kpi: '50 Informes vendidos + 5 predios piloto + 10k productores conectados',
    status: 'Immediate'
  },
  {
    phase: 'Fase 2',
    timeframe: 'Meses 2-3',
    title: 'Despliegue Hardware & SaaS RewildMapper',
    focus: 'Kits KioT Anti-Heladas + Plataforma SaaS + Primer Certificado PBC',
    milestones: [
      'Reinversión de capital de Fase 1 para adquirir componentes y ensamblar Lote 1 de Kits KioT.',
      'Lanzamiento oficial de la suscripción SaaS RewildMapper para fundos maulinos.',
      'Emisión del primer Piloto de Certificado de Biodiversidad Vegetal (PBC) en el Maule.'
    ],
    kpi: '30 Kits KioT instalados + 15 fundos en SaaS + Primer token emitido',
    status: 'Upcoming'
  },
  {
    phase: 'Fase 3',
    timeframe: 'Meses 4-5',
    title: 'Validación Ecológica & Ventas ESG Exportadoras',
    focus: 'Pasaporte Verde + Alianzas con Exportadoras de Fruta & CONAF',
    milestones: [
      'Primer ciclo de monitoreo satelital de regeneración de biomasa en fundos afiliados.',
      'Presentación del Pasaporte Verde a viñas y exportadoras de manzanas/berries.',
      'Firma de alianzas estratégicas con municipios del Maule y programas de conservación.'
    ],
    kpi: '10 Exportadoras B2B cerradas + Alianza CONAF/Municipios',
    status: 'Expansion'
  }
];

export const BOOKS_DATA: BookItem[] = [
  {
    id: 'book-manual-mecatronica',
    title: 'Manual de Mecatrónica Rural & Sensores IP65',
    author: 'Paulina Urrutia Maureira & Equipo AgroTech Chile',
    publisher: 'Editorial AgroTech Chile • Talca',
    category: 'Mecatrónica & IoT',
    isOwnWork: true,
    price: '$18.900 CLP / €20',
    format: 'Pack Físico + Digital',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Guía práctica para armar estaciones meteorológicas y nodos de campo resistentes a la intemperie maulina. Incluye diagramas KiCad, esquemas ESP32 y código fuente LoRaWAN.',
    pages: 184,
    badge: 'Obra Propia'
  },
  {
    id: 'book-permacultura-suelos',
    title: 'Suelos Vivos & Microclimas del Valle del Maule',
    author: 'Daniel Santander Urrutia & Geofísicos del Maule',
    publisher: 'Ediciones Agroclimáticas • Friburgo/Talca',
    category: 'Permacultura & Suelos',
    isOwnWork: true,
    price: '$14.500 CLP / €16',
    format: 'Digital PDF',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80',
    description: 'Estudio de microbiología de suelos, retención hídrica en cuencas del Maule y estrategias naturales para amortiguar heladas en huertos de pequeños productores.',
    pages: 220,
    badge: 'Obra Propia'
  },
  {
    id: 'book-satelites-abiertos',
    title: 'Teledetección Satelital para la Agricultura Familiar',
    author: 'Dra. María Elena Fuentes & Dr. H. Weber (Autores Invitados)',
    publisher: 'Copernicus Open Access & DGA Chile',
    category: 'Ciencia & Satélites',
    isOwnWork: false,
    price: '$12.000 CLP / €14',
    format: 'Digital PDF',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    description: 'Fundamentos de índices NDVI, NDWI y firmas espectrales de Sentinel-2 explicados sin tecnicismos complejos para agrónomos y agricultores.',
    pages: 156,
    badge: 'Autor Aliado'
  },
  {
    id: 'book-raices-chips-libro',
    title: 'Raíces y Chips: Cuentos e Infografías Agroclimáticas',
    author: 'Paulina Urrutia & Daniel Santander',
    publisher: 'Urrutia Edulab Infantil',
    category: 'Infantil & Educación',
    isOwnWork: true,
    price: '$16.900 CLP / €18',
    format: 'Impreso Kraft',
    coverImage: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
    description: 'Libro ilustrado a todo color para niños y escuelas rurales sobre el ciclo del agua, la tecnología en el campo y la protección del bosque esclerófilo.',
    pages: 96,
    badge: 'Educativo'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'heladas-maule-2026',
    title: '¿Por qué la helada de primavera es más destructiva y cómo combatirla con sensores localizados?',
    category: 'Columna de Opinión',
    author: 'Daniel Santander Urrutia',
    authorRole: 'Geofísico & Cofundador',
    date: '28 de Agosto, 2026',
    readTime: '6 min lectura',
    coverImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    summary: 'Análisis microclimático de la masa de aire polar en la cuenca de Curicó y Linares. La diferencia entre una estación pública a 20km y un sensor a nivel de brote.',
    tags: ['Heladas', 'Microclima', 'Cerezos', 'Sensores'],
    content: [
      'Cuando medimos la temperatura a 1.5 metros de altura en una estación meteorológica convencional, a menudo ignoramos el gradiente térmico crítico que ocurre a solo 30 centímetros del suelo, justo donde están las yemas florales de los cerezos en septiembre.',
      'En la Región del Maule, las heladas por radiación ocurren bajo cielos despejados y viento calmo. El calor del suelo se escapa hacia el espacio y se forma una inversión térmica. Durante este fenómeno, la sonda DS18B20 sumergida en el follaje detecta temperaturas hasta 2.3°C más bajas que el termómetro de caseta pública.',
      'La alerta temprana automatizada vía LoRaWAN le da al fruticultor una ventana crítica de 45 a 60 minutos para activar el riego por microaspersión antes de que la célula vegetal se cristalice y colapse.',
      'Nuestra visión es democratizar esta tecnología mecatrónica en todo el valle central, combinando sensores locales económicos de bajo consumo con pases satelitales Sentinel-2.'
    ],
    comments: [
      {
        id: 'c1',
        author: 'Don Hugo Retamal (Agrónomo de Yerbas Buenas)',
        date: '29 de Agosto, 2026',
        text: 'Excelente columna Daniel. El año pasado perdimos el 40% de brotes en cerezos justamente por confiar en la temperatura que daba la radio local. El microclima dentro del huerto es completamente distinto.'
      },
      {
        id: 'c2',
        author: 'Valeria Morales',
        date: '30 de Agosto, 2026',
        text: 'Muy clara la explicación sobre la inversión térmica. ¿Qué frecuencia de muestreo recomiendan para las sondas DS18B20 durante las noches heladas?'
      }
    ]
  },
  {
    id: 'entrevista-paulina-talca',
    title: 'Entrevista: "Diseñar electrónica resistente en Talca para competir con marcas globales"',
    category: 'Entrevista',
    author: 'Equipo Editorial AgroTech',
    authorRole: 'Periodismo Agrícola',
    date: '20 de Agosto, 2026',
    readTime: '8 min lectura',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    summary: 'Conversamos con Paulina Urrutia Maureira sobre los desafíos del ensamblaje mecatrónico local, el petg estanco IP65 y la mentalidad de solución directa.',
    tags: ['Mecatrónica', 'Entrevista', 'Talca', 'PCB'],
    content: [
      'Entrevistador: Paulina, ¿por qué insistir en fabricar las placas y gabinetes en Talca en vez de importar todo terminado?',
      'Paulina Urrutia: "Porque el equipo de importación estándar no aguanta las condiciones reales de nuestros campos. Un sensor genérico importado se sulfata con la humedad de la niebla maulina en dos meses o la carcasa plástica común se quiebra por la radiación solar estival."',
      'Paulina agrega: "Nosotros diseñamos la PCB en KiCad asegurando pistas anchas para corrientes de relé, sellado de PETG en impresión 3D local y juntas de silicona de grado industrial. Si falla una sonda en medio de la noche, estamos a 30 minutos de distancia para dar respaldo directo al agricultor."',
      'El resultado es un ecosistema IoT robusto que demuestra que en el Maule tenemos capacidad técnica de frontera.'
    ],
    comments: [
      {
        id: 'c3',
        author: 'Carlos Sepúlveda (Prototipado Linares)',
        date: '21 de Agosto, 2026',
        text: 'Orgullo maulino ver mecatrónica hecha en Talca respondiendo a problemas reales. ¡Mucho éxito Paulina y equipo!'
      }
    ]
  },
  {
    id: 'satelite-copernicus-pasaporte',
    title: 'Noticia: El Pasaporte Verde abre puertas en exportadoras hacia la Unión Europea',
    category: 'Noticias Agtech',
    author: 'Daniel Santander Urrutia',
    authorRole: 'Geofísico & Satélites',
    date: '12 de Agosto, 2026',
    readTime: '5 min lectura',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    summary: 'Las nuevas regulaciones europeas (EUDR y CSRD) exigen verificación de no-deforestación y captura de carbono. La respuesta de RewildMapper.',
    tags: ['Satélite', 'Exportación', 'ESG', 'Europa'],
    content: [
      'Los compradores de frutas y vinos en Alemania, Países Bajos y Francia están exigiendo trazabilidad ambiental verificable por terceros independientes.',
      'Mediante la ingesta automatizada de imágenes ópticas de Sentinel-2 L2A y radar Sentinel-1, AgroTech Chile genera el Pasaporte Verde Predial: un reporte digital auditable en código QR impreso directamente en los pallets de exportación.',
      'Esto permite a viñedos y fundos del Maule validar la conservación de parches de bosque esclerófilo nativo y acceder a diferenciales de precio de hasta un 18% en cadenas de supermercados boutique europeas.'
    ],
    comments: []
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'course-taller-presencial-talca',
    title: 'Taller Práctico: Instalación de Sensores & Protecciones en Campo',
    type: 'Taller Presencial',
    price: 'GRATUITO (Cupos Limitados)',
    duration: '1 Jornada (4 Horas)',
    locationOrPlatform: 'Fundo Piloto San Clemente, Talca, Región del Maule',
    coverImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    description: 'Hands-on directo en terreno. Aprende a montar sondas DS18B20, configurar transmisores LoRaWAN y proteger gabinetes mecatrónicos contra intemperie.',
    instructor: 'Paulina Urrutia Maureira (Ingeniera en Automatización)',
    syllabus: [
      'Fundamentos de sensórica de suelo y clima',
      'Soldadura y conexiones a prueba de humedad IP65',
      'Configuración de nodos ESP32 y pruebas de alcance LoRa 915MHz',
      'Diagnóstico en vivo de curvas de desecación hídrica'
    ],
    badge: 'Presencial • Maule',
    dateOrAccess: 'Sábado 12 de Septiembre, 2026 - 09:30 AM'
  },
  {
    id: 'course-webinar-gis-satelite',
    title: 'Webinar Abierto: Teledetección Satelital Sentinel-2 para Parcelas',
    type: 'Webinar Gratuito',
    price: 'GRATUITO (Acceso Abierto)',
    duration: '90 Minutos',
    locationOrPlatform: 'Transmisión Online HD (Zoom / YouTube Live)',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    description: 'Sesión online interactiva sobre cómo interpretar imágenes satelitales gratuitas de la Agencia Espacial Europea para diagnosticar disponibilidad hídrica pre-compra.',
    instructor: 'Daniel Santander Urrutia (Geofísico)',
    syllabus: [
      'Acceso a Copernicus Data Space Ecosystem',
      'Índices de vegetación NDVI y humedad vegetativa NDWI',
      'Identificación de vertientes y zonas de escorrentía en el Maule',
      'Preguntas en vivo y análisis de parcelas de asistentes'
    ],
    badge: 'Webinar Vivo',
    dateOrAccess: 'Jueves 17 de Septiembre, 2026 - 19:00 hrs'
  },
  {
    id: 'course-mecatronica-online',
    title: 'Curso Certificado: Mecatrónica Agrícola & IoT de Campo',
    type: 'Curso Online HD',
    price: '$45.000 CLP / €50',
    duration: '12 Horas de Video + Código + Tutoría',
    locationOrPlatform: 'Plataforma Online Urrutia Edulab',
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'Curso intensivo completo de programación ESP32 en Arduino/PlatformIO, diseño de circuitos en KiCad y conexión MQTT con dashboards web agrícolas.',
    instructor: 'Paulina Urrutia & Daniel Santander',
    syllabus: [
      'Arquitectura de hardware de bajo consumo (Deep Sleep)',
      'Protocolo Modbus RS485 para sondas NPK de suelo',
      'Despliegue de dashboards responsivos de clima',
      'Proyecto final: Estación telemétrica lista para despliegue'
    ],
    badge: 'Certificado HD',
    dateOrAccess: 'Acceso Inmediato de por vida'
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'Jornada de Campo en Colbún con la Red de Custodios de Semillas',
    author: 'Comunidad AgroTech Chile',
    date: '25 de Agosto, 2026',
    category: 'Organización Aliada',
    text: 'Compartimos una jornada increíble de intercambio de semillas nativas y medición de salud de suelo junto a la A.G. de Agricultores Ecológicos del Maule. Instalamos un nodo demostrativo de temperatura de suelo.',
    imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80',
    likes: 42,
    partnerName: 'Red de Custodios de Semillas Nativas'
  },
  {
    id: 'post-2',
    title: 'Taller de Construcción de Trampas de Niebla y Compostaje en Yerbas Buenas',
    author: 'Paulina Urrutia',
    date: '18 de Agosto, 2026',
    category: 'Taller & Encuentro',
    text: '20 familias parceleras de Yerbas Buenas se reunieron en nuestro taller participativo de medición hídrica artesanal y compostaje con inoculación microbiana nativa.',
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=800&q=80',
    likes: 38,
    partnerName: 'Asociación de Pequeños Viñateros del Maule'
  },
  {
    id: 'post-3',
    title: 'Vendimia Tradicional & Monitoreo de Temperatura en Cauquenes',
    author: 'Daniel Santander',
    date: '10 de Agosto, 2026',
    category: 'Historia de Fundo',
    text: 'Acompañamos a productores de cepa País en Cauquenes evaluando la micro-variación térmica entre laderas expuestas al sol y quebradas con bosque nativo.',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    likes: 56,
    partnerName: 'Viñateros Ancestrales del Maule'
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'tier-simpatizante',
    name: 'Socio Simpatizante Campo',
    priceClp: '$5.000',
    priceEur: '€5',
    period: 'mensual',
    description: 'Para personas y entusiastas que desean apoyar la investigación ambiental abierta y la educación rural en el Maule.',
    benefits: [
      'Acceso al grupo privado de Telegram / Discord de la Comunidad',
      'Boletín mensual exclusivo con reportes climáticos del Maule',
      'Descuento del 10% en libros y merchandising oficial',
      'Insignia digital de Custodio del Bosque Maulino'
    ],
    paymentMethods: ['Webpay (Debito/Credito)', 'MercadoPago', 'Pint (Transferencia)'],
    badge: 'Comunitario'
  },
  {
    id: 'tier-cultivador',
    name: 'Socio Cultivador & Parcelero',
    priceClp: '$15.000',
    priceEur: '€16',
    period: 'mensual',
    description: 'Ideal para parceleros y agricultores pequeños que necesitan alertas prioritarias y asesoría técnica directa.',
    benefits: [
      'Canal de Distribución de Alertas VIP por WhatsApp',
      'Acceso a todos los Webinars y Cursos Online sin costo',
      'Asesoría técnica mensual (30 min) sobre sensores o agua',
      '1 Informe Climático Predial Gratuito al año (€80 valor)',
      'Acceso a compras colectivas de insumos mecatrónicos'
    ],
    paymentMethods: ['Webpay', 'MercadoPago', 'Stripe', 'Transferencia BancoEstado'],
    badge: 'Recomendado',
    isPopular: true
  },
  {
    id: 'tier-padrino-esg',
    name: 'Padrino de Biodiversidad & Fundo',
    priceClp: '$45.000',
    priceEur: '€50',
    period: 'mensual',
    description: 'Para empresas, exportadoras o mecenas que financian la conservación de hectáreas de bosque nativo maulino.',
    benefits: [
      'Certificado Oficial de Biodiversidad RewildMapper a su nombre',
      'Monitoreo satelital personalizado de su parcela o fundo',
      'Reconocimiento destacado en todas las publicaciones y libros',
      'Visita guiada VIP a los fundos piloto y talleres de terreno',
      'Pase directo al Consejo Asesor Agroclimático Urrutia'
    ],
    paymentMethods: ['Factura Electrónica B2B', 'Webpay', 'Stripe', 'Transferencia Bancaria'],
    badge: 'Patrocinador ESG'
  }
];

export const EDULAB_GAMES: EdulabGameProduct[] = [
  // --- LÍNEA 1: RAÍCES Y CHIPS ---
  {
    id: 'raices-chip-main',
    lineId: 'raices-chip',
    lineTitle: 'Línea 1: Raíces y Chips',
    lineBadge: 'Sensórica & Heladas IoT',
    type: 'main',
    subproductLabel: 'PRODUCTO PRINCIPAL',
    title: '1. Raíces y Chips: Juego de Cartas IoT',
    tagline: '¡Rescata las frutitas maulinas de las heladas nocturnas!',
    ageRange: '8+ años',
    players: '2 - 5 Jugadores',
    priceClp: '$16.900 CLP',
    description: 'El juego de cartas educativo definitivo sobre mecatrónica rural. Los niños aprenden a colocar sensores ESP32 y activar el riego a tiempo para salvar los cerezos del Maule.',
    kidFeatures: [
      '60 Cartas ilustradas con divertidos sensores y plantas sonrientes',
      'Reglas ágiles de 15 minutos para jugar en familia o el colegio',
      'Aprende sobre heladas por radiación y microclimas jugando'
    ],
    deliverables: [
      'Mazo de 60 cartas barnizadas',
      'Tablero de temperatura del huerto',
      'Guía visual para niños'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular • Producto Base'
  },
  {
    id: 'raices-chip-mini-kit',
    lineId: 'raices-chip',
    lineTitle: 'Línea 1: Raíces y Chips',
    lineBadge: 'Sensórica & Heladas IoT',
    type: 'subproduct',
    subproductLabel: 'ADAPTACIÓN 1 • LABORATORIO',
    title: '1.1 Kit de Mini-Experimentos IoT & Sensores Reales',
    tagline: '¡Construye tu propio sensor anti-heladas con luces y sonidos!',
    ageRange: '9+ años',
    players: '1 - 3 Peques',
    priceClp: '$24.900 CLP',
    description: 'Adaptación práctica en caja con componentes electrónicos reales seguros para niños. Incluye placa de pruebas, sensor de temperatura DS18B20 y luces LED que avisan cuando hace frío.',
    kidFeatures: [
      'Sin soldaduras ni peligros: todo se conecta con cables coloridos',
      'Luces LED que cambian de color (Verde = Bien, Rojo = Alerta Helada)',
      'Manual con cómics ilustrados paso a paso'
    ],
    deliverables: [
      'Micro-placa breadboard y sensor de temperatura real',
      'Módulo LED multicolor y buzzer de sonido',
      'Libro de experimentos impreso'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Adaptación 1 • Experimento'
  },
  {
    id: 'raices-chip-junior',
    lineId: 'raices-chip',
    lineTitle: 'Línea 1: Raíces y Chips',
    lineBadge: 'Sensórica & Heladas IoT',
    type: 'subproduct',
    subproductLabel: 'ADAPTACIÓN 2 • PREESCOLAR',
    title: '1.2 Raíces y Chips Junior: "Semillitas y Sensores"',
    tagline: 'Cartas gigantes ilustradas para los más pequeñitos de la casa',
    ageRange: '4 - 7 años',
    players: '2 - 4 Jugadores',
    priceClp: '$12.900 CLP',
    description: 'Versión adaptada con tarjetas gigantes de cartón grueso para niños de jardín e inicial. Conecta gotitas de agua, rayos de sol y carismáticos robots sensores.',
    kidFeatures: [
      'Cartas extragrande ultra resistentes a caídas y agua',
      'Dinámica de asociación por colores e íconos grandes',
      'Desarrolla la memoria y el cuidado por el medio ambiente'
    ],
    deliverables: [
      '30 Tarjetas gigantes laminadas',
      'Medalla de madera "Pequeño Guardián del Huerto"',
      'Manual para padres y educadoras'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80',
    badge: 'Adaptación 2 • Preescolar'
  },

  // --- LÍNEA 2: GUARDIANES DE LA CUENCA ---
  {
    id: 'guardianes-cuenca-main',
    lineId: 'guardianes-cuenca',
    lineTitle: 'Línea 2: Guardianes de la Cuenca',
    lineBadge: 'Agua & Satélites',
    type: 'main',
    subproductLabel: 'PRODUCTO PRINCIPAL',
    title: '2. Guardianes de la Cuenca: El Río Maule',
    tagline: '¡Conviértete en el héroe del agua y salva el valle del Maule!',
    ageRange: '7+ años',
    players: '2 - 6 Jugadores',
    priceClp: '$18.500 CLP',
    description: 'Juego de tablero cooperativo muy intuitivo para niños. Los jugadores mueven sus fichas por el Río Maule juntando gotitas de agua y activando el satélite Sentinel para detener la sequía.',
    kidFeatures: [
      'Tablero colorido ilustrado del mapa del Maule',
      'Fichas de gotitas de agua de cristal y tarjetas de satélites mágicos',
      'Cooperativo: ¡todos ganan juntos cuidando el agua!'
    ],
    deliverables: [
      'Tablero de juego desplegable 50x50 cm',
      '40 Fichas de agua en acrílico azul',
      'Dado de madera y cartas de misión'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    badge: 'Nuevo • Producto Base'
  },
  {
    id: 'guardianes-cuenca-mapa',
    lineId: 'guardianes-cuenca',
    lineTitle: 'Línea 2: Guardianes de la Cuenca',
    lineBadge: 'Agua & Satélites',
    type: 'subproduct',
    subproductLabel: 'ADAPTACIÓN 1 • CIENCIA Y DIBUJO',
    title: '2.1 Kit de Explorador Hídrico: Mapa Coloreable & Pluviómetro',
    tagline: '¡Mide la lluvia en tu jardín y pinta los ríos del Maule!',
    ageRange: '6+ años',
    players: '1 - 3 Niños / Aula',
    priceClp: '$11.500 CLP',
    description: 'Adaptación científica y artística para niños que aman explorar afuera. Mide cuánta agua cae en el patio con un pluviómetro infantil y pinta el mapa de la cuenca.',
    kidFeatures: [
      'Pluviómetro de tubo irrompible con escala en mm fácil de entender',
      'Poster mapa gigante coloreable con flora y nubes maulinas',
      'Planilla de registro de lluvias diario con pegatinas'
    ],
    deliverables: [
      'Pluviómetro escolar de graduación transparente',
      'Poster mapa para colorear (A2)',
      'Set de 50 pegatinas de satélites y gotas'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    badge: 'Adaptación 1 • Explorador'
  },
  {
    id: 'guardianes-cuenca-expansion',
    lineId: 'guardianes-cuenca',
    lineTitle: 'Línea 2: Guardianes de la Cuenca',
    lineBadge: 'Agua & Satélites',
    type: 'subproduct',
    subproductLabel: 'ADAPTACIÓN 2 • EXPANSIÓN DE JUEGO',
    title: '2.2 Expansión: "Super-Acuíferos y Pozos Mágicos"',
    tagline: '¡Nuevos desafíos submarinos e infiltración de agua para tu tablero!',
    ageRange: '7+ años',
    players: 'Expansión 2 - 6 Jugadores',
    priceClp: '$9.900 CLP',
    description: 'Extensión para el juego principal "Guardianes de la Cuenca". Agrega cartas de acuíferos subterráneos, bombas solares y lluvias relámpago.',
    kidFeatures: [
      'Añade piezas transparentes para recargar napas bajo la tierra',
      'Cartas de poder: "Lluvia de Primavera" y "Bomba Solar de Riego"',
      'Más emoción y estrategia amigable para la familia'
    ],
    deliverables: [
      '25 Cartas de expansión ilustradas',
      '15 Gemas de acuífero transparente',
      'Instrucciones de reglas combinadas'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    badge: 'Adaptación 2 • Expansión'
  },

  // --- LÍNEA 3: REWILDING MAULE ---
  {
    id: 'rewilding-maule-main',
    lineId: 'rewilding-maule',
    lineTitle: 'Línea 3: Rewilding Maule',
    lineBadge: 'Bosque Nativo & Biodiversidad',
    type: 'main',
    subproductLabel: 'PRODUCTO PRINCIPAL',
    title: '3. Rewilding Maule: Código Verde',
    tagline: '¡Planta árboles nativos, cuida los animalitos y gana tu Pasaporte Verde!',
    ageRange: '6+ años',
    players: '2 - 4 Jugadores',
    priceClp: '$17.900 CLP',
    description: 'Juego de aventura natural en el que los niños se convierten en guardabosques. Siembran Boldos y Peumos, protegen al Monito del Monte y restauran la biodiversidad del Maule.',
    kidFeatures: [
      'Fichas de árboles nativos y simpáticos animales del bosque chileno',
      'Dinámica de misiones: ¡crea el corredor de árboles más largo!',
      'Gana sellos para tu Pasaporte Verde de Guardabosques Oficial'
    ],
    deliverables: [
      '40 Fichas de árboles Boldo, Peumo y Roble',
      '20 Tarjetas de fauna silvestre',
      'Pasaportes Verdes de cartón reutilizables'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    badge: 'Nuevo • Producto Base'
  },
  {
    id: 'rewilding-maule-memorice',
    lineId: 'rewilding-maule',
    lineTitle: 'Línea 3: Rewilding Maule',
    lineBadge: 'Bosque Nativo & Biodiversidad',
    type: 'subproduct',
    subproductLabel: 'ADAPTACIÓN 1 • MEMORICE Y FAUNA',
    title: '3.1 Memorice Infantil: "Amigos del Bosque Maulino"',
    tagline: '¡Encuentra las parejas de zorritos, loros y árboles del Maule!',
    ageRange: '3 - 8 años',
    players: '1 - 6 Jugadores',
    priceClp: '$10.900 CLP',
    description: 'Adaptación didáctica en formato de juego de memoria. 40 fichas redondas con ilustraciones a color del Zorro Chilla, Loro Tricahue, Monito del Monte, Boldo y Peumo.',
    kidFeatures: [
      '40 Fichas redondas de cartón ultra duro y ecológico',
      'Ilustraciones tiernas de especies autóctonas del centro de Chile',
      'Desarrolla la concentración y enseña el nombre de las plantas'
    ],
    deliverables: [
      '40 Fichas circulares en caja ilustrada',
      'Guía visual con datos divertidos de los animales'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    badge: 'Adaptación 1 • Memorice'
  },
  {
    id: 'rewilding-maule-figuras',
    lineId: 'rewilding-maule',
    lineTitle: 'Línea 3: Rewilding Maule',
    lineBadge: 'Bosque Nativo & Biodiversidad',
    type: 'subproduct',
    subproductLabel: 'ADAPTACIÓN 2 • FIGURAS 3D Y REFUGIOS',
    title: '3.2 Expansión 3D: "Guardianes de Fauna & Casitas de Pájaro"',
    tagline: '¡Arma tus propias figuras 3D de animales y refugios ecológicos!',
    ageRange: '6+ años',
    players: 'Expansión & Manualidades',
    priceClp: '$13.500 CLP',
    description: 'Adaptación artesanal y 3D: set de piezas encajables impresas localmente en PETG vegetal ecológico. Los niños arman refugios para aves y figuras de fauna maulina.',
    kidFeatures: [
      'Se encaja sin necesidad de tijeras ni pegamento',
      'Hecho con bioplástico respetuoso con el medio ambiente',
      'Sirve como pieza de juego y para decorar el cuarto'
    ],
    deliverables: [
      '12 Piezas 3D encajables de animales y árboles',
      '1 Nido de pajarito armable para jardín',
      'Instrucciones ilustradas'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    badge: 'Adaptación 2 • Figuras 3D'
  }
];


