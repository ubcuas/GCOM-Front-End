import { Waypoint } from "../types/Waypoint";
import api from "./api";
import { AxiosResponse } from "axios";
import { CoordinateOfInterest } from "../types/Coords.ts";

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
export const getCoordinatesOfInterest = async (): Promise<CoordinateOfInterest[]> => {
    return (await api.get("/drone/get_coordinates")) as CoordinateOfInterest[];
};
