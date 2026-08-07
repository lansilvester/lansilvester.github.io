# LEARNING.md — Memahami Project Portfolio

Dokumen ini adalah **panduan belajar** untuk memahami cara kerja project ini, berdasarkan pelajaran nyata dari sesi pengembangan (termasuk perburuan bug dan proses deploy). Beda dengan `README.md` yang berisi "cara pakai", dokumen ini menjelaskan **kenapa** arsitekturnya begini dan **pola** yang bisa kamu pakai ulang di project lain.

---

## 1. Peta project (sekilas)

```
├── index.html                # Entry HTML; meta SEO di-replace saat build (src/data/site.json)
├── package.json              # Script: dev / build / prebuild / lint / test / fetch:*
├── vite.config.js            # Config Vite (plugin, base path untuk GitHub Pages)
├── public/
│   ├── admin/config.yml      # Dashboard Decap CMS (definisi koleksi konten)
│   ├── images/               # Gambar statis (foto profil, background, feed Instagram)
│   └── CV/                   # File CV
├── scripts/
│   ├── fetch-medium.mjs      # Ambil artikel Medium → src/data/medium-posts.json
│   └── fetch-instagram.mjs   # Ambil feed Instagram → JSON + gambar
├── src/
│   ├── App.jsx               # Router, lazy-loading section, state mode
│   ├── data/                 # SEMUA konten: content.json, ui.json, layout.json, site.json
│   ├── components/
│   │   ├── sections/         # Section halaman (Home, About, Skills, Portfolio, dst.)
│   │   ├── effects/          # Efek canvas (ParticleField, LongShadowBackground, LogoMarquee)
│   │   ├── ui/               # Komponen kecil dipakai ulang (Icon, Reveal, SectionTitle, ...)
│   │   ├── blog/             # List artikel + halaman detail blog
│   │   └── layout/           # Header, Footer, ScrollUp, WhatsAppFloat
│   ├── hooks/                # useI18n, useTheme, useInView, useScroll, useActiveSection
│   ├── utils/                # blog.js, skillLogo.js, playClickSound.js, dll
│   ├── i18n.jsx              # Provider + fungsi t() untuk bahasa ID/EN
│   └── blog/posts/*.md       # Artikel blog (frontmatter + markdown)
└── .github/workflows/
    ├── deploy.yml            # Push → lint + test + build → deploy GitHub Pages
    └── update-instagram.yml  # Cron tiap 3 jam: refresh feed + commit + trigger deploy
```

---

## 2. Prinsip utama: konten terpisah dari kode

Hampir semua isi situs hidup di `src/data/*.json`, bukan di dalam komponen. Keuntungannya:

- Konten bisa diedit lewat dashboard admin (Decap CMS) **tanpa menyentuh kode**.
- Satu komponen melayani banyak data (mis. `Skills` membaca `MODES[mode].skills`).
- Test lebih mudah karena data = masukan murni.

Pembagian file data:

| File | Isi | Dipakai oleh |
| --- | --- | --- |
| `src/data/content.json` | Konten utama: hero, about, kualifikasi, skill, layanan, portfolio, harga, kontak, socials | `src/data/content.js` (adapter) |
| `src/data/ui.json` | Label antarmuka (nav, tombol, judul section) — diakses lewat path bertitik | `t('nav.home')` |
| `src/data/layout.json` | Urutan & visibilitas section | `App.jsx` |
| `src/data/site.json` | SEO / Open Graph | Plugin Vite saat build |
| `src/blog/posts/*.md` | Artikel blog | `src/utils/blog.js` |

> Pelajaran: pisahkan **data**, **logika**, dan **tampilan**. Perubahan "ganti galeri menjadi feed Instagram" terjadi cukup dengan menambah 1 komponen + data baru, tanpa menulis ulang halaman.

---

## 3. Bahasa ID/EN: pola `t()`

Setiap teks bilingual disimpan sebagai **objek `{ id, en }`** atau **string path** ke `ui.json`. Fungsi `t()` di `src/i18n.jsx` menerima keduanya:

```js
t('hero.title')        // path bertitik → cari di ui.json
t({ id: 'Halo', en: 'Hello' }) // objek langsung
```

`LanguageProvider` membaca pilihan bahasa dari `localStorage`, dan menaruhnya di `document.documentElement[lang]` untuk aksesibilitas.

> **Pelajaran penting (dari bug hari ini):** karena `t()` menerima objek, mudah tergoda memakai objek itu langsung sebagai React `key`, misalnya `key={stat.label}`. React men-stringify semua objek menjadi `"[object Object]"` → **semua key tampak sama** → warning "two children with the same key", dan di React 19 ini bisa menyebabkan child ter-duplikasi/hilang. **Aturan: React `key` harus primitif yang stabil** — pakai `stat.label.id`, bukan objeknya.

