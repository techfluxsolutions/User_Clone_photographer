import React from 'react';
import './MaternityWhyChoose.css';

const MaternityWhyChoose = () => {
    const whyItems = [
        {
            id: 1,
            icon: "/asset/ServicePages/Maternity/mat-why1.png",
            text: "Verified\nProfessionals"
        },
        {
            id: 2,
            icon: "/asset/ServicePages/Maternity/mat-why2.png",
            text: "Secured Escrow\nPayments"
        },
        {
            id: 3,
            icon: "/asset/ServicePages/Maternity/mat-why3.png",
            text: "Private Cloud\nStorage"
        },
        {
            id: 4,
            icon: "/asset/ServicePages/Maternity/mat-why4.png",
            text: "Transparent pricing\napproach"
        }
    ];

    return (
        <div className="maternity-why-veroa-section">
            <div className="maternity-why-veroa-title-container">
                <h2 className="maternity-why-veroa-title">Why Veroa ?</h2>
            </div>
            <div className="maternity-why-veroa-content">
                <div className="maternity-why-veroa-grid">
                    {whyItems.map((item) => (
                        <div key={item.id} className="maternity-why-veroa-card">
                            <img src={item.icon} alt={item.text.replace('\n', ' ')} className="maternity-why-icon" />
                            <p className="maternity-why-card-text">
                                {item.text.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < item.text.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MaternityWhyChoose;
