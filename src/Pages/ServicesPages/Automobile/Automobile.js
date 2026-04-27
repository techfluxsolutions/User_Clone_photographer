import React from 'react';
import AutoTestimonials from './AutoTestimonials/AutoTestimonials';
import AutoFAQ from './AutoFAQ/AutoFAQ';
import AutoHeroSection from './AutoHeroSection/AutoHeroSection';
import AutoPersonalizedQuote from './AutoPersonalizedQuote/AutoPersonalizedQuote';
import AutoWhatWeCover from './AutoWhatWeCover/AutoWhatWeCover';
import AutoWhatYouGet from './AutoWhatYouGet/AutoWhatYouGet';
import AutoWhyVeroa from './AutoWhyVeroa/AutoWhyVeroa';
import AutoCostInfluencing from './AutoCostInfluencing/AutoCostInfluencing';
import AutoCTA from './AutoCTA/AutoCTA';
import ServicePricingSection from '../Shared/ServicePricingSection/ServicePricingSection';
import AutoGallery from './AutoGallery/AutoGallery';


const Automobile = ({ serviceData }) => {
  console.log("servicedata", serviceData)

  return (
    <div className="automotive-page">
      <AutoHeroSection serviceData={serviceData} />
      <AutoWhatWeCover serviceData={serviceData} />
      <AutoWhatYouGet serviceData={serviceData} />
      <AutoWhyVeroa />
      <AutoCostInfluencing />
      <ServicePricingSection serviceData={serviceData} />
      <AutoPersonalizedQuote serviceData={serviceData} />
      <AutoGallery />
      <AutoTestimonials />
      <AutoFAQ serviceData={serviceData} />
      <AutoCTA serviceData={serviceData} />
    </div>
  );
};

export default Automobile;
