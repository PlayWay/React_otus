import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import User from "./User";
import React from "react";

const user = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  phone: "1-770-736-8031",
  website: "hildegard.org",
};
const { getByTestId } = screen;
afterEach(() => cleanup());

describe("User.tsx", () => {
  it("markup", () => {
    render(<User {...user} />);
    expect(getByTestId("user-name")).toHaveTextContent("Leanne Graham");
    expect(getByTestId("user-phone")).toHaveTextContent("1-770-736-8031");
    expect(getByTestId("user-website")).toHaveTextContent("hildegard.org");
    expect(getByTestId("user-email")).toHaveTextContent("Sincere@april.biz");
  });
});
