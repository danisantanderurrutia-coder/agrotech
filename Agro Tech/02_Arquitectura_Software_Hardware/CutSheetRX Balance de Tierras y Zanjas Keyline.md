---
title: CutSheetRX Balance Volumétrico de Tierras y Zanjas Keyline
aliases: [CutSheetRX, Balance de Tierras, Movimiento de Tierras Keyline, Yeomans Keyline, Siembra de Agua]
tags: [CutSheetRX, Keyline, Topografía, Hidrología, Saint-Venant, Suelos, Infiltración]
created: 2026-11-18
version: 3.1.0
---

# 🚜 CutSheetRX Balance Volumétrico de Tierras y Zanjas Keyline

> **Resumen Técnico**: El módulo CutSheetRX modela matemáticamente el diseño y ejecución de obras de conservación de suelos y cosecha de agua bajo el patrón *Keyline* (Línea Clave de P.A. Yeomans). Calcula perfiles transversales, balance neutro de tierras ($V_{\text{cut}} \approx V_{\text{fill}}$ con esponjamiento) y su impacto hidrodinámico en la disipación de crecidas y recarga vadosa.

---

## 1. Formulación Matemática de Compensación In Situ

El balance de tierras integra las áreas de desmonte ($A_{\text{cut}}$) y terraplén ($A_{\text{fill}}$) a lo largo de las isolíneas de intervención mediante el método de áreas medias:

$$V_{\text{cut}} = \sum_{k=1}^{M-1} \frac{A_{\text{cut}, k} + A_{\text{cut}, k+1}}{2} \cdot \Delta s_k$$

$$V_{\text{fill}} = \sum_{k=1}^{M-1} \frac{A_{\text{fill}, k} + A_{\text{fill}, k+1}}{2} \cdot \Delta s_k$$

Para lograr **balance neutro en predio** sin requerir acarreo externo ni botaderos:

$$V_{\text{fill}} = C_{\text{swell}} \cdot V_{\text{cut}}, \quad \text{con } C_{\text{swell}} \in [1.15, 1.25]$$

Donde $C_{\text{swell}}$ representa el factor volumétrico de esponjamiento mecánico del suelo franco-arcilloso.

---

## 2. Atenuación Hidráulica de Crecidas (Saint-Venant 2D Acoplado)

Las zanjas a nivel actúan como trampas de retención de agua de escorrentía superficial:
1. **Volumen Útil Almacenado**: En Fundo Meniel, la excavación de $4.200\,\text{m}^3$ en laderas genera una capacidad de retención de $18.500\,\text{m}^3$ junto con tranques de ladera.
2. **Retardo Temporal del Hidrograma**: El tiempo al pico de escorrentía superficial ($T_c$) se retrasa de $42\,\text{min}$ (ladera desprotegida) a $185\,\text{min}$ ($\Delta t = +143\,\text{min}$).
3. **Disipación del Caudal Punta**: El caudal pico superficial decrece de $3.82\,\text{m}^3/\text{s}$ a $1.12\,\text{m}^3/\text{s}$ ($-70.7\%$), protegiendo las llanuras bajas frente a aluviones.

---

## 3. Siembra de Agua y Recarga del Perfil Vadoso

El agua embalsada en zanjas no se evapora ni erosiona: se infiltra lentamente alimentando el modelo Richards 1D de 5 estratos hacia los horizontes profundos ($50\text{--}100\,\text{cm}$), extendiendo la disponibilidad de agua útil ($PAW$) en secano interior durante los meses estivales.

---

## 4. Conexiones en el Ecosistema

* **Endpoints API**: `POST /api/terrain/cutsheet`, `GET /api/terrain/keyline-profiles`.
* **Código Fuente**: `agritwin/services/cutsheet-rx.cjs`.
* **Artículos & Reportes**:
  * [[01_Marco_Teorico_Metodologia/MATRIZ_RELACIONES_GLOBALES_ARQUITECTURA_8_AB|Matriz de Relaciones Globales 8.a y 8.b]]
  * `agritwin/docs/PAPER_CIENTIFICO_AGRITWIN_MARCO_TEORICO_UQ.md` (Sección 2.2.11 y Figura 15).
  * `agritwin/docs/INFORME_HINDCAST_REAL_INUNDACIONES_MAULE_MATAQUITO.md` (Sección 2.2, 10 y Figura 15).
  * `referencias/TRATADO_MIGRACION_ARQUITECTURA_AGRITWIN_V3.md` (Sección 16.9.2).
* **Notas Relacionadas en Vault**:
  * [[Malla AMR Hexgrid y Escalas N1-N4]]
  * [[Calicata Digital 1D Campbell Richards]]
  * [[Econom??a de los Hombros]]
  * [[Permacultura]]
