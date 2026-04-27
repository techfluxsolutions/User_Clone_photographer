import React from "react";
import { useNavigate } from "react-router-dom";
import "./MaternityHero.css";

const MaternityHero = ({ serviceData }) => {
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
      className="Maternity-hero"
      style={{ backgroundImage: "url(/asset/ServicePages/Maternity/mat-hero2.jpg)" }}
    >
      <div className="Maternity-overlay"></div>
      <div className="Maternity-content">
        <h1 className="Maternity-title">
          From Bump to <br />Baby - Beautifully <br />Captured
        </h1>

        <p className="Maternity-subtitle">
          Gentle, safe, and professional photography for <br />expecting parents and newborns, delivered with <br />Veroa’s trusted experience
        </p>

        <div className="Maternity-buttons">
          <button
            className="Maternity-btn Maternity-btn-quote"
            onClick={handleGetQuote}
          >
            Get a Personalised<br />Quote
          </button>

          <button className="Maternity-btn Maternity-btn-contact" onClick={() => navigate("/contact-us")}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaternityHero;

