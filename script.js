document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links li a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Dropdown Menu Toggle for Mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only prevent default on mobile view
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.fixed-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(10, 10, 20, 0.95)';
                header.style.padding = '10px 0';
            } else {
                header.style.background = 'rgba(10, 10, 20, 0.7)';
                header.style.padding = '15px 0';
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Observe sections for general entry/exit animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Specific animations for Home Section (Hero)
    const heroTitle = document.querySelector('.hero-content h1');
    const heroTagline = document.querySelector('.hero-content p');
    const heroButton1 = document.querySelector('.hero-content button:nth-of-type(1)');
    const heroButton2 = document.querySelector('.hero-content button:nth-of-type(2)');
    const heroButton3 = document.querySelector('.hero-content button:nth-of-type(3)'); // New button

    if (heroTitle && heroTagline && heroButton1 && heroButton2 && heroButton3) {
        const heroObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroTitle.classList.add('fade-in-up', 'delay-0');
                    heroTagline.classList.add('fade-in-up', 'delay-1');
                    heroButton1.classList.add('fade-in-up', 'delay-2');
                    heroButton2.classList.add('fade-in-up', 'delay-3');
                    heroButton3.classList.add('fade-in-up', 'delay-4'); // Animate new button
                } else {
                    heroTitle.classList.remove('fade-in-up', 'delay-0');
                    heroTagline.classList.remove('fade-in-up', 'delay-1');
                    heroButton1.classList.remove('fade-in-up', 'delay-2');
                    heroButton2.classList.remove('fade-in-up', 'delay-3');
                    heroButton3.classList.remove('fade-in-up', 'delay-4'); // Remove animation from new button
                }
            });
        }, observerOptions);
        heroObserver.observe(heroTitle);
    }

    // Specific animations for About Me Section
    const aboutGridItems = document.querySelectorAll('.about-content .grid-item');
    if (aboutGridItems.length > 0) {
        const aboutObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);
        aboutGridItems.forEach(item => {
            aboutObserver.observe(item);
        });
    }

    // Specific animations for Skills Section
    const skillsHeading = document.querySelector('.skills .section-title');
    const skillsTagline = document.querySelector('.skills p'); // Assuming there's a tagline here
    const skillCategories = document.querySelectorAll('.skill-category h3');
    const skillCards = document.querySelectorAll('.skill-card');

    if (skillsHeading) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillsHeading.classList.add('fade-in-zoom');
                    // skillsTagline.classList.add('fade-in-zoom'); // Uncomment if tagline exists
                    skillCategories.forEach((cat, index) => {
                        cat.classList.add('slide-in-left');
                        cat.style.animationDelay = `${0.2 * index}s`;
                    });
                    skillCards.forEach((card, index) => {
                        card.classList.add('fade-in-up-bounce');
                        card.style.animationDelay = `${0.1 * index}s`;
                    });
                } else {
                    skillsHeading.classList.remove('fade-in-zoom');
                    // skillsTagline.classList.remove('fade-in-zoom'); // Uncomment if tagline exists
                    skillCategories.forEach(cat => cat.classList.remove('slide-in-left'));
                    skillCards.forEach(card => card.classList.remove('fade-in-up-bounce'));
                }
            });
        }, observerOptions);
        skillsObserver.observe(skillsHeading);
        // if (skillsTagline) skillsObserver.observe(skillsTagline); // Uncomment if tagline exists
    }

    // Specific animations for Projects Section
    const projectsTitle = document.querySelector('.projects .section-title');
    const categoryButtons = document.querySelectorAll('.category-button');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectsTitle && categoryButtons.length > 0) {
        const projectsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    projectsTitle.classList.add('slide-in-top');
                    categoryButtons.forEach((button, index) => {
                        button.classList.add('slide-in-bottom');
                        button.style.animationDelay = `${0.2 * index}s`;
                    });
                    // Staggered animation for project cards
                    projectCards.forEach((card, index) => {
                        card.classList.add('fade-in-up'); // Assuming you have a fade-in-up animation
                        card.style.animationDelay = `${0.1 * index + 0.5}s`; // Staggered delay
                    });
                } else {
                    projectsTitle.classList.remove('slide-in-top');
                    categoryButtons.forEach(button => button.classList.remove('slide-in-bottom'));
                    projectCards.forEach(card => card.classList.remove('fade-in-up'));
                }
            });
        }, observerOptions);
        projectsObserver.observe(projectsTitle);
    }

    // Specific animations for Contact Section
    const contactHeading = document.querySelector('.contact .section-title');
    const contactIntro = document.querySelector('.contact p');
    const contactItems = document.querySelectorAll('.contact-item');
    const socialLinks = document.querySelector('.social-links');

    if (contactHeading && contactIntro && contactItems.length > 0 && socialLinks) {
        const contactObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactHeading.classList.add('fade-in-scale-up');
                    contactIntro.classList.add('fade-in-scale-up', 'delay-1');
                    contactItems.forEach((item, index) => {
                        item.classList.add('slide-in-left');
                        item.style.animationDelay = `${0.2 * index}s`;
                    });
                    socialLinks.classList.add('slide-in-left', `delay-${contactItems.length * 0.2 + 0.2}s`);
                } else {
                    contactHeading.classList.remove('fade-in-scale-up');
                    contactIntro.classList.remove('fade-in-scale-up', 'delay-1');
                    contactItems.forEach(item => item.classList.remove('slide-in-left'));
                    socialLinks.classList.remove('slide-in-left', `delay-${contactItems.length * 0.2 + 0.2}s`);
                }
            });
        }, observerOptions);
        contactObserver.observe(contactHeading);
    }
});
