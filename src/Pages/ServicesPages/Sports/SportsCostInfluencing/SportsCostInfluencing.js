import React from 'react';
import CostInfluencingSection from '../../Shared/CostInfluencingSection/CostInfluencingSection';

const SportsCostInfluencing = () => {
  const finalCostFactors = [
    "Shoot duration",
    "Type of sport and venue",
    "Coverage scope (action, team, candid)",
    "Number of photographers required",
    "Delivery timelines",
    "Live Streaming"
  ];

  const features = [
    {
      icon: "/asset/ServicePages/Sports/sport-cost1.png",
      text: "Transparent Pricing"
    },
    {
      icon: "/asset/ServicePages/Sports/sport-cost2.png",
      text: "Fast Previews"
    },
    {
      icon: "/asset/ServicePages/Sports/sport-cost3.png",
      text: "Secure cloud delivery"
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

export default SportsCostInfluencing;
