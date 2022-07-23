import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import gameSlice from "./game/gameSlice";
import authSlice from "./auth/authSlice";

const gamePersistConfig = {
  key: "game",
  storage,
  whitelist: ["settings", "statistics"],
};
export const rootReducer = combineReducers({
  game: persistReducer(gamePersistConfig, gameSlice),
  auth: authSlice,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
