import { expectSaga } from "redux-saga-test-plan";
import { LOGOUT_SAGA } from "../actions/types";
import { logout } from "../../reducers/auth/authSlice";
import { resetState } from "../../reducers/game/gameSlice";
import { logoutSaga } from "./authSaga";

describe("authSaga", () => {
  it("LOGOUT_SAGA", () => {
    return expectSaga(logoutSaga)
      .dispatch({
        type: LOGOUT_SAGA,
      })
      .put({ type: logout.type })
      .put({ type: resetState.type })
      .silentRun();
  });
});
