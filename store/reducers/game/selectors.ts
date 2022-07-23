import { RootState } from "../../store";

export const areaSizeSelector = (state: RootState) => state.game.settings.level;
export const openAllSelector = (state: RootState) => state.game.openAll;
export const gameStatusSelector = (state: RootState) => state.game.status;
export const activeSelector = (state: RootState) => state.game.active;
export const gameInfoSelector = (state: RootState) => state.game.gameInfo;
export const statisticSelector = (state: RootState) => state.game.statistics;
export const settingsSelector = (state: RootState) => state.game.settings;
