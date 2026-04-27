import React from "react";
import { useNavigate } from "react-router-dom";
import "./CorporateSectionHeroSection.css";

const CorporateSectionHeroSection = ({ serviceData }) => {
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
      className="food-hero"
      style={{ backgroundImage: "url(/asset/ServicePages/Corporate/corporatebg.jpg)" }}
    >
      <div className="food-content">
        <h1 className="food-title">
          Professional Visuals for <br /> Corporate Businesses. <br /> Delivered Without Friction
        </h1>

        <p className="food-subtitle">
          From offices to large-scale events, reliable <br />photography built for business needs
        </p>

        <div className="food-buttons">
          <button
            className="food-btn food-btn-quote"
            onClick={handleGetQuote}
          >
            Get a  Corporate<br />Shoot Quote
          </button>

          <button className="food-btn food-btn-contact" onClick={() => navigate("/contact-us")}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default CorporateSectionHeroSection;