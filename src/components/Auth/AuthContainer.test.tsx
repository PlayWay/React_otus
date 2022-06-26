import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AuthContainer } from "./AuthContainer";
import { AuthProviderContext } from "./AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const renderContainer = (login = () => ({})) => {
  render(
    <BrowserRouter>
      <AuthProviderContext.Provider
        value={{
          user: "",
          logout: () => ({}),
          login,
        }}
      >
        <Routes>
          <Route index element={<AuthContainer />} />
        </Routes>
      </AuthProviderContext.Provider>
    </BrowserRouter>
  );
};
const { getByTestId } = screen;
describe("AuthContainer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("Auth entry logic", async () => {
    const login = jest.fn();
    renderContainer(login);
    const input = getByTestId("auth-input") as HTMLInputElement;
    await userEvent.type(input, "Евгений");
    expect(input.value).toBe("Евгений");
    await userEvent.click(getByTestId("auth-btn"));
    await act(() => {
      expect(login).toHaveBeenCalledWith("Евгений");
    });
  });
});
