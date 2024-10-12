import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWaypointsFromServer } from "../../api/waypointEndpoints";
import { getDroneQueue } from "../../api/droneEndpoints";

// Two different waypoints sources, so two different thunks.
export const getWaypoints = createAsyncThunk("data/getWaypoints", async (_arg, { rejectWithValue }) => {
    try {
        return await getWaypointsFromServer();
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const getMPSQueue = createAsyncThunk("data/getMPSQueue", async (_arg, { rejectWithValue }) => {
    try {
        return await getDroneQueue();
    } catch (err) {
        return rejectWithValue(err);
    }
});
