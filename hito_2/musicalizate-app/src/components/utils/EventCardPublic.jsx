import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { MarketplaceContext } from '../utils/MarketplaceProvider';

const EventCardPublic = ({ title, description, date_event, location, ticket_price, img_url, tickets_available }) => {
  const { addToCart } = useContext(MarketplaceContext);

  const handleAddToCart = () => {
    const priceString = typeof ticket_price === 'string' ? ticket_price : ticket_price.toString();
    const numericPrice = parseInt(priceString.replace(/\D/g, ''), 10);
    
    addToCart({
      eventId: Date.now(),
      title,
      description,
      dateEvent: date_event,
      location,
      ticketPrice: numericPrice,
      imgUrl: img_url,
      ticketsAvailable: tickets_available
    });
  };

  return (
    <Card>
      <Card.Img variant="top" src={img_url} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text><strong>Fecha:</strong> {date_event}</Card.Text>
        <Card.Text><strong>Ubicación:</strong> {location}</Card.Text>
        <Card.Text><strong>Precio del Boleto:</strong> {ticket_price}</Card.Text>
        <Card.Text><strong>Boletos Disponibles:</strong> {tickets_available}</Card.Text>
        <Button variant="primary" onClick={handleAddToCart}>Agregar al Carrito</Button>
      </Card.Body>
    </Card>
  );
};

export default EventCardPublic;
