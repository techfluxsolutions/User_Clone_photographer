import React from 'react';
import './PersonalizedQuoteSection.css';

const PersonalizedQuoteSection = ({ title, buttonText, onButtonClick }) => {
  return (
    <div className="personalized-quote-section">
      <h2 className="quote-title">{title}</h2>
      <button className="quote-button" onClick={onButtonClick}>{buttonText}</button>
    </div>
  );
};

export default PersonalizedQuoteSection;
