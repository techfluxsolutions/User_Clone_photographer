import React from 'react';
import './CostInfluencingSection.css';

const CostInfluencingSection = ({ title, factors, features }) => {
  return (
    <div className="pricing-factors-section">
      <div className="pricing-factors-card">
        <h2 className="pricing-factors-title">{title}</h2>

        <div className="pricing-factors-list">
          {factors && factors.map((factor, index) => (
            <div key={index} className="pricing-factor-item">
              <div className="factor-number">{index + 1}</div>
              <p className="factor-text">{factor}</p>
            </div>
          ))}
        </div>

        <div className="pricing-features-grid">
          {features && features.map((feature, index) => (
            <div key={index} className="pricing-feature-box">
              <img src={feature.icon} alt="" className="cost-feature-icon" />
              <span className="cost-feature-text">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostInfluencingSection;
