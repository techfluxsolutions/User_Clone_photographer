import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content-wrapper">
        {/* Left Side - Text Content */}
        <div className="hero-text-container">
          <h1 className="hero-title">
            One-Stop <br />
            Photography <br />
            Solution
          </h1>

          <p className="hero-subtitle">
            Tap. Book. Shoot. Done. <br />
            Everything delivered without the hassle.
          </p>

          {/* <div className="hero-buttons">
            <button className="btn-secondary hero-btn" onClick={() => navigate("/explore-services")}>Explore Services</button>
            <button className="btn-primary hero-btn"
              onClick={() => navigate("/personalizedQuotePage")}>Get a Quote</button>
          </div> */}
          <div className="hero-buttons">
            <button className="btn-secondary hero-btn" onClick={() => navigate("/explore-services")}>Explore Services</button>
            {/* <button className="btn-primary hero-btn"
              onClick={() => navigate("/personalizedQuotePage")}>Get a Quote</button> */}
            <button className="btn-primary hero-btn" onClick={() => navigate("/contact-us")}>Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
