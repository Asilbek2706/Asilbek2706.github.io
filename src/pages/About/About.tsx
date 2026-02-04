import React from 'react';
import './About.scss';

// Profil ma'lumotlari uchun interfeys
interface ProfileData {
    full_name: string;
    bio: string;
    short_bio?: string;
    // Boshqa kerakli maydonlarni shu yerga qo'shishingiz mumkin
}

// App.tsx dan keladigan props uchun interfeys
interface AboutProps {
    data: ProfileData | null;
}

const About: React.FC<AboutProps> = ({ data }) => {
    // Ma'lumot yuklanayotgan bo'lsa skeleton yoki bo'sh joy qaytaramiz
    if (!data) {
        return <div className="p-5 text-center">Ma'lumot yuklanmoqda...</div>;
    }

    // Ismni qismlarga ajratamiz (Highlight qilish uchun)
    const nameParts = data.full_name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    return (
        <div className="home-main-wrapper p-0 m-0">
            <div className="about-bento-grid w-100">

                {/* Asosiy Bio Card */}
                <div className="bento-card bio-card" data-aos="fade-right">
                    <div className="card-glow"></div>
                    <div className="badge-modern">
                        <div className="dot-pulse"></div>
                        <span>2024 — 2028 Academic Odyssey</span>
                    </div>
                    <h2 className="about-title">
                        {firstName} <span className="highlight">{lastName}</span>
                    </h2>
                    <p className="bio-lead">{data.short_bio || "Frontend Architect & UI/UX Visionary"}</p>
                    <div className="bio-story">
                        <div
                            className="profile-bio-text"
                            dangerouslySetInnerHTML={{ __html: data.bio }}
                        />
                    </div>
                </div>

                {/* Ma'lumot mini cardlari */}
                <div className="bento-row">
                    <div className="bento-card info-mini" data-aos="fade-up">
                        <div className="icon-box">
                            <i className="bi bi-mortarboard-fill"></i>
                        </div>
                        <div className="info-text">
                            <h4>Computer Science</h4>
                            <p>Acharya University · Class of 2028</p>
                        </div>
                    </div>

                    <div className="bento-card info-mini goal-card" data-aos="fade-up" data-aos-delay="100">
                        <div className="icon-box">
                            <i className="bi bi-cpu-fill"></i>
                        </div>
                        <div className="info-text">
                            <h4>Core Focus</h4>
                            <p>Scalable Systems & Performance Optimization</p>
                        </div>
                    </div>
                </div>

                {/* Texnologiyalar arsenali */}
                <div className="bento-card arsenal-card" data-aos="fade-up">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3>The Stack</h3>
                        <span className="status-learning">
                            <div className="dot-pulse"></div>
                            Currently Mastering React
                        </span>
                    </div>

                    <div className="stack-grid">
                        <div className="skill-item">
                            <i className="bi bi-palette-fill text-danger"></i>
                            <div className="skill-info">
                                <span>SASS/SCSS</span>
                                <small>Expert</small>
                            </div>
                        </div>

                        <div className="skill-item">
                            <i className="bi bi-browser-chrome text-info"></i>
                            <div className="skill-info">
                                <span>React JS</span>
                                <small>Learning</small>
                            </div>
                        </div>

                        <div className="skill-item">
                            <i className="bi bi-lightning-charge-fill text-warning"></i>
                            <div className="skill-info">
                                <span>JavaScript ES6+</span>
                                <small>Intermediate</small>
                            </div>
                        </div>

                        <div className="skill-item">
                            <i className="bi bi-code-slash text-primary"></i>
                            <div className="skill-info">
                                <span>Clean HTML/CSS</span>
                                <small>Professional</small>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;