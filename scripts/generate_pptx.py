"""
Generate a professional, aesthetic dark-mode PowerPoint (.pptx) presentation file
for the Campus & Dormitory Fire Defense System project.
Can be directly opened in Microsoft PowerPoint, Apple Keynote, Google Slides, or uploaded to Canva.
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 Widescreen
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette
    BG_COLOR = RGBColor(7, 11, 20)           # #070b14 Deep Navy / Slate
    CARD_BG = RGBColor(15, 23, 42)           # #0f172a Card Dark
    CARD_BORDER = RGBColor(51, 65, 85)       # #334155 Subtle border
    ACCENT_RED = RGBColor(239, 68, 68)       # #ef4444 Fire Red
    ACCENT_AMBER = RGBColor(245, 158, 11)    # #f59e0b Warm Amber
    ACCENT_CYAN = RGBColor(6, 182, 212)      # #06b6d4 Cyan
    ACCENT_EMERALD = RGBColor(16, 185, 129)  # #10b981 Safety Green
    TEXT_WHITE = RGBColor(248, 250, 252)     # #f8fafc
    TEXT_MUTED = RGBColor(148, 163, 184)     # #94a3b8

    def set_slide_background(slide):
        bg_shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg_shape.fill.solid()
        bg_shape.fill.fore_color.rgb = BG_COLOR
        bg_shape.line.fill.background() # no border
        return bg_shape

    def add_header(slide, tag_text, title_text, desc_text=""):
        # Header text box
        box = slide.shapes.add_textbox(Inches(0.8), Inches(0.55), Inches(11.7), Inches(1.3))
        tf = box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        # Tag
        p_tag = tf.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = ACCENT_AMBER

        # Title
        p_title = tf.add_paragraph()
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE
        p_title.space_before = Pt(4)

        if desc_text:
            p_desc = tf.add_paragraph()
            p_desc.text = desc_text
            p_desc.font.size = Pt(12)
            p_desc.font.color.rgb = TEXT_MUTED
            p_desc.space_before = Pt(4)

    # =========================================================================
    # SLIDE 1: TITLE SLIDE (HERO)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1)

    # Hero Badge
    badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.3), Inches(4.8), Inches(0.42))
    badge.fill.solid()
    badge.fill.fore_color.rgb = RGBColor(30, 20, 25)
    badge.line.color.rgb = ACCENT_RED
    badge.line.width = Pt(1.5)
    b_tf = badge.text_frame
    b_tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    b_p = b_tf.paragraphs[0]
    b_p.text = "⚡ UNIVERSITY LIFE-SAFETY & AI LAB INITIATIVE"
    b_p.font.size = Pt(10)
    b_p.font.bold = True
    b_p.font.color.rgb = ACCENT_RED
    b_p.alignment = PP_ALIGN.CENTER

    # Main Title
    t_box = s1.shapes.add_textbox(Inches(0.8), Inches(1.9), Inches(11.7), Inches(2.2))
    t_tf = t_box.text_frame
    t_tf.word_wrap = True
    t_tf.margin_left = t_tf.margin_top = 0

    p1 = t_tf.paragraphs[0]
    p1.text = "Campus & Residence Hall"
    p1.font.size = Pt(40)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_WHITE

    p2 = t_tf.add_paragraph()
    p2.text = "Fire Defense System"
    p2.font.size = Pt(40)
    p2.font.bold = True
    p2.font.color.rgb = ACCENT_AMBER

    p3 = t_tf.add_paragraph()
    p3.text = "Interactive fire prevention, evacuation simulation, extinguisher training, and verified Taiwan protocols. Developed with a multi-role AI agent team."
    p3.font.size = Pt(14)
    p3.font.color.rgb = TEXT_MUTED
    p3.space_before = Pt(12)

    # 4 Quick Facts Cards
    facts = [
        ("🎯 CORE MISSION", "Active Survival Education", ACCENT_RED),
        ("👥 TARGET USERS", "Dorm Students & Labs", ACCENT_AMBER),
        ("🤖 AI PIPELINE", "Leader + Coder + Auditor", ACCENT_CYAN),
        ("🛡️ AUDIT RIGOR", "100% Verified Taiwan Hotlines", ACCENT_EMERALD)
    ]

    card_w = Inches(2.72)
    card_h = Inches(1.6)
    card_y = Inches(4.9)

    for i, (f_tag, f_val, f_color) in enumerate(facts):
        cx = Inches(0.8 + i * 2.98)
        card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, cx, card_y, card_w, card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = CARD_BORDER
        card.line.width = Pt(1)

        c_tf = card.text_frame
        c_tf.word_wrap = True
        c_tf.margin_left = c_tf.margin_right = Inches(0.2)
        c_tf.margin_top = Inches(0.3)

        cp1 = c_tf.paragraphs[0]
        cp1.text = f_tag
        cp1.font.size = Pt(9)
        cp1.font.bold = True
        cp1.font.color.rgb = f_color

        cp2 = c_tf.add_paragraph()
        cp2.text = f_val
        cp2.font.size = Pt(13)
        cp2.font.bold = True
        cp2.font.color.rgb = TEXT_WHITE
        cp2.space_before = Pt(6)

    # =========================================================================
    # SLIDE 2: WHY I MADE THIS?
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_header(s2, "01 • THE PROBLEM & GENESIS", "Why Did I Make This?", 
               "Traditional fire posters on noticeboards are passive and routinely ignored. In real emergencies, students panic and make fatal mistakes.")

    cards_s2 = [
        ("The Passive Safety Trap", 
         "Under real fire emergencies (3:00 AM alarm, dark corridors, blinding smoke), recall of static text flyers drops by over 80%. Panic causes dangerous errors like entering elevator shafts.", 
         ACCENT_RED),
        ("Interactive Muscle Memory", 
         "Translating key safety procedures into physical kinetic animations (door heat dorsal check, 30-60cm smoke crawling, Stop-Drop-and-Roll) builds instinctive visual memory before disaster strikes.", 
         ACCENT_EMERALD),
        ("Architectural Ground Truth", 
         "Generic maps cause disorientation. We recreated the actual hollow-courtyard floorplan of Ying-Xi Dormitory 4F, clarifying that the void lightwell cannot be crossed and directing students away from lifts.", 
         ACCENT_CYAN),
        ("Localized Emergency Readiness", 
         "Generic templates teach foreign 911 hotlines. Our deck grounds every protocol directly in Taiwan's emergency infrastructure (119 Fire, 110 Police, 112 Cellular Mobile SOS).", 
         ACCENT_AMBER)
    ]

    grid_w = Inches(5.7)
    grid_h = Inches(2.2)

    positions_s2 = [
        (Inches(0.8), Inches(2.3)),
        (Inches(6.8), Inches(2.3)),
        (Inches(0.8), Inches(4.8)),
        (Inches(6.8), Inches(4.8))
    ]

    for (c_title, c_body, c_acc), (gx, gy) in zip(cards_s2, positions_s2):
        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, gx, gy, grid_w, grid_h)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = CARD_BORDER
        card.line.width = Pt(1)

        c_tf = card.text_frame
        c_tf.word_wrap = True
        c_tf.margin_left = c_tf.margin_right = Inches(0.25)
        c_tf.margin_top = Inches(0.25)

        cp1 = c_tf.paragraphs[0]
        cp1.text = c_title
        cp1.font.size = Pt(14)
        cp1.font.bold = True
        cp1.font.color.rgb = c_acc

        cp2 = c_tf.add_paragraph()
        cp2.text = c_body
        cp2.font.size = Pt(11)
        cp2.font.color.rgb = TEXT_MUTED
        cp2.space_before = Pt(6)

    # =========================================================================
    # SLIDE 3: WHO IS IT FOR?
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_header(s3, "02 • TARGET AUDIENCE & STAKEHOLDERS", "Who Is It Designed For?",
               "Tailored for modern university ecosystems where diverse residents, international students, and high-tech lab equipment coexist.")

    audiences = [
        ("🛌 Dorm Residents & Freshmen", "PRIMARY USERS", [
            "Living away from home for the first time with high electronic appliance usage.",
            "Need clear drills on electrical loads (curling irons, e-scooters, daisy-chain cords).",
            "Must know exact escape routes to North and South stairs without hesitation."
        ], ACCENT_RED),
        ("🌐 International Students", "INCLUSIVE ACCESS", [
            "Often face severe language barriers when campus fire announcements are Chinese-only.",
            "One-click instant toggle between Traditional Chinese (繁體中文) and English.",
            "Bilingual speech synthesis announcements and localized Taiwan emergency guidance."
        ], ACCENT_CYAN),
        ("🔬 AI Labs & Communal Kitchens", "SPECIALIZED SAFETY", [
            "High-wattage GPU server clusters, chemical solvents, and communal kitchen stovetops.",
            "Dedicated zone protocols for grease fires, solvent cabinets, and fire doors.",
            "Interactive compliance audit checklist with real-time mathematical risk gauge."
        ], ACCENT_AMBER)
    ]

    col_w = Inches(3.72)
    col_h = Inches(4.7)

    for i, (aud_t, aud_badge, points, aud_acc) in enumerate(audiences):
        ax = Inches(0.8 + i * 4.0)
        ay = Inches(2.2)

        card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, ax, ay, col_w, col_h)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = CARD_BORDER
        card.line.width = Pt(1)

        c_tf = card.text_frame
        c_tf.word_wrap = True
        c_tf.margin_left = c_tf.margin_right = Inches(0.25)
        c_tf.margin_top = Inches(0.3)

        cp1 = c_tf.paragraphs[0]
        cp1.text = aud_badge
        cp1.font.size = Pt(9)
        cp1.font.bold = True
        cp1.font.color.rgb = aud_acc

        cp2 = c_tf.add_paragraph()
        cp2.text = aud_t
        cp2.font.size = Pt(14)
        cp2.font.bold = True
        cp2.font.color.rgb = TEXT_WHITE
        cp2.space_before = Pt(4)

        for p in points:
            pt = c_tf.add_paragraph()
            pt.text = f"• {p}"
            pt.font.size = Pt(11)
            pt.font.color.rgb = TEXT_MUTED
            pt.space_before = Pt(12)

    # =========================================================================
    # SLIDE 4: WHAT AI DID I USE?
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_header(s4, "03 • COLLABORATIVE AGENT ARCHITECTURE", "What AI Did I Use? The 3-Role AI Lab",
               "Instead of a simple one-shot prompt, this project was developed using a self-correcting multi-agent engineering workflow.")

    roles = [
        ("ROLE 1: ARCHITECT", "Google Antigravity", "The System Leader", 
         "Authored the comprehensive task spec (TASK-002), user requirements, modern web standards, UX tokens, and acceptance criteria.",
         ACCENT_AMBER),
        ("ROLE 2: PROGRAMMER", "ChatGPT / Codex", "The Implementer",
         "Engineered clean modular HTML5, modern CSS3 responsive styling, canvas particle engines, Web Audio sirens, and bilingual state management.",
         ACCENT_CYAN),
        ("ROLE 3: AUDITOR", "OpenCode CLI", "The Double Checker",
         "Ran automated headless audits, tested at 800x654 and 1296x886 viewports, inspected console errors, and strictly verified fire-safety facts.",
         ACCENT_EMERALD)
    ]

    for i, (r_tag, r_model, r_title, r_desc, r_col) in enumerate(roles):
        rx = Inches(0.8 + i * 4.0)
        ry = Inches(2.3)

        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, rx, ry, col_w, Inches(3.6))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = r_col
        card.line.width = Pt(1.5)

        c_tf = card.text_frame
        c_tf.word_wrap = True
        c_tf.margin_left = c_tf.margin_right = Inches(0.25)
        c_tf.margin_top = Inches(0.3)

        cp1 = c_tf.paragraphs[0]
        cp1.text = f"{r_tag}  [{r_model}]"
        cp1.font.size = Pt(9)
        cp1.font.bold = True
        cp1.font.color.rgb = r_col

        cp2 = c_tf.add_paragraph()
        cp2.text = r_title
        cp2.font.size = Pt(16)
        cp2.font.bold = True
        cp2.font.color.rgb = TEXT_WHITE
        cp2.space_before = Pt(4)

        cp3 = c_tf.add_paragraph()
        cp3.text = r_desc
        cp3.font.size = Pt(11)
        cp3.font.color.rgb = TEXT_MUTED
        cp3.space_before = Pt(10)

    # Note at bottom
    note_box = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.2), Inches(11.72), Inches(0.8))
    note_box.fill.solid()
    note_box.fill.fore_color.rgb = RGBColor(15, 30, 25)
    note_box.line.color.rgb = ACCENT_EMERALD
    note_box.line.width = Pt(1)
    n_tf = note_box.text_frame
    n_tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    np = n_tf.paragraphs[0]
    np.text = "💡 Key Takeaway: The AI team does not blindly trust generation. OpenCode issued a strict REVISE verdict uncovering 8 blockers, which the Leader and Programmer then systematically resolved."
    np.font.size = Pt(10.5)
    np.font.bold = True
    np.font.color.rgb = RGBColor(167, 243, 208)

    # =========================================================================
    # SLIDE 5: WHAT I CHECKED?
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_header(s5, "04 • RIGOROUS VERIFICATION & AUDIT", "What Did I Check? QA & Safety Audit",
               "In life-safety applications, inaccurate guidance can be catastrophic. Here is what was audited and verified:")

    audit_cards = [
        ("Layout Collapse at 800x654", "Fixed flex squeezing where instruction badges compressed text into 1-character columns. Added flex-wrap: wrap and fluid basis."),
        ("P.A.S.S. Dynamic Language Re-translation", "Resolved stale Chinese text on active extinguisher cards by re-evaluating step data and buttons dynamically on language switch."),
        ("Factual Accuracy on 112 SOS", "Eliminated unsafe 'works without signal' claims. Clarified that 112 requires cellular tower coverage, even though SIM is not required."),
        ("Evacuee Pathing Away From Elevators", "Corrected simulated evacuee vectors that walked into the elevator box. Targeted them directly into North Stairs (234, 28) and South Stairs (370, 417)."),
        ("Floorplan Numbering Fidelity", "Verified against physical Ying-Xi 4F map photo. Confirmed odd numbering on west wing (X31-X43) and omission of X15 are authentic building features."),
        ("Visual Overlap & Timing Synchronization", "Shifted Stop-Drop-Roll status pill well above the student figure; widened pill padding so AC notices never clip; synchronized timing to 16 seconds.")
    ]

    for i, (a_t, a_b) in enumerate(audit_cards):
        col_idx = i % 3
        row_idx = i // 3
        ax = Inches(0.8 + col_idx * 4.0)
        ay = Inches(2.3 + row_idx * 2.4)

        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, ax, ay, Inches(3.72), Inches(2.2))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = CARD_BORDER
        card.line.width = Pt(1)

        c_tf = card.text_frame
        c_tf.word_wrap = True
        c_tf.margin_left = c_tf.margin_right = Inches(0.2)
        c_tf.margin_top = Inches(0.2)

        cp1 = c_tf.paragraphs[0]
        cp1.text = "✅ VERIFIED & RESOLVED"
        cp1.font.size = Pt(8.5)
        cp1.font.bold = True
        cp1.font.color.rgb = ACCENT_EMERALD

        cp2 = c_tf.add_paragraph()
        cp2.text = a_t
        cp2.font.size = Pt(12)
        cp2.font.bold = True
        cp2.font.color.rgb = TEXT_WHITE
        cp2.space_before = Pt(4)

        cp3 = c_tf.add_paragraph()
        cp3.text = a_b
        cp3.font.size = Pt(10)
        cp3.font.color.rgb = TEXT_MUTED
        cp3.space_before = Pt(4)

    # =========================================================================
    # SLIDE 6: WHAT IS NEXT?
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_header(s6, "05 • ROADMAP & FUTURE EXPANSION", "What Is Next? The Future Roadmap",
               "Building upon this validated interactive core to establish an interconnected campus safety ecosystem.")

    roadmap_items = [
        ("PHASE 1", "📱 PWA & Offline Smartphone Deployment", 
         "Package the deck into a Progressive Web App (PWA) with Service Worker caching. Residents can view evacuation maps and emergency hotlines even during grid blackouts.",
         ACCENT_CYAN),
        ("PHASE 2", "🥽 3D WebGL / Three.js Virtual Walkthrough", 
         "Elevate the 2D floorplan into an immersive 3D first-person escape drill. Students practice escaping simulated low-visibility corridors and finding exit doors.",
         ACCENT_EMERALD),
        ("PHASE 3", "📡 IoT Smart Smoke Detector Telemetry", 
         "Connect campus IoT smoke sensors via WebSockets. Active alarms will dynamically highlight danger zones in red and recalculate optimal exit routes in real time.",
         ACCENT_AMBER),
        ("PHASE 4", "🏆 Gamified Inter-Dorm Safety Drills", 
         "Transform compliance audits into an annual inter-residence challenge with interactive QR code checkpoints and digital certification.",
         ACCENT_RED)
    ]

    for (r_phase, r_title, r_desc, r_acc), (gx, gy) in zip(roadmap_items, positions_s2):
        card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, gx, gy, grid_w, grid_h)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = CARD_BORDER
        card.line.width = Pt(1)

        c_tf = card.text_frame
        c_tf.word_wrap = True
        c_tf.margin_left = c_tf.margin_right = Inches(0.25)
        c_tf.margin_top = Inches(0.25)

        cp1 = c_tf.paragraphs[0]
        cp1.text = r_phase
        cp1.font.size = Pt(9.5)
        cp1.font.bold = True
        cp1.font.color.rgb = r_acc

        cp2 = c_tf.add_paragraph()
        cp2.text = r_title
        cp2.font.size = Pt(13)
        cp2.font.bold = True
        cp2.font.color.rgb = TEXT_WHITE
        cp2.space_before = Pt(4)

        cp3 = c_tf.add_paragraph()
        cp3.text = r_desc
        cp3.font.size = Pt(10.5)
        cp3.font.color.rgb = TEXT_MUTED
        cp3.space_before = Pt(6)

    # Save
    os.makedirs("docs", exist_ok=True)
    out_path = os.path.abspath("docs/Campus_Fire_Safety_Presentation.pptx")
    prs.save(out_path)
    print(f"Presentation generated successfully at: {out_path}")

if __name__ == '__main__':
    create_deck()
