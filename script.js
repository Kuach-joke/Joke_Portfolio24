document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('navmenu');
    const body = document.body;

    // Toggle burger menu
    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.navmenu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Close menu when clicking outside (only on mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!burgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'auto';
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Typing effect for home page
    function typeWriter(text, element, speed = 100) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect on home page
    if (document.querySelector('.home-text h2')) {
        const titleElement = document.querySelector('.home-text h2');
        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        setTimeout(() => typeWriter(originalText, titleElement, 150), 1000);
    }

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Submit form (using your existing Formspree action)
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Thank you! Your message has been sent.');
                    this.reset();
                } else {
                    alert('Sorry, there was an error sending your message.');
                }
            }).catch(error => {
                alert('Sorry, there was an error sending your message.');
            }).finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.progress-bar');
        skillBars.forEach(bar => {
            const targetWidth = bar.style.getPropertyValue('--skill-width');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500);
        });
    }

    // Trigger skill animation when skills section is in view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(skillsSection);
    }

    // Back to top functionality
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.footer-bottom p');
    if (copyrightText) {
        copyrightText.innerHTML = `&copy; ${currentYear} Joke Latjor.  All rights reserved.`;
    }
});

