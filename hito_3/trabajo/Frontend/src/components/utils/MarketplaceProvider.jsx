import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../../config/constans";

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

  const logIn = (email, password) => {
    axios.post(ENDPOINT.login, { email, password })
      .then((response) => {
        const { username, picture, role, events, favs, cart, tickets } = response.data;
        setUserSession({
          isLoggedIn: true,
          email,
          username,
          picture,
          role,
          events,
          favs,
          cart,
          tickets,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <MarketplaceContext.Provider
      value={{
        userSession,
        logIn,
        handleLogOut,
        updateProfile,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};