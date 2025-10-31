// Menunggu DOM (halaman HTML) selesai dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', (event) => {

    // Set Tahun Copyright di Footer
    // (Pengecekan null untuk keamanan)
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Referensi elemen-elemen penting
    const myIpBtn = document.getElementById('my-ip-btn');
    const lookupForm = document.getElementById('lookup-form');
    const ipInput = document.getElementById('ip-input');
    const resultWrapper = document.getElementById('result-wrapper');
    const resultBox = document.getElementById('result-box');
    const resultContent = document.getElementById('result-content');
    const actionButtons = document.getElementById('action-buttons');
    const copyBtn = document.getElementById('copy-btn');
    const jsonBtn = document.getElementById('json-btn');
    const pdfBtn = document.getElementById('pdf-btn');

    // Variabel global untuk menyimpan data
    let currentResultData = null;
    let localTimeInterval = null;

    // Pustaka PDF (diambil dari window karena di-load di HTML)
    const { jsPDF } = window.jspdf;

    // == Fungsi Utama untuk Fetch Data ==
    async function fetchIpData(ipAddress = '') {
        // Tampilkan wrapper hasil dan loader
        resultWrapper.style.display = 'block';
        resultBox.classList.add('loading');
        actionButtons.style.display = 'none';
        resultContent.innerHTML = ''; // Kosongkan hasil sebelumnya

        // Hentikan jam jika sedang berjalan
        if (localTimeInterval) {
            clearInterval(localTimeInterval);
        }

        try {
            // MENGGUNAKAN API: ipwhois.app
            const response = await fetch(`https://ipwhois.app/json/${ipAddress}`);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: Tidak dapat terhubung ke server API.`);
            }
            
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Alamat IP tidak valid atau privat.');
            }

            currentResultData = data; // Simpan data untuk download
            
            displayResults(data); // Tampilkan hasil
            actionButtons.style.display = 'flex'; // Tampilkan tombol aksi

        } catch (error) {
            displayError(error.message);
        } finally {
            // Sembunyikan loader
            resultBox.classList.remove('loading');
        }
    }

    // == Fungsi untuk Menampilkan Hasil ==
    function displayResults(data) {
        const location = [data.city, data.region, data.country].filter(Boolean).join(', ');

        resultContent.innerHTML = `
            <h3 class="result-title">Detail untuk <span id="ip-address-display">${data.ip || 'N/A'}</span></h3>
            <div class="result-row">
                <strong>ISP</strong>
                <span>${data.isp || 'N/A'}</span>
            </div>
            <div class="result-row">
                <strong>Organisasi</strong>
                <span>${data.org || 'N/A'}</span>
            </div>
            <div class="result-row">
                <strong>Lokasi</strong>
                <span>${location || 'N/A'}</span>
            </div>
            <div class="result-row">
                <strong>Koordinat</strong>
                <span>${data.latitude || 'N/A'}, ${data.longitude || 'N/A'} (Lat/Long)</span>
            </div>
            <div class="result-row">
                <strong>Timezone</strong>
                <span>${data.timezone || 'N/A'}</span>
            </div>
            <div class="result-row">
                <strong>Waktu & Tanggal Lokal</strong>
                <span id="local-time-display">Memuat...</span>
            </div>
        `;
        
        startLocalClock(data.timezone);
    }

    // == Fungsi untuk Menampilkan Error ==
    function displayError(message) {
        resultContent.innerHTML = `
            <h3 class="result-title" style="color: #e74c3c;">Terjadi Kesalahan</h3>
            <p>${message}</p>
        `;
        actionButtons.style.display = 'none';
    }

    // == Fungsi untuk Jam Lokal (Live) ==
    function startLocalClock(timezone) {
        const timeElement = document.getElementById('local-time-display');
        if (!timezone || !timeElement) {
            if (timeElement) timeElement.textContent = "Timezone tidak tersedia.";
            return;
        }

        if (localTimeInterval) {
            clearInterval(localTimeInterval);
        }

        const options = {
            timeZone: timezone,
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        };

        const formatter = new Intl.DateTimeFormat('id-ID', options);

        function updateTime() {
            try {
                const now = new Date();
                timeElement.textContent = formatter.format(now).replace(/\./g, ':');
            } catch (e) {
                timeElement.textContent = "Timezone tidak valid.";
                clearInterval(localTimeInterval);
            }
        }
        
        updateTime();
        localTimeInterval = setInterval(updateTime, 1000);
    }

    // == Event Listeners ==
    // Hanya tambahkan listener jika elemennya ada
    
    if (myIpBtn) {
        myIpBtn.addEventListener('click', () => {
            ipInput.value = '';
            fetchIpData();
        });
    }

    if (lookupForm) {
        lookupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const ipToLookup = ipInput.value.trim();
            if (ipToLookup) {
                fetchIpData(ipToLookup);
            }
        });
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = resultContent.innerText;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                copyBtn.textContent = 'Berhasil Disalin!';
                setTimeout(() => { copyBtn.textContent = '📋 Salin Teks'; }, 2000);
            }).catch(err => {
                alert('Gagal menyalin. Coba lagi.');
            });
        });
    }

    if (jsonBtn) {
        jsonBtn.addEventListener('click', () => {
            if (!currentResultData) return;
            
            const dataStr = JSON.stringify(currentResultData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `ip_details_${currentResultData.ip || 'data'}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }

    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            pdfBtn.textContent = 'Membuat PDF...';
            pdfBtn.disabled = true;

            const elementToCapture = document.getElementById('result-box');

            // Pustaka html2canvas di-load dari window
            window.html2canvas(elementToCapture, { 
                scale: 2 // Skala 2x untuk kualitas lebih baik
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                
                // --- AWAL LOGIKA BARU YANG DIPERBAIKI ---

                // 1. Dapatkan dimensi canvas (gambar hasil tangkapan)
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;

                // 2. Buat PDF standar A4 (portrait)
                // Kita ganti unit dari 'px' ke 'pt' (points), ini standar PDF
                const doc = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4'
                });

                // 3. Dapatkan lebar halaman A4 (sudah dikurangi margin)
                // Margin 40pt (20 kiri, 20 kanan)
                const pdfPageWidth = doc.internal.pageSize.getWidth() - 40;

                // 4. Hitung rasio
                // Kita bagi lebar PDF dengan lebar gambar untuk dapat skala
                const ratio = pdfPageWidth / canvasWidth;

                // 5. Hitung tinggi gambar baru agar proporsional
                const pdfImageHeight = canvasHeight * ratio;

                // 6. Tambahkan gambar ke PDF
                // (img, format, x, y, width, height)
                // x=20 dan y=20 untuk memberi margin atas dan kiri
                doc.addImage(imgData, 'PNG', 20, 20, pdfPageWidth, pdfImageHeight);
                
                // --- AKHIR LOGIKA BARU ---

                doc.save(`ip_details_${currentResultData.ip || 'data'}.pdf`);
                
                pdfBtn.textContent = '📄 Unduh .pdf';
                pdfBtn.disabled = false;

            }).catch(err => {
                console.error('Gagal membuat PDF:', err); // Log error
                alert('Gagal membuat PDF. Coba lagi.');
                pdfBtn.textContent = '📄 Unduh .pdf';
                pdfBtn.disabled = false;
            });
        });
    }

}); // Akhir dari 'DOMContentLoaded'
