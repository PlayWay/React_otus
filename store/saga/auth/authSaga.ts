import { put, takeEvery } from "redux-saga/effects";
import { logout } from "../../reducers/auth/authSlice";
import { LOGOUT_SAGA } from "../actions/types";
import { resetState } from "../../reducers/game/gameSlice";

export function* logoutSaga() {
  yield takeEvery(LOGOUT_SAGA, function* () {
    yield put({ type: logout.type });
    yield put({ type: resetState.type });
  });
}
