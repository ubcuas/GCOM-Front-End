import { createSlice } from "@reduxjs/toolkit";
import { Waypoint } from "../../types/Waypoint";
import { RootState } from "../store";
import { socket } from "../../api/socket";

// REDUX SLICE

type AppState = {
    queuedWaypoints: Waypoint[];
    preferredTheme: "light" | "dark";
    globalSnackbar: {
        message: string;
        open: boolean;
    };
    telemetrySockets: boolean;
    bypassArmingRestriction: boolean;
    autoClearWaypoints: boolean;
};

const initialState: AppState = {
    queuedWaypoints: [],
    preferredTheme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
    globalSnackbar: {
        message: "",
        open: false,
    },
    telemetrySockets: false,
    bypassArmingRestriction: false,
    autoClearWaypoints: false,
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
        setSocketStatus: (state, action) => {
            if (action.payload) {
                socket.connect();
            } else {
                socket.disconnect();
            }
            state.telemetrySockets = action.payload;
        },
        setBypassStatus: (state, action) => {
            state.bypassArmingRestriction = action.payload;
        },
        setAutoClearWaypoints: (state, action) => {
            state.autoClearWaypoints = action.payload;
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
    setSocketStatus,
    setBypassStatus,
    setAutoClearWaypoints,
} = appSlice.actions;

export const selectQueuedWaypoints = (state: RootState) => state.app.queuedWaypoints;
export const selectPreferredTheme = (state: RootState) => state.app.preferredTheme;
export const selectSnackbar = (state: RootState) => state.app.globalSnackbar;
export const selectSocketStatus = (state: RootState) => state.app.telemetrySockets;
export const selectBypassStatus = (state: RootState) => state.app.bypassArmingRestriction;
export const selectAutoClearWaypoints = (state: RootState) => state.app.autoClearWaypoints;

const appReducer = appSlice.reducer;
export default appReducer;
