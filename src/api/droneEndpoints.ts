import { ApplicationType } from "../types/PostOpts";
import { Waypoint } from "../types/Waypoint";
import api, { postWithTryCatch } from "./api";

const droneEndpoint = (path = "") => `/drone${path}`;

export const armDrone = async () => {
    await postWithTryCatch(droneEndpoint("/arm"), { arm: 1 });
};

export const disarmDrone = async () => {
    await postWithTryCatch(droneEndpoint("/arm"), { arm: 0 });
};

export const takeoffDrone = async (altitude?: number) => {
    await postWithTryCatch(droneEndpoint("/takeoff"), { altitude: Number(altitude) });
};

export const postWaypointsToDrone = async (waypoints: Waypoint[], appType: ApplicationType) => {
    await postWithTryCatch("/queue", waypoints, {
        selectedApplication: appType,
    });
};

export const getDroneQueue = async () => {
    return (await api.get("/queue")) as Waypoint[];
};
