import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './Web-css/CryptoDetail.css';

const CryptoDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(https://api.coingecko.com/api/v3/coins/${id});
        setCoin(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await axios.get(https://api.coingecko.com/api/v3/coins/${id}/market_chart, {
          params: {
            vs_currency: 'usd',
            days: '30'
          }
        });

        const prices = response.data.prices;
        setChartData({
          labels: prices.map(price => new Date(price[0]).toLocaleDateString()),
          datasets: [
            {
              label: ${id.toUpperCase()} Price,
              data: prices.map(price => price[1]),
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchCoinData();
    fetchChartData();
  }, [id]);

  if (!coin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="crypto-detail-container">
      <h2>{coin.name}</h2>
      <img src={coin.image.large} alt={coin.name} className="crypto-detail-logo" />
      <p>Symbol: {coin.symbol}</p>
      <p>Current Price: ${coin.market_data.current_price.usd}</p>
      <p>Market Cap: ${coin.market_data.market_cap.usd}</p>
      <p>24h High: ${coin.market_data.high_24h.usd}</p>
      <p>24h Low: ${coin.market_data.low_24h.usd}</p>
      <div className="crypto-detail-description" dangerouslySetInnerHTML={{ __html: coin.description.en }} />
      <div className="crypto-detail-chart">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default CryptoDetail;