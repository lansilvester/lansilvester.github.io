---
title: Panduan Penggunaan CMS
---

# Selamat datang di Dashboard Admin 👋

Dashboard ini (Decap CMS) dipakai untuk mengelola semua isi website portfolio tanpa perlu menyentuh kode. Setiap perubahan yang Anda simpan akan otomatis di-commit ke GitHub, lalu situs dibangun ulang dan ter-update dalam ±1–2 menit.

---

## 1. Cara Login

1. Buka **https://lansilvester.github.io/admin/** .
2. Klik **Login with GitHub** lalu izinkan aplikasi.
3. Setelah masuk, Anda akan melihat daftar koleksi di sidebar kiri.

> Butuh login ulang kadang? Wajar — token GitHub kadaluarsa. Cukup login lagi.

---

## 2. Isi Koleksi (Sidebar Kiri)

| Koleksi | Fungsinya |
| --- | --- |
| **Teks & Label** | Semua tulisan tombol, judul section, dan teks UI (Indonesia + Inggris). |
| **Konten Situs** | Data utama: profil, hero, skill, layanan, karya, kualifikasi, harga, kontak. |
| **Urutan & Tampilan** | Atur urutan section dan tampil/sembunyikan section di halaman. |
| **Pengaturan & SEO** | Judul situs, deskripsi meta, gambar share, warna tema. |
| **Panduan** | Halaman yang sedang Anda baca ini. |

> **Soal blog:** Artikel Anda hanya ditampilkan dari **Medium.com** (feed otomatis). Untuk menulis/mengedit tulisan, lakukan di Medium — setelah ±30 menit feed di halaman blog akan ter-update.

---

## 3. Alur Edit & Simpan

1. Pilih koleksi → klik salah satu entri untuk mengedit.
2. Isi form di panel tengah. Pratinjau tampil di panel kanan (khusus blog).
3. Klik **Save** (simpan) → lalu **Publish** bila ada tombolnya.
4. Perubahan langsung ter-commit ke GitHub → situs otomatis di-deploy.

> Semua versi lama tersimpan di riwayat Git, jadi **bisa di-undo** jika salah edit.

---

## 4. Upload Foto & CV

- Klik field **gambar** → pilih **Upload** untuk mengunggah dari perangkat.
- File tersimpan di folder `public/images/uploads`.
- **Path CV (PDF)** di bagian *Tentang*: isi dengan `/CV/CV - Varland Lengkong.pdf` (pastikan nama file persis, termasuk spasi).

---

## 5. Tips

- Klik **Preview** sebelum publish untuk melihat hasil akhir.
- Gunakan browser modern (Chrome/Edge/Firefox).
- Jika ada menu/gambar yang tidak berubah setelah ±2 menit, cek halaman dengan **hard refresh** (Cmd+Shift+R).
