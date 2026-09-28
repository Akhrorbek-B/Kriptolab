"""
Asymmetric Cryptography Service Engine
========================================
Educational implementations for Module 3 of the KriptoLab curriculum:
  - RSA key generation, encryption, decryption (small-number demonstration)
  - Diffie-Hellman key exchange simulation
  - Modular arithmetic primitives (modPow, extendedGcd, modInverse)
"""

from __future__ import annotations
from math import gcd as math_gcd


# ---------------------------------------------------------------------------
#  Modular Arithmetic Primitives
# ---------------------------------------------------------------------------

def mod_pow(base: int, exp: int, mod: int) -> int:
    """Fast modular exponentiation: (base^exp) mod mod."""
    if mod == 1:
        return 0
    result = 1
    base = base % mod
    while exp > 0:
        if exp & 1:
            result = (result * base) % mod
        exp >>= 1
        base = (base * base) % mod
    return result


def extended_gcd(a: int, b: int) -> tuple[int, int, int]:
    """
    Extended Euclidean Algorithm.
    Returns (gcd, x, y) such that a·x + b·y = gcd(a, b).
    """
    old_r, r = a, b
    old_s, s = 1, 0
    old_t, t = 0, 1
    while r != 0:
        q = old_r // r
        old_r, r = r, old_r - q * r
        old_s, s = s, old_s - q * s
        old_t, t = t, old_t - q * t
    return old_r, old_s, old_t


def mod_inverse(a: int, m: int) -> int | None:
    """Compute the modular multiplicative inverse of *a* mod *m*, or None if it doesn't exist."""
    g, x, _ = extended_gcd(a % m, m)
    if g != 1:
        return None
    return x % m


def is_prime(n: int) -> bool:
    """Simple primality test (sufficient for educational small primes)."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True


# ---------------------------------------------------------------------------
#  RSA
# ---------------------------------------------------------------------------

def rsa_generate_keys(p: int, q: int, e_input: int | None = None) -> dict:
    """
    Generate RSA key pair from two primes *p* and *q*.
    Returns n, phi, e, d and validation state.
    """
    n = p * q
    phi = (p - 1) * (q - 1)

    # Select a valid public exponent e
    e = e_input if e_input and 1 < e_input < phi and math_gcd(e_input, phi) == 1 else None
    if e is None:
        for candidate in [65537, 257, 17, 7, 5, 3]:
            if candidate < phi and math_gcd(candidate, phi) == 1:
                e = candidate
                break
        if e is None:
            for candidate in range(3, phi, 2):
                if math_gcd(candidate, phi) == 1:
                    e = candidate
                    break

    d = mod_inverse(e, phi)

    return {
        "p": p,
        "q": q,
        "n": n,
        "phi": phi,
        "e": e,
        "d": d,
        "isValid": d is not None,
    }


def rsa_encrypt_text(text: str, e: int, n: int) -> dict:
    """
    Encrypt each character of *text* as an independent RSA block.
    Returns a list of encrypted integer strings, or an error.
    """
    encrypted: list[str] = []
    for ch in text:
        code = ord(ch)
        if code >= n:
            return {
                "result": [],
                "error": f"Character code ({code}) >= modulus n ({n}). Use larger primes.",
            }
        encrypted.append(str(mod_pow(code, e, n)))
    return {"result": encrypted, "error": None}


def rsa_decrypt_text(cipher_numbers: list[str], d: int, n: int) -> dict:
    """Decrypt a list of RSA-encrypted integer strings back to plaintext."""
    try:
        plain = "".join(chr(mod_pow(int(c), d, n)) for c in cipher_numbers)
        return {"result": plain, "error": None}
    except Exception as exc:
        return {"result": "", "error": str(exc)}


# ---------------------------------------------------------------------------
#  Diffie-Hellman Key Exchange
# ---------------------------------------------------------------------------

def simulate_diffie_hellman(p: int, g: int, a: int, b: int) -> dict:
    """
    Simulate a Diffie-Hellman key exchange between Alice (private *a*)
    and Bob (private *b*) using prime *p* and generator *g*.
    """
    A = mod_pow(g, a, p)   # Alice's public value
    B = mod_pow(g, b, p)   # Bob's public value
    shared_alice = mod_pow(B, a, p)
    shared_bob = mod_pow(A, b, p)

    return {
        "p": p,
        "g": g,
        "alicePrivate": a,
        "alicePublic": A,
        "bobPrivate": b,
        "bobPublic": B,
        "sharedSecret": shared_alice,
        "isMatching": shared_alice == shared_bob,
    }
