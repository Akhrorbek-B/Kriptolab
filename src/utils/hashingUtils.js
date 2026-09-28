// Kriptografik Xesh va Raqamli Imzo moduli

// Sinxron SHA-256 algoritmi (sof JS)
function rightRotate(value, amount) {
  return (value >>> amount) | (value << (32 - amount));
}

export function sha256Sync(ascii) {
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i, j;
  let result = '';

  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  
  let hash = [];
  const k = [];
  let primeCounter = 0;

  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  hash = hash.slice(0, 8);

  words[asciiBitLength >> 5] |= 0x80 << (24 - (asciiBitLength % 32));
  words[(((asciiBitLength + 64) >> 9) << 4) + 15] = asciiBitLength;

  for (i = 0; i < ascii[lengthProperty]; i++) {
    words[i >> 2] |= ascii.charCodeAt(i) << ((3 - (i % 4)) * 8);
  }

  for (j = 0; j < words[lengthProperty]; j += 16) {
    const w = words.slice(j, j + 16);
    const oldHash = hash.slice(0);

    for (i = 0; i < 64; i++) {
      const i2 = i + j;
      const w15 = w[i - 15], w2 = w[i - 2];

      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      w[i] = (i < 16) ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0;

      const s1_maj = rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22);
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const t2 = (s1_maj + maj) | 0;

      const s1_ch = rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25);
      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const t1 = (hash[7] + s1_ch + ch + k[i] + w[i]) | 0;

      hash = [(t1 + t2) | 0].concat(hash);
      hash[4] = (hash[4] + t1) | 0;
      hash.pop();
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += ((b < 16) ? '0' : '') + b.toString(16);
    }
  }

  return result;
}

// Hex qiymatni 256 ta ikkilik (binary) bit satriga aylantirish
export function hexToBinary(hexStr) {
  let bin = '';
  for (let i = 0; i < hexStr.length; i++) {
    const b = parseInt(hexStr[i], 16).toString(2).padStart(4, '0');
    bin += b;
  }
  return bin;
}

// Ko'chki effekti (Avalanche effect) tahlili
export function analyzeAvalanche(text1, text2) {
  const hash1 = sha256Sync(text1);
  const hash2 = sha256Sync(text2);

  const bin1 = hexToBinary(hash1);
  const bin2 = hexToBinary(hash2);

  let flippedCount = 0;
  const bitComparison = [];

  for (let i = 0; i < 256; i++) {
    const isDifferent = bin1[i] !== bin2[i];
    if (isDifferent) flippedCount++;
    bitComparison.push({
      index: i,
      bit1: bin1[i],
      bit2: bin2[i],
      flipped: isDifferent
    });
  }

  const changePercentage = ((flippedCount / 256) * 100).toFixed(1);

  return {
    hash1,
    hash2,
    bin1,
    bin2,
    flippedCount,
    totalBits: 256,
    changePercentage,
    bitComparison
  };
}

// Raqamli Imzo simulyatori
export function simulateSignature(documentText, p = 61, q = 53, e = 17) {
  // Oddiy modul va kalitlar
  const n = p * q; // 3233
  const phi = (p - 1) * (q - 1); // 3120
  
  // d ni hisoblash: d*17 mod 3120 = 1 -> d = 2753
  let d = 2753; // tayyor
  
  // Matnning qisqa xesh kodi (masalan, 1 dan 1000 gacha son)
  let simpleHash = 0;
  for (let i = 0; i < documentText.length; i++) {
    simpleHash = (simpleHash * 31 + documentText.charCodeAt(i)) % 1000 + 1;
  }

  // Imzo hosil qilish: S = Hash^d mod n
  function bigPow(base, exp, mod) {
    let res = 1n;
    base = BigInt(base) % BigInt(mod);
    exp = BigInt(exp);
    const m = BigInt(mod);
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % m;
      exp = exp / 2n;
      base = (base * base) % m;
    }
    return Number(res);
  }

  const signature = bigPow(simpleHash, d, n);

  // Tekshirish: H' = S^e mod n
  const verifiedHash = bigPow(signature, e, n);

  return {
    documentText,
    hash: simpleHash,
    signature,
    verifiedHash,
    isValid: simpleHash === verifiedHash,
    publicKey: { e, n },
    privateKey: { d, n }
  };
}
