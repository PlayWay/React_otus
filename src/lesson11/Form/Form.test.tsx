import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Form from "./Form";
import userEvent from "@testing-library/user-event";

const { getByTestId } = screen;
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData),
  })
) as jest.Mock;
const mockData = [
  {
    id: 1,
    name: "Иван",
    username: "Ivan",
    email: "test@mail.ru",
    phone: "88005553555",
    website: "localhost",
  },
];
afterEach(() => cleanup());

describe("Form.tsx", () => {
  it("markup and fetch data", async () => {
    render(<Form />);
    expect(getByTestId("title")).toHaveTextContent(/выберите пользователя/i);
    expect(getByTestId("loading")).toHaveTextContent(/загрузка.../i);
    expect(screen.queryByTestId("select")).toBeNull();
    expect(screen.queryByTestId("user-info")).toBeNull();
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).toBeNull();
      expect(getByTestId("select")).toBeInTheDocument();
      expect(screen.queryByTestId("user-info")).toBeNull();
    });
  });

  it("fetch error", async () => {
    (window.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "ошибка!!!",
    });
    render(<Form />);
    await waitFor(() => {
      expect(screen.queryByTestId("loading")).toBeNull();
      expect(screen.queryByTestId("select")).toBeNull();
      expect(screen.queryByTestId("user-info")).toBeNull();
      expect(getByTestId("error")).toHaveTextContent(/ошибка!!!/i);
    });
  });

  it("change title if change select value", async () => {
    render(<Form />);
    await waitFor(async () => {
      await userEvent.selectOptions(getByTestId("select"), "1");
      expect(getByTestId("title")).toHaveTextContent(/пользователь ivan/i);
    });
  });

  it("show info if change select value", async () => {
    render(<Form />);

    await waitFor(async () => {
      await userEvent.selectOptions(getByTestId("select"), "1");
      expect(getByTestId("user-info")).toBeInTheDocument();
    });
  });

  it("clear user info if clear select value", async () => {
    render(<Form />);

    await waitFor(async () => {
      await userEvent.selectOptions(getByTestId("select"), "1");
      expect(getByTestId("user-info")).toBeInTheDocument();
      await userEvent.selectOptions(getByTestId("select"), "");
      expect(screen.queryByTestId("user-info")).toBeNull();
    });
  });
});
