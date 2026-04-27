import React, { useState } from 'react';
import './AutoFAQ.css';

const AutoFAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    // const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            id: 1,
            question: "Q1. Do you shoot cars, bikes, and commercial vehicles?",
            answer: "Yes, we cover all types of automobiles."
        },
        {
            id: 2,
            question: "Q2. Are outdoor and studio shoots available?",
            answer: "Yes, depending on the visual requirement."
        },
        {
            id: 3,
            question: "Q3. Can you shoot for ads and social media?",
            answer: "Yes, images and videos are suitable for ads, websites, and social platforms."
        },
        {
            id: 4,
            question: "Q4. How long does an automobile shoot take?",
            answer: "Typically a few hours, depending on the vehicle and setup."
        },
        {
            id: 5,
            question: "Q5. Will the images be professionally edited?",
            answer: "Yes, all images go through professional post-production."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // const filteredFaqs = faqs.filter(faq => 
    //     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    return (
        <div className="auto-faq-section">
            <div className="faq-container">
                <h2 className="faq-title">FREQUENTLY ASKED QUESTIONS</h2>
                
                {/* <div className="faq-search-wrapper">
                    <input 
                        type="text" 
                        className="faq-search-input" 
                        placeholder="Search Questions" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img src="/asset/ServicePages/Automotive/search.png" alt="Search" className="faq-search-icon" />
                </div> */}

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div 
                            key={faq.id} 
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className="faq-question-header">
                                <h3 className="faq-question-text">{faq.question}</h3>
                                <img src="/asset/ServicePages/Automotive/dropdown.png" alt="Toggle" className="faq-toggle-icon" />
                            </div>
                            <div className="faq-answer">
                                <p className="faq-answer-text">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AutoFAQ;
