import { PredioProfile } from './types';

// Predio 1: Predio Meniels (Parral, Maule) - Sincronizado con AgriTwin 3D & GeoJSON real
export const PREDIO_MENIELS: PredioProfile = {
  id: 'predio-meniels',
  name: 'Predio Agroecológico Meniels',
  alias: 'Meniels Parral',
  commune: 'Parral',
  region: 'Región del Maule, Chile',
  coordinates: { lat: -36.14, lng: -71.82 },
  totalAreaHa: 24.8,
  agriculturalZones: ['Zona 1 - Huerto Biointensivo', 'Zona 2 - Frutales Menores', 'Zona 3 - Cereales & Cobertura', 'Zona 4 - Silvopastoreo', 'Zona 5 - Reserva & Quebrada'],
  mainCrops: ['Trigo Candeal', 'Avena', 'Avellano Europeo', 'Viña País Patrimonial', 'Hortalizas Regenerativas', 'Bosque Esclerófilo'],
  weatherForecast: {
    minTemp: 1.2,
    maxTemp: 22.4,
    frostRisk: 'Moderado',
    windSpeedKmh: 14.5,
    cwsiIndex: 0.28
  },
  metabolism: {
    propertyName: 'Meniels',
    locationRegion: 'Parral, Región del Maule, Chile',
    coordinatesLabel: '36.14°S, 71.82°O',
    houseSizeM2: 180,
    occupants: 4,
    solarPanels: {
      model: 'Mono-PERC 550W Tier 1 Bifacial',
      quantity: 18,
      capacityKwp: 9.9,
      monthlyGenKwh: 1380
    },
    heating: {
      type: 'Estufa Bosca Doble Cámara (Combustión Lenta)',
      model: 'Bosca Limit 380',
      capacityKw: 12,
      woodSeasonM3: 4.5
    },
    waterMetrics: {
      dailyWaterLiters: 600,
      monthlyWaterM3: 18,
      annualRainHarvestLiters: 240000
    },
    dailyKcalTotal: 8000,
    monthlyPowerKwh: 320
  },
  parcels: [
    {
      id: 'A101',
      name: 'Cuartel Norte - Cereales Extensivos (Trigo Candeal & Avena)',
      crop: 'Trigo Candeal (Triticum durum) & Avena',
      cropType: 'trigo',
      symbol: '🌾',
      areaHa: 3.8,
      ndvi: 0.76,
      soilType: 'Franco Arcilloso Rojo Profundo',
      irrigationType: 'Secano con Riego Suplementario',
      status: 'Óptimo',
      zone: 'Zona 3 - Cereales & Cobertura',
      coordinates: [[[-71.8236, -36.1388], [-71.8212, -36.1388], [-71.8212, -36.1402], [-71.8236, -36.1402], [-71.8236, -36.1388]]]
    },
    {
      id: 'A102',
      name: 'Parque Agrovoltaico Bifacial & Pastoreo Ovino',
      crop: 'Agrivoltaics (Energía Solar 120 kWp) & Pastura Sombría',
      cropType: 'agrovoltaico',
      symbol: '☀️',
      areaHa: 2.2,
      ndvi: 0.65,
      soilType: 'Franco con Estructura Estable',
      irrigationType: 'Goteo Automatizado Bajo Panel',
      status: 'Óptimo',
      zone: 'Zona 5 - Energías Renovables & Clima',
      coordinates: [[[-71.8258, -36.1388], [-71.8238, -36.1388], [-71.8238, -36.1404], [-71.8258, -36.1404], [-71.8258, -36.1388]]]
    },
    {
      id: 'A103',
      name: 'Huerto de Frutales Menores & Berries Biointensivo',
      crop: 'Frambuesa Heritage, Moras Silvestres & Arándanos',
      cropType: 'berries',
      symbol: '🫐',
      areaHa: 1.6,
      ndvi: 0.82,
      soilType: 'Franco Limoso con Mulch Orgánico',
      irrigationType: 'Goteo Subterráneo Pulverizado',
      status: 'Óptimo',
      zone: 'Zona 2 - Frutales Menores',
      coordinates: [[[-71.8236, -36.1404], [-71.8212, -36.1404], [-71.8212, -36.1418], [-71.8236, -36.1418], [-71.8236, -36.1404]]]
    },
    {
      id: 'A104',
      name: 'Corredor Biológico & Bosque Esclerófilo Nativo',
      crop: 'Peumo (Cryptocarya alba), Quillay, Boldo & Litre',
      cropType: 'esclerofilo',
      symbol: '🌳',
      areaHa: 5.4,
      ndvi: 0.88,
      soilType: 'Suelo Volcánico sin Labranza (Trumao)',
      irrigationType: 'Infiltración Natural & Swales en Contorno',
      status: 'Óptimo',
      zone: 'Zona 5 - Conservación & Microclima',
      coordinates: [[[-71.8258, -36.1406], [-71.8238, -36.1406], [-71.8238, -36.1422], [-71.8258, -36.1422], [-71.8258, -36.1406]]]
    },
    {
      id: 'A105',
      name: 'Viñedo Patrimonial de Secano (Uva País 80 años)',
      crop: 'Uva País (Listán Prieto) en Cabeza sin Riego',
      cropType: 'vina_pais',
      symbol: '🍇',
      areaHa: 4.1,
      ndvi: 0.69,
      soilType: 'Granítico Meteorizado con Cuarzo',
      irrigationType: 'Secano Estricto de Rulo',
      status: 'Óptimo',
      zone: 'Zona 3 - Vitivinicultura de Conservación',
      coordinates: [[[-71.8210, -36.1388], [-71.8188, -36.1388], [-71.8188, -36.1406], [-71.8210, -36.1406], [-71.8210, -36.1388]]]
    },
    {
      id: 'A106',
      name: 'Huerto de Nogales & Avellanos Europeos',
      crop: 'Avellano Europeo (Corylus avellana Giffoni)',
      cropType: 'avellanos',
      symbol: '🌰',
      areaHa: 4.5,
      ndvi: 0.74,
      soilType: 'Franco Arcilloso Aluvial',
      irrigationType: 'Microaspersión Antiheladas',
      status: 'Atención',
      zone: 'Zona 2 - Frutales Mayores',
      coordinates: [[[-71.8210, -36.1408], [-71.8188, -36.1408], [-71.8188, -36.1424], [-71.8210, -36.1424], [-71.8210, -36.1408]]]
    },
    {
      id: 'A107',
      name: 'Tranque de Infiltración & Humedal de Biorremediación',
      crop: 'Cuerpos de Agua, Totoras & Juncos Depuradores',
      cropType: 'humedal',
      symbol: '💧',
      areaHa: 1.2,
      ndvi: 0.58,
      soilType: 'Greda Compactada Natural',
      irrigationType: 'Cosecha de Aguas Lluvias & Recarga de Napa',
      status: 'Óptimo',
      zone: 'Zona 4 - Agua & Resiliencia',
      coordinates: [[[-71.8236, -36.1420], [-71.8212, -36.1420], [-71.8212, -36.1432], [-71.8236, -36.1432], [-71.8236, -36.1420]]]
    },
    {
      id: 'A108',
      name: 'Centro de Compostaje & Microbiología de Suelo',
      crop: 'Camas de Lombricultura, Bocashi & Caldos Sulfocálcicos',
      cropType: 'compost',
      symbol: '🪱',
      areaHa: 2.0,
      ndvi: 0.45,
      soilType: 'Materia Orgánica 8.5% Activa',
      irrigationType: 'Riego por Aspersión Controlada Humedad 60%',
      status: 'Óptimo',
      zone: 'Zona 1 - Infraestructura Biológica',
      coordinates: [[[-71.8258, -36.1424], [-71.8238, -36.1424], [-71.8238, -36.1436], [-71.8258, -36.1436], [-71.8258, -36.1424]]]
    }
  ],
  sensors: [
    {
      id: 'IOT-SN-01',
      name: 'Sonda FDR Multinivel Suelo Trigo Candeal',
      hardware: 'ESP32-S3 + Sonda FDR 4 Niveles (20, 40, 60, 100 cm)',
      protocol: 'LoRaWAN EU868 / 915MHz',
      locationLabel: 'Cuartel Norte A101',
      telemetry: {
        soilMoisture: 38.5,
        temperature: 23.8,
        humidity: 56.0,
        batteryLevel: 96.0,
        status: 'optimal',
        lastUpdate: 'Hace 3 min'
      },
      history: [
        { time: '08:00', moisture: 41.2, temperature: 18.5 },
        { time: '10:00', moisture: 39.8, temperature: 21.0 },
        { time: '12:00', moisture: 38.5, temperature: 23.8 },
        { time: '14:00', moisture: 37.1, temperature: 25.2 },
        { time: '16:00', moisture: 36.8, temperature: 24.6 }
      ]
    },
    {
      id: 'IOT-SN-02',
      name: 'Centinela Microclima & Radiación Solar Agrovoltaico',
      hardware: 'ESP32 + Piranómetro + SHT31 Temperatura y Humedad',
      protocol: 'WiFi 2.4GHz Industrial Mesh',
      locationLabel: 'Parque Agrovoltaico A102',
      telemetry: {
        soilMoisture: 32.1,
        temperature: 21.5,
        humidity: 62.0,
        batteryLevel: 100.0,
        status: 'optimal',
        lastUpdate: 'Hace 1 min'
      },
      history: [
        { time: '08:00', moisture: 34.0, temperature: 17.2 },
        { time: '10:00', moisture: 33.2, temperature: 19.8 },
        { time: '12:00', moisture: 32.1, temperature: 21.5 },
        { time: '14:00', moisture: 31.8, temperature: 22.9 },
        { time: '16:00', moisture: 31.4, temperature: 22.0 }
      ]
    },
    {
      id: 'IOT-SN-03',
      name: 'Sonda Mojadura Foliar & Punto de Rocío (Alerta Botrytis)',
      hardware: 'Sensor de Resistencia Foliar + DS18B20 Inoxidable IP68',
      protocol: 'LoRaWAN 915MHz',
      locationLabel: 'Huerto Berries A103',
      telemetry: {
        soilMoisture: 42.0,
        temperature: 24.2,
        humidity: 71.0,
        batteryLevel: 91.0,
        status: 'warning',
        lastUpdate: 'Hace 5 min'
      },
      history: [
        { time: '08:00', moisture: 46.5, temperature: 16.0 },
        { time: '10:00', moisture: 44.0, temperature: 20.2 },
        { time: '12:00', moisture: 42.0, temperature: 24.2 },
        { time: '14:00', moisture: 40.5, temperature: 25.8 },
        { time: '16:00', moisture: 39.8, temperature: 25.1 }
      ]
    },
    {
      id: 'IOT-SN-04',
      name: 'Sensor Hidro-Acústico y Nivel Tranque Infiltración',
      hardware: 'Sensor Ultrasónico JSN-SR04T IP67 + ESP32 Solar',
      protocol: 'LoRaWAN 915MHz',
      locationLabel: 'Tranque Infiltración A107',
      telemetry: {
        soilMoisture: 88.0,
        temperature: 19.4,
        humidity: 82.0,
        batteryLevel: 98.0,
        status: 'optimal',
        lastUpdate: 'Hace 8 min'
      },
      history: [
        { time: '08:00', moisture: 90.0, temperature: 15.5 },
        { time: '10:00', moisture: 89.2, temperature: 17.8 },
        { time: '12:00', moisture: 88.0, temperature: 19.4 },
        { time: '14:00', moisture: 87.5, temperature: 20.6 },
        { time: '16:00', moisture: 87.0, temperature: 20.0 }
      ]
    },
    {
      id: 'IOT-SN-05',
      name: 'Centinela Térmico Antiheladas Avellanos Europeos',
      hardware: 'ESP32 KioT Dual DS18B20 (Suelo 5cm y Copa 1.8m) + Relé Alerta',
      protocol: 'LoRaWAN 915MHz + Alerta GSM Backup',
      locationLabel: 'Cuartel Avellanos A106',
      telemetry: {
        soilMoisture: 35.6,
        temperature: 2.1,
        humidity: 78.0,
        batteryLevel: 94.0,
        status: 'warning',
        lastUpdate: 'Hace 2 min'
      },
      history: [
        { time: '02:00', moisture: 37.0, temperature: 4.8 },
        { time: '04:00', moisture: 36.8, temperature: 2.9 },
        { time: '06:00', moisture: 36.5, temperature: 1.1 },
        { time: '08:00', moisture: 36.0, temperature: 5.4 },
        { time: '10:00', moisture: 35.6, temperature: 12.8 }
      ]
    }
  ],
  rawGeoJson: {
    type: "FeatureCollection",
    predioId: "predio-meniels",
    parralCoordinates: [-71.82, -36.14],
    parcelCount: 8,
    features: [
      { id: "A101", name: "Cuartel Norte - Cereales", area_ha: 3.8, ndvi: 0.76 },
      { id: "A102", name: "Parque Agrovoltaico", area_ha: 2.2, ndvi: 0.65 },
      { id: "A103", name: "Berries Biointensivo", area_ha: 1.6, ndvi: 0.82 },
      { id: "A104", name: "Bosque Esclerófilo Nativo", area_ha: 5.4, ndvi: 0.88 },
      { id: "A105", name: "Viñedo Patrimonial Secano", area_ha: 4.1, ndvi: 0.69 },
      { id: "A106", name: "Nogales & Avellanos", area_ha: 4.5, ndvi: 0.74 },
      { id: "A107", name: "Tranque Infiltración", area_ha: 1.2, ndvi: 0.58 },
      { id: "A108", name: "Compostaje & Microbiología", area_ha: 2.0, ndvi: 0.45 }
    ]
  },
  rawEntitiesJson: {
    farmId: "MENIELS-PARRAL-CL",
    establishedYear: 2021,
    permacultureDesigner: "Julio Pérez & Urrutia AgroTech Core Team",
    zonesActive: [1, 2, 3, 4, 5],
    waterHarvestSystem: "Keyline design + 4 Swales + Tranque 1.2 Ha",
    energyAutonomy: "100% fotovoltaica con excedente inyectado",
    soilHealthScore: 89
  }
};

