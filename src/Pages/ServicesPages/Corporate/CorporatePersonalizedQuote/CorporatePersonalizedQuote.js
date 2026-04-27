import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalizedQuoteSection from '../../Shared/PersonalizedQuoteSection/PersonalizedQuoteSection';

const CorporatePersonalizedQuote = ({ serviceData }) => {
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
      title={
        <>
          Let’s Represent Your  <br />
           Brand with Confidence
        </>
      }
      buttonText=" Get a Corporate Quote"
      onButtonClick={handleGetQuote}
    />
  );
};

export default CorporatePersonalizedQuote;
