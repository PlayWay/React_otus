import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import authSlice from "./authSlice";
import { locaStorageMiddleware } from "./middlewares/locaStorageMiddleware";

const getPreloadedState = () => {
  let state;

  try {
    state = JSON.parse(localStorage.getItem("state") as string);
  } catch (e) {}

  return state;
};

export const store = configureStore({
  reducer: {
    game: gameSlice,
    auth: authSlice,
  },
  preloadedState: getPreloadedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(locaStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
