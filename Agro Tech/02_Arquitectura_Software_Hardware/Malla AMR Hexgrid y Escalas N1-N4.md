---
title: Malla Adaptativa AMR Hexgrid y Jerarquía Multiescala N1-N4
aliases: [Malla AMR, Hexgrid AMR, AMR N1-N4, Adaptive Mesh Refinement, Hexágonos H3]
tags: [AMR, Hexgrid, Topografía, Microrelieve, Campbell, ZALF, Saint-Venant, Arquitectura]
created: 2026-11-18
version: 3.1.0
---

# ⬡ Malla Adaptativa AMR Hexgrid y Jerarquía Multiescala N1-N4

> **Resumen Técnico**: La Malla Adaptativa AMR (*Adaptive Mesh Refinement*) en AgriTwin v3.1.0 resuelve la brecha biofísica entre la escala regional de cuenca macro y la microtopografía intra-cuartel. Permite refinar selectivamente celdas hexagonales desde N1 (macrozona $100\text{--}500\,\text{m}$) hasta N4 ($1.5\text{--}3\,\text{m}$) preservando la continuidad de masa hídrica y de nitrógeno.

---

## 1. La Jerarquía de Subdivisión H3 / Hexgrid

| Nivel AMR | Radio Apotema | Área Celda | Fenómeno Físico Resuelto | Motor de Cálculo Asociado |
|:---|:---|:---|:---|:---|
| **N1 (Macro)** | $250\,\text{m}$ | $\approx 16\,\text{ha}$ | Cono de cuenca aportante $\Omega$, escorrentía macro regional | `basin-drainage.cjs`, HAND |
| **N2 (Meso)** | $80\,\text{m}$ | $\approx 1.6\,\text{ha}$ | Mancha de suelo SoilGrids, balance hídrico cuartel básico | `fao56-engine.cjs`, ERA5-Land |
| **N3 (Táctico)** | $25\,\text{m}$ | $\approx 1.600\,\text{m}^2$ | Toposerie: loma, media ladera, swale (fondos cóncavos) | `richards-monica-engine.cjs` |
| **N4 (Micro)** | $3\,\text{m}$ | $\approx 23\,\text{m}^2$ | Microtopografía DEM, zanjas Keyline, estrés localizado | `hexgrid-amr-engine.cjs`, CutSheetRX |

---

## 2. Principio de Conservación de Masa e Invariancia de Escala

Para cualquier variable de estado escalar $X$ (humedad volumétrica $\theta$, nitrato lixiviable $NO_3$, o lámina superficial $h$), el paso de una celda padre $C_{\text{padre}}$ a sus 7 celdas hijas $C_{i}$ ($i=1\dots 7$) obedece:

$$\sum_{i=1}^{7} A_i \cdot X_i = A_{\text{padre}} \cdot X_{\text{padre}} \pm \epsilon, \quad \text{donde } \epsilon < 0.015\%$$

La heterogeneidad intra-celular se modula mediante la varianza topográfica local deducida del DEM Copernicus / ALOS:

$$X_i = X_{\text{padre}} \cdot \left[ 1 + \gamma \cdot \left(\frac{z_i - \bar{z}}{\sigma_z}\right) \right]$$

---

## 3. Validación Cuantitativa y Evidencia Experimental

En la **Figura 14** del *Paper Científico AgriTwin Consolidado*, se demostró que el modelo homogéneo tradicional (polígono plano ciego) asume una humedad promedio del $24.2\%$ con un error cuadrático medio de $RMSE = 8.45\%$. En contraste, la malla AMR N4 captura la bifurcación biofísica:
* **Cresta/Loma**: $VWC = 16.8\%$, estrés hídrico moderado ($K_s = 0.42$).
* **Swale/Fondo cóncavo**: $VWC = 33.1\%$, riesgo de anoxia por acumulación de escorrentía lateral.
* **Métrica de ajuste**: $R^2 = 0.942$, $RMSE = 1.62\%$ ($5.2\times$ menor dispersión).

---

## 4. Conexiones en el Ecosistema

* **Endpoints API**: `GET /api/zalf/hexgrid`, `POST /api/amr/refine`.
* **Código Fuente**: `agritwin/services/hexgrid-amr-engine.cjs`, `agritwin/public/js/hub/tactical-surface-ui.js`.
* **Artículos & Reportes**:
  * [[01_Marco_Teorico_Metodologia/MATRIZ_RELACIONES_GLOBALES_ARQUITECTURA_8_AB|Matriz de Relaciones Globales 8.a y 8.b]]
  * `agritwin/docs/PAPER_CIENTIFICO_AGRITWIN_MARCO_TEORICO_UQ.md` (Sección 2.2.10 y Figura 14).
  * `referencias/TRATADO_MIGRACION_ARQUITECTURA_AGRITWIN_V3.md` (Sección 16.9.1).
* **Notas Relacionadas en Vault**:
  * [[CutSheetRX Balance de Tierras y Zanjas Keyline]]
  * [[Calicata Digital 1D Campbell Richards]]
  * [[ARQUITECTURA_INGESTA_DATOS_AGRITWIN]]
