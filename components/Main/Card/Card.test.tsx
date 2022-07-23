import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Card from "./index";

describe("Card", () => {
  it("markup Card", () => {
    render(<Card color="red" />);
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-back")).toBeInTheDocument();
    expect(screen.getByTestId("card-front")).toBeInTheDocument();
    expect(screen.getByTestId("card-back").style.backgroundColor).toBe("red");
    expect(screen.queryByTestId("card-front")?.style?.backgroundColor).not.toBe(
      "red"
    );
  });
  it("call Card click func", async () => {
    const onEventClick = jest.fn();
    render(<Card color="red" onClick={onEventClick} />);
    const card = screen.getByTestId("card");
    await userEvent.click(card);
    expect(onEventClick).toHaveBeenCalled();
  });

  it("set class active if active prop true", async () => {
    render(<Card color="red" active />);
    expect(
      screen.getByTestId("card").className.split(" ").includes("active")
    ).toBe(true);
  });
});
