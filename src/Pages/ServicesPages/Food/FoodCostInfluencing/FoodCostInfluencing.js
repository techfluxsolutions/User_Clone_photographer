import React from 'react';
import CostInfluencingSection from '../../Shared/CostInfluencingSection/CostInfluencingSection';

const FoodCostInfluencing = () => {
  const finalCostFactors = [
    "Number of dishes or items",
    "Type of shoot (menu, lifestyle, brand content)",
    "Shoot location (restaurant, kitchen, or studio)",
    "Styling requirements",
    "Duration of the shoot",
    "Editing and post-production needs"
  ];

  const features = [
    {
      icon: "/asset/ServicePages/Food/food-cost1.png",
      text: "Consistent lighting and angles"
    },
    {
      icon: "/asset/ServicePages/Food/food-cost2.png",
      text: "Fast previews"
    },
    {
      icon: "/asset/ServicePages/Food/food-cost3.png",
      text: "Professional editing included"
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

export default FoodCostInfluencing;
