import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalizedQuoteSection from '../../Shared/PersonalizedQuoteSection/PersonalizedQuoteSection';

const FoodPersonalizedQuote = ({ serviceData }) => {
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
    <PersonalizedQuoteSection 
    title={<>Let's Tell Your<br/> Food Story</>}
    buttonText="Get Food Quote"
      onButtonClick={handleGetQuote}
    />
  );
};

export default FoodPersonalizedQuote;
