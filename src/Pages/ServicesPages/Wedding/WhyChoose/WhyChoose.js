import React from 'react';
import './WhyChoose.css';

const WhyChoose = () => {
  const whyItems = [
    {
      id: 1,
      icon: "/asset/ServicePages/Wedding/choose1.png",
      text: "Verified Wedding\nProfessionals"
    },
    {
      id: 2,
      icon: "/asset/ServicePages/Wedding/choose2.png",
      text: "Escrow-Secured\nPayments"
    },
    {
      id: 3,
      icon: "/asset/ServicePages/Wedding/choose3.png",
      text: "Private Cloud\nStorage"
    },
    {
      id: 4,
      icon: "/asset/ServicePages/Wedding/choose4.png",
      text: "Timely Delivery"
    },
    {
      id: 5,
      icon: "/asset/ServicePages/Wedding/choose5.png",
      text: "Custom Plans"
    }
  ];

  return (
    <div className="why-veroa-section">
      <div className="why-veroa-title-container">
        <h2 className="why-veroa-title">Why Choose Veroa ?</h2>
      </div>
      <div className="why-veroa-content">
        {/* Top row - 3 cards */}
        <div className="why-veroa-cards-row top-row">
          {whyItems.slice(0, 3).map((item) => (
            <div key={item.id} className="why-veroa-card">
              <img src={item.icon} alt={item.text.replace('\n', ' ')} className="why-icon" />
              <p className="why-card-text">
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

        {/* Bottom row - 2 cards */}
        <div className="why-veroa-cards-row bottom-row">
          {whyItems.slice(3, 5).map((item) => (
            <div key={item.id} className="why-veroa-card">
              <img src={item.icon} alt={item.text.replace('\n', ' ')} className="why-icon" />
              <p className="why-card-text">
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
    </div>
  );
};

export default WhyChoose;
