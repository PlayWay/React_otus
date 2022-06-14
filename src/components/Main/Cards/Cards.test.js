import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { mockCards } from "../../../mocks/cards";
import Cards from "./Cards";

const renderCards = ({
  clientWidth = 1200,
  size = 20,
  active = [],
  filledArray = mockCards,
  onEventClick = jest.fn(),
  replay = () => ({}),
  message = "",
  status = "",
  openAll = false,
}) => {
  const useRefSpy = jest.spyOn(React, "useRef").mockReturnValue({
    current: { clientWidth },
  });
  render(
    <Cards
      active={active}
      replay={replay}
      message={message}
      status={status}
      openAll={openAll}
      filledArray={filledArray}
      size={size}
      elementRef={useRefSpy}
      onChooseCard={onEventClick}
    />
  );
};
const { getByTestId, getAllByTestId } = screen;
describe("Cards", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("markup Cards", () => {
    renderCards({});
    const cards = getAllByTestId("card");
    expect(getByTestId("end-game-wrap")).toBeInTheDocument();
    expect(getByTestId("end-game-message")).toBeInTheDocument();
    expect(getByTestId("end-game-btn")).toBeInTheDocument();
    expect(getByTestId("cards")).toBeInTheDocument();
    expect(cards).toHaveLength(9);
    cards.forEach((card) => {
      expect(card.className.split(" ").includes("active")).toBe(false);
    });
  });

  describe("Cards Logic", () => {
    it("should active few cards", () => {
      renderCards({ active: ["01", "12", "00", "22"] });
      const cards = getAllByTestId("card");
      expect(cards[0].className.split(" ").includes("active")).toBe(true);
      expect(cards[1].className.split(" ").includes("active")).toBe(true);
      expect(cards[2].className.split(" ").includes("active")).toBe(false);
      expect(cards[4].className.split(" ").includes("active")).toBe(false);
      expect(cards[5].className.split(" ").includes("active")).toBe(true);
      expect(cards[8].className.split(" ").includes("active")).toBe(true);
    });

    it("should filled cards colors", () => {
      renderCards({});
      const backCards = getAllByTestId("card-back");
      expect(backCards[0].style.backgroundColor).toBe("green");
      expect(backCards[8].style.backgroundColor).toBe("violet");
      expect(backCards[4].style.backgroundColor).toBe("orange");
    });

    it("should open all cards if send prop 'openAll'", () => {
      renderCards({ openAll: true });
      const cards = getAllByTestId("card");
      expect(cards).toHaveLength(9);
      cards.forEach((card) => {
        expect(card.className.split(" ").includes("active")).toBe(true);
      });
    });

    it("call Card click func with index param", async () => {
      const onEventClick = jest.fn();

      renderCards({ onEventClick });
      const cards = getAllByTestId("card");
      await userEvent.click(cards[1]);
      expect(onEventClick).toHaveBeenCalledWith("01");
      await userEvent.click(cards[5]);
      expect(onEventClick).toHaveBeenCalledWith("12");
    });
  });

  describe("check styles props cards", () => {
    it("check effect size prop on styles card", async () => {
      renderCards({ size: 40 });
      const cards = getAllByTestId("card");
      cards.forEach((card) => {
        expect(card.style.width).toBe("40px");
        expect(card.style.height).toBe("40px");
      });
    });
    it("check number columns", async () => {
      renderCards({ size: 40 });
      expect(getByTestId("cards").style.gridTemplateColumns).toBe(
        "repeat(3,40px)"
      );
    });
  });

  describe("End Game View", () => {
    test.each(["start", "replay", "process", "reset"])(
      "should NOT visible End Game view if status '%s'",
      (status) => {
        renderCards({ status });
        expect(
          getByTestId("end-game-wrap").className.split(" ").includes("active")
        ).toBe(false);
      }
    );

    it("should visible End Game view", () => {
      renderCards({ status: "end" });
      expect(getByTestId("end-game-wrap")).toBeVisible();
      expect(
        getByTestId("end-game-wrap").className.split(" ").includes("active")
      ).toBe(true);
      expect(getByTestId("end-game-message")).toBeVisible();
      expect(getByTestId("end-game-btn")).toBeVisible();
    });

    it("should show message", () => {
      renderCards({ status: "end", message: "Победил!" });
      expect(getByTestId("end-game-message")).toHaveTextContent("Победил!");
    });

    it("should call replay method", async () => {
      const replay = jest.fn();
      renderCards({ status: "end", message: "Победил!", replay });
      await userEvent.click(getByTestId("end-game-btn"));
      expect(replay).toHaveBeenCalled();
    });
  });
});
