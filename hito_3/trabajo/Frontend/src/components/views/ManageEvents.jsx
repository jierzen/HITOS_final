import React, { useContext, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { MarketplaceContext } from "../utils/MarketplaceProvider";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";
import EventDetail from "./EventDetail";

const ManageEvents = () => {
  const { userSession, deleteEvent } = useContext(MarketplaceContext);
  const { events } = userSession;
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editEvent, setEditEvent] = useState({});

  const handleEdit = (event) => {
    console.log("Editing event:", event);
    setEditEvent(event);
    setShowCreateForm(true);
  };

  const handleCreateNewEvent = () => {
    console.log("Creating new event");
    setEditEvent({});
    setShowCreateForm(true);
  };

  const handleSave = () => {
    console.log("Event saved");
    setShowCreateForm(false);
    setEditEvent({});
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <MyNavbar />
      <div className="container mt-5 flex-grow-1">
        <h1>Mis Eventos Publicados</h1>
        <h3>Ver mis eventos, publicar, editar o eliminar un evento</h3>
        {events.length === 0 ? (
          <>
            <p>No tienes eventos creados.</p>
            <Button variant="primary" onClick={handleCreateNewEvent}>
              Agregar nuevo evento
            </Button>
            {showCreateForm && (
              <EventDetail event={editEvent} onSave={handleSave} />
            )}
          </>
        ) : (
          <>
            <Button
              variant="primary"
              className="mb-4"
              onClick={handleCreateNewEvent}
            >
              Agregar nuevo evento
            </Button>
            {showCreateForm && (
              <EventDetail event={editEvent} onSave={handleSave} />
            )}
            <Row>
              {events.map((event) => (
                <Col key={event.event_id} md={4} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={event.imgUrl} />
                    <Card.Body>
                      <Card.Title>{event.title}</Card.Title>
                      <Card.Text>{event.description}</Card.Text>
                      <Card.Text>
                        <strong>Fecha:</strong> {event.dateEvent}
                      </Card.Text>
                      <Card.Text>
                        <strong>Ubicación:</strong> {event.location}
                      </Card.Text>
                      <Card.Text>
                        <strong>Precio del Boleto:</strong> {event.ticketPrice}{" "}
                        CLP
                      </Card.Text>
                      <Card.Text>
                        <strong>Boletos Disponibles:</strong>{" "}
                        {event.ticketsAvailable}
                      </Card.Text>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => handleEdit(event)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteEvent(event.event_id)}
                      >
                        Eliminar
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
      <MyFooter />
    </div>
  );
};

export default ManageEvents;
