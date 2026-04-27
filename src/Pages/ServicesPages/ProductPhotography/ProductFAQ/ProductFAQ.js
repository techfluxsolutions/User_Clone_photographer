import React from 'react';
import FAQSection from '../../Shared/FAQSection/FAQSection';

const ProductFAQ = () => {
    const faqs = [
        {
            id: 1,
            question: "Q1. Do you shoot e-commerce and lifestyle product photos?",
            answer: "Yes, we cover both white-background and lifestyle shots."
        },
        {
            id: 2,
            question: "Q2. Can products be shipped to the photographer?",
            answer: "Yes, products can be shipped or shot on location."
        },
        {
            id: 3,
            question: "Q3. Are images platform-ready (Amazon, website, ads)?",
            answer: "Yes, images are optimized for web, e-commerce, and marketing use."
        },
        {
            id: 4,
            question: "Q4. How many products can be shot in one session?",
            answer: "This depends on the product type and shoot duration."
        },
        {
            id: 5,
            question: "Q5. Do you offer retouching and editing?",
            answer: "Yes, professional editing and retouching are included."
        }
    ];

    return <FAQSection faqs={faqs} />;
};

export default ProductFAQ;
