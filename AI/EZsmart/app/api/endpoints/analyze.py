from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import random

from app.core.cache import last_analysis_cache
from app.services.yolo_service import detect_objects
from app.services.embedding_service import embed_products
from app.services.recommendation_service import explain_and_place
from app.services.annotation_service import draw_annotations
from app.utils.product_utils import get_product_catalog
from app.services.embedding_service import recommend_products

router = APIRouter()

@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    image_path = "temp.jpg"
    with open(image_path, "wb") as f:
        f.write(await file.read())

    detected_objects = detect_objects(image_path)
    product_list = get_product_catalog()
    embedded_products = embed_products(product_list)
    recommendations = recommend_products(detected_objects, embedded_products)

    image_width, image_height = Image.open(image_path).size
    explained_recommendations = explain_and_place(
        detected_objects, recommendations, image_path, image_width, image_height
    )

    last_analysis_cache["image_path"] = image_path
    last_analysis_cache["recommendations"] = explained_recommendations

    _, public_url = draw_annotations(
        image_path,
        [r["placement"] for r in explained_recommendations]
    )

    return {
        "detectedObjects": detected_objects,
        "recommendations": explained_recommendations,
        "imageUrl": public_url
    }

@router.post("/regenerate-placements")
async def regenerate_placements():
    if not last_analysis_cache["image_path"] or not last_analysis_cache["recommendations"]:
        return JSONResponse(status_code=400, content={"error": "No previous analysis found."})

    image_path = last_analysis_cache["image_path"]
    recommendations = last_analysis_cache["recommendations"]

    image_width, image_height = Image.open(image_path).size
    placed_coordinates = set()
    safe_margin = 100

    for product in recommendations:
        while True:
            x = random.randint(safe_margin, image_width - safe_margin)
            y = random.randint(safe_margin, image_height - safe_margin)
            if all(abs(x - px) > 80 and abs(y - py) > 60 for px, py in placed_coordinates):
                break
        product["placement"]["x"] = x
        product["placement"]["y"] = y
        placed_coordinates.add((x, y))

    _, public_url = draw_annotations(image_path, [p["placement"] for p in recommendations])

    return {
        "recommendations": recommendations,
        "imageUrl": public_url
    }
