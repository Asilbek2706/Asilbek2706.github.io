export const initTypewriter = (elementId, words) => {
    const el = document.getElementById(elementId);
    if (!el) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        el.textContent = isDeleting
            ? currentWord.substring(0, charIndex - 1)
            : currentWord.substring(0, charIndex + 1);

        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

        let typeSpeed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();
};

// 2. FAQ Logic (Tuzatilgan variant)
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const answerWrapper = item.querySelector('.faq-answer');
        const answerPara = item.querySelector('.answer-content p'); // Aniqroq selector

        // Asl matnni saqlab qo'yish (Yo'qolmasligi uchun)
        if (!item.hasAttribute('data-original-text')) {
            item.setAttribute('data-original-text', answerPara.innerText.trim());
        }
        const fullText = item.getAttribute('data-original-text');

        const isActive = item.classList.contains('active');

        // Boshqalarni yopish
        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isActive) {
            item.classList.add('active');

            // Typewriter effekti
            if (!item.hasAttribute('data-typed')) {
                answerPara.innerText = '';
                let i = 0;

                function typeFAQ() {
                    if (i < fullText.length) {
                        answerPara.innerText += fullText.charAt(i);
                        i++;
                        // MUHIM: Har bir harfda balandlikni yangilash
                        answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";
                        setTimeout(typeFAQ, 15);
                    } else {
                        item.setAttribute('data-typed', 'true');
                    }
                }
                typeFAQ();
            } else {
                // Agar allaqachon yozilgan bo'lsa, shunchaki ochish
                answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";
            }
        }
    });
});