// DOM Elements
const nav = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnSpinner = document.getElementById('btn-spinner');
const formMessage = document.getElementById('form-message');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll Effects
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
});


// Contact Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // Show loading state
    btnText.textContent = 'Sending...';
    btnSpinner.style.display = 'block';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage(result.message, 'success');
            contactForm.reset();
        } else {
            showMessage(result.message, 'error');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        showMessage('Error sending message. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.textContent = 'Send Message';
        btnSpinner.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Show form message
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Smooth scroll for navigation links
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

// Add animation classes to elements
function addAnimationClasses() {
    // Hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroActions = document.querySelector('.hero-actions');
    
    if (heroTitle) heroTitle.classList.add('fade-in');
    if (heroSubtitle) heroSubtitle.classList.add('fade-in');
    if (heroDescription) heroDescription.classList.add('fade-in');
    if (heroActions) heroActions.classList.add('fade-in');
    
    // Section headers
    document.querySelectorAll('.section-header').forEach((header, index) => {
        header.classList.add('fade-in');
        header.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Skills
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Strength items
    document.querySelectorAll('.strength-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Contact sections
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactInfo) contactInfo.classList.add('slide-in-left');
    if (contactForm) contactForm.classList.add('slide-in-right');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    addAnimationClasses();
    
    // Add some initial animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});



// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect if you want it
// document.addEventListener('DOMContentLoaded', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 50);
//     }
// });

// Add CSS for featured badge
const style = document.createElement('style');
style.textContent = `
    .featured-badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .no-image {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.1rem;
        font-weight: 500;
    }
    
    .empty-state, .error-state {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-secondary);
    }
    
    .empty-state h3, .error-state h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);
