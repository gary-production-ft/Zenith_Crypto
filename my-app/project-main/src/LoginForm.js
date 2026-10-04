import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Modal, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axiosInstance2 from './axiosInstance2';
import './Web-css/LoginForm.css';

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const res = await axiosInstance2.post('/login', { email, password });
        if (res.data.success) {
          setUser(res.data.user);
          navigate('/');
        } else {
          setModalMessage(res.data.msg);
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setModalMessage('User not found...');
        setShowModal(true);
      }
    }
    setValidated(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="login-form-container">
      <Row className="justify-content-md-center">
        <Col md={6} className="login-form-box">
          <h2 className="text-center mb-4">Login to Zenith</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text onClick={toggleShowPassword}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  Please provide a password.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <Link to="/register" className="register-link">
              Register
            </Link>
          </div>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" className="register-btn" onClick={() => navigate('/register')}>
            Register Now
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LoginForm;
