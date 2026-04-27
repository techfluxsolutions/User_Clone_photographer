import React from 'react';
import FashionHeroSection from './FashionHeroSection/FashionHeroSection';
import WhatWeOffer from './WhatWeOffer/WhatWeOffer';
import FashionDesignedForCreativity from './FashionDesignedForCreativity/FashionDesignedForCreativity';
import FashionGallery from './FashionGallery/FashionGallery';
import FashionWhyChoose from './FashionWhyChoose/FashionWhyChoose';
import FashionCostInfluencing from './FashionCostInfluencing/FashionCostInfluencing';
// import FashionPricing from './FashionPricing/FashionPricing';
import FashionPersonalizedQuote from './FashionPersonalizedQuote/FashionPersonalizedQuote';
import FashionTestimonials from './FashionTestimonials/FashionTestimonials';
import FashionFAQ from './FashionFAQ/FashionFAQ';
import FashionCTA from './FashionCTA/FashionCTA';


const Fashion = ({ serviceData }) => {
  console.log("servicedata", serviceData)

  // Define default service data if not provided
  const defaultServiceData = {
    _id: "fashion-service",
    serviceName: "Creative Fashion Photography"
  };

  const currentServiceData = serviceData || defaultServiceData;

  return (
    <div className="fashion-page">
      <FashionHeroSection serviceData={currentServiceData} />
      <WhatWeOffer />
      <FashionDesignedForCreativity />
      <FashionWhyChoose />
      {/* <FashionPricing serviceData={currentServiceData} /> */}
      <FashionCostInfluencing />
      <FashionPersonalizedQuote serviceData={currentServiceData} />
      <FashionGallery />
      <FashionTestimonials />
      <FashionFAQ />
      <FashionCTA serviceData={currentServiceData} />
    </div>
  );
};

export default Fashion;
