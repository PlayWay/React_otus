import React, { createContext, useEffect, useRef, useState } from "react";
import Main from "./Main";
import { GameHookType, useGame } from "../../hooks/useGame";

type GameSize = {
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
};
export const AreaSizeContext = createContext<GameSize>({} as GameSize);
export const GameContext = createContext<GameHookType>({} as GameHookType);
export const MainContainer: React.FC = ({}) => {
  const [size, setSize] = useState<number>(0);
  const game = useGame(size);
  const mounted = useRef(0);
  useEffect(() => {
    if (mounted.current > 1) {
      game.control.start();
    }
    mounted.current = ++mounted.current;
  }, [game.control.start]);

  return (
    <AreaSizeContext.Provider value={{ size, setSize }}>
      <GameContext.Provider value={game}>
        <Main value={size} />
      </GameContext.Provider>
    </AreaSizeContext.Provider>
  );
};

export default MainContainer;
