import { all } from "redux-saga/effects";
import { startPlaySaga } from "./game/gameSaga";
import { logoutSaga } from "./auth/authSaga";

export default function* rootSaga() {
  yield all([startPlaySaga(), logoutSaga()]);
}
