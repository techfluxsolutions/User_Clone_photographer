import React, { useEffect } from 'react';
import HourlyPremiumHero from './HourlyPremiumHero/HourlyPremiumHero';
import PremiumTeam from './PremiumTeam/PremiumTeam';
import HourlyPremiumBookingFlow from './HourlyPremiumBookingFlow/HourlyPremiumBookingFlow';
import MaternityWhyChoose from '../MaternityAndBabyShoot/MaternityWhyChoose/MaternityWhyChoose';
import FeatureCollageSection from '../../LandingPage/FeatureCollageSection/FeatureCollageSection';
import LandingTestimonials from '../../LandingPage/LandingTestimonials/LandingTestimonials';
import HourlyFAQ from '../HourlyStandard/HourlyFAQ/HourlyFAQ';

const HourlyPremium = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="hourly-premium-page">
            <HourlyPremiumHero />
            <PremiumTeam />
            <HourlyPremiumBookingFlow />
            <MaternityWhyChoose />
            <FeatureCollageSection />
            <LandingTestimonials />
            <HourlyFAQ />
        </div>
    );
};

export default HourlyPremium;
