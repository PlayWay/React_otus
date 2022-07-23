import React, { memo, useEffect, useRef, useState } from "react";
import Cards from "./Cards";
import s from "./Cards.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppDispatch";
import {
  activeSelector,
  gameInfoSelector,
  gameStatusSelector,
  openAllSelector,
  settingsSelector,
} from "../../../store/reducers/game/selectors";
import { useGame } from "../../../hooks/useGame";

export const CardsContainer: React.FC = () => {
  const openAll = useAppSelector(openAllSelector);
  const dispatch = useAppDispatch();
  const { filledArray, winSeries } = useAppSelector(gameInfoSelector);
  const active = useAppSelector(activeSelector);
  const status = useAppSelector(gameStatusSelector);
  const { level, complexity } = useAppSelector(settingsSelector);
  const { gameReplay, nextLevel, onChooseCard, msg } = useGame({
    active,
    dispatch,
    winSeries,
    settings: { level, complexity },
    status,
  });
  const [size, setSize] = useState(40);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSize(
      elementRef.current?.clientWidth && level
        ? elementRef.current?.clientWidth / level / 3
        : 40
    );
  }, [level]);

  return (
    <div className={s.playArea} ref={elementRef}>
      <Cards
        openAll={openAll}
        replay={gameReplay}
        active={active}
        message={msg}
        status={status}
        filledArray={filledArray}
        onChooseCard={onChooseCard}
        size={size}
        nextLevel={nextLevel}
      />
    </div>
  );
};

export default memo(CardsContainer);
