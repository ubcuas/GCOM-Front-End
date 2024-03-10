import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { Waypoint } from "../../types/Waypoint";
import { renameKeys } from "../../utils/renameKeys";

export const getWaypoints = createAsyncThunk("data/getWaypoints", async (_arg, { rejectWithValue }) => {
    try {
        const res = await api.get("/waypoints");
        const data = res.data.waypoints as Object[];
        const formattedData = data.map((waypoint) =>
            renameKeys({ lat: "latitude", long: "longitude", alt: "altitude" }, waypoint),
        );
        return formattedData as Waypoint[];
    } catch (err) {
        return rejectWithValue(err);
    }
});
