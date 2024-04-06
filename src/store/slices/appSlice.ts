import { createSlice } from "@reduxjs/toolkit";
import { Waypoint } from "../../types/Waypoint";
import { RootState } from "../store";

type AppState = {
    queuedWaypoints: Waypoint[];
    preferredTheme: "light" | "dark";
    globalSnackbar: {
        message: string;
        open: boolean;
    };
};

const initialState: AppState = {
    queuedWaypoints: [],
    preferredTheme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
    globalSnackbar: {
        message: "",
        open: false,
    },
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addToQueuedWaypoints: (state, action) => {
            state.queuedWaypoints.push(action.payload);
        },
        clearQueuedWaypoints: (state) => {
            state.queuedWaypoints = [];
        },
        removeOneFromWaypoints: (state, action) => {
            state.queuedWaypoints.splice(action.payload, 1);
        },
        setPreferredTheme: (state, action) => {
            localStorage.setItem("theme", action.payload);
            state.preferredTheme = action.payload;
        },
        openSnackbar: (state, action) => {
            state.globalSnackbar = {
                message: action.payload,
                open: true,
            };
        },
        closeSnackbar: (state) => {
            state.globalSnackbar.open = false;
        },
    },
});

export const {
    addToQueuedWaypoints,
    clearQueuedWaypoints,
    removeOneFromWaypoints,
    setPreferredTheme,
    openSnackbar,
    closeSnackbar,
} = appSlice.actions;

export const selectQueuedWaypoints = (state: RootState) => state.app.queuedWaypoints;
export const selectPreferredTheme = (state: RootState) => state.app.preferredTheme;
export const selectSnackbar = (state: RootState) => state.app.globalSnackbar;

const appReducer = appSlice.reducer;
export default appReducer;
