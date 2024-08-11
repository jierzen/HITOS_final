import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { MarketplaceContext } from "../utils/MarketplaceProvider"; // Asegúrate de que la ruta sea correcta

const RegisterEventForm = () => {
  const { userSession, addEvent } = useContext(MarketplaceContext);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    ticket_price: "",
    tickets_available: "",
    img_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userSession || !userSession.user_id) {
      console.error("User ID no está disponible.");
      window.alert("No se pudo obtener el ID del usuario.");
      return;
    }
  
    try {
      await addEvent({
        ...eventData,
        user_id: userSession.user_id, // Incluye user_id en los datos del evento
      });
      setEventData({
        title: "",
        description: "",
        date: "",
        location: "",
        ticket_price: "",
        tickets_available: "",
        img_url: "",
      });
    } catch (error) {
      console.error("Error al agregar evento:", error);
      window.alert("Error al agregar evento");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Fecha</Form.Label>
        <Form.Control
          type="datetime-local" // Cambio a datetime-local para incluir la hora
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ubicación</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Precio del Boleto (CLP)</Form.Label>
        <Form.Control
          type="number"
          name="ticket_price"
          value={eventData.ticket_price}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Boletos Disponibles</Form.Label>
        <Form.Control
          type="number"
          name="tickets_available"
          value={eventData.tickets_available}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Imagen URL</Form.Label>
        <Form.Control
          type="text"
          name="img_url"
          value={eventData.img_url}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrar Evento
      </Button>
    </Form>
  );
};

export default RegisterEventForm;
