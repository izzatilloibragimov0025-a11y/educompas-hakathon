# 🚀 EduKompas.AI

**EduKompas.AI** — bu maktabgacha yoshdagi (3-6 yosh) bolalar uchun mo'ljallangan, sun'iy intellektga asoslangan shaxsiylashtirilgan ta'lim platformasi. Loyiha **Phygital** (Physical + Digital) yondashuvidan foydalanib, bolaning ekran vaqtini nazorat qiladi va uni real dunyodagi jismoniy mashg'ulotlarga undaydi.

---

## ✨ Loyihaning Hozirgi To'liq Imkoniyatlari

Loyiha hozirgi bosqichda quyidagi to'liq funksional imkoniyatlarga ega:

### 1. Shaxsiylashtirilgan Onboarding (Tanishuv)
* **Demografik moslashuv:** Bolaning ismi, yoshi (3-6) va jinsi (o'g'il/qiz) so'raladi.
* **Qiziqishlarni aniqlash:** Jinsiga mos ravishda (masalan, qizlar uchun malikalar, o'g'il bolalar uchun mashinalar, yoki umumiy kosmos, tabiat) qiziqishlar ro'yxati taqdim etiladi.
* **Ma'lumotlarni saqlash:** Barcha ma'lumotlar brauzerning `localStorage` xotirasida saqlanadi, shuning uchun dasturga qayta kirganda bola o'z profilidan davom etadi.

### 2. Sun'iy Intellekt (Gemini API) Integratsiyasi
* **Dinamik o'yinlar:** Bolaning qiziqishlari va yoshiga qarab, Google Gemini 2.5 Flash modeli real vaqt rejimida matematik va mantiqiy topshiriqlarni (masalan, sanash, topish) generatsiya qiladi.
* **Oflayn vazifalar (Phygital):** Ekran vaqti tugagach, AI bolaning qiziqishiga mos ravishda uy sharoitida bajariladigan jismoniy vazifa o'ylab topadi (masalan, "Uydagi 3 ta dumaloq narsani top").