// Predio 2: Fundo Frutícola El Boldo (Curicó, Maule) - Exportación Frutícola & Pasaporte Verde
export const PREDIO_EL_BOLDO: PredioProfile = {
  id: 'predio-el-boldo',
  name: 'Fundo Frutícola El Boldo',
  alias: 'El Boldo Curicó',
  commune: 'Curicó',
  region: 'Región del Maule, Chile',
  coordinates: { lat: -35.02, lng: -71.24 },
  totalAreaHa: 18.5,
  agriculturalZones: ['Cuartel Lapins Exportación', 'Cuartel Regina Alta Densidad', 'Arándanos Duke', 'Reserva Borde Estero'],
  mainCrops: ['Cerezas Lapins', 'Cerezas Regina', 'Arándano Duke', 'Franja de Amortiguación Nativa'],
  weatherForecast: {
    minTemp: -0.8,
    maxTemp: 21.0,
    frostRisk: 'Crítico',
    windSpeedKmh: 8.2,
    cwsiIndex: 0.35
  },
  parcels: [
    {
      id: 'B201',
      name: 'Cuartel Cerezos Lapins (Exportación China)',
      crop: 'Prunus avium cv. Lapins sobre Portainjerto Gisela 6',
      cropType: 'cerezos',
      symbol: '🍒',
      areaHa: 6.8,
      ndvi: 0.84,
      soilType: 'Franco Arcilloso Aluvial Profundo',
      irrigationType: 'Doble Línea Goteo Autocompensado',
      status: 'Óptimo',
      zone: 'Producción Exportable Grado A'
    },
    {
      id: 'B202',
      name: 'Cuartel Cerezos Regina (Tardía)',
      crop: 'Prunus avium cv. Regina sobre Colt',
      cropType: 'cerezos',
      symbol: '🍒',
      areaHa: 5.2,
      ndvi: 0.79,
      soilType: 'Franco Limoso con Drenaje Guiado',
      irrigationType: 'Goteo + Aspersión Térmica Antiheladas',
      status: 'Atención',
      zone: 'Sector de Hondonada Térmica'
    },
    {
      id: 'B203',
      name: 'Cuartel Arándanos Duke (Orgánico Certificado)',
      crop: 'Vaccinium corymbosum cv. Duke en Camellón con Corteza',
      cropType: 'arandanos',
      symbol: '🫐',
      areaHa: 4.5,
      ndvi: 0.77,
      soilType: 'Franco Ácido pH 5.2 Enmendado con Azufre',
      irrigationType: 'Microgoteo con Inyección de Bioinsumos',
      status: 'Óptimo',
      zone: 'Sector Orgánico Certificado'
    },
    {
      id: 'B204',
      name: 'Franja de Amortiguación & Cortaviento Nativo',
      crop: 'Maitén, Quillay y Peumo en Borde de Canal',
      cropType: 'esclerofilo',
      symbol: '🌿',
      areaHa: 2.0,
      ndvi: 0.89,
      soilType: 'Ribereño Aluvial',
      irrigationType: 'Subálvea Natural',
      status: 'Óptimo',
      zone: 'Corredor de Biodiversidad'
    }
  ],
  sensors: [
    {
      id: 'IOT-CUR-01',
      name: 'Centinela Térmico Antiheladas Alerta Inversión',
      hardware: 'ESP32 KioT Sonda DS18B20 Doble + Barómetro BMP280',
      protocol: '4G LTE M2M + LoRaWAN',
      locationLabel: 'Hondonada Regina B202',
      telemetry: {
        soilMoisture: 33.4,
        temperature: -0.4,
        humidity: 92.0,
        batteryLevel: 98.0,
        status: 'alert',
        lastUpdate: 'Hace 1 min'
      }
    },
    {
      id: 'IOT-CUR-02',
      name: 'Estación de Suelo & Balance Hídrico Cerezos Lapins',
      hardware: 'Sonda Capacitiva Decagon 5TE + Node LoRa',
      protocol: 'LoRaWAN 915MHz',
      locationLabel: 'Cuartel Lapins B201',
      telemetry: {
        soilMoisture: 29.8,
        temperature: 18.2,
        humidity: 64.0,
        batteryLevel: 95.0,
        status: 'optimal',
        lastUpdate: 'Hace 4 min'
      }
    }
  ],
  rawGeoJson: {
    type: "FeatureCollection",
    predioId: "predio-el-boldo",
    location: "Curicó, Maule",
    features: [
      { id: "B201", name: "Cerezos Lapins", area_ha: 6.8, ndvi: 0.84 },
      { id: "B202", name: "Cerezos Regina", area_ha: 5.2, ndvi: 0.79 },
      { id: "B203", name: "Arándanos Duke", area_ha: 4.5, ndvi: 0.77 },
      { id: "B204", name: "Franja Amortiguación", area_ha: 2.0, ndvi: 0.89 }
    ]
  },
  rawEntitiesJson: {
    farmId: "BOLDO-CURICO-CL",
    exportMarkets: ["China (Cerezos)", "Unión Europea (Arándanos Orgánicos)"],
    certifications: ["GlobalGAP", "GRASP", "Pasaporte Verde AgroTech QR"],
    frostProtectionSystem: "Hélices de viento + Aspersión sobre copa",
    annualWaterSavingsPercent: 32
  }
};

