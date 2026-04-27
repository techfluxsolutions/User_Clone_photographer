import React from 'react';
import CostInfluencingSection from '../../Shared/CostInfluencingSection/CostInfluencingSection';

const CorporateCostInfluencing = () => {
  const finalCostFactors = [
    "Type of corporate coverage",
    "Event duration or shoot scope",
    "Number of photographers",
    "Brand and usage requirements",
    "Delivery timelines",
  ];

  const features = [
    {
      icon: "/asset/ServicePages/Corporate/Corporate-cost1.png",
      text: "GST-compliant invoicing"
    },
    {
      icon: "/asset/ServicePages/Corporate/Corporate-cost2.png",
      text: "Escrow-secured payments"
    },
    {
      icon: "/asset/ServicePages/Corporate/Corporate-cost3.png",
      text: "Private cloud delivery"
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

export default CorporateCostInfluencing;
