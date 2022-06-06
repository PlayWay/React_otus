import React, { CSSProperties } from "react";
import s from "./Card.module.scss";
import clsx from "clsx";

interface CardProps {
  color: string;
  active?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  color,
  active = false,
  onClick,
  style = {},
}) => {
  return (
    <div
      className={clsx(s.card, active ? s.active : "")}
      onClick={onClick}
      style={style}
    >
      <div className={s.front} />
      <div className={s.back} style={{ backgroundColor: color }} />
    </div>
  );
};

export default Card;
