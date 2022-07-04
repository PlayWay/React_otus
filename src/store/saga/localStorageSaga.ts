import { select, takeEvery } from "redux-saga/effects";
import { RootState } from "../store";

export function* localStorageSaga() {
  yield takeEvery("*", function* () {
    const state: RootState = yield select();

    localStorage.setItem("state", JSON.stringify(state));
  });
}
