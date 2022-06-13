import React, { createContext, useEffect, useState } from "react";
import Main from "./Main";
import { GameHookType, useGame } from "../../hooks/useGame";

export const SetSizeContext = createContext<(i: number) => void>(() => ({}));
export const GameContext = createContext<GameHookType>({} as GameHookType);
export const MainContainer: React.FC = ({}) => {
  const [size, setSize] = useState<number>(3);
  const game = useGame(size);

  useEffect(() => {
    game.control.start();
  }, [game.control.start]);

  return (
    <SetSizeContext.Provider value={setSize}>
      <GameContext.Provider value={game}>
        <Main value={size} />
      </GameContext.Provider>
    </SetSizeContext.Provider>
  );
};

export default MainContainer;
