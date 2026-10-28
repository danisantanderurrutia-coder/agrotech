# Dinámica Climática, Gestión de Riesgos y Modelación de Momentos Extremos en Cuencas Agrícolas

## AgriTwin 3D • Sistema Territorial de Cuenca (Cuenca del Maule / Río Longaví / Río Perquilauquén)

Este documento detalla la física atmosférica, la dinámica de propagación de incendios, los patrones de viento diario, el acoplamiento hidrológico lluvia–isoterma–caudal y la matriz de los **8 Momentos Climáticos** integrados en AgriTwin 3D para anticipar desastres en cuencas agrícolas y forestales.

---

## 1. Dinámicas Físicas de Incendios Forestales

En los ecosistemas mediterráneos de Chile central (-34° a -38°S), la combustión no es homogénea y responde a cuatro regímenes:

```
                  ┌───────────────────────────────────────────────┐
                  │             REGÍMENES DE FUEGO                │
                  └───────────────────────────────────────────────┘
                           │              │              │
                ┌──────────┴──────┐ ┌─────┴──────┐ ┌─────┴──────────┐
                │ 1. SUPERFICIAL  │ │ 2. COPAS   │ │ 3. ERUPTIVO    │
                │    Rastrojo     │ │    Dosel   │ │    Quebrada    │
                └─────────────────┘ └────────────┘ └────────────────┘
```

1. **Fuego Superficial (Pastizales & Rastrojos)**:
   - Responde en escala de minutos al **Contenido de Humedad de Equilibrio (EMC)** del combustible fino muerto (<6 mm).
   - Altura de llama 0.5 a 1.8 m, velocidad de propagación alta pero controlable con fajas limpias de 15 m.
2. **Fuego de Copas (*Crown Fires* - Pino Radiata & Eucalipto)**:
   - Se activa cuando la intensidad lineal de Byram ($I = H \cdot w \cdot R$) supera el umbral de transición vertical ($I_0 = 0.010 \cdot CBH \cdot (460 + 26 \cdot FMC)$).
   - Genera velocidades de propagación mayores a $4-8\text{ km/h}$ y temperaturas sobre $1000^\circ\text{C}$.
3. **Fuego de Pavesas (*Spotting* / Transporte de Chispas)**:
   - La columna de convección térmica eleva fragmentos de corteza incandescente que son transportados por el viento a distancias de **500 m a 2.5 km**, iniciando focos secundarios a sotavento.
4. **Fuego Eruptivo de Cañón / Quebrada**:
   - Ocurre cuando el fuego se alinea con una pendiente escarpada y un embudo de viento (efecto Venturi). El precalentamiento radiativo del combustible cuesta arriba causa una explosión convectiva súbita.

---

## 2. Variables Atmosféricas y Regla 30-30-30

| Variable | Mecanismo Físico | Impacto Operativo |
| :--- | :--- | :--- |
| **Temperatura ($T$)** | Reduce la energía requerida para llevar el combustible vegetal a pirólisis ($320^\circ\text{C}$). | Por cada $+10^\circ\text{C}$ de aumento ambiental, la tasa de propagación se duplica. |
| **Humedad Relativa ($HR$)** | Rige la desecación del pastizal seco por equilibrio higroscópico. | Con $HR < 30\%$ el riesgo es severo; con $HR < 12\%$ la ignición es casi espontánea ante chispas mecánicas. |
| **Viento ($\vec{V}$)** | Oxigena el frente de llama, abate las llamas hacia el combustible contiguo y alarga la elipse de avance según Rothermel. | La tasa de avance escala con $U^{1.5}$. Con viento $>30\text{ km/h}$, el ataque directo de brigadas terrestres queda prohibido. |
| **Presión Atmosférica ($P$)** | Subsidencia anticiclónica (alta presión profunda). | Aire cálido descendente que expulsa la nubosidad marina y genera radiación solar neta $>950\text{ W/m}^2$. |

