import React, { useEffect } from "react";
import EditingHero from "./EditingHero/EditingHero";
import EditingInfo from "./EditingInfo/EditingInfo";
import EditingBookingFlow from "./EditingBookingFlow/EditingBookingFlow";
import MaternityWhyChoose from '../ServicesPages/MaternityAndBabyShoot/MaternityWhyChoose/MaternityWhyChoose';
import FeatureCollageSection from '../LandingPage/FeatureCollageSection/FeatureCollageSection';
import LandingTestimonials from '../LandingPage/LandingTestimonials/LandingTestimonials';
import HourlyFAQ from '../ServicesPages/HourlyStandard/HourlyFAQ/HourlyFAQ';

const EditingPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="editing-page">
            <EditingHero />
            <EditingInfo />
            <EditingBookingFlow />
            <MaternityWhyChoose />
            <FeatureCollageSection />
            <LandingTestimonials />
            <HourlyFAQ />
            {/* Other sections will be added here later */}
        </div>
    );
};

export default EditingPage;
