import { expectSaga } from "redux-saga-test-plan";
import { delaySaga, endOldGame, startPlaySaga } from "./gameSaga";
import { GAME_START_SAGA } from "../actions/types";
import {
  setGameInfo,
  setOpenAll,
  setStatus,
  start,
  updateStatistics,
} from "../../reducers/game/gameSlice";
import { VIEW_TIMEOUT } from "../../../helpers/const";

const gameMock = {
  game: { filledArray: [], searchColor: "red", winSeries: [] },
  level: 2,
  complexity: "hard",
};

describe("gameSagas", () => {
  it("startPlaySaga", () => {
    return expectSaga(startPlaySaga)
      .dispatch({
        type: GAME_START_SAGA,
        payload: gameMock,
      })
      .provide({ call: () => false })
      .put({ type: updateStatistics.type, payload: "try" })
      .put({
        type: setGameInfo.type,
        payload: { filledArray: [], searchColor: "red", winSeries: [] },
      })
      .call(endOldGame)
      .put({ type: start.type })
      .call(delaySaga, VIEW_TIMEOUT * 2)
      .put({ type: setOpenAll.type, payload: false })
      .put({ type: setStatus.type, payload: "process" })
      .silentRun();
  });
});
