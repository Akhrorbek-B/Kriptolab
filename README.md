# KriptoLab — Kriptografiyani 0 dan o'rganing

KriptoLab — kriptografiyani **hech qanday oldindan bilimsiz** boshlab, professional darajagacha o'rgatadigan o'zbek tilidagi interaktiv platforma.

## Nimalar bor

| Bo'lim | Tavsif |
|---|---|
| 🎓 **O'quv kursi** (`#/course`) | 7 modul, 30 ta ketma-ket dars (~5 soat). Har bir dars: o'quv maqsadlari → nazariya → qo'lda yechilgan misol → laboratoriyaga havola → izohli tekshiruv savollari. Progress brauzerda saqlanadi. |
| 🔐 **Klassik shifrlar** | Sezar, Vigenère, Affin, Playfair, Rail Fence, Enigma simulyatorlari |
| ⚙️ **Zamonaviy AES** | AES raundlari vizualizatsiyasi, ECB vs CBC (Tux paradoksi) |
| 🔑 **Asimmetrik** | RSA kalkulyatori, Diffie-Hellman, elliptik egri chiziqlar |
| #️⃣ **Xesh va imzo** | SHA-256 ko'chki effekti, raqamli imzo |
| 🧰 **Qurollar** | Chastotaviy tahlil, Bin/Hex/Base64 konverter |
| 🏆 **Viktorina va CTF** | Bilimni sinash va 60 ta CTF topshirig'i |
| 📖 **Darslik** | Akademik nazariy qo'llanma va laboratoriya hisobot namunasi |

### Kurs dasturi

1. **Kirish** — kriptografiya maqsadlari, Kerkxoffs tamoyili, hujum modellari
2. **Matematik poydevor** — bit/hex/Base64, XOR, modulli arifmetika, EKUB va modulli teskari, tub sonlar
3. **Klassik shifrlar** — Sezar, Affin, chastotaviy tahlil, Vigenère, Playfair va transpozitsiya, Enigma
4. **Simmetrik shifrlash** — bir martalik bloknot, DES/Feistel, AES, shifrlash rejimlari, AEAD (AES-GCM)
5. **Xesh-funksiyalar** — SHA-256, HMAC, parollarni saqlash (Argon2id)
6. **Ochiq kalitli kriptografiya** — Diffie-Hellman, RSA, raqamli imzo, ECC
7. **Real dunyo** — TLS 1.3, tipik xatolar, kvantdan keyingi kriptografiya

Darslar matni `src/data/courseData.js` faylida — yangi dars qo'shish uchun shu faylga obyekt qo'shish kifoya.

## Ishga tushirish

Frontend (Node.js 20+):

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ papkasiga production build
npm run lint
```

Frontend backend'siz to'liq ishlaydi. Ixtiyoriy FastAPI backend (Python 3.10+):

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload   # http://localhost:8000/docs
```

## Texnik tafsilotlar

- **React 19 + Vite + Tailwind CSS 4**
- Hash-routing (`#/course/rsa`, `#/classical/vigenere`) — har bir dars va simulyatorga to'g'ridan-to'g'ri havola berish mumkin, statik hostingda (GitHub Pages, Netlify, Vercel) sozlamasiz ishlaydi.
- Bo'limlar `React.lazy` bilan alohida yuklanadi — birinchi ochilish tezroq.
- Kurs progressi `localStorage` da saqlanadi (ro'yxatdan o'tish talab qilinmaydi).
