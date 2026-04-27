import React from 'react';
import TestimonialsSection from '../../Shared/TestimonialsSection/TestimonialsSection';

const WeddingTestimonials = () => {
  const testimonials = [
    {
      name: 'Neha & Rohan',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic1.png`,
      rating: 5,
      text: 'Our wedding photos are absolutely breathtaking! They captured every emotion and moment perfectly. Thank you for making our special day unforgettable.'
    },
    {
      name: 'Anjali Verma',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic2.png`,
      rating: 5,
      text: 'The best decision we made for our wedding! Professional, creative, and so patient with all our requests. The photos are pure magic!'
    },
    {
      name: 'Karan & Simran',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic3.png`,
      rating: 5,
      text: 'Incredible wedding photography! Every shot tells our love story beautifully. Worth every penny and more. Highly recommended for your big day!'
    }
  ];

  return <TestimonialsSection testimonials={testimonials} />;
};

export default WeddingTestimonials;
