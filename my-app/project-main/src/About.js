import React from 'react';
import './Web-css/About.css';

function About() {
  return (
    <div className="about-section">
    <h2>About Us</h2>
    <p>Learn about the features and services we offer to help you navigate the cryptocurrency market.</p>
    <div className="about-content">
      <div className="about-item">
        <h3>Market Data</h3>
        <p>Get real-time market data for top cryptocurrencies.</p>
      </div>
      <div className="about-item">
        <h3>News</h3>
        <p>Stay updated with the latest news in the crypto world.</p>
      </div>
      <div className="about-item">
        <h3>Price Alerts</h3>
        <p>Set price alerts for your favorite cryptocurrencies.</p>
      </div>
    </div>
  </div>
  );
}

export default About;
