---
aliases:
  - Auditoría Agronómica
  - Informe Predial Meniels
  - Auditoría FDR Suelo
tags:
  - Auditoría
  - Agronómica
  - FDR
  - Heladas
  - PRV
  - Puelche
created: 2026-09-26
tipo: auditoria-predial
---

# 🔬 Auditoría Agronómica Predial In Situ — Fundo Meniel

> **Fecha de emisión:** {{fecha_emision}}
> **Hora UTC:** {{hora_utc}}
> **Clasificación:** TÉCNICO-OPERATIVO — Uso interno y asesoría agronómica
> **Auditor:** [[AGROTECH]] — Sistema [[Agritwin]]

---

## 1 · Datos del Predio

| Campo | Valor |
| :--- | :--- |
| **Predio** | {{predio_nombre}} |
| **Rol SII** | {{rol_sii}} |
| **Superficie Total** | {{superficie_ha}} ha |
| **Cuarteles Productivos** | 8 (A101 – A108) |
| **Comuna** | Retiro / Parral |
| **Región** | Maule |
| **Propietario** | Cooperativa de Trabajo Las Camelias |
| **Referencia** | [[Predio Meniels]] |

---

## 2 · Diagnóstico de Suelo FDR Tri-Estrato

Datos capturados por sensores de Reflectometría en el Dominio de la Frecuencia (FDR) de la red [[KioT Hardware]].

| Estrato | Profundidad | Humedad VWC | Capacidad de Campo | Punto de Marchitez | Interpretación |
| :--- | :--- | ---: | ---: | ---: | :--- |
| **Superficial** | 0–20 cm | {{fdr_0_20_vwc}} % | 32 % | 15 % | {{fdr_0_20_interpretacion}} |
| **Intermedio** | 20–60 cm | {{fdr_20_60_vwc}} % | 34 % | 16 % | {{fdr_20_60_interpretacion}} |
| **Profundo** | 60–100 cm | {{fdr_60_100_vwc}} % | 36 % | 18 % | {{fdr_60_100_interpretacion}} |

> [!NOTE]
> Los valores de Capacidad de Campo y Punto de Marchitez corresponden a la caracterización edafológica del suelo franco-arcilloso predominante en [[Predio Meniels]]. Valores de VWC por debajo del 50 % de agua disponible activan recomendación de riego.

---

## 3 · Alerta Puelche — Regla 30-30-30

El viento Puelche es un fenómeno föhn que desciende desde la Cordillera de los Andes por el valle del Maule, generando condiciones críticas de sequedad, temperatura y velocidad de viento.

### 3.1 Estado Actual

| Parámetro | Valor Actual | Umbral Crítico | Estado |
| :--- | ---: | ---: | :--- |
| Velocidad del viento | {{viento_puelche_kmh}} km/h | > 30 km/h | {{puelche_viento_estado}} |
| Humedad relativa | {{humedad_relativa}} % | < 30 % | {{puelche_humedad_estado}} |
| Temperatura | {{temperatura_actual}} °C | > 30 °C | {{puelche_temp_estado}} |
| **Índice FWI** | **{{fwi_indice}}** | **> 25** | **{{fwi_estado}}** |

### 3.2 Regla 30-30-30

La **Regla 30-30-30** define condiciones de riesgo extremo de incendio cuando se cumplen simultáneamente:

- 🌬️ Viento **> 30 km/h**
- 💧 Humedad relativa **< 30 %**
- 🌡️ Temperatura **> 30 °C**

> [!CAUTION]
> Cuando la Regla 30-30-30 se activa, el sistema [[Agritwin]] emite alerta roja automática. Se recomienda suspender labores de fuego, activar cortafuegos y alertar a CONAF.

---

## 4 · Zonificación de Heladas Catabáticas

### 4.1 Estado de Alerta

| Parámetro | Valor |
| :--- | :--- |
| **Alerta helada catabática** | {{alerta_helada_catabatica}} |
| Hora de riesgo máximo | 05:30 AM (hora local) |
| Temperatura mínima proyectada | {{temp_minima_proyectada}} °C |
| Inversión térmica detectada | {{inversion_termica}} |

### 4.2 Modelo de Inversión Térmica

Las heladas catabáticas se producen por el descenso gravitacional de aire frío desde las laderas hacia los fondos de valle durante noches despejadas y sin viento. El modelo [[Agritwin]] identifica las zonas de acumulación de aire frío mediante:

1. **Modelo digital de elevación (DEM)** a 12,5 m de resolución.
2. **Análisis de flujo de aire frío** (cold air drainage) basado en pendiente y orientación.
3. **Sensores de temperatura** distribuidos en gradiente altitudinal dentro del predio.
4. **Correlación histórica** con eventos de helada registrados en los últimos 5 años.

**Cuarteles de mayor riesgo:** A101, A102, A105 (fondos de quebrada).

> [!WARNING]
> Los cuarteles en fondos de quebrada presentan riesgo de helada 3,5 veces superior a los cuarteles en ladera media. Se recomienda mantener ventiladores antiescarcha operativos desde abril a septiembre.

---

## 5 · Ganadería Regenerativa PRV

