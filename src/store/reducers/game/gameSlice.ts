import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameInfo, Settings, Statistic, Status } from "../../../types";

export type GameState = {
  gameInfo: GameInfo;
  openAll: boolean;
  active: string[];
  status: Status;
  settings: Settings;
  statistics: Statistic;
};

export const gameInitialState: GameState = {
  active: [],
  gameInfo: {
    searchColor: "black",
    winSeries: [],
    filledArray: [],
  },
  openAll: false,
  status: "reset",
  settings: {
    level: 0,
    complexity: "low",
  },
  statistics: {
    win: 0,
    lose: 0,
    try: 0,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState: gameInitialState,
  reducers: {
    setSettings(
      state,
      { payload }: PayloadAction<{ [K in keyof Settings]?: Settings[K] }>
    ) {
      state.settings = { ...state.settings, ...payload };
    },
    setGameInfo(state, { payload }: PayloadAction<GameInfo>) {
      state.gameInfo = payload;
    },
    levelUp(state) {
      state.settings.level = ++state.settings.level;
    },
    setStatus(state, { payload }: PayloadAction<Status>) {
      state.status = payload;
    },
    updateStatistics(
      state,
      { payload }: PayloadAction<"lose" | "win" | "try">
    ) {
      state.statistics[payload] = ++state.statistics[payload];
    },
    clearActive(state, { payload }: PayloadAction<string[]>) {
      state.active = payload;
    },
    resetState() {
      return gameInitialState;
    },
    addActiveCard(state, { payload }: PayloadAction<string>) {
      state.active.push(payload);
    },
    reset(state) {
      state.gameInfo = {} as GameInfo;
      state.openAll = false;
      state.active = [];
    },
    start(state) {
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
  levelUp,
  addActiveCard,
  setOpenAll,
  setSettings,
  process,
  resetState,
  setGameInfo,
  setStatus,
  updateStatistics,
  clearActive,
} = gameSlice.actions;
export default gameSlice.reducer;
