const BentoSystem = {
    init() {
        this.cards = document.querySelectorAll('.bento-card');
        this.skills = document.querySelectorAll('.skill-item');

        this.cards.forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(50px)";
            card.style.transition = "opacity 1.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)";
        });

        this.setupEntrance();
        this.setupSpotlight();
        this.setupMagneticSkills();
    },

    // 2. Tartib bilan sekin chiqarish
    setupEntrance() {
        window.addEventListener('load', () => {
            this.cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, index * 250); // Kechikishni 250ms ga oshirdik (yanada sekinroq tartib)
            });
        });
    },

    // 3. Spotlight effekti
    setupSpotlight() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        });
    },

    setupMagneticSkills() {
        this.skills.forEach(skill => {
            skill.addEventListener('mousemove', (e) => {
                const rect = skill.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
            });

            skill.addEventListener('mouseleave', () => {
                skill.style.transform = `translate(0, 0) translateY(0)`;
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    BentoSystem.init();
});