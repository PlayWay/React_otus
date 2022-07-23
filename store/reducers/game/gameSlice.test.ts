import gameReducer, {
  addActiveCard,
  clearActive,
  endGame,
  GameState,
  process,
  replay,
  setOpenAll,
  setSettings,
  setStatus,
  start,
} from "./gameSlice";
import { GameInfo } from "../../../types";

type InitState = GameState;

const initState = ({
  active = [],
  gameInfo = {} as GameInfo,
  openAll = false,
  status = "reset",
  settings = {
    level: 0,
    complexity: "low",
  },
}: InitState) =>
  ({
    active,
    gameInfo,
    openAll,
    status,
    settings: settings,
  } as InitState);

describe("gameReducer", () => {
  it("should push activeCard on array active", () => {
    const state = gameReducer(initState({} as InitState), addActiveCard("00"));
    expect(state.active).toEqual(["00"]);
  });
  it("should set openAll", () => {
    const state = gameReducer(
      initState({ openAll: false } as InitState),
      setOpenAll(true)
    );
    expect(state.openAll).toEqual(true);
  });
  it("should set process", () => {
    const state = gameReducer(
      initState({ status: "reset" } as InitState),
      process()
    );
    expect(state.status).toEqual("process");
  });
  it("should clear active,openAll cards, set status 'start' and filled gameInfo if start game", () => {
    const state = gameReducer(
      initState({ settings: { level: 3, complexity: "low" } } as InitState),
      start()
    );
    expect(state.active).toEqual([]);
    expect(state.openAll).toBe(true);
    expect(state.status).toBe("start");
  });
  it("should set size", () => {
    const state = gameReducer(
      initState({} as InitState),
      setSettings({ level: 3, complexity: "hard" })
    );
    expect(state.settings).toEqual({ level: 3, complexity: "hard" });
  });
  it("should set status", () => {
    const state = gameReducer(initState({} as InitState), setStatus("start"));
    expect(state.status).toBe("start");
  });
  it("should clear active", () => {
    const state = gameReducer(
      initState({
        active: ["01", "02"],
      } as InitState),
      clearActive([])
    );
    expect(state.active).toEqual([]);
  });
  it("should clear active,openAll cards,status 'replay' if replay", () => {
    const state = gameReducer(initState({} as InitState), replay());
    expect(state.active).toEqual([]);
    expect(state.openAll).toBe(false);
    expect(state.status).toBe("replay");
  });
  it("should clear active,openAll cards,status 'end' if endGame", () => {
    const state = gameReducer(initState({} as InitState), endGame());
    expect(state.active).toEqual([]);
    expect(state.openAll).toBe(true);
    expect(state.status).toBe("end");
  });
});
