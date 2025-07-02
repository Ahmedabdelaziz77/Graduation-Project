# app/services/recommendation_service.py

from app.services.gpt_service import generate_explanation_and_position

def explain_and_place(detected_objects, products, image_path, image_width, image_height):
    explained = []
    used_coords = set()

    for product in products:
        # Ask GPT for reasoning and placement
        reason, placement = generate_explanation_and_position(
            product,
            detected_objects,
            (image_width, image_height)
        )

        # Avoid overlapping placements
        while (placement["x"], placement["y"]) in used_coords:
            placement["x"] += 5
            placement["y"] += 5

        used_coords.add((placement["x"], placement["y"]))

        # Append final structure
        explained.append({
            "id": product["id"],
            "name": product["name"],
            "price": product["sellingPrice"],
            "image": product["image"],
            "explanation": reason,
            "placement": placement
        })

    return explained
