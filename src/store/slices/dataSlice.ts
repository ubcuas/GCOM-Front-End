import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AircraftStatus } from "../../types/AircraftStatus";
import { Route } from "../../types/Route";

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

const dataReducer = dataSlice.reducer;
export default dataReducer;
