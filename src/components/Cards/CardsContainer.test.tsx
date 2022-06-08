import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import CardsContainer from "./CardsContainer";

const renderCards = ({ value = 3 }) => {
  render(<CardsContainer value={value} />);
};

describe("CardsContainer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("call Card click func with index param", async () => {
    renderCards({});
    const cards = screen.getAllByTestId("card");
    await userEvent.click(cards[1]);
    expect(cards[1].className.split(" ").includes("active")).toBe(true);
    await userEvent.click(cards[3]);
    expect(cards[3].className.split(" ").includes("active")).toBe(true);
    await userEvent.click(cards[1]);
    expect(cards[1].className.split(" ").includes("active")).toBe(true);
  });
});
