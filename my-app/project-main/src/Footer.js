import React from 'react';
import { Link } from 'react-router-dom';
import './Web-css/Footer.css';
import logo from './Web-img/logobgless2.png';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-row'>
        <div className='footer-col icon-and-description'>
          <img src={logo} alt='Zenith Icon' className='footer-icon' style={{width: "100px", height: "70px"}} />
          <p>Zenith provides cutting-edge cryptocurrency information, market analysis, portfolio management, and secure wallet services.</p>
        </div>

        <div className='footer-col'>
          <h3>Our Services</h3>
          <p><Link to='/'>Home</Link></p>
          <p><Link to='/about'>About Us</Link></p>
          <p><Link to='/contact'>Contact Us</Link></p>
          <p><Link to='/team'>Team</Link></p>
        </div>

        <div className='footer-col'>
          <h3>Contact Us</h3>
          <p>Phone number: 123456789</p>
          <p>Email: info@zenith.com</p>
        </div>

        <div className='footer-col'>
          <h3>Follow Us</h3>
          <p><a href='https://facebook.com'><i className='fa-brands fa-facebook'></i> Facebook</a></p>
          <p><a href='https://twitter.com'><i className='fa-brands fa-twitter'></i> Twitter</a></p>
          <p><a href='https://instagram.com'><i className='fa-brands fa-instagram'></i> Instagram</a></p>
          <p><a href='https://linkedin.com'><i className='fa-brands fa-linkedin'></i> LinkedIn</a></p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
