const cursor = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX - 10;
    const y = e.clientY - 10;
    
    cursor.style.transform = `translate(${x}px, ${y}px)`;
});

const links = document.querySelectorAll('a, button, .skill-card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(2.5)';
        cursor.style.background = '#ffffff'; 
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
        cursor.style.background = '';
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

import { initTypewriter } from './modules/typewriter.js';

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter('typewriter', ['Creative Developer', 'Full-stack Developer', 'UI/UX Designer']);
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending Pulse... <i class="bi bi-Hourglass-split"></i>';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            btn.innerHTML = 'Sent Successfully! <i class="bi bi-check-all"></i>';
            btn.style.background = '#00ff88'; 
            btn.style.boxShadow = '0 0 20px #00ff88';
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'all';
                btn.style.background = ''; 
                btn.style.boxShadow = '';
            }, 3000);
        }, 2000);
    });
}