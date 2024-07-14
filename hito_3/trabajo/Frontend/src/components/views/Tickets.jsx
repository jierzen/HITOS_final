import React from "react";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";

export const Tickets = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <MyNavbar />
      <div className="container mt-5" style={{ flex: 1 }}>
        <h2>Mis tickets</h2>
      </div>
      <MyFooter />
    </div>
  );
};

export default Tickets;
