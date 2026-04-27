import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './HourlyShoots2.css';
// import Commingsoon from '../../Commingsoon/Commingsoon';
import CommingSoonModal from '../CommingSoonModal/CommingSoonModal';

const HourlyShoots = () => {
  // const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hourOptions = [
    { hours: '0-3 hour', label: 'Short & Focused sessions' },
    { hours: '5 hour', label: 'Balanced & Versatile Shoot' },
    { hours: '8 hour', label: 'Full Day Coverage' }
  ];

  // const packageOptions = [
  //   {
  //     title: 'Standard',
  //     description: 'Balanced, Efficient, Professional',
  //     image: 'hourly-standard.png'
  //   },
  //   {
  //     title: 'Premium',
  //     description: 'Elevated, Detailed, Production Ready',
  //     image: 'hourly-premium.png'
  //   }
  // ];

  const handleBookShootClick = () => {
    setIsModalOpen(true);
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className="hourly-shoots-wrapper">
      <section className="Landing-page-hourly-shoots">
        <h2 className="hourly-shoots-main-title">
          <span className="title-text">The Hour Is Yours !</span>
          {/* <div className="title-underline"></div> */}
        </h2>

        <div className="hourly-shoots-content-split">

          <div className="hourly-shoots-left">
            <img
              src={`${process.env.PUBLIC_URL}/asset/landing-page/Hourly-Shoot.webp`}
              alt="Hourly Section"
              className="hourly-main-img"
            />
            <div className="hourly-image-overlay"></div>
            <div className="hourly-left-text">
              <h3>Hourly Section</h3>
              <p>Designed around your vision, pace & production needs.</p>
            </div>
          </div>

          <div className="hourly-shoots-right">
            {hourOptions.map((option, index) => (
              <div key={index} className="hourly-option-card">
                <h3 className="hourly-card-hours">{option.hours}</h3>
                <p className="hourly-card-label">{option.label}</p>
                <img
                  src={`${process.env.PUBLIC_URL}/asset/landing-page/book-btn.png`}
                  alt="Book Shoot"
                  className="book-btn"
                  onClick={handleBookShootClick}
                  style={{ cursor: 'pointer', /* adjust width if needed in css */ }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/*corrected Modal code */}
      {/* {isModalOpen && (
        <div className="hourly-modal-overlay" onClick={handleCloseModal}>
          <div className="hourly-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="hourly-modal-header">
              <button className="back-btn" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#4A3326" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <h2 className="hourly-modal-title">Hourly Photography Packages</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#4A3326" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="hourly-modal-packages">
              {packageOptions.map((pkg, index) => (
                <div
                  key={index}
                  className="hourly-package-card"
                  onClick={() => {
                    if (pkg.title === 'Standard') {
                      navigate('/hourly-standard');
                    } else if (pkg.title === 'Premium') {
                      navigate('/hourly-premium');
                    }
                  }}
                  style={{ cursor: (pkg.title === 'Standard' || pkg.title === 'Premium') ? 'pointer' : 'default' }}
                >
                  <img src={`${process.env.PUBLIC_URL}/asset/landing-page/${pkg.image}`} alt={pkg.title} className="package-img" />
                  <div className="package-info">
                    <h3 className="package-title">{pkg.title}</h3>
                    <p className="package-desc">{pkg.description}</p>
                  </div>
                  <div className="package-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* comingsoon modal remove this after actual implementation */}
      <CommingSoonModal
      show={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      message="Stay tuned, coming soon!"
    />
    </div>
  );
};

export default HourlyShoots;