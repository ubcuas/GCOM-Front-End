import axios from "axios";
import { api } from "./api";

const getEndpoint = (path = "") => `/drone${path}`;

export const armDrone = async () => {
    try {
        await api.get(getEndpoint("/arm"));
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
        await api.get(getEndpoint("/disarm"));
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
