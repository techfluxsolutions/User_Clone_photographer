import React from 'react';
import './MaternityHowItWorks.css';

const MaternityHowItWorks = () => {
    return (
        <div className="maternity-how-section-container">
            <section className="maternity-how-it-works" style={{ backgroundImage: "url(/asset/ServicePages/Maternity/mat-work.png)" }}>
                <div className="maternity-how-overlay"></div>
                <div className="maternity-how-content">
                    <h2 className="maternity-how-title">How it Works ?</h2>
                    
                    <div className="maternity-steps-container">
                        {/* Top Row */}
                        <div className="maternity-step step-1">
                            <div className="step-number-circle">1</div>
                            <div className="step-text">Share preferred dates<br />& shoot type</div>
                        </div>
                        
                        <img src="/asset/ServicePages/Maternity/Line.png" alt="" className="step-connector-line horizontal top" />

                        <div className="maternity-step step-2">
                            <div className="step-number-circle">2</div>
                            <div className="step-text">Connect With Us</div>
                        </div>

                        <img src="/asset/ServicePages/Maternity/Line.png" alt="" className="step-connector-line vertical" />

                        {/* Bottom Row */}
                        <div className="maternity-step step-4">
                            <div className="step-number-circle">4</div>
                            <div className="step-text">Preview & private<br />cloud delivery</div>
                        </div>

                        <img src="/asset/ServicePages/Maternity/Line.png" alt="" className="step-connector-line horizontal bottom" />

                        <div className="maternity-step step-3">
                            <div className="step-number-circle">3</div>
                            <div className="step-text">Comfortable, unhurried<br />shoot</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MaternityHowItWorks;
