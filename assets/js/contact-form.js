const form = document.querySelector('#contactForm');
const submitBtn = document.querySelector('#submitBtn');

// Ambil elemen-elemen Toast baru
const toastElement = document.querySelector('#liveToast');
const toastHeader = document.querySelector('#toastHeader');
const toastTitle = document.querySelector('#toastTitle');
const toastIcon = document.querySelector('#toastIcon');
const toastMessage = document.querySelector('#toastMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return; 
    }

    submitBtn.innerText = "Mengirim...";
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let res = await response.json();
            
            if (toastElement && toastHeader && toastMessage) {
                // Bersihkan class warna header dan status show sebelumnya
                toastHeader.classList.remove('bg-success', 'bg-danger');
                toastIcon.classList.remove('bi-check-circle-fill', 'bi-exclamation-triangle-fill');
                toastElement.classList.remove('show');

                if (response.status == 200) {
                    // Pengaturan untuk SUKSES
                    toastHeader.classList.add('bg-success');
                    toastIcon.classList.add('bi-check-circle-fill');
                    toastTitle.innerText = "Sukses";
                    toastMessage.innerText = "Pesan berhasil dikirim langsung ke A. Shintya Lestari!";
                    
                    form.reset();
                    form.classList.remove('was-validated');
                } else {
                    // Pengaturan untuk GAGAL SERVER
                    toastHeader.classList.add('bg-danger');
                    toastIcon.classList.add('bi-exclamation-triangle-fill');
                    toastTitle.innerText = "Gagal Mengirim";
                    toastMessage.innerText = res.message || "Terjadi kesalahan pada server.";
                }
                
                // Munculkan Toast
                toastElement.classList.add('show');

                // Hilangkan Toast setelah 4 detik
                setTimeout(() => {
                    toastElement.classList.remove('show');
                }, 4000);
            }
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            if (toastElement && toastHeader && toastMessage) {
                toastHeader.classList.remove('bg-success', 'bg-danger');
                toastIcon.classList.remove('bi-check-circle-fill', 'bi-exclamation-triangle-fill');
                
                toastHeader.classList.add('bg-danger');
                toastIcon.classList.add('bi-exclamation-triangle-fill');
                toastTitle.innerText = "Kesalahan Koneksi";
                toastMessage.innerText = "Terjadi kesalahan jaringan, coba lagi nanti.";
                
                toastElement.classList.add('show');
                setTimeout(() => { toastElement.classList.remove('show'); }, 4000);
            }
        })
        .then(function() {
            submitBtn.innerHTML = 'Kirim <i class="bi bi-send-fill ms-1"></i>';
            submitBtn.disabled = false;
        });
});