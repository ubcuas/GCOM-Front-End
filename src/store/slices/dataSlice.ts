import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AircraftStatus } from "../../types/AircraftStatus";
import { Route } from "../../types/Route";
import { RootState } from "../store";

type DataState = {
    aircraftStatus: AircraftStatus;
    route: Route;
};

const initialState: DataState = {
    aircraftStatus: {
        timestamp: 0,
        latitude: 0,
        longitude: 0,
        altitude: 0,
        verticalSpeed: 0,
        speed: 0,
        heading: 0,
        // payload is currently TBD on backend
        voltage: 0,
    },
    route: {
        id: 0,
        waypoints: [
            { id: 0, name: "test", latitude: 0, longitude: 0, altitude: 0 },
            { id: 1, name: "test", latitude: 0, longitude: 0, altitude: 0 },
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
    },
});

export const { updateAircraftStatus, updateRoute } = dataSlice.actions;

export const selectAircraftStatus = (state: RootState) => state.data.aircraftStatus;
export const selectRoute = (state: RootState) => state.data.route;

const dataReducer = dataSlice.reducer;
export default dataReducer;
