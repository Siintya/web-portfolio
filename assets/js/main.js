// ** Theme Toggle
(function () {
    const toggleBtn = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const html = document.documentElement;
    let current = localStorage.getItem('bs-theme') || 'dark';
    html.setAttribute('data-bs-theme', current);
    icon.className = current === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';

    toggleBtn.addEventListener('click', () => {
        let next = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-bs-theme', next);
        localStorage.setItem('bs-theme', next);
        icon.className = next === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    });
})();

// ** NAVBAR SCROLL EFFECT
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // Hapus class active dari semua nav-link
        document.querySelectorAll('.navbar-nav .nav-link').forEach(item => item.classList.remove('active'));
            
        // Tambahkan class active ke menu yang diklik
        this.classList.add('active');
    });
});


// ** TYPING EFFECT
const typedText = document.getElementById('typed-text');
const roles = [
    'Programmer',
    'Backend & Fullstack Development',
    'Laravel & PHP Developer',
    '2+ years building scalable web apps'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // Kecepatan default mengetik & menghapus
    let speed = isDeleting ? 50 : 100;
    
    // Jika teks sudah selesai diketik penuh
    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; // Jeda 2 detik sebelum mulai menghapus
        isDeleting = true;
    } 
    // Jika teks sudah terhapus semua
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Ganti ke role berikutnya
        speed = 500; // Jeda 0.5 detik sebelum mulai mengetik teks baru
    }
    
    setTimeout(typeEffect, speed);
}

// PENTING: Panggil fungsi ini agar script berjalan saat halaman dimuat
document.addEventListener('DOMContentLoaded', typeEffect);

// ** BACK TO TOP SCRIPT 
(function() {
    const backToTopBtn = document.getElementById('backToTop');
    let lastScrollY = 0;

    // Show/hide button based on scroll position
    function toggleBackToTop() {
        const currentScrollY = window.scrollY;
                
        // Show button when scrolled down 300px
        if (currentScrollY > 10) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
                
        lastScrollY = currentScrollY;
    }

    // Smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event listeners
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTopBtn.addEventListener('click', scrollToTop);

    // Initial check
    toggleBackToTop();
})();