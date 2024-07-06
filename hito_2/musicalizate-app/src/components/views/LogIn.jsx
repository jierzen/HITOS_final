import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import MyNavbar from "../utils/MyNavbar";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="container mt-5">
      <MyNavbar />
      <h2>Ingreso al Portal</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresar Correo registrado"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="minimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Ingresar
        </Button>
      </Form>
    </div>
  );
};

export default Login;