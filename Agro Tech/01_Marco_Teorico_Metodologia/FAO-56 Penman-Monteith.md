---
aliases: [FAO-56, Penman-Monteith, Evapotranspiración, Balance Hídrico, ETo]
tags: [Hidrología, FAO56, BalanceHídrico, ETo, Sensores, Maule]
created: 2026-10-01
status: activo
---

# 💧 Modelo Biofísico FAO-56 Penman-Monteith

> "El agua no se gasta: se transpira, se infiltra o se evapora. El gemelo digital calcula cada gota antes de que toque el suelo."

---

## 1. Fundamento Matemático

El cálculo de la **Evapotranspiración de Referencia ($ET_0$)** en la suite **AgriTwin** se basa en la ecuación estándar de la FAO-56:

$$ET_0 = \frac{0.408 \Delta (R_n - G) + \gamma \frac{900}{T + 273} u_2 (e_s - e_a)}{\Delta + \gamma (1 + 0.34 u_2)}$$

Donde:
- $R_n$: Radiación neta en la superficie del cultivo ($MJ/m^2 \cdot día$).
- $G$: Flujo de calor sensible en el suelo ($MJ/m^2 \cdot día$).
- $T$: Temperatura media del aire a 2 metros de altura ($^\circ C$).
- $u_2$: Velocidad del viento a 2 metros ($m/s$).
- $e_s - e_a$: Déficit de presión de vapor ($kPa$).
- $\Delta$: Pendiente de la curva de presión de saturación de vapor ($kPa/^\circ C$).
- $\gamma$: Constante psicrométrica ($kPa/^\circ C$).

---

## 2. Implementación Tri-Estrato en AgriTwin Predio

A diferencia de modelos convencionales de un solo horizonte, el motor en `agritwin/` calcula el balance en 3 estratos radiculares:

| Estrato | Profundidad | Sonda KioT Asociada | Función Agronómica |
|---|---|---|---|
| **Estrato 1** | 0 – 20 cm | FDR-01 (Capacitivo V1.2) | Capa de evaporación directa y microfauna de superficie |
| **Estrato 2** | 20 – 60 cm | FDR-02 / SHT31 | Zona radicular activa (raíces absorbentes de frutales/viñas) |
| **Estrato 3** | 60 – 100 cm | FDR-03 (RS-485 Modbus) | Reserva profunda y drenaje hacia napas freáticas |

---

## 3. Coeficientes de Cultivo ($K_c$) Locales (Maule Sur)

| Cultivo / Cuartel | $K_{c\text{ ini}}$ | $K_{c\text{ med}}$ | $K_{c\text{ fin}}$ | Notas Locales |
|---|---|---|---|---|
| **Cerezos Lapins / Regina** | 0.45 | 1.05 | 0.70 | Sensible a estrés hídrico post-cosecha |
| **Viña Patrimonial País (Rulo)** | 0.30 | 0.65 | 0.40 | Adaptada a secano interior |
| **Arándano Duke Orgánico** | 0.40 | 0.95 | 0.65 | Requiere riego por pulsos en suelo trumao |
| **Bosque Esclerófilo Nativo** | 0.25 | 0.45 | 0.30 | Resiliencia estival extrema |

---

## 4. Conexión con el Ecosistema

- **Entrada:** Nodos [[Sensores y Hardware KioT]] vía WebSockets sub-50ms en puerto `:7773`.
- **Condiciones de Borde:** Viento Puelche foehn y humedad relativa desde [[AgroTwin Regional Parral y Retiro]] (`:7774`).
- **Salida:** Recomendación horaria de riego nocturno para tarifa eléctrica valle en [[Predio Meniels]].
