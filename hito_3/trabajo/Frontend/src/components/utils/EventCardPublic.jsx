import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { MarketplaceContext } from "../utils/MarketplaceProvider";

const EventCardPublic = ({
  title,
  description,
  date_event,
  location,
  ticket_price,
  img_url,
  tickets_available,
  event_id,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
  onViewDetails,
}) => {
  const { userSession } = useContext(MarketplaceContext);

  const imageStyles = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  return (
    <Card className="h-100">
      <div className="position-relative">
        <Card.Img variant="top" src={img_url} style={imageStyles} />
        {userSession.isLoggedIn && (
          <div
            className="position-absolute bottom-0 end-0"
            style={{
              backgroundColor: "white", // Fondo blanco
              borderRadius: "50%", // Forma circular
              padding: "10px", // Espacio alrededor del ícono
              border: "1px solid black", // Borde negro
              margin: "10px", // Espacio desde el borde del contenedor
            }}
          >
            {isFavorite ? (
              <HeartFill
                size={30}
                color="red"
                onClick={onToggleFavorite}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <Heart
                size={30}
                onClick={onToggleFavorite}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        )}
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <strong>Fecha:</strong> {date_event}
        </Card.Text>
        <Card.Text>
          <strong>Ubicación:</strong> {location}
        </Card.Text>
        <Card.Text>
          <strong>Precio del Boleto:</strong> {ticket_price} CLP
        </Card.Text>
        <Card.Text>
          <strong>Boletos Disponibles:</strong> {tickets_available}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button variant="primary" onClick={onViewDetails}>
          Detalles
        </Button>
        <Button variant="success" onClick={onAddToCart}>
          Agregar al Carrito
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default EventCardPublic;
