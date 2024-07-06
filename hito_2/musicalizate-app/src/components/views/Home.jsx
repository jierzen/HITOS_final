import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";
import homeImg from "../../assets/home-img.png";

function Home() {
  return (
    <div>
      <MyNavbar />
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "calc(100vh - 56px - 56px)" }}
      >
        <Row className="align-items-center w-100">
          <Col xs={12} md={5} className="text-center mb-4 mb-md-0">
            <img
              src={homeImg}
              alt="Home"
              className="img-fluid"
              style={{ maxWidth: "90%" }}
            />
          </Col>
          <Col xs={12} md={6} className="text-md-left">
            <div className="p-4">
              <h1>Bienvenido a Musicalizate</h1>
              <p>
                Aquí encontrarás las mejores bandas y eventos musicales del
                país. Descubre nuevas experiencias y siente el poder del rock.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <MyFooter />
    </div>
  );
}

export default Home;
