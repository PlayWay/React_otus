import { expectSaga } from "redux-saga-test-plan";
import { delaySaga, startPlaySaga } from "./gameSaga";
import { GAME_START } from "./actions/types";
import { setActive, setOpenAll, setStatus } from "../gameSlice";
import { VIEW_TIMEOUT } from "../../helpers/const";

describe("gameSagas", () => {
  it("startPlaySaga", () => {
    return expectSaga(startPlaySaga)
      .dispatch({ type: GAME_START })
      .provide({ call: () => false })
      .put({ type: setOpenAll.type, payload: true })
      .put({ type: setStatus.type, payload: "start" })
      .put({ type: setActive.type, payload: [] })
      .call(delaySaga, VIEW_TIMEOUT)
      .put({ type: setOpenAll.type, payload: false })
      .put({ type: setStatus.type, payload: "process" })
      .silentRun();
  });
});
