from typing import List, Dict, Any
from dataclasses import dataclass
from PIL import Image, ImageEnhance
import numpy as np
import easyocr
import re
from rapidfuzz import fuzz

# === OCR Reader ===
reader = easyocr.Reader(['en'], gpu=False)

# === Data Models ===
@dataclass
class IdentifierData:
    name: str
    quantity: int

@dataclass
class MatchingResult:
    product: Dict[str, Any]
    similarity: float
    requested_quantity: int
    available_quantity: int
    missing_quantity: int
    total_matching_products: int
    message: str

# === Enhancements ===
def enhance_image(image_path: str) -> np.ndarray:
    image = Image.open(image_path).convert("L")
    image = image.resize((image.width * 2, image.height * 2))
    image = ImageEnhance.Contrast(image).enhance(2.0)
    return np.array(image)

def group_lines_by_y(results, threshold_y=30):
    grouped = []
    current_group = []
    last_y = None

    for (bbox, text, conf) in results:
        y = bbox[0][1]
        if last_y is None or abs(y - last_y) <= threshold_y:
            current_group.append((text, bbox, conf))
        else:
            grouped.append(current_group)
            current_group = [(text, bbox, conf)]
        last_y = y
    if current_group:
        grouped.append(current_group)
    return grouped

def extract_identifier_data(grouped_lines: List[List]) -> List[IdentifierData]:
    identifiers = []
    for group in grouped_lines:
        texts = [text for text, _, _ in group]
        combined = " ".join(texts)

        for text, _, _ in reversed(group):
            if re.fullmatch(r"\d+", text):
                quantity = int(text)
                name = " ".join(t[0] for t in group if t[0] != text).strip()
                if name and quantity > 0:
                    identifiers.append(IdentifierData(name=name, quantity=quantity))
                break
    return identifiers

def simple_similarity(a: str, b: str) -> float:
    return fuzz.token_sort_ratio(a, b) / 100.0

# === Main Entry Point ===
def perform_ocr_and_match(image_path: str, product_list: List[Dict[str, Any]]) -> List[MatchingResult]:
    image_np = enhance_image(image_path)
    ocr_results = reader.readtext(image_np, detail=1)

    grouped_lines = group_lines_by_y(ocr_results)
    identifiers = extract_identifier_data(grouped_lines)

    matches = []
    for identifier in identifiers:
        best_match = None
        best_similarity = 0.0

        for product in product_list:
            sim = simple_similarity(identifier.name.lower(), product['name'].lower())
            if sim > best_similarity:
                best_similarity = sim
                best_match = product

        if best_match and best_similarity >= 0.5:
            available_qty = best_match.get('quantityAvailable', 0)
            requested = identifier.quantity
            missing = max(0, requested - available_qty)
            matches.append(
                MatchingResult(
                    product=best_match,
                    similarity=best_similarity,
                    requested_quantity=requested,
                    available_quantity=available_qty,
                    missing_quantity=missing,
                    total_matching_products=1,
                    message="Matched Successfully" if missing == 0 else "Partial Match"
                )
            )

    return matches
