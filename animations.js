// Advanced Animations using GSAP-inspired techniques
// This file contains custom animation functions for enhanced visual effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initParallaxEffect();
    initCounterAnimation();
    initTextReveal();
    initMouseFollowEffect();
    initButtonEffects();
    initHeroAnimation();
});

// Parallax scrolling effect for background elements
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.2;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Animated counter for statistics
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'), 10);
                const duration = parseInt(element.getAttribute('data-duration') || 2000, 10);
                
                if (!element.classList.contains('counted')) {
                    animateCounter(element, 0, target, duration);
                    element.classList.add('counted');
                }
            }
        });
    }, options);
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = easeOutCubic(progress);
        const currentCount = Math.floor(easeProgress * (end - start) + start);
        
        element.textContent = currentCount.toLocaleString();
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end.toLocaleString();
        }
    };
    
    window.requestAnimationFrame(step);
}

// Easing function for smoother animations
function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}

// Text reveal animation for headings
function initTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    if (textElements.length === 0) return;
    
    textElements.forEach(element => {
        // Split text into individual characters
        const text = element.textContent;
        element.textContent = '';
        
        // Create spans for each character
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i] === ' ' ? ' ' : text[i];
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = text[i] === ' ' ? 'inline' : 'inline-block';
            span.style.transition = `opacity 0.5s ease, transform 0.5s ease ${i * 0.03}s`;
            element.appendChild(span);
        }
    });
    
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const spans = entry.target.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    textElements.forEach(element => {
        observer.observe(element);
    });
}

// Interactive mouse follow effect
function initMouseFollowEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
    
    function animate() {
        // Smooth follow effect for main cursor
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        // Faster follow for dot
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Enhanced button hover effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
        
        // Add click effect for better user feedback
        button.addEventListener('click', () => {
            button.classList.add('btn-clicked');
            setTimeout(() => {
                button.classList.remove('btn-clicked');
            }, 300);
        });
    });
}

// Special animation for hero section
function initHeroAnimation() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const heroContent = heroSection.querySelector('.hero-content');
    const heroImage = heroSection.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 300);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            heroImage.style.transition = 'opacity 1s ease, transform 1s ease';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 600);
    }
}