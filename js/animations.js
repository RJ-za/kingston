@@ .. @@
 document.addEventListener('DOMContentLoaded', function() {
     // Initialize all animations
     initParallaxEffect();
-    initCounterAnimation();
     initTextReveal();
     initMouseFollowEffect();
     initButtonEffects();
     initHeroAnimation();
+    initAdvancedAnimations();
 });

@@ .. @@
-// Animated counter for statistics
-function initCounterAnimation() {
-    const statNumbers = document.querySelectorAll('.stat-number');
-    
-    if (statNumbers.length === 0) return;
-    
-    const options = {
-        threshold: 0.5
-    };
-    
-    const observer = new IntersectionObserver((entries) => {
-        entries.forEach(entry => {
-            if (entry.isIntersecting) {
-                const element = entry.target;
-                const target = parseInt(element.getAttribute('data-target'), 10);
-                const duration = parseInt(element.getAttribute('data-duration') || 2000, 10);
-                
-                if (!element.classList.contains('counted')) {
-                    animateCounter(element, 0, target, duration);
-                    element.classList.add('counted');
-                }
-            }
-        });
-    }, options);
-    
-    statNumbers.forEach(number => {
-        observer.observe(number);
-    });
-}
-
-function animateCounter(element, start, end, duration) {
-    let startTimestamp = null;
-    const step = (timestamp) => {
-        if (!startTimestamp) startTimestamp = timestamp;
-        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
-        const easeProgress = easeOutCubic(progress);
-        const currentCount = Math.floor(easeProgress * (end - start) + start);
-        
-        element.textContent = currentCount.toLocaleString();
-        
-        if (progress < 1) {
-            window.requestAnimationFrame(step);
-        } else {
-            element.textContent = end.toLocaleString();
-        }
-    };
-    
-    window.requestAnimationFrame(step);
-}
-
-// Easing function for smoother animations
-function easeOutCubic(x) {
-    return 1 - Math.pow(1 - x, 3);
-}
-
 // Text reveal animation for headings
 function initTextReveal() {
     const textElements = document.querySelectorAll('.text-reveal');
@@ .. @@
         }, 600);
     }
 }
+
+// Advanced animations for enhanced user experience
+function initAdvancedAnimations() {
+    // Staggered animations for grids
+    const grids = document.querySelectorAll('.feature-grid, .service-grid, .team-grid, .benefits-grid');
+    
+    grids.forEach(grid => {
+        const items = grid.querySelectorAll('.animate-on-scroll');
+        items.forEach((item, index) => {
+            item.setAttribute('data-delay', index * 100);
+        });
+    });
+    
+    // Typing effect for specific elements
+    initTypingEffect();
+    
+    // Particle background effect
+    initParticleBackground();
+}
+
+// Typing effect animation
+function initTypingEffect() {
+    const typingElements = document.querySelectorAll('.typing-effect');
+    
+    typingElements.forEach(element => {
+        const text = element.textContent;
+        element.textContent = '';
+        element.style.borderRight = '2px solid var(--primary-color)';
+        
+        let i = 0;
+        const typeWriter = () => {
+            if (i < text.length) {
+                element.textContent += text.charAt(i);
+                i++;
+                setTimeout(typeWriter, 100);
+            } else {
+                // Blinking cursor effect
+                setInterval(() => {
+                    element.style.borderRight = element.style.borderRight === 'none' ? 
+                        '2px solid var(--primary-color)' : 'none';
+                }, 500);
+            }
+        };
+        
+        // Start typing when element is in view
+        const observer = new IntersectionObserver((entries) => {
+            entries.forEach(entry => {
+                if (entry.isIntersecting) {
+                    setTimeout(typeWriter, 500);
+                    observer.unobserve(entry.target);
+                }
+            });
+        });
+        
+        observer.observe(element);
+    });
+}
+
+// Particle background effect
+function initParticleBackground() {
+    const heroSection = document.querySelector('.hero');
+    if (!heroSection) return;
+    
+    const canvas = document.createElement('canvas');
+    const ctx = canvas.getContext('2d');
+    canvas.style.position = 'absolute';
+    canvas.style.top = '0';
+    canvas.style.left = '0';
+    canvas.style.width = '100%';
+    canvas.style.height = '100%';
+    canvas.style.pointerEvents = 'none';
+    canvas.style.zIndex = '1';
+    heroSection.appendChild(canvas);
+    
+    let particles = [];
+    
+    function resizeCanvas() {
+        canvas.width = heroSection.offsetWidth;
+        canvas.height = heroSection.offsetHeight;
+    }
+    
+    function createParticle() {
+        return {
+            x: Math.random() * canvas.width,
+            y: Math.random() * canvas.height,
+            vx: (Math.random() - 0.5) * 0.5,
+            vy: (Math.random() - 0.5) * 0.5,
+            size: Math.random() * 2 + 1,
+            opacity: Math.random() * 0.5 + 0.2
+        };
+    }
+    
+    function initParticles() {
+        particles = [];
+        for (let i = 0; i < 50; i++) {
+            particles.push(createParticle());
+        }
+    }
+    
+    function updateParticles() {
+        particles.forEach(particle => {
+            particle.x += particle.vx;
+            particle.y += particle.vy;
+            
+            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
+            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
+        });
+    }
+    
+    function drawParticles() {
+        ctx.clearRect(0, 0, canvas.width, canvas.height);
+        
+        particles.forEach(particle => {
+            ctx.beginPath();
+            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
+            ctx.fillStyle = `rgba(201, 169, 110, ${particle.opacity})`;
+            ctx.fill();
+        });
+        
+        // Draw connections
+        particles.forEach((particle, i) => {
+            particles.slice(i + 1).forEach(otherParticle => {
+                const dx = particle.x - otherParticle.x;
+                const dy = particle.y - otherParticle.y;
+                const distance = Math.sqrt(dx * dx + dy * dy);
+                
+                if (distance < 100) {
+                    ctx.beginPath();
+                    ctx.moveTo(particle.x, particle.y);
+                    ctx.lineTo(otherParticle.x, otherParticle.y);
+                    ctx.strokeStyle = `rgba(201, 169, 110, ${0.1 * (1 - distance / 100)})`;
+                    ctx.stroke();
+                }
+            });
+        });
+    }
+    
+    function animate() {
+        updateParticles();
+        drawParticles();
+        requestAnimationFrame(animate);
+    }
+    
+    resizeCanvas();
+    initParticles();
+    animate();
+    
+    window.addEventListener('resize', () => {
+        resizeCanvas();
+        initParticles();
+    });
+}