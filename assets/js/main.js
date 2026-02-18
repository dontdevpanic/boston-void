// ===================================
// MOBILE TOGGLE
// ===================================

const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
    toggle.addEventListener('click', function () {
        const isOpen = links.classList.toggle('open');
        toggle.classList.toggle('open');

        // Accessibility: aria-expanded
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Menu schließen bei Link-Klick
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================
// SCROLLSPY (Clean Version)
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

// Helper: Set active link
function setActive(id) {
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {

    let visibleSections = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleSections.length > 0) {
        setActive(visibleSections[0].target.id);
    }

}, {
    root: null,
    threshold: [0.3, 0.6, 0.9]
});

// Observe all sections
sections.forEach(section => observer.observe(section));


// Ensure Home is active on load if at top
window.addEventListener('load', () => {
    if (window.scrollY < 50) {
        setActive('home');
    }
});


// Fallback: If user scrolls back to very top
window.addEventListener('scroll', () => {
    if (window.scrollY < 50) {
        setActive('home');
    }
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    // Show Button 
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {

        // Wenn ganz oben → Home aktivieren
        if (window.scrollY < 100) {
            setHomeActive();
        }

    });
}