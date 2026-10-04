import React from 'react';
import './Web-css/HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="banner">
        <h1>Welcome to Zenith</h1>
        <p>Your one-stop destination for all things cryptocurrency</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for a cryptocurrency..." />
          <button>Search</button>
        </div>
      </div>
      <div className="trending-coins">
        <h2>Trending Coins</h2>
        <ul>
          <li>Bitcoin</li>
          <li>Ethereum</li>
          <li>Litecoin</li>
        </ul>
      </div>
    </div>
  );
}

export default HeroSection;
