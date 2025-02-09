import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Waypoint } from "../../types/Waypoint";
import { RootState } from "../store";
import { socket } from "../../api/socket";
import { Coords } from "../../types/Coords";
import { defaultCoords } from "../../utils/coords";

// REDUX SLICE

type AppState = {
    waypoints: Waypoint[];
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
    mapCenterCoords: Coords;
};

const initialState: AppState = localStorage.getItem("appSlice")
    ? JSON.parse(localStorage.getItem("appSlice")!)
    : {
          waypoints: [],
          preferredTheme: "dark",
          globalSnackbar: {
              message: "",
              open: false,
          },
          telemetrySockets: false,
          bypassArmingRestriction: false,
          autoClearWaypoints: false,
          mpsWaypointMapState: [],
          mapViewOpen: false,
          mapCenterCoords: defaultCoords,
      };

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setWaypoints: (state, action: PayloadAction<Waypoint[]>) => {
            state.waypoints = action.payload;
        },
        setPreferredTheme: (state, action: PayloadAction<"light" | "dark">) => {
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
        setMapCenterCoords: (state, action: PayloadAction<Coords>) => {
            state.mapCenterCoords = action.payload;
        },
    },
});

export const {
    setWaypoints,
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
    setMapCenterCoords,
} = appSlice.actions;

export const selectAppSlice = (state: RootState) => state.app;

export const selectWaypoints = (state: RootState) => state.app.waypoints;
export const selectPreferredTheme = (state: RootState) => state.app.preferredTheme;
export const selectSnackbar = (state: RootState) => state.app.globalSnackbar;
export const selectSocketStatus = (state: RootState) => state.app.telemetrySockets;
export const selectBypassStatus = (state: RootState) => state.app.bypassArmingRestriction;
export const selectAutoClearWaypoints = (state: RootState) => state.app.autoClearWaypoints;
export const selectMpsWaypointMapState = (state: RootState) => state.app.mpsWaypointMapState;
export const selectMapViewOpen = (state: RootState) => state.app.mapViewOpen;
export const selectMapCenterCoords = (state: RootState) => state.app.mapCenterCoords;

const appReducer = appSlice.reducer;
export default appReducer;
