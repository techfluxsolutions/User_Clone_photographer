import React from "react";
import { useNavigate } from "react-router-dom";
import "./EditingHero.css";

const EditingHero = ({ serviceData }) => {
    const navigate = useNavigate();

    const handleGetQuote = () => {
        navigate("/editing-quote");
    };

    return (
        <div
            className="editing-hero"
            style={{ backgroundImage: "url(/asset/Editing-page/Edit-Hero.png)" }}
        >
            <div className="editing-content">
                <h1 className="editing-title">
                    Professional Video<br />Editing
                </h1>

                <p className="editing-subtitle">
                    Transform raw footage into scroll stopping videos
                </p>

                <div className="editing-buttons">
                    <button
                        className="editing-btn editing-btn-quote"
                        onClick={handleGetQuote}
                    >
                        Get an Editing <br /> Quote
                    </button>

                    <button className="editing-btn editing-btn-contact" onClick={() => navigate("/contact-us")}>
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditingHero;
