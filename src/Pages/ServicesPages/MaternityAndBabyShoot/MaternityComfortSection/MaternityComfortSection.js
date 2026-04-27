import React from 'react';
import './MaternityComfortSection.css';

const MaternityComfortSection = () => {
    const comfortPoints = [
        { id: 1, text: "Patient and experienced photographers" },
        { id: 2, text: "Flexible schedules around mother & baby comfort" },
        { id: 3, text: "Minimal props, natural expressions" },
        { id: 4, text: "Hygienic, baby-friendly environments" },
        { id: 5, text: "Respect for privacy and personal space" }
    ];

    return (
        <section className="maternity-comfort-section">
            <div className="maternity-comfort-container">
                <div className="maternity-comfort-image-wrapper">
                    <img 
                        src="/asset/ServicePages/Maternity/comfort.png" 
                        alt="Photographer capturing a baby during a maternity shoot"
                        className="maternity-comfort-image"
                    />
                </div>
                <div className="maternity-comfort-content">
                    <h2 className="maternity-comfort-title">Comfort & Safety First</h2>
                    <ul className="maternity-comfort-list">
                        {comfortPoints.map((point) => (
                            <li key={point.id} className="maternity-comfort-item">
                                <div className="comfort-diamond-wrapper">
                                    <span className="comfort-diamond"></span>
                                    <span className="comfort-number">{point.id}</span>
                                </div>
                                <span className="comfort-text">{point.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default MaternityComfortSection;
