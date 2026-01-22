import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'; // Shuni qo'shing
import AOS from 'aos';
import 'aos/dist/aos.css';

// Komponentlar (O'zingizniki)
import Navbar from './components/Navbar/Navbar';
import ProfileCard from './components/ProfileCard/ProfileCard';
import Education from './components/Education/Education';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';

import './App.scss';

const App: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
        });
    }, []);

    return (
        <BrowserRouter> {/* Linklar ishlashi uchun shart */}
            <div className="app-wrapper">
                <div className="background-decor" aria-hidden="true">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="glass-overlay"></div>
                </div>

                <Navbar />

                <main className="container mt-5 pt-5 pb-5">
                    <div className="row g-4 align-items-start">
                        <aside className="col-lg-4">
                            <ProfileCard />
                        </aside>

                        <section className="col-lg-8">
                            <div className="row g-4">
                                <div className="col-md-7">
                                    <Education />
                                </div>
                                <div className="col-md-5">
                                    <Skills />
                                </div>
                                <div className="col-12">
                                    <Projects />
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;