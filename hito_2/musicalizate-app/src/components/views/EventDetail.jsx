import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';


export const EventDetail = () => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Name:', eventName, 'Date:', date, 'Location:', location);
  };

  return (
    <div className="container mt-5">
      <h2>Registrar un Evento</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEventName">
          <Form.Label>Nombre del Evento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Indicar el nombre del evento"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

        <Button variant="primary" type="submit" className="mt-3">
          Registrar Evento
        </Button>
      </Form>
    </div>
  );
};


export default EventDetail;