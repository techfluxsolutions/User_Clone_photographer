import React from 'react';
import CostInfluencingSection from '../../Shared/CostInfluencingSection/CostInfluencingSection';

const MaternityCostInfluencing = () => {
  const finalCostFactors = [
    "Type of shoot (maternity, newborn, or both)",
    "Duration of the session",
    "Location (home, studio, outdoor)",
    "Number of setups",
    "Delivery requirements",
  ];

  const features = [
    {
      icon: "/asset/ServicePages/Maternity/mat-cost1.png",
      text: "Gentle, unhurried sessions"
    },
    {
      icon: "/asset/ServicePages/Maternity/mat-cost2.png",
      text: "Baby-safe practices"
    },
    {
      icon: "/asset/ServicePages/Maternity/mat-cost3.png",
      text: "Secure Photo delivery"
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

export default MaternityCostInfluencing;
