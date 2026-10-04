import React, { useState } from 'react';
import './Web-css/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance2 from './axiosInstance2';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword) {
      setPasswordsMatch(e.target.value === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordsMatch) {
      try {
        await axiosInstance2.post('/register', { username, email, password });
        navigate('/login');
      } catch (error) {
        console.error('Error registering:', error);
      }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register for Zenith</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={passwordsMatch ? '' : 'mismatch'}
            />
            {!passwordsMatch && <p className="error-text">Passwords do not match</p>}
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>
        <p className="toggle-text">
          Already have an account?
          <Link to="/login" className="login-link"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
