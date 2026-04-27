import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalizedQuoteSection from '../../Shared/PersonalizedQuoteSection/PersonalizedQuoteSection';

const EventCapturedByEveryMomentSection = ({ serviceData }) => {
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
    <PersonalizedQuoteSection 
      title="Let’s Capture Every Moment"
      buttonText="Get Event Quote"
      onButtonClick={handleGetQuote}
    />
  );
};

export default EventCapturedByEveryMomentSection;

