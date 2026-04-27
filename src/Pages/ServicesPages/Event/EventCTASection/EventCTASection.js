import React from 'react';
import { useNavigate } from 'react-router-dom';
import CTASection from "../../Shared/CTASection/CTASection";

const EventCTASection = ({ serviceData }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate("/personalizedBudgetPage", {
      state: {
        serviceId: serviceData?._id || "event-service",
        serviceName: serviceData?.serviceName || "Every Moment Covered Seamlessly",
      },
    });
  };
  return (
    <CTASection 
      title={<>Get Your Event<br /> Photography Quote</>}
      buttonText="Get Your Personalized Quote"
      linkText="Speak to Our Event Photography Specialist"
      onButtonClick={handleGetQuote}
    />
  );
};

export default EventCTASection;
