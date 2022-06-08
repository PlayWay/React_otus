import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Form from "./Form";

const renderForm = ({
  onSumbit = (e) => ({}),
  value = 3,
  onChange = (e) => ({}),
}) => {
  render(<Form value={value} onSumbit={onSumbit} onChange={onChange} />);
};

describe("Form", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("markup Form", () => {
    renderForm({ value: 3 });
    const inputX = screen.getByTestId("input-x");
    const inputY = screen.getByTestId("input-y");
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(inputX).toBeInTheDocument();
    expect(inputX.value).toBe("3");
    expect(inputY).toBeInTheDocument();
    expect(inputY.value).toBe("3");
    expect(screen.getByTestId("play-btn")).toBeInTheDocument();
    expect(screen.getByTestId("color-box")).toBeInTheDocument();
  });
  it("call onChange on input", async () => {
    const onChange = jest.fn();
    renderForm({ onChange });
    await userEvent.type(screen.getByTestId("input-x"), "ababa");
    expect(onChange).toHaveBeenCalled();
    await userEvent.type(screen.getByTestId("input-y"), "2222");
    expect(onChange).toHaveBeenCalled();
  });
});
