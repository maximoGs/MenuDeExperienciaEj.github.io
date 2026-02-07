/**
 * Experiencias Mendoza - Main JavaScript
 * Gothic Luxury Interactive Experience
 */

// ==========================================================================
// Configuration
// ==========================================================================
const CONFIG = {
    whatsappNumber: '5492617094195',
    experiences: {
        premium: { name: 'Relatos de Tumba y Vid', price: '$55.000' },
        cultural: { name: 'Inmersión en Museos', price: '$25.000' },
        bohemia: { name: 'Ruta de Ateliers', price: '$15.000' }
    }
};

// ==========================================================================
// WhatsApp Booking Handler
// ==========================================================================
const handleBooking = (experienceName) => {
    const message = `Hola, deseo sumergirme en la experiencia "${experienceName}". ¿Podrían brindarme disponibilidad?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
};

// ==========================================================================
// Scroll Reveal Animation (IntersectionObserver)
// ==========================================================================
const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (!revealElements.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const revealOnScroll = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(revealOnScroll, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
};

// ==========================================================================
// Subtle Parallax Effect on Cards
// ==========================================================================
const initCardParallax = () => {
    const cards = document.querySelectorAll('.experience-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
};

// ==========================================================================
// Event Listeners
// ==========================================================================
const initEventListeners = () => {
    // Reserve buttons
    const reserveButtons = document.querySelectorAll('.btn-reserve');
    
    reserveButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const experienceName = e.target.dataset.expName;
            if (experienceName) {
                handleBooking(experienceName);
            }
        });
    });
};

// ==========================================================================
// Smooth Scroll for Anchor Links
// ==========================================================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// ==========================================================================
// Initialize Application
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCardParallax();
    initEventListeners();
    initSmoothScroll();
    
    console.log('%c🍷 Experiencias Mendoza', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
    console.log('%cGothic Luxury Experience Loaded', 'color: #E0E0E0;');
});
