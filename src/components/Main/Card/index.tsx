import React, { CSSProperties, memo } from "react";
import s from "./Card.module.scss";
import clsx from "clsx";

export interface CardProps {
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
      data-testid="card"
    >
      <div className={s.front} data-testid="card-front" />
      <div
        className={s.back}
        style={{ backgroundColor: color }}
        data-testid="card-back"
      />
    </div>
  );
};

export default memo(Card);
