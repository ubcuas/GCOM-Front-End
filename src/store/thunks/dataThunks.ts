import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWaypointsFromServer } from "../../utils/api";

export const getWaypoints = createAsyncThunk("data/getWaypoints", async (_arg, { rejectWithValue }) => {
    try {
        return await getWaypointsFromServer();
    } catch (err) {
        return rejectWithValue(err);
    }
});
