import React from 'react';
import TestimonialsSection from '../../Shared/TestimonialsSection/TestimonialsSection';

const SportsTestimonials = () => {
  const testimonials = [
    {
      name: 'Coach Michael',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic1.png`,
      rating: 5,
      text: 'Outstanding sports photography! They captured every crucial moment of our championship game. The action shots are incredible and the team photos are perfect!'
    },
    {
      name: 'Alex Thompson',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic2.png`,
      rating: 5,
      text: 'Professional sports photographer who knows how to freeze the action. The images from our tournament are stunning and really showcase the intensity of the game!'
    },
    {
      name: 'Jessica Martinez',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic3.png`,
      rating: 5,
      text: 'Exceptional work capturing our sports events! Fast delivery, great quality, and they understood exactly what we needed. Highly recommend for any sports photography!'
    }
  ];

  return <TestimonialsSection testimonials={testimonials} />;
};

export default SportsTestimonials;
