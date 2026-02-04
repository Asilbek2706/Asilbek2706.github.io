import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.scss";

// Profil ma'lumotlari uchun interfeys
interface ProfileData {
    full_name: string;
    telegram?: string;
    github?: string;
    // Boshqa kerakli maydonlar
}

// App.tsx dan keladigan props uchun interfeys (Xatolarni yo'qotadi)
interface FooterProps {
    profile: ProfileData | null;
}

const Footer: React.FC<FooterProps> = ({ profile }) => {
    // Ismdan faqat birinchisini olish (Asilbek.dev ko'rinishi uchun)
    const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Asilbek';

    return (
        <footer className="footer-custom mt-5 mb-4">
            <div className="footer-container">
                <div className="footer-section">
                    <Link to="/" className="nav-logo">
                        {firstName}<span>.dev</span>
                    </Link>
                    <div className="status-pill ms-lg-3">
                        <span className="pulse-dot"></span>
                        <span className="small fw-semibold">2026 • Available</span>
                    </div>
                </div>

                <ul className="footer-menu d-none d-lg-flex">
                    <li>
                        <Link to="/" className="footer-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="footer-link">About</Link>
                    </li>
                    <li>
                        <Link to="/portfolio" className="footer-link">Portfolio</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="footer-link">Contact</Link>
                    </li>
                </ul>

                <div className="footer-actions">
                    <div className="social-group">
                        <a
                            href={profile?.telegram || "https://t.me/as1lbek_2706"}
                            className="social-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-send"></i>
                        </a>
                        <a
                            href={profile?.github || "https://github.com/Asilbek2706"}
                            className="social-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-github"></i>
                        </a>
                    </div>
                    <p className="copyright mb-0 d-none d-sm-block">© 2026</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;