import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { MarketplaceContext } from '../utils/MarketplaceProvider';

const EventDetail = ({ event = {}, onSave }) => {
  const { addEvent, updateEvent } = useContext(MarketplaceContext);
  const [title, setTitle] = useState(event.title || '');
  const [description, setDescription] = useState(event.description || '');
  const [dateEvent, setDateEvent] = useState(event.dateEvent || '');
  const [location, setLocation] = useState(event.location || '');
  const [ticketPrice, setTicketPrice] = useState(event.ticketPrice || '');
  const [imgUrl, setImgUrl] = useState(event.imgUrl || '');
  const [ticketsAvailable, setTicketsAvailable] = useState(event.ticketsAvailable || '');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event.event_id) {
      setTitle(event.title);
      setDescription(event.description);
      setDateEvent(event.dateEvent);
      setLocation(event.location);
      setTicketPrice(event.ticketPrice);
      setImgUrl(event.imgUrl);
      setTicketsAvailable(event.ticketsAvailable);
    }
  }, [event]);

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy sin la hora

    if (!title) newErrors.title = 'El nombre del evento es obligatorio';
    if (!dateEvent) newErrors.dateEvent = 'La fecha es obligatoria';
    if (dateEvent < today) newErrors.dateEvent = 'La fecha no puede ser anterior a hoy';
    if (!location) newErrors.location = 'La dirección es obligatoria';
    if (ticketPrice === '' || isNaN(ticketPrice) || ticketPrice < 5000 || ticketPrice % 1 !== 0) newErrors.ticketPrice = 'El precio del boleto debe ser un número entero positivo y mayor o igual a 5000';
    if (ticketsAvailable === '' || isNaN(ticketsAvailable) || ticketsAvailable <= 100 || ticketsAvailable % 1 !== 0) newErrors.ticketsAvailable = 'La cantidad de boletos debe ser un número entero positivo y mayor a 100';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newEvent = {
      event_id: event.event_id || Date.now(),
      title,
      description,
      dateEvent,
      location,
      ticketPrice,
      imgUrl,
      ticketsAvailable
    };

    if (event.event_id) {
      updateEvent(newEvent);
    } else {
      addEvent(newEvent);
    }

    onSave && onSave();
  };

  return (
    <div className="container mt-5">
      <h2>{event.event_id ? 'Editar Evento' : 'Registrar un Evento'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Título del Evento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Indicar el título del evento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
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
            isInvalid={!!errors.dateEvent}
          />
          <Form.Control.Feedback type="invalid">{errors.dateEvent}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar dirección"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            isInvalid={!!errors.location}
          />
          <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formTicketPrice">
          <Form.Label>Precio del Boleto</Form.Label>
          <Form.Control
            type="number"
            placeholder="Indicar el precio del boleto"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
            isInvalid={!!errors.ticketPrice}
          />
          <Form.Control.Feedback type="invalid">{errors.ticketPrice}</Form.Control.Feedback>
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
            isInvalid={!!errors.ticketsAvailable}
          />
          <Form.Control.Feedback type="invalid">{errors.ticketsAvailable}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          {event.event_id ? 'Actualizar Evento' : 'Registrar Evento'}
        </Button>
      </Form>
    </div>
  );
};

export default EventDetail;
