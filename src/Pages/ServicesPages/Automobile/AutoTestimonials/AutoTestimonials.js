import React from 'react';
import TestimonialsSection from '../../Shared/TestimonialsSection/TestimonialsSection';

const AutoTestimonials = () => {
  const testimonials = [
    {
      name: 'Raj Kumar',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic1.png`,
      rating: 5,
      text: 'Exceptional automotive photography! They captured my car perfectly with professional lighting and angles. The final images exceeded my expectations.'
    },
    {
      name: 'Priya Singh',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic2.png`,
      rating: 5,
      text: 'Outstanding service for my luxury car shoot. The photographer understood exactly what I wanted and delivered stunning results. Highly recommend!'
    },
    {
      name: 'Amit Sharma',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic3.png`,
      rating: 5,
      text: 'Perfect car photography session. They made my vintage car look absolutely stunning. Professional service from start to finish!'
    }
  ];

  return <TestimonialsSection testimonials={testimonials} />;
};

export default AutoTestimonials;
