// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function updateProjectFilter(filterValue) {
        // Update filter button states
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filterValue);
        });

        // Update project visibility
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const isComingSoon = card.classList.contains('coming-soon');
            
            if (filterValue === 'all') {
                // Show only real projects in "All Projects", hide coming soon cards
                if (isComingSoon) {
                    card.style.display = 'none';
                } else {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                }
            } else {
                // Show all cards (including coming soon) for specific categories
                if (cardCategory === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            updateProjectFilter(filterValue);
        });
    });

    // Animate skill bars when they come into view
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillBarsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillBarsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillBarsObserver.observe(skillsSection);
    }

    // Animate elements on scroll
    const animateOnScrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Apply scroll animation to sections
    const sectionsToAnimate = document.querySelectorAll('.about, .projects, .skills, .contact');
    sectionsToAnimate.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        animateOnScrollObserver.observe(section);
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 15, 35, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(15, 15, 35, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
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

    // Add resume download tracking
    const resumeLink = document.querySelector('a[download]');
    if (resumeLink) {
        resumeLink.addEventListener('click', function() {
            console.log('Resume downloaded');
        });
    }

    // Simple Identity Word Changer
    const identityWord = document.getElementById('identity-word');
    const article = document.getElementById('article');
    const andBtn = document.getElementById('and-btn');
    const roleDescriptions = document.querySelectorAll('.role-description');
    
    let currentIndex = 0;
    const roles = ['designer', 'engineer', 'writer', 'scientist', 'artist', 'developer'];
    
    // Words that need "an" instead of "a"
    const vowelWords = ['engineer', 'artist'];

    // Function to update the word and description
    function updateRole(index, animate = true) {
        if (animate) {
            // Add animation class only to the word
            identityWord.classList.add('changing');
        }
        
        // Update word after brief delay (or immediately if no animation)
        setTimeout(() => {
            identityWord.textContent = roles[index];
            
            // Update article (a vs an) - no animation, just instant change
            article.textContent = vowelWords.includes(roles[index]) ? 'an' : 'a';
            
            // Remove all role classes
            roles.forEach(role => {
                identityWord.classList.remove(role);
            });
            
            // Add current role class for gradient
            identityWord.classList.add(roles[index]);
            
            // Update description
            roleDescriptions.forEach((desc, i) => {
                desc.classList.toggle('active', i === index);
            });
            
            // Sync project filter with current role
            if (typeof updateProjectFilter === 'function') {
                updateProjectFilter(roles[index]);
            }
            
            currentIndex = index;
        }, animate ? 150 : 0);
        
        // Remove animation class
        if (animate) {
            setTimeout(() => {
                identityWord.classList.remove('changing');
            }, 300);
        }
    }
    
    // Initialize with random word on page load
    const randomStartIndex = Math.floor(Math.random() * roles.length);
    updateRole(randomStartIndex, false); // No animation on initial load

    // "And" button functionality - cycles to next role
    andBtn.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % roles.length;
        updateRole(nextIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.identity-section')) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault();
                andBtn.click();
            }
        }
    });

    // "View My Work" button - always show All Projects
    const viewWorkBtn = document.getElementById('view-work-btn');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', (e) => {
            // Small delay to allow scroll to complete, then show all projects
            setTimeout(() => {
                updateProjectFilter('all');
            }, 100);
        });
    }

    // Prevent flash of unstyled content
    document.body.style.visibility = 'visible';
});

// Add CSS for ripple effect and animations
const style = document.createElement('style');
style.textContent = `
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

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    body {
        visibility: hidden;
    }

    html {
        scroll-behavior: smooth;
    }

    .skill-bar {
        position: relative;
        overflow: hidden;
    }

    .skill-bar::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
        );
        animation: loading-shimmer 1.5s infinite;
    }

    @keyframes loading-shimmer {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }
`;

document.head.appendChild(style);
