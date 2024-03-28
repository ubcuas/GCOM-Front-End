import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWaypointsFromServer } from "../../api/waypointEndpoints";

export const getWaypoints = createAsyncThunk("data/getWaypoints", async (_arg, { rejectWithValue }) => {
    try {
        return await getWaypointsFromServer();
    } catch (err) {
        return rejectWithValue(err);
    }
});
