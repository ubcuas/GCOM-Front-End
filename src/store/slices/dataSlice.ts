import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position } from "geojson";
import { RootState } from "..";
import { Route } from "../../types/Route";
import { Waypoint } from "../../types/Waypoint";

type DataState = {
    waypoints: Waypoint[];
    routes: Route[];
    obstacles: Position[][];
};

const initialState: DataState = {
    waypoints: [
        {
            id: 1,
            name: "Alpha",
            longitude: -123.245,
            latitude: 49.25,
            altitude: 23.5,
            remarks: "waypoint remark",
        },
        {
            id: 2,
            name: "Beta",
            longitude: -123.25,
            latitude: 49.28,
            altitude: 23.5,
        },
        {
            id: 3,
            name: "Gamma",
            longitude: -123.23,
            latitude: 49.24,
            altitude: 23.5,
        },
    ],
    routes: [
        {
            id: 3,
            number: 6,
            start_waypoint: 3,
            end_waypoint: 2,
            passengers: 2,
            value: 23.5,
            remarks: "smtn regarding the route",
            order: 1,
        },
        {
            id: 2,
            number: 6,
            start_waypoint: 2,
            end_waypoint: 1,
            passengers: 2,
            value: 23.5,
            remarks: "smtn regarding the route",
            order: 2,
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
        updateWaypoints: (state, action: PayloadAction<Waypoint[]>) => {
            state.waypoints = action.payload;
        },
        updateRoutes: (state, action: PayloadAction<Route[]>) => {
            state.routes = action.payload;
        },
        updateObstacles: (state, action: PayloadAction<Position[][]>) => {
            state.obstacles = action.payload;
        },
    },
});

export const selectWaypoints = (state: RootState) => state.data.waypoints;
export const selectRoutes = (state: RootState) => state.data.routes;
export const selectObstacles = (state: RootState) => state.data.obstacles;

export const { updateWaypoints, updateRoutes, updateObstacles } = dataSlice.actions;

const dataReducer = dataSlice.reducer;
export default dataReducer;
