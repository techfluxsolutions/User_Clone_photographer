import WeddingHeroSection from './WeddingHeroSection/WeddingHeroSection';
import WhatWeOffer from './WhatWeOffer/WhatWeOffer';
import WeddingStyles from './WeddingStyles/WeddingStyles';
import WeddingGallery from './WeddingGallery/WeddingGallery';
import HowItWorks from './HowItWorks/HowItWorks';
import WhyChoose from './WhyChoose/WhyChoose';
import WeddingPersonalizedQuote from './WeddingPersonalizedQuote/WeddingPersonalizedQuote';
import WeddingTestimonials from './WeddingTestimonials/WeddingTestimonials';
import WeddingFAQ from './WeddingFAQ/WeddingFAQ';
import WeddingCTA from './WeddingCTA/WeddingCTA';


const Wedding = ({ serviceData }) => {
  // Define default service data if not provided
  const defaultServiceData = {
    _id: "wedding-service",
    serviceName: "Every Moment, Beautifully Captured. Seamlessly Delivered"
  };

  const currentServiceData = serviceData || defaultServiceData;

  return (
    <div className="wedding-page">
      <WeddingHeroSection serviceData={currentServiceData} />
      <WhatWeOffer />
      <WeddingStyles />
      <HowItWorks />
      <WhyChoose />
      <WeddingPersonalizedQuote serviceData={currentServiceData} />
      <WeddingGallery />
      <WeddingTestimonials />
      <WeddingFAQ />
      <WeddingCTA serviceData={currentServiceData} />
    </div>
  )
}

export default Wedding