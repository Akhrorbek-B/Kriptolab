export const THEORY_TOPICS = [
  {
    id: "intro",
    title: "1. Kriptografiya Asoslari va Tarixi",
    badge: "Fundamental",
    description: "Kriptografiya fanining maqsadi, asosiy atamalar, Kerckhoffs tamoyili va axborot xavfsizligining uchligi (CIA Triad).",
    content: `
### Kriptografiya nima?
**Kriptografiya** (yunoncha *kryptos* - yashirin, *graphein* - yozish) — axborotning maxfiyligi, yaxlitligi, haqiqiyligi va inkor etib bo'lmasligini ta'minlash usullari haqidagi fan.

#### Axborot Xavfsizligining CIA Uchligi:
1. **Maxfiylik (Confidentiality):** Axborot faqat ruxsat etilgan shaxslargagina tushunarli bo'lishi.
2. **Yaxlitlik (Integrity):** Ma'lumot uzatish yoki saqlash jarayonida ruxsatsiz o'zgartirilmaganligiga ishonch.
3. **Mavjudlik / Haqiqiylik (Availability & Authenticity):** Axborot kerakli paytda qonuniy foydalanuvchiga taqdim etilishi va jo'natuvchi haqiqiyligini tasdiqlash.

#### Kriptotizimning Asosiy Komponentlari:
- **Ochiq matn (Plaintext - P):** Dastlabki, hamma tushunadigan ma'lumot.
- **Shifrmatn (Ciphertext - C):** Shifrlash algoritmi natijasida o'zgartirilgan, tushunarsiz matn.
- **Kalit (Key - K):** Shifrlash va deshifrlash jarayonini boshqaruvchi maxfiy parametr.
- **Shifrlash funktsiyasi:** C = E_K(P)
- **Deshifrlash funktsiyasi:** P = D_K(C)

#### Kerkxoffs (Kerckhoffs) Tamoyili (1883):
> *"Kriptotizimning xavfsizligi algoritmning maxfiyligiga emas, balki faqat va faqat KALITNING maxfiyligiga asoslanishi kerak."*
Zamonaviy kiberxavfsizlikda barcha algoritmlar (AES, RSA, SHA) ochiq va xalqaro miqyosda tahlil qilingan; faqat kalit maxfiy saqlanadi.
    `
  },
  {
    id: "classical",
    title: "2. Klassik Shifrlash Turlari",
    badge: "Tarixiy",
    description: "Monoalfavit, polialfavit almashtirish va o'rin almashtirish shifrlari.",
    content: `
### Klassik Shifrlash Usullari Tasnifi:
Klassik davrda shifrlash qo'lda yoki oddiy mexanik qurilmalarda bajarilgan. Ular asosan 2 turga bo'linadi:

#### 1. Almashtirish (Substitution) Shifrlari:
Harf yoki belgilar boshqa belgilar bilan almashtiriladi.
- **Monoalfavit (Bir alfavitli):** Har bir ochiq matn harfiga doimiy bitta shifr harfi mos keladi.
  - *Sezar shifri:* Harflar k pozitsiyaga davriy suriladi: C = (P + k) mod 26.
  - *Affin shifri:* Harf o'rni chiziqli funksiya bilan hisoblanadi: C = (a * P + b) mod 26, bu yerda gcd(a, 26) = 1.
  - *Atbash shifri:* Alfavit teskari tartibda akslantiriladi (A <-> Z, B <-> Y).
- **Polialfavit (Ko'p alfavitli):** Bitta harf turli o'rinlarda turli shifr harflariga aylanishi mumkin.
  - *Vigenère shifri:* Kalit so'z harflarining siljishi yordamida hosil qilinadi.
  - *Playfair shifri:* 5x5 matritsa asosida harflar juftligi (bigramma) bo'yicha almashtiriladi.
  - *Enigma mashinasi:* Elektromexanik aylanuvchi rotorlar polialfavit davrini bir necha o'n minglab belgilarga yetkazgan.

#### 2. O'rin Almashtirish (Transposition / Permutation) Shifrlari:
Harflarning o'zi o'zgarmaydi, lekin ularning joylashuv tartibi o'zgartiriladi.
- *Rail Fence (Temir yo'l to'sig'i):* Matn zigzag shaklida satrlarga yoziladi va qatorma-qator o'qiladi.
- *Ustunli (Columnar) Transpozitsiya:* Matn to'rtburchak jadvalga yozilib, ustunlar kalit so'z tartibida o'qib olinadi.
    `
  },
  {
    id: "symmetric",
    title: "3. Zamonaviy Simmetrik Shifrlash (AES va DES)",
    badge: "Blok Shifrlar",
    description: "Feistel tarmoqlari, SP-tarmoqlar, DES, 3DES va zamonaviy AES standarti tuzilishi.",
    content: `
### Simmetrik Shifrlash nima?
Shifrlash va deshifrlash uchun **bitta umumiy maxfiy kalit** ishlatiladigan tizim: P = D_K(E_K(P)).

#### Asosiy Afzalliklari va Muammosi:
- **Afzalligi:** Juda tez ishlaydi (sekundiga gigabaytlab ma'lumot shifrlay oladi).
- **Muammosi:** Kalitni xavfsiz yetkazish muammosi (Key Distribution Problem). N ta ishtirokchi uchun N*(N-1)/2 ta kalit kerak bo'ladi.

---

### DES (Data Encryption Standard)
- 1977-yilda qabul qilingan. Blok: 64 bit, Kalit: 56 bit.
- **Feistel tarmog'i:** Blok 2 ga bo'linadi (L_i, R_i) va 16 raund davomida:
  L_{i+1} = R_i,  R_{i+1} = L_i XOR F(R_i, K_i)
- **Zaifligi:** 56-bitli kalit bugungi kunda bir necha soatda to'liq qidiruv (brute-force) orqali buziladi.

---

### AES (Advanced Encryption Standard - Rijndael)
2001-yilda NIST tomonidan xalqaro standart sifatida tan olingan. SP-tarmoq (Substitution-Permutation Network) asosida qurilgan.
- Blok o'lchami qat'iy **128 bit** (16 bayt, 4x4 baytli State matritsasi).
- Kalit o'lchami: 128 bit (10 raund), 192 bit (12 raund), 256 bit (14 raund).

#### Har bir Raundning 4 ta Bosqichi:
1. **SubBytes (S-Box):** Galois maydoni GF(2^8) ustidagi nochiziqli teskarilash va affin o'zgartirish orqali har bir baytni almashtirish.
2. **ShiftRows:** State matritsasining 0-satrini 0 ga, 1-satrini 1 ga, 2-satrini 2 ga, 3-satrini 3 ga chapga siklik surish.
3. **MixColumns:** Har bir ustunni GF(2^8) ustida maxsus fiksirlangan matritsaga ko'paytirish (diffuziya hosil qiladi).
4. **AddRoundKey:** State matritsasini raund kaliti (Round Key) bilan bitma-bit XOR qilish.
    `
  },
  {
    id: "modes",
    title: "4. Blok Shifrlash Rejimlari (Modes of Operation)",
    badge: "Amaliyot",
    description: "ECB, CBC, CFB, OFB, CTR rejimlari va ECB ning mashhur xavfsizlik kamchiligi.",
    content: `
Katta hajmdagi matnlar bloklarga bo'linadi. Bu bloklar qanday ketma-ketlikda shifrlanishi rejimlar orqali belgilanadi:

#### 1. ECB (Electronic Codebook) - Eng oddiy va XAVFLI rejim:
- Har bir blok bir xil kalit bilan mustaqil shifrlanadi: C_i = E_K(P_i).
- **Kamchiligi:** Bir xil ochiq matn bloklari bir xil shifrmatn bloklarini hosil qiladi! Natijada ma'lumotning statistik strukturasi (masalan, rasm konturi) shifrlangan holatda ham ko'rinib qoladi (Tux penguin effekti).

#### 2. CBC (Cipher Block Chaining) - Zanjirli rejim:
- Har bir ochiq blok shifrlashdan oldin o'zidan oldingi shifrmatn bloki bilan XOR qilinadi: C_i = E_K(P_i XOR C_{i-1}), C_0 = IV.
- **IV (Initialization Vector):** Birinchi blok uchun tasodifiy boshlang'ich vektor. Naqshlarning takrorlanishini butunlay yo'qotadi.

#### 3. CTR (Counter Mode) - Hisoblagich rejimi:
- Blok shifrni oqimli (stream) shifrga aylantiradi. Hisoblagich qiymati shifrlanadi va ochiq matn bilan XOR qilinadi: C_i = P_i XOR E_K(Nonce || i).
- **Afzalligi:** To'liq parallellashtirish mumkin, hisoblash tezligi o'ta yuqori.
    `
  },
  {
    id: "asymmetric",
    title: "5. Asimmetrik Shifrlash (RSA, Diffie-Hellman, ECC)",
    badge: "Ochiq Kalit",
    description: "Ikki kalitli kriptografiya, bir tomonlama matematik funktsiyalar (Trapdoor one-way functions).",
    content: `
### Asimmetrik Kriptografiya Asosi:
1976-yilda Uitfild Diffi (Whitfield Diffie) va Martin Xellman (Martin Hellman) tomonidan asos solingan.
- **Ochiq kalit (Public Key - K_pub):** Hamma uchun ochiq, ma'lumotni shifrlash yoki imzoni tekshirish uchun xizmat qiladi.
- **Yopiq kalit (Private Key - K_priv):** Faqat egasiga ma'lum, ma'lumotni deshifrlash yoki raqamli imzo qo'yish uchun xizmat qiladi.

---

### RSA Algoritmi (Rivest, Shamir, Adleman - 1977)
Katta sonlarni tub ko'paytuvchilarga ajratish (faktoriizatsiya) masalasining qiyinligiga asoslangan.

#### Kalitlarni Generatsiya Qilish Bosqichlari:
1. Ikkita katta tub son tanlanadi: p va q.
2. Modul hisoblanadi: n = p * q.
3. Eyler funktsiyasi qiymati: phi(n) = (p - 1) * (q - 1).
4. Ochiq daraja e tanlanadi: 1 < e < phi(n) va gcd(e, phi(n)) = 1 (ko'pincha e = 65537).
5. Yopiq daraja d hisoblanadi: d * e = 1 mod phi(n).
- **Ochiq kalit:** (e, n)
- **Yopiq kalit:** (d, n)

#### Shifrlash va Deshifrlash:
- Shifrlash: c = (m ^ e) mod n
- Deshifrlash: m = (c ^ d) mod n

---

### Diffie-Hellman Kalit Almashinuvi
Ikkita tomon (Alisa va Bob) ochiq aloqa kanali orqali umumiy maxfiy kalit kelishib olish imkonini beradi.
- Matematik asosi: Diskret logarifm masalasi: A = (g ^ a) mod p, B = (g ^ b) mod p.
- Umumiy kalit: K = (B ^ a) mod p = (A ^ b) mod p = (g ^ (a*b)) mod p.
    `
  },
  {
    id: "hashing",
    title: "6. Kriptografik Xesh-Funksiyalar va Raqamli Imzo",
    badge: "Yaxlitlik",
    description: "MD5, SHA oilasi, ko'chki effekti (Avalanche effect), kolliziyaga chidamlilik va raqamli imzo.",
    content: `
### Kriptografik Xesh-Funktsiya nima?
Ixtiyoriy uzunlikdagi kirish ma'lumotini qat'iy fiksirlangan uzunlikdagi bitlar ketma-ketligiga aylantiruvchi bir tomonlama matematik funktsiya: h = H(M).

#### Kriptografik Xesh-Funktsiyalarga Qo'yiladigan 3 Asosiy Talab:
1. **Birlamchi obrazga chidamlilik (Pre-image resistance):** Berilgan h qiymatdan H(m) = h bo'ladigan m ni topish amalda imkonsiz bo'lishi kerak.
2. **Ikkilamchi obrazga chidamlilik (Second pre-image resistance):** Berilgan m_1 uchun H(m_1) = H(m_2) bo'ladigan boshqa m_2 ni topish imkonsiz bo'lishi kerak.
3. **Kolliziyaga chidamlilik (Collision resistance):** H(m_1) = H(m_2) bo'ladigan ixtiyoriy ikkita turli m_1 != m_2 juftlikni topish hisoblash jihatidan imkonsiz bo'lishi kerak.

#### Ko'chki Effekti (Avalanche Effect):
Kiruvchi matndagi bitta bit (yoki harf) o'zgarganda, natijaviy xesh qiymatining kamida **50% bitlari** tasodifiy tarzda o'zgarishi shart! Bu xususiyat shifrning tahlilga chidamliligini ta'minlaydi.

#### Raqamli Imzo (Digital Signature):
Hujjatning xeshidan muallifning **yopiq kaliti** bilan shifrlangan qiymat hosil qilinadi:
S = Sign(K_priv, H(M))
Qabul qiluvchi esa muallifning **ochiq kaliti** yordamida imzoni tekshiradi:
Verify(K_pub, S, H(M)) -> To'g'ri / Soxta
    `
  },
  {
    id: "labguide",
    title: "7. Oliy Ta'lim Laboratoriya Ishi Namunaviy Metodikasi",
    badge: "Metodika",
    description: "Oliy ta'lim standartlari bo'yicha talabalar uchun laboratoriya ishi topshiriqlari va hisobot talablari.",
    content: `
### Laboratoriya Ishi Mavzusi:
**"Klassik va zamonaviy kriptografik algoritmlarni tadqiq qilish va dasturiy tahlil qilish"**

#### Ishning Maqsadi:
1. Sezar, Vigenère va Affin shifrlash algoritmlarini matematik modellashtirish.
2. Chastotaviy tahlil usuli yordamida shifrmatndan ochiq matnni tiklash ko'nikmasini shakllantirish.
3. RSA ochiq kalitli tizimida kalitlar juftligini hisoblash va xabarlarni shifrlash jarayonini o'rganish.
4. Xesh-funksiyalarda ko'chki effektini eksperimental o'lchash.

#### Talabaga Topshiriq Variantlari:
- **Variant 1:** Berilgan matnni Affin shifrida a=7, b=11 kalitlari bilan shifrlang. Deshifrlash formulasini keltirib chiqaring (a^(-1) mod 26 ni Yevklid algoritmi bilan toping).
- **Variant 2:** RSA tizimida p=61, q=53, e=17 parametrlar uchun n, phi(n) va maxfiy d kalitini hisoblang. m = 65 sonini shifrlang va qayta tiklang.
- **Variant 3:** 100 ta belgidan iborat matn va uning 1 ta belgisi o'zgargan nusxasi uchun SHA-256 xeshini oling. O'zgargan bitlar soni va foizini hisoblab, ko'chki effekti mezoniga baho bering.

#### Hisobot Tarkibi:
1. Titul varag'i (OTM, Kafedra, Talaba F.I.Sh., Guruh).
2. Ishning nazariy qismi va matematik hisoblashlar.
3. KriptoLab platformasida olingan tajriba natijalari (skrinshotlar va jadvallar).
4. Xulosa va xavfsizlik tahlili.
    `
  }
];
