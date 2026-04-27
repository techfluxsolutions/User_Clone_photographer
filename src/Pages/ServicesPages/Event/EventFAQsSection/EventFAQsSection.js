import FAQSection from "../../Shared/FAQSection/FAQSection";



const EventFAQsSection = () => {

    const faqs = [
        {
            id: 1,
            question: "Q1. What types of events do you cover?",
            answer: "We cover birthdays, parties, corporate events, and private gatherings."
        },
        {
            id: 2,
            question: "Q2. Is hourly booking available?",
            answer: "Yes, event shoots are booked on an hourly basis."
        },
        {
            id: 3,
            question: "Q3. How many photos will we receive?",
            answer: "The count depends on event duration and coverage."
        },
        {
            id: 4,
            question: "Q4. When will we get the photos?",
            answer: "Early previews followed by final delivery."
        },
        {
            id: 5,
            question: "Q5. Can last-minute bookings be accommodated?",
            answer: "Subject to availability, yes."
        }
    ];




    return <FAQSection faqs={faqs} />;

};

export default EventFAQsSection;
