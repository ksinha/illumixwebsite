// ============================================
// STICKY SCROLL ANIMATIONS - Detail Pages
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('=== Sticky Scroll Initialized ===');
    initStickyScrollAnimations();
    initStickyMediaSwap();
});

function initStickyScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '-100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all panel content
    const panels = document.querySelectorAll('.panel-content');
    panels.forEach(panel => observer.observe(panel));
}

function initStickyMediaSwap() {
    const panels = Array.from(document.querySelectorAll('.sticky-panel'));
    const mediaElements = Array.from(document.querySelectorAll('.panel-media'));

    console.log(`Found ${panels.length} panels`);
    console.log(`Found ${mediaElements.length} media elements`);

    if (panels.length === 0 || mediaElements.length === 0) {
        console.error('Missing panels or media elements!');
        return;
    }

    // Log panel IDs
    panels.forEach((panel, i) => {
        console.log(`Panel ${i}: id="${panel.id}"`);
    });

    function updateActiveMedia() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        let activePanel = null;
        let closestDistance = Infinity;

        // Find which panel is closest to the middle of the viewport
        panels.forEach(panel => {
            const rect = panel.getBoundingClientRect();
            const panelMiddle = rect.top + rect.height / 2 + window.scrollY;
            const distance = Math.abs(scrollPosition - panelMiddle);

            if (distance < closestDistance) {
                closestDistance = distance;
                activePanel = panel;
            }
        });

        if (activePanel && activePanel.id) {
            console.log(`Active panel: ${activePanel.id}`);

            // Hide all media
            mediaElements.forEach(m => {
                m.classList.remove('active');
            });

            // Show the corresponding media
            const activeMedia = document.querySelector(`.panel-media[data-panel="${activePanel.id}"]`);
            if (activeMedia) {
                activeMedia.classList.add('active');
                console.log(`✓ Activated media: ${activePanel.id}`);
            } else {
                console.error(`✗ No media found for: ${activePanel.id}`);
            }
        }
    }

    // Update on scroll - faster response
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveMedia, 20);
    });

    // Initial update
    updateActiveMedia();
}
