import React, { useState, useEffect } from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = ({ testimonials = [] }) => {
  const [displayTestimonials, setDisplayTestimonials] = useState(testimonials);
  const [activeTestimonial, setActiveTestimonial] = useState(null);

  useEffect(() => {
    if (activeTestimonial) return;

    const interval = setInterval(() => {
      setDisplayTestimonials((prev) => {
        const arr = [...prev];
        arr.push(arr.shift());
        return arr;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [activeTestimonial]);

  return (
    <>
      <section className="testimonials-section">
        <h2 className="testimonials-heading">TESTIMONIALS</h2>

        <div className="testimonials-content">
          <div className="testimonials-grid">
            {displayTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-avatar">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>

                <h3 className="testimonial-name">{testimonial.name}</h3>

                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>

                <p className="testimonial-text">
                  {testimonial.text}
                </p>

                <button
                  className="read-more"
                  onClick={() => setActiveTestimonial(testimonial)}
                >
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPUP MODAL */}
      {activeTestimonial && (
        <div className="testimonial-modal-overlay" onClick={() => setActiveTestimonial(null)}>
          <div
            className="testimonial-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="testimonial-modal-card">
              <div className="testimonial-avatar">
                <img src={activeTestimonial.image} alt={activeTestimonial.name} />
              </div>

              <h3 className="testimonial-name">
                {activeTestimonial.name}
              </h3>

              <div className="testimonial-stars">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>

              <p className="testimonial-text full-text">
                {activeTestimonial.text}
              </p>

              <button
                className="modal-close"
                onClick={() => setActiveTestimonial(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestimonialsSection;