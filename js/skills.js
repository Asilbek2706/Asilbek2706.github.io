
"use strict";

const SkillsEngine = {
    init() {
        this.handleProgressBars();
        this.handleCursorGlow();
        this.handleMagneticCards();
    },

    // 1. AYLANMA PROGRESS VA RAQAMLI COUNTER
    handleProgressBars() {
        const circleBar = document.querySelector('.main-panel .bar');
        const valDisplay = document.querySelector('.main-panel .val');
        const circleContainer = document.querySelector('.cyber-circle');

        if (!circleBar || !valDisplay || !circleContainer) return;

        // SVG radiusiga qarab aylanani aniq hisoblash
        const radius = circleBar.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        // Boshlang'ich holatni o'rnatish
        circleBar.style.strokeDasharray = `${circumference} ${circumference}`;
        circleBar.style.strokeDashoffset = circumference;

        const target = parseInt(valDisplay.getAttribute('data-target')) || parseInt(valDisplay.textContent) || 45;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Kichik kechikish bilan animatsiyani boshlash
                    setTimeout(() => {
                        const offset = circumference - (target / 100) * circumference;
                        circleBar.style.transition = 'stroke-dashoffset 2.5s cubic-bezier(0.22, 1, 0.36, 1)';
                        circleBar.style.strokeDashoffset = offset;
                        this.animateNumber(valDisplay, 0, target, 2500);
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 }); // 30% ko'rinsa yetarli

        observer.observe(circleContainer);
    },

    // RAQAMLARNI SILLIQ SANASH
    animateNumber(element, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // "Easing" effekti qo'shish (out-expo)
            const easeOutProgress = 1 - Math.pow(2, -10 * progress);
            element.textContent = Math.floor(easeOutProgress * (end - start) + start);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end; // Yakuniy raqam aniq chiqishi uchun
            }
        };
        window.requestAnimationFrame(step);
    },

    // 2. KURSORNI KUZATUVCHI NEON NUR (Optimallashtirildi)
    handleCursorGlow() {
        const glow = document.querySelector('.cursor-glow-engine');
        // Agar mobil qurilma bo'lsa yoki element bo'lmasa ishlamaydi
        if (!glow || window.matchMedia("(pointer: coarse)").matches) {
            if(glow) glow.style.display = 'none';
            return;
        }

        // Mousemove eventini throttle qilish unumdorlikni oshiradi
        window.addEventListener('mousemove', (e) => {
            // requestAnimationFrame brauzerga yuklamani kamaytiradi
            window.requestAnimationFrame(() => {
                glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
        }, { passive: true });
    },

    handleMagneticCards() {
        const cards = document.querySelectorAll('.cyber-panel');
        if (window.matchMedia("(pointer: coarse)").matches) return;

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / card.offsetWidth) * 100;
                const y = ((e.clientY - rect.top) / card.offsetHeight) * 100;

                card.style.setProperty('--x', `${x}%`);
                card.style.setProperty('--y', `${y}%`);
            });
        });
    }
};


document.addEventListener('DOMContentLoaded', () => SkillsEngine.init());