// Asimmetrik kriptografiya (RSA, Diffie-Hellman, ECC) moduli

export const RECOMMENDED_PRIMES = [
  11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
  101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199
];

export function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export function gcd(a, b) {
  a = BigInt(a);
  b = BigInt(b);
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Kengaytirilgan Yevklid algoritmi: a*x + b*y = gcd(a,b)
export function extendedGcd(a, b) {
  a = BigInt(a);
  b = BigInt(b);
  let old_r = a, r = b;
  let old_s = 1n, s = 0n;
  let old_t = 0n, t = 1n;

  while (r !== 0n) {
    const quotient = old_r / r;
    
    let temp_r = r;
    r = old_r - quotient * r;
    old_r = temp_r;

    let temp_s = s;
    s = old_s - quotient * s;
    old_s = temp_s;

    let temp_t = t;
    t = old_t - quotient * t;
    old_t = temp_t;
  }

  return {
    gcd: old_r,
    x: old_s,
    y: old_t
  };
}

export function modInverseBigInt(a, m) {
  a = BigInt(a);
  m = BigInt(m);
  const { gcd, x } = extendedGcd(a, m);
  if (gcd !== 1n) return null;
  return ((x % m) + m) % m;
}

// Tezkor modul bo'yicha darajaga ko'tarish: (base^exp) % mod
export function modPow(base, exp, mod) {
  base = BigInt(base);
  exp = BigInt(exp);
  mod = BigInt(mod);
  if (mod === 1n) return 0n;
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      res = (res * base) % mod;
    }
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return res;
}

// RSA tizimini hisoblash
export function calculateRsaKeys(p, q, eInput = null) {
  p = BigInt(p);
  q = BigInt(q);
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  // e tanlash: gcd(e, phi) == 1
  let e = eInput ? BigInt(eInput) : 65537n;
  if (!eInput || gcd(e, phi) !== 1n) {
    // Kichikroq mos e lardan birini topamiz: 3, 5, 17, 257, 65537
    const candidates = [65537n, 17n, 7n, 5n, 3n];
    let found = false;
    for (const c of candidates) {
      if (c < phi && gcd(c, phi) === 1n) {
        e = c;
        found = true;
        break;
      }
    }
    if (!found) {
      for (let c = 3n; c < phi; c += 2n) {
        if (gcd(c, phi) === 1n) {
          e = c;
          break;
        }
      }
    }
  }

  const d = modInverseBigInt(e, phi);

  return {
    p,
    q,
    n,
    phi,
    e,
    d,
    isValid: d !== null
  };
}

export function rsaEncryptText(text, e, n) {
  const enc = [];
  for (let i = 0; i < text.length; i++) {
    const code = BigInt(text.charCodeAt(i));
    if (code >= BigInt(n)) {
      // belgi moduli n dan kichik bo'lishi shart
      return { error: `Belgi kodi (${code}) modul n (${n}) dan katta! Iltimos kattaroq tub sonlar (p, q) tanlang.` };
    }
    enc.push(modPow(code, e, n).toString());
  }
  return { result: enc, error: null };
}

export function rsaDecryptText(cipherNumbers, d, n) {
  try {
    let plain = '';
    for (const cStr of cipherNumbers) {
      const c = BigInt(cStr);
      const m = modPow(c, d, n);
      plain += String.fromCharCode(Number(m));
    }
    return { result: plain, error: null };
  } catch (err) {
    return { result: '', error: 'Deshifrlashda xatolik yuz berdi' };
  }
}

// Diffie-Hellman simulyatori
export function simulateDiffieHellman(p, g, a, b) {
  p = BigInt(p);
  g = BigInt(g);
  a = BigInt(a);
  b = BigInt(b);

  const A = modPow(g, a, p); // Alisa ochiq kaliti
  const B = modPow(g, b, p); // Bob ochiq kaliti

  const sharedAlice = modPow(B, a, p); // Alisa hisoblagan umumiy kalit
  const sharedBob = modPow(A, b, p);   // Bob hisoblagan umumiy kalit

  return {
    p: p.toString(),
    g: g.toString(),
    alicePrivate: a.toString(),
    alicePublic: A.toString(),
    bobPrivate: b.toString(),
    bobPublic: B.toString(),
    sharedSecret: sharedAlice.toString(),
    isMatching: sharedAlice === sharedBob
  };
}
