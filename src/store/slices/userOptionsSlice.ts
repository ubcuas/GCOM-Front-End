import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ThemeMode } from "../../utils/constants/enums/theme";

type UserOptionsState = {
    theme: {
        mode: ThemeMode;
    };
};

const initialState: UserOptionsState = {
    theme: {
        mode: ThemeMode.Dark,
    },
};

const userOptionsSlice = createSlice({
    name: "userOptions",
    initialState,
    reducers: {
        updateThemeMode: (state, action: PayloadAction<ThemeMode>) => {
            state.theme.mode = action.payload;
        },
    },
});

export const selectTheme = (state: RootState) => state.userOptions.theme;

const userOptionsReducer = userOptionsSlice.reducer;
export default userOptionsReducer;
