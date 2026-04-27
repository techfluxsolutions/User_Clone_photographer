// import React, { useState } from 'react';
// import './NewsletterSection.css';

// const NewsletterSection = () => {
//   const [email, setEmail] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Email submitted:', email);
//     // Add newsletter subscription logic here
//     setEmail('');
//   };

//   return (
//     <section className="newsletter-section">
//       <div className="newsletter-content">
//         <h2 className="newsletter-title">Subscribe to our emails</h2>
//         <p className="newsletter-subtitle">
//           Subscribe to our mailing list for insider news, product launches, and more.
//         </p>
//         <form className="newsletter-form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             className="newsletter-input"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="submit" className="newsletter-submit" aria-label="Subscribe">
//             →
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default NewsletterSection;


import React, { useState } from "react";
import "./NewsletterSection.css";
import CommonMessageModal from "../../CommonMessageModal/CommonMessageModal";
import { postSubscribers } from "../../../utils/APIs/landingPageApis";
import Loader from "../../../Template/Loader/Loader";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = { email };
      const response = await postSubscribers(payload);

      // Show only response message
      setMessage(response?.data?.message || "Subscribed successfully");
      setShowMessage(true);
      setEmail("");
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Subscribe to our emails</h2>
          <p className="newsletter-subtitle">
            Subscribe to our mailing list for insider news, product launches, and more.
          </p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-submit" aria-label="Subscribe">
              →
            </button>
          </form>
        </div>
      </section>

      <CommonMessageModal
        show={showMessage}
        onClose={() => setShowMessage(false)}
        message={message}
        buttonText="Okay"
      />
    </>
  );
};

export default NewsletterSection;
