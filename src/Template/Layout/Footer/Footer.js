import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-logo">
          <img
            src={`${process.env.PUBLIC_URL}/asset/Logo/white.png`}
            alt="Logo"
          />
        </div>

        {/* Navigation Links with Divider */}
        <div className="footer-nav-container">
          <div className="footer-nav">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/about-us" className="footer-link">About Us</Link>
            <Link to="/explore-services" className="footer-link">Services</Link>
            <Link to="/gallery" className="footer-link">Gallery</Link>
            {/* <Link to="/join-us" className="footer-link">Join as Team</Link>   */}
          </div>
          <div className="footer-divider"></div>
          <div className="footer-sub-nav">
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="footer-link">Terms of Use</Link>
            <Link to="/sales-and-refund" className="footer-link">Sales and Refunds</Link>
            <Link to="/cancellation-policy" className="footer-link">Cancellation Policy</Link>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="https://wa.me/918740950336" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
            <img
              src={`/asset/landing-page/whatsapp.png`}
              alt="WhatsApp"
            />
          </a>
          <a href="https://www.linkedin.com/posts/veroa-studioz_veroa-studios-is-a-photography-booking-and-activity-7431948436368814080-IxHG?utm_source=share&utm_medium=member_ios&rcm=ACoAADboIGYBOY1EzbnvdETsoS5_ArqHGXxw7Uw" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
            <img
              src={`${process.env.PUBLIC_URL}/asset/landing-page/LinkedIn.png`}
              alt="LinkedIn"
            />
          </a>
          <a href="https://www.instagram.com/veroa_studioz?igsh=ZG9zbDBsc2VibG5p&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
            <img
              src={`/asset/landing-page/instagram.png`}
              alt="Instagram"
            />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>Copyright ©️ 2025 All Rights Reserved by Veroa Studioz Private Limited</p>
      </div>
    </footer>
  );
};

export default Footer;