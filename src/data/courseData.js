/**
 * KriptoLab — "Kriptografiya 0 dan" o'quv kursi
 * ==============================================
 * Har bir modul bir nechta darsdan iborat. Darslar qat'iy ketma-ketlikda
 * tuzilgan: har bir dars faqat oldingi darslarda o'tilgan tushunchalarga tayanadi.
 *
 * Dars tuzilishi:
 *  - id         : URL'da ishlatiladigan noyob identifikator (#/course/<id>)
 *  - title      : dars nomi
 *  - minutes    : taxminiy o'qish vaqti
 *  - goals      : dars oxirida talaba nimani bilishi kerak
 *  - content    : Markdown (##, ###, ro'yxatlar, **qalin**, `kod`, ```blok```, > eslatma, jadvallar)
 *  - practice   : laboratoriyadagi mos simulyator { tab, sub, label }
 *  - check      : o'zini tekshirish savollari { q, options, answer, explain }
 */

export const COURSE_MODULES = [
  // ════════════════════════════════════════════════════════════════════
  {
    id: 'm1',
    title: 'Kirish: Kriptografiya nima?',
    level: "Boshlang'ich",
    color: 'cyan',
    summary: "Fanning maqsadi, asosiy atamalar va kriptotizim qanday ishlashi haqida umumiy tasavvur.",
    lessons: [
      {
        id: 'what-is-crypto',
        title: 'Kriptografiya nima va u nega kerak?',
        minutes: 8,
        goals: [
          "Kriptografiya qaysi muammolarni hal qilishini tushuntira olish",
          "Maxfiylik, yaxlitlik, autentifikatsiya va inkor etmaslikni farqlash",
          "Kundalik hayotda kriptografiya qayerda ishlatilishini bilish",
        ],
        content: `
## Kriptografiya — bu nima?

**Kriptografiya** (yunoncha *kryptós* — yashirin, *gráphein* — yozish) — ma'lumotni dushman muhitda himoya qilish usullari haqidagi fan. "Dushman muhit" deganda internet, Wi-Fi tarmog'i, pochta yoki ma'lumot saqlanadigan disk tushuniladi — ya'ni begona odam ko'rishi yoki o'zgartirishi mumkin bo'lgan har qanday joy.

Siz har kuni kriptografiyadan foydalanasiz, garchi buni sezmasangiz ham:

- Brauzerdagi qulf belgisi (**HTTPS**) — saytga yuborgan parolingiz yo'lda o'qilmaydi.
- Telegram yoki WhatsApp xabarlari — **end-to-end shifrlash**.
- Bank kartasi chipi va onlayn to'lovlar.
- Telefonni barmoq izi bilan ochish va disk shifrlash.
- Dastur yangilanishlari — ular **raqamli imzo** bilan tekshiriladi.

## Kriptografiyaning to'rt maqsadi

| Maqsad | Savol | Misol |
|---|---|---|
| **Maxfiylik** (Confidentiality) | Buni kim o'qiy oladi? | Faqat qabul qiluvchi xabarni o'qiy oladi |
| **Yaxlitlik** (Integrity) | Ma'lumot o'zgarmadimi? | Yuklab olingan fayl buzilmaganini tekshirish |
| **Autentifikatsiya** (Authentication) | Bu haqiqatan kimdan? | Sayt haqiqatan bankniki ekanini bilish |
| **Inkor etmaslik** (Non-repudiation) | Muallif tonib keta oladimi? | Elektron imzo qo'yilgan shartnoma |

Kursda har bir maqsad uchun alohida vosita o'rganamiz: maxfiylik uchun **shifrlash**, yaxlitlik uchun **xesh va MAC**, autentifikatsiya va inkor etmaslik uchun **raqamli imzo**.

> 💡 Kriptografiya — xavfsizlikning faqat bir qismi. Eng kuchli shifr ham zaif parol, virusli kompyuter yoki aldangan foydalanuvchini himoya qila olmaydi.

## Kriptologiya = Kriptografiya + Kriptotahlil

- **Kriptografiya** — himoya usullarini yaratish.
- **Kriptotahlil** (cryptanalysis) — bu usullarni buzish yo'llarini izlash.

Ikkalasi bir-birisiz rivojlanmaydi: har bir yangi shifr hujumlarga bardosh berib, o'zini isbotlaganidan keyingina ishonchli hisoblanadi. Shuning uchun kursda har bir shifrni nafaqat ishlatamiz, balki **buzishni ham** o'rganamiz.
`,
        check: [
          {
            q: "Yuklab olingan dastur fayli yo'lda o'zgartirilmaganini tekshirish kriptografiyaning qaysi maqsadiga kiradi?",
            options: ['Maxfiylik', 'Yaxlitlik', 'Mavjudlik', 'Anonimlik'],
            answer: 1,
            explain: "Yaxlitlik — ma'lumot ruxsatsiz o'zgartirilmaganiga ishonch hosil qilish. Buning uchun xesh-funksiyalar va MAC ishlatiladi.",
          },
          {
            q: 'Shifrlarni buzish usullarini o\'rganadigan soha qanday ataladi?',
            options: ['Steganografiya', 'Kriptografiya', 'Kriptotahlil', 'Kodlash nazariyasi'],
            answer: 2,
            explain: "Kriptotahlil (cryptanalysis) — shifrlarning zaif tomonlarini topish va ularni buzish fani.",
          },
        ],
      },
      {
        id: 'crypto-model',
        title: 'Kriptotizim modeli: Alisa, Bob va Momo',
        minutes: 10,
        goals: [
          "Ochiq matn, shifrmatn, kalit va algoritm tushunchalarini bilish",
          "Kerkxoffs tamoyilini tushuntira olish",
          "Hujumchi modellarini (faqat shifrmatn, ma'lum ochiq matn, tanlangan ochiq matn) farqlash",
        ],
        content: `
## Asosiy qahramonlar

Kriptografiyada an'anaviy ravishda quyidagi nomlar ishlatiladi:

- **Alisa (Alice)** — xabar yuboruvchi.
- **Bob** — xabarni qabul qiluvchi.
- **Momo (Eve, eavesdropper)** — kanalni tinglaydigan passiv hujumchi.
- **Mallori (Mallory)** — xabarlarni o'zgartira oladigan faol hujumchi.

## Asosiy atamalar

- **Ochiq matn** (plaintext, \`P\`) — asl, tushunarli xabar.
- **Shifrmatn** (ciphertext, \`C\`) — shifrlangandan keyingi tushunarsiz ko'rinish.
- **Kalit** (key, \`K\`) — shifrlash jarayonini boshqaruvchi maxfiy parametr.
- **Shifrlash** — \`C = E(K, P)\`
- **Deshifrlash** — \`P = D(K, C)\`

To'g'ri kriptotizim uchun har doim \`D(K, E(K, P)) = P\` bajarilishi kerak.

\`\`\`
  Alisa                                        Bob
  P ──► [ E(K, ·) ] ──► C ───── kanal ─────► [ D(K, ·) ] ──► P
                              ▲
                              │ Momo C ni ko'radi,
                              │ lekin K ni bilmaydi
\`\`\`

## Kerkxoffs tamoyili (1883)

> Kriptotizim xavfsizligi algoritmning sir saqlanishiga emas, faqat **kalitning maxfiyligiga** bog'liq bo'lishi kerak.

Nega bu muhim?

1. Algoritmni yashirish qiyin: dastur teskari tahlil qilinadi, qurilma o'g'irlanadi, xodim ishdan ketadi.
2. Kalitni almashtirish oson, algoritmni almashtirish esa juda qimmat.
3. Ochiq algoritmlarni butun dunyo mutaxassislari yillar davomida tekshiradi — shuning uchun ularga ishonish mumkin.

Bugungi barcha standart algoritmlar — **AES, RSA, SHA-256, ChaCha20** — to'liq ochiq. Maxfiy faqat kalit.

## Hujumchi nimani biladi? (Hujum modellari)

| Model | Hujumchida nima bor |
|---|---|
| **Faqat shifrmatn** (ciphertext-only) | Faqat \`C\` lar to'plami |
| **Ma'lum ochiq matn** (known-plaintext) | Bir nechta \`(P, C)\` juftliklari |
| **Tanlangan ochiq matn** (chosen-plaintext) | O'zi tanlagan \`P\` ni shifrlatib, \`C\` ni ko'ra oladi |
| **Tanlangan shifrmatn** (chosen-ciphertext) | O'zi tanlagan \`C\` ni deshifrlatib ko'ra oladi |

Zamonaviy shifrlar eng kuchli modelda ham xavfsiz bo'lishi talab qilinadi. Klassik shifrlar esa ko'pincha eng zaif modelda — faqat shifrmatn bilan ham buziladi.

## Kalit maydoni

**Kalit maydoni** — mumkin bo'lgan barcha kalitlar soni. Agar kalit \`n\` bit bo'lsa, kalitlar soni \`2^n\`. **To'liq qidiruv** (brute force) hujumi barcha kalitlarni birma-bir sinab ko'radi.

- 56 bit (DES): \`2^56 ≈ 7·10^16\` — 1998-yilda maxsus qurilma 56 soatda buzgan.
- 128 bit (AES-128): \`2^128 ≈ 3,4·10^38\` — Yer yuzidagi barcha kompyuterlar koinot yoshidan ham uzoqroq vaqtda ham tugata olmaydi.

> ⚠️ Katta kalit maydoni — zarur, lekin yetarli shart emas. Keyingi modulda 4·10^26 kalitli shifrni bir necha daqiqada buzamiz.
`,
        check: [
          {
            q: 'Kerkxoffs tamoyiliga ko\'ra nima sir saqlanishi kerak?',
            options: ['Algoritm', 'Faqat kalit', 'Ochiq matn uzunligi', 'Dastur kodi'],
            answer: 1,
            explain: "Algoritm ochiq bo'lishi mumkin va kerak; xavfsizlik faqat kalitning maxfiyligiga tayanadi.",
          },
          {
            q: '128 bitli kalit uchun nechta mumkin bo\'lgan kalit bor?',
            options: ['128', '128²', '2^128', '10^128'],
            answer: 2,
            explain: "Har bir bit 2 xil qiymat oladi, shuning uchun n bitli kalitlar soni 2^n.",
          },
          {
            q: 'Hujumchi o\'zi tanlagan matnlarni shifrlatib natijani ko\'ra olsa, bu qaysi hujum modeli?',
            options: ['Faqat shifrmatn', "Ma'lum ochiq matn", 'Tanlangan ochiq matn', 'Brute force'],
            answer: 2,
            explain: "Chosen-plaintext attack (CPA) — hujumchi ixtiyoriy ochiq matnlarning shifrini ola oladi.",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  {
    id: 'm2',
    title: 'Matematik poydevor',
    level: "Boshlang'ich",
    color: 'indigo',
    summary: "Bitlar, XOR, modulli arifmetika, EKUB va tub sonlar — butun kurs shu asosga quriladi.",
    lessons: [
      {
        id: 'bits-encoding',
        title: 'Bit, bayt, Hex va Base64',
        minutes: 10,
        goals: [
          "Matn kompyuterda qanday sonlarga aylanishini tushunish",
          "Ikkilik, o'n oltilik (hex) va Base64 ko'rinishlarni o'qiy olish",
          "Kodlash (encoding) va shifrlash (encryption) farqini bilish",
        ],
        content: `
## Hamma narsa — sonlar

Kompyuter faqat **bitlar** (0 yoki 1) bilan ishlaydi. 8 bit = 1 **bayt**, u 0 dan 255 gacha qiymat oladi.

Matn harflari jadval orqali sonlarga aylantiriladi. **ASCII / UTF-8** da:

| Belgi | O'nlik | Ikkilik | Hex |
|---|---|---|---|
| \`A\` | 65 | 01000001 | 41 |
| \`B\` | 66 | 01000010 | 42 |
| \`a\` | 97 | 01100001 | 61 |
| \`0\` | 48 | 00110000 | 30 |

## Hex (o'n oltilik sanoq tizimi)

Bir bayt = 8 bit = aynan 2 ta hex raqam (\`0-9\`, \`a-f\`). Shuning uchun kalitlar va xeshlar odatda hex ko'rinishida yoziladi:

\`\`\`
"Hi"  →  baytlar: 72, 105  →  hex: 48 69
AES-128 kaliti (16 bayt) → 32 ta hex belgi:
2b7e151628aed2a6abf7158809cf4f3c
\`\`\`

## Base64

Ikkilik ma'lumotni faqat matn qabul qiladigan joyga (email, JSON, URL) joylash uchun ishlatiladi. Har **3 bayt** (24 bit) **4 ta belgiga** (har biri 6 bit) aylanadi. Alifbo: \`A-Z a-z 0-9 + /\`, to'ldirish belgisi — \`=\`.

\`\`\`
"Man" → TWFu
"Hi"  → SGk=
\`\`\`

## ⚠️ Kodlash ≠ Shifrlash

Bu eng ko'p uchraydigan xatolardan biri:

- **Kodlash** (hex, Base64) — ma'lumot ko'rinishini o'zgartirish. **Kalit yo'q**, istalgan odam orqaga qaytaradi.
- **Shifrlash** — maxfiylikni ta'minlash. Kalitsiz orqaga qaytarib **bo'lmaydi**.

> 💡 Agar kimdir parolni "Base64 bilan himoyaladik" desa — bu himoya emas. CTF musobaqalarida Base64 eng birinchi tekshiriladigan narsa.
`,
        practice: { tab: 'tools', sub: 'converter', label: 'Bin/Hex/Base64 konverterini sinab ko\'ring' },
        check: [
          {
            q: '1 bayt nechta hex belgi bilan yoziladi?',
            options: ['1', '2', '4', '8'],
            answer: 1,
            explain: "1 hex belgi = 4 bit, demak 8 bitli bayt uchun 2 ta hex belgi kerak.",
          },
          {
            q: 'Base64 haqida qaysi gap to\'g\'ri?',
            options: [
              'Base64 — kuchli shifrlash algoritmi',
              'Base64 ni ochish uchun maxfiy kalit kerak',
              'Base64 — kodlash; kalitsiz istalgan odam qaytara oladi',
              'Base64 ma\'lumot hajmini kamaytiradi',
            ],
            answer: 2,
            explain: "Base64 hech qanday maxfiylik bermaydi; aksincha, hajmni taxminan 33% ga oshiradi.",
          },
        ],
      },
      {
        id: 'xor',
        title: 'XOR — kriptografiyaning sevimli amali',
        minutes: 8,
        goals: [
          "XOR jadvalini va asosiy xossalarini bilish",
          "XOR nima uchun shifrlashda bunchalik ko'p ishlatilishini tushunish",
        ],
        content: `
## XOR (istisno qiluvchi YOKI, ⊕)

Ikki bit **har xil** bo'lsa natija 1, **bir xil** bo'lsa 0:

| a | b | a ⊕ b |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Baytlar bit-bitma XOR qilinadi:

\`\`\`
  1010 1100
⊕ 0110 1010
= 1100 0110
\`\`\`

## Sehrli xossalar

1. \`A ⊕ 0 = A\` — nol bilan XOR o'zgartirmaydi.
2. \`A ⊕ A = 0\` — o'zi bilan XOR nolga teng.
3. \`A ⊕ B = B ⊕ A\` va \`(A ⊕ B) ⊕ C = A ⊕ (B ⊕ C)\`.

Bulardan eng muhim natija kelib chiqadi:

\`\`\`
C = P ⊕ K      (shifrlash)
C ⊕ K = P ⊕ K ⊕ K = P ⊕ 0 = P      (deshifrlash)
\`\`\`

Ya'ni **shifrlash va deshifrlash — bitta amal**. Shuning uchun XOR oqim shifrlari, AES ning AddRoundKey qadami va CTR rejimining asosida yotadi.

## Nima uchun AND yoki OR emas?

Agar \`K\` tasodifiy bo'lsa, \`P ⊕ K\` ham **mutlaqo tasodifiy** ko'rinadi: natijaning har bir biti 50/50 ehtimol bilan 0 yoki 1. AND esa 75% hollarda 0 beradi va ochiq matn haqida ma'lumot sizdiradi.

## Ehtiyot bo'ling: kalitni qayta ishlatish

Agar bitta kalit ikki xabarga ishlatilsa:

\`\`\`
C1 ⊕ C2 = (P1 ⊕ K) ⊕ (P2 ⊕ K) = P1 ⊕ P2
\`\`\`

Kalit yo'qoladi va hujumchi ikki ochiq matnning XOR'ini oladi — bundan ko'pincha ikkala matnni tiklash mumkin. Bu xato tarixda ko'p marta takrorlangan (masalan, Sovet shifrlarini ochgan VENONA loyihasi).
`,
        practice: { tab: 'tools', sub: 'converter', label: 'Baytlarni ikkilik ko\'rinishda ko\'rish' },
        check: [
          {
            q: '1011 ⊕ 1101 = ?',
            options: ['0110', '1111', '1001', '0010'],
            answer: 0,
            explain: "Bitma-bit: 1⊕1=0, 0⊕1=1, 1⊕0=1, 1⊕1=0 → 0110.",
          },
          {
            q: 'Bitta XOR kaliti ikki xabarda ishlatilsa, C1 ⊕ C2 nimaga teng?',
            options: ['K', 'P1 ⊕ P2', '0', 'P1 ⊕ K'],
            answer: 1,
            explain: "Kalit o'zi bilan XOR qilinib yo'qoladi: C1 ⊕ C2 = P1 ⊕ P2.",
          },
        ],
      },
      {
        id: 'modular',
        title: 'Modulli arifmetika',
        minutes: 10,
        goals: [
          "a mod n ni hisoblay olish",
          "Modul bo'yicha qo'shish va ko'paytirishni bajarish",
          "Taqqoslama (≡) belgisini o'qiy olish",
        ],
        content: `
## Soat arifmetikasi

Soat 10:00 da 5 soat qo'shsak, 15:00 emas, **3:00** bo'ladi. Bu — **12 modul bo'yicha** qo'shish:

\`\`\`
10 + 5 = 15 ≡ 3  (mod 12)
\`\`\`

\`a mod n\` — \`a\` ni \`n\` ga bo'lgandagi **qoldiq**. U har doim \`0\` dan \`n−1\` gacha:

\`\`\`
17 mod 5  = 2      (17 = 3·5 + 2)
26 mod 26 = 0
-3 mod 26 = 23     (manfiy sonda n qo'shib olamiz)
\`\`\`

## Taqqoslama

\`a ≡ b (mod n)\` — "a va b ning n ga bo'lgandagi qoldiqlari teng" degani. Masalan, \`3 ≡ 15 ≡ 27 (mod 12)\`.

## Amallar

Modul bo'yicha qo'shish, ayirish va ko'paytirishda oraliq natijalarni istalgan payt qisqartirish mumkin:

\`\`\`
(a + b) mod n = ((a mod n) + (b mod n)) mod n
(a · b) mod n = ((a mod n) · (b mod n)) mod n
\`\`\`

Masalan, \`(123 · 456) mod 10\` = \`(3 · 6) mod 10\` = \`8\`.

## Alfavit — bu mod 26

Harflarni sonlarga aylantiramiz: \`A=0, B=1, …, Z=25\`. Endi harfni surish — oddiy modulli qo'shish:

\`\`\`
X (23) + 3 = 26 ≡ 0 → A
\`\`\`

Bu aynan keyingi modulda o'rganiladigan **Sezar shifri**.

## Bo'lish-chi?

Modulli arifmetikada oddiy bo'lish yo'q. Uning o'rniga **teskari element**ga ko'paytiramiz: \`a · a⁻¹ ≡ 1 (mod n)\`. Teskari element har doim ham mavjud emas — buni keyingi darsda ko'ramiz.

> 💡 RSA, Diffie-Hellman, ECC va AES — barchasi qaysidir ma'noda modulli arifmetika ustiga qurilgan.
`,
        check: [
          {
            q: '38 mod 7 = ?',
            options: ['3', '5', '4', '6'],
            answer: 0,
            explain: "38 = 5·7 + 3, qoldiq 3.",
          },
          {
            q: "A=0 deb hisoblasak, Y (24) harfini 5 ga mod 26 bo'yicha sursak qaysi harf chiqadi?",
            options: ['B', 'C', 'D', 'Z'],
            answer: 2,
            explain: "24 + 5 = 29 ≡ 3 (mod 26) → D.",
          },
        ],
      },
      {
        id: 'gcd-inverse',
        title: 'EKUB, Evklid algoritmi va modulli teskari',
        minutes: 12,
        goals: [
          "Evklid algoritmi bilan EKUB ni topish",
          "Modulli teskari qachon mavjudligini bilish",
          "Kengaytirilgan Evklid algoritmi bilan teskarini hisoblash",
        ],
        content: `
## EKUB (gcd)

**EKUB(a, b)** — \`a\` va \`b\` ni bo'ladigan eng katta son. Agar \`EKUB(a, b) = 1\` bo'lsa, \`a\` va \`b\` **o'zaro tub** deyiladi.

## Evklid algoritmi (miloddan avvalgi ~300-yil)

G'oya: \`EKUB(a, b) = EKUB(b, a mod b)\`. Qoldiq nolga teng bo'lguncha takrorlaymiz:

\`\`\`
EKUB(48, 18):
48 = 2·18 + 12
18 = 1·12 + 6
12 = 2·6  + 0   →  EKUB = 6
\`\`\`

Algoritm juda tez: hatto 600 xonali sonlar uchun ham bir necha ming qadamda tugaydi.

## Modulli teskari

\`a⁻¹\` — shunday son-ki, \`a · a⁻¹ ≡ 1 (mod n)\`.

\`\`\`
3 · 4 = 12 ≡ 1 (mod 11)   →   3⁻¹ = 4 (mod 11)
\`\`\`

**Asosiy teorema:** \`a\` ning \`n\` bo'yicha teskarisi **faqat va faqat** \`EKUB(a, n) = 1\` bo'lganda mavjud.

Masalan, mod 26 da \`2\` ning teskarisi yo'q (\`EKUB(2, 26) = 2\`), \`7\` niki esa bor.

## Kengaytirilgan Evklid algoritmi

Evklid qadamlarini orqaga qaytarib, \`a·x + n·y = 1\` tenglikni topamiz; shunda \`x = a⁻¹ (mod n)\`.

\`\`\`
7 ning mod 26 bo'yicha teskarisi:
26 = 3·7 + 5
 7 = 1·5 + 2
 5 = 2·2 + 1
Orqaga:
1 = 5 − 2·2
  = 5 − 2·(7 − 5) = 3·5 − 2·7
  = 3·(26 − 3·7) − 2·7 = 3·26 − 11·7
Demak −11·7 ≡ 1 (mod 26), ya'ni 7⁻¹ = −11 ≡ 15
Tekshiruv: 7 · 15 = 105 = 4·26 + 1 ✓
\`\`\`

## Bu nima uchun kerak?

- **Affin shifri:** \`a\` kaliti deshifrlanishi uchun \`EKUB(a, 26) = 1\` bo'lishi shart.
- **RSA:** maxfiy kalit \`d = e⁻¹ mod φ(n)\` aynan shu algoritm bilan hisoblanadi.
`,
        check: [
          {
            q: 'EKUB(84, 36) = ?',
            options: ['6', '12', '4', '18'],
            answer: 1,
            explain: "84 = 2·36 + 12; 36 = 3·12 + 0 → EKUB = 12.",
          },
          {
            q: 'Quyidagilardan qaysi birining mod 26 bo\'yicha teskarisi MAVJUD EMAS?',
            options: ['5', '7', '13', '25'],
            answer: 2,
            explain: "EKUB(13, 26) = 13 ≠ 1, shuning uchun 13 ning teskarisi yo'q.",
          },
          {
            q: '5 ning mod 26 bo\'yicha teskarisi qaysi?',
            options: ['5', '21', '11', '15'],
            answer: 1,
            explain: "5 · 21 = 105 = 4·26 + 1 ≡ 1 (mod 26).",
          },
        ],
      },
      {
        id: 'primes-power',
        title: 'Tub sonlar va modulli darajaga ko\'tarish',
        minutes: 12,
        goals: [
          "Tub son va faktorlash masalasining qiyinligini tushunish",
          "Eyler funksiyasi φ(n) ni hisoblash",
          "Tez darajaga ko'tarish (square-and-multiply) algoritmini bilish",
          "\"Bir tomonlama funksiya\" g'oyasini tushunish",
        ],
        content: `
## Tub sonlar

**Tub son** — faqat 1 ga va o'ziga bo'linadigan, 1 dan katta son: 2, 3, 5, 7, 11, 13, …

Har qanday butun son tub ko'paytuvchilarga yagona tarzda yoyiladi: \`3233 = 53 · 61\`.

## Qiyin masala: faktorlash

- Ikki tub sonni **ko'paytirish** — oson: \`61 · 53 = 3233\`.
- Ko'paytmadan tub sonlarni **topish** — juda qiyin, agar sonlar katta bo'lsa.

617 xonali (2048 bit) sonni bugungi eng kuchli kompyuterlar ham amalda faktorlay olmaydi. **RSA xavfsizligi aynan shunga tayanadi.**

## Eyler funksiyasi φ(n)

\`φ(n)\` — \`1..n\` oralig'ida \`n\` bilan o'zaro tub sonlar soni.

- \`p\` tub bo'lsa: \`φ(p) = p − 1\`
- \`p, q\` tub bo'lsa: \`φ(p·q) = (p − 1)(q − 1)\`

\`\`\`
φ(3233) = φ(53·61) = 52 · 60 = 3120
\`\`\`

\`n\` ning faktorlarini bilmasdan \`φ(n)\` ni topish faktorlash kabi qiyin.

## Eyler teoremasi

Agar \`EKUB(a, n) = 1\` bo'lsa: \`a^φ(n) ≡ 1 (mod n)\`. Xususiy holi — **Fermaning kichik teoremasi**: \`p\` tub bo'lsa, \`a^(p−1) ≡ 1 (mod p)\`. RSA nima uchun ishlashini aynan shu teorema isbotlaydi.

## Tez darajaga ko'tarish

\`3^13 mod 7\` ni 13 marta ko'paytirmasdan hisoblaymiz. \`13 = 8 + 4 + 1\`:

\`\`\`
3^1 ≡ 3
3^2 ≡ 9  ≡ 2
3^4 ≡ 2² ≡ 4
3^8 ≡ 4² ≡ 16 ≡ 2      (mod 7)
3^13 = 3^8 · 3^4 · 3^1 ≡ 2 · 4 · 3 = 24 ≡ 3 (mod 7)
\`\`\`

2048 bitli daraja uchun ~2048 ta kvadratlash yetarli — bir necha millisekund.

## Bir tomonlama funksiyalar

| Oson yo'nalish | Qiyin teskari yo'nalish | Ishlatilishi |
|---|---|---|
| \`p · q = n\` | \`n\` dan \`p, q\` ni topish (faktorlash) | RSA |
| \`g^x mod p\` | \`x\` ni topish (diskret logarifm) | Diffie-Hellman, DSA |
| \`k · G\` (egri chiziqda) | \`k\` ni topish (ECDLP) | ECC |

Ochiq kalitli kriptografiyaning barchasi shu "oson—qiyin" assimetriyasiga qurilgan.
`,
        check: [
          {
            q: 'p = 11, q = 13 bo\'lsa φ(p·q) = ?',
            options: ['143', '120', '132', '24'],
            answer: 1,
            explain: "φ = (11−1)(13−1) = 10 · 12 = 120.",
          },
          {
            q: 'RSA xavfsizligi qaysi masalaning qiyinligiga asoslanadi?',
            options: ['Ikki sonni ko\'paytirish', 'Katta sonni tub ko\'paytuvchilarga ajratish', 'EKUB ni topish', 'Tub sonni tekshirish'],
            answer: 1,
            explain: "Ko'paytirish oson, ammo n = p·q dan p va q ni topish (faktorlash) katta sonlar uchun amalda imkonsiz.",
          },
          {
            q: '2^10 mod 11 = ? (Fermaning kichik teoremasidan foydalaning)',
            options: ['0', '1', '2', '10'],
            answer: 1,
            explain: "11 tub va EKUB(2,11)=1, demak 2^(11−1) ≡ 1 (mod 11).",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  {
    id: 'm3',
    title: 'Klassik shifrlar va ularni buzish',
    level: "Boshlang'ich",
    color: 'amber',
    summary: "Sezardan Enigmagacha: shifrlash g'oyalari qanday paydo bo'lgani va nega ular yiqilgani.",
    lessons: [
      {
        id: 'caesar',
        title: 'Sezar shifri va to\'liq qidiruv',
        minutes: 8,
        goals: [
          "Sezar shifrida shifrlash va deshifrlashni bajarish",
          "Kichik kalit maydoni nima uchun halokatli ekanini tushunish",
        ],
        content: `
## Sezar shifri

Yuliy Sezar harbiy xabarlarda har bir harfni alfavitda **3 pozitsiya** oldinga surgan. Umumiy holda siljish \`k\` — kalit:

\`\`\`
Shifrlash:   C = (P + k) mod 26
Deshifrlash: P = (C − k) mod 26
\`\`\`

## Misol (k = 3)

\`\`\`
Alfavit: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Shifr:   D E F G H I J K L M N O P Q R S T U V W X Y Z A B C

SALOM  →  VDORP
\`\`\`

S(18)+3 = 21 → V, A(0)+3 = 3 → D, L(11)+3 = 14 → O va hokazo.

## Buzish: to'liq qidiruv

Kalit maydoni atigi **25** ta (k = 0 ma'nosiz). Hujumchi barcha 25 variantni yozib chiqadi va ma'noli matnni tanlaydi — bu bir soniyadan kam vaqt oladi.

\`\`\`
k=1: UCNQO
k=2: TBMPN
k=3: SALOM   ← topildi!
...
\`\`\`

> 💡 **ROT13** — k = 13 bo'lgan Sezar. U o'z-o'ziga teskari (13 + 13 = 26), shuning uchun forumlarda spoilerlarni yashirish uchun ishlatiladi — himoya uchun emas.

## Saboq

Algoritm qanchalik aqlli bo'lmasin, **kalit maydoni kichik** bo'lsa, tizim to'liq qidiruvga bardosh bermaydi.
`,
        practice: { tab: 'classical', sub: 'caesar', label: 'Sezar simulyatori va brute-force' },
        check: [
          {
            q: 'k = 3 bilan "KOD" so\'zini shifrlang.',
            options: ['NRG', 'HLA', 'LPE', 'NQG'],
            answer: 0,
            explain: "K(10)+3=13→N, O(14)+3=17→R, D(3)+3=6→G.",
          },
          {
            q: 'Sezar shifrining asosiy zaifligi nima?',
            options: ['Juda sekin ishlaydi', 'Kalit maydoni atigi 25 ta', 'Faqat ingliz tilida ishlaydi', 'Deshifrlash formulasi yo\'q'],
            answer: 1,
            explain: "Barcha 25 kalitni sinab ko'rish bir soniyadan kam vaqt oladi.",
          },
        ],
      },
      {
        id: 'affine-substitution',
        title: 'Affin va oddiy almashtirish shifrlari',
        minutes: 10,
        goals: [
          "Affin shifrini EKUB va modulli teskari orqali tushunish",
          "Monoalfavit almashtirish shifrining kalit maydonini hisoblash",
        ],
        content: `
## Affin shifri

Sezarni umumlashtiramiz: ko'paytirish ham qo'shamiz. Kalit — \`(a, b)\` juftligi:

\`\`\`
Shifrlash:   C = (a·P + b) mod 26
Deshifrlash: P = a⁻¹·(C − b) mod 26
\`\`\`

Deshifrlash uchun \`a⁻¹\` kerak, demak **\`EKUB(a, 26) = 1\`** bo'lishi shart. Bunday \`a\` lar 12 ta: \`1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25\`.

## Misol: a = 5, b = 8

\`\`\`
A(0)  → 5·0+8  = 8  → I
F(5)  → 5·5+8  = 33 ≡ 7  → H
I(8)  → 5·8+8  = 48 ≡ 22 → W
N(13) → 5·13+8 = 73 ≡ 21 → V
E(4)  → 5·4+8  = 28 ≡ 2  → C

AFFINE CIPHER → IHHWVC SWFRCP
\`\`\`

Deshifrlash: \`5⁻¹ = 21 (mod 26)\`, shuning uchun \`P = 21·(C − 8) mod 26\`.

Kalit maydoni: \`12 · 26 = 312\` — hali ham to'liq qidiruv uchun arzimas.

## Ixtiyoriy almashtirish shifri

Endi har bir harfga **ixtiyoriy** boshqa harfni mos qo'yamiz (alfavitning har qanday aralashmasi):

\`\`\`
Ochiq:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Shifr:  Q W E R T Y U I O P A S D F G H J K L Z X C V B N M
\`\`\`

Kalit maydoni: \`26! ≈ 4 · 10^26\` ≈ 88 bit. To'liq qidiruv amalda imkonsiz!

Lekin bu shifr ham **bir necha daqiqada** buziladi. Qanday qilib? Keyingi dars — chastotaviy tahlil.

> 💡 Bunday shifrlar **monoalfavit** deyiladi: har bir ochiq harf har doim bitta va o'sha shifr harfiga aylanadi.
`,
        practice: { tab: 'classical', sub: 'affine', label: 'Affin shifri laboratoriyasi' },
        check: [
          {
            q: 'Affin shifrida a = 13 kaliti nima uchun yaroqsiz?',
            options: ['13 juda katta', 'EKUB(13, 26) ≠ 1, teskari yo\'q', '13 tub son', 'b bilan mos kelmaydi'],
            answer: 1,
            explain: "EKUB(13, 26) = 13, demak 13⁻¹ mod 26 mavjud emas va deshifrlash imkonsiz.",
          },
          {
            q: 'Ixtiyoriy monoalfavit almashtirish shifrining kalitlari soni qancha?',
            options: ['26', '312', '26!', '2^26'],
            answer: 2,
            explain: "26 ta harfning barcha o'rin almashtirishlari soni 26! ≈ 4·10^26.",
          },
        ],
      },
      {
        id: 'frequency',
        title: 'Kriptotahlil: chastotaviy tahlil',
        minutes: 12,
        goals: [
          "Tildagi harflar chastotasidan qanday foydalanishni bilish",
          "Monoalfavit shifrni qo'lda buzish bosqichlarini bajarish",
        ],
        content: `
## Al-Kindiy kashfiyoti (IX asr)

Arab olimi **Al-Kindiy** birinchi bo'lib payqagan: har bir tilda harflar **notekis** uchraydi. Monoalfavit shifr harflarni almashtiradi, lekin ularning **chastotasini yashira olmaydi**.

Ingliz tilida eng ko'p uchraydigan harflar:

| Harf | E | T | A | O | I | N | S | H | R |
|---|---|---|---|---|---|---|---|---|---|
| % | 12.7 | 9.1 | 8.2 | 7.5 | 7.0 | 6.7 | 6.3 | 6.1 | 6.0 |

O'zbek (lotin) matnlarida esa \`A\`, \`I\`, \`N\`, \`L\`, \`R\` ko'p uchraydi.

## Buzish algoritmi

1. Shifrmatndagi har bir harfni sanang.
2. Eng ko'p uchragan shifr harfi, ehtimol, \`E\` (yoki o'zbek tilida \`A\`).
3. Ikki harfli (**bigramma**) va uch harfli (**trigramma**) birikmalarga qarang: ingliz tilida \`TH\`, \`HE\`, \`THE\`, \`AND\`.
4. Qisman ochilgan so'zlardan qolgan harflarni taxmin qiling (\`TH_\` → \`THE\`).
5. Matn to'liq ma'noli bo'lguncha takrorlang.

## Muhim xulosa

Kalit maydoni 4·10^26 bo'lgan shifr bir necha daqiqada buzildi, chunki shifrmatn ochiq matnning **statistik tuzilishini saqlab qolgan**. Zamonaviy kriptografiyaning asosiy talabi:

> Shifrmatn **tasodifiy shovqindan farqlab bo'lmaydigan** bo'lishi kerak.

## Moslik indeksi (IC)

Matndan tasodifan olingan ikki harfning bir xil bo'lish ehtimoli:

- Ingliz tilidagi oddiy matn: **≈ 0.066**
- Tasodifiy harflar: **≈ 0.038** (= 1/26)

Agar shifrmatnning IC'si ≈ 0.066 bo'lsa — bu monoalfavit shifr. Bu ko'rsatkich keyingi darsda Vigenère kalit uzunligini topishda ham kerak bo'ladi.
`,
        practice: { tab: 'tools', sub: 'frequency', label: 'Chastotaviy tahlilator' },
        check: [
          {
            q: 'Ingliz tilidagi uzun monoalfavit shifrmatnda eng ko\'p uchragan harf, ehtimol, qaysi ochiq harfga mos?',
            options: ['Z', 'E', 'Q', 'X'],
            answer: 1,
            explain: "Ingliz tilida E eng ko'p uchraydigan harf (~12.7%).",
          },
          {
            q: 'Chastotaviy tahlil nima uchun 26! kalitli shifrni ham buza oladi?',
            options: [
              'Kompyuterlar 26! kalitni tez tekshiradi',
              'Shifrmatn til statistikasini saqlab qoladi',
              'Kalit har doim matn ichida bo\'ladi',
              'Harflar tartibi o\'zgarmaydi',
            ],
            answer: 1,
            explain: "Monoalfavit almashtirish harflarni almashtiradi, lekin ularning chastotalarini o'zgartirmaydi.",
          },
        ],
      },
      {
        id: 'vigenere',
        title: 'Vigenère: polialfavit shifr',
        minutes: 12,
        goals: [
          "Vigenère shifrini qo'lda bajarish",
          "Polialfavit shifr chastotaviy tahlilni qanday qiyinlashtirishini tushunish",
          "Kasiski usuli bilan kalit uzunligini topish g'oyasini bilish",
        ],
        content: `
## G'oya: bir nechta Sezar navbatma-navbat

Kalit — so'z. Uning har bir harfi alohida siljishni bildiradi (\`A=0, B=1, …\`). Kalit takrorlanib ochiq matn ostiga yoziladi:

\`\`\`
C_i = (P_i + K_(i mod m)) mod 26
\`\`\`

## Misol (kalit: LEMON)

\`\`\`
Ochiq: A T T A C K A T D A W N
Kalit: L E M O N L E M O N L E
Shifr: L X F O P V E F R N H R
\`\`\`

E'tibor bering: ochiq matndagi \`A\` lar turli joyda \`L\`, \`O\`, \`E\`, \`N\` ga aylandi. Chastotalar "tekislanadi" — shuning uchun Vigenère 300 yil davomida **"le chiffre indéchiffrable"** (buzib bo'lmas shifr) deb hisoblangan.

## Buzish (Babbage va Kasiski, XIX asr)

**1-qadam: kalit uzunligini (m) topish.**

- **Kasiski usuli:** shifrmatnda takrorlanuvchi bo'laklarni (masalan, \`VTW\`) izlang. Ular orasidagi masofalar, ehtimol, kalit uzunligiga karrali. Masofalarning EKUB'i → \`m\`.
- **Moslik indeksi:** \`m\` ni taxmin qilib, har \`m\`-chi harfni alohida guruhga ajrating. To'g'ri \`m\` da har bir guruhning IC'si ≈ 0.066 bo'ladi.

**2-qadam:** har bir guruh — oddiy Sezar shifri! Har biriga chastotaviy tahlil qo'llang.

## Saboq

Kalit **qisqa va takrorlanuvchi** bo'lsa, shifr ichida naqsh qoladi. Agar kalit matn qadar uzun, tasodifiy va bir martalik bo'lsa-chi? Bu — **bir martalik bloknot**, uni 4-modulda ko'ramiz.
`,
        practice: { tab: 'classical', sub: 'vigenere', label: 'Vigenère simulyatori' },
        check: [
          {
            q: 'Kalit "B" (siljish 1) bo\'lgan Vigenère qaysi shifrga teng?',
            options: ['Affin', 'k=1 bo\'lgan Sezar', 'Playfair', 'Atbash'],
            answer: 1,
            explain: "Bir harfli kalit har bir harfni bir xil miqdorda suradi — bu Sezar shifri.",
          },
          {
            q: 'Kasiski usuli nimani aniqlash uchun ishlatiladi?',
            options: ['Kalit uzunligini', 'Alfavit tilini', 'Ochiq matn uzunligini', 'Shifrlash vaqtini'],
            answer: 0,
            explain: "Takrorlanuvchi bo'laklar orasidagi masofalar kalit uzunligiga karrali bo'ladi.",
          },
        ],
      },
      {
        id: 'playfair-transposition',
        title: 'Playfair va o\'rin almashtirish shifrlari',
        minutes: 10,
        goals: [
          "Bigramma shifri (Playfair) qoidalarini bilish",
          "Almashtirish va o'rin almashtirish farqini tushunish",
          "Rail Fence shifrini qo'lda bajarish",
        ],
        content: `
## Playfair (1854)

Harflarni **juft-juft** (bigramma) shifrlaydi, shuning uchun bitta harf chastotasi yashirinadi. Kalit so'zdan 5×5 jadval tuziladi (\`I\` va \`J\` birlashtiriladi).

Qoidalar (har bir juftlik uchun):

1. **Bir qatorda** — har biri o'ngdagi harf bilan almashtiriladi.
2. **Bir ustunda** — har biri pastdagi harf bilan almashtiriladi.
3. **To'g'ri to'rtburchak** — har biri o'z qatoridagi, ikkinchi harf ustunidagi harf bilan almashtiriladi.
4. Juftlikda bir xil harf bo'lsa (\`LL\`), orasiga \`X\` qo'yiladi.

Playfair Birinchi jahon urushida ishlatilgan, ammo **bigramma chastotalari** orqali buziladi (26² = 676 juftlik — tahlil uchun yetarlicha kichik).

## O'rin almashtirish (transpozitsiya) shifrlari

Bu safar harflar **o'zgarmaydi**, faqat ularning **tartibi** aralashtiriladi.

### Rail Fence (Temir yo'l to'sig'i)

Matn zigzag shaklida \`r\` qatorga yoziladi va qatorma-qator o'qiladi. \`r = 3\`:

\`\`\`
W . . . E . . . C . . . R . . . L . . . T . . . E
. E . R . D . S . O . E . E . F . E . A . O . C .
. . A . . . I . . . V . . . D . . . E . . . N . .

WEAREDISCOVEREDFLEEATONCE → WECRLTEERDSOEEFEAOCAIVDEN
\`\`\`

### Ajoyib belgi

Transpozitsiyada harf chastotalari ochiq matnnikiga **aynan teng** qoladi. Agar shifrmatnda \`E\` eng ko'p uchrasa va IC ≈ 0.066 bo'lsa — bu o'rin almashtirish.

## Ikki g'oya — zamonaviy shifrlarning ildizi

| G'oya | Klassik misol | Zamonaviy nomi (Shannon) |
|---|---|---|
| Almashtirish | Sezar, Vigenère | **Chalkashtirish** (confusion) — kalit va shifrmatn bog'lanishini murakkablashtirish |
| O'rin almashtirish | Rail Fence | **Tarqatish** (diffusion) — bitta ochiq bit ta'sirini butun blokka yoyish |

AES har bir raundda aynan shu ikkisini birgalikda qo'llaydi.
`,
        practice: { tab: 'classical', sub: 'playfair', label: 'Playfair jadvalini tuzish' },
        check: [
          {
            q: 'Qaysi shifr turida harf chastotalari ochiq matnnikiga aynan teng qoladi?',
            options: ['Sezar', 'Vigenère', 'O\'rin almashtirish (transpozitsiya)', 'Playfair'],
            answer: 2,
            explain: "Transpozitsiya harflarni o'zgartirmaydi, faqat joyini almashtiradi.",
          },
          {
            q: 'Shannonning "tarqatish" (diffusion) tamoyili nimani anglatadi?',
            options: [
              'Kalitni ko\'p joyda saqlash',
              'Bitta ochiq matn biti ta\'sirini ko\'p shifrmatn bitlariga yoyish',
              'Shifrmatnni bir nechta kanaldan yuborish',
              'Harflarni boshqa harflar bilan almashtirish',
            ],
            answer: 1,
            explain: "Diffusion — ochiq matndagi kichik o'zgarish shifrmatnning katta qismini o'zgartirishi.",
          },
        ],
      },
      {
        id: 'enigma',
        title: 'Enigma: mexanik shifrlash cho\'qqisi',
        minutes: 10,
        goals: [
          "Enigma rotorlari, reflektor va kommutatsiya paneli vazifasini bilish",
          "Enigma qanday zaiflik tufayli buzilganini tushunish",
        ],
        content: `
## Tuzilishi

Ikkinchi jahon urushida Germaniya ishlatgan elektromexanik mashina:

1. **Kommutatsiya paneli** (Steckerbrett) — harflar juftlarini kabel bilan almashtiradi.
2. **Rotorlar** (3 ta, keyinroq 4 ta) — har biri aralashtirilgan alfavitni amalga oshiradi. Har bir tugma bosilganda **o'ng rotor bir qadam aylanadi**, u to'liq aylanganda keyingisi suriladi (xuddi hisoblagich kabi).
3. **Reflektor** — signalni orqaga, rotorlar orqali qaytaradi.

Rotorlar har harfdan keyin aylangani uchun Enigma — davri ~17 000 harf bo'lgan **polialfavit** shifr.

Kalit sozlamalari soni (armiya varianti): **≈ 1.6 · 10^20** — o'sha davr uchun bu "cheksiz".

## Reflektorning ikki tomonlama ta'siri

- ✅ Qulaylik: shifrlash va deshifrlash bir xil — bir xil sozlamada \`A → X\` bo'lsa, \`X → A\`.
- ❌ Zaiflik: **hech qaysi harf o'ziga shifrlanmaydi**. Bu juda kichik tuyulgan kamchilik shifrni yiqitdi.

## Qanday buzildi?

- **Polsha matematiklari** (Marian Rejewski, 1932) rotor ulanishlarini matematik tarzda tikladi.
- **Bletchley Park** (Alan Turing va boshqalar) **"krib"** — taxmin qilingan ochiq matn (masalan, har kuni ertalab yuboriladigan ob-havo hisoboti — \`WETTERBERICHT\`) ishlatdi.
- Harf o'ziga shifrlanmasligi kribning shifrmatnga nisbatan mumkin bo'lmagan joylarini darhol chiqarib tashladi.
- **Bombe** mashinasi qolgan sozlamalarni avtomatik qidirdi.

## Saboqlar

1. Ulkan kalit maydoni ≠ xavfsizlik.
2. **Ma'lum ochiq matn hujumi** — real tahdid: xabarlar ko'pincha bashorat qilinadigan qismlarga ega.
3. Operatorlarning xatolari (bir xil sozlamalar, takroriy xabarlar) kriptotahlilchilarga katta yordam berdi.
4. Kompyuter fanining tug'ilishi aynan kriptotahlil bilan bog'liq.
`,
        practice: { tab: 'classical', sub: 'enigma', label: 'Mini-Enigma simulyatori' },
        check: [
          {
            q: 'Enigmaning qaysi xususiyati kriptotahlilchilarga katta yordam bergan?',
            options: [
              'Rotorlar aylanmasligi',
              'Hech bir harf o\'ziga shifrlanmasligi',
              'Faqat 26 ta kalit borligi',
              'Raqamlarni shifrlay olmasligi',
            ],
            answer: 1,
            explain: "Reflektor tufayli harf hech qachon o'ziga aylanmaydi; bu krib joyini aniqlashni osonlashtirgan.",
          },
          {
            q: '"Krib" (crib) nima?',
            options: [
              'Enigma rotorining nomi',
              'Shifrmatnda bo\'lishi taxmin qilingan ochiq matn bo\'lagi',
              'Maxfiy kalit',
              'Bombe mashinasining qismi',
            ],
            answer: 1,
            explain: "Krib — ma'lum yoki taxmin qilingan ochiq matn; bu ma'lum ochiq matn hujumining asosi.",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  {
    id: 'm4',
    title: 'Zamonaviy simmetrik shifrlash',
    level: "O'rta",
    color: 'sky',
    summary: "Mukammal maxfiylikdan AES va autentifikatsiyalangan shifrlashgacha.",
    lessons: [
      {
        id: 'otp',
        title: 'Bir martalik bloknot va mukammal maxfiylik',
        minutes: 10,
        goals: [
          "Bir martalik bloknot (OTP) qanday ishlashini bilish",
          "Shannonning mukammal maxfiylik tushunchasini tushuntirish",
          "OTP nima uchun amalda kam ishlatilishini bilish",
        ],
        content: `
## Bir martalik bloknot (One-Time Pad)

\`\`\`
C = P ⊕ K
\`\`\`

Shartlar:

1. Kalit \`K\` — **haqiqiy tasodifiy**.
2. Kalit uzunligi **xabar uzunligidan kam emas**.
3. Kalit **hech qachon qayta ishlatilmaydi**.

## Mukammal maxfiylik (Shannon, 1949)

Claude Shannon isbotlagan: OTP shartlari bajarilsa, shifrmatn ochiq matn haqida **hech qanday** ma'lumot bermaydi. Hatto cheksiz hisoblash quvvatiga ega hujumchi ham buza olmaydi.

Nega? Har qanday shifrmatn **har qanday** bir xil uzunlikdagi ochiq matnga mos kelishi mumkin — faqat kalitni mos tanlash kifoya:

\`\`\`
C = 1010
"Ha"  ga mos kalit topiladi,
"Yo'q" ga ham mos kalit topiladi (bir xil uzunlikda).
Hujumchi qaysi biri to'g'riligini bila olmaydi.
\`\`\`

## Muammolar

- 1 GB ma'lumot uchun 1 GB **oldindan xavfsiz yetkazilgan** kalit kerak.
- Kalitni qayta ishlatish — halokat (\`C1 ⊕ C2 = P1 ⊕ P2\`, XOR darsini eslang).
- OTP **yaxlitlikni ta'minlamaydi**: hujumchi \`C\` dagi bitni o'zgartirsa, \`P\` dagi aynan o'sha bit o'zgaradi va buni hech kim sezmaydi.

## Amaliy yechim: oqim shifrlari

Qisqa kalitdan (masalan, 256 bit) **psevdotasodifiy** uzun oqim (keystream) yaratamiz va uni ochiq matn bilan XOR qilamiz. Bu — **oqim shifri** (stream cipher). Zamonaviy misol: **ChaCha20**.

Endi xavfsizlik "matematik isbotlangan" emas, balki **hisoblash jihatidan** — ya'ni hujum uchun real bo'lmagan vaqt kerak.
`,
        check: [
          {
            q: 'Quyidagilardan qaysi biri OTP sharti EMAS?',
            options: [
              'Kalit tasodifiy bo\'lishi',
              'Kalit xabardan qisqa bo\'lmasligi',
              'Kalit bir marta ishlatilishi',
              'Algoritm sir saqlanishi',
            ],
            answer: 3,
            explain: "OTP algoritmi (XOR) hammaga ma'lum; Kerkxoffs tamoyili bu yerda ham amal qiladi.",
          },
          {
            q: 'OTP qaysi xavfsizlik maqsadini ta\'minlamaydi?',
            options: ['Maxfiylik', 'Yaxlitlik', 'Ikkalasini ham ta\'minlaydi', 'Ikkalasini ham ta\'minlamaydi'],
            answer: 1,
            explain: "Shifrmatn bitlarini o'zgartirish ochiq matnni sezilmasdan o'zgartiradi — yaxlitlik yo'q.",
          },
        ],
      },
      {
        id: 'block-ciphers',
        title: 'Blok shifrlar: DES va Feistel tarmog\'i',
        minutes: 10,
        goals: [
          "Blok shifr va oqim shifr farqini bilish",
          "Feistel tarmog'i qanday ishlashini tushunish",
          "DES nima uchun eskirganini bilish",
        ],
        content: `
## Blok shifr nima?

Blok shifr ma'lumotni **qat'iy o'lchamli bloklarga** (masalan, 64 yoki 128 bit) bo'lib shifrlaydi. Kalit tanlangan har bir blok uchun bu — butun blokni aralashtiradigan va teskarisi bor almashtirish.

| | Blok shifr | Oqim shifri |
|---|---|---|
| Birlik | Blok (128 bit) | Bit/bayt |
| Misol | AES, DES | ChaCha20, RC4 (eskirgan) |
| Uzun xabar uchun | **Rejim** kerak (CBC, CTR, GCM) | To'g'ridan-to'g'ri |

## Raundlar g'oyasi

Bitta oddiy aralashtirish zaif, lekin uni **ko'p marta** (raundlar) har safar boshqa **raund kaliti** bilan takrorlasak, natija kuchli bo'ladi. Raund kalitlari asosiy kalitdan **kalit jadvali** (key schedule) orqali hosil qilinadi.

## Feistel tarmog'i

Blok ikki yarmiga bo'linadi: \`L\` va \`R\`. Har bir raundda:

\`\`\`
L_(i+1) = R_i
R_(i+1) = L_i ⊕ F(R_i, K_i)
\`\`\`

Ajoyibi: \`F\` funksiyaning o'zi teskarilanuvchi bo'lishi **shart emas**. Deshifrlash — xuddi o'sha sxema, faqat raund kalitlari teskari tartibda.

## DES (1977)

- Blok: **64 bit**, kalit: **56 bit**, **16** Feistel raundi.
- 1998-yilda EFF qurgan "Deep Crack" mashinasi DES kalitini **56 soatda** topdi.
- **3DES** (DES ni uch marta qo'llash) vaqtinchalik yechim bo'ldi, ammo u sekin va 64 bitli blok tufayli katta hajmdagi ma'lumotda zaif (Sweet32 hujumi). NIST uni 2023-yildan keyin ishlatishni man qilgan.

> 💡 Saboq: kalit uzunligi bugun yetarli bo'lsa ham, ertaga hisoblash quvvati o'sadi. Shuning uchun zamonaviy tizimlar kamida **128 bit** kalit ishlatadi.
`,
        check: [
          {
            q: 'DES kalit uzunligi necha bit?',
            options: ['40', '56', '128', '256'],
            answer: 1,
            explain: "DES 64 bitli kalitni oladi, lekin 8 biti juftlik tekshiruvi uchun; samarali kalit 56 bit.",
          },
          {
            q: 'Feistel tarmog\'ida F funksiya haqida qaysi gap to\'g\'ri?',
            options: [
              'F teskarilanuvchi bo\'lishi shart',
              'F teskarilanuvchi bo\'lishi shart emas',
              'F faqat XOR bo\'lishi kerak',
              'F har raundda bir xil kalitni ishlatadi',
            ],
            answer: 1,
            explain: "Feistel tuzilishi F ni har qanday funksiya bo'lganda ham butun raundni teskarilanuvchi qiladi.",
          },
        ],
      },
      {
        id: 'aes',
        title: 'AES: zamonaviy standart ichidan',
        minutes: 14,
        goals: [
          "AES parametrlari (blok, kalit, raundlar) ni bilish",
          "SubBytes, ShiftRows, MixColumns, AddRoundKey vazifasini tushuntirish",
        ],
        content: `
## Tarix

1997-yilda NIST ochiq tanlov e'lon qildi. Butun dunyo kriptograflari 15 ta algoritmni tahlil qildi. 2001-yilda belgiyalik olimlar Joan Daemen va Vincent Rijmen yaratgan **Rijndael** g'olib bo'ldi va **AES** nomini oldi.

## Parametrlar

| Variant | Kalit | Raundlar |
|---|---|---|
| AES-128 | 128 bit | 10 |
| AES-192 | 192 bit | 12 |
| AES-256 | 256 bit | 14 |

Blok har doim **128 bit** (16 bayt) — u 4×4 baytli **holat** (state) matritsasi ko'rinishida ishlanadi.

## Bitta raundning to'rt qadami

\`\`\`
┌─ SubBytes    — har bir bayt S-box jadvali orqali almashtiriladi
├─ ShiftRows   — i-qator i pozitsiyaga chapga suriladi
├─ MixColumns  — har bir ustun matritsaga ko'paytiriladi
└─ AddRoundKey — holat raund kaliti bilan XOR qilinadi
\`\`\`

1. **SubBytes — chalkashtirish (confusion).** S-box — AES dagi yagona **chiziqli bo'lmagan** qism. U GF(2⁸) maydonidagi teskari element asosida qurilgan va chiziqli hamda differensial kriptotahlilga qarshi optimallashtirilgan.
2. **ShiftRows — tarqatish (diffusion).** Baytlarni ustunlar orasida aralashtiradi.
3. **MixColumns — tarqatish.** Har bir chiqish bayti ustundagi barcha 4 baytga bog'liq. ShiftRows bilan birga, **2 raunddan keyin** har bir chiqish bayti har bir kirish baytiga bog'liq bo'ladi.
4. **AddRoundKey.** Kalit faqat shu qadamda kiradi. Qolgan qadamlar ochiq va kalitsiz.

Boshida bitta qo'shimcha AddRoundKey bor, oxirgi raundda esa MixColumns yo'q.

## Ko'chki effekti

Ochiq matn yoki kalitda **bitta bit** o'zgarsa, shifrmatnning taxminan **yarmi** (≈64 bit) o'zgaradi. Bu klassik shifrlardan tub farq — shifrmatnda hech qanday naqsh qolmaydi.

## Bugungi holat

- AES ga qarshi amaliy hujum **topilmagan**. Eng yaxshi nazariy hujum to'liq qidiruvdan atigi ~4 barobar tezroq.
- Zamonaviy protsessorlarda **AES-NI** apparat ko'rsatmalari bor — sekundiga gigabaytlab shifrlash.
- Haqiqiy xatolar algoritmda emas, balki **noto'g'ri ishlatishda** (rejim, IV, kalit saqlash). Keyingi dars aynan shu haqda.
`,
        practice: { tab: 'modern', sub: 'aes', label: 'AES raundlarini qadamma-qadam ko\'rish' },
        check: [
          {
            q: 'AES blok o\'lchami qancha?',
            options: ['64 bit', '128 bit', 'Kalitga bog\'liq: 128/192/256', '512 bit'],
            answer: 1,
            explain: "AES ning bloki har doim 128 bit; faqat kalit uzunligi 128/192/256 bo'lishi mumkin.",
          },
          {
            q: 'AES ning qaysi qadami yagona chiziqli bo\'lmagan qism?',
            options: ['ShiftRows', 'MixColumns', 'SubBytes', 'AddRoundKey'],
            answer: 2,
            explain: "S-box (SubBytes) chiziqli emas; usiz AES chiziqli tenglamalar tizimi bilan buzilar edi.",
          },
          {
            q: 'AES-256 necha raunddan iborat?',
            options: ['10', '12', '14', '16'],
            answer: 2,
            explain: "AES-128: 10, AES-192: 12, AES-256: 14 raund.",
          },
        ],
      },
      {
        id: 'modes',
        title: 'Shifrlash rejimlari: ECB, CBC, CTR',
        minutes: 12,
        goals: [
          "ECB rejimi nima uchun xavfli ekanini ko'rsatish",
          "CBC va CTR rejimlarida IV/nonce vazifasini bilish",
          "Nonce'ni qayta ishlatish oqibatlarini tushunish",
        ],
        content: `
## Muammo

AES faqat 16 baytni shifrlaydi. 1 MB faylni qanday shifrlaymiz? Bloklarni qanday bog'lash — **shifrlash rejimi** belgilaydi.

## ECB (Electronic Codebook) — ❌ ISHLATMANG

Har bir blok **alohida, bir xil kalit** bilan shifrlanadi:

\`\`\`
C_i = AES(K, P_i)
\`\`\`

Bir xil ochiq bloklar → **bir xil shifr bloklari**. Rasmni ECB da shifrlasangiz, uning konturlari aniq ko'rinib qoladi (mashhur "ECB pingvini" — Tux). Laboratoriyada buni o'zingiz ko'ring!

## CBC (Cipher Block Chaining)

Har bir blok shifrlashdan oldin **oldingi shifr bloki** bilan XOR qilinadi:

\`\`\`
C_0 = IV
C_i = AES(K, P_i ⊕ C_(i−1))
\`\`\`

- **IV** (initialization vector) — har bir xabar uchun yangi, **tasodifiy va oldindan bashorat qilib bo'lmaydigan**.
- Endi bir xil ochiq bloklar turli shifr bloklarini beradi.
- Kamchiliklari: parallel shifrlab bo'lmaydi; to'ldirish (padding) kerak; noto'g'ri amalga oshirilsa **padding oracle** hujumiga zaif.

## CTR (Counter)

AES ni oqim shifriga aylantiradi:

\`\`\`
Keystream_i = AES(K, nonce ‖ i)
C_i = P_i ⊕ Keystream_i
\`\`\`

- To'liq parallel, to'ldirish kerak emas, faqat AES shifrlash funksiyasi ishlatiladi.
- **Nonce hech qachon takrorlanmasligi kerak!** Aks holda bir xil keystream chiqadi va \`C1 ⊕ C2 = P1 ⊕ P2\` — XOR darsidagi falokat.

## Asosiy muammo: yaxlitlik yo'q

ECB, CBC va CTR faqat **maxfiylik** beradi. Hujumchi shifrmatnni o'zgartirsa, ular buni aniqlamaydi. Masalan, CTR da \`C\` ning bitta bitini o'zgartirish \`P\` ning aynan o'sha bitini o'zgartiradi (\`"100$"\` → \`"900$"\`).

Yechim — keyingi dars: **autentifikatsiyalangan shifrlash**.
`,
        practice: { tab: 'modern', sub: 'modes', label: 'ECB vs CBC: Tux paradoksi' },
        check: [
          {
            q: 'ECB rejimining asosiy kamchiligi nima?',
            options: [
              'Juda sekin',
              'Bir xil ochiq bloklar bir xil shifr bloklarini beradi',
              'IV talab qiladi',
              'Parallel ishlay olmaydi',
            ],
            answer: 1,
            explain: "ECB ochiq matndagi naqshlarni (masalan, rasm konturlarini) shifrmatnda saqlab qoladi.",
          },
          {
            q: 'CTR rejimida bir xil kalit bilan nonce takrorlansa nima bo\'ladi?',
            options: [
              'Hech narsa, CTR xavfsiz',
              'Shifrlash ishlamay qoladi',
              'Bir xil keystream chiqadi va C1 ⊕ C2 = P1 ⊕ P2',
              'Kalit avtomatik almashadi',
            ],
            answer: 2,
            explain: "CTR — oqim shifri; nonce takrori kalit oqimining qayta ishlatilishi demak.",
          },
        ],
      },
      {
        id: 'aead',
        title: 'Autentifikatsiyalangan shifrlash (AEAD): AES-GCM',
        minutes: 10,
        goals: [
          "AEAD nima ekanini va nima uchun standart ekanini bilish",
          "AES-GCM va ChaCha20-Poly1305 ni tanish",
          "Amalda qaysi algoritmni tanlashni bilish",
        ],
        content: `
## AEAD = maxfiylik + yaxlitlik

**AEAD** (Authenticated Encryption with Associated Data) bitta amalda:

- ma'lumotni **shifrlaydi** (maxfiylik),
- **autentifikatsiya tegi** (tag) hisoblaydi (yaxlitlik va haqiqiylik),
- shifrlanmaydigan, lekin himoyalanishi kerak bo'lgan **qo'shimcha ma'lumotni** (AD) ham tekshiradi — masalan, paket sarlavhasi.

\`\`\`
Shifrlash:   (C, tag) = AEAD_Enc(K, nonce, P, AD)
Deshifrlash: P yoki ❌XATO = AEAD_Dec(K, nonce, C, tag, AD)
\`\`\`

Agar shifrmatnda bitta bit o'zgarsa — deshifrlash **rad etiladi**. Ochiq matnning hech qanday bo'lagi qaytarilmaydi.

## Ikki asosiy algoritm

| | AES-GCM | ChaCha20-Poly1305 |
|---|---|---|
| Asosi | AES-CTR + GHASH | ChaCha20 oqim shifri + Poly1305 |
| Nonce | 96 bit | 96 bit |
| Kuchli tomoni | AES-NI bor protsessorlarda juda tez | Apparat tezlatgichsiz ham tez va doimiy vaqtli |
| Ishlatilishi | TLS 1.3, IPsec, disk shifrlash | TLS 1.3, WireGuard, mobil qurilmalar |

## Oltin qoida: nonce — bir marta!

GCM da bir xil kalit bilan nonce takrorlansa, nafaqat maxfiylik buziladi, balki hujumchi autentifikatsiya kalitini tiklab, **soxta xabarlar** yarata oladi. Amaliy yechimlar:

- Nonce sifatida hisoblagich ishlatish (1, 2, 3, …).
- Yoki 96 bitli tasodifiy nonce (bitta kalit bilan 2³² dan ko'p xabar shifrlamaslik).
- Yoki nonce-misuse-resistant rejim: **AES-GCM-SIV**.

## Amaliy tavsiya

> Simmetrik shifrlash kerak bo'lsa — **AES-256-GCM** yoki **ChaCha20-Poly1305** ishlating, va o'zingiz yozmang: \`libsodium\`, Web Crypto API, \`cryptography\` (Python) kabi tekshirilgan kutubxonalardan foydalaning.
`,
        practice: { tab: 'modern', sub: 'modes', label: 'Rejimlarni solishtirish' },
        check: [
          {
            q: 'AEAD rejimi CBC dan nimasi bilan ustun?',
            options: ['Kalit qisqaroq', 'Yaxlitlik va haqiqiylikni ham ta\'minlaydi', 'IV kerak emas', 'Faqat matn shifrlaydi'],
            answer: 1,
            explain: "AEAD autentifikatsiya tegi orqali har qanday o'zgartirishni aniqlaydi.",
          },
          {
            q: 'AES-GCM da teg tekshiruvi muvaffaqiyatsiz bo\'lsa, to\'g\'ri xatti-harakat qanday?',
            options: [
              'Ochiq matnni ogohlantirish bilan qaytarish',
              'Hech qanday ochiq matn qaytarmasdan xato berish',
              'Faqat birinchi blokni qaytarish',
              'Nonce ni o\'zgartirib qayta urinish',
            ],
            answer: 1,
            explain: "Autentifikatsiyadan o'tmagan ma'lumot ishlatilmasligi kerak — deshifrlash butunlay rad etiladi.",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  {
    id: 'm5',
    title: 'Xesh-funksiyalar va yaxlitlik',
    level: "O'rta",
    color: 'emerald',
    summary: "Raqamli barmoq izi: SHA-256, HMAC va parollarni to'g'ri saqlash.",
    lessons: [
      {
        id: 'hash',
        title: 'Kriptografik xesh-funksiyalar',
        minutes: 12,
        goals: [
          "Xesh-funksiyaning uch xavfsizlik xossasini bilish",
          "Tug'ilgan kun paradoksi nima uchun muhimligini tushunish",
          "MD5 va SHA-1 nima uchun eskirganini bilish",
        ],
        content: `
## Xesh nima?

Xesh-funksiya **ixtiyoriy uzunlikdagi** ma'lumotni **qat'iy uzunlikdagi** "barmoq iziga" aylantiradi. Kalit **ishlatilmaydi**.

\`\`\`
SHA-256("abc") =
ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
\`\`\`

Kitob, film yoki bitta harf — natija har doim 256 bit (64 hex belgi).

## Uch xavfsizlik xossasi

1. **Teskari tasvirga chidamlilik** (preimage resistance): \`h\` berilgan bo'lsa, \`H(x) = h\` bo'ladigan \`x\` ni topish qiyin. *(Bir tomonlamalik.)*
2. **Ikkinchi teskari tasvirga chidamlilik**: \`x\` berilgan bo'lsa, \`H(x') = H(x)\` bo'ladigan boshqa \`x'\` ni topish qiyin.
3. **To'qnashuvga chidamlilik** (collision resistance): \`H(x) = H(y)\` bo'ladigan **istalgan** \`x ≠ y\` juftlikni topish qiyin.

Qo'shimcha: **ko'chki effekti** — kirishdagi 1 bit o'zgarsa, chiqishning ~50% bitlari o'zgaradi.

## Tug'ilgan kun paradoksi

Xonada atigi **23** kishi bo'lsa, ikkitasining tug'ilgan kuni mos kelish ehtimoli 50% dan oshadi. Sababi: biz konkret juftlikni emas, **istalgan** juftlikni qidiramiz.

Xeshlar uchun: \`n\` bitli xeshda to'qnashuv topish uchun \`2^n\` emas, taxminan \`2^(n/2)\` urinish kifoya.

- SHA-256: to'qnashuvga qarshi xavfsizlik ≈ \`2^128\` ✓
- MD5 (128 bit): nazariy jihatdan \`2^64\`, amalda esa algoritmdagi zaifliklar tufayli soniyalarda.

## Eskirgan va zamonaviy xeshlar

| Algoritm | Chiqish | Holati |
|---|---|---|
| MD5 | 128 bit | ❌ To'qnashuvlar oson topiladi (2004) |
| SHA-1 | 160 bit | ❌ Amaliy to'qnashuv — SHAttered (2017) |
| SHA-256 / SHA-512 | 256 / 512 bit | ✅ Standart |
| SHA-3, BLAKE2/3 | o'zgaruvchan | ✅ Zamonaviy alternativlar |

## Qayerda ishlatiladi?

- Fayl yaxlitligini tekshirish (yuklab olish sahifalaridagi checksum).
- Raqamli imzolar (hujjatning o'zi emas, xeshi imzolanadi).
- Git (commit identifikatorlari), blokcheyn (Bitcoin — SHA-256).
- Parollarni saqlash — lekin **oddiy SHA-256 bilan emas** (bu darsdan keyingi mavzu).
`,
        practice: { tab: 'hashing', sub: 'avalanche', label: 'SHA-256 ko\'chki effekti' },
        check: [
          {
            q: '256 bitli xeshda to\'qnashuv topish uchun taxminan nechta urinish kerak?',
            options: ['2^256', '2^128', '256', '2^64'],
            answer: 1,
            explain: "Tug'ilgan kun paradoksi tufayli to'qnashuv uchun ~2^(n/2) = 2^128 urinish yetarli.",
          },
          {
            q: 'Ikki xil hujjatning bir xil xeshini topish qaysi xossani buzadi?',
            options: ['Teskari tasvirga chidamlilik', 'To\'qnashuvga chidamlilik', 'Maxfiylik', 'Ko\'chki effekti'],
            answer: 1,
            explain: "Istalgan x ≠ y uchun H(x) = H(y) — bu to'qnashuv.",
          },
          {
            q: 'Qaysi xesh-funksiya bugun xavfsiz hisoblanadi?',
            options: ['MD5', 'SHA-1', 'SHA-256', 'CRC32'],
            answer: 2,
            explain: "MD5 va SHA-1 da amaliy to'qnashuvlar topilgan; CRC32 umuman kriptografik emas.",
          },
        ],
      },
      {
        id: 'mac',
        title: 'MAC va HMAC: xabarni kalit bilan tasdiqlash',
        minutes: 9,
        goals: [
          "Xesh va MAC farqini tushunish",
          "Nima uchun H(kalit ‖ xabar) xavfli ekanini bilish",
          "HMAC tuzilishini bilish",
        ],
        content: `
## Muammo

Alisa Bobga "100$ o'tkaz" deb yozdi va yoniga \`SHA-256(xabar)\` ni qo'shdi. Mallori xabarni "900$ o'tkaz" ga o'zgartirib, **yangi xeshni hisoblab** qo'yadi. Bob hech narsani sezmaydi — chunki xeshni **istalgan odam** hisoblay oladi.

Bizga **kalitli** xesh kerak: uni faqat maxfiy kalit egasi hisoblay olsin.

## MAC (Message Authentication Code)

\`\`\`
tag = MAC(K, xabar)
\`\`\`

Bob ham \`K\` ni biladi, tegni qayta hisoblaydi va solishtiradi. Kalitsiz Mallori to'g'ri teg yarata olmaydi.

## Nima uchun shunchaki H(K ‖ xabar) emas?

SHA-256 kabi Merkle–Damgård tuzilishidagi xeshlar **uzunlikni kengaytirish hujumiga** (length-extension) zaif: \`H(K ‖ m)\` ni bilgan hujumchi \`K\` ni bilmasdan ham \`H(K ‖ m ‖ to'ldirish ‖ qo'shimcha)\` ni hisoblay oladi. Ya'ni xabar oxiriga istalgan narsani qo'shib, haqiqiy teg yasaydi.

## HMAC

Bu muammoni hal qiluvchi standart tuzilish:

\`\`\`
HMAC(K, m) = H( (K ⊕ opad) ‖ H( (K ⊕ ipad) ‖ m ) )
\`\`\`

\`ipad\` va \`opad\` — doimiy baytlar (\`0x36\` va \`0x5c\`). Ikki qavatli xeshlash uzunlikni kengaytirish hujumini yo'q qiladi.

**HMAC-SHA256** quyidagilarda ishlatiladi: JWT tokenlar (HS256), API so'rovlarini imzolash (AWS), TLS, kalit hosil qilish (HKDF).

## Tegni to'g'ri solishtirish

\`\`\`
if (tag === expected)   // ❌ birinchi farqli baytda to'xtaydi
\`\`\`

Oddiy solishtirish birinchi farqli baytda to'xtaydi. Hujumchi javob vaqtini o'lchab, tegni bayt-baytlab topishi mumkin (**timing attack**). Har doim **doimiy vaqtli** solishtirish ishlating: \`crypto.timingSafeEqual\` (Node.js), \`hmac.compare_digest\` (Python).

## Xesh vs MAC vs Imzo

| | Kalit | Kim tekshira oladi | Inkor etmaslik |
|---|---|---|---|
| Xesh | yo'q | hamma | yo'q |
| MAC | umumiy maxfiy | faqat kalit egalari | yo'q |
| Raqamli imzo | maxfiy/ochiq juftlik | hamma (ochiq kalit bilan) | **ha** |
`,
        check: [
          {
            q: 'Xabar yoniga oddiy SHA-256 xesh qo\'shish nima uchun faol hujumchidan himoya qilmaydi?',
            options: [
              'SHA-256 buzilgan',
              'Hujumchi o\'zgartirilgan xabarning yangi xeshini o\'zi hisoblay oladi',
              'Xesh juda uzun',
              'Xesh ochiq matnni oshkor qiladi',
            ],
            answer: 1,
            explain: "Xesh kalitsiz; uni istalgan odam hisoblay oladi. Kalitli MAC kerak.",
          },
          {
            q: 'H(K ‖ m) tuzilishi qaysi hujumga zaif?',
            options: ['Tug\'ilgan kun', 'Uzunlikni kengaytirish', 'Chastotaviy tahlil', 'Padding oracle'],
            answer: 1,
            explain: "Merkle–Damgård xeshlari (SHA-256) uzunlikni kengaytirish hujumiga zaif; HMAC bu muammoni hal qiladi.",
          },
        ],
      },
      {
        id: 'passwords',
        title: 'Parollarni to\'g\'ri saqlash',
        minutes: 10,
        goals: [
          "Parolni ochiq yoki oddiy xesh bilan saqlash xavfini tushunish",
          "Tuz (salt) va sekin KDF vazifasini bilish",
          "Argon2id/bcrypt dan foydalanish tavsiyalarini bilish",
        ],
        content: `
## Server nimani saqlashi kerak?

Ma'lumotlar bazasi qachondir sizib chiqishini taxmin qilib loyihalash kerak.

| Usul | Baholash |
|---|---|
| Ochiq matnda | ❌❌ Halokat |
| Shifrlangan (AES) | ❌ Kalit ham o'g'irlansa — hammasi ochiladi |
| \`SHA-256(parol)\` | ❌ Rainbow jadvallar va GPU bilan tez buziladi |
| \`SHA-256(tuz ‖ parol)\` | ⚠️ Yaxshiroq, lekin baribir juda tez |
| **Argon2id / bcrypt / scrypt** (tuz bilan) | ✅ To'g'ri |

## Muammo 1: bir xil parollar — bir xil xeshlar

Agar 1000 foydalanuvchi \`123456\` ishlatsa, bazada 1000 ta bir xil xesh bo'ladi. Hujumchi esa mashhur parollar xeshlarini oldindan hisoblab qo'ygan (**rainbow table**).

**Yechim — tuz (salt):** har bir foydalanuvchi uchun tasodifiy 16 bayt. U xesh yoniga ochiq saqlanadi.

\`\`\`
hash = KDF(salt, parol)
\`\`\`

Endi bir xil parollar har xil xeshlarga ega, oldindan tayyorlangan jadvallar esa foydasiz.

## Muammo 2: SHA-256 juda tez

Zamonaviy GPU sekundiga **milliardlab** SHA-256 hisoblaydi. 8 belgili parollarning hammasini bir necha soat yoki kunda sinab chiqish mumkin.

**Yechim — ataylab sekin funksiya (KDF):**

- **Argon2id** — hozirgi tavsiya (2015-yilgi Password Hashing Competition g'olibi). Ko'p **xotira** talab qiladi, shuning uchun GPU/ASIC bilan parallel buzish qimmatga tushadi.
- **bcrypt** — sinovdan o'tgan, keng tarqalgan.
- **scrypt**, **PBKDF2** — ham ishlatiladi (PBKDF2 ni yuqori iteratsiyalar bilan).

Server uchun 1 ta tekshiruv ~100 ms — sezilmaydi. Hujumchi uchun esa milliardlab urinish yillar talab qiladi.

## Amaliy qoidalar

1. Hech qachon o'zingiz "maxsus" sxema o'ylab topmang — tayyor kutubxona (\`argon2\`, \`bcrypt\`) ishlating.
2. Foydalanuvchilarni uzun parollarga (iboralarga) undang va ma'lum sizib chiqqan parollarni rad eting.
3. Ikki bosqichli autentifikatsiyani (2FA) yoqing.
`,
        check: [
          {
            q: 'Tuz (salt) asosan nimadan himoya qiladi?',
            options: [
              'Parolni unutishdan',
              'Oldindan hisoblangan jadvallar (rainbow table) va bir xil parollarni aniqlashdan',
              'Serverning sekin ishlashidan',
              'Tarmoqda tinglashdan',
            ],
            answer: 1,
            explain: "Har bir foydalanuvchiga noyob tuz qo'shish bir xil parollarni har xil xeshlarga aylantiradi.",
          },
          {
            q: 'Parollarni saqlash uchun qaysi biri eng to\'g\'ri tanlov?',
            options: ['MD5', 'SHA-256', 'AES-256', 'Argon2id'],
            answer: 3,
            explain: "Argon2id — ataylab sekin va ko'p xotira talab qiladigan, parollar uchun maxsus ishlab chiqilgan funksiya.",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  {
    id: 'm6',
    title: 'Ochiq kalitli (asimmetrik) kriptografiya',
    level: 'Yuqori',
    color: 'purple',
    summary: "Kalit almashish muammosi va uning yechimlari: Diffie-Hellman, RSA, raqamli imzo, ECC.",
    lessons: [
      {
        id: 'public-key',
        title: 'Kalit almashish muammosi va ochiq kalit g\'oyasi',
        minutes: 8,
        goals: [
          "Simmetrik kriptografiyaning kalit tarqatish muammosini bilish",
          "Ochiq va maxfiy kalit juftligi g'oyasini tushunish",
          "Gibrid shifrlash sxemasini bilish",
        ],
        content: `
## Muammo

Simmetrik shifrlash tez va kuchli, lekin Alisa va Bob **avval** umumiy maxfiy kalitga ega bo'lishi kerak. Ular hech qachon uchrashmagan bo'lsa-chi? Internetda siz har kuni yuzlab saytlar bilan xavfsiz bog'lanasiz — ularning hech biri bilan oldindan kalit almashmagansiz.

Bundan tashqari, \`N\` kishi o'zaro gaplashishi uchun \`N(N−1)/2\` ta kalit kerak: 1000 kishi uchun ~500 000 ta kalit.

## Inqilob (1976)

Whitfield Diffie va Martin Hellman g'oyasi: **ikki xil kalit**.

- **Ochiq kalit** — hammaga e'lon qilinadi (xuddi pochta qutisi manzili kabi).
- **Maxfiy kalit** — faqat egasida (qutining kaliti).

\`\`\`
Shifrlash:  istalgan odam   → Bobning OCHIQ kaliti   → C
Deshifrlash: faqat Bob      → Bobning MAXFIY kaliti  → P
\`\`\`

Ochiq kalitdan maxfiy kalitni hisoblash — 2-moduldagi "qiyin masalalar"dan biriga teng (faktorlash, diskret logarifm).

> 📜 Tarixiy fakt: Britaniya GCHQ xizmatida James Ellis, Clifford Cocks va Malcolm Williamson bu g'oyani 1970–1974-yillarda kashf qilgan, ammo ish 1997-yilgacha maxfiy saqlangan.

## Asimmetrik kriptografiya sekin

RSA-2048 AES dan **minglab marta** sekinroq. Shuning uchun amalda **gibrid sxema** ishlatiladi:

1. Asimmetrik usul bilan **qisqa simmetrik kalit** kelishiladi (yoki yuboriladi).
2. Barcha ma'lumot shu kalit bilan **AES-GCM** yoki **ChaCha20** orqali shifrlanadi.

HTTPS, Signal, PGP, SSH — barchasi aynan shunday ishlaydi.

## Bu modulda

1. **Diffie-Hellman** — kalit kelishish.
2. **RSA** — shifrlash va imzo.
3. **Raqamli imzo** — haqiqiylik va inkor etmaslik.
4. **ECC** — elliptik egri chiziqlar.
`,
        check: [
          {
            q: '50 kishi har biri bilan alohida simmetrik kalit ishlatsa, nechta kalit kerak?',
            options: ['50', '100', '1225', '2500'],
            answer: 2,
            explain: "N(N−1)/2 = 50·49/2 = 1225.",
          },
          {
            q: 'Nima uchun amalda gibrid shifrlash ishlatiladi?',
            options: [
              'Asimmetrik shifrlash xavfsiz emas',
              'Asimmetrik shifrlash sekin, shuning uchun u faqat simmetrik kalitni kelishish uchun ishlatiladi',
              'Simmetrik shifrlash kalit talab qilmaydi',
              'Standartlar shuni talab qiladi',
            ],
            answer: 1,
            explain: "Asimmetrik usul kalit muammosini hal qiladi, simmetrik usul esa ma'lumotni tez shifrlaydi.",
          },
        ],
      },
      {
        id: 'diffie-hellman',
        title: 'Diffie-Hellman kalit almashinuvi',
        minutes: 12,
        goals: [
          "DH protokolini kichik sonlarda qo'lda bajarish",
          "Diskret logarifm masalasini tushunish",
          "\"O'rtadagi odam\" hujumini va unga qarshi chorani bilish",
        ],
        content: `
## Rang aralashtirish analogiyasi

1. Alisa va Bob ochiq **umumiy rang** (sariq) tanlaydi.
2. Har biri **maxfiy rang** qo'shadi: Alisa qizil, Bob ko'k. Natijalarni (to'q sariq va yashil) ochiq almashadi.
3. Har biri olgan aralashmaga **o'z maxfiy rangini** qo'shadi. Ikkalasida ham **sariq+qizil+ko'k** — bir xil rang!

Momo to'q sariq va yashilni ko'rdi, lekin aralashmani "ajratish" qiyin.

## Matematik protokol

Ochiq parametrlar: katta tub son \`p\` va generator \`g\`.

\`\`\`
Alisa: maxfiy a  →  A = g^a mod p  →  Bobga yuboradi
Bob:   maxfiy b  →  B = g^b mod p  →  Alisaga yuboradi
Alisa: s = B^a mod p = g^(ab) mod p
Bob:   s = A^b mod p = g^(ab) mod p     ✓ bir xil!
\`\`\`

## Misol (p = 23, g = 5)

\`\`\`
Alisa: a = 4  →  A = 5^4 mod 23 = 625 mod 23 = 4
Bob:   b = 3  →  B = 5^3 mod 23 = 125 mod 23 = 10
Alisa: s = 10^4 mod 23 = 10000 mod 23 = 18
Bob:   s =  4^3 mod 23 =    64 mod 23 = 18   ✓
\`\`\`

Momo \`p=23, g=5, A=4, B=10\` ni biladi. \`s\` ni topish uchun unga \`a\` yoki \`b\` kerak — ya'ni \`5^a ≡ 4 (mod 23)\` ni yechish. Bu **diskret logarifm masalasi**: kichik sonlarda oson, 2048 bitli \`p\` da esa amalda imkonsiz.

## ⚠️ "O'rtadagi odam" (MITM) hujumi

Oddiy DH **kim bilan** gaplashayotganingizni tekshirmaydi. Mallori o'rtada turib:

\`\`\`
Alisa ⇄ Mallori: kalit s1
Mallori ⇄ Bob:   kalit s2
\`\`\`

U har bir xabarni ochib o'qiydi, qayta shifrlab uzatadi — ikkala tomon hech narsani sezmaydi.

**Yechim:** DH qiymatlari **raqamli imzo** bilan tasdiqlanadi (TLS dagi sertifikatlar), yoki kalit barmoq izlari boshqa kanal orqali solishtiriladi (Signal'dagi "xavfsizlik raqami").

## Ephemeral DH va oldinga maxfiylik

Har bir seans uchun yangi \`a, b\` yaratilsa (**DHE/ECDHE**), ertaga server maxfiy kaliti o'g'irlansa ham, eski yozib olingan seanslarni ochib bo'lmaydi. Bu **oldinga maxfiylik** (forward secrecy) deyiladi va TLS 1.3 da majburiy.
`,
        practice: { tab: 'asymmetric', sub: 'dh', label: 'Diffie-Hellman simulyatori' },
        check: [
          {
            q: 'p = 23, g = 5, a = 6 bo\'lsa A = g^a mod p = ?',
            options: ['8', '15', '2', '19'],
            answer: 0,
            explain: "5^6 = 15625; 15625 = 679·23 + 8, demak A = 8.",
          },
          {
            q: 'Oddiy (autentifikatsiyasiz) Diffie-Hellman qaysi hujumga zaif?',
            options: ['Brute force', 'O\'rtadagi odam (MITM)', 'Chastotaviy tahlil', 'Tug\'ilgan kun'],
            answer: 1,
            explain: "DH tomonlarning shaxsini tekshirmaydi; buning uchun imzo yoki sertifikat kerak.",
          },
          {
            q: 'Oldinga maxfiylik (forward secrecy) nimani kafolatlaydi?',
            options: [
              'Kelajakdagi xabarlar shifrlanadi',
              'Uzoq muddatli kalit o\'g\'irlansa ham o\'tgan seanslar ochilmaydi',
              'Kalit har doim oldinga yuboriladi',
              'Shifrlash tezroq ishlaydi',
            ],
            answer: 1,
            explain: "Har seans uchun vaqtinchalik (ephemeral) DH kalitlari ishlatiladi va keyin o'chiriladi.",
          },
        ],
      },
      {
        id: 'rsa',
        title: 'RSA: kalit yaratish, shifrlash va deshifrlash',
        minutes: 14,
        goals: [
          "RSA kalit juftligini qo'lda yaratish",
          "Kichik sonlarda shifrlash va deshifrlashni bajarish",
          "\"Darslik RSA\" nima uchun xavfli ekanini va to'ldirish (OAEP) zarurligini bilish",
        ],
        content: `
## Kalit yaratish (Rivest, Shamir, Adleman, 1977)

1. Ikki katta tub son tanlang: \`p\`, \`q\`.
2. \`n = p · q\` — modul.
3. \`φ(n) = (p − 1)(q − 1)\`.
4. \`e\` ni tanlang: \`1 < e < φ(n)\`, \`EKUB(e, φ(n)) = 1\`. (Amalda deyarli har doim \`e = 65537\`.)
5. \`d = e⁻¹ mod φ(n)\` — kengaytirilgan Evklid algoritmi bilan.

- **Ochiq kalit:** \`(n, e)\`
- **Maxfiy kalit:** \`d\` (va \`p\`, \`q\`, \`φ(n)\` ham sir saqlanadi)

## Shifrlash va deshifrlash

\`\`\`
C = M^e mod n
M = C^d mod n
\`\`\`

## To'liq misol

\`\`\`
p = 61, q = 53
n = 61 · 53 = 3233
φ(n) = 60 · 52 = 3120
e = 17            (EKUB(17, 3120) = 1 ✓)
d = 2753          (17 · 2753 = 46801 = 15 · 3120 + 1 ✓)

M = 65
C = 65^17 mod 3233 = 2790
M = 2790^2753 mod 3233 = 65   ✓
\`\`\`

## Nega ishlaydi?

\`ed ≡ 1 (mod φ(n))\`, ya'ni \`ed = 1 + k·φ(n)\`. Eyler teoremasidan:

\`\`\`
C^d = M^(ed) = M · (M^φ(n))^k ≡ M · 1^k = M  (mod n)
\`\`\`

## Nega xavfsiz?

Hujumchi \`n\` va \`e\` ni biladi. \`d\` ni topish uchun \`φ(n)\` kerak, buning uchun esa \`n\` ni \`p · q\` ga ajratish kerak. 2048 bitli \`n\` ni faktorlash bugungi texnologiya bilan amalda imkonsiz.

## ⚠️ "Darslik RSA"ni hech qachon ishlatmang

Yuqoridagi sof formula (\`M^e mod n\`) xavfli:

- **Deterministik:** bir xil \`M\` → bir xil \`C\`. Hujumchi "HA" va "YO'Q" ni shifrlab, natijani solishtiradi.
- **Kichik xabarlar:** \`e = 3\` va \`M³ < n\` bo'lsa, \`M\` ni oddiy kub ildiz bilan topish mumkin.
- **Ko'paytuvchanlik:** \`C1 · C2\` = \`(M1 · M2)^e\` — hujumchi shifrmatnlarni boshqarishi mumkin.

**Yechim:** shifrlash uchun **RSA-OAEP**, imzo uchun **RSA-PSS** to'ldirish sxemalari. Kalit uzunligi — kamida **2048 bit** (yaxshisi 3072).
`,
        practice: { tab: 'asymmetric', sub: 'rsa', label: 'RSA kalkulyatori' },
        check: [
          {
            q: 'p = 5, q = 11 bo\'lsa n va φ(n) qanday?',
            options: ['n=55, φ=40', 'n=55, φ=54', 'n=16, φ=40', 'n=55, φ=50'],
            answer: 0,
            explain: "n = 5·11 = 55, φ(n) = 4·10 = 40.",
          },
          {
            q: 'p=5, q=11, e=3 bo\'lsa d = ? (d·e ≡ 1 mod 40)',
            options: ['13', '27', '7', '37'],
            answer: 1,
            explain: "3 · 27 = 81 = 2·40 + 1 ≡ 1 (mod 40), demak d = 27.",
          },
          {
            q: '"Darslik RSA" ning (to\'ldirishsiz) kamchiligi qaysi?',
            options: [
              'Deshifrlash mumkin emas',
              'Deterministik: bir xil xabar har doim bir xil shifrmatn beradi',
              'Kalit juda qisqa',
              'Faqat raqamlarni shifrlaydi',
            ],
            answer: 1,
            explain: "Tasodifiy to'ldirish (OAEP) bo'lmasa, hujumchi taxminlarni shifrlab solishtira oladi.",
          },
        ],
      },
      {
        id: 'signatures',
        title: 'Raqamli imzo',
        minutes: 10,
        goals: [
          "Raqamli imzo yaratish va tekshirish jarayonini bilish",
          "Nima uchun xesh imzolanishini tushunish",
          "Sertifikatlar va ishonch zanjiri g'oyasini bilish",
        ],
        content: `
## G'oya

Shifrlashda kalitlar rollari teskari ishlatiladi:

- **Imzolash** — faqat egasi qila oladi (**maxfiy** kalit).
- **Tekshirish** — istalgan odam qila oladi (**ochiq** kalit).

## RSA imzosi

\`\`\`
Imzolash:   h = SHA-256(hujjat)
            s = h^d mod n
Tekshirish: h' = s^e mod n
            h' == SHA-256(hujjat) ?  ✓ / ❌
\`\`\`

## Nima uchun hujjatning o'zi emas, xeshi?

1. **Tezlik:** 1 GB fayl o'rniga 32 baytlik xesh imzolanadi.
2. **Xavfsizlik:** xesh va to'ldirish (PSS) RSA ning ko'paytuvchanlik xossasidan foydalanib imzo soxtalashtirishni imkonsiz qiladi.

## Imzo nimani kafolatlaydi?

- ✅ **Yaxlitlik** — hujjatdagi bitta bit o'zgarsa, imzo yaroqsiz.
- ✅ **Autentifikatsiya** — imzoni faqat maxfiy kalit egasi yarata oladi.
- ✅ **Inkor etmaslik** — MAC dan farqli o'laroq, tekshiruvchi imzoni o'zi yasay olmaydi, shuning uchun muallif tonib keta olmaydi.
- ❌ **Maxfiylik emas** — imzolangan hujjat ochiq qoladi.

## Zamonaviy imzo algoritmlari

| Algoritm | Asosi | Ishlatilishi |
|---|---|---|
| RSA-PSS | Faktorlash | Sertifikatlar, hujjatlar |
| ECDSA (P-256) | ECC | TLS, Bitcoin, Ethereum |
| **Ed25519** | ECC (Edwards egri chizig'i) | SSH, Signal, zamonaviy tizimlar |

## Ochiq kalitga qanday ishonamiz?

Agar Mallori sizga o'z ochiq kalitini "bankning kaliti" deb bersa-chi? **Sertifikat** — ishonchli tashkilot (**Sertifikatlash markazi**, CA) imzolagan hujjat: "\`bank.uz\` domenining ochiq kaliti — mana bu".

Brauzeringizda bir necha o'nlab ishonchli **ildiz CA** kalitlari oldindan o'rnatilgan. Natijada ishonch zanjiri hosil bo'ladi:

\`\`\`
Ildiz CA → Oraliq CA → bank.uz sertifikati
\`\`\`

Bu tizim **PKI** (ochiq kalit infratuzilmasi) deyiladi.
`,
        practice: { tab: 'hashing', sub: 'signature', label: 'Raqamli imzo laboratoriyasi' },
        check: [
          {
            q: 'Raqamli imzo qaysi kalit bilan yaratiladi?',
            options: ['Imzolovchining ochiq kaliti', 'Imzolovchining maxfiy kaliti', 'Qabul qiluvchining ochiq kaliti', 'Umumiy simmetrik kalit'],
            answer: 1,
            explain: "Imzoni faqat maxfiy kalit egasi yaratadi; tekshirish uchun esa ochiq kalit ishlatiladi.",
          },
          {
            q: 'Raqamli imzo qaysi xossani ta\'minlaydi, MAC esa ta\'minlamaydi?',
            options: ['Yaxlitlik', 'Inkor etmaslik', 'Maxfiylik', 'Tezlik'],
            answer: 1,
            explain: "MAC kalitini ikkala tomon biladi, shuning uchun uchinchi shaxsga muallifni isbotlab bo'lmaydi.",
          },
        ],
      },
      {
        id: 'ecc',
        title: 'Elliptik egri chiziqlar kriptografiyasi (ECC)',
        minutes: 12,
        goals: [
          "Elliptik egri chiziq tenglamasi va nuqtalarni qo'shish g'oyasini bilish",
          "ECDLP masalasini tushunish",
          "ECC nima uchun qisqa kalitlar bilan kuchli ekanini bilish",
        ],
        content: `
## Elliptik egri chiziq

\`\`\`
y² = x³ + a·x + b   (mod p)
\`\`\`

Kriptografiyada egri chiziq chekli maydonda — \`p\` modul bo'yicha olinadi, shuning uchun u silliq chiziq emas, balki **nuqtalar to'plami**.

## Nuqtalarni "qo'shish"

Geometrik ma'nosi (haqiqiy sonlarda): \`P\` va \`Q\` orqali to'g'ri chiziq o'tkazamiz, u egri chiziqni uchinchi nuqtada kesadi; uni \`x\` o'qiga nisbatan aks ettiramiz — bu \`P + Q\`. Chekli maydonda xuddi shu formulalar modul bo'yicha hisoblanadi.

**Skalyar ko'paytirish:** \`k · G = G + G + … + G\` (\`k\` marta). U "ikkilantirish va qo'shish" bilan juda tez hisoblanadi — RSA dagi tez darajaga ko'tarishning o'xshashi.

## Kichik misol

Egri chiziq \`y² = x³ + 2x + 2 (mod 17)\`, boshlang'ich nuqta \`G = (5, 1)\`:

\`\`\`
1·G = (5, 1)
2·G = (6, 3)
3·G = (10, 6)
...
19·G = ∞  (nol nuqta) — G ning tartibi 19
\`\`\`

## Qiyin masala: ECDLP

- \`k\` va \`G\` berilgan → \`Q = k·G\` ni hisoblash **oson**.
- \`G\` va \`Q\` berilgan → \`k\` ni topish **juda qiyin**.

Bu — **elliptik egri chiziqdagi diskret logarifm masalasi**. Maxfiy kalit — \`k\` soni, ochiq kalit — \`Q\` nuqta.

## Nega ECC?

ECDLP uchun faktorlashdagi kabi "aqlli" subeksponensial algoritmlar ma'lum emas. Natijada kalitlar ancha qisqa:

| Xavfsizlik darajasi | RSA | ECC |
|---|---|---|
| 128 bit | 3072 bit | **256 bit** |
| 192 bit | 7680 bit | 384 bit |
| 256 bit | 15360 bit | 521 bit |

Kichikroq kalitlar → tezroq hisoblash, kamroq trafik, kam quvvat. Shuning uchun ECC mobil qurilmalar, IoT va zamonaviy protokollarda standart.

## Amalda

- **ECDH / X25519** — kalit kelishish (DH ning ECC varianti). TLS 1.3 va Signal da.
- **ECDSA / Ed25519** — imzolar.
- Mashhur egri chiziqlar: **Curve25519**, **P-256** (secp256r1), **secp256k1** (Bitcoin).

> ⚠️ ECDSA da har bir imzo uchun tasodifiy \`k\` kerak. 2010-yilda Sony PlayStation 3 doim bir xil \`k\` ishlatgani uchun uning maxfiy kaliti tiklangan. Ed25519 bu muammoni deterministik \`k\` bilan hal qiladi.
`,
        practice: { tab: 'asymmetric', sub: 'ecc', label: 'Elliptik egri chiziq vizualizatori' },
        check: [
          {
            q: '128 bit xavfsizlik uchun ECC kaliti taxminan qancha?',
            options: ['128 bit', '256 bit', '3072 bit', '1024 bit'],
            answer: 1,
            explain: "256 bitli ECC kaliti ≈ 3072 bitli RSA kaliti ≈ 128 bit xavfsizlik.",
          },
          {
            q: 'ECC da maxfiy kalit nima?',
            options: ['Egri chiziqdagi nuqta Q', 'Butun son k', 'Tub son p', 'Generator G'],
            answer: 1,
            explain: "Maxfiy kalit — k soni; ochiq kalit esa Q = k·G nuqtasi.",
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════
  {
    id: 'm7',
    title: 'Real dunyo va professional amaliyot',
    level: 'Yuqori',
    color: 'rose',
    summary: "Hammasini birlashtiramiz: TLS, tipik xatolar, kvantdan keyingi kriptografiya va yakuniy sinov.",
    lessons: [
      {
        id: 'tls',
        title: 'HTTPS va TLS 1.3: hammasi birgalikda',
        minutes: 12,
        goals: [
          "TLS 1.3 qo'l siqishish bosqichlarini bilish",
          "Har bir bosqichda qaysi kriptografik vosita ishlatilishini aniqlash",
        ],
        content: `
## Brauzer manzil satriga \`https://bank.uz\` yozganingizda

TLS 1.3 qo'l siqishishi (handshake) atigi **bitta aylanish** (1-RTT) da tugaydi:

\`\`\`
Brauzer                                     Server
  │ ClientHello: qo'llab-quvvatlanadigan          │
  │   shifrlar + X25519 ochiq kaliti (ECDHE) ───► │
  │                                               │
  │ ◄─── ServerHello: X25519 ochiq kaliti         │
  │      {Sertifikat}  {Imzo}  {Finished}         │
  │                                               │
  │ {Finished} ─────────────────────────────────► │
  │ ◄════════ AES-GCM / ChaCha20 ma'lumot ══════► │
\`\`\`

## Har bir qadamda — kursdagi bir dars

| Qadam | Vosita | Dars |
|---|---|---|
| Umumiy sirni kelishish | **ECDHE** (X25519) | Diffie-Hellman, ECC |
| Server haqiqiyligini isbotlash | **Sertifikat + imzo** (ECDSA/RSA-PSS) | Raqamli imzo |
| Sirdan kalitlarni hosil qilish | **HKDF** (HMAC-SHA256 asosida) | MAC va HMAC |
| Qo'l siqishish yaxlitligi | **Xesh** transkripti | Xesh-funksiyalar |
| Ma'lumotni himoyalash | **AES-GCM / ChaCha20-Poly1305** | AEAD |
| Eski seanslarni himoyalash | Vaqtinchalik kalitlar | Oldinga maxfiylik |

## TLS 1.3 nimani olib tashladi?

Avvalgi versiyalardagi muammoli narsalar butunlay chiqarildi: statik RSA kalit almashinuvi (oldinga maxfiylik yo'q), CBC rejimi, RC4, SHA-1, MD5, siqish. Endi faqat **AEAD** shifrlar va **ephemeral** kalit almashinuvi qoldi.

> 💡 Saboq: yaxshi protokol — bu kuchli algoritmlar **va** to'g'ri tarkib. Har bir qism alohida xavfsiz bo'lsa ham, noto'g'ri birlashtirilsa, tizim zaif bo'ladi.
`,
        check: [
          {
            q: 'TLS 1.3 da umumiy seans siri qaysi usul bilan kelishiladi?',
            options: ['Statik RSA shifrlash', 'ECDHE (vaqtinchalik Diffie-Hellman)', 'Oldindan berilgan parol', 'SHA-256'],
            answer: 1,
            explain: "TLS 1.3 faqat ephemeral (EC)DHE dan foydalanadi — bu oldinga maxfiylikni kafolatlaydi.",
          },
          {
            q: 'TLS da server haqiqiyligini qaysi vosita isbotlaydi?',
            options: ['AES-GCM', 'HKDF', 'Sertifikat va raqamli imzo', 'Nonce'],
            answer: 2,
            explain: "Server o'z maxfiy kaliti bilan qo'l siqishishni imzolaydi; ochiq kaliti esa CA imzolagan sertifikatda.",
          },
        ],
      },
      {
        id: 'pitfalls',
        title: 'Tipik xatolar va amaliy hujumlar',
        minutes: 12,
        goals: [
          "Dasturchilar eng ko'p qiladigan kriptografik xatolarni bilish",
          "Yon kanal hujumlari tushunchasini bilish",
          "Xavfsiz kod yozish qoidalarini qo'llash",
        ],
        content: `
## Qoida №1: O'z kriptografiyangizni yaratmang

> "Har kim o'zi buza olmaydigan shifr yarata oladi." — Bryus Shnayer qonuni

Yangi algoritm yoki protokol o'ylab topmang. Tekshirilgan kutubxonalardan foydalaning: **libsodium**, **Web Crypto API**, Python \`cryptography\`, Go \`crypto/*\`, Java **Tink**.

## Eng ko'p uchraydigan xatolar

### 1. Zaif tasodifiylik

\`\`\`js
// ❌ Kriptografik emas — oldindan bashorat qilinadi
const key = Math.random().toString(36);

// ✅ To'g'ri
const key = crypto.getRandomValues(new Uint8Array(32));
\`\`\`

Python'da \`random\` emas, \`secrets\` moduli ishlating.

### 2. Kodga yozilgan kalitlar

GitHub'ga tushgan API kalitlari va parollar daqiqalar ichida botlar tomonidan topiladi. Kalitlarni muhit o'zgaruvchilarida, maxfiy ma'lumotlar omborida (Vault, KMS) saqlang.

### 3. ECB rejimi yoki takrorlanuvchi IV/nonce

Rejimlar va AEAD darslarini eslang.

### 4. Yaxlitliksiz shifrlash

CBC/CTR ni MAC siz ishlatish — padding oracle va bit almashtirish hujumlari. **AEAD** ishlating.

### 5. Parollarni tez xesh bilan saqlash

MD5/SHA-256 o'rniga **Argon2id**.

### 6. Sertifikatni tekshirmaslik

\`verify=False\` yoki "barcha sertifikatlarga ishon" — HTTPS ni MITM ga ochiq qiladi.

## Yon kanal hujumlari (side-channel)

Algoritm matematik jihatdan mukammal bo'lsa ham, uning **jismoniy bajarilishi** ma'lumot sizdirishi mumkin:

- **Vaqt** — solishtirish yoki hisoblash vaqti maxfiy ma'lumotga bog'liq bo'lsa (timing attack).
- **Quvvat iste'moli** — smart-kartalardan kalitni tiklash (DPA).
- **Kesh** — bir protsessordagi boshqa jarayonlar (Spectre, Meltdown).

Himoya: **doimiy vaqtli** (constant-time) kod, tekshirilgan kutubxonalar, apparat himoyasi (HSM, TPM).

## Kalitlarni boshqarish

Kriptografiya muammoni yo'q qilmaydi — uni **kalitlarni himoyalash** muammosiga aylantiradi. Professional tizimlarda: kalitlar aylanishi (rotation), eng kam huquq, auditorlik, HSM/KMS.
`,
        check: [
          {
            q: 'JavaScript\'da kriptografik kalit yaratish uchun qaysi biri to\'g\'ri?',
            options: ['Math.random()', 'Date.now()', 'crypto.getRandomValues()', 'performance.now()'],
            answer: 2,
            explain: "crypto.getRandomValues() kriptografik xavfsiz tasodifiy sonlar generatoridan (CSPRNG) foydalanadi.",
          },
          {
            q: 'Yon kanal (side-channel) hujumi nimaga asoslanadi?',
            options: [
              'Algoritm formulasidagi xatoga',
              'Bajarilish vaqti, quvvat yoki kesh kabi jismoniy belgilarga',
              'Foydalanuvchini aldashga',
              'Kalitni brute force qilishga',
            ],
            answer: 1,
            explain: "Yon kanal hujumlari algoritmning matematikasiga emas, uning amalga oshirilishidan sizib chiqqan ma'lumotlarga tayanadi.",
          },
        ],
      },
      {
        id: 'post-quantum',
        title: 'Kvant kompyuterlar va kvantdan keyingi kriptografiya',
        minutes: 10,
        goals: [
          "Shor va Grover algoritmlarining ta'sirini bilish",
          "\"Hozir yig'ib ol, keyin och\" tahdidini tushunish",
          "NIST PQC standartlarini (ML-KEM, ML-DSA, SLH-DSA) tanish",
        ],
        content: `
## Kvant tahdidi

Yetarlicha katta kvant kompyuter quyidagilarni amalga oshirishi mumkin:

| Algoritm | Ta'siri | Natija |
|---|---|---|
| **Shor** (1994) | Faktorlash va diskret logarifmni tez yechadi | ❌ RSA, DH, ECC to'liq buziladi |
| **Grover** (1996) | Qidiruvni kvadratik tezlashtiradi | ⚠️ AES-128 → ~64 bit; **AES-256 xavfsiz qoladi** |

Simmetrik shifrlar va xeshlar uchun kalit/chiqish uzunligini ikki barobar oshirish kifoya. Ochiq kalitli kriptografiya esa butunlay yangi matematik asos talab qiladi.

## "Hozir yig'ib ol, keyin och" (harvest now, decrypt later)

Hujumchi bugun shifrlangan trafikni yozib oladi va kvant kompyuter paydo bo'lganda ochadi. 10–20 yil maxfiy qolishi kerak bo'lgan ma'lumotlar (davlat sirlari, tibbiy yozuvlar) uchun xavf **hozirning o'zida** mavjud.

## NIST standartlari (2024-yil avgust)

| Standart | Asl nomi | Vazifasi | Asosi |
|---|---|---|---|
| **FIPS 203 — ML-KEM** | CRYSTALS-Kyber | Kalit kelishish | Panjaralar (lattice) |
| **FIPS 204 — ML-DSA** | CRYSTALS-Dilithium | Raqamli imzo | Panjaralar |
| **FIPS 205 — SLH-DSA** | SPHINCS+ | Raqamli imzo | Faqat xesh-funksiyalar |

Panjaraga asoslangan kriptografiya — ko'p o'lchovli panjaradagi "eng yaqin vektorni topish" kabi masalalarning qiyinligiga tayanadi. Ular uchun samarali kvant algoritmi ma'lum emas.

## Bugungi amaliyot: gibrid rejim

Yangi algoritmlarga hali to'liq ishonch shakllanmagan, shuning uchun **klassik + PQC** birgalikda ishlatiladi:

\`\`\`
umumiy sir = KDF( X25519 siri ‖ ML-KEM siri )
\`\`\`

Hujumchi ikkalasini ham buzishi kerak. Chrome, Firefox, Cloudflare va Signal allaqachon \`X25519MLKEM768\` kabi gibrid kalit almashinuvini ishlatadi.

> 💡 Kriptografik moslashuvchanlik (crypto-agility): tizimni algoritmni oson almashtirish mumkin bo'ladigan qilib loyihalang — keyingi o'zgarish albatta bo'ladi.
`,
        check: [
          {
            q: 'Shor algoritmi qaysi algoritmlarni buzadi?',
            options: ['AES-256', 'SHA-256', 'RSA va ECC', 'ChaCha20'],
            answer: 2,
            explain: "Shor algoritmi faktorlash va diskret logarifmni samarali yechadi — bu RSA, DH va ECC asosi.",
          },
          {
            q: 'Kvant kompyuterlarga qarshi kalit kelishish uchun NIST qaysi standartni qabul qildi?',
            options: ['ML-KEM (Kyber)', 'SHA-3', 'AES-512', 'Ed25519'],
            answer: 0,
            explain: "FIPS 203 — ML-KEM (CRYSTALS-Kyber) panjaraga asoslangan kalit inkapsulyatsiya mexanizmi.",
          },
        ],
      },
      {
        id: 'next-steps',
        title: 'Yakuniy sinov va keyingi qadamlar',
        minutes: 6,
        goals: [
          "Bilimlarni Viktorina va CTF da sinash",
          "Mustaqil o'rganish uchun yo'nalishlarni bilish",
        ],
        content: `
## Tabriklaymiz! 🎓

Siz kriptografiyaning to'liq yo'lini bosib o'tdingiz:

1. **Asoslar** — maqsadlar, Kerkxoffs tamoyili, hujum modellari.
2. **Matematika** — XOR, modulli arifmetika, EKUB, tub sonlar.
3. **Klassik shifrlar** — va ularni buzish usullari.
4. **Simmetrik shifrlash** — OTP, DES, AES, rejimlar, AEAD.
5. **Xeshlar** — SHA-256, HMAC, parollar.
6. **Asimmetrik kriptografiya** — DH, RSA, imzolar, ECC.
7. **Amaliyot** — TLS, xatolar, kvantdan keyingi davr.

## Bilimingizni sinang

- **Viktorina** — nazariy savollar bo'yicha test.
- **CTF Arena** — haqiqiy shifrmatnlarni buzib, "bayroq" topish. Bu kriptotahlilchi kabi fikrlashni o'rgatadi.

## Keyingi qadamlar

**Amaliyot:**
- **CryptoPals** (cryptopals.com) — 48+ amaliy kriptotahlil topshirig'i. Kriptografiyani "buzib" o'rganishning eng yaxshi usuli.
- **CryptoHack** (cryptohack.org) — o'yin shaklidagi topshiriqlar.

**Kitoblar:**
- Jean-Philippe Aumasson — *Serious Cryptography* (amaliy, zamonaviy).
- Christof Paar, Jan Pelzl — *Understanding Cryptography* (talabalar uchun, bepul video ma'ruzalari bor).
- Dan Boneh, Victor Shoup — *A Graduate Course in Applied Cryptography* (chuqur nazariya, bepul).

**Kurslar:**
- Dan Boneh — *Cryptography I* (Coursera, Stanford).

> 💡 Eng muhim saboq: kriptografiya — bu algoritmlar emas, balki **tahdidlar modeli** asosida fikrlash. Har doim so'rang: *"Hujumchi nimani biladi, nima qila oladi va men nimani himoya qilyapman?"*
`,
        practice: { tab: 'ctf', label: 'CTF Arenaga o\'tish' },
        check: [
          {
            q: 'Kriptotizimni loyihalashda birinchi navbatda nimani aniqlash kerak?',
            options: ['Eng yangi algoritmni', 'Tahdidlar modelini: nimani va kimdan himoya qilamiz', 'Kalit uzunligini', 'Dasturlash tilini'],
            answer: 1,
            explain: "Tahdidlar modelisiz to'g'ri vositalarni tanlab bo'lmaydi.",
          },
        ],
      },
    ],
  },
];

/** Barcha darslar tekis ro'yxatda (navigatsiya va progress uchun). */
export const ALL_LESSONS = COURSE_MODULES.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title, level: m.level })),
);

export const TOTAL_MINUTES = ALL_LESSONS.reduce((s, l) => s + l.minutes, 0);

export function findLesson(id) {
  const index = ALL_LESSONS.findIndex((l) => l.id === id);
  if (index === -1) return null;
  return {
    lesson: ALL_LESSONS[index],
    index,
    prev: ALL_LESSONS[index - 1] || null,
    next: ALL_LESSONS[index + 1] || null,
  };
}
