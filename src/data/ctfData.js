/**
 * CTF Challenge Data (Frontend)
 * ================================
 * 60 challenges across two tiers. Flags are NOT stored here — validation
 * happens server-side via the /api/v1/ctf/validate endpoint.
 *
 * Tier 1 (1-30): Paper/Manual — solvable with pen, paper, and reasoning
 * Tier 2 (31-60): Computer/Script — requires Python, CyberChef, or CLI tools
 */

export const CTF_CHALLENGES_DATA = [
  // ═══════════════════════════════════════════════════════════════════
  //  TIER 1 — Paper / Manual Challenges (1–30)
  // ═══════════════════════════════════════════════════════════════════

  // ── Classical Ciphers (1–10)
  { id: 1,  tier: 1, category: "Caesar",         points: 10, difficulty: "Oson",
    title: "Rimlik Sarkardaning Xabari",
    description: "Intercepted message: 'KHOOR ZRUOG'. The spy says shift is between 1-5. Decode it.",
    hint: "Try k=3. Each letter shifts backward by 3." },

  { id: 2,  tier: 1, category: "Caesar",         points: 10, difficulty: "Oson",
    title: "ROT13 Klassik",
    description: "A forum post is encoded: 'PELCGBTENCUL VF SHA'. What does it say?",
    hint: "ROT13 means k=13. Apply Caesar shift of 13." },

  { id: 3,  tier: 1, category: "Caesar",         points: 15, difficulty: "Oson",
    title: "Brute Force Mashqi",
    description: "Ciphertext: 'GZWUJSLAGAFLK'. Try all 26 shifts and find the English word.",
    hint: "Try shifts systematically from 0 to 25. The answer appears at k=8." },

  { id: 4,  tier: 1, category: "Affine",         points: 20, difficulty: "O'rta",
    title: "Affin Shifr Sinovi",
    description: "E(x) = (5x + 8) mod 26. Encrypt the word 'HELLO'. What is the ciphertext?",
    hint: "H=7: (5*7+8)%26=17=R, E=4: (5*4+8)%26=2=C, L=11: (5*11+8)%26=11=L, O=14: (5*14+8)%26=0=A" },

  { id: 5,  tier: 1, category: "Affine",         points: 25, difficulty: "O'rta",
    title: "Teskari Muammo",
    description: "Affine cipher with a=7, b=3. Ciphertext: 'CZOL'. Find the plaintext. Remember: D(y)=a_inv*(y-b) mod 26, a_inv of 7 mod 26 = 15.",
    hint: "C=2: 15*(2-3) mod 26 = 15*25 mod 26 = 11 = L. Continue for each letter." },

  { id: 6,  tier: 1, category: "Vigenere",       points: 20, difficulty: "O'rta",
    title: "Polialfavit Qutqaruv",
    description: "Vigenère ciphertext: 'RIJVS UYVJN'. The keyword is 'KEY'. Decrypt the message.",
    hint: "Vigenère decryption: subtract key letter values from ciphertext letter values (mod 26)." },

  { id: 7,  tier: 1, category: "Vigenere",       points: 25, difficulty: "O'rta",
    title: "Kasiski Topshirig'i",
    description: "Ciphertext with repeating patterns at positions 0 and 12. What is the most likely key length?",
    hint: "GCD(12, 0) = 12. Common factors: 2, 3, 4, 6, 12. Most likely key length: 4 or 6." },

  { id: 8,  tier: 1, category: "Playfair",       points: 25, difficulty: "O'rta",
    title: "Playfair Matritsasi",
    description: "Key: 'MONARCHY'. Build the 5x5 matrix and encrypt 'HE'. Note: J is merged with I.",
    hint: "Matrix row 1: M O N A R. Row 2: C H Y B D. Use rectangle rule for H and E." },

  { id: 9,  tier: 1, category: "Rail Fence",     points: 15, difficulty: "Oson",
    title: "Temir Yo'l Shifri",
    description: "Encrypt 'HELLOWORLD' with 3 rails. Write the zigzag and read off each rail.",
    hint: "Rail 0: H...O...L, Rail 1: E.L.W.R.D, Rail 2: L...O... => HOLELWRDLO" },

  { id: 10, tier: 1, category: "Atbash",         points: 10, difficulty: "Oson",
    title: "Oyna Alfaviti",
    description: "Atbash cipher maps A↔Z, B↔Y, etc. Decode: 'KIBKGLOZV'",
    hint: "K→P, I→R, B→Y, K→P, G→T, L→O, O→L, Z→A, V→E" },

  // ── Symmetric / AES Concepts (11–16)
  { id: 11, tier: 1, category: "AES",            points: 15, difficulty: "O'rta",
    title: "S-Box Izlash",
    description: "In the AES S-Box, what is the substitution for input byte 0x53? (answer in hex, uppercase)",
    hint: "S-Box row 5, column 3. Look up the standard AES S-Box table." },

  { id: 12, tier: 1, category: "AES",            points: 20, difficulty: "O'rta",
    title: "ShiftRows Amali",
    description: "Given AES state matrix row 2: [A, B, C, D]. After ShiftRows, what is the result?",
    hint: "Row i shifts left by i positions. Row 2 shifts by 2: [C, D, A, B]." },

  { id: 13, tier: 1, category: "AES",            points: 15, difficulty: "O'rta",
    title: "AES Raundlar Soni",
    description: "AES-256 uses how many rounds? And what is the block size in bits?",
    hint: "AES-128=10, AES-192=12, AES-256=14 rounds. Block is always 128 bits." },

  { id: 14, tier: 1, category: "Block Modes",    points: 20, difficulty: "O'rta",
    title: "ECB Xavfi — Tux Penguin",
    description: "Why does encrypting the Tux image with ECB mode reveal the silhouette in the ciphertext?",
    hint: "Identical plaintext blocks → identical ciphertext blocks." },

  { id: 15, tier: 1, category: "Block Modes",    points: 15, difficulty: "Oson",
    title: "CBC Zanjiri",
    description: "In CBC mode, the first block is XORed with what before encryption?",
    hint: "CBC uses an Initialization Vector (IV) for the first block." },

  { id: 16, tier: 1, category: "DES",            points: 20, difficulty: "O'rta",
    title: "DES Kalit Tahlili",
    description: "DES key is 64 bits but only 56 are effective. Why?",
    hint: "Every 8th bit is a parity check bit, not used in encryption." },

  // ── Asymmetric / RSA (17–22)
  { id: 17, tier: 1, category: "RSA",            points: 25, difficulty: "O'rta",
    title: "RSA Kalit Generatsiyasi",
    description: "p=7, q=11. Compute n, phi(n), and find a valid e.",
    hint: "n=77, phi=60. e must satisfy gcd(e,60)=1. Try e=7 or e=13." },

  { id: 18, tier: 1, category: "RSA",            points: 30, difficulty: "Qiyin",
    title: "RSA Shifrlash",
    description: "RSA: n=55, e=3. Encrypt m=7. What is c = m^e mod n?",
    hint: "c = 7^3 mod 55 = 343 mod 55 = 13." },

  { id: 19, tier: 1, category: "RSA",            points: 35, difficulty: "Qiyin",
    title: "RSA Deshifrlash",
    description: "n=55, e=3, phi=40. Find d, then decrypt c=13.",
    hint: "d=27 (27*3=81, 81 mod 40=1). m = 13^27 mod 55 = 7." },

  { id: 20, tier: 1, category: "Diffie-Hellman", points: 25, difficulty: "O'rta",
    title: "DH Umumiy Kalit",
    description: "p=23, g=5. Alice: a=6. Compute Alice's public A = g^a mod p.",
    hint: "A = 5^6 mod 23 = 8." },

  { id: 21, tier: 1, category: "Diffie-Hellman", points: 30, difficulty: "Qiyin",
    title: "DH Yakuniy Hisob",
    description: "p=23, g=5, a=6, b=15. Bob's public B=19. Compute K = B^a mod p.",
    hint: "K = 19^6 mod 23. Use repeated squaring." },

  { id: 22, tier: 1, category: "RSA",            points: 20, difficulty: "O'rta",
    title: "Eyler Funktsiyasi",
    description: "Compute phi(100). Hint: 100 = 2^2 * 5^2.",
    hint: "phi(100) = 100 * (1 - 1/2) * (1 - 1/5) = 40." },

  // ── Hashing & Digital Signatures (23–28)
  { id: 23, tier: 1, category: "Hash",              points: 15, difficulty: "Oson",
    title: "Xesh Xususiyatlari",
    description: "Name the three security properties of cryptographic hash functions.",
    hint: "Pre-image, Second pre-image, and Collision resistance." },

  { id: 24, tier: 1, category: "Hash",              points: 20, difficulty: "O'rta",
    title: "Ko'chki Effekti Foizi",
    description: "If SHA-256 outputs differ in 130 out of 256 bits, what is the percentage?",
    hint: "130/256 * 100 ≈ 50.78%. Close to the ideal 50%." },

  { id: 25, tier: 1, category: "Digital Signature",  points: 25, difficulty: "O'rta",
    title: "Raqamli Imzo Jarayoni",
    description: "In RSA digital signatures, the signer uses which key to create the signature?",
    hint: "The signer's PRIVATE key is used to sign." },

  { id: 26, tier: 1, category: "Hash",              points: 20, difficulty: "O'rta",
    title: "Tug'ilgan Kun Hujumi",
    description: "For an n-bit hash, how many operations for a birthday attack?",
    hint: "Approximately 2^(n/2) operations." },

  { id: 27, tier: 1, category: "HMAC",              points: 25, difficulty: "O'rta",
    title: "HMAC Tuzilishi",
    description: "What are the standard pad values ipad and opad in HMAC?",
    hint: "ipad = 0x36, opad = 0x5C (each repeated to fill a block)." },

  { id: 28, tier: 1, category: "PKI",               points: 30, difficulty: "Qiyin",
    title: "Sertifikat Zanjiri",
    description: "In PKI, what entity signs digital certificates to establish trust?",
    hint: "Certificate Authority (CA)." },

  // ── Misc Theory (29–30)
  { id: 29, tier: 1, category: "Frequency",         points: 15, difficulty: "Oson",
    title: "Ingliz Tili Chastotasi",
    description: "What is the most frequently occurring letter in the English language?",
    hint: "ETAOINSHRDLU — first letter." },

  { id: 30, tier: 1, category: "History",           points: 20, difficulty: "O'rta",
    title: "Kerkxoffs Tamoyili",
    description: "Complete: 'The security of a cryptosystem should depend solely on the secrecy of the ___'.",
    hint: "Not the algorithm, but the..." },

  // ═══════════════════════════════════════════════════════════════════
  //  TIER 2 — Computer / Script-Based Challenges (31–60)
  // ═══════════════════════════════════════════════════════════════════

  { id: 31, tier: 2, category: "Caesar Brute",    points: 30, difficulty: "O'rta",
    title: "Avtomatik Brute-Force",
    description: "Write a Python script to brute-force: 'GUVF VF N FRPERG ZRFFNTR'. Find the shift and plaintext.",
    hint: "Loop k=0..25, decrypt, check for English words. Or just try ROT13 first." },

  { id: 32, tier: 2, category: "Frequency",       points: 40, difficulty: "Qiyin",
    title: "Chastotaviy Hujum Skripti",
    description: "Monoalphabetic substitution ciphertext: 'GSVIV RH ML KOVXV ORPV SLNV'. Use frequency analysis or pattern matching.",
    hint: "This is actually an Atbash cipher. Try reversing the alphabet." },

  { id: 33, tier: 2, category: "Vigenere",        points: 45, difficulty: "Qiyin",
    title: "Vigenère Kasiski Hujumi",
    description: "Crack: 'LXFOPVEFRNHR'. Key is a 3-letter English word.",
    hint: "Try common 3-letter keys: KEY, CAT, DOG, SPY." },

  { id: 34, tier: 2, category: "Rail Fence",      points: 30, difficulty: "O'rta",
    title: "Rail Fence Dekoder",
    description: "Decrypt this Rail Fence (3 rails): 'WECRLTEERDSOEEFEAOCAIVDEN'.",
    hint: "Implement the zigzag pattern reading algorithm." },

  { id: 35, tier: 2, category: "XOR",             points: 35, difficulty: "Qiyin",
    title: "XOR Kalit Izlash",
    description: "Hex: '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'. Single-byte XOR key.",
    hint: "XOR each byte with 0-255, score by English frequency. Key is 0x58." },

  { id: 36, tier: 2, category: "Base64",          points: 20, difficulty: "Oson",
    title: "Base64 Zanjir",
    description: "Decode this triple-encoded Base64: 'Vm0wd2QyUXlVWGw='. Hint: decode 3 times.",
    hint: "Use Python: base64.b64decode() three times in succession." },

  { id: 37, tier: 2, category: "AES",             points: 50, difficulty: "Qiyin",
    title: "AES-ECB Python Deshifrlash",
    description: "Use Python's `cryptography` library. Key(hex): '00112233445566778899aabbccddeeff'. CT(hex): '69c4e0d86a7b0430d8cdb78070b4c55a'.",
    hint: "from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes" },

  { id: 38, tier: 2, category: "AES",             points: 45, difficulty: "Qiyin",
    title: "ECB Naqsh Aniqlash",
    description: "Ciphertext where blocks repeat: 'aabbccdd aabbccdd eeff0011'. Which mode?",
    hint: "Repeating ciphertext blocks = ECB mode." },

  { id: 39, tier: 2, category: "AES",             points: 55, difficulty: "Qiyin",
    title: "S-Box Lookup Skripti",
    description: "Write a Python script: Apply SubBytes to input byte 0x19. What is the output?",
    hint: "S_BOX[0x19] = S_BOX[25] = 0xD4." },

  { id: 40, tier: 2, category: "DES",             points: 40, difficulty: "Qiyin",
    title: "DES Zaif Kalit Topish",
    description: "DES has 4 weak keys where E_K(E_K(P)) = P. One is all zeros. Name another.",
    hint: "0xFFFFFFFFFFFFFFFF, 0xE0E0E0E0F1F1F1F1, 0x1F1F1F1F0E0E0E0E." },

  { id: 41, tier: 2, category: "Block Modes",     points: 50, difficulty: "Qiyin",
    title: "CBC Bitflip Hujumi",
    description: "In CBC decryption, flipping bit 5 of C_{i-1} flips which bit of P_i?",
    hint: "P_i = D_K(C_i) XOR C_{i-1}. Same bit position flips." },

  { id: 42, tier: 2, category: "Padding",         points: 35, difficulty: "O'rta",
    title: "PKCS7 Padding",
    description: "10-byte message, 16-byte block. What are the 6 PKCS#7 padding bytes?",
    hint: "Pad with N bytes of value N. 6 padding → 0x06 repeated 6 times." },

  { id: 43, tier: 2, category: "RSA",             points: 50, difficulty: "Qiyin",
    title: "Zaif RSA Faktorizatsiya",
    description: "n=3233, e=17. Factor n, compute d, then decrypt c=2201.",
    hint: "3233=53*61. phi=3120. d=2753. m=pow(2201,2753,3233)." },

  { id: 44, tier: 2, category: "RSA",             points: 60, difficulty: "Qiyin",
    title: "RSA Common Modulus Hujumi",
    description: "Same n=3599, e1=5(c1=3344), e2=7(c2=687). Use common modulus attack.",
    hint: "Extended GCD to find s1,s2: e1*s1+e2*s2=1. m = c1^s1 * c2^s2 mod n." },

  { id: 45, tier: 2, category: "RSA",             points: 55, difficulty: "Qiyin",
    title: "Wiener Hujumi Simulyatsiyasi",
    description: "RSA: n=90581, e=17993. Find d using continued fractions (Wiener's attack).",
    hint: "Compute continued fraction of e/n. Convergents give candidates. d=5." },

  { id: 46, tier: 2, category: "RSA",             points: 40, difficulty: "O'rta",
    title: "OpenSSL RSA Generatsiya",
    description: "Generate a 2048-bit RSA key with OpenSSL and extract the public modulus.",
    hint: "openssl genrsa 2048 | openssl rsa -text -noout" },

  { id: 47, tier: 2, category: "Diffie-Hellman",  points: 45, difficulty: "O'rta",
    title: "DH Skript Simulyatsiyasi",
    description: "Write Python: p=23, g=5, a=6, b=15. Compute shared secret. Verify both sides.",
    hint: "A=8, B=19. K_alice=19^6%23=2. K_bob=8^15%23=2." },

  { id: 48, tier: 2, category: "RSA",             points: 50, difficulty: "Qiyin",
    title: "RSA Padding Oracle Tushunchasi",
    description: "What padding vulnerability allows Bleichenbacher's attack on RSA-PKCS#1v1.5?",
    hint: "Server distinguishes 'invalid padding' vs 'invalid ciphertext'. Published 1998." },

  { id: 49, tier: 2, category: "Hash",            points: 35, difficulty: "O'rta",
    title: "SHA-256 Python Hisoblash",
    description: "Compute SHA-256 of 'kriptolab'. Submit the first 8 hex characters.",
    hint: "import hashlib; hashlib.sha256(b'kriptolab').hexdigest()[:8]" },

  { id: 50, tier: 2, category: "Hash",            points: 45, difficulty: "Qiyin",
    title: "MD5 Kolliziya",
    description: "MD5 is broken. Name the year and researcher surname of the first practical collision.",
    hint: "Wang and Yu, 2004." },

  { id: 51, tier: 2, category: "Hash",            points: 55, difficulty: "Qiyin",
    title: "Hashcat Lug'at Hujumi",
    description: "MD5 hash: '5d41402abc4b2a76b9719d911017c592'. Crack it.",
    hint: "hashcat -m 0 or hashlib.md5(b'hello').hexdigest()" },

  { id: 52, tier: 2, category: "Hash",            points: 40, difficulty: "O'rta",
    title: "Rainbow Table Tushunchasi",
    description: "What technique defeats rainbow table attacks on passwords?",
    hint: "Random data prepended to each password before hashing." },

  { id: 53, tier: 2, category: "Digital Signature", points: 50, difficulty: "Qiyin",
    title: "RSA Imzo Tekshirish Skripti",
    description: "Verify RSA signature. hash=42, sig=2557, e=17, n=3233. Is it valid?",
    hint: "h' = 2557^17 mod 3233. If h'==42 → valid." },

  { id: 54, tier: 2, category: "HMAC",            points: 45, difficulty: "Qiyin",
    title: "HMAC-SHA256 Hisoblash",
    description: "Compute HMAC-SHA256 with key='secret', message='kriptolab'. First 8 hex chars.",
    hint: "import hmac, hashlib; hmac.new(b'secret', b'kriptolab', hashlib.sha256).hexdigest()[:8]" },

  { id: 55, tier: 2, category: "CyberChef",       points: 40, difficulty: "O'rta",
    title: "CyberChef Zanjir",
    description: "Hex→ASCII→Base64: '48656c6c6f'. What is the final Base64?",
    hint: "'Hello' in Base64 = 'SGVsbG8='." },

  { id: 56, tier: 2, category: "XOR",             points: 50, difficulty: "Qiyin",
    title: "Repeating-Key XOR",
    description: "Encrypt 'Burning' with repeating key 'ICE' using XOR. Give hex output.",
    hint: "B^I, u^C, r^E, n^I, i^C, n^E, g^I" },

  { id: 57, tier: 2, category: "Steganography",   points: 55, difficulty: "Qiyin",
    title: "LSB Steganografiya",
    description: "Extract LSBs from: [0xC1, 0xC0, 0xC1, 0xC1, 0xC0, 0xC0, 0xC0, 0xC1]. What ASCII char?",
    hint: "LSBs: 1,0,1,1,0,0,0,1 = binary string." },

  { id: 58, tier: 2, category: "Encoding",        points: 35, difficulty: "Oson",
    title: "Morse Kodi Shifrlash",
    description: "Decode: '... --- ...' (spaces between letters).",
    hint: "...=S, ---=O, ...=S → SOS" },

  { id: 59, tier: 2, category: "Advanced",        points: 60, difficulty: "Qiyin",
    title: "AES-CBC Padding Oracle",
    description: "In a Padding Oracle attack on AES-CBC, what error response does the attacker exploit?",
    hint: "Vaudenay, 2002. Invalid padding vs invalid ciphertext distinction." },

  { id: 60, tier: 2, category: "Advanced",        points: 70, difficulty: "Qiyin",
    title: "Final Boss: Zaif Tizim Tahlili",
    description: "RSA: n=91, e=5, c=12. Factor n, find d, decrypt. Submit plaintext m.",
    hint: "91=7*13. phi=72. d=29. m=pow(12,29,91)." },
];
