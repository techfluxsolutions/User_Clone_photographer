import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalizedQuoteSection from '../../Shared/PersonalizedQuoteSection/PersonalizedQuoteSection';

const MaternityPersonalizedQuote = ({ serviceData }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate("/personalizedBudgetPage", {
      state: {
        serviceId: serviceData?._id || "maternity-service",
        serviceName: serviceData?.serviceName || "From Bump to Baby - Beautifully Captured",
      },
    });
  };
  return (
    <PersonalizedQuoteSection
      title={
    <>
      Let’s Preserve This Beautiful
      <br />
      Chapter
    </>
  }
  buttonText="Get Maternity Quote"
  onButtonClick={handleGetQuote}
/>
  );
};

export default MaternityPersonalizedQuote;
