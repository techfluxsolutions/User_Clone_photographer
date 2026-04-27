import React from 'react';
import './PremiumTeam.css';

const PremiumTeam = () => {
    const teamOptions = [
        { title: 'Photographer', image: 'img1.png' },
        { title: 'Cinematographer', image: 'img2.png' },
        { title: 'Editing', image: 'img3.png' },
        { title: 'Studio Light', image: 'img4.png' }
    ];

    return (
        <div className="premium-team-section">
            <div className="prt-dropdown-container">
                <select className="prt-category-dropdown">
                    <option value="" disabled selected hidden>Select Category</option>
                    <option value="corporate">Corporate</option>
                    <option value="Automobile">Automobile</option>
                    <option value="Events">Events</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Sports">Sports</option>
                    <option value="Food">Food</option>
                    <option value="Maternity & Baby Shoot">Maternity & Baby Shoot</option>
                    <option value="Product">Product</option>
                </select>
            </div>

            <h2 className="prt-main-title">Build Your Elite Production Team</h2>

            <div className="prt-content-card">
                <div className="prt-text-content">
                    <h3 className="prt-heading">Crafted for grand celebrations and high-impact productions.</h3>
                    <p className="prt-description">
                        Select your duration. Experience refined execution.
                        <br />
                        Every frame captured with intention.
                    </p>
                </div>

                <div className="prt-options-grid">
                    {teamOptions.map((option, index) => (
                        <div key={index} className="prt-option-card">
                            <img
                                src={`/asset/ServicePages/HourlyPages/${option.image}`}
                                alt={option.title}
                                className="prt-option-icon"
                            />
                            <span className="prt-option-label">{option.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PremiumTeam;
