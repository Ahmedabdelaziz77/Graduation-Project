from fastapi import APIRouter

from app.api.endpoints import analyze, ocr

router = APIRouter()

# Mount each endpoint group
router.include_router(analyze.router, tags=["Analyze"])
router.include_router(ocr.router, tags=["OCR Match"])
