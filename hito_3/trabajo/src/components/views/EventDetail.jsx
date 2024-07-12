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
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateEvent, setDateEvent] = useState('');
    const [location, setLocation] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [ticketsAvailable, setTicketsAvailable] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Title:', title);
      console.log('Description:', description);
      console.log('Date:', dateEvent);
      console.log('Location:', location);
      console.log('Ticket Price:', ticketPrice);
      console.log('Image URL:', imgUrl);
      console.log('Tickets Available:', ticketsAvailable);
    };
  
    return (
      <div className="container mt-5">
        <h2>Registrar un Evento</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Título del Evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Indicar el título del evento"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Describa el evento"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group controlId="formDateEvent">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={dateEvent}
              onChange={(e) => setDateEvent(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group controlId="formLocation">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar dirección"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group controlId="formTicketPrice">
            <Form.Label>Precio del Boleto</Form.Label>
            <Form.Control
              type="number"
              placeholder="Indicar el precio del boleto"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group controlId="formImgUrl">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar URL de la imagen"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group controlId="formTicketsAvailable">
            <Form.Label>Boletos Disponibles</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad de boletos disponibles"
              value={ticketsAvailable}
              onChange={(e) => setTicketsAvailable(e.target.value)}
            />
          </Form.Group>
  
          <Button variant="primary" type="submit" className="mt-3">
            Registrar Evento
          </Button>
        </Form>
      </div>
    );
  };

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
        <h2>{event.title}</h2>
        <Image src={event.imgUrl} rounded fluid />
        <p>{event.description}</p>
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
          <>
            <Button variant="primary" onClick={handleRedirectMyEvents}>
              Ver en Mis Eventos
            </Button>
          </>
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
            <div onClick={handleToggleFavorite} style={{ cursor: "pointer" }}>
              {userSession.favs.some((fav) => fav.eventId === event.eventId) ? (
                <HeartFill size={30} color="red" />
              ) : (
                <Heart size={30} />
              )}
            </div>
          </>
        )}
      </div>
      <MyFooter />
    </div>
  );
};

export default EventDetail;
