import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/views/Home';
import Events from './components/views/Events';
import EventDetail from './components/views/EventDetail';
import SignUp from './components/views/SignUp';
import LogIn from './components/views/LogIn';
import About from './components/views/About';
import Contact from './components/views/Contact';
import Profile from './components/views/Profile';
import ManageEvents from './components/views/ManageEvents';
import Tickets from './components/views/Tickets';
import TicketDetail from './components/views/TicketDetail';
import Favorites from './components/views/Favorites';
import Cart from './components/views/Cart';

function App() {
  return (
    <>
      <Routes>
        {/* Seccion Publica */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />{/*Catalogo de Eventos*/}
        <Route path="/events/:eventId" element={<EventDetail />} />{/*Detalle de un Evento*/}
        <Route path="/signup" element={<SignUp/>} />{/*Registrarse*/}
        <Route path="/login" element={<LogIn/>} />{/*Iniciar Sesion*/}
        <Route path="/about" element={<About />} />{/*Acerca de*/}
        <Route path="/contact" element={<Contact />} />{/*Contacto*/}

        {/* Seccion Privada */}
        <Route path="/profile" element={<Profile />} />{/*Ver mi perfil, editar detalles o boton eliminar mi cuenta*/}
        <Route path="/profile/events" element={<ManageEvents />} />{/*Ver mis eventos, publicar, editar o eliminar un evento*/}
        <Route path="/profile/tickets" element={<Tickets />} />{/*Ver mis tickets comprados*/}
        <Route path="/profile/tickets/:ticketId" element={<TicketDetail />} />{/*Ver el detalle de un ticket comprado*/}
        <Route path="/profile/favorites" element={<Favorites />} />{/*Ver mis favoritos y da posibilidad de eliminar un evento de favoritos*/}
        <Route path="/profile/cart" element={<Cart />} />{/*Ver mi carrito y da posibilidad de eliminar un evento del carrito*/}

      </Routes>
    </>
  );
}


export default App;