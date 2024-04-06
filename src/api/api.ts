import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:1323/",
    headers: {
        "Content-Type": "application/json",
        // Any other headers?
    },
});

export default api;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postWithTryCatch = async (path: string, data?: any) => {
    try {
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
