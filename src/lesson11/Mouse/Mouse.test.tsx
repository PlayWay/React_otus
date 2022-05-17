import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Mouse from "./Mouse";

const { getByTestId } = screen;

afterEach(() => cleanup());
describe("User.tsx", () => {
  it("markup", async () => {
    render(<Mouse />);
    expect(getByTestId("mouse-x")).toHaveTextContent("0");
    expect(getByTestId("mouse-y")).toHaveTextContent("0");
  });
});
