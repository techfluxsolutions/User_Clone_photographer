import React from 'react';
import './HourlyShoots.css';

const HourlyShoots = () => {
  const hourOptions = [
    { hours: '0-3', label: 'hours', image: '/asset/landing-page/hrs1.jpeg' },
    { hours: '5', label: 'hours', image: '/asset/landing-page/hrs2.jpeg' },
    { hours: '8', label: 'hours', image: '/asset/landing-page/hrs3.jpeg' }
  ];

  // const sectionStyle = {
  //   backgroundImage: `url(${process.env.PUBLIC_URL}/asset/landing-page/hourly-shoots-bg.png)`
  // };

  return (
    <div className="hourly-shoots-wrapper">
      <section className="Landing-page-hourly-shoots">
        <div className="hourly-shoots-content">
          <h2 className="hourly-shoots-title">Hourly Shoots</h2>
          <div className="hourly-shoots-cards">
            {hourOptions.map((option, index) => (
              <div key={index} className="hourly-card" style={{ backgroundImage: `url(${option.image})` }}>
                <div className="hourly-card-overlay"></div>
                <div className="hourly-card-content">
                  <h3 className="hourly-card-hours">{option.hours}</h3>
                  <p className="hourly-card-label">{option.label}</p>
                  <button className="book-now-btn">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HourlyShoots;