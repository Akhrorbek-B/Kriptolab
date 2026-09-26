export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Asosiy tushunchalar",
    question: "Kerkxoffs (Kerckhoffs) tamoyiliga ko'ra kriptotizimning xavfsizligi nimaga bog'liq bo'lishi kerak?",
    options: [
      "Algoritm formulasining qat'iy sir tutilishiga",
      "Faqat va faqat kalitning maxfiyligiga",
      "Dasturiy ta'minot yopiq kodli (closed-source) bo'lishiga",
      "Shifrlanuvchi matnning uzunligiga"
    ],
    answer: 1,
    explanation: "Kerkxoffs tamoyili bo'yicha algoritm barchaga ochiq bo'lishi, tizim xavfsizligi esa faqat maxfiy kalitga tayanishi zarur."
  },
  {
    id: 2,
    category: "Klassik shifrlar",
    question: "Affin shifrida E(x) = (a * x + b) mod 26 formulasi to'g'ri ishlashi va deshifrlanishi uchun 'a' soniga qanday matematik shart qo'yiladi?",
    options: [
      "a soni juft bo'lishi shart",
      "gcd(a, 26) = 1 (a va 26 o'zaro tub bo'lishi kerak)",
      "a soni 26 dan katta bo'lishi kerak",
      "a soni faqat 1 yoki 3 bo'lishi mumkin"
    ],
    answer: 1,
    explanation: "Affin shifrida a ning mod 26 bo'yicha multiplikativ teskarisi mavjud bo'lishi uchun gcd(a, 26) = 1 sharti qanoatlantirilishi shart."
  },
  {
    id: 3,
    category: "Klassik shifrlar",
    question: "Monoalfavit almashtirish shifrlarini (masalan, Sezar) buzishda eng samarali kriptotahlil usuli qaysi?",
    options: [
      "Kolliziya hujumi",
      "Harflar chastotaviy tahlili (Frequency analysis)",
      "Differensial kriptotahlil",
      "O'rtadagi odam (MITM) hujumi"
    ],
    answer: 1,
    explanation: "Monoalfavit shifrlarida har bir harf doimiy bitta boshqa harfga almashgani sababli, tabiiy tildagi harflar chastotasi saqlanib qoladi va chastotaviy tahlil bilan oson ochiladi."
  },
  {
    id: 4,
    category: "Zamonaviy Simmetrik",
    question: "AES (Advanced Encryption Standard) blok shifrining blok o'lchami necha bitni tashkil etadi?",
    options: [
      "64 bit",
      "128 bit",
      "256 bit",
      "512 bit"
    ],
    answer: 1,
    explanation: "AES algoritmida kalit uzunligi 128, 192 yoki 256 bit bo'lishi mumkin, lekin blok o'lchami har doim qat'iy 128 bit (16 bayt) dir."
  },
  {
    id: 5,
    category: "Zamonaviy Simmetrik",
    question: "AES algoritmining har bir standart raundida qaysi 4 ta amal ketma-ket bajariladi?",
    options: [
      "SubBytes -> ShiftRows -> MixColumns -> AddRoundKey",
      "Permutation -> Expansion -> S-Box -> XOR",
      "ShiftRows -> SubBytes -> Feistel -> Modulo",
      "AddRoundKey -> MixColumns -> S-Box -> Permutation"
    ],
    answer: 0,
    explanation: "AES raund strukturasi: SubBytes (S-Box bayt almashtirish), ShiftRows (satrlarni surish), MixColumns (ustunlarni aralashtirish) va AddRoundKey (raund kalitini qo'shish)."
  },
  {
    id: 6,
    category: "Rejimlar",
    question: "Nega ECB (Electronic Codebook) rejimi zamonaviy tizimlarda tavsiya etilmaydi?",
    options: [
      "Hisoblash tezligi juda past bo'lgani uchun",
      "Bir xil ochiq bloklar bir xil shifrmatn bloklarini beradi, naqshlar fosh bo'ladi",
      "Faqat 64 bitli kalitlarni qo'llab-quvvatlagani uchun",
      "IV vektorini talab qilgani uchun"
    ],
    answer: 1,
    explanation: "ECB rejimida takrorlanuvchi ma'lumotlar bir xil shifrlanadi va ma'lumotning ichki statistik strukturasi (masalan, tasvirdagi siluet) shifrmatnda ham saqlanib qoladi."
  },
  {
    id: 7,
    category: "Asimmetrik",
    question: "RSA tizimida p = 7 va q = 11 bo'lsa, Eyler funktsiyasi phi(n) qiymati nechaga teng?",
    options: [
      "77",
      "60",
      "18",
      "70"
    ],
    answer: 1,
    explanation: "phi(n) = (p - 1) * (q - 1) = (7 - 1) * (11 - 1) = 6 * 10 = 60."
  },
  {
    id: 8,
    category: "Asimmetrik",
    question: "Diffie-Hellman protokolining asosiy vazifasi nima?",
    options: [
      "Katta hajmdagi fayllarni bevosita shifrlash",
      "Ochiq kanal orqali umumiy maxfiy kalitni xavfsiz kelishib olish",
      "Elektron raqamli imzo hosil qilish",
      "Fayllarning xesh summasini tekshirish"
    ],
    answer: 1,
    explanation: "Diffie-Hellman algoritmi shifrlash algoritmi emas, balki ikki tomon o'rtasida umumiy simmetrik maxfiy kalit hosil qilish protokoli hisoblanadi."
  },
  {
    id: 9,
    category: "Xeshlash",
    question: "Xesh-funksiyalar uchun 'Ko'chki effekti' (Avalanche effect) nimani anglatadi?",
    options: [
      "Matn uzunligi oshganda xesh uzunligi ham ko'payishi",
      "Kirish matnida 1 ta bit o'zgarganda xesh natijasining taxminan 50% bitlari o'zgarishi",
      "Xesh funksiya orqali asl matnni oson tiklash mumkinligi",
      "Kolliziyalar sonining qor ko'chkisi kabi ortib ketishi"
    ],
    answer: 1,
    explanation: "Kriptografik xesh-funksiyalarda kirishdagi kichik o'zgarish (1 bit) chiqish xeshida tasodifiy kabi ko'ringan katta (taxminan yarmi) o'zgarishga olib kelishi shart."
  },
  {
    id: 10,
    category: "Raqamli Imzo",
    question: "Raqamli imzo yaratishda xesh qiymati qaysi kalit bilan shifrlanadi?",
    options: [
      "Jo'natuvchining ochiq kaliti bilan",
      "Jo'natuvchining yopiq (maxfiy) kaliti bilan",
      "Qabul qiluvchining ochiq kaliti bilan",
      "Qabul qiluvchining yopiq kaliti bilan"
    ],
    answer: 1,
    explanation: "Raqamli imzo jo'natuvchining o'z yopiq kaliti bilan qo'yiladi. Qabul qiluvchi esa uni jo'natuvchining ochiq kaliti orqali tekshiradi."
  },
  {
    id: 11,
    category: "Klassik shifrlar",
    question: "Vigenère shifrida qaysi usul yordamida kalit uzunligini (periodini) aniqlash mumkin?",
    options: [
      "Kasiski testi va Fridman indeksi",
      "Yevklid algoritmi",
      "Diffi-Xellman tahlili",
      "SHA-256 kengaytmasi"
    ],
    answer: 0,
    explanation: "Charlz Bebbidj va Fridrix Kasiski takrorlanuvchi shifrmatn bloklari orasidagi masofalarning eng katta umumiy bo'luvchisini topish orqali kalit uzunligini aniqlash usulini ishlab chiqqan."
  },
  {
    id: 12,
    category: "Zamonaviy Simmetrik",
    question: "DES kaliti 64 bit deb belgilangan bo'lsa-da, uning samarali (effective) kalit uzunligi necha bit?",
    options: [
      "64 bit",
      "56 bit",
      "48 bit",
      "128 bit"
    ],
    answer: 1,
    explanation: "DES ning 64 bitli kalitidagi har bir 8-bit paritetni tekshirish uchun xizmat qiladi, shuning uchun haqiqiy maxfiy kalit kuchi 56 bitga teng."
  }
];

