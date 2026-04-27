import React, { useEffect } from 'react';
import './FeatureCollageSection.css';

const FeatureCollageSection = () => {
  // Define source images in the specific order for the layout:
  // 1: Tall (Left)
  // 2: Top (Middle-Left)
  // 3: Bottom (Middle-Left)
  // 4: Tall (Middle-Right)
  // 5: Top (Right)
  // 6: Bottom (Right)
  const collageBlocks = [
    // Original Feature Collage Images
    // [
    //   'asset/landing-page/feature1_opt.webp', // Tall
    //   'asset/landing-page/feature2_opt.webp', // Top Split 1
    //   'asset/landing-page/feature3_opt.webp', // Bottom Split 1
    //   'asset/landing-page/feature4_opt.webp', // Tall
    //   'asset/landing-page/feature6_opt.webp', // Bottom Split 2
    //   'asset/landing-page/feature5_opt.webp', // Top Split 2
    // ],
    // Event
    [
      'asset/ServicePages/Event/Gallery/Event1.JPG',
      'asset/ServicePages/Event/Gallery/Event2.JPG', 
      'asset/ServicePages/Event/Gallery/Event3.JPG', 
      'asset/ServicePages/Event/Gallery/Event4.jpeg', 
      'asset/ServicePages/Event/Gallery/Event5.JPG', 
      'asset/ServicePages/Event/Gallery/Event6.JPG'
    ],
    // Automotive
    [
      'asset/ServicePages/Automotive/Gallery/Automobile1_opt.webp',
      'asset/ServicePages/Automotive/Gallery/Automobile2_opt.webp',
      'asset/ServicePages/Automotive/Gallery/Automobile3_opt.webp',
      'asset/ServicePages/Automotive/Gallery/Automobile4_opt.webp',
      'asset/ServicePages/Automotive/Gallery/Automobile5_opt.webp',
      'asset/ServicePages/Automotive/Gallery/Automobile6_opt.webp',
    ],
    // Corporate
    // [
    //   'asset/ServicePages/Corporate/Gallery/Corporate1_opt.webp',
    //   'asset/ServicePages/Corporate/Gallery/Corporate2_opt.webp',
    //   'asset/ServicePages/Corporate/Gallery/Corporate3_opt.webp',
    //   'asset/ServicePages/Corporate/Gallery/Corporate4_opt.webp',
    //   'asset/ServicePages/Corporate/Gallery/Corporate5_opt.webp',
    //   'asset/ServicePages/Corporate/Gallery/Corporate6_opt.webp',
    // ],
    // Maternity
    [
      'asset/ServicePages/Maternity/Gallery/Maternity1_opt.webp',
      'asset/ServicePages/Maternity/Gallery/Maternity2_opt.webp',
      'asset/ServicePages/Maternity/Gallery/Maternity3_opt.webp',
      'asset/ServicePages/Maternity/Gallery/Maternity4_opt.webp',
      'asset/ServicePages/Maternity/Gallery/Maternity5_opt.webp',
      'asset/ServicePages/Maternity/Gallery/Maternity6_opt.webp',
    ],
    // Wedding
    [
      'asset/ServicePages/Wedding/Gallery/Wedding1_opt.webp',
      'asset/ServicePages/Wedding/Gallery/Wedding2_opt.webp',
      'asset/ServicePages/Wedding/Gallery/Wedding3_opt.webp',
      'asset/ServicePages/Wedding/Gallery/Wedding4_opt.webp',
      'asset/ServicePages/Wedding/Gallery/Wedding5_opt.webp',
      'asset/ServicePages/Wedding/Gallery/Wedding6_opt.webp',
    ],
    // Sports
    [
      'asset/ServicePages/Sports/Gallery/Sports1_opt.webp',
      'asset/ServicePages/Sports/Gallery/Sports2_opt.webp',
      'asset/ServicePages/Sports/Gallery/Sports3_opt.webp',
      'asset/ServicePages/Sports/Gallery/Sports4_opt.webp',
      'asset/ServicePages/Sports/Gallery/Sports5_opt.webp',
      'asset/ServicePages/Sports/Gallery/Sports6_opt.webp',
    ],
    // Product
    [
      'asset/ServicePages/Product/Gallery/Product1_opt.webp',
      'asset/ServicePages/Product/Gallery/Product2_opt.webp',
      'asset/ServicePages/Product/Gallery/Product3_opt.webp',
      'asset/ServicePages/Product/Gallery/Product4_opt.webp',
      'asset/ServicePages/Product/Gallery/Product5_opt.webp',
      'asset/ServicePages/Product/Gallery/Product6_opt.webp',
    ],
    // Food
    [
      'asset/ServicePages/Food/Gallery/Food1_opt.webp',
      'asset/ServicePages/Food/Gallery/Food2_opt.webp',
      'asset/ServicePages/Food/Gallery/Food3_opt.webp',
      'asset/ServicePages/Food/Gallery/Food4_opt.webp',
      'asset/ServicePages/Food/Gallery/Food5_opt.webp',
      'asset/ServicePages/Food/Gallery/Food6_opt.webp',
    ],
    // Fashion
    [
      'asset/ServicePages/Fashion/Gallery/Fashion1_opt.webp',
      'asset/ServicePages/Fashion/Gallery/Fashion2_opt.webp',
      'asset/ServicePages/Fashion/Gallery/Fashion3_opt.webp',
      'asset/ServicePages/Fashion/Gallery/Fashion4_opt.webp',
      'asset/ServicePages/Fashion/Gallery/Fashion5_opt.webp',
      'asset/ServicePages/Fashion/Gallery/Fashion6_opt.webp',
    ]
  ];

  // Optimization: Preload all images on component mount
  useEffect(() => {
    collageBlocks.flat().forEach((imagePath) => {
      const img = new Image();
      img.src = `/${imagePath}`;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // We need multiple sets for the infinite loop, duplicating the blocks
  const slides = [...collageBlocks, ...collageBlocks];

  return (
    <section className="landing-feature-collage-section">
      <div className="landing-feature-collage-header">
        <h2 className="landing-feature-collage-title">Feature Collage</h2>
      </div>

      <div className="landing-feature-collage-slider">
        <div className="landing-feature-collage-track">
          {slides.map((block, index) => (
            <div key={index} className="landing-feature-collage-block">
              {/* Column 1: Tall */}
              <div className="landing-collage-item landing-item-tall-1">
                <img 
                  src={`/${block[0]}`} 
                  alt="Feature 1" 
                  fetchpriority="high" 
                  loading="eager" 
                  decoding="async"
                />
              </div>

              {/* Column 2: Split */}
              <div className="landing-collage-item landing-item-split-top-1">
                <img 
                  src={`/${block[1]}`} 
                  alt="Feature 2" 
                  fetchpriority="high" 
                  loading="eager" 
                  decoding="async"
                />
              </div>
              <div className="landing-collage-item landing-item-split-bottom-1">
                <img 
                  src={`/${block[2]}`} 
                  alt="Feature 3" 
                  fetchpriority="high" 
                  loading="eager" 
                  decoding="async"
                />
              </div>

              {/* Column 3: Tall */}
              <div className="landing-collage-item landing-item-tall-2">
                <img 
                  src={`/${block[3]}`} 
                  alt="Feature 4" 
                  fetchpriority="high" 
                  loading="eager" 
                  decoding="async"
                />
              </div>

              {/* Column 4: Split */}
              <div className="landing-collage-item landing-item-split-top-2">
                <img 
                  src={`/${block[4]}`} 
                  alt="Feature 5" 
                  fetchpriority="high" 
                  loading="eager" 
                  decoding="async"
                />
              </div>
              <div className="landing-collage-item landing-item-split-bottom-2">
                <img 
                  src={`/${block[5]}`} 
                  alt="Feature 6" 
                  fetchpriority="high" 
                  loading="eager" 
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCollageSection;
