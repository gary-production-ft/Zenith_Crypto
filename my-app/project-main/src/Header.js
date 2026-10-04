import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Web-css/Header.css';
import logo from './Web-img/logobgless2.png';

const Header = ({ user, setUser }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img alt='weblogo' src={logo} style={{width: "100px", height: "70px"}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/cryptocurrencies">Cryptocurrencies</Nav.Link>
            <Nav.Link as={Link} to="/ranking">Ranking</Nav.Link>
            <Nav.Link as={Link} to="/details">Details</Nav.Link>
            <Nav.Link as={Link} to="/news">News</Nav.Link>
          </Nav>
          <div className="ms-auto d-flex align-items-center">
            <Button 
              variant={darkMode ? "outline-light" : "outline-dark"} 
              onClick={toggleDarkMode} 
              className="me-2 dark-mode-toggle"
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </Button>
            {user ? (
              <div className="user-panel">
                <span className="button-85 me-3 ms-3" >{user.username}</span>
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <Link to="/login">
                <button className="button-85 ms-3">
                  Login / Sign Up
                </button>
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
