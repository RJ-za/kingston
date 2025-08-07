@@ .. @@
 // Wait for the DOM to be fully loaded
 document.addEventListener('DOMContentLoaded', function() {
+    // Initialize counter animations for stats
+    initCounterAnimation();
+    
     // Mobile Menu Toggle
     const menuToggle = document.querySelector('.menu-toggle');
     const nav = document.querySelector('nav');

@@ .. @@
         setInterval(showNextTestimonial, 5000);
     }
+
+    // Initialize FAQ functionality for all pages
+    initFAQFunctionality();
+    
+    // Initialize form enhancements
+    initFormEnhancements();
+    
+    // Initialize scroll animations
+    initScrollAnimations();
 });
+
+// Counter Animation Function
+function initCounterAnimation() {
+    const statNumbers = document.querySelectorAll('.stat-number');
+    
+    if (statNumbers.length === 0) return;
+    
+    const options = {
+        threshold: 0.5
+    };
+    
+    const observer = new IntersectionObserver((entries) => {
+        entries.forEach(entry => {
+            if (entry.isIntersecting) {
+                const element = entry.target;
+                const target = parseInt(element.getAttribute('data-target'), 10);
+                const duration = parseInt(element.getAttribute('data-duration') || 2000, 10);
+                
+                if (!element.classList.contains('counted')) {
+                    animateCounter(element, 0, target, duration);
+                    element.classList.add('counted');
+                }
+            }
+        });
+    }, options);
+    
+    statNumbers.forEach(number => {
+        observer.observe(number);
+    });
+}
+
+function animateCounter(element, start, end, duration) {
+    let startTimestamp = null;
+    const step = (timestamp) => {
+        if (!startTimestamp) startTimestamp = timestamp;
+        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
+        const easeProgress = easeOutCubic(progress);
+        const currentCount = Math.floor(easeProgress * (end - start) + start);
+        
+        element.textContent = currentCount.toLocaleString();
+        
+        if (progress < 1) {
+            window.requestAnimationFrame(step);
+        } else {
+            element.textContent = end.toLocaleString();
+        }
+    };
+    
+    window.requestAnimationFrame(step);
+}
+
+// Easing function for smoother animations
+function easeOutCubic(x) {
+    return 1 - Math.pow(1 - x, 3);
+}
+
+// Enhanced FAQ functionality
+function initFAQFunctionality() {
+    const faqItems = document.querySelectorAll('.faq-item');
+    
+    faqItems.forEach(item => {
+        const question = item.querySelector('.faq-question');
+        const answer = item.querySelector('.faq-answer');
+        const toggleIcon = item.querySelector('.faq-toggle i, .toggle-icon i');
+        
+        if (question && answer) {
+            question.addEventListener('click', () => {
+                // Close all other items
+                faqItems.forEach(otherItem => {
+                    if (otherItem !== item && otherItem.classList.contains('active')) {
+                        otherItem.classList.remove('active');
+                        const otherAnswer = otherItem.querySelector('.faq-answer');
+                        const otherIcon = otherItem.querySelector('.faq-toggle i, .toggle-icon i');
+                        if (otherAnswer) otherAnswer.style.maxHeight = '0';
+                        if (otherIcon) {
+                            otherIcon.classList.remove('fa-minus');
+                            otherIcon.classList.add('fa-plus');
+                        }
+                    }
+                });
+                
+                // Toggle current item
+                const isActive = item.classList.contains('active');
+                if (isActive) {
+                    item.classList.remove('active');
+                    answer.style.maxHeight = '0';
+                    if (toggleIcon) {
+                        toggleIcon.classList.remove('fa-minus');
+                        toggleIcon.classList.add('fa-plus');
+                    }
+                } else {
+                    item.classList.add('active');
+                    answer.style.maxHeight = answer.scrollHeight + 'px';
+                    if (toggleIcon) {
+                        toggleIcon.classList.remove('fa-plus');
+                        toggleIcon.classList.add('fa-minus');
+                    }
+                }
+            });
+        }
+    });
+}
+
+// Form enhancements
+function initFormEnhancements() {
+    const forms = document.querySelectorAll('form');
+    
+    forms.forEach(form => {
+        const inputs = form.querySelectorAll('input, textarea, select');
+        
+        inputs.forEach(input => {
+            // Add floating label effect
+            input.addEventListener('focus', function() {
+                this.parentElement.classList.add('focused');
+            });
+            
+            input.addEventListener('blur', function() {
+                if (!this.value) {
+                    this.parentElement.classList.remove('focused');
+                }
+            });
+            
+            // Check if input has value on load
+            if (input.value) {
+                input.parentElement.classList.add('focused');
+            }
+        });
+    });
+}
+
+// Enhanced scroll animations
+function initScrollAnimations() {
+    const animateElements = document.querySelectorAll('.animate-on-scroll');
+    
+    const options = {
+        threshold: 0.1,
+        rootMargin: '0px 0px -50px 0px'
+    };
+    
+    const observer = new IntersectionObserver((entries) => {
+        entries.forEach(entry => {
+            if (entry.isIntersecting) {
+                const element = entry.target;
+                const delay = element.getAttribute('data-delay') || 0;
+                
+                setTimeout(() => {
+                    element.classList.add('show');
+                }, delay);
+                
+                observer.unobserve(element);
+            }
+        });
+    }, options);
+    
+    animateElements.forEach(element => {
+        observer.observe(element);
+    });
+}