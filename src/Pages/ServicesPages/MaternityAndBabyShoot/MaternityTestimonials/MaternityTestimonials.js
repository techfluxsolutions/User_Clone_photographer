import React from 'react';
import TestimonialsSection from '../../Shared/TestimonialsSection/TestimonialsSection';

const MaternityTestimonials = () => {
  const testimonials = [
    {
      name: 'Priya & Amit',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic1.png`,
      rating: 5,
      text: 'The most comfortable and beautiful photoshoot experience! They made me feel so special and captured my bump perfectly.'
    },
    {
      name: 'Sneha Gupta',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic2.png`,
      rating: 5,
      text: 'I was nervous about posing, but the team was so gentle and professional. The final photos brought tears to my eyes. Absolutely magical!'
    },
    {
      name: 'Rahul & Meera',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic3.png`,
      rating: 5,
      text: 'Such a precious memory for us. The attention to detail and creative concepts for our maternity shoot were outstanding. Thank you, Veroa!'
    }
  ];

  return <TestimonialsSection testimonials={testimonials} />;
};

export default MaternityTestimonials;
