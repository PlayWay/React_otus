import React from "react"
import {Events} from "./Events";
import {EventButton} from "../../types";

const EventsContainer = () => {
  const links:Array<EventButton> = [
    {
      name: "Кормление",
      src: "images/child_care.svg",
      color: "red"
    },
    {
      name: "Сон",
      src: "images/moon-fill.svg",
      color: "green"
    },
    {
      name: "Прогулка",
      src: "images/child_friendly.svg",
      color: "blue"
    },
    {
      name: "Бодроствование",
      src: "images/child_care.svg",
      color: "orange"
    }
  ]

  return (<Events links={links}/>)
}

export default EventsContainer