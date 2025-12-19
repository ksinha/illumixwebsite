// ============================================
// ILLUMIX WEBSITE - INTERACTIVE FEATURES
// ============================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimations();
    initPressCarousel();
    updatePressCarouselButtons();
    initMobileNav();
    initLogoCarousel();
    initThemeToggles();
});

// ============================================
// THEME TOGGLES (Temporary Feature)
// ============================================

function initThemeToggles() {
    // Technology section toggle
    const techToggle = document.getElementById('techThemeToggle');
    const techContainer = document.querySelector('.technology-container');

    if (techToggle && techContainer) {
        techToggle.addEventListener('click', function () {
            techToggle.classList.toggle('active');
            techContainer.classList.toggle('light-theme');
        });
    }

    // Founder section toggle (on team page)
    const founderToggle = document.getElementById('founderThemeToggle');
    const founderCard = document.querySelector('.founder-card');

    if (founderToggle && founderCard) {
        founderToggle.addEventListener('click', function () {
            founderToggle.classList.toggle('active');
            founderCard.classList.toggle('light-theme');
        });
    }
}

// ============================================
// MOBILE NAVIGATION
// ============================================

function initMobileNav() {
    const hamburger = document.querySelector('.nav-hamburger');
    const overlay = document.querySelector('.nav-mobile-overlay');
    const mobileLinks = document.querySelectorAll('.nav-mobile-menu a');

    if (!hamburger || !overlay) return;

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            hamburger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// LOGO CAROUSEL - Ensure animation works
// ============================================

function initLogoCarousel() {
    const logoTrack = document.querySelector('.logo-track');
    if (!logoTrack) return;

    // Force animation restart on mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Ensure the track has the right width for seamless looping
        logoTrack.style.animation = 'none';
        logoTrack.offsetHeight; // Trigger reflow
        logoTrack.style.animation = 'scroll 40s linear infinite'; // Faster on mobile
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-up elements
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(el => observer.observe(el));

    // Observe tech cards specifically for stagger effect
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(el => observer.observe(el));
}

// ============================================
// TEAM ACCORDIONS
// ============================================

function toggleAccordion(index) {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const clickedItem = accordionItems[index];
    const isActive = clickedItem.classList.contains('active');

    // Close all accordions
    accordionItems.forEach(item => {
        item.classList.remove('active');
    });

    // If the clicked item wasn't active, open it
    if (!isActive) {
        clickedItem.classList.add('active');
    }
}

// ============================================
// PRESS CAROUSEL
// ============================================

// ============================================
// 3D PRESS CAROUSEL
// ============================================

function initPressCarousel() {
    const carouselContainer = document.querySelector('.press-carousel-container');
    const items = document.querySelectorAll('.press-item');
    const prevBtn = document.getElementById('pressPrev');
    const nextBtn = document.getElementById('pressNext');

    if (!items.length) return;

    let currentIndex = 2; // Start with middle item
    const totalItems = items.length;

    function updateCarousel() {
        items.forEach((item, index) => {
            // Circular Offset Calculation
            // Calculate raw difference
            let offset = index - currentIndex;

            // Adjust for wrapping (shortest path)
            if (offset > totalItems / 2) {
                offset -= totalItems;
            } else if (offset < -totalItems / 2) {
                offset += totalItems;
            }

            const absOffset = Math.abs(offset);

            let opacity = 1;
            let zIndex = 10 - absOffset;
            let transform = '';

            if (offset === 0) {
                // Center item: flat, fully visible, vertically centered
                transform = 'translate(-50%, -50%) translateZ(0) rotateY(0deg)';
                opacity = 1;
                pointerEvents = 'auto';
            } else {
                // Side items
                const xOffsetPercent = offset * 105;

                // Push back in Z
                const zOffset = -200 * absOffset;

                // Rotation
                const rotation = offset < 0 ? 25 : -25;

                transform = `translate(calc(-50% + ${xOffsetPercent}%), -50%) translateZ(${zOffset}px) rotateY(${rotation}deg)`;
                opacity = 0.8;
                pointerEvents = 'none';
            }

            item.style.transform = transform;
            item.style.opacity = opacity;
            item.style.zIndex = zIndex;
            item.style.pointerEvents = offset === 0 ? 'auto' : 'none';

            // Add active class
            if (offset === 0) item.classList.add('active');
            else item.classList.remove('active');
        });

        // No need to disable buttons in circular mode
    }

    function moveCarousel(direction) {
        currentIndex += direction;

        // Wrap Index
        if (currentIndex < 0) currentIndex = totalItems - 1;
        if (currentIndex >= totalItems) currentIndex = 0;

        updateCarousel();
    }

    // Buttons always active
    if (prevBtn) { prevBtn.style.opacity = '1'; prevBtn.style.pointerEvents = 'auto'; }
    if (nextBtn) { nextBtn.style.opacity = '1'; nextBtn.style.pointerEvents = 'auto'; }


    // Event Listeners
    if (prevBtn) prevBtn.addEventListener('click', () => moveCarousel(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => moveCarousel(1));

    // Click side items to navigate
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            // If clicking side item, move to it
            if (index !== currentIndex) {
                // Calculate direction
                const diff = index - currentIndex;
                moveCarousel(diff);
            }
        });
    });

    // Touch / Swipe
    let touchStartX = 0;
    let touchEndX = 0;

    // Bind to container so you can swipe anywhere in the area
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            // Swiped Left -> Go Next
            moveCarousel(1);
        }
        if (touchEndX > touchStartX + threshold) {
            // Swiped Right -> Go Prev
            moveCarousel(-1);
        }
    }

    // Init
    updateCarousel();
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for just "#" links
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navHeight = 44; // Navigation height
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NAVIGATION OPACITY ON SCROLL
// ============================================

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const nav = document.querySelector('.nav');

    if (currentScroll > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.85)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.72)';
    }

    lastScroll = currentScroll;
});

// ============================================
// PREFERS REDUCED MOTION
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable logo carousel animation
    const logoTrack = document.querySelector('.logo-track');
    if (logoTrack) {
        logoTrack.style.animation = 'none';
    }
}

// ============================================
// RESIZE HANDLER FOR PRESS CAROUSEL
// ============================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reset press carousel position on resize
        pressIndex = 0;
        const track = document.getElementById('pressTrack');
        if (track) {
            track.style.transform = 'translateX(0)';
        }

        // Re-center the middle card
        const cards = document.querySelectorAll('.press-card');
        cards.forEach((card, i) => {
            card.classList.remove('center');
            if (i === 1) {
                card.classList.add('center');
            }
        });

        updatePressCarouselButtons();
    }, 250);
});
