import React from 'react';
import ServiceHomeHeroSection from '../../Shared/ServiceHomeHeroSection/ServiceHomeHeroSection';
import './HourlyPremiumHero.css';

const HourlyPremiumHero = () => {
    return (
        <div className="hourly-premium-hero-wrapper">
            <ServiceHomeHeroSection
                title="Premium Hourly Experience"
                subtitle="Cinematic. Elevated. Luxury coverage designed for unforgettable productions."
                backgroundImage={`/asset/ServicePages/HourlyPages/Hourly-Premium3.png`}
                quoteButtonText={<>Get an Hourly<br />Shoot Quote</>}
                showContact={true}
                customPath="/hourly-premium-quote"
            />
        </div>
    );
};

export default HourlyPremiumHero;
