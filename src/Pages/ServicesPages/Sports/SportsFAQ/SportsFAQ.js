import React from 'react';
import FAQSection from '../../Shared/FAQSection/FAQSection';

const SportsFAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Q1. Do you cover tournaments and practice sessions?",
      answer: "Yes, we cover matches, tournaments, and training sessions."
    },
    {
      id: 2,
      question: "Q2. Can you capture action and candid moments?",
      answer: "Yes, action shots and candid moments are a key focus."
    },
    {
      id: 3,
      question: "Q3. Is permission required for venue shoots?",
      answer: "Venue permissions are usually arranged by the client."
    },
    {
      id: 4,
      question: "Q4. How fast is the photo delivery?",
      answer: "Previews are shared quickly, with full delivery after selection."
    },
    {
      id: 5,
      question: "Q5. Can teams or players request specific shots?",
      answer: "Yes, shot preferences can be discussed in advance."
    }
  ];

  return <FAQSection faqs={faqs} />;
};

export default SportsFAQ;
