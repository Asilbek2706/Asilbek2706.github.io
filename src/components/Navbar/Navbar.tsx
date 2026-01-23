import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`navbar-custom ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="nav-logo" onClick={() => setIsMenuOpen(false)}>
                    Asilbek<span>.dev</span>
                </Link>

                {/* Overlay har doim DOMda bo'lishi animatsiya uchun muhim */}
                <div
                    className={`nav-overlay ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                ></div>

                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        >
                            <i className="bi bi-house-door"></i> Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/about"
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        >
                            <i className="bi bi-person"></i> About
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/portfolio"
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        >
                            <i className="bi bi-grid"></i> Portfolio
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                        >
                            <i className="bi bi-envelope"></i> Contact
                        </NavLink>
                    </li>
                </ul>

                <div className="nav-actions">
                    <Link to="/contact" className="btn-talk d-desktop-only">Let's talk</Link>

                    <button
                        className={`mobile-toggle ${isMenuOpen ? 'is-active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        type="button"
                    >
                        {/* Ikonka almashishi uchun */}
                        <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;