from PIL import Image
import os, glob

search_paths = [
    "C:/Users/AYAAN ALAM/Downloads/*.jpg",
    "C:/Users/AYAAN ALAM/Downloads/*.png",
    "C:/Users/AYAAN ALAM/Desktop/*.jpg",
    "C:/Users/AYAAN ALAM/Desktop/*.png",
    "C:/Users/AYAAN ALAM/Pictures/*.jpg",
    "C:/Users/AYAAN ALAM/Pictures/*.png",
]

found = []
for pattern in search_paths:
    found.extend(glob.glob(pattern))

print("Found image files:")
for f in sorted(found, key=os.path.getmtime, reverse=True)[:10]:
    print(f" - {f} | size: {os.path.getsize(f)}")
