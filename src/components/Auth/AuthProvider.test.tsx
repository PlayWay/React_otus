import React, { FC, useContext } from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, AuthProviderContext } from "./AuthProvider";
import userEvent from "@testing-library/user-event";
import { LOCAL_STORAGE_KEYS } from "../../helpers/const";

const { getByTestId } = screen;
describe("AuthProvider", () => {
  const userName = "Vasya";
  const userTestId = "user";
  const logoutTestId = "logout";
  const loginTestId = "login";

  const FakeComponent: FC = () => {
    const { user, login, logout } = useContext(AuthProviderContext);
    return (
      <>
        <div data-testid={userTestId}>{user}</div>
        <button data-testid={loginTestId} onClick={() => login(userName)}>
          ЛОГИН
        </button>
        <button data-testid={logoutTestId} onClick={logout} />
      </>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const renderContainer = () =>
    render(
      <AuthProvider>
        <FakeComponent />
      </AuthProvider>
    );

  test("initial render and no userName in local storage, then userName is null", () => {
    renderContainer();
    expect(getByTestId(userTestId).textContent).toBe("");
  });

  test("userName correctly loads from local storage", () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.user, userName);
    renderContainer();
    expect(getByTestId(userTestId).textContent).toBe(userName);
  });

  test("login, then user name is correct and saved to local storage", async () => {
    renderContainer();
    await userEvent.click(getByTestId(loginTestId));
    expect(getByTestId(userTestId).textContent).toBe(userName);
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.user)).toBe(userName);
  });

  test("login and logout, then user name is null and local storage is cleared", async () => {
    renderContainer();
    await userEvent.click(getByTestId(loginTestId));
    await userEvent.click(getByTestId(logoutTestId));
    expect(getByTestId(userTestId).textContent).toBe("");
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.user)).toBeNull();
  });
});
