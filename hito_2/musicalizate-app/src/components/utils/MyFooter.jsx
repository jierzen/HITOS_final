import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "white",
        color: "#333",
        padding: "20px 0",
        position: "fixed",
        bottom: "0",
        width: "100%",
        borderTop: "1px solid #ccc",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Link
              to="/about"
              style={{
                color: "black",
                textDecoration: "none",
                margin: "0 10px",
              }}
            >
              Acerca de
            </Link>
            <Link
              to="/contact"
              style={{
                color: "black",
                textDecoration: "none",
                margin: "0 10px",
              }}
            >
              Contacto
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
