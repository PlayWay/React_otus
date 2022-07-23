import { renderHook } from "@testing-library/react";
import { useGame } from "./useGame";

describe("useGame", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should return object scheme", async () => {
    const mockedDispatch = jest.fn();
    const { result } = renderHook(() =>
      useGame({
        dispatch: mockedDispatch,
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
    // await act(() => {
    //   result.current.onChooseCard("1");
    // });
    // expect(mockedDispatch).toHaveBeenCalledWith(addActiveCard("1"));
  });
});
