import React from 'react';
import { useNavigate } from 'react-router-dom';
import CTASection from '../../Shared/CTASection/CTASection';

const CorporateCTA = ({ serviceData }) => {
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
    <CTASection 
      title={
        <>
          Get Your Corporate Photography <br />
          Quote
        </>
      }
      buttonText="Get Your Personalized Quote"
      linkText="Speak to Our Corporate Photography Expert"
      onButtonClick={handleGetQuote}
    />
  );
};

export default CorporateCTA;
