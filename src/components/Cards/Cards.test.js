import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Cards from "./Cards";

const renderCards = ({
  clientWidth = 1200,
  value = 3,
  size = 20,
  active = [],
  onEventClick = jest.fn(),
}) => {
  const useRefSpy = jest.spyOn(React, "useRef").mockReturnValue({
    current: { clientWidth },
  });
  render(
    <Cards
      active={active}
      size={size}
      value={value}
      elementRef={useRefSpy}
      onChooseCard={onEventClick}
    />
  );
};

describe("Cards", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("markup Cards", () => {
    renderCards({});
    const cards = screen.getAllByTestId("card");
    expect(cards.length).toBe(9);
    cards.forEach((card) => {
      expect(card.className.split(" ").includes("active")).toBe(false);
    });
  });
  it("call Card click func with index param", async () => {
    const onEventClick = jest.fn();

    renderCards({ onEventClick });
    const cards = screen.getAllByTestId("card");
    await userEvent.click(cards[1]);
    expect(onEventClick).toHaveBeenCalledWith("01");
    await userEvent.click(cards[5]);
    expect(onEventClick).toHaveBeenCalledWith("12");
  });
  it("check grid logic", async () => {
    renderCards({ value: 5 });
    const cards = screen.getAllByTestId("card");
    expect(cards.length).toBe(25);
  });
  it("check grid logic", async () => {
    renderCards({ value: 5 });
    const cards = screen.getAllByTestId("card");
    expect(cards.length).toBe(25);
  });
  it("check effect size prop on styles card", async () => {
    renderCards({ size: 40 });
    const cards = screen.getAllByTestId("card");
    cards.forEach((card) => {
      expect(card.style.width).toBe("40px");
      expect(card.style.height).toBe("40px");
    });
  });
});
