import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";
import authSlice from "./authSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";

const getPreloadedState = () => {
  let state;

  try {
    state = JSON.parse(localStorage.getItem("state") as string);
  } catch (e) {}

  return state;
};

export const rootReducer = {
  game: gameSlice,
  auth: authSlice,
};

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: getPreloadedState(),
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
