import React from 'react';
import { useNavigate } from 'react-router-dom';
import CTASection from '../../Shared/CTASection/CTASection';

const FoodCTA = ({ serviceData }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate("/personalizedBudgetPage", {
      state: {
        serviceId: serviceData?._id || "food-service",
        serviceName: serviceData?.serviceName || "Professional Food Photography",
      },
    });
  };

  return (
    <CTASection 
      title={<>Get Your Personalized<br />Quote In Minutes</>}
      buttonText="Get Your Personalized Quote"
      linkText="Speak With Our Food Photography Expert"
      onButtonClick={handleGetQuote}
    />
  );
};

export default FoodCTA;
