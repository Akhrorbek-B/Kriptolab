"""
CTF Challenge Data Store
==========================
60 challenges across two tiers following the KriptoLab curriculum:
  - Tier 1 (1-30): Paper/Manual — solvable with pen, paper, and reasoning
  - Tier 2 (31-60): Computer/Script — requires Python scripts, CyberChef, or CLI tools

Flag format: UZINFOSEC{...}
Each challenge has: id, tier, category, title, description, points, hint, flag
"""

from __future__ import annotations


CTF_CHALLENGES: list[dict] = [
    # ══════════════════════════════════════════════════════════════════════
    #  TIER 1 — Paper / Manual Challenges  (1–30)
    # ══════════════════════════════════════════════════════════════════════

    # ── Classical Ciphers (1–10) ──────────────────────────────────────────
    {
        "id": 1, "tier": 1, "category": "Caesar", "points": 10,
        "title": "Rimlik Sarkardaning Xabari",
        "description": "Intercepted message: 'KHOOR ZRUOG'. The spy says shift is between 1-5. Decode it.",
        "hint": "Try k=3. Each letter shifts backward by 3.",
        "flag": "UZINFOSEC{HELLO_WORLD}",
    },
    {
        "id": 2, "tier": 1, "category": "Caesar", "points": 10,
        "title": "ROT13 Klassik",
        "description": "A forum post is encoded: 'PELCGBTENCUL VF SHA'. What does it say?",
        "hint": "ROT13 means k=13. Apply Caesar shift of 13.",
        "flag": "UZINFOSEC{CRYPTOGRAPHY_IS_FUN}",
    },
    {
        "id": 3, "tier": 1, "category": "Caesar", "points": 15,
        "title": "Brute Force Mashqi",
        "description": "Ciphertext: 'GZWUJSLAGAFLK'. Try all 26 shifts and find the English word.",
        "hint": "Try shifts systematically from 0 to 25. The answer appears at k=8.",
        "flag": "UZINFOSEC{CYBERSECURITY}",
    },
    {
        "id": 4, "tier": 1, "category": "Affine", "points": 20,
        "title": "Affin Shifr Sinovi",
        "description": "E(x) = (5x + 8) mod 26. Encrypt the word 'HELLO'. What is the ciphertext?",
        "hint": "H=7: (5*7+8)%26=17=R, E=4: (5*4+8)%26=2=C, L=11: (5*11+8)%26=11=L, O=14: (5*14+8)%26=0=A",
        "flag": "UZINFOSEC{RCLLA}",
    },
    {
        "id": 5, "tier": 1, "category": "Affine", "points": 25,
        "title": "Teskari Muammo",
        "description": "Affine cipher with a=7, b=3. Ciphertext: 'CZOL'. Find the plaintext. Remember: D(y)=a_inv*(y-b) mod 26, a_inv of 7 mod 26 = 15.",
        "hint": "C=2: 15*(2-3) mod 26 = 15*(-1) mod 26 = 15*25 mod 26 = 375 mod 26 = 11 = L. Continue for each letter.",
        "flag": "UZINFOSEC{LAZY}",
    },
    {
        "id": 6, "tier": 1, "category": "Vigenere", "points": 20,
        "title": "Polialfavit Qutqaruv",
        "description": "Vigenère ciphertext: 'RIJVS UYVJN'. The keyword is 'KEY'. Decrypt the message.",
        "hint": "Vigenère decryption: subtract key letter values from ciphertext letter values (mod 26).",
        "flag": "UZINFOSEC{HELLO_WORLD}",
    },
    {
        "id": 7, "tier": 1, "category": "Vigenere", "points": 25,
        "title": "Kasiski Topshirig'i",
        "description": "Ciphertext with repeating patterns at positions 0 and 12. What is the most likely key length?",
        "hint": "GCD(12, 0) = 12. Common factors: 2, 3, 4, 6, 12. Most likely key length: 4 or 6.",
        "flag": "UZINFOSEC{KEY_LENGTH_4}",
    },
    {
        "id": 8, "tier": 1, "category": "Playfair", "points": 25,
        "title": "Playfair Matritsasi",
        "description": "Key: 'MONARCHY'. Build the 5x5 matrix and encrypt 'HE'. Note: J is merged with I.",
        "hint": "Matrix row 1: M O N A R. Row 2: C H Y B D. H is at (1,1), E is at (2,4) in 0-indexed. Rectangle rule applies.",
        "flag": "UZINFOSEC{BP}",
    },
    {
        "id": 9, "tier": 1, "category": "Rail Fence", "points": 15,
        "title": "Temir Yo'l Shifri",
        "description": "Encrypt 'HELLOWORLD' with 3 rails. Write the zigzag and read off each rail.",
        "hint": "Rail 0: H...O...L. Rail 1: E.L.W.R.D. Rail 2: L...O... => HOLELWRDLO",
        "flag": "UZINFOSEC{HOLELWRDLO}",
    },
    {
        "id": 10, "tier": 1, "category": "Atbash", "points": 10,
        "title": "Oyna Alfaviti",
        "description": "Atbash cipher maps A↔Z, B↔Y, etc. Decode: 'KIBKGLOZV'",
        "hint": "K→P, I→R, B→Y, K→P, G→T, L→O, O→L, Z→A, V→E",
        "flag": "UZINFOSEC{KRYPTOLAB}",
    },

    # ── Symmetric / AES Concepts (11–16) ──────────────────────────────────
    {
        "id": 11, "tier": 1, "category": "AES", "points": 15,
        "title": "S-Box Izlash",
        "description": "In the AES S-Box, what is the substitution for input byte 0x53? (answer in hex, uppercase)",
        "hint": "S-Box row 5, column 3. Look up the standard AES S-Box table.",
        "flag": "UZINFOSEC{ED}",
    },
    {
        "id": 12, "tier": 1, "category": "AES", "points": 20,
        "title": "ShiftRows Amali",
        "description": "Given AES state matrix row 2: [A, B, C, D]. After ShiftRows, what is the result? (row 2 shifts left by 2)",
        "hint": "Row i shifts left by i positions. Row 2 shifts by 2: [C, D, A, B].",
        "flag": "UZINFOSEC{C_D_A_B}",
    },
    {
        "id": 13, "tier": 1, "category": "AES", "points": 15,
        "title": "AES Raundlar Soni",
        "description": "AES-256 uses how many rounds? And what is the block size in bits?",
        "hint": "AES-128=10 rounds, AES-192=12, AES-256=14. Block is always 128 bits.",
        "flag": "UZINFOSEC{14_ROUNDS_128_BITS}",
    },
    {
        "id": 14, "tier": 1, "category": "Block Modes", "points": 20,
        "title": "ECB Xavfi — Tux Penguin",
        "description": "Why does encrypting the Linux Tux penguin image with ECB mode reveal the penguin's silhouette in the ciphertext?",
        "hint": "Identical plaintext blocks produce identical ciphertext blocks in ECB mode.",
        "flag": "UZINFOSEC{IDENTICAL_BLOCKS_IDENTICAL_OUTPUT}",
    },
    {
        "id": 15, "tier": 1, "category": "Block Modes", "points": 15,
        "title": "CBC Zanjiri",
        "description": "In CBC mode, the first block is XORed with what before encryption?",
        "hint": "CBC uses an Initialization Vector (IV) for the first block.",
        "flag": "UZINFOSEC{INITIALIZATION_VECTOR}",
    },
    {
        "id": 16, "tier": 1, "category": "DES", "points": 20,
        "title": "DES Kalit Tahlili",
        "description": "DES key is 64 bits but only 56 are effective. Why?",
        "hint": "Every 8th bit is a parity check bit, not used in encryption.",
        "flag": "UZINFOSEC{8_PARITY_BITS}",
    },

    # ── Asymmetric / RSA (17–22) ──────────────────────────────────────────
    {
        "id": 17, "tier": 1, "category": "RSA", "points": 25,
        "title": "RSA Kalit Generatsiyasi",
        "description": "p=7, q=11. Compute n, phi(n), and find a valid e.",
        "hint": "n=77, phi=60. e must satisfy gcd(e,60)=1 and 1<e<60. Try e=7 or e=13.",
        "flag": "UZINFOSEC{N77_PHI60_E7}",
    },
    {
        "id": 18, "tier": 1, "category": "RSA", "points": 30,
        "title": "RSA Shifrlash",
        "description": "RSA: n=55, e=3. Encrypt m=7. What is c = m^e mod n?",
        "hint": "c = 7^3 mod 55 = 343 mod 55 = 343 - 6*55 = 343 - 330 = 13.",
        "flag": "UZINFOSEC{13}",
    },
    {
        "id": 19, "tier": 1, "category": "RSA", "points": 35,
        "title": "RSA Deshifrlash",
        "description": "n=55, e=3, phi=40. Find d, then decrypt c=13. Hint: d*3 ≡ 1 (mod 40).",
        "hint": "d=27 (27*3=81, 81 mod 40=1). m = 13^27 mod 55 = 7.",
        "flag": "UZINFOSEC{M_EQUALS_7}",
    },
    {
        "id": 20, "tier": 1, "category": "Diffie-Hellman", "points": 25,
        "title": "DH Umumiy Kalit",
        "description": "p=23, g=5. Alice: a=6, Bob: b=15. Compute Alice's public A = g^a mod p.",
        "hint": "A = 5^6 mod 23. 5^2=25 mod 23=2, 5^4=4, 5^6=5^4*5^2=4*2=8.",
        "flag": "UZINFOSEC{A_EQUALS_8}",
    },
    {
        "id": 21, "tier": 1, "category": "Diffie-Hellman", "points": 30,
        "title": "DH Yakuniy Hisob",
        "description": "Continuing: p=23, g=5, a=6, b=15. Bob's public B=19. Compute shared secret K = B^a mod p.",
        "hint": "K = 19^6 mod 23. Use repeated squaring.",
        "flag": "UZINFOSEC{K_EQUALS_2}",
    },
    {
        "id": 22, "tier": 1, "category": "RSA", "points": 20,
        "title": "Eyler Funktsiyasi",
        "description": "Compute phi(100). Hint: 100 = 2^2 * 5^2.",
        "hint": "phi(100) = 100 * (1 - 1/2) * (1 - 1/5) = 100 * 1/2 * 4/5 = 40.",
        "flag": "UZINFOSEC{PHI_40}",
    },

    # ── Hashing & Digital Signatures (23–28) ──────────────────────────────
    {
        "id": 23, "tier": 1, "category": "Hash", "points": 15,
        "title": "Xesh Xususiyatlari",
        "description": "Name the three security properties of cryptographic hash functions (in English).",
        "hint": "Pre-image resistance, Second pre-image resistance, Collision resistance.",
        "flag": "UZINFOSEC{PREIMAGE_SECONDPREIMAGE_COLLISION}",
    },
    {
        "id": 24, "tier": 1, "category": "Hash", "points": 20,
        "title": "Ko'chki Effekti Foizi",
        "description": "If SHA-256 outputs differ in 130 out of 256 bits between 'hello' and 'hellp', what is the percentage?",
        "hint": "130/256 * 100 = 50.78%. Close to the ideal 50%.",
        "flag": "UZINFOSEC{50_PERCENT}",
    },
    {
        "id": 25, "tier": 1, "category": "Digital Signature", "points": 25,
        "title": "Raqamli Imzo Jarayoni",
        "description": "In RSA digital signatures, the signer uses which key to create the signature?",
        "hint": "The signer's PRIVATE key is used to sign. The verifier uses the PUBLIC key.",
        "flag": "UZINFOSEC{PRIVATE_KEY}",
    },
    {
        "id": 26, "tier": 1, "category": "Hash", "points": 20,
        "title": "Tug'ilgan Kun Hujumi",
        "description": "For a hash function with n-bit output, how many operations are needed on average for a birthday attack?",
        "hint": "Birthday paradox: approximately 2^(n/2) operations.",
        "flag": "UZINFOSEC{2_POWER_N_OVER_2}",
    },
    {
        "id": 27, "tier": 1, "category": "HMAC", "points": 25,
        "title": "HMAC Tuzilishi",
        "description": "HMAC is computed as H((K' XOR opad) || H((K' XOR ipad) || message)). What are the standard values for ipad and opad?",
        "hint": "ipad = 0x36 repeated, opad = 0x5C repeated.",
        "flag": "UZINFOSEC{IPAD_36_OPAD_5C}",
    },
    {
        "id": 28, "tier": 1, "category": "PKI", "points": 30,
        "title": "Sertifikat Zanjiri",
        "description": "In PKI, what entity signs digital certificates to establish trust?",
        "hint": "Certificate Authority (CA) signs certificates.",
        "flag": "UZINFOSEC{CERTIFICATE_AUTHORITY}",
    },

    # ── Frequency & Misc Theory (29–30) ───────────────────────────────────
    {
        "id": 29, "tier": 1, "category": "Frequency", "points": 15,
        "title": "Ingliz Tili Chastotasi",
        "description": "What is the most frequently occurring letter in the English language?",
        "hint": "ETAOINSHRDLU — the first letter is the most common.",
        "flag": "UZINFOSEC{LETTER_E}",
    },
    {
        "id": 30, "tier": 1, "category": "History", "points": 20,
        "title": "Kerkxoffs Tamoyili",
        "description": "Complete: 'The security of a cryptosystem should depend solely on the secrecy of the ___'.",
        "hint": "Not the algorithm, not the code, but the...",
        "flag": "UZINFOSEC{KEY}",
    },

    # ══════════════════════════════════════════════════════════════════════
    #  TIER 2 — Computer / Script-Based Challenges  (31–60)
    # ══════════════════════════════════════════════════════════════════════

    # ── Scripted Classical Attacks (31–36) ─────────────────────────────────
    {
        "id": 31, "tier": 2, "category": "Caesar Brute", "points": 30,
        "title": "Avtomatik Brute-Force",
        "description": "Write a Python script to brute-force: 'GUVF VF N FRPERG ZRFFNTR'. Find the shift and plaintext.",
        "hint": "Loop k=0..25, decrypt, check for English words. Or just try ROT13 first.",
        "flag": "UZINFOSEC{THIS_IS_A_SECRET_MESSAGE}",
    },
    {
        "id": 32, "tier": 2, "category": "Frequency", "points": 40,
        "title": "Chastotaviy Hujum Skripti",
        "description": "Monoalphabetic substitution ciphertext: 'GSVIV RH ML KOVXV ORPV SLNV'. Use frequency analysis. The most common letter in the ciphertext maps to E.",
        "hint": "This is actually an Atbash cipher. Try reversing the alphabet.",
        "flag": "UZINFOSEC{THERE_IS_NO_PLACE_LIKE_HOME}",
    },
    {
        "id": 33, "tier": 2, "category": "Vigenere", "points": 45,
        "title": "Vigenère Kasiski Hujumi",
        "description": "Use the Kasiski examination on this ciphertext to determine key length, then crack: 'LXFOPVEFRNHR'. Key is a 3-letter English word.",
        "hint": "Try common 3-letter keys: KEY, CAT, DOG, SPY. Use Python vigenere_decrypt() with each.",
        "flag": "UZINFOSEC{ATTACKATDAWN}",
    },
    {
        "id": 34, "tier": 2, "category": "Rail Fence", "points": 30,
        "title": "Rail Fence Dekoder",
        "description": "Write a script to decrypt this Rail Fence (3 rails): 'WECRLTEERDSOEEFEAOCAIVDEN'. The famous demo message.",
        "hint": "Google 'Rail Fence cipher decoder' or implement the zigzag read pattern.",
        "flag": "UZINFOSEC{WEAREDISCOVEREDFLEEATONCE}",
    },
    {
        "id": 35, "tier": 2, "category": "XOR", "points": 35,
        "title": "XOR Kalit Izlash",
        "description": "Hex ciphertext: '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'. Single-byte XOR key. Brute force all 256 keys.",
        "hint": "Decode hex to bytes, XOR each byte with key candidates 0-255. Score by English letter frequency. Key is 0x58 ('X').",
        "flag": "UZINFOSEC{COOKING_MCS_LIKE_A_POUND_OF_BACON}",
    },
    {
        "id": 36, "tier": 2, "category": "Base64", "points": 20,
        "title": "Base64 Zanjir",
        "description": "Decode this triple-encoded Base64: 'Vm0wd2QyUXlVWGw='. Hint: decode 3 times.",
        "hint": "Use Python: import base64; result = base64.b64decode(base64.b64decode(base64.b64decode(encoded)))",
        "flag": "UZINFOSEC{BASE64_MASTER}",
    },

    # ── Symmetric/AES Script Challenges (37–42) ──────────────────────────
    {
        "id": 37, "tier": 2, "category": "AES", "points": 50,
        "title": "AES-ECB Python Deshifrlash",
        "description": "Use Python's `cryptography` library to decrypt AES-128-ECB. Key (hex): '00112233445566778899aabbccddeeff'. Ciphertext (hex): '69c4e0d86a7b0430d8cdb78070b4c55a'. Find the plaintext.",
        "hint": "from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes; cipher = Cipher(algorithms.AES(key), modes.ECB())",
        "flag": "UZINFOSEC{AES_ECB_CRACKED}",
    },
    {
        "id": 38, "tier": 2, "category": "AES", "points": 45,
        "title": "ECB Naqsh Aniqlash",
        "description": "Given a ciphertext in hex where blocks repeat: 'aabbccdd aabbccdd eeff0011'. Which mode was used?",
        "hint": "Repeating ciphertext blocks = ECB mode. CBC would never repeat for same plaintext blocks.",
        "flag": "UZINFOSEC{ECB_DETECTED}",
    },
    {
        "id": 39, "tier": 2, "category": "AES", "points": 55,
        "title": "S-Box Lookup Skripti",
        "description": "Write a Python script that takes an AES state matrix and applies SubBytes using the S-Box. Input byte: 0x19. What is the output?",
        "hint": "S_BOX[0x19] = S_BOX[25] = 0xD4. Verify with the standard table.",
        "flag": "UZINFOSEC{SBOX_D4}",
    },
    {
        "id": 40, "tier": 2, "category": "DES", "points": 40,
        "title": "DES Zaif Kalit Topish",
        "description": "DES has 4 weak keys where E_K(E_K(P)) = P. One weak key is all zeros: 0x0000000000000000. Name another.",
        "hint": "The other weak keys are: 0xFFFFFFFFFFFFFFFF, 0xE0E0E0E0F1F1F1F1, 0x1F1F1F1F0E0E0E0E.",
        "flag": "UZINFOSEC{FFFFFFFFFFFFFFFF}",
    },
    {
        "id": 41, "tier": 2, "category": "Block Modes", "points": 50,
        "title": "CBC Bitflip Hujumi",
        "description": "In CBC decryption, flipping bit 5 of ciphertext block C_{i-1} will flip which bit of plaintext block P_i?",
        "hint": "In CBC decryption: P_i = D_K(C_i) XOR C_{i-1}. Flipping a bit in C_{i-1} flips the SAME bit position in P_i.",
        "flag": "UZINFOSEC{BIT_5_OF_P_I}",
    },
    {
        "id": 42, "tier": 2, "category": "Padding", "points": 35,
        "title": "PKCS7 Padding",
        "description": "A 10-byte message needs PKCS#7 padding for a 16-byte block. What are the 6 padding bytes?",
        "hint": "PKCS#7: pad with N bytes of value N. Need 6 more bytes, so pad with 0x06 repeated 6 times.",
        "flag": "UZINFOSEC{060606060606}",
    },

    # ── RSA Script Challenges (43–48) ────────────────────────────────────
    {
        "id": 43, "tier": 2, "category": "RSA", "points": 50,
        "title": "Zaif RSA Faktorizatsiya",
        "description": "n=3233, e=17. Factor n to find p and q, compute d, then decrypt c=2201.",
        "hint": "3233 = 53 * 61. phi = 52*60 = 3120. d = mod_inverse(17, 3120) = 2753. m = 2201^2753 mod 3233.",
        "flag": "UZINFOSEC{M_EQUALS_65}",
    },
    {
        "id": 44, "tier": 2, "category": "RSA", "points": 60,
        "title": "RSA Common Modulus Hujumi",
        "description": "Same message m encrypted with same n=3599 but two different e values: e1=5 (c1=3344), e2=7 (c2=687). Use the common modulus attack.",
        "hint": "Find s1,s2 such that e1*s1 + e2*s2 = 1 using Extended GCD. Then m = c1^s1 * c2^s2 mod n.",
        "flag": "UZINFOSEC{COMMON_MODULUS}",
    },
    {
        "id": 45, "tier": 2, "category": "RSA", "points": 55,
        "title": "Wiener Hujumi Simulyatsiyasi",
        "description": "RSA with very small d is vulnerable to Wiener's attack using continued fractions. Given n=90581, e=17993. Find d.",
        "hint": "Compute continued fraction expansion of e/n. Convergents give candidate d values. d=5.",
        "flag": "UZINFOSEC{D_EQUALS_5}",
    },
    {
        "id": 46, "tier": 2, "category": "RSA", "points": 40,
        "title": "OpenSSL RSA Generatsiya",
        "description": "Generate a 2048-bit RSA key with OpenSSL, extract the public modulus n (first 8 hex chars), and submit.",
        "hint": "openssl genrsa 2048 | openssl rsa -text -noout | grep -A1 'modulus:'",
        "flag": "UZINFOSEC{OPENSSL_RSA}",
    },
    {
        "id": 47, "tier": 2, "category": "Diffie-Hellman", "points": 45,
        "title": "DH Skript Simulyatsiyasi",
        "description": "Write Python: p=23, g=5, a=6, b=15. Compute A, B, and shared secret. Verify both sides match.",
        "hint": "A=5^6%23=8, B=5^15%23=19. K_alice=19^6%23=2, K_bob=8^15%23=2. Match!",
        "flag": "UZINFOSEC{SHARED_SECRET_2}",
    },
    {
        "id": 48, "tier": 2, "category": "RSA", "points": 50,
        "title": "RSA Padding Oracle Tushunchasi",
        "description": "What type of padding vulnerability allows an attacker to decrypt RSA-PKCS#1v1.5 ciphertexts by observing server error messages?",
        "hint": "Published by Daniel Bleichenbacher in 1998. The attack uses adaptive chosen ciphertext queries.",
        "flag": "UZINFOSEC{BLEICHENBACHER}",
    },

    # ── Hashing & Signature Scripted (49–54) ─────────────────────────────
    {
        "id": 49, "tier": 2, "category": "Hash", "points": 35,
        "title": "SHA-256 Python Hisoblash",
        "description": "Compute SHA-256 of the string 'kriptolab'. Submit the first 8 hex characters.",
        "hint": "import hashlib; hashlib.sha256(b'kriptolab').hexdigest()[:8]",
        "flag": "UZINFOSEC{SHA256_HASH}",
    },
    {
        "id": 50, "tier": 2, "category": "Hash", "points": 45,
        "title": "MD5 Kolliziya",
        "description": "MD5 is broken. Name the year the first practical collision was demonstrated and the researchers' surname.",
        "hint": "Wang and Yu demonstrated practical MD5 collisions in 2004.",
        "flag": "UZINFOSEC{WANG_2004}",
    },
    {
        "id": 51, "tier": 2, "category": "Hash", "points": 55,
        "title": "Hashcat Lug'at Hujumi",
        "description": "MD5 hash: '5d41402abc4b2a76b9719d911017c592'. Use hashcat or Python to crack it with a dictionary.",
        "hint": "hashcat -m 0 hash.txt rockyou.txt. Or: hashlib.md5(b'hello').hexdigest()",
        "flag": "UZINFOSEC{HELLO}",
    },
    {
        "id": 52, "tier": 2, "category": "Hash", "points": 40,
        "title": "Rainbow Table Tushunchasi",
        "description": "What technique defeats rainbow table attacks by prepending random data to each password before hashing?",
        "hint": "This random data is stored alongside the hash in the database.",
        "flag": "UZINFOSEC{SALTING}",
    },
    {
        "id": 53, "tier": 2, "category": "Digital Signature", "points": 50,
        "title": "RSA Imzo Tekshirish Skripti",
        "description": "Write Python to verify an RSA signature. Document hash=42, signature=2557, public key: e=17, n=3233. Is it valid?",
        "hint": "Verify: h' = signature^e mod n = 2557^17 mod 3233. If h' == 42, it's valid.",
        "flag": "UZINFOSEC{SIGNATURE_VALID}",
    },
    {
        "id": 54, "tier": 2, "category": "HMAC", "points": 45,
        "title": "HMAC-SHA256 Hisoblash",
        "description": "Compute HMAC-SHA256 with key='secret' and message='kriptolab'. Submit the first 8 hex chars.",
        "hint": "import hmac, hashlib; hmac.new(b'secret', b'kriptolab', hashlib.sha256).hexdigest()[:8]",
        "flag": "UZINFOSEC{HMAC_COMPUTED}",
    },

    # ── Advanced / Mixed Challenges (55–60) ───────────────────────────────
    {
        "id": 55, "tier": 2, "category": "CyberChef", "points": 40,
        "title": "CyberChef Zanjir",
        "description": "Use CyberChef to: 1) Decode from Hex: '48656c6c6f', 2) Encode result to Base64. What is the final output?",
        "hint": "Hex '48656c6c6f' = 'Hello'. Base64('Hello') = 'SGVsbG8='.",
        "flag": "UZINFOSEC{SGVsbG8=}",
    },
    {
        "id": 56, "tier": 2, "category": "XOR", "points": 50,
        "title": "Repeating-Key XOR",
        "description": "Encrypt 'Burning' with repeating key 'ICE' using XOR. Give hex output.",
        "hint": "B^I=0x0b, u^C=0x36, r^E=0x37, n^I=0x27, i^C=0x2a, n^E=0x2b, g^I=0x2e",
        "flag": "UZINFOSEC{0B3637272A2B2E}",
    },
    {
        "id": 57, "tier": 2, "category": "Steganography", "points": 55,
        "title": "LSB Steganografiya",
        "description": "Extract the least significant bits of each byte in this sequence: [0xC1, 0xC0, 0xC1, 0xC1, 0xC0, 0xC0, 0xC0, 0xC1]. What 8-bit ASCII character do the LSBs form?",
        "hint": "LSBs: 1,0,1,1,0,0,0,1 = 0xB1 = 177. But reading as MSB first: 10110001.",
        "flag": "UZINFOSEC{LSB_HIDDEN}",
    },
    {
        "id": 58, "tier": 2, "category": "Encoding", "points": 35,
        "title": "Morse Kodi Shifrlash",
        "description": "Decode this Morse: '... --- ...' (with spaces between letters). What is the distress signal?",
        "hint": "... = S, --- = O, ... = S. Together: SOS.",
        "flag": "UZINFOSEC{SOS}",
    },
    {
        "id": 59, "tier": 2, "category": "Advanced", "points": 60,
        "title": "AES-CBC Oracle",
        "description": "In a Padding Oracle attack on AES-CBC, the attacker exploits which specific error response from the server?",
        "hint": "The server distinguishes between 'invalid padding' and 'invalid ciphertext' errors. Published by Vaudenay in 2002.",
        "flag": "UZINFOSEC{PADDING_ORACLE}",
    },
    {
        "id": 60, "tier": 2, "category": "Advanced", "points": 70,
        "title": "Final Boss: Zaif Tizim Tahlili",
        "description": "A system uses RSA with n=91, e=5. Ciphertext c=12. Factor n, find d, decrypt. Submit plaintext m.",
        "hint": "91=7*13. phi=72. d=mod_inverse(5,72)=29. m=12^29 mod 91. Use Python pow(12,29,91).",
        "flag": "UZINFOSEC{M_EQUALS_3}",
    },
]


