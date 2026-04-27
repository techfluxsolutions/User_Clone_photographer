import React from 'react';
import FoodHeroSection from './FoodHeroSection/FoodHeroSection';
import FoodWhatWeOffer from './FoodWhatWeOffer/FoodWhatWeOffer';
import FoodWhatYouGet from './FoodWhatYouGet/FoodWhatYouGet';
import FoodGallery from './FoodGallery/FoodGallery';
import FoodWhyVeroa from './FoodWhyVeroa/FoodWhyVeroa';
import FoodCostInfluencing from './FoodCostInfluencing/FoodCostInfluencing';
// import FoodPricing from './FoodPricing/FoodPricing';
import FoodPersonalizedQuote from './FoodPersonalizedQuote/FoodPersonalizedQuote';
import FoodTestimonials from './FoodTestimonials/FoodTestimonials';
import FoodFAQ from './FoodFAQ/FoodFAQ';
import FoodCTA from './FoodCTA/FoodCTA';


const Food = ({ serviceData }) => {
  // Define default service data if not provided
  const defaultServiceData = {
    _id: "food-service",
    serviceName: "Professional Food Photography"
  };

  const currentServiceData = serviceData || defaultServiceData;

  return (
    <div className="food-page">
      <FoodHeroSection serviceData={currentServiceData} />
      <FoodWhatWeOffer />
      <FoodWhatYouGet />
      <FoodWhyVeroa />
      {/* <FoodPricing serviceData={currentServiceData} /> */}
      <FoodCostInfluencing />
      <FoodPersonalizedQuote serviceData={currentServiceData} />
      <FoodGallery />
      <FoodTestimonials />
      <FoodFAQ />
      <FoodCTA serviceData={currentServiceData} />
    </div>
  );
};

export default Food;
