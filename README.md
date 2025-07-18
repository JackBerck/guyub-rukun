# PeduliRasa

Aplikasi berbasis **Laravel 12** dengan frontend **React** (menggunakan Laravel bundler).

---

## Persyaratan Sistem

- PHP >= 8.2
- Composer
- Node.js & npm
- Database (MySQL/PostgreSQL)
- Redis (untuk queue dan broadcast)
- Laravel Reverb (untuk realtime fitur)

---

## Langkah Instalasi

### 1. Clone Repository

Clone atau download repository ini ke komputer Anda:

```bash
git clone https://github.com/username/guyub-rukun.git
cd guyub-rukun
```

### 2. Copy File Environment

Salin file `.env.example` menjadi `.env` untuk konfigurasi environment:

```bash
cp .env.example .env
```

### 3. Konfigurasi Environment

Edit file `.env` sesuai kebutuhan, misal:

- Database (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`)
- Redis (`REDIS_HOST`, `REDIS_PASSWORD`)
- Reverb (`REVERB_*`)
- Email, storage, dsb.

> **Catatan:**  
> Jika ingin mengaktifkan fitur login dengan Google, Anda harus mendaftarkan aplikasi di [Google Cloud Console](https://console.cloud.google.com/) dan mendapatkan **Client ID** serta **Client Secret**.  
> Setelah itu, isi konfigurasi berikut di file `.env` dan `config/services.php`:
> ```
> GOOGLE_CLIENT_ID=xxx
> GOOGLE_CLIENT_SECRET=xxx
> GOOGLE_REDIRECT_URI=http://localhost:8000/oauth/google/callback
> ```
> Pastikan juga sudah mengaktifkan API OAuth di Google dan menambahkan URL redirect yang sesuai.

### 4. Install Dependency Backend

Install semua dependency PHP menggunakan Composer:

```bash
composer install
```

### 5. Install Dependency Frontend

Install semua dependency Node.js untuk React dan bundler:

```bash
npm install
```

### 6. Generate Key & Storage Link

Jalankan perintah berikut:

```bash
php artisan key:generate
php artisan storage:link
```

### 7. Migrasi & Seeding Database

Migrasikan dan seed database agar data awal tersedia:

```bash
php artisan migrate --seed
```

### 8. Build & Jalankan Development Server

Jalankan server pengembangan Laravel + React:

```bash
composer run dev
```

### 9. Jalankan Reverb (Realtime)

Untuk fitur chat dan notifikasi realtime, jalankan Laravel Reverb:

```bash
php artisan reverb:start
```

---

## Fitur Utama

- Autentikasi (register, login, Google/Facebook OAuth)
- Forum diskusi komunitas
- Donasi & permintaan bantuan
- Event/acara komunitas
- Chat realtime (Reverb)
- Notifikasi
- Pencarian multi-model (donasi, forum, event, dsb)

---

## Troubleshooting

- Pastikan semua environment variable sudah diisi dengan benar.
- Jika ada error pada migrasi, cek koneksi database.
- Untuk fitur realtime, pastikan Redis dan Reverb sudah berjalan.
- Untuk storage gambar, pastikan `storage:link` sudah dijalankan.
- Untuk login Google, pastikan konfigurasi Google API sudah benar dan URL redirect sudah didaftarkan di Google Cloud Console.
- Untuk email, aplikasi ini menggunakan [Mailtrap](https://mailtrap.io/) untuk pengujian email.
---

## Kontribusi

Silakan fork dan pull request jika ingin berkontribusi.  
Laporkan bug atau request fitur melalui Issues.

---