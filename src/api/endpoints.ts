import { Waypoint } from "../types/Waypoint";
import api from "./api";

// TODO: Implement endpoints

export const armDrone = async () => {
    return;
};

export const disarmDrone = async () => {
    return;
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
