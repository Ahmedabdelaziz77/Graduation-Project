# app/utils/product_utils.py

import requests

SPRING_API_URL = "http://localhost:8080/api/products"

def get_product_catalog():
    try:
        response = requests.get(SPRING_API_URL)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print("❌ Error fetching products:", e)
        return []
