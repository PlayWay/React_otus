import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameInfo, Status } from "../types";
import { play } from "../helpers/play";

export type GameState = {
  gameInfo: GameInfo;
  openAll: boolean;
  active: string[];
  status: Status;
  size: number;
};

const initialState: GameState = {
  active: [],
  gameInfo: {} as GameInfo,
  openAll: false,
  status: "reset",
  size: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSize(state, { payload }: PayloadAction<number>) {
      state.size = payload;
    },
    addActiveCard(state, { payload }: PayloadAction<string>) {
      state.active.push(payload);
    },
    reset(state) {
      state.gameInfo = {
        filledArray: [],
        winSeries: [],
        searchColor: "red",
      };
      state.openAll = false;
      state.active = [];
    },
    start(state) {
      state.gameInfo = play(state.size);
      state.status = "start";
      state.openAll = true;
      state.active = [];
    },
    replay(state) {
      state.openAll = false;
      state.active = [];
      state.status = "replay";
    },
    endGame(state) {
      state.status = "end";
      state.openAll = true;
      state.active = [];
    },
    process(state) {
      state.status = "process";
    },
    setOpenAll(state, { payload }: PayloadAction<boolean>) {
      state.openAll = payload;
    },
  },
});

export const {
  start,
  reset,
  replay,
  endGame,
  addActiveCard,
  setOpenAll,
  process,
  setSize,
} = gameSlice.actions;
export default gameSlice.reducer;
