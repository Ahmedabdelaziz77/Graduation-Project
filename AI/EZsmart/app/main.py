from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os

from app.api.routes import router as api_router

# Load environment variables
load_dotenv()

# FastAPI setup
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for annotated images
app.mount("/static", StaticFiles(directory="static"), name="static")

# Register all API routes
app.include_router(api_router)
