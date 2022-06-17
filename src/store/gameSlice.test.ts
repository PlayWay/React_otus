import gameReducer, {
  addActiveCard,
  clearActiveCards,
  GameState,
  setGameInfo,
  setOpenAll,
  setStatus,
} from "./gameSlice";
import { GameInfo } from "../types";

type InitState = GameState;

const initState = ({
  active = [],
  gameInfo = {} as GameInfo,
  openAll = false,
  status = "reset",
}: InitState) =>
  ({
    active,
    gameInfo,
    openAll,
    status,
  } as InitState);

describe("gameReducer", () => {
  it("should set gameInfo", () => {
    expect(
      gameReducer(
        initState({} as InitState),
        setGameInfo({ searchColor: "red", filledArray: [], winSeries: [] })
      )
    ).toEqual({
      active: [],
      gameInfo: { searchColor: "red", filledArray: [], winSeries: [] },
      openAll: false,
      status: "reset",
    });
  });
  it("should push activeCard on array active", () => {
    expect(
      gameReducer(initState({} as InitState), addActiveCard("00"))
    ).toEqual({
      active: ["00"],
      gameInfo: {},
      openAll: false,
      status: "reset",
    });
  });
  it("should clear active cards", () => {
    expect(
      gameReducer(
        initState({ active: ["00", "11"] } as InitState),
        clearActiveCards()
      )
    ).toEqual({
      active: [],
      gameInfo: {},
      openAll: false,
      status: "reset",
    });
  });
  it("should set openAll", () => {
    expect(
      gameReducer(initState({ openAll: false } as InitState), setOpenAll(true))
    ).toEqual({
      active: [],
      gameInfo: {},
      openAll: true,
      status: "reset",
    });
  });
  it("should set status", () => {
    expect(
      gameReducer(
        initState({ status: "reset" } as InitState),
        setStatus("start")
      )
    ).toEqual({
      active: [],
      gameInfo: {},
      openAll: false,
      status: "start",
    });
  });
});
