import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { MarketplaceContext } from "../utils/MarketplaceProvider";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";
import { simulatedEvents } from "./Events";
import RegisterEventForm from "../utils/RegisterEventForm";

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { userSession, addToCart, addFav } = useContext(MarketplaceContext);
  const [event, setEvent] = useState({});
  const [isOwnEvent, setIsOwnEvent] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundEvent =
      userSession.events.find((evt) => evt.eventId === parseInt(eventId)) ||
      simulatedEvents.find((evt) => evt.eventId === parseInt(eventId));
    if (foundEvent) {
      setEvent(foundEvent);
      setIsOwnEvent(
        userSession.events.some((evt) => evt.eventId === foundEvent.eventId)
      );
    }
  }, [eventId, userSession.events]);

  const handleToggleFavorite = () => {
    addFav(event);
  };

  const handleAddToCart = () => {
    addToCart({ ...event, quantity });
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1 && newQuantity <= 4) {
      setQuantity(newQuantity);
    }
  };

  const handleRedirectMyEvents = () => {
    navigate("/profile/events");
  };

  if (!event.eventId) {
    return <RegisterEventForm />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <MyNavbar />
      <div className="container mt-5" style={{ flex: 1 }}>
        <Card style={{ position: "relative", margin: "10px" }}>
          <div
            onClick={handleToggleFavorite}
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              cursor: "pointer",
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "10px",
            }}
          >
            {userSession.favs.some((fav) => fav.eventId === event.eventId) ? (
              <HeartFill size={30} color="red" />
            ) : (
              <Heart size={30} />
            )}
          </div>

          <Card.Img
            variant="top"
            src={event.imgUrl}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "30px",
              padding: "20px",
            }}
          />
          <Card.Body>
            <Card.Title>
              <strong>{event.title}</strong>
            </Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <p>
              <strong>Fecha:</strong> {event.dateEvent}
            </p>
            <p>
              <strong>Ubicación:</strong> {event.location}
            </p>
            <p>
              <strong>Precio del Boleto:</strong> {event.ticketPrice} CLP
            </p>
            <p>
              <strong>Boletos Disponibles:</strong> {event.ticketsAvailable}
            </p>
            {isOwnEvent ? (
              <Button variant="primary" onClick={handleRedirectMyEvents}>
                Ver en Mis Eventos
              </Button>
            ) : (
              <>
                <div className="d-flex align-items-center mb-3">
                  <Button variant="success" onClick={handleAddToCart}>
                    Agregar al Carrito
                  </Button>
                  <Form.Control
                    type="number"
                    min="1"
                    max="4"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="ms-3"
                    style={{ width: "60px" }}
                  />
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
      <MyFooter />
    </div>
  );
};

export default EventDetail;
