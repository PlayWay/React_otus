import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import ErrorBoundary from "./ErrorBoundary";

const ComponentWithError = () => {
  throw new Error();
};

global.alert = jest.fn();
const fakeLog = jest.spyOn(console, "error");

beforeEach(() => {
  fakeLog.mockImplementation(() => ({}));
});

afterEach(() => {
  fakeLog.mockRestore();
});

describe("<ErrorBoundary> window", () => {
  it("displays error message on error generated by child", () => {
    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    );
    expect(screen.getByTestId("error-message")).toBeVisible();
  });
});
