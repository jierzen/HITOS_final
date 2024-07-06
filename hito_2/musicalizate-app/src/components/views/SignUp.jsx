import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import MyNavbar from "../utils/MyNavbar";

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Name:', name, 'Email:', email, 'Password:', password, 'Age:', age);
  };

  return (
    <div className="container mt-5">
      <MyNavbar />
      <h2>Registrar Usuario</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="ingresar @"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="ingresar contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAge" className="mt-3">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            placeholder="ingrese su edad"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Registrar
        </Button>
      </Form>
    </div>
  );
};


export default SignUp;