import React, { useEffect } from 'react';
import HourlyHero from './HourlyHero/HourlyHero';
import PersonalizedTeam from './PersonalizedTeam/PersonalizedTeam';
import HourlyBookingFlow from './HourlyBookingFlow/HourlyBookingFlow';
import MaternityWhyChoose from '../MaternityAndBabyShoot/MaternityWhyChoose/MaternityWhyChoose';
import FeatureCollageSection from '../../LandingPage/FeatureCollageSection/FeatureCollageSection';
import LandingTestimonials from '../../LandingPage/LandingTestimonials/LandingTestimonials';
import HourlyFAQ from './HourlyFAQ/HourlyFAQ';

const HourlyStandard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="hourly-standard-page">
            <HourlyHero />
            <PersonalizedTeam />
            <HourlyBookingFlow />
            <MaternityWhyChoose />
            <FeatureCollageSection />
            <LandingTestimonials />
            <HourlyFAQ />
        </div>
    );
};

export default HourlyStandard;
