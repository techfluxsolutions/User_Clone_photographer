import React from "react";
import { useNavigate } from "react-router-dom";
import "./WeddingHeroSection.css";

const WeddingHeroSection = ({ serviceData }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    if (serviceData) {
      navigate("/personalizedBudgetPage", {
        state: {
          serviceId: serviceData._id,
          serviceName: serviceData.serviceName,
        },
      });
    } else {
      navigate("/personalizedBudgetPage");
    }
  };

  return (
    <div
      className="wedding-hero"
      style={{ backgroundImage: "url(/asset/ServicePages/Wedding/wed-hero.jpg)" }}
    >
      <div className="wedding-overlay"></div>

      <div className="wedding-content">
        <h1 className="wedding-title">
  Every Moment, Beautifully  <br />
  Captured. Seamlessly Delivered
</h1>

        <p className="wedding-subtitle">
          From intimate ceremonies to grand celebrations <br /> book verified wedding photographers with zero stress.
        </p>

        <div className="wedding-buttons">
          <button
            className="wedding-btn wedding-btn-quote"
            onClick={handleGetQuote}
          >
            Get Wedding Quote
          </button>

          <button className="wedding-btn wedding-btn-contact" onClick={() => navigate("/contact-us")}>
            Talk to our<br />Wedding Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeddingHeroSection;

