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
        event.event_id === updatedEvent.event_id ? updatedEvent : event
      )
    }));
  };

  const deleteEvent = (eventId) => {
    setUserSession(prevSession => ({
      ...prevSession,
      events: prevSession.events.filter(event => event.event_id !== eventId)
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
      cart: []
    });
  };

  const updateCart = (eventId, quantity) => {
    setUserSession(prevSession => ({
      ...prevSession,
      cart: prevSession.cart.map(item =>
        item.event_id === eventId ? { ...item, quantity } : item
      )
    }));
  };

  const removeFromCart = (eventId) => {
    setUserSession(prevSession => ({
      ...prevSession,
      cart: prevSession.cart.filter(item => item.event_id !== eventId)
    }));
  };

  const addToCart = (event) => {
    const numericPrice = typeof event.ticket_price === 'string' 
      ? parseInt(event.ticket_price.replace(/\D/g, ''), 10) 
      : event.ticket_price;
    
    setUserSession(prevSession => {
      const itemExists = prevSession.cart.find(item => item.event_id === event.event_id);
      if (itemExists) {
        return {
          ...prevSession,
          cart: prevSession.cart.map(item =>
            item.event_id === event.event_id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      } else {
        return {
          ...prevSession,
          cart: [...prevSession.cart, { ...event, ticket_price: numericPrice, quantity: 1 }]
        };
      }
    });
  };

  return (
    <MarketplaceContext.Provider value={{ userSession, logIn, handleLogOut, updateProfile, addEvent, updateEvent, deleteEvent, updateCart, removeFromCart, addToCart }}>
      {children}
    </MarketplaceContext.Provider>
  );
};
