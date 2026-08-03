# Portfolio — Alan (Varland Lengkong)

Website portfolio pribadi berbasis **React + Vite + Tailwind CSS v4** untuk menampilkan dua sisi personal branding: **Developer / Programmer** dan **Creative / Videographer** — dengan fitur toggle mode, dark mode, dan bahasa Indonesia/Inggris.

## Fitur

- Dua mode personal branding (Developer & Creative) dengan gaya visual & konten berbeda
- Dark / light theme
- Toggle bahasa **ID / EN** (i18n berbasis React Context)
- Portfolio grid dengan **filter kategori** + modal detail & lightbox (navigasi keyboard)
- Form kontak terhubung ke **WhatsApp** (dengan fallback email)
- Section harga layanan (freelance)
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

## Menyesuaikan konten

Semua teks terpusat di `src/i18n.jsx` (kamus `id` & `en`). Data terstruktur (portfolio, testimoni, harga, kontak, kualifikasi) ada di `src/data/content.js`.

> Catatan: beberapa tempat masih placeholder — portofolio (`demo`/`github` bernilai `#`), testimoni, dan gambar SVG. Ganti dengan konten asli Anda:

- **Foto/karya asli** → taruh file di `public/images/` lalu ubah path di `content.js`.
- **Link proyek** → ganti nilai `demo` (URL live) dan `github` (URL repo) di `src/data/content.js`.
- **Testimoni** → ganti teks kutipan di `TESTIMONIALS`.

## Konfigurasi lain

- **Analytics**: buat akun di [goatcounter.com](https://www.goatcounter.com/), lalu sesuaikan `data-goatcounter` di `index.html`.
- **Foto profil** → `public/images/profile.svg`.
- **CV** → `public/CV/`.

## Deploy

Push ke branch `main` — workflow `.github/workflows/deploy.yml` otomatis build dan deploy ke GitHub Pages.

## Stack

React 19 · Vite · Tailwind CSS v4 · lucide-react · react-type-animation · oxlint
