import { ProductDefinition } from './types';
import { PREDIO_MENIELS, PREDIO_EL_BOLDO, PREDIO_QUEBRADA_BOLDOS } from './prediosData';

export const PRODUCTS_REGISTRY: ProductDefinition[] = [
  // 1. AGRITWIN 3D
  {
    id: 'agritwin',
    name: 'AgriTwin 3D',
    tagline: 'Gemelo Digital Biofísico & Simulación 3D de Predios',
    version: '2.4.0',
    port: 7773,
    status: 'operational',
    category: 'digital-twin',
    logoUrl: '/logo-agritwin.png',
    architectureRole: 'Suite Predial 3D',
    techStack: ['Three.js', 'CesiumJS', 'WebGL 2.0', 'WebSockets', 'FAO-56 Penman-Monteith', 'Node.js'],
    description: 'Motor 3D desacoplado de alto rendimiento que replica la topografía, exposición solar, hileras de cultivo y telemetría microclimática brote a brote, permitiendo predicción de heladas katabáticas y optimización hídrica.',
    highlights: [
      'Visualización topográfica con curvas de nivel e iluminación solar horaria',
      'Predicción de drenaje de aire frío (heladas katabáticas) con 72h de anticipación',
      'Balance de humedad en 3 estratos de suelo (0-20cm, 20-60cm, 60-100cm) vía FAO-56',
      'Conexión WebSocket sub-50ms con nodos KioT de campo',
      'Generador de Informes de Riesgo (Incendios FWI e Inundaciones), Captura de Carbono (tCO2e/ha) y Certificación Ecológica',
      'Simulador de Transición Permacultural por fases para predio familiar con optimización solar, eólica y eléctrica (-66% kWh)',
      'AgroTwin Regional multiescala (Parral & Retiro) con clasificación satelital LULC (bosques vs monocultivo vs agrícola vs agua)'
    ],
    dataSources: [
      {
        id: 'ds-agritwin-fdr',
        name: 'Telemetría Sondas FDR Multinivel',
        type: 'sensor-iot',
        provider: 'KioT ESP32 S3 LoRaWAN',
        frequency: 'Cada 60 segundos',
        format: 'JSON',
        description: 'Medición de humedad volumétrica de suelo (VWC %) y temperatura en 4 profundidades.',
        endpoint: 'ws://localhost:7773/ws/sensors/fdr',
        samplePayload: {
          sensorId: 'IOT-SN-01',
          vwc_20cm: 38.5,
          vwc_40cm: 41.2,
          vwc_60cm: 44.8,
          vwc_100cm: 48.0,
          soilTemp_c: 19.4,
          ambientTemp_c: 23.8,
          humidity_pct: 56.0,
          battery_pct: 96.0,
          timestamp: '2026-09-25T15:30:00Z'
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
        endpoint: 'http://localhost:7773/api/terrain/elevation-mesh.json'
      },
      {
        id: 'ds-agritwin-katabatic',
        name: 'Simulación Térmica Katabática',
        type: 'weather-api',
        provider: 'Motor Físico AgroTech Chile',
        frequency: 'Actualización cada 1 hora',
        format: 'JSON',
        description: 'Vectores de flujo de aire frío en hondonadas para rescate preventivo de brotes con heladas de radiación.',
        endpoint: 'http://localhost:7773/api/sim/frost-vector.json'
      }
    ],
    scripts: [
      {
        id: 'scr-agritwin-run',
        name: 'Servidor Local AgriTwin 3D',
        language: 'node',
        purpose: 'Iniciar el servidor HTTP y WebSocket local en el puerto 7773 sin dependencias pesadas.',
        command: 'node agritwin/server.cjs',
        cwd: 'agritwin/'
      },
      {
        id: 'scr-agritwin-desktop',
        name: 'Lanzador Desktop macOS AgriTwin',
        language: 'bash',
        purpose: 'Abrir AgriTwin 3D como aplicación de escritorio nativa macOS.',
        command: 'open agritwin/AgriTwin\\ 3D.app || ./agritwin/launch-desktop.command',
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
        name: 'farm_parcels.geojson (Predio Meniels)',
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
        url: 'http://localhost:7773',
        port: 7773,
        embeddable: true,
        description: 'Visor dinámico 3D con Three.js en puerto local 7773.'
      },
      {
        id: 'ga-agritwin-logo',
        name: 'Logo Oficial AgriTwin 3D',
        type: 'vector-logo',
        url: './logo-agritwin.png',
        previewUrl: './logo-agritwin.png',
        description: 'Isotipo y logotipo original de AgriTwin.'
      },
      {
        id: 'ga-agritwin-isotype',
        name: 'Isotipo Hexagonal Quantum',
        type: 'vector-logo',
        url: './logo-agritwin-isotype.png',
        previewUrl: './logo-agritwin-isotype.png',
        description: 'Isotipo simplificado para interfaz gráfica y badges.'
      }
    ],
    documentationNotes: [
      {
        id: 'doc-agritwin-vault',
        title: 'Agritwin.md (Obsidian Vault Note)',
        tags: ['#Startup', '#DigitalTwin', '#Sensores', '#Permacultura'],
        vaultPath: 'Agro Tech/Agritwin.md',
        summary: 'Documento fundacional sobre la integración de datos satelitales, climáticos y de suelo en consola 3D.',
        contentMarkdown: `El software integra [[datos satelitales]], [[datos climáticos]] y [[datos meteorológicos]], [[geología]] y [[data del suelo]] disponible en repositorios junto a [[data in situ]] provenientes de (o simplemente llamados) [[sensores]]. Genera una [[consola de monitoreo]], [[operaciones]], mapas de [[riesgo climático]] y a partir de ello [[recomendaciones]] en tiempo real basado en la [[Permacultura]] y [[agroecología]]. Junto a la información que proviene desde la App, servicios como la suscripción al Agritwin llevan un acompañamiento llevado por profesionales.

La StartUp se enfoca en el desarrollo de aquel [[Agritwin]] y su incorporación como producto al mercado Chileno e internacional.

[[AgroTech]] y su producto [[AgriTwin]] se produce colaborativamente en equipo, en un espacio donde se reconoce la autoría intelectual, la repartición justa de los recursos y ganancias basado en la colaboratividad a la vez que métricas de producción. El tiempo y energía invertida de cada uno de esos miembros busca ser valorado y enfatizado.`,
        wikilinks: ['datos satelitales', 'datos climáticos', 'sensores', 'consola de monitoreo', 'riesgo climático', 'Permacultura', 'AgroTech']
      }
    ]
  },

  // 2. REWILD SUITE & REWILDMAPPER
  {
    id: 'rewild',
    name: 'Rewild Suite & RewildMapper',
    tagline: 'Biomonitoreo Esclerófilo, PWA Offline & BioToken PBC',
    version: '1.8.2',
    port: 7772,
    status: 'operational',
    category: 'biomonitoring',
    logoUrl: '/logo-rewild.png',
    architectureRole: 'Suite PWA Campo',
    techStack: ['Python 3 HTTP', 'Service Worker PWA', 'IndexedDB', 'Turf.js GIS', 'IPCC Tier 2 Protocols'],
    description: 'Suite de campo 100% offline para guardaparques, agrónomos y técnicos de conservación. Permite auditar parcelas en quebradas sin cobertura celular, inventariar árboles nativos y emitir Certificados de Biodiversidad Vegetal (PBC).',
    highlights: [
      'Operación 100% offline en quebradas y cerros maulinos mediante Service Worker e IndexedDB',
      'GoWild Survey: Formulario rápido de terreno georreferenciado con cámara y GPS móvil',
      'Protocolos IPCC Tier-2 para cálculo de biomasa y captura de carbono en bosque nativo',
      'RewildMapper SaaS: Emisión de certificados BioToken PBC auditables'
    ],
    dataSources: [
      {
        id: 'ds-rewild-survey',
        name: 'Auditorías de Terreno GoWild Survey',
        type: 'field-audit',
        provider: 'Técnicos & Guardaparques Locales',
        frequency: 'Por campaña de muestreo',
        format: 'JSON',
        description: 'Registros florísticos con altura de dosel, diámetro a la altura del pecho (DAP) y vigor de rebrotes.',
        endpoint: 'http://localhost:7772/api/surveys/active',
        samplePayload: {
          surveyId: 'GOWILD-2026-09',
          polygonId: 'R301-BOLDO-MADURO',
          speciesIdentified: ['Cryptocarya alba (Peumo)', 'Peumus boldus (Boldo)', 'Quillaja saponaria (Quillay)'],
          canopyCoverPct: 84.5,
          biomassTonsPerHa: 142.3,
          offlineSyncStatus: 'synced_to_local_db',
          recordedBy: 'Guardaparque Daniel S.'
        }
      },
      {
        id: 'ds-rewild-sentinel-defor',
        name: 'Monitoreo de Cobertura Vegetal Sentinel-2',
        type: 'satellite',
        provider: 'ESA Copernicus L2A',
        frequency: 'Cada 5 días',
        format: 'GeoTIFF',
        description: 'Detección temprana de talas ilegales, estrés hídrico en quebradas y avance de regeneración.'
      }
    ],
    scripts: [
      {
        id: 'scr-rewild-server',
        name: 'Servidor Python Local Rewild',
        language: 'python',
        purpose: 'Servir la aplicación PWA y sincronizar datos en el puerto 7772.',
        command: 'python3 rewild/server.py',
        cwd: 'rewild/'
      },
      {
        id: 'scr-rewild-sync',
        name: 'Sincronizador IndexedDB a PostgreSQL/GIS',
        language: 'node',
        purpose: 'Tomar encuestas guardadas localmente en móviles y cargarlas a la base territorial central.',
        command: 'node scripts/sync-rewild-surveys.cjs --target=central-gis'
      }
    ],
    rawDatasets: [
      {
        id: 'raw-species-catalog',
        name: 'Especies Esclerófilas del Maule (Flora Nativa)',
        format: 'JSON',
        fileSize: '4.8 KB',
        associatedPredioId: 'predio-quebrada-boldos',
        description: 'Catálogo taxonómico con constantes alométricas de peumo, boldo, quillay, litre y maitén.',
        data: {
          region: "Maule Central & Cordillera de la Costa",
          dominantSpecies: [
            { scientificName: "Cryptocarya alba", commonName: "Peumo", carbonFactor: 0.52, waterResistance: "Alta" },
            { scientificName: "Peumus boldus", commonName: "Boldo", carbonFactor: 0.49, waterResistance: "Muy Alta" },
            { scientificName: "Quillaja saponaria", commonName: "Quillay", carbonFactor: 0.54, waterResistance: "Extrema" }
          ]
        }
      },
      {
        id: 'raw-pbc-tokens-ledger',
        name: 'Libro de Unidades de Biodiversidad (PBC Ledger)',
        format: 'JSON',
        fileSize: '6.2 KB',
        associatedPredioId: 'predio-quebrada-boldos',
        description: 'Registro auditable de certificados de biodiversidad emitidos en Quebrada Los Boldos.',
        data: PREDIO_QUEBRADA_BOLDOS.rawEntitiesJson
      }
    ],
    graphicAssets: [
      {
        id: 'ga-rewild-live',
        name: 'Rewilding Field Suite (Puerto 7772)',
        type: 'live-app',
        url: 'http://localhost:7772/rewilding-field-suite.html',
        port: 7772,
        embeddable: true,
        description: 'Suite completa de auditoría de bosque esclerófilo con guardado de borradores.'
      },
      {
        id: 'ga-gowild-survey',
        name: 'GoWild Survey PWA Móvil',
        type: 'live-app',
        url: 'http://localhost:7772/gowild-survey.html',
        port: 7772,
        embeddable: true,
        description: 'Formulario ultra-rápido de terreno para celular o tablet.'
      },
      {
        id: 'ga-rewild-logo',
        name: 'Logo Oficial Rewild Suite',
        type: 'vector-logo',
        url: './logo-rewild.png',
        previewUrl: './logo-rewild.png',
        description: 'Logotipo de la suite ecológica y biomonitoreo.'
      }
    ],
    documentationNotes: [
      {
        id: 'doc-rewild-methodology',
        title: 'Metodología BioToken PBC & Protocolo IPCC',
        tags: ['#Rewilding', '#Carbono', '#ESG', '#Biodiversidad'],
        summary: 'Cómo se calculan las unidades de biodiversidad vegetal nativa y la biomasa de carbono en el Maule.',
        contentMarkdown: `### Protocolo de Certificación RewildMapper (PBC)
1. **Delimitación de Rodal**: Mediante GPS submétrico o Sentinel-2 B08/B04.
2. **Parcelas de Muestreo de 500m²**: Cuantificación de estratos arbóreos, arbustivos y sotobosque.
3. **Ecuaciones Alométricas Específicas**: Aplicadas a la flora esclerófila maulina sin usar modelos genéricos de pino o eucalipto.
4. **Emisión de Certificados PBC**: Cada unidad equivale a 1.000 m² de bosque nativo con densidad biológica garantizada por 10 años.`
      }
    ]
  },

  // 3. KIOT HARDWARE & AUTOMATION EDGE
  {
    id: 'kiot-hardware',
    name: 'KioT Sensores & Hardware Edge',
    tagline: 'Nodos de Campo IP65 Plug-and-Play con ESP32 & LoRaWAN',
    version: '3.1.0',
    status: 'deployed',
    category: 'iot-hardware',
    logoUrl: '/kiot-hardware.png',
    architectureRole: 'Módulo Edge IoT',
    techStack: ['ESP32 Dual Core', 'LoRaWAN EU868/US915', 'Modbus RS-485', 'KiCAD', 'C++ / FreeRTOS', 'MQTT'],
    description: 'Hardware mecatrónico diseñado y fabricado para resistir las condiciones extremas del Maule (polvo, lluvia torrencial, heladas de -5°C). Monitorea temperatura de brote, humedad de suelo y comanda electroválvulas de riego.',
    highlights: [
      'Gabinete estanco IP65 resistente a radiación UV y lluvia torrencial maulina',
      'Sonda de temperatura digital DS18B20 con precisión de ±0.5°C para detección instantánea de congelamiento',
      'Sensor capacitivo V1.2 anticorrosión con lectura análoga calibrada',
      'Batería LiFePO4 de 2600mAh con panel solar policristalino de 3W (autonomía 100% infinita)'
    ],
    dataSources: [
      {
        id: 'ds-kiot-raw-stream',
        name: 'Stream MQTT / LoRaWAN Nodos KioT',
        type: 'sensor-iot',
        provider: 'KioT Gateway Maule',
        frequency: 'Cada 60 segundos',
        format: 'JSON',
        description: 'Trama binaria desempaquetada desde gateway LoRaWAN hacia backend central.',
        endpoint: 'mqtt://broker.agrotech.cl:1883/maule/predios/meniels/sensors',
        samplePayload: {
          nodeId: 'KIOT-NODE-03',
          batteryMv: 3950,
          solarMv: 5120,
          tempDS18B20: -0.2,
          ambientSHT31Temp: 0.8,
          ambientSHT31Hum: 89.2,
          soilVWC_Pct: 34.1,
          frostAlertActive: true,
          rssi: -94,
          snr: 8.5
        }
      }
    ],
    scripts: [
      {
        id: 'scr-kiot-flash',
        name: 'Flasheo de Firmware ESP32 KioT',
        language: 'bash',
        purpose: 'Cargar el firmware base de telemetría y bajo consumo energético (Deep Sleep) al ESP32.',
        command: 'esptool.py --chip esp32 --port /dev/tty.usbserial-* write_flash 0x1000 firmware/kiot_v3.bin'
      },
      {
        id: 'scr-kiot-sim-telemetry',
        name: 'Simulador de Telemetría KioT en Terminal',
        language: 'node',
        purpose: 'Emitir lecturas de sensores simuladas para pruebas sin hardware físico conectado.',
        command: 'node scripts/simulate_kiot_nodes.js --nodes=6 --interval=5s'
      }
    ],
    rawDatasets: [
      {
        id: 'raw-bom-matrix',
        name: 'BOM Matrix Hardware KioT (16 Componentes)',
        format: 'JSON',
        fileSize: '8.4 KB',
        description: 'Lista de materiales con especificaciones técnicas, precios en CLP y proveedores.',
        data: {
          totalCostPerNodeClp: 38500,
          currency: "CLP",
          componentsCount: 16,
          coreComponents: [
            { component: "ESP32-WROOM-32", cost: 5500, role: "Procesamiento dual-core & WiFi/LoRa" },
            { component: "Sonda DS18B20 IP68", cost: 3200, role: "Temperatura antiheladas de brote" },
            { component: "Panel Solar 6V 3W + TP4056", cost: 7500, role: "Autonomía solar infinita" },
            { component: "Gabinete Estanco IP65 PETG", cost: 4500, role: "Protección ambiental" }
          ]
        }
      }
    ],
    graphicAssets: [
      {
        id: 'ga-kiot-photo',
        name: 'Fotografía del Hardware KioT en Terreno',
        type: 'ui-mockup',
        url: './kiot-hardware.png',
        previewUrl: './kiot-hardware.png',
        description: 'Nodo físico KioT con sensor de suelo, panel solar y gabinete montado en estaca.'
      }
    ],
    documentationNotes: [
      {
        id: 'doc-kiot-pinout',
        title: 'Esquemático de Conexión & Pines ESP32',
        tags: ['#Hardware', '#ESP32', '#IoT', '#AntiHeladas'],
        summary: 'Pinout oficial de conexión para sensores DS18B20, SHT31, relés de electroválvula y panel solar.',
        contentMarkdown: `### Configuración de Pines ESP32 KioT Rev 3
* **GPIO 4**: OneWire Data (DS18B20 Temp Sonda con resistencia pull-up 4.7kΩ)
* **GPIO 21 (SDA) / GPIO 22 (SCL)**: Bus I2C para sensor digital SHT31 / BMP280
* **GPIO 34 (ADC1_CH6)**: Entrada analógica para sensor de humedad capacitivo V1.2
* **GPIO 18**: Salida digital Relé 1 (Apertura electroválvula de riego 12V)
* **GPIO 19**: Salida digital Relé 2 (Buzzer de alarma local anti-heladas 110dB)
* **GPIO 35**: Divisor resistivo 100k/100k para monitoreo del voltaje de batería Li-ion`
      }
    ]
  },

  // 4. SATELLITES & VISOR PREDIAL / PASAPORTE VERDE
  {
    id: 'satellites',
    name: 'Inteligencia Satelital & Pasaporte Verde',
    tagline: 'Copernicus Sentinel-2, Análisis Espectral & Certificación UE',
    version: '2.0.1',
    status: 'deployed',
    category: 'earth-observation',
    logoUrl: '/logo-terra-radar.jpg',
    architectureRole: 'Núcleo Satelital',
    techStack: ['Sentinel-2 MSI', 'Landsat 9', 'Google Earth Engine API', 'Rasterio', 'QR Blockchain Pasaporte'],
    description: 'Sistema centralizado de análisis multiespectral para predios agrícolas. Procesa reflectancia de bandas para calcular vigor vegetal (NDVI), contenido de agua en follaje (NDWI) y genera el Pasaporte Verde de exportación europea.',
    highlights: [
      'Resolución de 10 metros por píxel con revisión periódica cada 5 días',
      'Pasaporte Verde QR impreso en pallets de fruta para supermercados de Alemania y Europa',
      'Diagnóstico de riesgo agroclimático a 10 años para compradores de parcelas',
      'Cálculo de estrés hídrico CWSI para calibración de turnos de riego'
    ],
    dataSources: [
      {
        id: 'ds-sentinel-bands',
        name: 'Bandas Multiespectrales Sentinel-2 L2A',
        type: 'satellite',
        provider: 'Agencia Espacial Europea (ESA)',
        frequency: 'Cada 5 días',
        format: 'GeoTIFF',
        description: 'Imágenes corregidas atmosféricamente a nivel de reflectancia de fondo (BOA).'
      },
      {
        id: 'ds-agromet-dga',
        name: 'Red Meteorológica Nacional Agromet / DGA',
        type: 'weather-api',
        provider: 'Dirección General de Aguas & INIA Chile',
        frequency: 'Cada 15 minutos',
        format: 'JSON',
        description: 'Estaciones meteorológicas oficiales de referencia en Curicó, Talca, Linares y Parral.',
        endpoint: 'https://api.agromet.cl/v1/stations/parral/latest'
      }
    ],
    scripts: [
      {
        id: 'scr-fetch-sentinel',
        name: 'Extractor de Mosaicos Sentinel-2 por Bounding Box',
        language: 'python',
        purpose: 'Descargar las bandas 4, 8 y 11 para un polígono predial específico y generar el mapa NDVI geotiff.',
        command: 'python3 scripts/fetch_sentinel2_predio.py --predio=predio-meniels --cloud-max=10'
      },
      {
        id: 'scr-generate-passport-qr',
        name: 'Generador de Pasaporte Verde QR',
        language: 'node',
        purpose: 'Compilar métricas de huella hídrica y carbono para generar el código QR dinámico del pallet.',
        command: 'node scripts/generate_green_passport.cjs --lot=PALLET-2026-CHERRY-01'
      }
    ],
    rawDatasets: [
      {
        id: 'raw-spectral-indices',
        name: 'Tabla de Índices Espectrales por Cuartel',
        format: 'JSON',
        fileSize: '5.2 KB',
        associatedPredioId: 'predio-meniels',
        description: 'NDVI, NDWI, EVI y CWSI calculados para los 8 cuarteles de Meniels en el último pase satelital.',
        data: {
          satellite: "Sentinel-2B",
          passDate: "2026-09-22T14:42:10Z",
          cloudCover: "0.2%",
          cuarteles: [
            { id: "A101", ndvi: 0.76, ndwi: 0.32, cwsi: 0.22, status: "Vigor Óptimo" },
            { id: "A102", ndvi: 0.65, ndwi: 0.28, cwsi: 0.29, status: "Normal" },
            { id: "A103", ndvi: 0.82, ndwi: 0.41, cwsi: 0.18, status: "Alto Vigor" },
            { id: "A104", ndvi: 0.88, ndwi: 0.46, cwsi: 0.12, status: "Nativo Denso" }
          ]
        }
      }
    ],
    graphicAssets: [
      {
        id: 'ga-satellites-visor',
        name: 'Cartografía & Informes de Riesgo Satelital AgroTech',
        type: 'map-layer',
        url: '#gis-demo',
        previewUrl: './rewildmapper-gis.png',
        description: 'Capa interactiva de diagnóstico con paleta NDVI / Térmico / Heladas / Agua.'
      },
      {
        id: 'ga-terra-logo',
        name: 'Logo Terra Radar Satelital',
        type: 'vector-logo',
        url: './logo-terra-radar.jpg',
        previewUrl: './logo-terra-radar.jpg',
        description: 'Isotipo de la división de observación terrestre.'
      }
    ],
    documentationNotes: [
      {
        id: 'doc-green-passport-spec',
        title: 'Especificación Pasaporte Verde para Exportación UE',
        tags: ['#Exportación', '#PasaporteVerde', '#EUDR', '#ESG'],
        summary: 'Requisitos de la normativa europea de debida diligencia de sostenibilidad (EUDR) cumplidos por AgroTech.',
        contentMarkdown: `### Pasaporte Verde de Exportación AgroTech
* **Geolocalización Inalterable**: Polígono geográfico del predio vinculado al código de trazabilidad del lote exportado.
* **Declaración Cero Deforestación (EUDR)**: Verificación histórica satelital demostrando que no hubo tala de bosque nativo post 31/12/2020.
* **Huella Hídrica Auditada**: Medición cruzada entre sensores de caudalímetro KioT y evapotranspiración de cultivo.`
      }
    ]
  },

  // 5. PERMACULTURA & URRUTIA EDULAB
  {
    id: 'permaculture-edulab',
    name: 'Permacultura & Urrutia Edulab',
    tagline: 'Principios Regenerativos, Economía de los Hombros & Juegos Educativos',
    version: '1.2.0',
    status: 'operational',
    category: 'permaculture-edulab',
    logoUrl: '/logo-peumo-quantum.jpg',
    architectureRole: 'División Edulab',
    techStack: ['Diseño Keyline', 'Zonificación 0-5', 'Biomimética', 'Lúdica Educativa', 'Gobernanza Cooperativa'],
    description: 'El corazón conceptual y ético de AgroTech Chile. Asesorado por Julio Pérez, traduce los principios de la permacultura y la agroecología en arquitectura de software, infraestructura de agua y el juego de cartas "Raíces y Chips".',
    highlights: [
      'Zonificación permacultural de los predios (Zonas 0 a 5) aplicada al despliegue de sensores',
      'Diseño hidrológico en contorno (Keyline) y cosecha de aguas lluvias en tranques de infiltración',
      'Economía de los Hombros: Sostenibilidad distribuida y reconocimiento de la autoría de cada miembro',
      'Juego de mesa educativo "Raíces y Chips" para colegios y comunidades agrícolas'
    ],
    dataSources: [
      {
        id: 'ds-permaculture-metabolism',
        name: 'Matriz Metabólica Predial de Meniels',
        type: 'soil-db',
        provider: 'Urrutia Edulab & Permacultura Team',
        frequency: 'Mensual',
        format: 'JSON',
        description: 'Balance integrado de kilocalorías, kilovatios-hora, biomasa de leña y metros cúbicos de agua.',
        samplePayload: PREDIO_MENIELS.metabolism
      }
    ],
    scripts: [
      {
        id: 'scr-rainwater-calc',
        name: 'Calculadora de Cosecha de Aguas Lluvias',
        language: 'python',
        purpose: 'Calcular los litros anuales recolectables en techumbres y zanjas de infiltración según pluviometría maulina.',
        command: 'python3 scripts/permaculture_water_balance.py --roof-m2=180 --annual-rain-mm=750'
      }
    ],
    rawDatasets: [
      {
        id: 'raw-permaculture-zones',
        name: 'Zonificación Permacultural Predial (Zonas 0 a 5)',
        format: 'YAML',
        fileSize: '3.1 KB',
        associatedPredioId: 'predio-meniels',
        description: 'Criterios de zonificación energética para la ubicación de sensores, huertos y bosque nativo.',
        data: {
          zona0: "Hogar, metabolismo familiar y control central",
          zona1: "Huerto biointensivo, compost, germinadores y sensores de alta frecuencia",
          zona2: "Frutales menores, aves de corral y riego por goteo",
          zona3: "Cereales extensivos, viñedo patrimonial y pasturas",
          zona4: "Silvopastoreo, cosecha forestal sustentable y tranque",
          zona5: "Reserva silvestre intocada, quebradas y monitoreo con Rewild"
        }
      }
    ],
    graphicAssets: [
      {
        id: 'ga-peumo-quantum-logo',
        name: 'Logo AgroTech Chile Peumo Quantum',
        type: 'vector-logo',
        url: './logo-peumo-quantum.jpg',
        previewUrl: './logo-peumo-quantum.jpg',
        description: 'Emblema cuántico de la hoja de peumo y la matriz mecatrónica.'
      },
      {
        id: 'ga-cyber-pampa-logo',
        name: 'Emblema Cyber Pampa',
        type: 'vector-logo',
        url: './logo-cyber-pampa.png',
        previewUrl: './logo-cyber-pampa.png',
        description: 'Arte conceptual de la integración de tecnología y campo.'
      }
    ],
    documentationNotes: [
      {
        id: 'doc-agrotech-vault',
        title: 'AGROTECH.md (Obsidian Vault Note)',
        tags: ['#Startup', '#SpA', '#Cooperativa', '#Permacultura', '#ArbolPiramide', '#EconomiaDeLosHombros'],
        vaultPath: 'Agro Tech/AGROTECH.md',
        summary: 'Manifiesto institucional de AgroTech como startup SpA y Cooperativa de Trabajo con estructura de Árbol Pirámide.',
        contentMarkdown: `# 🌿 [[AGROTECH]] • Ecosistema Tecnológico & Regenerativo Integral

> **Tesis Central**: [[AGROTECH]] es una #Startup de base tecnológica y ecológica estructurada como **SpA (Sociedad por Acciones)** y **Cooperativa de Trabajo**. Se dedica a la [[integración de sistemas]] agrícolas, la [[optimización de procesos]] biológicos y la resiliencia climática mediante el cruce de **datos satelitales**, **telemetría microclimática in situ** y un análisis de [[ingeniería]] sistémica fundado en los principios de la [[Permacultura]] y la [[agroecología]].

## 🏛️ Gobernanza Dual & Modelo del "Árbol Pirámide"
* **Núcleo**: En lo **Económico** y en la **Naturaleza** (Bioeconomía regenerativa).
* **3 Pilares (Áreas Asociadas a Productos)**:
  1. **🌿 Pilar Social (Líder: Wladimir)**: Producto principal = [[Pasaporte verde]]. Establece economías locales, infraestructura para la venta justa, y conexión con la sociedad mediante cursos, seminarios, foros, congresos y comités de agua potable rural ([[APRs]]).
  2. **💻 Pilar Digital (Líderes: Daniel con Pablo y Paulina)**: Producto principal = [[Agritwin]] / [[DigitalTwin]] 3D. Modelación biofísica, telemetría y software.
  3. **⚙️ Pilar Técnico (Líderes: Paulina con Pablo)**: Producto principal = **Implementación de Kits de Cultivo y Ganado**. Sensórica KioT, calibración en campo y redes LoRaWAN.
* **Áreas Transversales**:
  * **Finanzas**: Wladimir & Pablo.
  * **Comunicaciones**: Daniel & Wladimir.

## 👥 Socios SpA (Sistema Mixto Capital + Sweat Equity)
* **Daniel Santander**: Fundador • Dirección General & Arquitectura AgriTwin. Autoría moral protegida con usufructo comercial exclusivo licenciado a la SpA.
* **Paulina (Prima)**: Técnico & Digital • Manufactura local en Talca y pruebas de terreno.
* **Wladimir**: Finanzas & Social • Modelo económico, Pasaporte Verde y vinculación comunitaria.
* **Pablo**: Finanzas, Técnico & Digital • Modelación financiera, desarrollo de software y kits.

## 🐝 Cooperativa de Trabajo (Red de Asociados)
* **Luis González**: Empresa de Drones, Fotogrametría Aérea, Sensores Multiespectrales y Cámaras Térmicas.
* **Dra. Camila Morales**: Edafología y Microbiología de Suelo Vivo.
* **Matías Riquelme**: Asesoría Jurídica en Derecho Cooperativo y Aguas.
* **Ignacia Valenzuela**: Alianzas Campesinas y Ferias INDAP.`,
        wikilinks: ['AGROTECH', 'integración de sistemas', 'optimización de procesos', 'Permacultura', 'ordenamiento territorial', 'consultoría', 'IoE', 'Pasaporte verde', 'juegos', 'infraestructura social', 'ecológica', 'agroecología', 'Economía de los Hombros', 'desarrollo sostenido', 'DigitalTwin', 'Agritwin', 'predios agrícolas', 'Estructura Corporativa y Gobernanza SpA Cooperativa']
      },
      {
        id: 'doc-gobernanza-spa-coop',
        title: 'Estructura Corporativa y Gobernanza SpA y Cooperativa.md',
        tags: ['#Gobernanza', '#SpA', '#Cooperativa', '#ArbolPiramide', '#SweatEquity', '#Vesting', '#PropiedadIntelectual'],
        vaultPath: 'Agro Tech/Estructura Corporativa y Gobernanza SpA Cooperativa.md',
        summary: 'Detalle de la estructura dual SpA + Cooperativa de Trabajo, pacto de socios, vesting de sweat equity y usufructo del AgriTwin.',
        contentMarkdown: `# 🏛️ Estructura Corporativa & Gobernanza Dual: SpA y Cooperativa de Trabajo

## 🌲 1. Modelo del "Árbol Pirámide"
* **Raíz**: Leyes biofísicas de la Naturaleza y Permacultura.
* **Tronco / Núcleo**: Bioeconomía Regenerativa y Flujo de Caja Ético.
* **3 Pilares**: Social (Pasaporte Verde), Digital (AgriTwin 3D), Técnico (Implementación de Kits KioT).
* **Transversales**: Finanzas y Comunicaciones.

## 👥 2. Socios SpA y Modalidad Mixta
1. **Daniel Santander**: Dirección General, autoría moral de AgriTwin.
2. **Paulina**: Pilar Técnico y Digital (Laboratorio en Talca).
3. **Wladimir**: Finanzas y Pilar Social (Estructuración y Alianzas).
4. **Pablo**: Finanzas, Técnico y Digital (Algoritmos y Hardware).

## 🐝 3. Cooperativa de Trabajo (Miembros Asociados)
* **Luis González**: Titular de empresa de drones, fotogrametría aérea, cámaras térmicas y sensores multiespectrales.
* Red abierta para que prestadores de servicios agrícolas participen de la arquitectura tecnológica y los excedentes cooperativos.

## ⚖️ 4. Recomendaciones Jurídicas & Vesting
* **Vesting de Sweat Equity**: 24-36 meses con Cliff de 6 meses para consolidar acciones en base a hitos de entregables.
* **Propiedad Intelectual de AgriTwin**: Autoría moral inalienable de Daniel con Licencia Exclusiva de Explotación y Usufructo Comercial a favor de la SpA, sujeta a cláusula de reversión.`,
        wikilinks: ['AGROTECH', 'Agritwin', 'Pasaporte verde', 'Permacultura', 'KioT Hardware']
      },
      {
        id: 'doc-permacultura-vault',
        title: 'Permacultura.md (Obsidian Vault Note)',
        tags: ['#Permacultura', '#Asesoria', '#DisenoRegenerativo'],
        vaultPath: 'Agro Tech/Permacultura.md',
        summary: 'Participación de Julio Pérez en el diseño permacultural de la Start Up.',
        contentMarkdown: `En la sección de Permacultura, se encuentra Julio Pérez quien presta asesoría para la implementación del diseño de la Start Up de tal manera que esta refleje los principios de la [[Permacultura]].`,
        wikilinks: ['Permacultura']
      }
    ]
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

