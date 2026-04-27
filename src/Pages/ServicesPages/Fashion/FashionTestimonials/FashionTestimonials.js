import React from 'react';
import TestimonialsSection from '../../Shared/TestimonialsSection/TestimonialsSection';

const FashionTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      rating: 5,
      text: "The fashion shoot exceeded all my expectations! The photographer captured my vision perfectly and the final images are absolutely stunning.",
      image: "/asset/landing-page/pic1.png"
    },
    {
      name: "Emily Chen",
      rating: 5,
      text: "Professional, creative, and incredibly talented. They made me feel comfortable throughout the entire shoot and delivered breathtaking results.",
      image: "/asset/landing-page/pic2.png"
    },
    {
      name: "Jessica Rodriguez",
      rating: 5,
      text: "Amazing experience from start to finish! The attention to detail and creative direction made all the difference. Highly recommend!",
      image: "/asset/landing-page/pic3.png"
    }
  ];

  return <TestimonialsSection testimonials={testimonials} />;
};

export default FashionTestimonials;
