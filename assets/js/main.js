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

// ** BACK TO TOP SCRIPT 
(function() {
    const backToTopBtn = document.getElementById('backToTop');
    let lastScrollY = 0;

    // Show/hide button based on scroll position
    function toggleBackToTop() {
        const currentScrollY = window.scrollY;
                
        // Show button when scrolled down 300px
        if (currentScrollY > 300) {
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