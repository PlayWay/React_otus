import React from "react"
import {Events} from "./Events";
import {EventButton} from "../../types";

const EventsContainer = () => {
  const events:Array<EventButton> = [
    {
      name: "Кормление",
      src: "images/child_care.svg",
      color: "red",
      type: 1
    },
    {
      name: "Сон",
      src: "images/moon-fill.svg",
      color: "green",
      type: 2
    },
    {
      name: "Прогулка",
      src: "images/child_friendly.svg",
      color: "blue",
      type: 3
    },
    {
      name: "Бодроствование",
      src: "images/child_care.svg",
      color: "orange",
      type: 4
    }
  ]

  const onEventClick = (type:number): void => {
    //пока заглушка
    console.log(type)
  }

  return (<Events events={events} onEventClick={onEventClick}/>)
}

export default EventsContainer