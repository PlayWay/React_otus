import { call, delay, put, takeEvery } from "redux-saga/effects";
import { setActive, setOpenAll, setStatus } from "../gameSlice";
import { VIEW_TIMEOUT } from "../../helpers/const";
import { GAME_START } from "./actions/types";

export function* delaySaga(tm: number) {
  yield delay(tm);
}

export function* startPlaySaga() {
  yield takeEvery(GAME_START, function* () {
    yield put({ type: setOpenAll.type, payload: true });
    yield put({ type: setStatus.type, payload: "start" });
    yield put({ type: setActive.type, payload: [] });
    yield call(delaySaga, VIEW_TIMEOUT);
    yield put({ type: setOpenAll.type, payload: false });
    yield put({ type: setStatus.type, payload: "process" });
  });
}
