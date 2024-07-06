import React from "react";
import MyNavbar from "../utils/MyNavbar";
import MyFooter from "../utils/MyFooter";
import EventCardPublic from "../utils/EventCardPublic";

const Events = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <MyNavbar />
      <div className="flex-grow-1 d-flex justify-content-center">
        <div className="container my-4">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            <div className="col mb-4">
              <EventCardPublic
                title="Concierto de rock"
                description="Un concierto de rock increíble que no te puedes perder."
                date_event="2024-08-15"
                location="Auditorio Nacional"
                ticket_price="$50.000"
                img_url="https://via.placeholder.com/150"
              />
            </div>
            <div className="col mb-4">
              <EventCardPublic
                title="Festival de jazz"
                description="Disfruta de una noche llena de jazz y buena música."
                date_event="2024-09-20"
                location="Teatro Municipal"
                ticket_price="$30.000"
                img_url="https://via.placeholder.com/150"
              />
            </div>
            <div className="col mb-4">
              <EventCardPublic
                title="Recital de piano"
                description="Recital de piano con obras clásicas y contemporáneas."
                date_event="2024-10-05"
                location="Sala de Conciertos XYZ"
                ticket_price="$40.000"
                img_url="https://via.placeholder.com/150"
              />
            </div>
            <div className="col mb-4">
              <EventCardPublic
                title="Concierto de música latina"
                description="¡No te pierdas este vibrante concierto de música latina!"
                date_event="2024-11-15"
                location="Estadio Central"
                ticket_price="$60.000"
                img_url="https://via.placeholder.com/150"
              />
            </div>
          </div>
        </div>
      </div>
      <MyFooter />
    </div>
  );
};

export default Events;
