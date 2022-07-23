import { Middleware } from "@reduxjs/toolkit";

export const locaStorageMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action) => {
    localStorage.setItem("state", JSON.stringify(getState()));
    return next(action);
  };
