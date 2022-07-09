import { localStorageSaga } from "./localStorageSaga";
import { expectSaga } from "redux-saga-test-plan";
import { getLocalStorageState } from "../../helpers/helpers";
import authSlice, {
  AuthState,
  login,
  logout,
} from "../reducers/auth/authSlice";

describe("localStorageSaga", () => {
  it("test persist LocalStorage", async () => {
    await expectSaga(localStorageSaga)
      .withReducer(authSlice)
      .dispatch(login("Artem"))
      .silentRun();

    const state: AuthState = getLocalStorageState("state");
    expect(state?.user).toBe("Artem");
  });

  it("test persist LocalStorage", async () => {
    await expectSaga(localStorageSaga)
      .withReducer(authSlice, {
        user: { name: "Igor" },
      })
      .dispatch(logout())
      .silentRun();

    const state: AuthState = getLocalStorageState("state");
    expect(state?.user).toBe("");
  });
});
