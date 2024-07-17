import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [userSession, setUserSession] = useState({
    isLoggedIn: false,
    username: "",
    email: "",
    picture: "",
    role: "",
    events: [],
    favs: [],
    cart: [],
    tickets: [],
  });
  const navigate = useNavigate();
  const handleLogOut = () => {
    console.log("Cerrar sesión");

    setTimeout(() => {
      setUserSession({
        isLoggedIn: false,
        username: "",
        email: "",
        picture: "",
        role: "",
        events: [],
        favs: [],
        cart: [],
        tickets: [],
      });
    }, 300);
    navigate("/");
  };

  const updateProfile = (data) => {
    setUserSession((prevSession) => ({
      ...prevSession,
      ...data,
    }));
  };

  const addEvent = (event) => {
    setUserSession((prevSession) => ({
      ...prevSession,
      events: [...prevSession.events, event],
    }));
  };

  const updateEvent = (updatedEvent) => {
    setUserSession((prevSession) => ({
      ...prevSession,
      events: prevSession.events.map((event) =>
        event.eventId === updatedEvent.eventId ? updatedEvent : event
      ),
    }));
  };

  const deleteEvent = (eventId) => {
    setUserSession((prevSession) => ({
      ...prevSession,
      events: prevSession.events.filter((event) => event.eventId !== eventId),
    }));
  };

  const logIn = (email, password) => {
    setUserSession({
      isLoggedIn: true,
      username: "Fulano Detal",
      email: email,
      picture:
        "https://static.vecteezy.com/system/resources/thumbnails/007/407/996/small/user-icon-person-icon-client-symbol-login-head-sign-icon-design-vector.jpg",
      role: "admin",
      events: [],
      favs: [],
      cart: [],
      tickets: [],
    });
  };

  const addFav = (event) => {
    setUserSession((prevSession) => {
      const itemExists = prevSession.favs.find(
        (item) => item.eventId === event.eventId
      );
      if (itemExists) {
        return {
          ...prevSession,
          favs: prevSession.favs.filter(
            (item) => item.eventId !== event.eventId
          ),
        };
      } else {
        return {
          ...prevSession,
          favs: [...prevSession.favs, { ...event }],
        };
      }
    });
  };

  const removeFromFavs = (eventId) => {
    setUserSession((prevSession) => ({
      ...prevSession,
      favs: prevSession.favs.filter((item) => item.eventId !== eventId),
    }));
  };

  const updateCart = (eventId, quantity) => {
    setUserSession((prevSession) => ({
      ...prevSession,
      cart: prevSession.cart.map((item) =>
        item.eventId === eventId ? { ...item, quantity } : item
      ),
    }));
  };

  const removeFromCart = (eventId) => {
    setUserSession((prevSession) => ({
      ...prevSession,
      cart: prevSession.cart.filter((item) => item.eventId !== eventId),
    }));
  };

  //Función para agregar al carrito, que se llama desde EventCardPublic
  const addToCart = (event) => {
    console.log("Evento con precio = ", event);
    const numericPrice =
      typeof event.ticket_price === "string"
        ? parseInt(event.ticket_price.replace(/\D/g, ""), 10)
        : event.ticket_price;

    setUserSession((prevSession) => {
      const itemExists = prevSession.cart.find(
        (item) => item.event_id === event.event_id
      );
      if (itemExists) {
        return {
          ...prevSession,
          cart: prevSession.cart.map((item) =>
            item.event_id === event.event_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...prevSession,
          cart: [
            ...prevSession.cart,
            { ...event, ticket_price: numericPrice, quantity: 1 },
          ],
        };
      }
    });
  };

  // Función para comprar tickets desde el carrito

  const buyTickets = (cartItems) => {
    setUserSession((prevSession) => ({
      ...prevSession,
      tickets: [...prevSession.tickets, ...cartItems],
      cart: [],
    }));
  };

  return (
    <MarketplaceContext.Provider
      value={{
        userSession,
        logIn,
        addFav,
        removeFromFavs,
        handleLogOut,
        updateProfile,
        addEvent,
        updateEvent,
        deleteEvent,
        updateCart,
        removeFromCart,
        addToCart,
        buyTickets,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};
