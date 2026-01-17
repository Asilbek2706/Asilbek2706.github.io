const ProjectGridManager = {
    init() {
        this.cards = document.querySelectorAll('.project-bento-card');
        this.detailsBoxes = document.querySelectorAll('.p-details-box');

        if (this.cards.length === 0) return;

        this.setupIntersectionObserver();
        this.alignContentHeights();

        window.addEventListener('resize', () => {
            this.debounce(() => this.alignContentHeights(), 150);
        });
    },

    alignContentHeights() {
        this.detailsBoxes.forEach(box => box.style.height = 'auto');

        if (window.innerWidth >= 992) {
            let maxHeight = 0;

            this.detailsBoxes.forEach(box => {
                if (box.offsetHeight > maxHeight) {
                    maxHeight = box.offsetHeight;
                }
            });

            this.detailsBoxes.forEach(box => {
                box.style.height = `${maxHeight}px`;
            });
        }
    },

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const card = entry.target;

                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);

                    observer.unobserve(card);
                }
            });
        }, observerOptions);

        this.cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            observer.observe(card);
        });
    },

    debounce(func, wait) {
        let timeout;
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ProjectGridManager.init();
});