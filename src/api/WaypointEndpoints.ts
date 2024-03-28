import axios from "axios";
import { Waypoint } from "../types/Waypoint";
import { api } from "./api";

const getPluralEndpoint = (path = "") => `/waypoints${path}`;
const _getEndpoint = (path = "") => `/waypoints${path}`;

export const postWaypointsToServer = async (waypoints: Waypoint[], postToDrone = false) => {
    try {
        await api.post(postToDrone ? "/drone/queue" : getPluralEndpoint(), waypoints);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error(error.message);
            }
        }
    }
};

export const getWaypointsFromServer = async () => {
    const res = await api.get(getPluralEndpoint());
    return res.data.waypoints as Waypoint[];
};
