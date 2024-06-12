import axios from "axios";
import { ApplicationType, PostOpts } from "../types/PostOpts";

export const api = axios.create({
    baseURL: "http://localhost:1323/",
    headers: {
        "Content-Type": "application/json",
        // Any other headers?
    },
});

export default api;

export const mpsApi = axios.create({
    baseURL: "http://localhost:9000/",
    headers: {
        "Content-Type": "application/json",
        // Any other headers?
    },
});

/* eslint-disable @typescript-eslint/no-explicit-any */
// I want this function to be a general api posting function that allows for anything.
export const postWithTryCatch = async (
    path: string,
    data?: any,
    opts: PostOpts = {
        selectedApplication: ApplicationType.BACKEND,
    },
) => {
    try {
        if (opts.selectedApplication === ApplicationType.BACKEND) {
            return await api.post(path, data);
        } else if (opts.selectedApplication === ApplicationType.MISSIONPLANNER) {
            return await mpsApi.post(path, data);
        }
        await api.post(path, data);
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
