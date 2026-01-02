export const initTypewriter = (elementId, words) => {
    const el = document.getElementById(elementId);
    if (!el) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            el.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

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

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const answer = item.querySelector('.answer-content');
        const text = answer.innerText;

        // Agar allaqachon ochiq bo'lsa, yopamiz
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
            return;
        }

        // Boshqa barcha ochiqlarni yopish
        document.querySelectorAll('.faq-item').forEach(el => {
            el.classList.remove('active');
            el.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Hozirgisini ochish
        item.classList.add('active');
        const answerWrapper = item.querySelector('.faq-answer');
        answerWrapper.style.maxHeight = answerWrapper.scrollHeight + "px";

        // Typewriter effekti
        if (!answer.getAttribute('data-typed')) {
            answer.innerText = '';
            answer.classList.add('typing');
            let i = 0;
            function type() {
                if (i < text.length) {
                    answer.innerText += text.charAt(i);
                    i++;
                    setTimeout(type, 15); // Tezlik (ms)
                } else {
                    answer.classList.remove('typing');
                    answer.setAttribute('data-typed', 'true');
                }
            }
            type();
        }
    });
});