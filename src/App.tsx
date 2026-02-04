import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

// Komponentlar
import Preloader from "./components/Preloader/Preloader";
import Navbar from './components/Navbar/Navbar';
import ProfileCard from './components/ProfileCard/ProfileCard';
import Education from './components/Education/Education';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Portfolio from "./components/Portfolio/Portfolio";
import Contact from './components/Contact/Contact';
import MessageCenter from './components/MessageCenter/MessageCenter';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import './App.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState<any>(null);

    const fetchProfile = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/`);
            if (response.data) {
                const data = Array.isArray(response.data) ? response.data[0] : response.data;
                setProfileData(data);
                return data;
            }
        } catch (error: any) {
            console.error("Profil yuklashda xato:", error.message);
        }
        return null;
    }, []);

    useEffect(() => {
        // AOS animatsiyalarini ishga tushirish
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
        });

        const initializeApp = async () => {
            await fetchProfile();
            // Ma'lumotlar yuklangach loader'ni to'xtatish
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        };

        initializeApp();
    }, [fetchProfile]);

    return (
        <BrowserRouter>
            {isLoading ? (
                <Preloader />
            ) : (
                <div className="app-wrapper visible">
                    <div className="background-decor" aria-hidden="true">
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                        <div className="glass-overlay"></div>
                    </div>

                    <Navbar />

                    <main className="container mt-5 pt-5 pb-5">
                        <div className="row g-4 align-items-start">

                            {/* Sidebar: Profil kartasi har doim ko'rinib turadi */}
                            <aside className="col-lg-4 sticky-lg-top" style={{ top: '100px', zIndex: 10 }}>
                                <ErrorBoundary>
                                    <ProfileCard data={profileData} />
                                </ErrorBoundary>
                            </aside>

                            {/* Dinamik Kontent qismi */}
                            <section className="col-lg-8">
                                <Routes>
                                    {/* Bosh sahifa */}
                                    <Route path="/" element={
                                        <div className="d-flex flex-column gap-4">
                                            <div className="row g-4">
                                                <div className="col-md-7">
                                                    <ErrorBoundary><Education /></ErrorBoundary>
                                                </div>
                                                <div className="col-md-5">
                                                    <ErrorBoundary><Skills /></ErrorBoundary>
                                                </div>
                                            </div>
                                            <div className="w-100">
                                                <ErrorBoundary>
                                                    <Projects limit={2} />
                                                </ErrorBoundary>
                                            </div>
                                        </div>
                                    } />

                                    <Route path="/about" element={
                                        <ErrorBoundary><About data={profileData} /></ErrorBoundary>
                                    } />
                                    <Route path="/portfolio" element={<ErrorBoundary><Portfolio /></ErrorBoundary>} />
                                    <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />

                                    {/* Message Center yo'lagi */}
                                    <Route path="/message-center" element={
                                        <ErrorBoundary>
                                            <MessageCenter />
                                        </ErrorBoundary>
                                    } />

                                    {/* Noto'g'ri URL kiritilganda bosh sahifaga qaytarish */}
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                            </section>
                        </div>
                    </main>

                    <ErrorBoundary>
                        <Footer profile={profileData} />
                    </ErrorBoundary>
                </div>
            )}
        </BrowserRouter>
    );
};

export default App;