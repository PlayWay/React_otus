import { all } from "redux-saga/effects";
import { localStorageSaga } from "./localStorageSaga";
import { startPlaySaga } from "./gameSaga";

export default function* rootSaga() {
  yield all([localStorageSaga(), startPlaySaga()]);
}
