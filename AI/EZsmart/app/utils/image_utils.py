# app/utils/image_utils.py

from PIL import Image, ImageDraw, ImageFont
import os
import uuid

STATIC_IMAGE_DIR = "static/annotated_images"
os.makedirs(STATIC_IMAGE_DIR, exist_ok=True)

def draw_annotations(image_path, placements):
    image = Image.open(image_path).convert("RGB")
    draw = ImageDraw.Draw(image)

    try:
        font = ImageFont.truetype("arial.ttf", 28)
    except:
        font = ImageFont.load_default()

    image_width, image_height = image.size

    for item in placements:
        if "x" in item and "y" in item:
            x, y = int(item["x"]), int(item["y"])
            rect_width, rect_height = 300, 200

            # Ensure the box stays within the image bounds
            x = max(rect_width // 2, min(x, image_width - rect_width // 2))
            y = max(rect_height // 2, min(y, image_height - rect_height // 2))

            top_left = (x - rect_width // 2, y - rect_height // 2)
            bottom_right = (x + rect_width // 2, y + rect_height // 2)

            draw.rectangle([top_left, bottom_right], outline="red", width=6)

            # Draw label background and text
            text = item["label"]
            text_bbox = draw.textbbox((0, 0), text, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            padding = 10

            bg_top = max(0, top_left[1] - text_height - padding)
            text_bg = (
                top_left[0],
                bg_top,
                top_left[0] + text_width + 2 * padding,
                bg_top + text_height + padding
            )
            draw.rectangle(text_bg, fill="black")
            draw.text((text_bg[0] + padding, text_bg[1] + 2), text, fill="white", font=font)

    filename = f"annotated_{uuid.uuid4().hex}.png"
    output_path = os.path.join(STATIC_IMAGE_DIR, filename)
    return output_path, f"http://localhost:8000/static/annotated_images/{filename}"
