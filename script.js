// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown > .dropdown-toggle');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Mobile dropdown toggle
    if (dropdownToggles.length) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                const isMobile = window.matchMedia('(max-width: 768px)').matches;
                if (isMobile) {
                    e.preventDefault();
                    const parent = this.closest('.dropdown');
                    parent.classList.toggle('open');
                }
            });
        });
    }
});

// Smooth scrolling for anchor links
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

// Contact Form Handling with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // --- EmailJS configuration ---
    const EMAILJS_PUBLIC_KEY = "RgnAz_jbqhmDCEMyt"; // EXAMPLE only – replace with your real Public Key
    const EMAILJS_SERVICE_ID = "service_i5uunas";    // EXAMPLE only – replace with your real Service ID
    const EMAILJS_TEMPLATE_ID = "template_wxgpbeo";  // EXAMPLE only – replace with your real Template ID

    // Helper to detect if configuration placeholders are still present
    function isEmailJsConfigured() {
        const isPlaceholder = (
            EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
            EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
            EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID'
        );
        return !!(EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) && !isPlaceholder && !isExample;
    }

    // Initialize EmailJS safely
    try {
        if (window.emailjs) {
            emailjs.init(EMAILJS_PUBLIC_KEY);
        } else {
            console.warn('EmailJS SDK not loaded. Ensure the CDN script is included before script.js.');
        }
    } catch (err) {
        console.error('Failed to initialize EmailJS:', err);
    }

    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const company = formData.get('company');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Update button state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Block send if EmailJS is not configured
            if (!window.emailjs) {
                alert('Email service is not available. Please refresh the page and try again.');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                return;
            }

            if (!isEmailJsConfigured()) {
                // Fallback: open user's email client with prefilled email
            const mailtoSubject = encodeURIComponent('Website Contact Form');
                const mailtoBody = encodeURIComponent(
                    `From: ${name} (${email})\n` +
                    (phone ? `Phone: ${phone}\n` : '') +
                    (company ? `Company: ${company}\n` : '') +
                    `\nMessage:\n${message}`
                );
                const mailtoHref = `mailto:staffing2155@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
                window.location.href = mailtoHref;
                
                // Restore button state and inform the user
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                alert('Your email app has been opened with the message prefilled. Please review and send.');
                return;
            }

            // Prepare email parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                phone: phone || 'Not provided',
                company: company || 'Not provided',
                message: message,
                to_email: 'staffing2155@gmail.com' // Your business email
            };
            
            // Send email using EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    const errorMessage = (error && (error.text || error.message)) ? String(error.text || error.message) : 'Unknown error';
                    alert('Sorry, there was an error sending your message. Please try again or contact us directly at staffing2155@gmail.com');
                    console.error('EmailJS send error details:', errorMessage);
                })
                .finally(function() {
                    // Reset button state
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        });
    }
});

// Newsletter Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const button = form.querySelector('button');
            
            if (!emailInput.value) {
                alert('Please enter your email address.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate subscription
            const originalText = button.textContent;
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    });
});

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 50);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats')) {
                animateStats();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe stats section
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Add loading animation to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add active class to navigation links based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Lazy loading for images (if any are added later)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.4)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTop);
