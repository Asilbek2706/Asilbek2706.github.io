/**
 * ASILBEK.DEV - SKILLS ENGINE LOGIC
 * Manages: Progress counters, Circular Bars, and Interactive Effects.
 */

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

        if (!circleBar || !valDisplay) return;

        const target = parseInt(valDisplay.textContent) || 40;
        const circumference = 2 * Math.PI * 45; // 2 * PI * R (R=45) ≈ 283

        // Boshlang'ich holat
        circleBar.style.strokeDasharray = circumference;
        circleBar.style.strokeDashoffset = circumference;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animatsiyani boshlash
                    setTimeout(() => {
                        const offset = circumference - (target / 100) * circumference;
                        circleBar.style.strokeDashoffset = offset;
                        this.animateNumber(valDisplay, 0, target, 2500);
                    }, 400);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector('.cyber-circle'));
    },

    // RAQAMLARNI 0 DAN SANASH
    animateNumber(element, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    },

    // 2. KURSORNI KUZATUVCHI NEON NUR
    handleCursorGlow() {
        const glow = document.querySelector('.cursor-glow-engine');
        if (!glow || window.matchMedia("(pointer: coarse)").matches) return;

        window.addEventListener('mousemove', (e) => {
            glow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
        });
    },

    // 3. KARTALARDAGI MAGNETIC LIGHT (CSS Variable orqali)
    handleMagneticCards() {
        const cards = document.querySelectorAll('.cyber-panel');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
                const y = ((e.clientY - rect.top) / card.clientHeight) * 100;

                card.style.setProperty('--x', `${x}%`);
                card.style.setProperty('--y', `${y}%`);
            });
        });
    }
};

// DOM yuklanganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    SkillsEngine.init();

    // Roadmap status logging for DevTools
    const activeStatus = document.querySelector('.step.active strong')?.textContent;
    console.log(`%c [SYSTEM]: Skill Phase Active: ${activeStatus}`, 'color: #00f2fe; font-weight: bold;');
});