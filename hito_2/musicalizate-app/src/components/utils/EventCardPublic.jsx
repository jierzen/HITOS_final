import React from "react";
import { Card, Button } from "react-bootstrap";

const EventCardPublic = ({
  title,
  description,
  date_event,
  location,
  ticket_price,
  img_url,
  tickets_available,
}) => {
  return (
    <Card style={{ width: "18rem" }} className="text-center">
      <Card.Body>
        <Card.Title className="mb-4">{title}</Card.Title>
        <Card.Img
          variant="top"
          src={img_url}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <div className="text-left">
          <Card.Text className="mt-3">{description}</Card.Text>
          <Card.Text>
            <strong>Fecha del evento:</strong> {date_event}
          </Card.Text>
          <Card.Text>
            <strong>Lugar:</strong> {location}
          </Card.Text>
          <Card.Text>
            <strong>Precio del ticket:</strong> {ticket_price}
          </Card.Text>
          <Card.Text>
            <strong>Tickets disponibles:</strong> {tickets_available}
          </Card.Text>
        </div>
        <Button variant="dark" className="mt-3">
          Ver más
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCardPublic;
