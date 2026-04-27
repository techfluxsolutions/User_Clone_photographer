import React, { useState, useEffect, useRef } from 'react';
import './ServiceOffersSection.css';

const ServiceOffersSection = ({
  title = "What We Offer",
  items = [],
  showPagination = true,
  itemsPerPage = 3,
  autoScroll = true,
  scrollInterval = 3000
}) => {
  const totalItems = items.length;
  const [currentIndex, setCurrentIndex] = useState(totalItems > 0 ? totalItems : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef(null);

  // Sync index if items are loaded asynchronously
  useEffect(() => {
    if (currentIndex === 0 && totalItems > 0) {
      setCurrentIndex(totalItems);
    }
  }, [totalItems, currentIndex]);

  // Duplicate items for infinite loop
  const duplicatedItems = [...items, ...items, ...items];

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll || totalItems === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [autoScroll, scrollInterval, totalItems]);

  // Handle infinite loop reset
  useEffect(() => {
    if (currentIndex === totalItems * 2) {
      // When we reach the end of second set, jump back to first set
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalItems);
      }, 600); // Wait for transition to complete
    } else if (currentIndex === totalItems) {
      setIsTransitioning(true);
    }
  }, [currentIndex, totalItems]);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update transform calculation for mobile
  const cardWidth = isMobile ? 220 : 250;
  const gap = isMobile ? 15 : 30;
  // On desktop, shift left by 1 to make the active card centered among 3 visible cards
  const shiftIndex = isMobile ? currentIndex : currentIndex - 1;
  const translateX = -(shiftIndex * (cardWidth + gap));

  // Use cube effect for all service offers
  const containerClass = "offers-cards-container cube-effect";

  // const handleDotClick = (index) => {
  //   setIsTransitioning(true);
  //   setCurrentIndex(totalItems + index);
  // };

  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="service-offers-section">
      <h2 className="offers-title">{title}</h2>

      <div className="offers-cards-wrapper">
        <div
          ref={containerRef}
          className={containerClass}
          style={{
            transform: isMobile ? `translateX(${translateX}px)` : `translateX(${translateX}px)`,
            transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        >
          {duplicatedItems.map((item, index) => {
            // The active card is ALWAYS the currentIndex based on our shifted container logic
            const isActive = index === currentIndex;
            return (
              <div
                key={`${item.id}-${index}`}
                className={`offers-card ${isActive ? 'active' : ''}`}
              >
                <div className="offers-icon-wrapper">
                  <img src={item.icon} alt={item.title.replace('\n', ' ')} className="offers-icon" />
                </div>
                <h3 className="offers-card-title">
                  {item.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < item.title.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* {showPagination && totalPages > 1 && (
        <div className="pagination-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`dot ${(currentIndex % totalItems) >= index * itemsPerPage && (currentIndex % totalItems) < (index + 1) * itemsPerPage ? 'active' : ''}`}
              onClick={() => handleDotClick(index * itemsPerPage)}
            ></span>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default ServiceOffersSection;


