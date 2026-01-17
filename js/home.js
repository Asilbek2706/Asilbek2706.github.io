"use strict";

const HomeApp = {
    init() {
        this.navbarScrollEffect();
        this.activeLinkHandler();
    },

    navbarScrollEffect() {
        const navContainer = document.querySelector('.nav-container');

        if (!navContainer) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navContainer.classList.add('scrolled');
            } else {
                navContainer.classList.remove('scrolled');
            }
        }, { passive: true });
    },

    activeLinkHandler() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
};

function startLoader() {
    let percentText = document.getElementById('percent-text');
    let progressCircle = document.querySelector('.circle-progress');
    let preloader = document.getElementById('preloader');

    let count = 0;
    let radius = 45;
    let circumference = 2 * Math.PI * radius; // 282.7

    let interval = setInterval(() => {
        count++;

        // Foiz matnini yangilash
        percentText.innerText = count + "%";

        // Aylanani to'ldirish
        let offset = circumference - (count / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;

        if (count >= 100) {
            clearInterval(interval);

            // Sayt yuklanganini bildirish
            setTimeout(() => {
                preloader.classList.add('loaded');
            }, 500);
        }
    }, 30); // 30ms * 100 = taxminan 3 soniya
}

window.addEventListener('load', startLoader);

document.addEventListener('DOMContentLoaded', () => HomeApp.init());