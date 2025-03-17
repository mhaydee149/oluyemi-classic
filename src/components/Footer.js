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
        <a href="https://wa.me/2348102841046" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        <a href="https://www.instagram.com/oluyemi_classic.i.t?igsh=dTh1d3h1ZXo1MmN3" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
      </div>
    </footer>
  );
};

export default Footer;
