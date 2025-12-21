// Landing Page JavaScript - Original Design by Brian Ainu Rofiq
document.addEventListener('DOMContentLoaded', function() {
    // Floating WhatsApp Button
    const floatingWhatsAppBtn = document.getElementById('floatingWhatsAppBtn');
    if (floatingWhatsAppBtn) {
        floatingWhatsAppBtn.addEventListener('click', function() {
            // Nomor WhatsApp dan pesan default
            const phoneNumber = '6281359761810'; // Format internasional Indonesia
            const message = 'Halo Brian! Saya tertarik dengan layanan Anda.';
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            // Tambahkan efek klik
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Buka WhatsApp
            window.open(whatsappURL, '_blank');
        });
    }
    
    // Typing Effect
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'Creating Digital Solutions...',
        'Building Modern Websites...',
        'Full Stack Development...',
        'UI/UX Design Expert...',
        'Problem Solver...'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect
    typeEffect();
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover sound effect (optional)
    const navCards = document.querySelectorAll('.nav-card');
    navCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // Parallax effect for floating shapes
    window.addEventListener('mousemove', function(e) {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const xPos = (x - 0.5) * speed * 20;
            const yPos = (y - 0.5) * speed * 20;
            
            shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
});