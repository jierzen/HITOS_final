import React from "react";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";
import EventDetail from "./EventDetail";
import '../../App.css';

function Home() {
  return (
    <div>
      <MyNavbar />
      <EventDetail/>
      <MyFooter />
    </div>
  );
}

export default Home;
