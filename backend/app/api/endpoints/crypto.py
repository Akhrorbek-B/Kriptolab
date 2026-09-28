"""
Cryptography API Endpoints
============================
Exposes all cipher operations as REST endpoints with Pydantic validation.
Covers: Classical, Symmetric, Asymmetric, Hashing — one router per domain.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.classical import (
    caesar_encrypt, caesar_decrypt, caesar_brute_force,
    vigenere_encrypt, vigenere_decrypt,
    affine_encrypt, affine_decrypt,
    playfair_encrypt,
    railfence_encrypt, railfence_decrypt,
    atbash,
)
from app.services.symmetric import simulate_aes_round, simulate_modes
from app.services.asymmetric import (
    rsa_generate_keys, rsa_encrypt_text, rsa_decrypt_text,
    simulate_diffie_hellman, is_prime,
)
from app.services.hashing import sha256, analyze_avalanche, simulate_signature

router = APIRouter()


# ═══════════════════════════════════════════════════════════════════════════
#  Request / Response Schemas
# ═══════════════════════════════════════════════════════════════════════════

class CaesarRequest(BaseModel):
    text: str = Field(..., max_length=10000)
    key: int = Field(..., ge=0, le=25)

class VigenereRequest(BaseModel):
    text: str = Field(..., max_length=10000)
    key: str = Field(..., min_length=1, max_length=100)

class AffineRequest(BaseModel):
    text: str = Field(..., max_length=10000)
    a: int
    b: int

class PlayfairRequest(BaseModel):
    text: str = Field(..., max_length=10000)
    key: str = Field(..., min_length=1, max_length=25)

class RailFenceRequest(BaseModel):
    text: str = Field(..., max_length=10000)
    rails: int = Field(..., ge=2, le=20)

class AtbashRequest(BaseModel):
    text: str = Field(..., max_length=10000)

class AesRoundRequest(BaseModel):
    plaintext: str = Field(..., max_length=16)
    key: str = Field(default="CRYPTOGRAPHY1234", max_length=16)

class ModesRequest(BaseModel):
    blocks: list[int]
    key: int = Field(default=0xAA, ge=0, le=255)
    iv: int = Field(default=0x55, ge=0, le=255)

class RsaKeysRequest(BaseModel):
    p: int = Field(..., gt=1)
    q: int = Field(..., gt=1)
    e: int | None = None

class RsaEncryptRequest(BaseModel):
    text: str = Field(..., max_length=500)
    e: int
    n: int

class RsaDecryptRequest(BaseModel):
    cipher_numbers: list[str]
    d: int
    n: int

class DhRequest(BaseModel):
    p: int
    g: int
    a: int
    b: int

class HashRequest(BaseModel):
    text: str = Field(..., max_length=100000)

class AvalancheRequest(BaseModel):
    text1: str = Field(..., max_length=100000)
    text2: str = Field(..., max_length=100000)

class SignatureRequest(BaseModel):
    document: str = Field(..., max_length=10000)
    p: int = 61
    q: int = 53
    e: int = 17

class TextResponse(BaseModel):
    result: str


# ═══════════════════════════════════════════════════════════════════════════
#  CLASSICAL CIPHER ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════

@router.post("/caesar/encrypt", response_model=TextResponse)
def api_caesar_encrypt(req: CaesarRequest):
    return {"result": caesar_encrypt(req.text, req.key)}

@router.post("/caesar/decrypt", response_model=TextResponse)
def api_caesar_decrypt(req: CaesarRequest):
    return {"result": caesar_decrypt(req.text, req.key)}

@router.post("/caesar/bruteforce")
def api_caesar_bruteforce(req: AtbashRequest):
    return caesar_brute_force(req.text)

@router.post("/vigenere/encrypt", response_model=TextResponse)
def api_vigenere_encrypt(req: VigenereRequest):
    return {"result": vigenere_encrypt(req.text, req.key)}

@router.post("/vigenere/decrypt", response_model=TextResponse)
def api_vigenere_decrypt(req: VigenereRequest):
    return {"result": vigenere_decrypt(req.text, req.key)}

@router.post("/affine/encrypt")
def api_affine_encrypt(req: AffineRequest):
    result = affine_encrypt(req.text, req.a, req.b)
    if result["error"]:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/affine/decrypt")
def api_affine_decrypt(req: AffineRequest):
    result = affine_decrypt(req.text, req.a, req.b)
    if result["error"]:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/playfair/encrypt")
def api_playfair_encrypt(req: PlayfairRequest):
    return playfair_encrypt(req.text, req.key)

@router.post("/railfence/encrypt")
def api_railfence_encrypt(req: RailFenceRequest):
    return railfence_encrypt(req.text, req.rails)

@router.post("/railfence/decrypt", response_model=TextResponse)
def api_railfence_decrypt(req: RailFenceRequest):
    return {"result": railfence_decrypt(req.text, req.rails)}

@router.post("/atbash", response_model=TextResponse)
def api_atbash(req: AtbashRequest):
    return {"result": atbash(req.text)}


# ═══════════════════════════════════════════════════════════════════════════
#  SYMMETRIC / AES ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════

@router.post("/aes/round")
def api_aes_round(req: AesRoundRequest):
    """Simulate one full AES round and return every intermediate state grid."""
    return simulate_aes_round(req.plaintext, req.key)

@router.post("/modes/simulate")
def api_modes_simulate(req: ModesRequest):
    """Compare ECB vs CBC mode on a sequence of blocks."""
    return simulate_modes(req.blocks, req.key, req.iv)


# ═══════════════════════════════════════════════════════════════════════════
#  ASYMMETRIC / RSA / DH ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════

@router.post("/rsa/keys")
def api_rsa_keys(req: RsaKeysRequest):
    """Generate RSA key pair from two primes."""
    if not is_prime(req.p) or not is_prime(req.q):
        raise HTTPException(status_code=400, detail="Both p and q must be prime numbers.")
    return rsa_generate_keys(req.p, req.q, req.e)

@router.post("/rsa/encrypt")
def api_rsa_encrypt(req: RsaEncryptRequest):
    result = rsa_encrypt_text(req.text, req.e, req.n)
    if result["error"]:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/rsa/decrypt")
def api_rsa_decrypt(req: RsaDecryptRequest):
    result = rsa_decrypt_text(req.cipher_numbers, req.d, req.n)
    if result["error"]:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@router.post("/dh/simulate")
def api_dh_simulate(req: DhRequest):
    """Simulate a complete Diffie-Hellman key exchange."""
    return simulate_diffie_hellman(req.p, req.g, req.a, req.b)


# ═══════════════════════════════════════════════════════════════════════════
#  HASHING & DIGITAL SIGNATURE ENDPOINTS
# ═══════════════════════════════════════════════════════════════════════════

@router.post("/hash/sha256", response_model=TextResponse)
def api_sha256(req: HashRequest):
    return {"result": sha256(req.text)}

@router.post("/hash/avalanche")
def api_avalanche(req: AvalancheRequest):
    """Analyse the avalanche effect between two inputs."""
    return analyze_avalanche(req.text1, req.text2)

@router.post("/signature/simulate")
def api_signature(req: SignatureRequest):
    """Simulate an RSA-based digital signature workflow."""
    return simulate_signature(req.document, req.p, req.q, req.e)
