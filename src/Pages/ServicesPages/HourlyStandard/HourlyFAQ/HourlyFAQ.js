import React from 'react';
import FAQSection from '../../Shared/FAQSection/FAQSection';

const HourlyFAQ = () => {
    const faqs = [
        {
            id: 1,
            question: "Q1. What is the minimum booking duration?",
            answer: "The minimum booking duration for standard hourly shoots is 1 hour."
        },
        {
            id: 2,
            question: "Q2. Will I receive all the unedited/raw files?",
            answer: "Yes, we provide all raw files along with your selected edited photos."
        },
        {
            id: 3,
            question: "Q3. Can I extend the booking on the day of the event?",
            answer: "Yes, you can extend the booking duration subject to the photographer's availability and additional hourly charges."
        },
        {
            id: 4,
            question: "Q4. How quickly will I get my final photos and videos?",
            answer: "Our standard delivery time is between 48 to 72 hours via a secure cloud link."
        },
        {
            id: 5,
            question: "Q5. Are travel and equipment costs included in the hourly rate?",
            answer: "Local travel and standard equipment are included. Any specialized equipment or outstation travel may incur additional charges."
        }
    ];

    return <FAQSection faqs={faqs} />;
};

export default HourlyFAQ;
