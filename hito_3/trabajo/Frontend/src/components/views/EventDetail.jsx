import React, { useState, useEffect, useContext } from "react";
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

/* 
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { ENDPOINT } from "../../config/constans";

const EventDetail = ({ event, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    ticketPrice: "",
    ticketsAvailable: "",
    imgUrl: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        date: event.dateEvent
          ? new Date(event.dateEvent).toISOString().split("T")[0]
          : "",
        location: event.location || "",
        ticketPrice: event.ticketPrice || "",
        ticketsAvailable: event.ticketsAvailable || "",
        imgUrl: event.imgUrl || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pasar datos del formulario a la función onSave
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formDateEvent">
        <Form.Label>Fecha</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formLocation">
        <Form.Label>Ubicación</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formTicketPrice">
        <Form.Label>Precio del Boleto</Form.Label>
        <Form.Control
          type="number"
          name="ticketPrice"
          value={formData.ticketPrice}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formTicketsAvailable">
        <Form.Label>Boletos Disponibles</Form.Label>
        <Form.Control
          type="number"
          name="ticketsAvailable"
          value={formData.ticketsAvailable}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formImgUrl">
        <Form.Label>URL de la Imagen</Form.Label>
        <Form.Control
          type="text"
          name="imgUrl"
          value={formData.imgUrl}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Guardar Evento
      </Button>
    </Form>
  );
};

export default EventDetail; */
