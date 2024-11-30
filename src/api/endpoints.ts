import { Waypoint } from "../types/Waypoint";
import api from "./api";
import { AxiosResponse } from "axios";

// TODO: Implement new endpoint logic

export const armDrone = async (arm: boolean) => {
    return await api.post("/drone/arm", { arm });
};

export const takeoffDrone = async (altitude?: number) => {
    return await api.post("/drone/takeoff", { altitude });
};

export const postWaypointsToDrone = async (waypoints: Waypoint[]) => {
    return await api.post("/drone/queue", waypoints);
};

export const getGCOM = async (): Promise<Waypoint[]> => {
    return (await api.get("/drone/queue")) as Waypoint[];
};

export const getRoute = async (): Promise<Waypoint[]> => {
    return (await api.get("/route")) as Waypoint[];
};
