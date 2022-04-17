import React, {FC} from 'react';
import s from './Event.module.scss';
import {EventButton} from "../../../types";

const Event: FC<EventButton> = ({src = '', name = '', color = ''}) => {

  return (
    <div className={s.event}>
      <div style={{backgroundColor: color}} className={s.img} data-testid="event-img-wrap">
        <img src={src} alt={name} data-testid="event-img"/>
      </div>
      <span className={s.text} data-testid="event-name">{name}</span>
    </div>
  );
};

export default Event;
