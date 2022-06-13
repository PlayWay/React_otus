import React, { memo } from "react";
import s from "./Cards.module.scss";
import Card from "../Card";
import Button from "../../ui/Button";
import clsx from "clsx";
import { GameInfo, Status } from "../../../types";

interface CardsProps {
  onChooseCard: (key: string) => void;
  replay: () => void;
  filledArray: GameInfo["filledArray"];
  size: number;
  message: string;
  openAll: boolean;
  status: Status;
  active: string[];
  nextLevel: () => void;
}

export const Cards: React.FC<CardsProps> = ({
  filledArray = [],
  active = [],
  replay,
  message,
  nextLevel,
  status,
  openAll = false,
  size,
  onChooseCard,
}) => {
  return (
    <div
      className={s.cards}
      data-testid="cards"
      style={{
        gridTemplateColumns: `repeat(${filledArray.length},${size}px)`,
      }}
    >
      <div
        className={clsx(s.endGame, status === "end" ? s.active : "")}
        data-testid="end-game-wrap"
      >
        <h2 data-testid="end-game-message">{message}</h2>
        <Button onClick={replay} data-testid="end-game-btn">
          Сыграть снова
        </Button>
        {message.toLowerCase().indexOf("выиграли") > -1 && (
          <Button onClick={nextLevel}>Следующий уровень</Button>
        )}
      </div>
      {filledArray.map((row) => {
        return row.map((col) => (
          <Card
            key={col.id}
            style={{
              width: size,
              height: size,
            }}
            color={col.color}
            active={openAll || active.includes(col.id)}
            onClick={() => onChooseCard(col.id)}
          />
        ));
      })}
    </div>
  );
};

export default memo(Cards);
