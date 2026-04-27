import React from 'react';
import { useNavigate } from 'react-router-dom';
import CTASection from '../../Shared/CTASection/CTASection';

const MaternityCTA = ({ serviceData }) => {
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
    <CTASection
      title={<>Get Your Personalized <br /> Family Photography Quote</>}
      buttonText="Get Your Personalized Quote"
      linkText="Speak to our New Born and Maternity Specialist"
      onButtonClick={handleGetQuote}
    />
  );
};

export default MaternityCTA;
