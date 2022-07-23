import { useCallback, useEffect, useState } from "react";
import { play } from "../helpers/play";
import { GAME_START_SAGA } from "../store/saga/actions/types";
import {
  addActiveCard,
  endGame,
  GameState,
  levelUp,
  updateStatistics,
} from "../store/reducers/game/gameSlice";
import { GameInfo, Settings } from "../types";
import { AppDispatch } from "../store/store";

export type GameHookType = {
  gameStart: () => void;
  msg: string;
  gameReplay: () => void;
  nextLevel: () => void;
  onChooseCard: (key: string) => void;
};

type GameHookP = {
  winSeries?: GameInfo["winSeries"];
  active?: GameState["active"];
  status?: GameState["status"];
  settings: Settings;
  dispatch: AppDispatch;
};

export const useGame = ({
  status = "reset",
  active = [],
  winSeries = [],
  settings,
  dispatch,
}: GameHookP) => {
  const [msg, setMsg] = useState("");

  const gameStart = useCallback(() => {
    if (!settings.level) {
      return;
    }
    const game = play(settings.level, settings.complexity);
    dispatch({
      type: GAME_START_SAGA,
      payload: { game, level: settings.level },
    });
  }, [dispatch, settings]);

  useEffect(() => {
    if (
      active.length &&
      winSeries.length &&
      active.length === winSeries.length
    ) {
      if (winSeries.every((v) => active.some((i) => i === v))) {
        dispatch(updateStatistics("win"));
        setMsg("Поздравляем! Вы выиграли!");
      } else {
        dispatch(updateStatistics("lose"));
        setMsg("Проиграли :( Попробуйте, снова!");
      }
      dispatch(endGame());
    }
  }, [active, dispatch, winSeries]);

  const onChooseCard = useCallback(
    (key: string) => {
      if (active.includes(key) || status === "start") {
        return;
      }
      dispatch(addActiveCard(key));
    },
    [active, status]
  );

  const gameReplay = () => {
    gameStart();
  };

  const nextLevel = useCallback(() => {
    dispatch(levelUp());
  }, [dispatch]);

  return {
    gameStart,
    gameReplay,
    nextLevel,
    onChooseCard,
    msg,
  };
};
