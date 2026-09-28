/**
 * KriptoLab — Frontend API Service
 * ===================================
 * Centralised `fetch` wrapper for all FastAPI backend endpoints.
 * Each domain (crypto, ctf) exposes an ergonomic async API.
 *
 * If the backend is offline the frontend still functions using its
 * local `utils/` implementations — these calls are optional upgrades.
 */

const API_BASE = 'http://localhost:8000/api/v1';

// ── Generic request helper ─────────────────────────────────────────────
async function request(path, { method = 'GET', body } = {}) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json();
}

// ═══════════════════════════════════════════════════════════════════════
//  Cryptography API
// ═══════════════════════════════════════════════════════════════════════

export const cryptoApi = {
  // ── Classical ────────────────────────────────────────────────────────
  caesar: {
    encrypt:    (text, key) => request('/crypto/caesar/encrypt',    { method: 'POST', body: { text, key } }),
    decrypt:    (text, key) => request('/crypto/caesar/decrypt',    { method: 'POST', body: { text, key } }),
    bruteforce: (text)      => request('/crypto/caesar/bruteforce', { method: 'POST', body: { text } }),
  },
  vigenere: {
    encrypt: (text, key) => request('/crypto/vigenere/encrypt', { method: 'POST', body: { text, key } }),
    decrypt: (text, key) => request('/crypto/vigenere/decrypt', { method: 'POST', body: { text, key } }),
  },
  affine: {
    encrypt: (text, a, b) => request('/crypto/affine/encrypt', { method: 'POST', body: { text, a, b } }),
    decrypt: (text, a, b) => request('/crypto/affine/decrypt', { method: 'POST', body: { text, a, b } }),
  },
  playfair: {
    encrypt: (text, key) => request('/crypto/playfair/encrypt', { method: 'POST', body: { text, key } }),
  },
  railfence: {
    encrypt: (text, rails) => request('/crypto/railfence/encrypt', { method: 'POST', body: { text, rails } }),
    decrypt: (text, rails) => request('/crypto/railfence/decrypt', { method: 'POST', body: { text, rails } }),
  },
  atbash: (text) => request('/crypto/atbash', { method: 'POST', body: { text } }),

  // ── Symmetric / AES ─────────────────────────────────────────────────
  aes: {
    round: (plaintext, key) => request('/crypto/aes/round', { method: 'POST', body: { plaintext, key } }),
  },
  modes: {
    simulate: (blocks, key, iv) => request('/crypto/modes/simulate', { method: 'POST', body: { blocks, key, iv } }),
  },

  // ── Asymmetric / RSA / DH ──────────────────────────────────────────
  rsa: {
    keys:    (p, q, e)              => request('/crypto/rsa/keys',    { method: 'POST', body: { p, q, e } }),
    encrypt: (text, e, n)           => request('/crypto/rsa/encrypt', { method: 'POST', body: { text, e, n } }),
    decrypt: (cipher_numbers, d, n) => request('/crypto/rsa/decrypt', { method: 'POST', body: { cipher_numbers, d, n } }),
  },
  dh: {
    simulate: (p, g, a, b) => request('/crypto/dh/simulate', { method: 'POST', body: { p, g, a, b } }),
  },

  // ── Hashing & Digital Signatures ───────────────────────────────────
  hash: {
    sha256:    (text)         => request('/crypto/hash/sha256',    { method: 'POST', body: { text } }),
    avalanche: (text1, text2) => request('/crypto/hash/avalanche', { method: 'POST', body: { text1, text2 } }),
  },
  signature: {
    simulate: (document, p, q, e) => request('/crypto/signature/simulate', { method: 'POST', body: { document, p, q, e } }),
  },
};


// ═══════════════════════════════════════════════════════════════════════
//  CTF Challenge API
// ═══════════════════════════════════════════════════════════════════════

export const ctfApi = {
  /** Fetch all 60 challenges (flags are stripped server-side). */
  getChallenges:       ()            => request('/ctf/challenges'),
  /** Fetch challenges filtered by tier (1 or 2). */
  getChallengesByTier: (tier)        => request(`/ctf/challenges/tier/${tier}`),
  /** Submit a flag for server-side validation. */
  validateFlag:        (id, flag)    => request('/ctf/validate', { method: 'POST', body: { challenge_id: id, flag } }),
};
