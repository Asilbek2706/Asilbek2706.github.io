import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Contact.scss';

const Contact: React.FC = () => {
    const navigate = useNavigate();
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
        setStatus('sending');

        const payload = {
            name: formData.fullname,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
        };

        try {
            const baseUrl = import.meta.env.VITE_API_URL;
            const finalUrl = baseUrl.endsWith('/') ? `${baseUrl}contact/` : `${baseUrl}/contact/`;

            const response = await axios.post(finalUrl, payload);

            if (response.status === 201 || response.status === 200) {
                localStorage.setItem('userEmail', formData.email);

                setStatus('success');
                setFormData({ fullname: '', email: '', subject: '', message: '' });

                // Foydalanuvchi tajribasi uchun 2 soniyadan so'ng yo'naltiramiz
                setTimeout(() => {
                    navigate('/message-center');
                }, 2000);
            }
        } catch (error: any) {
            console.error("Xabar yuborishda xatolik:", error.response?.data || error.message);
            setStatus('error');
        } finally {
            // Agarda xato bo'lsa, formani qayta ochish uchun statusni tiklaymiz
            setTimeout(() => {
                if (status !== 'success') setStatus('idle');
            }, 4000);
        }
    };

    return (
        <section className="contact-section py-5">
            <div className="container">
                <div className="contact-container" data-aos="fade-up">
                    <div className="contact-bg-glow"></div>

                    <header className="section-header">
                        <span className="cyber-badge">
                            <i className="bi bi-envelope-at"></i> Connectivity
                        </span>
                        <h1 className="title">Get in <span className="highlight">Touch</span></h1>
                        <p className="header-intro">Engineered solutions for your next big project.</p>
                    </header>

                    <div className="bento-contact-grid">
                        <div className="bento-info-stack">
                            {/* Ma'lumot kartalari */}
                            <div className="bento-card-mini">
                                <i className="bi bi-geo-alt"></i>
                                <div className="ms-3"><span>Location</span><p>Bukhara, UZ</p></div>
                            </div>

                            <a href="mailto:asiloke797@gmail.com" className="bento-card-mini clickable">
                                <i className="bi bi-mailbox"></i>
                                <div className="ms-3"><span>Email</span><p>asiloke797@gmail.com</p></div>
                            </a>

                            <a href="https://t.me/as1lbek_2706" target="_blank" rel="noreferrer" className="bento-card-mini clickable">
                                <i className="bi bi-telegram"></i>
                                <div className="ms-3"><span>Telegram</span><p>@as1lbek_2706</p></div>
                            </a>

                            {/* Message Center-ga o'tish kartasi */}
                            <Link to="/message-center" className="bento-card-mini hub-trigger clickable">
                                <div className="icon-box">
                                    <i className="bi bi-chat-square-heart"></i>
                                    <span className="status-dot"></span>
                                </div>
                                <div className="ms-3">
                                    <span>Message Center</span>
                                    <p>Check my replies & History</p>
                                </div>
                                <i className="bi bi-arrow-right-short ms-auto fs-4 arrow-icon"></i>
                            </Link>
                        </div>

                        {/* Asosiy Forma */}
                        <form className="bento-form" onSubmit={handleSubmit}>
                            <div className="bento-input-grid">
                                <div className="input-bento-cell name">
                                    <label><i className="bi bi-person"></i> Name</label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        placeholder="Enter your name"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-bento-cell email">
                                    <label><i className="bi bi-envelope"></i> Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="example@mail.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-bento-cell subject">
                                    <label><i className="bi bi-bookmark"></i> Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        placeholder="Project Idea"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-bento-cell message">
                                    <label><i className="bi bi-chat-left-dots"></i> Message</label>
                                    <textarea
                                        id="message"
                                        placeholder="Tell me more..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="submit-area">
                                    <button
                                        type="submit"
                                        className={`bento-submit ${status}`}
                                        disabled={status === 'sending' || status === 'success'}
                                    >
                                        {status === 'idle' && <><span>Send Message</span> <i className="bi bi-send-fill"></i></>}
                                        {status === 'sending' && <><span>Sending...</span> <i className="bi bi-arrow-repeat spin"></i></>}
                                        {status === 'success' && <><span>Sent!</span> <i className="bi bi-check2-circle"></i></>}
                                        {status === 'error' && <><span>Error!</span> <i className="bi bi-exclamation-octagon"></i></>}
                                    </button>

                                    {status === 'success' && (
                                        <p className="success-hint">
                                            Javobni <Link to="/message-center">Message Center</Link>dan ko'rishingiz mumkin.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;