# Portfolio — Alan (Varland Lengkong)

Website portfolio pribadi berbasis **React + Vite + Tailwind CSS v4** untuk menampilkan dua sisi personal branding: **Developer / Programmer** dan **Creative / Videographer** — dengan fitur toggle mode, dark mode, bahasa Indonesia/Inggris, dan **dashboard admin (Decap CMS)** untuk mengelola konten.

## Fitur

- Dua mode personal branding (Developer & Creative) dengan gaya visual & konten berbeda
- Dark / light theme
- Toggle bahasa **ID / EN**
- Portfolio grid dengan **filter kategori** + modal detail & lightbox (navigasi keyboard)
- Form kontak terhubung ke **WhatsApp** (dengan fallback email)
- Section harga layanan (freelance)
- **Dashboard admin** di `/admin/` (Decap CMS): edit teks, tambah skill, upload foto, atur urutan & visibilitas section, login GitHub
- SEO: meta Open Graph, JSON-LD `Person`, `robots.txt`, `sitemap.xml`, `404.html`
- Analytics **GoatCounter**
- Deploy otomatis ke GitHub Pages via GitHub Actions

## Menjalankan di lokal

```bash
npm install
npm run dev      # development (http://localhost:5173)
npm run build    # build produksi ke dist/
npm run preview  # pratinjau hasil build
npm run lint     # oxlint
```

## Arsitektur konten

Semua konten yang bisa diedit **disimpan sebagai data (JSON)**, bukan di dalam kode — sehingga bisa dikelola lewat dashboard:

| File | Isi |
| --- | --- |
| `src/data/content.json` | Hero, about, kualifikasi, skill, layanan, portfolio, testimoni, harga, kontak, socials |
| `src/data/ui.json` | Teks label antarmuka (nav, tombol, judul section, placeholder) |
| `src/data/layout.json` | Urutan & visibilitas section di halaman |

Setiap teks memakai bentuk bilingual `{ "id": "...", "en": "..." }`. Komponen membaca lewat `t()` di `src/i18n.jsx` (path string untuk teks UI, atau objek `{id,en}` langsung untuk data). `src/data/content.js` hanyalah *adapter* yang mengekspor data JSON agar komponen tetap memakai import yang sama.

## Dashboard admin (Decap CMS)

Buka **`https://lansilvester.github.io/admin/`** → login dengan akun GitHub yang punya akses push ke repo. Setiap perubahan otomatis **di-commit ke repo** → workflow build & deploy ulang → perubahan tampil di situs dalam ±1–2 menit. Semua edit punya riwayat versi (git), jadi bisa di-undo.

Yang bisa dikelola dari dashboard:

- **Teks & Label** — semua teks ID/EN (hero, about, judul section, tombol, placeholder, footer)
- **Konten Situs** — menu, socials, profil, kualifikasi, skill (tambah/hapus kelompok & item), layanan, karya portfolio (+ upload gambar), testimoni, info kontak, paket harga
- **Urutan & Tampilan** — tarik item untuk mengubah urutan section, dan centang/mati-kan visibilitas tiap section

### Setup login admin (sekali, via Cloudflare Workers)

Login GitHub pada Decap butuh **OAuth App** + **proxy OAuth** (Cloudflare Worker). Langkahnya:

1. **Buat GitHub OAuth App** — https://github.com/settings/applications/new
   - *Homepage URL*: `https://<proxy-domain>.workers.dev`
   - *Authorization callback URL*: `https://<proxy-domain>.workers.dev/callback`
   - Simpan *Client ID* dan generate *Client Secret*.
2. **Deploy proxy** (template resmi `sterlingwes/decap-proxy`):
   ```bash
   git clone https://github.com/sterlingwes/decap-proxy && cd decap-proxy
   cp wrangler.toml.sample wrangler.toml   # ubah `name` sesuai keinginan
   npx wrangler login
   npx wrangler secret put GITHUB_OAUTH_ID     # isi Client ID
   npx wrangler secret put GITHUB_OAUTH_SECRET # isi Client Secret
   npx wrangler deploy
   ```
   Buka URL worker — harus muncul tulisan "Hello 👋".
3. **Isi `base_url`** di `public/admin/config.yml` dengan `https://<proxy-domain>.workers.dev`, lalu commit & push.

> Repo ini publik, jadi tidak perlu variabel `GITHUB_REPO_PRIVATE`.

### Tes offline (opsional)

Untuk mencoba editor tanpa push:
1. Ubah `local_backend: false` → `true` di `public/admin/config.yml`.
2. Jalankan `npx decap-server` (terpisah) lalu `npm run dev` dan buka `http://localhost:5173/admin/`.
3. Kembalikan `local_backend: false` sebelum deploy.

## Mengubah konten langsung di kode

Semua bisa diedit lewat dashboard, tapi bila perlu langsung:

- **Foto/karya asli** → taruh di `public/images/` (atau `public/images/uploads/`), lalu ubah path di `src/data/content.json`.
- **Link proyek** → nilai `demo` (URL live) dan `github` (URL repo) di `src/data/content.json` (awalnya `#`).
- **Testimoni** → bagian `TESTIMONIALS` di `src/data/content.json`.

## Konfigurasi lain

- **Analytics**: buat akun di [goatcounter.com](https://www.goatcounter.com/) dengan subdomain `lansilvester`, sesuaikan `data-goatcounter` di `index.html`.
- **Foto profil** → `public/images/profile.svg`.
- **CV** → `public/CV/`.

## Deploy

Push ke branch `main` — workflow `.github/workflows/deploy.yml` otomatis build dan deploy ke GitHub Pages.

## Stack

React 19 · Vite · Tailwind CSS v4 · lucide-react · react-type-animation · Decap CMS · oxlint
