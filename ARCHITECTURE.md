# Regla Arquitectónica Canónica — AgriTwin & AgroTech Chile

> **REGLA DE ORO DE DESPLIEGUE Y RUNTIME (VIGENTE Y OBLIGATORIA):**
> **`AgriTwin` es una única aplicación monolítica consolidada. Corre EXCLUSIVAMENTE en el puerto `7777`.**

---

## 1. Topología del Ecosistema

1. **AgriTwin (`agritwin-app`):**
   * **Puerto Único Local:** `7777` (`http://localhost:7777`).
   * **Componentes Integrados (Single-Pane-of-Glass):**
     * Predio 3D (Simulador de alta resolución de cuarteles y árboles en Three.js).
     * Cuenca y Territorio (Río Longaví, Embalse Bullileo, capas orográficas en Leaflet).
     * Hub Central y Cockpit de Decisiones.
     * Motores Biofísicos Headless (`soil-water-engine.js`, `basin-hydrology-engine.js`, `stac-cog-client.js`, `data-cube-engine.js`).
     * Capa OGC API (EDR, Features, STAC/COG).
   * **Comando Único de Ejecución:** `node agritwin/server.cjs` (o `./scripts/orchestrator.cjs`).

2. **AgroTech Web & HQ:**
   * **Despliegue Remoto:** Corren directamente en la infraestructura en la nube (**GitHub / Coder**).
   * **NO corren como microservicios locales** ni ocupan puertos locales en el flujo diario de AgriTwin.

3. **Rewild Suite:**
   * Es un proyecto independiente de diseño regenerativo. No forma parte del runtime de AgriTwin.

---

## 2. Prohibición de Disgregación de Puertos

Queda estrictamente prohibido tratar a AgriTwin como microservicios disgregados en puertos múltiples.
Los siguientes puertos antiguos quedan **TOTALMENTE OBSOLETOS Y DEPRECADOS**:
* ~~`7770` (AgroTech HQ local)~~ ➔ Eliminado. Corre en GitHub/Coder.
* ~~`7771` (AgroTech Web local)~~ ➔ Eliminado. Corre en GitHub/Coder.
* ~~`7772` (Rewild Suite local)~~ ➔ Proyecto independiente.
* ~~`7773` (AgriTwin Predio separado)~~ ➔ Integrado dentro del puerto `7777`.
* ~~`7774` (AgriTwin Cuenca separado)~~ ➔ Integrado dentro del puerto `7777`.

---

## 3. Directriz para Agentes y Desarrolladores

* Cualquier nueva funcionalidad (incluida la **Migración 8.2** y la integración de estándares **OGC**) debe montarse sobre el servidor consolidado en el **puerto 7777**.
* Nunca propongas, configures o consultes puertos diferentes a `7777` para la aplicación `agritwin`.
