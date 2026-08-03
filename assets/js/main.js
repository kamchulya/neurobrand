// ============================================
// FADE ON SCROLL ANIMATION
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .case-card, .feature-card');
    cards.forEach(card => {
        card.classList.remove('fade-on-scroll');
        observer.observe(card);
    });

    // Handle contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Log form data (in real scenario, send to backend)
    console.log('Form submitted:', {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message')
    });
    
    // Show success message
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '✓ Сообщение отправлено!';
    submitBtn.disabled = true;
    submitBtn.style.background = 'rgba(100, 200, 100, 0.3)';
    submitBtn.style.borderColor = '#64c864';
    submitBtn.style.color = '#64c864';
    
    // Reset form
    form.reset();
    
    // Restore button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.style.color = '';
    }, 3000);
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// ACTIVE NAV LINK
// ============================================

window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('nav a');
    const scrollPosition = window.scrollY + 100;

    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        
        if (sectionId.startsWith('#')) {
            const section = document.querySelector(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.style.color = '');
                    link.style.color = 'var(--secondary)';
                }
            }
        }
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        heroSection.style.transform = `translateY(${scrollY * 0.5}px)`;
    });
}

// ============================================
// WAVE ANIMATION TRIGGER
// ============================================

window.addEventListener('load', () => {
    const waves = document.querySelectorAll('.wave-left, .wave-right');
    waves.forEach(wave => {
        wave.style.animation = 'wave-float 8s ease-in-out infinite';
    });
});

console.log('🚀 NeuroBrand loaded successfully!');
