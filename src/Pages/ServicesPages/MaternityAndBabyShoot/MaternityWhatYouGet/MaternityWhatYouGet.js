import React from 'react';
import './MaternityWhatYouGet.css';

const MaternityWhatYouGet = () => {
  const maternityImages = [
    { id: 1, src: "/asset/ServicePages/Maternity/mat-get1.JPG", alt: "Maternity Photography 1", title: "Solo, Couple & Family Maternity Portraits" },
    { id: 2, src: "/asset/ServicePages/Maternity/mat-get2.JPG", alt: "Maternity Photography 2", title: "Indoor, Outdoor or At-home shoots" },
    { id: 3, src: "/asset/ServicePages/Maternity/mat-get3.JPG", alt: "Maternity Photography 3", title: "Natural, Elegant & Lifestyle Styles" }
  ];

  const babyImages = [
    { id: 4, src: "/asset/ServicePages/Maternity/mat-get4.JPG", alt: "Baby Photography 1", title: "Newborn Sessions (5–20 days preferred)" },
    { id: 5, src: "/asset/ServicePages/Maternity/mat-get5.JPG", alt: "Baby Photography 2", title: "Baby Milestones & Family Moments" },
    { id: 6, src: "/asset/ServicePages/Maternity/mat-get6.JPG", alt: "Baby Photography 3", title: "Safe, Gentle and Natural Posing" }
  ];

  const renderGallery = (images) => (
    <div className="maternity-gallery-images-container">
      {images.map((img) => (
        <div key={img.id} className="maternity-gallery-image-wrapper">
          <img src={img.src} alt={img.alt} className="maternity-gallery-image" />
          <div className="maternity-gallery-overlay"></div>
          <div className="maternity-gallery-content">
            <h3 className="maternity-gallery-item-title">{img.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="maternity-what-you-get-section">
      <h2 className="maternity-gallery-title">What You Get</h2>

      {/* Maternity Photography Section */}
      <div className="maternity-subsection">
        <div className="subsection-header">
          <span className="line"></span>
          <h3>Maternity Photography</h3>
          <span className="line"></span>
        </div>
        {renderGallery(maternityImages)}
      </div>

      {/* Newborn & Baby Photography Section */}
      <div className="maternity-subsection">
        <div className="subsection-header">
          <span className="line"></span>
          <h3>Newborn & Baby Photography</h3>
          <span className="line"></span>
        </div>
        {renderGallery(babyImages)}
      </div>
    </div>
  );
};

export default MaternityWhatYouGet;
