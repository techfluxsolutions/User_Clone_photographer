import React from 'react';
import { useNavigate } from 'react-router-dom';
import CTASection from '../../Shared/CTASection/CTASection';

const SportsCTA = ({ serviceData }) => {
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
    <CTASection 
      title={<>Get Your Custom Sports<br />Photography Quote</>}
      buttonText="Get Your Personalized Quote"
      linkText="Speak to Our Sports Photography Expert"
      onButtonClick={handleGetQuote}
    />
  );
};

export default SportsCTA;
