import { Waypoint } from "../types/Waypoint";
import { api, postWithTryCatch } from "./api";

const getPluralEndpoint = (path = "") => `/waypoints${path}`;
const _getEndpoint = (path = "") => `/waypoints${path}`; // remove _ when needed.

export const postWaypointsToServer = async (waypoints: Waypoint[]) => {
    await postWithTryCatch(getPluralEndpoint(), waypoints);
};

export const getWaypointsFromServer = async () => {
    const res = await api.get(getPluralEndpoint());
    return res.data.waypoints as Waypoint[];
};
