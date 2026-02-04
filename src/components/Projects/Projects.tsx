import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
    id: number;
    title: string;
    image: string;
    objective: string;
    year: string;
    github_link: string;
    demo_link: string;
    tech_stack: string;
}

interface ProjectsProps {
    limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ limit }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://127.0.0.1:8000';

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
                const response = await axios.get(`${baseUrl}/projects/`);

                // Ma'lumotlarni massiv ko'rinishida olish
                const data = response.data.results || response.data;

                if (Array.isArray(data)) {
                    setProjects(limit ? data.slice(0, limit) : data);
                }
            } catch (error) {
                console.error("Loyiha yuklashda xato:", error);
            } finally {
                // Ma'lumot kelsa ham, xato bo'lsa ham loadingni to'xtatamiz
                setLoading(false);
            }
        };

        fetchProjects();
    }, [limit]);

    // Agar loading bo'lsa, oddiyroq spinner ko'rsatamiz
    if (loading) {
        return <div className="p-5 text-center w-100">Loyihalar yuklanmoqda...</div>;
    }

    return (
        <div className="bento-card p-4"> {/* AOS animatsiyasini tekshirish uchun vaqtincha olib tashladik */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold m-0">Selected Works</h5>
                <a href="/portfolio" className="text-primary text-decoration-none small fw-bold">
                    View All <i className="bi bi-arrow-right"></i>
                </a>
            </div>

            <div className="row g-4">
                {projects.length === 0 ? (
                    <div className="col-12 text-center py-4">
                        <p className="text-muted">Loyiha topilmadi.</p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div className="col-md-6" key={project.id}>
                            <div className="project-wrapper p-3 border rounded-4 h-100 d-flex flex-column shadow-sm bg-white">
                                <div className="project-img-container mb-3 overflow-hidden rounded-3 border">
                                    <img
                                        src={project.image?.startsWith('http') ? project.image : `${API_BASE_URL}${project.image}`}
                                        alt={project.title}
                                        className="img-fluid w-100 object-fit-cover"
                                        style={{ height: '160px' }}
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x250?text=Rasm+Topilmadi'; }}
                                    />
                                </div>
                                <h6 className="fw-bold mb-1">{project.title}</h6>
                                <p className="text-muted small mb-3" style={{ fontSize: '0.75rem' }}>
                                    {project.objective?.substring(0, 70)}...
                                </p>
                                <div className="project-actions mt-auto d-flex gap-2">
                                    <a href={project.demo_link} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary rounded-3 flex-grow-1">Live Demo</a>
                                    <a href={project.github_link} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-dark rounded-3 px-3">
                                        <i className="bi bi-github"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Projects;