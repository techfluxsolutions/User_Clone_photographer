import React, { useEffect } from 'react';
import './FeatureCollageSection.css';

const FeatureCollageSection = ({ 
  title = "Feature Collage",
  images = [],
  basePath = "asset/landing-page"
}) => {
  // Default images if none provided (using landing page images as fallback)
  const defaultImages = [
    'feature1.png', // Tall
    'feature2.png', // Top Split 1
    'feature3.png', // Bottom Split 1
    'feature4.png', // Tall
    'feature6.png', // Bottom Split 2
    'feature5.png', // Top Split 2
  ];

  const featureImages = images.length > 0 ? images : defaultImages;

  // Chunk images into groups of 6 for each collage block
  const imageChunks = [];
  for (let i = 0; i < featureImages.length; i += 6) {
    imageChunks.push(featureImages.slice(i, i + 6));
  }

  // Optimization: Preload all images on component mount
  useEffect(() => {
    featureImages.forEach((image) => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/${basePath}/${image}`;
    });
  }, [featureImages, basePath]);

  // We need multiple sets for the infinite loop
  const slides = [1, 2, 3]; 

  return (
    <section className="feature-collage-section">
      <div className="feature-collage-header">
        <h2 className="feature-collage-title">{title}</h2>
      </div>

      <div className="feature-collage-slider">
        <div className="feature-collage-track">
          {slides.map((_, slideIndex) => (
            <React.Fragment key={slideIndex}>
              {imageChunks.map((chunk, chunkIndex) => (
                <div key={`${slideIndex}-${chunkIndex}`} className="feature-collage-block">
                  {/* Column 1: Tall */}
                  {chunk[0] && (
                    <div className="collage-item item-tall-1">
                      <img 
                        src={`${process.env.PUBLIC_URL}/${basePath}/${chunk[0]}`} 
                        alt={`Feature ${chunkIndex * 6 + 1}`} 
                        fetchpriority="high" 
                        loading="eager" 
                        decoding="async"
                      />
                    </div>
                  )}

                  {/* Column 2: Split */}
                  {chunk[1] && (
                    <div className="collage-item item-split-top-1">
                      <img 
                        src={`${process.env.PUBLIC_URL}/${basePath}/${chunk[1]}`} 
                        alt={`Feature ${chunkIndex * 6 + 2}`} 
                        fetchpriority="high" 
                        loading="eager" 
                        decoding="async"
                      />
                    </div>
                  )}
                  {chunk[2] && (
                    <div className="collage-item item-split-bottom-1">
                      <img 
                        src={`${process.env.PUBLIC_URL}/${basePath}/${chunk[2]}`} 
                        alt={`Feature ${chunkIndex * 6 + 3}`} 
                        fetchpriority="high" 
                        loading="eager" 
                        decoding="async"
                      />
                    </div>
                  )}

                  {/* Column 3: Tall */}
                  {chunk[3] && (
                    <div className="collage-item item-tall-2">
                      <img 
                        src={`${process.env.PUBLIC_URL}/${basePath}/${chunk[3]}`} 
                        alt={`Feature ${chunkIndex * 6 + 4}`} 
                        fetchpriority="high" 
                        loading="eager" 
                        decoding="async"
                      />
                    </div>
                  )}

                  {/* Column 4: Split */}
                  {chunk[4] && (
                    <div className="collage-item item-split-top-2">
                      <img 
                        src={`${process.env.PUBLIC_URL}/${basePath}/${chunk[4]}`} 
                        alt={`Feature ${chunkIndex * 6 + 5}`} 
                        fetchpriority="high" 
                        loading="eager" 
                        decoding="async"
                      />
                    </div>
                  )}
                  {chunk[5] && (
                    <div className="collage-item item-split-bottom-2">
                      <img 
                        src={`${process.env.PUBLIC_URL}/${basePath}/${chunk[5]}`} 
                        alt={`Feature ${chunkIndex * 6 + 6}`} 
                        fetchpriority="high" 
                        loading="eager" 
                        decoding="async"
                      />
                    </div>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCollageSection;