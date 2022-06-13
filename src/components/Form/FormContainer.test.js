import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { GameContext } from "../Main/MainContainer";
import { FormContainer } from "./FormContainer";

const renderContainer = ({
  status = "start",
  gameInfo = { searchColor: "red", filledArray: [], winSeries: [] },
}) => {
  render(
    <GameContext.Provider
      value={{
        status,
        gameInfo,
        control: {},
      }}
    >
      <FormContainer />
    </GameContext.Provider>
  );
};

describe("FormContainer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("entry inputX", async () => {
    renderContainer({});
    const inputX = screen.getByTestId("input-x");
    const inputY = screen.getByTestId("input-y");
    await userEvent.clear(inputX);
    await userEvent.type(inputX, "5");
    expect(inputX.value).toBe("5");
    expect(inputY.value).toBe("5");
  });
  it("entry inputY", async () => {
    renderContainer({});
    const inputX = screen.getByTestId("input-x");
    const inputY = screen.getByTestId("input-y");
    await userEvent.clear(inputY);
    await userEvent.type(inputY, "10");
    expect(inputX.value).toBe("10");
    expect(inputY.value).toBe("10");
  });
  it("input validate", async () => {
    renderContainer({});
    const inputX = screen.getByTestId("input-x");
    await userEvent.type(inputX, "11");
    expect(inputX.value).toBe("3");
    await userEvent.clear(inputX);
    await userEvent.type(inputX, "7");
    expect(inputX.value).toBe("7");
    await userEvent.type(inputX, "dasdasd");
    expect(inputX.value).toBe("7");
    await userEvent.type(inputX, "!@$@$");
    expect(inputX.value).toBe("7");
  });
  it("check disabled play button if status 'start'", () => {
    renderContainer({ status: "start" });
    expect(screen.getByTestId("play-btn")).toBeDisabled();
  });
  test.each(["end", "replay", "process", "reset"])(
    "check enabled play button if status '%s'",
    (status) => {
      renderContainer({ status });
      expect(screen.getByTestId("play-btn")).not.toBeDisabled();
    }
  );
});
