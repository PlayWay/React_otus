import React, { FC } from "react"
import s from "./Events.module.scss"
import Event from "./Event/Event";
import {EventButton} from "../../types";

interface Events {
  links: Array<EventButton>,
}

export const Events: FC<Events> = ({links=[]}) => {
  return (
    <ul className={s.events}>
      {links.map((i,index) => (
        <Event src={i.src} name={i.name} color={i.color} key={i.name+index}/>
      ))}
    </ul>
  )
}