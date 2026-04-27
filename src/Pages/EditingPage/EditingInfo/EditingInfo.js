import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EditingInfo.css';

const EditingInfo = () => {
    const navigate = useNavigate();

    return (
        <section className="editing-info-section">
            <div className="editing-toggle-buttons">
                <button
                    className="editing-toggle-btn"
                    onClick={() => navigate("/")}
                >
                    Photography
                </button>
                <button className="editing-toggle-btn active">
                    Editing
                </button>
            </div>

            <div className="editing-info-card">
                <h2 className="editing-info-title">Designed for Creators and Brands</h2>
                <p className="editing-info-subtitle">
                    From raw footage to refined storytelling, we create short-form<br />
                    videos that engage, convert and elevate your presence
                </p>
            </div>
        </section>
    );
};

export default EditingInfo;
