import React from 'react';
import { useNavigate } from 'react-router-dom';
import CTASection from '../../Shared/CTASection/CTASection';

const FashionCTA = ({ serviceData }) => {
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
    <CTASection 
      title={<>Get Your Personalized Quote<br />in Minutes</>}
      buttonText="Get Your Personalized Quote"
      linkText="Speak With Our Fashion Team"
      onButtonClick={handleGetQuote}
    />
  );
};

export default FashionCTA;
