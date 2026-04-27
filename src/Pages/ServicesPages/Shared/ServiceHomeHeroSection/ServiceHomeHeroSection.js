import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceHomeHeroSection.css"; // can even reuse AutoHeroSection.css

const ServiceHomeHeroSection = ({
  serviceData,
  serviceName,
  backgroundImage,
  title,
  subtitle,
  quoteButtonText = "Get Quote",
  showContact = true,
  customPath,
}) => {

  const navigate = useNavigate();

  const handleGetQuote = () => {
    if (customPath) {
      navigate(customPath);
      return;
    }
    navigate("/personalizedBudgetPage", {
      // state: {
      //   serviceId: serviceData?._id || manualServiceId,
      //   serviceName: serviceData?.serviceName || serviceName, // ✅ STRING ONLY
      // },
       state: {
          serviceId: serviceData._id,
          serviceName: serviceData.serviceName,
        },
    });
  };


  console.log("backgroundImage", backgroundImage)
  return (
    <div
      className="automotive-hero"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* SAME overlay class */}
      <div className="automotive-overlay"></div>

      {/* SAME content wrapper */}
      <div className="automotive-content">
        <h1 className="automotive-title">{title}</h1>

        {subtitle && (
          <p className="automotive-subtitle">{subtitle}</p>
        )}

        {/* SAME buttons wrapper */}
        <div className="automotive-buttons">
          <button
            className="auto-btn auto-btn-quote"
            onClick={handleGetQuote}
          >
            {quoteButtonText}
          </button>

          {showContact && (
            <button className="auto-btn auto-btn-contact" onClick={() => navigate("/contact-us")}>
              Contact Us
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceHomeHeroSection;
