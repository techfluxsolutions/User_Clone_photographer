import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    { number: 1, text: 'Share Details' },
    { number: 2, text: 'Connect with us' },
    { number: 3, text: 'Shoot Day' },
    { number: 4, text: 'Preview' },
    { number: 5, text: 'Timely Delivery' }
  ];

  return (
    <section className="how-it-works-section">
      <h2 className="how-it-works-title">How it Works ?</h2>
      
      <div className="steps-container">
        {/* Top row - 3 steps */}
        <div className="steps-row">
          {steps.slice(0, 3).map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="step-item">
                <div className="step-number">{step.number}</div>
                <p className="step-text">{step.text}</p>
              </div>
              {index < 2 && <div className="step-connector"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom row - 2 steps */}
        <div className="steps-row bottom-row">
          {steps.slice(3, 5).map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="step-item">
                <div className="step-number">{step.number}</div>
                <p className="step-text">{step.text}</p>
              </div>
              {index < 1 && <div className="step-connector"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
