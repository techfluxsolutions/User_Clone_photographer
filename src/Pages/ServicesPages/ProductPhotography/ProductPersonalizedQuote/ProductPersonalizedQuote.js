import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalizedQuoteSection from '../../Shared/PersonalizedQuoteSection/PersonalizedQuoteSection';

const ProductPersonalizedQuote = ({ serviceData }) => {
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
    <PersonalizedQuoteSection 
      title={
        <>
          Let’s Give Your <br />
           Product the Spotlight
        </>
      }
      buttonText=" Get a Product Shoot Quote"
      onButtonClick={handleGetQuote}
    />
  );
};

export default ProductPersonalizedQuote;
