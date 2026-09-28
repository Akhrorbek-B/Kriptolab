"""
Hashing & Digital Signature Service Engine
============================================
Educational implementations for Modules 4–5 of the KriptoLab curriculum:
  - SHA-256 (pure-Python, no dependencies)
  - Avalanche effect analysis (bit-level diff of two hashes)
  - Simple digital signature simulation using RSA
  - HMAC construction demo
"""

from __future__ import annotations


# ---------------------------------------------------------------------------
#  SHA-256 — Pure-Python Implementation (FIPS 180-4)
# ---------------------------------------------------------------------------

# Initial hash values: first 32 bits of fractional parts of square roots of first 8 primes
_H0 = [
    0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
    0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19,
]

# Round constants: first 32 bits of fractional parts of cube roots of first 64 primes
_K = [
    0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
    0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
    0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
    0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
    0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
    0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
    0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
    0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2,
]

_MASK32 = 0xFFFFFFFF


def _rotr(x: int, n: int) -> int:
    return ((x >> n) | (x << (32 - n))) & _MASK32


def sha256(message: str) -> str:
    """Compute the SHA-256 digest of the ASCII *message* and return the hex string."""
    data = message.encode("utf-8")
    # Pre-processing: padding
    bit_len = len(data) * 8
    data += b"\x80"
    while (len(data) * 8) % 512 != 448:
        data += b"\x00"
    data += bit_len.to_bytes(8, "big")

    # Process each 512-bit (64-byte) block
    h = list(_H0)
    for blk_start in range(0, len(data), 64):
        block = data[blk_start:blk_start + 64]
        w = [int.from_bytes(block[i:i + 4], "big") for i in range(0, 64, 4)]
        # Extend to 64 words
        for i in range(16, 64):
            s0 = _rotr(w[i - 15], 7) ^ _rotr(w[i - 15], 18) ^ (w[i - 15] >> 3)
            s1 = _rotr(w[i - 2], 17) ^ _rotr(w[i - 2], 19) ^ (w[i - 2] >> 10)
            w.append((w[i - 16] + s0 + w[i - 7] + s1) & _MASK32)
        # Compression
        a, b, c, d, e, f, g, hh = h
        for i in range(64):
            S1 = _rotr(e, 6) ^ _rotr(e, 11) ^ _rotr(e, 25)
            ch = (e & f) ^ (~e & g)
            temp1 = (hh + S1 + ch + _K[i] + w[i]) & _MASK32
            S0 = _rotr(a, 2) ^ _rotr(a, 13) ^ _rotr(a, 22)
            maj = (a & b) ^ (a & c) ^ (b & c)
            temp2 = (S0 + maj) & _MASK32
            hh, g, f, e, d, c, b, a = (
                g, f, e, (d + temp1) & _MASK32, c, b, a, (temp1 + temp2) & _MASK32,
            )
        h = [(x + y) & _MASK32 for x, y in zip(h, [a, b, c, d, e, f, g, hh])]

    return "".join(f"{v:08x}" for v in h)


# ---------------------------------------------------------------------------
#  Avalanche Effect Analysis
# ---------------------------------------------------------------------------

def _hex_to_bin(hex_str: str) -> str:
    return "".join(f"{int(ch, 16):04b}" for ch in hex_str)


def analyze_avalanche(text1: str, text2: str) -> dict:
    """
    Hash both texts with SHA-256 and compare the binary representations
    bit-by-bit to quantify the avalanche effect.
    """
    h1 = sha256(text1)
    h2 = sha256(text2)
    b1 = _hex_to_bin(h1)
    b2 = _hex_to_bin(h2)

    flipped = sum(1 for a, b in zip(b1, b2) if a != b)
    total = 256
    pct = round(flipped / total * 100, 1)

    return {
        "hash1": h1,
        "hash2": h2,
        "bin1": b1,
        "bin2": b2,
        "flippedCount": flipped,
        "totalBits": total,
        "changePercentage": pct,
    }


# ---------------------------------------------------------------------------
#  Digital Signature Simulation (RSA-based)
# ---------------------------------------------------------------------------

def _simple_hash(text: str) -> int:
    """A tiny deterministic hash mapping text to a small integer (for demo purposes)."""
    h = 0
    for ch in text:
        h = (h * 31 + ord(ch)) % 1000 + 1
    return h


def _big_pow(base: int, exp: int, mod: int) -> int:
    result = 1
    base = base % mod
    while exp > 0:
        if exp & 1:
            result = result * base % mod
        exp >>= 1
        base = base * base % mod
    return result


def simulate_signature(document: str, p: int = 61, q: int = 53, e: int = 17) -> dict:
    """
    Demonstrate the RSA digital signature workflow:
    1. Hash the document → h
    2. Sign: S = h^d mod n  (using the private key)
    3. Verify: h' = S^e mod n (using the public key)
    4. Valid iff h == h'
    """
    n = p * q                    # 3233
    phi = (p - 1) * (q - 1)     # 3120
    # d such that d·e ≡ 1 (mod phi)
    d = 2753  # pre-computed for e=17, phi=3120

    h = _simple_hash(document)
    signature = _big_pow(h, d, n)
    verified_hash = _big_pow(signature, e, n)

    return {
        "documentText": document,
        "hash": h,
        "signature": signature,
        "verifiedHash": verified_hash,
        "isValid": h == verified_hash,
        "publicKey": {"e": e, "n": n},
        "privateKey": {"d": d, "n": n},
    }
