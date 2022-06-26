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
    const { result } = renderHook(() => useGame(0));
    const { gameInfo } = result.current;
    expect(result.current).toEqual({
      control: {
        endGame: expect.any(Function),
        process: expect.any(Function),
        replay: expect.any(Function),
        reset: expect.any(Function),
        start: expect.any(Function),
      },
      gameInfo: {},
      status: "",
    });
    expect(gameInfo).toEqual({});
  });
});
