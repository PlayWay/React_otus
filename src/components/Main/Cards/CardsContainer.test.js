import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { mockCards } from "../../../mocks/cards";
import { GameContext } from "../MainContainer";
import CardsContainer from "./CardsContainer";

const renderContainer = ({
  value = 3,
  status = "process",
  control = {},
  searchColor = "red",
  filledArray = mockCards,
  winSeries = [],
}) => {
  render(
    <GameContext.Provider
      value={{
        status,
        gameInfo: {
          searchColor,
          filledArray,
          winSeries,
        },
        control,
      }}
    >
      <CardsContainer value={value} />
    </GameContext.Provider>
  );
};
const { getByTestId, getAllByTestId } = screen;
describe("CardsContainer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("call Card click func with index param", async () => {
    renderContainer({});
    const cards = getAllByTestId("card");
    await userEvent.click(cards[1]);
    expect(cards[1].className.split(" ").includes("active")).toBe(true);
    await userEvent.click(cards[3]);
    expect(cards[3].className.split(" ").includes("active")).toBe(true);
    await userEvent.click(cards[1]);
    expect(cards[1].className.split(" ").includes("active")).toBe(true);
  });

  describe("Game scenarios", () => {
    it("check win scenario", async () => {
      const control = { endGame: jest.fn() };
      renderContainer({
        winSeries: ["00", "11", "22"],
        control,
      });
      expect(
        getByTestId("end-game-wrap").className.split(" ").includes("active")
      ).toBe(false);
      const cards = screen.getAllByTestId("card");

      await userEvent.click(cards[0]);
      await act(async () => {
        await userEvent.click(cards[4]);
        await act(async () => {
          await userEvent.click(cards[8]);
        });
      });

      await waitFor(async () => {
        expect(control.endGame).toHaveBeenCalled();
      });

      expect(getByTestId("end-game-message")).toHaveTextContent(
        "Поздравляем! Вы выиграли!"
      );
    });
    it("check lose scenario", async () => {
      const control = { endGame: jest.fn() };
      renderContainer({
        winSeries: ["00", "11", "22"],
        control,
      });
      expect(
        getByTestId("end-game-wrap").className.split(" ").includes("active")
      ).toBe(false);
      const cards = screen.getAllByTestId("card");

      await userEvent.click(cards[1]);
      await act(async () => {
        await userEvent.click(cards[2]);
        await act(async () => {
          await userEvent.click(cards[4]);
        });
      });

      await waitFor(async () => {
        expect(control.endGame).toHaveBeenCalled();
      });

      expect(getByTestId("end-game-message")).toHaveTextContent(
        "Проиграли :( Попробуйте, снова!"
      );
    });
  });

  describe("Actions on statuses", () => {
    test.each(["start", "end"])(
      "should open all cards if status '%s'",
      (status) => {
        renderContainer({ status });
        const cards = getAllByTestId("card");
        cards.forEach((card) => {
          expect(card.className.split(" ").includes("active")).toBe(true);
        });
      }
    );

    test.each(["replay", "process", "reset"])(
      "should boolean prop value FALSE if status '%s'",
      (status) => {
        renderContainer({ status });
        const cards = getAllByTestId("card");
        cards.forEach((card) => {
          expect(card.className.split(" ").includes("active")).toBe(false);
        });
      }
    );
  });
});
