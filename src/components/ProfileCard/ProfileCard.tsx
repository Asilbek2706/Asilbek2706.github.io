import React, { useState } from 'react';
import './ProfileCard.scss';

// Profil uchun interfeys
interface ProfileData {
    full_name: string;
    image: string;
    bio: string;
    email: string;
    telegram: string;
    instagram: string;
    github: string;
    linkedin: string;
}

// App.tsx dan keladigan 'data' propini taniy olish uchun interfeys
interface ProfileCardProps {
    data: ProfileData | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ data }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    // Backend hostini rasmlar uchun aniqlaymiz (agar rasm relative path bo'lsa)
    const API_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://127.0.0.1:8000';

    const getImageUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_BASE_URL}${url}`;
    };

    // Ma'lumot kelguncha Skeleton Screen ko'rsatiladi
    if (!data) {
        return (
            <div className="profile-main skeleton-wrapper p-4 h-100 bento-card">
                <div className="skeleton skeleton-img mb-4" style={{ height: '250px', borderRadius: '16px' }}></div>
                <div className="skeleton skeleton-title mb-2" style={{ height: '30px', width: '70%' }}></div>
                <div className="skeleton skeleton-text mb-4" style={{ height: '60px' }}></div>
                <div className="skeleton skeleton-btn mb-2" style={{ height: '40px' }}></div>
                <div className="skeleton skeleton-btn" style={{ height: '40px' }}></div>
            </div>
        );
    }

    return (
        <div className="bento-card profile-main p-4 text-center text-lg-start h-100" data-aos="fade-up">
            <div className={`img-wrapper mb-4 overflow-hidden rounded-4 shadow-sm ${!imgLoaded ? 'img-skeleton' : ''}`}>
                <img
                    src={getImageUrl(data.image)}
                    alt={data.full_name}
                    className={`img-fluid profile-img ${imgLoaded ? 'loaded' : 'loading'}`}
                    onLoad={() => setImgLoaded(true)}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=Profile'; }}
                />
            </div>

            <div className="profile-info">
                <h2 className="fw-bold h4">{data.full_name}</h2>
                <div
                    className="text-muted small profile-bio"
                    dangerouslySetInnerHTML={{ __html: data.bio }}
                />
            </div>

            <div className="d-grid gap-2 mt-4">
                <a href="/contact" className="btn btn-primary py-2 rounded-3 fw-semibold shadow-blue">
                    Let's Talk
                </a>
                <a href={`mailto:${data.email}`} className="btn btn-outline-dark py-2 rounded-3 fw-semibold">
                    Send Email
                </a>
            </div>

            <div className="social-links d-flex justify-content-between mt-4">
                {data.telegram && (
                    <a href={data.telegram} target="_blank" rel="noreferrer" className="social-icon">
                        <i className="bi bi-send-fill"></i>
                    </a>
                )}
                {data.instagram && (
                    <a href={data.instagram} target="_blank" rel="noreferrer" className="social-icon">
                        <i className="bi bi-instagram"></i>
                    </a>
                )}
                {data.github && (
                    <a href={data.github} target="_blank" rel="noreferrer" className="social-icon">
                        <i className="bi bi-github"></i>
                    </a>
                )}
                {data.linkedin && (
                    <a href={data.linkedin} target="_blank" rel="noreferrer" className="social-icon">
                        <i className="bi bi-linkedin"></i>
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;