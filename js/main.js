// main.js

// 1. Navbar Logikasi (Mobil menyu va Scroll effekti)
const handleNavbar = () => {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.custom-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');

    if (menuToggle && navCollapse) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpened = navCollapse.classList.contains('show');
            menuToggle.classList.toggle('active');
            navCollapse.classList.toggle('show');
            document.body.style.overflow = !isOpened ? 'hidden' : '';
        });

        // Link bosilganda menyuni yopish
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navCollapse.classList.remove('show');
                document.body.style.overflow = '';
            });
        });

        // Menyu tashqarisiga bosilganda yopish
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navCollapse.classList.contains('show')) {
                menuToggle.classList.remove('active');
                navCollapse.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('navbar-scrolled');
        } else {
            navbar?.classList.remove('navbar-scrolled');
        }
    });
};

// 2. FAQ Logic (Typewriter + Accordion)
const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('.faq-question');
        const wrapper = item.querySelector('.faq-answer');
        const answerPara = item.querySelector('.answer-content p');

        // Asl matnni faqat bir marta saqlab olamiz
        if (answerPara && !item.hasAttribute('data-text')) {
            item.setAttribute('data-text', answerPara.innerText);
        }

        button.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            const originalText = item.getAttribute('data-text');

            // Boshqa barcha ochiqlarni yopish
            faqItems.forEach(el => {
                if (el !== item) {
                    el.classList.remove('active');
                    el.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            if (!isActive) {
                item.classList.add('active');

                // Typewriter effekti
                if (answerPara && !item.hasAttribute('data-typed')) {
                    answerPara.innerText = '';
                    item.setAttribute('data-typed', 'true');

                    let i = 0;
                    function type() {
                        if (i < originalText.length) {
                            answerPara.innerText += originalText.charAt(i);
                            i++;
                            // Matn yozilishi bilan balandlikni moslashtirish
                            wrapper.style.maxHeight = wrapper.scrollHeight + "px";
                            setTimeout(type, 15); // Tezlikni 15ms qildim (yoqimliroq)
                        }
                    }
                    type();
                } else {
                    wrapper.style.maxHeight = wrapper.scrollHeight + "px";
                }
            } else {
                item.classList.remove('active');
                wrapper.style.maxHeight = null;
            }
        });
    });
};

// 3. Progress Bar Logic
const initProgress = () => {
    const percentEl = document.querySelector('.val');
    if (!percentEl) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                let count = 0;
                const target = parseInt(percentEl.getAttribute('data-target')) || 40;
                const timer = setInterval(() => {
                    count++;
                    percentEl.innerText = count;
                    if (count >= target) clearInterval(timer);
                }, 30);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(percentEl);
};

// 4. Contact Form Logic
const handleContactForm = () => {
    const form = document.querySelector('.cyber-form') || document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.cta-btn');
        if (!submitBtn) return;

        const originalContent = submitBtn.innerHTML;

        submitBtn.innerHTML = `<span>Sending...</span> <i class="bi bi-arrow-repeat spin"></i>`;
        submitBtn.classList.add('loading');
        submitBtn.style.pointerEvents = 'none';

        setTimeout(() => {
            submitBtn.innerHTML = `<span>Message Sent!</span> <i class="bi bi-check2-circle"></i>`;
            submitBtn.style.background = '#10b981';
            submitBtn.style.borderColor = '#10b981';
            form.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style = '';
                submitBtn.classList.remove('loading');
                submitBtn.style.pointerEvents = 'all';
            }, 4000);
        }, 2000);
    });
};

// 5. DOM yuklanganda hammasini ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    handleNavbar();
    initFAQ();
    initProgress();
    handleContactForm();

    // Hero qismidagi Typewriter uchun (agar initTypewriter moduli mavjud bo'lsa)
    const twEl = document.getElementById('typewriter');
    if (twEl) {
        // Modul import qilingan bo'lsa, uni chaqiramiz
        try {
            initTypewriter('typewriter', [
                'Creative Developer',
                'CSS Architect',
                'UI/UX Enthusiast',
                'Full-stack Engineer'
            ]);
        } catch (err) {
            console.log("Typewriter moduli yuklanmagan yoki funksiya topilmadi.");
        }
    }
});