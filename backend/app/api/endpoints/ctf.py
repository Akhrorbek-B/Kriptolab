"""
CTF Challenge API Endpoints
==============================
Provides:
  - GET  /challenges          → list all challenges (flags stripped)
  - GET  /challenges/tier/{n} → filter by tier
  - POST /validate            → server-side flag validation
"""

from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.services.ctf_data import get_all_challenges, get_challenges_by_tier, validate_flag

router = APIRouter()


class FlagSubmission(BaseModel):
    challenge_id: int
    flag: str = Field(..., min_length=1, max_length=200)


class FlagResponse(BaseModel):
    valid: bool
    message: str
    points: int


@router.get("/challenges")
def list_challenges():
    """Return all 60 CTF challenges (flags are never sent to the client)."""
    return get_all_challenges()


@router.get("/challenges/tier/{tier}")
def list_challenges_by_tier(tier: int):
    """Return challenges filtered by tier (1 or 2)."""
    if tier not in (1, 2):
        return {"error": "Tier must be 1 or 2."}
    return get_challenges_by_tier(tier)


@router.post("/validate", response_model=FlagResponse)
def submit_flag(submission: FlagSubmission):
    """
    Validate a submitted flag.
    The flag is checked server-side — the correct answer is never
    exposed to the frontend.
    """
    return validate_flag(submission.challenge_id, submission.flag)
