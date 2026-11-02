"""
Render the 6 aesthetic slides to high-DPI 1920x1080 images using headless Chrome,
and package them into a professional PowerPoint (.pptx) file compatible with Canva,
PowerPoint, Keynote, and Google Slides.
"""

import os
import subprocess
import time
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BASE_DIR = r"S:\ailab"
SLIDES_HTML_DIR = os.path.join(BASE_DIR, "src", "presentation", "export_slides")
IMG_DIR = os.path.join(BASE_DIR, "docs", "slides_img")
PPTX_PATH = os.path.join(BASE_DIR, "docs", "Campus_Fire_Safety_Aesthetic_Deck.pptx")
PPTX_LEGACY_PATH = os.path.join(BASE_DIR, "docs", "Campus_Fire_Safety_Presentation.pptx")

os.makedirs(IMG_DIR, exist_ok=True)

def render_slide_images():
    print("Rendering high-res slide images via headless Chrome...")
    for i in range(1, 7):
        html_file = os.path.join(SLIDES_HTML_DIR, f"slide{i}.html")
        out_img = os.path.join(IMG_DIR, f"slide_{i}.png")
        url = f"file:///{html_file.replace(os.sep, '/')}"

        cmd = [
            CHROME_PATH,
            "--headless=new",
            "--no-sandbox",
            "--disable-gpu",
            "--force-device-scale-factor=1",
            "--window-size=1920,1080",
            f"--screenshot={out_img}",
            url
        ]

        print(f"  Rendering Slide {i} -> {out_img}...")
        subprocess.run(cmd, check=True)
        time.sleep(0.5)

    print("All 6 slide images rendered successfully!")

def build_pptx():
    print("Building high-fidelity PowerPoint presentation...")
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    for i in range(1, 7):
        img_path = os.path.join(IMG_DIR, f"slide_{i}.png")
        slide = prs.slides.add_slide(blank_layout)

        # Insert 1920x1080 high-res rendered slide background
        slide.shapes.add_picture(img_path, 0, 0, width=prs.slide_width, height=prs.slide_height)

    prs.save(PPTX_PATH)
    print(f"PowerPoint presentation saved successfully at: {PPTX_PATH}")
    try:
        prs.save(PPTX_LEGACY_PATH)
        print(f"PowerPoint presentation also updated at: {PPTX_LEGACY_PATH}")
    except Exception as e:
        print(f"Note: Could not overwrite legacy file because it is open in another app: {e}")

if __name__ == '__main__':
    render_slide_images()
    build_pptx()
