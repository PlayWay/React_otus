import { play } from "./play";
import { COLORS } from "./const";
import { Colors, GridItem } from "../types";

describe("play func", () => {
  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  it('func should return object with props ["filledArray", "searchColor", "winSeries"]', () => {
    const funcReturn = play(3);
    expect(Object.keys(funcReturn).join(";")).toBe(
      ["filledArray", "searchColor", "winSeries"].join(";")
    );
  });
  it("check return prop filledArray scheme", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
    const funcReturn = play(3, "low");
    expect(funcReturn.filledArray).toHaveLength(3);
    expect(funcReturn.filledArray[0]).toHaveLength(3);
    expect(funcReturn.filledArray[0][2].color).toBe("red");
    expect(funcReturn.filledArray[0][2].id).toBe("02");
    const funcReturn2 = play(5);
    expect(funcReturn2.filledArray).toHaveLength(5);
    expect(funcReturn2.filledArray[3]).toHaveLength(5);
  });
  it('check return prop "searchColor", "winSeries"', () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
    const funcReturn = play(2);
    expect(funcReturn.winSeries).toHaveLength(4);
    expect(funcReturn.winSeries.join(";")).toBe(
      ["00", "01", "10", "11"].join(";")
    );
    expect(COLORS.includes(funcReturn.searchColor)).toBeTruthy();
    expect(funcReturn.searchColor).toBe("red");
  });
  it("should diff filledArray if compare 2 calls", () => {
    const getColors = (arr: GridItem[][] = []) => {
      return arr
        .reduce(
          (acc, cur) => [...acc, ...cur.map((i) => i.color)],
          [] as Colors[]
        )
        .join(";");
    };
    const { filledArray: filledArray1 } = play(5);
    const { filledArray: filledArray2 } = play(5);
    const colors1 = getColors(filledArray1);
    const colors2 = getColors(filledArray2);
    expect(colors1).not.toEqual(colors2);
  });
});
