import React, { createContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [userSession, setUserSession] = useState({
    isLoggedIn: false,
    username: '',
    email: '',
    picture: '',
    role: '',
    events: [],
    favs: [],
    cart: []
  });
  const navigate = useNavigate();
  const handleLogOut = () => {
    console.log('Cerrar sesión');

    setTimeout(() => {
      
      setUserSession({
        isLoggedIn: false,
        username: '',
        email: '',
        picture: '',
        role: '',
        events: [],
        favs: [],
        cart: []
      });
      }, 300);
      navigate("/")
  };

  const updateProfile = (data) => {
    setUserSession(prevSession => ({
      ...prevSession,
      ...data
    }));
  };

  const addEvent = (event) => {
    setUserSession(prevSession => ({
      ...prevSession,
      events: [...prevSession.events, event]
    }));
  };

  const updateEvent = (updatedEvent) => {
    setUserSession(prevSession => ({
      ...prevSession,
      events: prevSession.events.map(event =>
        event.eventId === updatedEvent.eventId ? updatedEvent : event
      )
    }));
  };

  const deleteEvent = (eventId) => {
    setUserSession(prevSession => ({
      ...prevSession,
      events: prevSession.events.filter(event => event.eventId !== eventId)
    }));
  };

  const logIn = (email, password) => {
    setUserSession({
      isLoggedIn: true,
      username: 'Fulano Detal',
      email: email,
      picture: 'https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg',
      role: 'admin',
      events: [],
      favs: [],
      cart: []
    });
  };

  const addFav = (event) => {
    setUserSession(prevSession => {
      const itemExists = prevSession.favs.find(item => item.eventId === event.eventId);
      if (itemExists) {
        return {
          ...prevSession,
          favs: prevSession.favs.filter(item => item.eventId !== event.eventId)
        };
      } else {
        
        return {
          ...prevSession,
          favs: [...prevSession.favs, { ...event }]
        };
      }
    });
  };

  const removeFromFavs = (eventId) => {
    setUserSession(prevSession => ({
      ...prevSession,
      favs: prevSession.favs.filter(item => item.eventId !== eventId)
    }));
  };

  const updateCart = (eventId, quantity) => {
    setUserSession(prevSession => ({
      ...prevSession,
      cart: prevSession.cart.map(item =>
        item.eventId === eventId ? { ...item, quantity } : item
      )
    }));
  };

  const removeFromCart = (eventId) => {
    setUserSession(prevSession => ({
      ...prevSession,
      cart: prevSession.cart.filter(item => item.eventId !== eventId)
    }));
  };

  const addToCart = (event) => {
    console.log('Evento con precio = ',event)
    const numericPrice = typeof event.ticketPrice === 'string' ? parseInt(event.ticketPrice.replace(/\D/g, ''), 10) : event.ticketPrice;
    
    setUserSession(prevSession => {
      const itemExists = prevSession.cart.find(item => item.eventId === event.eventId);
      if (itemExists) {
        return {
          ...prevSession, cart: prevSession.cart.map(item =>
                item.eventId === event.eventId ? { ...item, quantity: item.quantity + 1 } : item )};
      } else {
        return {
          ...prevSession,
          cart: [...prevSession.cart, { ...event, ticketPrice: numericPrice, quantity: 1 }]};
      }
    });
  };

  return (
    <MarketplaceContext.Provider value={{ userSession, logIn, addFav, removeFromFavs, handleLogOut, updateProfile, addEvent, updateEvent, deleteEvent, updateCart, removeFromCart, addToCart }}>
      {children}
    </MarketplaceContext.Provider>
  );
};
