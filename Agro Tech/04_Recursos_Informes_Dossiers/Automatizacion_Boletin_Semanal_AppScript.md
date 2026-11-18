# 📬 Automatización del Boletín Semanal del Equipo (Google Apps Script)

> **Propósito**: Mantener la alineación táctica y estratégica entre los 7 miembros y líderes de rama mediante un correo semanal automatizado con diseño corporativo AgroTech, emitido todos los lunes a las 08:30 AM sin costo de infraestructura.

---

## 🏗️ 1. Arquitectura de la Solución

```
+-------------------------------------------------------------+
| Google Sheet de Control: "Progresos_Semanales"             |
| (Columnas: Semana, Fecha, Rama 1, Rama 2, Rama 3, Rama 4...) |
+-------------------------------------------------------------+
                              │
                              ▼
+-------------------------------------------------------------+
| Google Apps Script: WeeklyDigest.gs                        |
| • Plantilla HTML responsive (Verde #0B2519 + Acentos)       |
| • Fallback a texto plano                                    |
| • Función de previsualización (enviarBoletinPrueba)        |
+-------------------------------------------------------------+
                              │
         Activador Cron Semanal (Time-Driven Trigger)
         Cada lunes entre 08:00 y 09:00 AM
                              │
                              ▼
+-------------------------------------------------------------+
| Despacho masivo vía GmailApp a los 7 integrantes:           |
| Daniel, Pancho, Wladimir, Rudi, Cantuarias, Luis y Daniela  |
+-------------------------------------------------------------+
```

---

## 📋 2. Columnas de la Google Sheet de Entrada

Para operar con Google Sheets, crea una hoja de cálculo con el nombre de pestaña `Progresos_Semanales` con la siguiente fila de encabezados (Fila 1):

| Columna | Nombre del Campo | Descripción |
| :--- | :--- | :--- |
| **A** | `Semana` | Ej: `Semana 47 (Noviembre 2026)` |
| **B** | `Fecha` | Ej: `18 de Noviembre de 2026` |
| **C** | `Rama 1 (Hardware & Off-Grid)` | Puntos de Rudi Kaatz y Luis González (baterías, cámaras, Living Lab) |
| **D** | `Rama 2 (Ventas B2B & Loteos)` | Puntos de Francisco Ipinza y Wladimir Gutiérrez (leads, convenios) |
| **E** | `Rama 3 (UX & Gamificación)` | Puntos de Cristian Cantuarias y Daniel (visor 3D, feature/ui) |
| **F** | `Rama 4 (Core IP & Teledetección)` | Puntos de Daniel y Daniela Mendoza (Sentinel-2, QA/QC cartográfico) |
| **G** | `Focos Próxima Semana` | 3 o 4 prioridades concretas a destrabar en los próximos 7 días |
| **H** | `Métricas Clave` | Resumen rápido de kits, contratos o hectáreas monitoreadas |
| **I** | `Nota de Dirección` | Cita motivacional o recordatorio de gobernanza/principios |

> [!TIP]
> Si no se conecta a ninguna Google Sheet, el script funciona en **modo Standalone** utilizando datos predeterminados estructurados en el código.

---

## 🚀 3. Instrucciones de Despliegue en 3 Minutos

1. **Crear o Abrir la Google Sheet**:
   - En Google Drive, crea una hoja de cálculo llamada `AgroTech — Bitácora y Progresos Semanales`.
   - Nombra la primera pestaña como `Progresos_Semanales`.
2. **Abrir Apps Script**:
   - Ve al menú superior: **Extensiones > Apps Script**.
3. **Pegar el Código**:
   - Borra el contenido por defecto de `Código.gs` y pega el código de [`scripts/google-apps-script/WeeklyDigest.gs`](file:///Users/danielsantander/Documents/Agrotech/scripts/google-apps-script/WeeklyDigest.gs).
4. **Configurar Correos**:
   - Modifica `CONFIG.RECIPIENTS` con las direcciones reales de los 7 miembros y `CONFIG.TEST_EMAIL` con tu propio correo.
5. **Probar el Envío**:
   - Selecciona la función `enviarBoletinPrueba` en el selector superior y haz clic en **Ejecutar**.
   - Concede los permisos de Gmail solicitados.
   - Revisa tu bandeja de entrada para verificar el renderizado del diseño.
6. **Programar el Envío Automático**:
   - En el menú lateral izquierdo de Apps Script, haz clic en el ícono de **Activadores (reloj)**.
   - Haz clic en **Añadir activador**:
     - Función a ejecutar: `enviarBoletinSemanal`.
     - Fuente del evento: **Según tiempo**.
     - Tipo de activador: **Temporizador semanal**.
     - Día de la semana: **Cada lunes**.
     - Hora: **De 8:00 a 9:00 AM**.
   - Haz clic en **Guardar**.

---

## 🎨 4. Identidad Visual del Boletín

- **Paleta de Colores**:
  - Encabezado: Degradado corporativo `#0B2519` a `#064E3B`.
  - Borde Rama 1 (Hardware): Ámbar `#F59E0B`.
  - Borde Rama 2 (Ventas B2B): Azul `#3B82F6`.
  - Borde Rama 3 (UX 3D): Cian `#06B6D4`.
  - Borde Rama 4 (Core IP): Esmeralda `#10B981`.
  - Caja de Focos Semanales: Fondo dorado suave `#FEF3C7` con tipografía de alto contraste.
- **Acciones Directas**: Botones con acceso directo al portal web de AgroTech y al repositorio oficial de GitHub.
