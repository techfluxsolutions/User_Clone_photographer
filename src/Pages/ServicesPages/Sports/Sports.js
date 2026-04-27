import React from 'react';
import SportsHeroSection from './SportsHeroSection/SportsHeroSection';
import SportsWhatWeOffer from './SportsWhatWeOffer/SportsWhatWeOffer';
import SportsWhatYouGet from './SportsWhatYouGet/SportsWhatYouGet';
import SportsGallery from './SportsGallery/SportsGallery';
import SportsWhyVeroa from './SportsWhyVeroa/SportsWhyVeroa';
import SportsCostInfluencing from './SportsCostInfluencing/SportsCostInfluencing';
import SportsPersonalizedQuote from './SportsPersonalizedQuote/SportsPersonalizedQuote';
import SportsTestimonials from './SportsTestimonials/SportsTestimonials';
import SportsFAQ from './SportsFAQ/SportsFAQ';
import SportsCTA from './SportsCTA/SportsCTA';


const Sports = ({ serviceData }) => {
  // Define default service data if not provided
  const defaultServiceData = {
    _id: "sports-service",
    serviceName: "Freeze Action & Capture Passion"
  };

  const currentServiceData = serviceData || defaultServiceData;

  return (
    <div className="sports-page">
      <SportsHeroSection serviceData={currentServiceData} />
      <SportsWhatWeOffer />
      <SportsWhatYouGet />
      <SportsWhyVeroa />
      <SportsCostInfluencing />
      <SportsPersonalizedQuote serviceData={currentServiceData} />
      <SportsGallery />
      <SportsTestimonials />
      <SportsFAQ />
      <SportsCTA serviceData={currentServiceData} />
    </div>
  );
};

export default Sports;