import { Waypoint } from "../types/Waypoint";
import api from "./api";

// TODO: Implement new endpoint logic

export const armDrone = async () => {
    return await api.post("/drone/arm");
};

export const disarmDrone = async () => {
    return await api.post("/drone/arm");
};

export const takeoffDrone = async (altitude?: number) => {
    return;
};

export const postWaypointsToDrone = async (waypoints: Waypoint[]) => {
    return;
};

export const getGCOM = async (): Promise<Waypoint[]> => {
    return (await api.get("/drone/queue")) as Waypoint[];
};
