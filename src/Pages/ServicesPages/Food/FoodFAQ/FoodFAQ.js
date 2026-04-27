import React from 'react';
import FAQSection from '../../Shared/FAQSection/FAQSection';

const FoodFAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Q1. Do you shoot for restaurants and food brands?",
      answer: "Yes, we work with restaurants, cafes, cloud kitchens, and food brands."
    },
    {
      id: 2,
      question: "Q2. Can the shoot be done at our location?",
      answer: "Yes, shoots can be done at your restaurant, kitchen, or studio."
    },
    {
      id: 3,
      question: "Q3. Will you style the food or only photograph it?",
      answer: "Basic food styling is included; advanced styling can be arranged if needed."
    },
    {
      id: 4,
      question: "Q4. How long does a typical food shoot take?",
      answer: "Most food shoots are completed within a few hours."
    },
    {
      id: 5,
      question: "Q5. When will we receive the final images?",
      answer: "Previews are shared early, followed by final edited images."
    }
  ];

  return <FAQSection faqs={faqs} />;
};

export default FoodFAQ;
