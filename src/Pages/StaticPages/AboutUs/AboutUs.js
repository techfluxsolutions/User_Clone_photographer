import React from 'react';
import './AboutUs.css';
import FeatureCollageSection from '../../LandingPage/FeatureCollageSection/FeatureCollageSection';
import NavigationButtons from '../../../Template/NavigationButtons/NavigationButtons';

const AboutUsSection = () => {
    return (
        <section className="about-us-section" style={{ position: 'relative' }}>
            <NavigationButtons />
            <div className="about-us-header">
                <div className="about-us-container">
                    <h2 className="about-us-title">About Us</h2>
                    <p className="about-us-description">
                        Veroa Studioz was born out of a simple realization the photography industry
                        is incredibly talented, yet highly fragmented. Clients struggle with inconsistent
                        quality, unclear pricing, unreliable timelines, and scattered deliveries. On the
                        other side, skilled photographers often lack structured systems, brand
                        positioning, and organized workflows.
                        <br />
                        We exist to bridge that gap.
                    </p>
                </div>
            </div>

            <div className="about-us-content">
                <div className="about-us-container">
                    <div className="about-us-flex-wrapper">
                        <div className="about-us-text-column">
                            <div className="about-block">
                                <h3 className="about-block-title">What We Do</h3>
                                <p className="about-block-text">
                                    Veroa Studioz is a curated, professionally managed photography and
                                    cinematography platform designed to deliver:
                                </p>
                                <ul className="about-list">
                                    <li>Standardized quality</li>
                                    <li>Transparent pricing</li>
                                    <li>Structured service packages</li>
                                    <li>Reliable timelines</li>
                                    <li>Cloud Delivery</li>
                                    <li>Seamless client experience</li>
                                </ul>
                                <p className="about-block-text">
                                    Whether it’s a wedding, corporate event, personal celebration, brand shoot, or
                                    private gathering — we ensure every frame reflects precision, emotion, and
                                    excellence.
                                </p>
                            </div>

                            <div className="about-block">
                                <h3 className="about-block-title">Our Vision</h3>
                                <p className="about-block-text">
                                    To organize and elevate the photography industry by building India’s most
                                    trusted, standardized, and premium visual services brand.
                                    <br />
                                    We aim to become the one-stop solution for photography— where creativity
                                    meets structure.
                                </p>
                            </div>

                            <div className="about-block highlight-block">
                                <p className="highlight-text">
                                    We're Not Just a Photography Company.
                                    <br />
                                    We're Building the Future of Visual Experiences.
                                </p>
                            </div>
                        </div>

                        <div className="about-us-image-column">
                            <div className="image-grid">
                                <div className="grid-item">
                                    <img src={`/asset/ServicePages/AboutUS/About5.png`} alt="About Us 1" />
                                </div>
                                <div className="grid-item">
                                    <img src={`/asset/ServicePages/AboutUS/About2.png`} alt="About Us 2" />
                                </div>
                                <div className="grid-item">
                                    <img src={`/asset/ServicePages/AboutUS/About3.png`} alt="About Us 3" />
                                </div>
                                <div className="grid-item">
                                    <img src={`/asset/ServicePages/AboutUS/About4.png`} alt="About Us 4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          <FeatureCollageSection />

        </section>
    );
};

export default AboutUsSection;
