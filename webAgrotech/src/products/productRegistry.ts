import { ProductDefinition } from './types';
import { PREDIO_MENIELS, PREDIO_EL_BOLDO, PREDIO_QUEBRADA_BOLDOS } from './prediosData';

export const PROVISIONAL_NAMING_DISCLAIMER = {
  notice: 'Convención de Nombres Provisional ("X")',
  description: 'Mientras consolidamos el Naming definitivo de la marca madre, todos los productos y soluciones de AgroTech utilizan provisionalmente el prefijo "X" como marcador temporal de identidad.'
};

export const PRODUCTS_REGISTRY: ProductDefinition[] = [
  // =========================================================================
  // FASE 1 — Ecosistema 100% Software & Micro-SaaS ($0 inventario propio)
  // =========================================================================

  // 1. X AgroAlerta
  {
    id: 'agroalerta',
    name: 'X AgroAlerta',
    tagline: 'Gancho Gratuito WhatsApp/Móvil + Add-ons Pagos (60s)',
    version: '2.1.0',
    status: 'operational',
    category: 'micro-saas-alert',
    phase: 1,
    phaseLabel: 'Fase 1 • Micro-SaaS 100% Software ($0 Inventario)',
    pricingModel: 'Freemium (Gancho Gratis + Add-ons 1-clic)',
    logoUrl: './logo-peumo-quantum.jpg',
    previewImageUrl: './img-agri-hub-farm.jpg',
    architectureRole: 'Puerta de Entrada Móvil & Alertas Críticas',
    techStack: ['WhatsApp Cloud API', 'Node.js', 'GeoJSON', 'Sentinel-2', 'Agromet DGA', 'Stripe/Webpay'],
    description: 'Gancho de entrada gratuito y de cero fricción para agricultores: activa su monitoreo en 60 segundos dibujando su polígono predial por WhatsApp o móvil. Emite alertas tempranas de heladas katabáticas (-1.8 °C), vientos Puelche, estrés hídrico y ventana de pulverización. Desde la misma interfaz móvil desbloquea compras integradas en 1 clic: Informe Predial Express (24h), Pasaporte Verde EUDR y Carpeta Técnica CNR (Ley 18.450).',
    highlights: [
      'Alta en 60 segundos por WhatsApp o móvil dibujando el polígono predial',
      'Alertas predictivas de heladas katabáticas (-1.8 °C) y vientos Puelche',
      'Monitoreo de estrés hídrico y ventanas seguras de pulverización',
      'Add-on 1-clic: Informe Predial Express (diagnóstico satelital en 24h)',
      'Add-on 1-clic: Pasaporte Verde EUDR (cero deforestación con trazabilidad QR)',
      'Add-on 1-clic: Carpeta Técnica CNR (Ley 18.450 de Fomento al Riego)'
    ],
    dataSources: [
      {
        id: 'ds-agroalerta-weather',
        name: 'Red Agrometeorológica DMC / Agromet',
        type: 'weather-api',
        provider: 'Agromet INIA / Dirección Meteorológica de Chile',
        frequency: 'Cada 15 minutos',
        format: 'JSON',
        description: 'Temperaturas mínimas, humedad relativa y velocidad de ráfagas para detección de heladas y eventos Puelche.'
      },
      {
        id: 'ds-agroalerta-sentinel',
        name: 'Vigor Vegetal Sentinel-2 (NDVI / NDRE)',
        type: 'satellite',
        provider: 'Copernicus Sentinel-2 L2A',
        frequency: 'Cada 5 días',
        format: 'GeoJSON',
        description: 'Vigor vegetal y estrés hídrico de canopia a 10m de resolución espacial.'
      }
    ],
    scripts: [
      {
        id: 'scr-agroalerta-bot',
        name: 'Bot WhatsApp AgroAlerta',
        language: 'node',
        purpose: 'Servicio de mensajería automatizada que recibe coordenadas GPS y despacha alertas preventivas.',
        command: 'node services/agroalerta-bot.js --port=3005'
      },
      {
        id: 'scr-generate-express-report',
        name: 'Generador de Informe Predial Express (24h)',
        language: 'python',
        purpose: 'Compilar en PDF el diagnóstico de suelo, NDVI, historial hídrico y riesgo de helada.',
        command: 'python scripts/generate_express_report.py --rol=123-45'
      }
    ],
    rawDatasets: [],
    graphicAssets: [
      {
        id: 'ga-agroalerta-demo',
        name: 'Flujo Móvil AgroAlerta WhatsApp',
        type: 'ui-mockup',
        url: 'https://wa.me/56976696142?text=Hola%20AgroTech,%20quiero%20activar%20X%20AgroAlerta',
        description: 'Interacción directa por chat para enrolar campos y recibir alertas en 60 segundos.'
      }
    ],
    documentationNotes: []
  },

  // 2. X Agua & Riego
  {
    id: 'agua-riego',
    name: 'X Agua & Riego',
    tagline: 'Balance Hídrico FAO-56, Reservas de Tranque & Ahorro Eléctrico',
    version: '1.8.0',
    status: 'operational',
    category: 'water-irrigation',
    phase: 1,
    phaseLabel: 'Fase 1 • Micro-SaaS 100% Software ($0 Inventario)',
    pricingModel: 'SaaS Mensual / Anual',
    logoUrl: './logo-agritwin.png',
    previewImageUrl: './img-agri-hub-farm.jpg',
    architectureRole: 'Optimización Hídrica & Energética',
    techStack: ['FAO-56 Penman-Monteith', 'Python', 'DGA API', 'ERA5-Land', 'Open-Meteo', 'Leaflet'],
    description: 'Motor de balance hídrico y gestión de riego predial. Calcula historial y pronóstico de precipitaciones, balance FAO-56 diario en estratos radiculares, reservas en tranques y microcuenca. Programa turnos de riego aprovechando tarifas eléctricas nocturnas de valle (-32% en la cuenta eléctrica) y cruza el déficit hídrico de biomasa como predictor temprano de riesgo de ignición de incendios.',
    highlights: [
      'Balance hídrico continuo multiestrato bajo formulación FAO-56 Penman-Monteith',
      'Historial pluviométrico multianual y pronóstico de precipitaciones a 14 días',
      'Monitoreo de volumen de acumulación en tranques y caudales de canales DGA',
      'Programación inteligente de riego nocturno para optimizar tarifas eléctricas (horas valle)',
      'Cruce de déficit hídrico de canopia con índice de sequedad de combustible para incendios'
    ],
    dataSources: [
      {
        id: 'ds-agua-fao56',
        name: 'Evapotranspiración de Referencia (ETo) FAO-56',
        type: 'weather-api',
        provider: 'Motor AgroTech / ERA5 Reanalysis',
        frequency: 'Diaria (06:00 AM)',
        format: 'JSON',
        description: 'Cálculo de ETo Penman-Monteith a partir de radiación neta, temperatura, viento y humedad relativa.'
      },
      {
        id: 'ds-agua-dga',
        name: 'Aforos y Caudales de Canales DGA',
        type: 'gis-vector',
        provider: 'Dirección General de Aguas (DGA)',
        frequency: 'Cada 1 hora',
        format: 'JSON',
        description: 'Niveles hidrométricos de ríos y bocatomas en la cuenca del Río Perquilauquén y Loncomilla.'
      }
    ],
    scripts: [
      {
        id: 'scr-water-schedule',
        name: 'Optimizador de Riego Nocturno',
        language: 'python',
        purpose: 'Calcular lámina de reposición y generar calendario de encendido en franja valle eléctrica.',
        command: 'python scripts/optimize_irrigation_schedule.py --predio=meniels'
      }
    ],
    rawDatasets: [],
    graphicAssets: [
      {
        id: 'ga-agua-dashboard',
        name: 'Visor de Balance Hídrico & Reservas',
        type: 'live-app',
        url: '/#predio?view=water',
        description: 'Curvas de recarga de tranque, evapotranspiración real y déficit milimétrico por cuartel.'
      }
    ],
    documentationNotes: []
  },

  // 3. X Incendios
  {
    id: 'incendios',
    name: 'X Incendios',
    tagline: 'Monitoreo Piro-Vórtice WUI, Viento Puelche & Humectación Preventiva',
    version: '1.5.0',
    status: 'operational',
    category: 'wildfire-defense',
    phase: 1,
    phaseLabel: 'Fase 1 • Micro-SaaS 100% Software ($0 Inventario)',
    pricingModel: 'SaaS Estacional / Anual',
    logoUrl: './logo-peumo-quantum.jpg',
    previewImageUrl: './img-agri-hub-farm.jpg',
    architectureRole: 'Defensa Contra Incendios WUI & Simulación',
    techStack: ['Rothermel Wildfire Model', 'MODIS/VIIRS FIRMS', 'WRF Puelche Wind Model', 'Node.js', 'REST API'],
    description: 'Sistema de monitoreo y defensa perimetral contra incendios forestales en la interfaz urbano-agrícola (WUI). Monitorea condiciones críticas 30-30-30 (viento Puelche >30 km/h, T° >30 °C, HR <30%), simula vectores de propagación y frentes de llama, y calcula órdenes de humectación preventiva y líneas de cortafuego. Se integra vía API con bombas y PLCs ya existentes del predio.',
    highlights: [
      'Monitoreo en tiempo real de anomalías térmicas MODIS/VIIRS en un radio de 5 a 25 km',
      'Alerta meteorológica de vientos Puelche descendentes y condición extrema 30-30-30',
      'Simulador de avance de frente de llama y piro-vórtice según pendiente y combustible vegetal',
      'Cálculo de volumen hídrico para cortafuegos húmedos y orden de humectación perimetral',
      'Conexión API/Webhook con sistemas de bombeo y PLCs existentes del productor'
    ],
    dataSources: [
      {
        id: 'ds-incendios-firms',
        name: 'Anomalías Térmicas NASA FIRMS (VIIRS/MODIS)',
        type: 'satellite',
        provider: 'NASA LANCE / FIRMS',
        frequency: 'Cada 3 horas (satélite en órbita)',
        format: 'GeoJSON',
        description: 'Detección satelital de focos activos de calor y potencia radiativa de fuego (FRP) en el Maule.'
      },
      {
        id: 'ds-incendios-puelche',
        name: 'Vectores de Viento Puelche Cordillerano',
        type: 'weather-api',
        provider: 'Simulación WRF Mesoscale AgroTech',
        frequency: 'Cada 1 hora',
        format: 'JSON',
        description: 'Pronóstico de ráfagas secas del este (>45 km/h) con efecto foehn que disparan el riesgo piro-vórtice.'
      }
    ],
    scripts: [
      {
        id: 'scr-fire-spread',
        name: 'Simulador de Propagación Rothermel',
        language: 'python',
        purpose: 'Estimar velocidad de avance de fuego y distancia de pavesas según carga de combustible.',
        command: 'python scripts/sim_fire_spread.py --wind-puelche=35 --slope=15'
      }
    ],
    rawDatasets: [],
    graphicAssets: [
      {
        id: 'ga-incendios-map',
        name: 'Mapa de Riesgo de Incendios WUI',
        type: 'live-app',
        url: '/#predio?view=fire',
        description: 'Mapa de calor con frentes de llama simulados y zonas de cortafuegos preventivo.'
      }
    ],
    documentationNotes: []
  },

  // 4. X Visión & Vuelo
  {
    id: 'vision-vuelo',
    name: 'X Visión & Vuelo',
    tagline: 'Cámaras IP/4G & Drones del Cliente — Analítica y Monitoreo',
    version: '2.0.0',
    status: 'operational',
    category: 'vision-drones',
    phase: 1,
    phaseLabel: 'Fase 1 • Micro-SaaS 100% Software ($0 Inventario)',
    pricingModel: 'SaaS por Flujo / Dispositivo Conectado',
    logoUrl: './logo-agritwin.png',
    previewImageUrl: './img-agri-hub-farm.jpg',
    architectureRole: 'Software de Integración de Video & Teledetección',
    techStack: ['WebRTC / WHEP', 'YOLOv11 Edge AI', 'WebODM', 'MediaMTX', 'FFmpeg', 'Docker'],
    description: 'Plataforma de software que conecta cámaras IP/4G y drones comerciales que el agricultor ya posee. Procesa flujos de video con inteligencia artificial para vigilancia perimetral, monitoreo de compuertas de canal y condición de cultivo. Integra misiones de vuelo para procesar ortomosaicos multiespectrales con cálculo de índices NDVI, NDRE, térmicos y detección de columnas de humo.',
    highlights: [
      'Conexión plug-and-play con cámaras IP, solares 4G y enlaces Starlink vía WebRTC / RTSP',
      'Analítica de video con IA: intrusión perimetral, aforo de canales y fauna silvestre',
      'Pipeline de fotogrametría aérea: genera ortomosaicos 2D/3D a partir de fotos de drones del cliente',
      'Cálculo centimétrico de índices espectrales NDVI, NDRE y mapas térmicos de copa',
      'Detección automática de columnas de humo y anomalías de temperatura en linderos'
    ],
    dataSources: [
      {
        id: 'ds-vision-webrtc',
        name: 'Streaming WebRTC WHEP de Baja Latencia',
        type: 'sensor-iot',
        provider: 'MediaMTX Gateway Rural',
        frequency: 'Streaming On-Demand (<300ms)',
        format: 'Modbus/MQTT',
        description: 'Transmisión de video optimizada para redes celulares agrícolas 4G y Starlink.'
      },
      {
        id: 'ds-drone-ortho',
        name: 'Ortomosaico Multiespectral Aéreo',
        type: 'satellite',
        provider: 'Drones del Cliente + Pipeline WebODM',
        frequency: 'Por campaña de vuelo',
        format: 'GeoTIFF',
        description: 'Capas RGB y NDVI de alta resolución espacial (GSD <3 cm/px) para análisis de canopia.'
      }
    ],
    scripts: [
      {
        id: 'scr-vision-mediamtx',
        name: 'Gateway MediaMTX WebRTC',
        language: 'bash',
        purpose: 'Iniciar el servidor de streaming de ultra baja latencia rural en Docker.',
        command: 'docker run --rm -it -p 8554:8554 -p 8889:8889 bluenviron/mediamtx'
      }
    ],
    rawDatasets: [],
    graphicAssets: [
      {
        id: 'ga-vision-demo',
        name: 'Consola de Visión & Flota de Drones',
        type: 'live-app',
        url: '/#predio?mode=vision',
        description: 'Visor de cámaras en vivo y superposición de ortofotos con índices de vigor vegetal.'
      }
    ],
    documentationNotes: []
  },

  // 5. X AgriTwin Maestro
  {
    id: 'agritwin',
    name: 'X AgriTwin Maestro',
    tagline: 'Administración Predial Avanzada con Sensores Virtuales & Malla 3D AMR',
    version: '2.5.0',
    status: 'operational',
    category: 'digital-twin',
    phase: 1,
    phaseLabel: 'Fase 1 • Micro-SaaS 100% Software ($0 Inventario)',
    pricingModel: 'SaaS Pro / Enterprise Anual',
    logoUrl: './logo-agritwin.png',
    previewImageUrl: './img-agri-hub-farm.jpg',
    architectureRole: 'Núcleo Biofísico & Gemelo Digital 3D',
    techStack: ['Three.js', 'WebGL 2.0', 'Richards-MONICA 1D', 'CesiumJS', 'AMR Mesh', 'WebSockets'],
    description: 'Suite completa de administración predial y simulación física tridimensional. Incorpora Sensores Virtuales con formulación 1D Richards-MONICA que calculan la dinámica de humedad, nitrógeno y raíces sin necesidad de enterrar sondas físicas. Malla topográfica adaptativa AMR 2D/3D, drenaje de aire frío katabático brote a brote y simulador de escenarios What-If para toma de decisiones agroeconómicas.',
    highlights: [
      'Sensores Virtuales de suelo: calicata 1D Richards-MONICA sin costo ni mantenimiento de sondas',
      'Visualización topográfica 3D a resolución métrica con malla adaptativa AMR y sombras dinámicas',
      'Predicción de inversiones térmicas y heladas katabáticas con 72h de anticipación',
      'Simulador de escenarios What-If: cambios en dotación de agua, variedades y eventos climáticos',
      'Consola técnica para agrónomos, administradores de fundo y exportadoras',
      'Datasets reales integrados de Predio Meniels (Parral), Fundo El Boldo y Quebrada de Boldos'
    ],
    dataSources: [
      {
        id: 'ds-agritwin-virtual-sensor',
        name: 'Sensor Virtual Richards-MONICA 1D',
        type: 'soil-db',
        provider: 'Motor Físico Biofísico AgroTech',
        frequency: 'Horario',
        format: 'JSON',
        description: 'Simulación numérica de contenido de agua volumétrico (VWC%) a 20, 40, 60 y 100 cm sin hardware enterrado.',
        endpoint: '/api/virtual-sensors/calicata-1d.json',
        samplePayload: {
          calicataId: 'VIRT-CAL-01',
          depth_20cm_vwc: 32.4,
          depth_40cm_vwc: 35.8,
          depth_60cm_vwc: 38.2,
          depth_100cm_vwc: 41.0,
          root_zone_deficit_mm: 14.2,
          matric_potential_kpa: -42.1,
          mode: 'virtual-sensor-monica'
        }
      },
      {
        id: 'ds-agritwin-dem',
        name: 'Modelo Digital de Elevación (DEM 12.5m)',
        type: 'gis-vector',
        provider: 'NASA SRTM / ALOS PALSAR',
        frequency: 'Estático por predio',
        format: 'GeoJSON',
        description: 'Malla tridimensional de curvas de nivel cada 1 metro para modelado hidrológico y solar.',
        endpoint: '/#predioapi/terrain/elevation-mesh.json'
      },
      {
        id: 'ds-agritwin-katabatic',
        name: 'Simulación Térmica Katabática',
        type: 'weather-api',
        provider: 'Motor Físico AgroTech Chile',
        frequency: 'Actualización cada 1 hora',
        format: 'JSON',
        description: 'Vectores de flujo de aire frío en hondonadas para rescate preventivo de brotes con heladas de radiación.',
        endpoint: '/#predioapi/sim/frost-vector.json'
      }
    ],
    scripts: [
      {
        id: 'scr-agritwin-run',
        name: 'Servidor Local AgriTwin 3D',
        language: 'node',
        purpose: 'Iniciar el servidor HTTP y WebSocket local en el visor correspondiente sin dependencias pesadas.',
        command: 'node agritwin/server.cjs',
        cwd: 'agritwin/'
      },
      {
        id: 'scr-agritwin-frost-sim',
        name: 'Simulador Sintético de Helada Crítica',
        language: 'node',
        purpose: 'Inyectar un frente frío de -1.8°C a las 05:00 AM para probar la activación de asperjadores.',
        command: 'node agritwin/js/sim/SimulationEngine.js --inject-frost=-1.8 --duration=4h'
      }
    ],
    rawDatasets: [
      {
        id: 'raw-parcels-geojson',
        name: 'farm_parcels.geojson (Predio Meniels, Parral)',
        format: 'GeoJSON',
        fileSize: '9.9 KB',
        associatedPredioId: 'predio-meniels',
        description: '8 polígonos georreferenciados con cuarteles agrícolas, tipos de suelo, NDVI y zonas.',
        data: PREDIO_MENIELS.rawGeoJson
      },
      {
        id: 'raw-entities-json',
        name: 'farm_entities.json (Predio Meniels & Sensores)',
        format: 'JSON',
        fileSize: '20.4 KB',
        associatedPredioId: 'predio-meniels',
        description: 'Entidades completas del predio: casa principal, metabolismo solar, leña, agua y nodos IoT.',
        data: PREDIO_MENIELS.rawEntitiesJson
      }
    ],
    graphicAssets: [
      {
        id: 'ga-agritwin-live',
        name: 'AgriTwin 3D WebGL Canvas Vivo',
        type: 'live-app',
        url: '/#predio?mode=3d',
        embeddable: true,
        description: 'Canvas interactivo 3D con topografía real, sombreado solar e hileras de cerezos.'
      }
    ],
    documentationNotes: []
  },

  // 6. X Keyline
  {
    id: 'keyline',
    name: 'X Keyline',
    tagline: 'Diseño Regenerativo Integral & Permacultura desde Cero',
    version: '2.0.0',
    status: 'operational',
    category: 'keyline-design',
    phase: 1,
    phaseLabel: 'Fase 1 • Micro-SaaS 100% Software ($0 Inventario)',
    pricingModel: 'SaaS de Diseño Predial / Proyecto',
    logoUrl: './logo-peumo-quantum.jpg',
    previewImageUrl: './img-agri-hub-farm.jpg',
    architectureRole: 'Diseño Hidrológico & Regenerativo',
    techStack: ['Keyline Design Algorithms', 'QGIS / GDAL', 'CutSheetRX', 'GeoJSON', 'PRV Grazing Sim'],
    description: 'Herramienta de diseño predial regenerativo basada en la Escala de Permanencia de P.A. Yeomans. Permite diseñar campos desde cero o transformar predios convencionales: cálculo de líneas clave (Keyline), curvas a desnivel para siembra de agua, ubicación óptima de tranques y caminos por cresta, generación de planos constructivos CutSheetRX, zonificación permacultural (Zonas 0 a 5) y rotación de pastoreo regenerativo PRV.',
    highlights: [
      'Diseño bajo la Escala de Permanencia de Yeomans (Clima, Topografía, Agua, Caminos, Árboles)',
      'Trazado de líneas clave (Keyline) y surcos a desnivel para infiltración pasiva de lluvias',
      'Cálculo de volumen de tranques en cabecera y cotas de rebalse con vertederos de emergencia',
      'Generación de planos de movimiento de tierra y zanjas de infiltración (CutSheetRX)',
      'Planificador de cercos móviles y módulos de pastoreo regenerativo Voisin (PRV)',
      'Matriz de zonificación permacultural de Zonas 0 a 5 con cálculo metabólico predial'
    ],
    dataSources: [
      {
        id: 'ds-keyline-dem',
        name: 'Curvas de Nivel Métricas de Alta Resolución',
        type: 'gis-vector',
        provider: 'DEM LIDAR / Fotogrametría Aérea',
        frequency: 'Por proyecto de diseño',
        format: 'GeoJSON',
        description: 'Curvas de nivel maestras cada 0.5m para derivar puntos clave (Keypoints) y líneas de inflexión.'
      }
    ],
    scripts: [
      {
        id: 'scr-keyline-cutsheet',
        name: 'Generador de Planos CutSheetRX',
        language: 'python',
        purpose: 'Exportar cotas de corte y relleno para retroexcavadora en construcción de tranques y zanjas.',
        command: 'python scripts/generate_cutsheet_rx.py --project=boldo-keyline'
      }
    ],
    rawDatasets: [
      {
        id: 'raw-keyline-zones',
        name: 'Zonificación Permacultural (Zonas 0 a 5)',
        format: 'JSON',
        fileSize: '14.2 KB',
        associatedPredioId: 'predio-meniels',
        description: 'Matriz de zonificación permacultural con radios de desplazamiento, intensidad energética e insumos.',
        data: {
          zones: [
            { zone: 0, label: 'Zona 0: Núcleo Habitacional & Taller Bioclimático', radius_m: 25 },
            { zone: 1, label: 'Zona 1: Huerta Intensiva, Espiral de Aromáticas y Lombricompost', radius_m: 50 },
            { zone: 2, label: 'Zona 2: Huerto Frutal Mixto, Aves de Corral y Riego por Goteo', radius_m: 120 },
            { zone: 3, label: 'Zona 3: Frutales Mayores, Cultivos Principales y Cortinas Cortaviento', radius_m: 300 },
            { zone: 4, label: 'Zona 4: Silvopastoreo, Maderas Nobles y Pasturas Regenerativas PRV', radius_m: 600 },
            { zone: 5, label: 'Zona 5: Reserva de Bosque Esclerófilo Nativo y Santuario de Quebrada', radius_m: 1200 }
          ]
        }
      }
    ],
    graphicAssets: [
      {
        id: 'ga-keyline-blueprint',
        name: 'Plano Maestro Regenerativo & Keyline',
        type: 'diagram',
        url: '/#predio?view=keyline',
        description: 'Plano con líneas clave, drenajes, tranques y zonificación permacultural.'
      }
    ],
    documentationNotes: []
  },

  // =========================================================================
  // FASE 2 — Upgrade Físico IoT (Solo sobre clientes que ya usan Fase 1)
  // =========================================================================

  // 7. X Kits IoT, Actuadores & Energía Off-Grid
  {
    id: 'iot-hardware',
    name: 'X Kits IoT, Actuadores & Energía Off-Grid',
    tagline: 'Upgrade Físico IoT Bajo Demanda (Solo Clientes Fase 1)',
    version: '2.1.0',
    status: 'operational',
    category: 'iot-hardware',
    phase: 2,
    phaseLabel: 'Fase 2 • Upgrade Físico IoT (Clientes Validados)',
    pricingModel: 'Venta Directa de Equipo / Arriendo Operativo (HaaS)',
    logoUrl: './logo-peumo-quantum.jpg',
    previewImageUrl: './img-agri-hub-farm.jpg',
    architectureRole: 'Infraestructura de Telemetría & Actuación en Campo',
    techStack: ['ESP32-S3', 'LoRaWAN', 'Modbus RS485', 'Sondas FDR 3-Estratos', 'LiFePO4 Solar', 'C++ FreeRTOS'],
    description: 'Capa física de precisión que se despliega únicamente sobre predios que ya operan y confían en el software de Fase 1. Fabricación Just-In-Time ($0 inventario ocioso): estaciones agrometeorológicas solares LiFePO4, sondas FDR capacitivas de 3 profundidades reales (0-20, 20-60, 60-100 cm), controladores LoRaWAN para encendido de bombas y aspersores antihelada, y cámaras solares 4G montadas en terreno.',
    highlights: [
      'Sondas FDR tri-estrato con medición simultánea de humedad volumétrica (VWC%) y conductividad',
      'Alimentación solar fotovoltaica con batería de litio LiFePO4 de 15 días de autonomía sin sol',
      'Controladores inalámbricos LoRaWAN para encendido automático de electroválvulas y bombas',
      'Gabinete estanco IP65 resistente a radiación UV, agroquímicos y ambientes de alta humedad',
      'Instalación y calibración directa en el suelo por técnicos cooperados locales en el Maule',
      'Disponibilidad en venta directa o arriendo operativo (HaaS) con recambio express'
    ],
    dataSources: [
      {
        id: 'ds-kiot-raw-stream',
        name: 'Stream MQTT / LoRaWAN Nodos KioT',
        type: 'sensor-iot',
        provider: 'KioT Telemetry Gateway',
        frequency: 'Cada 60 segundos',
        format: 'JSON',
        description: 'Telemetría de campo transmitida desde el nodo ESP32 hacia el broker Mosquitto en la nube.',
        endpoint: '/ws/kiot/telemetry'
      }
    ],
    scripts: [
      {
        id: 'scr-kiot-flash',
        name: 'Flasheo de Firmware ESP32 KioT',
        language: 'bash',
        purpose: 'Compilar y cargar firmware FreeRTOS en microcontroladores ESP32-S3 con antena LoRaWAN.',
        command: 'pio run --target upload --environment esp32s3_lora'
      }
    ],
    rawDatasets: [
      {
        id: 'raw-bom-matrix',
        name: 'BOM Matrix Hardware KioT (16 Componentes)',
        format: 'JSON',
        fileSize: '4.8 KB',
        associatedPredioId: 'predio-meniels',
        description: 'Lista de materiales con costo de importación, margen bruto y tiempo de ensamble.',
        data: {
          totalCostClp: 44200,
          grossMargin: 0.59,
          assemblyHours: 1.5,
          batteryChemistry: 'LiFePO4 3.2V 6000mAh'
        }
      }
    ],
    graphicAssets: [
      {
        id: 'ga-kiot-photo',
        name: 'Fotografía del Hardware KioT en Terreno',
        type: 'ui-mockup',
        url: './img-agri-hub-farm.jpg',
        description: 'Estación KioT con mástil solar instalada en cuartel de cerezos en Parral.'
      }
    ],
    documentationNotes: []
  },

  // =========================================================================
  // FASE 3 — Servicios Territoriales & Ecosistema (B2G / Impacto)
  // =========================================================================

  // 8. X Territorio, Cuencas & Living Lab
  {
    id: 'territorio-ecosistema',
    name: 'X Territorio, Cuencas & Living Lab',
    tagline: 'Servicios Territoriales, B2G, Cuencas & Validación en Parral',
    version: '1.0.0',
    status: 'operational',
    category: 'territorial-basin',
    phase: 3,
    phaseLabel: 'Fase 3 • Servicios Territoriales & Ecosistema (B2G)',
    pricingModel: 'Contratos B2G / Alianzas de Cuenca / Fondos Públicos',
    logoUrl: './logo-agritwin.png',
    previewImageUrl: './img-agri-hub-farm.jpg',
    architectureRole: 'Inteligencia Territorial & Validación de Terreno',
    techStack: ['QGIS Server', 'PostGIS', 'Sentinel Hub', 'Living Lab Metodology', 'DGA Data Pipelines'],
    description: 'Capa de gobernanza territorial, resiliencia hídrica de cuencas y validación empírica en terreno. Proyectos integrales para municipios, Juntas de Vigilancia de Ríos (JVRL), comités de agua potable rural (APRs) e INDAP. Centro de investigación y demostración empírica en el Living Lab ubicado donde Rudi (Parral), con validación de biopreparados, microbiología de suelo, agroforestería y transferencia técnica.',
    highlights: [
      'Modelado hidrológico de cuenca completa a escala territorial (Maule Sur, 122.070 ha)',
      'Monitoreo de disponibilidad hídrica para Juntas de Vigilancia y Comités APR',
      'Validación empírica agronómica en el Living Lab ubicado donde Rudi (Parral)',
      'Acompañamiento en transición agroecológica, bioinsumos fermentados y salud de suelo',
      'Programas de capacitación técnica y transferencia comunitaria para la agricultura familiar',
      'Postulación a fondos de fomento regional (GORE, CORFO, FIA, CNR Ley 18.450)'
    ],
    dataSources: [
      {
        id: 'ds-territorio-cuenca',
        name: 'Malla Geoespacial Cuenca Maule Sur (122.070 ha)',
        type: 'gis-vector',
        provider: 'AgroTech GIS Lab + DGA + IGM',
        frequency: 'Mensual / Estacional',
        format: 'GeoJSON',
        description: 'Límites hidrográficos, subcuencas, canales matrices, napas freáticas y cobertura vegetal.'
      }
    ],
    scripts: [
      {
        id: 'scr-basin-hydrology',
        name: 'Simulador Hidrológico de Cuenca Territorial',
        language: 'python',
        purpose: 'Modelar escorrentía superficial y balance de recarga de acuíferos ante escenarios climáticos.',
        command: 'python scripts/basin_hydrology_model.py --basin=perquilauquen'
      }
    ],
    rawDatasets: [
      {
        id: 'raw-species-catalog',
        name: 'Especies Esclerófilas del Maule (Flora Nativa)',
        format: 'JSON',
        fileSize: '12.4 KB',
        associatedPredioId: 'predio-meniels',
        description: 'Catálogo de especies nativas del Maule para cortinas cortafuego y enriquecimiento de quebradas.',
        data: {
          species: ['Peumo (Cryptocarya alba)', 'Boldo (Peumus boldus)', 'Quillay (Quillaja saponaria)', 'Espino (Vachellia caven)']
        }
      }
    ],
    graphicAssets: [
      {
        id: 'ga-territorio-map',
        name: 'Cartografía Territorial Maule Sur',
        type: 'map-layer',
        url: '/#predio?mode=regional',
        description: 'Visor cartográfico multiescala de la cuenca con capas de vegetación, canales y áreas de conservación.'
      }
    ],
    documentationNotes: []
  }
];

