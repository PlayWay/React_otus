import authReducer, { login, logout } from "./authSlice";

describe("authReducer", () => {
  it("should add user if action login", () => {
    expect(authReducer({ user: "" }, login("TEST"))).toEqual({
      user: "TEST",
    });
  });
  it("should add user if action logout", () => {
    expect(authReducer({ user: "sdsad" }, logout())).toEqual({
      user: "",
    });
  });
});
