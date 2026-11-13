# Panel de Madurez del Gemelo Digital (Digital Twin Status & Engine Registry)

> **Documento de Control y Gobernanza Técnica - AgriTwin Hub**  
> **Ubicación en Sistema:** `/Agro Tech/02_Arquitectura_Software_Hardware/PANEL_MADUREZ_GEMELO_DIGITAL_REGISTRY.md`  
> **Doctrina:** Destination Earth (DestinE) C2 Architecture  
> **Última Actualización:** 2026-11-12  

---

## 1. Propósito y Filosofía del Registro

El **Panel de Madurez del Gemelo Digital** es el tablero de control de gobernanza algorítmica y técnica de AgriTwin. Su objetivo es transparentar para el usuario, los desarrolladores y los auditores agronómicos:
1. **Qué motor físico o numérico está calculando cada variable en cada momento.**
2. **Cuál es la resolución espacial, temporal y vertical de cada componente.**
3. **Cuál es la procedencia del dato** (Medición real en terreno, Sensor Virtual estimado, Reanálisis meteorológico, Inferencia satelital).
4. **El nivel de incertidumbre estadística ($\pm \sigma$)** asociado a cada indicador.

---

## 2. Matriz de Estado y Madurez de Variables (TRL Engine Status)

| Dominio | Variable / Indicador | Motor Activo | Resolución Espacial / Vertical | Paso Temporal | Fuente Primaria | Nivel de Madurez (TRL) | Incertidumbre Típica |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Atmósfera** | Temperatura, Humedad, Viento, Ráfagas, Presión, DewPoint, CAPE | Forzamiento Numérico Directo | 1 punto geográfico interpolado | Horario (1 h) | Open-Meteo API (ECMWF IFS / GFS) | **TRL 7 - Producción** | $\pm 0.8^\circ\text{C}$, $\pm 5\%\text{ HR}$ |
| **Atmósfera** | Radiación Solar ($R_s$, DNI) y $ET_0$ FAO-56 | Penman-Monteith horaria nativa | 1 punto geográfico | Horario (1 h) | Open-Meteo Solar API | **TRL 6 - Integración** | $\pm 8\%\text{ Radiación}$ |
| **Atmósfera** | Microclima Topoclimático de Ladera | Corrección por Lapse-Rate y Sombras DEM | Malla regular 30 m | Horario (1 h) | DEM Copernicus 30 m + Open-Meteo | **TRL 5 - En Desarrollo** | $\pm 1.2^\circ\text{C}$ en ladera |
| **Suelo (Hídrico)** | Humedad de Suelo Actual (v1) | Cubeta Homogénea (Bucket FAO-56) | Polígono predial / 1 capa (0-100 cm) | Diario (24 h) | `soil-water-engine.js` | **TRL 7 - Legacy Activo** | $\pm 15\%\text{ VWC}$ (Sin estratos) |
| **Suelo (Hídrico)** | Humedad Multi-Estrato (v2) | Metamodelo Subrogado ZALF (XGBoost) | Malla H3 Res 9 / 4 capas (0-10, 10-20, 20-40, 40-60 cm) | Paso 0.5 ms (Inferencia local) | Emulador entrenado con MONICA | **TRL 5 - En Validación** | $\pm 3.5\%\text{ VWC}$ |
| **Suelo (Hídrico)** | Simulación Estacional y Auditoría N | Simulador ZALF MONICA C++ On-Demand | Punto representativo / 20 estratos | Asíncrono (5 a 15 s por corrida) | Contenedor backend ZALF | **TRL 4 - Prototipo Servidor** | $\pm 1.8\%\text{ VWC}$ (Física completa) |
| **Suelo (Edafo)** | Textura (Arcilla, Limo, Arena) y SOM % | Funciones Saxton-Rawls / van Bemmelen | 250 metros globales | Estático (Línea base) | ISRIC SoilGrids REST API v2.0 | **TRL 7 - Producción** | $\pm 10\%\text{ textura base}$ |
| **Hidrogeología** | Nivel Freático y Abatimiento ($\Delta h_{wt}$) | Balance de Masa + Cono de Theis/Thiem | Malla H3 Res 6 (Macro-cuenca) | Mensual / Evento de bombeo | Pozos DGA SNIA + Balance Infiltración | **TRL 5 - En Integración** | $\pm 0.4\text{ m}$ de carga freática |
| **Superficie** | Escorrentía y Drenaje Keyline | Saint-Venant 2D simplificado | Malla regular DEM 30 m | Horario / Tormenta | Copernicus DEM + Curvas IDF | **TRL 5 - En Desarrollo** | $\pm 12\%\text{ volumen escorrentía}$ |
| **Vegetación** | Vigor Fotosintético (NDVI, NDWI) | Reflectancia de Superficie BoA | Píxel 10 metros | 5 días (Revisita orbital) | Sentinel-2 L2A (Copernicus) | **TRL 7 - Producción** | $\pm 0.03\text{ NDVI}$ |
| **Telemetría IoT** | Humedad y Conductividad en Campo | **Sensor Virtual Proxy** (con asimilación) | Punto de sonda / Profundidades fijas | 15 minutos | Modelo Físico $\to$ Reemplazable por Sonda | **TRL 4 - Proxy Sintético** | $\pm 4.5\%$ (Virtual) / $\pm 1.0\%$ (Sonda) |