import obsidianDocsData from '../data/obsidianDocs.json';

export const ALL_DATA_SOURCES = PRODUCTS_REGISTRY.flatMap(p => p.dataSources);
export const ALL_SCRIPTS = PRODUCTS_REGISTRY.flatMap(p => p.scripts);
export const ALL_GRAPHIC_ASSETS = PRODUCTS_REGISTRY.flatMap(p => p.graphicAssets);

// Combine static product notes with all dynamically scanned Obsidian Vault notes (26 notes)
const staticNotes = PRODUCTS_REGISTRY.flatMap(p => p.documentationNotes);
const scannedVaultNotes = (obsidianDocsData?.notes || []).map((n: any) => ({
  id: n.id,
  title: n.title,
  tags: n.tags,
  vaultPath: n.vaultPath,
  summary: n.summary,
  contentMarkdown: n.contentMarkdown,
  wikilinks: n.wikilinks,
  category: n.category
}));

// Eliminar duplicados priorizando notas de vault
const notesMap = new Map();
for (const note of scannedVaultNotes) {
  notesMap.set(note.vaultPath || note.id, note);
}
for (const note of staticNotes) {
  if (!notesMap.has(note.vaultPath || note.id)) {
    notesMap.set(note.vaultPath || note.id, note);
  }
}

export const ALL_DOC_NOTES = Array.from(notesMap.values());
export const VAULT_DOC_METADATA = {
  updatedAt: obsidianDocsData?.updatedAt,
  totalNotes: obsidianDocsData?.totalNotes || ALL_DOC_NOTES.length,
  categories: obsidianDocsData?.categories || {}
};
