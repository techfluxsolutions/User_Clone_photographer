// import React from 'react';
// import './AutoHeroSection.css';
// import { Navigate, useNavigate } from 'react-router-dom';

// const AutoHeroSection = ({ serviceData }) => {

//   const {serviceName,serviceId} = serviceData;
//   const navigate = useNavigate();
//   const handleGetQuote = () => {
//     Navigate("/personalizedBudgetPage", {
//       state: {
//         serviceId: serviceId,   // 👈 ObjectId
//         serviceName: serviceName
//       }
//     });
//   };
//   return (
//     <div className="automotive-hero" style={{ backgroundImage: "url(/asset/ServicePages/Automotive/Auto-hero.png)" }}>
//       <div className="automotive-overlay"></div>
//       <div className="automotive-content">
//         <h1 className="automotive-title">
//           Highlighting Design,<br />
//           Power, and Performance
//         </h1>
//         <p className="automotive-subtitle">
//           High-impact visuals for cars, bikes, and commercial vehicles
//         </p>
//         <div className="automotive-buttons">
//           <button className="auto-btn auto-btn-quote"  onClick={handleGetQuote}>
//             Get an Auto Shoot<br />Quote
//           </button>
//           <button className="auto-btn auto-btn-contact">
//             Contact Us
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AutoHeroSection;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./AutoHeroSection.css";

const AutoHeroSection = ({ serviceData }) => {
  const navigate = useNavigate(); // ✅ Hook at top level

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
      className="automotive-hero"
      style={{ backgroundImage: "url(/asset/ServicePages/Automotive/Auto-hero.jpg)" }}
    >
      <div className="automotive-overlay"></div>

      <div className="automotive-content">
        <h1 className="automotive-title" style={{ color: "var(--white-color)" }}>
          Highlighting Design,<br />
          Power, and Performance
        </h1>

        <p className="automotive-subtitle">
          High-impact visuals for cars, bikes, and commercial vehicles
        </p>

        <div className="automotive-buttons">
          <button
            className="auto-btn auto-btn-quote"
            onClick={handleGetQuote} // ✅ Correct
          >
            Get an Auto Shoot<br />Quote
          </button>

          <button className="auto-btn auto-btn-contact" onClick={() => navigate("/contact-us")}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoHeroSection;
