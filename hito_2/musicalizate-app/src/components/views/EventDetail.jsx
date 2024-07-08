import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const EventDetail = () => {
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

export default EventDetail;