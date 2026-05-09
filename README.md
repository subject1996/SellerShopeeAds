# 🛒 Shopee ROAS & OPEX Tracker - Chrome Extension

Ekstensi Google Chrome khusus untuk **Seller Shopee** dan **Advertiser** yang berfungsi menyulap *dashboard* Shopee Ads bawaan menjadi pusat analisis data yang lebih cerdas, *real-time*, dan mendalam. 

Membantu pengiklan untuk segera mengetahui apakah sebuah kampanye iklan sedang menghasilkan keuntungan (*Profit*), sekadar balik modal (*BEP*), atau justru merugi (*Boncos*) secara otomatis, tanpa perlu repot menghitung manual menggunakan kalkulator atau Excel.

---

## ✨ Fitur Unggulan & Manfaat

1. **📊 Manajemen OPEX, Harga Jual, dan Margin**
   Input struktur biaya (OPEX, Harga Jual, Margin) langsung di bawah nama produk pada halaman Shopee Ads. Data tersimpan otomatis secara lokal di *browser* Anda (*Local Storage*).
2. **🎯 Strategi Target ROAS Otomatis**
   Menghitung **ROAS Impas** (Batas Balik Modal) dan memberikan rekomendasi Target ROAS secara instan berdasarkan profil risiko Anda (*Saving, Konservatif, Moderat, Agresif, Sangat Agresif*).
3. **🚦 Indikator Kesehatan ROAS**
   Melabeli ROAS aktual dengan warna: Hijau (**BAGUS**) jika memenuhi target, atau Merah (**KURANG**) jika di bawah target untuk pengambilan keputusan optimasi yang lebih cepat.
4. **📉 Analisis Biaya Iklan & CPO (Cost Per Order)**
   Menghitung metrik krusial untuk mencegah kebangkrutan:
   * Menghitung nilai CPO dan persentasenya terhadap Harga Jual.
   * Menghitung **Profit Aktual (Margin - CPO)**.
   * Label status otomatis (🟢 SEHAT, 🟡 WASPADA, 🔴 BAHAYA) yang batas persentasenya bisa disesuaikan.
5. **👁️ Analisis Kualitas Tayangan (CTR to Conversion)**
   Mendiagnosis masalah tayangan iklan dengan menghitung rasio **Order per 1.000 Tayang**. Dilengkapi label status untuk melihat efektivitas algoritma iklan.
6. **📋 Generator Laporan 1-Klik (Tombol SUMMARY)**
   Mengompilasi seluruh data performa iklan suatu produk menjadi format teks ringkas dan rapi ke dalam *clipboard*, siap untuk di-*paste* ke WhatsApp atau grup pelaporan.
7. **💾 Backup & Restore System**
   Simpan (*Export*) atau muat ulang (*Import*) seluruh konfigurasi strategi dan data OPEX/Margin ke dalam file `.json` dengan mudah.

---

## 🛠️ Cara Instalasi (Local / Developer Mode)

Karena ekstensi ini belum (atau sedang dalam proses) dirilis di Chrome Web Store, Anda dapat menginstalnya secara manual di *browser* Chrome atau Edge (berbasis Chromium) Anda:

1. **Download Repository**
   Klik tombol `Code` hijau di repositori ini, lalu pilih **Download ZIP**. (Atau *clone* via terminal: `git clone https://github.com/username-anda/nama-repo.git`)
2. **Ekstrak File**
   Ekstrak file `.zip` yang baru saja diunduh ke dalam sebuah folder (misal: `Shopee-Tracker-Ext`).
3. **Buka Halaman Ekstensi Chrome**
   Buka Google Chrome, ketik `chrome://extensions/` di *address bar*, lalu tekan Enter.
4. **Aktifkan Developer Mode**
   Di pojok kanan atas halaman, aktifkan (*toggle on*) opsi **Developer mode** (Mode Pengembang).
5. **Load Ekstensi**
   Klik tombol **Load unpacked** (Muat yang belum dibongkar) di pojok kiri atas. Pilih folder tempat Anda mengekstrak file tadi (folder yang berisi file `manifest.json`).
6. **Selesai! 🎉**
   Ekstensi sudah aktif. Ikon ekstensi (S) akan muncul di bilah atas *browser* Anda. Pastikan untuk menekan ikon *Pin* agar ekstensi selalu terlihat.

---

## 📖 Cara Penggunaan

1. Buka *dashboard* **Shopee Ads** Anda seperti biasa.
2. Anda akan melihat kolom *input* baru (**OPEX, Jual, Margin**) muncul di setiap baris produk. Isi angka-angka tersebut sesuai dengan profil produk Anda.
3. Arahkan *kursor (hover)* ke *badge/label* baru yang muncul di samping angka ROAS, Biaya Iklan, dan Dilihat untuk memunculkan **Pop-up Rincian Analisis**.
4. Klik **Ikon Ekstensi** di pojok kanan atas *browser* untuk:
   * Mematikan/menyalakan fitur ekstensi.
   * Menyembunyikan kolom input (agar *dashboard* lebih rapi saat mau di-*screenshot*).
   * Menyesuaikan parameter perkalian **Strategi ROAS**.
   * Menyesuaikan batas persentase **Strategi CPO** (Batas Sehat & Waspada).
   * Melakukan ekspor/impor data (*Backup*).

---

## 🔒 Privasi Data
Ekstensi ini murni berjalan di sisi klien (*client-side*). Seluruh data input Anda (Harga, Margin, OPEX) disimpan secara aman di `chrome.storage.local` *browser* Anda sendiri. Ekstensi ini **TIDAK** mengirimkan data finansial, data login, atau data iklan Anda ke server eksternal mana pun.

---

## 👨‍💻 Author

Dikembangkan oleh **Fitroh Satrio**.

Jika Anda menemukan *bug*, kendala, atau memiliki saran fitur baru, silakan buat *Issue* di repositori ini. *Pull Request* juga sangat dipersilakan!

---
*Disclaimer: Ekstensi ini adalah alat pihak ketiga (Third-party tool) dan tidak memiliki afiliasi resmi dengan Shopee.*
