import axios from "axios";
import { api } from "./api";
import { Waypoint } from "../types/Waypoint";

const getEndpoint = (path = "") => `/drone${path}`;

export const armDrone = async () => {
    try {
        await api.post(getEndpoint("/arm"), { arm: 1 });
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

export const disarmDrone = async () => {
    try {
        await api.post(getEndpoint("/arm"), { arm: 0 });
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

export const takeoffDrone = async (altitude?: number) => {
    try {
        await api.post(getEndpoint(`/takeoff`), { altitude: Number(altitude) });
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

export const postWaypointsToDrone = async (waypoints: Waypoint[]) => {
    try {
        await api.post(getEndpoint("/queue"), waypoints);
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
