import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../../config/constans";

// Crear el contexto
export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(
    localStorage.getItem('session')
      ? JSON.parse(localStorage.getItem('session'))
      : {
          isLoggedIn: false,
          username: "",
          email: "",
          profile_picture: "",
          role: "",
          events: [],
          favs: [],
          cart: [],
          tickets: [],
        }
  );
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    // Si hay un token en localStorage, intentar iniciar sesión automáticamente
    if (token && !userSession.isLoggedIn) {
      axios.get(`${ENDPOINT.login}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const { username, profile_picture, role, events, favs, cart, tickets } = response.data;
          setUserSession({
            isLoggedIn: true,
            email: userSession.email,
            username,
            profile_picture,
            role,
            events,
            favs,
            cart,
            tickets,
          });
        })
        .catch(error => {
          console.error("Error al verificar el token:", error);
          // Limpiar el token y redirigir si el token no es válido
          setToken(null);
          localStorage.removeItem('token');
          localStorage.removeItem('session');
          navigate("/");
        });
    }
  }, [token, userSession.isLoggedIn, navigate, userSession.email]);

  const handleLogOut = () => {
    console.log("Cerrar sesión");
    setUserSession({
      isLoggedIn: false,
      username: "",
      email: "",
      profile_picture: "",
      role: "",
      events: [],
      favs: [],
      cart: [],
      tickets: [],
    });
    localStorage.removeItem('session');
    localStorage.removeItem('token');
    setToken(null);
    navigate("/");
  };

  const updateProfile = (data) => {
    setUserSession((prevSession) => ({
      ...prevSession,
      ...data,
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
    axios.post(`${ENDPOINT.login}`, { email, password })
      .then((response) => {
        const { token, username, profile_picture, role, events, favs, cart, tickets } = response.data;
        setUserSession({
          isLoggedIn: true,
          email,
          username,
          profile_picture,
          role,
          events,
          favs,
          cart,
          tickets,
        });
        localStorage.setItem('token', token);
        localStorage.setItem('session', JSON.stringify({
          isLoggedIn: true,
          email,
          username,
          profile_picture,
          role,
          events,
          favs,
          cart,
          tickets,
        }));
        setToken(token);
        navigate("/profile/perfil");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
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
    <MarketplaceContext.Provider
      value={{
        userSession,
        logIn,
        handleLogOut,
        updateProfile,
        addFav,
        removeFromFavs,
        addEvent,
        updateEvent,
        deleteEvent,
        updateCart,
        removeFromCart,
        addToCart
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};