> **La Regla Crítica 30-30-30**: Cuando concurren simultáneamente **$T > 30^\circ\text{C}$**, **$HR < 30\%$** y **Viento $> 30\text{ km/h}$**, el sistema activa automáticamente la **Alerta Roja de Piro-Riesgo FWI**.

---

## 3. Dinámica del Viento Día a Día (Modelación Estilo Windy)

El campo vectorial del viento horizontal $\vec{V}(x, y) = (u, v)$ en la cuenca responde al acoplamiento de dos escalas:

```
            VIENTO TOTAL = VIENTO SINÓPTICO + BRISA TÉRMICA LOCAL
```

### 3.1 Ciclo Diario Típico (Condición Normal)
* **Madrugada (02:00 - 08:00)**: Viento catabático frío de ladera descendente hacia los valles ($S \to N$, calmo, 4-8 km/h).
* **Mediodía / Tarde (13:00 - 18:00)**: Brisa marina diurna térmica impulsada por el calentamiento del valle central ($SW \to NE$, 15-22 km/h). Aporta aire más húmedo y fresco.

### 3.2 El Viento Catabático Puelche / Raco (Condición Extrema)
Cuando se establece una baja costera frente a la zona central y un anticiclón cálido en la Patagonia argentina, el gradiente barométrico fuerza el aire a cruzar la Cordillera de los Andes de Este a Oeste:
* **Efecto Foehn**: El aire desciende 2.500 metros sufriendo compresión adiabática seca a razón de $+1^\circ\text{C}$ por cada 100 m de descenso.
* **Resultado**: Llega al valle con dirección **E-NE (65°)**, ráfagas sobre **60 km/h**, temperaturas sobre **$38^\circ\text{C}$** y humedad que se desploma bajo el **10%**.

---

## 4. Respuesta Hidrológica según Intensidad Pluviométrica e Isoterma 0°C

El caudal pico en la cuenca baja ($Q_{\text{pico}}$) no depende únicamente de los milímetros de lluvia, sino del estado del suelo y de la cota de nieve:

$$Q_{\text{pico}} = C \cdot I \cdot A_{\text{líquida}}$$

```
              INFLUENCIA DE LA COTA ISOTERMA 0°C
  
   Cota 3.400m ─── Lluvia líquida derrite nieve ──────> ÁREA LÍQUIDA = 100% (ALUVIÓN)
   
   Cota 1.800m ─── Nieve acumulada en la cumbre ─────> ÁREA LÍQUIDA = 35% (CRECIDA NORMAL)
```

1. **Lluvia Ordinaria con Isoterma Baja (1.800 m / 65 mm)**:
   - El 65% de la cuenca alta recibe precipitación sólida (nieve), la cual queda almacenada sin escurrir. Caudal en el estero: $240\text{ m}^3/\text{s}$ (crecida contenida).
2. **Ríos Atmosféricos Cálidos con Isoterma Alta (3.400 m / 140 mm)**:
   - La lluvia líquida cae sobre los glaciares y mantos de nieve andinos, licuándolos instantáneamente. El área aportante efectiva se triplica y el caudal alcanza picos catastróficos de $>680\text{ m}^3/\text{s}$ (desborde masivo y arrastre de sedimentos).

---

## 5. La Matriz de los 8 Momentos Climáticos en AgriTwin 3D

Para anticiparse a las decisiones de manejo, AgriTwin integra un selector de momentos calibrados:

| Momento | T (°C) | HR (%) | Viento | Lluvia 24h | Isoterma | Respuesta en el Gemelo 3D |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1. Momento Actual (Línea Base)** | 24.5 | 42 | 14 km/h SW | 0 mm | 2.600 m | Estero en caja normal, suelo equilibrado, sensores en verde. |
| **2. Verano Normal** | 28.0 | 35 | 18 km/h SW | 0 mm | 3.000 m | Riego regular Voisin, brisa estival moderada, FWI 24. |
| **3. Solo Ola de Calor** | 37.2 | 21 | 10 km/h S | 0 mm | 3.600 m | Estrés CWSI > 0.65, activación de microaspersión térmica. |
| **4. Solo Megasequía (La Niña)** | 26.5 | 30 | 14 km/h SW | 0 mm | 2.800 m | Napa a -11.2 m, semáforo rojo DGA, DC > 400. |
| **5. Megasequía + Ola + Puelche** | **39.5** | **9** | **38 km/h E-NE** | 0 mm | 3.800 m | **Alerta Roja FWI 52, partículas rojas Windy, capa NBR activa.** |
| **6. Invierno Seco & Heladas** | 2.5 | 82 | 6 km/h S | 0 mm | 1.400 m | Inversión térmica nocturna (-3.8°C), torres anti-helada. |
| **7. Invierno Lluvioso (T=10)** | 11.0 | 94 | 28 km/h NW | 65 mm | 1.800 m | Estero en cota +0.45m, zanjas Keyline infiltrando al 100%. |
| **8. Río Atmosférico (T=100)** | **16.5** | **98** | **42 km/h NNW** | **140 mm** | **3.400 m** | **Desborde fluvial +2.1m, flechas D8 a tope, evacuación.** |

---

## 7. Formulación Matemática de los Motores de Simulación

### 7.1 Propagación del Fuego: Modelo de Rothermel (1972)
La velocidad de avance del frente de llama en la dirección de máxima propagación ($R$, en $\text{m/min}$) está descrita por:

$$R = \frac{I_{R} \cdot \xi \cdot (1 + \phi_{w} + \phi_{s})}{\rho_{b} \cdot \varepsilon \cdot Q_{ig}}$$

Donde:
* $I_R$: Intensidad de reacción del combustible ($\text{kJ}/(\text{m}^2 \cdot \text{min})$), dependiente del contenido de humedad estacional y el empaquetamiento volumétrico.
* $\xi$: Coeficiente de flujo propagante adimensional.
* $\phi_w$: Factor multiplicador por viento catabático: $\phi_w = C \cdot U^B \cdot (\beta / \beta_{op})^{-E}$, donde $U$ es la velocidad del viento a media llama y $\beta$ la relación de empaquetamiento.
* $\phi_s$: Factor multiplicador por pendiente topográfica: $\phi_s = 5.275 \cdot \beta^{-0.3} \cdot (\tan \theta)^2$.
* $\rho_b$: Densidad aparente del lecho de combustible ($\text{kg/m}^3$).
* $\varepsilon$: Factor de calentamiento efectivo.
* $Q_{ig}$: Calor de preignición ($\text{kJ/kg}$), función lineal de la humedad del combustible fino muerto.

### 7.2 Hidráulica Fluvial y Onda de Crecida: Saint-Venant 1D Simplificado (Onda Difusiva)
El tránsito de la onda de avenida por el cauce del Río Longaví y sus tributarios se rige por:

$$\frac{\partial A}{\partial t} + \frac{\partial Q}{\partial x} = q_L$$

$$\frac{\partial z}{\partial x} + S_f = 0 \quad \text{con} \quad S_f = \frac{n^2 \cdot |Q| \cdot Q}{A^2 \cdot R_h^{4/3}}$$

Donde $A$ es el área de la sección transversal, $Q$ el caudal, $q_L$ el aporte lateral por escorrentía superficial de laderas, $z$ la cota de la superficie libre de agua, $n$ el coeficiente de rugosidad de Manning (0.045 para lecho con cantos rodados y sauces) y $R_h$ el radio hidráulico.

### 7.3 Índice Topográfico de Humedad (Topmodel TWI) y Acumulación D8
El potencial de saturación freática de cada píxel en el terreno se computa mediante el algoritmo hidrológico determinístico D8:

$$\text{TWI} = \ln\left(\frac{a}{\tan \beta}\right)$$