// Predio 3: Reserva Quebrada Los Boldos (Constitución) - Restauración & RewildMapper
export const PREDIO_QUEBRADA_BOLDOS: PredioProfile = {
  id: 'predio-quebrada-boldos',
  name: 'Reserva Ecológica Quebrada Los Boldos',
  alias: 'Quebrada Los Boldos',
  commune: 'Constitución',
  region: 'Región del Maule, Chile (Cordillera de la Costa)',
  coordinates: { lat: -35.33, lng: -72.39 },
  totalAreaHa: 62.0,
  agriculturalZones: ['Santuario Bosque Esclerófilo Maduro', 'Área de Reforestación Activa', 'Quebrada de Agua Viva', 'Pastizal en Restauración'],
  mainCrops: ['Bosque de Boldo', 'Peumo', 'Quillay', 'Arrayán', 'Hualo (Nothofagus glauca)', 'Copihue Silvestre'],
  weatherForecast: {
    minTemp: 7.5,
    maxTemp: 18.2,
    frostRisk: 'Bajo',
    windSpeedKmh: 22.0,
    cwsiIndex: 0.12
  },
  parcels: [
    {
      id: 'R301',
      name: 'Rodal Esclerófilo Maduro (Boldo-Peumo-Litre)',
      crop: 'Dosel cerrado nativo densidad > 80%',
      cropType: 'bosque_esclerofilo',
      symbol: '🌲',
      areaHa: 28.5,
      ndvi: 0.91,
      soilType: 'Marga Pizarrosa Costera Orgánica',
      irrigationType: 'Niebla Marina (Camanchaca) & Lluvia Costera',
      status: 'Óptimo',
      zone: 'Zona Núcleo de Biodiversidad'
    },
    {
      id: 'R302',
      name: 'Polígono de Restauración Activa BioToken PBC',
      crop: 'Plántulas de Quillay y Boldo con Tubos Protectores',
      cropType: 'reforestacion',
      symbol: '🌱',
      areaHa: 19.3,
      ndvi: 0.68,
      soilType: 'Suelo Degradado por Ex-Pino Reacondicionado',
      irrigationType: 'Gel Retentor Hidrofóbico + Lluvia Natural',
      status: 'Óptimo',
      zone: 'Generación Activa de Créditos PBC'
    },
    {
      id: 'R303',
      name: 'Quebrada Húmeda & Cañada de Arrayanes',
      crop: 'Luma, Arrayán, Helechos Arbóreos & Nalcas',
      cropType: 'quebrada',
      symbol: '🌊',
      areaHa: 14.2,
      ndvi: 0.94,
      soilType: 'Humus Profundo Saturado',
      irrigationType: 'Vertiente Permanente de Quebrada',
      status: 'Óptimo',
      zone: 'Refugio de Fauna & Anfibios Nativos'
    }
  ],
  sensors: [
    {
      id: 'RW-NODE-01',
      name: 'Estación Acústica de Biofonía & Clima Costero',
      hardware: 'Microfonía Ultrasonido PAM + Sensor SHT35 + ESP32',
      protocol: 'LoRaWAN Satelital Directo',
      locationLabel: 'Rodal Maduro R301',
      telemetry: {
        soilMoisture: 58.2,
        temperature: 15.3,
        humidity: 86.0,
        batteryLevel: 99.0,
        status: 'optimal',
        lastUpdate: 'Hace 6 min'
      }
    }
  ],
  rawGeoJson: {
    type: "FeatureCollection",
    predioId: "predio-quebrada-boldos",
    location: "Constitución, Cordillera de la Costa",
    totalHa: 62.0,
    features: [
      { id: "R301", name: "Rodal Esclerófilo Maduro", area_ha: 28.5, ndvi: 0.91 },
      { id: "R302", name: "Polígono Restauración PBC", area_ha: 19.3, ndvi: 0.68 },
      { id: "R303", name: "Quebrada Húmeda Arrayanes", area_ha: 14.2, ndvi: 0.94 }
    ]
  },
  rawEntitiesJson: {
    reserveId: "REWILD-MAULE-COSTA-01",
    pbcUnitsIssued: 235,
    co2eAnnualSequestrationTons: 235.6,
    monitoredBy: "Rewild Suite Offline PWA / Guardaparques Maule",
    iNaturalistObservationsCount: 412
  }
};

export const ALL_PREDIOS: PredioProfile[] = [
  PREDIO_MENIELS,
  PREDIO_EL_BOLDO,
  PREDIO_QUEBRADA_BOLDOS
];
