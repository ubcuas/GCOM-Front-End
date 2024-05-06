import { Waypoint } from "../types/Waypoint";
import api, { postWithTryCatch } from "./api";

const getEndpoint = (path = "") => `/drone${path}`;

export const armDrone = async () => {
    await postWithTryCatch(getEndpoint("/arm"), { arm: 1 });
};

export const disarmDrone = async () => {
    await postWithTryCatch(getEndpoint("/arm"), { arm: 0 });
};

export const takeoffDrone = async (altitude?: number) => {
    await postWithTryCatch(getEndpoint("/takeoff"), { altitude: Number(altitude) });
};

export const postWaypointsToDrone = async (waypoints: Waypoint[]) => {
    await postWithTryCatch(getEndpoint("/waypoints"), waypoints);
};

export const getDroneQueue = async () => {
    return (await api.get(getEndpoint("/queue"))) as Waypoint[];
};
