"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. NAVBAR & TOGGLER MANTIQI ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.custom-toggler');
    const navCollapse = document.getElementById('asilbekNav');

    if (menuToggle && navCollapse) {
        menuToggle.onclick = (e) => {
            e.preventDefault();
            const isOpen = navCollapse.classList.contains('show');

            if (!isOpen) {
                menuToggle.classList.add('active');
                navCollapse.classList.add('show');
                document.body.style.overflow = 'hidden';
            } else {
                menuToggle.classList.remove('active');
                navCollapse.classList.remove('show');
                document.body.style.overflow = '';
            }
        };

        // Linklar bosilganda yopish
        document.querySelectorAll('.nav-link').forEach(link => {
            link.onclick = () => {
                menuToggle.classList.remove('active');
                navCollapse.classList.remove('show');
                document.body.style.overflow = '';
            };
        });
    }

    // --- 2. SKILLS PROGRESS (1% MUAMMOSI YECHIMI) ---
    const percentEls = document.querySelectorAll('.val');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target')) || 45;
                let current = 0;

                const step = () => {
                    if (current < target) {
                        current++;
                        el.innerText = current;
                        setTimeout(step, 20);
                    }
                };
                step();
                skillObserver.unobserve(el);
            }
        });
    }, { threshold: 0.1 });

    percentEls.forEach(el => skillObserver.observe(el));

    // --- 3. FAQ TYPEWRITER & ACCORDION ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.onclick = () => {
            const item = btn.parentElement;
            const answerWrapper = item.querySelector('.faq-answer');
            const answerPara = item.querySelector('.answer-content p');
            const isActive = item.classList.contains('active');

            // Boshqalarni yopish
            document.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');

                if (!item.hasAttribute('data-original')) {
                    item.setAttribute('data-original', answerPara.innerText);
                }
                const fullText = item.getAttribute('data-original');

                if (!item.hasAttribute('data-typed')) {
                    answerPara.innerText = '';
                    let i = 0;
                    const typing = setInterval(() => {
                        if (i < fullText.length) {
                            answerPara.innerText += fullText.charAt(i);
                            answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";
                            i++;
                        } else {
                            clearInterval(typing);
                            item.setAttribute('data-typed', 'true');
                        }
                    }, 10);
                } else {
                    answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";
                }
            }
        };
    });

    // --- 4. SCROLL EFFECT ---
    window.onscroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
});