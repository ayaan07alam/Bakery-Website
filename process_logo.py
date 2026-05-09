"""
Run this script after saving your new logo image to:
C:/Users/AYAAN ALAM/Downloads/saha_bakery_logo.png
OR any path you specify below.

It will remove the white background and save the transparent version to the public folder.
"""
from PIL import Image

# ⬇️ CHANGE THIS to where you saved the logo image
input_path = r"C:\Users\AYAAN ALAM\Downloads\saha_bakery_logo.png"

output_transparent = r"d:\SahaBakery\frontend\public\logo-transparent.png"
output_logo = r"d:\SahaBakery\frontend\public\logo.png"
output_favicon = r"d:\SahaBakery\frontend\public\favicon.png"

img = Image.open(input_path).convert("RGBA")
pixels = img.load()
width, height = img.size

# Remove white/near-white outer background
for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if r > 235 and g > 235 and b > 235:
            pixels[x, y] = (255, 255, 255, 0)  # transparent

img.save(output_transparent, "PNG")
img.save(output_logo, "PNG")
# Favicon - smaller
favicon = img.resize((64, 64), Image.LANCZOS)
favicon.save(output_favicon, "PNG")

print("✅ Logo saved with transparent background!")
print(f"   → {output_transparent}")
print(f"   → {output_logo}")
print(f"   → {output_favicon}")
