// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Enhanced Scroll Animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Initial check for elements in viewport on page load
    checkAnimateElements();

    // Check elements on scroll
    window.addEventListener('scroll', checkAnimateElements);
    
    // Add scroll listener with throttling for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(checkAnimateElements);
    });

    function checkAnimateElements() {
        const triggerBottom = window.innerHeight * 0.85; // Slightly increased trigger area

        animateElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Check if element is in viewport or slightly above/below
            if (elementTop < triggerBottom && elementBottom > 0) {
                // Add staggered delay based on element index within its parent
                const siblings = Array.from(element.parentElement.children).filter(child => 
                    child.classList.contains('animate-on-scroll'));
                const siblingIndex = siblings.indexOf(element);
                
                // Apply the animation with a staggered delay
                setTimeout(() => {
                    element.classList.add('show');
                }, siblingIndex * 150); // 150ms delay between each element
            } else if (elementBottom < 0 || elementTop > window.innerHeight) {
                // Optional: Remove animation when element is far out of viewport
                // Uncomment to enable exit animations
                // element.classList.remove('show');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.faq-toggle i');

        // Show first FAQ item by default
        if (item === faqItems[0]) {
            item.classList.add('active');
        }

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real implementation, you would send the form data to a server
            // For this demo, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.padding = '10px 0';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.padding = '20px 0';
        }
        
        lastScrollTop = scrollTop;
    });

    // Button hover effect enhancement
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Testimonial slider (simple version)
    const testimonials = document.querySelectorAll('.testimonial-slide');
    let currentTestimonial = 0;

    // Only setup the slider if there are multiple testimonials
    if (testimonials.length > 1) {
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });

        // Function to show the next testimonial
        function showNextTestimonial() {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }

        // Auto-rotate testimonials every 5 seconds
        setInterval(showNextTestimonial, 5000);
    }
});