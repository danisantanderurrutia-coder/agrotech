#!/usr/bin/env python3
"""
Incorpora el Paper 3 (Informe Técnico de Megainundaciones 2023) en las tarjetas de recursos del Vault en index.html:
1. Header principal del Vault (botones de acceso rápido superior).
2. Subtab 'docs-dossier' (Recursos, Datos & Dossiers): Tarjeta Hero Banner destacada equivalente a la del Paper 2.
3. Subtab 'docs-uq' (Calibración, UQ & Validación): Botones de informe y tarjetas de acceso directo a los 3 sitios de inundación.
"""

import sys

INDEX_PATH = "index.html"

with open(INDEX_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# 1. HEADER PRINCIPAL DEL VAULT (Líneas ~5815)
vault_header_target = """                <div class="flex items-center gap-2 font-mono text-xs shrink-0 flex-wrap">
                    <a href="docs/INFORME_HINDCAST_REAL_IMPRIMIBLE.html" target="_blank" class="px-3.5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer" title="Abrir Informe Técnico Hindcast Imprimible (Santa Juana & Viña del Mar)">
                        <span>🔥</span> <span>Informe Hindcast (HTML)</span>
                        <span class="text-rose-200">↗</span>
                    </a>
                    <a href="docs/PAPER_CIENTIFICO_AGRITWIN_IMPRIMIBLE.html" target="_blank" class="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer" title="Abrir Monografía Científica Canónica Imprimible (KaTeX • IMRAD • 7 Figuras 300 DPI)">
                        <span>📄</span> <span>Monografía Imprimible (Paper)</span>
                        <span class="text-blue-200">↗</span>
                    </a>
                </div>"""

vault_header_replacement = """                <div class="flex items-center gap-2 font-mono text-xs shrink-0 flex-wrap">
                    <a href="docs/INFORME_HINDCAST_REAL_IMPRIMIBLE.html" target="_blank" class="px-3 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer" title="Abrir Paper 2: Informe Hindcast Megaincendios (Santa Juana & Viña del Mar)">
                        <span>🔥</span> <span>Paper 2: Incendios</span>
                        <span class="text-rose-200">↗</span>
                    </a>
                    <a href="docs/INFORME_HINDCAST_REAL_INUNDACIONES_IMPRIMIBLE.html" target="_blank" class="px-3 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer" title="Abrir Paper 3: Informe Hindcast Megainundaciones (Licantén, Longaví, Ancoa)">
                        <span>🌊</span> <span>Paper 3: Inundaciones</span>
                        <span class="text-cyan-200">↗</span>
                    </a>
                    <a href="docs/PAPER_CIENTIFICO_AGRITWIN_IMPRIMIBLE.html" target="_blank" class="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer" title="Abrir Paper 1: Monografía Científica Canónica Imprimible (KaTeX • IMRAD • 7 Figuras 300 DPI)">
                        <span>📄</span> <span>Paper 1: Monografía</span>
                        <span class="text-blue-200">↗</span>
                    </a>
                </div>"""

if vault_header_target in content:
    content = content.replace(vault_header_target, vault_header_replacement)
    print("✔ 1. Botón Paper 3 agregado al Header principal del Vault")
else:
    print("ℹ Header principal del Vault ya actualizado o target no encontrado")

# 2. SUBTAB RECURSOS / DOSSIER: TARJETA HERO DEL PAPER 3
# Buscamos el cierre de la tarjeta del Paper 2 en subtab-recursos
card_paper2_end = """                        <a href="docs/INFORME_HINDCAST_REAL_SANTA_JUANA_VINA.md" target="_blank" class="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all">
                            <span>📄</span> <span>Ver Markdown</span>
                        </a>
                    </div>
                </div>"""

card_paper3_html = """

                <!-- Banner Destacado: INFORME TÉCNICO DE AUDITORÍA RETROSPECTIVA CIEGA DE MEGAINUNDACIONES (PAPER 3) -->
                <div class="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-[#061826] to-stone-950 text-white border border-cyan-500/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5 font-sans">
                    <div class="flex items-start sm:items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-cyan-600/30 border border-cyan-500/50 text-cyan-300 flex items-center justify-center text-2xl shadow-inner shrink-0">
                            🌊⚖️
                        </div>
                        <div class="space-y-1">
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 uppercase">AUDITORÍA RETROSPECTIVA CIEGA &bull; PAPER 3</span>
                                <span class="text-xs text-cyan-400/60">•</span>
                                <span class="text-xs font-mono text-amber-300 font-bold">Protocolo Zero-Leakage Fluvial</span>
                                <span class="text-xs text-cyan-400/60">•</span>
                                <span class="text-xs font-mono text-emerald-300 font-bold">Sentinel-1 SAR Banda C + DGA SNIA</span>
                                <span class="text-xs text-cyan-400/60">•</span>
                                <span class="text-xs font-mono text-sky-300 font-bold">HAND / Saint-Venant 2D</span>
                            </div>
                            <h3 class="text-base sm:text-lg font-bold text-white font-serif">
                                Informe Técnico: Megainundaciones por Ríos Atmosféricos (Licantén · Longaví · Ancoa 2023)
                            </h3>
                            <p class="text-xs text-slate-300 max-w-3xl leading-relaxed">
                                Contraste objetivo trilateral entre la simulación hidrodinámica ciega $T-48\text{h}$ (HAND / Saint-Venant 2D con forzamiento ERA5 $IVT$ e Isoterma $0^\circ\text{C}$ <em>Rain-on-Snow</em>) frente a la huella satelital Radar Sentinel-1 SAR ($\sigma_0 < -18\text{ dB}$) y aforos oficiales DGA en <strong>Licantén</strong> ($5.120\text{ m}^3/\text{s}$), <strong>Longaví</strong> ($1.280\text{ m}^3/\text{s}$, amortiguación Keyline) y <strong>Ancoa</strong> ($860\text{ m}^3/\text{s}$, colapso Puente Tres Arcos).
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 font-mono text-xs shrink-0 w-full md:w-auto flex-wrap sm:flex-nowrap">
                        <a href="docs/INFORME_HINDCAST_REAL_INUNDACIONES_IMPRIMIBLE.html" target="_blank" class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer">
                            <span>🖨️</span> <span>Abrir Informe Imprimible</span>
                            <span>→</span>
                        </a>
                        <a href="docs/INFORME_HINDCAST_REAL_INUNDACIONES_MAULE_MATAQUITO.md" target="_blank" class="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all">
                            <span>📄</span> <span>Ver Markdown</span>
                        </a>
                    </div>
                </div>"""

if card_paper2_end in content and "INFORME_HINDCAST_REAL_INUNDACIONES_IMPRIMIBLE.html" not in content[:content.find("<!-- 1. Paper Científico Canónico Consolidado")]:
    content = content.replace(card_paper2_end, card_paper2_end + card_paper3_html, 1)
    print("✔ 2. Tarjeta del Paper 3 inyectada en recursos del Vault (docs-dossier)")
else:
    print("ℹ Tarjeta del Paper 3 ya presente o punto de anclaje no hallado")

# 3. SUBTAB DOCS-UQ: CASOS DE ESTUDIO HISTÓRICOS DE RIESGO CLIMÁTICO
uq_header_btns_target = """                            <div class="flex items-center gap-2 shrink-0 flex-wrap">
                                <a href="docs/INFORME_HINDCAST_REAL_IMPRIMIBLE.html" target="_blank" class="px-3.5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-mono text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all">
                                    <span>🖨️</span> <span>Abrir Informe Comparativo Imprimible</span>
                                </a>
                                <a href="docs/INFORME_HINDCAST_REAL_SANTA_JUANA_VINA.md" target="_blank" class="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 font-mono text-xs font-bold transition-all">
                                    📄 Fuente (.md)
                                </a>
                            </div>"""

uq_header_btns_replacement = """                            <div class="flex items-center gap-2 shrink-0 flex-wrap">
                                <a href="docs/INFORME_HINDCAST_REAL_IMPRIMIBLE.html" target="_blank" class="px-3 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-mono text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all" title="Abrir Paper 2: Incendios 2023-2024">
                                    <span>🔥</span> <span>Paper 2: Incendios</span>
                                </a>
                                <a href="docs/INFORME_HINDCAST_REAL_INUNDACIONES_IMPRIMIBLE.html" target="_blank" class="px-3 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-mono text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all" title="Abrir Paper 3: Megainundaciones 2023">
                                    <span>🌊</span> <span>Paper 3: Inundaciones</span>
                                </a>
                                <a href="docs/INFORME_HINDCAST_REAL_SANTA_JUANA_VINA.md" target="_blank" class="px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 font-mono text-xs font-bold transition-all" title="Markdown Paper 2">
                                    📄 .md Fuego
                                </a>
                                <a href="docs/INFORME_HINDCAST_REAL_INUNDACIONES_MAULE_MATAQUITO.md" target="_blank" class="px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 font-mono text-xs font-bold transition-all" title="Markdown Paper 3">
                                    📄 .md Inundación
                                </a>
                            </div>"""

if uq_header_btns_target in content:
    content = content.replace(uq_header_btns_target, uq_header_btns_replacement)
    print("✔ 3.1. Botones de Paper 2 y Paper 3 actualizados en encabezado UQ")
else:
    print("ℹ Botones de encabezado UQ ya actualizados")

# 3.2. TARJETAS DE LOS CASOS DE ESTUDIO DE INUNDACIÓN EN DOCS-UQ
cases_grid_target = """                                <div class="flex items-center gap-2 pt-1">
                                    <button onclick="openHindcastSiteInCuenca('vina_2024')" class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-mono text-[11px] font-bold cursor-pointer shadow-sm">🗺️ Abrir Auditoría Táctica en Cuenca (Viña 2024)</button>
                                </div>
                            </div>
                        </div>"""

flood_cases_html = """                                <div class="flex items-center gap-2 pt-1">
                                    <button onclick="openHindcastSiteInCuenca('vina_2024')" class="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-mono text-[11px] font-bold cursor-pointer shadow-sm">🗺️ Abrir Auditoría Táctica en Cuenca (Viña 2024)</button>
                                </div>
                            </div>

                            <!-- Caso 3: Megainundación Licantén 2023 -->
                            <div class="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 flex flex-col justify-between gap-2">
                                <div class="space-y-1">
                                    <div class="flex items-center justify-between">
                                        <span class="font-bold text-stone-900 text-sm">🌊 Caso 3: Megainundación Licantén / Río Mataquito · Jun 2023</span>
                                        <span class="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-mono text-[10px] font-bold">Sentinel-1 SAR Banda C</span>
                                    </div>
                                    <div class="text-stone-700"><strong>Observado (Radar SAR):</strong> 3.450 ha · <strong>Aforo Oficial DGA:</strong> 5.120 m³/s (Tr=85a, Nivel 4.85 m) · <strong>Ciega 2D:</strong> 3.780 ha</div>
                                    <div class="text-stone-600 text-[11px]">Río Atmosférico Cat 4 (IVT 840 kg/m/s) · Isoterma 0°C a 3.350 msnm (Rain-on-Snow) · Lluvia cabecera 385 mm · Celdas tácticas <code>F-LIC-01..03</code> · Hospital de Licantén sumergido bajo 2.1 m · CSI = 89.4%.</div>
                                </div>
                                <div class="flex items-center gap-2 pt-1">
                                    <button onclick="window.loadFloodBenchmarkInCuenca('licanten_2023')" class="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-[11px] font-bold cursor-pointer shadow-sm">🗺️ Abrir Auditoría Fluvial en Cuenca (Licantén 2023)</button>
                                </div>
                            </div>

                            <!-- Caso 4: Megainundación Río Longaví & Retiro 2023 -->
                            <div class="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 flex flex-col justify-between gap-2">
                                <div class="space-y-1">
                                    <div class="flex items-center justify-between">
                                        <span class="font-bold text-stone-900 text-sm">🌊 Caso 4: Río Longaví / Meniel & Retiro · Ago 2023</span>
                                        <span class="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-mono text-[10px] font-bold">Amortiguación Keyline</span>
                                    </div>
                                    <div class="text-stone-700"><strong>Observado (Radar SAR):</strong> 2.880 ha · <strong>Aforo Oficial DGA:</strong> 1.280 m³/s (Tr=65a) · <strong>Ciega 2D:</strong> 3.050 ha</div>
                                    <div class="text-stone-600 text-[11px]">Río Atmosférico Cat 4 (IVT 790 kg/m/s) · Desborde en vegas bajas y corte de Autopista Ruta 5 Sur · Zanjas Keyline Meniel amortiguaron 18.500 m³ (-14 cm de calado) · CSI = 91.8%.</div>
                                </div>
                                <div class="flex items-center gap-2 pt-1">
                                    <button onclick="window.loadFloodBenchmarkInCuenca('longavi_2023')" class="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-[11px] font-bold cursor-pointer shadow-sm">🗺️ Abrir Auditoría Fluvial en Cuenca (Longaví 2023)</button>
                                </div>
                            </div>

                            <!-- Caso 5: Megainundación Río Ancoa 2023 -->
                            <div class="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200 flex flex-col justify-between gap-2">
                                <div class="space-y-1">
                                    <div class="flex items-center justify-between">
                                        <span class="font-bold text-stone-900 text-sm">🌊 Caso 5: Río Ancoa / Precordillera Linares · Jun 2023</span>
                                        <span class="px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-mono text-[10px] font-bold">Cañón Torrencial</span>
                                    </div>
                                    <div class="text-stone-700"><strong>Observado (Radar SAR):</strong> 1.920 ha · <strong>Aforo Oficial DGA:</strong> 860 m³/s (Tr=100a, v > 5.5 m/s) · <strong>Ciega 2D:</strong> 2.080 ha</div>
                                    <div class="text-stone-600 text-[11px]">Río Atmosférico Cat 5 (IVT 880 kg/m/s) · Rain-on-Snow masivo sobre nieve previa · Colapso estructural total del Puente Tres Arcos y destrucción de Ruta L-45 · CSI = 88.1%.</div>
                                </div>
                                <div class="flex items-center gap-2 pt-1">
                                    <button onclick="window.loadFloodBenchmarkInCuenca('ancoa_2023')" class="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-[11px] font-bold cursor-pointer shadow-sm">🗺️ Abrir Auditoría Fluvial en Cuenca (Ancoa 2023)</button>
                                </div>
                            </div>
                        </div>"""

if cases_grid_target in content:
    content = content.replace(cases_grid_target, flood_cases_html)
    print("✔ 3.2. Tarjetas de Casos 3, 4 y 5 (Inundaciones) inyectadas en la cuadrícula de casos UQ")
else:
    print("ℹ Cuadrícula de casos UQ ya actualizada")

with open(INDEX_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print("¡Incorporación del Paper 3 en el Vault completada exitosamente!")
