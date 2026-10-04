import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cryptocurrencies from './Cryptocurrencies';
import About from './About';
import Contact from './Contact';
import Header from './Header';
import Footer from './Footer';
import './Web-css/App.css';
import LoginForm from './LoginForm';
import Register from './Register';
import Ranking from './Ranking';
import CryptoDetail from './CryptoDetails';
import CryptoDetailPage from './CryptoDetailPage';
import News from './News';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="app">
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<CryptoDetail />} />
          <Route path="/details/:id" element={<CryptoDetailPage/>} />
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/news" element={<News />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
