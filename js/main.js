import { initTypewriter } from './modules/typewriter.js';

const initProgress = () => {
    const percentEl = document.querySelector('.val');
    if (!percentEl) return;

    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            let count = 0;
            const target = 40;
            const timer = setInterval(() => {
                count++;
                percentEl.innerText = count;
                if (count >= target) clearInterval(timer);
            }, 30);
            observer.disconnect();
        }
    });
    observer.observe(percentEl);
};

const handleNavbar = () => {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.custom-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');

    if (menuToggle && navCollapse) {
        menuToggle.addEventListener('click', () => {
            // Mana shu qator 'X' shaklini boshqaradi
            menuToggle.classList.toggle('active');

            // Bu menyuni ochadi/yopadi
            navCollapse.classList.toggle('show');

            // Orqa fonni qotiradi
            document.body.style.overflow = navCollapse.classList.contains('show') ? 'hidden' : '';
        });

        // Link bosilganda hammasini yopish
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navCollapse.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Boshqa ochilganlarini yopish (optional)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });

            // Tanlanganini ochish/yopish
            item.classList.toggle('active');
        });
    });
});

const handleContactForm = () => {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-primary');
        const originalContent = btn.innerHTML;

        btn.innerHTML = 'Sending... <i class="bi bi-hourglass-split"></i>';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            btn.innerHTML = 'Sent Successfully! <i class="bi bi-check-all"></i>';
            btn.style.background = '#00ff88';
            contactForm.reset();

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                btn.style.pointerEvents = 'all';
            }, 3000);
        }, 1500);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const twEl = document.getElementById('typewriter');
    if (twEl) {
        initTypewriter('typewriter', ['Creative Developer', 'Full-stack Developer', 'UI/UX Designer']);
    }

    initProgress();
    handleNavbar();
    handleContactForm();
});

const contactForm = document.querySelector('.cyber-form');
const submitBtn = document.querySelector('.submit-btn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Tugmani bloklash va loading holatiga o'tkazish
    submitBtn.innerHTML = `<span>Processing...</span> <i class="bi bi-hourglass-split"></i>`;
    submitBtn.style.pointerEvents = 'none';
    submitBtn.style.opacity = '0.7';

    // Sun'iy delay (backend bo'lmagani uchun)
    setTimeout(() => {
        submitBtn.innerHTML = `<span>Success!</span> <i class="bi bi-check-all"></i>`;
        submitBtn.style.background = '#10b981';
        submitBtn.style.boxShadow = '0 0 20px #10b981';

        // Formani tozalash
        contactForm.reset();

        // 3 soniyadan keyin tugmani qaytarish
        setTimeout(() => {
            submitBtn.innerHTML = `<span>Send Message</span> <i class="bi bi-send"></i>`;
            submitBtn.style = '';
        }, 3000);
    }, 2000);
});