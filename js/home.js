"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. Scroll effekti (Navbar ixchamlashtirish)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navContainer.style.padding = '8px 20px';
            navContainer.style.background = 'rgba(255, 255, 255, 0.85)';
            navContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.08)';
        } else {
            navContainer.style.padding = '12px 28px';
            navContainer.style.background = 'rgba(255, 255, 255, 0.7)';
            navContainer.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.04)';
        }
    }, { passive: true });

    // 2. Active linkni dinamik almashtirish (Click orqali)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});