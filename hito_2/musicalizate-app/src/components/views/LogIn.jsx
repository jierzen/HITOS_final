import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div>
      <MyNavbar />
      <div className="container mt-5">
        <h2>Ingresa tu perfil</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresar correo registrado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="dark" type="submit" className="mt-3">
            Ingresar
          </Button>
        </Form>
      </div>
      <MyFooter />
    </div>
  );
};

export default Login;
