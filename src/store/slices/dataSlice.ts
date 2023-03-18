import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "geojson";
import { RootState } from "..";
import { AEACRoute, RestrictedArea } from "../../types/AEAC";
import { AircraftStatus } from "../../types/AircraftStatus";
import { Waypoint } from "../../types/Waypoint";
import { DUMMY_WAYPOINTS } from "../../utils/constants/dummyData";

type DataState = {
    aircraftStatus: AircraftStatus;
    waypoints: Waypoint[];
    routes: AEACRoute[];
    restrictedArea?: RestrictedArea;
    obstacles: Position[][];
};

const initialState: DataState = {
    aircraftStatus: {
        velocity: 12.123,
        longitude: -71.6375025,
        latitude: 48.5113827,
        altitude: 12.123,
        heading: 12.123,
        voltage: 12.123,
    },
    waypoints: DUMMY_WAYPOINTS,
    routes: [
        {
            id: 3,
            number: 6,
            start_waypoint: "Alpha",
            end_waypoint: "Echo",
            passengers: 2,
            max_vehicle_weight: 15.0,
            value: 23.5,
            remarks: "smtn regarding the route",
            order: 1,
        },
        {
            id: 2,
            number: 6,
            start_waypoint: "Echo",
            end_waypoint: "India",
            passengers: 2,
            max_vehicle_weight: 15.0,
            value: 23.5,
            remarks: "smtn regarding the route",
            order: 2,
        },
        {
            id: 5,
            number: 7,
            start_waypoint: "India",
            end_waypoint: "Papa",
            passengers: 2,
            max_vehicle_weight: 15.0,
            value: 23.5,
            remarks: "smtn regarding the route",
            order: 3,
        },
    ],
    obstacles: [
        [
            [-123.26, 49.25],
            [-123.25, 49.23],
            [-123.247, 49.28],
        ],
    ],
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        updateAircraftStatus: (state, action: PayloadAction<AircraftStatus>) => {
            state.aircraftStatus = action.payload;
        },
        updateWaypoints: (state, action: PayloadAction<Waypoint[]>) => {
            state.waypoints = action.payload;
        },
        updateRoutes: (state, action: PayloadAction<AEACRoute[]>) => {
            state.routes = action.payload;
        },
        updateObstacles: (state, action: PayloadAction<Position[][]>) => {
            state.obstacles = action.payload;
        },
    },
});

export const selectAircraftStatus = (state: RootState) => state.data.aircraftStatus;
export const selectWaypoints = (state: RootState) => state.data.waypoints;
export const selectRoutes = (state: RootState) => state.data.routes;
export const selectObstacles = (state: RootState) => state.data.obstacles;

export const { updateAircraftStatus, updateWaypoints, updateRoutes, updateObstacles } = dataSlice.actions;

const dataReducer = dataSlice.reducer;
export default dataReducer;
