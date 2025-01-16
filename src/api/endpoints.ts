import { Waypoint } from "../types/Waypoint";
import api from "./api";
import { AxiosResponse } from "axios";
import { formatWaypointForGCOM } from "./formatters";

export const armDrone = async (arm: boolean) => {
    return await api.post("/drone/arm", { arm });
};

export const takeoffDrone = async (altitude?: number) => {
    return await api.post("/drone/takeoff", { altitude });
};

export const getGCOM = async (): Promise<Waypoint[]> => {
    return (await api.get("/drone/queue")) as Waypoint[];
};

export const getRoute = async (): Promise<Waypoint[]> => {
    return (await api.get("/route")) as Waypoint[];
};

export const getWaypointsQuery = async (): Promise<Waypoint[]> => {
    const a = await api.get("/waypoint");
    return a.data;
};

export const createWaypointQuery = async (waypoint: Waypoint): Promise<AxiosResponse> => {
    const formattedWaypoint = formatWaypointForGCOM(waypoint);
    return api.post("/waypoint/", formattedWaypoint);
};

export const updateWaypointQuery = async (waypoint: Waypoint): Promise<AxiosResponse> => {
    return api.put(`/waypoint/${waypoint.id}`, waypoint);
};

export const deleteWaypointQuery = async (id: string): Promise<AxiosResponse> => {
    return api.delete(`/waypoint/${id}/`);
};

export const reorderWaypointsQuery = async (waypointIds: string[]): Promise<AxiosResponse> => {
    return api.post("/waypoint/reorder", waypointIds);
};
