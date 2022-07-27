import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AuthProviderContext } from "../../Auth/AuthProvider";
import Header from "./index";
import { renderWithRedux } from "../../../test/helpers";
import { Statistic } from "../../../types";

const renderContainer = ({
  logout = () => ({}),
  color = "",
  statistic = null,
}: {
  logout?: () => void;
  color?: string;
  statistic?: Statistic | null;
}) => {
  renderWithRedux(
    <AuthProviderContext.Provider
      value={{
        user: "Тестович",
        logout,
        login: () => ({}),
      }}
    >
      <Header color={color} statistic={statistic} />
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
    renderContainer({});
    expect(getByTestId("header-user")).toBeInTheDocument();
    expect(getByTestId("nav")).toBeInTheDocument();
    expect(getByTestId("header-user").textContent).toBe("Тестович");
    expect(getByTestId("header-statistic")).toBeInTheDocument();
    expect(screen.queryByTestId("try")).toBeNull();
    expect(screen.queryByTestId("win")).toBeNull();
    expect(screen.queryByTestId("lose")).toBeNull();
    expect(getByTestId("header-logout")).toBeInTheDocument();
  });
  it("should show statisctic", async () => {
    renderContainer({ statistic: { win: 2, try: 10, lose: 7 } });
    expect(getByTestId("try").textContent).toBe("10");
    expect(getByTestId("win").textContent).toBe("2");
    expect(getByTestId("lose").textContent).toBe("7");
  });
  it("should set backgroundColor", async () => {
    renderContainer({ color: "blue" });
    expect(getByTestId("nav").style.backgroundColor).toBe("blue");
  });
  it("called logout", async () => {
    const logout = jest.fn();
    renderContainer({ logout });
    await userEvent.click(getByTestId("header-logout"));
    expect(logout).toHaveBeenCalled();
  });
});
