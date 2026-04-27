import React from 'react';
import { useNavigate } from 'react-router-dom';
import CTASection from '../../Shared/CTASection/CTASection';

const ProductCTA = ({ serviceData }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate("/personalizedBudgetPage", {
      state: {
        serviceId: serviceData?._id || "product-service",
        serviceName: serviceData?.serviceName || "Clean, Professional Photography",
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
      linkText="Speak to Our Product Specialist"
      onButtonClick={handleGetQuote}
    />
  );
};

export default ProductCTA;
