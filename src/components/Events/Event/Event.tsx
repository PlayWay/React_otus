import React, {FC} from 'react';
import s from './Event.module.scss';
import {EventButton} from "../../../types";

const Event: FC<EventButton> = ({src = '', name = '', color = ''}) => {

  return (
    <div className={s.event}>
      <div style={{backgroundColor: color}} className={s.img}>
        <img src={src} alt={name}/>
      </div>
      <span className={s.text}>{name}</span>
    </div>
  );
};

export default Event;
