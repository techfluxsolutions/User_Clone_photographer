import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import CategorySection from './CategorySection/CategorySection';
import WhyChooseSection from './WhyChooseSection/WhyChooseSection';
import FeatureCollageSection from './FeatureCollageSection/FeatureCollageSection';
import LandingTestimonials from './LandingTestimonials/LandingTestimonials';
import BookNowSection from './BookNowSection/BookNowSection';
import NewsletterSection from './NewsletterSection/NewsletterSection';
import HourlyShoots from './HourlyShoots/HourlyShoots2';
// import FeatureCollageSection2 from './FeatureCollageSection2/FeatureCollageSection2';
// import Footer from './Footer/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <CategorySection />
      {/* <HourlyShoots /> */}
      <HourlyShoots />
      <WhyChooseSection />
      <FeatureCollageSection />
      {/* <FeatureCollageSection2/> */}
      <LandingTestimonials />
      <BookNowSection />
      <NewsletterSection />
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;