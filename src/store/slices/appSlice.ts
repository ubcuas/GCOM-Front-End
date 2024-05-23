import { createSlice } from "@reduxjs/toolkit";
import { Waypoint } from "../../types/Waypoint";
import { RootState } from "../store";
import { socket } from "../../api/socket";
import { getDefaultCoordinates } from "../../utils/getDefaultCoords";

// REDUX SLICE

type AppState = {
    queuedWaypoints: Waypoint[];
    preferredTheme: "light" | "dark";
    globalSnackbar: {
        message: string;
        open: boolean;
    };
    telemetrySockets: boolean;
    centerCoordinates: {
        lat: number;
        long: number;
    };
    bypassArmingRestriction: boolean;
};

const initialState: AppState = {
    queuedWaypoints: [],
    preferredTheme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
    globalSnackbar: {
        message: "",
        open: false,
    },
    telemetrySockets: false,
    centerCoordinates: getDefaultCoordinates(),
    bypassArmingRestriction: false,
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
        setCenterCoordinates: (state, action) => {
            localStorage.setItem("latitude", action.payload.lat);
            localStorage.setItem("longitude", action.payload.long);
            state.centerCoordinates = action.payload;
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
    setCenterCoordinates,
} = appSlice.actions;

export const selectQueuedWaypoints = (state: RootState) => state.app.queuedWaypoints;
export const selectPreferredTheme = (state: RootState) => state.app.preferredTheme;
export const selectSnackbar = (state: RootState) => state.app.globalSnackbar;
export const selectSocketStatus = (state: RootState) => state.app.telemetrySockets;
export const selectBypassStatus = (state: RootState) => state.app.bypassArmingRestriction;
export const selectCenterCoordinates = (state: RootState) => state.app.centerCoordinates;

const appReducer = appSlice.reducer;
export default appReducer;
