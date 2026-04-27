import React from 'react';
import { useNavigate } from 'react-router-dom';
import CTASection from '../../Shared/CTASection/CTASection';

const AutoCTA = ({ serviceData }) => {
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
      title={<>Get Your Personalized<br />Automobile Photography Quote</>}
      buttonText="Get Your Personalized Quote"
      linkText="Speak to Our Automobile Expert"
      onButtonClick={handleGetQuote}
    />
  );
};

export default AutoCTA;
