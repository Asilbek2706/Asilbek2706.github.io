import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './MessageCenter.scss';

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    admin_reply: string | null;
    is_answered: boolean;
    likes: number;
    created_at: string;
}

const MessageCenter: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [newInquiry, setNewInquiry] = useState("");
    const [sendLoading, setSendLoading] = useState(false);

    const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
    const userEmail = localStorage.getItem('userEmail');

    // Muvaffaqiyatli amallar uchun Toast
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    const fetchMessages = useCallback(async () => {
        if (!userEmail) {
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`${baseUrl}/contact/`, {
                params: { email: userEmail }
            });
            const sortedData = Array.isArray(response.data)
                ? response.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                : [response.data];
            setMessages(sortedData);
        } catch (err: any) {
            console.error("Xabarlarni yuklashda xatolik:", err.response?.data);
        } finally {
            setLoading(false);
        }
    }, [baseUrl, userEmail]);

    useEffect(() => {
        void fetchMessages();
    }, [fetchMessages]);

    // Xabarni o'chirish
    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "Ishonchingiz komilmi?",
            text: "Ushbu xabarni butunlay o'chirib tashlamoqchimisiz?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6366f1",
            cancelButtonColor: "#f43f5e",
            confirmButtonText: "Ha, o'chirilsin!",
            cancelButtonText: "Bekor qilish",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${baseUrl}/contact/${id}/`);
                setMessages(prev => prev.filter(msg => msg.id !== id));

                void Toast.fire({
                    icon: 'success',
                    title: "Xabar muvaffaqiyatli o'chirildi"
                });
            } catch (err: any) {
                console.error("O'chirish xatosi:", err.response?.data);
                void Swal.fire("Xatolik!", "Xabarni o'chirishda texnik muammo yuz berdi.", "error");
            }
        }
    };

    // Like bosish
    const handleLike = async (id: number) => {
        try {
            await axios.patch(`${baseUrl}/contact/${id}/like/`);
            setMessages(prev => prev.map(msg =>
                msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
            ));
        } catch (err: any) {
            console.error("Like xatosi:", err.response?.data);
        }
    };

    // Yangi murojaat yuborish
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newInquiry.trim() || !userEmail) return;

        setSendLoading(true);
        try {
            const payload = {
                name: messages[0]?.name || "Foydalanuvchi",
                email: userEmail,
                message: newInquiry,
                subject: "Yangi murojaat"
            };

            await axios.post(`${baseUrl}/contact/`, payload);
            setNewInquiry("");

            void Toast.fire({
                icon: 'success',
                title: 'Xabaringiz yuborildi'
            });

            void fetchMessages();
        } catch (err: any) {
            console.error("Yuborish xatosi:", err.response?.data);
            void Swal.fire("Xatolik", "Xabar yuborishda muammo yuz berdi.", "error");
        } finally {
            setSendLoading(false);
        }
    };

    if (loading) return (
        <div className="hub-loader">
            <div className="spinner"></div>
            <p>Xabarlar yuklanmoqda...</p>
        </div>
    );

    return (
        <div className="hub-wrapper">
            <div className="hub-container">
                <aside className="hub-sidebar">
                    <div className="user-profile-card">
                        <div className="user-avatar">{userEmail?.charAt(0).toUpperCase()}</div>
                        <h3>Muloqotlar Markazi</h3>
                        <p className="email-text">{userEmail}</p>
                        <div className="hub-stats">
                            <div className="stat">
                                <span>{messages.length}</span>
                                <label>Savollar</label>
                            </div>
                            <div className="stat">
                                <span>{messages.filter(m => m.admin_reply).length}</span>
                                <label>Javoblar</label>
                            </div>
                        </div>
                    </div>
                    <Link to="/contact" className="back-btn">
                        <i className="bi bi-arrow-left"></i> Orqaga qaytish
                    </Link>
                </aside>

                <main className="hub-feed">
                    <header className="hub-header">
                        <h2>Muloqotlar Tarixi</h2>
                        <span className="status-badge">Markaz Online</span>
                    </header>

                    <div className="conversations-list">
                        {messages.length > 0 ? (
                            messages.map((msg) => (
                                <div className="conversation-thread" key={msg.id}>
                                    <div className="message-bubble user">
                                        <div className="bubble-content">
                                            <p>{msg.message}</p>
                                            <div className="bubble-footer-user">
                                                <span className="time">
                                                    {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                                <button
                                                    className="delete-btn"
                                                    title="Xabarni o'chirish"
                                                    onClick={() => handleDelete(msg.id)}
                                                >
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {msg.admin_reply && (
                                        <div className="message-bubble admin">
                                            <div className="bubble-content">
                                                <p>{msg.admin_reply}</p>
                                                <div className="bubble-footer">
                                                    <button className="like-btn" onClick={() => handleLike(msg.id)}>
                                                        <i className="bi bi-heart-fill"></i> {msg.likes}
                                                    </button>
                                                    <span className="author">Support Admin</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {!msg.admin_reply && (
                                        <div className="pending-status">
                                            <i className="bi bi-clock-history"></i> Javob ko'rib chiqilmoqda...
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>Hozircha murojaatlar yo'q.</p>
                            </div>
                        )}
                    </div>

                    {userEmail && (
                        <div className="hub-composer">
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    placeholder="Xabaringizni yozing..."
                                    value={newInquiry}
                                    onChange={(e) => setNewInquiry(e.target.value)}
                                    required
                                />
                                <button type="submit" disabled={sendLoading || !newInquiry.trim()}>
                                    {sendLoading ? <div className="mini-spinner"></div> : <i className="bi bi-send-fill"></i>}
                                </button>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MessageCenter;