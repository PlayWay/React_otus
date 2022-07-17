import { renderHook } from "@testing-library/react";
import { useGame } from "./useGame";

describe("useGame", () => {
  afterEach(() => {
    jest.clearAllMocks();
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
});
