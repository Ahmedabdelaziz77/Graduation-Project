from sentence_transformers import SentenceTransformer, util
from typing import List, Tuple, Dict, Any

# Load sentence transformer model once
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_products(product_list: List[Dict[str, Any]]) -> List[Tuple[Dict[str, Any], Any]]:
    """
    Convert each product into a tuple: (product_dict, embedding_tensor)
    """
    embedded = []
    for product in product_list:
        text = f"{product['name']} {product['hardwareSpecifications']} {product['category']['name']}"
        embedding = embedding_model.encode(text, convert_to_tensor=True)
        embedded.append((product, embedding))
    return embedded

def recommend_products(
    detected_objects: List[str],
    embedded_products: List[Tuple[Dict[str, Any], Any]],
    top_k: int = 5
) -> List[Dict[str, Any]]:
    """
    Recommend top-k products based on similarity to room context
    """
    context = " ".join(detected_objects)
    context_embedding = embedding_model.encode(context, convert_to_tensor=True)

    similarities = [
        (product, util.cos_sim(context_embedding, embedding).item())
        for product, embedding in embedded_products
    ]

    sorted_products = sorted(similarities, key=lambda x: x[1], reverse=True)
    return [p[0] for p in sorted_products[:top_k]]
