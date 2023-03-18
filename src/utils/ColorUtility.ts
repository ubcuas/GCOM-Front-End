import { ThemeColor, ThemeColorFamily } from "./constants/enums/theme";

export default class ColorUtility {
    private static colorArray: (keyof typeof ThemeColorFamily)[] = Object.values(ThemeColor);

    public static getColorFamilyFromIndex(i: number) {
        return ThemeColorFamily[ColorUtility.colorArray[i % ColorUtility.colorArray.length]];
    }
}
