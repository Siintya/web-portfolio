// ============================
// LOADING SCREEN
// ============================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 1500);
});

// ============================
// TYPING EFFECT
// ============================
const typedText = document.getElementById('typed-text');
const roles = [
    'Mahasiswa Sistem Informasi',
    'Web Developer Enthusiast',
    'Data Analytics Learner',
    'UI/UX Design Explorer'
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
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();

// ============================
// THEME TOGGLE (Light/Dark Mode)
// ============================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.className = savedTheme;
} else {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.className = 'dark';
    }
}

themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', '');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// ============================
// MOBILE MENU
// ============================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.className = 'fas fa-bars';
    } else {
        icon.className = 'fas fa-times';
    }
});

// Close mobile menu on link click
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.querySelector('#menuToggle i').className = 'fas fa-bars';
    });
});

// ============================
// 3D BACKGROUND (Three.js)
// ============================
function initThreeJS() {
    const container = document.getElementById('three-container');
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create glowing spheres
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.1
    });
    
    const spheres = [];
    const colors = [0x6366f1, 0xa855f7, 0xec4899];
    
    for (let i = 0; i < 3; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
        sphere.material.color.setHex(colors[i]);
        sphere.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 5 - 2
        );
        sphere.scale.set(
            Math.random() * 2 + 1,
            Math.random() * 2 + 1,
            Math.random() * 2 + 1
        );
        scene.add(sphere);
        spheres.push({
            mesh: sphere,
            speed: 0.1 + Math.random() * 0.2,
            rotationSpeed: 0.001 + Math.random() * 0.002
        });
    }
    
    // Camera position
    camera.position.z = 4;
    camera.position.y = 0.5;
    
    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.001;
        
        // Rotate particles
        particlesMesh.rotation.x += 0.0002;
        particlesMesh.rotation.y += 0.0003;
        
        // Animate spheres
        spheres.forEach((sphere, index) => {
            sphere.mesh.position.x += Math.sin(time + index) * 0.002;
            sphere.mesh.position.y += Math.cos(time + index * 2) * 0.002;
            sphere.mesh.rotation.x += sphere.rotationSpeed;
            sphere.mesh.rotation.y += sphere.rotationSpeed * 1.5;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Resize handler
    function handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }
    
    window.addEventListener('resize', handleResize);
}

// Initialize 3D only on desktop
if (window.innerWidth > 768) {
    initThreeJS();
}

// ============================
// SMOOTH SCROLL
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================
// INTERSECTION OBSERVER (Animations)
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.bg-white\\/5, .bg-gray-100, .group, section > div > div').forEach(el => {
    if (el.closest('#home')) return; // Skip hero section
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// ============================
// EMAILJS INTEGRATION
// ============================
// Initialize EmailJS with your public key
// Daftar di https://www.emailjs.com/ untuk mendapatkan credentials
(function() {
    // Ganti dengan Public Key Anda dari EmailJS
    emailjs.init("YOUR_PUBLIC_KEY");
})();

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Mengirim...';
    submitBtn.disabled = true;
    
    // Get form data
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_email: 'emailanda@example.com' // Ganti dengan email tujuan Anda
    };
    
    // Send email using EmailJS
    // Ganti dengan Service ID dan Template ID Anda dari EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            formStatus.className = 'text-center text-sm text-green-600 dark:text-green-400 mt-4';
            formStatus.textContent = '✅ Pesan berhasil dikirim! Saya akan menghubungi Anda segera.';
            formStatus.classList.remove('hidden');
            contactForm.reset();
        }, function(error) {
            formStatus.className = 'text-center text-sm text-red-600 dark:text-red-400 mt-4';
            formStatus.textContent = '❌ Gagal mengirim pesan. Silakan coba lagi.';
            formStatus.classList.remove('hidden');
            console.error('EmailJS Error:', error);
        })
        .finally(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide status after 5 seconds
            setTimeout(() => {
                formStatus.classList.add('hidden');
            }, 5000);
        });
});

// ============================
// NAVIGATION ACTIVE LINK
// ============================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a:not(#themeToggle)');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-blue-500', 'dark:text-blue-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-500', 'dark:text-blue-400');
        }
    });
});