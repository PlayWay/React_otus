import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth/authSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import gameSlice from "./reducers/game/gameSlice";

const getPreloadedState = () => {
  let state = {};
  try {
    state = JSON.parse(localStorage.getItem("state") as string);
  } catch (e) {}

  return state;
};

export const rootReducer = combineReducers({
  game: gameSlice,
  auth: authSlice,
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: getPreloadedState(),
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
