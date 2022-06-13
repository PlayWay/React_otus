import { useCallback, useState } from "react";
import { usePlayFunc } from "./usePlayFunc";
import { GameInfo, Status } from "../types";

export type GameHookType = {
  control: {
    reset: () => void;
    start: (v?: number) => void;
    endGame: () => void;
    replay: () => void;
    process: () => void;
  };
  gameInfo: GameInfo;
  status: Status;
};

export const useGame = (size = 3) => {
  const [gameInfo, setGameInfo] = useState<GameInfo>({} as GameInfo);
  const [status, setStatus] = useState<Status>("" as Status);
  const play = usePlayFunc();

  const reset = useCallback(() => {
    setGameInfo({
      filledArray: [],
      winSeries: [],
      searchColor: "red",
    });
  }, []);

  const start = useCallback(() => {
    const game = play(size);
    setGameInfo(game);
    setStatus("start");
  }, [play, size]);

  const endGame = useCallback(() => {
    setStatus("end");
  }, []);

  const replay = useCallback(
    (timeout = 1000) => {
      setStatus("replay");
      //Ждём отработку анимации
      setTimeout(() => {
        start();
      }, timeout);
    },
    [size]
  );

  const process = useCallback(() => {
    setStatus("process");
  }, []);

  return {
    gameInfo,
    control: { start, reset, process, endGame, replay },
    status,
  };
};
