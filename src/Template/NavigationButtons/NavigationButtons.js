import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import './NavigationButtons.css';

const NavigationButtons = ({ onBack }) => {
    const navigate = useNavigate();

    return (
        <div className="navigation-buttons-wrapper">
            <button 
                className="nav-btn back-btn" 
                onClick={onBack || (() => navigate(-1))}
                aria-label="Go Back"
            >
                <FaArrowLeft size={16} />
            </button>
            <button 
                className="nav-btn cross-btn" 
                onClick={() => navigate('/')}
                aria-label="Go to Home"
            >
                <FaTimes size={16} />
            </button>
        </div>
    );
};

export default NavigationButtons;
