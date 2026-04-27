import React from 'react';
import TestimonialsSection from '../../Shared/TestimonialsSection/TestimonialsSection';

const FoodTestimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic1.png`,
      rating: 5,
      text: 'Amazing food photography! They made our menu items look absolutely delicious. The lighting and styling were perfect. Our online orders increased significantly!'
    },
    {
      name: 'Chef Marco',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic2.png`,
      rating: 5,
      text: 'Professional food photography that truly captures the essence of our dishes. The photographer understood our vision and delivered stunning results. Highly recommend!'
    },
    {
      name: 'Priya Patel',
      image: `${process.env.PUBLIC_URL}/asset/landing-page/pic3.png`,
      rating: 5,
      text: 'Exceptional service for our restaurant photoshoot. The images are mouth-watering and perfectly showcase our culinary creations. Worth every penny!'
    }
  ];

  return <TestimonialsSection testimonials={testimonials} />;
};

export default FoodTestimonials;
