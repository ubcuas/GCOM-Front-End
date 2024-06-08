import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    mpsWaypointMapState: boolean[];
    mapViewOpen: boolean;
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
    mpsWaypointMapState: [],
    mapViewOpen: false,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addToQueuedWaypoints: (state, action: PayloadAction<Waypoint>) => {
            state.queuedWaypoints.push(action.payload);
        },
        setQueuedWaypoints: (state, action: PayloadAction<Waypoint[]>) => {
            state.queuedWaypoints = action.payload;
        },
        clearQueuedWaypoints: (state) => {
            state.queuedWaypoints = [];
        },
        removeOneFromWaypoints: (state, action: PayloadAction<number>) => {
            state.queuedWaypoints.splice(action.payload, 1);
        },
        editWaypointAtIndex: (state, action: PayloadAction<{ index: number; waypoint: Waypoint }>) => {
            state.queuedWaypoints[action.payload.index] = action.payload.waypoint;
        },
        setPreferredTheme: (state, action: PayloadAction<"light" | "dark">) => {
            localStorage.setItem("theme", action.payload);
            state.preferredTheme = action.payload;
        },
        openSnackbar: (state, action: PayloadAction<string>) => {
            state.globalSnackbar = {
                message: action.payload,
                open: true,
            };
        },
        closeSnackbar: (state) => {
            state.globalSnackbar.open = false;
        },
        setSocketStatus: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                socket.connect();
            } else {
                socket.disconnect();
            }
            state.telemetrySockets = action.payload;
        },
        setBypassStatus: (state, action: PayloadAction<boolean>) => {
            state.bypassArmingRestriction = action.payload;
        },
        setAutoClearWaypoints: (state, action: PayloadAction<boolean>) => {
            state.autoClearWaypoints = action.payload;
        },
        toggleMpsWaypointMapState: (state, action: PayloadAction<number>) => {
            state.mpsWaypointMapState[action.payload] = !state.mpsWaypointMapState[action.payload];
        },
        setAllMpsWaypointMapState: (state, action: PayloadAction<boolean>) => {
            state.mpsWaypointMapState = state.mpsWaypointMapState.map((_bool) => action.payload);
        },
        initializeMpsWaypointMapState: (state, action: PayloadAction<number>) => {
            state.mpsWaypointMapState = new Array(action.payload).fill(false);
        },
        setMapViewOpen: (state, action: PayloadAction<boolean>) => {
            state.mapViewOpen = action.payload;
        },
    },
});

export const {
    addToQueuedWaypoints,
    setQueuedWaypoints,
    clearQueuedWaypoints,
    removeOneFromWaypoints,
    editWaypointAtIndex,
    setPreferredTheme,
    openSnackbar,
    closeSnackbar,
    setSocketStatus,
    setBypassStatus,
    setAutoClearWaypoints,
    toggleMpsWaypointMapState,
    setAllMpsWaypointMapState,
    initializeMpsWaypointMapState,
    setMapViewOpen,
} = appSlice.actions;

export const selectQueuedWaypoints = (state: RootState) => state.app.queuedWaypoints;
export const selectPreferredTheme = (state: RootState) => state.app.preferredTheme;
export const selectSnackbar = (state: RootState) => state.app.globalSnackbar;
export const selectSocketStatus = (state: RootState) => state.app.telemetrySockets;
export const selectBypassStatus = (state: RootState) => state.app.bypassArmingRestriction;
export const selectAutoClearWaypoints = (state: RootState) => state.app.autoClearWaypoints;
export const selectMpsWaypointMapState = (state: RootState) => state.app.mpsWaypointMapState;
export const selectMapViewOpen = (state: RootState) => state.app.mapViewOpen;

const appReducer = appSlice.reducer;
export default appReducer;
