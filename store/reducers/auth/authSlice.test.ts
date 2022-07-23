import authReducer, { login, logout } from "./authSlice";

describe("authReducer", () => {
  it("should add user if action login", () => {
    expect(authReducer({ user: { name: "" } }, login("TEST"))).toEqual({
      user: { name: "TEST" },
    });
  });
  it("should add user if action logout", () => {
    expect(authReducer({ user: { name: "sdsad" } }, logout())).toEqual({
      user: { name: "" },
    });
  });
});
