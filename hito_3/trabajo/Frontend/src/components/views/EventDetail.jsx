import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { MarketplaceContext } from "../utils/MarketplaceProvider";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";
import { simulatedEvents } from "./Events";

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
    return <div>Cargando...</div>;
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
      <div
        className="container my-5 d-flex justify-content-center"
        style={{ flex: 1 }}
      >
        <div className="card p-4" style={{ width: "100%", maxWidth: "800px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h2>{event.title}</h2>
            <Image src={event.img_url} rounded fluid />
            <p>{event.description}</p>
            <p>
              <strong>Fecha:</strong> {event.date_event}
            </p>
            <p>
              <strong>Ubicación:</strong> {event.location}
            </p>
            <p>
              <strong>Precio del Boleto:</strong> {event.ticket_price} CLP
            </p>
            <p>
              <strong>Boletos Disponibles:</strong> {event.tickets_available}
            </p>
          </div>
          {isOwnEvent ? (
            <Button variant="primary" onClick={handleRedirectMyEvents}>
              Ver en Mis Eventos
            </Button>
          ) : (
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
              <div
                onClick={handleToggleFavorite}
                style={{ cursor: "pointer" }}
                className="ms-3"
              >
                {userSession.favs.some(
                  (fav) => fav.eventId === event.eventId
                ) ? (
                  <HeartFill size={30} color="red" />
                ) : (
                  <Heart size={30} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <MyFooter />
    </div>
  );
};

export default EventDetail;
