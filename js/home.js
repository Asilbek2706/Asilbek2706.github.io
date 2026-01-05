/**
 * HOME PAGE SPECIFIC LOGIC
 * Minimal & Professional Version
 */

"use strict";

const HomePage = {
    init() {
        // 1. Faqat matnli animatsiya (branding uchun muhim)
        this.initTypewriter('typewriter', [
            'Frontend Architect',
            'Junior React Engineer',
            'UI/UX Designer',
            'Web Innovator'
        ]);

        // 2. Scroll indikatori (UX uchun foydali)
        this.initScrollProgress();

        // 3. Skills progress (faqat bir marta ko'ringanda ishlaydi)
        this.initSkillsObservers();

        // 4. Form mantiqi
        this.initContactForm();
    },

    initTypewriter(elementId, words) {
        const el = document.getElementById(elementId);
        if (!el) return;

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentWord = words[wordIndex] || "";
            const displayChar = isDeleting ? charIndex - 1 : charIndex + 1;
            el.textContent = currentWord.substring(0, displayChar);
            charIndex = displayChar;

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        };
        type();
    },

    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        }, { passive: true });
    },

    initSkillsObservers() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const finalWidth = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = finalWidth;
                        bar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, 100);
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.skill-card .progress').forEach(bar => {
            if (bar.style.width) bar.setAttribute('data-width', bar.style.width);
            skillObserver.observe(bar);
        });
    },

    initContactForm() {
        const form = document.querySelector('.contact-form form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;

            await new Promise(r => setTimeout(r, 1500));
            btn.classList.add('btn-success');
            btn.innerHTML = `<span><i class="bi bi-check2"></i> Sent</span>`;
            form.reset();

            setTimeout(() => {
                btn.classList.remove('btn-success');
                btn.innerHTML = originalContent;
                btn.disabled = false;
            }, 3000);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => HomePage.init());