Donde $a$ es el área de contribución específica por unidad de ancho de contorno ($\text{m}^2/\text{m}$) calculada siguiendo la línea de máxima pendiente gravitatoria, y $\beta$ es el gradiente local del terreno en radianes. Píxeles con $\text{TWI} > 8.5$ definen los talwegs de drenaje preferente y zonas con recarga hacia pozos APR.

### 7.4 Índices Espectrales Sentinel-2 L2A Calibrados
* **NDVI (Vigor y Biomasa Clorofílica)**:
  $$\text{NDVI} = \frac{\text{B08 (NIR 842nm)} - \text{B04 (Red 665nm)}}{\text{B08} + \text{B04}}$$
* **NDWI (Humedad Superficial y Cuerpos de Agua)**:
  $$\text{NDWI} = \frac{\text{B03 (Green 560nm)} - \text{B08 (NIR 842nm)}}{\text{B03} + \text{B08}}$$
* **NBR (Índice de Combustible y Severidad de Calcinación)**:
  $$\text{NBR} = \frac{\text{B08 (NIR 842nm)} - \text{B12 (SWIR 2190nm)}}{\text{B08} + \text{B12}}$$

---

## 8. Arquitectura Técnica de Integración en el Gemelo Digital

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     OPEN-METEO REST API (7D)     │       │     PRESETS DE CUENCA (8 MOM)   │
│  - Temp, RH, Viento, Lluvia 24h │       │  - Río Atmosférico, Puelche...  │
└────────────────┬────────────────┘       └────────────────┬────────────────┘
                 │                                         │
                 ▼                                         ▼
┌───────────────────────────────────────────────────────────────────────────┐
│              OpenMeteoForecastService.js & UIController.js               │
│  - Conmutador Live / Teórico  •  Scrubber 24h  •  Timeline 7 Días        │
└────────────────────────────────────┬──────────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌─────────────────────────────────────┐     ┌─────────────────────────────────────┐
│       MAPMANAGER & THREE.JS         │     │         CERRO-CUENCA (HUB)          │
│  - BiophysicalTerrainShader (NDVI)  │     │  - Hidrograma dinámico dual-curve   │
│  - GeomorphicFlowManager (Windy D8) │     │  - Matriz 10 predios & 5 pozos APR  │
│  - Puelche Wind Ribbons & Flood Mesh│     │  - Dictamen reactivo 3 Asesores     │
└─────────────────────────────────────┘     └─────────────────────────────────────┘
```

1. **Modo Dual Tiempo Real vs Escenarios**:
   - `[🟢 MODO REAL 7 DÍAS]`: Consulta a `https://api.open-meteo.com/v1/forecast` para las coordenadas `-36.21156, -71.60530`. Permite recorrer los 7 días de la semana con resolución horaria.
   - `[⚡ ESCENARIO TEÓRICO]`: Ejecuta los 8 momentos de estrés paramétrico para pruebas de estrés y dimensionamiento de obras de conservación.
2. **Toggle de Desactivación de Simulación**:
   - Botón `[👁️ Simulación: ON / 🚫 Terreno Limpio]` que oculta todos los vectores de crecida, partículas de viento y áreas de riesgo para inspeccionar la morfología pura del suelo PBR.
3. **Comité Científico Asesor Reactivo**:
   - **Dr. Fernando Albornoz** (Ingeniería Hidráulica & Presas): Monitorea la cota de seguridad del Embalse Bullileo (60M m³) y la holgura de evacuación en Quilaimo.
   - **Dra. Natalia Oyarzún** (Meteorología Sinóptica): Evalúa el FWI Canadiense, viento Foehn Puelche y heladas nocturnas polares.
   - **Dr. Marcelo Lagos** (Geomorfología & Riesgos): Dictamina la capacidad de disipación de crecidas mediante el corredor ripario y el buffer Keyline (-22.4% de caudal pico).
