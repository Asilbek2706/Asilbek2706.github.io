import CONFIG from './config.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");

    if (!form) return; // Form topilmasa kod to'xtaydi

    const btn = form.querySelector(".bento-submit");
    const btnText = btn.querySelector("span");
    const btnIcon = btn.querySelector("i");

    const originalText = btnText.innerText;
    const originalIconClass = btnIcon.className;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // 1. Loading holati (Tugmani bloklash)
        btn.disabled = true;
        btn.style.pointerEvents = "none";
        btnText.innerText = "SENDING...";
        btnIcon.className = "bi bi-arrow-repeat spin";

        const data = {
            name: document.getElementById("fullname").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim(),
        };

        const text = `🚀 *New Message From Portfolio*\n\n👤 *Name:* ${data.name}\n📧 *Email:* ${data.email}\n📌 *Subject:* ${data.subject}\n💬 *Message:* ${data.message}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: CONFIG.CHAT_ID,
                    text: text,
                    parse_mode: "Markdown",
                }),
            });

            const result = await response.json();

            if (response.ok && result.ok) {
                // 2. SUCCESS "SENT" holati
                btn.classList.add("success-state");
                btn.style.background = "#22c55e"; // Yashil rang
                btnText.innerText = "SENT!";
                btnIcon.className = "bi bi-check2-circle";

                form.reset();

                // 3. 3 soniyadan keyin asl holatga qaytish
                setTimeout(() => {
                    btn.classList.remove("success-state");
                    btn.style.background = "";
                    btn.style.pointerEvents = "auto";
                    btnText.innerText = originalText;
                    btnIcon.className = originalIconClass;
                    btn.disabled = false;
                }, 3000);

            } else {
                // Telegramdan xato kelsa (masalan Chat ID noto'g'ri)
                console.error("Telegram API Error:", result);
                throw new Error("Telegram error");
            }

        } catch (err) {
            // Xatolik holati (Qizil rang)
            console.error("Submission Error:", err);
            btn.style.background = "#ef4444";
            btnText.innerText = "FAILED";
            btnIcon.className = "bi bi-exclamation-triangle";

            setTimeout(() => {
                btn.style.background = "";
                btn.style.pointerEvents = "auto";
                btnText.innerText = originalText;
                btnIcon.className = originalIconClass;
                btn.disabled = false;
            }, 3000);
        }
    });
});