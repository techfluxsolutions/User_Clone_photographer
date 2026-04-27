import React from "react";
import { useNavigate } from "react-router-dom";
import "./SportsHeroSection.css";

const SportsHeroSection = ({ serviceData }) => {
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
      className="sports-hero"
      style={{
        backgroundImage: "url(/asset/ServicePages/Sports/Sport-herobg.jpg)",
      }}
    >
      <div className="sports-overlay"></div>
      <div className="sports-content">
        <h1 className="sports-title" style={{ color: "var(--white-color)" }}>
          Freeze Action & Capture Passion
        </h1>
        <p className="sports-subtitle">
          Professional sports coverage for teams, academies, and tournaments
        </p>
        <div className="sports-buttons">
          <button className="sports-btn sports-btn-quote" onClick={handleGetQuote}>
            Get a Sports<br />Shoot Quote
          </button>
          <button className="sports-btn sports-btn-contact" onClick={() => navigate("/contact-us")}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default SportsHeroSection;