Pastoreo Racional Voisin (PRV) implementado como componente integral del sistema agroecológico del predio.

| Parámetro | Valor | Referencia Óptima |
| :--- | ---: | ---: |
| Carga animal | {{ugm_ha_ganado}} UGM/ha | 1,8 UGM/ha |
| Reposo forrajero | {{reposo_forrajero_dias}} días | 42 días |
| Aporte materia orgánica | {{materia_organica_aporte}} kg/m² | +4,2 kg/m² |
| N° de potreros rotativos | {{n_potreros}} | ≥ 30 |
| Período de ocupación | {{ocupacion_dias}} días | 1–3 días |

> [!TIP]
> El sistema PRV con 42 días de reposo forrajero permite la recuperación completa de la pradera, maximizando la fotosíntesis y el aporte de materia orgánica al suelo. Referencia: [[Permacultura]] — Integración animal-vegetal.

---

## 6 · NDVI por Cuartel

Índice de Vegetación de Diferencia Normalizada (NDVI) calculado a partir de imágenes Sentinel-2 procesadas por [[RewildMapper]].

| Cuartel | Especie / Uso | NDVI Actual | NDVI Anterior | Δ NDVI | Estado |
| :--- | :--- | ---: | ---: | ---: | :--- |
| A101 | {{cuartel_a101_uso}} | {{ndvi_a101}} | {{ndvi_a101_prev}} | {{delta_ndvi_a101}} | {{estado_a101}} |
| A102 | {{cuartel_a102_uso}} | {{ndvi_a102}} | {{ndvi_a102_prev}} | {{delta_ndvi_a102}} | {{estado_a102}} |
| A103 | {{cuartel_a103_uso}} | {{ndvi_a103}} | {{ndvi_a103_prev}} | {{delta_ndvi_a103}} | {{estado_a103}} |
| A104 | {{cuartel_a104_uso}} | {{ndvi_a104}} | {{ndvi_a104_prev}} | {{delta_ndvi_a104}} | {{estado_a104}} |
| A105 | {{cuartel_a105_uso}} | {{ndvi_a105}} | {{ndvi_a105_prev}} | {{delta_ndvi_a105}} | {{estado_a105}} |
| A106 | {{cuartel_a106_uso}} | {{ndvi_a106}} | {{ndvi_a106_prev}} | {{delta_ndvi_a106}} | {{estado_a106}} |
| A107 | {{cuartel_a107_uso}} | {{ndvi_a107}} | {{ndvi_a107_prev}} | {{delta_ndvi_a107}} | {{estado_a107}} |
| A108 | {{cuartel_a108_uso}} | {{ndvi_a108}} | {{ndvi_a108_prev}} | {{delta_ndvi_a108}} | {{estado_a108}} |

**Leyenda de estado:** 🟢 Óptimo (> 0,65) · 🟡 Moderado (0,45–0,65) · 🔴 Estrés (< 0,45)

---

## 7 · Estado del Tranque

| Parámetro | Valor |
| :--- | :--- |
| **Volumen actual** | {{tranque_volumen_m3}} m³ |
| **Capacidad máxima** | 18.500 m³ |
| **Porcentaje de llenado** | {{tranque_porcentaje}} % |
| **Autonomía de riego estimada** | {{autonomia_riego_dias}} días |
| **Calidad de agua** | {{calidad_agua}} |
| **Última inspección estructural** | {{ultima_inspeccion}} |

---

## 8 · Recomendaciones Operativas

### 8.1 Riego & Suelo
- [ ] Ajustar frecuencia de riego según diagnóstico FDR tri-estrato.
- [ ] Priorizar cuarteles con VWC por debajo del 50 % de agua disponible.
- [ ] Programar subsolado Keyline de mantención en sectores compactados.

### 8.2 Protección contra Heladas
- [ ] Verificar operatividad de ventiladores antiescarcha en A101, A102, A105.
- [ ] Activar protocolo de riego antiescarcha cuando {{alerta_helada_catabatica}} = ACTIVA.
- [ ] Monitorear inversión térmica nocturna vía sensores de gradiente altitudinal.

### 8.3 Prevención de Incendios
- [ ] Mantener cortafuegos perimetrales despejados (ancho mínimo 6 m).
- [ ] Revisar plan de evacuación ganadera ante activación de Regla 30-30-30.
- [ ] Coordinar con CONAF brigada de respuesta rápida sector Longaví Sur.

### 8.4 Ganadería PRV
- [ ] Respetar período mínimo de reposo forrajero de {{reposo_forrajero_dias}} días.
- [ ] Evaluar ajuste de carga animal si {{ugm_ha_ganado}} > 2,0 UGM/ha.
- [ ] Registrar aporte de materia orgánica post-pastoreo por potrero.

---

## Firmas & Validación

| Rol | Nombre | Firma |
| :--- | :--- | :--- |
| Arquitecto de Software & Director Técnico | **Daniel Santander** | __________________ |
| Gestión Territorial & Relaciones Institucionales | **Paulina Urrutia** | __________________ |

> **Hash de integridad MRV:** `{{mrv_hash}}`
> **Generado por:** [[AGROTECH]] — Motor de Reportes v1.0
