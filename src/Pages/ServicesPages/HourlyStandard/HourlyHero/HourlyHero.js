import React from 'react';
import ServiceHomeHeroSection from '../../Shared/ServiceHomeHeroSection/ServiceHomeHeroSection';
import './HourlyHero.css';

const HourlyHero = () => {
    return (
        <div className="hourly-hero-wrapper">
            <ServiceHomeHeroSection
                title="Capture Moments the way they Deserve to be Remembered"
                subtitle="Get Professional Photographers and Videographers on hourly basis,customized for your event"
                backgroundImage={`/asset/ServicePages/HourlyPages/Standard-Hero2.png`}
                quoteButtonText={<>Get an Hourly<br />Shoot Quote</>}
                showContact={true}
                customPath="/hourly-standard-quote"
            />
        </div>
    );
};

export default HourlyHero;
