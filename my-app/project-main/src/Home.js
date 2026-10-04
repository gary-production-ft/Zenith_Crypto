import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import './Web-css/Home.css';
import './Web-css/HeroSection.css';
import Bitcoin from './Web-img/Bitcoin.png';
import Ethereum from './Web-img/Ethereum.png';
import Litecoin from './Web-img/Litecoin.webp';

function Home() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalVolume: 0,
    marketCap: 0,
    Bitcoin: 0,
    Ethereum: 0,
    Litecoin: 0
  });

  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/global');
        const data = res.data.data;
        setStats({
          totalUsers: data.active_cryptocurrencies,
          totalTransactions: data.markets,
          totalVolume: data.total_volume.usd,
          marketCap: data.total_market_cap.usd,
          Bitcoin: data.total_market_cap.btc,
          Ethereum: data.total_market_cap.eth,
          Litecoin: data.total_market_cap.ltc
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchCryptos = async () => {
      try {
        const res = await axiosInstance.get('/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 25,
            page: 1,
            sparkline: false,
          },
          retry: 3,
          retryDelay: 2000,
        });
        setCryptos(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStats();
    fetchCryptos();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectCrypto = (crypto) => {
    navigate(`/details/${crypto.id}`);
  };

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatNumber = (number) => {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + 'B';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + 'M';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + 'K';
    } else {
        return number.toLocaleString();
    }
};

  return (
    <div className="home">
      <div className="hero-section">
        <div className="banner">
          <h1>Welcome to Zenith</h1>
          <p>Your one-stop destination for all things cryptocurrency</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a cryptocurrency..."
              value={search}
              onChange={handleSearch}
              className='searchbar'
            />
            <button>Search</button>
            {search && (
              <div className="search-suggestions">
                {filteredCryptos.map(crypto => (
                  <div
                    key={crypto.id}
                    className="suggestion-item"
                    onClick={() => handleSelectCrypto(crypto)}
                  >
                    <img src={crypto.image} alt={crypto.name} className="suggestion-icon" />
                    {crypto.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="stats-container">
        <h2>Overall Statistics</h2>
        <div className="stats">
          <div className="stat-item" style={{width: "20%"}}>
            <h3>Total Cryptocurrencies</h3>
            <p>{formatNumber(stats.totalUsers)}</p>
          </div>
          <div className="stat-item">
            <h3>Total Markets</h3>
            <p>{formatNumber(stats.totalTransactions)}</p>
          </div>
          <div className="stat-item">
            <h3>Total Volume (USD)</h3>
            <p>{formatNumber(stats.totalVolume)}</p>
          </div>
          <div className="stat-item">
            <h3>Total Market Cap (USD)</h3>
            <p>{formatNumber(stats.marketCap)}</p>
          </div>
        </div>
      </div>
      <div className="featured-section">
        <h2>Featured Cryptocurrencies</h2>
        <div className="featured-cryptos">
          <div className="crypto-item">
            <img src={Bitcoin} alt="Bitcoin" />
            <h4>Bitcoin <br></br>{formatNumber(stats.Bitcoin)}</h4>
          </div>
          <div className="crypto-item">
            <img src={Ethereum} alt="Ethereum" />
            <h4>Ethereum<br></br>{formatNumber(stats.Ethereum)}</h4>
          </div>
          <div className="crypto-item">
            <img src={Litecoin} alt="Litecoin" />
            <h4>Litecoin<br></br>{formatNumber(stats.Litecoin)}</h4>
          </div>
        </div>
      </div>
      <div className="services-section">
  <h2>Our Services</h2>
      <div className="services">
          <div className="service">
            <h3>Real-Time Market Data</h3>
            <p>Get the latest updates on cryptocurrency prices and market trends.</p>
          </div>
          <div className="service">
            <h3>Portfolio Management</h3>
            <p>Track and manage your cryptocurrency investments with ease.</p>
          </div>
          <div className="service">
            <h3>Secure Wallet Services</h3>
            <p>Keep your digital assets safe with our robust security measures.</p>
          </div>
          <div className="service">
            <h3>Market Analysis and Insights</h3>
            <p>Gain valuable insights with our in-depth market analysis and reports.</p>
          </div>
          <div className="service">
            <h3>News and Updates</h3>
            <p>Stay informed with the latest news and developments in the cryptocurrency world.</p>
          </div>
      </div>
    </div>
      <div className="cta-section">
        <h2>Start Your Journey</h2>
        <p>Join us today and stay ahead in the crypto market.</p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
}

export default Home;
