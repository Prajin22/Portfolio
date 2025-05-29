gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap === "undefined") {
        console.error("GSAP is not loaded. Check your script import.");
        return;
    }
    
    console.log("GSAP is working!");

    document.querySelectorAll(".hero-content, h1, h2, .hero-content p, .profile-picture img, button, .animated-shape").forEach(el => {
        el.style.visibility = "visible";
    });

    // Hero section animations with proper sequencing
    const heroTimeline = gsap.timeline({
        defaults: { ease: "power4.out" }
    });
    
    heroTimeline
        .from('.hero-content h1', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            skewY: 5,
            ease: "power4.out"
        })
        .from('.hero-content p', {
            duration: 1.2,
            y: 50,
            opacity: 0,
            scale: 0.9,
            ease: "back.out(1.7)"
        }, "-=1")
        .from('.hero-buttons', {
            duration: 1,
            y: 30,
            opacity: 0,
            scale: 0.8,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.8")
        .from('.hero-stats', {
            duration: 1.2,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.8")
        .from('.animated-shape', {
            duration: 2,
            scale: 0,
            opacity: 0,
            rotation: 360,
            ease: "elastic.out(1, 0.5)"
        }, "-=1");

    // Animate stats numbers with smoother animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        updateCount();
    });

    // Enhanced scroll animations
    const scrollAnimations = () => {
        // About section
        gsap.from('.profile-picture', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top center+=100',
                toggleActions: 'play none none none',
                once: true
            },
            duration: 1.5,
            x: -100,
            opacity: 0,
            scale: 0.8,
            rotation: -5,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.set('.profile-picture', { clearProps: 'all' });
            }
        });

        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top center+=100',
                toggleActions: 'play none none none',
                once: true
            },
            duration: 1.5,
            x: 100,
            opacity: 0,
            scale: 0.8,
            rotation: 5,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.set('.about-text', { clearProps: 'all' });
            }
        });

        // Portfolio section
        gsap.from('.portfolio-item', {
            scrollTrigger: {
                trigger: '#portfolio',
                start: 'top center+=100',
                toggleActions: 'play none none none',
                once: true
            },
            duration: 1,
            y: 100,
            opacity: 0,
            scale: 0.8,
            rotation: 5,
            stagger: 0.2,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.set('.portfolio-item', { clearProps: 'all' });
            }
        });

        // Services section
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '#services',
                start: 'top center+=100',
                toggleActions: 'play none none none',
                once: true
            },
            duration: 1,
            y: 50,
            opacity: 0,
            scale: 0.8,
            stagger: 0.2,
            ease: "elastic.out(1, 0.5)",
            onComplete: () => {
                gsap.set('.service-card', { clearProps: 'all' });
            }
        });

        // Contact section
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center+=100',
                toggleActions: 'play none none none',
                once: true
            },
            duration: 1.2,
            x: -50,
            opacity: 0,
            scale: 0.9,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.set('.contact-form', { clearProps: 'all' });
            }
        });

        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top center+=100',
                toggleActions: 'play none none none',
                once: true
            },
            duration: 1.2,
            x: 50,
            opacity: 0,
            scale: 0.9,
            ease: "back.out(1.7)",
            onComplete: () => {
                gsap.set('.contact-info', { clearProps: 'all' });
            }
        });
    };

    // Add floating animation to cards
    const addFloatingAnimation = () => {
        gsap.to('.service-card, .pricing-card', {
            y: 15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    };

    // Add hover animations
    const addHoverAnimations = () => {
        const cards = document.querySelectorAll('.service-card, .pricing-card, .portfolio-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1.05,
                    y: -10,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1,
                    y: 0,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    ease: "power2.out"
                });
            });
        });
    };

    // Enhanced About section animations
    const aboutSectionAnimation = () => {
        const aboutTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top center+=100',
                toggleActions: 'play none none none',
                once: true
            }
        });

        aboutTimeline
            .from('.profile-picture', {
                duration: 1.2,
                opacity: 0,
                scale: 0.8,
                ease: "power3.out"
            })
            .from('.about-text h3', {
                duration: 0.8,
                opacity: 0,
                y: 30,
                ease: "power3.out"
            }, "-=0.4")
            .from('.about-text h4', {
                duration: 0.8,
                opacity: 0,
                y: 20,
                ease: "power3.out"
            }, "-=0.6")
            .from('.about-text .bio', {
                duration: 1,
                opacity: 0,
                y: 20,
                ease: "power3.out"
            }, "-=0.6")
            .from('.skills .skill-tag', {
                duration: 0.8,
                opacity: 0,
                y: 20,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.6")
            .from('.tech-stack h4', {
                duration: 0.8,
                opacity: 0,
                y: 20,
                ease: "power3.out"
            }, "-=0.6")
            .from('.tech-icons i', {
                duration: 0.8,
                opacity: 0,
                y: 20,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.6")
            .from('.social-icons a', {
                duration: 0.8,
                opacity: 0,
                y: 20,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.6");
    };

    // Initialize animations
    scrollAnimations();
    aboutSectionAnimation();
    addFloatingAnimation();
    addHoverAnimations();

    // Enhanced theme toggle with smooth transition
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update icon
        icon.classList.replace(
            isDark ? 'fa-moon' : 'fa-sun',
            isDark ? 'fa-sun' : 'fa-moon'
        );
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                // Scroll to the target section
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active state in navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Enhanced form animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        input.addEventListener('focus', () => {
            group.classList.add('focused');
            gsap.to(input, {
                duration: 0.3,
                scale: 1.02,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('focused');
            }
            gsap.to(input, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });

    // Enhanced button hover effects
    document.querySelectorAll('.cta-button, .pricing-btn, .submit-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1.05,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });

    // Enhanced portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    gsap.to(item, {
                        duration: 0.5,
                        opacity: 1,
                        scale: 1,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(item, {
                        duration: 0.5,
                        opacity: 0,
                        scale: 0.8,
                        ease: "power2.in",
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
});

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// About section animations
gsap.from('.profile-picture', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top center'
    },
    duration: 1,
    x: -100,
    opacity: 0,
    ease: 'power4.out'
});

gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top center'
    },
    duration: 1,
    x: 100,
    opacity: 0,
    ease: 'power4.out'
});

// Portfolio section animations
gsap.from('.portfolio-item', {
    scrollTrigger: {
        trigger: '#portfolio',
        start: 'top center'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power4.out'
});

// Services section animations
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '#services',
        start: 'top center'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power4.out'
});

// Contact form animations
gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top center'
    },
    duration: 1,
    x: -50,
    opacity: 0,
    ease: 'power4.out'
});

