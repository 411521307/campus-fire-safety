"""
Generate a formally written (engaging and accessible) executive report
in Microsoft Word (.docx) format for the Campus Fire Defense System project.
"""

import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import qn, nsdecls

def create_report():
    doc = Document()

    # Page Margins
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Palette
    COLOR_PRIMARY = RGBColor(15, 23, 42)      # Deep Slate #0f172a
    COLOR_CRIMSON = RGBColor(220, 38, 38)     # Fire Red #dc2626
    COLOR_AMBER = RGBColor(217, 119, 6)       # Amber #d97706
    COLOR_EMERALD = RGBColor(16, 185, 129)    # Emerald #10b981
    COLOR_MUTED = RGBColor(100, 116, 139)     # Slate 500

    # Normal Style Adjustments
    style_normal = doc.styles['Normal']
    style_normal.font.name = 'Calibri'
    style_normal.font.size = Pt(11)
    style_normal.font.color.rgb = RGBColor(51, 65, 85)
    style_normal.paragraph_format.line_spacing = 1.2
    style_normal.paragraph_format.space_after = Pt(6)

    # -------------------------------------------------------------
    # COVER / HEADER
    # -------------------------------------------------------------
    title_p = doc.add_paragraph()
    title_p.paragraph_format.space_before = Pt(0)
    title_p.paragraph_format.space_after = Pt(2)
    run_badge = title_p.add_run("CAMPUS LIFE-SAFETY & AI LAB INITIATIVE\n")
    run_badge.font.name = 'Calibri'
    run_badge.font.size = Pt(10)
    run_badge.font.bold = True
    run_badge.font.color.rgb = COLOR_CRIMSON

    run_title = title_p.add_run("Campus & Dormitory Fire Defense System")
    run_title.font.name = 'Calibri'
    run_title.font.size = Pt(24)
    run_title.font.bold = True
    run_title.font.color.rgb = COLOR_PRIMARY

    sub_p = doc.add_paragraph()
    sub_p.paragraph_format.space_after = Pt(16)
    run_sub = sub_p.add_run("Project Genesis, Technical Architecture, Multi-Agent Collaboration, and Verification Audit Report")
    run_sub.font.size = Pt(12)
    run_sub.font.italic = True
    run_sub.font.color.rgb = COLOR_MUTED

    # Meta Table Box
    meta_table = doc.add_table(rows=2, cols=4)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_table.autofit = False

    meta_headers = ["Document Version", "Date Completed", "AI Engineering Roles", "Verification Status"]
    meta_values = ["v2.2.0 (Verified)", "November 2, 2026", "Leader + Coder + Checker", "APPROVED (OpenCode)"]

    for i in range(4):
        # Header Cell
        cell_h = meta_table.cell(0, i)
        cell_h.text = meta_headers[i]
        p_h = cell_h.paragraphs[0]
        p_h.runs[0].font.size = Pt(9)
        p_h.runs[0].font.bold = True
        p_h.runs[0].font.color.rgb = COLOR_MUTED
        
        # Value Cell
        cell_v = meta_table.cell(1, i)
        cell_v.text = meta_values[i]
        p_v = cell_v.paragraphs[0]
        p_v.runs[0].font.size = Pt(10)
        p_v.runs[0].font.bold = True
        p_v.runs[0].font.color.rgb = COLOR_PRIMARY

    # Add divider line
    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    # -------------------------------------------------------------
    # EXECUTIVE SUMMARY
    # -------------------------------------------------------------
    h1 = doc.add_heading("Executive Summary", level=1)
    h1.paragraph_format.space_before = Pt(12)
    h1.runs[0].font.color.rgb = COLOR_CRIMSON

    doc.add_paragraph(
        "University residence halls and campus laboratories host thousands of students, international researchers, "
        "and faculty members alongside high-wattage computing equipment and electrical appliances. In spite of this, "
        "traditional campus fire prevention has long suffered from passive dissemination: static paper posters and dry PDF "
        "guidelines that residents routinely ignore and struggle to recall during high-stress nighttime emergencies."
    )
    doc.add_paragraph(
        "This project reimagined campus fire readiness into the Campus & Dormitory Fire Defense System: a responsive, "
        "dark-mode interactive presentation deck engineered across 8 discrete modules. Featuring life-critical kinetic animations, "
        "an unblocked 4-step P.A.S.S. particle extinguisher simulator, an architecturally accurate recreation of Ying-Xi Dormitory "
        "(迎曦一莊四樓), and localized Taiwan emergency protocols, the platform bridges the gap between passive policy and active survival instincts. "
        "The system was constructed and verified through a self-correcting 3-agent AI collaboration pipeline (Google Antigravity, "
        "ChatGPT/Codex, and OpenCode CLI)."
    )

    # -------------------------------------------------------------
    # SECTION 1: WHAT WE MADE
    # -------------------------------------------------------------
    h2 = doc.add_heading("1. What We Made: The 8-Section Interactive Suite", level=1)
    h2.paragraph_format.space_before = Pt(16)
    h2.runs[0].font.color.rgb = COLOR_PRIMARY

    doc.add_paragraph(
        "The application is engineered as a zero-dependency web deck with smooth horizontal slide navigation, "
        "directional wipe sweeps, and ambient ember particle physics. It encompasses 8 comprehensive modules:"
    )

    modules = [
        ("01. Frontpage Hero Deck", "A unified dashboard featuring 7 interactive quick-jump portals that allow immediate access to any topic with staggered entrance animations."),
        ("02. Fire Survival Actions Simulator", "An interactive, animated canvas demonstrating 4 life-or-death physical reactions: checking door handles with the back of the hand (preventing flexor muscle spasms), crawling below the 30-60 cm thermal smoke boundary, full 360-degree Stop-Drop-and-Roll, and room shelter-in-place signaling with wet towels and window flashlights."),
        ("03. Interactive P.A.S.S. Extinguisher Lab", "A dynamic simulation of the 4-step extinguisher technique (Pull, Aim, Squeeze, Sweep) with realistic flame suppression and pressurized chemical particle streams on an unobstructed 420px stage."),
        ("04. Dormitory Architectural Evacuation Map", "A precise recreation of Ying-Xi Dormitory 4F featuring the central void lightwell, room numbering (X01-X44), North Stairs (above Lift beside X04), South Stairs (beside X22), and active student evacuee pathing away from elevator shafts."),
        ("05. Campus Zone Safety Guidelines", "Filterable safety protocols specifically targeted at Dorm Living Rooms, Communal Kitchens, AI Computing Labs & Server Racks, and Egress Corridors."),
        ("06. Interactive Dorm Room Safety Audit", "A resident compliance checklist featuring real-time mathematical risk calculation and an animated circular compliance gauge (High Risk, Moderate, Safe)."),
        ("07. Emergency Decision Drills", "Interactive crisis simulation questions (nighttime alarms, stovetop oil fires, smoke-blocked stairwells) providing instant bilingual feedback and preserving answers across language switches."),
        ("08. Official Taiwan Emergency Hotlines", "A verified emergency directory covering 119 (Fire & Ambulance), 110 (Police), 112 (Cellular SOS), 1999 (Citizen Services), 1925 (Mental Health), 165 (Anti-Fraud), and 113 (Protection), complete with one-click direct dialing.")
    ]

    for title, desc in modules:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_after = Pt(4)
        r_t = p.add_run(f"{title}: ")
        r_t.bold = True
        r_t.font.color.rgb = COLOR_PRIMARY
        p.add_run(desc)

    # -------------------------------------------------------------
    # SECTION 2: WHO IS IT FOR
    # -------------------------------------------------------------
    h3 = doc.add_heading("2. Who Is It Designed For? (Target Stakeholders)", level=1)
    h3.paragraph_format.space_before = Pt(16)
    h3.runs[0].font.color.rgb = COLOR_PRIMARY

    doc.add_paragraph(
        "The platform addresses three distinct campus demographics with specific life-safety requirements:"
    )

    audiences = [
        ("Dormitory Residents & Incoming Freshmen", 
         "Students living independently for the first time often overload circuits with multi-plugs, curling irons, and lithium battery chargers. The deck provides tangible risk awareness and teaches immediate evacuation routes to prevent panic."),
        ("International Students & Visiting Scholars", 
         "Language barriers present a severe risk during emergencies. The entire application provides instant one-click toggle between Traditional Chinese (繁體中文) and English, including dual-language Web Speech API speech synthesis announcements."),
        ("Campus Lab Personnel & Facilities Management", 
         "AI research facilities housing high-wattage GPU server racks, chemical solvent storage, and communal kitchens require specialized protocols (CO2 extinguishers, metal lid oil smothering, unobstructed fire doors).")
    ]

    for aud_title, aud_desc in audiences:
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(4)
        r = p.add_run(f"• {aud_title}: ")
        r.bold = True
        r.font.color.rgb = COLOR_CRIMSON
        p.add_run(aud_desc)

    # -------------------------------------------------------------
    # SECTION 3: HOW WE MADE IT WITH AI
    # -------------------------------------------------------------
    h4 = doc.add_heading("3. How We Made It With AI: The 3-Role AI Lab", level=1)
    h4.paragraph_format.space_before = Pt(16)
    h4.runs[0].font.color.rgb = COLOR_PRIMARY

    doc.add_paragraph(
        "Rather than relying on unguided single-prompt AI code generation, this project adopted a formal, self-correcting "
        "collaborative pipeline modeled after professional software engineering teams:"
    )

    roles = [
        ("Role 1: The Leader & Architect (Antigravity)",
         "Formulated the foundational architecture, user journey requirements, Modern Web Guidance rules, visual design tokens, and authored the formal task specification (TASK-002) in the active development pipeline."),
        ("Role 2: The Programmer (ChatGPT / Codex)",
         "Translated the architectural blueprints into modular, high-performance HTML5, modern CSS3 (glassmorphic styling, flex-wrap responsive layouts), and vanilla JavaScript. Built custom 2D canvas physics loops, particle emitters, and Web Audio siren synthesis."),
        ("Role 3: The Double Checker & Quality Auditor (OpenCode CLI)",
         "Conducted automated headless audits on the generated codebase, inspecting syntax, rendering viewports (800x654 and 1296x886), checking console logs, evaluating Lighthouse accessibility metrics, and rigorously verifying life-safety advice against empirical fire science.")
    ]

    for role_name, role_desc in roles:
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(4)
        r = p.add_run(f"✦ {role_name}: ")
        r.bold = True
        r.font.color.rgb = COLOR_AMBER
        p.add_run(role_desc)

    # -------------------------------------------------------------
    # SECTION 4: WHAT WE CHECKED
    # -------------------------------------------------------------
    h5 = doc.add_heading("4. What We Checked: Rigorous QA Audit & Remediations", level=1)
    h5.paragraph_format.space_before = Pt(16)
    h5.runs[0].font.color.rgb = COLOR_PRIMARY

    doc.add_paragraph(
        "Life-safety tools demand zero tolerance for misinformation or UI breakdown. OpenCode's double-check audit issued "
        "an initial REVISE verdict, identifying 8 critical blockers that the Leader and Programmer resolved and signed off:"
    )

    checks = [
        ("Responsive Layout at Narrow Viewports (800×654)", "Fixed flex squeeze on instruction badges that compressed text into 1-character columns. Added 'flex-wrap: wrap' and fluid flex basis."),
        ("P.A.S.S. Dynamic Language Re-translation", "Resolved stale Chinese text on active extinguisher step cards by dynamically re-applying active step data and button labels upon language toggle."),
        ("Factual Accuracy of 112 SOS Advice", "Eliminated dangerous 'works without signal' claims. Clarified that 112 functions without a SIM or account balance, but strictly requires coverage from an active cellular tower."),
        ("Evacuee Pathing Away From Elevator Shafts", "Corrected simulated evacuee vectors that previously walked into the elevator box. Targeted them directly into North Stairs (234, 28) and South Stairs (370, 417)."),
        ("Architectural Floorplan Numbering Fidelity", "Verified against the original Ying-Xi 4F map photograph. Confirmed that odd numbering on the west wing (X31-X43) and omission of X15 on the east wing are genuine physical building attributes."),
        ("Visual Overlap & Pacing Synchronization", "Moved Stop-Drop-and-Roll status indicators well above the student figure to eliminate visual obstruction; unified demo loop cycle to a comfortable 16 seconds.")
    ]

    for check_title, check_desc in checks:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_after = Pt(4)
        r = p.add_run(f"{check_title}: ")
        r.bold = True
        r.font.color.rgb = COLOR_EMERALD
        p.add_run(check_desc)

    # -------------------------------------------------------------
    # SECTION 5: WHAT IS NEXT
    # -------------------------------------------------------------
    h6 = doc.add_heading("5. What Is Next? The Future Roadmap", level=1)
    h6.paragraph_format.space_before = Pt(16)
    h6.runs[0].font.color.rgb = COLOR_PRIMARY

    doc.add_paragraph(
        "The current deployment establishes a robust foundation for next-generation campus emergency preparedness. "
        "The forward engineering roadmap includes four key milestones:"
    )

    roadmap = [
        ("Phase 1: Progressive Web App (PWA) & Offline Caching", 
         "Integrating Service Workers to allow complete offline caching of evacuation maps and hotlines on student smartphones during grid power failures."),
        ("Phase 2: 3D Interactive WebGL Evacuation Simulator", 
         "Upgrading the 2D floorplan into an immersive 3D first-person escape drill using Three.js, enabling students to practice finding exits under varying smoke densities."),
        ("Phase 3: IoT Smart Smoke Detector Telemetry", 
         "Connecting campus IoT smoke detectors to the floorplan via WebSockets, dynamically highlighting active alarm zones in red and calculating optimal dynamic escape routes in real time."),
        ("Phase 4: Gamified Campus Dorm Safety Drills", 
         "Introducing semester-start inter-dorm fire drill leaderboards and interactive QR-code station challenges across university residence halls.")
    ]

    for phase_name, phase_desc in roadmap:
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(4)
        r = p.add_run(f"★ {phase_name}: ")
        r.bold = True
        r.font.color.rgb = COLOR_PRIMARY
        p.add_run(phase_desc)

    # Conclusion paragraph
    doc.add_paragraph().paragraph_format.space_before = Pt(12)
    p_concl = doc.add_paragraph()
    p_concl.paragraph_format.space_before = Pt(8)
    r_c = p_concl.add_run("Conclusion & Sign-Off: ")
    r_c.bold = True
    r_c.font.color.rgb = COLOR_CRIMSON
    p_concl.add_run(
        "By synthesizing modern web technologies, empirical fire science, and a disciplined multi-agent AI workflow, "
        "the Campus Fire Defense System transforms vital life-safety education into an intuitive, memorable, and life-saving experience."
    )

    # Save
    os.makedirs("docs", exist_ok=True)
    output_path = os.path.abspath("docs/Campus_Fire_Safety_Report.docx")
    doc.save(output_path)
    print(f"Report generated successfully at: {output_path}")

if __name__ == '__main__':
    create_report()
