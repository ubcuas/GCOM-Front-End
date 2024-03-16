import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AircraftStatus } from "../../types/AircraftStatus";
import { Route } from "../../types/Route";
import { RootState } from "../store";
import { getWaypoints } from "../thunks/dataThunks";
import { Waypoint } from "../../types/Waypoint";

type DataState = {
    aircraftStatus: AircraftStatus;
    route: Route;
    queuedWaypoints: Waypoint[];
};

const initialState: DataState = {
    aircraftStatus: {
        timestamp: new Date().getTime(),
        latitude: 51.14557,
        longitude: -114.24515,
        altitude: 1992,
        verticalSpeed: 45,
        speed: 52,
        heading: 193,
        // payload is currently TBD on backend
        voltage: 21.6,
    },
    route: {
        id: 0,
        waypoints: [
            { id: "0", name: "test", lat: 0, long: 0 },
            { id: "1", name: "test", lat: 20, long: 20 },
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
        addToQueuedWaypoints: (state, action: PayloadAction<Waypoint>) => {
            state.queuedWaypoints.push(action.payload);
        },
        clearQueuedWaypoints: (state) => {
            state.queuedWaypoints = [];
        },
        removeOneFromWaypoints: (state, action: PayloadAction<number>) => {
            state.queuedWaypoints.splice(action.payload, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWaypoints.fulfilled, (state, action) => {
                state.route.waypoints = action.payload;
            })
            .addCase(getWaypoints.rejected, (_state, action) => {
                console.log("rejected", action.error);
            });
    },
});

export const { updateAircraftStatus, updateRoute, addToQueuedWaypoints, clearQueuedWaypoints, removeOneFromWaypoints } =
    dataSlice.actions;

export const selectAircraftStatus = (state: RootState) => state.data.aircraftStatus;
export const selectRoute = (state: RootState) => state.data.route;
export const selectWaypoints = (state: RootState) => state.data.route.waypoints;
export const selectQueuedWaypoints = (state: RootState) => state.data.queuedWaypoints;

const dataReducer = dataSlice.reducer;
export default dataReducer;
