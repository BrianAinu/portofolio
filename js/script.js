// Typing effect untuk multiple text
const typingEffect = () => {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursor = document.querySelector(".cursor");
    
    // Daftar teks yang akan ditampilkan
    const words = [
        "Junior Programing",
        "Software Development",
        "Full Stack Developer",
        "Mobile Developer",
        "Web Developer",
        "Frontend Developer",
        "Backend Developer",
        "UI/UX Designer",
        "Web Developer",
        "React Developer",
        "Laravel Developer",
        "Node.js Developer",
        "Database Administrator",
        "System Analyst",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typedTextSpan || !cursor) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Menghapus karakter
            typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Menambah karakter
            typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Atur kecepatan typing
        let typeSpeed = isDeleting ? 50 : 100;

        // Logika pergantian kata
        if (!isDeleting && charIndex === currentWord.length) {
            // Tunggu sebelum mulai menghapus
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Pindah ke kata berikutnya
            wordIndex = (wordIndex + 1) % words.length;
            // Tunggu sebelum mengetik kata baru
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // Mulai efek typing
    type();
    
    // Animasi cursor
    setInterval(() => {
        if (cursor) cursor.classList.toggle('blinking');
    }, 400);
};

// Inisialisasi semua fungsi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Jalankan typing effect
    typingEffect();

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Tambahkan logika pengiriman form disini
            alert('Pesan telah terkirim!');
            contactForm.reset();
        });
    }

    // Update active state untuk navigasi
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.querySelector('i')) link.querySelector('i').style.color = '#ffffff';
                    if (link.querySelector('span')) link.querySelector('span').style.color = '#ffffff';
                });

                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if(activeLink) {
                    activeLink.classList.add('active');
                    if (activeLink.querySelector('i')) activeLink.querySelector('i').style.color = '#00f7ff';
                    if (activeLink.querySelector('span')) activeLink.querySelector('span').style.color = '#00f7ff';
                }
            }
        });
    }

    // Set active state saat scroll
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();

    // Hero Image Click Effect
    const heroImageContainer = document.querySelector('.hero-image-container');
    if (heroImageContainer) {
        heroImageContainer.addEventListener('click', function() {
            this.classList.remove('clicked');
            void this.offsetWidth;
            this.classList.add('clicked');
            
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 1000);
        });
    }

    // Form Label Animation
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(element => {
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Logo animation
    const logo = document.querySelector('.nav-logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove class first
            this.classList.remove('clicked');
            
            // Force reflow
            void this.offsetWidth;
            
            // Add class
            this.classList.add('clicked');
            
            // Remove class after animation
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 500);
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 