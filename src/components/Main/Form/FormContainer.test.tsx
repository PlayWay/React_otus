import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FormContainer } from "./FormContainer";
import { initState, renderWithRedux } from "../../../test/helpers";
import { Status } from "../../../types";
import { GameState } from "../../../store/reducers/game/gameSlice";
import { RootState } from "../../../store/store";

const levelTestId = "level-input";
const complexityTestId = "complexity-input";

const renderContainer = (status?: Status) => {
  const init = {
    ...initState,
    game: {
      ...({ ...initState.game, status: status || "start" } as GameState),
    },
  } as RootState;
  renderWithRedux(<FormContainer />, init);
};

describe("FormContainer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("entry levelSelect", async () => {
    renderContainer();
    const select = screen.getByTestId(levelTestId) as HTMLSelectElement;
    await userEvent.selectOptions(select, "5");
    expect(select.value).toBe("5");
  });
  it("entry complexitySelect", async () => {
    renderContainer();
    const select = screen.getByTestId(complexityTestId) as HTMLSelectElement;
    await userEvent.selectOptions(select, "hard");
    expect(select.value).toBe("hard");
  });
  it("check disabled play button if status 'start'", () => {
    renderContainer("start");
    expect(screen.getByTestId("play-btn")).toBeDisabled();
  });
  const statuses: Status[] = ["end", "replay", "process", "reset"];
  test.each(statuses)(
    "check enabled play button if status '%s'",
    (status: Status) => {
      renderContainer(status);
      expect(screen.getByTestId("play-btn")).not.toBeDisabled();
    }
  );
});