---

## 4. Mode Developer vs Creative

Satu komponen, dua varian data. `MODES` di `content.json` mendefinisikan perbedaan antar mode: subtitle, skills, services, portfolio, CTA. Komponen membaca `MODES[mode]` lalu me-render sesuai mode aktif:

```js
const modeData = MODES[mode]
modeData.skills.map(...)
```

Perpindahan mode dipakai untuk swap data (`key={`skills-${mode}`}`) supaya React me-render ulang blok dengan animasi transisi.

> Pelajaran: kalau ada "2 varian data" untuk satu tampilan, jangan bikin 2 komponen. Bikin 1 komponen + struktur data ber-key per varian. Lebih mudah dirawat.

---

## 5. Kinerja & rendering

- **Code splitting**: section besar di-`lazy` (`React.lazy` + `<Suspense fallback={null}>`). Bukti nyata di output build: `Skills-*.js`, `Portfolio-*.js`, `BlogList-*.js` adalah chunk terpisah yang hanya dimuat saat dibutuhkan.
- **Lazy images**: `loading="lazy"` + `decoding="async"` pada `<img>`.
- **WebP**: gambar dikonversi ke WebP (jauh lebih kecil dari JPG/PNG).
- **`prebuild` otomatis**: Vite/npm menjalankan script `prebuild` sebelum `build`. Di sini ia memuat ulang feed Medium & Instagram, sehingga build selalu pakai data terbaru.

---

## 6. Efek canvas

`ParticleField` dan `LongShadowBackground` menggambar partikel/logo via `<canvas>`:

- `requestAnimationFrame` untuk animasi; pastikan di-`cancelAnimationFrame` di cleanup.
- Skala **DPR** (`devicePixelRatio`, dibatasi 2) agar gambar tajam di layar retina.
- `prefers-reduced-motion` → jangan jalankan animasi untuk pengguna yang meminta gerak dikurangi (aksesibilitas).
- `MutationObserver` untuk me-refresh warna saat tema/mode berubah.

> Pelajaran testing: di environment jsdom, `canvas.getContext()` mengembalikan `null` dan `IntersectionObserver`/`Path2D` tidak ada. Untuk smoke test, kamu harus **mock** semuanya. Dan mock yang tidak lengkap akan menimbulkan error palsu (mis. `ctx.fillText is not a function`).

---

## 7. Marquee seamless (loop mulus)

Rahasia loop tanpa "lompatan": konten di-duplikasi, lalu dianimasikan `translateX(-50%)`:

- `buildTrack()` membuat `[...seq, ...seq]` (tiap item 2×).
- `.marquee-track { animation: marquee 80s linear infinite; }` dengan keyframe `to { transform: translateX(-50%) }`.
- Salinan kedua ditandai `aria-hidden` agar screen reader tidak membacanya dua kali.

> Pelajaran (dari bug hari ini): konten berulang + `key` berbasis `logo.name` → **duplicate key** karena tiap nama muncul 2× dalam satu list. Solusinya `key={`${logo.name}-${i}`}`.

---

## 8. Feed eksternal: Medium & Instagram

### Medium (build-time)
Artikel Medium di-fetch saat build (`scripts/fetch-medium.mjs`) → `src/data/medium-posts.json`. **Kenapa bukan di browser?** Karena rss2json memblokir fetch dari browser (CORS/kebijakan). Kesimpulan: pilih waktu fetch (build-time vs runtime) berdasarkan kebijakan penyedia.

### Instagram (API internal + otomasi)
`scripts/fetch-instagram.mjs` memakai endpoint internal `web_profile_info` dengan header khusus, mengunduh gambar ke `public/images/instagram/`, dan menyimpan metadata ke `src/data/instagram-posts.json`.

Pelajaran penting:
- **API tidak resmi bisa berubah** — siapkan fallback/cek rutin.
- Selalu pasang **timeout** (`AbortController` + `setTimeout(..., 30_000)`) supaya proses tidak menggantung saat jaringan lambat. Harus `clearTimeout` di `finally`.

### Otomasi cron (feed selalu segar)
`.github/workflows/update-instagram.yml`:
1. Cron `17 */3 * * *` (setiap 3 jam) + bisa di-trigger manual (`workflow_dispatch`).
2. Jalankan `node scripts/fetch-instagram.mjs`.
3. Jika ada perubahan di `instagram-posts.json` / gambar → **commit + push otomatis** sebagai `github-actions[bot]`, lalu **trigger ulang** `deploy.yml`.

> Pola yang dipelajari: "jadwal → script → commit otomatis → deploy ulang" adalah cara umum menjaga konten dinamis di situs statis.

---

## 9. Deployment & CI/CD

Alur `.github/workflows/deploy.yml`:

```
push ke main
  → lint (oxlint)
  → test (vitest)
  → build (vite build, memicu prebuild)
  → upload-pages-artifact (dist/)
  → deploy-pages
```

