import React, { FC, useContext } from "react";
import { screen } from "@testing-library/react";
import { AuthProvider, AuthProviderContext } from "./AuthProvider";
import userEvent from "@testing-library/user-event";
import { initState, renderWithRedux } from "../../test/helpers";
import { RootState } from "../../store/store";

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

  const renderContainer = (name = "") => {
    renderWithRedux(
      <AuthProvider>
        <FakeComponent />
      </AuthProvider>,
      {
        ...initState,
        auth: {
          user: {
            name,
          },
        },
      } as RootState
    );
  };

  test("initial render and no userName in local storage, then userName is null", () => {
    renderContainer();
    expect(getByTestId(userTestId).textContent).toBe("");
  });

  test("userName correctly loads", () => {
    renderContainer(userName);
    expect(getByTestId(userTestId).textContent).toBe(userName);
  });

  test("login, then user name is correct", async () => {
    renderContainer();
    await userEvent.click(getByTestId(loginTestId));
    expect(getByTestId(userTestId).textContent).toBe(userName);
  });

  // test("login and logout, then user name is null", async () => {
  //   const dispatch = jest.fn();
  //   renderContainer();
  //   await userEvent.click(getByTestId(loginTestId));
  //   await userEvent.click(getByTestId(logoutTestId));
  //   expect(dispatch).toHaveBeenCalledWith({ type: LOGOUT_SAGA });
  // });
});
