import React from 'react';
import FAQSection from '../../Shared/FAQSection/FAQSection';

const WeddingFAQ = () => {
    const faqs = [
        {
            id: 1,
            question: "Q1. Do you cover multi-day weddings?",
            answer: "Yes, we cover single-day and multi-day weddings."
        },
        {
            id: 2,
            question: "Q2. How early should we book?",
            answer: "We recommend booking as soon as your wedding dates are confirmed."
        },
        {
            id: 3,
            question: "Q3. When will we receive our photos?",
            answer: "Previews are shared early, with final delivery as scheduled."
        },
        {
            id: 4,
            question: "Q4. Do you offer albums and videos?",
            answer: "Yes, albums and cinematic videos are available as add-ons."
        },
        {
            id: 5,
            question: "Q5. Do you travel for destination weddings?",
            answer: "Yes, destination and outstation weddings are covered."
        }
    ];

    return <FAQSection faqs={faqs} />;
};

export default WeddingFAQ;
