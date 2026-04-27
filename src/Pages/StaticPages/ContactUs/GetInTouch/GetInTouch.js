import React from 'react'
import { FaEnvelope } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function GetInTouch() {
  return (
    <>
    <div className="contactUs-touch-card">
               <h2 className="contactUs-touch-title">Get in Touch</h2>
   
               <div className="contactUs-touch-row">
                 <div className="contact-touch-section">
                   <FaWhatsapp className="contact-icon-svg whatsapp-icon" />
                   <span className="contact-text">+91 87409 50336</span>
                 </div>
   
                 <div className="contact-divider-vert"></div>
   
                 <div className="contact-touch-section">
                   <FaEnvelope className="contact-icon-svg" />
                   <span className="contact-text">hello@veroastudioz.com</span>
                 </div>
               </div>
             </div>
             </>
  )
}

export default GetInTouch



