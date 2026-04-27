import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalizedQuoteSection from '../../Shared/PersonalizedQuoteSection/PersonalizedQuoteSection';

const WeddingPersonalizedQuote = ({ serviceData }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate("/personalizedBudgetPage", {
      state: {
        serviceId: serviceData?._id || "wedding-service",
        serviceName: serviceData?.serviceName || "Every Moment, Beautifully Captured. Seamlessly Delivered",
      },
    });
  };

  return (
    <PersonalizedQuoteSection 
      title={
    <>
      Let's Capture Your <br />
      Forever
    </>
  }
      buttonText="Get Wedding Quote"
      onButtonClick={handleGetQuote}
    />
  );
};

export default WeddingPersonalizedQuote;
