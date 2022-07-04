import gameReducer, {
  addActiveCard,
  endGame,
  GameState,
  process,
  replay,
  setActive,
  setOpenAll,
  setSize,
  setStatus,
  start,
} from "./gameSlice";
import { GameInfo } from "../types";

type InitState = GameState;

const initState = ({
  active = [],
  gameInfo = {} as GameInfo,
  openAll = false,
  status = "reset",
  size = 0,
}: InitState) =>
  ({
    active,
    gameInfo,
    openAll,
    status,
    size,
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
    jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
    const state = gameReducer(initState({ size: 3 } as InitState), start());
    expect(state.active).toEqual([]);
    expect(state.openAll).toBe(true);
    expect(state.status).toBe("start");
    expect(state.gameInfo.filledArray).toHaveLength(3);
    expect(state.gameInfo.searchColor).toBe("orange");
    expect(state.gameInfo.winSeries).toHaveLength(9);
  });
  it("should set size", () => {
    const state = gameReducer(initState({} as InitState), setSize(3));
    expect(state.size).toBe(3);
  });
  it("should set status", () => {
    const state = gameReducer(initState({} as InitState), setStatus("start"));
    expect(state.status).toBe("start");
  });
  it("should set active", () => {
    const state = gameReducer(
      initState({} as InitState),
      setActive(["01", "02"])
    );
    expect(state.active).toEqual(["01", "02"]);
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
