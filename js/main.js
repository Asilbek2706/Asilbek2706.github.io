"use strict";

const GlobalApp = {
    init() {
        this.initMobileMenu();
        this.initNavbarScroll();
        this.initNeonCursor();
        this.initAOS();
        this.initSkillsCarousel();
        this.initBentoTilt();
    },

    // 1. Mobil menyu (Burger)
    initMobileMenu() {
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileBtn && navMenu) {
            mobileBtn.addEventListener('click', () => {
                const isOpen = navMenu.classList.toggle('active');
                mobileBtn.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
                document.body.style.overflow = isOpen ? 'hidden' : '';
            });

            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    mobileBtn.innerHTML = '<i class="bi bi-list"></i>';
                    document.body.style.overflow = '';
                });
            });
        }
    },

    // 2. Navbar Skroll effekti (Yuqoriga chiqanda shaffofroq bo'lishi)
    initNavbarScroll() {
        const navContainer = document.querySelector('.nav-container');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navContainer?.style.setProperty('padding', '8px 24px');
                navContainer?.style.setProperty('background', 'rgba(255, 255, 255, 0.9)');
            } else {
                navContainer?.style.setProperty('padding', '10px 24px');
                navContainer?.style.setProperty('background', 'var(--bg-glass)'); // SCSS dan kelgan glass rangi
            }
        });
    },

    initBentoTilt() {
        const tiltCards = document.querySelectorAll('.js-tilt');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            });
        });
    },

    initSkillsCarousel() {
        const swiperElement = document.querySelector('.skillsSwiper');
        if (swiperElement && typeof Swiper !== 'undefined') {
            new Swiper('.skillsSwiper', {
                slidesPerView: 'auto',
                spaceBetween: 12,
                freeMode: true,
                grabCursor: true,
                pagination: { el: '.swiper-pagination', clickable: true },
                breakpoints: {
                    992: { enabled: false, spaceBetween: 0 }
                }
            });
        }
    },

    initNeonCursor() {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const cursor = document.createElement('div');
        cursor.className = 'neon-cursor';
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .bento-card, .skill-pill, .social-icon')) {
                cursor.classList.add('cursor-hover');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .bento-card, .skill-pill, .social-icon')) {
                cursor.classList.remove('cursor-hover');
            }
        });
    },

    initAOS() {
        if (window.AOS) {
            window.AOS.init({
                duration: 800,
                once: true,
                easing: 'ease-out-cubic'
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => GlobalApp.init());