import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameInfo, Status } from "../types";

export type GameState = {
  gameInfo: GameInfo;
  openAll: boolean;
  active: string[];
  status: Status;
};

const initialState: GameState = {
  active: [],
  gameInfo: {} as GameInfo,
  openAll: false,
  status: "reset",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameInfo(state, action: PayloadAction<GameInfo>) {
      state.gameInfo = action.payload;
    },
    setOpenAll(state, action: PayloadAction<boolean>) {
      state.openAll = action.payload;
    },
    addActiveCard(state, { payload }: PayloadAction<string>) {
      state.active.push(payload);
    },
    clearActiveCards(state) {
      state.active = [];
    },
    setStatus(state, { payload }: PayloadAction<Status>) {
      state.status = payload;
    },
  },
});

export const {
  setGameInfo,
  setStatus,
  setOpenAll,
  clearActiveCards,
  addActiveCard,
} = gameSlice.actions;
export default gameSlice.reducer;
