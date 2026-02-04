import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Portfolio.scss';

interface Project {
    id: number;
    title: string;
    category: string;
    year: string;
    objective: string;
    solution: string;
    tech_stack: string;
    image: string;
    github_link: string;
    demo_link: string;
    created_at: string;
}

const Portfolio: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${baseUrl}/projects/`);
                const data = response.data.results || response.data;
                setProjects(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Ma'lumot olishda xato:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) return (
        <div className="portfolio-wrapper">
            <div className="portfolio-loader">
                <div className="spinner"></div>
                <p>Engineering Archive Loading...</p>
            </div>
        </div>
    );

    return (
        <div className="portfolio-wrapper">
            <header className="projects-header" data-aos="fade-up">
                <div className="badge-container">
                    <span className="cyber-badge">
                        <i className="bi bi-shield-lock"></i> Engineering Archive
                    </span>
                </div>
                <h1 className="title">
                    Technical <span className="highlight">Case Studies</span>
                </h1>
                <p className="header-intro">
                    Tizim arxitekturasi va unumdorligiga qaratilgan loyihalar tahlili va muhandislik yechimlari.
                </p>
            </header>

            {projects.length === 0 ? (
                <div className="empty-state">
                    <p>Hozircha loyihalar mavjud emas.</p>
                </div>
            ) : (
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <article
                            className="project-bento-card"
                            key={project.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="project-img-wrapper">
                                <img src={project.image} alt={project.title} className="project-img" />
                                <div className="project-overlay">
                                    <div className="overlay-links">
                                        {project.github_link && (
                                            <a href={project.github_link} target="_blank" rel="noreferrer">
                                                <i className="bi bi-github"></i>
                                            </a>
                                        )}
                                        {project.demo_link && (
                                            <a href={project.demo_link} target="_blank" rel="noreferrer">
                                                <i className="bi bi-eye"></i>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="project-info">
                                <div className="info-top">
                                    <span className="p-cat">{project.category}</span>
                                    <span className="p-year">{project.year}</span>
                                </div>
                                <h3>{project.title}</h3>

                                <div className="p-details-box">
                                    <p><strong>Objective:</strong> {project.objective}</p>
                                    <p><strong>Solution:</strong> {project.solution}</p>
                                </div>

                                <div className="p-stack">
                                    {project.tech_stack.split(',').map((tech, i) => (
                                        <span key={i}>{tech.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Portfolio;