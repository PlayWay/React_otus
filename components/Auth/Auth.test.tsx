import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Auth } from "./Auth";

const renderContainer = ({
  onSumbit = () => ({}),
  value = "",
  onChange = () => ({}),
}) => {
  render(<Auth onChange={onChange} onSubmit={onSumbit} value={value} />);
};
const { getByTestId } = screen;
describe("Auth", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("markup Auth", () => {
    renderContainer({ value: "2" });
    const input = getByTestId("auth-input") as HTMLInputElement;

    expect(getByTestId("auth-title")).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("2");
    expect(getByTestId("auth-btn")).toBeInTheDocument();
  });
  it("call onChange on input", async () => {
    const onChange = jest.fn();
    renderContainer({ onChange });
    const input = getByTestId("auth-input") as HTMLInputElement;
    await userEvent.type(input, "ababa");
    expect(onChange).toHaveBeenCalled();
  });
  it("check submit", async () => {
    const onSumbit = jest.fn();
    renderContainer({ onSumbit });
    const input = getByTestId("auth-input") as HTMLInputElement;
    await userEvent.type(input, "ababa");
    await userEvent.click(getByTestId("auth-btn"));
    await act(() => {
      expect(onSumbit).toHaveBeenCalled();
    });
  });
});
