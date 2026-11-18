---
title: Calicata Digital 1D y Perfil de Suelo Campbell-Richards
aliases: [Calicata Digital, Richards 1D, Campbell-Richards, Sensor Virtual Edafico, 5 Estratos]
tags: [Edafología, Richards, Campbell, Feddes, MONICA, SPIFFS, EKF, IoT]
created: 2026-11-18
version: 3.1.0
---

# 🕳️ Calicata Digital 1D y Perfil de Suelo Campbell-Richards

> **Resumen Técnico**: El motor de Calicata Digital 1D en AgriTwin v3.1.0 discretiza el subsuelo en 5 estratos edafológicos continuos ($0\text{--}10\,\text{cm}$, $10\text{--}25\,\text{cm}$, $25\text{--}50\,\text{cm}$, $50\text{--}75\,\text{cm}$, $75\text{--}100\,\text{cm}$). Resuelve la ecuación no lineal de Richards con retención matricial de Campbell $\psi(\theta)$, integrando la absorción radicular de Feddes y el transporte de nitrógeno de ZALF MONICA.

---

## 1. Discretización de Horizontes y Parámetros Pedológicos

Cada estrato $j \in \{1,\dots,5\}$ hereda sus propiedades texturales de SoilGrids 250m / CIREN:
* $\theta_s$: Humedad a saturación ($m^3/m^3$).
* $\theta_r$: Humedad residual ($m^3/m^3$).
* $\psi_e$: Potencial de entrada de aire ($J/kg$ o $kPa$).
* $b$: Parámetro de distribución de tamaño de poros de Campbell.
* $K_{\text{sat}}$: Conductividad hidráulica saturada ($mm/h$).

$$K(\theta) = K_{\text{sat}} \cdot \left(\frac{\theta}{\theta_s}\right)^{2b + 3}, \quad \psi(\theta) = \psi_e \cdot \left(\frac{\theta}{\theta_s}\right)^{-b}$$

---

## 2. Acoplamiento Biofísico: Ecuación de Richards 1D

$$\frac{\partial \theta}{\partial t} = \frac{\partial}{\partial z} \left[ K(\theta) \left( \frac{\partial \psi}{\partial z} + 1 \right) \right] - S_{\text{radicular}}(z, t)$$

Donde el término de extracción por raíces $S_{\text{radicular}}$ se rige por la función de estrés de **Feddes**:
* **$\psi > \psi_1$ ($-1.5\,\text{kPa}$)**: Anoxia radicular por exceso de agua ($\alpha = 0$).
* **$\psi_1 \ge \psi \ge \psi_2$**: Fase de desoxigenación parcial ($0 < \alpha < 1$).
* **$\psi_2 \ge \psi \ge \psi_3$**: Rango óptimo de transpiración ($\alpha = 1$).
* **$\psi_3 \ge \psi \ge \psi_4$ ($-1500\,\text{kPa}$)**: Estrés por marchitez permanente ($\alpha \to 0$).

---

## 3. Telemetría de Respaldo: SPIFFS WAL + Filtro de Kalman (EKF)

Cuando una sonda IoT pierde conectividad 4G o sufre cortes de energía:
1. Las lecturas instantáneas de capacitancia se almacenan en un buffer circular en la memoria flash local del ESP32 (`SPIFFS Write-Ahead Log`).
2. Al reanudarse la conexión, el nodo transmite el lote completo mediante `POST /api/iot/spiffs/sync`.
3. El motor `spiffs-wal-shadow.cjs` ejecuta un **Filtro de Kalman Extendido (EKF)** que asimila las observaciones retardadas con la física de Richards, eliminando el ruido y garantizando la coherencia histórica sin pérdida de datos (*Zero Telemetry Leakage*).

---

## 4. Conexiones en el Ecosistema

* **Endpoints API**: `GET /api/calicata/profile/:parcelId`, `POST /api/iot/spiffs/sync`, `GET /api/ogc/edr/collections/soil_moisture_profiles/position`.
* **Código Fuente**: `agritwin/services/richards-monica-engine.cjs`, `agritwin/services/spiffs-wal-shadow.cjs`.
* **Artículos & Reportes**:
  * [[01_Marco_Teorico_Metodologia/MATRIZ_RELACIONES_GLOBALES_ARQUITECTURA_8_AB|Matriz de Relaciones Globales 8.a y 8.b]]
  * `agritwin/docs/PAPER_CIENTIFICO_AGRITWIN_MARCO_TEORICO_UQ.md` (Sección 2.2.12 y Figuras 12, 13).
  * `referencias/TRATADO_MIGRACION_ARQUITECTURA_AGRITWIN_V3.md` (Sección 16.9.3).
* **Notas Relacionadas en Vault**:
  * [[Malla AMR Hexgrid y Escalas N1-N4]]
  * [[CutSheetRX Balance de Tierras y Zanjas Keyline]]
  * [[Sensores y Hardware KioT]]
  * [[FAO-56 Penman-Monteith]]
