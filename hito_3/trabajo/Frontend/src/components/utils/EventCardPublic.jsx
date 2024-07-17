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
  onToggleFavorite,
  onViewDetails,
}) => {
  const { userSession, addToCart } = useContext(MarketplaceContext);

  //

  const handleAddToCart = () => {
    addToCart({
      title,
      description,
      date_event,
      location,
      ticket_price,
      img_url,
      tickets_available,
      event_id,
    });
  };

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
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "10px",
              border: "1px solid black",
              margin: "10px",
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
        <Button variant="success" onClick={handleAddToCart}>
          Agregar al Carrito
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default EventCardPublic;
