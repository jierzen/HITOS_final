import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, Row, Col, Image, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MarketplaceContext } from '../utils/MarketplaceProvider';
import logo from "../../assets/logo.png";
import cartIcon from "../../assets/cart-icon.png";

const MyNavbar = () => {
  const { userSession, handleLogOut } = useContext(MarketplaceContext);
  const cartCount = userSession.cart.length;

  return (
    <Navbar bg="white" expand="lg" style={{ borderBottom: "1px solid #ccc", height: "120px" }}>
      <Container fluid>
        <Row className="w-100 align-items-center">
          <Col xs="auto">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <NavDropdown title="Menú" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/events">Catálogo de eventos</NavDropdown.Item>
                  {!userSession.isLoggedIn && (
                    <>
                      <NavDropdown.Item as={Link} to="/login">Iniciar sesión</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/signup">Registrarme</NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Item as={Link} to="/about">Acerca de</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/contact">Contacto</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
          <Col className="text-center">
            <Navbar.Brand as={Link} to="/" className="mx-auto">
              <img
                src={logo}
                alt="Music Logo"
                style={{ height: "60px", width: "auto", marginTop: "20px", marginBottom: "10px" }}
              />
            </Navbar.Brand>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            {userSession.isLoggedIn ? (
              <>
                <Link to="/cart" className="position-relative me-3">
                  <Image src={cartIcon} roundedCircle width={30} height={30} />
                  {cartCount > 0 && (
                    <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
                <Image
                  src={userSession.picture}
                  roundedCircle
                  width={40}
                  height={40}
                  className="me-2"
                />
                <NavDropdown title={userSession.username} id="user-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogOut}>Cerrar sesión</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Link to="/cart" className="position-relative me-3">
                <Image src={cartIcon} roundedCircle width={30} height={30} />
                {cartCount > 0 && (
                  <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </Badge>
                )}
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
