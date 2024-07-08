import React, { useContext } from "react";
import MyNavbar from '../utils/MyNavbar';
import MyFooter from "../utils/MyFooter";
import EventCardPublic from "../utils/EventCardPublic";
import { MarketplaceContext } from '../utils/MarketplaceProvider';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const { userSession, addToCart } = useContext(MarketplaceContext);
  const navigate = useNavigate();

  const simulatedEvents = [
    {
      event_id: 1,
      title: "Concierto de rock",
      description: "Un concierto de rock increíble que no te puedes perder.",
      date_event: "2024-08-15",
      location: "Auditorio Nacional",
      ticket_price: 50000,
      img_url: "https://weezevent.com/wp-content/uploads/2018/08/27184514/organiser-un-concert-en-7-etapes.jpg",
      tickets_available: 2
    },
    {
      event_id: 2,
      title: "Festival de jazz",
      description: "Disfruta de una noche llena de jazz y buena música.",
      date_event: "2024-09-20",
      location: "Teatro Municipal",
      ticket_price: 30000,
      img_url: "https://d10j3mvrs1suex.cloudfront.net/s:bzglfiles/u/334566/a827ec7e50074a961e3e84f2272817f59a31fdf7/original/fest-2025-gallery-cover-w.jpg/!!/b%3AW1sicmVzaXplIiw4NTBdLFsibWF4Il0sWyJ3ZSJdXQ%3D%3D/meta%3AeyJzcmNCdWNrZXQiOiJiemdsZmlsZXMifQ%3D%3D.jpg",
      tickets_available: 19
    },
    {
      event_id: 3,
      title: "Recital de piano",
      description: "Recital de piano con obras clásicas y contemporáneas.",
      date_event: "2024-10-05",
      location: "Sala de Conciertos XYZ",
      ticket_price: 40000,
      img_url: "https://c8.alamy.com/comp/2A10G8P/art-logo-of-classical-music-in-the-form-of-an-eye-with-a-piano-and-musician-2A10G8P.jpg",
      tickets_available: 24
    },
    {
      event_id: 4,
      title: "Concierto de música latina",
      description: "¡No te pierdas este vibrante concierto de música latina!",
      date_event: "2024-11-15",
      location: "Estadio Central",
      ticket_price: 60000,
      img_url: "https://downtownlafayette.org/wp-content/uploads/latin-music-fest.jpg",
      tickets_available: 22
    }
  ];

  const publicEvents = simulatedEvents.filter(event => 
    !userSession.events.some(userEvent => userEvent.event_id === event.event_id)
  );

  const handleAddToCart = (eventId) => {
    addToCart(eventId);
    navigate('/cart');
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <MyNavbar/>
      <h1 className="container mt-5">EVENTOS DISPONIBLES</h1>
      <div className="flex-grow-1 d-flex justify-content-center">
        <div className="container my-4">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {publicEvents.map(event => (
              <div className="col mb-4" key={event.event_id}>
                <EventCardPublic
                  title={event.title}
                  description={event.description}
                  date_event={event.date_event}
                  location={event.location}
                  ticket_price={event.ticket_price}
                  img_url={event.img_url}
                  tickets_available={event.tickets_available}
                  event_id={event.event_id}
                  onAddToCart={() => handleAddToCart(event.event_id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};

export default Events;
