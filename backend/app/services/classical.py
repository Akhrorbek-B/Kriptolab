"""
Classical Cipher Service Engine
================================
Implements the full suite of historical / classical ciphers used in
Module 1 of the KriptoLab curriculum:
  - Caesar (shift cipher)
  - Vigenère (polyalphabetic substitution)
  - Affine  (E(x) = (a·x + b) mod 26)
  - Playfair (bigram substitution on a 5×5 matrix)
  - Rail Fence (zigzag transposition)
  - Atbash (mirror alphabet)

All functions operate on ASCII A-Z / a-z and preserve non-alpha characters.
"""

from __future__ import annotations
from math import gcd
from typing import Optional


# ---------------------------------------------------------------------------
#  Caesar Cipher
# ---------------------------------------------------------------------------

def caesar_encrypt(text: str, shift: int) -> str:
    """Encrypt *text* by shifting each letter by *shift* positions (mod 26)."""
    s = shift % 26
    out: list[str] = []
    for ch in text:
        if ch.isalpha():
            base = 65 if ch.isupper() else 97
            out.append(chr((ord(ch) - base + s) % 26 + base))
        else:
            out.append(ch)
    return "".join(out)


def caesar_decrypt(text: str, shift: int) -> str:
    """Decrypt by reversing the Caesar shift."""
    return caesar_encrypt(text, -shift)


def caesar_brute_force(text: str) -> list[dict]:
    """Return all 26 possible decryptions for brute-force analysis."""
    return [{"shift": k, "text": caesar_decrypt(text, k)} for k in range(26)]


# ---------------------------------------------------------------------------
#  Vigenère Cipher
# ---------------------------------------------------------------------------

def vigenere_encrypt(text: str, key: str) -> str:
    """Polyalphabetic substitution using a repeating keyword."""
    clean_key = "".join(ch for ch in key.upper() if ch.isalpha())
    if not clean_key:
        return text
    result: list[str] = []
    ki = 0
    for ch in text:
        if ch.isalpha():
            base = 65 if ch.isupper() else 97
            shift = ord(clean_key[ki % len(clean_key)]) - 65
            result.append(chr((ord(ch) - base + shift) % 26 + base))
            ki += 1
        else:
            result.append(ch)
    return "".join(result)


def vigenere_decrypt(text: str, key: str) -> str:
    """Decrypt by inverting the Vigenère shift for each position."""
    clean_key = "".join(ch for ch in key.upper() if ch.isalpha())
    if not clean_key:
        return text
    result: list[str] = []
    ki = 0
    for ch in text:
        if ch.isalpha():
            base = 65 if ch.isupper() else 97
            shift = ord(clean_key[ki % len(clean_key)]) - 65
            result.append(chr((ord(ch) - base - shift + 26) % 26 + base))
            ki += 1
        else:
            result.append(ch)
    return "".join(result)


# ---------------------------------------------------------------------------
#  Affine Cipher   E(x) = (a·x + b) mod 26
# ---------------------------------------------------------------------------

def _mod_inverse(a: int, m: int = 26) -> Optional[int]:
    """Compute modular multiplicative inverse of *a* mod *m* (brute-force for small m)."""
    a = a % m
    for x in range(1, m):
        if (a * x) % m == 1:
            return x
    return None


def affine_encrypt(text: str, a: int, b: int) -> dict:
    """
    Encrypt using the affine cipher.
    Returns ``{"result": str, "error": str | None}``.
    """
    if gcd(a, 26) != 1:
        return {"result": "", "error": f"gcd({a}, 26) != 1 — 'a' must be coprime with 26."}
    out: list[str] = []
    for ch in text:
        if ch.isalpha():
            base = 65 if ch.isupper() else 97
            x = ord(ch) - base
            out.append(chr((a * x + b) % 26 + base))
        else:
            out.append(ch)
    return {"result": "".join(out), "error": None}


def affine_decrypt(text: str, a: int, b: int) -> dict:
    """
    Decrypt using the affine cipher.
    Returns ``{"result": str, "error": str | None}``.
    """
    a_inv = _mod_inverse(a, 26)
    if a_inv is None:
        return {"result": "", "error": f"Modular inverse of a={a} does not exist mod 26."}
    out: list[str] = []
    for ch in text:
        if ch.isalpha():
            base = 65 if ch.isupper() else 97
            y = ord(ch) - base
            out.append(chr((a_inv * (y - b)) % 26 + base))
        else:
            out.append(ch)
    return {"result": "".join(out), "error": None}