gsap.from('.social-links', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top center'
    },
    duration: 1,
    x: 50,
    opacity: 0,
    ease: 'power4.out'
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                gsap.to(item, {
                    duration: 0.5,
                    opacity: 1,
                    scale: 1,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(item, {
                    duration: 0.5,
                    opacity: 0,
                    scale: 0.8,
                    ease: 'power2.in',
                    onComplete: () => {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
});

// Form animations
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    input.addEventListener('focus', () => {
        group.classList.add('focused');
    });
    input.addEventListener('blur', () => {
        if (!input.value) {
            group.classList.remove('focused');
        }
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('.submit-button');
    const formMessage = form.querySelector('.form-message');
    
    // Get form data
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        subject: form.querySelector('#subject').value,
        message: form.querySelector('#message').value
    };
    
    try {
        // Show loading state
        submitButton.classList.add('loading');
        formMessage.style.display = 'none';
        
        // Send the message
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Show success message
            formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
            formMessage.className = 'form-message success';
            form.reset();
        } else {
            throw new Error(data.message || 'Failed to send message');
        }
    } catch (error) {
        // Show error message
        formMessage.textContent = 'Failed to send message. Please try again later.';
        formMessage.className = 'form-message error';
        console.error('Error:', error);
    } finally {
        // Remove loading state
        submitButton.classList.remove('loading');
        formMessage.style.display = 'block';
    }
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        console.log('Newsletter subscription:', email);
        
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.backgroundColor = '#10B981';
        
        this.reset();
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 3000);
    });
}

// Add active class to nav links on click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Scroll animations for sections
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .pricing-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
