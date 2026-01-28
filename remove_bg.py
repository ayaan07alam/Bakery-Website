from PIL import Image, ImageDraw
import sys

def remove_background_floodfill(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # Flood fill from all 4 corners to capture the surrounding background
        # Use a threshold to handle slight compression artifacts
        thresh = 50
        target_color = (0, 0, 0, 0) # Transparent
        
        # Check corners to see if they are "white-ish" before filling
        # This prevents erasing the logo if it touches the edge and isn't white
        corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        
        for corner in corners:
            pixel = img.getpixel(corner)
            # Check if pixel is light/white (r,g,b > 200)
            if pixel[0] > 200 and pixel[1] > 200 and pixel[2] > 200:
                ImageDraw.floodfill(img, corner, target_color, thresh=thresh)
        
        img.save(output_path, "PNG")
        print("Successfully removed background using flood fill")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_bg.py <input_path> <output_path>")
    else:
        remove_background_floodfill(sys.argv[1], sys.argv[2])
