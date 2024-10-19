import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AircraftStatus } from "../../types/AircraftStatus";
import { Route } from "../../types/Route";
import { RootState } from "../store";
import { Waypoint } from "../../types/Waypoint";

// DataState holds actual information that is supposed to be aligned with backend.
type DataState = {
    aircraftStatus: AircraftStatus;
    route: Route;
};

const initialState: DataState = {
    aircraftStatus: {
        timestamp: new Date().getTime(),
        latitude: 0,
        longitude: 0,
        altitude: 100,
        verticalSpeed: 100,
        speed: 100,
        heading: 90,
        voltage: 9,
    },
    route: {
        id: 0,
        waypoints: [
            { id: "0", name: "a", lat: 10, long: 10 },
            { id: "1", name: "b", lat: -10, long: -10 },
        ],
    },
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        updateAircraftStatus: (state, action: PayloadAction<AircraftStatus>) => {
            state.aircraftStatus = action.payload;
        },
        updateRoute: (state, action: PayloadAction<Route>) => {
            state.route = action.payload;
        },
        manualUpdateMPSQueue: (state, action: PayloadAction<Waypoint[]>) => {
            state.route.waypoints = action.payload;
        },
    },
});

export const { updateAircraftStatus, updateRoute, manualUpdateMPSQueue } = dataSlice.actions;

export const selectAircraftStatus = (state: RootState) => state.data.aircraftStatus;
export const selectRoute = (state: RootState) => state.data.route;
export const selectMPSWaypoints = (state: RootState) => state.data.route.waypoints;

const dataReducer = dataSlice.reducer;
export default dataReducer;
