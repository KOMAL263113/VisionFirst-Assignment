import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      console.log('Logged in successfully');
    } catch (err) {
      console.error('Error logging in:', err.response?.data || err);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Login</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                name="username" 
                value={username} 
                onChange={onChange} 
                placeholder="Enter username" 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                value={password} 
                onChange={onChange} 
                placeholder="Enter password" 
                required 
              />
            </Form.Group>

            <Button variant="primary" type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