def get_all_challenges() -> list[dict]:
    """Return all challenges with flag values stripped (for public listing)."""
    public: list[dict] = []
    for ch in CTF_CHALLENGES:
        entry = {k: v for k, v in ch.items() if k != "flag"}
        public.append(entry)
    return public


def get_challenges_by_tier(tier: int) -> list[dict]:
    """Return challenges for a specific tier, flags stripped."""
    return [
        {k: v for k, v in ch.items() if k != "flag"}
        for ch in CTF_CHALLENGES
        if ch["tier"] == tier
    ]


def validate_flag(challenge_id: int, submitted_flag: str) -> dict:
    """
    Validate a submitted flag against the stored solution.
    Returns success/failure with appropriate messaging.
    """
    challenge = next((ch for ch in CTF_CHALLENGES if ch["id"] == challenge_id), None)
    if challenge is None:
        return {"valid": False, "message": "Challenge not found.", "points": 0}

    # Normalise: strip whitespace, case-insensitive comparison
    clean_submitted = submitted_flag.strip().upper()
    clean_expected = challenge["flag"].strip().upper()

    if clean_submitted == clean_expected:
        return {
            "valid": True,
            "message": f"🎉 Flag accepted! +{challenge['points']} points.",
            "points": challenge["points"],
        }
    return {
        "valid": False,
        "message": "❌ Incorrect flag. Keep trying!",
        "points": 0,
    }
