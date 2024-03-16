import axios from "axios";
import { Waypoint } from "../types/Waypoint";

const api = axios.create({
    baseURL: "http://localhost:1323/",
    headers: {
        "Content-Type": "application/json",
        // Any other headers?
    },
});

export const postWaypointsToServer = async (waypoints: Waypoint[]) => {
    api.post("/waypoints", waypoints);
};

export const getWaypointsFromServer = async () => {
    const res = await api.get("/waypoints");
    return res.data.waypoints as Waypoint[];
};

export default api;
