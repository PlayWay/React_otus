import { GameInfo } from "../types";

export const mockCards = [
  [
    { id: "00", color: "green", value: 0 },
    { id: "01", color: "red", value: 1 },
    { id: "02", color: "blue", value: 2 },
  ],
  [
    { id: "10", color: "black", value: 0 },
    { id: "11", color: "orange", value: 1 },
    { id: "12", color: "blue", value: 2 },
  ],
  [
    { id: "20", color: "green", value: 0 },
    { id: "21", color: "red", value: 1 },
    { id: "22", color: "violet", value: 2 },
  ],
] as GameInfo["filledArray"];
