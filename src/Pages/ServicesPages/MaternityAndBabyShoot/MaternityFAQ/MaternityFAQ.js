import React from 'react';
import FAQSection from '../../Shared/FAQSection/FAQSection';

const MaternityFAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Q1. Best time for maternity shoot?",
      answer: "28–34 weeks of pregnancy."
    },
    {
      id: 2,
      question: "Q2. When to do newborn photography?",
      answer: "Within 5–20 days after birth."
    },
    {
      id: 3,
      question: "Q3. Is it safe for babies?",
      answer: "Yes, all shoots follow baby-safe practices."
    },
  ];

  return <FAQSection faqs={faqs} />;
};

export default MaternityFAQ;
