import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 Widescreen (13.333 x 7.5 inches)
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # Blank slide

    # Palette
    C_BG_DARK = RGBColor(11, 30, 21)        # #0B1E15 Deep Forest Dark
    C_CARD_BG = RGBColor(19, 43, 32)        # #132B20 Container Card
    C_CARD_ALT = RGBColor(24, 54, 40)       # #183628 Elevated Card
    C_EMERALD = RGBColor(16, 185, 129)      # #10B981 Accent Mint Green
    C_GOLD = RGBColor(245, 158, 11)         # #F59E0B Warm Amber/Gold
    C_WHITE = RGBColor(255, 255, 255)
    C_MUTED = RGBColor(167, 185, 175)       # Light Sage Muted
    C_LIGHT_GREEN = RGBColor(167, 243, 208) # Emerald soft

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = C_BG_DARK
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category_text="AGROTECH • PITCH DECK"):
        # Category pill/label
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.5), Inches(0.35))
        tf_c = cat_box.text_frame
        tf_c.word_wrap = True
        p_c = tf_c.paragraphs[0]
        p_c.text = category_text.upper()
        p_c.font.size = Pt(10)
        p_c.font.bold = True
        p_c.font.color.rgb = C_EMERALD

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.5), Inches(0.65))
        tf_t = title_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(22)
        p_t.font.bold = True
        p_t.font.color.rgb = C_WHITE

    def add_card(slide, left, top, width, height, bg_color=C_CARD_BG, border_color=None):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1.5)
        else:
            card.line.fill.background()
        return card

    # =========================================================================
    # SLIDE 1: PORTADA
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1)

    # Accent decorative strip
    strip = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.2), Inches(0.15), Inches(4.8))
    strip.fill.solid()
    strip.fill.fore_color.rgb = C_EMERALD
    strip.line.fill.background()

    # Logo if available
    logo_path = "public/logo-agritwin.png"
    if os.path.exists(logo_path):
        s1.shapes.add_picture(logo_path, Inches(1.2), Inches(1.1), height=Inches(0.65))

    # Main title box
    tb1 = s1.shapes.add_textbox(Inches(1.2), Inches(1.8), Inches(7.5), Inches(4.2))
    tf1 = tb1.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.text = "AGROTECH CHILE"
    p0.font.size = Pt(44)
    p0.font.bold = True
    p0.font.color.rgb = C_WHITE
    p0.space_after = Pt(8)

    p1 = tf1.add_paragraph()
    p1.text = "Tecnología biofísica nacida en Chile con estándar global"
    p1.font.size = Pt(19)
    p1.font.bold = True
    p1.font.color.rgb = C_EMERALD
    p1.space_after = Pt(16)

    p2 = tf1.add_paragraph()
    p2.text = "Ecosistema integral que fusiona teledetección satelital, telemetría in situ y modelado biofísico 3D bajo principios de permacultura y agroecología regenerativa."
    p2.font.size = Pt(13)
    p2.font.color.rgb = C_MUTED
    p2.space_after = Pt(20)

    p3 = tf1.add_paragraph()
    p3.text = "BROCHURE EJECUTIVO & PITCH DECK • 2026\nValle del Maule, Chile 🇨🇱 | Proyección Internacional"
    p3.font.size = Pt(11)
    p3.font.bold = True
    p3.font.color.rgb = C_GOLD

    # Image / Logo card right
    add_card(s1, Inches(9.0), Inches(1.2), Inches(3.5), Inches(4.8), C_CARD_BG, C_EMERALD)
    img_path = "public/img-agri-hub-farm.jpg"
    if os.path.exists(img_path):
        s1.shapes.add_picture(img_path, Inches(9.15), Inches(1.35), width=Inches(3.2))
    
    # Text below image
    tb_img = s1.shapes.add_textbox(Inches(9.1), Inches(4.5), Inches(3.3), Inches(1.4))
    tf_img = tb_img.text_frame
    tf_img.word_wrap = True
    p_img1 = tf_img.paragraphs[0]
    p_img1.text = "AgriTwin & Ecosistema AgroTech"
    p_img1.font.size = Pt(12)
    p_img1.font.bold = True
    p_img1.font.color.rgb = C_WHITE
    p_img2 = tf_img.add_paragraph()
    p_img2.text = "Simulación climática, protección predial y ordenamiento territorial de cuenca."
    p_img2.font.size = Pt(10)
    p_img2.font.color.rgb = C_MUTED

    # =========================================================================
    # SLIDE 2: EL DESAFÍO DEL CAMPO
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_header(s2, "El Desafío Crítico: El Costo del Riesgo No Mitigado", "01 / PROBLEMÁTICA & CONTEXTO")

    cols = [
        ("❄️ Heladas Extremas", "$15M - $35M CLP", "Pérdida por hectárea en cerezos o arándanos durante una sola helada primaveral no detectada a tiempo (-2°C destruye la cosecha anual)."),
        ("💧 Sequía & Costo Energético", "+38% de Gasto", "Sobrecosto en la factura eléctrica de bombas de riego por falta de monitoreo de agua en suelo estratificado y tarifas punta."),
        ("🔥 Incendios e Inundaciones", "122.000 ha en Riesgo", "Vulnerabilidad extrema en la interfaz rural-forestal por monocultivos y desbordes repentinos en cuencas no monitoreadas."),
        ("🛡️ Barreras EUDR Europa", "100% Riesgo Rechazo", "Exigencia comunitaria de no-deforestación georreferenciada. Sin trazabilidad digital, la fruta no ingresa al mercado europeo.")
    ]

    card_w = Inches(2.75)
    gap = Inches(0.2)
    start_x = Inches(0.8)

    for i, (title, metric, desc) in enumerate(cols):
        cx = start_x + i * (card_w + gap)
        add_card(s2, cx, Inches(1.6), card_w, Inches(4.8), C_CARD_BG, C_GOLD if i == 0 else None)
        
        tb = s2.shapes.add_textbox(cx + Inches(0.15), Inches(1.8), card_w - Inches(0.3), Inches(4.3))
        tf = tb.text_frame
        tf.word_wrap = True
        
        pt = tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(14)
        pt.font.bold = True
        pt.font.color.rgb = C_WHITE
        pt.space_after = Pt(12)

        pm = tf.add_paragraph()
        pm.text = metric
        pm.font.size = Pt(18)
        pm.font.bold = True
        pm.font.color.rgb = C_EMERALD if i != 0 else C_GOLD
        pm.space_after = Pt(14)

        pd = tf.add_paragraph()
        pd.text = desc
        pd.font.size = Pt(11)
        pd.font.color.rgb = C_MUTED

    # Bottom summary pill
    bot_card = add_card(s2, Inches(0.8), Inches(6.6), Inches(11.733), Inches(0.6), C_CARD_ALT)
    tb_bot = s2.shapes.add_textbox(Inches(1.0), Inches(6.65), Inches(11.3), Inches(0.5))
    tf_b = tb_bot.text_frame
    p_b = tf_b.paragraphs[0]
    p_b.text = "Tesis Central: El agricultor no compra 'tecnología por novedad'; invierte en blindar su patrimonio frente a eventos catastróficos."
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = C_LIGHT_GREEN

    # =========================================================================
    # SLIDE 3: LA SOLUCIÓN AGROTECH (ÁRBOL DE 3 PILARES)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_header(s3, "La Solución AgroTech: La Tríada Regenerativa & Tecnológica", "02 / MODELO DE SOLUCIÓN INTEGRAL")

    pillars = [
        ("🌱 PILAR 1: SUELO VIVO & BIOFÍSICA", 
         "Permacultura & Agroecología", 
         "• Diseño hidrológico Keyline para retención de agua.\n• Zonificación energética de predio (Zonas 0 a 5).\n• Fomento de microbioma y consorcios biológicos.\n• Respeto absoluto a los ciclos biofísicos de la cuenca."),
        
        ("💻 PILAR 2: RED DIGITAL & SIMULACIÓN", 
         "AgriTwin 3D & Telemetría Satelital", 
         "• Gemelo digital 3D interactivo en WebGL.\n• Ingesta satelital continua de Sentinel-2 L2A.\n• Modelo katabático de drenaje de aire frío (alerta heladas 72h).\n• Balance hídrico según FAO-56 Penman-Monteith."),
        
        ("⚙️ PILAR 3: HARDWARE ROBUSTO LOCAL", 
         "Nodos KioT & Automatización", 
         "• Electrónica fabricada en Chile para resistir barro y polvo.\n• Gabinetes estancos IP65 con PETG técnico anti-UV.\n• Comunicación LoRaWAN de largo alcance y bajo consumo.\n• Actuación autónoma de electroválvulas y sirenas.")
    ]

    card_w3 = Inches(3.7)
    gap3 = Inches(0.3)
    start_x3 = Inches(0.8)

    for i, (title, sub, bullets) in enumerate(pillars):
        cx = start_x3 + i * (card_w3 + gap3)
        add_card(s3, cx, Inches(1.6), card_w3, Inches(4.6), C_CARD_BG, C_EMERALD if i == 1 else None)
        
        tb = s3.shapes.add_textbox(cx + Inches(0.2), Inches(1.8), card_w3 - Inches(0.4), Inches(4.2))
        tf = tb.text_frame
        tf.word_wrap = True

        pt = tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(12)
        pt.font.bold = True
        pt.font.color.rgb = C_EMERALD
        pt.space_after = Pt(4)

        ps = tf.add_paragraph()
        ps.text = sub
        ps.font.size = Pt(14)
        ps.font.bold = True
        ps.font.color.rgb = C_WHITE
        ps.space_after = Pt(14)

        pb = tf.add_paragraph()
        pb.text = bullets
        pb.font.size = Pt(11)
        pb.font.color.rgb = C_MUTED

    # Bottom philosophy note
    add_card(s3, Inches(0.8), Inches(6.4), Inches(11.733), Inches(0.7), C_CARD_ALT)
    tb_ph = s3.shapes.add_textbox(Inches(1.0), Inches(6.45), Inches(11.3), Inches(0.6))
    p_ph = tb_ph.text_frame.paragraphs[0]
    p_ph.text = "Fundamento: Filosofía de la 'Economía de los Hombros' — La tecnología al servicio de la soberanía comunitaria y la dignidad campesina."
    p_ph.font.size = Pt(11)
    p_ph.font.bold = True
    p_ph.font.color.rgb = C_GOLD

    # =========================================================================
    # SLIDE 4: PRODUCTO CENTRAL: AGRITWIN DE PREDIO 3D
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_header(s4, "Producto Insigne: AgriTwin Predial 3D & Simulación Permacultural", "03 / NÚCLEO TECNOLÓGICO PREDIAL")

    steps = [
        ("1. Ojos en el Espacio", "Sentinel-2 L2A", "Pases cada 5 días. Índices NDVI (vigor), NDWI (agua) y CWSI (estrés hídrico) a 10m de resolución."),
        ("2. Gemelo 3D WebGL", "Biofísica en Tiempo Real", "Modelación de cuarteles, topografía LIDAR y algoritmos FAO-56 Penman-Monteith en 3 estratos de suelo."),
        ("3. Telemetría In Situ", "Nodos KioT LoRaWAN", "Sensores a nivel de suelo y canopia, humedad capacitiva y presión. Alerta de heladas con 72h de anticipación."),
        ("4. Simulador Permacultural", "Ahorro -35% a -66%", "Zanjas Keyline, cortinas cortavientos de peumo/quillay y agrovoltaica bifacial en horario valle.")
    ]

    card_w4 = Inches(2.75)
    gap4 = Inches(0.2)
    start_x4 = Inches(0.8)

    for i, (step_title, tech, desc) in enumerate(steps):
        cx = start_x4 + i * (card_w4 + gap4)
        add_card(s4, cx, Inches(1.6), card_w4, Inches(4.4), C_CARD_BG, C_EMERALD if i == 3 else None)
        
        tb = s4.shapes.add_textbox(cx + Inches(0.15), Inches(1.8), card_w4 - Inches(0.3), Inches(4.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p_st = tf.paragraphs[0]
        p_st.text = step_title
        p_st.font.size = Pt(13)
        p_st.font.bold = True
        p_st.font.color.rgb = C_GOLD
        p_st.space_after = Pt(6)

        p_tc = tf.add_paragraph()
        p_tc.text = tech
        p_tc.font.size = Pt(14)
        p_tc.font.bold = True
        p_tc.font.color.rgb = C_WHITE
        p_tc.space_after = Pt(12)

        p_ds = tf.add_paragraph()
        p_ds.text = desc
        p_ds.font.size = Pt(10.5)
        p_ds.font.color.rgb = C_MUTED

    # Bottom metric strip
    add_card(s4, Inches(0.8), Inches(6.2), Inches(11.733), Inches(0.9), C_CARD_ALT)
    tb_m = s4.shapes.add_textbox(Inches(1.0), Inches(6.25), Inches(11.3), Inches(0.8))
    tf_m = tb_m.text_frame
    p_m1 = tf_m.paragraphs[0]
    p_m1.text = "CASO REAL: PREDIO MENIELS (PARRAL) • 24.8 ha con 8 cuarteles monitoreados en 3D"
    p_m1.font.size = Pt(11)
    p_m1.font.bold = True
    p_m1.font.color.rgb = C_EMERALD
    p_m2 = tf_m.add_paragraph()
    p_m2.text = "Resultados: -38% en costo de electricidad por bombeo nocturno optimizado y 0% de daño en floración durante la última helada de septiembre."
    p_m2.font.size = Pt(10.5)
    p_m2.font.color.rgb = C_WHITE

    # =========================================================================
    # SLIDE 5: ESCALA TERRITORIAL: AGROTWIN REGIONAL 122.000 HA
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_header(s5, "Escala Territorial: AgroTwin Regional y Red Centinela Comunal", "04 / ORDENAMIENTO DE CUENCA")

    # Left Column: The 122k ha Macro Twin
    add_card(s5, Inches(0.8), Inches(1.6), Inches(6.0), Inches(5.3), C_CARD_BG)
    tb_l5 = s5.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.6), Inches(4.9))
    tf_l5 = tb_l5.text_frame
    tf_l5.word_wrap = True

    p_l5_1 = tf_l5.paragraphs[0]
    p_l5_1.text = "CUENCA PARRAL - RETIRO (122.000 HECTÁREAS)"
    p_l5_1.font.size = Pt(13)
    p_l5_1.font.bold = True
    p_l5_1.font.color.rgb = C_GOLD
    p_l5_1.space_after = Pt(8)

    p_l5_2 = tf_l5.add_paragraph()
    p_l5_2.text = "Clasificación Satelital de Cobertura y Uso de Suelo (LULC):"
    p_l5_2.font.size = Pt(12)
    p_l5_2.font.bold = True
    p_l5_2.font.color.rgb = C_WHITE
    p_l5_2.space_after = Pt(8)

    p_l5_3 = tf_l5.add_paragraph()
    p_l5_3.text = "• 42.600 ha Agrícola & Arroz (34.9% cuenca): Polo arrocero nacional expuesto a sequía.\n• 31.800 ha Monocultivo Forestal (26.1%): Vector crítico de propagación de incendios.\n• 24.100 ha Cordillera Andina (19.8%): Recarga hídrica nivopluvial de la cuenca.\n• 18.400 ha Bosque Nativo Esclerófilo (15.1%): Amortiguador térmico y biodiversidad.\n• 3.200 ha Embalses & Ríos (2.6%): Regulación hídrica Digua, Bullileo y Perquilauquén."
    p_l5_3.font.size = Pt(10.5)
    p_l5_3.font.color.rgb = C_MUTED

    # Right Column: The Ground-Truth Mesh
    add_card(s5, Inches(7.1), Inches(1.6), Inches(5.4), Inches(5.3), C_CARD_BG, C_EMERALD)
    tb_r5 = s5.shapes.add_textbox(Inches(7.3), Inches(1.8), Inches(5.0), Inches(4.9))
    tf_r5 = tb_r5.text_frame
    tf_r5.word_wrap = True

    p_r5_1 = tf_r5.paragraphs[0]
    p_r5_1.text = "RED CENTINELA TERRESTRE (GROUND-TRUTH MESH)"
    p_r5_1.font.size = Pt(13)
    p_r5_1.font.bold = True
    p_r5_1.font.color.rgb = C_EMERALD
    p_r5_1.space_after = Pt(8)

    p_r5_2 = tf_r5.add_paragraph()
    p_r5_2.text = "¿Cómo se alimenta sin costos astronómicos?"
    p_r5_2.font.size = Pt(12)
    p_r5_2.font.bold = True
    p_r5_2.font.color.rgb = C_WHITE
    p_r5_2.space_after = Pt(8)

    p_r5_3 = tf_r5.add_paragraph()
    p_r5_3.text = "1. Predios como Boyas Terrestres: Cada predio con AgriTwin calibra la reflectancia satelital con lecturas físicas in situ cada 60 segundos.\n\n2. Alerta Temprana de Incendios (FWI): Índice de carga de combustible fino seco en la interfaz rural (Copihue, Remulcao).\n\n3. Protección de Comités APR: Semáforo de recarga freática para asegurar el suministro de agua potable a las comunidades rurales."
    p_r5_3.font.size = Pt(10.5)
    p_r5_3.font.color.rgb = C_MUTED

    # =========================================================================
    # SLIDE 6: BIODIVERSIDAD Y EXPORTACIÓN: REWILDMAPPER & PASAPORTE VERDE
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_header(s6, "Nivel Ecosistémico: RewildMapper & Pasaporte Verde de Exportación", "05 / VALOR GLOBAL & ESG")

    # Card Left: RewildMapper
    add_card(s6, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.3), C_CARD_BG)
    tb_rw = s6.shapes.add_textbox(Inches(1.0), Inches(1.75), Inches(5.3), Inches(3.2))
    tf_rw = tb_rw.text_frame
    tf_rw.word_wrap = True

    p_rw1 = tf_rw.paragraphs[0]
    p_rw1.text = "🌳 REWILDMAPPER & BIOMONITOREO"
    p_rw1.font.size = Pt(13)
    p_rw1.font.bold = True
    p_rw1.font.color.rgb = C_EMERALD
    p_rw1.space_after = Pt(4)

    p_rw2 = tf_rw.add_paragraph()
    p_rw2.text = "PWA Offline para Conservación de Bosque Nativo"
    p_rw2.font.size = Pt(11)
    p_rw2.font.bold = True
    p_rw2.font.color.rgb = C_WHITE
    p_rw2.space_after = Pt(8)

    p_rw3 = tf_rw.add_paragraph()
    p_rw3.text = "• Opera 100% desconectado en quebradas del Maule.\n• Registro de especies esclerófilas (peumo, quillay, boldo).\n• Emisión de Certificados PBC bajo estándar IPCC Tier-2.\n• Monetización: Comisión 12% en venta de tokens ESG a corporaciones."
    p_rw3.font.size = Pt(10)
    p_rw3.font.color.rgb = C_MUTED

    img_rw = "public/rewildmapper-gis.png"
    if os.path.exists(img_rw):
        s6.shapes.add_picture(img_rw, Inches(1.0), Inches(4.7), width=Inches(5.3), height=Inches(2.0))

    # Card Right: Pasaporte Verde
    add_card(s6, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.3), C_CARD_BG, C_GOLD)
    tb_pv = s6.shapes.add_textbox(Inches(7.0), Inches(1.75), Inches(5.3), Inches(3.2))
    tf_pv = tb_pv.text_frame
    tf_pv.word_wrap = True

    p_pv1 = tf_pv.paragraphs[0]
    p_pv1.text = "🛡️ PASAPORTE VERDE DE EXPORTACIÓN"
    p_pv1.font.size = Pt(13)
    p_pv1.font.bold = True
    p_pv1.font.color.rgb = C_GOLD
    p_pv1.space_after = Pt(4)

    p_pv2 = tf_pv.add_paragraph()
    p_pv2.text = "Cumplimiento Satelital EUDR para la Unión Europea"
    p_pv2.font.size = Pt(11)
    p_pv2.font.bold = True
    p_pv2.font.color.rgb = C_WHITE
    p_pv2.space_after = Pt(8)

    p_pv3 = tf_pv.add_paragraph()
    p_pv3.text = "• Certificación llave en mano contra deforestación post-2020 según EUDR.\n• Polígonos georreferenciados e histórico satelital auditado.\n• Blindaje total frente al bloqueo de fruta en aduanas europeas.\n• Modelo de Ingresos: €650 a €1.800 por predio exportador certificado."
    p_pv3.font.size = Pt(10)
    p_pv3.font.color.rgb = C_MUTED

    img_pv = "public/img-forest-rewild.jpg"
    if os.path.exists(img_pv):
        s6.shapes.add_picture(img_pv, Inches(7.0), Inches(4.7), width=Inches(5.3), height=Inches(2.0))

    # =========================================================================
    # SLIDE 7: MODELO DE PLANES Y RETORNO DE INVERSIÓN
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7)
    add_header(s7, "Modelo Comercial, Planes y Retorno de Inversión (ROI)", "06 / PRICING & FINANZAS")

    plans = [
        ("PLAN BÁSICO (PREDIAL)", "$50 USD/mes", "Hasta 10 ha\n\n• Índices Sentinel-2 (NDVI, NDWI)\n• Alerta de heladas vía WhatsApp\n• 1 usuario predial\n• Setup digital: $120 USD"),
        ("PLAN PRO (FRUTÍCOLA / VIÑA)", "$92 USD/mes", "Hasta 50 ha\n\n• Gemelo 3D WebGL completo\n• Balance hídrico FAO-56 diario\n• Predicción heladas 72h\n• Telemetría KioT multi-nodo"),
        ("PLAN EMPRESA (EXPORTADOR)", "$170 USD/mes", "> 50 ha / Exportadoras\n\n• Trazabilidad satelital EUDR\n• API LoRaWAN ilimitada\n• Vuelos multiespectrales dron\n• Soporte prioritario 24/7"),
        ("KITS A.P.I.S. / KIOT", "$90 - $300 USD", "Manufactura en Talca\n\n• Costo BOM: ~$90 USD ($85k CLP)\n• Venta nodo: ~$300 USD ($280k CLP)\n• Margen bruto de hardware: 70%\n• Instalación vía Cooperativa")
    ]

    card_wp = Inches(2.75)
    gapp = Inches(0.2)
    start_xp = Inches(0.8)

    for i, (title, price, body) in enumerate(plans):
        cx = start_xp + i * (card_wp + gapp)
        add_card(s7, cx, Inches(1.6), card_wp, Inches(4.5), C_CARD_BG, C_EMERALD if i == 1 else None)
        
        tb = s7.shapes.add_textbox(cx + Inches(0.15), Inches(1.8), card_wp - Inches(0.3), Inches(4.1))
        tf = tb.text_frame
        tf.word_wrap = True

        pt = tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(12)
        pt.font.bold = True
        pt.font.color.rgb = C_GOLD if i == 1 else C_WHITE
        pt.space_after = Pt(4)

        pp = tf.add_paragraph()
        pp.text = price
        pp.font.size = Pt(16)
        pp.font.bold = True
        pp.font.color.rgb = C_EMERALD
        pp.space_after = Pt(10)

        pb = tf.add_paragraph()
        pb.text = body
        pb.font.size = Pt(10)
        pb.font.color.rgb = C_MUTED

    # Bottom ROI Bar
    add_card(s7, Inches(0.8), Inches(6.3), Inches(11.733), Inches(0.8), C_CARD_ALT)
    tb_r = s7.shapes.add_textbox(Inches(1.0), Inches(6.35), Inches(11.3), Inches(0.7))
    tf_r = tb_r.text_frame
    p_r1 = tf_r.paragraphs[0]
    p_r1.text = "CÁLCULO DE RETORNO (ROI): UNA INVERSIÓN QUE SE PAGA SOLA"
    p_r1.font.size = Pt(11)
    p_r1.font.bold = True
    p_r1.font.color.rgb = C_GOLD
    p_r2 = tf_r.add_paragraph()
    p_r2.text = "Costo plan anual + kit: ~$1.100.000 CLP. Ahorro en 1 helada evitada en 2 ha: > $30.000.000 CLP. Retorno: > 25 veces la inversión."
    p_r2.font.size = Pt(10.5)
    p_r2.font.color.rgb = C_WHITE

    # =========================================================================
    # SLIDE 8: EXPANSIÓN Y VISIÓN DE FUTURO
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8)
    add_header(s8, "Estrategia de Expansión: Escalamiento Territorial y Nuevas Líneas", "07 / ESCALABILIDAD & ROADMAP")

    expansions = [
        ("🗺️ EXPANSIÓN GEOGRÁFICA", "Maule -> Chile -> Europa", 
         "• Fase 1: Consolidación en Valle del Maule (Parral, Retiro, Curicó, Linares).\n• Fase 2: Escalamiento a Valles de O'Higgins y Ñuble (fruticultura intensiva y viñas).\n• Fase 3: Conexión con cuencas mediterráneas de España y Portugal con idéntico estrés hídrico."),
        
        ("⚡ DIVISIÓN AGROVOLTAICA", "Energía Bifacial en Predios", 
         "• Integración de parques solares bifaciales elevados sobre pasturas y frutales.\n• Reducción de hasta un 66% en el consumo neto de la red eléctrica predial.\n• Sombra controlada que disminuye la evapotranspiración del cultivo en un 22%."),
        
        ("🎲 EDUCACIÓN & EDULAB", "Raíces y Chips", 
         "• Juego de cartas y estrategia 'Raíces y Chips' para colegios y familias rurales.\n• Seminarios presenciales 'Manos en la Tierra': bioinsumos y permacultura digital.\n• Creación de semilleros de talento tecnológico-agrícola local.")
    ]

    card_w8 = Inches(3.7)
    gap8 = Inches(0.3)
    start_x8 = Inches(0.8)

    for i, (title, sub, bullets) in enumerate(expansions):
        cx = start_x8 + i * (card_w8 + gap8)
        add_card(s8, cx, Inches(1.6), card_w8, Inches(5.3), C_CARD_BG)
        
        tb = s8.shapes.add_textbox(cx + Inches(0.2), Inches(1.8), card_w8 - Inches(0.4), Inches(4.9))
        tf = tb.text_frame
        tf.word_wrap = True

        pt = tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(13)
        pt.font.bold = True
        pt.font.color.rgb = C_EMERALD
        pt.space_after = Pt(4)

        ps = tf.add_paragraph()
        ps.text = sub
        ps.font.size = Pt(13)
        ps.font.bold = True
        ps.font.color.rgb = C_WHITE
        ps.space_after = Pt(14)

        pb = tf.add_paragraph()
        pb.text = bullets
        pb.font.size = Pt(11)
        pb.font.color.rgb = C_MUTED

    # =========================================================================
    # SLIDE 9: GOBERNANZA TERRITORIAL & ESTRUCTURA DUAL
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9)
    add_header(s9, "Gobernanza Territorial: Modelo Dual SpA + Cooperativa & Slicing Pie", "08 / GOBERNANZA & ESCALABILIDAD")

    # 3 Pillars of Dual Structure
    pillars = [
        ("🏛️ AgroTech SpA", "Vehículo de Capital e IP", [
            "Sociedad por acciones custodia del código fuente y modelos biofísicos.",
            "Titularidad de marcas, patentes y licencias internacionales.",
            "Vehículo limpio para captación de capital privado y fondos de innovación."
        ]),
        ("🚜 Cooperativa Territorial", "Brazo Operativo de Campo", [
            "Ensamblaje local de hardware KioT y mantención en predio.",
            "Soporte técnico in situ en menos de 2 horas en la cuenca del Maule.",
            "Distribución equitativa de excedentes operacionales entre técnicos locales."
        ]),
        ("🥧 Modelo Slicing Pie", "Justicia Distributiva y Escala", [
            "Reparto dinámico según horas técnicas, riesgo y aportes reales de valor.",
            "Blindaje de IP exclusivo en la SpA que previene disputas societarias.",
            "Red de micro-agencias con técnicos agrícolas locales certificados."
        ])
    ]

    card_wt = Inches(3.7)
    gapt = Inches(0.25)
    start_xt = Inches(0.8)

    for i, (title, subtitle, bullets) in enumerate(pillars):
        cx = start_xt + i * (card_wt + gapt)
        add_card(s9, cx, Inches(1.6), card_wt, Inches(3.4), C_CARD_BG)
        
        tb = s9.shapes.add_textbox(cx + Inches(0.15), Inches(1.75), card_wt - Inches(0.3), Inches(3.1))
        tf = tb.text_frame
        tf.word_wrap = True

        pn = tf.paragraphs[0]
        pn.text = title
        pn.font.size = Pt(14)
        pn.font.bold = True
        pn.font.color.rgb = C_WHITE
        pn.space_after = Pt(2)

        pr = tf.add_paragraph()
        pr.text = subtitle
        pr.font.size = Pt(10)
        pr.font.bold = True
        pr.font.color.rgb = C_EMERALD
        pr.space_after = Pt(10)

        for b in bullets:
            pb = tf.add_paragraph()
            pb.text = f"• {b}"
            pb.font.size = Pt(9.5)
            pb.font.color.rgb = C_MUTED
            pb.space_after = Pt(4)

    # Dual Governance bottom card
    add_card(s9, Inches(0.8), Inches(5.2), Inches(11.733), Inches(1.8), C_CARD_ALT, C_GOLD)
    tb_gov = s9.shapes.add_textbox(Inches(1.0), Inches(5.3), Inches(11.3), Inches(1.6))
    tf_gov = tb_gov.text_frame
    tf_gov.word_wrap = True

    pg1 = tf_gov.paragraphs[0]
    pg1.text = "🛡️ BLINDAJE ESTRATÉGICO Y ALINEACIÓN DE INCENTIVOS TERRITORIALES"
    pg1.font.size = Pt(12)
    pg1.font.bold = True
    pg1.font.color.rgb = C_GOLD
    pg1.space_after = Pt(4)

    pg2 = tf_gov.add_paragraph()
    pg2.text = "• Separación Estricta: La IP y el software escalable nunca se fragmentan, residen 100% en la SpA.\n• Cero Rotación de Terreno: Los instaladores y técnicos locales son cooperados de la entidad operativa, compartiendo beneficios de instalación y fidelizando a las familias agrícolas.\n• Escalabilidad Nacional: El modelo se replica por cuencas asociando cooperativas y micro-agencias locales homologadas bajo estándar AgroTech."
    pg2.font.size = Pt(10)
    pg2.font.color.rgb = C_WHITE

    # =========================================================================
    # SLIDE 10: CONTRAPORTADA Y LLAMADO A LA ACCIÓN
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10)

    # Big Card center
    add_card(s10, Inches(1.5), Inches(1.0), Inches(10.333), Inches(5.5), C_CARD_BG, C_EMERALD)

    # Logo in slide 10
    logo_path10 = "public/logo-agritwin.png"
    if os.path.exists(logo_path10):
        s10.shapes.add_picture(logo_path10, Inches(5.666), Inches(1.3), width=Inches(2.0))

    tb_end = s10.shapes.add_textbox(Inches(2.0), Inches(2.2), Inches(9.333), Inches(4.0))
    tf_end = tb_end.text_frame
    tf_end.word_wrap = True

    pe1 = tf_end.paragraphs[0]
    pe1.alignment = PP_ALIGN.CENTER
    pe1.text = "HAGAMOS DEL CAMPO UN ECOSISTEMA RESILIENTE Y RENTABLE"
    pe1.font.size = Pt(21)
    pe1.font.bold = True
    pe1.font.color.rgb = C_WHITE
    pe1.space_after = Pt(8)

    pe2 = tf_end.add_paragraph()
    pe2.alignment = PP_ALIGN.CENTER
    pe2.text = "Únete a los predios pioneros que ya protegen su cosecha y optimizan sus recursos con AgriTwin."
    pe2.font.size = Pt(13)
    pe2.font.color.rgb = C_MUTED
    pe2.space_after = Pt(20)

    pe3 = tf_end.add_paragraph()
    pe3.alignment = PP_ALIGN.CENTER
    pe3.text = "AGENDA UN DIAGNÓSTICO PREDIAL GRATUITO O PILOTO DE CAMPO"
    pe3.font.size = Pt(14)
    pe3.font.bold = True
    pe3.font.color.rgb = C_GOLD
    pe3.space_after = Pt(14)

    pe4 = tf_end.add_paragraph()
    pe4.alignment = PP_ALIGN.CENTER
    pe4.text = "📧 Contacto Directo: danisantander.urrutia@gmail.com\n📍 Base de Operaciones: Parral & Talca, Valle del Maule, Chile\n🌐 Ecosistema AgroTech: AgriTwin • KioT Hardware • RewildMapper"
    pe4.font.size = Pt(12)
    pe4.font.bold = True
    pe4.font.color.rgb = C_WHITE
    pe4.space_after = Pt(18)

    pe5 = tf_end.add_paragraph()
    pe5.alignment = PP_ALIGN.CENTER
    pe5.text = "Ecosistema AgroTech SpA & Cooperativa de Trabajo • Derechos Reservados 2026"
    pe5.font.size = Pt(10)
    pe5.font.color.rgb = C_MUTED

    # Save
    out_dir = "/Users/danielsantander/Documents/Agrotech"
    out_file = os.path.join(out_dir, "AgroTech_Brochure_Ejecutivo.pptx")
    prs.save(out_file)
    print(f"Presentation saved successfully to {out_file}")

if __name__ == "__main__":
    create_deck()