### 3. Astro-Car — Interaktiv Virtual Yordamchi
* **Emotsional SVG Animatsiya:** Astro-Car qahramoni holatga qarab o'z emotsiyalarini o'zgartiradi (xursand, o'ylanayotgan, hayajonlangan, xafa, uxlayotgan).
* **Ovozli muloqot (TTS):** Bolalar hali o'qishni bilmasligini hisobga olib, barcha topshiriqlar va rag'batlantirishlar Web Speech API orqali o'zbek tilida ovozli tarzda o'qib eshittiriladi.
* **Sinxron animatsiya:** Astro-Car gapirayotganda uning og'zi va antennasi sinxron ravishda harakatlanadi.

### 4. Gamifikatsiya va Mukofotlash Tizimi
* **NaviCoin va Streak:** Har bir muvaffaqiyatli missiya uchun bola tangalar (NaviCoin) yig'adi va kunlik kirishlar (streak) hisoblab boriladi.
* **Vizual va Audio Rag'bat:** To'g'ri javob berilganda konfetti yomg'iri, 3D pufakchalar animatsiyasi va maxsus g'alaba musiqasi (SFX) chalinadi.

### 5. Professional UI/UX Dizayn
* **Bolalarbop interfeys:** Katta, bosishga qulay 3D tugmalar, yorqin gradient ranglar va shishasimon (Glassmorphism) effektlar.
* **Mikro-animatsiyalar:** Tailwind CSS yordamida yozilgan silliq o'tishlar, sakrash (bounce), suzish (float) va puls animatsiyalari.

---

## 🛠 Texnologiyalar Steki

* **Frontend:** React 18, TypeScript
* **Styling:** Tailwind CSS (Custom animatsiyalar va 3D effektlar bilan)
* **AI Model:** `@google/genai` (Gemini 2.5 Flash)
* **Audio:** Web Audio API (SFX sintezi), Web Speech API (TTS)
* **Icons:** Lucide React

---

## 📖 Foydalanuvchi Qo'llanmasi

1. **Ilovani ishga tushirish:** Ilova ochilganda birinchi marta kirayotgan foydalanuvchilar uchun umumiy "EduKompas.AI" splash ekrani chiqadi.
2. **Ro'yxatdan o'tish:** Ism, jins, yosh va qiziqishlarni tanlang.
3. **Asosiy Ekran (Home):** Bu yerda sizning statiskangiz (tangalar, kunlar) va bugungi missiya ko'rinadi. "Boshlash" tugmasini bosing.
4. **O'yin jarayoni:** Astro-Car sizga ovozli topshiriq beradi. Ekranda paydo bo'lgan 3D pufakchalardan to'g'risini topib bosing. Xato qilsangiz, pufakcha qizarib tebranadi va Astro-Car yordam beradi.
5. **Sessiya yakuni:** Topshiriqni to'liq bajargach, mukofot olasiz.
6. **Phygital Lock (Qulflash):** O'yindan so'ng ilova "uxlash" rejimiga o'tadi va sizga real dunyoda bajarish uchun oflayn vazifa beradi.
7. **Tizimni tozalash:** Asosiy ekrandagi "Chiqish" (LogOut) tugmasi yoki Splash ekrandagi "Tozalash" tugmasi orqali ma'lumotlarni o'chirib, ilovani boshidan sinab ko'rishingiz mumkin.

---

## 📂 Fayllar Tuzilishi va Ularning Mazmuni

Loyiha modulli va kengaytirishga qulay tarzda tuzilgan. Quyida har bir faylning vazifasi keltirilgan:

### Asosiy Fayllar
* **`metadata.json`**: Ilovaning nomi va qisqacha tavsifini o'z ichiga olgan konfiguratsiya fayli.
* **`index.html`**: Ilovaning kirish nuqtasi. Bu yerda Tailwind CSS konfiguratsiyasi (maxsus ranglar, gradientlar, 3D soyalar va murakkab keyframe animatsiyalar) hamda ESM import xaritalari (`importmap`) joylashgan.
* **`index.tsx`**: React ilovasini DOM ga ulash (mount) uchun mas'ul bo'lgan asosiy fayl.
* **`App.tsx`**: Ilovaning yuragi. Barcha ekranlar (screens) o'rtasidagi navigatsiyani (router) boshqaradi. Foydalanuvchi holatini (state) `localStorage` dan o'qiydi va saqlaydi.
* **`types.ts`**: TypeScript interfeyslari (`User`, `GameTask`, `ScreenState`). Kodning xatosiz va tiplashtirilgan bo'lishini ta'minlaydi.
* **`constants.ts`**: O'zgarmas ma'lumotlar bazasi. Qiziqishlar ro'yxati (jinsga moslashtirilgan) va emojilar xaritasi (`EMOJI_MAP`) shu yerda saqlanadi.

### Komponentlar (`components/`)
* **`UI.tsx`**: Qayta ishlatiladigan UI elementlar to'plami:
  * `Button`: 3D effektli, bosilganda ovoz chiqaradigan interaktiv tugma.
  * `GlassCard`: Shishasimon (backdrop-blur) fonli kartochka.
  * `AstroCar`: Ilovaning asosiy qahramoni. Sof SVG kodlaridan yozilgan bo'lib, props orqali emotsiyalarni qabul qiladi va gapirayotganda og'zi/antennasi qimirlaydi.
  * `Confetti`: G'alaba qozonganda ekranda sochilib tushadigan zarrachalar animatsiyasi.

### Xizmatlar (`services/`)
* **`ai.ts`**: Google Gemini API bilan ishlash mantiqi. Ikkita asosiy funksiyani o'z ichiga oladi:
  * `generateMissionTask`: Bolaning yoshi, jinsi va qiziqishiga qarab JSON formatida o'yin topshirig'ini yaratadi.
  * `generatePhygitalTask`: Ekran vaqti tugagach, oflayn bajarish uchun qisqa matnli vazifa o'ylab topadi.
* **`audio.ts`**: Ilovaning audio dvigateli:
  * `sfx`: Web Audio API yordamida tashqi fayllarsiz (mp3/wav) to'g'ridan-to'g'ri brauzerda tovushlarni (pop, tap, success, error) sintez qiladi.
  * `playTTS`: Web Speech API yordamida matnni o'zbek tilida (yoki eng yaqin muqobil tilda) o'qib beradi.

### Ekranlar (`screens/`)
* **`Splash.tsx`**: Ilova yuklanayotganda chiqadigan kirish ekrani. Yangi foydalanuvchilar uchun umumiy, eski foydalanuvchilar uchun esa ismiga murojaat qiluvchi shaxsiylashtirilgan ko'rinishga ega.
* **`Onboarding.tsx`**: 3 bosqichli ro'yxatdan o'tish jarayoni (Ism/Jins -> Yosh -> Qiziqishlar).
* **`Home.tsx`**: Asosiy boshqaruv paneli. Bolaning yutuqlari (NaviCoin, Streak) va bugungi missiyani boshlash tugmasi joylashgan.
* **`Game.tsx`**: Asosiy o'yin ekrani. AI tomonidan generatsiya qilingan topshiriqni ko'rsatadi. Bola to'g'ri emojilarni topib bosishi kerak. Progress bar va xatolarni tekshirish mantiqi shu yerda.
* **`SessionEnd.tsx`**: O'yin muvaffaqiyatli tugatilganda chiqadigan tabriklash ekrani. Tangalar beriladi va konfetti otiladi.
* **`PhygitalLock.tsx`**: Ekran vaqtini cheklovchi qulflangan ekran. Astro-Car "uxlash" rejimiga o'tadi va bolaga real dunyoda bajarishi kerak bo'lgan vazifani ovozli tarzda tushuntiradi.
