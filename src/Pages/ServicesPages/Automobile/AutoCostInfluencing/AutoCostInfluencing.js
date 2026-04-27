import React from 'react';
import CostInfluencingSection from '../../Shared/CostInfluencingSection/CostInfluencingSection';

const AutoCostInfluencing = () => {
  const finalCostFactors = [
    "Type of vehicle (car, bike, fleet)",
    "Shoot location (studio or outdoor)",
    "Number of angles and setups",
    "Level of editing and retouching",
    "Usage requirements (web, ads, promotions)",
    "Duration of Shoot"
  ];

  const features = [
    {
      icon: "/asset/ServicePages/Automotive/cost1.png",
      text: "No hidden charges"
    },
    {
      icon: "/asset/ServicePages/Automotive/cost2.png",
      text: "Escrow-secured payments"
    },
    {
      icon: "/asset/ServicePages/Automotive/cost3.png",
      text: "Pay only after preview approval"
    }
  ];

  return (
    <CostInfluencingSection 
      title="Final Cost is influenced by" 
      factors={finalCostFactors}
      features={features}
    />
  );
};

export default AutoCostInfluencing;
