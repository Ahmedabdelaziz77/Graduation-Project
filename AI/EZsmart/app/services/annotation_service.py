import os
import uuid
from PIL import Image, ImageDraw, ImageFont

STATIC_IMAGE_DIR = "static/annotated_images"
os.makedirs(STATIC_IMAGE_DIR, exist_ok=True)

def draw_annotations(image_path: str, placements: list[dict]) -> str:
    image = Image.open(image_path).convert("RGB")
    draw = ImageDraw.Draw(image)

    try:
        font = ImageFont.truetype("arial.ttf", 28)
    except:
        font = ImageFont.load_default()

    image_width, image_height = image.size

    for item in placements:
        x, y = int(item["x"]), int(item["y"])
        label = item["label"]

        # Adjust to stay within image boundaries
        rect_width, rect_height = 300, 200
        x = max(rect_width // 2, min(x, image_width - rect_width // 2))
        y = max(rect_height // 2, min(y, image_height - rect_height // 2))

        top_left = (x - rect_width // 2, y - rect_height // 2)
        bottom_right = (x + rect_width // 2, y + rect_height // 2)

        draw.rectangle([top_left, bottom_right], outline="red", width=6)

        # Draw label background and text
        text_bbox = draw.textbbox((0, 0), label, font=font)
        padding = 10
        text_bg = (
            top_left[0],
            top_left[1] - text_bbox[3] - padding,
            top_left[0] + text_bbox[2] + 2 * padding,
            top_left[1]
        )
        draw.rectangle(text_bg, fill="black")
        draw.text((text_bg[0] + padding, text_bg[1]), label, fill="white", font=font)

    filename = f"annotated_{uuid.uuid4().hex}.png"
    output_path = os.path.join(STATIC_IMAGE_DIR, filename)
    image.save(output_path)
    return output_path, f"http://localhost:8000/static/annotated_images/{filename}"