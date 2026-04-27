import React from 'react';
import FAQSection from '../../Shared/FAQSection/FAQSection';

const FashionFAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Q1. Do you shoot for brands, models, and designers?",
      answer: "Yes, we work with fashion brands, designers, models, and agencies."
    },
    {
      id: 2,
      question: "Q2. Can you help with concepts and poses?",
      answer: "Yes, our photographers guide concepts, poses, and angles."
    },
    {
      id: 3,
      question: "Q3. Is studio or outdoor shooting available?",
      answer: "Both studio and outdoor shoots are available."
    },
    {
      id: 4,
      question: "Q4. Can multiple outfits be covered in one shoot?",
      answer: "Yes, depending on time and shoot duration."
    },
    {
      id: 5,
      question: "Q5. How are the photos delivered?",
      answer: "Images are delivered digitally via private cloud storage."
    }
  ];

  return <FAQSection faqs={faqs} />;
};

export default FashionFAQ;
