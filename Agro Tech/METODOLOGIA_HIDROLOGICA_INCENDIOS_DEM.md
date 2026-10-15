# Metodología Científica e Hidrológica: Modelación de Inundaciones, Dinámica de Vientos, Biomasa Satelital e Incendios en Cuencas Agrícolas

## AgriTwin 3D • Sistema de Gemelo Digital de Cuenca (Cuenca del Maule / Río Perquilauquén)

Este documento detalla los fundamentos matemáticos, geomorfológicos y de teledetección implementados en AgriTwin para el análisis integral de riesgos hidrológicos (inundaciones por DEM), transporte eólico (partículas estilo Windy), estimación de biomasa y propagación de incendios forestales.

---

## 1. Modelación Hidrológica de Inundaciones a partir del DEM y Gravedad

### 1.1 Modelo Digital de Elevaciones (DEM) y Matriz de Pendientes
A partir de la malla tridimensional o ráster altimétrico $z = h(x, y)$, se derivan los componentes vectoriales del gradiente topográfico espacial en cada celda:

$$\nabla h(x, y) = \left( \frac{\partial h}{\partial x}, \frac{\partial h}{\partial y} \right)$$

La pendiente local $S$ (en m/m o porcentaje) y el ángulo de inclinación $\beta$ corresponden a:

$$S = \|\nabla h\| = \sqrt{\left(\frac{\partial h}{\partial x}\right)^2 + \left(\frac{\partial h}{\partial y}\right)^2}, \quad \beta = \arctan(S)$$

### 1.2 Algoritmo de Dirección de Flujo Gravitacional (D8 / Steepest Descent)
Bajo la acción exclusiva del potencial gravitatorio $V = g \cdot h$, el agua superficial fluye en la dirección ortogonal a las curvas de nivel, es decir, a lo largo del vector de máxima pendiente descendente:

$$\vec{v}_{\text{drenaje}} = - \frac{\nabla h}{\|\nabla h\|}$$

En una celda discreta de 8 vecinos (D8), el flujo se asigna a la celda vecina $k$ con la mayor caída hidráulica:

$$\Delta h_k = \frac{h_0 - h_k}{d_k}$$

Donde $d_k$ es la distancia entre centros de celdas ($d = \Delta x$ para ortogonales, $d = \sqrt{2}\Delta x$ para diagonales).

### 1.3 Área de Contribución Acumulada ($\alpha$) e Índice Topográfico de Humedad (TWI)
El área de drenaje acumulada aguas arriba por unidad de ancho de contorno ($\alpha$, en $m^2/m$) se determina propagando el flujo desde las divisorias de aguas (*watersheds*) hasta los talwegs o fondos de quebrada.

Siguiendo el marco hidrológico **TOPMODEL (Beven & Kirkby, 1979)**, el potencial de acumulación de agua subsuperficial y saturación superficial se define mediante el **Índice Topográfico de Humedad (TWI)**:

$$TWI = \ln\left( \frac{\alpha}{\tan \beta} \right)$$

- **$TWI > 10$**: Zonas de llanura aluvial, fondos de vaguada y meandros con drenaje deficiente $\to$ **Alta susceptibilidad a encharcamiento e inundación permanente**.
- **$4 \le TWI \le 10$**: Terrazas intermedias de recarga y drenaje equilibrado.
- **$TWI < 4$**: Laderas andinas y crestas con alta pendiente y baja retención $\to$ **Zonas de generación de escorrentía rápida (escorrentía hortoniana)**.

### 1.4 Simulación Hidráulica 2D de Inundaciones (Aproximación de Onda Difusiva / Saint-Venant)
Para la propagación del flujo bidimensional en la llanura de inundación se emplean las ecuaciones promediadas en la profundidad de Saint-Venant:

$$\frac{\partial h_w}{\partial t} + \frac{\partial (u \cdot h_w)}{\partial x} + \frac{\partial (v \cdot h_w)}{\partial y} = R - I$$

$$\frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} = -g \frac{\partial (z + h_w)}{\partial x} - g \frac{n^2 u \sqrt{u^2 + v^2}}{h_w^{4/3}}$$

Donde:
- $h_w$: Tirante de agua superficial (profundidad de inundación).
- $z$: Elevación del terreno (DEM).
- $n$: Coeficiente de rugosidad de Manning ($n \approx 0.035$ para suelo aluvial limpio, $n \approx 0.075$ para corredores de bosque ribereño con Quillay/Sauce).
- $R - I$: Precipitación líquida neta menos tasa de infiltración de Green-Ampt.

---

## 2. Modelación de Vientos Estilo Windy (Campos de Partículas y Vectores)

### 2.1 ¿Cómo funciona la arquitectura de Windy?
Windy utiliza un motor de renderizado acelerado por GPU (WebGL) basado en **advección lagrangiana de partículas sobre mallas de viento eulerianas**:

1. **Datos de entrada**: Mallas regulares de modelos meteorológicos numéricos (GFS, ECMWF a resolución 9-13 km o modelos de mesoescala WRF a 1-3 km). Los datos consisten en un campo vectorial horizontal de velocidad:
   $$\vec{W}(x, y, t) = \left( u(x, y, t), v(x, y, t) \right)$$
   Donde $u$ es la componente zonal (Oeste $\to$ Este) y $v$ es la componente meridional (Sur $\to$ Norte).
