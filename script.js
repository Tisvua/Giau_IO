// Navigation and scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const mainContent = document.querySelector('.main-content');
    const leftSidebar = document.querySelector('.left-sidebar');
    
    // Variables for scroll hide/show
    let lastScrollTop = 0;
    let scrollThreshold = 50;

    // Check if mobile view
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Get scroll container based on screen size
    function getScrollContainer() {
        return isMobile() ? window : mainContent;
    }

    // Get current scroll position
    function getScrollPosition() {
        if (isMobile()) {
            return window.scrollY || window.pageYOffset;
        }
        return mainContent.scrollTop;
    }
    
    // Handle sidebar hide/show on mobile scroll
    function handleSidebarVisibility() {
        if (!isMobile()) {
            leftSidebar.classList.remove('hidden');
            return;
        }
        
        const currentScrollTop = getScrollPosition();
        
        // Only trigger after scrolling past threshold
        if (Math.abs(currentScrollTop - lastScrollTop) < 10) return;
        
        if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
            // Scrolling down - hide sidebar
            leftSidebar.classList.add('hidden');
        } else {
            // Scrolling up - show sidebar
            leftSidebar.classList.remove('hidden');
        }
        
        lastScrollTop = currentScrollTop;
    }

    // Smooth scroll to section on nav click
    navItems.forEach((item) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                if (isMobile()) {
                    // Account for fixed header on mobile
                    const headerHeight = 60;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Update active nav item on scroll
    function updateActiveNav() {
        const headerOffset = isMobile() ? 100 : 150;
        const scrollPosition = getScrollPosition() + headerOffset;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(nav => nav.classList.remove('active'));
                if (navItems[index]) {
                    navItems[index].classList.add('active');
                }
                
                // Update URL hash without scrolling
                const sectionId = section.id;
                if (window.location.hash !== '#' + sectionId) {
                    history.replaceState(null, null, '#' + sectionId);
                }
            }
        });
    }

    // Listen for scroll events on both containers
    mainContent.addEventListener('scroll', updateActiveNav);
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('scroll', handleSidebarVisibility);

    // Handle direct URL hash navigation on load
    function scrollToHashSection() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetSection = document.getElementById(hash);
            if (targetSection) {
                setTimeout(() => {
                    if (isMobile()) {
                        const headerHeight = 60;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        targetSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 100);
            }
        } else {
            // Set first nav item as active if no hash
            navItems[0].classList.add('active');
        }
    }

    scrollToHashSection();

    // Handle hash changes (back/forward browser buttons)
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetSection = document.getElementById(hash);
            if (targetSection) {
                if (isMobile()) {
                    const headerHeight = 60;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    });

    // Animate progress bars when scrolled into view
    const progressBars = document.querySelectorAll('.progress-bar');
    let progressAnimated = false;

    function animateProgressBars() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection || progressAnimated) return;
        
        const rect = skillsSection.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            progressBars.forEach(bar => {
                bar.style.transition = 'width 1.5s ease-in-out';
            });
            progressAnimated = true;
        }
    }

    mainContent.addEventListener('scroll', animateProgressBars);
    window.addEventListener('scroll', animateProgressBars);
    
    // Smooth scroll for other internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('nav-item')) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        if (isMobile()) {
                            const headerHeight = 60;
                            const targetPosition = targetSection.offsetTop - headerHeight;
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        } else {
                            targetSection.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }
                }
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        updateActiveNav();
        // Reset sidebar visibility on resize
        if (!isMobile()) {
            leftSidebar.classList.remove('hidden');
        }
    });

    // Initial check
    updateActiveNav();
    setTimeout(animateProgressBars, 500);
    
    // Scroll Animation for content elements
    function initScrollAnimations() {
        // Add animation classes to elements
        const animationTargets = [
            { selector: '.section-title', animation: 'animate-left' },
            { selector: '.main-heading', animation: 'animate-left' },
            { selector: '.main-description', animation: 'animate-up' },
            { selector: '.btn-hire', animation: 'animate-up' },
            { selector: '.about-content', animation: 'animate-right' },
            { selector: '.timeline-item', animation: 'animate-left' },
            { selector: '.info-item', animation: 'animate-up' },
            { selector: '.contact-item', animation: 'animate-up' },
            { selector: '.sub-title', animation: 'animate-left' },
            { selector: '.lead-text', animation: 'animate-fade' }
        ];
        
        animationTargets.forEach(target => {
            document.querySelectorAll(target.selector).forEach(el => {
                el.classList.add('animate-on-scroll', target.animation);
            });
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        // Element is considered in viewport when top is within 85% of window height
        return rect.top <= windowHeight * 0.85 && rect.bottom >= 0;
    }
    
    // Animate elements when they come into view
    function handleScrollAnimation() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(el => {
            if (isInViewport(el)) {
                el.classList.add('animated');
            }
        });
    }
    
    // Initialize animations
    initScrollAnimations();
    
    // Listen for scroll events
    mainContent.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Trigger initial check for visible elements
    setTimeout(handleScrollAnimation, 100);
});
