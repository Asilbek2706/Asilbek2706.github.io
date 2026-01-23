import React, { useState } from 'react';
import './Contact.scss';

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const Contact: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!BOT_TOKEN || !CHAT_ID) {
            console.error("Environment variables VITE_TELEGRAM_BOT_TOKEN or VITE_TELEGRAM_CHAT_ID are missing!");
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        setStatus('sending');

        const telegramMessage = `
            <b>🚀 Yangi Xabar (Portfolio)</b>\n
            <b>👤 Ism:</b> ${formData.fullname}
            <b>📧 Email:</b> ${formData.email}
            <b>📌 Mavzu:</b> ${formData.subject}\n
            <b>💬 Xabar:</b>
            <i>${formData.message}</i>
        `;

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: telegramMessage,
                    parse_mode: 'HTML'
                })
            });

            const result = await response.json();

            if (response.ok && result.ok) {
                setStatus('success');
                setFormData({ fullname: '', email: '', subject: '', message: '' });
            } else {
                console.error("Telegram API Error:", result);
                setStatus('error');
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            setStatus('error');
        } finally {
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <section className="py-5">
            <div className="container">
                <div className="contact-container" data-aos="fade-up">
                    <div className="contact-bg-glow"></div>

                    <header className="section-header">
                        <span className="cyber-badge">
                            <i className="bi bi-envelope-at"></i> Connectivity
                        </span>
                        <h1 className="title">
                            Get in <span className="highlight">Touch</span>
                        </h1>
                        <p className="header-intro">
                            Have a project inquiry? Let's engineer something exceptional together.
                        </p>
                    </header>

                    <div className="bento-contact-grid">
                        <div className="bento-info-stack">
                            <div className="bento-card-mini">
                                <i className="bi bi-geo-alt"></i>
                                <div className="ms-3">
                                    <span>Location</span>
                                    <p>Bukhara, UZ</p>
                                </div>
                            </div>

                            <a href="mailto:asiloke797@gmail.com" className="bento-card-mini clickable">
                                <i className="bi bi-mailbox"></i>
                                <div className="ms-3">
                                    <span>Email</span>
                                    <p>asiloke797@gmail.com</p>
                                </div>
                            </a>

                            <a href="https://t.me/as1lbek_2706" target="_blank" rel="noreferrer" className="bento-card-mini clickable">
                                <i className="bi bi-telegram"></i>
                                <div className="ms-3">
                                    <span>Telegram</span>
                                    <p>@as1lbek_2706</p>
                                </div>
                            </a>

                            <div className="bento-card-mini status">
                                <span className="status-dot"></span>
                                <p>Available for work</p>
                            </div>
                        </div>

                        <form className="bento-form" onSubmit={handleSubmit}>
                            <div className="bento-input-grid">
                                <div className="input-bento-cell name">
                                    <label><i className="bi bi-person"></i> Name</label>
                                    <input
                                        type="text" id="fullname" placeholder="Enter your name"
                                        value={formData.fullname} onChange={handleChange} required
                                    />
                                </div>

                                <div className="input-bento-cell email">
                                    <label><i className="bi bi-envelope"></i> Email</label>
                                    <input
                                        type="email" id="email" placeholder="example@mail.com"
                                        value={formData.email} onChange={handleChange} required
                                    />
                                </div>

                                <div className="input-bento-cell subject">
                                    <label><i className="bi bi-bookmark"></i> Subject</label>
                                    <input
                                        type="text" id="subject" placeholder="Project Idea"
                                        value={formData.subject} onChange={handleChange} required
                                    />
                                </div>

                                <div className="input-bento-cell message">
                                    <label><i className="bi bi-chat-left-dots"></i> Message</label>
                                    <textarea
                                        id="message" placeholder="Tell me more..."
                                        value={formData.message} onChange={handleChange} required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className={`bento-submit ${status === 'success' ? 'success-state' : ''} ${status === 'error' ? 'error-state' : ''}`}
                                    disabled={status === 'sending' || status === 'success'}
                                    style={status === 'error' ? { backgroundColor: '#ef4444' } : {}}
                                >
                                    {status === 'idle' && (
                                        <><span>Send Message</span> <i className="bi bi-send-fill"></i></>
                                    )}
                                    {status === 'sending' && (
                                        <><span>Sending...</span> <i className="bi bi-arrow-repeat spin"></i></>
                                    )}
                                    {status === 'success' && (
                                        <><span>Sent Successfully!</span> <i className="bi bi-check2-circle"></i></>
                                    )}
                                    {status === 'error' && (
                                        <><span>Error! Check Console</span> <i className="bi bi-exclamation-octagon"></i></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;