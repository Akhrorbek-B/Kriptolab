from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import api_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend engine for cryptography visualization and CTF challenges",
    version="1.0.0"
)

# Configure CORS for the frontend to allow React to communicate with the FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # NOTE: Restrict this to specific origins (e.g., http://localhost:5173) in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the main API router
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the KriptoLab API. Access /docs for the Swagger UI."}
