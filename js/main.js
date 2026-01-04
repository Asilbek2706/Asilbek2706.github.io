"use strict";

const PortfolioApp = {

    // 1. TYPEWRITER EFFECT
    initTypewriter(elementId, words) {
        const el = document.getElementById(elementId);
        if (!el) return;

        let wordIndex = 0, charIndex = 0, isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex] || "";
            const displayChar = isDeleting ? charIndex - 1 : charIndex + 1;

            el.textContent = currentWord.substring(0, displayChar);
            charIndex = displayChar;

            let typeSpeed = isDeleting ? 60 : 120;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }
            this.typeTimer = setTimeout(type, typeSpeed);
        };
        type();
    },

    // 2. NAVIGATION & ACTIVE SCROLL TRACKING
    initNavigation() {
        const navbar = document.querySelector('.navbar');
        const menuToggle = document.querySelector('.custom-toggler');
        const navCollapse = document.getElementById('asilbekNav');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (menuToggle && navCollapse) {
            menuToggle.onclick = () => {
                const isOpen = navCollapse.classList.contains('show');
                this.toggleMobileMenu(!isOpen);
            };

            navCollapse.onclick = (e) => {
                if (e.target.closest('.nav-link')) {
                    this.toggleMobileMenu(false);
                }
            };
        }

        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (Math.abs(window.scrollY - lastScrollY) > 10) {
                navbar?.classList.toggle('scrolled', window.scrollY > 50);
                lastScrollY = window.scrollY;
            }
        }, { passive: true });

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));
    },

    toggleMobileMenu(open) {
        const menuToggle = document.querySelector('.custom-toggler');
        const navCollapse = document.getElementById('asilbekNav');
        menuToggle?.classList.toggle('active', open);
        navCollapse?.classList.toggle('show', open);
        document.body.style.overflow = open ? 'hidden' : '';
    },

    // 3. SKILLS OBSERVERS
    initObservers() {
        const observerOptions = { threshold: 0.25 };
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const finalWidth = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = finalWidth;
                        bar.style.transition = 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
                    }, 50);
                    skillObserver.unobserve(bar);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-card .progress').forEach(bar => {
            if (bar.style.width) bar.setAttribute('data-width', bar.style.width);
            skillObserver.observe(bar);
        });
    },

    // 4. FAQ
    initFaq() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question?.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.faq-answer').style.maxHeight = null;
                });
                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    this.typeFaqText(item);
                }
            });
        });
    },

    typeFaqText(item) {
        const p = item.querySelector('.answer-content p');
        if (!p || item.hasAttribute('data-typed')) return;
        const text = p.innerText;
        p.innerText = '';
        let i = 0;
        const interval = setInterval(() => {
            p.innerText += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                item.setAttribute('data-typed', 'true');
            }
        }, 15);
    },

    // 5. CONTACT FORM (MODIFIED FOR NO-RELOAD & STABILITY)
    initContactForm() {
        const form = document.querySelector('.cyber-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Sahifa reload bo'lishini to'xtatamiz

            const btn = form.querySelector('.submit-btn');
            if (!btn) return;

            // Avvalgi kontentni saqlaymiz (Send Message + Icon)
            const originalContent = btn.innerHTML;

            // Holat 1: Processing
            btn.disabled = true;
            btn.classList.remove('btn-primary', 'btn-success');
            btn.classList.add('btn-secondary');
            btn.innerHTML = `
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>SENDING...</span>
            `;

            try {
                // Simulyatsiya (Haqiqiy backend bo'lsa fetch shu yerda bo'ladi)
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Holat 2: Success
                btn.classList.remove('btn-secondary');
                btn.classList.add('btn-success');
                btn.innerHTML = `
                    <i class="bi bi-check2-all"></i>
                    <span>MESSAGE SENT!</span>
                `;

                // Formani tozalash
                form.reset();

            } catch (error) {
                btn.innerHTML = `<span>ERROR!</span>`;
                btn.classList.add('btn-danger');
            } finally {
                // Holat 3: Reset (4 sekunddan keyin)
                setTimeout(() => {
                    btn.classList.remove('btn-success', 'btn-secondary', 'btn-danger');
                    btn.classList.add('btn-primary');
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                }, 4000);
            }
        });
    }
}

// --- START APPLICATION ---
document.addEventListener('DOMContentLoaded', () => {
    PortfolioApp.initNavigation();
    PortfolioApp.initTypewriter('typewriter', [
        'Frontend Architect',
        'Senior React Engineer',
        'UI/UX Designer',
        'Web Innovator'
    ]);
    PortfolioApp.initObservers();
    PortfolioApp.initFaq();
    PortfolioApp.initContactForm();

    if (window.AOS) {
        window.AOS.init({ duration: 1000, once: true, mirror: false });
    }
});