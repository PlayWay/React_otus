import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Form, { FormProps } from "./Form";

type RenderT = {
  onSubmit?: FormProps["onSubmit"];
  disabled?: boolean;
  level?: FormProps["form"]["level"];
  complexity?: FormProps["form"]["complexity"];
};

const levelTestId = "level-input";
const complexityTestId = "complexity-input";

const renderForm = ({
  onSubmit = () => ({}),
  level = {
    onChange: () => ({}),
    value: 0,
  },
  complexity = {
    onChange: () => ({}),
    value: "low",
  },
  disabled = false,
}: RenderT) => {
  render(
    <Form
      onSubmit={onSubmit}
      form={{
        level,
        complexity,
      }}
      disabled={disabled}
    />
  );
};

describe("Form", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("markup Form", () => {
    renderForm({});
    const levelInput = screen.getByTestId(levelTestId) as HTMLInputElement;
    const complexityInput = screen.getByTestId(
      complexityTestId
    ) as HTMLInputElement;
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(levelInput).toBeInTheDocument();
    expect(levelInput.value).toBe("");
    expect(complexityInput).toBeInTheDocument();
    expect(complexityInput.value).toBe("low");
    expect(screen.getByTestId("play-btn")).toBeInTheDocument();
  });
  it("should set select values", () => {
    const onChange = jest.fn();
    const data = {
      level: {
        onChange: onChange,
        value: 7,
      },
      complexity: {
        onChange: onChange,
        value: "hard",
      },
    };
    renderForm(data);
    const levelInput = screen.getByTestId(levelTestId) as HTMLInputElement;
    const complexityInput = screen.getByTestId(
      complexityTestId
    ) as HTMLInputElement;
    expect(levelInput.value).toBe("7");
    expect(complexityInput.value).toBe("hard");
  });
  it("call onChange on input", async () => {
    const onChangeLevel = jest.fn();
    const onChangeComplexity = jest.fn();
    const data = {
      level: {
        onChange: onChangeLevel,
        value: 3,
      },
      complexity: {
        onChange: onChangeComplexity,
        value: "hard",
      },
    };
    renderForm(data);
    await userEvent.selectOptions(screen.getByTestId(levelTestId), "5");
    expect(onChangeLevel).toHaveBeenCalled();
    await userEvent.selectOptions(
      screen.getByTestId(complexityTestId),
      "middle"
    );
    expect(onChangeComplexity).toHaveBeenCalled();
  });
  it("should call onSubmit if submit form", async () => {
    const onSubmit = jest.fn();
    renderForm({ onSubmit });
    const form = await waitFor(() => screen.getByTestId("form"));
    await userEvent.selectOptions(screen.getByTestId(levelTestId), "3");
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalled();
  });
});
