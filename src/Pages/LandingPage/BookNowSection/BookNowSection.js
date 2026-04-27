import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookNowSection.css';

const BookNowSection = () => {
  const navigate = useNavigate();
  const sectionStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/asset/landing-page/book-bg.webp)`
  };

  return (
    <section className="book-now-section" style={sectionStyle}>
      <div className="book-now-card">
        <h2 className="book-now-title">Ready to Book Your Shoot?</h2>
        <p className="book-now-subtitle">
          India’s most seamless photography experience just one click away
        </p>
        <div className="book-now-buttons">
          <button className="btn-book-now" onClick={() => navigate("/explore-services")}>Book Now</button>
          <button className="btn-contact-support" onClick={() => navigate("/contact-us")}>Contact Support</button>
        </div>
      </div>
    </section>
  );
};

export default BookNowSection;
