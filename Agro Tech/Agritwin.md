---
aliases: [AgriTwin, AgriTwin 3D, DigitalTwin, Gemelo Digital]
tags: [DigitalTwin, ThreeJS, WebGL, Sensores, Heladas, FAO56, IoT, Maule]
created: 2026-09-25
status: activo
version: 2.4
puerto: 7773
---

# 🌐 [[Agritwin]] • Gemelo Digital Biofísico 3D de Predios Agrícolas

> **Definición**: [[Agritwin]] es el producto insigne de [[AGROTECH]]. Es una plataforma mecatrónica y de simulación 3D que replica digitalmente fundos y parcelas agrícolas con precisión milimétrica y biofísica, integrando telemetría de campo, datos geoespaciales y observación satelital.

---

## ⚡ 1. Integración Multifuente de Datos

El software integra de manera desacoplada:
1. **[[datos satelitales]]**: Pases multiespectrales cada 5 días de **Sentinel-2 L2A** (bandas B02, B04, B08, B11) y **Landsat 9** para calcular índices de vigor (`NDVI`), contenido foliar de agua (`NDWI`), índice de estrés hídrico (`CWSI`) y reflectancia superficial.
2. **[[datos climáticos]] y [[datos meteorológicos]]**: Red agroclimática de referencia (DGA / Agromet) y estaciones in situ.
3. **[[geología]] y [[data del suelo]]**: Modelos de textura SoilGrids, curvas de retención hídrica y datos edafológicos del Maule.
4. **[[data in situ]] de [[sensores]]**: Redes LoRaWAN / WiFi de nodos [[KioT Hardware]] (sondas FDR multinivel a 20, 40, 60 y 100 cm, sensores de temperatura industrial DS18B20 y sensores de mojadura foliar).

---

## 🖥️ 2. Motor de Simulación y Capacidades

* **[[consola de monitoreo]] 3D**: Renderizado WebGL acelerado por GPU en Three.js con curvas de nivel LIDAR, sombreado solar dinámico por hora del día e inspección cuartel por cuartel.
* **Modelo Biofísico [[FAO-56 Penman-Monteith]]**: Balance cascada de humedad en 3 estratos de suelo activo desde el día 1, incluso antes de la instalación física de sondas.
* **Modelo Katabático Anti-Heladas**: Detección de drenaje de aire frío en laderas y hondonadas térmicas para pronosticar congelamiento de brotes con 72h de anticipación y disparar alertas urgentes por WhatsApp y activación de asperjadores.
* **Mapas de [[riesgo climático]]**: Análisis de recurrencia de sequías, heladas históricas y disponibilidad de napas a 10 años para compradores de parcelas.
* **Recomendaciones en tiempo real**: Guías agronómicas basadas en la [[Permacultura]] y la [[agroecología]].

---

## 🤝 3. Gobernanza y Repartición Justa

[[AgroTech]] y su producto [[AgriTwin]] se producen colaborativamente en equipo:
* Se reconoce expresamente la **autoría intelectual** de cada desarrollador, agrónomo, diseñador y técnico de campo.
* **Repartición justa de recursos y ganancias**: Basada en la colaboratividad, el valor aportado y métricas de producción transparente.
* El tiempo y energía invertida por cada miembro busca ser valorado y protegido bajo el principio de la [[Economía de los Hombros]].

---

## 🌾 Predios de Validación Activa
* **[[Predio Meniels]]** (Parral, Maule): 24.8 ha modeladas con 8 cuarteles, parque agrovoltaico y sensores IOT-SN-01 a IOT-SN-06.
* **[[Fundo El Boldo]]** (Curicó, Maule): Monitoreo crítico de cerezos Lapins y arándanos con microaspersión antiheladas.

---
*Vínculos*: [[AGROTECH]] • [[KioT Hardware]] • [[RewildMapper]] • [[Pasaporte verde]] • [[Permacultura]]
