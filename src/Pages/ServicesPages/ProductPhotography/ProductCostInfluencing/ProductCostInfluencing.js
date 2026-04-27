import React from 'react';
import CostInfluencingSection from '../../Shared/CostInfluencingSection/CostInfluencingSection';

const ProductCostInfluencing = () => {
  const finalCostFactors = [
    "Number of products to be photographed",
    "Type of shots required (white background, lifestyle, detail shots)",
    "Product size and complexity",
    "Shoot location (studio or on-site)",
    "Level of editing and retouching",
    "Usage requirements (website, ads, marketplaces)",
  ];

  const features = [
    {
      icon: "/asset/ServicePages/Product/Product-cost1.png",
      text: "No hidden charges"
    },
    {
      icon: "/asset/ServicePages/Product/Product-cost2.png",
      text: "Platform-ready images"
    },
    {
      icon: "/asset/ServicePages/Product/Product-cost3.png",
      text: "Secure delivery via private cloud"
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

export default ProductCostInfluencing;
