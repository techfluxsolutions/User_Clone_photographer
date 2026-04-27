import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalizedQuoteSection from '../../Shared/PersonalizedQuoteSection/PersonalizedQuoteSection';

const AutoPersonalizedQuote = ({ serviceData }) => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    if (serviceData) {
      navigate("/personalizedBudgetPage", {
        state: {
          serviceId: serviceData._id,
          serviceName: serviceData.serviceName,
        },
      });
    } else {
      navigate("/personalizedBudgetPage");
    }
  };

  return (
    <PersonalizedQuoteSection 
      title={<>Let’s Capture the<br/> Power and Design</>}
      buttonText="Get Your Personalized Quote"
      onButtonClick={handleGetQuote}
    />
  );
};

export default AutoPersonalizedQuote;

