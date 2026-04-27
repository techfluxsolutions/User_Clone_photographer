import React from 'react';
import { useNavigate } from 'react-router-dom';
import CTASection from '../../Shared/CTASection/CTASection';

const WeddingCTA = ({ serviceData }) => {
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
    <CTASection 
      title={
        <>
          Get Your Personalized Quote<br />
          in Minutes
        </>
      }
      buttonText="Get Your Personalized Quote"
      linkText="Speak to Our Wedding Specialist"
      onButtonClick={handleGetQuote}
    />
  );
};

export default WeddingCTA;
