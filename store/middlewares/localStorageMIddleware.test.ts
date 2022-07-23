import { locaStorageMiddleware } from "./locaStorageMiddleware";

const next = jest.fn();
const mockState = { a: 1, b: 2, c: 3 };
const store = {
  getState: jest.fn().mockReturnValue(mockState),
  dispatch: jest.fn(),
};

describe("localStorageMiddleWare", () => {
  it("call localstorage with state JSON.stringify", () => {
    jest.spyOn(window.localStorage.__proto__, "setItem");
    window.localStorage.__proto__.setItem = jest.fn();
    const action = { type: "YOUR_ACTION_TYPE", payload: { your: "data" } };
    locaStorageMiddleware(store)(next)(action);
    expect(store.getState).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "state",
      JSON.stringify(mockState)
    );
    expect(next).toHaveBeenCalledWith(action);
  });
});