Pelajaran:
- **Gerbang keamanan bawaan**: jika lint/test gagal, tidak ada yang ter-deploy. Deploy hanya job `build` yang sukses.
- **Versi Node sengaja di-pin Node 24** karena jsdom 26 butuh `node:webidl` yang tidak ada di Node 20. Versi runtime harus sinkron dengan dependensi.
- **`prebuild` = hook npm** yang otomatis jalan sebelum `build` — bukan sihir.
- Perhatikan **deprecation warning** action (mis. action Node 20 dipaksa jalan di Node 24) — tidak memblokir tapi layak di-update.

---

## 10. Dashboard admin (Decap CMS)

- Buka `https://lansilvester.github.io/admin/`, login GitHub.
- Setiap edit **otomatis di-commit ke repo** → workflow deploy ulang → situs ter-update ±1–2 menit.
- Semua edit punya riwayat git → bisa di-undo.
- Konfigurasi koleksi ada di `public/admin/config.yml`. Pelajaran dari sesi ini: **admin config harus sinkron dengan struktur nyata** — saat section Gallery/Testimonial dihapus, blok koleksinya (termasuk `videos`, opsi layout, kategori lama) harus ikut dihapus, dan field baru (`photoDeveloper`, `background`, `cv`, `instagram`) harus ditambahkan. YAML divalidasi (di sini via Ruby) sebelum di-commit.

---

## 11. Design system & aksesibilitas

- **Token warna**: variabel CSS `--c-*` (body, card, title, text, muted, border) dan `--p-*` (primary). Dark mode = override variabel di `.dark`; mode creative = override `--p-*` di `html[data-mode='creative']`. Tailwind v4 menghubungkannya lewat `@theme inline`.
- **Komponen kecil dipakai ulang**: `SectionTitle`, `Reveal` (animasi scroll via IntersectionObserver, menambah class `is-visible`), `Icon` (nama → SVG), `SkillLogo`.
- **Aksesibilitas**: `aria-hidden` pada elemen dekoratif, `aria-label`, `focus-visible`, `prefers-reduced-motion`.
- **Hapus kode mati**: import tak terpakai, token CSS tak terpakai (`--breakpoint-xxl`), class mati (`marquee-scroll`), dan `console.log` di test — semua dibersihkan karena menambah bundle & membingungkan pembaca.

---

## 12. Pola bug yang dipelajari hari ini (checklist)

| Gejala | Akar masalah | Pencegahan |
| --- | --- | --- |
| Warning "two children with the same key" (atau `[object Object]`) | Objek dipakai langsung sebagai `key`, atau list berisi duplikat | Key harus primitif & stabil; gunakan `.id` atau key gabungan dengan indeks |
| Memory leak / behavior aneh di SPA | Timer/listener/observer tidak di-cleanup di `useEffect` | Selalu return cleanup: `clearTimeout`, `removeEventListener`, `observer.disconnect()` |
| Crash "undefined is not..." | Asumsi data selalu ada (mis. daftar logo kosong) | Guard di sisi render; jangan biarkan array berisi `undefined` |
| Error palsu saat test | Mock environment tidak lengkap (canvas/IO/Path2D) | Lengkapi mock; bedakan "bug app" vs "mock kurang" |

---

## 13. Alur kerja dengan AI Agent (meta-pelajaran)

Agar tidak "sekadar pakai agent":

1. **Minta audit/review dulu**, bukan langsung "perbaiki" — review menemukan bug yang tak terlihat.
2. **Verifikasi dengan perintah konkret** sebelum commit: `npm run lint` → `npm test` → `npm run build`.
3. **Periksa `git status` / `git diff`** sebelum commit; scan secret; jangan commit file yang tidak dimaksud.
4. **Catat status kerja** (todo/handoff) supaya sesi bisa dilanjutkan tanpa mengulang.
5. **Konfirmasi sebelum aksi berisiko** (push/deploy) — keputusan tetap milikmu.

---

## 14. Glosarium singkat

- **SSG/SPA**: situs statis (hasil build di-upload) dengan logika React di client.
- **Decap CMS**: editor konten di browser yang commit ke git.
- **prebuild**: script npm yang otomatis jalan sebelum `build`.
- **rss2json**: layanan konversi RSS → JSON; memblokir akses browser.
- **AbortController**: cara membatalkan `fetch` (untuk timeout).
- **DPR** (devicePixelRatio): rasio piksel fisik vs CSS; dipakai agar canvas tajam di layar retina.
- **`@custom-variant dark`**: cara Tailwind v4 mendefinisikan varian dark mode.
- **Workflow_dispatch**: trigger manual workflow GitHub Actions dari UI.
- **github-actions[bot]**: identitas default untuk commit otomatis dari Actions.