2. **Textura de Viento en GPU**: Las matrices $(u, v)$ se normalizan y almacenan en los canales rojo (R) y verde (G) de una textura flotante WebGL de baja latencia.
3. **Ecuación de Advección de Partículas**: Se inicializan miles de partículas con posición $\vec{P}_0 = (x_0, y_0)$ y tiempo de vida estocástico $T_{\text{life}} \sim \mathcal{U}(t_{\min}, t_{\max})$. En cada paso de tiempo discreto $\Delta t$:
   $$\vec{P}_{t + \Delta t} = \vec{P}_t + \vec{W}(\vec{P}_t) \cdot \Delta t$$
4. **Desvanecimiento de Rastros (*Trail Fading*)**: La estela se dibuja con acumulación alfa semitransparente, desvaneciendo suavemente el buffer de dibujo anterior en cada cuadro. Cuando una partícula expira o sale del dominio, es resembrada aleatoriamente (*respawn*).

### 2.2 Viento Puelche / Raco en la Cuenca del Maule
En la precordillera de Parral y cuenca del Perquilauquén, el viento dominante de riesgo extremo es el **Viento Puelche (o Raco)**: un viento catabático descendente desde los pasos andinos hacia el valle central, que sufre compresión adiabática (efecto Foehn), elevando la temperatura ($T > 30^\circ\text{C}$), reduciendo la humedad relativa ($HR < 20\%$) y generando ráfagas canalizadas por los cajones fluviales a más de $40\text{ km/h}$.

---

## 3. Estimación de Biomasa Satelital e Índices Multiespectrales (Sentinel-2)

Para alimentar la carga de combustible y caracterizar la cuenca, se implementa una librería de índices espectrales a partir de las bandas MSI de Sentinel-2 (resolución de 10 m y 20 m):

| Índice | Fórmula | Bandas Sentinel-2 | Aplicación Hidrológica / Forestal |
| :--- | :--- | :--- | :--- |
| **NDVI** | $\frac{\text{NIR} - \text{Red}}{\text{NIR} + \text{Red}}$ | $\frac{B8 - B4}{B8 + B4}$ | Vigor vegetativo, biomasa activa fotosintéticamente, estado de cultivos. |
| **DEM Hypsometric** | $z = h(x, y)$ | Malla 3D + Contornos | Gradiente altitudinal, identificación de talwegs, divisorias y curvas de nivel. |
| **NDWI (McFeeters)**| $\frac{\text{Green} - \text{NIR}}{\text{Green} + \text{NIR}}$ | $\frac{B3 - B8}{B3 + B8}$ | Cuerpos de agua superficial, estero, láminas de desborde y humedales. |
| **NDII / NDRE** | $\frac{\text{NIR} - \text{SWIR1}}{\text{NIR} + \text{SWIR1}}$ | $\frac{B8 - B11}{B8 + B11}$ | Contenido hídrico del dosel vivo (*Fuel Moisture Content*). |
| **NBR (Burn Ratio)**| $\frac{\text{NIR} - \text{SWIR2}}{\text{NIR} + \text{SWIR2}}$ | $\frac{B8A - B12}{B8A + B12}$ | Severidad de incendios, materia vegetal seca y combustible disponible. |

### Relación entre NDVI y Biomasa Forestal
La biomasa aérea leñosa y de pastizal (*Above Ground Biomass*, $AGB$, en $t/\text{ha}$) se modela empíricamente con saturación logística:

$$AGB = AGB_{\max} \cdot \left( \frac{1}{1 + e^{-k \cdot (NDVI - NDVI_0)}} \right)$$

---

## 4. Algoritmo de Propagación de Incendios Acoplado (Rothermel & FWI)

La tasa de avance lineal del frente de fuego ($R$, en m/min) combina combustible, pendiente y viento:

$$R = R_0 \cdot (1 + \phi_w + \phi_s)$$

1. **Tasa de Avance Base ($R_0$)**: Función de la carga de biomasa ($w_0 \propto NDVI$) y el contenido de humedad del combustible fino ($FMC$ obtenido de sensores IoT y NDII):
   $$R_0 \propto \frac{I_R \cdot \xi}{\rho_b \cdot \varepsilon \cdot Q_{ig}}$$
2. **Factor de Viento ($\phi_w$)**: Aceleración exponencial en la dirección del viento vectorizado:
   $$\phi_w = C \cdot U^B \cdot \left(\frac{\beta}{\beta_{op}}\right)^{-E}$$
3. **Factor de Pendiente ($\phi_s$)**: Propagación cuesta arriba por precalentamiento convectivo y radiativo:
   $$\phi_s = 5.275 \cdot (\tan \beta)^2$$
4. **Envolvente Elíptica de Fons / Anderson**:
   El fuego se expande desde el punto de ignición como una elipse alargada donde la razón largo/ancho ($L_w$) es función directa de la velocidad del viento $U$:
   $$L_w = 0.936 \cdot e^{0.143 \cdot U} + 0.461$$

---

## 5. Diseño Gráfico Geomorfológico y Estratigráfico

Inspirado en los tratados de geomorfología (Arthur Holmes, Tarbuck & Lutgens) y perfiles estratigráficos de bloques de cuenca:
1. **Líneas de Contorno / Curvas de Nivel**: Estilizadas matemáticamente con líneas secundarias suaves y maestras destacadas en blanco/grafito.
2. **Flechas Vectoriales 3D de Drenaje**: Símbolos hidrológicos limpios que fluyen a lo largo de los ejes de vaguada indicando magnitud y sentido de la escorrentía gravitatoria.
3. **Zonas Demarcadas de Riesgo Hidráulico y Piro-Riesgo**: Envolventes poligonales de estilo cartográfico con contornos sutiles, códigos de color normados y transparencias calibradas para no ocultar la topografía del terreno.
