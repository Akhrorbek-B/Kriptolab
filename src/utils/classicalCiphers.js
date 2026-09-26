// Klassik shifrlash algoritmlari moduli

// --- SEZAR SHIFRI ---
export function caesarEncrypt(text, shift) {
  const s = ((shift % 26) + 26) % 26;
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    // Katta harflar (A-Z)
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + s) % 26) + 65);
    }
    // Kichik harflar (a-z)
    if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + s) % 26) + 97);
    }
    return char;
  }).join('');
}

export function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, -shift);
}

export function caesarBruteForce(text) {
  const results = [];
  for (let k = 0; k < 26; k++) {
    results.push({
      shift: k,
      text: caesarDecrypt(text, k)
    });
  }
  return results;
}

// --- VIGENÈRE SHIFRI ---
export function vigenereEncrypt(text, key) {
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanKey) return text;
  
  let keyIndex = 0;
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;
    
    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97;
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      keyIndex++;
      return String.fromCharCode(((code - base + shift) % 26) + base);
    }
    return char;
  }).join('');
}

export function vigenereDecrypt(text, key) {
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanKey) return text;
  
  let keyIndex = 0;
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;
    
    if (isUpper || isLower) {
      const base = isUpper ? 65 : 97;
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      keyIndex++;
      return String.fromCharCode(((code - base - shift + 26) % 26) + base);
    }
    return char;
  }).join('');
}

// --- AFFIN SHIFRI (E(x) = (a*x + b) mod 26) ---
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function modInverse(a, m = 26) {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

export function affineEncrypt(text, a, b) {
  if (gcd(a, 26) !== 1) return { error: "a va 26 o'zaro tub bo'lishi kerak! (gcd(a, 26) = 1)" };
  const res = text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      const x = code - 65;
      return String.fromCharCode(((a * x + b) % 26 + 26) % 26 + 65);
    }
    if (code >= 97 && code <= 122) {
      const x = code - 97;
      return String.fromCharCode(((a * x + b) % 26 + 26) % 26 + 97);
    }
    return char;
  }).join('');
  return { result: res, error: null };
}

export function affineDecrypt(text, a, b) {
  const aInv = modInverse(a, 26);
  if (!aInv) return { error: "a ning teskarisi mavjud emas!" };
  const res = text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      const y = code - 65;
      return String.fromCharCode(((aInv * (y - b)) % 26 + 26) % 26 + 65);
    }
    if (code >= 97 && code <= 122) {
      const y = code - 97;
      return String.fromCharCode(((aInv * (y - b)) % 26 + 26) % 26 + 97);
    }
    return char;
  }).join('');
  return { result: res, error: null };
}

// --- PLAYFAIR SHIFRI ---
export function generatePlayfairMatrix(key) {
  const cleanKey = (key.toUpperCase() + "ABCDEFGHIKLMNOPQRSTUVWXYZ").replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  const unique = [];
  for (const c of cleanKey) {
    if (!unique.includes(c)) unique.push(c);
  }
  const matrix = [];
  for (let i = 0; i < 5; i++) {
    matrix.push(unique.slice(i * 5, i * 5 + 5));
  }
  return matrix;
}

export function playfairPrepare(text) {
  let clean = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  let pairs = [];
  for (let i = 0; i < clean.length; i += 2) {
    let first = clean[i];
    let second = clean[i + 1];
    if (!second) {
      second = 'X';
    } else if (first === second) {
      second = 'X';
      i--; // Ikkinchi harfni keyingi juftlikka olib qolish
    }
    pairs.push(first + second);
  }
  return pairs;
}

function findPosition(matrix, char) {
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (matrix[r][c] === char) return { r, c };
    }
  }
  return { r: 0, c: 0 };
}

export function playfairEncrypt(text, key) {
  const matrix = generatePlayfairMatrix(key);
  const pairs = playfairPrepare(text);
  const encryptedPairs = pairs.map(pair => {
    const p1 = findPosition(matrix, pair[0]);
    const p2 = findPosition(matrix, pair[1]);
    
    if (p1.r === p2.r) {
      // Bir xil satr -> o'ngga surish
      return matrix[p1.r][(p1.c + 1) % 5] + matrix[p2.r][(p2.c + 1) % 5];
    } else if (p1.c === p2.c) {
      // Bir xil ustun -> pastga surish
      return matrix[(p1.r + 1) % 5][p1.c] + matrix[(p2.r + 1) % 5][p2.c];
    } else {
      // To'rtburchak -> burchaklarni almashtirish
      return matrix[p1.r][p2.c] + matrix[p2.r][p1.c];
    }
  });
  return { matrix, pairs, ciphertext: encryptedPairs.join(' ') };
}

