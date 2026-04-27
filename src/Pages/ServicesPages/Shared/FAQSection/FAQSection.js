import React, { useState } from 'react';
import './FAQSection.css';

const FAQSection = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    // const [searchQuery, setSearchQuery] = useState('');

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

export default FAQSection;
