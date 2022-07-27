import { Location } from "react-router-dom";
import { COLORS } from "./helpers/const";

export type UnionOfArrayElements<ARR_T extends Readonly<unknown[]>> =
  ARR_T[number];

export type Colors = UnionOfArrayElements<typeof COLORS>;

export type GridItem = { id: string; color: Colors; value: number };
export type GameInfo = {
  filledArray: GridItem[][];
  winSeries: string[];
  searchColor: Colors;
};

export type Status = "start" | "reset" | "end" | "process" | "replay";

export type NavigationState = {
  from?: Location;
};

export type ComplexityType = "low" | "middle" | "hard";

export type Settings = {
  level: number;
  complexity: ComplexityType;
};

export type Statistic = {
  win: number;
  lose: number;
  try: number;
};
