import React from 'react';
import './PersonalizedTeam.css';

const PersonalizedTeam = () => {
    const teamOptions = [
        { title: 'Photographer', image: 'img1.png' },
        { title: 'Videographer', image: 'img2.png' },
        { title: 'Editing', image: 'img3.png' },
        { title: 'Studio Light', image: 'img4.png' }
    ];

    return (
        <div className="personalized-team-section">
            <div className="pt-dropdown-container">
                <select className="pt-category-dropdown">
                    <option value="" disabled selected hidden>Select Category</option>
                    {/* <option value="all">All Categories</option> */}
                    {/* <option value="wedding">Wedding</option> */}
                    <option value="corporate">Corporate</option>
                    <option value="Automobile">Automobile</option>
                    <option value="Events">Events</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Sports">Sports</option>
                    <option value="Food">Food</option>
                    <option value="Maternity & Baby Shoot">Maternity & Baby Shoot</option>
                    <option value="Product">Product</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            <h2 className="pt-main-title">Create your Personalized Team</h2>

            <div className="pt-content-card">
                <div className="pt-text-content">
                    <h3 className="pt-heading">Mix & Match professionals based on your shoot requirements</h3>
                    <p className="pt-description">
                        Select from Photographers, Videographer, Lighting
                        <br />
                        Assistants to Editing
                    </p>
                </div>

                <div className="pt-options-grid">
                    {teamOptions.map((option, index) => (
                        <div key={index} className="pt-option-card">
                            <img
                                src={`/asset/ServicePages/HourlyPages/${option.image}`}
                                alt={option.title}
                                className="pt-option-icon"
                            />
                            <span className="pt-option-label">{option.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
    
export default PersonalizedTeam;
