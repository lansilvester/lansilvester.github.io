# Portfolio — Alan (Varland Lengkong)

Website portfolio pribadi berbasis **React + Vite + Tailwind CSS v4** untuk menampilkan dua sisi personal branding: **Developer / Programmer** dan **Creative / Videographer** — dengan fitur toggle mode, dark mode, bahasa Indonesia/Inggris, dan **dashboard admin (Decap CMS)** untuk mengelola konten.

## Fitur

- Dua mode personal branding (Developer & Creative) dengan gaya visual & konten berbeda
- Dark / light theme
- Toggle bahasa **ID / EN**
- Portfolio grid dengan **filter kategori** + modal detail & lightbox (navigasi keyboard)
- **Feed Instagram** (marquee 2 baris) sebagai portfolio mode Creative
- **Blog** berbasis markdown (`/blog`) dengan halaman detail
- **Tombol WhatsApp mengambang**
- Form kontak dengan **validasi + honeypot**, terkirim ke **email (Web3Forms)** atau fallback WhatsApp
- Section harga layanan (freelance)
- **Dashboard admin** di `/admin/` (Decap CMS): edit teks, tambah skill, upload foto, atur urutan & visibilitas section, **kelola SEO**, **tulis artikel blog**, login GitHub
- SEO: meta Open Graph **yang bisa diedit dari dashboard**, JSON-LD `Person`, `robots.txt`, `sitemap.xml`, `404.html`
- Analytics **GoatCounter**
- **Unit test (Vitest + Testing Library)** sebagai gerbang CI bersama lint
- Deploy otomatis ke GitHub Pages via GitHub Actions

## Menjalankan di lokal

```bash
npm install
npm run dev      # development (http://localhost:5173)
npm run build    # build produksi ke dist/
npm run preview  # pratinjau hasil build
npm run lint     # oxlint
npm test         # vitest
```

## Arsitektur konten

Semua konten yang bisa diedit **disimpan sebagai data (JSON)**, bukan di dalam kode — sehingga bisa dikelola lewat dashboard:

| File | Isi |
| --- | --- |
| `src/data/content.json` | Hero, about, kualifikasi, skill, layanan, portfolio, feed Instagram, harga, kontak (termasuk `CONTACT_FORM`), socials |
| `src/data/ui.json` | Teks label antarmuka (nav, tombol, judul section, placeholder) |
| `src/data/layout.json` | Urutan & visibilitas section di halaman |
| `src/data/site.json` | SEO/Open Graph — dipakai plugin Vite untuk me-replace meta di `index.html` saat build |
| `src/blog/posts/*.md` | Artikel blog (frontmatter + markdown) — dibuat/diedit lewat `/admin/` |

Setiap teks memakai bentuk bilingual `{ "id": "...", "en": "..." }`. Komponen membaca lewat `t()` di `src/i18n.jsx` (path string untuk teks UI, atau objek `{id,en}` langsung untuk data). `src/data/content.js` hanyalah *adapter* yang mengekspor data JSON agar komponen tetap memakai import yang sama.

## Dashboard admin (Decap CMS)

Buka **`https://lansilvester.github.io/admin/`** → login dengan akun GitHub yang punya akses push ke repo. Setiap perubahan otomatis **di-commit ke repo** → workflow build & deploy ulang → perubahan tampil di situs dalam ±1–2 menit. Semua edit punya riwayat versi (git), jadi bisa di-undo.

Yang bisa dikelola dari dashboard:

- **Teks & Label** — semua teks ID/EN (hero, about, judul section, tombol, placeholder, footer)
- **Konten Situs** — menu, socials, profil, kualifikasi, skill (tambah/hapus kelompok & item), layanan, karya portfolio (+ upload gambar), info kontak, paket harga, konfigurasi feed Instagram, form kontak
- **SEO** — title, description, Open Graph (diedit di menu *Settings*)
- **Blog** — tulis/edit artikel markdown; file tersimpan di `src/blog/posts/`, otomatis ikut di-build saat deploy
- **Urutan & Tampilan** — tarik item untuk mengubah urutan section, dan centang/mati-kan visibilitas tiap section

### Form kontak → email (Web3Forms)

Secara bawaan, submit form kontak membuka **WhatsApp**. Untuk mengirim ke **email**, isi `CONTACT_FORM.accessKey` (gratis) dari [web3forms.com](https://web3forms.com/) lewat dashboard admin → menu **Konten Situs → Form Kontak**. Setelah diisi, submit akan mengirim JSON ke endpoint Web3Forms dan hasilnya masuk inbox.

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
- **Feed Instagram** → refresh manual dengan `npm run fetch:instagram` (atau otomatis saat `npm run build`), lalu commit hasilnya.

## Konfigurasi lain

- **Analytics**: buat akun di [goatcounter.com](https://www.goatcounter.com/) dengan subdomain `lansilvester`, sesuaikan `data-goatcounter` di `index.html`.
- **Foto profil** → `public/images/profile.svg`.
- **CV** → `public/CV/`.

## Deploy

Push ke branch `main` — workflow `.github/workflows/deploy.yml` otomatis menjalankan **lint + unit test**, build, lalu deploy ke GitHub Pages. Deploy dibatalkan bila lint/test gagal.

## Stack

React 19 · Vite · Tailwind CSS v4 · react-router · lucide-react · react-type-animation · Decap CMS · Vitest + Testing Library · oxlint
