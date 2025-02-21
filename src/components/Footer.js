import React from 'react';
import './Footer.css';
import { FaFacebook, FaWhatsapp, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Oluyemi Classic IT.</p> 
      <p>Powered by MhaydeeTech.</p> 
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
      </div>
    </footer>
  );
};

export default Footer;