export const CTF_CHALLENGES = [
  {
    id: "ctf-1",
    title: "Missiya 1: Rimlik sarkardaning xabari",
    difficulty: "Oson",
    story: "Razvedka xizmati Sezar shifrida yashirilgan qisqa buyruqni qo'lga kiritdi. Siljish koeffitsientini toping va shifrni buzing!",
    ciphertext: "KHOOR ZRUOG",
    hint: "Siljish k=3 deb taxmin qilib ko'ring.",
    solution: "HELLO WORLD",
    explanation: "Sezar shifrida k=3 siljish bilan 'HELLO WORLD' -> 'KHOOR ZRUOG' bo'ladi."
  },
  {
    id: "ctf-2",
    title: "Missiya 2: Diplomatik sirlar (Vigenere)",
    difficulty: "O'rta",
    story: "Diplomatik pochta orqali kelgan ushbu xabar Vigenere shifri bilan yopilgan. Kalit so'z 'KEY'. Xabarni deshifrlang.",
    ciphertext: "RIJVS UYVJN",
    hint: "Vigenere dekoderiga kalit sifatida 'KEY' so'zini kiriting.",
    solution: "HELLO WORLD",
    explanation: "Plaintext: HELLO WORLD, Key: KEYKEYKEYK -> Ciphertext: RIJVS UYVJN."
  },
  {
    id: "ctf-3",
    title: "Missiya 3: Zaif RSA kaliti",
    difficulty: "Qiyin (Akademik)",
    story: "Tizimda p=5, q=11, e=3 parametrlari ishlatilgan. Shifrmatn c = 9. Ochiq sonli xabar m ni toping!",
    ciphertext: "c = 9, n = 55, e = 3",
    hint: "phi(55) = 4 * 10 = 40. d * 3 = 1 mod 40 -> d = 27. m = 9^27 mod 55 ni hisoblang.",
    solution: "14",
    explanation: "d = 27. m = 9^27 mod 55 = 14. Demak asl xabar 14 bo'lgan!"
  }
];
