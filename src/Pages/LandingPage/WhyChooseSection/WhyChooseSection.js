import React from 'react';
import './WhyChooseSection.css';

const WhyChooseSection = () => {
  const features = [
    {
      icon: `${process.env.PUBLIC_URL}/asset/landing-page/cam.png`,
      title: 'Verified Professionals',
      subtitle: 'Only vetted photographers onboard'
    },
    {
      icon: `${process.env.PUBLIC_URL}/asset/landing-page/payment.png`,
      title: 'Escrow-Secured Payments',
      subtitle: 'Payments are released only after approval'
    },
    {
      icon: `${process.env.PUBLIC_URL}/asset/landing-page/cloud.png`,
      title: 'Private Cloud Storage',
      subtitle: 'High resolution pictures stored securely'
    },
    {
      icon: `${process.env.PUBLIC_URL}/asset/landing-page/cloud2.png`,
      title: 'In-Time Delivery',
      subtitle: 'Early preview with timely final delivery'
    }
  ];

  return (
    <section className="why-choose-section">
      <h2 className="why-choose-heading">Why Choose Veroa?</h2>

      <div className="why-choose-content">
        <div className="why-choose-grid-container">
          {/* Separators */}
          <img src={`${process.env.PUBLIC_URL}/asset/landing-page/why-vertical.png`} className="separator-vertical-top" alt="" />
          <img src={`${process.env.PUBLIC_URL}/asset/landing-page/why-vertical.png`} className="separator-vertical-bottom" alt="" />

          <img src={`${process.env.PUBLIC_URL}/asset/landing-page/why-horizontal.png`} className="separator-horizontal-left" alt="" />
          <img src={`${process.env.PUBLIC_URL}/asset/landing-page/why-horizontal.png`} className="separator-horizontal-right" alt="" />

          <img src={`${process.env.PUBLIC_URL}/asset/landing-page/why-middle-point.png`} className="separator-middle" alt="" />

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <img src={feature.icon} alt={feature.title} className="feature-icon" />
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-subtitle">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
};

export default WhyChooseSection;
