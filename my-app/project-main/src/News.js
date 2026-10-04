import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Web-css/News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(12);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        const response = await axios.get(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${apiKey}`);
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="news-container">
      <h2>Latest Cryptocurrency News</h2>
      <div className="news-grid">
        {currentNews.map((article, index) => (
          <div key={index} className="news-item">
            <img src={article.urlToImage} alt={article.title} className="news-image" />
            <div className="news-overlay">
              <h3>{article.title}</h3>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        newsPerPage={newsPerPage}
        totalNews={news.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ newsPerPage, totalNews, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default News;
