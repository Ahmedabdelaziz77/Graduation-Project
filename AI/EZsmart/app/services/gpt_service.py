import os
import json
import random
from openai import OpenAI
from PIL import Image

# OpenRouter client configuration
client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

def generate_explanation_and_position(product, detected_objects, image_size):
    prompt = (
        f"The following objects were detected in a room: {', '.join(detected_objects)}. "
        f"Given the product: '{product['name']}', which is described as: '{product['hardwareSpecifications']}', "
        "explain why it is a good fit for this room. Also return the most suitable position (x,y) in the image for placing the device (top-down view)."
    )

    width, height = image_size
    safe_margin = 100
    x, y = width // 2, height // 2  # default to center
    reason = ""

    try:
        response = client.chat.completions.create(
            model="mistralai/mistral-7b-instruct",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300
        )
        content = response.choices[0].message.content.strip()

        # If the model returns a JSON-like format
        parsed = json.loads(content) if content.startswith("{") else {}
        reason = parsed.get("reason") or content

        if isinstance(parsed.get("x"), int) and isinstance(parsed.get("y"), int):
            x, y = parsed["x"], parsed["y"]
        else:
            x, y = _generate_random_position(width, height, [])
    except Exception as e:
        reason = f"Could not generate explanation due to error: {str(e)}"
        x, y = _generate_random_position(width, height, [])

    return reason, {"x": x, "y": y, "label": product["name"]}

def _generate_random_position(image_width, image_height, used_coords, margin=100):
    for _ in range(100):
        x = random.randint(margin, image_width - margin)
        y = random.randint(margin, image_height - margin)
        if all(abs(x - ux) > 80 and abs(y - uy) > 60 for ux, uy in used_coords):
            return x, y
    return image_width // 2, image_height // 2
