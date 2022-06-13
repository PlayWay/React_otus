export type Colors = "orange" | "red" | "blue" | "green" | "black" | "violet";

export type GridItem = { id: string; color: Colors; value: number };
export type GameInfo = {
  filledArray: GridItem[][];
  winSeries: string[];
  searchColor: Colors;
};

export type Status = "start" | "reset" | "end" | "process" | "replay";
