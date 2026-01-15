"use strict";

/**
 * GlobalApp - Portfolioning barcha sahifalari uchun umumiy funksiyalar
 */
const GlobalApp = {
    init() {
        this.initMobileMenu();
        this.initNeonCursor();
        this.initAOS();
        this.initSkillsCarousel(); // Karusel funksiyasi
    },

    // 1. Mobil menyu (Burger) boshqaruvi
    initMobileMenu() {
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileBtn && navMenu) {
            mobileBtn.addEventListener('click', () => {
                const isOpen = navMenu.classList.toggle('active');
                mobileBtn.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
                document.body.style.overflow = isOpen ? 'hidden' : '';
            });

            // Menyu ochiqligida biror link bosilsa menyuni yopish
            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    mobileBtn.innerHTML = '<i class="bi bi-list"></i>';
                    document.body.style.overflow = '';
                });
            });
        }
    },

    // 2. Technical Arsenal - Mobil versiyada Karusel (Swiper.js)
    initSkillsCarousel() {
        const swiperElement = document.querySelector('.skillsSwiper');

        if (swiperElement && typeof Swiper !== 'undefined') {
            new Swiper('.skillsSwiper', {
                slidesPerView: 'auto',
                spaceBetween: 12,
                freeMode: true,
                grabCursor: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    // 992px dan yuqori ekranlarda karuselni o'chiradi (Grid holatida qoladi)
                    992: {
                        enabled: false,
                        spaceBetween: 0
                    }
                }
            });
        }
    },

    // 3. Neon Glowing Cursor (Silliq va GPU optimallashgan)
    initNeonCursor() {
        // Sensorli ekranlarda kursorni yaratmaymiz
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = document.createElement('div');
        cursor.className = 'neon-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Kursorni silliq (smooth lag-free) harakatlantirish
        const animateCursor = () => {
            let dx = mouseX - cursorX;
            let dy = mouseY - cursorY;

            cursorX += dx * 0.15;
            cursorY += dy * 0.15;

            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effektlari (Event Delegation orqali)
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('a, button, .bento-card, .skill-pill, .social-icon, .project-wrapper');
            if (target) cursor.classList.add('cursor-hover');
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('a, button, .bento-card, .skill-pill, .social-icon, .project-wrapper');
            if (target) cursor.classList.remove('cursor-hover');
        });
    },

    // 4. AOS (Animate On Scroll) kutubxonasi
    initAOS() {
        if (window.AOS) {
            window.AOS.init({
                duration: 800,
                offset: 100,
                once: true,
                easing: 'ease-out-cubic'
            });
        }
    }
};

// Sahifa yuklanganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => GlobalApp.init());