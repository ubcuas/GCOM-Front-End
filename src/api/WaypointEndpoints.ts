import axios from "axios";
import { Waypoint } from "../types/Waypoint";
import { api } from "./api";

export const postWaypointsToServer = async (waypoints: Waypoint[]) => {
    try {
        await api.post("/waypoints", waypoints);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error(error.message);
            }
        }
    }
};

export const getWaypointsFromServer = async () => {
    const res = await api.get("/waypoints");
    return res.data.waypoints as Waypoint[];
};
