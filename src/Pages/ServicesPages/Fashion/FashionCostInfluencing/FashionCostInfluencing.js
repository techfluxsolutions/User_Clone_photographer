import React from 'react';
import CostInfluencingSection from '../../Shared/CostInfluencingSection/CostInfluencingSection';

const FashionCostInfluencing = () => {
  const finalCostFactors = [
    "Type of shoot (editorial, lookbook, campaign, portfolio)",
    "Number of outfits or looks",
    "Shoot duration",
    "Location (studio or outdoor)",
    "Styling, makeup, or creative support required",
    "Editing and retouching level",
    "Usage requirements (social media, website, campaigns)"
  ];

  const features = [
    {
      icon: "/asset/ServicePages/Fashion/fashion-cost1.png",
      text: "Creative direction support"
    },
    {
      icon: "/asset/ServicePages/Fashion/fashion-cost2.png",
      text: "High-quality retouching"
    },
    {
      icon: "/asset/ServicePages/Fashion/fashion-cost3.png",
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

export default FashionCostInfluencing;
