import React from 'react';
import './ServiceWhyChoose.css';

const ServiceWhyChoose = ({ title, items }) => {
  return (
    <div className="service-why-choose-section">
      <div className="service-why-choose-title-container">
        <h2 className="service-why-choose-title">{title}</h2>
      </div>
      <div className="service-why-choose-cards">
        {items && items.map((item) => (
          <div key={item.id} className="service-why-choose-card">
            <img src={item.icon} alt={item.text.replace('\n', ' ')} className="service-why-choose-icon" />
            <p className="service-why-choose-text">
              {item.text.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < item.text.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceWhyChoose;
