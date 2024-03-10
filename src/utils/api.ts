import axios from "axios";
import { Waypoint } from "../types/Waypoint";
import { renameKeys } from "./renameKeys";

const api = axios.create({
    baseURL: "http://localhost:1323/",
    headers: {
        "Content-Type": "application/json",
        // Any other headers
    },
});

export const postWaypointsToServer = async (waypoints: Waypoint[]) => {
    const formattedWaypoint = waypoints.map((waypoint) => {
        const newObj = renameKeys({ latitude: "lat", longitude: "long", altitude: "alt" }, waypoint);
        return {
            ...newObj,
            id: "-1",
        };
    });
    console.log("POST", formattedWaypoint);
    api.post("/waypoints", formattedWaypoint);
};

export default api;
