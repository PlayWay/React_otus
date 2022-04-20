import React, { FC } from "react";
import s from "./Events.module.scss";
import Event from "./Event/Event";
import { TypesEventButton } from "../../types";

interface Events {
  events: TypesEventButton[];
  onEventClick: (type: number) => void;
}

export const Events: FC<Events> = ({
  events = [],
  onEventClick = () => ({}),
}) => {
  return (
    <div className={s.events}>
      {events.map((i, index) => (
        <button
          type="button"
          onClick={() => onEventClick(i.type)}
          key={i.name + index}
        >
          <Event {...i} />
        </button>
      ))}
    </div>
  );
};
