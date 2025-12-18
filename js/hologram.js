class HologramBackground {
    constructor() {
        this.canvas = document.getElementById('hologramCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };

        this.init();
    }

    init() {
        // Set canvas size
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());

        // Mouse move event
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        // Mouse leave event
        window.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });

        // Create particles
        this.createParticles();

        // Start animation
        this.animate();
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const numberOfParticles = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                maxConnections: 5
            });
        }
    }

    drawParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x > this.canvas.width || particle.x < 0) particle.speedX *= -1;
            if (particle.y > this.canvas.height || particle.y < 0) particle.speedY *= -1;

            // Mouse repulsion
            if (this.mouse.x && this.mouse.y) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const pushX = Math.cos(angle) * (this.mouse.radius - distance) * 0.05;
                    const pushY = Math.sin(angle) * (this.mouse.radius - distance) * 0.05;
                    
                    particle.x -= pushX;
                    particle.y -= pushY;
                }
            }

            // Determine color based on theme (light vs dark)
            const isLight = document.getElementById('light-theme') !== null;
            const particleColor = isLight ? '#00b3ff' : '#00f7ff';
            const lineColorBase = isLight ? '0, 179, 255' : '0, 247, 255';

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particleColor;
            this.ctx.fill();

            // Connect particles
            let connections = 0;
            for (let j = 0; j < this.particles.length && connections < particle.maxConnections; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    connections++;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    const baseAlpha = isLight ? 0.25 : 0.15;
                    const alpha = baseAlpha - (distance/150) * baseAlpha;
                    this.ctx.strokeStyle = `rgba(${lineColorBase}, ${alpha})`;
                    this.ctx.stroke();
                }
            }
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize hologram when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HologramBackground();
}); 