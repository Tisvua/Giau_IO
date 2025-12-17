// Navigation and scroll functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const mainContent = document.querySelector('.main-content');

    // Smooth scroll to section on nav click
    navItems.forEach((item) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav item on scroll
    function updateActiveNav() {
        const scrollPosition = mainContent.scrollTop + 150;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(nav => nav.classList.remove('active'));
                navItems[index].classList.add('active');
                
                // Update URL hash without scrolling
                const sectionId = section.id;
                if (window.location.hash !== '#' + sectionId) {
                    history.replaceState(null, null, '#' + sectionId);
                }
            }
        });
    }

    // Listen for scroll events
    mainContent.addEventListener('scroll', updateActiveNav);

    // Handle direct URL hash navigation on load
    function scrollToHashSection() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetSection = document.getElementById(hash);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
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
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
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
        const mainContentRect = mainContent.getBoundingClientRect();
        
        if (rect.top < mainContentRect.bottom && rect.bottom > mainContentRect.top) {
            progressBars.forEach(bar => {
                bar.style.transition = 'width 1.5s ease-in-out';
            });
            progressAnimated = true;
        }
    }

    mainContent.addEventListener('scroll', animateProgressBars);
    
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
                        targetSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        }
    });

    // Initial check
    updateActiveNav();
    setTimeout(animateProgressBars, 500);
});
