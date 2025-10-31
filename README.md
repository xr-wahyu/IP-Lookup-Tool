# 🌐 IP Lookup Tool

[![Lisensi: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/xr-wahyu/IP-Lookup-Tool/blob/main/LICENSE)

Tool berbasis web yang sederhana dan responsif untuk menemukan informasi detail mengenai sebuah alamat IP. Anda dapat melacak IP apa pun atau langsung memeriksa IP publik Anda saat ini dengan satu kali klik.

Dibangun dengan HTML, CSS, dan JavaScript murni.

---

## 🚀 Live Demo

Anda bisa langsung mencoba aplikasi ini di link berikut:

**[https://xr-wahyu.github.io/IP-Lookup-Tool/](https://xr-wahyu.github.io/IP-Lookup-Tool/)**

---

## 📸 Tampilan

Berikut adalah tangkapan layar dari aplikasi di desktop dan mobile.

*(**PENTING:** Ganti `link-ke-gambar-anda.png` di bawah ini dengan mengunggah gambar Anda sendiri ke repositori dan menyalin link-nya)*

| Desktop | Mobile |
| :---: | :---: |
| ![Tampilan Desktop](link-ke-gambar-desktop.png) | ![Tampilan Mobile](link-ke-gambar-mobile.png) |

---

## ✨ Fitur

* **Cek IP Sendiri:** Otomatis mendeteksi dan menampilkan detail IP publik Anda saat ini.
* **Lacak IP Apa Saja:** Masukkan alamat IPv4 atau IPv6 untuk mendapatkan informasi lengkap.
* **Detail Komprehensif:** Menampilkan:
    * ISP (Penyedia Layanan Internet)
    * Organisasi
    * Lokasi (Kota, Wilayah, Negara)
    * Koordinat (Lintang & Bujur)
    * Timezone
* **Waktu Lokal Real-time:** Menampilkan jam, tanggal, dan hari lokal di timezone target secara *live*.
* **Ekspor Hasil:**
    * 📋 **Salin Teks:** Salin semua hasil dalam format teks ke clipboard.
    * 💾 **Unduh JSON:** Unduh data mentah dalam format `.json`.
    * 📄 **Unduh PDF:** Ekspor hasil yang rapi ke dalam dokumen `.pdf` (ukuran A4).
* **Desain Responsif:** Tampilan rapi dan berfungsi penuh di perangkat desktop maupun mobile (HP/Android).
* **Bagian FAQ:** Dilengkapi dengan bagian *Frequently Asked Questions* (FAQ) yang informatif.

---

## 💻 Teknologi yang Digunakan

* **Frontend:** HTML5, CSS3 (Flexbox, Media Queries), JavaScript (ES6+)
* **API Pihak Ketiga:** [ipwhois.app](https://ipwhois.app/) untuk data geolokasi IP.
* **Pustaka (Library):**
    * [jsPDF](https://github.com/parallax/jsPDF) untuk generasi PDF.
    * [html2canvas](https://html2canvas.hertzen.com/) untuk mengambil tangkapan layar elemen HTML.

---

## 🛠️ Menjalankan Secara Lokal

Jika Anda ingin menjalankan proyek ini di komputer Anda sendiri:

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/xr-wahyu/IP-Lookup-Tool.git](https://github.com/xr-wahyu/IP-Lookup-Tool.git)
    ```

2.  **Masuk ke folder proyek:**
    ```bash
    cd IP-Lookup-Tool
    ```

3.  **Buka file `index.html`:**
    Cukup klik dua kali file `index.html`, dan file akan otomatis terbuka di browser default Anda.

---

## ⚖️ Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.

---
&copy; 2025 Wahyu Sudrajad
