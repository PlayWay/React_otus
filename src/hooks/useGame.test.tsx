import { act, renderHook } from "@testing-library/react";
import { useGame } from "./useGame";
import { addActiveCard, levelUp } from "../store/reducers/game/gameSlice";
import { GAME_START_SAGA } from "../store/saga/actions/types";

describe("useGame", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.Math, "random").mockRestore();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should return object scheme", () => {
    const { result } = renderHook(() =>
      useGame({
        dispatch: jest.fn,
        settings: { level: 1, complexity: "middle" },
      })
    );
    expect(result.current).toEqual({
      gameStart: expect.any(Function),
      gameReplay: expect.any(Function),
      nextLevel: expect.any(Function),
      onChooseCard: expect.any(Function),
      msg: "",
    });
  });
  it("should dispatch with levelUp if call nextLevel", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
    const { result } = renderHook(() =>
      useGame({
        dispatch: mockDispatch,
        settings: { level: 2, complexity: "middle" },
      })
    );
    act(() => {
      result.current.gameStart();
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: GAME_START_SAGA,
      payload: {
        game: {
          filledArray: [
            [
              {
                id: "00",
                value: 0,
                color: "orange",
              },
              {
                id: "01",
                value: 1,
                color: "orange",
              },
            ],
            [
              {
                id: "10",
                value: 0,
                color: "orange",
              },
              {
                id: "11",
                value: 1,
                color: "orange",
              },
            ],
          ],
          searchColor: "orange",
          winSeries: ["00", "01", "10", "11"],
        },
        level: 2,
      },
    });
  });
  it("should call dispatch with addActiveCard if call onChooseCard", () => {
    const mockDispatch = jest.fn();
    const { result } = renderHook(() =>
      useGame({
        dispatch: mockDispatch,
        settings: { level: 1, complexity: "middle" },
        active: ["10"],
      })
    );
    act(() => {
      result.current.onChooseCard("00");
    });
    expect(mockDispatch).toHaveBeenCalledWith(addActiveCard("00"));
  });
  it("NOT should call dispatch if call onChooseCard", () => {
    const mockDispatch = jest.fn();
    const { result } = renderHook(() =>
      useGame({
        dispatch: mockDispatch,
        settings: { level: 1, complexity: "middle" },
        active: ["10"],
      })
    );
    act(() => {
      result.current.onChooseCard("10");
    });
    expect(mockDispatch).not.toHaveBeenCalled();
  });
  it("should dispatch with levelUp if call nextLevel", () => {
    const mockDispatch = jest.fn();
    const { result } = renderHook(() =>
      useGame({
        dispatch: mockDispatch,
        settings: { level: 1, complexity: "middle" },
      })
    );
    act(() => {
      result.current.nextLevel();
    });
    expect(mockDispatch).toHaveBeenCalledWith(levelUp());
  });
});
