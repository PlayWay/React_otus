import { call, delay, put, takeEvery } from "redux-saga/effects";
import {
  replay,
  setGameInfo,
  setOpenAll,
  setStatus,
  start,
  updateStatistics,
} from "../../reducers/game/gameSlice";
import { VIEW_TIMEOUT } from "../../../helpers/const";
import { GAME_START_SAGA } from "../actions/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { GameInfo } from "../../../types";

export function* delaySaga(tm: number) {
  yield delay(tm);
}

export function* startPlaySaga() {
  yield takeEvery(
    GAME_START_SAGA,
    function* ({
      payload,
    }: PayloadAction<{
      game: GameInfo;
      level: number;
    }>) {
      yield put({ type: updateStatistics.type, payload: "try" });
      yield put({ type: setGameInfo.type, payload: payload.game });
      yield call(endOldGame);
      yield put({ type: start.type });
      yield call(delaySaga, VIEW_TIMEOUT * payload.level);
      yield put({ type: setOpenAll.type, payload: false });
      yield put({ type: setStatus.type, payload: "process" });
    }
  );
}

export function* endOldGame() {
  yield put({ type: replay.type });
  yield call(delaySaga, 1000);
}
