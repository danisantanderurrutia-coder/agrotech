export type ProductCategory = 
  | 'digital-twin' 
  | 'biomonitoring' 
  | 'iot-hardware' 
  | 'earth-observation' 
  | 'permaculture-edulab';

export interface DataSourceInfo {
  id: string;
  name: string;
  type: 'sensor-iot' | 'satellite' | 'weather-api' | 'gis-vector' | 'soil-db' | 'field-audit';
  provider: string;
  frequency: string;
  format: 'JSON' | 'GeoJSON' | 'NetCDF' | 'GeoTIFF' | 'Modbus/MQTT';
  description: string;
  samplePayload?: Record<string, any>;
  endpoint?: string;
}

export interface ScriptInfo {
  id: string;
  name: string;
  language: 'bash' | 'python' | 'node' | 'typescript' | 'json';
  purpose: string;
  command: string;
  cwd?: string;
  description?: string;
  parameters?: string[];
}

export interface RawDatasetInfo {
  id: string;
  name: string;
  format: 'GeoJSON' | 'JSON' | 'CSV' | 'YAML';
  fileSize: string;
  associatedPredioId?: string;
  description: string;
  data: any;
}

export interface GraphicAssetInfo {
  id: string;
  name: string;
  type: 'live-app' | 'vector-logo' | 'cad-schematic' | 'map-layer' | 'ui-mockup' | 'diagram';
  url: string;
  embeddable?: boolean;
  port?: number;
  previewUrl?: string;
  description: string;
}

export interface DocNoteInfo {
  id: string;
  title: string;
  tags: string[];
  vaultPath?: string;
  summary: string;
  contentMarkdown: string;
  wikilinks?: string[];
}

export interface ProductDefinition {
  id: string;
  name: string;
  tagline: string;
  version: string;
  port?: number;
  status: 'operational' | 'in-development' | 'deployed';
  category: ProductCategory;
  logoUrl: string;
  architectureRole: 'Plataforma Madre' | 'Suite Predial 3D' | 'Suite Territorial Regional' | 'Suite PWA Campo' | 'Hijo 1 (3D Engine)' | 'Hijo 2 (PWA Field)' | 'Módulo Edge IoT' | 'Núcleo Satelital' | 'División Edulab';
  techStack: string[];
  description: string;
  highlights: string[];
  dataSources: DataSourceInfo[];
  scripts: ScriptInfo[];
  rawDatasets: RawDatasetInfo[];
  graphicAssets: GraphicAssetInfo[];
  documentationNotes: DocNoteInfo[];
}

export interface PredioParcel {
  id: string;
  name: string;
  crop: string;
  cropType: string;
  symbol: string;
  areaHa: number;
  ndvi: number;
  soilType: string;
  irrigationType: string;
  status: 'Óptimo' | 'Atención' | 'Crítico' | 'En Barbecho';
  zone: string;
  coordinates?: number[][][];
}

export interface PredioSensor {
  id: string;
  name: string;
  hardware: string;
  protocol: string;
  locationLabel: string;
  telemetry: {
    soilMoisture?: number;
    temperature?: number;
    humidity?: number;
    batteryLevel?: number;
    status: 'optimal' | 'warning' | 'alert' | 'offline';
    lastUpdate?: string;
  };
  history?: Array<{ time: string; moisture?: number; temperature?: number }>;
}

export interface PredioMetabolism {
  propertyName: string;
  locationRegion: string;
  coordinatesLabel: string;
  houseSizeM2: number;
  occupants: number;
  solarPanels?: {
    model: string;
    quantity: number;
    capacityKwp: number;
    monthlyGenKwh: number;
  };
  heating?: {
    type: string;
    model: string;
    capacityKw: number;
    woodSeasonM3: number;
  };
  waterMetrics?: {
    dailyWaterLiters: number;
    monthlyWaterM3: number;
    annualRainHarvestLiters: number;
  };
  dailyKcalTotal?: number;
  monthlyPowerKwh?: number;
}

export interface PredioProfile {
  id: string;
  name: string;
  alias: string;
  commune: string;
  region: string;
  coordinates: { lat: number; lng: number };
  totalAreaHa: number;
  agriculturalZones: string[];
  mainCrops: string[];
  parcels: PredioParcel[];
  sensors: PredioSensor[];
  metabolism?: PredioMetabolism;
  rawGeoJson: any;
  rawEntitiesJson: any;
  weatherForecast?: {
    minTemp: number;
    maxTemp: number;
    frostRisk: 'Bajo' | 'Moderado' | 'Crítico';
    windSpeedKmh: number;
    cwsiIndex: number;
  };
}
