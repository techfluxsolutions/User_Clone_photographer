import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalizedQuoteSection from '../../Shared/PersonalizedQuoteSection/PersonalizedQuoteSection';

const FashionPersonalizedQuote = ({ serviceData }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate("/personalizedBudgetPage", {
      state: {
        serviceId: serviceData?._id || "fashion-service",
        serviceName: serviceData?.serviceName || "Creative Fashion Photography",
      },
    });
  };

  return (
    <PersonalizedQuoteSection 
      title={<>Let's Create Your<br />Signature Look</>}
      buttonText="Get Fashion Quote"
      onButtonClick={handleGetQuote}
    />
  );
};

export default FashionPersonalizedQuote;
