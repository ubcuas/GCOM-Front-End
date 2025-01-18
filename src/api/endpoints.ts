import { Waypoint } from "../types/Waypoint";
import api from "./api";
import { AxiosResponse } from "axios";
import { CoordinateOfInterest } from "../types/Coords.ts";

// TODO: Implement new endpoint logic

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

export const getRoute = async (): Promise<Waypoint[]> => {
    return (await api.get("/route")) as Waypoint[];
};

export const getCoordinatesOfInterest = async (): Promise<CoordinateOfInterest[]> => {
    return (await api.get("/drone/get_coordinates")) as CoordinateOfInterest[];
};