// --- RAIL FENCE (TEMIR YO'L TO'SIG'I) ---
export function railFenceEncrypt(text, rails) {
  if (rails <= 1 || !text) return text;
  const fence = Array.from({ length: rails }, () => []);
  let rail = 0;
  let direction = 1;

  for (const char of text) {
    fence[rail].push(char);
    rail += direction;
    if (rail === rails - 1 || rail === 0) {
      direction = -direction;
    }
  }

  return {
    ciphertext: fence.flat().join(''),
    fence
  };
}

export function railFenceDecrypt(ciphertext, rails) {
  if (rails <= 1 || !ciphertext) return ciphertext;
  const len = ciphertext.length;
  const fence = Array.from({ length: rails }, () => Array(len).fill(null));

  // Zigzag yo'lini belgilab chiqamiz
  let rail = 0;
  let direction = 1;
  for (let i = 0; i < len; i++) {
    fence[rail][i] = '*';
    rail += direction;
    if (rail === rails - 1 || rail === 0) {
      direction = -direction;
    }
  }

  // Shifrmatn belgilarini joylashtiramiz
  let index = 0;
  for (let r = 0; r < rails; r++) {
    for (let c = 0; c < len; c++) {
      if (fence[r][c] === '*' && index < len) {
        fence[r][c] = ciphertext[index++];
      }
    }
  }

  // Qaytadan zigzag bo'yicha o'qiymiz
  let result = '';
  rail = 0;
  direction = 1;
  for (let i = 0; i < len; i++) {
    result += fence[rail][i];
    rail += direction;
    if (rail === rails - 1 || rail === 0) {
      direction = -direction;
    }
  }

  return result;
}

// --- ENIGMA MINI SIMULYATORI ---
export const ENIGMA_ROTORS = {
  I:   "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
  II:  "AJDKSIRUXBLHWTMCQGZNPYFVOE",
  III: "BDFHJLCPRTXVZNYEIWGAKMUSQO"
};
export const ENIGMA_REFLECTOR_B = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

export function simulateEnigmaChar(char, pos1, pos2, pos3) {
  const code = char.toUpperCase().charCodeAt(0);
  if (code < 65 || code > 90) return { char, trace: [] };

  let val = code - 65;
  const trace = [{ stage: "Kirish", char: String.fromCharCode(val + 65) }];

  // Rotor 1 orqali
  val = (val + pos1) % 26;
  val = ENIGMA_ROTORS.I.charCodeAt(val) - 65;
  val = (val - pos1 + 26) % 26;
  trace.push({ stage: "Rotor I", char: String.fromCharCode(val + 65) });

  // Rotor 2 orqali
  val = (val + pos2) % 26;
  val = ENIGMA_ROTORS.II.charCodeAt(val) - 65;
  val = (val - pos2 + 26) % 26;
  trace.push({ stage: "Rotor II", char: String.fromCharCode(val + 65) });

  // Rotor 3 orqali
  val = (val + pos3) % 26;
  val = ENIGMA_ROTORS.III.charCodeAt(val) - 65;
  val = (val - pos3 + 26) % 26;
  trace.push({ stage: "Rotor III", char: String.fromCharCode(val + 65) });

  // Reflektor B orqali
  val = ENIGMA_REFLECTOR_B.charCodeAt(val) - 65;
  trace.push({ stage: "Reflektor B", char: String.fromCharCode(val + 65) });

  // Orqaga qaytish (Inverse Rotor 3)
  val = (val + pos3) % 26;
  val = ENIGMA_ROTORS.III.indexOf(String.fromCharCode(val + 65));
  val = (val - pos3 + 26) % 26;
  trace.push({ stage: "Rotor III (qaytish)", char: String.fromCharCode(val + 65) });

  // Orqaga qaytish (Inverse Rotor 2)
  val = (val + pos2) % 26;
  val = ENIGMA_ROTORS.II.indexOf(String.fromCharCode(val + 65));
  val = (val - pos2 + 26) % 26;
  trace.push({ stage: "Rotor II (qaytish)", char: String.fromCharCode(val + 65) });

  // Orqaga qaytish (Inverse Rotor 1)
  val = (val + pos1) % 26;
  val = ENIGMA_ROTORS.I.indexOf(String.fromCharCode(val + 65));
  val = (val - pos1 + 26) % 26;
  trace.push({ stage: "Chiqish (Lampboard)", char: String.fromCharCode(val + 65) });

  return { char: String.fromCharCode(val + 65), trace };
}
