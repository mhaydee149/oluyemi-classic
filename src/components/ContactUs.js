import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any inquiries, feel free to reach out to us:</p>
      <ul>
        <li>Email: <a href="mailto:support@oluyemiclassic.com">support@oluyemiclassic.com</a></li>
        <li>Phone/Whatsapp: +234 123 456 7890</li>
        <li>Address: 61/63 University Road Tanke, Ilorin, Kwara, Nigeria</li>
      </ul>
      <h3>Follow Us</h3>
      <p>Stay connected with us on social media:</p>
      <ul>
        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a></li>
      </ul>
    </div>
  );
};

export default ContactUs;
