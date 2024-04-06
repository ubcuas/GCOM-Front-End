import { createSlice } from "@reduxjs/toolkit";
import { Waypoint } from "../../types/Waypoint";
import { RootState } from "../store";

type AppState = {
    queuedWaypoints: Waypoint[];
    preferredTheme: "light" | "dark";
};

const initialState: AppState = {
    queuedWaypoints: [],
    preferredTheme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
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
    },
});

export const { addToQueuedWaypoints, clearQueuedWaypoints, removeOneFromWaypoints, setPreferredTheme } =
    appSlice.actions;

export const selectQueuedWaypoints = (state: RootState) => state.app.queuedWaypoints;
export const selectPreferredTheme = (state: RootState) => state.app.preferredTheme;

const appReducer = appSlice.reducer;
export default appReducer;
