import React, { FC, PropsWithChildren, ReactElement } from "react";
import { createStore } from "@reduxjs/toolkit";
import { persistor, RootState } from "../store/store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { gameInitialState } from "../store/reducers/game/gameSlice";
import { authInitialState } from "../store/reducers/auth/authSlice";
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from "../store/reducers/rootReducer";

export const initState = {
  auth: authInitialState,
  game: gameInitialState,
};
export const renderWithRedux = (
  component: ReactElement,
  initialState?: RootState,
  store?: ReturnType<typeof createStore>
) => {
  const state = initialState || (initState as RootState);
  const Wrapper: FC<PropsWithChildren<object>> = ({ children }) => {
    return (
      <Provider store={store || createStore(rootReducer, state)}>
        <PersistGate persistor={persistor}>{children}</PersistGate>{" "}
      </Provider>
    );
  };

  return {
    ...render(component, {
      wrapper: Wrapper,
    }),
    store,
  };
};
