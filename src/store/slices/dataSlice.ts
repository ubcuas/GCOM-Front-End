import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AircraftStatus } from "../../types/AircraftStatus";
import { Route } from "../../types/Route";
import { RootState } from "../store";
import { getMPSQueue, getWaypoints } from "../thunks/dataThunks";
import { Waypoint } from "../../types/Waypoint";

// DataState holds actual information that is supposed to be aligned with backend.
type DataState = {
    aircraftStatus: AircraftStatus;
    route: Route;
    queuedWaypoints: Waypoint[];
};

const initialState: DataState = {
    aircraftStatus: {
        timestamp: new Date().getTime(),
        latitude: 12,
        longitude: -34.567,
        altitude: 890,
        verticalSpeed: 123,
        speed: 45,
        heading: 67,
        // payload is currently TBD on backend
        voltage: 8.9,
    },
    route: {
        id: 0,
        waypoints: [
            { id: "0", name: "a", lat: 48.5086187, long: -71.6505103 },
            { id: "1", name: "b", lat: 48.5075187, long: -71.6516103 },
        ],
    },
    queuedWaypoints: [],
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
    extraReducers: (builder) => {
        builder
            .addCase(getWaypoints.fulfilled, (state, action) => {
                state.route.waypoints = action.payload;
            })
            .addCase(getWaypoints.rejected, (_state, action) => {
                console.log("rejected", action.error);
            })
            .addCase(getMPSQueue.fulfilled, (state, action) => {
                state.route.waypoints = action.payload;
            });
    },
});

export const { updateAircraftStatus, updateRoute, manualUpdateMPSQueue } = dataSlice.actions;

export const selectAircraftStatus = (state: RootState) => state.data.aircraftStatus;
export const selectRoute = (state: RootState) => state.data.route;
export const selectWaypoints = (state: RootState) => state.data.route.waypoints;

const dataReducer = dataSlice.reducer;
export default dataReducer;