# ---------------------------------------------------------------------------
#  Playfair Cipher
# ---------------------------------------------------------------------------

def _playfair_matrix(key: str) -> list[list[str]]:
    """Build the 5×5 Playfair key matrix (J merged with I)."""
    seen: set[str] = set()
    seq: list[str] = []
    for ch in (key.upper() + "ABCDEFGHIKLMNOPQRSTUVWXYZ"):
        c = ch if ch != "J" else "I"
        if c.isalpha() and c not in seen:
            seen.add(c)
            seq.append(c)
    return [seq[i * 5:(i + 1) * 5] for i in range(5)]


def _find_pos(matrix: list[list[str]], ch: str) -> tuple[int, int]:
    for r in range(5):
        for c in range(5):
            if matrix[r][c] == ch:
                return r, c
    return 0, 0


def playfair_encrypt(text: str, key: str) -> dict:
    """
    Encrypt using Playfair bigram substitution.
    Returns the key matrix, prepared pairs, and resulting ciphertext.
    """
    matrix = _playfair_matrix(key)
    # Prepare digrams
    clean = text.upper().replace("J", "I")
    clean = "".join(ch for ch in clean if ch.isalpha())
    pairs: list[str] = []
    i = 0
    while i < len(clean):
        a = clean[i]
        b = clean[i + 1] if i + 1 < len(clean) else "X"
        if a == b:
            b = "X"
        else:
            i += 1
        pairs.append(a + b)
        i += 1

    cipher_pairs: list[str] = []
    for pair in pairs:
        r1, c1 = _find_pos(matrix, pair[0])
        r2, c2 = _find_pos(matrix, pair[1])
        if r1 == r2:
            cipher_pairs.append(matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5])
        elif c1 == c2:
            cipher_pairs.append(matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2])
        else:
            cipher_pairs.append(matrix[r1][c2] + matrix[r2][c1])

    return {
        "matrix": matrix,
        "pairs": pairs,
        "ciphertext": " ".join(cipher_pairs),
    }


# ---------------------------------------------------------------------------
#  Rail Fence (Zigzag Transposition)
# ---------------------------------------------------------------------------

def railfence_encrypt(text: str, rails: int) -> dict:
    """Encrypt using Rail Fence transposition; returns ciphertext + fence grid."""
    if rails <= 1 or not text:
        return {"ciphertext": text, "fence": [[ch] for ch in text]}
    fence: list[list[str]] = [[] for _ in range(rails)]
    rail, direction = 0, 1
    for ch in text:
        fence[rail].append(ch)
        rail += direction
        if rail == rails - 1 or rail == 0:
            direction = -direction
    ct = "".join("".join(row) for row in fence)
    return {"ciphertext": ct, "fence": fence}


def railfence_decrypt(ciphertext: str, rails: int) -> str:
    """Decrypt a Rail Fence ciphertext given the number of rails."""
    if rails <= 1 or not ciphertext:
        return ciphertext
    n = len(ciphertext)
    # Determine the length of each rail
    pattern = [0] * rails
    rail, direction = 0, 1
    for _ in range(n):
        pattern[rail] += 1
        rail += direction
        if rail == rails - 1 or rail == 0:
            direction = -direction
    # Split ciphertext into rails
    idx = 0
    rail_chars: list[list[str]] = []
    for length in pattern:
        rail_chars.append(list(ciphertext[idx:idx + length]))
        idx += length
    # Read back in zigzag order
    pointers = [0] * rails
    result: list[str] = []
    rail, direction = 0, 1
    for _ in range(n):
        result.append(rail_chars[rail][pointers[rail]])
        pointers[rail] += 1
        rail += direction
        if rail == rails - 1 or rail == 0:
            direction = -direction
    return "".join(result)


# ---------------------------------------------------------------------------
#  Atbash Cipher (mirror substitution)
# ---------------------------------------------------------------------------

def atbash(text: str) -> str:
    """Mirror the alphabet: A↔Z, B↔Y, etc."""
    out: list[str] = []
    for ch in text:
        if ch.isalpha():
            base = 65 if ch.isupper() else 97
            out.append(chr(base + 25 - (ord(ch) - base)))
        else:
            out.append(ch)
    return "".join(out)
