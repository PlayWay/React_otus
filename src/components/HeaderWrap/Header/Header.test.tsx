import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AuthProviderContext } from "../../Auth/AuthProvider";
import Header from "./index";

const renderContainer = (logout = () => ({})) => {
  render(
    <AuthProviderContext.Provider
      value={{
        user: "Тестович",
        logout,
        login: () => ({}),
      }}
    >
      <Header />
    </AuthProviderContext.Provider>
  );
};
const { getByTestId } = screen;
describe("Header", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it("markup Header", () => {
    renderContainer();
    expect(getByTestId("header-user")).toBeInTheDocument();
    expect(getByTestId("header-user").textContent).toBe("Тестович");
    expect(getByTestId("header-logout")).toBeInTheDocument();
  });
  it("called logout", async () => {
    const logout = jest.fn();
    renderContainer(logout);
    await userEvent.click(getByTestId("header-logout"));
    expect(logout).toHaveBeenCalled();
  });
});