---

## 3. Arquitectura del "Sensor Virtual" y Asimilación Bayesiana

Cuando el productor no dispone de hardware físico en terreno, el sistema activa automáticamente un **Sensor Virtual**:

```
+---------------------------------------------------------------------------------------+
|                               CONTRATO DE SENSOR VIRTUAL                              |
+---------------------------------------------------------------------------------------+
| {                                                                                     |
|   "sensor_id": "probe_virtual_cuartel_04",                                            |
|   "is_virtual": true,                                                                 |
|   "confidence_level": 0.82,                                                           |
|   "uncertainty_sigma": 0.035,                                                         |
|   "depth_strata_cm": [10, 20, 40, 60],                                                |
|   "volumetric_water_content": [0.245, 0.281, 0.312, 0.320],                           |
|   "source_engine": "ZALF_XGBoost_Surrogate_v1.2",                                     |
|   "last_atmospheric_sync": "2026-11-12T03:00:00Z"                                     |
| }                                                                                     |
+---------------------------------------------------------------------------------------+
```

### Comportamiento Dinámico:
1. **Fase Desconectada (Modo Estimación):** La interfaz grafica la curva de humedad con un área sombreada de incertidumbre $\pm 1\sigma$.
2. **Fase Conectada (Plug-and-Play de Hardware):**
   - El productor conecta una sonda LoRaWAN, Tuya o Modbus RS-485.
   - El valor `is_virtual` pasa a `false`.
   - Se activa un **Filtro de Kalman / Asimilador Bayesiano**: las mediciones reales del sensor corrigen automáticamente la conductividad hidráulica saturada ($K_{sat}$) y la capacidad de campo estimadas previamente por SoilGrids.
   - La incertidumbre visual se colapsa a la tolerancia física del sensor ($\pm 1\%$).

---

## 4. Registro Histórico de Evolución del Gemelo Digital (Changelog)

```
[2026-11-12] Versión 3.0 - Arquitectura DestinE Multi-Escala y Modelo Subrogado
  * Definición formal del metamodelo subrogado ZALF (XGBoost) para inferencia en cliente (< 1 ms).
  * Creación del esquema de simulación profunda on-demand en backend para balances anuales.
  * Incorporación del modelo de abatimiento freático Theis-Thiem acoplado a la red de pozos DGA.
  * Plan de ampliación de forzamiento atmosférico Open-Meteo (Radiación solar DNI y ET0 FAO-56 nativa).
  * Establecimiento del patrón arquitectónico "Sensor Virtual con Asimilación Progresiva".

[2026-11-10] Versión 2.0 - Doctrina DestinE y Marco C2 (Command & Control)
  * Transición de visor pasivo de mapas a bucle táctico cerrado (Observar -> Modelar -> Decidir -> Actuar).
  * Formalización de los 8 Momentos Climáticos Críticos y la Matriz de Riesgo Multi-Amenaza R = (H * V) / 100.
  * Incorporación de las directrices del Expediente Meniel y la doctrina de resiliencia hídrica.

[2026-10-15] Versión 1.0 - Plataforma Base AgriTwin Hub
  * Despliegue del motor de cubeta simple FAO-56 en JavaScript (soil-water-engine.js).
  * Integración de 6 capas básicas en Leaflet (Satelital, Pendiente, NDVI, Humedad, Viento, Riesgo).
  * Consumo directo de Open-Meteo REST API para 11 variables atmosféricas horarias.
  * Extracción de propiedades edafológicas desde ISRIC SoilGrids v2.0 (isric_soilgrids_soc.R).
```

---

## 5. Especificación de Implementación Frontend y Backend

### En el Frontend (ya insertado):
- **Módulo 8** de la pestaña *3. Arquitectura de Software & Hardware* del Vault (`index.html`, `#arch-detail-registry`). Es documentación viva, no un panel operativo.

### Evolución propuesta (pendiente):
- Mover la tabla y el historial a un archivo estático `data/engine_registry.json`, servido por `server.cjs` y leído por el Módulo 8. No se requiere un endpoint nuevo.
- Al cerrar cada fase del plan (Reporte Teórico, sección 16) se actualizan TRL y latencia **medida** (`performance.now()`), y se agrega una entrada al historial.

> **Aviso de alcance:** las latencias, TRL y tolerancias de este documento son metas de diseño o ejemplos, no mediciones. El subrogado ZALF, MONICA bajo demanda, la malla H3 y el nivel freático aún no están implementados.

