import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Satellite, Layers, Droplets, Flame, 
  HelpCircle, MessageSquareQuote, CheckCircle2, ChevronDown, 
  ChevronUp, ShieldCheck, Compass, Info, ArrowRight, Lightbulb, 
  Search, Cpu, Check, Copy, Share2, Award, Zap, AlertTriangle
} from 'lucide-react';

interface ModuleTopic {
  id: string;
  title: string;
  subtitle: string;
  analogy: string;
  technicalReality: string;
  whatToSayToClient: string;
  keyMetric: string;
  warningNotice?: string;
}

export const FounderAcademySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'satellites' | 'biophysics' | 'pitch' | 'glossary'>('satellites');
  const [expandedCard, setExpandedCard] = useState<string | null>('sentinel');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // MODULE 1: SATELLITES & MICROCLIMATE
  const satelliteTopics: ModuleTopic[] = [
    {
      id: 'sentinel',
      title: 'Sentinel-2 (Agencia Espacial Europea)',
      subtitle: 'La constelación orbital que fotografía tu campo cada 5 días sin costo',
      analogy: 'Es como tener un dron invisible a 786 km de altura que pasa cada 5 días y toma fotos en 13 "colores" distintos, la mayoría invisibles al ojo humano (infrarrojo cercano y de onda corta).',
      technicalReality: 'Órbita heliosincrónica con dos satélites (2A y 2B). Resolución espacial de 10 a 20 metros por píxel. No mide la humedad directa de las raíces a ciegas, pero mide con precisión quirúrgica cuánta luz infrarroja rebotan las hojas.',
      whatToSayToClient: '"Monitoreamos tu predio con los satélites de la Agencia Espacial Europea con resolución de 10 metros. Detectamos caídas en el vigor foliar días antes de que tus trabajadores las vean a simple vista."',
      keyMetric: 'Paso cada 5 días • 10m/píxel • Bandas B8 (NIR) y B11/B12 (SWIR)'
    },
    {
      id: 'era5',
      title: 'ERA5-Land (Reanálisis Meteorológico Europeo)',
      subtitle: 'La memoria climática horaria del planeta en tus coordenadas',
      analogy: 'Es como una estación meteorológica virtual que tiene registro de cada hora de los últimos 40 años para cualquier metro cuadrado de la Tierra, combinando física atmosférica y boyas/satélites globales.',
      technicalReality: 'Modelo reanalizado por el ECMWF (Centro Europeo de Previsiones Meteorológicas). Proporciona temperatura a 2m, radiación solar neta, velocidad del viento, presión de vapor y punto de rocío a nivel horario.',
      whatToSayToClient: '"No adivinamos el clima; procesamos el reanálisis meteorológico europeo más respetado del mundo para reconstruir el microclima exacto de tu valle."',
      keyMetric: 'Paso horario • Histórico 1950-hoy • Radiación, Viento, T° y Humedad'
    },
    {
      id: 'ndvi_vs_ndwi',
      title: 'NDVI vs. NDWI vs. SAVI (Los 3 Índices Sagrados)',
      subtitle: 'La diferencia entre verdor, agua en hojas y corrección de suelo',
      analogy: 'NDVI es como medir el "pulso vital o clorofila", NDWI es medir la "sed o hidratación" de la planta, y SAVI es ponerle anteojos oscuros al satélite para que la tierra arada entre hileras no encandile el sensor.',
      technicalReality: 'NDVI = (NIR - Red)/(NIR + Red). NDWI = (NIR - SWIR)/(NIR + SWIR) mide contenido hídrico foliar. SAVI introduce el factor L (usualmente 0.5) para restar la reflectancia del suelo desnudo en viñedos espaciados.',
      whatToSayToClient: '"El NDVI nos dice si la planta está viva y creciendo; el NDWI nos avisa si esa planta está sufriendo estrés hídrico oculto aunque siga verde."',
      keyMetric: 'Rango de -1.0 a +1.0 (Valores óptimos en vid: NDVI 0.55-0.75, NDWI > 0.2)'
    }
  ];

  // MODULE 2: BIOPHYSICAL ENGINE
  const biophysicsTopics: ModuleTopic[] = [
    {
      id: 'penman',
      title: 'Evapotranspiración FAO-56 (Penman-Monteith)',
      subtitle: 'Cómo saber cuántos litros de agua transpiró tu campo ayer',
      analogy: 'Es la ecuación de "cuánto suda la planta". Si hace calor, hay sol fuerte, el aire está seco y sopla viento, la planta suda litros de agua. Si está nublado y húmedo, casi no gasta.',
      technicalReality: 'Estándar oficial de la Organización de las Naciones Unidas para la Alimentación y la Agricultura (FAO). Calcula la Evapotranspiración de Referencia (ET0) y la multiplica por el coeficiente de cultivo (Kc) específico de la especie y fase fenológica: ETc = ET0 × Kc.',
      whatToSayToClient: '"Calculamos la evapotranspiración de tus cuarteles bajo la norma mundial FAO-56. No riegas por intuición o calendario fijo; riegas exactamente los milímetros que tus plantas consumieron."',
      keyMetric: 'ET0 expresada en mm/día (1 mm = 10 m³ de agua por hectárea)'
    },
    {
      id: 'soil_layers',
      title: 'Humedad de Suelo en 3 Capas (Modelo de Cubetas)',
      subtitle: 'Cómo simulamos la humedad subterránea sin haber enterrado sondas aún',
      analogy: 'Imagina 3 esponjas apiladas bajo tierra. La de arriba (0-20 cm) se seca rápido con el sol y el viento. La del medio (20-60 cm) es donde vive la raíz de la viña. La profunda (60-100 cm) retiene agua de reserva o la filtra a la napa.',
      technicalReality: 'Modelo hidrológico de cascada acoplado a la textura del suelo (SoilGrids / USDA: arena, limo, arcilla). Conociendo la lluvia, el riego reportado y la ETc diaria, el software resta y suma agua en cada estrato conociendo la Capacidad de Campo (CC) y el Punto de Marchitez Permanente (PMP).',
      whatToSayToClient: '"Modelamos el perfil radicular de tu suelo por capas de profundidad utilizando balances volumétricos calibrados con la edafología del Maule. Sabrás si la raíz profunda tiene reserva antes de prender los motores."',
      keyMetric: 'Capacidad de Campo (CC) ~28-35% en arcillas, ~12-18% en suelos arenosos'
    },
    {
      id: 'frost_inversion',
      title: 'Heladas Radiativas e Inversión Térmica',
      subtitle: 'Por qué el frío baja por los cerros y se empoza en el fondo del valle',
      analogy: 'El aire helado de la noche es más pesado y denso que el aire tibio; fluye hacia abajo como si fuera agua invisible y se estanca en las quebradas y zonas bajas del potrero.',
      technicalReality: 'En noches con cielo despejado y viento en calma (< 1.5 m/s), el suelo pierde calor por radiación infrarroja hacia el espacio exterior. El aire en contacto con el suelo se enfría y desciende por gravedad (flujo katabático). Nuestro gemelo digital modela este relieve con el DEM topográfico.',
      whatToSayToClient: '"El gemelo digital 3D mapea las depresiones térmicas de tu campo. Te avisamos en qué cuartel específico se estancará la helada antes del amanecer para activar ventiladores o aspersores con precisión."',
      keyMetric: 'Alerta crítica: Temp < 2.0°C con punto de rocío bajo 0°C (Helada negra/blanca)'
    }
  ];

  // MODULE 3: B2B PITCH & OBJECTION SIMULATOR
  const salesObjections = [
    {
      segment: 'Agrícolas & Viñas (B2B Privado)',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      clientQuestion: '¿Cómo me dices cuánta agua tiene mi suelo si no has venido a enterrar ninguna sonda física en mi viñedo?',
      founderAnswer: 'Don Daniel / Don Carlos, excelente pregunta. Partimos con la firma infrarroja de Sentinel-2 y el balance hidrológico FAO-56 calibrado con el tipo de suelo de su cuartel. Eso nos da una certeza de entre 82% y 86% desde el día 1, sin que usted gaste millones en obras civiles. Y lo mejor: cuando decidamos instalar nuestros nodos telemétricos LoRaWAN, el gemelo digital ya está configurado y sube automáticamente a más del 95% de precisión milimétrica.',
      actionInDashboard: 'Mostrar el panel de Humedad por Capas con la etiqueta [Simulación FAO-56 Calibrada] y el botón "Vincular Nodo IoT Físico".'
    },
    {
      segment: 'Municipios & Comités APR (Gobernanza)',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      clientQuestion: 'Aquí en la municipalidad no tenemos técnicos en satélites ni presupuesto para software complicado. ¿Cómo nos ayuda esto?',
      founderAnswer: 'Alcalde / Director de Emergencias, usted no tiene que mirar mapas satelitales si no quiere. Nuestro sistema vigila la cuenca 24/7 y le entrega a usted y a los comités APR un semáforo directo: verde si la napa tiene recarga segura, amarillo si el consumo supera el aporte, y rojo con alerta al WhatsApp de Protección Civil si hay combustible vegetal seco cerca de las casas ante riesgo de incendios.',
      actionInDashboard: 'Mostrar el Dashboard Territorial con el semáforo de recarga de napa y el perímetro de cortafuegos en interfaz urbano-forestal.'
    },
    {
      segment: 'Fondos ESG & Cooperación Internacional (GIZ, BID, UE)',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      clientQuestion: 'Muchos proyectos dicen que cuidan la naturaleza pero es puro greenwashing. ¿Cómo audito yo que de verdad hay impacto?',
      founderAnswer: 'En UrrutiaTech todo activo ecológico está respaldado por series temporales georreferenciadas. Auditamos la biomasa con reflectancias de 10 años, demostramos cero deforestación según la directiva EUDR europea y entregamos un Pasaporte Verde con firma criptográfica y coordenadas de polígono inmutables para sus reportes de taxonomía verde.',
      actionInDashboard: 'Mostrar el Pasaporte de Biodiversidad de RewildMapper con hash verificable y curvas de carbono Tier-2.'
    },
    {
      segment: 'Micro-agricultores & Permacultura',
      badgeColor: 'bg-lime-100 text-lime-900 border-lime-300',
      clientQuestion: '¿Esto es solo para grandes empresas con plata o nosotros los chicos podemos usarlo?',
      founderAnswer: 'UrrutiaTech nació con raíces maulinas para democratizar el saber de la tierra. Para la agricultura familiar ofrecemos el Diagnóstico Comunitario Abierto: calculamos las curvas de nivel para cosechar agua de lluvia con zanjas de infiltración y el calendario bioclimático de siembra para que su huerto resista la sequía.',
      actionInDashboard: 'Mostrar la vista Comunitaria con curvas de infiltración y recomendaciones en lenguaje simple y descargable en PDF.'
    }
  ];

  // MODULE 4: GLOSSARY
  const glossaryTerms = [
    { term: 'Gemelo Digital (Digital Twin)', def: 'Una réplica virtual interactiva en 3D de tu predio real que simula cómo reacciona al clima, sol y riego antes de tomar decisiones en terreno.' },
    { term: 'Simulated Ground-Truth', def: 'Datos de telemetría sintética de alta precisión generados por modelos físicos y satélites para operar de inmediato sin esperar la instalación de hardware.' },
    { term: 'FAO-56 Penman-Monteith', def: 'La fórmula estándar de la ONU para calcular cuánta agua transpira una pradera de referencia en base a sol, temperatura, humedad y viento.' },
    { term: 'Estrés Hídrico (CWSI)', def: 'Crop Water Stress Index: Escala de 0 a 1 donde 0 es planta perfectamente hidratada y 1 es marchitez irreversible.' },
    { term: 'Capacidad de Campo (CC)', def: 'La cantidad máxima de agua que un suelo puede retener contra la fuerza de gravedad tras una lluvia o riego profundo.' },
    { term: 'Punto de Marchitez Permanente (PMP)', def: 'El nivel de sequedad del suelo donde las raíces de la planta ya no tienen fuerza física para succionar agua.' },
    { term: 'Katabático (Flujo)', def: 'Drenaje nocturno de aire frío que baja por la gravedad por las laderas y se empoza en las zonas bajas, causando heladas localizadas.' },
    { term: 'FWI (Fire Weather Index)', def: 'Índice de Clima de Incendios que combina sequedad de vegetación, temperatura y viento para predecir facilidad de ignición.' },
    { term: 'LoRaWAN 915MHz', def: 'Frecuencia de radio de largo alcance y bajísimo consumo para enviar datos de sensores de campo hasta 10 km sin pagar planes de celular 4G.' },
    { term: 'EUDR Compliance', def: 'Normativa de la Unión Europea que exige a los exportadores demostrar que sus productos agrícolas no provienen de tierras deforestadas después de 2020.' }
  ];

  const filteredGlossary = glossaryTerms.filter(g => 
    g.term.toLowerCase().includes(filterQuery.toLowerCase()) || 
    g.def.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#071810] via-[#0B2519] to-[#0D3020] p-6 sm:p-8 rounded-3xl border border-emerald-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-sans font-bold">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Academia del Fundador • Material de Estudio & Pitch B2B</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Manual de Vuelo: <span className="text-amber-400">Ciencia, Satélites & AgroTwin</span>
          </h2>

          <p className="text-emerald-100/90 text-sm sm:text-base font-serif leading-relaxed">
            Tu guía de cabecera para dominar la arquitectura simulatoria de UrrutiaTech. Aquí encontrarás explicaciones en lenguaje claro, analogías cotidianas, qué responder en reuniones comerciales y cómo liderar con autoridad sin enredarte en ecuaciones.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-emerald-200 text-xs font-mono">
              <Check className="w-3 h-3 text-emerald-400" /> Cero humo / Cero tecnicismos inútiles
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-emerald-200 text-xs font-mono">
              <Check className="w-3 h-3 text-emerald-400" /> Respuestas maestras para clientes B2B
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-emerald-200 text-xs font-mono">
              <Check className="w-3 h-3 text-emerald-400" /> Estándares FAO & Agencia Espacial Europea
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('satellites')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
            activeTab === 'satellites'
              ? 'bg-[#0B2519] text-amber-400 shadow-md border border-emerald-500/40'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Satellite className="w-4 h-4" />
          <span>1. Satélites & Clima sin Rodeos</span>
        </button>

        <button
          onClick={() => setActiveTab('biophysics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
            activeTab === 'biophysics'
              ? 'bg-[#0B2519] text-amber-400 shadow-md border border-emerald-500/40'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>2. Física del Suelo & Raíces</span>
        </button>

        <button
          onClick={() => setActiveTab('pitch')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
            activeTab === 'pitch'
              ? 'bg-[#0B2519] text-amber-400 shadow-md border border-emerald-500/40'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <MessageSquareQuote className="w-4 h-4" />
          <span>3. Simulador de Objeciones B2B</span>
        </button>

        <button
          onClick={() => setActiveTab('glossary')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
            activeTab === 'glossary'
              ? 'bg-[#0B2519] text-amber-400 shadow-md border border-emerald-500/40'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>4. Glosario AgroTech Ejecutivo</span>
        </button>
      </div>

      {/* TAB 1: SATELLITES */}
      {activeTab === 'satellites' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 leading-relaxed font-sans">
              <strong className="font-bold">Regla de oro de los Satélites:</strong> Los satélites no son cámaras de fotos normales; son sensores espectrales. Miden la energía de la luz que rebota en las hojas. Una planta sana y con agua absorbe la luz roja para hacer fotosíntesis y refleja fuertemente el infrarrojo. Si la planta sufre sed o plaga, la reflectancia infrarroja cae en picada.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {satelliteTopics.map((item) => {
              const isExpanded = expandedCard === item.id;
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-emerald-500/40"
                >
                  <button
                    onClick={() => toggleCard(item.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-600 uppercase tracking-wider">Concepto Clave</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[11px] text-slate-500">{item.keyMetric}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-600 font-serif">{item.subtitle}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-6 border-t border-slate-100 space-y-5 bg-white">
                      
                      {/* Analogy */}
                      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-1">
                        <div className="flex items-center gap-2 font-sans text-xs font-bold text-amber-900 uppercase">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>La Analogía para Explicarlo en Fácil:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed">
                          "{item.analogy}"
                        </p>
                      </div>

                      {/* Technical Reality */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-xs font-bold text-slate-800 uppercase tracking-wider">
                          La Base Científica Real:
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans">
                          {item.technicalReality}
                        </p>
                      </div>

                      {/* What to Say */}
                      <div className="p-4 rounded-xl bg-emerald-950 text-white space-y-2 border border-emerald-500/30">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <MessageSquareQuote className="w-4 h-4" />
                            Qué decirle al cliente en una reunión:
                          </span>
                          <button
                            onClick={() => copyToClipboard(item.whatToSayToClient, 10)}
                            className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 font-mono"
                          >
                            <Copy className="w-3 h-3" />
                            {copiedIndex === 10 ? '¡Copiado!' : 'Copiar'}
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-100 font-serif italic">
                          {item.whatToSayToClient}
                        </p>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BIOPHYSICS */}
      {activeTab === 'biophysics' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed font-sans">
              <strong className="font-bold">Por qué la simulación biofísica es legal y respetada:</strong> Las leyes de la física y la agronomía no cambian si tienes o no un sensor. El agua que se evapora depende del sol y del viento; el agua que escurre depende de la pendiente y la arcilla. Los modelos FAO-56 son el estándar con el que los bancos, aseguradoras y organismos de la ONU calculan balances de agua en todo el mundo.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {biophysicsTopics.map((item) => {
              const isExpanded = expandedCard === item.id;
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-amber-500/40"
                >
                  <button
                    onClick={() => toggleCard(item.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-100/60 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider">Física Aplicada</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[11px] text-slate-500">{item.keyMetric}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-600 font-serif">{item.subtitle}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-6 border-t border-slate-100 space-y-5 bg-white">
                      
                      {/* Analogy */}
                      <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
                        <div className="flex items-center gap-2 font-sans text-xs font-bold text-emerald-900 uppercase">
                          <Lightbulb className="w-4 h-4 text-emerald-600" />
                          <span>La Analogía Cotidiana:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 font-serif leading-relaxed">
                          "{item.analogy}"
                        </p>
                      </div>

                      {/* Technical Reality */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-xs font-bold text-slate-800 uppercase tracking-wider">
                          La Explicación Agronómica:
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans">
                          {item.technicalReality}
                        </p>
                      </div>

                      {/* What to Say */}
                      <div className="p-4 rounded-xl bg-[#0B2519] text-white space-y-2 border border-emerald-500/30">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <MessageSquareQuote className="w-4 h-4" />
                            Cómo presentarlo con seguridad:
                          </span>
                          <button
                            onClick={() => copyToClipboard(item.whatToSayToClient, 20)}
                            className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 font-mono"
                          >
                            <Copy className="w-3 h-3" />
                            {copiedIndex === 20 ? '¡Copiado!' : 'Copiar'}
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-100 font-serif italic">
                          {item.whatToSayToClient}
                        </p>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: OBJECTION SIMULATOR */}
      {activeTab === 'pitch' && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-700 space-y-2">
            <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              ENTRENADOR DE LLAMADAS COMERCIALES
            </span>
            <h3 className="text-xl font-bold text-white">
              ¿Qué responder ante las dudas más difíciles de clientes reales?
            </h3>
            <p className="text-xs text-slate-300 font-serif">
              Los clientes agrícolas y autoridades municipales suelen hacer preguntas directas. Aquí tienes el guion exacto probado para responder con autoridad y empatía.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {salesObjections.map((obj, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-sans font-bold border ${obj.badgeColor}`}>
                    {obj.segment}
                  </span>
                  <span className="font-mono text-xs text-slate-400">Objeción Típica #{idx + 1}</span>
                </div>

                {/* Question */}
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1">
                  <span className="font-mono text-[11px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                    Lo que te va a preguntar el cliente:
                  </span>
                  <p className="text-sm font-bold text-rose-950 font-serif">
                    "{obj.clientQuestion}"
                  </p>
                </div>

                {/* Answer */}
                <div className="p-4 rounded-xl bg-emerald-950 text-white space-y-2 border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Tu Respuesta Maestra (Directa, profesional y sin rodeos):
                    </span>
                    <button
                      onClick={() => copyToClipboard(obj.founderAnswer, idx + 100)}
                      className="text-xs text-emerald-300 hover:text-white flex items-center gap-1 font-mono"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedIndex === idx + 100 ? '¡Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100 font-serif leading-relaxed">
                    "{obj.founderAnswer}"
                  </p>
                </div>

                {/* Action in UI */}
                <div className="flex items-center gap-2 text-xs text-slate-600 font-mono bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Qué mostrar en pantalla mientras respondes:</strong> {obj.actionInDashboard}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GLOSSARY */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-slate-900">Glosario AgroTech de Bolsillo</h3>
              <p className="text-xs text-slate-500 font-serif">10 términos clave explicados en una sola frase para recordar antes de tus reuniones.</p>
            </div>
            
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar término o concepto..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">{item.term}</h4>
                </div>
                <p className="text-xs text-slate-600 font-serif leading-relaxed pl-4 border-l-2 border-slate-100">
                  {item.def}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
