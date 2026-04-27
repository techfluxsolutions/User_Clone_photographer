import React from "react";
import "./FeatureCollageSection2.css";

const FeatureCollageSection2 = () => {
  const featureImages = [
    "feature1.png",
    "feature2.png",
    "feature3.png",
    "feature4.png",
    "feature5.png",
    "feature6.png",
    "feature1.png",
    "feature2.png",
    "feature3.png",
    "feature4.png",
    "feature5.png",
    "feature6.png",
    "feature2.png",
    "feature3.png",
    "feature4.png",
    "feature5.png",
    "feature6.png",
    "feature1.png",
    "feature2.png",
    "feature3.png",
    "feature4.png",
    "feature5.png",
    "feature6.png",
    "feature2.png",
    "feature3.png",
    "feature4.png",
    "feature5.png",
    "feature6.png",
    "feature1.png",
    "feature2.png",
    "feature3.png",
    "feature4.png",
    "feature5.png",
    "feature6.png",
     "feature5.png",
    "feature6.png",
     "feature2.png",
    "feature3.png"
  ];

  return (
    <section className="featureCollage2-section">
      <div className="featureCollage2-header">
        <h2 className="featureCollage2-title">Feature Collage</h2>
      </div>

      <div className="featureCollage2-scroll">
        <div className="featureCollage2-grid">
          {featureImages.map((img, index) => (
            <div
              key={index}
              className={`featureCollage2-item ${
                index % 7 === 0 || index % 8 === 0
                  ? "vertical"
                  : "square"
              }`}
            >
              <img
                src={`${process.env.PUBLIC_URL}/asset/landing-page/${img}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCollageSection2;
