import React from 'react';
import './CTASection.css';
import { useNavigate } from 'react-router-dom';

const CTASection = ({ title, buttonText, linkText, onButtonClick }) => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate('/contact-us');
  };

  return (
    <div className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">{title}</h2>
        <div className="cta-actions">
          <button className="cta-button" onClick={onButtonClick}>
            {buttonText}
          </button>
          <p className="cta-link" onClick={handleLinkClick}>
            <img src="/asset/ServicePages/Shared/tele-icon.png" alt="Phone" className="phone-icon" />
            {linkText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
