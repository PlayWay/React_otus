import React from "react";
import { Events } from "./Events";
import { events } from "../../helpers/const";

const EventsContainer = () => {
  const onEventClick = (type: number): void => {
    //пока заглушка
    console.log(type);
  };

  return <Events events={events} onEventClick={onEventClick} />;
};

export default EventsContainer;
