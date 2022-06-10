import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FormContainer } from "./FormContainer";

describe("FormContainer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("entry inputX", async () => {
    render(<FormContainer />);
    const inputX = screen.getByTestId("input-x");
    const inputY = screen.getByTestId("input-y");
    await userEvent.clear(inputX);
    await userEvent.type(inputX, "5");
    expect(inputX.value).toBe("5");
    expect(inputY.value).toBe("5");
  });
  it("entry inputY", async () => {
    render(<FormContainer />);
    const inputX = screen.getByTestId("input-x");
    const inputY = screen.getByTestId("input-y");
    await userEvent.clear(inputY);
    await userEvent.type(inputY, "10");
    expect(inputX.value).toBe("10");
    expect(inputY.value).toBe("10");
  });
  it("input validate", async () => {
    render(<FormContainer />);
    const inputX = screen.getByTestId("input-x");
    await userEvent.type(inputX, "11");
    expect(inputX.value).toBe("3");
    await userEvent.clear(inputX);
    await userEvent.type(inputX, "7");
    expect(inputX.value).toBe("7");
    await userEvent.type(inputX, "dasdasd");
    expect(inputX.value).toBe("7");
    await userEvent.type(inputX, "!@$@$");
    expect(inputX.value).toBe("7");
  });
});
