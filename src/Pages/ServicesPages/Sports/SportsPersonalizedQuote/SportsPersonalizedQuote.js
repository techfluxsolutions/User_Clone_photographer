import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalizedQuoteSection from '../../Shared/PersonalizedQuoteSection/PersonalizedQuoteSection';

const SportsPersonalizedQuote = ({ serviceData }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate("/personalizedBudgetPage", {
      state: {
        serviceId: serviceData?._id || "sports-service",
        serviceName: serviceData?.serviceName || "Freeze Action & Capture Passion",
      },
    });
  };

  return (
    <PersonalizedQuoteSection 
      title="Let's Freeze The Action"
      buttonText="Get Sports Quote"
      onButtonClick={handleGetQuote}
    />
  );
};

export default SportsPersonalizedQuote;
