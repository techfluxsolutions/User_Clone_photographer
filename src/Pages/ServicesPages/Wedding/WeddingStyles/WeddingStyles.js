import React from 'react';
import './WeddingStyles.css';

const WeddingStyles = () => {
  const styles = [
    { id: 1, name: 'Candid', image: '/asset/ServicePages/Wedding/style1.png' },
    { id: 2, name: 'Traditional', image: '/asset/ServicePages/Wedding/style2.png' },
    { id: 3, name: 'Cinematic', image: '/asset/ServicePages/Wedding/style3.png' },
    { id: 4, name: 'Pre Wedding', image: '/asset/ServicePages/Wedding/style4.png' },
    { id: 5, name: 'Destination Wedding', image: '/asset/ServicePages/Wedding/style5.png' },
  ];

  return (
    <section className="wedding-styles-section">
      <h2 className="wedding-styles-title">Wedding Styles</h2>
      
      <div className="wedding-styles-container">
        {/* Top Row - 3 cards */}
        <div className="wedding-styles-row top-row">
          {styles.slice(0, 3).map((style) => (
            <div 
              key={style.id} 
              className="wedding-style-card"
              style={{ backgroundImage: `url(${style.image})` }}
            >
              <div className="wedding-style-overlay">
                <h3 className="wedding-style-name">{style.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row - 2 cards */}
        <div className="wedding-styles-row bottom-row">
          {styles.slice(3, 5).map((style) => (
            <div 
              key={style.id} 
              className="wedding-style-card"
              style={{ backgroundImage: `url(${style.image})` }}
            >
              <div className="wedding-style-overlay">
                <h3 className="wedding-style-name">{style.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingStyles;
