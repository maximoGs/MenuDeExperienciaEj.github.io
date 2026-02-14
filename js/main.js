/**
 * Experiencias Mendoza - Main JavaScript v2
 * Gothic Luxury Interactive Experience + Shop
 */

// ==========================================================================
// Configuration
// ==========================================================================
const CONFIG = {
    whatsappNumber: '5492617094195',
};

// ==========================================================================
// Cart State
// ==========================================================================
const cart = {
    items: [],

    add(id, name, price) {
        const existing = this.items.find(item => item.id === id);
        if (existing) {
            existing.qty++;
        } else {
            this.items.push({ id, name, price, qty: 1 });
        }
        this.onUpdate();
    },

    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.onUpdate();
    },

    updateQty(id, delta) {
        const item = this.items.find(i => i.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) {
            this.remove(id);
        } else {
            this.onUpdate();
        }
    },

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    getCount() {
        return this.items.reduce((sum, item) => sum + item.qty, 0);
    },

    onUpdate() {
        renderCart();
        updateBadge();
    }
};

// ==========================================================================
// WhatsApp Handlers
// ==========================================================================
const handleBooking = (experienceName) => {
    const message = `Hola, deseo sumergirme en la experiencia "${experienceName}". ¿Podrían brindarme disponibilidad?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');
};

const handleCheckout = () => {
    if (cart.items.length === 0) return;

    let message = '¡Hola! Me gustaría realizar el siguiente pedido:\n\n';
    cart.items.forEach(item => {
        message += `▸ ${item.name} x${item.qty} — $${(item.price * item.qty).toLocaleString('es-AR')}\n`;
    });
    message += `\n💰 Total: $${cart.getTotal().toLocaleString('es-AR')}\n\n¿Podrían confirmar disponibilidad y método de envío?`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');
};

const handleContact = () => {
    const message = 'Hola, me gustaría obtener más información sobre sus experiencias en Mendoza.';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`, '_blank');
};

// ==========================================================================
// Cart UI
// ==========================================================================
const renderCart = () => {
    const cartItemsEl = document.getElementById('cartItems');
    const cartSummaryEl = document.getElementById('cartSummary');
    const cartTotalEl = document.getElementById('cartTotal');

    if (cart.items.length === 0) {
        cartItemsEl.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
        cartSummaryEl.style.display = 'none';
        return;
    }

    cartSummaryEl.style.display = 'block';
    cartTotalEl.textContent = `$${cart.getTotal().toLocaleString('es-AR')}`;

    cartItemsEl.innerHTML = cart.items.map(item => `
        <div class="cart-item" data-cart-id="${item.id}">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">$${(item.price * item.qty).toLocaleString('es-AR')}</p>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn ${item.qty === 1 ? 'remove' : ''}" data-action="decrease" data-id="${item.id}" aria-label="Disminuir cantidad">−</button>
                <span class="cart-item-qty">${item.qty}</span>
                <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
            </div>
        </div>
    `).join('');

    // Bind quantity buttons
    cartItemsEl.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const action = e.currentTarget.dataset.action;
            cart.updateQty(id, action === 'increase' ? 1 : -1);
        });
    });
};

const updateBadge = () => {
    const badge = document.getElementById('cartBadge');
    const count = cart.getCount();
    badge.textContent = count;

    if (count > 0) {
        badge.classList.add('visible');
        badge.classList.remove('pop');
        // Trigger reflow for animation restart
        void badge.offsetWidth;
        badge.classList.add('pop');
    } else {
        badge.classList.remove('visible');
    }
};

// ==========================================================================
// Cart Drawer Toggle
// ==========================================================================
const toggleCartDrawer = (open) => {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');

    if (open) {
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.classList.add('cart-open');
    } else {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('cart-open');
    }
};

// ==========================================================================
// Category Filtering
// ==========================================================================
const initCategoryFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.experience-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            cards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    // Re-trigger reveal animation
                    card.classList.remove('visible');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.classList.add('visible');
                        });
                    });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
};

// ==========================================================================
// Scroll Reveal (IntersectionObserver)
// ==========================================================================
const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);
    revealElements.forEach(el => observer.observe(el));
};

// ==========================================================================
// Parallax Hover Effect on Cards
// ==========================================================================
const initCardParallax = () => {
    const cards = document.querySelectorAll('.experience-card, .product-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 35;
            const rotateY = (centerX - x) / 35;

            card.style.transform = `translateY(-5px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
};

// ==========================================================================
// Navbar Scroll Behavior + Active Section Tracking
// ==========================================================================
const initNavbar = () => {
    const nav = document.getElementById('mainNav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active section tracking
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    const observerOptions = { root: null, rootMargin: '-40% 0px -60% 0px', threshold: 0 };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
};

// ==========================================================================
// Event Listeners
// ==========================================================================
const initEventListeners = () => {
    // Reserve buttons (WhatsApp)
    document.querySelectorAll('.btn-reserve').forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.currentTarget.dataset.expName;
            if (name) handleBooking(name);
        });
    });

    // Add to cart buttons
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.product-card');
            const id = card.dataset.productId;
            const name = card.dataset.productName;
            const price = parseInt(card.dataset.productPrice, 10);
            cart.add(id, name, price);

            // Visual feedback
            e.currentTarget.classList.add('added');
            setTimeout(() => e.currentTarget.classList.remove('added'), 600);
        });
    });

    // Cart toggle
    document.getElementById('cartToggle').addEventListener('click', () => toggleCartDrawer(true));
    document.getElementById('cartClose').addEventListener('click', () => toggleCartDrawer(false));
    document.getElementById('cartOverlay').addEventListener('click', () => toggleCartDrawer(false));

    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);

    // Contact nav button
    document.getElementById('navContactBtn').addEventListener('click', (e) => {
        e.preventDefault();
        handleContact();
    });

    // Close cart with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleCartDrawer(false);
    });
};

// ==========================================================================
// Smooth Scroll
// ==========================================================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.id === 'navContactBtn') return;
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    initCategoryFilters();
    initNavbar();
    initEventListeners();
    initSmoothScroll();

    console.log('%c🍷 Experiencias Mendoza', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
    console.log('%cv2 — Expanded Menu + Shop Loaded', 'color: #E0E0E0;');
});
