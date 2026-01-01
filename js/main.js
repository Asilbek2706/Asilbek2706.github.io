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