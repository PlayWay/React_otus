import React, { RefObject } from "react";
import s from "../Main/Main.module.scss";
import Card from "../Card";

interface CardsProps {
  onChooseCard: (key: string) => void;
  value: number;
  size: number;
  active: string[];
  elementRef: RefObject<HTMLDivElement>;
}

export const Cards: React.FC<CardsProps> = ({
  value,
  elementRef,
  active = [],
  size,
  onChooseCard,
}) => {
  return (
    <div className={s.playArea} ref={elementRef}>
      <div
        className={s.cards}
        style={{
          gridTemplateColumns: `repeat(${value},${size}px)`,
        }}
      >
        {Array.from({ length: value }).map((_, rowIndex) => {
          return Array.from({ length: value }).map((_, i) => {
            const key = `${rowIndex}${i}`;
            return (
              <Card
                key={key}
                style={{
                  width: size,
                  height: size,
                }}
                color={"red"}
                active={active.includes(key)}
                onClick={() => onChooseCard(key)}
              />
            );
          });
        })}
      </div>
    </div>
  );
};

export default Cards;
