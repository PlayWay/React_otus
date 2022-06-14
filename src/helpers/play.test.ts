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
    const funcReturn = play(3);
    expect(funcReturn.filledArray.length).toBe(3);
    expect(funcReturn.filledArray[0].length).toBe(3);
    expect(funcReturn.filledArray[0][2].color).toBe("orange");
    expect(funcReturn.filledArray[0][2].id).toBe("02");
    const funcReturn2 = play(5);
    expect(funcReturn2.filledArray.length).toBe(5);
    expect(funcReturn2.filledArray[3].length).toBe(5);
  });
  it('check return prop "searchColor", "winSeries"', () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
    const funcReturn = play(2);
    expect(funcReturn.winSeries.length).toBe(4);
    expect(funcReturn.winSeries.join(";")).toBe(
      ["00", "01", "10", "11"].join(";")
    );
    expect(COLORS.includes(funcReturn.searchColor)).toBeTruthy();
    expect(funcReturn.searchColor).toBe("orange");
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
