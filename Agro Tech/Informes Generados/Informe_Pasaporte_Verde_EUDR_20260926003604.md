---
aliases:
  - Pasaporte Verde
  - Certificación EUDR
  - Cero Deforestación
tags:
  - EUDR
  - Exportación
  - CeroDeforestación
  - Sentinel2
  - Carbono
created: 2026-09-26
tipo: pasaporte-eudr
---

# 🌿 Pasaporte Verde & Certificación EUDR — Cero Deforestación

> **Regulación aplicable:** EU 2023/1115 — European Union Deforestation Regulation (EUDR)
> **Fecha de emisión:** 26 de septiembre de 2026
> **Hora UTC:** 00:36:04 UTC
> **Clasificación:** EXPORTACIÓN — Documento para operadores y autoridades competentes UE

---

## 1 · Declaración de Cumplimiento

Por medio del presente documento, **AgroTech SpA** declara que los productos agrícolas originados en el predio identificado a continuación cumplen íntegramente con los requisitos de la Regulación EU 2023/1115 sobre productos libres de deforestación.

| Campo | Valor |
| :--- | :--- |
| **Estado EUDR** | 100% Cero Deforestación — ✅ 100 % Cero Deforestación |
| **Predio de origen** | Fundo Meniel |
| **Rol SII** | 142-88 Retiro |
| **Superficie verificada** | 24.8 ha |
| **Coordenadas centroide** | -36.1425° S, -71.8210° W |
| **País** | Chile |
| **Región** | Maule |
| **Categoría de riesgo país** | Bajo (Benchmarking EU, Art. 29) |
| **Operador responsable** | [[AGROTECH]] SpA |

> [!IMPORTANT]
> La regulación EUDR exige que ningún producto colocado en el mercado europeo provenga de tierras deforestadas después del 31 de diciembre de 2020. Este pasaporte demuestra cumplimiento verificable mediante evidencia satelital y monitoreo continuo.

---

## 2 · Línea Base Satelital — Diciembre 2020

### 2.1 Verificación de Cobertura Forestal

| Parámetro | Valor |
| :--- | :--- |
| Satélite de referencia | Sentinel-2 L2A (ESA Copernicus) |
| Fecha de línea base | 31 de diciembre de 2020 |
| Resolución espacial | 10 m/píxel |
| NDVI baseline (dic-2020) | 0.742 |
| Cobertura forestal dic-2020 | 5.4 ha |
| Cobertura forestal actual | 5.6 ha |
| **Variación neta** | **+0.2 ha** (≥ 0 = sin deforestación) |

### 2.2 Metodología de Detección de Cambios

1. **Adquisición:** Imágenes Sentinel-2 L2A con corrección atmosférica Sen2Cor.
2. **Clasificación supervisada:** Random Forest sobre bandas B2, B3, B4, B8, B11, B12.
3. **Detección de cambios:** Diferencia de NDVI interanual con umbral Δ > 0,15.
4. **Validación en terreno:** Verificación con puntos GPS y fotografías georreferenciadas.

Referencia técnica: [[RewildMapper]] — Módulo de detección de cambios LULC.

---

## 3 · Monitoreo Continuo MRV

Sistema de Monitoreo, Reporte y Verificación operado por [[Agritwin]] con actualización periódica.

| Indicador MRV | Valor Actual | Unidad | Tendencia |
| :--- | ---: | :--- | :--- |
| Captura de carbono | 4.8 | tCO₂e/ha | ▲ Incremento |
| Captura objetivo | 4,8 | tCO₂e/ha | — |
| NDVI promedio predial | 0.78 | — | ▲ +4.2% (Vigor vegetativo creciente) |
| NDVI bosque nativo | 0.88 | — | ▲ Estable (Cobertura dosel cerrada) |
| Superficie bajo restauración | 5.4 | ha | — |

> [!NOTE]
> El valor de 4,8 tCO₂e/ha corresponde al objetivo anual de captura basado en el plan de restauración ecológica del predio, que combina reforestación con flora nativa esclerófila y ganadería regenerativa PRV.

---

## 4 · Biodiversidad & Integridad Ecológica

### 4.1 Inventario de Especies

| Grupo | Cantidad de Especies | Especies Destacadas |
| :--- | ---: | :--- |
| Flora nativa esclerófila | 47 | Quillay, Boldo, Peumo, Litre, Maitén |
| Avifauna | 28 | Cóndor, Águila, Loica, Tenca |
| Entomofauna polinizadora | 19 | Abejas nativas, Sírfidos |
| Fauna terrestre | 12 | Zorro culpeo, Degú, Quique |

### 4.2 Corredores Biológicos

El predio mantiene corredores biológicos continuos que conectan fragmentos de bosque nativo con el sistema ripario del Río Longaví, asegurando la funcionalidad ecológica del paisaje conforme al Art. 10 de la EUDR.

Referencia: [[RewildMapper]] — Módulo de conectividad ecológica.

---

## 5 · Trazabilidad de Productos

### 5.1 Cadena de Custodia

| Etapa | Descripción | Verificación |
| :--- | :--- | :--- |
| **Origen** | Cosecha en Fundo Meniel — cuarteles georreferenciados | GPS + registro [[Agritwin]] |
| **Packing** | Selección, calibrado y embalaje en planta certificada | Código de lote + fecha |
| **Transporte** | Cadena de frío desde planta a puerto de embarque | Sensores IoT temperatura |
| **Exportación** | Puerto de San Antonio / Valparaíso | Documento de embarque |
| **Destino** | Mercado europeo — operadores con due diligence EUDR | Pasaporte Verde digital |

### 5.2 Productos Exportables

| Producto | Especie | Cuartel de Origen | Certificaciones |
| :--- | :--- | :--- | :--- |
| Cereza | *Prunus avium* | A101–A103 | GlobalG.A.P., EUDR |
| Arándano | *Vaccinium corymbosum* | A104–A106 | GlobalG.A.P., EUDR |
| Nuez | *Juglans regia* | A107–A108 | GlobalG.A.P., EUDR |

---

## 6 · Hash Criptográfico MRV

| Campo | Valor |
| :--- | :--- |
| **Hash SHA-256** | `0xacda04605aa2758b` |
| **Algoritmo** | SHA-256 sobre payload JSON del reporte MRV |
| **Timestamp** | 26 de septiembre de 2026 00:36:04 UTC |
| **Verificación** | Reproducible mediante re-cálculo del hash sobre los datos de origen |

> [!TIP]
> El hash criptográfico garantiza la integridad del reporte MRV. Cualquier alteración de los datos subyacentes producirá un hash diferente, permitiendo la detección inmediata de manipulación. Este mecanismo opera como una verificación tipo blockchain sin requerir infraestructura descentralizada.

---

## Firmas & Validación

| Rol | Nombre | Firma |
| :--- | :--- | :--- |
| Arquitecto de Software & Director Técnico | **Daniel Santander** | __________________ |
| Gestión Territorial & Relaciones Institucionales | **Paulina Urrutia** | __________________ |

> **Hash de integridad MRV:** `0xacda04605aa2758b`
> **Generado por:** [[AGROTECH]] — Motor de Reportes v1.0
