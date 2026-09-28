"""
Symmetric Cryptography Service Engine
=======================================
Educational implementations for Module 2 of the KriptoLab curriculum:
  - AES single-round step-by-step visualisation (SubBytes → ShiftRows → MixColumns → AddRoundKey)
  - Block cipher mode simulation (ECB vs CBC) with visual pattern analysis

NOTE: These are *pedagogical* implementations intended to show step-by-step
transformations. For production cryptography use the `cryptography` library.
"""

from __future__ import annotations

# ── AES S-Box (FIPS 197, §5.1.1) ──────────────────────────────────────────
S_BOX: list[int] = [
    0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76,
    0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0,
    0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
    0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75,
    0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84,
    0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
    0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8,
    0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2,
    0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
    0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB,
    0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79,
    0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
    0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A,
    0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E,
    0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
    0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16,
]

# Type alias for a 4×4 byte matrix (AES State)
State = list[list[int]]


def _to_hex(val: int) -> str:
    return f"{val & 0xFF:02X}"


def text_to_state(text: str) -> State:
    """Convert the first 16 bytes of *text* into a 4×4 AES state matrix (column-major)."""
    raw = [ord(text[i]) if i < len(text) else 0x00 for i in range(16)]
    state: State = [[0] * 4 for _ in range(4)]
    for col in range(4):
        for row in range(4):
            state[row][col] = raw[col * 4 + row]
    return state


def _state_to_hex_grid(state: State) -> list[list[str]]:
    return [[_to_hex(state[r][c]) for c in range(4)] for r in range(4)]


# ── AES Round Steps ───────────────────────────────────────────────────────

def sub_bytes(state: State) -> State:
    """Apply the AES S-Box substitution to every byte in the state."""
    return [[S_BOX[state[r][c]] for c in range(4)] for r in range(4)]


def shift_rows(state: State) -> State:
    """Cyclically shift row *i* left by *i* positions."""
    return [
        [state[0][0], state[0][1], state[0][2], state[0][3]],
        [state[1][1], state[1][2], state[1][3], state[1][0]],
        [state[2][2], state[2][3], state[2][0], state[2][1]],
        [state[3][3], state[3][0], state[3][1], state[3][2]],
    ]


def _xtime(b: int) -> int:
    """Multiply by x (i.e. by 2) in GF(2^8)."""
    return ((b << 1) ^ (0x1B if b & 0x80 else 0)) & 0xFF


def _gf_mul(a: int, b: int) -> int:
    """Multiply two bytes in GF(2^8) for the MixColumns coefficients {1, 2, 3}."""
    if b == 1:
        return a
    if b == 2:
        return _xtime(a)
    if b == 3:
        return _xtime(a) ^ a
    return 0


def mix_columns(state: State) -> State:
    """Apply the MixColumns transformation (fixed polynomial multiplication in GF(2^8))."""
    out: State = [[0] * 4 for _ in range(4)]
    for c in range(4):
        s = [state[r][c] for r in range(4)]
        out[0][c] = _gf_mul(s[0], 2) ^ _gf_mul(s[1], 3) ^ s[2] ^ s[3]
        out[1][c] = s[0] ^ _gf_mul(s[1], 2) ^ _gf_mul(s[2], 3) ^ s[3]
        out[2][c] = s[0] ^ s[1] ^ _gf_mul(s[2], 2) ^ _gf_mul(s[3], 3)
        out[3][c] = _gf_mul(s[0], 3) ^ s[1] ^ s[2] ^ _gf_mul(s[3], 2)
    return out


def add_round_key(state: State, key_state: State) -> State:
    """XOR the state with the round key."""
    return [[(state[r][c] ^ key_state[r][c]) & 0xFF for c in range(4)] for r in range(4)]


def simulate_aes_round(plaintext: str, key_text: str = "CRYPTOGRAPHY1234") -> dict:
    """
    Run one full AES round (SubBytes → ShiftRows → MixColumns → AddRoundKey)
    and return hex grids for every intermediate step — perfect for the
    frontend step-by-step visualiser.
    """
    initial = text_to_state(plaintext)
    round_key = text_to_state(key_text)

    after_sub = sub_bytes(initial)
    after_shift = shift_rows(after_sub)
    after_mix = mix_columns(after_shift)
    after_ark = add_round_key(after_mix, round_key)

    return {
        "initial":          _state_to_hex_grid(initial),
        "roundKey":         _state_to_hex_grid(round_key),
        "afterSubBytes":    _state_to_hex_grid(after_sub),
        "afterShiftRows":   _state_to_hex_grid(after_shift),
        "afterMixColumns":  _state_to_hex_grid(after_mix),
        "afterAddRoundKey": _state_to_hex_grid(after_ark),
    }


# ── ECB vs CBC Mode Simulation ────────────────────────────────────────────

def simulate_modes(blocks: list[int], key: int = 0xAA, iv: int = 0x55) -> dict:
    """
    Demonstrate the critical difference between ECB and CBC modes by
    encrypting a sequence of 8-bit blocks with a simple XOR cipher.
    Identical plaintext blocks produce identical ECB ciphertext blocks
    but different CBC ciphertext blocks thanks to chaining.
    """
    ecb = [(p ^ key) & 0xFF for p in blocks]

    cbc: list[int] = []
    prev = iv
    for p in blocks:
        c = ((p ^ prev) ^ key) & 0xFF
        cbc.append(c)
        prev = c

    return {"ecb": ecb, "cbc": cbc}
