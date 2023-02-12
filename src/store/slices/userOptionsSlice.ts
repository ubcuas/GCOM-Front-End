import { SimplePaletteColorOptions } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ThemeColor, ThemeColorFamily, ThemeMode } from "../../utils/constants/enums/theme";

type UserOptionsState = {
    themeOptions: {
        palette: {
            mode: ThemeMode;
            primary: SimplePaletteColorOptions;
        };
    };
    themeColor: ThemeColor;
};

const initialThemeMode = ThemeMode.Dark;
const initialThemeColor = ThemeColor.Blue;

const initialState: UserOptionsState = {
    themeOptions: {
        palette: {
            mode: ThemeMode.Dark,
            primary: ThemeColorFamily[initialThemeColor][initialThemeMode],
        },
    },
    themeColor: initialThemeColor,
};

const userOptionsSlice = createSlice({
    name: "userOptions",
    initialState,
    reducers: {
        updateThemeMode: (state, action: PayloadAction<ThemeMode>) => {
            state.themeOptions.palette.mode = action.payload;
            state.themeOptions.palette.primary = ThemeColorFamily[state.themeColor][action.payload];
        },
        updateThemeColor: (state, action: PayloadAction<ThemeColor>) => {
            state.themeColor = action.payload;
            state.themeOptions.palette.primary = ThemeColorFamily[action.payload][state.themeOptions.palette.mode];
        },
    },
});

export const selectThemeOptions = (state: RootState) => state.userOptions.themeOptions;
export const selectThemeColor = (state: RootState) => state.userOptions.themeColor;

export const { updateThemeMode, updateThemeColor } = userOptionsSlice.actions;

const userOptionsReducer = userOptionsSlice.reducer;
export default userOptionsReducer;
