import React from "react";
import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const MyNavbar = () => {
  return (
    <Navbar
      bg="white"
      expand="lg"
      style={{ borderBottom: "1px solid #ccc", height: "120px" }}
    >
      <Container fluid>
        <Row className="w-100 align-items-center">
          <Col xs="auto">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <NavDropdown title="Menú" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/">
                    Home
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/events">
                    Catálogo de eventos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/login">
                    Iniciar sesión
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup">
                    Registrarme
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/about">
                    Acerca de
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/contact">
                    Contacto
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
          <Col className="text-center">
            <Navbar.Brand as={Link} to="/" className="mx-auto">
              <img
                src={logo}
                alt="Music Logo"
                style={{
                  height: "60px",
                  width: "auto",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              />
            </Navbar.Brand>
          </Col>
          <Col xs="auto"></Col> {/* Columna vacía para mantener el layout */}
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
