// Main Application JavaScript
// SPA Navigation and Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Navigation and Section Switching
    const navLinks = document.querySelectorAll('nav a, .sidebar-nav a');
    const ctaButton = document.querySelector('.cta-button');
    const sections = document.querySelectorAll('main > section');
    const powerToggle = document.getElementById('power-toggle');
    const body = document.body;

    function switchSection(targetSection) {
        // Update active section
        sections.forEach(section => {
            section.classList.remove('active');
        });
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
        }

        // Update active navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === targetSection) {
                link.classList.add('active');
            }
        });

        // Smooth scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = e.target.closest('a').getAttribute('data-section');
            switchSection(targetSection);
        });
    });

    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = e.target.closest('a').getAttribute('data-section');
            switchSection(targetSection);
        });
    }

    // Power Toggle Functionality
    if (powerToggle) {
        powerToggle.addEventListener('click', () => {
            body.classList.toggle('high-performance');
            powerToggle.classList.toggle('active');
            powerToggle.textContent = body.classList.contains('high-performance') ? 'High-Performance Mode' : 'Power Mode';

            // Update theme-aware elements
            updateThemeElements();
        });
    }

    // Theme-aware updates
    function updateThemeElements() {
        // Update any theme-specific elements if needed
        const isHighPerformance = body.classList.contains('high-performance');

        // You can add more theme-specific logic here
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.bento-card, .footer-section').forEach(el => {
        observer.observe(el);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or menus if implemented
        }
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                // Handle scroll-based animations or lazy loading here
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    });

    // Initialize
    switchSection('hero'); // Start with hero section
});