export const initProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = targetWidth; 
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
};

// Toggler bosilganda body'ni qulflash
document.querySelector('.custom-toggler').addEventListener('click', function() {
    document.body.classList.toggle('no-scroll');
});

// Menyu ichidagi link bosilganda body scrollni qaytarish
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('no-scroll');
    });
});