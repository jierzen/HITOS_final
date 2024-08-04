import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../../config/constans";

export const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(
    localStorage.getItem("session")
      ? JSON.parse(localStorage.getItem("session"))
      : {
          isLoggedIn: false,
          user_id: null,
          username: "",
          email: "",
          profile_picture: "",
          events: [],
          favs: [],
          cart: [],
          tickets: [],
        }
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSession = localStorage.getItem("session");
    if (token && !userSession.isLoggedIn && storedSession) {
      const sessionData = JSON.parse(storedSession);
      setUserSession({
        isLoggedIn: sessionData.isLoggedIn,
        user_id: sessionData.user_id,
        email: sessionData.email,
        username: sessionData.username,
        profile_picture: sessionData.profile_picture,
        events: sessionData.events,
        favs: sessionData.favs,
        cart: sessionData.cart,
        tickets: sessionData.tickets,
      });
    }
  }, [token, userSession.isLoggedIn, navigate]);

  const logIn = async (email, password) => {
    try {
      const response = await axios.post(`${ENDPOINT.login}`, {
        email,
        password,
      });
      const { token, user_id, username, profile_picture } = response.data;

      setUserSession({
        isLoggedIn: true,
        user_id,
        email,
        username,
        profile_picture,
        events: [],
        favs: [],
        cart: [],
        tickets: [],
      });

      localStorage.setItem("token", token);
      localStorage.setItem(
        "session",
        JSON.stringify({
          isLoggedIn: true,
          user_id,
          email,
          username,
          profile_picture,
          events: [],
          favs: [],
          cart: [],
          tickets: [],
        })
      );

      setToken(token);
      navigate("/profile/perfil");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      window.alert("Email o contraseña incorrectos");
    }
  };

  const logOut = () => {
    setUserSession({
      isLoggedIn: false,
      user_id: userSession.user_id,
      username: "",
      email: "",
      profile_picture: "",
      events: [],
      favs: [],
      cart: [],
      tickets: [],
    });
    localStorage.removeItem("token");
    localStorage.removeItem("session");
    setToken(null);
    navigate("/");
  };

  const updateProfile = async (updatedData) => {
    try {
      await axios.put(
        `${ENDPOINT.perfil}/update/${userSession.user_id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserSession({
        ...userSession,
        ...updatedData,
      });
      localStorage.setItem(
        "session",
        JSON.stringify({
          ...userSession,
          ...updatedData,
        })
      );
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
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

  // Función para comprar tickets desde el carrito

  const buyTickets = (cartItems) => {
    setUserSession((prevSession) => ({
      ...prevSession,
      tickets: [...prevSession.tickets, ...cartItems],
      cart: [],
    }));
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

  const addToCart = (event) => {
    console.log("Evento con precio = ", event);
    const numericPrice =
      typeof event.ticketPrice === "string"
        ? parseInt(event.ticketPrice.replace(/\D/g, ""), 10)
        : event.ticketPrice;

    setUserSession((prevSession) => {
      const itemExists = prevSession.cart.find(
        (item) => item.eventId === event.eventId
      );
      if (itemExists) {
        return {
          ...prevSession,
          cart: prevSession.cart.map((item) =>
            item.eventId === event.eventId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...prevSession,
          cart: [
            ...prevSession.cart,
            { ...event, ticketPrice: numericPrice, quantity: 1 },
          ],
        };
      }
    });
  };

  return (
    <MarketplaceContext.Provider
      value={{
        userSession,
        logIn,
        logOut,
        updateProfile,
        addFav,
        removeFromFavs,
        addEvent,
        updateEvent,
        deleteEvent,
        updateCart,
        removeFromCart,
        addToCart,
        token,
        buyTickets,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};
