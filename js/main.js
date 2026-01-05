"use strict";

const GlobalApp = {
    init() {
        this.initNavigation();
        this.initNeonCursor();
        this.initAOS();
    },

    initNavigation() {
        const navbar = document.querySelector('.navbar');
        const menuToggle = document.querySelector('.custom-toggler');
        const navCollapse = document.getElementById('asilbekNav');

        if (menuToggle && navCollapse) {
            menuToggle.onclick = () => {
                const isOpen = navCollapse.classList.contains('show');
                this.toggleMobileMenu(!isOpen);
            };
        }

        window.addEventListener('scroll', () => {
            navbar?.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    },

    toggleMobileMenu(open) {
        const menuToggle = document.querySelector('.custom-toggler');
        const navCollapse = document.getElementById('asilbekNav');
        menuToggle?.classList.toggle('active', open);
        navCollapse?.classList.toggle('show', open);
        document.body.style.overflow = open ? 'hidden' : '';
    },

    // --- NEON GLOWING CURSOR (OPTIMIZED) ---
    initNeonCursor() {
        // 1. Agar qurilma sensorli (touch) bo'lsa, kursorni yaratmaymiz va funksiyadan chiqamiz
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = document.createElement('div');
        cursor.className = 'neon-cursor';
        document.body.appendChild(cursor);

        // 2. Mouse harakatini kuzatish
        document.addEventListener('mousemove', (e) => {
            // Animatsiyani silliq qilish uchun requestAnimationFrame tavsiya etiladi
            requestAnimationFrame(() => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
        });

        // 3. Hover effektlari
        // Delegation o'rniga dinamik elementlarni ham hisobga olish uchun bitta funksiya
        const addHoverEvents = () => {
            const interactiveSelectors = 'a, button, .project-card, .skill-card, .method-card, .faq-question, .btn-glow';
            const interactiveElements = document.querySelectorAll(interactiveSelectors);

            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
            });
        };

        addHoverEvents();
    },

    initAOS() {
        if (window.AOS) {
            window.AOS.init({ duration: 1000, once: true });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => GlobalApp.init());