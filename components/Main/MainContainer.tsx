import React, { createContext, useEffect, useRef } from "react";
import Main from "./Main";
import { GameHookType, useGame } from "../../hooks/useGame";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { settingsSelector } from "../../store/reducers/game/selectors";

export const GameContext = createContext<GameHookType>({} as GameHookType);
export const MainContainer: React.FC = ({}) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(settingsSelector);
  const mounted = useRef(0);

  const { gameStart } = useGame({
    dispatch,
    settings,
  });

  useEffect(() => {
    if (mounted.current > 1) {
      gameStart();
    }
    mounted.current++;
  }, [gameStart]);

  return <Main />;
};

export default MainContainer;
