import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AEACRoute, AEACTask, RestrictedArea } from "../../types/AEAC";
import { AircraftStatus } from "../../types/AircraftStatus";
import { Waypoint } from "../../types/Waypoint";
import { DUMMY_WAYPOINTS } from "../../utils/constants/dummyData";

type DataState = {
    aircraftStatus: AircraftStatus;
    waypoints: Waypoint[];
    routes: AEACRoute[];
    restrictedArea?: RestrictedArea;
    aeac: {
        currentTask: AEACTask;
        task1: {
            routes: AEACRoute[];
            restrictedArea?: RestrictedArea;
        };
        task2: {
            routes: AEACRoute[];
        };
    };
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
    aeac: {
        currentTask: 1,
        task1: {
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
        },
        task2: {
            routes: [],
        },
    },
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
        updateCurrentTask: (state, action: PayloadAction<AEACTask>) => {
            state.aeac.currentTask = action.payload;
        },
        updateTask1Routes: (state, action: PayloadAction<AEACRoute[]>) => {
            state.aeac.task1.routes = action.payload;
        },
        updateTask1RestrictedArea: (state, action: PayloadAction<RestrictedArea>) => {
            state.aeac.task1.restrictedArea = action.payload;
        },
        updateTask2Routes: (state, action: PayloadAction<AEACRoute[]>) => {
            state.aeac.task2.routes = action.payload;
        },
    },
});

export const selectAircraftStatus = (state: RootState) => state.data.aircraftStatus;
export const selectWaypoints = (state: RootState) => state.data.waypoints;
export const selectRoutes = (state: RootState) => state.data.routes;
export const selectCurrentTask = (state: RootState) => state.data.aeac.currentTask;
export const selectCurrentTaskRoutes = (state: RootState) =>
    (state.data.aeac.currentTask === 1 ? selectTask1Routes : selectTask2Routes)(state);
export const selectTask1Routes = (state: RootState) => state.data.aeac.task1.routes;
export const selectTask1RestrictedArea = (state: RootState) => state.data.aeac.task1.restrictedArea;
export const selectTask2Routes = (state: RootState) => state.data.aeac.task2.routes;

export const {
    updateAircraftStatus,
    updateWaypoints,
    updateRoutes,
    updateCurrentTask,
    updateTask1Routes,
    updateTask1RestrictedArea,
    updateTask2Routes,
} = dataSlice.actions;

const dataReducer = dataSlice.reducer;
export default dataReducer;
