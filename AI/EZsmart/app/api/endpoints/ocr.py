from fastapi import APIRouter, UploadFile, File

from app.ocr.ocr_service import perform_ocr_and_match
from app.utils.product_utils import get_product_catalog

router = APIRouter()

@router.post("/ocr-match")
async def ocr_match(file: UploadFile = File(...)):
    image_path = "ocr_temp.jpg"
    with open(image_path, "wb") as f:
        f.write(await file.read())

    product_list = get_product_catalog()
    matching_results = perform_ocr_and_match(image_path, product_list)

    return {
        "matches": [match.__dict__ for match in matching_results]
    }
