from fastapi import APIRouter
from app.api.endpoints import crypto, ctf

api_router = APIRouter()

# Grouping endpoints by their specific domains
api_router.include_router(crypto.router, prefix="/crypto", tags=["Cryptography"])
api_router.include_router(ctf.router, prefix="/ctf", tags=["CTF Challenges"])
