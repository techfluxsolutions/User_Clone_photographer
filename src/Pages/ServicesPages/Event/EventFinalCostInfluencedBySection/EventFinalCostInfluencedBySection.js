import React from 'react';
import CostInfluencingSection from '../../Shared/CostInfluencingSection/CostInfluencingSection';

const EventFinalCostInfluencedBySection = () => {
  const finalCostFactors = [
    "Number of hours booked",
    "Type of event",
    "Location",
    "Number of photographers",
    "Delivery timelines"
  ];

  const features = [
    {
      icon: "/asset/ServicePages/Automotive/cost1.png",
      text: "Flexible hourly booking"
    },
    {
      icon: "/asset/ServicePages/Automotive/cost2.png",
      text: "Fast previews"
    },
    {
      icon: "/asset/ServicePages/Automotive/cost3.png",
      text: "Secure delivery"
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

export default EventFinalCostInfluencedBySection;
