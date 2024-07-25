import React, { useState, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";
import { useNavigate } from "react-router-dom";
import { MarketplaceContext } from "../utils/MarketplaceProvider";


const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { logIn, userSession } = useContext(MarketplaceContext);

  useEffect(() => {
    if (userSession.isLoggedIn) {
      navigate("/profile/perfil", { replace: true });
    }
  }, [userSession.isLoggedIn, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      return window.alert("El formato del email no es correcto!");
    }

    if (!email || !password) {
      return window.alert("Por favor, ingresa tu correo y contraseña.");
    }

    logIn(email, password);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MyNavbar />
      <div className="container mt-5" style={{ flex: 1 }}>
        <h2>Ingresa a tu perfil</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresar correo registrado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="dark" type="submit" className="mt-3">Ingresar</Button>
        </Form>
      </div>
      <MyFooter />
    </div>
  );
};

export default Login;
