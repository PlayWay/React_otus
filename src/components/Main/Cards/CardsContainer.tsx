import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Cards from "./Cards";
import { AreaSizeContext, GameContext } from "../MainContainer";
import { VIEW_TIMEOUT } from "../../../helpers/const";
import s from "./Cards.module.scss";

export interface CardsContainerProps {
  value: number;
}

export const CardsContainer: React.FC<CardsContainerProps> = ({ value }) => {
  const { gameInfo, status, control } = useContext(GameContext);
  const { setSize: setAreaSize } = useContext(AreaSizeContext);
  const [active, setActive] = useState<string[]>([]);
  const [openAll, setOpenAll] = useState(false);
  const [msg, setMsg] = useState("");
  const [size, setSize] = useState(40);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (status) {
      case "start":
        setOpenAll(true);
        setActive([]);
        setTimeout(() => {
          setOpenAll(false);
          control.process();
        }, VIEW_TIMEOUT * value);
        break;
      case "replay":
        setActive([]);
        setOpenAll(false);
        break;
      case "reset":
        setActive([]);
        setOpenAll(false);
        break;
      case "end":
        setOpenAll(true);
        setActive([]);
        break;
    }
  }, [control, status, value]);

  useEffect(() => {
    if (
      active.length &&
      gameInfo.winSeries.length &&
      active.length === gameInfo.winSeries.length
    ) {
      if (gameInfo.winSeries.every((v) => active.some((i) => i === v))) {
        setMsg("Поздравляем! Вы выиграли!");
      } else {
        setMsg("Проиграли :( Попробуйте, снова!");
      }
      control.endGame();
    }
  }, [active, control.endGame, gameInfo.winSeries]);

  useEffect(() => {
    setSize(
      elementRef.current?.clientWidth
        ? elementRef.current?.clientWidth / value / 3
        : 40
    );
  }, [value]);

  const onChooseCard = useCallback(
    (key: string) => {
      if (active.includes(key) || status === "start") {
        return;
      }
      setActive((prev) => [...prev, key]);
    },
    [active, status]
  );

  const nextLevel = useCallback(() => {
    setAreaSize((prev: number) => ++prev);
  }, [setAreaSize]);

  return (
    <div className={s.playArea} ref={elementRef}>
      <Cards
        openAll={openAll}
        replay={control.replay}
        active={active}
        message={msg}
        status={status}
        filledArray={gameInfo.filledArray}
        onChooseCard={onChooseCard}
        size={size}
        nextLevel={nextLevel}
      />
    </div>
  );
};

export default memo(CardsContainer);
