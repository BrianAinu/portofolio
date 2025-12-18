class PageAnimations {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        this.initialAnimations();
        this.hidePengalamanCards(); // sembunyikan kartu pengalaman & sertifikat sampai terlihat
        this.setupScrollObserver();
        this.setupPengalamanCardObserver();
        this.setupImageAnimations();
    }

    /**
     * Sembunyikan semua project & certificate card di section pengalaman
     * agar tidak terlihat sebelum animasi dipicu oleh IntersectionObserver.
     */
    hidePengalamanCards() {
        const cards = document.querySelectorAll('#pengalaman .project-card, #pengalaman .certificate-card');
        cards.forEach(card => {
            card.style.opacity = '0';
        });
    }

    setupImageAnimations() {
        // Animasi untuk hero image
        const heroImage = document.querySelector('.hero-image-container');
        if (heroImage) {
            this.addFloatingAnimation(heroImage);
        }
    }

    addFloatingAnimation(element) {
        element.style.animation = 'floating 3s ease-in-out infinite';
        
        if (!document.querySelector('#floating-animation')) {
            const style = document.createElement('style');
            style.id = 'floating-animation';
            style.textContent = `
                @keyframes floating {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initialAnimations() {
        const homeElements = {
            title: document.querySelector('#home h2'),
            subtitle: document.querySelector('.typing-text'),
            cta: document.querySelector('.cta-buttons'),
            social: document.querySelector('.social-buttons')
        };

        Object.values(homeElements).forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.classList.add('animate__animated');
                    el.classList.add(index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight');
                }, index * 200);
            }
        });


    }

    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSection(entry.target);
                }
            });
        }, { threshold: 0.2 });

        this.sections.forEach(section => observer.observe(section));
    }

    animateSection(section) {
        const id = section.id;
        
        switch(id) {
            case 'home':
                this.animateHome(section);
                break;
            case 'tentang':
                this.animateTentang(section);
                break;
            case 'keahlian':
                this.animateKeahlian(section);
                break;
            case 'pengalaman':
                this.animatePengalaman(section);
                break;
            case 'contact':
                this.animateContact(section);
                break;
            case 'sertifikat':
                this.animateSertifikat(section);
                break;
        }
    }

    animateHome(section) {
        const elements = section.querySelectorAll('.animate-item:not(.hero-image-container)');
        elements.forEach((el, index) => {
            el.classList.add('animate__animated', 'animate__fadeInUp');
            el.style.animationDelay = `${index * 0.2}s`;
        });
    }

    animateTentang(section) {
        const profileCard = section.querySelector('.profile-card');
        const bioText = section.querySelector('.bio-text');
        const infoGrid = section.querySelector('.info-grid');

        if (profileCard) {
            profileCard.classList.add('animate__animated', 'animate__fadeInLeft');
        }
        if (bioText) {
            bioText.classList.add('animate__animated', 'animate__fadeInRight');
        }
        if (infoGrid) {
            const items = infoGrid.querySelectorAll('.info-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate__animated', 'animate__zoomIn');
                }, index * 100);
            });
        }
    }

    animateKeahlian(section) {
        const skills = section.querySelectorAll('.skill-item');
        skills.forEach((skill, index) => {
            skill.style.opacity = '0';
            setTimeout(() => {
                skill.style.opacity = '1';
                skill.classList.add('animate__animated', 'animate__bounceIn');
                skill.style.animationDelay = `${index * 0.1}s`;
            }, index * 5);
        });
    }

    animatePengalaman(section) {
        // pastikan observer untuk kartu sudah aktif (akan men-trigger animasi per kartu)
        this.setupPengalamanCardObserver();
        // animasi sekarang ditangani oleh observer per kartu; fungsi ini cukup memastikan observer diaktifkan.
    }

    /**
     * Observer per kartu di section pengalaman
     */
    setupPengalamanCardObserver() {
        if (this.pengalamanCardsObserver) return; // sudah dibuat

        const cards = document.querySelectorAll('#pengalaman .project-card, #pengalaman .certificate-card');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.style.opacity = '1';
                    card.classList.add('animate__animated', 'animate__fadeInUp');
                    obs.unobserve(card);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => observer.observe(card));
        this.pengalamanCardsObserver = observer;
    }

    animateContact(section) {
        const contactCards = section.querySelectorAll('.contact-card');
        const formContainer = section.querySelector('.contact-form-container');
    const form = section.querySelector('.contact-form');

        contactCards.forEach((card, index) => {
            card.classList.add('animate__animated', 'animate__fadeInUp');
            card.style.animationDelay = `${index * 0.1}s`;
        });

        if (formContainer) {
        formContainer.style.opacity = '0';
        setTimeout(() => {
            formContainer.style.opacity = '1';
            formContainer.classList.add('animate__animated', 'animate__fadeInUp');
            formContainer.style.animationDelay = '0.2s';
        }, 100);
    }

    if (form) {
            form.classList.add('animate__animated', 'animate__fadeInUp');
            form.style.animationDelay = '0.3s';
        }
    }

    animateSertifikat(section) {
        const certificateCards = section.querySelectorAll('.certificate-card');
        certificateCards.forEach((card, index) => {
            card.style.opacity = '0'; // Pastikan elemen tidak terlihat sebelum animasi
            setTimeout(() => {
                card.style.opacity = '1';
                card.classList.add('animate__animated', 'animate__fadeInUp');
            }, index * 200); // Delay untuk setiap kartu
        });
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    new PageAnimations();
}); 