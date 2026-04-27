import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductHeroSection.css";

const ProductHeroSection = ({ serviceData }) => {
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
      style={{ backgroundImage: "url(/asset/ServicePages/Product/Productbg.jpg)" }}
    >
      <div className="food-content">
        <h1 className="food-title">
          Clean, Professional<br />Photography
        </h1>

        <p className="food-subtitle">
          for E-commerce, <br />Websites, and Marketing
        </p>

        <div className="food-buttons">
          <button
            className="food-btn food-btn-quote"
            onClick={handleGetQuote}
          >
            Get a Product<br />Shoot Quote
          </button>

          <button className="food-btn food-btn-contact" onClick={() => navigate("/contact-us")}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductHeroSection;