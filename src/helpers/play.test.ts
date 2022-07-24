import {
  fillColor,
  getColorForComplexity,
  getPlayArray,
  getRandomArbitrary,
  getRandomArrayItems,
  getSearchColor,
  play,
} from "./play";
import { COLORS } from "./const";
import { Colors, GridItem } from "../types";

const mockColors = ["red", "green", "blue", "black", "purple", "white"];

describe("play func", () => {
  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  describe("func play", () => {
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

  describe("func getPlayArray", () => {
    it("check generate array if size 2", () => {
      expect(getPlayArray(2)).toEqual([
        [
          {
            id: "00",
            value: 0,
          },
          {
            id: "01",
            value: 1,
          },
        ],
        [
          {
            id: "10",
            value: 0,
          },
          {
            id: "11",
            value: 1,
          },
        ],
      ]);
    });
    it("check generate array if size 4", () => {
      expect(getPlayArray(4)).toEqual([
        [
          {
            id: "00",
            value: 0,
          },
          {
            id: "01",
            value: 1,
          },
          {
            id: "02",
            value: 2,
          },
          {
            id: "03",
            value: 3,
          },
        ],
        [
          {
            id: "10",
            value: 0,
          },
          {
            id: "11",
            value: 1,
          },
          {
            id: "12",
            value: 2,
          },
          {
            id: "13",
            value: 3,
          },
        ],
        [
          {
            id: "20",
            value: 0,
          },
          {
            id: "21",
            value: 1,
          },
          {
            id: "22",
            value: 2,
          },
          {
            id: "23",
            value: 3,
          },
        ],
        [
          {
            id: "30",
            value: 0,
          },
          {
            id: "31",
            value: 1,
          },
          {
            id: "32",
            value: 2,
          },
          {
            id: "33",
            value: 3,
          },
        ],
      ]);
    });
  });

  describe("func fillColor", () => {
    it("should return 'red'", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
      expect(fillColor(mockColors)).toBe("red");
    });
    it("should return 'black'", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.5);
      expect(fillColor(mockColors)).toBe("black");
    });
    it("should return 'purple'", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.75647);
      expect(fillColor(mockColors)).toBe("purple");
    });
  });

  describe("func getColorForComplexity", () => {
    it("check return array if LOW level", () => {
      expect(getColorForComplexity(mockColors, "low")).toEqual([
        "red",
        "green",
        "blue",
        "black",
        "purple",
        "white",
      ]);
    });
    it("check return array if MIDDLE level", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);

      expect(getColorForComplexity(mockColors, "middle")).toEqual([
        "red",
        "green",
        "blue",
      ]);
    });
    it("check return array if HARD level", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.7563);

      expect(getColorForComplexity(mockColors, "hard")).toEqual([
        "white",
        "purple",
      ]);
    });
  });

  describe("func getRandomArbitrary", () => {
    it("should return 3 if interval [1,10]", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.232356);
      expect(getRandomArbitrary(1, 10)).toBe(3);
    });
    it("should return 6 if interval [1,10]", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.65645);
      expect(getRandomArbitrary(1, 10)).toBe(6);
    });
    it("should return 2 if interval [1,10]", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.12314234);
      expect(getRandomArbitrary(1, 10)).toBe(2);
    });
  });

  describe("func getSearchColor", () => {
    it("should return black", () => {
      expect(
        getSearchColor({
          green: 5,
          red: 2,
          black: 10,
        })
      ).toEqual({ color: "black", count: 10 });
    });
    it("should return pink", () => {
      expect(
        getSearchColor({
          green: 5,
          pink: 22,
          black: 10,
        })
      ).toEqual({ color: "pink", count: 22 });
    });
    it("should return yellow if all duplicate", () => {
      expect(
        getSearchColor({
          green: 5,
          pink: 5,
          yellow: 5,
        })
      ).toEqual({ color: "yellow", count: 5 });
    });
  });
  describe("func getRandomArrayItems", () => {
    it("should return [5,4,3]", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.65645);
      expect(getRandomArrayItems([1, 2, 3, 4, 5], 3)).toEqual([5, 4, 3]);
    });
    it("should return [1,2,3]", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.312312312);
      expect(getRandomArrayItems([1, 2, 3, 4, 5, 6, 7, 8], 3)).toEqual([
        1, 2, 3,
      ]);
    });
  });
});
