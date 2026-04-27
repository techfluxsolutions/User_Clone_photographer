import React from 'react';
import FAQSection from '../../Shared/FAQSection/FAQSection';

const CorporateFAQ = () => {
    const faqs = [
        {
            id: 1,
            question: "Q1. Do you provide GST invoices?",
            answer: "Yes, GST-compliant invoices are provided."
        },
        {
            id: 2,
            question: "Q2. Can you cover large corporate events?",
            answer: "Yes, we handle conferences, launches, and multi-day events."
        },
        {
            id: 3,
            question: "Q3. Will the photos match our brand style?",
            answer: "Yes, brand guidelines are followed."
        },
        {
            id: 4,
            question: "Q4. How are the images delivered?",
            answer: "Secure delivery via private cloud storage."
        },
        {
            id: 5,
            question: "Q5. Can we book the same photographer again?",
            answer: "Yes, subject to availability."
        }
    ];

    return <FAQSection faqs={faqs} />;
};

export default CorporateFAQ;
